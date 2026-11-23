// Engagement features (Round 17): streaks, quick polls, impact stories, monthly goals, tiers,
// product testing, prize spins, leaderboards, expert badges, benchmarks, donations, certificates,
// Teen learning badges, seasons, guardian summaries and guardian-approved gift cards.
//
// NONE of these has a backend yet (see BACKEND-DEPENDENCIES.md, items 15-32). So:
//   - in the design preview (VITE_DEMO_MODE) they show with the sample data below;
//   - on the live site ENGAGE_LIVE is false and every engagement block renders nothing,
//     so members never see a feature that cannot work. Flip one id in LIVE when its API exists.
// The one exception is instant alerts, which uses the existing communication-methods answer.
import { ENV } from '../../config/env.js';
import { store } from '../../utils/storage.js';
import { demoPrefs } from './demo.js';

/** Features whose API exists. Add an id here (and an adapter in source.js) when the backend ships. */
const LIVE = new Set([
  'alerts',
  // Round 18 features built only from data the site already has (or kept on the device):
  'savings', 'forecast', 'boosters', 'practice', 'share', 'teenInvite', 'wrapped', 'heatmap', 'screenout', 'levelcard', 'datacentre'
]);
export const engageOn = (id) => ENV.DEMO_MODE || LIVE.has(id);

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};
const daysAhead = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

const POLLS = {
  consumer: { id: 'p-c-1', q: 'Which matters most when you choose a new phone?', options: [['battery', 'Battery life', 412], ['camera', 'Camera', 288], ['price', 'Price', 506], ['brand', 'Brand', 131]] },
  pro: { id: 'p-p-1', q: 'Where will your team spend more on technology next year?', options: [['security', 'Security', 318], ['ai', 'AI tools', 402], ['cloud', 'Cloud', 221], ['none', 'No increase', 97]] },
  teen: { id: 'p-t-1', q: 'What’s the best way to learn something new?', options: [['video', 'Short videos', 640], ['friends', 'With friends', 395], ['class', 'In class', 212], ['games', 'Through games', 451]] }
};

const STORIES = {
  consumer: [
    { id: 's1', survey: 'Weekly shopping basket', change: 'A grocery chain added smaller, cheaper pack sizes after members asked for less food waste.', when: daysAgo(40), icon: 'basket' },
    { id: 's2', survey: 'Smartphone upgrade plans', change: 'A phone maker made its battery health report easier to find in settings.', when: daysAgo(75), icon: 'phone' },
    { id: 's3', survey: 'Household cleaning brands', change: 'Refill packs went on sale in more stores, cutting plastic use.', when: daysAgo(120), icon: 'leaf' }
  ],
  pro: [
    { id: 's1', survey: 'Data platform vendor review', change: 'The vendor rewrote its onboarding after IT leads said setup took too long.', when: daysAgo(30), icon: 'database' },
    { id: 's2', survey: 'Security awareness training', change: 'Training was cut into 5-minute modules, matching what respondents asked for.', when: daysAgo(90), icon: 'shield' }
  ],
  teen: [
    { id: 's1', survey: 'Music you love', change: 'A music app added a shared playlist feature for friends, which many of you suggested.', when: daysAgo(20), icon: 'play' },
    { id: 's2', survey: 'How you learn online', change: 'A learning site added shorter lessons and quiz breaks.', when: daysAgo(60), icon: 'cap' }
  ]
};

