/* Two separate scores (never shown as numbers to respondents):
   1. Profile completeness — how much of the member profile is filled in (weighted by area).
   2. Respondent trust / quality score 0–100 — how credible the member is.
        0–30 high risk → block / manual review     31–60 medium → step-up verification (OTP, CAPTCHA)
        61–80 acceptable → allow with monitoring   81–100 trusted → normal participation
   The browser computes a provisional value from what it can see; the server recomputes it with IP, device,
   duplicate and survey-history data (server/api-server.mjs) and is the source of truth. */

export const COMPLETENESS_AREAS = {
  identity: { w: 15, f: ['firstname', 'lastname', 'dob', 'gender', 'add-nationality'] },
  contact: { w: 20, f: ['mail', 'verify-mail', 'phone', 'verify-phone'] },
  geography: { w: 15, f: ['country', 'state', 'city', 'zipcode', 'add-residence', 'add-address1'] },
  demographics: { w: 20, f: ['ethnicity', 'religion', 'relationship', 'education', 'personal-income', 'add-languages'] },
  employment: { w: 15, f: ['empstat', 'industry', 'add-jobtitle', 'add-company', 'orgsize', 'experience'] },
  household: { w: 10, f: ['add-household-size', 'add-household-adults', 'add-housing', 'household-income', 'children-num'] },
  preferences: { w: 5, f: ['add-channels', 'survey-mode', 'survey-participation-timeslot', 'research-panel14'] },
};
const filled = (v) => v != null && v !== '' && v !== 'skipped' && !(Array.isArray(v) && !v.length);

export function completeness(A) {
  let total = 0; const areas = {};
  for (const [k, { w, f }] of Object.entries(COMPLETENESS_AREAS)) {
    const got = f.filter((n) => (n.startsWith('verify-') ? A[n] === 'verified' : filled(A[n]))).length;
    areas[k] = Math.round(got / f.length * 100);
    total += w * got / f.length;
  }
  return { score: Math.round(total), areas };
}

/* Score factors. Weights are deliberately kept server-side in production; these defaults mirror the policy. */
export const FACTORS = {
  email_verified: 10, phone_verified: 10, geo_consistent: 10, established: 5, good_history: 15,
  duplicate: -20, disposable: -20, datacenter_ip: -10, vpn: -5, multiple_accounts: -30, inconsistency: -10, bot: -30,
  too_fast: -10, paste_identity: -5, soft_flags: -2,
};
export function trustScore(input) {
  const { verification = {}, flags = [], signals = {}, server = {} } = input;
  let s = 60; const why = [];   // neutral start: a clean, unverified newcomer lands in 'acceptable'
  const add = (k, n = 1) => { s += FACTORS[k] * n; why.push(k); };
  if (verification.email === 'verified') add('email_verified');
  if (verification.phone === 'verified') add('phone_verified');
  const geo = flags.filter((f) => /^geo_/.test(f.code));
  if (!geo.length && input.hasCountry) add('geo_consistent');
  if (flags.some((f) => f.code === 'email_disposable')) add('disposable');
  if (flags.some((f) => /^(age_|work_|hh_|geo_state)/.test(f.code))) add('inconsistency');
  if (signals.bot) add('bot');
  if (signals.tooFast) add('too_fast');
  if (signals.pasteIdentity) add('paste_identity');
  if (signals.deviceAccounts > 2) add('multiple_accounts');
  const softs = flags.filter((f) => f.level === 'soft').length;
  if (softs) { s += FACTORS.soft_flags * Math.min(softs, 5); why.push('soft_flags'); }
  if (server.datacenter) add('datacenter_ip');
  if (server.vpn || server.proxy || server.tor) add('vpn');
  if (server.duplicate) add('duplicate');
  if (server.established) add('established');
  if (server.goodHistory) add('good_history');
  s = Math.max(0, Math.min(100, Math.round(s)));
  const band = s <= 30 ? 'high_risk' : s <= 60 ? 'medium' : s <= 80 ? 'acceptable' : 'trusted';
  const action = { high_risk: 'review', medium: 'stepup', acceptable: 'monitor', trusted: 'allow' }[band];
  return { score: s, band, action, factors: why };
}
