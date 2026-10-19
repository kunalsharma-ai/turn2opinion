/* Quality layer sent with every profile (loaded on demand, off the first-paint path):
   validation flags, cross-profile consistency, privacy-conscious device/behaviour signals, verification status,
   completeness and a provisional trust score. The server recomputes the score with IP / device /
   duplicate / history data (server/api-server.mjs, docs/RISK-SCORING.md) and is the source of truth. */
import { collectSignals, guessCountry } from './signals.js';
import { consistency } from './validate/consistency.js';
import { completeness, trustScore } from './validate/risk.js';
import { TZ_COUNTRY } from './validate/tz-country.js';
import { validateEmail } from './validate/email.js';
import { validatePhone } from './validate/phone.js';

let guess;
export const GUESS = () => guess || (guess = typeof navigator !== 'undefined' ? guessCountry(TZ_COUNTRY) : 'US');

export async function buildQuality(x, A) {
  const signals = await collectSignals();
  const em = A.mail ? validateEmail(A.mail) : null, ph = A.phone ? validatePhone(A.phone, { country: A.country }) : null, we = A.workemail ? validateEmail(A.workemail, { work: true }) : null;
  const flags = Object.entries(x.flags).map(([f, v]) => ({ field: f, code: v.code, level: v.level }))
    .concat(consistency(A, { timezone: signals.timezone, phoneCountry: ph && ph.meta && ph.meta.country, workEmailFree: !!(we && we.meta && we.meta.free), category: x.prof.c }).map((c) => ({ ...c, field: c.fields.join(',') })));
  if (em && em.level === 'block') flags.push({ field: 'mail', code: em.code, level: 'block' });
  const verification = { email: A['verify-mail'] || 'unverified', phone: A['verify-phone'] || 'unverified' };
  const trust = trustScore({ verification, flags, signals, hasCountry: !!A.country });
  const tok = (k) => { try { return sessionStorage.getItem('t2o:vtok:' + k); } catch (e) { return null; } };
  return { flags, signals, verification, verificationTokens: { email: tok('email'), phone: tok('phone') }, completeness: completeness(A), trust };
}
