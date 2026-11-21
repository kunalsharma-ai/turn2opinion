// Live-help answer engine. Ranks the website's own questions & answers (hand-written intents + every FAQ on
// the site) against what the visitor typed, using keyword weighting with synonyms – no external AI service,
// nothing leaves the browser. Loaded on demand the first time the chat opens.
import { INTENTS, QUICK } from '../data/assistant/intents.js';
import { SITE_QA } from '../data/assistant/site-qa.js';
import { SURVEYS, SURVEY_NOTE } from '../data/surveys.js';
import { COUNTRIES } from '../data/countries.js';

const COUNTRY_NAMES = COUNTRIES.map((c) => ` ${c.n.toLowerCase()} `).filter((n) => n.trim().length > 3);

const STOP = new Set(
  'a an the i me my we our you your yours it its is are was were be been am do does did doing to of in on at for from by with and or but if so as this that these those there here what which who whom how can could would should will shall may might must have has had having not no yes please pls plz tell know want need get got give any some just about into than then also very really much many more most there their them they he she his her hi hello hey ok okay one'
    .split(' ')
);
// Keep a few question words that change meaning.
['how', 'long', 'much', 'many', 'why', 'when', 'where', 'who'].forEach((w) => STOP.delete(w));

const SYN = {
  register: 'join', registration: 'join', signup: 'join', enrol: 'join', enroll: 'join', enrolment: 'join', member: 'join', membership: 'join',
  payment: 'pay', paid: 'pay', payout: 'pay', paying: 'pay', cash: 'pay', money: 'pay', earning: 'earn', earnings: 'earn', income: 'earn',
  withdraw: 'redeem', withdrawal: 'redeem', redemption: 'redeem', claim: 'redeem', encash: 'redeem',
  disqualify: 'screen', disqualified: 'screen', terminate: 'screen', terminated: 'screen', screenout: 'screen', screened: 'screen',
  mobile: 'phone', cellphone: 'phone', smartphone: 'phone', android: 'phone', iphone: 'phone',
  signin: 'login', logon: 'login', pwd: 'password', passcode: 'password',
  mail: 'email', gmail: 'email', 'e-mail': 'email',
  scam: 'legit', fraud: 'legit', fake: 'legit', genuine: 'legit', trustworthy: 'legit', real: 'legit',
  gpay: 'upi', phonepe: 'upi', paytm: 'upi', bhim: 'upi',
  kid: 'minor', kids: 'minor', teenager: 'minor', teen: 'minor', child: 'minor',
  survey: 'survey', surveys: 'survey', questionnaire: 'survey', poll: 'survey',
  invite: 'invitation', invites: 'invitation', invitations: 'invitation',
  voucher: 'gift', vouchers: 'gift', giftcard: 'gift',
  bank: 'wire', neft: 'wire', transfer: 'wire',
  remove: 'delete', deactivate: 'delete', close: 'delete',
  b2b: 'professional', business: 'professional', professionals: 'professional', manager: 'professional', managers: 'professional',
  nation: 'country', countries: 'country',
  privacy: 'privacy', data: 'privacy', information: 'privacy',
  points: 'point', reward: 'reward', rewards: 'reward', incentive: 'reward', incentives: 'reward',
  minutes: 'time', duration: 'time', hours: 'time',
  number: 'phone', whatsapp: 'whatsapp',
  gaming: 'game', gamer: 'game', gamers: 'game', games: 'game', shopping: 'shop', shopper: 'shop', shoppers: 'shop',
  travelling: 'travel', traveling: 'travel', traveller: 'travel', travellers: 'travel'
};

const norm = (s) =>
  ` ${String(s)
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/n't/g, ' not')
    .replace(/[^a-z0-9@.' ]+/g, ' ')
    .replace(/'s\b/g, '')
    .replace(/'/g, '')
    .replace(/\s+/g, ' ')
    .trim()} `;

function stem(w) {
  if (SYN[w]) return SYN[w];
  let s = w;
  if (s.length > 5 && s.endsWith('ing')) s = s.slice(0, -3);
  else if (s.length > 4 && s.endsWith('ies')) s = s.slice(0, -3) + 'y';
  else if (s.length > 4 && s.endsWith('ed')) s = s.slice(0, -2);
  else if (s.length > 3 && s.endsWith('s') && !s.endsWith('ss')) s = s.slice(0, -1);
  return SYN[s] || s;
}

