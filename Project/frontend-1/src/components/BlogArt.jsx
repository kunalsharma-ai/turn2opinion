// Blog cover art, round 8 (Kunal, 18 Nov 2026): every cover is coded, animated and text-free.
//
// Each category has its own world, and every post gets its own version of it: the post's slug seeds
// the layout (mirrored or not, where things sit, how many stars and pieces) and its hue sets the
// colour grade. So no two covers are the same, and nothing needs downloading.
//
//   Earn online        Orbit      a glowing planet with tilted rings and coins circling it
//   Paid surveys       Chorus     glass speech bubbles drifting, each with a pulsing answer dot
//   Work from home     Dusk       a sun over rolling hills, a floating laptop with growing bars
//   Professionals      Skyline    towers with twinkling windows, a sweeping searchlight, a prism
//   Rewards & payouts  Nebula     a gift box in a burst of turning rays and falling confetti
//   Safety & privacy   Vault      a shield on a hex lattice, a scan line and a drawing check mark
//
// Shared layers: a deep base, three drifting colour fields, a starfield and a sweeping glass sheen.
// The whole cover is decorative (aria-hidden) and every animation stops under reduced motion.
import { useEffect, useId, useRef, useState } from 'react';

function rng(seedStr = '') {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hsl = (h, s, l, a = 1) => `hsl(${((h % 360) + 360) % 360} ${s}% ${l}% / ${a})`;
const KIND = {
  'Earn online': 'orbit',
  'Paid surveys': 'chorus',
  'Work from home': 'dusk',
  Professionals: 'skyline',
  'Rewards & payouts': 'nebula',
  'Safety & privacy': 'vault'
};

/* ------------------------------ centrepieces ------------------------------ */
function Orbit({ id, r, c }) {
  const cx = 200 + (r() - 0.5) * 40;
  const cy = 118 + (r() - 0.5) * 20;
  const R = 46 + r() * 10;
  const tilt = -18 + r() * 36;
  const coins = 3 + Math.floor(r() * 3);
  return (
    <g>
      <g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
        <ellipse rx={R * 2.1} ry={R * 0.5} fill="none" stroke={`url(#${id}-ring)`} strokeWidth="3" opacity=".55" />
        <g transform={`scale(1 0.32)`}>
          <g className="ba-spin" style={{ '--t': `${14 + r() * 8}s` }}>
            <circle r={R * 1.65} fill="none" stroke="none" />
            {Array.from({ length: coins }).map((_, k) => {
              const a = (k / coins) * Math.PI * 2;
              return (
                <g key={k} transform={`translate(${Math.cos(a) * R * 1.65} ${Math.sin(a) * R * 1.65})`}>
                  <circle r="11" fill={`url(#${id}-gold)`} />
                  <circle r="7" fill="none" stroke="#fff6d5" strokeWidth="1.6" opacity=".8" />
                </g>
              );
            })}
          </g>
        </g>
      </g>
      <circle cx={cx} cy={cy} r={R + 18} fill={`url(#${id}-halo)`} className="ba-pulse" />
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-planet)`} />
      <ellipse cx={cx - R * 0.35} cy={cy - R * 0.4} rx={R * 0.35} ry={R * 0.2} fill="#fff" opacity=".35" transform={`rotate(-30 ${cx - R * 0.35} ${cy - R * 0.4})`} />
      <g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
        <path d={`M ${-R * 2.1} 0 A ${R * 2.1} ${R * 0.5} 0 0 0 ${R * 2.1} 0`} fill="none" stroke={`url(#${id}-ring)`} strokeWidth="4" />
      </g>
      <circle cx={cx + R * 1.9} cy={cy - R * 1.2} r="6" fill={c.c3} className="ba-bob" style={{ '--d': '-1s' }} />
      <circle cx={cx - R * 2.1} cy={cy + R * 1.1} r="4" fill="#fff" opacity=".8" className="ba-bob" style={{ '--d': '-2.4s' }} />
    </g>
  );
}

function Chorus({ id, r, c }) {
  const n = 4 + Math.floor(r() * 2);
  // Kept inside the middle of the cover so the narrow thumbnails (which crop the sides) still show them.
  const pts = Array.from({ length: n }).map((_, k) => {
    const w = 64 + r() * 26;
    return { x: 70 + (k / (n - 1)) * (260 - w) + (r() - 0.5) * 16, y: 40 + r() * 120, w, pick: Math.floor(r() * 3) };
  });
  const path = pts.map((p, k) => `${k ? 'L' : 'M'} ${p.x + p.w / 2} ${p.y + 22}`).join(' ');
  return (
    <g>
      <path d={path} fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeDasharray="4 8" className="ba-dash" />
      {pts.map((p, k) => (
        <g key={k} className="ba-bob" style={{ '--d': `${-k * 0.9}s`, '--t': `${5 + (k % 3)}s` }}>
          <path
            d={`M ${p.x + 14} ${p.y} H ${p.x + p.w - 14} Q ${p.x + p.w} ${p.y} ${p.x + p.w} ${p.y + 14} V ${p.y + 30} Q ${p.x + p.w} ${p.y + 44} ${p.x + p.w - 14} ${p.y + 44} H ${p.x + 30} L ${p.x + 16} ${p.y + 56} L ${p.x + 18} ${p.y + 44} H ${p.x + 14} Q ${p.x} ${p.y + 44} ${p.x} ${p.y + 30} V ${p.y + 14} Q ${p.x} ${p.y} ${p.x + 14} ${p.y} Z`}
            fill={k % 2 ? `url(#${id}-glass)` : `url(#${id}-glass2)`}
            stroke="#fff"
            strokeOpacity=".6"
            strokeWidth="1.5"
          />
          {[0, 1, 2].map((j) => {
            const x = p.x + p.w / 2 + (j - 1) * 18;
            return j === p.pick ? (
              <g key={j}>
                <circle cx={x} cy={p.y + 22} r="9" fill={c.c3} opacity=".35" className="ba-pulse" style={{ '--d': `${-k * 0.6}s` }} />
                <circle cx={x} cy={p.y + 22} r="6" fill="#fff" />
              </g>
            ) : (
              <circle key={j} cx={x} cy={p.y + 22} r="5" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="1.6" />
            );
          })}
        </g>
      ))}
    </g>
  );
}

function Dusk({ id, r, c }) {
  const sx = 120 + r() * 160;
  const lx = 236 + (r() - 0.5) * 120;
  const bars = [0.45 + r() * 0.3, 0.6 + r() * 0.3, 0.35 + r() * 0.3, 0.75 + r() * 0.25];
  return (
    <g>
      <circle cx={sx} cy="122" r="74" fill={`url(#${id}-halo)`} className="ba-pulse" />
      <circle cx={sx} cy="122" r="44" fill={`url(#${id}-sun)`} />
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          className="ba-wave"
          style={{ '--t': `${16 + k * 6}s`, '--d': `${-k * 3}s` }}
          d={`M0 ${168 + k * 22} C 100 ${140 + k * 22}, 200 ${196 + k * 18}, 400 ${162 + k * 22} S 700 ${190 + k * 18}, 800 ${166 + k * 22} V 260 H 0 Z`}
          fill={k === 2 ? c.deep : hsl(c.h + 20 + k * 12, 60, 30 - k * 7, 0.92)}
        />
      ))}
      <g className="ba-bob" style={{ '--t': '6s' }}>
        <rect x={lx - 58} y="54" width="116" height="74" rx="9" fill={`url(#${id}-glass)`} stroke="#fff" strokeOpacity=".8" strokeWidth="2" />
        {bars.map((b, k) => (
          <rect key={k} className="ba-grow" style={{ '--d': `${k * 0.25}s` }} x={lx - 40 + k * 22} y={118 - b * 50} width="14" height={b * 50} rx="3" fill={[c.c1, c.c3, '#fff', c.c2][k]} />
        ))}
        <path d={`M ${lx - 72} 136 H ${lx + 72} L ${lx + 60} 128 H ${lx - 60} Z`} fill="#fff" opacity=".85" />
        <ellipse cx={lx} cy="150" rx="60" ry="5" fill="#000" opacity=".18" />
      </g>
      {[0, 1, 2].map((k) => (
        <path key={k} className="ba-steam" style={{ '--d': `${k * 0.9}s` }} d={`M ${lx + 84 + k * 8} 120 q 6 -10 0 -20 q -6 -10 0 -20`} fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
      ))}
    </g>
  );
}

