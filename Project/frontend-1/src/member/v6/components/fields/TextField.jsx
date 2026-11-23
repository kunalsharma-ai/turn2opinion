import { Icon } from '../Icon.jsx';
import { fieldIcon } from '../../lib/present.js';
import { classifyTitle } from '../../lib/validate/jobtitle.js';
import { track } from '../../lib/signals.js';
import { t, tr } from '../../i18n/index.js';
import PhoneField from './PhoneField.jsx';
import DobCalendar from './DobCalendar.jsx';

const IM = { email: 'email', tel: 'tel', url: 'url' };

/* Free-text answers (v6 components/fields/TextField.jsx). The field registry (lib/validate/fields.js) decides
   the control: phone → country + number, dob → typed date + calendar, count → stepper, long → textarea,
   everything else → an icon-led input with the right keyboard, autocomplete and example placeholder. */
export default function TextField({ s, n, value, act, invalid }) {
  const sp = s.spec(n),
    ctx = s.ctx(n),
    v = value == null ? '' : String(value);
  const phRaw = typeof sp.ph === 'function' ? sp.ph(ctx) : sp.ph,
    ph = !phRaw || phRaw === 'Type here…' ? t('type_here') : tr(phRaw);
  if (sp.kind === 'phone') return <PhoneField s={s} n={n} value={v} act={act} invalid={invalid} />;
  if (sp.kind === 'dob') return <DobCalendar s={s} n={n} value={v} act={act} invalid={invalid} />;
  const onChange = (e) => act.answer(n, e.target.value);
  const onKey = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      act.next();
    }
  };
  const common = { id: 'qi', className: 'in', 'data-q': '', 'aria-labelledby': 'qh', 'aria-describedby': 'er', 'aria-invalid': invalid || undefined, onChange, onKeyDown: onKey, onPaste: () => track.paste(n) };
  const ic = sp.kind === 'email' ? 'mail' : sp.kind === 'name' ? 'user' : sp.kind === 'url' ? 'link' : sp.kind === 'postal' || sp.kind === 'address' ? 'pin' : sp.kind === 'company' ? 'building' : sp.kind === 'jobtitle' ? 'briefcase' : fieldIcon(n);

  if (sp.long) {
    return (
      <div className="fld ta">
        <span className="fi">
          <Icon n={ic} />
        </span>
        <textarea {...common} rows={4} maxLength={500} placeholder={ph} value={v} autoComplete={sp.ac || 'off'} />
      </div>
    );
  }
  if (sp.kind === 'count') {
    const step = (d) => act.answer(n, String(Math.max(0, (parseInt(v, 10) || 0) + d)));
    return (
      <div className="stp">
        <button type="button" className="sb" aria-label={t('decrease')} onClick={() => step(-1)}>
          <Icon n="minus" />
        </button>
        <input {...common} inputMode="numeric" pattern="[0-9]*" value={v} placeholder="0" maxLength={3} autoComplete="off" dir="ltr" />
        <button type="button" className="sb" aria-label={t('increase')} onClick={() => step(1)}>
          <Icon n="add" />
        </button>
      </div>
    );
  }
  const ltr = ['email', 'url', 'postal', 'upi', 'bank', 'handle', 'year'].includes(sp.kind);
  const single = sp.single && v === '—';
  const map = sp.kind === 'jobtitle' && v.trim().length > 2 ? classifyTitle(v) : null;
  return (
    <>
      <div className={'fld' + (single ? ' dis' : '')}>
        <span className="fi">
          <Icon n={ic} />
        </span>
        <input
          {...common}
          type={sp.type === 'email' ? 'email' : sp.type === 'url' ? 'url' : 'text'}
          inputMode={sp.im || IM[sp.type]}
          value={single ? '' : v}
          placeholder={ph}
          maxLength={sp.kind === 'address' ? 200 : 120}
          autoComplete={sp.ac || 'off'}
          spellCheck="false"
          dir={ltr ? 'ltr' : undefined}
          disabled={single}
          autoCapitalize={sp.kind === 'name' || sp.kind === 'company' ? 'words' : sp.kind === 'email' || sp.kind === 'url' ? 'none' : undefined}
        />
        <span className="vk">
          <Icon n="check" />
        </span>
      </div>
      {sp.single && (
        <label className="tick">
          <input type="checkbox" checked={single} onChange={(e) => act.answer(n, e.target.checked ? '—' : '')} />
          <span>{t('one_name')}</span>
        </label>
      )}
      {map && (
        <p className="maphint">
          <Icon n="sparkle" />
          {t('title_map', { seniority: map.seniority, department: map.department })}
        </p>
      )}
    </>
  );
}
