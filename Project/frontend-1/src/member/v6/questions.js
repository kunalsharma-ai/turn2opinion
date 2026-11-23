// Question rules shared by the v6 question flow. Same data and rules as the existing member app
// (Project/frontend survey/components):
//   - a profile or survey has pages: [[pageTitle, questionName, ...], ...]
//   - each question comes from POST /api/v1/question, its options from /api/v1/option/:name
//     (dependent questions send the parent's answer), text checks from /api/v1/validation/:name
//   - "Others" asks to specify (<name>_specify), "None of the above" and "Prefer not to say" clear the rest,
//     maxSelections caps a multi-select, age must match the date of birth, a saved phone stays locked
import { actions, CHOICE } from '../data/source.js';
import { t, tn } from '../i18n/t.js';
import { t as t6 } from './i18n/index.js';
import { fieldSpec } from './lib/validate/fields.js';

export { CHOICE };
export const filled = (v) => !(v == null || v === '' || (Array.isArray(v) && !v.length));
export const OTHERS = 'others';
const NONE = 'none_of_the_above';
const SKIP = 'prefer_not_to_say';
const isOthers = (o) => String(o.value).toLowerCase() === OTHERS || String(o.label).toLowerCase() === 'others';
const isNone = (o) => String(o.value).toLowerCase() === NONE || String(o.label).toLowerCase() === 'none of the above';
const isSkip = (o) => String(o.value).toLowerCase() === SKIP || String(o.label).toLowerCase() === 'prefer not to say';

// question definitions never change during a visit: fetch each once
const QCACHE = new Map();
export function loadQuestion(name) {
  if (!QCACHE.has(name)) QCACHE.set(name, actions.question(name).catch(() => null));
  return QCACHE.get(name);
}

/** Admin-written HTML (survey intro / thank-you): keep the formatting, drop anything active. */
export function safeHtml(html) {
  if (!html || typeof DOMParser === 'undefined') return '';
  const doc = new DOMParser().parseFromString(String(html), 'text/html');
  doc.querySelectorAll('script,iframe,object,embed,style,link,meta,form').forEach((n) => n.remove());
  doc.querySelectorAll('*').forEach((el) =>
    [...el.attributes].forEach((a) => {
      if (/^on/i.test(a.name) || (/^(href|src)$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) el.removeAttribute(a.name);
    })
  );
  return doc.body.innerHTML;
}

const CURRENCY = { IN: 'INR', US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD', SG: 'SGD', AE: 'AED', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', IE: 'EUR' };
export function moneyLabel(label, country) {
  const cur = CURRENCY[String(country || '').toUpperCase()];
  const m = String(label).match(/^\s*(\d+)\s*(?:-\s*(\d+)|\+)\s*$/);
  if (!cur || !m) return label;
  const f = (n) => {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(Number(n));
    } catch {
      return n;
    }
  };
  return m[2] ? `${f(m[1])} – ${f(m[2])}` : `${f(m[1])}+`;
}

/** The options a member can pick, with the question's Others / Prefer not to say / None of the above added. */
export function withExtras(q, list) {
  const l = [...(Array.isArray(list) ? list : [])];
  if (q.hasOthers && !l.some(isOthers)) l.push({ label: t('qz.others'), value: OTHERS });
  if (q.hasSkip && !l.some(isSkip)) l.push({ label: t('qz.skip'), value: SKIP, exclusive: true });
  if (q.hasNone && !l.some(isNone)) l.push({ label: t('qz.none'), value: NONE, exclusive: true });
  return l.map((o) => ({ ...o, exclusive: o.exclusive || isNone(o) || isSkip(o) }));
}

/** The "please specify" label when the picked option needs one ('' when it does not). */
export function specifyLabel(q, v, o) {
  if (!Array.isArray(o)) return '';
  const vals = Array.isArray(v) ? v : filled(v) ? [v] : [];
  const sel = o.filter((x) => vals.includes(x.value));
  const d = sel.find((x) => x.describe);
  if (d) return d.describe;
  if (q.hasOthers && vals.includes(OTHERS)) return t('qz.specify');
  return '';
}