function Skyline({ id, r, c }) {
  const n = 11;
  const towers = Array.from({ length: n }).map((_, k) => ({ x: 8 + k * 36 + r() * 6, w: 24 + r() * 10, h: 60 + r() * 110 }));
  const bx = 120 + r() * 160;
  return (
    <g>
      <g className="ba-beam" style={{ transformOrigin: `${bx}px 240px` }}>
        <path d={`M ${bx} 240 L ${bx - 60} -20 L ${bx + 60} -20 Z`} fill={`url(#${id}-beam)`} />
      </g>
      {towers.map((t, k) => (
        <g key={k}>
          <rect x={t.x} y={240 - t.h} width={t.w} height={t.h} fill={`url(#${id}-tower)`} />
          <rect x={t.x} y={240 - t.h} width="2" height={t.h} fill="#fff" opacity=".25" />
          {Array.from({ length: Math.floor(t.h / 22) }).map((_, j) =>
            (j + k) % 3 === 0 ? null : (
              <rect key={j} className="ba-tw" style={{ '--d': `${-((j * 7 + k * 3) % 11) * 0.4}s` }} x={t.x + 5 + (j % 2) * (t.w - 14)} y={240 - t.h + 10 + j * 20} width="5" height="7" rx="1" fill="#ffe08a" />
            )
          )}
        </g>
      ))}
      <g className="ba-bob" style={{ '--t': '7s' }}>
        <g className="ba-flip">
          <polygon points={`${bx},40 ${bx + 26},66 ${bx},104 ${bx - 26},66`} fill={`url(#${id}-gold)`} />
          <polygon points={`${bx},40 ${bx + 26},66 ${bx},66`} fill="#fff" opacity=".45" />
          <polygon points={`${bx - 26},66 ${bx},66 ${bx},104`} fill="#000" opacity=".18" />
        </g>
      </g>
    </g>
  );
}

