// PREVIEW-ONLY member data, used when VITE_DEMO_MODE=true (the single-file design preview has no
// server). Shapes match what the real endpoints return after the adapters in source.js.
// Production builds never call this.
import { store } from '../../utils/storage.js';
import { adaptActivity, adaptAlerts, adaptGuardian, adaptMe, adaptPoints, adaptProfiles, adaptReferrals, adaptSocials, adaptStats, adaptSurveys } from './source.js';

const KEY = 't2o_member_demo';
export const demoPrefs = () => ({ as: 'consumer', state: 'ready', ...(store.get(KEY, {}) || {}) });
export const setDemoPrefs = (p) => {
  store.set(KEY, { ...demoPrefs(), ...p });
  window.location.reload();
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const daysAgo = (n, h = 10) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, 20, 0, 0);
  return d.toISOString();
};

const PEOPLE = {
  consumer: { _id: 'demo-consumer', respondentID: 'T2O-C-208431', category: 'b2c', name: { salutation: 'Ms.', first: 'Asha', last: 'Verma' }, mail: 'asha.verma@example.com', phone: '919810012345', dob: '1994-05-10', gender: 'Female', createdAt: daysAgo(64), qualityScore: 168, address: [{ tag: 'Home', country: 'in', state: 'IN-MH', city: 'pune', zipcode: '411001' }], terms: ['terms', 'privacy', 'age', 'marketing'] },
  pro: { _id: 'demo-pro', respondentID: 'T2O-B-104227', category: 'b2b', name: { salutation: 'Mr.', first: 'Daniel', last: 'Okafor' }, mail: 'daniel.okafor@example.com', phone: '447700900123', dob: '1985-11-02', gender: 'Male', createdAt: daysAgo(210), qualityScore: 186, address: [{ tag: 'Home', country: 'gb', state: 'England', city: 'manchester', zipcode: 'M1 1AE' }], terms: ['terms', 'privacy', 'accuracy', 'confidential', 'interviews'] },
  teen: { _id: 'demo-teen', respondentID: 'T2O-TN-4F2A9C', category: 'minor', name: { salutation: 'Ms.', first: 'Riya', last: 'Shah' }, mail: 'riya@example.com', dob: '2011-03-14', gender: 'Female', createdAt: daysAgo(12), qualityScore: 112, address: [{ tag: 'Home', country: 'in', state: 'IN-MH', city: 'pune', zipcode: '411001' }], terms: [] }
};

const SURVEYS = {
  consumer: [
    { _id: 's1', name: 'Weekend grocery habits', slug: 'grocery-habits', points: 120, loi: 5, surveyCategory: 'Food & Beverages', source: 'internal', createdAt: daysAgo(0, 8) },
    { _id: 's2', name: 'Streaming services in 2027', slug: 'streaming-2027', points: 650, loi: 14, surveyCategory: 'Media & Entertainment', source: 'external', createdAt: daysAgo(1) },
    { _id: 's3', name: 'Your morning skincare', slug: 'skincare', points: 90, loi: 4, surveyCategory: 'Beauty & Personal Care', source: 'internal', createdAt: daysAgo(2) },
    { _id: 's4', name: 'Electric scooters: first impressions', slug: 'e-scooters', points: 300, loi: 9, surveyCategory: 'Travel & Tourism', source: 'external', createdAt: daysAgo(3) },
    { _id: 's5', name: 'Online banking apps', slug: 'banking-apps', points: 220, loi: 7, surveyCategory: 'Banking & Financial Services', source: 'internal', createdAt: daysAgo(4) }
  ],
  pro: [
    { _id: 'p1', name: 'Cloud cost management priorities', slug: 'cloud-cost', points: 1500, loi: 18, surveyCategory: 'Technology & IT', source: 'external', createdAt: daysAgo(0, 9) },
    { _id: 'p2', name: 'Cybersecurity budget planning 2027', slug: 'cyber-budget', points: 1200, loi: 15, surveyCategory: 'Technology & IT', source: 'external', createdAt: daysAgo(1) },
    { _id: 'p3', name: 'Procurement tools for mid-size firms', slug: 'procurement', points: 800, loi: 12, surveyCategory: 'Operations', source: 'internal', createdAt: daysAgo(3) },
    { _id: 'p4', name: 'Hybrid work: one year on', slug: 'hybrid-work', points: 400, loi: 6, surveyCategory: 'HR & Workplace', source: 'internal', createdAt: daysAgo(5) }
  ],
  teen: [
    { _id: 't1', name: 'Gaming with friends', slug: 'teen-gaming', points: 80, loi: 5, surveyCategory: 'Gaming', source: 'internal', createdAt: daysAgo(0, 9) },
    { _id: 't2', name: 'Your favourite snacks', slug: 'teen-snacks', points: 60, loi: 4, surveyCategory: 'Food', source: 'internal', createdAt: daysAgo(1) },
    { _id: 't3', name: 'How you learn online', slug: 'teen-learning', points: 120, loi: 8, surveyCategory: 'Education', source: 'internal', createdAt: daysAgo(2) }
  ]
};

const ACTIVITY = {
  consumer: [
    ['complete', 'Coffee shop visits', 150, 0],
    ['complete', 'Basic profile', 50, 1],
    ['terminate', 'Car insurance renewal', 0, 2],
    ['complete', 'Smartphone upgrade plans', 220, 4],
    ['dropout', 'Holiday travel 2027', 0, 6],
    ['complete', 'Educational profile', 50, 8],
    ['complete', 'Weekly shopping basket', 120, 11],
    ['complete', 'Household cleaning brands', 90, 15]
  ],
  pro: [
    ['complete', 'Data platform vendor review', 1200, 0],
    ['complete', 'Professional profile', 50, 2],
    ['complete', 'IT hiring outlook', 600, 6],
    ['terminate', 'ERP migration (finance leads)', 0, 9],
    ['complete', 'Remote collaboration tools', 400, 14],
    ['complete', 'Security awareness training', 900, 21]
  ],
  teen: [
    ['complete', 'Basic profile', 50, 0],
    ['complete', 'Music you love', 70, 2],
    ['dropout', 'School lunch ideas', 0, 3]
  ]
};

