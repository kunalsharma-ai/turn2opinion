import { useMemo, useState } from 'react';
import { sound } from '../../lib/sound.js';
import { themeId } from '../../lib/present.js';
import { Icon, Flag } from '../Icon.jsx';
import { PHONE_META } from '../../lib/validate/phone-meta.js';
import { parsePhone } from '../../lib/validate/phone.js';
import { track } from '../../lib/signals.js';
import { t, regionName, lang } from '../../i18n/index.js';

/* Country code + national number. The answer is kept as "+<code> <number>" while typing and normalised
   to E.164 (+14155552671) when the respondent continues. The country defaults to the residence country,
   then to a guess from the browser region / time zone. */
const EN = typeof Intl !== 'undefined' && Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }) : null;

export default function PhoneField({ s, n, value, act, invalid }) {
  const ctx = s.ctx(n), code = lang();
  const parsed = value ? parsePhone(value, ctx.A['add-residence'] || ctx.A.country || s.guess) : null;
  const [cc, setCc] = useState(() => (parsed && parsed.country) || ctx.A['add-residence'] || ctx.A.country || s.guess || 'US');
  const nat = parsed && !parsed.bad ? parsed.national : String(value || '').replace(/^\+\d+\s*/, '');
  const list = useMemo(() => Object.keys(PHONE_META).map((c) => {
    let nm = regionName(c); if (!nm) { try { nm = EN ? EN.of(c) : c; } catch (e) { nm = c; } }
    return [c, nm, PHONE_META[c][0]];
  }).sort((a, b) => a[1].localeCompare(b[1], code)), [code]);
  const dial = (PHONE_META[cc] || ['1'])[0];
  const set = (c, num) => act.answer(n, num ? `+${(PHONE_META[c] || ['1'])[0]} ${num}` : '');
  return (
    <div className={'fld phone' + (invalid ? ' bad' : '')}>
      <label className="ccode">
        <span className="sr">{t('country_code')}</span>
        <Flag cc={cc} /><span className="dial" dir="ltr">+{dial}</span><Icon n="chev" />
        <select value={cc} onChange={(e) => { setCc(e.target.value); set(e.target.value, nat); sound.click(themeId(s.prof), 'pick'); }} aria-label={t('country_code')}>
          {list.map(([c, nm, d]) => <option key={c} value={c}>{nm} (+{d})</option>)}
        </select>
      </label>
      <input id="qi" className="in" type="tel" inputMode="tel" autoComplete={n === 'phone' ? 'tel-national' : 'off'} dir="ltr" value={nat}
        placeholder={t('type_here')} aria-labelledby="qh" aria-describedby="er" aria-invalid={invalid || undefined} maxLength={20}
        onPaste={() => track.paste(n)}
        onChange={(e) => {
          const v = e.target.value;
          if (/^\s*(\+|00)/.test(v)) { const p = parsePhone(v, cc); if (p && !p.bad) { setCc(p.country); act.answer(n, `+${p.code} ${p.national}`); return; } }
          set(cc, v.replace(/[^\d\s()\-.]/g, ''));
        }}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); act.next(); } }} />
      <span className="vk"><Icon n="check" /></span>
    </div>
  );
}
