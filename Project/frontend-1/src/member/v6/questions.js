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
import { CURRENCY } from './currency.js';

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

// options / validation rules per question and parent answer: fetched once per visit, so reopening a profile,
// going back a page or re-picking the same parent answer is instant
const OCACHE = new Map();
export function loadOptions(q, parentValue) {
  const key = `${q.name}::${q.parent ? JSON.stringify(parentValue ?? null) : ''}`;
  if (!OCACHE.has(key)) {
    const p = actions.options(q, parentValue);
    OCACHE.set(key, p);
    // a failed request is not kept, so the next visit asks again
    p.catch(() => OCACHE.delete(key));
  }
  return OCACHE.get(key);
}

/** A date answer as the date field stores it ("YYYY-MM-DD"). The server keeps the member's date of birth as a
 *  full date-time ("2005-01-14T00:00:00.000Z"); left like that the field showed the right date but the check
 *  read it as unfinished ("Please enter a complete date") and the member could not move on. */
export const DATE_TIME = /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}/;
export function dateOnly(v) {
  const m = typeof v === 'string' ? DATE_TIME.exec(v) : null;
  return m ? m[1] : v;
}

/** A saved choice answer written with other capitals than the option ("male" vs "Male"): the option's own value,
 *  so the answer shows as picked and passes the "pick one of the options" check. */
export function matchOption(v, list) {
  if (!Array.isArray(list) || !list.length || !filled(v)) return v;
  const one = (x) => {
    if (list.some((o) => String(o.value) === String(x))) return x;
    const k = String(x).trim().toLowerCase();
    const hit = list.find((o) => String(o.value).trim().toLowerCase() === k) || list.find((o) => String(o.label).trim().toLowerCase() === k);
    return hit ? hit.value : x;
  };
  return Array.isArray(v) ? v.map(one) : one(v);
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

const NUM = '(\\d[\\d,]*(?:\\.\\d+)?)';
// Money option labels the bank uses ("up to 30000", "30000 - 49999", "250000 and above", "Less than 500", "25000 or more").
// Anything else (hours, minutes, percentages, labels that already carry a symbol) does not match and is shown as sent.
const MONEY = [
  [new RegExp(`^up to\\s*${NUM}$`, 'i'), (f, a) => `Up to ${f(a)}`, () => 0],
  [new RegExp(`^(?:less than|under|below)\\s*${NUM}$`, 'i'), (f, a) => `Less than ${f(a)}`, () => 0],
  [new RegExp(`^${NUM}\\s*(?:-|–|—|to)\\s*${NUM}$`, 'i'), (f, a, b) => `${f(a)} – ${f(b)}`, (a) => a],
  [new RegExp(`^${NUM}\\s*(?:and above|and over|\\+)$`, 'i'), (f, a) => `${f(a)} and above`, (a) => a],
  [new RegExp(`^${NUM}\\s*or more$`, 'i'), (f, a) => `${f(a)} or more`, (a) => a],
  [new RegExp(`^(?:more than|over|above)\\s*${NUM}$`, 'i'), (f, a) => `More than ${f(a)}`, (a) => a],
  [new RegExp(`^${NUM}$`), (f, a) => f(a), (a) => a],
];
const num = (x) => Number(String(x).replace(/,/g, ''));
function parseMoney(label) {
  const l = String(label ?? '').trim();
  for (const [re, fmt, rank] of MONEY) {
    const m = l.match(re);
    if (m) return { fmt, rank: rank(num(m[1])), a: num(m[1]), b: m[2] !== undefined ? num(m[2]) : undefined };
  }
  return null;
}

/** The currency of a member's country (ISO alpha-2), or undefined. */
export const currencyOf = (country) => CURRENCY[String(country || '').toUpperCase()];

/**
 * A money range option shown in the member's local currency (issue #43, same rules as the old site's toMoneyRange):
 * "30000 - 49999" -> "₹30,000 – ₹49,999", "up to 30000" -> "Up to ₹30,000", "250000 and above" -> "₹2,50,000 and above".
 */
export function moneyLabel(label, country, locale) {
  const cur = currencyOf(country);
  const p = cur && parseMoney(label);
  if (!p) return label;
  let nf;
  try {
    nf = new Intl.NumberFormat(locale, { style: 'currency', currency: cur, maximumFractionDigits: 0 });
  } catch {
    return label;
  }
  return p.fmt((n) => nf.format(n), p.a, p.b);
}

/** Money options in ascending order (lowest range first), like the old site's sortRange. Left as sent unless every option is a money range. */
export function sortMoney(list) {
  const l = Array.isArray(list) ? list : [];
  const ranks = l.map((o) => parseMoney(o?.label));
  if (!l.length || ranks.some((r) => !r)) return l;
  return l.map((o, i) => [o, ranks[i].rank, i]).sort((x, y) => x[1] - y[1] || x[2] - y[2]).map((x) => x[0]);
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
  const v = q.type === 'date' || q.name === 'dob' ? dateOnly(values[q.name]) : values[q.name];
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
  const v = q.type === 'date' || q.name === 'dob' ? dateOnly(values[q.name]) : values[q.name];
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
