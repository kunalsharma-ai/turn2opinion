/* CHANGE-07 · "Sealed" message for locked profiles and surveys.
   Opens when a locked card or kingdom plot is tapped. A castle gate with swinging chains and a padlock that
   jiggles; the message explains exactly what unlocks the item:
     - About-you not finished  → "Complete your About-you profiles first" + a checklist with progress
     - previous survey open    → "This survey opens right after you finish <previous survey>"
   One button takes the member straight to the item that unlocks it.
   Native <dialog>: focus is trapped, Esc and the backdrop close it, screen readers announce it. */
import { useEffect, useRef } from 'react';
import { Icon } from './Icon.jsx';
import { pnameT } from '../lib/present.js';
import { profileEmoji } from '../lib/emoji.js';
import { itemByIndex, profilesOf, stateOf } from '../lib/progression.js';
import { sound } from '../lib/uisound.js';
import { t, nf } from '../i18n/index.js';
import { world } from '../lib/world.js';

export default function LockedPopup({ i, onClose, onGo }) {
  const dlg = useRef(null);
  const x = i != null ? itemByIndex(i) : null;
  const S = x ? stateOf(x.p.c) : null, st = S && S.map.get(x.i), why = st && st.why;
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (x && !d.open) { try { d.showModal(); } catch (e) { d.setAttribute('open', ''); } sound.ui('lock'); }
    if (!x && d.open) d.close();
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps
  const about = x ? profilesOf(x.p.c) : [];
  const need = why && why.need;
  const close = () => { sound.ui('close'); onClose(); };
  return (
    <dialog ref={dlg} className="lockpop" aria-labelledby="lp-h" aria-describedby="lp-p" onClose={onClose} onCancel={(e) => { e.preventDefault(); close(); }}
      onClick={(e) => { if (e.target === dlg.current) close(); }}>
      {x && (
        <div className="lp-in">
          <button type="button" className="lp-x" onClick={close} aria-label={t('close')} data-snd="none"><Icon n="x" /></button>
          <div className="lp-gate" aria-hidden="true">
            <span className="lp-glow" />
            <svg viewBox="0 0 240 150" className="lp-svg">
              <path d="M20 150V48l20-12 20 12v102z" className="g-tw" /><path d="M180 150V48l20-12 20 12v102z" className="g-tw" />
              <path d="M16 48h48l-4-10H20zM176 48h48l-4-10h-40z" className="g-cr" />
              <path d="M60 150V70a60 50 0 0 1 120 0v80z" className="g-arch" />
              <path d="M74 150V76a46 40 0 0 1 92 0v74z" className="g-door" />
              {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${82 + k * 15} 150V${k === 0 || k === 5 ? 92 : 74}`} className="g-bar" />)}
              <g className="g-chain l"><path d="M64 70Q120 110 176 70" /></g><g className="g-chain r"><path d="M64 96Q120 130 176 96" /></g>
            </svg>
            <span className="lp-lock"><svg viewBox="0 0 24 24"><path className="shackle" d="M7 11V8a5 5 0 0 1 10 0v3" /><rect x="4.5" y="11" width="15" height="10" rx="2.5" /><circle cx="12" cy="16" r="1.6" /></svg></span>
            <span className="lp-orb">{profileEmoji(x.slug)[0]}</span>
            {Array.from({ length: 8 }, (_, k) => <i key={k} className="lp-spark" style={{ '--k': k }} />)}
          </div>
          <p className="lp-eyebrow">{t('v6_lp_profile')} · {pnameT(x.p)}</p>
          <h2 id="lp-h" className="lp-h">{why && why.type === 'prev' ? t('v6_lp_h_prev') : t('v6_lp_h_about')}</h2>
          <p id="lp-p" className="lp-p">{why && why.type === 'prev' ? t('v6_lp_p_prev', { name: pnameT(need.p) }) : x.kind === 'profile' ? t('v6_lp_p_profile', { name: need ? pnameT(need.p) : '' }) : t('v6_lp_p_about')}</p>
          {(!why || why.type === 'about') && (
            <ol className="lp-list">
              {about.map((a) => { const s = S.map.get(a.i).st; return (
                <li key={a.i} className={'s-' + s}><span className="lp-e" aria-hidden="true">{profileEmoji(a.slug)[0]}</span><span className="lp-n">{pnameT(a.p)}</span>
                  <span className="lp-s">{s === 'done' ? <><Icon n="check" />{t('v6_st_done')}</> : s === 'prog' ? t('v6_st_prog', { pct: S.map.get(a.i).pct }) : s === 'locked' ? <><Icon n="lock" />{t('v6_st_locked')}</> : t('v6_st_open')}</span></li>); })}
            </ol>
          )}
          <div className="lp-steps" aria-hidden="true"><span className="on">🙋 {t('v6_about_you')}</span><Icon n="arrow-r" className="flip" /><span className={S.aboutDone ? 'on' : ''}>🗝️ {t('v6_lp_one_by_one')}</span><Icon n="arrow-r" className="flip" /><span>{world().e} +{nf(50)}</span></div>
          <div className="lp-acts">
            {need && <button type="button" className="btn6 primary" onClick={() => onGo(need.i)} data-snd="open"><span aria-hidden="true">{profileEmoji(need.slug)[0]}</span>{t('v6_lp_go', { name: pnameT(need.p) })}<Icon n="arrow-r" className="flip" /></button>}
            <button type="button" className="btn6 ghost" onClick={close} data-snd="none">{t('v6_lp_later')}</button>
          </div>
        </div>
      )}
    </dialog>
  );
}
