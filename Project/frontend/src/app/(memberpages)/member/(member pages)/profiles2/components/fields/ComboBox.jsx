import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Flag } from '../Icon.jsx';
import { flagFor, ctxFlag, qIcon, norm, optLabel, optLabelPeek } from '../../lib/present.js';
import { burst, finePointer } from '../../lib/fx.js';
import { t, nf, lang, useI18n } from '../../i18n/index.js';

/* Searchable list for long option sets (countries, states, cities, 16,000+ job titles).
   Renders at most 60 matches, ranked: starts with > word starts with > contains, accent-insensitive.
   Search matches both the English name and the name shown in the visitor's language.
   Only the visible rows are sent for translation, and only after typing pauses. */
const LIM = 60;
const normCache = new WeakMap();
const normed = (o) => { let v = normCache.get(o); if (!v) { v = o.map((x) => norm(x[0])); normCache.set(o, v); } return v; };

export default function ComboBox({ s, n, o, value, act, t: tw }) {
  const { v: iv } = useI18n();
  const code = lang();
  const sel = o.find((x) => x[1] == value);
  const label = (x) => (code === 'en' ? x[0] : optLabel(s, n, x[0], x[1]));
  const [text, setText] = useState(sel ? label(sel) : (s.raw[n] || ''));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [settled, setSettled] = useState(true);
  const [dirty, setDirty] = useState(false);   // typed since the last pick → filter by the text
  const inp = useRef(null), list = useRef(null), box = useRef(null);

  /* keep the field text in the current language when the selection's translation arrives */
  useEffect(() => { if (sel && document.activeElement !== inp.current) setText(label(sel)); }, [iv, code]); // eslint-disable-line react-hooks/exhaustive-deps
  /* translate visible rows only once typing has paused for a moment */
  useEffect(() => { setSettled(false); const id = setTimeout(() => setSettled(true), 260); return () => clearTimeout(id); }, [text]);

  const { items, total, q } = useMemo(() => {
    const nl = normed(o), q = norm(sel && !dirty ? '' : text).trim(), a = [], w = [], b = [];
    let total = 0;
    const loc = code !== 'en' && q ? o.map((x) => norm(optLabelPeek(s, n, x[0], x[1]))) : null;
    for (let k = 0; k < o.length; k++) {
      if (!q) { if (a.length < LIM) a.push(k); total++; continue; }
      let l = nl[k], ix = l.indexOf(q);
      if (ix < 0 && loc) { l = loc[k]; ix = l.indexOf(q); }
      if (ix < 0) continue; total++;
      if (ix === 0) { if (a.length < LIM) a.push(k); }
      else if (/[\s(\-/]/.test(l[ix - 1])) { if (w.length < LIM) w.push(k); }
      else if (b.length < LIM) b.push(k);
    }
    return { items: a.concat(w, b).slice(0, LIM), total, q };
  }, [o, text, code, iv, dirty]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setActive(0); if (list.current) list.current.scrollTop = 0; }, [text]);
  useEffect(() => { if (finePointer() && !text) setOpen(true); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, [open]);
  useEffect(() => { const el = list.current && list.current.querySelector(`#cbo${active}`); if (el) el.scrollIntoView({ block: 'nearest' }); }, [active]);

  const pick = (k) => {
    const x = o[k];
    setText(label(x)); setOpen(false); setDirty(false);
    act.answer(n, x[1], { raw: '', prune: true, live: true });
    burst(inp.current, document.getElementById('cd'));
    act.auto(n, null);
  };
  const onInput = (e) => {
    const v = e.target.value, lv = v.trim().toLowerCase();
    const h = lv && o.find((x) => x[0].toLowerCase() === lv || (code !== 'en' && label(x).toLowerCase() === lv));
    setText(v); setOpen(true); setDirty(true);
    act.answer(n, h ? h[1] : '', { raw: h ? '' : v, prune: !!h });
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) setOpen(true); else setActive((a) => (a + 1) % Math.max(1, items.length)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (open) setActive((a) => (a - 1 + items.length) % Math.max(1, items.length)); }
    else if (e.key === 'Escape') { if (open) { e.preventDefault(); setOpen(false); } }
    else if (e.key === 'Enter') { e.preventDefault(); if (open && items.length) pick(items[active]); else act.next(); }
    else if (e.key === 'Tab' && open && items.length && text && !value) pick(items[active]);
  };
  const onBlur = () => setTimeout(() => {
    if (box.current && box.current.contains(document.activeElement)) return;
    setOpen(false);
    if (s.raw[n] && !value) act.setLive();
  }, 120);
  const hl = (l) => {
    if (!q) return l;
    const nl = norm(l), i = nl.indexOf(q);
    if (i < 0 || nl.length !== l.length) return l;
    return <>{l.slice(0, i)}<mark>{l.slice(i, i + q.length)}</mark>{l.slice(i + q.length)}</>;
  };
  const f = sel ? flagFor(s, n, sel[0], sel[1]) : '', cf = ctxFlag(s, n);

  return (
    <>
      <div className={'cb' + (open ? ' open' : '')} id="cb" ref={box}>
        <span className="lead" id="cblead">{f ? <Flag cc={f} /> : cf ? <Flag cc={cf} /> : <Icon n={qIcon(s, n, tw)} />}</span>
        <input id="qi" ref={inp} className="in" data-q="" data-cb="" role="combobox" aria-expanded={open} aria-controls="cbl" aria-autocomplete="list"
          aria-activedescendant={open && items.length ? 'cbo' + active : undefined} autoComplete="off" spellCheck="false"
          value={text} placeholder={t('cb_ph', { n: o.length })} aria-labelledby="qh" aria-describedby="er cbh"
          onChange={onInput} onKeyDown={onKey} onFocus={() => { if (!text) setOpen(true); }} onBlur={onBlur} onClick={() => setOpen(true)} />
        <button type="button" className="cx" id="cbx" aria-label={t('clear')} hidden={!text}
          onClick={() => { setText(''); setDirty(true); act.answer(n, '', { raw: '', prune: true }); inp.current.focus(); setOpen(true); }}><Icon n="x" /></button>
        <span className="cv"><Icon n="chev" /></span>
        {open && (
          <ul className="lb" id="cbl" role="listbox" aria-labelledby="qh" ref={list}>
            {items.length ? items.map((k, j) => {
              const x = o[k], l = code === 'en' ? x[0] : settled ? label(x) : optLabelPeek(s, n, x[0], x[1]);
              return (
                <li key={x[1]} role="option" id={'cbo' + j} data-k={k} aria-selected={j === active} className={x[1] == value ? 'sel' : ''}
                  onPointerDown={(e) => e.preventDefault()} onClick={() => { pick(k); inp.current.focus(); }} onMouseMove={() => j !== active && setActive(j)}>
                  <Flag cc={flagFor(s, n, x[0], x[1])} /><span>{hl(l)}</span>
                  {code !== 'en' && l !== x[0] && <small className="en" lang="en">{x[0]}</small>}
                </li>
              );
            }) : <li className="more" aria-disabled="true">{t('cb_none', { q: text })}</li>}
            {items.length > 0 && total > items.length && <li className="more" aria-disabled="true">{t('cb_more', { a: items.length, b: total })}</li>}
          </ul>
        )}
      </div>
      <p className="cbh" id="cbh"><span>{t('cb_hint', { n: o.length })}</span></p>
    </>
  );
}
