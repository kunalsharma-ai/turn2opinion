// Page configuration. Your backend sets window.T2O_CONSENT before the script loads (see README → "Integration");
// anything not given falls back to these defaults. Nothing here is secret.
const DEFAULTS = {
  // who is agreeing (shown in the greeting, sent with the consent record)
  member: { id: '', firstName: '', email: '', country: '' },
  // where the consent record is POSTed (JSON). Blank = no request (demo / preview).
  submitUrl: '/api/consent',
  // extra request headers, e.g. { 'X-CSRF-Token': '…' }
  headers: {},
  // after agreeing → this URL (blank = stay on the page and show the receipt)
  continueUrl: '/dashboard',
  // "Not now" → sign the member out here
  logoutUrl: '/logout',
  // terms version: bump it when the meaning changes; the backend should ask again when a member's stored version differs
  termsVersion: '2026.10',
  effectiveDate: '2026-10-18',
  lastUpdated: '2026-10-18',
  // the legal party and contacts (fills the placeholders of the terms)
  operator: 'Frequent Research Fieldwork Solutions Pvt. Ltd. (d/b/a Turn2Opinion)',
  website: 'https://www.turn2opinion.com',
  supportEmail: 'support@turn2opinion.com',
  privacyEmail: 'support@turn2opinion.com',
  address: 'Mangolpur Kalan, New Delhi 110085, India',
  privacyPolicyUrl: 'https://www.turn2opinion.com/privacy/',
  cookiePolicyUrl: 'https://www.turn2opinion.com/cookies/',
  // first language: 'auto' = the member's saved choice on the main site (t2o.lang), then the browser language
  language: 'auto',
  // theme: 'auto' (English → light, other languages → dark, until the member picks with the sun/moon switch) | 'light' | 'dark'
  theme: 'auto',
  // optional machine translation of the FULL legal text (same contract as the website's /api/translate)
  translateUrl: '',
  // where /brand, /fonts and /flags are served from (embed mode); '' = same folder as the page
  assetBase: '',
  // preview only: simulate the POST
  demo: false,
  // optional callbacks (embed mode): onAccept(record), onDecline()
  onAccept: null,
  onDecline: null,
};

export function readConfig() {
  const w = typeof window !== 'undefined' ? window : {};
  const c = { ...DEFAULTS, ...(w.T2O_CONSENT || {}) };
  c.member = { ...DEFAULTS.member, ...((w.T2O_CONSENT || {}).member || {}) };
  return c;
}
export const DEFAULT_CONFIG = DEFAULTS;
