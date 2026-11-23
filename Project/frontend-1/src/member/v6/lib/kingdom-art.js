/* CHANGE-06 · Kingdom art: every building is drawn as an SVG string in local coordinates
   (origin = middle of the building's base, y grows downwards, so buildings go up into negative y).
   Flat 2.5D style: front face, a darker side face and a lighter top, lit windows (class "win"),
   animated parts (flag waves, smoke, windmill blades, lighthouse beam, clock hands…) styled in kingdom.css.
   Pure functions, no DOM access: easy to unit-test and to render on a server. */

const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
function hex(c) { c = String(c || '#888').replace('#', ''); if (c.length === 3) c = c.split('').map((x) => x + x).join(''); const n = parseInt(c, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
/** mix a colour towards white (amt > 0) or black (amt < 0) */
export function shade(c, amt) { const [r, g, b] = hex(c), t = amt > 0 ? 255 : 0, k = Math.abs(amt); return '#' + [r, g, b].map((v) => clamp(v + (t - v) * k).toString(16).padStart(2, '0')).join(''); }
export const mix = (c1, c2, k) => { const a = hex(c1), b = hex(c2); return '#' + a.map((v, i) => clamp(v + (b[i] - v) * k).toString(16).padStart(2, '0')).join(''); };

const D = 9, DY = 5;   // depth of the side face
/* a box: front face, side face, top face */
function box(x, y, w, h, c) {
  const f = c, s = shade(c, -0.28), t = shade(c, 0.22);
  return `<path d="M${x + w} ${y}l${D} ${-DY}v${-h}l${-D} ${DY}z" fill="${s}"/>`
    + `<path d="M${x} ${y - h}l${D} ${-DY}h${w}l${-D} ${DY}z" fill="${t}"/>`
    + `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${f}"/>`;
}
function cyl(x, y, w, h, c) {
  const r = w / 2, s = shade(c, -0.3), l = shade(c, 0.18);
  return `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}"/>`
    + `<rect x="${x + w * 0.62}" y="${y - h}" width="${w * 0.38}" height="${h}" fill="${s}" opacity=".55"/>`
    + `<rect x="${x + w * 0.12}" y="${y - h}" width="${w * 0.14}" height="${h}" fill="${l}" opacity=".5"/>`
    + `<ellipse cx="${x + r}" cy="${y}" rx="${r}" ry="${r * 0.28}" fill="${s}"/>`;
}
const roofTri = (x, y, w, h, c) => `<path d="M${x - 4} ${y}L${x + w / 2} ${y - h}L${x + w + 4} ${y}z" fill="${c}"/><path d="M${x + w / 2} ${y - h}L${x + w + 4} ${y}l${D} ${-DY}L${x + w / 2 + D} ${y - h - DY}z" fill="${shade(c, -0.3)}"/>`;
const cone = (cx, y, r, h, c) => `<path d="M${cx - r - 3} ${y}L${cx} ${y - h}L${cx + r + 3} ${y}z" fill="${c}"/><path d="M${cx} ${y - h}L${cx + r + 3} ${y}L${cx + r * 0.2} ${y}z" fill="${shade(c, -0.3)}"/>`;
const dome = (cx, y, r, c) => `<path d="M${cx - r} ${y}a${r} ${r} 0 0 1 ${2 * r} 0z" fill="${c}"/><path d="M${cx} ${y - r}a${r} ${r} 0 0 1 ${r} ${r}h${-r * 0.45}a${r * 0.7} ${r} 0 0 0 ${-r * 0.55} ${-r}z" fill="${shade(c, -0.28)}"/><circle cx="${cx - r * 0.4}" cy="${y - r * 0.55}" r="${r * 0.16}" fill="#fff" opacity=".35"/>`;
const crenel = (x, y, w, c, n = 0) => { n = n || Math.max(3, Math.round(w / 9)); const s = w / (2 * n - 1); let o = ''; for (let i = 0; i < n; i++) o += `<rect x="${x + i * 2 * s}" y="${y - 6}" width="${s}" height="6" fill="${c}"/>`; return o; };
function wins(x, y, cols, rows, gx, gy, ww, wh, d = 0) {
  let o = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) o += `<rect class="win" style="--d:${(d + r * cols + c) * 0.08}s" x="${x + c * gx}" y="${y + r * gy}" width="${ww}" height="${wh}" rx="1.5"/>`;
  return o;
}
const door = (cx, y, w, h, c) => `<path d="M${cx - w / 2} ${y}v${-h + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0v${h - w / 2}z" fill="${c}"/>`;
const flag = (x, y, h, c) => `<g class="flagpole"><rect x="${x - 0.8}" y="${y - h}" width="1.6" height="${h}" fill="#5b4a3a"/><path class="flag" d="M${x + 0.8} ${y - h}q7 -3 14 0t14 0v9q-7 3 -14 0t-14 0z" fill="${c}"/></g>`;
const smoke = (x, y) => `<g class="smoke"><circle cx="${x}" cy="${y}" r="3.5"/><circle cx="${x}" cy="${y}" r="3.5" style="--d:1.1s"/><circle cx="${x}" cy="${y}" r="3.5" style="--d:2.2s"/></g>`;
const sign = (cx, y, e, s = 13) => `<text class="sign" x="${cx}" y="${y}" font-size="${s}" text-anchor="middle" dominant-baseline="central">${e}</text>`;

const STONE = '#e9e3d6', STONE2 = '#cfc6b3', WOOD = '#8a5a3b', GLASS = '#bfe6ff';

/* --- archetypes: (palette) → svg string ---  p = { a, a2, a3, e: [emoji…] } */
const A = {
  keep(p) {
    const w = STONE, r = p.a;
    return box(-58, 0, 28, 74, STONE2) + cone(-44, -74, 15, 34, r) + flag(-44, -108, 22, p.a3)
      + box(30, 0, 28, 74, STONE2) + cone(44, -74, 15, 34, r) + flag(44, -108, 22, p.a2)
      + box(-32, 0, 64, 92, w) + crenel(-32, -92, 64, w, 5) + box(-14, -92, 28, 30, STONE2) + cone(0, -122, 15, 30, r) + flag(0, -152, 26, '#ffb020')
      + wins(-22, -78, 4, 2, 12, 16, 6, 9) + wins(-50, -60, 1, 2, 0, 18, 6, 9, 8) + wins(38, -60, 1, 2, 0, 18, 6, 9, 10)
      + door(0, 0, 18, 28, '#4a3426') + `<path d="M-9 -16h18" stroke="#2b1d14" stroke-width="1.2"/>` + sign(0, -40, p.e[0], 14);
  },
  library(p) {
    return cyl(-18, 0, 36, 96, STONE) + crenel(-20, -96, 40, STONE2, 4) + cone(0, -96, 20, 38, p.a) + flag(0, -134, 22, p.a2)
      + wins(-9, -86, 2, 4, 12, 18, 6, 10) + door(0, 0, 14, 20, WOOD) + sign(0, -20, '📚', 11);
  },
  spire(p) {
    return box(-22, 0, 44, 70, shade(p.a, 0.75)) + box(-14, -70, 28, 44, shade(p.a, 0.6)) + `<path d="M-8 -114L0 -150L8 -114z" fill="${p.a3}"/>`
      + `<circle class="blink" cx="0" cy="-152" r="2.6" fill="#ff4d4d"/>` + wins(-17, -64, 4, 5, 9, 12, 5, 7) + wins(-9, -108, 3, 3, 7, 12, 4, 7, 20) + door(0, 0, 12, 16, shade(p.a, -0.3)) + sign(0, -18, p.e[0], 11);
  },
  hall(p) {
    let col = ''; for (let i = 0; i < 5; i++) col += `<rect x="${-30 + i * 14}" y="-50" width="6" height="44" fill="#fffaf0"/><rect x="${-31 + i * 14}" y="-52" width="8" height="3" fill="${STONE2}"/>`;
    return box(-36, 0, 72, 8, STONE2) + box(-34, -8, 68, 46, shade(p.a, 0.82)) + col + `<path d="M-40 -54L0 -80L40 -54z" fill="${p.a}"/><path d="M0 -80l40 26l${D} ${-DY}L${D} -85z" fill="${shade(p.a, -0.3)}"/>`
      + sign(0, -63, '🪙', 11) + flag(0, -80, 18, p.a3);
  },
  vault(p) {
    return box(-30, 0, 60, 58, shade(p.a, 0.2)) + crenel(-30, -58, 60, shade(p.a, 0.1), 5) + `<circle cx="0" cy="-28" r="17" fill="${shade(p.a2, 0.1)}" stroke="${shade(p.a2, -0.35)}" stroke-width="3"/>`
      + `<g class="spin-slow" style="transform-origin:0 -28px"><path d="M0 -40v24M-12 -28h24M-8 -36l16 16M8 -36l-16 16" stroke="${shade(p.a2, -0.45)}" stroke-width="2.2"/></g>` + `<circle cx="0" cy="-28" r="4" fill="${shade(p.a2, -0.4)}"/>` + flag(0, -64, 18, p.a3);
  },
  house(p) {
    return box(-28, 0, 56, 44, shade(p.a2, 0.78)) + roofTri(-28, -44, 56, 30, p.a) + `<rect x="12" y="-82" width="9" height="22" fill="${STONE2}"/>` + smoke(16, -88)
      + wins(-20, -34, 2, 1, 30, 0, 10, 10) + door(4, 0, 11, 18, WOOD) + sign(-11, -14, p.e[0], 11);
  },
  cottage(p) {
    return box(-30, 0, 60, 38, '#f3e6cf') + `<path d="M-36 -38L-18 -66H18L36 -38z" fill="${shade(p.a, 0.1)}"/><path d="M18 -66L36 -38l${D} ${-DY}L${18 + D} ${-66 - DY}z" fill="${shade(p.a, -0.25)}"/>`
      + `<rect x="-20" y="-76" width="8" height="16" fill="${STONE2}"/>` + smoke(-16, -82) + wins(-22, -28, 1, 1, 0, 0, 10, 10) + wins(12, -28, 1, 1, 0, 0, 10, 10, 1) + door(0, 0, 12, 20, WOOD) + sign(0, -52, p.e[1] || p.e[0], 11)
      + `<circle cx="-36" cy="-6" r="7" fill="#4caf50"/><circle cx="38" cy="-5" r="6" fill="#43a047"/>`;
  },
  manor(p) {
    return box(-40, 0, 80, 48, shade(p.a, 0.8)) + roofTri(-40, -48, 80, 26, p.a) + box(-12, -48, 24, 18, shade(p.a, 0.7)) + roofTri(-12, -66, 24, 14, shade(p.a, -0.1))
      + wins(-34, -40, 6, 2, 12, 16, 7, 9) + door(0, 0, 12, 16, WOOD) + flag(0, -80, 16, p.a3);
  },
  workshop(p) {
    return box(-32, 0, 64, 40, shade(p.a, 0.75)) + `<path d="M-34 -40l10 -14l10 14l10 -14l10 14l10 -14l10 14z" fill="${p.a}"/>`
      + `<rect x="18" y="-70" width="8" height="22" fill="${STONE2}"/>` + smoke(22, -76) + `<g class="spin" style="transform-origin:-14px -20px"><circle cx="-14" cy="-20" r="9" fill="none" stroke="${p.a3}" stroke-width="4" stroke-dasharray="4 3"/></g>`
      + wins(4, -30, 2, 1, 12, 0, 8, 9) + sign(-14, -20, '🔧', 9);
  },
  barn(p) {
    return box(-32, 0, 64, 42, '#c0392b') + `<path d="M-36 -42L-20 -64H20L36 -42z" fill="#7b241c"/><path d="M20 -64L36 -42l${D} ${-DY}L${20 + D} ${-64 - DY}z" fill="#5b1a14"/>`
      + `<path d="M-12 0v-26h24v26M-12 -26l24 26M12 -26l-24 26" stroke="#fff" stroke-width="2" fill="none"/>` + sign(0, -52, '🐾', 11) + `<text x="40" y="-6" font-size="13" class="hop">${p.e[1] || '🐶'}</text>`;
  },
  market(p) {
    let o = '';
    [[-34, p.a], [-4, p.a2], [26, p.a3]].forEach(([x, c], i) => {
      o += box(x, 0, 26, 22, '#f6ead2');
      let st = ''; for (let k = 0; k < 4; k++) st += `<rect x="${x - 2 + k * 7.5}" y="-34" width="7.5" height="12" fill="${k % 2 ? '#fff' : c}"/>`;
      o += st + `<path d="M${x - 2} -22q3.75 5 7.5 0t7.5 0t7.5 0t7.5 0" fill="${c}"/>` + sign(x + 13, -10, p.e[i] || '🛍️', 10);
    });
    return o + flag(-4, -34, 14, p.a);
  },
  palace(p) {
    return box(-38, 0, 76, 44, '#fff7e8') + dome(0, -44, 22, p.a) + cone(0, -66, 4, 18, p.a3) + `<circle class="twinkle" cx="0" cy="-86" r="3" fill="#fff6c2"/>`
      + box(-46, 0, 14, 60, '#fff1d6') + dome(-39, -60, 8, p.a2) + box(32, 0, 14, 60, '#fff1d6') + dome(39, -60, 8, p.a2)
      + wins(-28, -34, 5, 1, 12, 0, 6, 14) + door(0, 0, 14, 22, p.a3) + sign(0, -54, '💎', 11);
  },
  boutique(p) {
    return box(-26, 0, 52, 62, '#1d1d1f') + `<rect x="-26" y="-62" width="52" height="8" fill="${p.a}"/>` + `<path d="M-30 -36h60l-4 8h-52z" fill="${p.a2}"/>`
      + `<rect x="-20" y="-28" width="16" height="24" fill="${GLASS}" class="win" style="--d:.1s"/><rect x="4" y="-28" width="16" height="24" fill="${GLASS}" class="win" style="--d:.3s"/>`
      + wins(-18, -52, 3, 1, 14, 0, 8, 10) + sign(-12, -16, '👗', 10) + sign(12, -16, '👠', 10);
  },
  dome(p) {
    return box(-30, 0, 60, 36, shade(p.a2, 0.75)) + dome(0, -36, 26, p.a) + `<circle class="twinkle" cx="0" cy="-66" r="3.5" fill="#fff"/>` + wins(-22, -28, 4, 1, 13, 0, 7, 12) + door(0, 0, 12, 18, shade(p.a, -0.3)) + sign(0, -50, '✨', 11);
  },
  greenhouse(p) {
    return `<path d="M-34 0v-30a34 30 0 0 1 68 0v30z" fill="${GLASS}" opacity=".85"/><path d="M-34 -30a34 30 0 0 1 68 0" fill="none" stroke="${p.a}" stroke-width="3"/>`
      + `<path d="M-17 0v-52M0 0v-60M17 0v-52M-34 -30h68" stroke="${p.a}" stroke-width="1.6" fill="none"/>` + `<circle cx="-14" cy="-10" r="8" fill="#5bbf6a"/><circle cx="12" cy="-12" r="9" fill="#4caf50"/>` + sign(0, -32, '🌸', 12);
  },
  bakery(p) {
    return box(-30, 0, 60, 46, '#f7e1c4') + roofTri(-30, -46, 60, 26, p.a) + `<rect x="10" y="-80" width="9" height="20" fill="${STONE2}"/>` + smoke(14, -86)
      + `<path d="M-30 -30h60l-5 7h-50z" fill="${p.a2}"/>` + wins(-22, -20, 2, 1, 32, 0, 12, 12) + sign(0, -14, '🥐', 12) + sign(0, -58, p.e[0], 10);
  },
  fountain(p) {
    return `<ellipse cx="0" cy="-2" rx="36" ry="9" fill="${STONE2}"/><ellipse cx="0" cy="-5" rx="30" ry="6" fill="#7cc8f8"/>` + `<rect x="-4" y="-34" width="8" height="30" fill="${STONE}"/><ellipse cx="0" cy="-34" rx="14" ry="4" fill="${STONE2}"/>`
      + `<g class="spray"><path d="M0 -36q-12 -26 -20 -4M0 -36q12 -26 20 -4M0 -36v-28" stroke="#9fdcff" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>` + sign(-28, -24, p.e[0], 11) + sign(28, -24, p.e[2] || p.e[1], 11);
  },
  inn(p) {
    return box(-34, 0, 68, 40, '#f4dcc0') + box(-30, -40, 60, 24, shade(p.a, 0.7)) + roofTri(-30, -64, 60, 22, p.a) + `<rect x="34" y="-38" width="16" height="12" rx="2" fill="${WOOD}"/>` + sign(42, -32, '🍲', 8)
      + wins(-26, -32, 4, 1, 14, 0, 8, 10) + wins(-22, -58, 3, 1, 16, 0, 8, 8, 4) + door(0, 0, 12, 18, WOOD);
  },
  tavern(p) {
    return box(-30, 0, 60, 48, '#3b2a20') + roofTri(-30, -48, 60, 24, shade(p.a, -0.35)) + `<g class="lantern"><path d="M30 -40h12" stroke="#2b1d14" stroke-width="2"/><rect x="38" y="-38" width="8" height="11" rx="2" fill="${p.a}"/></g>`
      + wins(-22, -38, 3, 2, 16, 16, 9, 10) + door(0, 0, 12, 18, '#1b120c');
  },
  observatory(p) {
    return box(-26, 0, 52, 44, shade(p.a, 0.2)) + dome(0, -44, 24, shade(p.a2, -0.1)) + `<g class="scope" style="transform-origin:0 -56px"><rect x="-2" y="-90" width="6" height="34" rx="2" fill="${p.a3}" transform="rotate(25 0 -56)"/></g>`
      + wins(-18, -34, 3, 2, 14, 14, 7, 8) + sign(0, -12, p.e[0], 11);
  },
  forge(p) {
    return box(-32, 0, 64, 42, '#3a3f4b') + `<path d="M-34 -42h68l-6 -10h-56z" fill="${p.a}"/>` + `<rect x="16" y="-82" width="10" height="34" fill="#2b2f38"/>` + smoke(21, -88)
      + `<rect x="-22" y="-28" width="22" height="16" rx="3" fill="#ff8a1f" class="glow"/>` + wins(8, -32, 2, 1, 12, 0, 8, 10) + sign(-11, -20, '⚡', 10);
  },
  antenna(p) {
    return box(-18, 0, 36, 56, shade(p.a, 0.15)) + `<path d="M0 -56L-14 -120M0 -56L14 -120M-10 -94h20M-6 -110h12" stroke="${shade(p.a, 0.5)}" stroke-width="2.4" fill="none"/>`
      + `<circle class="blink" cx="0" cy="-124" r="3.5" fill="${p.a2}"/><g class="pulse-rings"><circle cx="0" cy="-124" r="8" fill="none" stroke="${p.a2}"/><circle cx="0" cy="-124" r="8" fill="none" stroke="${p.a2}" style="--d:.9s"/></g>`
      + wins(-12, -48, 3, 3, 9, 13, 6, 8) + sign(0, -10, '☁️', 10);
  },
  theatre(p) {
    return box(-36, 0, 72, 52, '#7a1f2b') + `<path d="M-40 -52h80l-8 -16h-64z" fill="${p.a2}"/>` + `<path d="M-28 -6v-34q14 10 28 0q14 10 28 0v34z" fill="#b3122d"/>`
      + `<rect x="-36" y="-50" width="72" height="5" fill="${p.a3}"/>` + `<g class="bulbs">${Array.from({ length: 8 }, (_, i) => `<circle cx="${-31 + i * 9}" cy="-47.5" r="1.6" fill="#fff4b8" style="--d:${i * 0.12}s"/>`).join('')}</g>` + sign(0, -24, '🎭', 13);
  },
  arcade(p) {
    return box(-28, 0, 56, 62, '#151033') + `<rect x="-28" y="-62" width="56" height="12" fill="${p.a}" class="neon"/>` + sign(0, -56, '🕹️ GAME', 7)
      + `<g class="pixels">${Array.from({ length: 12 }, (_, i) => `<rect x="${-22 + (i % 4) * 12}" y="${-44 + Math.floor(i / 4) * 12}" width="8" height="8" fill="${[p.a, p.a2, p.a3][i % 3]}" style="--d:${(i * 0.17).toFixed(2)}s"/>`).join('')}</g>`;
  },
  arena(p) {
    return `<ellipse cx="0" cy="-4" rx="46" ry="12" fill="${shade(STONE2, -0.1)}"/><path d="M-46 -4v-34a46 12 0 0 1 92 0v34a46 12 0 0 1 -92 0z" fill="${STONE}"/>`
      + `<ellipse cx="0" cy="-38" rx="46" ry="12" fill="${shade(STONE, 0.1)}"/><ellipse cx="0" cy="-38" rx="34" ry="8" fill="${p.a}"/>`
      + Array.from({ length: 7 }, (_, i) => `<path d="M${-40 + i * 13} -8v-22a6 6 0 0 1 8 0v22z" fill="${STONE2}"/>`).join('') + flag(-40, -48, 16, p.a2) + flag(40, -48, 16, p.a3) + sign(0, -38, '🏆', 10);
  },
  studio(p) {
    return box(-26, 0, 52, 50, shade(p.a, 0.85)) + `<rect x="-26" y="-50" width="52" height="10" fill="${p.a}"/>` + `<circle class="blink" cx="18" cy="-45" r="3" fill="#ff2d55"/>` + sign(-6, -45, 'LIVE', 6)
      + `<rect x="-6" y="-80" width="3" height="30" fill="#555"/><g class="pulse-rings"><circle cx="-4.5" cy="-82" r="6" fill="none" stroke="${p.a2}"/><circle cx="-4.5" cy="-82" r="6" fill="none" stroke="${p.a2}" style="--d:.9s"/></g>`
      + wins(-18, -32, 3, 1, 14, 0, 8, 10) + sign(0, -12, '🎥', 11);
  },
  garden(p) {
    return `<ellipse cx="0" cy="-3" rx="40" ry="8" fill="#6abf69"/>` + `<rect x="-26" y="-34" width="4" height="30" fill="${WOOD}"/><circle cx="-24" cy="-40" r="14" fill="#43a047" class="sway"/>`
      + `<rect x="20" y="-28" width="4" height="24" fill="${WOOD}"/><circle cx="22" cy="-32" r="11" fill="#66bb6a" class="sway" style="--d:.6s"/>` + sign(0, -12, '🌿', 13) + sign(-6, -26, '🌼', 8) + sign(8, -6, '🌷', 8);
  },
  pagoda(p) {
    let o = '';
    [[0, 50, 22], [-22, 40, 18], [-40, 30, 16], [-56, 20, 12]].forEach(([y, w, h], i) => {
      o += box(-w / 2 + 6, y, w - 12, h, shade(p.a, 0.75)) + `<path d="M${-w / 2 - 8} ${y - h}q${w / 2 + 8} 6 ${w + 16} 0l-8 -6h${-w}z" fill="${i % 2 ? p.a2 : p.a}"/>`;
    });
    return o + cone(0, -78, 3, 14, p.a3) + sign(0, -10, '🧘', 10);
  },
  stadium(p) {
    return `<path d="M-48 0v-26q48 -18 96 0v26z" fill="${STONE}"/><path d="M-40 -4v-18q40 -14 80 0v18z" fill="#57b85b"/><path d="M0 -26v22M-40 -12h80" stroke="#fff" stroke-width="1.2" opacity=".8"/>`
      + `<rect x="-48" y="-56" width="3" height="32" fill="#777"/><rect x="45" y="-56" width="3" height="32" fill="#777"/><rect x="-52" y="-60" width="11" height="6" fill="#fff8c4" class="win"/><rect x="41" y="-60" width="11" height="6" fill="#fff8c4" class="win" style="--d:.3s"/>`
      + flag(0, -26, 18, p.a) + sign(-18, -12, '⚽', 9) + sign(18, -12, '🏏', 9);
  },
  tower(p) {
    return cyl(-14, 0, 28, 100, shade(p.a, 0.7)) + crenel(-16, -100, 32, shade(p.a, 0.55), 4) + `<rect x="-14" y="-62" width="28" height="6" fill="${p.a}"/><rect x="-14" y="-30" width="28" height="6" fill="${p.a2}"/>`
      + flag(0, -106, 20, p.a3) + wins(-5, -92, 1, 3, 0, 28, 8, 10) + sign(0, -78, '🏋️', 10);
  },
  lighthouse(p) {
    let st = ''; for (let i = 0; i < 4; i++) st += `<path d="M${-14 + i * 1.5} ${-i * 24 - 12}h${28 - i * 3}l-1 -12h${-26 + i * 3}z" fill="${p.a}"/>`;
    return `<path d="M-16 0L-8 -96H8L16 0z" fill="#fff"/>` + st + `<rect x="-10" y="-110" width="20" height="14" fill="#ffe680" class="win"/><path d="M-13 -110h26l-13 -12z" fill="${p.a}"/>`
      + `<g class="beam" style="transform-origin:0 -103px"><path d="M0 -103L120 -118V-88z" fill="url(#beam)"/></g>` + `<path d="M-40 0q20 -6 40 0t40 0" stroke="#7cc8f8" stroke-width="3" fill="none" class="wave"/>`;
  },
  balloon(p) {
    return box(-30, 0, 60, 14, WOOD) + `<g class="float"><path d="M-10 -60q-24 -8 -24 -34a24 26 0 0 1 48 0q0 26 -24 34z" fill="${p.a}"/>`
      + `<path d="M0 -60q-10 -12 -10 -34a10 26 0 0 1 20 0q0 22 -10 34z" fill="${p.a2}"/><path d="M-6 -60l-4 22h20l-4 -22" stroke="#6b4a33" stroke-width="1" fill="none"/><rect x="-10" y="-40" width="20" height="10" rx="2" fill="${WOOD}"/></g>` + sign(20, -7, '🧳', 9);
  },
  garage(p) {
    return box(-34, 0, 68, 40, shade(p.a, 0.8)) + `<path d="M-38 -40h76l-6 -12h-64z" fill="${p.a}"/>` + `<rect x="-26" y="-30" width="30" height="30" fill="${shade(p.a, 0.5)}"/>`
      + Array.from({ length: 5 }, (_, i) => `<path d="M-26 ${-26 + i * 6}h30" stroke="${shade(p.a, 0.2)}" stroke-width="1"/>`).join('') + `<text x="22" y="-4" font-size="15" class="drive">🚗</text>` + wins(10, -32, 2, 1, 10, 0, 7, 8);
  },
  windmill(p) {
    return `<path d="M-16 0L-10 -70H10L16 0z" fill="${shade(p.a, 0.75)}"/><path d="M-12 -70h24l-12 -14z" fill="${p.a}"/>` + wins(-4, -54, 1, 2, 0, 18, 8, 10)
      + `<g class="blades" style="transform-origin:0 -72px"><path d="M0 -72L-3 -122h6zM0 -72L50 -75v6zM0 -72L3 -22h-6zM0 -72L-50 -69v-6z" fill="#fff" stroke="${shade(p.a, -0.3)}" stroke-width="1"/></g><circle cx="0" cy="-72" r="4" fill="${p.a3}"/>`;
  },
  clock(p) {
    return box(-16, 0, 32, 110, STONE) + crenel(-16, -110, 32, STONE2, 4) + cone(0, -110, 16, 26, p.a) + `<circle cx="0" cy="-86" r="11" fill="#fff" stroke="${p.a}" stroke-width="2.4"/>`
      + `<g class="hand-m" style="transform-origin:0 -86px"><path d="M0 -86v-9" stroke="#222" stroke-width="1.6"/></g><g class="hand-h" style="transform-origin:0 -86px"><path d="M0 -86h6" stroke="#222" stroke-width="2"/></g>`
      + wins(-5, -60, 1, 3, 0, 16, 10, 10) + door(0, 0, 12, 18, WOOD) + flag(0, -136, 16, p.a2);
  },
};
export const ARCHETYPES = Object.keys(A);

/** svg string for a building */
export function building(type, pal) { const f = A[type] || A.house; try { return f(pal); } catch (e) { return A.house(pal); } }

/** blueprint outline drawn on an empty plot */
export function blueprint(locked) {
  return `<ellipse cx="0" cy="0" rx="30" ry="8" class="bp-base"/><path d="M-24 0v-34h48v34M-24 -34l24 -18l24 18" class="bp-line"/>${locked ? '<text class="bp-ico" x="0" y="-16" text-anchor="middle" dominant-baseline="central" font-size="14">🔒</text>' : '<text class="bp-ico" x="0" y="-16" text-anchor="middle" dominant-baseline="central" font-size="14">✨</text>'}`;
}
/** scaffold + crane on the plot that is being built next */
export function scaffold() {
  return `<ellipse cx="0" cy="0" rx="32" ry="8" class="bp-base"/><path d="M-22 0v-40M22 0v-40M-22 -40h44M-22 -20h44M-22 0l44 -20M-22 -20l44 -20" class="scaf"/>`
    + `<g class="crane"><path d="M30 0v-84M30 -84h-50M30 -84l14 8" class="crane-arm"/><g class="hook"><path d="M-14 -84v22" class="crane-rope"/><rect x="-19" y="-62" width="10" height="7" rx="1" fill="#ffb020"/></g></g>`;
}
/** the campsite shown where the castle will stand before the Basic profile is done */
export function campsite() {
  return `<path d="M-40 0L-20 -34L0 0z" fill="#e07a4f"/><path d="M-20 -34L0 0h-8z" fill="#a8502d"/><path d="M8 0L24 -26L40 0z" fill="#4f8cff"/><path d="M24 -26L40 0h-6z" fill="#2c5fd0"/>`
    + `<g class="fire"><path d="M-6 0q6 -22 12 0z" fill="#ff8a1f"/><path d="M-3 0q3 -12 6 0z" fill="#ffd23f"/></g>` + smoke(0, -18);
}
