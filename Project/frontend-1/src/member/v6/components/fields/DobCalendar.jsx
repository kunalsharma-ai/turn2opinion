/* CHANGE-17 · Interactive date-of-birth calendar.
   - Type it (DD / MM / YYYY, digits only — slashes are added for you) or pick it on the calendar.
   - The calendar opens on a YEAR grid (20 years per page) so earlier birth years are two taps away,
     then a MONTH grid, then the DAY grid. The header switches views; ‹ › page through.
   - Future dates and dates younger than the panel's minimum age (16 for adults, 10 for under-18s — the same
     range as v5's year list) are disabled. Validation (lib/validate/dob.js) is unchanged.
   - Keyboard: arrows move by day/week, PageUp/PageDown by month (Shift = year), Home/End, Enter picks,
     Esc closes. The grid is a role="grid" with aria-selected / aria-disabled and full date labels.
   - The panel opens inline below the field (never clipped by the card or the page edge), full width on phones.
   Stored value is unchanged: "YYYY-MM-DD" (partial dates like "1990-05-" while incomplete). */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../Icon.jsx';
import { t, nf, lang } from '../../i18n/index.js';
const bcp = () => 'en';

const pad = (x) => String(x).padStart(2, '0');
const dim = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

export default function DobCalendar({ s, n, value, act, invalid }) {
  const code = lang(), loc = bcp(code), minor = s.prof.c === 'minor';
  const now = new Date(), maxY = now.getFullYear() - (minor ? 10 : 16), minY = 1900;
  const maxD = new Date(maxY, now.getMonth(), now.getDate());
  const [y = '', m = '', d = ''] = String(value || '').split('-');
  const [text, setText] = useState(() => (d || m || y ? `${d}${d ? '/' : ''}${m}${m ? '/' : ''}${y}` : ''));
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('year');
  const [cy, setCy] = useState(() => (y ? +y : Math.min(maxY, 1995)));
  const [cm, setCm] = useState(() => (m ? +m - 1 : 0));
  const [focus, setFocus] = useState(() => (d ? +d : 1));
  const grid = useRef(null), inp = useRef(null);

  const fmt = useMemo(() => {
    const mk = (o) => { try { return new Intl.DateTimeFormat(loc, Object.assign({ timeZone: 'UTC' }, o)); } catch (e) { return new Intl.DateTimeFormat('en', Object.assign({ timeZone: 'UTC' }, o)); } };
    return { month: mk({ month: 'long' }), short: mk({ month: 'short' }), wd: mk({ weekday: 'narrow' }), full: mk({ day: 'numeric', month: 'long', year: 'numeric' }) };
  }, [loc]);
  const yf = useMemo(() => { let f; try { f = new Intl.NumberFormat(loc, { useGrouping: false }); } catch (e) { f = new Intl.NumberFormat('en', { useGrouping: false }); } return (v) => f.format(v); }, [loc]);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => fmt.short.format(new Date(Date.UTC(2000, i, 1)))), [fmt]);
  const wds = useMemo(() => Array.from({ length: 7 }, (_, i) => fmt.wd.format(new Date(Date.UTC(2024, 0, 1 + i)))), [fmt]);   // Monday first

  const store = (yy, mm, dd, live) => act.answer(n, yy || mm || dd ? `${yy}-${mm}-${dd}` : '', { live, click: true });
  const choose = (yy, mm, dd) => {
    store(String(yy), pad(mm + 1), pad(dd), true);
    setText(`${pad(dd)}/${pad(mm + 1)}/${yy}`); setOpen(false);
    act.auto && setTimeout(() => inp.current && inp.current.focus(), 0);
  };
  const onType = (e) => {
    const dig = e.target.value.replace(/\D/g, '').slice(0, 8);
    const dd = dig.slice(0, 2), mm = dig.slice(2, 4), yy = dig.slice(4, 8);
    setText(dd + (dig.length > 2 ? '/' + mm : '') + (dig.length > 4 ? '/' + yy : ''));
    store(yy, mm, dd, dig.length === 8);
    if (yy.length === 4 && +yy >= minY && +yy <= maxY) { setCy(+yy); if (mm && +mm >= 1 && +mm <= 12) setCm(+mm - 1); }
  };
  const disabled = (yy, mm, dd) => new Date(yy, mm, dd) > maxD || yy < minY;
  const sel = y && m && d ? { y: +y, m: +m - 1, d: +d } : null;

  /* keyboard on the day grid */
  const moveDay = (delta) => {
    const dt = new Date(cy, cm, focus + delta);
    if (dt > maxD || dt.getFullYear() < minY) return;
    setCy(dt.getFullYear()); setCm(dt.getMonth()); setFocus(dt.getDate());
  };
  const onGridKey = (e) => {
    const k = e.key;
    if (k === 'ArrowLeft') moveDay(-1); else if (k === 'ArrowRight') moveDay(1); else if (k === 'ArrowUp') moveDay(-7); else if (k === 'ArrowDown') moveDay(7);
    else if (k === 'PageUp' || k === 'PageDown') { const dir = k === 'PageUp' ? -1 : 1, dt = new Date(cy + (e.shiftKey ? dir : 0), cm + (e.shiftKey ? 0 : dir), 1); if (dt <= maxD && dt.getFullYear() >= minY) { setCy(dt.getFullYear()); setCm(dt.getMonth()); setFocus(Math.min(focus, dim(dt.getFullYear(), dt.getMonth()))); } }
    else if (k === 'Home') moveDay(-((new Date(cy, cm, focus).getDay() + 6) % 7)); else if (k === 'End') moveDay(6 - ((new Date(cy, cm, focus).getDay() + 6) % 7));
    else if (k === 'Enter' || k === ' ') { if (!disabled(cy, cm, focus)) choose(cy, cm, focus); } else if (k === 'Escape') { setOpen(false); inp.current && inp.current.focus(); } else return;
    e.preventDefault();
  };
  useEffect(() => { if (open && view === 'day' && grid.current) { const b = grid.current.querySelector(`[data-d="${focus}"]`); if (b && grid.current.contains(document.activeElement)) b.focus(); } }, [focus, cm, cy, open, view]);
  useEffect(() => { if (!open) return; const k = (e) => { if (e.key === 'Escape') { setOpen(false); inp.current && inp.current.focus(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, [open]);

  const openCal = () => { setOpen((o) => !o); setView(sel ? 'day' : 'year'); if (sel) { setCy(sel.y); setCm(sel.m); setFocus(sel.d); } };
  const page = (dir) => {
    if (view === 'year') setCy((v) => Math.max(minY + 10, Math.min(maxY, v + dir * 20)));
    else if (view === 'month') setCy((v) => Math.max(minY, Math.min(maxY, v + dir)));
    else { const dt = new Date(cy, cm + dir, 1); if (dt <= maxD && dt.getFullYear() >= minY) { setCy(dt.getFullYear()); setCm(dt.getMonth()); } }
  };
  /* the 20-year page that contains cy */
  const y0 = Math.max(minY, Math.min(maxY - 19, cy - ((cy - minY) % 20)));
  const first = (new Date(cy, cm, 1).getDay() + 6) % 7, days = dim(cy, cm);
  const head = view === 'year' ? `${yf(y0)} – ${yf(Math.min(maxY, y0 + 19))}` : view === 'month' ? yf(cy) : `${fmt.month.format(new Date(Date.UTC(cy, cm, 1)))} ${yf(cy)}`;

  return (
    <div className={'dob6' + (invalid ? ' bad' : '') + (open ? ' open' : '')}>
      <div className="dob6-f">
        <span className="fi6" aria-hidden="true">🎂</span>
        <input id="qi" ref={inp} className="in6" inputMode="numeric" autoComplete="bday" placeholder={t('v6_dob_ph')} value={text} onChange={onType} maxLength={10}
          aria-labelledby="qh" aria-describedby="er dobh" aria-invalid={invalid || undefined} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); act.next(); } else if (e.key === 'ArrowDown' && e.altKey) { e.preventDefault(); openCal(); } }} />
        <button type="button" className="dob6-btn" onClick={openCal} aria-expanded={open} aria-controls="dobcal" aria-label={t('v6_dob_open')} data-snd="open"><Icon n="calendar" /></button>
      </div>
      <p className="dob6-h" id="dobh">{sel ? fmt.full.format(new Date(Date.UTC(sel.y, sel.m, sel.d))) : t('v6_dob_hint')}</p>
      {open && (
        <div className="cal6" id="dobcal" role="dialog" aria-modal="false" aria-label={t('v6_dob_open')}>
          <div className="cal6-top">
            <button type="button" className="cal6-nav" onClick={() => page(-1)} aria-label={t('v6_prev')}><Icon n="arrow-l" className="flip" /></button>
            <button type="button" className="cal6-head" onClick={() => setView(view === 'day' ? 'month' : 'year')} aria-live="polite">{head}<Icon n="chev" /></button>
            <button type="button" className="cal6-nav" onClick={() => page(1)} aria-label={t('v6_next')}><Icon n="arrow-r" className="flip" /></button>
          </div>
          {view === 'year' && (
            <div className="cal6-years" role="listbox" aria-label={t('dob_year')}>
              {Array.from({ length: 20 }, (_, k) => y0 + k).filter((yy) => yy <= maxY).map((yy) => (
                <button type="button" key={yy} role="option" aria-selected={sel ? sel.y === yy : undefined} className={'cy' + (sel && sel.y === yy ? ' on' : '') + (yy === cy ? ' cur' : '')}
                  onClick={() => { setCy(yy); setView('month'); }}>{yf(yy)}</button>
              ))}
            </div>
          )}
          {view === 'month' && (
            <div className="cal6-months" role="listbox" aria-label={t('dob_month')}>
              {months.map((nm, k) => { const dis = new Date(cy, k, 1) > maxD; return (
                <button type="button" key={k} role="option" disabled={dis} aria-selected={sel ? sel.y === cy && sel.m === k : undefined} className={'cm' + (sel && sel.y === cy && sel.m === k ? ' on' : '')}
                  onClick={() => { setCm(k); setFocus((f) => Math.min(f, dim(cy, k))); setView('day'); }}>{nm}</button>); })}
            </div>
          )}
          {view === 'day' && (
            <div className="cal6-days" role="grid" aria-label={head} ref={grid} onKeyDown={onGridKey}>
              <div className="cal6-wd" role="row">{wds.map((w, k) => <span key={k} role="columnheader">{w}</span>)}</div>
              <div className="cal6-grid" role="row">
                {Array.from({ length: first }, (_, k) => <span key={'e' + k} className="cd e" role="gridcell" />)}
                {Array.from({ length: days }, (_, k) => {
                  const dd = k + 1, dis = disabled(cy, cm, dd), on = sel && sel.y === cy && sel.m === cm && sel.d === dd;
                  return (
                    <span key={dd} role="gridcell" aria-selected={on || undefined}>
                      <button type="button" className={'cd' + (on ? ' on' : '') + (dd === focus ? ' f' : '')} data-d={dd} disabled={dis} tabIndex={dd === focus ? 0 : -1}
                        aria-label={fmt.full.format(new Date(Date.UTC(cy, cm, dd)))} onClick={() => choose(cy, cm, dd)}>{nf(dd)}</button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          <p className="cal6-note">{t('v6_dob_note', { n: minor ? 10 : 16 })}</p>
        </div>
      )}
    </div>
  );
}
