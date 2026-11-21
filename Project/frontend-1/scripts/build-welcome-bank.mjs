// Builds the sign-up welcome questionnaires from the ORIGINAL Turn2Opinion profile question bank
// (public/profiles/data/core.json, the same file the member profiles use). Question keys, option
// labels and option values are kept as they are in the bank, so the answers saved at sign-up land
// in the same Answer records the member profiles read. Only a few display texts are tidied (typos),
// Only questions that exist in the bank are used.
//   node scripts/build-welcome-bank.mjs   ->  src/data/welcome/bank.json + states.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const core = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/profiles/data/core.json'), 'utf8'));
const { Q, O, A = {}, L = {}, lazy = {} } = core;
const canon = (k) => { const c = A[k] || k; return L[c] || c; };

// Sections per journey: [id, title, icon, blurb, [question keys]]
// Round 13 (Kunal, 20 Nov 2026): "very limited questions to understand their profile only", taken from
// the original question bank, nothing invented. One short part per journey, asked after the first
// login. Everything else stays in the member profiles, where it always was.
const SECTIONS = {
  consumer: [
    ['about', 'About you', 'sparkle', 'Six quick questions so the first surveys we send fit you.', ['relationship', 'children-num', 'education', 'empstat', 'industry', 'household-income']]
  ],
  pro: [
    ['work', 'Your work', 'briefcase', 'Six quick questions so the first business studies we send fit your role.', ['empstat', 'industry', 'add-seniority', 'orgsize', 'orgdecision', 'education']]
  ],
  teen: [
    ['about', 'About you', 'sparkle', 'Five quick questions so your first surveys fit you. Nothing about money or which school you go to.', ['student', 'lifestyle_1', 'media6', 'gaming0', 'add-primary-language']]
  ]
};

// No questions outside the original bank (the two made-up Teen school questions were removed).
const EXTRA_Q = {};
const EXTRA_O = {};

// Display texts only (keys and options stay as in the bank).
const TEXT = {
  relationship: 'What is your relationship status?',
  'children-num': 'How many children under 18 live in your household?',
  rural: 'What type of area do you live in?',
  education: 'What is the highest level of education you have completed?',
  industry: 'Which industry do you work in?',
  sector: 'Which specialisation best fits your work?',
  department: 'Which department do you work in?',
  jobrole: 'What is your job title?',
  lifestyle_1: 'Which leisure activities do you take part in? Select all that apply.',
  lifestyle_3: 'Which movie genres do you enjoy? Select all that apply.',
  lifestyle_8: 'Which type of music do you like the most?',
  food4: 'What is your diet preference?',
  sports25: 'Do you prefer indoor or outdoor sports?',
  sports26: 'Which indoor sport do you enjoy most?',
  sports27: 'Which outdoor sport do you enjoy most?',
  tech1: 'Which electronic products do you own? Select all that apply.',
  media6: 'Which social media platforms do you use? Select all that apply.',
  media8: 'Which streaming (OTT) platforms do you subscribe to? Select all that apply.',
  mobile1: 'Do you own a mobile phone or smartphone?',
  gaming0: 'Do you play video games?',
  gaming1: 'Which video game genres do you enjoy? Select all that apply.',
  shopping25: 'Which types of products do you usually buy online? Select all that apply.',
  experience: 'How long have you worked in your current role?',
  orgsize: 'How many people work for your organisation (all branches)?',
  orgoverseas: 'How many branches does your organisation have abroad?',
  orgdecision: 'Which statement best describes your part in decisions at work?',
  orgspend: 'Which areas do you influence or approve spending on? Select all that apply.',
  'organization-revenue': 'What is your organisation’s annual revenue?',
  freelancer: 'Which best describes your freelance work?',
  jobseeker: 'Are you looking for a job?',
  'unemp-industry': 'Which kind of industry interests you?',
  'research-panel3': 'Which research topics interest you most? Select all that apply.',
  'add-primary-language': 'Which language do you prefer for surveys?'
};
const MULTI = new Set(['lifestyle_1', 'lifestyle_3', 'tech1', 'media6', 'media8', 'mobile11', 'gaming1', 'gaming7', 'shopping25', 'add-decisions', 'research-panel3', 'orgspend', 'add-b2b-influence', 'add-languages', 'teen-subjects']);
// Options never offered at sign-up (adult or cash topics in Teen lists, cash rewards everywhere).
const DROP = /\bcash\b|alcohol|bar[s ]|pub|night ?club|casino|gambl|betting|smok|tobacco|vap|dating/i;

const Qout = {}, Oout = {}, sections = {};
const optionList = (key) => (EXTRA_O[key] ? EXTRA_O[key] : O[canon(key)] || null);
const norm = (x) => (typeof x === 'string' ? [x, x] : [String(x[0]), String(x[1])]);

for (const [journey, secs] of Object.entries(SECTIONS)) {
  sections[journey] = secs.map(([id, title, icon, blurb, keys]) => {
    keys.forEach((k) => {
      const q = EXTRA_Q[k] || Q[k];
      if (!q) throw new Error(`question ${k} is not in the bank`);
      const opts = optionList(k);
      const text = TEXT[k] || q[0].replace(/\s+\?/g, '?').trim();
      const multi = MULTI.has(k) || /all that apply|select all|check all/i.test(q[0]);
      Qout[k] = [text, q[1] || '', multi ? 1 : 0];
      if (opts && !Oout[k]) {
        const o = {};
        for (const [pv, list] of Object.entries(opts)) {
          const l = list.map(norm);
          if (l.length) o[pv] = l;
        }
        Oout[k] = o;
      }
    });
    return { id, title, icon, blurb, keys };
  });
}
// Teen lists: strip adult topics from the shared option lists the Teen set uses.
for (const s of sections.teen) for (const k of s.keys) if (Oout[k]) {
  const o = {};
  for (const [pv, list] of Object.entries(Oout[k])) o[pv] = list.filter(([lab]) => !DROP.test(lab));
  Oout[`teen:${k}`] = o;
}
// Cash never appears as an option anywhere.
for (const k of Object.keys(Oout)) for (const pv of Object.keys(Oout[k])) Oout[k][pv] = Oout[k][pv].filter(([lab]) => !/\bcash\b/i.test(lab));

const usedDeps = new Set(Object.values(Oout.department || {}).flat().map((x) => x[1]));
const jobroleFiles = Object.fromEntries(Object.entries(lazy.jobrole || {}).filter(([d]) => usedDeps.has(d)));
const bank = { v: 1, Q: Qout, O: Oout, sections, jobrole: jobroleFiles, cities: lazy.city || [] };
fs.writeFileSync(path.join(ROOT, 'src/data/welcome/bank.json'), JSON.stringify(bank));

const states = {};
for (const [cc, list] of Object.entries(O[canon('state')] || {})) states[cc] = list.map(norm);
fs.writeFileSync(path.join(ROOT, 'src/data/welcome/states.json'), JSON.stringify(states));
const kb = (f) => (fs.statSync(path.join(ROOT, 'src/data/welcome', f)).size / 1024).toFixed(0) + ' KB';
console.log('welcome bank:', Object.keys(Qout).length, 'questions,', kb('bank.json'), '| states:', Object.keys(states).length, 'countries,', kb('states.json'));