function Nebula({ id, r, c }) {
  const gx = 200 + (r() - 0.5) * 80;
  const confetti = Array.from({ length: 16 }).map(() => ({ x: r() * 400, d: -r() * 6, t: 4 + r() * 4, w: 4 + r() * 5, col: [c.c1, c.c3, '#fff', '#ffd166', c.c2][Math.floor(r() * 5)] }));
  return (
    <g>
      <g transform={`translate(${gx} 120)`}>
        <g className="ba-spin" style={{ '--t': '40s' }}>
          {Array.from({ length: 14 }).map((_, k) => (
            <path key={k} d="M0 0 L -9 -210 L 9 -210 Z" fill="#fff" opacity={k % 2 ? 0.08 : 0.16} transform={`rotate(${(k * 360) / 14})`} />
          ))}
        </g>
        <circle r="78" fill={`url(#${id}-halo)`} className="ba-pulse" />
        <g className="ba-bob" style={{ '--t': '5s' }}>
          <path d="M -46 -6 L 30 -6 L 46 -18 L -30 -18 Z" fill={hsl(c.h + 40, 85, 72)} />
          <rect x="-46" y="-6" width="76" height="62" rx="5" fill={`url(#${id}-gift)`} />
          <path d="M 30 -6 L 46 -18 L 46 42 L 30 56 Z" fill={hsl(c.h + 40, 70, 30)} />
          <rect x="-12" y="-6" width="12" height="62" fill="#fff" opacity=".9" />
          <path d="M -12 -6 L 4 -18 L 16 -18 L 0 -6 Z" fill="#fff" opacity=".9" />
          <g className="ba-lid">
            <path d="M -52 -20 L 34 -20 L 52 -34 L -34 -34 Z" fill={hsl(c.h + 40, 90, 66)} />
            <path d="M -14 -20 L 4 -34 L 16 -34 L -2 -20 Z" fill="#fff" />
            <path d="M 4 -34 C -24 -62 -40 -38 4 -34 C 30 -66 52 -44 4 -34 Z" fill="#fff" />
          </g>
        </g>
      </g>
      {confetti.map((p, k) => (
        <rect key={k} className="ba-fall" style={{ '--d': `${p.d}s`, '--t': `${p.t}s` }} x={p.x} y="-10" width={p.w} height={p.w * 1.8} rx="1" fill={p.col} />
      ))}
    </g>
  );
}

