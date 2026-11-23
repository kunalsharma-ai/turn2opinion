// PREVIEW-ONLY questions, options and answers for the Profiles and Surveys pages (VITE_DEMO_MODE).
// Shapes match what /api/v1/question, /api/v1/option/:name, /api/v1/me and PUT /api/v1/me/survey
// return, so the same screens run on real data unchanged. Production builds never call this.
import { adaptOptions, adaptQuestion } from './source.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const opts = (...l) => l.map((x) => (Array.isArray(x) ? { label: x[0], value: x[1], isExclusive: !!x[2], describeLabel: x[3] || '' } : { label: x, value: x.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
const FREQ = opts('Every day', 'A few times a week', 'Once a week', 'A few times a month', 'Rarely', 'Never');
const SPEND = opts('Less than 1,000', '1,000 – 4,999', '5,000 – 14,999', '15,000 – 49,999', '50,000 or more');

// name -> [label, type, options?, extra?]
const Q = {
  gender: ['Which of these best describes you?', 'select', opts('Male', 'Female', 'Non-binary', ['Prefer not to say', 'prefer_not_to_say'])],
  age: ['How old are you?', 'text', null, { pattern: '^[0-9]{1,3}$' }],
  marital: ['What is your marital status?', 'select', opts('Single', 'Married', 'Living with partner', 'Separated', 'Divorced', 'Widowed')],
  country: ['Which country do you live in?', 'select', opts('India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Singapore', 'United Arab Emirates')],
  state: ['Which state or region?', 'select', null, { parent: 'country' }],
  city: ['Which city or town?', 'text', null, { pattern: "^[A-Za-zÀ-ÿ .'-]{2,60}$" }],
  phone: ['Mobile number', 'phone'],
  'alternate-phone': ['Alternate number', 'phone', null, { required: false }],
  'communication-methods': ['How should we tell you about new surveys?', 'checkbox', opts(['Email', 'email'], ['SMS', 'sms'], ['WhatsApp', 'whatsapp'], ['Dashboard alerts', 'dashboard'])],
  education: ['What is your highest level of education?', 'select', opts('Secondary school', 'Higher secondary', 'Diploma', "Bachelor's degree", "Master's degree", 'Doctorate')],
  field: ['What did you study?', 'select', opts('Arts & humanities', 'Business & commerce', 'Engineering & technology', 'Medicine & health', 'Science', 'Law'), { hasOthers: true }],
  studying: ['Are you studying right now?', 'select', opts('Yes, full-time', 'Yes, part-time', 'No')],
  languages: ['Which languages do you speak? (up to 3)', 'multiselect', opts('English', 'Hindi', 'Spanish', 'French', 'German', 'Arabic', ['Another language', 'other', false, 'Which language?']), { maxSelections: '3' }],
  empstat: ['What is your employment status?', 'select', opts('Employed full-time', 'Employed part-time', 'Self-employed', 'Student', 'Homemaker', 'Retired', 'Not working')],
  industry: ['Which industry do you work in?', 'select', opts('Information technology', 'Banking & finance', 'Healthcare', 'Retail', 'Manufacturing', 'Education', 'Government'), { hasOthers: true, parent: 'empstat' }],
  jobrole: ['What is your job title?', 'text', null, { parent: 'empstat', pattern: '^.{2,80}$' }],
  'add-seniority': ['What is your level?', 'select', opts('Entry level', 'Mid level', 'Senior', 'Manager', 'Senior manager', 'Director', 'C-level / owner'), { parent: 'empstat' }],
  orgsize: ['How many people work at your organisation?', 'select', opts('1 – 9', '10 – 49', '50 – 249', '250 – 999', '1,000 – 4,999', '5,000 or more'), { parent: 'empstat' }],
  department: ['Which areas are you involved in?', 'multiselect', opts('IT', 'Finance', 'HR', 'Marketing', 'Operations', 'Sales', 'Procurement'), { hasNone: true, parent: 'empstat' }],
  income: ['What is your household income per year?', 'select', opts('0 - 300000', '300001 - 600000', '600001 - 1200000', '1200001 - 2500000', '2500001+'), { isMoney: true, hasSkip: true }],
  banking: ['Which of these do you have?', 'multiselect', opts('Savings account', 'Credit card', 'Home loan', 'Car loan', 'Personal loan', ['None of these', 'none_of_the_above', true])],
  invest: ['Where do you invest?', 'multiselect', opts('Stocks', 'Mutual funds', 'Fixed deposits', 'Gold', 'Crypto', 'Property'), { hasSkip: true }],
  insurance: ['Which insurance do you hold?', 'checkbox', opts('Health', 'Life', 'Car', 'Home', 'Travel')],
  school: ['Which grade are you in?', 'select', opts('Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12')],
  subjects: ['Your favourite subjects', 'multiselect', opts('Maths', 'Science', 'Languages', 'Art', 'Sport', 'Computers'), { maxSelections: '3' }],
  learnonline: ['How often do you learn online?', 'select', FREQ],
  hobbies: ['What do you enjoy in your free time?', 'multiselect', opts('Music', 'Reading', 'Sport', 'Drawing', 'Gaming', 'Dancing', 'Coding'), { hasOthers: true }],
  hobbytime: ['How much free time do you have on a school day?', 'select', opts('Under 1 hour', '1 – 2 hours', '2 – 4 hours', 'More than 4 hours')],
  gamingdevice: ['Where do you play games?', 'multiselect', opts('Phone', 'Console', 'PC', 'Tablet', ['I don’t play games', 'none_of_the_above', true])],
  gamingtime: ['How often do you play?', 'select', FREQ]
};
const STATES = {
  india: opts('Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'West Bengal'),
  'united-states': opts('California', 'New York', 'Texas', 'Florida', 'Illinois'),
  'united-kingdom': opts('England', 'Scotland', 'Wales', 'Northern Ireland'),
  canada: opts('Ontario', 'Quebec', 'British Columbia', 'Alberta'),
  australia: opts('New South Wales', 'Victoria', 'Queensland'),
  germany: opts('Bavaria', 'Berlin', 'Hesse'),
  france: opts('Île-de-France', 'Provence', 'Occitanie'),
  singapore: opts('Central', 'East', 'North', 'West'),
  'united-arab-emirates': opts('Dubai', 'Abu Dhabi', 'Sharjah')
};

// topic profiles ("surveys" on the live Surveys page): generated from a noun and a list of brands
const TOPICS = [
  ['parenting', 'parenting', 'parenting products', opts('Baby food', 'Diapers', 'Toys', 'School supplies', 'Kids clothing')],
  ['consumer-electronics', 'consumer electronics', 'electronics', opts('Smartphone', 'Laptop', 'Smart TV', 'Smartwatch', 'Headphones')],
  ['shopping', 'shopping & retail', 'shopping', opts('Supermarkets', 'Online marketplaces', 'Malls', 'Local stores', 'Quick commerce')],
  ['banking-financial-services', 'banking & financial services', 'banking', opts('Mobile banking', 'UPI / wallets', 'Credit cards', 'Investing apps', 'Branch visits')],
  ['technology-digital-services', 'technology & digital services', 'digital services', opts('Cloud storage', 'Streaming', 'Food delivery apps', 'Ride hailing', 'AI assistants')],
  ['fashion-apparel', 'fashion & apparel', 'clothes', opts('Casual wear', 'Formal wear', 'Sportswear', 'Ethnic wear', 'Footwear')],
  ['beauty-personal-care', 'beauty & personal care', 'beauty products', opts('Skincare', 'Haircare', 'Make-up', 'Fragrance', 'Grooming')],
  ['food-beverages', 'food & beverages', 'food and drinks', opts('Packaged snacks', 'Soft drinks', 'Coffee & tea', 'Ready meals', 'Dairy')],
  ['travel-tourism', 'travel & tourism', 'trips', opts('Flights', 'Hotels', 'Trains', 'Holiday packages', 'Road trips')],
  ['home-pet', 'home & pet ownership', 'pet products', opts('Dog', 'Cat', 'Fish', 'Bird', ['No pets', 'none_of_the_above', true])],
  ['home-household', 'home & household', 'household products', opts('Cleaning', 'Kitchen appliances', 'Furniture', 'Home décor', 'Laundry')],
  ['gaming-esports', 'gaming & esports', 'games', opts('Mobile games', 'Console games', 'PC games', 'Esports viewing', 'Game streaming')]
];
const PRO_TOPICS = [
  ['technology-it', 'technology & it', 'IT products', opts('Cloud platforms', 'Security tools', 'Data platforms', 'Collaboration suites', 'ERP')],
  ['business-decisions', 'business decisions', 'business purchases', opts('Software', 'Hardware', 'Consulting', 'Marketing services', 'Logistics')],
  ['hr-workplace', 'hr & workplace', 'workplace tools', opts('Hiring platforms', 'Payroll', 'Learning tools', 'Wellbeing apps')]
];
const TEEN_TOPICS = [
  ['snacks-drinks', 'snacks & drinks', 'snacks', opts('Chips', 'Chocolate', 'Juice', 'Ice cream', 'Biscuits')],
  ['music-media', 'music & media', 'music apps', opts('Music streaming', 'Video apps', 'Podcasts', 'Radio')],
  ['sports-fitness', 'sports & fitness', 'sports', opts('Cricket', 'Football', 'Basketball', 'Swimming', 'Badminton')]
];
TOPICS.concat(PRO_TOPICS, TEEN_TOPICS).forEach(([slug, , noun, brands]) => {
  Q[`${slug}-freq`] = [`How often do you buy or use ${noun}?`, 'select', FREQ];
  Q[`${slug}-which`] = [`Which of these do you use?`, 'multiselect', brands, { hasOthers: true }];
  Q[`${slug}-spend`] = [`About how much do you spend on ${noun} in a month?`, 'select', SPEND, { required: false }];
  Q[`${slug}-plan`] = [`Do you plan to try something new in ${noun} in the next 3 months?`, 'select', opts('Yes, definitely', 'Maybe', 'No')];
});

const ABOUT = {
  consumer: [
    ['basic', 'basic', [['About you', 'gender', 'age', 'marital'], ['Where you live', 'country', 'state', 'city'], ['Staying in touch', 'phone', 'alternate-phone', 'communication-methods']]],
    ['educational', 'educational', [['Your studies', 'education', 'field', 'studying'], ['Languages', 'languages']]],
    ['professional', 'professional', [['Your work', 'empstat', 'industry', 'jobrole'], ['Your organisation', 'add-seniority', 'orgsize', 'department']]],
    ['financial', 'financial', [['Money matters', 'income', 'banking'], ['Saving and cover', 'invest', 'insurance']]]
  ],
  teen: [
    ['basic', 'basic', [['About you', 'gender', 'age'], ['Where you live', 'country', 'state', 'city'], ['Staying in touch', 'communication-methods']]],
    ['school', 'school & learning', [['School', 'school', 'subjects', 'learnonline']]],
    ['hobbies', 'hobbies', [['Free time', 'hobbies', 'hobbytime']]],
    ['gaming', 'gaming', [['Games', 'gamingdevice', 'gamingtime']]]
  ]
};
ABOUT.pro = ABOUT.consumer;
const topicPages = (slug) => [[`Your habits`, `${slug}-freq`, `${slug}-which`], ['Spending and plans', `${slug}-spend`, `${slug}-plan`]];

/** Raw /api/v1/profile list for a preview member type (status filled in from the answers below). */
export function demoProfileList(as) {
  const topics = as === 'pro' ? PRO_TOPICS : as === 'teen' ? TEEN_TOPICS : TOPICS;
  return [
    ...ABOUT[as].map(([slug, name, pages]) => ({ slug, name, pages, points: 50 })),
    ...topics.map(([slug, name]) => ({ slug, name, pages: topicPages(slug), points: 50 }))
  ];
}

// starting answers per preview member: which profiles are (partly) done
const SEED = {
  consumer: { gender: 'female', marital: 'single', country: 'india', state: 'maharashtra', city: 'Pune', phone: '919810012345', 'communication-methods': ['email', 'dashboard'], education: 'master-s-degree', field: 'business-commerce', studying: 'no', languages: ['english', 'hindi'], empstat: 'employed-full-time', industry: 'retail', 'consumer-electronics-freq': 'a-few-times-a-month' },
  pro: { gender: 'male', marital: 'married', country: 'united-kingdom', state: 'england', city: 'Manchester', phone: '447700900123', 'communication-methods': ['email', 'dashboard', 'whatsapp'], education: 'master-s-degree', field: 'engineering-technology', studying: 'no', languages: ['english'], empstat: 'employed-full-time', industry: 'information-technology', jobrole: 'Head of IT infrastructure', 'add-seniority': 'senior-manager', orgsize: '1-000-4-999', department: ['it', 'procurement'], income: '2500001+', banking: ['savings-account', 'credit-card'], 'technology-it-freq': 'every-day', 'technology-it-which': ['cloud-platforms', 'security-tools'], 'technology-it-plan': 'maybe', 'business-decisions-freq': 'once-a-week' },
  teen: { gender: 'female', country: 'india', state: 'maharashtra', city: 'Pune', 'communication-methods': ['email', 'dashboard'], school: 'grade-10' }
};
let store = null;
let who = 'consumer';
const KEY = 't2o_member_demo_answers';
function answers() {
  if (store) return store;
  try {
    const prefs = JSON.parse(localStorage.getItem('t2o_member_demo') || '{}');
    who = prefs.as || 'consumer';
    const saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    store = saved && saved.who === who && !(prefs.state === 'empty') ? saved.a : prefs.state === 'empty' ? {} : { ...SEED[who] };
  } catch {
    store = { ...SEED.consumer };
  }
  return store;
}
function persist() {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ who, a: store }));
  } catch {
    /* preview only */
  }
}
const filled = (v) => !(v == null || v === '' || (Array.isArray(v) && !v.length));

