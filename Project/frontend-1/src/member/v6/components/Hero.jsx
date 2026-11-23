/* CHANGE-03 · Dashboard hero: personal greeting + "Opinion Galaxy" animation.
   - Greets the member by first name (T2O_CONFIG.memberName → Basic profile answer → neutral greeting)
     with a time-of-day salutation and a welcoming line about their profiles.
   - A rotating phrase explains what their answers do (builds the kingdom, unlocks surveys, earns points…).
   - Animation: a glass sphere carrying the Turn2Opinion swirl, three tilted orbits with opinion bubbles,
     soft colour fields and twinkling sparkles — all transform/opacity animations (GPU-composited),
     paused when off-screen, removed with prefers-reduced-motion.
   Palette: brand navy #0b1e6e · royal blue #1f5eff · sky #36c2ff · violet #7c5cff · amber #ffb020 · mint #22d3a6 */
import { useEffect, useRef, useState } from 'react';
import { Counter } from '../../components/ui.jsx';
import { useGain } from '../../components/HeroBits.jsx';
import { Icon } from './Icon.jsx';
import Logo from './Logo.jsx';
import { t, nf, useI18n } from '../i18n/index.js';
import { world } from '../lib/world.js';
import { reducedMotion } from '../lib/fx.js';
import { pnameT } from '../lib/present.js';
import { profileEmoji } from '../lib/emoji.js';

const WORDS = ['v6_rot1', 'v6_rot2', 'v6_rot3', 'v6_rot4'];
const BUBBLES = [
  ['💬', 0, 0], ['⭐', 0, 50], ['🎁', 1, 15], ['📊', 1, 65], ['🏆', 2, 30], ['💡', 2, 80], ['🛍️', 0, 25], ['✈️', 1, 40], ['🎮', 2, 5],
];

function partOfDay() { const h = new Date().getHours(); return h < 5 ? 'v6_night' : h < 12 ? 'v6_morning' : h < 17 ? 'v6_afternoon' : h < 22 ? 'v6_evening' : 'v6_night'; }
const DAY_E = { v6_morning: '☀️', v6_afternoon: '🌤️', v6_evening: '🌇', v6_night: '🌙' };

export default function Hero({ name, aboutDone, aboutTotal, pts, qs, next, onStart, onKingdom }) {
  const gp = useGain(pts);
  const gq = useGain(qs);
  useI18n();
  const [w, setW] = useState(0), ref = useRef(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(() => setW((x) => (x + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);
  /* pause the animation when the hero is scrolled away */
  useEffect(() => {
    const el = ref.current; if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('off', !e.isIntersecting), { rootMargin: '80px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  const pd = partOfDay(), fresh = aboutDone === 0 && pts === 0;
  return (
    <section className="hero6" ref={ref} aria-labelledby="hero-h">
      <div className="h6-bg" aria-hidden="true"><i className="b1" /><i className="b2" /><i className="b3" /><i className="grid" /></div>
      <div className="h6-copy">
        <p className="h6-eyebrow"><span className="h6-day" aria-hidden="true">{DAY_E[pd]}</span>{t(pd)}{name ? <>, <b>{name}</b></> : null}<span className="wave" aria-hidden="true">👋</span></p>
        <h1 className="h6-h1" id="hero-h">
          {name ? t('v6_h1_named', { name: '\u0000' }).split('\u0000').map((part, i, a) => (i < a.length - 1 ? <span key={i}>{part}<em className="h6-name">{name}</em></span> : <span key={i}>{part}</span>)) : t('v6_h1')}
        </h1>
        <p className="h6-rot">
          {t('v6_rot_lead')}{' '}
          <span className="rot-box" aria-live="off">
            {WORDS.map((k, i) => <span key={k} className={'rot-w' + (i === w ? ' on' : '')} aria-hidden={i !== w}>{t(k)}</span>)}
          </span>
        </p>
        <p className="h6-lead">{fresh ? t('v6_lead_new') : aboutDone < aboutTotal ? t('v6_lead_about', { left: aboutTotal - aboutDone }) : t(world().id === 'kingdom' ? 'v6_lead_surveys' : `${world().id === 'observatory' ? 'w_obs' : 'w_isl'}_lead`)}</p>
        <div className="h6-stats" role="list">
          <span className="h6-stat" role="listitem"><span aria-hidden="true">🙋</span><b>{nf(aboutDone)}/{nf(aboutTotal)}</b><small>{t('v6_about_you')}</small></span>
          <span className="h6-stat" role="listitem" id="pill-pts"><span aria-hidden="true" className="mini-coin" /><b><Counter value={pts || 0} duration={1200} /></b><small>{t('v6_pts')}</small>{gp && <span key={gp.k} className="hx-pop">+{nf(gp.d)}</span>}</span>
          <span className="h6-stat" role="listitem" id="pill-qs"><span aria-hidden="true" className="mini-gem" /><b><Counter value={qs || 0} duration={1200} /></b><small>{t('v6_qs')}</small>{gq && <span key={gq.k} className="hx-pop hx-pop--q">+{nf(gq.d)}</span>}</span>
        </div>
        <div className="h6-cta">
          {next && (
            <button type="button" className="btn6 primary big" onClick={() => onStart(next.i)} data-snd="open">
              <span className="cta-e" aria-hidden="true">{profileEmoji(next.slug)[0]}</span>
              <span>{next.started ? t('v6_continue_x', { name: pnameT(next.p) }) : t('v6_start_x', { name: pnameT(next.p) })}</span>
              <Icon n="arrow-r" className="flip" />
            </button>
          )}
          <button type="button" className="btn6 ghost big" onClick={onKingdom} data-snd="whoosh"><span aria-hidden="true">{world().e}</span>{t(world().see)}</button>
        </div>
      </div>
      <div className="h6-vis" aria-hidden="true">
        <div className="gx">
          <span className="gx-glow" />
          <span className="gx-orbit o0" /><span className="gx-orbit o1" /><span className="gx-orbit o2" />
          <div className="gx-core"><span className="gx-sheen" /><Logo compact size={120} /></div>
          {BUBBLES.map(([e, o, d], i) => <span key={i} className={'gx-b ob' + o} style={{ '--d': d }}><span>{e}</span></span>)}
          <span className="gx-chip c1"><span className="mini-coin" />+50</span>
          <span className="gx-chip c2"><span className="mini-gem" />+1</span>
          {Array.from({ length: 12 }, (_, i) => <i key={i} className="gx-star" style={{ '--i': i }} />)}
        </div>
      </div>
    </section>
  );
}