function Vault({ id, r, c }) {
  const sx = 200 + (r() - 0.5) * 120;
  return (
    <g>
      <rect width="400" height="240" fill={`url(#${id}-hex)`} opacity=".5" />
      <g transform={`translate(${sx} 120)`}>
        <g className="ba-spin" style={{ '--t': '24s' }}>
          <circle r="92" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeDasharray="2 10" />
        </g>
        <g className="ba-spin rev" style={{ '--t': '16s' }}>
          <circle r="74" fill="none" stroke={c.c3} strokeOpacity=".8" strokeWidth="3" strokeDasharray="60 40 10 40" />
        </g>
        <circle r="70" fill={`url(#${id}-halo)`} className="ba-pulse" />
        <path d="M 0 -58 L 46 -40 V 0 C 46 30 24 50 0 60 C -24 50 -46 30 -46 0 V -40 Z" fill={`url(#${id}-shield)`} stroke="#fff" strokeWidth="2.5" />
        <path d="M 0 -58 L 0 60 C -24 50 -46 30 -46 0 V -40 Z" fill="#fff" opacity=".12" />
        <path className="ba-draw" d="M -20 2 L -5 17 L 22 -14" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
      </g>
      <g className="ba-scan">
        <rect x="0" y="0" width="400" height="3" fill={c.c3} opacity=".9" />
        <rect x="0" y="-26" width="400" height="26" fill={`url(#${id}-scan)`} />
      </g>
    </g>
  );
}

const PIECES = { orbit: Orbit, chorus: Chorus, dusk: Dusk, skyline: Skyline, nebula: Nebula, vault: Vault };

