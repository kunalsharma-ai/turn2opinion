// Builds the sign-up welcome questionnaires from the ORIGINAL Turn2Opinion profile question bank
// (public/profiles/data/core.json, the same file the member profiles use). Question keys, option
// labels and option values are kept as they are in the bank, so the answers saved at sign-up land
// in the same Answer records the member profiles read. Only a few display texts are tidied (typos),
// and the Teen set adds two school questions the bank does not have.
//   node scripts/build-welcome-bank.mjs   ->  src/data/welcome/bank.json + states.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const core = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/profiles/data/core.json'), 'utf8'));
const { Q, O, A = {}, L = {}, lazy = {} } = core;
const canon = (k) => { const c = A[k] || k; return L[c] || c; };

// Sections per journey: [id, title, icon, blurb, [question keys]]
const SECTIONS = {
  consumer: [
    ['home', 'Home & household', 'home', 'Who you live with and where. Brands design products around real households.', ['relationship', 'children-num', 'add-housing', 'rural', 'household-income']],
    ['work', 'Study & work', 'briefcase', 'Your day job (or school) decides a lot of the studies that fit you.', ['education', 'empstat', 'industry', 'jobseeker']],
    ['shop', 'How you shop', 'bag', 'The biggest share of consumer surveys is about buying things.', ['shopping24', 'shopping22', 'shopping25', 'shopping26', 'add-decisions']],
    ['free', 'Free time', 'sparkle', 'Hobbies, food and travel: the fun surveys start here.', ['lifestyle_1', 'lifestyle_8', 'food4', 'sports25', 'travel13']],
    ['tech', 'Screens & tech', 'phone', 'Phones, apps, streaming and games you use today.', ['mobile1', 'mobile11', 'tech1', 'media6', 'media8', 'gaming0', 'gaming1']],
    ['research', 'Your research style', 'chat', 'How you like to take part, so we only invite you to formats you enjoy.', ['add-primary-language', 'research-panel1', 'research-panel3', 'research-panel6']]
  ],
  pro: [
    ['role', 'Your role', 'briefcase', 'Employment, industry and job title decide which B2B studies you qualify for.', ['empstat', 'freelancer', 'jobseeker', 'unemp-industry', 'industry', 'sector', 'department', 'jobrole', 'add-seniority', 'experience']],
    ['org', 'Your organisation', 'building', 'Company size and reach. We never contact your employer.', ['orgsize', 'organization-revenue', 'orgoverseas']],
    ['decide', 'Decisions you make', 'target', 'Decision-makers are the most wanted voices in business research.', ['orgdecision', 'orgspend', 'add-b2b-influence']],
    ['background', 'Background & formats', 'book', 'Education, languages and the research formats you are open to.', ['education', 'add-languages', 'research-panel1', 'research-panel7', 'research-panel8']]
  ],
  teen: [
    ['school', 'School life', 'book', 'Your class and favourite subjects. Nothing about which school you go to.', ['teen-school-level', 'teen-subjects']],
    ['interests', 'What you are into', 'sparkle', 'Music, movies and sport: the topics brands most want teen opinions on.', ['lifestyle_1', 'lifestyle_8', 'lifestyle_3', 'sports25', 'sports26', 'sports27']],
    ['screens', 'Screens & gaming', 'phone', 'Phones, social apps, streaming and games.', ['mobile1', 'mobile11', 'media6', 'media8', 'gaming0', 'gaming1', 'gaming2', 'gaming7']],
    ['shop', 'Shopping', 'bag', 'What you buy and how often. No money details asked.', ['shopping24', 'shopping25']],
    ['research', 'Survey style', 'chat', 'Language and topics, so your invitations fit you.', ['add-primary-language', 'research-panel3']]
  ]
};

// Questions the bank does not have (Teen only). Same shape as the bank: [text, parent].
const EXTRA_Q = {
  'teen-school-level': ['Which year of school are you in?', ''],
  'teen-subjects': ['Which subjects do you enjoy most? Select all that apply.', '']
};
const EXTRA_O = {
  'teen-school-level': { '': ['Middle school (grades 6 to 8)', 'High school (grades 9 and 10)', 'Senior high school (grades 11 and 12)', 'Junior college / pre-university', 'Homeschooled', 'Not in school right now'] },
  'teen-subjects': { '': ['Maths', 'Science', 'Computers & coding', 'English & literature', 'Languages', 'History & social studies', 'Business & economics', 'Art & design', 'Music', 'Drama & media', 'Sport & PE', 'Something else'] }
};

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
