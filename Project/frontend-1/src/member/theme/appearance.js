// Appearance for the member area: theme mode (light, dark, night, auto), colour palette and custom
// accent. Everything is expressed as CSS custom properties on <html>; components only ever read
// tokens (var(--mb-primary) …), never a colour of their own, so one change here re-skins everything.
//
// Saved in this browser (localStorage `t2o_member_appearance`). The backend has no preference store
// for this, so it stays on the device (see BACKEND-DEPENDENCIES.md). Dark and night also set the
// public site's own dark mode key (`t2o_mode`) so the marketing pages match after you log out.
import { store } from '../../utils/storage.js';

const KEY = 't2o_member_appearance';
const SITE_MODE_KEY = 't2o_mode';
export const MODES = ['light', 'dark', 'night', 'system'];

// Brand palettes. `hex` is the primary accent; `alt` the secondary used in gradients.
export const PALETTES = [
  { id: 'turn2', label: 'Turn2 Blue', hex: '#1f5bff', alt: '#49b6ff' },
  { id: 'ocean', label: 'Ocean', hex: '#0b84c6', alt: '#2dd4bf' },
  { id: 'purple', label: 'Purple', hex: '#7b5cff', alt: '#c084fc' },
  { id: 'emerald', label: 'Emerald', hex: '#0e9f78', alt: '#84cc16' },
  { id: 'sunset', label: 'Sunset', hex: '#e8590c', alt: '#f43f5e' },
  { id: 'midnight', label: 'Midnight', hex: '#3546c9', alt: '#d4a72c' }
];
// Each member type starts on its own palette until the member picks one.
export const DEFAULT_PALETTE = { consumer: 'turn2', pro: 'midnight', teen: 'purple' };

export const DEFAULTS = { mode: 'system', palette: 'auto', custom: '#1f5bff', reduceMotion: false };

export function readAppearance() {
  const v = store.get(KEY, null);
  if (!v || typeof v !== 'object') {
    // First visit: follow the public site's dark mode if it was on.
    const site = store.get(SITE_MODE_KEY, null);
    return { ...DEFAULTS, mode: site === 'dark' ? 'dark' : DEFAULTS.mode };
  }
  return {
    mode: MODES.includes(v.mode) ? v.mode : DEFAULTS.mode,
    palette: v.palette === 'auto' || v.palette === 'custom' || PALETTES.some((p) => p.id === v.palette) ? v.palette : 'auto',
    custom: /^#[0-9a-f]{6}$/i.test(v.custom || '') ? v.custom : DEFAULTS.custom,
    reduceMotion: !!v.reduceMotion
  };
}

export function saveAppearance(a) {
  store.set(KEY, a);
  const resolved = resolveMode(a.mode);
  store.set(SITE_MODE_KEY, resolved === 'light' ? 'light' : 'dark');
}

