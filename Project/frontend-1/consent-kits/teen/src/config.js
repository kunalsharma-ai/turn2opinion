// Page configuration. Your backend sets window.T2O_MINOR before the script loads (README → "Integration");
// anything not given falls back to these defaults. Nothing here is secret.
//
// ⚠ LEGAL REVIEW: the agreement ships with placeholders (version, effective date, operator, privacy contact).
// The defaults below fill them with Turn2Opinion public details so the page is usable — your legal team
// must confirm or replace every value marked "LEGAL" before go-live.
const DEFAULTS = {
  // the signed-in teen (sent with the record; never shown beyond the first name and participant ID)
  member: { id: '', firstName: '', age: null, ageBand: '', country: '' },
  // a guardian already captured at sign-up (pre-fills Part B — the consent boxes always start unticked)
  guardian: { name: '', relationship: '', contactType: 'email', contact: '', country: '', verified: false },
  // where the consent record is POSTed (JSON). Blank = no request (demo / preview).
  submitUrl: '/api/minor-consent',
  // GET <statusUrl>?consentId=… → { guardianPermissionStatus, accountActivationStatus } (polled while waiting)
  statusUrl: '/api/minor-consent/status',
  pollMs: 6000,
  headers: {}, // e.g. { 'X-CSRF-Token': '…' }
  continueUrl: '/dashboard', // after the account is activated
  logoutUrl: '/logout', // "Not now" / teen says no → leave
  // versions (bump termsVersion when the meaning changes — families are asked again)
  termsVersion: 'MINOR-2026.10', // LEGAL: "Document version"
  privacyNoticeVersion: '2026.10', // LEGAL
  assentVersion: 'ASSENT-2026.10', // LEGAL: "Assent text version"
  effectiveDate: '2026-10-21', // LEGAL: "Effective date"
  // the legal party and contacts
  operator: 'Frequent Research Fieldwork Solutions Pvt. Ltd. (d/b/a Turn2Opinion)', // LEGAL: "Company"
  website: 'https://www.turn2opinion.com', // LEGAL: "Website"
  supportEmail: 'support@turn2opinion.com',
  privacyEmail: 'support@turn2opinion.com', // LEGAL: "Privacy contact"
  address: 'Mangolpur Kalan, New Delhi 110085, India',
  privacyPolicyUrl: 'https://www.turn2opinion.com/privacy',
  // age range of this programme (subject to local law)
  minAge: 13,
  maxAge: 17,
  // Part B3 optional permissions to show. Only list an activity that is actually proposed (the agreement says so).
  optionalConsents: ['studyContact', 'recording', 'sensitive'],
  // contact methods offered to the guardian (as supported in your country)
  contactTypes: ['email', 'phone'],
  // Part D: the study the teen is about to see (null = an example card with the template placeholders)
  study: null,
  // language: 'auto' = ?lang= → the member's choice on the main site (t2o.lang) → the browser language
  language: 'auto',
  // theme: 'auto' (English → white, other languages → dark, until the member uses the switch) | 'light' | 'dark'
  theme: 'auto',
  // optional machine translation of the FULL legal text (same contract as the website's /api/translate)
  translateUrl: '',
  // where brand/ and fonts/ are served from (embed mode); '' = same folder as the page
  assetBase: '',
  demo: false, // preview only: POST simulated, a "simulate verification" button appears
  onSubmit: null, // optional callbacks (embed): onSubmit(record), onActivated(status), onDecline(reason)
  onActivated: null,
  onDecline: null,
};

export function readConfig() {
  const w = typeof window !== 'undefined' ? window : {};
  const given = w.T2O_MINOR || {};
  const c = { ...DEFAULTS, ...given };
  c.member = { ...DEFAULTS.member, ...(given.member || {}) };
  c.guardian = { ...DEFAULTS.guardian, ...(given.guardian || {}) };
  return c;
}
export const DEFAULT_CONFIG = DEFAULTS;

/** 13–15 / 16–17 / adult / under — from member.age or member.ageBand. */
export function ageBandOf(cfg) {
  const a = Number(cfg.member.age);
  if (Number.isFinite(a) && cfg.member.age !== null && cfg.member.age !== '') {
    if (a < cfg.minAge) return 'under';
    if (a > cfg.maxAge) return 'adult';
    return a <= 15 ? '13–15' : '16–17';
  }
  const b = String(cfg.member.ageBand || '').replace('-', '–');
  if (b === '13–15' || b === '16–17') return b;
  if (b === 'adult' || b === 'under') return b;
  return ''; // unknown → treated as a minor (backend decides who sees this page)
}
