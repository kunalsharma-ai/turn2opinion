// Shared sign-up checks (Join page and the parent/guardian consent page).
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import { COUNTRIES } from '../data/countries.js';
import { ageOn, EMAIL_RE } from '../components/FormFields.jsx';

export const NAME_RE = /^[\p{L}][\p{L} .'-]{0,48}$/u;

export function phoneError(dial, phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  const dialDigits = (COUNTRIES.find((c) => c.c === dial) || { d: '' }).d.replace(/\D/g, '');
  if (!dial) return 'Choose the country code.';
  if (!digits) return 'Enter the mobile number.';
  if (!isValidPhoneNumber(`+${dialDigits}${digits}`)) return 'Enter a valid mobile number for the selected country.';
  if (/^(\d)\1+$/.test(digits)) return 'That number doesn’t look real.';
  return '';
}

/** Digits only, dial code first: what the API stores (e.g. "919876543210"). */
export const fullPhone = (dial, phone) => `${((COUNTRIES.find((c) => c.c === dial) || {}).d || '').replace(/\D/g, '')}${String(phone || '').replace(/\D/g, '')}`;

/** "919876543210" or "+919876543210" -> { dial: 'IN', phone: '9876543210' } */
export function splitPhone(stored) {
  const p = parsePhoneNumberFromString(`+${String(stored || '').replace(/\D/g, '')}`);
  return p ? { dial: p.country || '', phone: p.nationalNumber || '' } : { dial: '', phone: '' };
}

/** Parent/guardian details. Keys are "<prefix>.<field>" so they match the form's data-k anchors. */
export function validateParent(p, teenEmail, prefix = 'parent') {
  const e = {};
  const k = (n) => `${prefix}.${n}`;
  if (!p.rel) e[k('rel')] = 'Choose Mother, Father or Legal guardian.';
  if (!NAME_RE.test(p.first.trim())) e[k('first')] = 'Enter their first name using letters only.';
  if (p.middle.trim() && !NAME_RE.test(p.middle.trim())) e[k('middle')] = 'Use letters only, or leave it empty.';
  if (p.last.trim() && !NAME_RE.test(p.last.trim())) e[k('last')] = 'Use letters only, or leave it empty.';
  if (!EMAIL_RE.test(p.email.trim())) e[k('email')] = 'Enter their email address, like name@example.com.';
  else if (teenEmail && p.email.trim().toLowerCase() === String(teenEmail).trim().toLowerCase()) e[k('email')] = 'Use the parent or guardian’s own email, not the teen’s.';
  const pe = phoneError(p.dial, p.phone);
  if (pe) e[k('phone')] = pe;
  const pa = ageOn(p.dob);
  if (!p.dob) e[k('dob')] = 'Pick their date of birth.';
  else if (pa === null || pa < 18) e[k('dob')] = 'A parent or guardian must be 18 or older.';
  else if (pa > 110) e[k('dob')] = 'Check the year.';
  if (p.rel === 'guardian' && !p.gender) e[k('gender')] = 'Select the guardian’s gender.';
  return e;
}
