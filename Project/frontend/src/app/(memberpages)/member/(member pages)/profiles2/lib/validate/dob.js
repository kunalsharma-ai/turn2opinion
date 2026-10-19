/* Date of birth (DD / MM / YYYY) → age. The browser checks it for instant feedback; the server
   recalculates age from the stored ISO date (never trusts a client-sent age).
   block: invalid / impossible / future date, outside the profile's age band;
   stepup: below the age of majority for the respondent's country → parental consent needed;
   soft: very old (100+) or a changed DOB on an existing profile. */
import { ok, soft, stepup, block } from './core.js';

/* age of legal majority / research consent where it differs from 18 */
export const MAJORITY = { KR: 19, DZ: 19, TW: 18, JP: 18, TH: 20, NZ: 18, SG: 21, AE: 21, BH: 21, KW: 21, OM: 21, QA: 18, SA: 18, EG: 21, ID: 18, CI: 21, CM: 21, GA: 21, MG: 21, SZ: 21, LS: 21, NA: 21, NE: 21, PR: 21 };
export const majorityFor = (cc) => MAJORITY[cc] || 18;
/* youngest age a minor can join with parental consent (COPPA / GDPR-K style) */
export const MIN_MINOR_AGE = 13;

export function parseDob(v) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v || ''));
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3], dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return { impossible: true };
  return { y, mo, d, dt };
}
export function ageOn(p, today = new Date()) {
  let a = today.getFullYear() - p.y;
  if (today.getMonth() + 1 < p.mo || (today.getMonth() + 1 === p.mo && today.getDate() < p.d)) a--;
  return a;
}

/* opts: { minor: true for under-18 profiles, country, previous: earlier saved DOB } */
export function validateDob(v, opts = {}) {
  if (!v) return block('required');
  const p = parseDob(v);
  if (!p) return block('dob_invalid');
  if (p.impossible) return block('dob_impossible');
  const today = new Date();
  if (p.dt > today) return block('dob_future');
  const age = ageOn(p, today), meta = { age, iso: v };
  if (p.y < 1900 || age > 120) return block('dob_old');
  const maj = majorityFor(opts.country);
  if (opts.minor) {
    if (age >= 18) return block('dob_minor_only');
    if (age < MIN_MINOR_AGE) return block('dob_too_young', { min: MIN_MINOR_AGE });
    return stepup('dob_parent', {}, v, { ...meta, flags: ['parental_consent'] });
  }
  if (age < 18) return block('dob_adult_only');
  if (age < maj) return stepup('dob_majority', { age: maj }, v, { ...meta, flags: ['below_majority'] });
  if (opts.previous && opts.previous !== v) return soft('dob_changed', {}, v, { ...meta, flags: ['dob_changed'] });
  if (age >= 100) return soft('dob_100', { age }, v, { ...meta, flags: ['very_old'] });
  return ok(v, meta);
}
