/* Field registry: which validator, input type and hint each free-text question uses.
   ctx (built by the engine) = { A: all answers across profiles, country, state, category, prev: previously saved value }.
   Every validator returns { level: pass|soft|stepup|block, code, vars, norm, meta } (see core.js). */
import { ok, block } from './core.js';
import { validateName } from './names.js';
import { validateEmail } from './email.js';
import { validatePhone } from './phone.js';
import { validateDob, parseDob } from './dob.js';
import { validatePostal, postalExample } from './postal.js';
import { validateAddress, validateUrl, validateLinkedIn, validateHandle, validateUpi, validateBankCode, validateBankAccount, validateYear, validateCount, validateCompany, validateText } from './misc.js';
import { validateJobTitle } from './jobtitle.js';
import { soft } from './core.js';

const country = (c) => c.A['add-residence'] || c.A.country || c.guess;
const SPEC = [
  [/^firstname$/, { kind: 'name', type: 'text', ac: 'given-name', ph: 'e.g. María, 王伟, Aarav', v: (x, c) => validateName(x, { field: 'first', other: c.A.lastname }) }],
  [/^lastname$/, { kind: 'name', type: 'text', ac: 'family-name', single: true, ph: 'e.g. García, Nguyễn, O’Connor', v: (x, c) => (x === '—' ? ok('—', { single: true }) : validateName(x, { field: 'last', other: c.A.firstname })) }],
  [/^add-middlename$/, { kind: 'name', type: 'text', ac: 'additional-name', ph: 'Middle name', v: (x) => validateName(x, { field: 'middle' }) }],
  [/^add-preferredname$/, { kind: 'name', type: 'text', ac: 'nickname', ph: 'e.g. Sam', v: (x) => validateName(x, { field: 'preferred' }) }],
  [/^(mail|alternate-email)$/, { kind: 'email', type: 'email', ac: 'email', ph: 'name@example.com', v: (x, c, n) => {
    const r = validateEmail(x);
    if (n === 'alternate-email' && r.norm && c.A.mail && r.norm.toLowerCase() === String(c.A.mail).toLowerCase()) return block('email_same_as_main');
    return r;
  } }],
  [/^workemail$/, { kind: 'email', type: 'email', ac: 'work email', ph: 'you@company.com', v: (x) => validateEmail(x, { work: true }) }],
  [/^payment-method-(paypal|amazon)$/, { kind: 'email', type: 'email', ac: 'email', ph: 'name@example.com', v: (x) => validateEmail(x) }],
  [/^(phone|alternate-phone|phone1|social-media-whatsapp)$/, { kind: 'phone', type: 'tel', ac: 'tel', ph: '98765 43210', v: (x, c, n) => {
    const r = validatePhone(x, { country: country(c), mobile: n === 'phone' || n === 'social-media-whatsapp' });
    if (n !== 'phone' && r.norm && c.A.phone && r.norm === c.A.phone) return block('phone_same_as_main');
    return r;
  } }],
  [/^dob$/, { kind: 'dob', type: 'dob', ac: 'bday', v: (x, c) => validateDob(x, { minor: c.category === 'minor', country: country(c), previous: c.prev }) }],
  [/^age$/, { kind: 'count', type: 'text', im: 'numeric', ph: 'Age in years', v: (x, c) => {
    const r = validateCount(x, { min: 13, max: 120 });
    const p = parseDob(c.A.dob);
    if (r.level === 'pass' && p && !p.impossible) { const real = new Date().getFullYear() - p.y; if (Math.abs(real - +x) > 1) return soft('age_dob', { age: real }, r.norm, { flags: ['age_dob'] }); }
    return r;
  } }],
  [/^(zipcode|add-postcode)$/, { kind: 'postal', type: 'text', ac: 'postal-code', ph: (c) => postalExample(country(c)) || 'Postal code', v: (x, c) => validatePostal(x, { country: country(c), state: c.A.state }) }],
  [/^org-zipcode$/, { kind: 'postal', type: 'text', ac: 'postal-code', ph: (c) => postalExample(c.A['org-country']) || 'Postal code', v: (x, c) => validatePostal(x, { country: c.A['org-country'], state: c.A['org-state'] }) }],
  [/^(orgwebsite|add-company-website)$/, { kind: 'url', type: 'url', ac: 'url', ph: 'https://company.com', v: (x) => validateUrl(x) }],
  [/^(orglinkedin|add-linkedin)$/, { kind: 'url', type: 'url', ph: 'https://www.linkedin.com/in/your-name', v: (x) => validateLinkedIn(x) }],
  [/^social-media-(instagram|facebook|youtube|x|linkedin)$/, { kind: 'handle', type: 'text', ph: '@yourhandle', v: (x, c, n) => validateHandle(x, { net: n.replace('social-media-', '') }) }],
  [/^payment-method-upi$/, { kind: 'upi', type: 'text', ph: 'name@bank', v: (x) => validateUpi(x) }],
  [/^payment-method-bank-ifsc$/, { kind: 'bank', type: 'text', ph: 'HDFC0001234 / DEUTDEFF / DE89 3704…', v: (x) => validateBankCode(x) }],
  [/^payment-method-bank-account$/, { kind: 'bank', type: 'text', im: 'numeric', ph: 'Account number or IBAN', v: (x, c) => validateBankAccount(x, { country: country(c) }) }],
  [/^payment-method-bank-name$/, { kind: 'company', type: 'text', ph: 'e.g. HDFC Bank', v: (x) => validateCompany(x) }],
  [/^(company-address|orglocation|add-address1)$/, { kind: 'address', type: 'text', long: true, ac: 'street-address', ph: 'House / building, street', v: (x) => validateAddress(x) }],
  [/^add-address2$/, { kind: 'address', type: 'text', ac: 'address-line2', ph: 'Area, locality or landmark', v: (x) => validateAddress(x, { min: 2 }) }],
  [/^add-company$/, { kind: 'company', type: 'text', ac: 'organization', ph: 'Company name', v: (x) => validateCompany(x) }],
  [/^add-jobtitle$/, { kind: 'jobtitle', type: 'text', ac: 'organization-title', ph: 'e.g. Marketing Manager', v: (x) => validateJobTitle(x) }],
  [/^add-institution$/, { kind: 'company', type: 'text', ph: 'e.g. University of Mumbai', v: (x) => validateCompany(x) }],
  [/^add-grad-year$/, { kind: 'year', type: 'text', im: 'numeric', ph: 'YYYY', v: (x, c) => { const p = parseDob(c.A.dob); return validateYear(x, { birthYear: p && p.y }); } }],
  [/^add-household-size$/, { kind: 'count', type: 'text', im: 'numeric', ph: '0', v: (x) => validateCount(x, { min: 1, max: 40, softMax: 15 }) }],
  [/^add-household-adults$/, { kind: 'count', type: 'text', im: 'numeric', ph: '0', v: (x, c) => { const r = validateCount(x, { min: 1, max: 40 }); return r.level === 'pass' && +x > +(c.A['add-household-size'] || 99) ? block('hh_adults') : r; } }],
  [/^add-years-experience$/, { kind: 'count', type: 'text', im: 'numeric', ph: '0', v: (x) => validateCount(x, { min: 0, max: 65 }) }],
  [/^air-travel-count$/, { kind: 'count', type: 'text', im: 'numeric', ph: '0', v: (x) => validateCount(x, { min: 0, max: 400, softMax: 100 }) }],
  [/^food18$/, { kind: 'count', type: 'text', im: 'numeric', ph: '0', v: (x) => validateCount(x, { min: 0, max: 100, softMax: 60 }) }],
  [/count$/, { kind: 'count', type: 'text', im: 'numeric', ph: '0', v: (x) => validateCount(x, { min: 0, max: 999 }) }],
  [/^verify-(mail|phone)$/, { kind: 'verify', type: 'verify', v: (x) => (x === 'verified' || x === 'demo' ? ok(x) : x === 'skipped' ? ok(x) : block('verify_needed')) }],
];
const TEXT = { kind: 'text', type: 'text', ph: 'Type here…', v: (x, c, n) => validateText(x, { max: /address|location/.test(n) ? 500 : 200 }) };
const NUMQ = { kind: 'count', type: 'text', im: 'numeric', ph: '0', v: (x) => validateCount(x, { min: 0, max: 99 }) };

export function fieldSpec(n, questionText = '') {
  const hit = SPEC.find(([re]) => re.test(n));
  if (hit) return hit[1];
  return /number of|how many/i.test(questionText) ? NUMQ : TEXT;
}
export function validateField(n, value, ctx, questionText) {
  const sp = fieldSpec(n, questionText);
  try { return sp.v(value, ctx, n); } catch (e) { return block('invalid'); }
}
