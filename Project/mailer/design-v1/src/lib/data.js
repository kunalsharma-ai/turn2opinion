/**
 * Merge fields — the four lifecycle reminder cases.
 *
 * Same namespaced payload as the MyFrequentRewards lifecycle set (member.*, links.*,
 * profile.*), so one reminder service can feed both panels. Every field has a
 * `default:` filter: a missing value degrades to sensible copy, never to an empty
 * string or a raw field name.
 *
 * Turn2Opinion's profile numbers come from the v6 Profiles & Surveys dashboard
 * (turn2opinion-v6-developer-deliverables):
 *   - 37 items for adult members: 2 "About you" profiles (Basic, Educational) then
 *     35 surveys that open ONE AT A TIME, in a fixed order.
 *   - every completed item = +50 Opinion Points and +1 quality score.
 *   - kingdom levels by items completed: Campsite 0 · Hamlet 1 · Village 2 · Town 5 ·
 *     City 10 · Kingdom 18 · Empire 28 · Legendary Realm (all 37).
 * Points and level are DERIVED in Liquid from profile.completed_count, so the backend
 * sends no new fields.
 */
import { v, isLiquid } from './liquid.js';

export const PORTAL = { name: 'Turn2Opinion', url: 'https://www.turn2opinion.com' };

const utm = (c) => `?utm_source=email&utm_medium=lifecycle&utm_campaign=${c}`;

export const link = {
  setPassword: (c) => v(`links.set_password | default: "${PORTAL.url}/set-password"`, `${PORTAL.url}/set-password${utm(c)}`),
  login:       (c) => v(`links.login | default: "${PORTAL.url}/?login"`, `${PORTAL.url}/?login`),
  terms:       (c) => v(`links.accept_terms | default: "${PORTAL.url}/account/terms"`, `${PORTAL.url}/account/terms${utm(c)}`),
  profiles:    (c) => v(`links.profiles | default: "${PORTAL.url}/member/profiles"`, `${PORTAL.url}/member/profiles${utm(c)}`),
  account:     (c) => v(`links.account | default: "${PORTAL.url}/member"`, `${PORTAL.url}/member${utm(c)}`),
  prefs:       () => v(`preferences_url | default: "${PORTAL.url}/account/preferences"`, `${PORTAL.url}/account/preferences`),
  unsub:       () => v(`unsubscribe_url | default: "${PORTAL.url}/account/preferences"`, `${PORTAL.url}/unsubscribe`),
  help:        () => `${PORTAL.url}/contact`,
  privacy:     () => `${PORTAL.url}/privacy`,
  terms_page:  () => `${PORTAL.url}/terms`,
};

export const mem = {
  first:   () => v('member.first_name | default: "there"', 'Aarav'),
  email:   () => v('member.email', 'aarav.mehta@example.com'),
  id:      () => v('member.member_id | default: "your member ID"', 'T2O-5521-08'),
  country: () => v('member.country | default: "your country"', 'India'),
};

/* ── profiles & the Opinion Kingdom ──────────────────────────────────────── */
export const PER_ITEM = 50;
export const TOTAL = 37;
export const LEVELS = [
  { at: 0, name: 'Campsite', e: '⛺' },
  { at: 1, name: 'Hamlet', e: '🛖' },
  { at: 2, name: 'Village', e: '🏘️' },
  { at: 5, name: 'Town', e: '🏡' },
  { at: 10, name: 'City', e: '🏙️' },
  { at: 18, name: 'Kingdom', e: '🏰' },
  { at: 28, name: 'Empire', e: '👑' },
  { at: 37, name: 'Legendary Realm', e: '🌟' },
];

/** Sample state for the partial-profile case: About you + 2 surveys done. */
export const SAMPLE_DONE = 4;

const done = 'profile.completed_count | default: 0';
export const pf = {
  done:      () => v(done, String(SAMPLE_DONE)),
  total:     () => v(`profile.total_count | default: ${TOTAL}`, String(TOTAL)),
  left:      () => v(`profile.total_count | default: ${TOTAL} | minus: profile.completed_count`, String(TOTAL - SAMPLE_DONE)),
  points:    () => v(`profile.completed_count | default: 0 | times: ${PER_ITEM}`, String(SAMPLE_DONE * PER_ITEM)),
  quality:   () => v(done, String(SAMPLE_DONE)),
  pointsLeft: () => v(`profile.total_count | default: ${TOTAL} | minus: profile.completed_count | times: ${PER_ITEM}`, String((TOTAL - SAMPLE_DONE) * PER_ITEM)),
  percent:   () => v(`profile.percent_complete | default: 0`, String(Math.round((SAMPLE_DONE / TOTAL) * 100))),
  nextName:  () => v('profile.next_name | default: "your next survey"', 'Banking & Financial Services'),
};

/** Index of the current level for a completed count. */
export const levelIndex = (n) => LEVELS.reduce((k, l, i) => (n >= l.at ? i : k), 0);

/**
 * Liquid that prints the member's current level name, derived from the count.
 * In html mode, the sample level.
 */
export const levelName = () => {
  if (!isLiquid()) return LEVELS[levelIndex(SAMPLE_DONE)].name;
  const rev = [...LEVELS].reverse();
  return `{% assign t2o_n = ${done} %}${rev.map((l, i) => `{% ${i === 0 ? 'if' : 'elsif'} t2o_n >= ${l.at} %}${l.name}`).join('')}{% endif %}`;
};

/** Liquid that prints how many more items reach the next level, and its name. */
export const nextLevel = () => {
  if (!isLiquid()) {
    const k = levelIndex(SAMPLE_DONE), nx = LEVELS[Math.min(k + 1, LEVELS.length - 1)];
    return `${nx.at - SAMPLE_DONE} more to reach ${nx.name}`;
  }
  const parts = LEVELS.slice(1).map((l, i) =>
    `{% ${i === 0 ? 'if' : 'elsif'} t2o_n < ${l.at} %}{{ ${l.at} | minus: t2o_n }} more to reach ${l.name}`);
  return `{% assign t2o_n = ${done} %}${parts.join('')}{% else %}Every building raised{% endif %}`;
};

/** Survey order after the About-you profiles (from the dashboard's fixed order). */
export const FIRST_ITEMS = [
  { name: 'Basic', kind: 'About you', q: 19, min: 2, icon: 'user-blue', note: 'Lays the first stone. Opens Educational.' },
  { name: 'Educational', kind: 'About you', q: 13, min: 2, icon: 'cap-blue', note: 'Breaks the seal on surveys.' },
  { name: 'Professional', kind: 'Survey 1', q: 26, min: 3, icon: 'briefcase-navy', note: 'Opens B2B and workplace studies.' },
  { name: 'Financial', kind: 'Survey 2', q: 9, min: 1, icon: 'wallet-mint', note: 'Opens money and payments studies.' },
  { name: 'Banking & Financial Services', kind: 'Survey 3', q: 30, min: 4, icon: 'bank-navy', note: 'Opens banking, cards and insurance studies.' },
  { name: 'Parenting', kind: 'Survey 4', q: 43, min: 6, icon: 'users-violet', note: 'Opens family and childcare studies.' },
  { name: 'Home & Pet Ownership', kind: 'Survey 5', q: 17, min: 2, icon: 'home-mint', note: 'Opens home, appliance and pet studies.' },
];

export { CONDUCT_NOTE } from './fields.js';
