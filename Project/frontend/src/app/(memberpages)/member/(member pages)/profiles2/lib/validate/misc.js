/* Remaining field validators: address, web address, LinkedIn, social handles, payout details
   (UPI, IBAN with checksum, SWIFT/BIC, IFSC, account numbers), years, counts, company names, free text. */
import { ok, soft, block, clean, letters, CJK } from './core.js';
import { keyboardRun } from './names.js';

const FAKE_ADDR = /\b(fake|test|asdf|qwerty|n\/?a|none|unknown|xxx+|abc|lorem|ipsum|nowhere|no address|123 main st(reet)?|1 test (road|street))\b/i;
export function validateAddress(raw, opts = {}) {
  const v = clean(raw);
  if (!v) return block('required');
  if (v.length < (opts.min || 5)) return block('addr_short', { min: opts.min || 5 });
  if (v.length > (opts.max || 200)) return block('too_long', { max: opts.max || 200 });
  if (letters(v) < 2) return block('addr_letters');
  if (/(.)\1{5,}/u.test(v)) return block('addr_fake');
  if (FAKE_ADDR.test(v)) return soft('addr_fake_soft', {}, v, { flags: ['addr_fake'] });
  if (!/[\p{L}]{2,}/u.test(v)) return block('addr_letters');
  return ok(v);
}

const DOMAIN = /^([\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?\.)+[\p{L}]{2,24}$/u;
export function validateUrl(raw) {
  let v = clean(raw).replace(/\s/g, '');
  if (!v) return block('required');
  if (!/^https?:\/\//i.test(v)) v = 'https://' + v;
  let u; try { u = new URL(v); } catch (e) { return block('url_invalid'); }
  if (!DOMAIN.test(u.hostname.replace(/^www\./, ''))) return block('url_invalid');
  if (/^(localhost|example\.(com|org|net)|test\.com)$/i.test(u.hostname)) return block('url_invalid');
  return ok(u.origin + (u.pathname === '/' ? '' : u.pathname), { host: u.hostname.replace(/^www\./, '').toLowerCase() });
}
export function validateLinkedIn(raw) {
  const v = clean(raw).replace(/\s/g, '');
  if (!v) return block('required');
  const m = /^(?:https?:\/\/)?(?:[a-z]{2,3}\.)?linkedin\.com\/(in|company|school|pub)\/([\p{L}\p{N}_%\-]{2,100})\/?(\?.*)?$/iu.exec(v);
  if (!m) return block('linkedin_invalid');
  return ok('https://www.linkedin.com/' + m[1].toLowerCase() + '/' + m[2]);
}
/* @handle or profile link, per network */
const NET = { instagram: /^[A-Za-z0-9._]{1,30}$/, x: /^[A-Za-z0-9_]{1,15}$/, facebook: /^[A-Za-z0-9.]{5,50}$/, youtube: /^@?[A-Za-z0-9._-]{3,30}$/, linkedin: /^[\p{L}\p{N}_-]{3,100}$/u };
export function validateHandle(raw, opts = {}) {
  const v = clean(raw).replace(/\s/g, '');
  if (!v) return block('required');
  if (/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}\/\S+$/i.test(v)) return ok(/^https?:/i.test(v) ? v : 'https://' + v);
  const h = v.replace(/^@/, ''), re = NET[opts.net] || /^[\p{L}\p{N}._-]{2,40}$/u;
  if (!re.test(h)) return block('handle_invalid');
  if (/^(test|none|na|null|asdf|qwerty|user|username)$/i.test(h)) return block('handle_invalid');
  return ok('@' + h);
}
export function validateUpi(raw) {
  const v = clean(raw).replace(/\s/g, '').toLowerCase();
  if (!v) return block('required');
  return /^[a-z0-9.\-_]{2,256}@[a-z]{2,64}$/.test(v) ? ok(v) : block('upi_invalid');
}
/* IBAN with ISO 13616 mod-97 checksum; SWIFT/BIC 8 or 11; Indian IFSC */
const IBAN_LEN = { AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29, CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, EG: 29, ES: 24, FI: 18, FO: 18, FR: 27, GB: 22, GE: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21, HU: 28, IE: 22, IL: 23, IQ: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28, LC: 32, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29, RO: 24, RS: 22, SA: 24, SC: 31, SE: 24, SI: 19, SK: 24, SM: 27, TL: 23, TN: 24, TR: 26, UA: 29, VA: 22, VG: 24, XK: 20 };
export function ibanOk(v) {
  const s = v.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(s) || (IBAN_LEN[s.slice(0, 2)] && IBAN_LEN[s.slice(0, 2)] !== s.length)) return false;
  const r = (s.slice(4) + s.slice(0, 4)).replace(/[A-Z]/g, (c) => c.charCodeAt(0) - 55);
  let m = 0; for (const ch of r) m = (m * 10 + +ch) % 97;
  return m === 1;
}
export function validateBankCode(raw) {   // "IFSC Code / Swift Code / IBAN"
  const v = clean(raw).replace(/\s/g, '').toUpperCase();
  if (!v) return block('required');
  if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(v)) return ok(v, { kind: 'ifsc' });
  if (/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(v)) return ok(v, { kind: 'swift' });
  if (/^[A-Z]{2}\d{2}/.test(v)) return ibanOk(v) ? ok(v.replace(/(.{4})/g, '$1 ').trim(), { kind: 'iban' }) : block('iban_checksum');
  return block('bankcode_invalid');
}
const ACCT = { IN: [9, 18], US: [4, 17], GB: [8, 8], AU: [6, 10], CA: [7, 12], SG: [7, 14], MY: [10, 16], PH: [10, 16], NG: [10, 10], KE: [10, 14], PK: [10, 24], BD: [10, 17] };
export function validateBankAccount(raw, opts = {}) {
  const v = clean(raw).replace(/[\s-]/g, '');
  if (!v) return block('required');
  if (/^[A-Z]{2}\d{2}[A-Z0-9]+$/i.test(v)) return ibanOk(v) ? ok(v.toUpperCase()) : block('iban_checksum');
  const [a, b] = ACCT[opts.country] || [6, 20];
  if (!/^\d+$/.test(v)) return block('acct_digits');
  if (v.length < a || v.length > b) return a === b ? block('acct_len_x', { n: a }) : block('acct_len', { min: a, max: b });
  if (/^(\d)\1+$/.test(v) || '01234567890123456789'.includes(v)) return block('acct_fake');
  return ok(v);
}
export function validateYear(raw, opts = {}) {
  const v = clean(raw), y = +v, now = new Date().getFullYear();
  if (!v) return block('required');
  if (!/^\d{4}$/.test(v)) return block('year_format');
  const min = opts.min ?? 1940, max = opts.max ?? now + 8;
  if (y < min || y > max) return block('year_range', { min, max });
  if (opts.birthYear && y < opts.birthYear + 12) return soft('year_young', { age: y - opts.birthYear }, v, { flags: ['grad_age'] });
  return ok(v);
}
export function validateCount(raw, opts = {}) {
  const v = String(raw ?? '').trim();
  if (v === '') return block('required');
  if (!/^\d+$/.test(v)) return block('count_digits');
  const n = +v, min = opts.min ?? 0, max = opts.max ?? 999;
  if (n < min || n > max) return block('count_range', { min, max });
  if (opts.softMax && n > opts.softMax) return soft('count_high', { n }, String(n), { flags: ['count_high'] });
  return ok(String(n));
}
export function validateCompany(raw) {
  const v = clean(raw);
  if (!v) return block('required');
  if (v.length < 2 || letters(v) + (v.match(/\d/g) || []).length < 2) return block('company_short');
  if (v.length > 120) return block('too_long', { max: 120 });
  if (/^(test|none|na|n\/a|null|asdf|qwerty|company|my company|abc|xyz|self|nil|unknown)$/i.test(v)) return block('company_placeholder');
  return ok(v);
}
/* Open-ended answers ("Please specify", brand names, free text about themselves).
   opts.strict (used for "Other — please specify"): placeholder answers like "none" or "na" are blocked instead of
   asked about, because the respondent chose "Other" and has to say what it is. */