export function resolveMode(mode) {
  if (mode !== 'system') return mode;
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// ---------- colour maths (sRGB / HSL / WCAG contrast) ----------
const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}
const toHex = (rgb) => '#' + rgb.map((c) => Math.round(clamp(c) * 255).toString(16).padStart(2, '0')).join('');
function rgbToHsl([r, g, b]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}
function hslToRgb([h, s, l]) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}
const lum = (rgb) => {
  const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export function contrast(a, b) {
  const [x, y] = [lum(hexToRgb(a)), lum(hexToRgb(b))].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
const shift = (hex, dl = 0, ds = 0, dh = 0) => {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  return toHex(hslToRgb([(h + dh + 360) % 360, clamp(s + ds), clamp(l + dl)]));
};
const alpha = (hex, a) => {
  const [r, g, b] = hexToRgb(hex).map((c) => Math.round(c * 255));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// Surfaces per mode. Night is a warm, dim low-light theme (not just "darker dark").
const SURFACES = {
  light: { bg: '#f4f6fc', bg2: '#eaeef9', surface: '#ffffff', card: '#ffffff', raised: '#ffffff', text: '#121a3d', muted: '#5a6488', faint: '#8a93b3', border: 'rgba(18, 26, 61, 0.10)', borderStrong: 'rgba(18, 26, 61, 0.18)', shadowInk: '18, 26, 61', success: '#0b8a69', warning: '#b76e00', danger: '#d42f4a', info: '#2563eb' },
  dark: { bg: '#0b1020', bg2: '#0f1630', surface: '#121a33', card: '#151e3b', raised: '#1b2547', text: '#e8ecfb', muted: '#a3acd0', faint: '#7a84ab', border: 'rgba(200, 210, 255, 0.10)', borderStrong: 'rgba(200, 210, 255, 0.20)', shadowInk: '0, 0, 0', success: '#34d399', warning: '#fbbf24', danger: '#fb7185', info: '#60a5fa' },
  night: { bg: '#120f0c', bg2: '#17130f', surface: '#1b1612', card: '#1f1914', raised: '#272019', text: '#eadfcf', muted: '#b3a38c', faint: '#857760', border: 'rgba(234, 223, 207, 0.09)', borderStrong: 'rgba(234, 223, 207, 0.18)', shadowInk: '0, 0, 0', success: '#8fcf9a', warning: '#e6b45a', danger: '#e88a7a', info: '#8fb3e6' }
};

/** Returns { vars, adjusted } for a resolved mode and an accent colour. */
export function buildTokens(mode, accentHex, altHex) {
  const s = SURFACES[mode] || SURFACES.light;
  let primary = accentHex;
  let adjusted = false;
  // Keep the accent readable as text/icons on the card surface (WCAG 3:1 for UI, aim 4.5:1).
  const target = 4.5;
  let guard = 0;
  while (contrast(primary, s.card) < target && guard++ < 30) {
    primary = shift(primary, mode === 'light' ? -0.03 : 0.03);
    adjusted = true;
  }
  if (mode === 'night') primary = shift(primary, -0.02, -0.18); // calmer, less saturated at night
  const onPrimary = contrast('#ffffff', primary) >= 4.5 ? '#ffffff' : contrast('#0b1020', primary) >= 4.5 ? '#0b1020' : '#ffffff';
  const secondary = altHex || shift(primary, 0.06, 0, 38);
  const vars = {
    '--mb-primary': primary,
    '--mb-primary-hover': shift(primary, mode === 'light' ? -0.07 : 0.07),
    '--mb-primary-active': shift(primary, mode === 'light' ? -0.12 : 0.11),
    '--mb-primary-soft': alpha(primary, mode === 'light' ? 0.1 : 0.18),
    '--mb-primary-softer': alpha(primary, mode === 'light' ? 0.05 : 0.09),
    '--mb-primary-ring': alpha(primary, 0.45),
    '--mb-on-primary': onPrimary,
    '--mb-secondary': secondary,
    '--mb-secondary-soft': alpha(secondary, mode === 'light' ? 0.12 : 0.18),
    '--mb-grad': `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
    '--mb-glow': alpha(primary, mode === 'light' ? 0.28 : 0.4),
    '--mb-background': s.bg,
    '--mb-background-2': s.bg2,
    '--mb-surface': s.surface,
    '--mb-card': s.card,
    '--mb-raised': s.raised,
    '--mb-text': s.text,
    '--mb-muted': s.muted,
    '--mb-faint': s.faint,
    '--mb-border': s.border,
    '--mb-border-strong': s.borderStrong,
    '--mb-success': s.success,
    '--mb-success-soft': alpha(s.success, 0.14),
    '--mb-warning': s.warning,
    '--mb-warning-soft': alpha(s.warning, 0.16),
    '--mb-danger': s.danger,
    '--mb-danger-soft': alpha(s.danger, 0.14),
    '--mb-info': s.info,
    '--mb-points': mode === 'light' ? '#b86e00' : '#f5b942',
    '--mb-points-soft': mode === 'light' ? 'rgba(255, 176, 32, 0.16)' : 'rgba(245, 185, 66, 0.16)',
    '--mb-shadow-ink': s.shadowInk
  };
  return { vars, adjusted, primary };
}

/** Paint tokens on <html>. `memberType` picks the default palette when the member hasn't chosen. */
export function applyAppearance(a, memberType = 'consumer') {
  if (typeof document === 'undefined') return { adjusted: false };
  const mode = resolveMode(a.mode);
  const pid = a.palette === 'auto' ? DEFAULT_PALETTE[memberType] || 'turn2' : a.palette;
  const pal = PALETTES.find((p) => p.id === pid);
  const hex = pid === 'custom' ? a.custom : pal ? pal.hex : PALETTES[0].hex;
  const alt = pid === 'custom' ? null : pal?.alt;
  const { vars, adjusted } = buildTokens(mode, hex, alt);
  const root = document.documentElement;
  root.dataset.mbMode = mode;
  root.dataset.mbType = memberType;
  root.dataset.mbMotion = a.reduceMotion ? 'reduce' : 'full';
  // The public site's dark CSS keys off data-mode; keep shared widgets (chat, cookie bar) in step.
  root.dataset.mode = mode === 'light' ? 'light' : 'dark';
  root.style.colorScheme = mode === 'light' ? 'light' : 'dark';
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', vars['--mb-background']);
  return { adjusted, mode, palette: pid };
}
