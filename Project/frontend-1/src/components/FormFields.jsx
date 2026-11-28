// Accessible, animated form controls: Field wrapper, CountryPicker (flags + search),
// PhoneField (flag + dial code + number) and DateField (calendar with month/year jump).
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { COUNTRIES } from '../data/countries.js';
import { Flag } from './Brand.jsx';
import Icon from './Icon.jsx';
import Floating from './Floating.jsx';

export function Field({ id, label, error, hint, children, optional, className = '', valid }) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${valid ? 'is-valid' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label} {optional && <span className="field-opt">(optional)</span>}
        </label>
      )}
      <div className="field-control">
        {children}
        {valid && !error && (
          <span className="field-tick" aria-hidden="true">
            <Icon name="check" size={14} strokeWidth={2.6} />
          </span>
        )}
      </div>
      {error ? (
        <p className="field-error" id={`${id}-err`} role="alert">
          <Icon name="close" size={12} strokeWidth={2.6} /> {error}
        </p>
      ) : hint ? (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Searchable country list. value = ISO code. showDial adds dial codes. */
export function CountryPicker({ id, value, onChange, onBlur, showDial = false, placeholder = 'Select country', invalid, compact = false, label }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hi, setHi] = useState(0);
  const root = useRef(null);
  const pop = useRef(null);
  const search = useRef(null);
  const listId = useId();
  const sel = COUNTRIES.find((c) => c.c === value);

  const items = useMemo(() => {
    const s = q.trim().toLowerCase().replace(/^\+/, '');
    if (!s) return COUNTRIES;
    const rank = (c) => {
      const n = c.n.toLowerCase();
      if (n === s || c.c.toLowerCase() === s) return 0;
      if (n.startsWith(s)) return 1;
      if (c.d.replace('+', '').startsWith(s)) return 2;
      return 3;
    };
    return COUNTRIES.filter((c) => c.n.toLowerCase().includes(s) || c.c.toLowerCase() === s || c.d.replace('+', '').startsWith(s)).sort(
      (a, b) => rank(a) - rank(b)
    );
  }, [q]);

  useEffect(() => {
    if (!open) return undefined;
    setHi(Math.max(0, items.findIndex((c) => c.c === value)));
    setTimeout(() => search.current && search.current.focus(), 10);
    const out = (e) => {
      if (root.current && !root.current.contains(e.target) && !(pop.current && pop.current.contains(e.target))) {
        setOpen(false);
        onBlur && onBlur();
      }
    };
    document.addEventListener('mousedown', out);
    return () => document.removeEventListener('mousedown', out);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = root.current && root.current.querySelector(`[data-idx="${hi}"]`);
    if (el && open) el.scrollIntoView({ block: 'nearest' });
  }, [hi, open]);

  const pick = (c) => {
    onChange(c.c);
    setOpen(false);
    setQ('');
    const btn = root.current && root.current.querySelector('.cp-trigger');
    btn && btn.focus();
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHi((h) => Math.min(items.length - 1, h + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHi((h) => Math.max(0, h - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[hi]) pick(items[hi]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className={`cp ${compact ? 'cp-compact' : ''} ${open ? 'is-open' : ''}`} ref={root}>
      <button
        id={id}
        type="button"
        className={`cp-trigger input ${invalid ? 'is-invalid' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label ? `${label}: ${sel ? sel.n : 'not selected'}` : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        {sel ? (
          <>
            <Flag code={sel.c} size={16} />
            <span className="cp-text">{compact ? sel.d : showDial ? `${sel.n} (${sel.d})` : sel.n}</span>
          </>
        ) : (
          <span className="cp-text cp-ph">{compact ? '+ code' : placeholder}</span>
        )}
        <Icon name="chevron" size={16} className="cp-caret" />
      </button>
      {open && (
        <Floating anchor={root} popRef={pop} width={300} className="cp-pop">
          <div className="cp-search">
            <Icon name="search" size={16} />
            <input
              ref={search}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setHi(0);
              }}
              onKeyDown={onKey}
              placeholder="Search country or code"
              aria-label="Search countries"
              aria-controls={listId}
              aria-activedescendant={items[hi] ? `${listId}-${items[hi].c}` : undefined}
              role="combobox"
              aria-expanded="true"
            />
          </div>
          <ul className="cp-list" role="listbox" id={listId}>
            {items.map((c, i) => (
              <li
                key={c.c}
                id={`${listId}-${c.c}`}
                role="option"
                data-idx={i}
                aria-selected={c.c === value}
                className={`cp-opt ${i === hi ? 'is-hi' : ''} ${c.c === value ? 'is-sel' : ''}`}
                onMouseEnter={() => setHi(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(c);
                }}
              >
                <Flag code={c.c} size={14} />
                <span className="cp-name">{c.n}</span>
                {(showDial || compact) && <span className="cp-dial">{c.d}</span>}
              </li>
            ))}
            {!items.length && <li className="cp-empty">No match. Try a country name or dial code.</li>}
          </ul>
        </Floating>
      )}
    </div>
  );
}

export function PhoneField({ id, country, number, onCountry, onNumber, onBlur, invalid, describedBy }) {
  return (
    <div className={`phone ${invalid ? 'is-invalid' : ''}`}>
      <CountryPicker id={`${id}-cc`} value={country} onChange={onCountry} compact label="Country dial code" invalid={invalid} />
      <input
        id={id}
        className={`input ${invalid ? 'is-invalid' : ''}`}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={number}
        onChange={(e) => onNumber(e.target.value.replace(/[^\d\s-]/g, '').slice(0, 18))}
        onBlur={onBlur}
        placeholder="Mobile number"
        aria-invalid={invalid ? 'true' : 'false'}
        aria-describedby={describedBy}
      />
    </div>
  );
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const pad = (n) => String(n).padStart(2, '0');
export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export function parseISO(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getMonth() === Number(m[2]) - 1 ? d : null;
}
export function formatDate(s) {
  const d = parseISO(s);
  return d ? `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : '';
}

/** Calendar date picker (full date of birth: day, month and year). value = 'YYYY-MM-DD'. */
const DATE_W = { fixed: 330 };
export function DateField({ id, value, onChange, onBlur, invalid, minYear = 1920, maxDate = new Date(), minDate = null, lockedYears = 0, foot, describedBy }) {
  // minDate narrows the pickable range (e.g. the Teen 13-17 window). lockedYears shows that many
  // extra years either side in the year menu, greyed out, so people can see they are not allowed.
  const loY = minDate ? minDate.getFullYear() : minYear;
  const sel = parseISO(value);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const base = sel || (minDate ? new Date(maxDate.getFullYear(), 0, 1) : new Date(maxDate.getFullYear() - 25, 0, 1));
    return { y: base.getFullYear(), m: base.getMonth() };
  });
  const [focusDay, setFocusDay] = useState(sel ? sel.getDate() : 1);
  // 'day' shows the calendar; 'month' and 'year' swap it for a picker drawn inside the popup. These
  // used to be native <select> menus, whose long year list opened over the calendar and the form (#55).
  const [pick, setPick] = useState('day');
  const root = useRef(null);
  const pop = useRef(null);
  const grid = useRef(null);
  const yearList = useRef(null);
  const monthList = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    if (sel) setView({ y: sel.getFullYear(), m: sel.getMonth() });
    const out = (e) => {
      if (root.current && !root.current.contains(e.target) && !(pop.current && pop.current.contains(e.target))) {
        setOpen(false);
        onBlur && onBlur();
      }
    };
    document.addEventListener('mousedown', out);
    return () => document.removeEventListener('mousedown', out);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) setPick('day');
  }, [open]);

  useEffect(() => {
    if (!open || pick !== 'day' || !grid.current) return;
    const b = grid.current.querySelector(`[data-day="${focusDay}"]`);
    b && b.focus({ preventScroll: true });
  }, [open, focusDay, view, pick]);

  useEffect(() => {
    // open the year list on the year being viewed, scrolled to sit in the middle of the list
    if (!open || pick !== 'year' || !yearList.current) return;
    const list = yearList.current;
    const b = list.querySelector(`[data-year="${view.y}"]`) || list.querySelector('button:not(:disabled)');
    if (!b) return;
    list.scrollTop = b.offsetTop - list.clientHeight / 2 + b.offsetHeight / 2;
    b.focus({ preventScroll: true });
  }, [open, pick]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open || pick !== 'month' || !monthList.current) return;
    const b = monthList.current.querySelector(`[data-month="${view.m}"]`);
    b && !b.disabled && b.focus({ preventScroll: true });
  }, [open, pick]); // eslint-disable-line react-hooks/exhaustive-deps

  const daysIn = new Date(view.y, view.m + 1, 0).getDate();
  const lead = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
  const years = [];
  for (let y = maxDate.getFullYear() + lockedYears; y >= loY - lockedYears; y--) years.push(y);
  const yearOff = (y) => y > maxDate.getFullYear() || y < loY;

  const monthOff = (m) => new Date(view.y, m, 1) > maxDate || (minDate && new Date(view.y, m + 1, 0) < minDate);
  const pickYear = (y) => {
    if (yearOff(y)) return;
    // keep the month in range for the new year (e.g. a Teen picking the earliest allowed year)
    let m = view.m;
    if (new Date(y, m, 1) > maxDate) m = maxDate.getMonth();
    if (minDate && new Date(y, m + 1, 0) < minDate) m = minDate.getMonth();
    setView({ y, m });
    setFocusDay((f) => Math.min(f, new Date(y, m + 1, 0).getDate()));
    setPick('day');
  };
  const pickMonth = (m) => {
    if (monthOff(m)) return;
    setView((v) => ({ ...v, m }));
    setFocusDay((f) => Math.min(f, new Date(view.y, m + 1, 0).getDate()));
    setPick('day');
  };
  const onPickKey = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setPick('day');
      return;
    }
    const cols = pick === 'year' ? 4 : 3;
    const map = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -cols, ArrowDown: cols };
    if (!map[e.key]) return;
    e.preventDefault();
    const all = Array.from(e.currentTarget.querySelectorAll('button'));
    let i = all.indexOf(document.activeElement) + map[e.key];
    // skip over greyed-out (not eligible) options in the direction of travel
    while (all[i] && all[i].disabled) i += Math.sign(map[e.key]);
    if (all[i]) all[i].focus();
  };

  const disabled = (d) => {
    const t = new Date(view.y, view.m, d);
    return t > maxDate || (minDate && t < minDate);
  };
  const choose = (d) => {
    if (disabled(d)) return;
    onChange(toISO(new Date(view.y, view.m, d)));
    setOpen(false);
    const t = root.current && root.current.querySelector('.date-trigger');
    t && t.focus();
  };
  const shiftMonth = (delta) => {
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return d.getFullYear() < loY || d.getFullYear() > maxDate.getFullYear() ? v : { y: d.getFullYear(), m: d.getMonth() };
    });
  };
  const onGridKey = (e) => {
    const map = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (map[e.key]) {
      e.preventDefault();
      let n = focusDay + map[e.key];
      if (n < 1) {
        shiftMonth(-1);
        n = 28;
      } else if (n > daysIn) {
        shiftMonth(1);
        n = 1;
      }
      setFocusDay(n);
    } else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className={`date ${open ? 'is-open' : ''}`} ref={root}>
      <button
        id={id}
        type="button"
        className={`date-trigger input ${invalid ? 'is-invalid' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={describedBy}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="calendar" size={18} />
        <span className={value ? '' : 'cp-ph'}>{value ? formatDate(value) : 'Pick day, month and year'}</span>
        <Icon name="chevron" size={16} className="cp-caret" />
      </button>
      {open && (
        <Floating anchor={root} popRef={pop} width={DATE_W} className="date-pop" role="dialog" aria-label="Choose date of birth">
          <div className="date-head">
            <button type="button" className="date-nav" onClick={() => shiftMonth(-1)} aria-label="Previous month">
              <Icon name="chevronLeft" size={18} />
            </button>
            <button
              type="button"
              className={`date-sel ${pick === 'month' ? 'is-on' : ''}`}
              aria-expanded={pick === 'month'}
              aria-label={`Month: ${MONTHS[view.m]}. Choose month`}
              onClick={() => setPick((p) => (p === 'month' ? 'day' : 'month'))}
            >
              <span>{MONTHS[view.m]}</span>
              <Icon name="chevron" size={14} />
            </button>
            <button
              type="button"
              className={`date-sel ${pick === 'year' ? 'is-on' : ''}`}
              aria-expanded={pick === 'year'}
              aria-label={`Year: ${view.y}. Choose year`}
              onClick={() => setPick((p) => (p === 'year' ? 'day' : 'year'))}
            >
              <span>{view.y}</span>
              <Icon name="chevron" size={14} />
            </button>
            <button type="button" className="date-nav" onClick={() => shiftMonth(1)} aria-label="Next month">
              <Icon name="chevronRight" size={18} />
            </button>
          </div>
          {pick === 'year' && (
            <div className="date-years" ref={yearList} role="listbox" aria-label="Year" onKeyDown={onPickKey}>
              {years.map((y) => (
                <button
                  type="button"
                  key={y}
                  data-year={y}
                  role="option"
                  aria-selected={y === view.y}
                  className={`date-opt ${y === view.y ? 'is-sel' : ''}`}
                  disabled={yearOff(y)}
                  title={yearOff(y) ? 'Not eligible' : undefined}
                  aria-label={yearOff(y) ? `${y}, not eligible` : String(y)}
                  onClick={() => pickYear(y)}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
          {pick === 'month' && (
            <div className="date-months" ref={monthList} role="listbox" aria-label="Month" onKeyDown={onPickKey}>
              {MONTHS.map((m, i) => (
                <button
                  type="button"
                  key={m}
                  role="option"
                  aria-selected={i === view.m}
                  className={`date-opt ${i === view.m ? 'is-sel' : ''}`}
                  disabled={monthOff(i)}
                  data-month={i}
                  onClick={() => pickMonth(i)}
                >
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          )}
          {pick === 'day' && (
          <>
          <div className="date-dow" aria-hidden="true">
            {DOW.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="date-grid" ref={grid} role="grid" onKeyDown={onGridKey}>
            {Array.from({ length: lead }).map((_, i) => (
              <span key={`l${i}`} />
            ))}
            {Array.from({ length: daysIn }).map((_, i) => {
              const d = i + 1;
              const isSel = sel && sel.getFullYear() === view.y && sel.getMonth() === view.m && sel.getDate() === d;
              return (
                <button
                  type="button"
                  key={d}
                  data-day={d}
                  tabIndex={d === focusDay ? 0 : -1}
                  className={`date-day ${isSel ? 'is-sel' : ''}`}
                  disabled={disabled(d)}
                  aria-label={`${d} ${MONTHS[view.m]} ${view.y}`}
                  aria-pressed={isSel ? 'true' : 'false'}
                  onClick={() => choose(d)}
                >
                  {d}
                </button>
              );
            })}
          </div>
          </>
          )}
          <p className="date-foot">{foot || 'Tap the month or year to jump quickly.'}</p>
        </Floating>
      )}
    </div>
  );
}

/** Age in whole years on a given date. */
export function ageOn(dobISO, now = new Date()) {
  const d = parseISO(dobISO);
  if (!d) return null;
  let a = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
  return a;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const FREE_MAIL = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'aol.com', 'proton.me', 'protonmail.com', 'rediffmail.com', 'yandex.com', 'mail.com', 'gmx.com'];

export function passwordStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(4, s);
}