const TEXT_PLACEHOLDER = /^(test|testing|asdf+|qwert[yz]?|xyz|abc|abcd|aaa+|lorem( ipsum)?|dummy|sample|blah+|bla+|hello|hi|ok|okay|hmm+|\.+|-+|x+|z+|nothing to say|whatever|random|anything|something|asd|sdf|jkl|fgh)$/i;
const TEXT_NONE = /^(na|n\/a|n\.a\.?|no|none|nil|null|nothing|idk|dk|don'?t know|not sure|no idea|nope|-|nah)$/i;
export function validateText(raw, opts = {}) {
  const v = clean(raw), min = opts.min ?? 2, max = opts.max ?? 200;
  if (!v) return block('required');
  if (v.length > max) return block('too_long', { max });
  if (!/[\p{L}\p{N}]/u.test(v)) return block('text_junk');
  const flat = v.toLowerCase().replace(/[\s.,!?'"’-]+/g, ' ').trim();
  if (TEXT_PLACEHOLDER.test(flat)) return block('text_placeholder');
  if (TEXT_NONE.test(flat)) return opts.strict ? block('other_required') : soft('text_none', {}, v);
  if (letters(v) + (v.match(/\p{N}/gu) || []).length < Math.min(min, 2) || (v.length < min && !CJK.test(v))) return block('text_short', { min });
  if (/(.)\1{4,}/u.test(v.replace(/\s/g, ''))) return block('text_junk');
  if (opts.words !== false && !/\p{L}/u.test(v)) return block('text_letters');
  const kb = keyboardRun(v);
  if (kb === 2 && v.replace(/\s/g, '').length <= 14) return block('text_gibberish');
  const latinWords = (v.match(/\b[a-z]{5,}\b/gi) || []);
  const noVowel = latinWords.filter((w) => !/[aeiouy]/i.test(w));
  if (latinWords.length && noVowel.length / latinWords.length > 0.6) return latinWords.length >= 2 ? block('text_gibberish') : soft('text_gibberish_soft', {}, v);
  if (kb === 1) return soft('text_gibberish_soft', {}, v);
  const ws = flat.split(' ').filter(Boolean);
  if (ws.length >= 4 && new Set(ws).size === 1) return block('text_repeat');
  if (!opts.contactOk && (/[\w.+-]+@[\w-]+\.[a-z]{2,}/i.test(v) || /(\+?\d[\d\s-]{8,}\d)/.test(v))) return soft('text_contact', {}, v);
  return ok(v);
}
