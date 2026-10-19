import { memo, useMemo } from 'react';
import { TW } from '../lib/themes.js';
import { Icon } from './Icon.jsx';
import { profileEmoji } from '../lib/emoji.js';

/* Fixed background for each world: two aurora glows, a faint pattern, three floating icons and one
   signature motion (flight paths, ECG line, neon floor, node network…). Everything animates with
   transform/opacity only, so it runs on the compositor and never competes with typing.
   Phones get the glows and pattern only. Motion pauses in hidden tabs and for reduced motion. */
let seed = 7;
const rnd = (a, b) => { seed = (seed * 16807) % 2147483647; return a + (seed / 2147483647) * (b - a); };
const POS = [[6, 64, 96], [86, 20, 120], [74, 78, 76]];

function Fx({ t }) {
  const c = [t.a, t.a2, t.a3];
  switch (t.fx) {
    case 'floor': return <div className="floor"><i /></div>;
    case 'scan': return <div className="scan" />;
    case 'rays': return <div className="rays" />;
    case 'fly': return <><span className="fly"><Icon n={t.flyIcon || 'send'} /></span><span className="fly f2"><Icon n={t.flyIcon || 'send'} /></span></>;
    case 'streaks': return Array.from({ length: 5 }, (_, k) => (
      <i key={k} className="stk" style={{ top: `${10 + k * 18}vh`, '--c': c[k % 3], '--d': `${rnd(6, 11).toFixed(1)}s`, '--dl': `-${rnd(0, 10).toFixed(1)}s` }} />));
    case 'bubbles': return Array.from({ length: 7 }, (_, k) => {
      const z = rnd(24, 80) | 0;
      return <i key={k} className="bub" style={{ left: `${rnd(0, 96).toFixed(1)}%`, width: z, height: z, '--c': c[k % 3], '--d': `${rnd(18, 30).toFixed(1)}s`, '--dl': `-${rnd(0, 30).toFixed(1)}s` }} />;
    });
    case 'shapes': {
      const cl = ['50%', '26%', 'polygon(50% 0,100% 100%,0 100%)', 'polygon(50% 0,100% 50%,50% 100%,0 50%)'];
      return Array.from({ length: 6 }, (_, k) => {
        const z = rnd(16, 40) | 0, sh = cl[k % 4];
        return <i key={k} className="shp" style={{ left: `${rnd(2, 95).toFixed(1)}%`, top: `${rnd(8, 92).toFixed(1)}%`, width: z, height: z, ...(sh.startsWith('poly') ? { clipPath: sh } : { borderRadius: sh }), '--c': c[k % 3], '--d': `${rnd(10, 18).toFixed(1)}s`, '--dl': `-${rnd(0, 9).toFixed(1)}s` }} />;
      });
    }
    case 'nodes': {
      const P = Array.from({ length: 12 }, () => [rnd(2, 98), rnd(4, 96)]), L = [];
      P.forEach((p, i) => { for (let j = i + 1; j < P.length; j++) if (Math.hypot(p[0] - P[j][0], p[1] - P[j][1]) < 28) L.push([p, P[j]]); });
      return (
        <svg className="net" viewBox="0 0 100 100" preserveAspectRatio="none">
          {L.map(([a, b], k) => <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />)}
          {P.map((p, k) => <circle key={k} cx={p[0]} cy={p[1]} r=".6" style={{ '--dl': `-${(k * 0.4).toFixed(1)}s` }} />)}
        </svg>
      );
    }
    case 'ecg': {
      const d = 'M0 60h300l20-40 30 90 25-70 15 20h300l20-40 30 90 25-70 15 20h300l20-40 30 90 25-70 15 20h400';
      return <svg className="ecg" viewBox="0 0 1600 120" preserveAspectRatio="none"><path d={d} /><path className="bt" d={d} /></svg>;
    }
    default: return null;
  }
}

const HUB_E = ['🎮', '✈️', '🛍️', '🍕', '💼', '🎓', '🐾', '💎', '🩺', '📱'];
const EPOS = [[8, 22], [88, 14], [16, 78], [80, 70], [50, 90], [64, 30], [30, 46]];
function Atmosphere({ themeId, slug }) {
  const t = TW[themeId] || TW.brand;
  const content = useMemo(() => {
    seed = 7 + themeId.length;
    const narrow = typeof innerWidth !== 'undefined' && innerWidth < 760;
    const fl = (t.fl || ['star', 'sparkle', 'globe']).slice(0, narrow ? 0 : 3);
    return (
      <>
        <div className="g g1" /><div className="g g2" />
        <div className="pat" />
        {!narrow && <Fx t={t} />}
        {(narrow ? EPOS.slice(0, 3) : EPOS).map(([x, y], k) => {
          const set = slug ? profileEmoji(slug) : HUB_E, e = set[(k + (slug ? 0 : themeId.length)) % set.length];
          return <span key={'e' + k} className="fe" style={{ left: x + '%', top: y + '%', '--d': `${16 + k * 3}s`, '--dl': `-${k * 2.3}s`, '--z': `${(narrow ? 26 : 30) + (k % 3) * 12}px` }}>{e}</span>;
        })}
        {fl.map((n, k) => (
          <span key={k} className="fl" style={{ left: POS[k][0] + '%', top: POS[k][1] + '%', width: POS[k][2], height: POS[k][2], '--d': `${22 + k * 5}s`, '--dl': `-${k * 4}s` }}><Icon n={n} /></span>
        ))}
      </>
    );
  }, [themeId, slug]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div className="atmos" id="atmos" aria-hidden="true" data-world={themeId}>{content}</div>;
}
export default memo(Atmosphere);
