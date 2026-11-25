/* CHANGE-09 / CHANGE-05 · Completion celebration.
   Shown on top of the dashboard right after a profile/survey is completed for the first time:
     1. the item's own particle effect (lib/celebrate.js) in its palette and emoji
     2. its building rises on a little plot, with scaffolding falling away
     3. the points the server credited for it count up (coin)
     4. on "Continue", a coin and a gem fly into the header pills, which count up when they land
   The dashboard underneath is already in its final state, so closing the overlay never shifts the layout.
   Native <dialog>: focus trapped, Esc closes, and nothing behind it can be clicked by accident. */
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { celebrate, stopCelebration } from '../lib/celebrate.js';
import { building } from '../lib/kingdom-art.js';
import { celebrationArt } from '../lib/world-art.js';
import { world } from '../lib/world.js';
import { itemMeta } from '../lib/items.js';
import { itemByIndex } from '../lib/progression.js';
import { markPaid } from '../lib/rewards.js';
import { profileKey } from '../lib/storage.js';
import { pnameT, themeId } from '../lib/present.js';
import { sound } from '../lib/uisound.js';
import { reducedMotion } from '../lib/fx.js';
import { t, tr, nf } from '../i18n/index.js';

const HEADS = ['v6_c_h1', 'v6_c_h2', 'v6_c_h3', 'v6_c_h4', 'v6_c_h5', 'v6_c_h6', 'v6_c_h7', 'v6_c_h8'];

function CountUp({ to, ms = 900, delay = 0 }) {
  const [v, setV] = useState(reducedMotion() ? to : 0);
  useEffect(() => {
    if (reducedMotion()) return undefined;
    let raf = 0, t0 = 0;
    const id = setTimeout(() => {
      const step = (ts) => { if (!t0) t0 = ts; const k = Math.min(1, (ts - t0) / ms); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(id); cancelAnimationFrame(raf); };
  }, [to, ms, delay]);
  return <>{nf(v)}</>;
}

/** fly a small token from one element to another; resolves when it lands */
export function fly(from, to, cls, html, host) {
  return new Promise((res) => {
    if (!from || !to || reducedMotion() || !document.body.animate) { res(); return; }
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const el = document.createElement('span'); el.className = 'flyer ' + cls; el.innerHTML = html; el.setAttribute('aria-hidden', 'true');
    el.style.left = a.left + a.width / 2 - 16 + 'px'; el.style.top = a.top + a.height / 2 - 16 + 'px';
    (host || document.body).append(el);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    const an = el.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 120}px) scale(1.35)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(.55)`, opacity: 0.9 },
    ], { duration: 900, easing: 'cubic-bezier(.5,0,.3,1)' });
    an.onfinish = () => { el.remove(); res(); };
  });
}
export function pop(el) { if (!el || reducedMotion() || !el.animate) return; el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.3,1.6,.5,1)' }); }

export default function Celebration({ i, points = 0, next, onClose, onNext }) {
  const dlg = useRef(null), coinRef = useRef(null), closing = useRef(false);
  const x = itemByIndex(i), m = x && itemMeta(x.p);
  useEffect(() => {
    const d = dlg.current; if (!d || !x) return;
    try { d.showModal(); } catch (e) { d.setAttribute('open', ''); }
    const r = d.querySelector('.cb-plot'), b = r && r.getBoundingClientRect();
    const origin = b ? { x: b.left + b.width / 2, y: b.top + b.height * 0.4 } : undefined;
    sound.chime(themeId(x.p));
    const t1 = setTimeout(() => points > 0 && sound.ui('coin'), 900), t2 = 0;
    celebrate(m.fx, { colors: [m.a, m.a2, m.a3, '#ffffff'], emoji: m.e, origin, host: d });
    return () => { clearTimeout(t1); clearTimeout(t2); stopCelebration(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!x) return null;
  const key = profileKey(x.p), head = HEADS[x.n % HEADS.length];
  const finish = async (then) => {
    if (closing.current) return; closing.current = true;
    stopCelebration();
    const pp = document.getElementById('pill-pts'), pq = document.getElementById('pill-qs');
    sound.ui('whoosh');
    const d = dlg.current; if (d) d.classList.add('leaving');
    // only the points the server credited fly to the header; the +1 quality score (issue #40) arrives with the refreshed member record
    if (points > 0) await fly(coinRef.current, pp, 'coin', '<i class="mini-coin"></i><b>+' + nf(points) + '</b>', d);
    markPaid(key); if (points > 0) { pop(pp); sound.ui('coin'); } void pq;
    if (d && d.open) d.close();
    then();
  };
  return (
    <dialog ref={dlg} className="celeb" style={{ '--ca': m.a, '--cb': m.a2, '--cc': m.a3 }} aria-labelledby="cb-h" onCancel={(e) => { e.preventDefault(); finish(onClose); }}>
      <div className="cb-in">
        <div className="cb-rays" aria-hidden="true" />
        <div className="cb-plot" aria-hidden="true">
          <svg viewBox="-90 -170 180 190">
            <ellipse cx="0" cy="6" rx="80" ry="16" className="cb-ground" />
            <g className="cb-bld" dangerouslySetInnerHTML={{ __html: celebrationArt(world().id, m) || building(m.b, m) }} />
            {world().id === 'kingdom' && <g className="cb-scaf"><path d="M-40 4v-120M40 4v-120M-40 -116h80M-40 -76h80M-40 -36h80" /></g>}
          </svg>
          <span className="cb-badge">{m.e[0]}</span>
        </div>
        <p className="cb-eyebrow">{x.kind === 'survey' ? t('v6_c_survey_done') : t('v6_c_profile_done')}</p>
        <h2 id="cb-h" className="cb-h">{t(head, { name: pnameT(x.p) })}</h2>
        <p className="cb-p">{world().id === 'kingdom' ? t('v6_c_built', { b: tr(m.name) }) : t(world().added)}</p>
        {points > 0 && (
          <div className="cb-rw">
            <span className="cb-r coin" ref={coinRef}><i className="big-coin" aria-hidden="true" /><b>+<CountUp to={points} delay={700} /></b><small>{t('v6_pts')}</small></span>
          </div>
        )}
        <div className="cb-acts">
          {next && <button type="button" className="btn6 primary big" onClick={() => finish(() => onNext(next.i))} data-snd="none" autoFocus>{t('v6_c_next', { name: pnameT(next.p) })}<Icon n="arrow-r" className="flip" /></button>}
          <button type="button" className={'btn6 big ' + (next ? 'ghost' : 'primary')} onClick={() => finish(onClose)} data-snd="none" autoFocus={!next}><span aria-hidden="true">{world().e}</span>{t(world().back)}</button>
        </div>
      </div>
    </dialog>
  );
}