const PROFILES = {
  consumer: [['basic', 'Basic', 100], ['educational', 'Educational', 100], ['professional', 'Professional', 60], ['financial', 'Financial', -1], ['parenting', 'Parenting', -1], ['electronics', 'Consumer Electronics', 40]],
  pro: [['basic', 'Basic', 100], ['educational', 'Educational', 100], ['professional', 'Professional', 100], ['financial', 'Financial', 80], ['technology', 'Technology & IT', 100], ['business', 'Business Decisions', 70]],
  teen: [['basic', 'Basic', 100], ['school', 'School & Learning', 30], ['hobbies', 'Hobbies', -1], ['gaming', 'Gaming', -1]]
};

const POINTS = { consumer: [730, 15000], pro: [8650, 15000], teen: [120, 15000] };
const STATS = { consumer: { total: 8, complete: 6, disqualified: 1, abdoned: 1, points: 730 }, pro: { total: 6, complete: 5, disqualified: 1, abdoned: 0, points: 3150 }, teen: { total: 3, complete: 2, disqualified: 0, abdoned: 1, points: 120 } };

const ANSWERS = {
  consumer: { 'communication-methods': ['email', 'dashboard'] },
  pro: { 'communication-methods': ['email', 'dashboard', 'whatsapp'], empstat: 'Employed full-time', industry: 'Information technology', 'add-seniority': 'Senior manager', orgsize: '1,000 – 4,999 employees', jobrole: 'Head of IT infrastructure', orgdecision: ['Final decision maker'] },
  teen: { 'communication-methods': ['email', 'dashboard'] }
};

export async function demoSection(name, ctx = {}) {
  const { as, state } = demoPrefs();
  if (name === 'upload') {
    await wait(900);
    return URL.createObjectURL(ctx.file);
  }
  if (state === 'loading' && name !== 'me') return new Promise(() => {});
  await wait(name === 'me' ? 250 : 500 + Math.random() * 500);
  if (state === 'error' && name !== 'me') throw new Error('Preview: simulated error');
  const empty = state === 'empty';
  const p = PEOPLE[as] || PEOPLE.consumer;
  switch (name) {
    case 'me':
      return adaptMe(empty ? { ...p, qualityScore: 100 } : p);
    case 'points':
      return adaptPoints({ respPoints: empty ? 0 : POINTS[as][0], redeemPoints: 0, totalPoints: empty ? 0 : POINTS[as][0], threshold: POINTS[as][1], conversionRate: 0.001 });
    case 'stats':
      return adaptStats(empty ? {} : STATS[as]);
    case 'surveys':
      return adaptSurveys(empty ? [] : SURVEYS[as]);
    case 'profiles':
      return adaptProfiles(PROFILES[as].map(([slug, n, s]) => ({ slug, name: n, status: empty ? -1 : s })));
    case 'activity':
      return adaptActivity(empty ? [] : ACTIVITY[as].map(([status, n, pts, d], i) => ({ _id: `a${i}`, status, survey: { name: n, slug: n }, points: pts, timeline: { start: daysAgo(d, 9), end: daysAgo(d, 10) } })));
    case 'referrals':
      return adaptReferrals(
        empty || as === 'teen' ? [] : [{ email: 'maya@example.com', createdAt: daysAgo(20) }, { email: 'tom@example.com', createdAt: daysAgo(9) }, { email: 'li.wei@example.com', createdAt: daysAgo(2) }],
        empty || as === 'teen' ? [] : [{ mail: 'maya@example.com', fullName: 'Maya R.', createdAt: daysAgo(18), isVerified: { email: 'verified' } }, { mail: 'tom@example.com', fullName: 'Tom B.', createdAt: daysAgo(8), isVerified: { email: 'unverified' } }],
        ctx.me
      );
    case 'alerts':
      return adaptAlerts(empty ? [] : [
        { _id: 'n1', title: as === 'pro' ? 'New study: Cloud cost management' : as === 'teen' ? 'New survey: Gaming with friends' : 'New survey: Weekend grocery habits', subtitle: 'Matched to your profile. About 5 minutes.', createdAt: daysAgo(0, 8) },
        { _id: 'n2', title: 'Points credited', subtitle: '+150 points for “Coffee shop visits”.', createdAt: daysAgo(0, 7) },
        { _id: 'n3', title: 'Finish your Financial profile', subtitle: 'Complete profiles unlock more surveys.', createdAt: daysAgo(3) }
      ]);
    case 'guardian':
      return as === 'teen' ? adaptGuardian({ guardian: { relation: 'mother', name: { first: 'Meera', last: 'Shah' }, approvedAt: daysAgo(12, 18) }, consents: [{ who: 'guardian', version: 'MINOR-2026.10', at: daysAgo(12, 18) }] }) : null;
    case 'socials':
      return adaptSocials([
        { platform: 'Instagram', url: 'https://www.instagram.com/', points: 50, status: 'rewarded' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/', points: 50, status: 'pending' },
        { platform: 'YouTube', url: 'https://www.youtube.com/', points: 50, status: 'not_started' },
        { platform: 'Facebook', url: 'https://www.facebook.com/', points: 50, status: 'not_started' }
      ]);
    case 'answers':
      return ANSWERS[as] || {};
    default:
      return null;
  }
}
