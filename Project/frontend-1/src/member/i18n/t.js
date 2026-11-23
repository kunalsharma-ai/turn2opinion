// Member-area strings. Components never hard-code copy: they call t('key', vars).
// Add a language by adding a file next to en.js (same keys) and registering it in DICTS.
// Keys missing from a language fall back to English. The site's page translator
// (src/i18n/engine.js, 135 languages) still translates the rendered page on top of this,
// so a language with no dictionary file yet is translated automatically.
import base from './en.js';
import extra from './en-x.js';
import engage from './en-e.js';
import grow from './en-g.js';

const en = { ...base, ...extra, ...engage, ...grow };

const DICTS = { en };
let active = 'en';

export function setMemberLanguage(code) {
  active = DICTS[code] ? code : 'en';
}

export function t(key, vars) {
  const raw = (DICTS[active] && DICTS[active][key]) ?? en[key] ?? key;
  if (!vars) return raw;
  return String(raw).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''));
}

/** Plural helper: t(`${key}_one`) / t(`${key}_other`). */
export function tn(key, n, vars = {}) {
  return t(`${key}_${n === 1 ? 'one' : 'other'}`, { n: fmt(n), ...vars });
}

export function fmt(n, opts) {
  try {
    return new Intl.NumberFormat(undefined, opts).format(Number(n) || 0);
  } catch {
    return String(n);
  }
}

export function relTime(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  const days = Math.floor((startOfDay(new Date()) - startOfDay(d)) / 864e5);
  if (days <= 0) return t('time.today');
  if (days === 1) return t('time.yesterday');
  if (days < 7) return t('time.daysAgo', { n: days });
  try {
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric' });
  } catch {
    return d.toDateString();
  }
}
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
