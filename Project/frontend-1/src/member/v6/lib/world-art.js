/* Round 24 · art for the Professional "Insight Observatory" and the Teen "Quest Islands".
   Same contract as kingdom-art.js: pure functions that return SVG strings in local coordinates
   (origin = the plot's centre for a star, the waterline centre for an island). Animated parts carry
   classes styled in world.css (transform and opacity only). m = itemMeta(): { a, a2, a3, e: [emoji] }. */

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const sign = (x, y, e, s = 14, cls = 'sign') => `<text class="${cls}" x="${x}" y="${y}" font-size="${s}" text-anchor="middle" dominant-baseline="central">${esc(e)}</text>`;

/* ------------------------------------------------------------ observatory */
const SPARK = 'M0 -17C2 -5 5 -2 17 0C5 2 2 5 0 17C-2 5 -5 2 -17 0C-5 -2 -2 -5 0 -17Z';

/** a star for one profile or survey: done | open | prog | locked */
export function star(m, st, pct = 0) {
  const e = (m.e && m.e[0]) || '✨';
  if (st === 'done') {
    return `<circle class="ob-halo" r="30" fill="${m.a}" opacity=".22"/>`
      + `<circle class="ob-halo2" r="18" fill="${m.a2 || m.a}" opacity=".35"/>`
      + `<g class="ob-rays"><path d="M0 -34V-24M0 24V34M-34 0H-24M24 0H34" stroke="${m.a3 || '#fff'}" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>`
      + `<path class="ob-core" d="${SPARK}" fill="#fff"/>`
      + `<circle r="4.2" fill="${m.a3 || '#fff'}"/>`
      + `<g class="ob-orbit"><circle r="23" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1"/><circle class="ob-moon" cx="23" cy="0" r="2.6" fill="${m.a2 || '#9ff'}"/></g>`
      + sign(0, 42, e, 13, 'sign ob-tag');
  }
  if (st === 'prog') {
    const c = 2 * Math.PI * 18, on = Math.max(0.04, Math.min(1, pct / 100)) * c;
    return `<circle r="18" fill="rgb(5 12 40 / .55)" stroke="rgb(255 255 255 / .18)" stroke-width="3"/>`
      + `<circle r="18" fill="none" stroke="#ffb020" stroke-width="3" stroke-linecap="round" stroke-dasharray="${on.toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90)"/>`
      + `<path d="${SPARK}" fill="#ffe08a" transform="scale(.55)" class="ob-twinkle"/>`
      + sign(0, -34, e, 14, 'sign ready-sign');
  }
  if (st === 'open') {
    return `<circle class="ob-ping" r="14" fill="none" stroke="#5eead4" stroke-width="2"/>`
      + `<g class="ob-reticle"><circle r="19" fill="none" stroke="#5eead4" stroke-width="2" stroke-dasharray="6 5"/><path d="M0 -27V-21M0 21V27M-27 0H-21M21 0H27" stroke="#5eead4" stroke-width="2" stroke-linecap="round"/></g>`
      + `<circle r="5" fill="#ccfbf1" class="ob-twinkle"/>`
      + sign(0, -38, e, 15, 'sign ready-sign');
  }
  return `<circle r="11" fill="rgb(120 150 255 / .08)" stroke="rgb(180 200 255 / .45)" stroke-width="1.3" stroke-dasharray="2 3"/><path d="${SPARK}" transform="scale(.32)" fill="rgb(215 225 255 / .75)"/>`;
}

/** the observatory dome at the bottom of the scene (origin = base centre) */
export function dome(gold) {
  const body = gold ? '#f4c04e' : '#d8e1f2', side = gold ? '#c48a12' : '#9eabc6', slit = '#0a1230';
  return `<rect x="-70" y="-46" width="140" height="46" rx="6" fill="${side}"/>`
    + `<rect x="-70" y="-46" width="100" height="46" rx="6" fill="${body}"/>`
    + `<path d="M-74 -46a74 70 0 0 1 148 0z" fill="${body}"/>`
    + `<path d="M20 -110a74 70 0 0 1 54 64h-54z" fill="${side}" opacity=".55"/>`
    + `<path d="M-12 -114h24v68h-24z" fill="${slit}"/>`
    + `<g class="ob-scope"><rect x="-7" y="-150" width="14" height="66" rx="5" fill="${gold ? '#ffe08a' : '#5d6b8f'}"/><rect x="-9" y="-156" width="18" height="12" rx="4" fill="${gold ? '#fff3b0' : '#8a98bd'}"/></g>`
    + `<rect x="-18" y="-30" width="36" height="30" rx="4" fill="${slit}" opacity=".7"/>`
    + `<rect x="-58" y="-34" width="10" height="12" rx="2" class="ob-win"/><rect x="-38" y="-34" width="10" height="12" rx="2" class="ob-win" style="--d:.4s"/><rect x="28" y="-34" width="10" height="12" rx="2" class="ob-win" style="--d:.8s"/><rect x="48" y="-34" width="10" height="12" rx="2" class="ob-win" style="--d:1.2s"/>`;
}