/** One question's error message ('' when the answer is fine). */
export function checkAnswer(q, values, opts, dob) {
  const v = values[q.name];
  if (q.required && !filled(v)) return t('qz.required');
  if (q.type === 'text' && filled(v) && opts && opts.pattern) {
    try {
      if (!new RegExp(opts.pattern).test(String(v))) return t('qz.format');
    } catch {
      /* bad pattern from the server: skip the check, as the existing app does */
    }
  }
  if (q.type === 'phone' && filled(v) && !/^\d{8,15}$/.test(String(v))) return t('qz.phone');
  if (q.name === 'age' && filled(v) && dob) {
    const d = new Date(dob);
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) age -= 1;
    if (Number(v) !== age && Number(v) !== now.getFullYear() - d.getFullYear()) return t('qz.age');
  }
  return '';
}

/** The v6 field registry entry for a question: phone and date questions always use the phone / date rules. */
export function specFor(q) {
  if (q.type === 'phone') return fieldSpec(/^(alternate-phone|phone1)$/.test(q.name) ? q.name : 'phone');
  if (q.type === 'date' || q.name === 'dob') return fieldSpec('dob');
  return fieldSpec(q.name, q.label);
}
const phoneText = (q, v) => (q.type === 'phone' ? '+' + String(v).replace(/\D/g, '') : String(v));

/**
 * The v6 validation for one answer (lib/engine.js check / warn): returns null when it can be accepted,
 * { level: 'block', text } for an error, or { level: 'soft', code, text, suggestion } for an unusual answer the
 * member confirms once. ctx = { A: answers incl. country, category: 'minor'|'b2c', prev, guess }.
 * opts: the choice list ({label, value}[]) or the API's text rule ({ pattern }).
 */
export function validate6(q, values, opts, ctx, raw) {
  const v = values[q.name];
  if (CHOICE.includes(q.type)) {
    if (raw && !filled(v)) return { level: 'block', text: t6('v_pick') };
    if (!filled(v)) return q.required ? { level: 'block', text: t6('v_choose') } : null;
    if (Array.isArray(opts)) {
      const ok = new Set(opts.map((x) => String(x.value)));
      if ((Array.isArray(v) ? v : [v]).some((x) => !ok.has(String(x)))) return { level: 'block', text: t6('v_enum') };
    }
    return null;
  }
  if (!filled(v) || (typeof v === 'string' && !v.trim())) return q.required ? { level: 'block', text: t6('v_required') } : null;
  // the API's own rule for this question still applies (as the existing app does)
  if (q.type === 'text' && opts && opts.pattern) {
    try {
      if (!new RegExp(opts.pattern).test(String(v))) return { level: 'block', text: t('qz.format') };
    } catch {
      /* bad pattern from the server: skip the check */
    }
  }
  let r;
  try {
    r = specFor(q).v(phoneText(q, v), ctx, q.name);
  } catch {
    r = { level: 'block', code: 'invalid' };
  }
  if (!r || r.level === 'pass' || r.level === 'stepup') return null;
  const text = r.code ? t6('v_' + r.code, r.vars || {}) : '';
  if (r.level === 'block') return { level: 'block', text };
  return { level: 'soft', code: r.code, text, suggestion: r.meta && r.meta.suggestion };
}
/** The normalised value v6 stores (trimmed names, upper-case postcodes, E.164 phones kept as digits). */
export function normalise6(q, values, ctx) {
  const v = values[q.name];
  if (!filled(v) || typeof v !== 'string' || CHOICE.includes(q.type)) return v;
  try {
    const r = specFor(q).v(phoneText(q, v), ctx, q.name);
    if (r && r.level !== 'block' && typeof r.norm === 'string' && r.norm) return q.type === 'phone' ? r.norm.replace(/\D/g, '') : r.norm;
  } catch {
    /* keep what was typed */
  }
  return v;
}

export const maxHint = (n) => tn('qz.max', n);

// Calling codes for the country the member is in (the existing app pre-selects it the same way).
export const DIAL = { in: '91', us: '1', ca: '1', gb: '44', au: '61', de: '49', fr: '33', sg: '65', ae: '971', es: '34', it: '39', nl: '31', ie: '353', nz: '64', za: '27', ng: '234', ke: '254', ph: '63', my: '60', id: '62', br: '55', mx: '52', jp: '81' };
