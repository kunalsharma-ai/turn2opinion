import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Flag } from '../Icon.jsx';
import { flagFor, ctxFlag, qIcon, norm, optLabel } from '../../lib/present.js';
import { burst, finePointer } from '../../lib/fx.js';
import { t } from '../../i18n/index.js';

/* Multi-select for long lists (countries, states, cities, job roles, any "select all that apply" with 40+
   options): the v6 searchable dropdown (ComboBox) with the picked answers shown as removable chips above it,
   so the whole list is never laid out at once. Same ranking as ComboBox: starts with > word starts with >
   contains, accent-insensitive, at most 60 rows rendered. The list stays open after a pick so several can be
   chosen in a row; "None of these"-type options clear the others. */
const LIM = 60;
const normCache = new WeakMap();
const normed = (o) => {
  let v = normCache.get(o);
  if (!v) {
    v = o.map((x) => norm(x[0]));
    normCache.set(o, v);
  }
  return v;
};

export default function MultiCombo({ s, n, o, value, act, t: tw }) {
  const sel = Array.isArray(value) ? value : value ? [value] : [];
  const max = s.max(n);
  const full = max > 0 && sel.length >= max;
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inp = useRef(null),
    list = useRef(null),
    box = useRef(null);

  const { items, total, q } = useMemo(() => {
    const nl = normed(o),
      q = norm(text).trim(),
      a = [],
      w = [],
      b = [];
    let total = 0;
    for (let k = 0; k < o.length; k++) {
      if (!q) {
        if (a.length < LIM) a.push(k);
        total++;
        continue;
      }
      const l = nl[k],
        ix = l.indexOf(q);
      if (ix < 0) continue;
      total++;
      if (ix === 0) a.length < LIM && a.push(k);
      else if (/[\s(\-/]/.test(l[ix - 1])) w.length < LIM && w.push(k);
      else b.length < LIM && b.push(k);
    }
    return { items: a.concat(w, b).slice(0, LIM), total, q };
  }, [o, text]);

  useEffect(() => {
    setActive(0);
    if (list.current) list.current.scrollTop = 0;
  }, [text]);
  useEffect(() => {
    if (finePointer() && !sel.length) setOpen(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open) return undefined;
    const off = (e) => box.current && !box.current.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, [open]);
  useEffect(() => {
    const el = list.current && list.current.querySelector(`#cbo${active}`);
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const labelOf = (v) => {
    const h = o.find((x) => x[1] == v);
    return h ? optLabel(s, n, h[0], h[1]) : String(v);
  };
  const toggle = (k) => {
    const [l, v] = o[k];
    let next;
    if (sel.includes(v)) next = sel.filter((x) => x !== v);
    else if (s.isEx(v, l)) next = [v];
    else if (full) return;
    else next = sel.filter((x) => !s.isEx(x, (o.find((y) => y[1] === x) || [''])[0])).concat(v);
    act.answer(n, next, { prune: true });
    if (!sel.includes(v)) burst(inp.current, document.getElementById('cd'));
    setText('');
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((a) => (a + 1) % Math.max(1, items.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (open) setActive((a) => (a - 1 + items.length) % Math.max(1, items.length));
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && items.length && text) toggle(items[active]);
      else act.next();
    } else if (e.key === 'Backspace' && !text && sel.length) {
      act.answer(n, sel.slice(0, -1), { prune: true });
    }
  };
  const hl = (l) => {
    if (!q) return l;
    const nl = norm(l),
      i = nl.indexOf(q);
    if (i < 0 || nl.length !== l.length) return l;
    return (
      <>
        {l.slice(0, i)}
        <mark>{l.slice(i, i + q.length)}</mark>
        {l.slice(i + q.length)}
      </>
    );
  };
  const cf = ctxFlag(s, n);
  const isState = /^(org-)?state$/.test(n),
    stc = (v) => (isState ? String(v).split('-').slice(1).join('-') : '');

  return (
    <>
      <div className="mbar">
        <span className="cnt" id="cnt" aria-live="polite">
          {t('n_selected', { n: sel.length })}
        </span>
        <button type="button" className="lnk" id="clr" hidden={!sel.length} onClick={() => act.answer(n, [], { prune: true })}>
          {t('clear_all')}
        </button>
      </div>
      {sel.length > 0 && (
        <div className="chips mcb-sel" role="list" aria-label={t('n_selected', { n: sel.length })}>
          {sel.map((v) => (
            <span key={v} role="listitem" className="chip on">
              <Flag cc={flagFor(s, n, labelOf(v), v)} />
              <span>{labelOf(v)}</span>
              <button type="button" className="mcb-x" aria-label={`${t('clear')}: ${labelOf(v)}`} onClick={() => act.answer(n, sel.filter((x) => x !== v), { prune: true })}>
                <Icon n="x" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className={'cb' + (open ? ' open' : '')} id="cb" ref={box}>
        <span className="lead" id="cblead">
          {cf ? <Flag cc={cf} /> : <Icon n={qIcon(s, n, tw)} />}
        </span>
        <input
          id="qi"
          ref={inp}
          className="in"
          data-q=""
          data-cb=""
          role="combobox"
          aria-expanded={open}
          aria-controls="cbl"
          aria-autocomplete="list"
          aria-activedescendant={open && items.length ? 'cbo' + active : undefined}
          autoComplete="off"
          spellCheck="false"
          value={text}
          placeholder={full ? t('qz_max_reached', { n: max }) : t('cb_ph', { n: o.length })}
          aria-labelledby="qh"
          aria-describedby="er cbh"
          onChange={(e) => {
            setText(e.target.value);
            setOpen(true);
          }}
          onKeyDown={onKey}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
        />
        <button type="button" className="cx" id="cbx" aria-label={t('clear')} hidden={!text} onClick={() => { setText(''); inp.current.focus(); }}>
          <Icon n="x" />
        </button>
        <span className="cv">
          <Icon n="chev" />
        </span>
        {open && (
          <ul className="lb" id="cbl" role="listbox" aria-multiselectable="true" aria-labelledby="qh" ref={list}>
            {items.length ? (
              items.map((k, j) => {
                const x = o[k],
                  on = sel.includes(x[1]),
                  dis = !on && full && !s.isEx(x[1], x[0]);
                return (
                  <li
                    key={x[1]}
                    role="option"
                    id={'cbo' + j}
                    aria-selected={on}
                    aria-disabled={dis || undefined}
                    className={'mcb-o' + (on ? ' sel' : '') + (j === active ? ' act' : '') + (dis ? ' dis' : '')}
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if (!dis) toggle(k);
                      inp.current.focus();
                    }}
                    onMouseMove={() => j !== active && setActive(j)}
                  >
                    <span className="mcb-box" aria-hidden="true">
                      {on ? <Icon n="check" /> : null}
                    </span>
                    <Flag cc={flagFor(s, n, x[0], x[1])} />
                    {isState && <span className="stc">{stc(x[1])}</span>}
                    <span>{hl(optLabel(s, n, x[0], x[1]))}</span>
                  </li>
                );
              })
            ) : (
              <li className="more" aria-disabled="true">
                {t('cb_none', { q: text })}
              </li>
            )}
            {items.length > 0 && total > items.length && (
              <li className="more" aria-disabled="true">
                {t('cb_more', { a: items.length, b: total })}
              </li>
            )}
          </ul>
        )}
      </div>
      <p className="cbh" id="cbh">
        <span>{t('mcb_hint', { n: o.length })}</span>
      </p>
    </>
  );
}
