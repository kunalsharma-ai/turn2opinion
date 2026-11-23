// PREVIEW-ONLY questions, options and answers for the Profiles and Surveys pages (VITE_DEMO_MODE).
//
// The preview now carries the FULL Turn2Opinion question bank, the same one the v6 Profiles & Surveys
// deliverables were verified against (820+ questions, every option list, 50 profiles; see
// demo-bank/README.md). Shapes match what /api/v1/profile, /api/v1/question, /api/v1/option/:name,
// /api/v1/me and PUT /api/v1/me/survey return, so the same screens run on real data unchanged.
// Production builds never call this file; the bank is loaded only when the preview asks for it.
import { adaptOptions, adaptQuestion } from './source.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let bankP = null;
const bank = () => (bankP ||= import('./demo-bank/bank.json').then((m) => m.default || m));
// every entry point waits for the bank and the starting answers
const both = async () => {
  const B = await bank();
  await ready();
  return B;
};

// the v6 engine's rules (full-project/src/lib/engine.js)
const OTHER = /^\s*(others?|something else|any ?other|another|else)\b|please specify|\(specify\)|^other\s*[-–(:]/i;
const OPTIONAL = /alternate|linkedin|website|payment-method|social-media|company-address|^verify-|^add-(middlename|address2|preferredname|linkedin)$|^phone1$|^workemail$|^lastname$|^middlename$/;
const MULTI = /all that apply|select all|check all|choose all|multiple/i;
const EXCL = /^(none of (the|these)|not applicable|n\/a|prefer not)/i;
const PHONE = /^(phone|alternate-phone|phone1|add-whatsapp|add-phone\d*)$/;
const LAZY = { city: 'city', 'org-city': 'city', jobrole: 'jobrole', 'unemp-jobtype': 'jobrole' };
const filled = (v) => !(v == null || v === '' || (Array.isArray(v) && !v.length));
const titleCase = (s) => String(s).replace(/[-_]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

/** Raw option lists for a question: { parentAnswer: [label | [label, value]] } (null when it has none). */
function optionTable(B, n) {
  const src = B.A[n] || B.L[n] || n;
  if (LAZY[n]) return LAZY[n] === 'city' ? B.city : B.jobrole;
  return B.O[src] || null;
}
function parentOf(B, n) {
  const p = B.Q[n]?.[1];
  return p && B.Q[p] ? p : '';
}

/** The profile list for a preview member: every profile of the bank (Consumer/Pro: b2c, Teen: minor). */
export async function demoProfileList(as) {
  const B = await bank();
  const cat = as === 'teen' ? 'minor' : 'b2c';
  const mine = B.profiles.filter((p) => p.c === cat);
  const inCat = new Set(mine.flatMap((p) => p.p.flatMap(([, qs]) => qs)));
  return mine
    .map((p) => {
      // a follow-up whose parent lives in another profile reads that answer in the flow (Flow.jsx), like live data.
      // A parent that no profile of this panel asks (Teen automobile, health) is asked here, just before it.
      const pages = p.p.map(([sec, qs]) => {
        const out = [];
        qs.filter((q) => B.Q[q]).forEach((q) => {
          const par = parentOf(B, q);
          if (par && !inCat.has(par) && !out.includes(par)) out.push(par);
          out.push(q);
        });
        return [p.p.length > 1 ? titleCase(sec) : titleCase(p.n), ...out];
      });
      return { slug: p.s, name: p.n, pages, points: 50 };
    });
}

// Starting answers per preview member. Identity comes from registration; then, for the "ready" preview,
// the profiles listed in DONE are answered in full (first sensible option of every question the member
// would see) and PART ones half-way, so the page shows done, in-progress and sealed items.
const SEED = {
  consumer: { firstname: 'Asha', lastname: 'Verma', mail: 'asha@example.com', phone: '919810012345', dob: '1994-05-12', gender: 'Female', country: 'IN', state: 'IN-MH', city: 'Pune', zipcode: '411001' },
  pro: { firstname: 'Daniel', lastname: 'Okafor', mail: 'daniel@example.com', phone: '447700900123', dob: '1985-02-11', gender: 'Male', country: 'GB', state: 'GB-ENG', zipcode: 'M1 1AE', empstat: 'Employed full-time' },
  teen: { firstname: 'Riya', lastname: 'Shah', dob: '2011-03-09', gender: 'Female', country: 'IN', state: 'IN-MH', city: 'Pune', zipcode: '411001' }
};
const DONE = { consumer: ['basic', 'educational', 'professional'], pro: ['basic', 'educational', 'professional', 'financial'], teen: ['basic', 'educational'] };
const PART = { consumer: ['financial'], pro: ['parenting'], teen: ['shopping'] };
let store = null;
let who = 'consumer';
const KEY = 't2o_member_demo_answers_v2';
const TEXT = { 'alternate-email': 'me.alt@example.com', 'alternate-phone': '919820098200', orgwebsite: 'https://example.com', orglinkedin: 'https://www.linkedin.com/company/example', orglocation: 'City centre', jobrole: 'Analyst' };
function fillProfile(B, p, a, share = 1) {
  const names = p.p.flatMap(([, qs]) => qs);
  const stop = Math.ceil(names.length * share);
  let n = 0;
  // two passes so follow-ups unlocked by an earlier answer are filled too
  for (let pass = 0; pass < 2; pass++)
    names.forEach((q) => {
      if (n >= stop || filled(a[q]) || /^verify-/.test(q)) return;
      const par = parentOf(B, q);
      if (par && !filled(a[par])) return;
      if (optionTable(B, q)) {
        const o = optionsFor(B, q, a) || [];
        if (!o.length) return;
        const pick = o.find((x) => !x.isExclusive && !x.describeLabel) || o[0];
        a[q] = MULTI.test(B.Q[q][0]) ? [pick.value] : pick.value;
      } else a[q] = q === 'dob' ? '1994-05-12' : PHONE.test(q) ? '919810012345' : TEXT[q] || 'Sample answer';
      n++;
    });
}
async function ready() {
  if (store) return store;
  const B = await bank();
  if (store) return store;
  try {
    const prefs = JSON.parse(localStorage.getItem('t2o_member_demo') || '{}');
    who = prefs.as || 'consumer';
    const saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (saved && saved.who === who && prefs.state !== 'empty') store = saved.a;
    else {
      store = prefs.state === 'empty' ? {} : { ...(SEED[who] || SEED.consumer) };
      if (prefs.state !== 'empty') {
        const cat = who === 'teen' ? 'minor' : 'b2c';
        const mine = B.profiles.filter((p) => p.c === cat);
        (DONE[who] || []).forEach((s) => mine.filter((p) => p.s === s).forEach((p) => fillProfile(B, p, store)));
        (PART[who] || []).forEach((s) => mine.filter((p) => p.s === s).forEach((p) => fillProfile(B, p, store, 0.5)));
      }
    }
  } catch {
    store = { ...SEED.consumer };
  }
  return store;
}
const answers = () => store || {};
function persist() {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ who, a: store }));
  } catch {
    /* preview only */
  }
}