/** The cover itself. `seed` makes it unique, `hue` grades it, `kind` (a blog category) picks its world. */
export default function BlogArt({ seed = '', hue = 220, kind = 'Earn online', className = '', stars = true }) {
  const id = 'ba' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const r = rng(seed + kind);
  const world = KIND[kind] || 'orbit';
  const Piece = PIECES[world];
  const h = hue + Math.round((r() - 0.5) * 24);
  const c = {
    h,
    c1: hsl(h, 92, 62),
    c2: hsl(h + 48, 88, 58),
    c3: hsl(h + 170 + r() * 30, 92, 66),
    deep: hsl(h + 18, 70, 12)
  };
  const flip = r() > 0.5;
  const blobs = [0, 1, 2].map((k) => ({ x: 40 + r() * 320, y: 20 + r() * 200, rr: 120 + r() * 90, col: [c.c1, c.c2, c.c3][k] }));
  const starList = stars ? Array.from({ length: 16 + Math.floor(r() * 10) }).map(() => ({ x: r() * 400, y: r() * 170, s: 0.6 + r() * 1.6, d: -r() * 4 })) : [];
  return (
    <svg className={`ba ba-${world} ${className}`} viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        {blobs.map((b, k) => (
          <radialGradient key={k} id={`${id}-b${k}`}>
            <stop offset="0" stopColor={b.col} stopOpacity=".95" />
            <stop offset="1" stopColor={b.col} stopOpacity="0" />
          </radialGradient>
        ))}
        <radialGradient id={`${id}-halo`}>
          <stop offset="0" stopColor={c.c3} stopOpacity=".7" />
          <stop offset="1" stopColor={c.c3} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-planet`} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".25" stopColor={c.c3} />
          <stop offset=".7" stopColor={c.c1} />
          <stop offset="1" stopColor={c.deep} />
        </radialGradient>
        <radialGradient id={`${id}-sun`} cx=".4" cy=".35">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset=".5" stopColor="#ffd166" />
          <stop offset="1" stopColor={hsl(h + 330, 90, 60)} />
        </radialGradient>
        <linearGradient id={`${id}-ring`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".1" />
          <stop offset=".5" stopColor="#fff" />
          <stop offset="1" stopColor={c.c3} stopOpacity=".3" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".5" stopColor="#ffc93c" />
          <stop offset="1" stopColor="#d48806" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".42" />
          <stop offset="1" stopColor="#fff" stopOpacity=".08" />
        </linearGradient>
        <linearGradient id={`${id}-glass2`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c.c3} stopOpacity=".55" />
          <stop offset="1" stopColor={c.c1} stopOpacity=".15" />
        </linearGradient>
        <linearGradient id={`${id}-tower`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={hsl(h + 10, 55, 34)} />
          <stop offset="1" stopColor={c.deep} />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffe08a" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-gift`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={hsl(h + 40, 90, 62)} />
          <stop offset="1" stopColor={hsl(h + 40, 80, 40)} />
        </linearGradient>
        <linearGradient id={`${id}-shield`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c.c1} />
          <stop offset="1" stopColor={hsl(h + 60, 80, 36)} />
        </linearGradient>
        <linearGradient id={`${id}-scan`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.c3} stopOpacity="0" />
          <stop offset="1" stopColor={c.c3} stopOpacity=".35" />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-vig`} r=".75">
          <stop offset=".6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".38" />
        </radialGradient>
        <pattern id={`${id}-hex`} width="28" height="48" patternUnits="userSpaceOnUse">
          <path d="M14 0 L28 8 V24 L14 32 L0 24 V8 Z M14 32 V48" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="240" fill={c.deep} />
      {blobs.map((b, k) => (
        <circle key={k} className={`ba-drift d${k}`} cx={b.x} cy={b.y} r={b.rr} fill={`url(#${id}-b${k})`} opacity={k === 2 ? 0.55 : 0.8} />
      ))}
      {/* Stars twinkle in two groups (two animations per cover rather than one per star: SVG
          animations run on the main thread, so fewer of them keeps scrolling smooth). */}
      {[0, 1].map((gk) => (
        <g key={gk} className="ba-tw" style={{ '--d': `${-gk * 1.6}s` }}>
          {starList.filter((_, k) => k % 2 === gk).map((s, k) => (
            <circle key={k} cx={s.x} cy={s.y} r={s.s} fill="#fff" />
          ))}
        </g>
      ))}
      <g transform={flip ? 'translate(400 0) scale(-1 1)' : undefined}>
        <Piece id={id} r={r} c={c} />
      </g>
      <rect className="ba-sheen" x="-160" y="-40" width="120" height="320" fill={`url(#${id}-sheen)`} transform="rotate(18)" />
      <rect width="400" height="240" fill={`url(#${id}-vig)`} />
    </svg>
  );
}

/** The same cover, drawn only in the browser and only once it comes near the screen. The prerendered
 *  page carries a light colour wash instead of the full SVG, which keeps every page's HTML small
 *  (the Blogs page alone would otherwise ship 30 covers of markup before anything else). */
export function LazyBlogArt(props) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setOn(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (on) return <BlogArt {...props} />;
  return <span ref={ref} className="ba-ph" style={{ '--h': props.hue || 220 }} aria-hidden="true" />;
}
