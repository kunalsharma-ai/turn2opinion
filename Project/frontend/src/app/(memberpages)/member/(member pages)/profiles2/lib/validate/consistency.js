/* Cross-field (profile consistency) rules. Input: every saved answer across all of the respondent's profiles
   plus a few context values. Output: a list of { code, level, fields } flags. None of these reject a
   respondent on their own — they feed the trust score and are shown for confirmation where it helps.
   Examples: age 22 + retired, country Japan + state California, student + C-level title,
   graduation year before age 12, phone/time-zone country ≠ residence. */
import { parseDob, ageOn, majorityFor } from './dob.js';
import { classifyTitle } from './jobtitle.js';
import { TZ_COUNTRY } from './tz-country.js';

const num = (v) => { const m = String(v ?? '').match(/\d+/); return m ? +m[0] : null; };
const RETIRED = /^retired$/i, STUDENT = /^student$/i;

export function ageFrom(A) {
  const p = parseDob(A.dob);
  if (p && !p.impossible) return ageOn(p);
  return A.age && /^\d+$/.test(A.age) ? +A.age : null;
}

/* A = merged answers, ctx = { timezone, phoneCountry, emailFree, category } */
export function consistency(A, ctx = {}) {
  const out = [], add = (code, level, fields) => out.push({ code, level, fields });
  const age = ageFrom(A), country = A.country || A['add-residence'];
  // geography hierarchy
  for (const [c, s] of [['country', 'state'], ['org-country', 'org-state']]) {
    if (A[c] && A[s] && !String(A[s]).startsWith(A[c] + '-')) add('geo_state', 'block', [c, s]);
  }
  if (A['add-residence'] && A.country && A['add-residence'] !== A.country) add('geo_residence', 'soft', ['country', 'add-residence']);
  if (ctx.timezone && country && TZ_COUNTRY[ctx.timezone] && TZ_COUNTRY[ctx.timezone] !== country) add('geo_timezone', 'soft', ['country']);
  if (ctx.phoneCountry && country && ctx.phoneCountry !== country) add('geo_phone', 'soft', ['phone', 'country']);
  // age-based logic
  if (age != null) {
    if (RETIRED.test(A.empstat || '') && age < 40) add('age_retired', 'soft', ['dob', 'empstat']);
    if (age < 18 && /^(married|domestic)/i.test(A.relationship || '')) add('age_married', 'soft', ['dob', 'relationship']);
    const kids = num(A['children-num'] || A.children);
    if (kids != null && kids >= 4 && age < 22) add('age_children', 'soft', ['dob', 'children-num']);
    if (/doctorate|phd|professional degree/i.test(A.education || '') && age < 23) add('age_education', 'soft', ['dob', 'education']);
    if (/master/i.test(A.education || '') && age < 20) add('age_education', 'soft', ['dob', 'education']);
    const exp = num(A['add-years-experience']);
    if (exp != null && exp > age - 13) add('age_experience', 'soft', ['dob', 'add-years-experience']);
    if (/more than 15|10-15/i.test(A.experience || '') && age < 28) add('age_experience', 'soft', ['dob', 'experience']);
    const gy = num(A['add-grad-year']), by = parseDob(A.dob);
    if (gy && by && by.y && gy < by.y + 12) add('age_grad', 'soft', ['dob', 'add-grad-year']);
    if (country && age < majorityFor(country) && ctx.category !== 'minor') add('age_majority', 'stepup', ['dob', 'country']);
  }
  // work logic
  const title = A['add-jobtitle'] || '';
  if (title) {
    const { seniority } = classifyTitle(title);
    if ((STUDENT.test(A.empstat || '') || /^yes$/i.test(A.student || '')) && ['c_level', 'vp', 'director'].includes(seniority)) add('work_student_exec', 'soft', ['empstat', 'add-jobtitle']);
    if (/unemployed/i.test(A.empstat || '') && ['c_level', 'vp', 'director', 'manager'].includes(seniority)) add('work_unemployed_title', 'soft', ['empstat', 'add-jobtitle']);
  }
  if (ctx.workEmailFree && A['add-company']) add('work_free_email', 'soft', ['workemail', 'add-company']);
  // household logic
  const hh = num(A['add-household-size']), adults = num(A['add-household-adults']);
  if (hh != null && adults != null && adults > hh) add('hh_adults', 'block', ['add-household-size', 'add-household-adults']);
  const kidsHH = num(A['children-num']);
  if (hh != null && kidsHH != null && kidsHH >= hh) add('hh_children', 'soft', ['add-household-size', 'children-num']);
  // identity
  if (A.firstname && A.lastname && A.firstname.trim().toLowerCase() === A.lastname.trim().toLowerCase()) add('name_same', 'soft', ['firstname', 'lastname']);
  if (A.mail && A['alternate-email'] && A.mail.toLowerCase() === A['alternate-email'].toLowerCase()) add('email_dup', 'soft', ['mail', 'alternate-email']);
  if (A.phone && A['alternate-phone'] && A.phone.replace(/\D/g, '') === A['alternate-phone'].replace(/\D/g, '')) add('phone_dup', 'soft', ['phone', 'alternate-phone']);
  return out;
}