const FIX = {
  consumer: {
    streak: { days: 4, best: 9, week: [1, 1, 0, 1, 1, 1, 1], bonus: 10, claimed: false },
    goal: { target: 8, bonus: 250 },
    tier: { current: 'silver', surveys: 6 },
    tests: [
      { id: 't1', product: 'New plant-based yoghurt', category: 'Food & Beverages', spots: 40, closes: daysAhead(5), length: '1 week at home', status: 'open' },
      { id: 't2', product: 'Cordless hair styler', category: 'Beauty & Personal Care', spots: 12, closes: daysAhead(9), length: '2 weeks at home', status: 'open' },
      { id: 't3', product: 'Kids’ lunchbox snacks', category: 'Food & Beverages', spots: 25, closes: daysAhead(2), length: '5 days at home', status: 'applied' }
    ],
    spins: 1,
    prizes: ['+25 points', '+50 points', '+10 points', 'Prize draw entry', '+100 points', '+15 points', 'Prize draw entry', '+30 points'],
    board: [
      ['Priya K.', 14],
      ['Marco D.', 11],
      ['Sara L.', 9],
      ['Asha V.', 2, true],
      ['James O.', 2]
    ],
    boardPrize: '1st: 2,000 points · 2nd: 1,000 · 3rd: 500'
  },
  pro: {
    streak: { days: 6, best: 12, week: [1, 1, 1, 1, 1, 1, 0], bonus: 20, claimed: false },
    goal: { target: 4, bonus: 600 },
    experts: [
      { id: 'it', industry: 'Information technology', level: 'Gold', have: 5, goal: 5, unlocks: 'Paid interviews (45–60 min)' },
      { id: 'sec', industry: 'Cybersecurity', level: 'Silver', have: 2, goal: 4, unlocks: 'Focus groups' },
      { id: 'proc', industry: 'Procurement', level: 'Bronze', have: 1, goal: 3, unlocks: 'Advisory panels' }
    ],
    bench: [
      { id: 'cloud', label: 'Cloud budget growth expected', you: 18, peers: 11, unit: '%' },
      { id: 'ai', label: 'Teams already using AI tools', you: 60, peers: 47, unit: '%' },
      { id: 'vendors', label: 'Security vendors in use', you: 4, peers: 6, unit: '' },
      { id: 'remote', label: 'Staff working hybrid', you: 70, peers: 64, unit: '%' }
    ],
    benchPeers: 312,
    charities: [
      { id: 'edu', name: 'Children’s education fund', cause: 'Books and school supplies', icon: 'cap' },
      { id: 'water', name: 'Clean water projects', cause: 'Wells and water filters', icon: 'globe' },
      { id: 'food', name: 'Local food banks', cause: 'Meals for families', icon: 'basket' }
    ],
    certs: [
      { id: 'c1', title: 'Research Contributor · Technology & IT', studies: 5, date: daysAgo(3) },
      { id: 'c2', title: 'Expert Panel Member · Cybersecurity', studies: 2, date: daysAgo(40), locked: true }
    ]
  },
  teen: {
    streak: { days: 3, best: 5, week: [0, 1, 1, 0, 1, 1, 1], bonus: 5, claimed: false },
    goal: { target: 5, bonus: 100 },
    learning: [
      { id: 'young', title: 'Young Researcher', lesson: 'Surveys ask many people the same questions so results are fair. Your honest answer counts as much as anyone’s.', done: true },
      { id: 'sample', title: 'Sample Spotter', lesson: 'A “sample” is the group of people who answer. A good sample looks like the whole group it describes.', done: true },
      { id: 'chart', title: 'Chart Reader', lesson: 'A bar chart compares amounts. Always check what the bars measure and how many people answered.', done: false },
      { id: 'privacy', title: 'Privacy Pro', lesson: 'Researchers see answers, not who you are. Never share passwords or your address in a survey.', done: false }
    ],
    season: {
      name: 'Winter Voices',
      ends: daysAhead(24),
      challenges: [
        { id: 'c1', title: 'Finish 3 surveys', have: 2, goal: 3, pts: 30 },
        { id: 'c2', title: 'Vote in 5 quick polls', have: 1, goal: 5, pts: 20 },
        { id: 'c3', title: 'Earn 2 learning badges', have: 2, goal: 2, pts: 25 }
      ]
    },
    summary: { frequency: 'weekly', last: daysAgo(4), to: 'Meera Shah' },
    cards: [
      { id: 'books', name: 'Bookshop gift card', points: 100, icon: 'cap' },
      { id: 'music', name: 'Music streaming gift card', points: 800, icon: 'play' },
      { id: 'games', name: 'Game store gift card', points: 1000, icon: 'game' }
    ]
  }
};

const hoursAhead = (n) => new Date(Date.now() + n * 36e5).toISOString();

// Round 18 preview data shared by all member types (section pages).
const COMMON = {
  bonus: { mult: 2, ends: hoursAhead(31), surveys: ['Weekend grocery habits', 'Streaming services in 2027'] },
  expiry: { points: 320, on: daysAhead(38) },
  report: { from: 158, to: 168, completed: 5, screened: 1, tip: 'q.tip.speed' },
  trusted: 180,
  milestones: [
    { at: 1, reward: 250 },
    { at: 3, reward: 1000 },
    { at: 5, reward: 2000 },
    { at: 10, reward: 5000 }
  ],
  freshness: { basic: 20, educational: 95, professional: 160, financial: 300, electronics: 245, technology: 40, business: 210, school: 30, hobbies: 400, gaming: 400 },
  linked: { google: false, phone: true },
  prefs: { length: 'any', avoid: [], time: 'evening' },
  quiet: { on: true, from: '22:00', to: '08:00', digest: 'instant' }
};

/** Engagement data for the current member, or null on the live site (feature not built). */
export function engageData(type) {
  if (!ENV.DEMO_MODE) return null;
  const { state } = demoPrefs();
  if (state === 'empty') {
    const f = FIX[type] || FIX.consumer;
    return { ...COMMON, ...f, streak: { ...f.streak, days: 0, week: [0, 0, 0, 0, 0, 0, 0] }, stories: [], tests: [], board: f.board ? [] : undefined, poll: POLLS[type], expiry: null, bonus: null };
  }
  return { ...COMMON, ...(FIX[type] || FIX.consumer), poll: POLLS[type] || POLLS.consumer, stories: STORIES[type] || [] };
}

// Small on-device memory for the preview (votes, claimed bonuses, guardian requests).
const KEY = 't2o_member_engage_demo';
export const engageMemo = {
  get: () => store.get(KEY, {}) || {},
  set: (patch) => store.set(KEY, { ...(store.get(KEY, {}) || {}), ...patch })
};
