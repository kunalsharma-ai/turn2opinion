import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Flag } from './Icon.jsx';
import { LANGS, REGIONS, bcp } from '../i18n/languages.js';
import { t, useI18n, lang, preloadLang } from '../i18n/index.js';
import { norm } from '../lib/present.js';

/* Full language picker in a native <dialog> (focus trap, Esc and screen-reader support for free).
   Search matches the native name, the English name, the name in the current language and the code.
   The list is a plain filtered array of ~135 items, so typing never lags. */
const dnCache = new Map();
function localName(code, ui) {
  if (ui === 'en') return null;
  let d = dnCache.get(ui);
  if (d === undefined) { try { d = new Intl.DisplayNames([bcp(ui)], { type: 'language', fallback: 'none' }); } catch (e) { d = null; } dnCache.set(ui, d); }
  try { return (d && d.of(bcp(code))) || null; } catch (e) { return null; }
}

export default function LangSheet({ open, onClose, onPick }) {
  useI18n();
  const ui = lang(), dlg = useRef(null), inp = useRef(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (open && !d.open) {
      setQ('');
      try { d.showModal(); } catch (e) { d.setAttribute('open', ''); }
      requestAnimationFrame(() => { if (inp.current && matchMedia('(pointer:fine)').matches) inp.current.focus(); });
    } else if (!open && d.open) d.close();
  }, [open]);

  const rows = useMemo(() => LANGS.map((l) => {
    const loc = localName(l.c, ui);
    return { l, loc, key: norm([l.n, l.en, loc || '', l.c].join(' ')) };
  }), [ui]);
  const nq = norm(q).trim();
  const hits = nq ? rows.filter((r) => r.key.includes(nq)) : null;

  const tile = ({ l, loc }) => {
    const on = l.c === ui;
    return (
      <li key={l.c}>
        <button type="button" className={'ltile' + (on ? ' on' : '')} aria-pressed={on} onClick={(e) => onPick(l.c, e)}
          onPointerEnter={() => preloadLang(l.c)}>
          <Flag cc={l.f} />
          <span className="lt-t">
            <span className="lt-n" lang={bcp(l.c)} dir={l.d || 'ltr'}>{l.n}</span>
            <span className="lt-e">{loc && loc.toLowerCase() !== l.n.toLowerCase() ? loc : l.en}</span>
          </span>
          {on && <Icon n="check" className="lt-ok" />}
        </button>
      </li>
    );
  };

  return (
    <dialog ref={dlg} className="sheet" aria-labelledby="sheet-h" onClose={onClose} onCancel={onClose}
      onClick={(e) => { if (e.target === dlg.current) onClose(); }}>
      <div className="sheet-in">
        <div className="sheet-top">
          <h2 id="sheet-h"><Icon n="translate" />{t('lang_choose')}</h2>
          <button type="button" className="ib" onClick={onClose} aria-label={t('close')}><Icon n="x" /></button>
        </div>
        <label className="sheet-search">
          <Icon n="search" />
          <span className="sr">{t('lang_search')}</span>
          <input ref={inp} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('lang_search') + ' · ' + LANGS.length}
            autoComplete="off" spellCheck="false" enterKeyHint="search"
            onKeyDown={(e) => { if (e.key === 'Enter' && hits && hits[0]) onPick(hits[0].l.c, e); }} />
        </label>
        <p className="sheet-note">{t('lang_auto')}</p>
        <div className="sheet-body">
          {hits ? (
            hits.length ? <ul className="lgrid">{hits.map(tile)}</ul> : <p className="empty">{t('lang_none', { q })}</p>
          ) : REGIONS.map((r) => (
            <section key={r} className="lgroup">
              <h3>{t('reg_' + r)}</h3>
              <ul className="lgrid">{rows.filter((x) => x.l.r === r).map(tile)}</ul>
            </section>
          ))}
        </div>
      </div>
    </dialog>
  );
}
