// One rating gem, drawn as inline SVG (no images, no library).
//
// Five different cuts, one per rating level (see src/data/reviewFacets.js):
//   1 pebble   – a smooth river stone
//   2 quartz   – a crystal cluster
//   3 amber    – a trillion (triangle) cut
//   4 sapphire – an emerald/step cut
//   5 diamond  – a brilliant cut with sparkles
//
// Every facet is a separate polygon filled with a lighter or darker shade of the level colours, so
// the gem reads as a lit 3D object. Gradient ids are unique per instance (useId) so dozens of gems
// can share a page. Motion (float, tilt, gleam, sparkles) is pure CSS in src/styles/reviews.css and
// switches off for reduced motion.
import { useId } from 'react';
import { levelOf } from '../../data/reviewFacets.js';

const pts = (a) => a.map((p) => p.join(',')).join(' ');

/** Facet bands between an outer and an inner outline (same number of points). */
function bands(outer, inner, shades) {
  return outer.map((p, i) => {
    const n = (i + 1) % outer.length;
    return <polygon key={i} points={pts([p, outer[n], inner[n], inner[i]])} fill={shades[i % shades.length]} />;
  });
}

function Pebble({ g }) {
  return (
    <>
      <path d="M18 60c-4-18 10-36 32-38 22-2 36 12 34 30-2 20-18 32-38 32-14 0-25-9-28-24z" fill={`url(#${g}b)`} />
      <path d="M26 52c2-12 12-20 26-21" stroke="rgba(255,255,255,.55)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="62" cy="66" rx="12" ry="6" fill="rgba(0,0,0,.14)" />
      <circle cx="40" cy="64" r="2.4" fill="rgba(0,0,0,.18)" />
      <circle cx="58" cy="44" r="1.8" fill="rgba(0,0,0,.14)" />
    </>
  );
}

function Quartz({ s }) {
  return (
    <>
      {/* small crystal, left */}
      <g transform="rotate(-18 30 70)">
        <polygon points="30,38 22,48 22,84 30,90" fill={s[2]} />
        <polygon points="30,38 38,48 38,84 30,90" fill={s[1]} />
        <polygon points="30,30 22,48 30,44" fill={s[0]} />
        <polygon points="30,30 38,48 30,44" fill={s[1]} />
      </g>
      {/* main crystal */}
      <polygon points="36,30 50,38 50,92 36,84" fill={s[1]} />
      <polygon points="50,38 64,30 64,84 50,92" fill={s[2]} />
      <polygon points="50,6 36,30 50,38" fill={s[0]} />
      <polygon points="50,6 50,38 64,30" fill={s[1]} />
      {/* small crystal, right */}
      <g transform="rotate(16 72 72)">
        <polygon points="72,46 66,54 66,86 72,90" fill={s[1]} />
        <polygon points="72,46 78,54 78,86 72,90" fill={s[2]} />
        <polygon points="72,36 66,54 72,50" fill={s[0]} />
        <polygon points="72,36 78,54 72,50" fill={s[1]} />
      </g>
      <path d="M41 36v40" stroke="rgba(255,255,255,.5)" strokeWidth="2.4" strokeLinecap="round" />
    </>
  );
}

function Amber({ s }) {
  const outer = [[50, 10], [92, 84], [8, 84]];
  const inner = [[50, 34], [72, 72], [28, 72]];
  return (
    <>
      {bands(outer, inner, [s[0], s[2], s[1]])}
      <polygon points={pts(inner)} fill={s[0]} />
      <polygon points="50,34 72,72 50,60" fill={s[1]} opacity=".55" />
      <polygon points="50,34 28,72 50,60" fill="#fff" opacity=".25" />
    </>
  );
}

function Sapphire({ s }) {
  const o = [[30, 12], [70, 12], [88, 30], [88, 70], [70, 88], [30, 88], [12, 70], [12, 30]];
  const m = [[36, 22], [64, 22], [78, 36], [78, 64], [64, 78], [36, 78], [22, 64], [22, 36]];
  const t = [[42, 32], [58, 32], [68, 42], [68, 58], [58, 68], [42, 68], [32, 58], [32, 42]];
  const sh = [s[0], s[0], s[1], s[2], s[2], s[2], s[1], s[0]];
  const sh2 = [s[1], s[0], s[1], s[2], s[3], s[2], s[2], s[1]];
  return (
    <>
      {bands(o, m, sh)}
      {bands(m, t, sh2)}
      <polygon points={pts(t)} fill={s[1]} />
      <polygon points="42,32 58,32 50,50" fill="#fff" opacity=".28" />
    </>
  );
}

function Diamond({ s }) {
  return (
    <>
      {/* crown */}
      <polygon points="8,40 28,18 30,40" fill={s[1]} />
      <polygon points="28,18 50,40 30,40" fill={s[0]} />
      <polygon points="28,18 72,18 50,40" fill="#fff" opacity=".92" />
      <polygon points="72,18 70,40 50,40" fill={s[0]} />
      <polygon points="72,18 92,40 70,40" fill={s[2]} />
      {/* pavilion */}
      <polygon points="8,40 30,40 50,92" fill={s[2]} />
      <polygon points="30,40 50,40 50,92" fill={s[1]} />
      <polygon points="50,40 70,40 50,92" fill={s[0]} />
      <polygon points="70,40 92,40 50,92" fill={s[3]} />
      <path d="M8 40h84" stroke="rgba(255,255,255,.7)" strokeWidth="1.4" />
      <path d="M36 50l10 30" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

const CUTS = [Pebble, Quartz, Amber, Sapphire, Diamond];

/**
 * @param {number} level 1–5
 * @param {number} size  px
 * @param {'still'|'float'|'spin'} motion
 */
export default function Gem({ level = 4, size = 64, motion = 'float', className = '', title }) {
  const L = levelOf(level);
  const id = useId().replace(/:/g, '');
  const g = `gm${id}`;
  // Four shades per gem: highlight, base, shadow, deep shadow.
  const shades = [L.c1, L.c2, L.c3, L.c3];
  const Cut = CUTS[L.v - 1];
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': 'true' };
  // Small gems (badges, chips, card scores) skip the moving gleam and the sparkles: at that size
  // they are invisible, yet across a page of reviews they added up to hundreds of always-running
  // animations, and the gleam (an SVG transform) can only animate on the main thread.
  const small = size < 30;
  return (
    <span className={`gem gem-${L.key} gm-${motion} ${className}`} style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--gs': `${size}px` }}>
      <span className="gem-tilt">
        <svg viewBox="0 0 100 100" width={size} height={size} {...a11y}>
          <defs>
            {/* only the pebble (level 1) fills with this gradient; the faceted cuts use flat shades */}
            {L.v === 1 && (
            <radialGradient id={`${g}b`} cx="35%" cy="30%" r="75%">
              <stop offset="0" stopColor={L.c1} />
              <stop offset=".6" stopColor={L.c2} />
              <stop offset="1" stopColor={L.c3} />
            </radialGradient>
            )}
            {!small && (
            <linearGradient id={`${g}s`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".45" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
              <stop offset=".55" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            )}
            {!small && (
            <clipPath id={`${g}c`}>
              <Cut s={shades} g={g} />
            </clipPath>
            )}
          </defs>
          <Cut s={shades} g={g} />
          {!small && L.v > 1 && (
            <g clipPath={`url(#${g}c)`}>
              <rect className="gem-gleam" x="-100" y="0" width="100" height="100" fill={`url(#${g}s)`} />
            </g>
          )}
        </svg>
      </span>
      {!small && L.v >= 4 && (
        <span className="gem-sparks" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
    </span>
  );
}