/** Options for a question given the current answers (v6 engine: '' list plus the lists keyed by the parent's answer). */
function optionsFor(B, n, a) {
  const d = optionTable(B, n);
  if (!d) return null;
  const par = parentOf(B, n);
  let keys;
  if (par) {
    const v = a[par];
    keys = [''].concat(Array.isArray(v) ? v : filled(v) ? [v] : []);
  } else keys = Object.keys(d);
  const seen = new Set();
  const out = [];
  keys.forEach((k) =>
    (d[k] || []).forEach((x) => {
      const [label, value] = typeof x === 'string' ? [x, x] : x;
      if (seen.has(value)) return;
      seen.add(value);
      out.push({ label, value, isExclusive: EXCL.test(label), describeLabel: OTHER.test(label) ? 'Please specify' : '' });
    })
  );
  // income lists are per country; a country without its own list gets the USD one (v6 lib/income.js)
  if (!out.length && /income/.test(n) && par === 'country' && d.US) return optionsFor({ ...B, O: { ...B.O, [n]: { '': d.US } }, Q: { ...B.Q, [n]: [B.Q[n][0], ''] } }, n, a);
  // "Other", "None of the above" and "Prefer not to say" sit at the end (stable for the rest)
  const tail = (l) => (OTHER.test(l) ? 1 : /^(none of (the|these)|not applicable|n\/a)\b/i.test(l) ? 2 : /^prefer not/i.test(l) ? 3 : 0);
  return out.map((o, i) => [o, i]).sort((x, y) => tail(x[0].label) - tail(y[0].label) || x[1] - y[1]).map((x) => x[0]);
}