/* ------------------------------------------------------------ islands */
function palm(x, y, s, leaf) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0C-2 -14 2 -30 8 -42" stroke="#9a6533" stroke-width="5" fill="none" stroke-linecap="round"/>`
    + `<g class="is-leaves" style="--d:${(x % 7) * 0.2}s"><path d="M8 -42c-12 -8 -24 -4 -30 6c10 -6 20 -6 30 -6z" fill="${leaf}"/><path d="M8 -42c10 -10 24 -10 30 0c-10 -4 -20 -4 -30 0z" fill="${leaf}"/><path d="M8 -42c-4 -12 -14 -18 -24 -16c10 2 18 8 24 16z" fill="${leaf}"/><path d="M8 -42c6 -12 18 -16 26 -12c-10 0 -18 4 -26 12z" fill="${leaf}"/><circle cx="7" cy="-39" r="3" fill="#7a4a1e"/><circle cx="11" cy="-38" r="2.6" fill="#7a4a1e"/></g></g>`;
}
const ripple = `<g class="is-ripple"><ellipse rx="54" ry="13" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"/><ellipse rx="54" ry="13" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2" style="--d:1.2s"/></g>`;

/** an island for one profile or survey: done | open | prog | locked */
export function island(m, st, pct = 0) {
  const e = (m.e && m.e[0]) || '⭐';
  if (st === 'done') {
    return ripple
      + `<ellipse cx="0" cy="2" rx="50" ry="14" fill="#ffd98a"/>`
      + `<path d="M-46 0c6 -16 22 -24 46 -24s40 8 46 24z" fill="#f6c768"/>`
      + `<path d="M-34 -8c8 -12 20 -17 34 -17s28 5 34 17c-20 5 -48 5 -68 0z" fill="#3ccf7e"/>`
      + palm(-20, -10, 1, '#1fae5b') + palm(18, -14, 0.8, '#27c06a')
      + `<g class="flagpole"><rect x="2" y="-74" width="2" height="60" fill="#6b4a2c"/><path class="flag" d="M4 -74q10 -4 20 0t20 0v16q-10 4 -20 0t-20 0z" fill="${m.a}"/></g>`
      + sign(24, -66, e, 12)
      + `<g class="is-chest" transform="translate(-6 -10)"><rect x="-9" y="-8" width="18" height="11" rx="2" fill="#a9661f"/><path d="M-9 -8a9 6 0 0 1 18 0z" fill="#d18a35"/><rect x="-1.5" y="-6" width="3" height="5" fill="#ffd75e"/><circle class="is-glint" cx="6" cy="-12" r="2" fill="#fff8c4"/></g>`;
  }
  if (st === 'prog') {
    return ripple
      + `<ellipse cx="0" cy="2" rx="40" ry="11" fill="#ffd98a"/><path d="M-36 0c6 -10 18 -15 36 -15s30 5 36 15z" fill="#f3cf86"/>`
      + `<path d="M-14 -6L0 -32L14 -6z" fill="${m.a}"/><path d="M0 -32L14 -6h-8z" fill="rgb(0 0 0 / .18)"/>`
      + `<g class="kd-pct"><rect x="-22" y="8" width="44" height="16" rx="8" fill="#0b1433"/><text x="0" y="19.5" text-anchor="middle" fill="#fff" font-size="10" font-weight="800">${Math.round(pct)}%</text></g>`
      + sign(0, -46, e, 15, 'sign ready-sign');
  }
  if (st === 'open') {
    return ripple
      + `<ellipse cx="0" cy="2" rx="40" ry="11" fill="#ffe3a3"/><path d="M-36 0c6 -10 18 -15 36 -15s30 5 36 15z" fill="#f7d793"/>`
      + `<g class="is-x"><path d="M-9 -15l18 9M9 -15l-18 9" stroke="#e5484d" stroke-width="4" stroke-linecap="round"/></g>`
      + `<g class="is-spark"><path d="M0 -42l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#fff6b0"/></g>`
      + sign(0, -58, e, 16, 'sign ready-sign');
  }
  return `<ellipse cx="0" cy="2" rx="40" ry="11" fill="#e8d9b0"/><path d="M-36 0c6 -11 18 -16 36 -16s30 5 36 16z" fill="#d9c595"/>`
    + `<path d="M-14 -10c4 -6 10 -8 14 -8s10 2 14 8z" fill="#9fb39a"/>`
    + `<g class="is-fog"><ellipse cx="-16" cy="-16" rx="24" ry="9" fill="#fff" opacity=".8"/><ellipse cx="14" cy="-20" rx="20" ry="8" fill="#fff" opacity=".75"/></g>`
    + sign(0, -18, '🔒', 12, 'sign is-lock');
}

/** the art for the completion celebration (origin = bottom centre of a 180×190 box) */
export function celebrationArt(worldId, m) {
  if (worldId === 'observatory') return `<g transform="translate(0 -78) scale(2.4)">${star(m, 'done')}</g>`;
  if (worldId === 'islands') return `<g transform="translate(0 -6) scale(1.6)">${island(m, 'done')}</g>`;
  return null;
}
