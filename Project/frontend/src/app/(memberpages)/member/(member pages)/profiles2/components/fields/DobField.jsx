import { useMemo } from 'react';
import { Icon } from '../Icon.jsx';
import { t, lang } from '../../i18n/index.js';
import { bcp } from '../../i18n/languages.js';

/* Date of birth as Day / Month / Year (DD / MM / YYYY). Month names follow the visitor's language.
   Partial dates are stored as e.g. "1990-05-" so validation can say "please enter a complete date";
   the server recalculates the age from the full ISO date. */
export default function DobField({ s, n, value, act, invalid }) {
  const code = lang();
  const [y = '', m = '', d = ''] = String(value || '').split('-');
  const months = useMemo(() => {
    let f; try { f = new Intl.DateTimeFormat(bcp(code), { month: 'long', timeZone: 'UTC' }); } catch (e) { f = new Intl.DateTimeFormat('en', { month: 'long', timeZone: 'UTC' }); }
    return Array.from({ length: 12 }, (_, i) => f.format(new Date(Date.UTC(2000, i, 1))));
  }, [code]);
  const now = new Date().getFullYear(), minor = s.prof.c === 'minor';
  const years = useMemo(() => { const a = []; for (let k = now - (minor ? 10 : 16); k >= 1900; k--) a.push(k); return a; }, [now, minor]);
  const set = (yy, mm, dd) => act.answer(n, yy || mm || dd ? `${yy}-${mm}-${dd}` : '', { live: !!(yy && mm && dd), click: true });
  const pad = (x) => String(x).padStart(2, '0');
  return (
    <div className={'dob' + (invalid ? ' bad' : '')} role="group" aria-labelledby="qh" aria-describedby="er">
      <span className="fi"><Icon n="calendar" /></span>
      <label><span>{t('dob_day')}</span>
        <select id="qi" value={d} onChange={(e) => set(y, m, e.target.value)} autoComplete="bday-day">
          <option value="">DD</option>{Array.from({ length: 31 }, (_, i) => <option key={i} value={pad(i + 1)}>{pad(i + 1)}</option>)}
        </select></label>
      <label><span>{t('dob_month')}</span>
        <select value={m} onChange={(e) => set(y, e.target.value, d)} autoComplete="bday-month">
          <option value="">MM</option>{months.map((nm, i) => <option key={i} value={pad(i + 1)}>{pad(i + 1)} · {nm}</option>)}
        </select></label>
      <label><span>{t('dob_year')}</span>
        <select value={y} onChange={(e) => set(e.target.value, m, d)} autoComplete="bday-year">
          <option value="">YYYY</option>{years.map((k) => <option key={k} value={k}>{k}</option>)}
        </select></label>
    </div>
  );
}