export function tokens(s) {
  return norm(s)
    .trim()
    .split(' ')
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

// ---------- build the index ----------
const fmtSurvey = (s) => `${s.title} (about ${s.mins} min, around US$${s.reward})`;
const surveyIntent = (aud, label) => ({
  id: `surveys-${aud}`,
  q: `Which ${label} surveys can I take?`,
  alt: [`${label} surveys`, `${label} survey list`, `${label} survey rates`, `surveys for ${label}s`, ...SURVEYS[aud].map((x) => `${x.title} survey`), ...SURVEYS[aud].map((x) => x.cat)],
  keys: [label, 'list', 'rates'],
  a: `A few of our ${label} surveys: ${SURVEYS[aud].slice(0, 8).map(fmtSurvey).join('; ')}. ${SURVEY_NOTE}`,
  src: [['/', 'Browse paid surveys'], ['/paid-surveys/', 'Paid surveys']]
});

const DOCS = [
  ...INTENTS.map((d) => ({ ...d, kind: 'intent' })),
  surveyIntent('consumer', 'consumer'),
  surveyIntent('professional', 'professional'),
  surveyIntent('teen', 'teen'),
  ...SITE_QA.map((d, i) => ({ id: `qa-${i}`, q: d.q, alt: [], keys: [], a: d.a, src: [d.src], kind: 'qa' }))
];

const FIELD_W = { q: 1, alt: 0.9, keys: 1.4, a: 0.22 };
const INDEX = DOCS.map((d) => {
  const w = new Map();
  const put = (text, weight) => tokens(text).forEach((t) => w.set(t, Math.max(w.get(t) || 0, weight)));
  put(d.q, FIELD_W.q);
  (d.alt || []).forEach((x) => put(x, FIELD_W.alt));
  (d.keys || []).forEach((x) => put(x, FIELD_W.keys));
  if (!d.small) put(d.a, FIELD_W.a);
  const phrases = [d.q, ...(d.alt || []), ...(d.keys || [])].map((p) => norm(p)).filter((p) => d.small || p.trim().length > 2);
  return { d, w, phrases };
});
const DF = new Map();
INDEX.forEach(({ w }) => w.forEach((_, t) => DF.set(t, (DF.get(t) || 0) + 1)));
const N = INDEX.length;
const idf = (t) => Math.log(1 + N / (1 + (DF.get(t) || 0)));

function score(qTokens, qNorm, entry) {
  let hit = 0;
  let total = 0;
  for (const t of qTokens) {
    const wi = idf(t);
    total += wi;
    const fw = entry.w.get(t);
    if (fw) hit += wi * Math.min(1, fw);
  }
  let phrase = 0;
  for (const p of entry.phrases) {
    const words = p.trim().split(' ').length;
    if (words >= 2 && qNorm.includes(p)) phrase = Math.max(phrase, 0.25 + words * 0.08);
    else if (words === 1 && p.trim().length > 2 && qNorm.includes(p) && entry.d.keys && entry.d.keys.some((k) => norm(k) === p)) phrase = Math.max(phrase, 0.2);
  }
  const cov = total ? hit / total : 0;
  const bias = entry.d.kind === 'intent' ? 1.08 : 1;
  return (cov + phrase) * bias;
}

/**
 * Answer a visitor question.
 * @returns {{ best: object|null, confidence: 'high'|'mid'|'none', related: object[] }}
 */
export function ask(text) {
  const qNorm = norm(text);
  const qTokens = [...new Set(tokens(text))];
  // A country name ("from Pakistan") hints at a question about country availability.
  const countryHint = COUNTRY_NAMES.some((n) => qNorm.includes(n)) ? 0.4 : 0;
  // Pure small talk (“hi”, “thanks”) only when the message is short.
  const words = qNorm.trim().split(' ').length;
  if (words <= 4) {
    const small = INDEX.find((e) => e.d.small && e.phrases.some((p) => qNorm.trim() === p.trim() || (p.trim().length > 3 && qNorm.startsWith(p))));
    if (small && qTokens.length <= 2) return { best: small.d, confidence: 'high', related: [] };
  }
  if (!qTokens.length) return { best: null, confidence: 'none', related: [] };
  const ranked = INDEX.filter((e) => !e.d.small)
    .map((e) => ({ d: e.d, s: score(qTokens, qNorm, e) }))
    .filter((r) => r.s > 0 || r.d.id === 'countries')
    .sort((a, b) => b.s - a.s);
  // Only lean on the country hint when nothing else matches well ("can I join from Kenya?").
  if (countryHint && (!ranked[0] || ranked[0].s < 0.5)) {
    ranked.forEach((r) => {
      if (r.d.id === 'countries') r.s += countryHint;
    });
    ranked.sort((a, b) => b.s - a.s);
  }
  const top = ranked[0];
  const seen = new Set();
  const related = ranked
    .slice(1)
    .filter((r) => r.s > 0.28 && r.d.q !== (top && top.d.q) && !seen.has(r.d.q) && seen.add(r.d.q))
    .slice(0, 3)
    .map((r) => r.d);
  if (!top) return { best: null, confidence: 'none', related: [] };
  const confidence = top.s >= 0.55 ? 'high' : top.s >= 0.33 ? 'mid' : 'none';
  return { best: top.d, confidence, related, score: top.s };
}

export const byId = (id) => DOCS.find((d) => d.id === id) || null;
export const QUICK_QUESTIONS = QUICK;
export const KB_SIZE = DOCS.length;
