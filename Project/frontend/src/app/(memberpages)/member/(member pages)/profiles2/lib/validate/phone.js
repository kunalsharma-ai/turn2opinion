/* International phone validation (E.164), never one global regex.
   Steps: clean → work out the country (explicit +code, else the respondent's country) → strip the trunk "0"
   → check the national length / mobile pattern for that country → normalise to +<code><number>.
   Risk signals (soft flags, never automatic rejection): sequential / repeated digits, number country ≠ residence
   country, landline where a mobile is expected. VoIP / virtual / carrier / reuse checks run on the server. */
import { ok, soft, block } from './core.js';
import { PHONE_META, BY_CODE } from './phone-meta.js';

export function parsePhone(raw, defaultCountry) {
  let s = String(raw ?? '').trim();
  if (!s) return null;
  if (/[^\d\s()+.\-\/]/.test(s.replace(/^\s*(tel:)?/i, ''))) return { bad: 'phone_chars' };
  s = s.replace(/^00/, '+');
  let digits = s.replace(/\D/g, ''), code = null, country = null;
  if (s.startsWith('+')) {
    for (let k = 1; k <= 3 && !code; k++) if (BY_CODE[digits.slice(0, k)]) code = digits.slice(0, k);
    if (!code) return { bad: 'phone_code' };
    digits = digits.slice(code.length);
    const cands = BY_CODE[code];
    country = cands.includes(defaultCountry) ? defaultCountry : cands.find((c) => { const m = PHONE_META[c]; return m[3] && m[3].test(digits); }) || cands[0];
  } else if (defaultCountry && PHONE_META[defaultCountry]) {
    country = defaultCountry; code = PHONE_META[country][0];
    if (code !== '1' && !['IT', 'SM', 'VA'].includes(country)) digits = digits.replace(/^0+/, '');   // trunk prefix
    else if (code === '1' && digits.length === 11 && digits[0] === '1') digits = digits.slice(1);
  } else return { bad: 'phone_need_code' };
  return { country, code, national: digits, e164: '+' + code + digits };
}

/* opts: { country: residence ISO code, mobile: expect a mobile number } */
export function validatePhone(raw, opts = {}) {
  const p = parsePhone(raw, opts.country);
  if (!p) return block('required');
  if (p.bad) return block(p.bad);
  const m = PHONE_META[p.country] || [p.code, 4, 12];
  const n = p.national;
  if (n.length + p.code.length > 15) return block('phone_long');
  if (n.length < m[1] || n.length > m[2]) return block('phone_len', { min: m[1], max: m[2], country: p.country });
  const flags = [];
  if (/^(\d)\1+$/.test(n) || /(\d)\1{6,}/.test(n)) return block('phone_fake');
  if ('01234567890123456789'.includes(n.slice(-7)) || '98765432109876543210'.includes(n.slice(-7))) flags.push('phone_sequence');
  if (opts.mobile && m[3] && !m[3].test(n)) flags.push('phone_not_mobile');
  if (opts.country && p.country !== opts.country && !(BY_CODE[p.code] || []).includes(opts.country)) flags.push('phone_country');
  const meta = { e164: p.e164, country: p.country, flags, mobile: m[3] ? m[3].test(n) : null };
  return flags.length ? soft(flags[0], { country: p.country }, p.e164, meta) : ok(p.e164, meta);
}