/** Completion % per profile slug, the way the backend counts it: applicable questions answered. */
export async function demoStatus(list) {
  const B = await both();
  const a = answers();
  const out = {};
  list.forEach((p) => {
    const names = p.pages.flatMap((pg) => pg.slice(1)).filter((n) => {
      const par = parentOf(B, n);
      if (par && !filled(a[par])) return false;
      const o = optionTable(B, n) ? optionsFor(B, n, a) : null;
      return !o || o.length > 0;
    });
    const done = names.filter((n) => filled(a[n])).length;
    out[p.slug] = done ? Math.round((done / Math.max(1, names.length)) * 100) : -1;
  });
  return out;
}

export async function demoQuestion(name) {
  const B = await bank();
  await wait(30);
  const q = B.Q[name];
  if (!q) return null;
  const hasOpts = Boolean(optionTable(B, name));
  const type = /^verify-/.test(name) ? 'verify' : hasOpts ? (MULTI.test(q[0]) ? 'multiselect' : 'select') : PHONE.test(name) ? 'phone' : name === 'dob' ? 'date' : 'text';
  const par = parentOf(B, name);
  return adaptQuestion({
    name,
    label: q[0] || titleCase(name),
    type,
    isRequired: !OPTIONAL.test(name),
    ...(par ? { parent: par } : {}),
    isMoney: /income|revenue|spend/.test(name) && hasOpts,
    maxSelections: '0',
    isEditable: true,
    size: '6'
  });
}

export async function demoOptions(q, parentValue) {
  const B = await both();
  await wait(40);
  const par = parentOf(B, q.name);
  const a = par ? { ...answers(), [par]: parentValue } : answers();
  if (['select', 'multiselect', 'checkbox', 'radio'].includes(q.type)) return adaptOptions(optionsFor(B, q.name, a) || []);
  // free text: no special rule in the preview (the live API sends its own validation)
  return null;
}
export async function demoAnswers(questions) {
  await both();
  await wait(80);
  const a = answers();
  const out = {};
  questions.forEach((n) => {
    if (filled(a[n])) out[n] = a[n];
    if (filled(a[`${n}_specify`])) out[`${n}_specify`] = a[`${n}_specify`];
  });
  return out;
}
export async function demoSave(values) {
  await both();
  await wait(350);
  const a = answers();
  Object.entries(values || {}).forEach(([k, v]) => {
    if (k !== 'respID') a[k] = v;
  });
  persist();
  return true;
}

// PUT /api/v1/me/survey for the preview's paid surveys: internal ones run here, external ones redirect
export async function demoStartSurvey(slug) {
  await wait(500);
  if (/streaming|e-scooters|cloud-cost|cyber/.test(slug))
    return { slug, name: 'Partner survey', respID: 'DEMO-RESP-1', link: 'https://example.com/survey?uid=$uid', description: '<p>This survey is hosted by our research partner. You’ll come back here when you finish.</p>' };
  const B = await bank();
  const fb = B.profiles.find((p) => p.s === 'food-beverages');
  const qs = fb ? fb.p[0][1].filter((n) => !parentOf(B, n)) : [];
  return {
    slug,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()),
    respID: 'DEMO-RESP-2',
    description:
      '<p><strong>Thanks for taking part.</strong> This short survey asks about your everyday habits. There are no right or wrong answers, so please answer honestly.</p><p>Your answers are confidential and reported only in combination with others.</p>',
    pages: [
      ['Your habits', ...qs.slice(0, 4)],
      ['A little more', ...qs.slice(4, 8)]
    ],
    thankyou: '<p><strong>Thank you!</strong> Your answers are in. Points for this survey appear in your activity once the study team confirms your response.</p>'
  };
}
