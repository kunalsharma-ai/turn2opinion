// A clause tile (hexagon icon, clause number, title, "what it means for you") and the side drawer that shows
// the full clause, with previous / next navigation and an optional machine translation.
import { memo, useEffect, useRef, useState } from 'react';
import Icon from './Icons.jsx';
import { SECTIONS, SECTION_ORDER } from '../content/terms.js';
import { useI18n, translateTexts } from '../i18n/I18n.jsx';
import { play } from '../sound.js';

export const fill = (s, cfg) => String(s).replace(/\{(\w+)\}/g, (m, k) => (cfg[k] != null && typeof cfg[k] !== 'object' ? cfg[k] : m));

export function bodyTexts(n, cfg) {
  const out = [];
  for (const b of SECTIONS[n].body) {
    if (typeof b === 'string') out.push(fill(b, cfg));
    else if (b.h) out.push(b.h);
    else if (b.ol || b.ul) (b.ol || b.ul).forEach((x) => out.push(fill(x, cfg)));
  }
  return out;
}

export function Body({ n, cfg, tr, t }) {
  let k = 0;
  const next = (s) => (tr ? tr[k++] || s : s);
  return SECTIONS[n].body.map((b, i) => {
    if (typeof b === 'string') return <p key={i}>{next(fill(b, cfg))}</p>;
    if (b.h) return <h4 key={i}>{next(b.h)}</h4>;
    if (b.ol) return <ol key={i}>{b.ol.map((x, j) => <li key={j}>{next(fill(x, cfg))}</li>)}</ol>;
    if (b.ul) return <ul key={i}>{b.ul.map((x, j) => <li key={j}>{next(fill(x, cfg))}</li>)}</ul>;
    if (b.contact)
      return (
        <dl className="contact" key={i}>
          <div><dt><Icon name="briefcase" size={18} decorative />{t('contact_company')}</dt><dd>{cfg.operator}</dd></div>
          <div><dt><Icon name="mail" size={18} decorative />{t('contact_support')}</dt><dd><a href={`mailto:${cfg.supportEmail}`}>{cfg.supportEmail}</a></dd></div>
          <div><dt><Icon name="lock" size={18} decorative />{t('contact_privacy')}</dt><dd><a href={`mailto:${cfg.privacyEmail}`}>{cfg.privacyEmail}</a></dd></div>
          <div><dt><Icon name="pin" size={18} decorative />{t('contact_address')}</dt><dd>{cfg.address}</dd></div>
        </dl>
      );
    return null;
  });
}

/** 3D tilt that follows the pointer (rAF-throttled, transform only). */
function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const move = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
        el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
      });
    };
    const leave = () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

function ClauseCardInner({ n, reviewed, onOpen, index, wide }) {
  const { t } = useI18n();
  const s = SECTIONS[n];
  const tilt = useTilt();
  return (
    <article ref={tilt} className={`clause ${reviewed ? 'is-reviewed' : ''} ${wide ? 'wide' : ''}`} id={`s${n}`} data-n={n} style={{ '--i': index }} aria-labelledby={`s${n}-t`}>
      <div className="clause-glare" aria-hidden="true" />
      <header className="clause-top">
        <span className="hex" aria-hidden="true"><Icon name={s.icon} size={26} decorative /></span>
        <span className="clause-no mono">{t('clause', String(n).padStart(2, '0'))}</span>
        <span className={`tick ${reviewed ? 'on' : ''}`} aria-label={reviewed ? t('reviewed_ok') : undefined}>
          <Icon name="check" size={14} decorative />
        </span>
      </header>
      <h3 id={`s${n}-t`}>{t(`t${n}`)}</h3>
      <p className="means"><span>{t('means')}</span>{t(`s${n}`)}</p>
      <button type="button" className="open-btn" onClick={() => { play('paper'); onOpen(n); }} aria-haspopup="dialog">
        {t('open_clause')}
        <Icon name="arrow" size={16} decorative />
      </button>
    </article>
  );
}
export const ClauseCard = memo(ClauseCardInner);

export function Drawer({ n, cfg, onClose, onGo, onReviewed, reviewed }) {
  const { t, lang } = useI18n();
  const [tr, setTr] = useState(null);
  const [trState, setTrState] = useState('idle');
  const panel = useRef(null);
  const open = n != null;
  const idx = open ? SECTION_ORDER.indexOf(n) : -1;
  const prev = idx > 0 ? SECTION_ORDER[idx - 1] : n === 23 ? SECTION_ORDER[SECTION_ORDER.length - 1] : null;
  const next = idx >= 0 && idx < SECTION_ORDER.length - 1 ? SECTION_ORDER[idx + 1] : null;
  useEffect(() => {
    if (!open) return undefined;
    setTr(null);
    setTrState('idle');
    const id = setTimeout(() => onReviewed(n), 1200);
    if (panel.current) { panel.current.scrollTop = 0; panel.current.focus({ preventScroll: true }); }
    const onKey = (e) => {
      if (e.key === 'Escape') { play('close'); onClose(); }
      if (e.key === 'ArrowRight' && e.altKey && next) onGo(next);
      if (e.key === 'ArrowLeft' && e.altKey && prev) onGo(prev);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(id); window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [n]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!open) return null;
  const s = SECTIONS[n];
  const doTranslate = async () => {
    play('tap');
    setTrState('busy');
    try {
      const out = await translateTexts(lang, bodyTexts(n, cfg));
      if (out) { setTr(out); setTrState('idle'); } else setTrState('fail');
    } catch { setTrState('fail'); }
  };
  return (
    <div className="drawer-veil" onMouseDown={(e) => { if (e.target === e.currentTarget) { play('close'); onClose(); } }}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-t" tabIndex={-1} ref={panel}>
        <div className="drawer-head">
          <span className="hex" aria-hidden="true"><Icon name={s.icon} size={26} decorative /></span>
          <div>
            <span className="clause-no mono">{t('clause', String(n).padStart(2, '0'))}</span>
            <h2 id="dr-t">{t(`t${n}`)}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={() => { play('close'); onClose(); }} aria-label={t('close')}>
            <Icon name="x" size={20} decorative />
          </button>
        </div>
        <p className="means drawer-means"><span>{t('means')}</span>{t(`s${n}`)}</p>
        {lang !== 'en' ? (
          <div className="mt-bar">
            <span>{tr ? t('mt_note') : t('legal_en')}</span>
            {!tr ? (
              <button type="button" className="chip" onClick={doTranslate} disabled={trState === 'busy'}>
                <Icon name="lang" size={16} decorative />
                {trState === 'busy' ? t('translating') : trState === 'fail' ? t('mt_fail') : t('translate_full')}
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="legal" lang={tr ? lang : 'en'} dir={tr ? undefined : 'ltr'}>
          <Body n={n} cfg={cfg} tr={tr} t={t} />
        </div>
        <div className="drawer-foot">
          <button type="button" className="btn ghost" disabled={!prev} onClick={() => { play('paper'); onGo(prev); }}>
            <Icon name="arrow" size={16} className="flip" decorative />
            {t('prev_clause')}
          </button>
          <span className={`tick big ${reviewed ? 'on' : ''}`} aria-live="polite">
            <Icon name="check" size={16} decorative />
            {reviewed ? t('reviewed_ok') : ''}
          </span>
          {next ? (
            <button type="button" className="btn primary" onClick={() => { play('paper'); onReviewed(n); onGo(next); }}>
              {t('next_clause')}
              <Icon name="arrow" size={16} decorative />
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={() => { play('read'); onReviewed(n); onClose(true); }}>
              {t('mark_reviewed')}
              <Icon name="check" size={16} decorative />
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
