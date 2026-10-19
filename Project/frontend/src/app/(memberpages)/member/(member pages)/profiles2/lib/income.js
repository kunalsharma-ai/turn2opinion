/* Income questions: range-based (never an exact amount), shown in the respondent's local currency, with a
   USD fallback list for countries that have no local brackets — so the question never silently disappears.
   The payload records currency, period (annual, before tax) and scope (personal / household): see docs/DATA.md. */
import { CURRENCY } from './validate/currency.js';
import { t, lang } from '../i18n/index.js';
import { bcp } from '../i18n/languages.js';

export const INCOME_Q = /^(personal|household)-income$/;
export const PREFER_NOT = 'Prefer not to say';
const FALLBACK = ['Up to 5000', '5000 - 9999', '10000 - 19999', '20000 - 34999', '35000 - 49999', '50000 - 74999', '75000 - 99999', '100000 - 149999', '150000 - 249999', '250000 and above'].map((x) => 'USD ' + x);

const num = (s) => Number(String(s).replace(/[^\d.]/g, '')) || 0;
export function parseRange(label) {
  const L = String(label).replace(/^[A-Z]{3}\s+/, '').replace(/,/g, '').trim();
  let m;
  if ((m = L.match(/^(?:up to|under|less than|below)\s*([\d.]+)/i))) return { lo: 0, hi: num(m[1]) };
  if ((m = L.match(/^([\d.]+)\s*(?:and above|\+|or more|and over|above)/i))) return { lo: num(m[1]), hi: Infinity };
  if ((m = L.match(/^([\d.]+)\s*[-–to]+\s*([\d.]+)/i))) return { lo: num(m[1]), hi: num(m[2]) };
  return null;
}
/* Sort brackets low→high, add the fallback list and "Prefer not to say". */
export function incomeOptions(raw) {
  let r = (raw || []).filter((o) => o[1] !== PREFER_NOT);
  const fallback = !r.length;
  if (fallback) r = FALLBACK.map((x) => [x, x]);
  r = r.map((o) => [o, parseRange(o[0])]).sort((a, b) => (a[1] ? a[1].lo : 1e18) - (b[1] ? b[1].lo : 1e18)).map((x) => x[0]);
  r.push([PREFER_NOT, PREFER_NOT]);
  return { opts: r, fallback };
}
export function currencyFor(country, value) {
  if (/^USD /.test(String(value || ''))) return 'USD';
  return CURRENCY[country] || 'USD';
}
const fmts = new Map();
function money(n, cur) {
  const k = lang() + cur; let f = fmts.get(k);
  if (!f) { try { f = new Intl.NumberFormat(bcp(lang()), { style: 'currency', currency: cur, maximumFractionDigits: 0, currencyDisplay: 'narrowSymbol' }); } catch (e) { f = new Intl.NumberFormat('en', { style: 'currency', currency: cur, maximumFractionDigits: 0 }); } fmts.set(k, f); }
  return f.format(n);
}
/* "1000000 - 1499999" → "₹10,00,000 – ₹14,99,999" (locale grouping); returns null for non-range labels. */
export function incomeLabel(label, country) {
  if (label === PREFER_NOT) return null;
  const r = parseRange(label); if (!r) return null;
  const cur = currencyFor(country, label);
  const s = r.lo === 0 ? t('inc_upto', { a: money(r.hi, cur) }) : r.hi === Infinity ? t('inc_above', { a: money(r.lo, cur) }) : t('inc_range', { a: money(r.lo, cur), b: money(r.hi, cur) });
  return /^USD /.test(label) && CURRENCY[country] !== 'USD' ? s + ' ' + t('inc_usd') : s;
}
export function incomeMeta(A) {
  const cur = (v) => (v ? currencyFor(A.country, v) : null);
  return {
    personal: A['personal-income'] ? { range: A['personal-income'], currency: cur(A['personal-income']), period: 'annual', basis: 'gross', scope: 'personal' } : null,
    household: A['household-income'] ? { range: A['household-income'], currency: cur(A['household-income']), period: 'annual', basis: 'gross', scope: 'household' } : null,
    earningCurrency: A['add-income-currency'] || null, payFrequency: A['add-income-period'] || null,
  };
}
