/* Language colour grading (v5). Every language has its own five-colour palette:
     l1 primary · l2 secondary · l3 contrast accent · l4 warm highlight · l5 deep tone (dark mode base)
   The 24 hand-translated languages have hand-picked palettes inspired by their culture and flags; every other
   language gets a unique palette generated from its flag accent pair (src/i18n/languages.js › a) plus a hue
   twist derived from its code, so no two languages look the same.
   Applied as CSS variables --l1…--l5 on <html>: the page background mesh, header, hero, language rail,
   section headings and buttons on the hub all re-grade. Inside a profile the world palette leads and the
   language palette grades the background glow. */
export const PALETTES = {
  en: ['#1f5eff', '#00b4ff', '#7c3aed', '#ffb020', '#0b1f5c'],
  'zh-CN': ['#de2910', '#f5b400', '#b5179e', '#ff8a00', '#3a0a06'],
  'zh-TW': ['#c8102e', '#0b3c9c', '#00a7a0', '#ffb81c', '#0a1638'],
  es: ['#c60b1e', '#f1bf00', '#ff6b35', '#7b2cbf', '#3b0710'],
  hi: ['#ff7a00', '#138808', '#e0218a', '#ffd23f', '#3a1a00'],
  ar: ['#0b7a4b', '#c9a227', '#1f6feb', '#e76f51', '#05261a'],
  fr: ['#1d4ed8', '#ef4135', '#8b5cf6', '#f5c542', '#0b1a4a'],
  pt: ['#009c3b', '#f5c400', '#00a6d6', '#ff5e5b', '#022b12'],
  bn: ['#006a4e', '#f42a41', '#ffb703', '#2a9d8f', '#03241a'],
  ru: ['#1c3faa', '#d52b1e', '#00b4d8', '#ffbe0b', '#0a1440'],
  ja: ['#bc002d', '#f4a7b9', '#264653', '#e9c46a', '#2a0610'],
  de: ['#dd0000', '#ffce00', '#1d1d1d', '#ff7b00', '#1a0505'],
  ko: ['#003478', '#c60c30', '#00a29a', '#ffd166', '#05122e'],
  id: ['#ce1126', '#ff8c42', '#2ec4b6', '#ffd23f', '#330409'],
  it: ['#009246', '#ce2b37', '#f4a259', '#5e60ce', '#032614'],
  tr: ['#e30a17', '#ff6f59', '#00b4d8', '#ffd166', '#3a0306'],
  vi: ['#da251d', '#ffcd00', '#06d6a0', '#ff7b00', '#3a0807'],
  th: ['#2d2a4a', '#a51931', '#f4b942', '#00a6a6', '#100e1f'],
  ur: ['#01411c', '#38b000', '#c9a227', '#2196f3', '#011a0b'],
  pl: ['#dc143c', '#ff8fab', '#3a86ff', '#ffbe0b', '#33040e'],
  nl: ['#ff6600', '#21468b', '#ae1c28', '#ffd23f', '#2b1400'],
  fa: ['#239f40', '#da0000', '#c9a227', '#0096c7', '#062a10'],
  ta: ['#c8102e', '#ff9933', '#0f9d58', '#7b2cbf', '#300409'],
  sw: ['#006600', '#bb0000', '#ffcc00', '#1e88e5', '#022002'],
};

const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const toHex = (r, g, b) => '#' + [r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
function hsl(h) {
  let [r, g, b] = hex(h).map((x) => x / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let hh = 0, s = 0;
  if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); hh = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; hh *= 60; }
  return [hh, s, l];
}
function fromHsl(h, s, l) {
  h = ((h % 360) + 360) % 360; const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return toHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}
const seed = (code) => { let h = 2166136261; for (const ch of code) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };

export function paletteOf(code, accent) {
  if (PALETTES[code]) return PALETTES[code];
  const [a, b] = accent || ['#1f5eff', '#00b4ff'], r = seed(code);
  const [h1, s1] = hsl(a), [h2] = hsl(b), twist = (r % 90) - 45;
  return [a, b, fromHsl(h1 + 150 + twist, Math.max(0.55, s1), 0.52), fromHsl(h2 + 40 + (r % 30), 0.9, 0.58), fromHsl(h1, Math.min(0.7, s1), 0.1)];
}
