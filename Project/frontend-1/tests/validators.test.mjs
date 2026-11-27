// Member-area form checks (src/member/v6/lib/validate) and reward options (src/data/payouts.js).
// Pure modules, no browser and no extra packages: run with `npm test` in Project/frontend-1.
// Test cases TC-PRF-*, TC-RWD-* and TC-ACC-* in the QA suite (turn2opinion-test-cases.xlsx).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateDob, parseDob, majorityFor } from '../src/member/v6/lib/validate/dob.js';
import { validateEmail } from '../src/member/v6/lib/validate/email.js';
import { validateName } from '../src/member/v6/lib/validate/names.js';
import { validateUpi, validateBankCode, validateBankAccount, ibanOk } from '../src/member/v6/lib/validate/misc.js';
import { methodsFor, normalizeMethod, REWARDS } from '../src/data/payouts.js';

// ISO date for someone who turns `years` old `days` days from today (negative = birthday already passed)
const dobFor = (years, days = -1) => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

test('date of birth: empty, wrong format, impossible and future dates are blocked', () => {
  assert.equal(validateDob('').code, 'required');
  assert.equal(validateDob('02/04/1990').code, 'dob_invalid');
  assert.equal(validateDob('2001-02-30').code, 'dob_impossible');
  assert.equal(validateDob('2001-13-01').code, 'dob_impossible');
  assert.equal(validateDob(dobFor(0, 5)).code, 'dob_future');
  assert.equal(validateDob('1890-01-01').code, 'dob_old');
  assert.equal(parseDob('2000-02-29').d, 29, 'leap day is a real date');
});

test('date of birth: adult panels need 18+, Teen panel takes 13-17 only', () => {
  assert.equal(validateDob(dobFor(30)).level, 'pass');
  assert.equal(validateDob(dobFor(18)).level, 'pass', '18th birthday yesterday');
  assert.equal(validateDob(dobFor(18, 1)).code, 'dob_adult_only', 'turns 18 tomorrow');
  assert.equal(validateDob(dobFor(15), { minor: true }).code, 'dob_parent');
  assert.equal(validateDob(dobFor(13), { minor: true }).code, 'dob_parent', '13th birthday yesterday');
  assert.equal(validateDob(dobFor(13, 1), { minor: true }).code, 'dob_too_young', 'turns 13 tomorrow');
  assert.equal(validateDob(dobFor(18), { minor: true }).code, 'dob_minor_only');
  assert.equal(validateDob(dobFor(101)).code, 'dob_100');
});

test('date of birth: countries with a higher age of majority ask for a step-up check', () => {
  assert.equal(majorityFor('IN'), 18);
  assert.equal(majorityFor('SG'), 21);
  assert.equal(validateDob(dobFor(19), { country: 'SG' }).code, 'dob_majority');
  assert.equal(validateDob(dobFor(22), { country: 'SG' }).level, 'pass');
  assert.equal(validateDob(dobFor(30), { previous: dobFor(31) }).code, 'dob_changed');
});

test('email: broken addresses and throwaway inboxes are blocked, typos get a suggestion', () => {
  assert.equal(validateEmail('').code, 'required');
  assert.equal(validateEmail('asha example.com').code, 'email_space');
  assert.equal(validateEmail('asha.example.com').code, 'email_at');
  assert.equal(validateEmail('a@b@c.com').code, 'email_many_at');
  assert.equal(validateEmail('.asha@gmail.com').code, 'email_local');
  assert.equal(validateEmail('asha@gmail').code, 'email_domain');
  assert.equal(validateEmail('asha@mailinator.com').code, 'email_disposable');
  assert.equal(validateEmail('asha@example.com').code, 'email_domain');
  const typo = validateEmail('asha@gmial.com');
  assert.equal(typo.level, 'soft');
  assert.equal(typo.meta.suggestion, 'asha@gmail.com');
  assert.equal(validateEmail('Asha.K@Gmail.com').level, 'pass');
  assert.equal(validateEmail('Asha.K@Gmail.com').norm, 'Asha.K@gmail.com');
});

test('email: role inboxes and free mail as a work email are soft warnings', () => {
  assert.equal(validateEmail('info@acme.co.in').code, 'email_role');
  assert.equal(validateEmail('asha@gmail.com', { work: true }).code, 'email_free_work');
  assert.equal(validateEmail('asha@acme.co.in', { work: true }).level, 'pass');
});

test('names: letters only, no digits, symbols, placeholders or keyboard mash', () => {
  assert.equal(validateName('').code, 'required');
  assert.equal(validateName('Asha2').code, 'name_digits');
  assert.equal(validateName('Asha!').code, 'name_symbols');
  assert.equal(validateName('A').code, 'name_short');
  assert.equal(validateName('Aaaaa').code, 'name_repeat');
  assert.equal(validateName('Asha').level, 'pass');
  assert.equal(validateName("O'Neil").level, 'pass');
  assert.equal(validateName('Jean-Luc').level, 'pass');
  assert.equal(validateName('José').level, 'pass');
  assert.equal(validateName('李').level, 'pass', 'one CJK character is a full name');
});

test('payment details: UPI ID, IFSC/SWIFT/IBAN and bank account checks', () => {
  assert.equal(validateUpi('asha.k@okhdfc').level, 'pass');
  assert.equal(validateUpi('asha@').code, 'upi_invalid');
  assert.equal(validateUpi('').code, 'required');
  assert.equal(validateBankCode('HDFC0001234').meta.kind, 'ifsc');
  assert.equal(validateBankCode('DEUTDEFF').meta.kind, 'swift');
  assert.equal(validateBankCode('GB82WEST12345698765432').meta.kind, 'iban');
  assert.equal(validateBankCode('GB82WEST12345698765433').code, 'iban_checksum');
  assert.equal(ibanOk('DE89370400440532013000'), true);
  assert.equal(validateBankAccount('50100234567891', { country: 'IN' }).level, 'pass');
  assert.equal(validateBankAccount('123456789012', { country: 'IN' }).code, 'acct_fake', 'counting run');
  assert.equal(validateBankAccount('12ab', { country: 'IN' }).code, 'acct_digits');
  assert.equal(validateBankAccount('1234', { country: 'IN' }).code, 'acct_len');
  assert.equal(validateBankAccount('1111111111', { country: 'IN' }).code, 'acct_fake');
});

test('rewards: 7 options in India, 6 elsewhere (UPI is India only), and Cash Rewards never comes back', () => {
  assert.equal(methodsFor('IN').length, 7);
  assert.equal(methodsFor('in').length, 7);
  assert.ok(methodsFor('IN').includes('UPI (India)'));
  for (const cc of ['US', 'GB', 'AE', '', undefined]) {
    assert.equal(methodsFor(cc).length, 6, String(cc));
    assert.equal(methodsFor(cc).includes('UPI (India)'), false, String(cc));
  }
  assert.equal(REWARDS.some((r) => /cash/i.test(r.name) || r.id === 'cash'), false);
});

test('rewards: old method labels map to the current reward names', () => {
  assert.equal(normalizeMethod('UPI'), 'UPI (India)');
  assert.equal(normalizeMethod('Amazon Gift Card'), 'Digital Gift Cards');
  assert.equal(normalizeMethod('wire'), 'Wire Transfer');
  assert.equal(normalizeMethod('PayPal'), 'PayPal');
  assert.equal(normalizeMethod('Bank account'), 'Bank Transfer');
  assert.equal(normalizeMethod('Grocery voucher'), 'Grocery Vouchers');
});
