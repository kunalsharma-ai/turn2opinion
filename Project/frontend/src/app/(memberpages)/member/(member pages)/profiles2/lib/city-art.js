/* "Opinion City" artwork: every profile is a tower in the respondent's skyline.
   Pure string builders (no DOM), shared by the site (OpinionCity, TowerRise) and the e-mail image script
   (scripts/build-email-images.mjs), so the city looks the same on the page and in the reminder e-mails.

   A tower's shape, height and width come from its profile slug, so every respondent sees the same, stable
   city: Basic is always the same art-deco block, Travel always the same spire, and so on. Colours come from
   the profile's world (src/lib/themes.js). Unbuilt profiles are drawn as blueprint outlines on their plot. */
import { TW, TMAP, GROUPS } from './themes.js';

const hash = (s) => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };
export const TYPES = ['slab', 'deco', 'spire', 'dome', 'crown', 'twin'];

/* Hand-picked shapes for the profiles people meet first, generated for the rest. */
const FIXED = { basic: ['deco', 0.78], professional: ['spire', 1], additional: ['dome', 0.7], financial: ['crown', 0.92], travel: ['spire', 0.86], tech: ['twin', 0.9], game: ['crown', 0.74], health: ['dome', 0.66], shopping: ['slab', 0.72] };

export function towerSpec(slug) {
  const h = hash(slug), f = FIXED[slug];
  const w = TW[TMAP[slug]] || TW[slug] || TW.rewards;
  return {
    slug,
    type: f ? f[0] : TYPES[h % TYPES.length],
    h: f ? f[1] : 0.5 + ((h >>> 8) % 50) / 100,      // 0.50 … 0.99 of the tallest tower
    a: w.a, a2: w.a2, a3: w.a3,
    flip: (h >>> 4) % 2 === 1,
  };
}

/* Skyline order: profiles grouped by district (About you, Work & money, …), Additional details last. */
export function cityOrder(profiles) {
  const slugs = profiles.map((p) => p.s), out = [];
  for (const [, g] of GROUPS) for (const s of g) if (slugs.includes(s) && !out.includes(s)) out.push(s);
  for (const s of slugs) if (!out.includes(s)) out.push(s);
  return out;
}

/* Shared <defs>: window grids (lit and dark), a glass shade and the blueprint grid.
   On the page they are rendered once per board; e-mail images embed them in each SVG. */