/** Completion % per profile slug, the way the backend counts it: applicable questions answered. */
export function demoStatus(list) {
  const a = answers();
  const out = {};
  list.forEach((p) => {
    const names = p.pages.flatMap((pg) => pg.slice(1)).filter((n) => {
      const parent = Q[n]?.[3]?.parent;
      return !parent || filled(a[parent]);
    });
    const done = names.filter((n) => filled(a[n])).length;
    out[p.slug] = done ? Math.round((done / names.length) * 100) : -1;
  });
  return out;
}

export async function demoQuestion(name) {
  await wait(60);
  const q = Q[name];
  if (!q) return null;
  const [label, type, , extra = {}] = q;
  return adaptQuestion({ name, label, type, isRequired: extra.required ?? true, ...(extra.parent ? { parent: extra.parent } : {}), hasOthers: extra.hasOthers, hasNone: extra.hasNone, hasSkip: extra.hasSkip, maxSelections: extra.maxSelections || '0', isMoney: extra.isMoney, isEditable: true, size: '6' });
}
export async function demoOptions(q, parentValue) {
  await wait(80);
  const def = Q[q.name];
  if (!def) return [];
  if (['select', 'multiselect', 'checkbox', 'radio'].includes(q.type)) {
    if (q.name === 'state') return adaptOptions(STATES[parentValue] || []);
    if (q.parent && !filled(parentValue)) return [];
    if (q.parent === 'empstat' && /student|homemaker|retired|not-working/.test(parentValue)) return [];
    return adaptOptions(def[2] || []);
  }
  if (q.parent === 'empstat' && /student|homemaker|retired|not-working/.test(parentValue)) return null;
  return def[3]?.pattern ? { pattern: def[3].pattern } : null;
}
export async function demoAnswers(questions) {
  await wait(120);
  const a = answers();
  const out = {};
  questions.forEach((n) => {
    if (filled(a[n])) out[n] = a[n];
  });
  return out;
}
export async function demoSave(values) {
  await wait(450);
  const a = answers();
  Object.entries(values).forEach(([k, v]) => {
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
  return {
    slug,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()),
    respID: 'DEMO-RESP-2',
    description:
      '<p><strong>Thanks for taking part.</strong> This short survey asks about your everyday habits. There are no right or wrong answers, so please answer honestly.</p><p>Your answers are confidential and reported only in combination with others.</p>',
    pages: [
      ['Your habits', 'food-beverages-freq', 'food-beverages-which'],
      ['A little more', 'food-beverages-spend', 'food-beverages-plan']
    ],
    thankyou: '<p><strong>Thank you!</strong> Your answers are in. Points for this survey appear in your activity once the study team confirms your response.</p>'
  };
}
