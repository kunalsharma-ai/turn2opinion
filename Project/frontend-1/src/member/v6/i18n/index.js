// Text for the v6 Profiles & Surveys design. The member area is English-only for now, so this is a
// small stand-in for the v6 i18n module: same t()/nf() signatures, English strings from en.js.
import EN from './en.js';

const NF = new Intl.NumberFormat('en');
export const nf = (n) => NF.format(Number(n) || 0);
export function t(key, vars) {
  const s = EN[key] ?? key;
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? (typeof vars[k] === 'number' ? nf(vars[k]) : vars[k]) : m));
}
export const tr = (s) => s;
export const useI18n = () => null;
export const lang = () => 'en';