export const CITY_DEFS = `
<pattern id="cw-on" width="8" height="10" patternUnits="userSpaceOnUse"><rect x="1.5" y="2" width="4" height="5" rx=".6" fill="#ffd66b"/></pattern>
<pattern id="cw-on2" width="16" height="20" patternUnits="userSpaceOnUse"><rect x="1.5" y="2" width="4" height="5" rx=".6" fill="#fff4c2"/><rect x="9.5" y="12" width="4" height="5" rx=".6" fill="#ffb84d"/><rect x="9.5" y="2" width="4" height="5" rx=".6" fill="rgba(0,0,0,.25)"/></pattern>
<pattern id="cw-off" width="8" height="10" patternUnits="userSpaceOnUse"><rect x="1.5" y="2" width="4" height="5" rx=".6" fill="rgba(255,255,255,.13)"/></pattern>
<linearGradient id="cw-shade" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".30"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
<linearGradient id="cw-top" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;

const r1 = (n) => Math.round(n * 10) / 10;

/* Geometry of each tower type inside a 40-unit-wide box of height H (ground at y = H).
   Returns the outline pieces (bodies get windows), plus the roof point where the emoji / firework sits. */
function shapes(type, H, flip) {
  const B = [], extra = [];
  let roof = 20, top = 0;
  const rect = (x, y, w, h) => B.push({ x, y, w, h });
  switch (type) {
    case 'deco': {
      const t1 = H * 0.42, t2 = H * 0.2, t3 = 12;
      rect(4, t1, 32, H - t1); rect(9, t2, 22, t1 - t2 + 1); rect(14, t3, 12, t2 - t3 + 1);
      extra.push(`<path d="M20 ${t3}V2" stroke="currentColor" stroke-width="1.4"/>`); top = 2; roof = 20; break;
    }
    case 'spire': {
      const t = H * 0.16;
      rect(7, t, 26, H - t);
      extra.push(`<path d="M7 ${r1(t)}L20 ${r1(t - 12)}L33 ${r1(t)}Z" class="ct-fill"/><path d="M20 ${r1(t - 12)}V0" stroke="currentColor" stroke-width="1.2"/>`);
      top = 0; roof = 20; break;
    }
    case 'dome': {
      const t = H * 0.3;
      rect(6, t, 28, H - t);
      extra.push(`<path d="M6 ${r1(t)}a14 13 0 0 1 28 0Z" class="ct-fill"/><path d="M20 ${r1(t - 13)}v-6" stroke="currentColor" stroke-width="1.2"/>`);
      top = t - 19; roof = 20; break;
    }
    case 'crown': {
      const hi = H * 0.08, lo = H * 0.2;
      B.push({ poly: flip ? `5,${r1(lo)} 35,${r1(hi)} 35,${H} 5,${H}` : `5,${r1(hi)} 35,${r1(lo)} 35,${H} 5,${H}`, x: 5, y: lo, w: 30, h: H - lo });
      top = hi; roof = flip ? 30 : 10; break;
    }
    case 'twin': {
      const a = H * 0.1, b = H * 0.24;
      rect(4, flip ? b : a, 14, H - (flip ? b : a)); rect(22, flip ? a : b, 14, H - (flip ? a : b));
      const bridge = H * 0.45;
      extra.push(`<rect x="18" y="${r1(bridge)}" width="4" height="6" class="ct-fill"/>`);
      top = a; roof = flip ? 29 : 11; break;
    }
    default: {
      const t = H * 0.06;
      rect(5, t, 30, H - t);
      extra.push(`<rect x="3" y="${r1(t - 3)}" width="34" height="4" rx="1" class="ct-fill"/><path d="M${flip ? 29 : 11} ${r1(t - 3)}v-9" stroke="currentColor" stroke-width="1.2"/>`);
      top = t - 12; roof = 20;
    }
  }
  return { B, extra, roof, top };
}

/* One tower as an SVG string.
   state: 'lit' (built, windows glowing) · 'plot' (blueprint outline on an empty plot)
   opts.H: drawing height in units (40 wide); opts.idPrefix: unique prefix for per-tower gradients. */
/* Drawing box of a tower (viewBox units, 40 wide): use 40 / vbH as the element's aspect ratio so the roof,
   emoji and firework line up with the drawing exactly. */
export function towerBox(spec, opts = {}) {
  const H = Math.round(opts.H || 40 + spec.h * 120), { top } = shapes(spec.type, H, spec.flip), y0 = Math.min(0, Math.floor(top) - 2);
  return { H, y0, vbH: H - y0 };
}
export function towerSVG(spec, state = 'lit', opts = {}) {
  const { H, y0, vbH } = towerBox(spec, opts);
  const { B, extra, top, roof } = shapes(spec.type, H, spec.flip);
  const vb = `0 ${y0} 40 ${vbH}`;
  const body = (b, cls, fill) => b.poly ? `<polygon points="${b.poly}" class="${cls}"${fill ? ` fill="${fill}"` : ''}/>` : `<rect x="${b.x}" y="${r1(b.y)}" width="${b.w}" height="${r1(b.h)}" class="${cls}"${fill ? ` fill="${fill}"` : ''}/>`;
  const win = (b, pat, cls) => {
    const x = b.x + 3, y = (b.poly ? Math.max(...b.poly.split(' ').map((p) => +p.split(',')[1]).slice(0, 2)) : b.y) + 5, w = b.w - 6, h = H - y - 7;
    return h > 4 && w > 3 ? `<rect x="${x}" y="${r1(y)}" width="${w}" height="${r1(h)}" fill="url(#${pat})" class="${cls}"/>` : '';
  };
  if (state === 'plot') {
    const dash = 'stroke-dasharray="3 2.5"';
    return `<svg class="tw tw-plot" viewBox="${vb}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">`
      + B.map((b) => b.poly ? `<polygon points="${b.poly}" fill="none" stroke="currentColor" stroke-width="1.1" ${dash}/>` : `<rect x="${b.x}" y="${r1(b.y)}" width="${b.w}" height="${r1(b.h)}" fill="none" stroke="currentColor" stroke-width="1.1" ${dash}/>`).join('')
      + `<path d="M2 ${H - 0.6}H38" stroke="currentColor" stroke-width="1.2"/></svg>`;
  }
  const fill = spec.a;
  return `<svg class="tw tw-lit" viewBox="${vb}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false" style="color:${spec.a2}">`
    + `<g class="tw-body">` + B.map((b) => body(b, 'ct-b', fill)).join('') + extra.join('').replace(/class="ct-fill"/g, `fill="${fill}"`)
    + B.map((b) => body(b, 'ct-s', 'url(#cw-shade)')).join('') + `</g>`
    + `<g class="tw-off">` + B.map((b) => win(b, 'cw-off', '')).join('') + `</g>`
    + `<g class="tw-win">` + B.map((b, i) => win(b, i % 2 ? 'cw-on2' : 'cw-on', '')).join('') + `</g>`
    + `<circle class="tw-beacon" cx="${roof}" cy="${r1(top + 1)}" r="1.6" fill="#ff4d5e"/>`
    + `</svg>`;
}

/* Thresholds (number of towers) for the five city levels, for a city of `total` towers. */
export const LEVEL_SHARE = [0, 0.15, 0.35, 0.6, 1];
export const levelSteps = (total) => LEVEL_SHARE.map((f) => Math.ceil(total * f));
export function levelOf(done, total) {
  const s = levelSteps(total); let i = 0;
  s.forEach((v, k) => { if (done >= v) i = k; });
  return { i, next: i < s.length - 1 ? s[i + 1] : null, steps: s };
}
