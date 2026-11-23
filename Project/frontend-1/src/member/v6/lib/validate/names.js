/* Unicode-aware name validation for a global panel (first / middle / last / full / preferred names).
   Accepts every script (José, François, Łukasz, Müller, محمد, 王小明, さくら, 김민준, Дмитрий, अनन्या),
   hyphenated and compound names, apostrophes (O'Connor, N’Golo), particles (van, von, de, bin, al…)
   and single-name respondents. Never uses a Western-only [A-Za-z] rule. */
import { ok, soft, block, clean, letters, CJK, isLatin } from './core.js';

const PLACEHOLDERS = new Set(['test', 'testing', 'tester', 'demo', 'anonymous', 'anon', 'none', 'n/a', 'na', 'nil', 'null', 'undefined', 'unknown', 'unk',
  'xxx', 'xx', 'abc', 'abcd', 'asdf', 'qwerty', 'user', 'username', 'name', 'firstname', 'first name', 'lastname', 'last name', 'surname', 'fake', 'dummy',
  'sample', 'example', 'admin', 'nobody', 'noname', 'no name', 'blank', 'empty', 'person', 'respondent', 'panelist', 'mr', 'mrs', 'ms', 'sir', 'madam',
  'prueba', 'teste', 'тест', 'テスト', '测试', '테스트', 'परीक्षण', 'اختبار', 'nombre', 'nome', 'nom', 'unbekannt', 'inconnu', 'desconocido']);
const FAKE_FULL = new Set(['john doe', 'jane doe', 'john smith test', 'test user', 'test test', 'foo bar', 'mickey mouse', 'donald duck', 'harry potter',
  'bruce wayne', 'peter parker', 'tony stark', 'clark kent', 'homer simpson', 'lorem ipsum', 'asdf asdf', 'first last', 'firstname lastname', 'john john']);
const ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'qwertzuiop', 'yxcvbnm', 'azertyuiop', 'qsdfghjklm', 'wxcvbn', 'abcdefghijklmnopqrstuvwxyz', '1234567890'];
const PARTICLES = /^(van|von|der|den|de|del|della|di|da|do|dos|das|du|la|le|bin|binti|bint|ibn|al|el|ap|ben|mac|mc|st|ter|ten|y|zu|af|av)$/i;

export function keyboardRun(s) {
  const t = s.toLowerCase().replace(/[^a-z]/g, '');
  if (t.length < 4) return false;
  let best = 0;
  for (const r of ROWS) {
    const rr = [...r].reverse().join('');
    for (let i = 0; i < t.length; i++) for (let j = t.length; j - i > best; j--) { const part = t.slice(i, j); if (r.includes(part) || rr.includes(part)) { best = j - i; break; } }
  }
  return best >= 6 ? 2 : best >= 4 && best >= t.length * 0.8 ? 1 : 0;   // 2 = "asdfgh" (block), 1 = "qwer" / "Wertz" (ask to confirm)
}
/* opts: { field: 'first'|'middle'|'last'|'full'|'preferred', other: '<the other name part>', allowSingle } */
export function validateName(raw, opts = {}) {
  const v = clean(raw), field = opts.field || 'first';
  if (!v) return block('required');
  if (/\d/.test(v)) return block('name_digits');
  if (/[@#$%^&*_=+<>{}[\]|\\/~`!?;:"()€£¥₹§©®™]/u.test(v)) return block('name_symbols');
  if (!/^[\p{L}\p{M}\s'’‘.\-·・]+$/u.test(v)) return block('name_chars');
  const punct = (v.match(/['’‘.\-·・]/g) || []).length;
  if (punct > 4 || /['’‘.\-]{2,}/.test(v) || /^['’‘.\-]|['’‘\-]$/.test(v)) return block('name_symbols');
  const L = letters(v), cjk = CJK.test(v);
  if (L < (cjk ? 1 : field === 'middle' ? 1 : 2) && !(field === 'last' && opts.allowSingle)) return block('name_short');
  if (v.length > 100) return block('name_long', { max: 100 });
  const low = v.toLowerCase();
  if (PLACEHOLDERS.has(low) || PLACEHOLDERS.has(low.replace(/\./g, ''))) return block('name_placeholder');
  if (/(\p{L})\1{3,}/u.test(v) || (L >= 3 && new Set(low.replace(/[\s'’.\-]/g, '')).size === 1)) return block('name_repeat');
  const kb = isLatin(v) ? keyboardRun(v) : 0;
  if (kb === 2) return block('name_keyboard');
  const words = v.split(' ');
  const flags = [];
  if (kb === 1) flags.push('name_keyboard_soft');
  if (isLatin(v) && words.some((w) => w.length > 4 && !PARTICLES.test(w) && !/[aeiouyàáâãäåæèéêëìíîïòóôõöøùúûüýÿœāēīōūăąęėįųőűșțłÿ]/i.test(w))) flags.push('name_novowel');
  if (v.length > 50) flags.push('name_review_long');
  if (opts.other && clean(opts.other).toLowerCase() === low && field !== 'middle') flags.push('name_same');
  if (opts.other && FAKE_FULL.has((field === 'last' ? clean(opts.other) + ' ' + v : v + ' ' + clean(opts.other)).toLowerCase())) return block('name_fake');
  if (field === 'full' && FAKE_FULL.has(low)) return block('name_fake');
  if (v === v.toUpperCase() && isLatin(v) && L > 3) flags.push('name_caps');
  const norm = v.replace(/\s*-\s*/g, '-');
  return flags.length ? soft(flags[0], {}, norm, { flags }) : ok(norm);
}
/* "Mohammed Ali" ≈ "Muhammad Ali": a loose key for duplicate detection (server side). */
export function nameKey(s) {
  return clean(s).toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
    .replace(/ph/g, 'f').replace(/[aeiouy]+/g, 'a').replace(/(.)\1+/g, '$1').replace(/[^\p{L} ]/gu, '');
}
