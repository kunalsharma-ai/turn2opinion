/* Email validation = syntax + risk. Domain existence / MX records need DNS, so they run on the server
   (server/api-server.mjs → /api/validate/email); OTP verification is the only thing that makes an address
   "verified" — a valid-looking format never does.
   Levels: block (broken syntax, disposable/temporary inbox), soft (role address, likely typo, free mail used
   as a work email), pass. */
import { ok, soft, block } from './core.js';
import { DISPOSABLE, FREE_MAIL } from './email-domains.js';

const ROLE = /^(admin|administrator|info|support|help|helpdesk|sales|contact|office|hello|hi|noreply|no-reply|donotreply|billing|accounts?|hr|jobs|careers|team|marketing|press|media|webmaster|postmaster|abuse|security|enquiries|inquiries|service|orders|mail|email)$/;
const TYPOS = {
  'gmial.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gmaill.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gnail.com': 'gmail.com', 'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com', 'gmail.cm': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.om': 'gmail.com', 'gmali.com': 'gmail.com', 'gmail.in': 'gmail.com',
  'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'hotmai.com': 'hotmail.com', 'hotmail.con': 'hotmail.com', 'hotamil.com': 'hotmail.com',
  'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com', 'yahoo.con': 'yahoo.com', 'yhoo.com': 'yahoo.com', 'yahho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com',
  'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com', 'outlook.con': 'outlook.com', 'outllok.com': 'outlook.com',
  'iclod.com': 'icloud.com', 'icloud.con': 'icloud.com', 'icoud.com': 'icloud.com', 'rediffmial.com': 'rediffmail.com', 'redifmail.com': 'rediffmail.com',
};
const TLD = /^(?:[a-z]{2,24}|xn--[a-z0-9-]{2,59})$/;

/* opts: { work: true } when the field is a work / corporate email */
export function validateEmail(raw, opts = {}) {
  const v = String(raw ?? '').trim().normalize('NFC');
  if (!v) return block('required');
  if (/\s/.test(v)) return block('email_space');
  if (v.length > 254) return block('email_long');
  const at = v.split('@');
  if (at.length !== 2) return block(at.length < 2 ? 'email_at' : 'email_many_at');
  const [local, domainRaw] = at, domain = domainRaw.toLowerCase();
  if (!local || local.length > 64) return block('email_local');
  if (!/^[\p{L}\p{N}!#$%&'*+/=?^_`{|}~.-]+$/u.test(local) || /^\.|\.$|\.\./.test(local)) return block('email_local');
  const labels = domain.split('.');
  if (labels.length < 2 || domain.length > 253) return block('email_domain');
  if (labels.some((l) => !l || l.length > 63 || !/^[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?$/u.test(l))) return block('email_domain');
  if (!TLD.test(labels[labels.length - 1].normalize('NFKC')) && !/^\p{L}{2,}$/u.test(labels[labels.length - 1])) return block('email_tld');
  const norm = local + '@' + domain, cmp = norm.toLowerCase();
  const base = labels.slice(-2).join('.'), base3 = labels.slice(-3).join('.');
  if (DISPOSABLE.has(domain) || DISPOSABLE.has(base) || DISPOSABLE.has(base3)) return block('email_disposable');
  if (TYPOS[domain]) return soft('email_typo', { suggestion: local + '@' + TYPOS[domain] }, norm, { flags: ['typo'], suggestion: local + '@' + TYPOS[domain] });
  const flags = [];
  if (ROLE.test(local.toLowerCase())) flags.push('email_role');
  if (opts.work && (FREE_MAIL.has(domain) || FREE_MAIL.has(base))) flags.push('email_free_work');
  if (/^(test|asdf|abc|qwerty|sample|example|fake|demo)\d*$/i.test(local)) flags.push('email_placeholder');
  if (/^(example|test|invalid|localhost)\.(com|org|net)$/.test(domain) || /\.(test|invalid|localhost|example)$/.test(domain)) return block('email_domain');
  const meta = { flags, domain, free: FREE_MAIL.has(domain), cmp };
  return flags.length ? soft(flags[0], {}, norm, meta) : ok(norm, meta);
}
