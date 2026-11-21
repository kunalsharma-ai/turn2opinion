// Generates src/styles/dark.gen.css: the automatic half of the site's dark mode.
// usage: npm run gen:dark   (run again whenever a stylesheet changes; the build runs it first)
//
// How it works: every rule in the site's stylesheets is read with PostCSS. Each declaration that paints a
// colour (text, backgrounds, gradients, borders) is re-graded for a dark page and, when the result differs,
// written out again under html[data-mode='dark']:
//   * light surfaces (white, mist, pastel tints) become deep navy / tinted night colours;
//   * dark text (ink, muted greys, dark brand text) becomes light, keeping its hue;
//   * vivid brand colours (royal blue, gold, coral, mint...) and anything already dark are kept;
//   * gradients used as text (background-clip: text) are treated as text, not as a surface.
// Root colour tokens (var(--ink), var(--muted)...) are resolved first, so a token is re-graded by the job
// it does in that rule: var(--ink) as text turns light, var(--ink) as a background stays dark.
// Hand-tuned fixes live in src/styles/dark.css, which is loaded after this file.
import postcss from 'postcss';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/styles');
const SKIP = new Set(['index.css', 'core.css', 'late.css', 'shell.css', 'dark.css', 'dark.gen.css', 't2o-core.css', 't2o-flags.css', 't2o-worlds.css', 'perf.css']);
// Bundle order (core → home → pages → shell → late) so later files still win in dark mode.
const ORDER = ['base', 'components', 'layout', 'nav-menu', 'home', 'about', 'pages', 't2o', 't2o-city', 'widgets', 'reviews', 'rating', 'voices', 'qr', 'video', 'i18n'];
const files = readdirSync(dir)
  .filter((f) => f.endsWith('.css') && !SKIP.has(f))
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.replace('.css', ''));
    const ib = ORDER.indexOf(b.replace('.css', ''));
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

// Objects designed as physical paper (member review postcards and ID cards) keep their printed colours.
const KEEP_LIGHT = /\.(pc-(addr|air|aud|date|foot|grid|kicker|left|mark|place|quote|right|stamp)|pcs-|pcm-|ps-|vc-|gbadge|gb-txt|vcard|voice-card|pcard-best|pcard-kind|pcard-tag|vm-card|vm-cta|sg-note|sn-app|sn-body|sn-ticket|sn-site|vs--magazine|rx\b|rx-|auth-|aa-|as-knob|av-|wp-ring|amb\b|amb-|fab-face|fab-ring|fab-rail|fab-lock|rate-gate|rg-|rvx-|rc-|rp-|mvx|gscore|ba-|bh-|pht-(?!paper)|ec-|ep-|mn-|rt-|ej-|hero-minor|aud-minor|theme-minor|minor-join-note|mjn-|teen-stage|tns-|tj-|teen-status|ts-|teen-pending|age-notice|pgc|abw--teen|vm-teen|tsg-|tsg|tnb|tth|hive-teen|hex\.is-teen|trg-|u13|tky-|gdn|gdq-|gdc|gdx|agr\b|agr-|agp|twl|twq-|tpr|tpq-|cta-(lagoon|aurora|treasury|neon|stars|chat|paper))/;
const HTML_CLASSES = ['js', 'js-ready', 'has-cursor', 'lp-open', 'modal-open', 'vt-lock', 'ask-open', 'nav-open'];

/* ---------------- colour maths ---------------- */
const NAMED = { white: '#ffffff', black: '#000000' };
function parse(c) {
  c = c.trim().toLowerCase();
  if (NAMED[c]) c = NAMED[c];
  let m;
  if ((m = c.match(/^#([0-9a-f]{3,8})$/))) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((x) => x + x).join('');
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
  }
  if ((m = c.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/))) {
    const a = m[4] == null ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { r: +m[1], g: +m[2], b: +m[3], a };
  }
  if ((m = c.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/))) {
    const a = m[4] == null ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { ...hslToRgb(+m[1], +m[2] / 100, +m[3] / 100), a };
  }
  return null;
}
function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return { h, s, l };
}
function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}
const hex2 = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
function fmt({ r, g, b, a }) {
  if (a >= 0.999) return `#${hex2(r)}${hex2(g)}${hex2(b)}`;
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${+a.toFixed(3)})`;
}
const NIGHT_H = 229;

/** A colour used as a surface (background, gradient stop, border). */
function surface(c, { border = false, gradient = false } = {}) {
  const { h, s, l } = rgbToHsl(c);
  if (l <= 0.42) return null; // already dark: keep
  if (s >= 0.45 && l <= 0.72) return null; // vivid brand colour: keep
  if (c.a < (gradient ? 0.999 : 0.6) && !border) return null; // see-through whites (glass, shines, washes): keep
  let nh = h, ns = s, nl;
  if (s < 0.2) {
    nh = NIGHT_H;
    ns = 0.55;
  } else {
    ns = Math.min(0.6, s * 0.65);
  }
  nl = border ? 0.2 + (1 - l) * 0.5 : 0.1 + (1 - l) * 0.4;
  return { ...hslToRgb(nh, ns, nl), a: c.a };
}
/** A colour used for text. */
function ink(c) {
  const { h, s, l } = rgbToHsl(c);
  if (l >= 0.6) return null; // already light
  if (s >= 0.45 && l >= 0.3) {
    // dark brand text (royal blue, plum, teal...) → same hue, lifted
    return { ...hslToRgb(h, Math.min(1, s), Math.max(0.7, 0.55 + l * 0.4)), a: c.a };
  }
  // ink, navy and greys → near-white with a cool tint (headings brightest, muted text a little dimmer)
  return { ...hslToRgb(s < 0.12 ? NIGHT_H : h, Math.min(0.5, Math.max(0.3, s * 0.6)), Math.min(0.96, 0.97 - l * 0.42)), a: Math.max(c.a, 0.65) };
}

/* ---------------- tokens ---------------- */
const tokens = {};
for (const f of files) {
  postcss.parse(readFileSync(join(dir, f), 'utf8')).walkRules((r) => {
    if (r.selector.trim() !== ':root') return;
    if (r.parent.type !== 'root') return;
    r.walkDecls((d) => {
      if (d.prop.startsWith('--') && parse(d.value)) tokens[d.prop] = d.value.trim();
    });
  });
}
const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([^()]*\)|hsla?\([^()]*\)|\b(?:white|black)\b/g;
function resolveVars(v) {
  return v.replace(/var\((--[\w-]+)\s*(?:,[^()]*)?\)/g, (m, name) => tokens[name] || m);
}
function regrade(value, role) {
  if (/url\(/.test(value) && !/gradient/.test(value)) return null;
  const v = resolveVars(value);
  // A gradient is a light surface only if every stop is light: a white highlight inside a vivid or dark
  // gradient (shines, text sweeps, brand bands) is left alone.
  if (role !== 'text' && /gradient/.test(v)) {
    const stops = (v.match(COLOR_RE) || []).map(parse).filter(Boolean);
    if (stops.some((c) => !surface(c, { border: role === 'border', gradient: true }) && c.a > 0.02)) return null;
  }
  let changed = false;
  const out = v.replace(COLOR_RE, (m) => {
    const c = parse(m);
    if (!c) return m;
    const n = role === 'text' ? ink(c) : surface(c, { border: role === 'border', gradient: /gradient/.test(v) });
    if (!n) return m;
    changed = true;
    return fmt(n);
  });
  return changed ? out : null;
}

/* ---------------- roles ---------------- */
const TEXT_PROPS = new Set(['color', '-webkit-text-fill-color', 'caret-color', 'text-decoration-color', '-webkit-text-stroke-color']);
const SURFACE_PROPS = new Set(['background', 'background-color', 'background-image']);
const BORDER_PROPS = /^(border(-top|-right|-bottom|-left|-block|-inline)?(-color)?|outline-color|column-rule(-color)?)$/;

// Classes painted with background-clip:text anywhere: their backgrounds are text.
const clipText = new Set();
for (const f of files) {
  postcss.parse(readFileSync(join(dir, f), 'utf8')).walkDecls((d) => {
    if (/^(-webkit-)?background-clip$/.test(d.prop) && /text/.test(d.value) && d.parent.selector) {
      for (const sel of d.parent.selector.split(',')) {
        const last = sel.trim().split(/[\s>+~]+/).pop();
        (last.match(/\.[\w-]+/g) || []).forEach((c) => clipText.add(c));
      }
    }
  });
}
const clipSel = new Set();
for (const f of files) {
  postcss.parse(readFileSync(join(dir, f), 'utf8')).walkDecls((d) => {
    if (/^(-webkit-)?background-clip$/.test(d.prop) && /text/.test(d.value) && d.parent.selector)
      d.parent.selector.split(',').forEach((x) => clipSel.add(x.trim().replace(/\s+/g, ' ')));
  });
}
const isClipText = (selector) =>
  selector.split(',').every((sel) => clipSel.has(sel.trim().replace(/\s+/g, ' '))) ||
  selector.split(',').every((sel) => {
    const last = sel.trim().split(/[\s>+~]+/).pop();
    return (last.match(/\.[\w-]+/g) || []).some((c) => clipText.has(c));
  });

// The dark prefix adds no specificity (:where), so every generated rule weighs exactly what its source rule
// weighs and simply comes later in the cascade: it replaces that rule's colours and nothing else.
const W = ":where(html[data-mode='dark'])";
function scope(selector) {
  return selector
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      if (/^:root\b/.test(s)) return s.replace(/^:root/, `:root${W.replace('html', '')}`);
      if (/^html\b/.test(s)) return s.replace(/^html/, `html${W.replace('html', '')}`);
      const first = s.match(/^\.([\w-]+)/);
      if (first && HTML_CLASSES.includes(first[1])) return `${W}${s}`;
      return `${W} ${s}`;
    })
    .join(',\n');
}

// Rules (and their :hover/:focus twins) that paint a vivid or kept-light coloured background keep their text
// colour: dark text on a gold button stays dark.
const baseSel = (sel) => sel.replace(/:(hover|focus|focus-visible|focus-within|active|visited)\b/g, '').replace(/\s+/g, ' ').trim();
function vividBg(value) {
  const v = resolveVars(value);
  const cols = (v.match(COLOR_RE) || []).map(parse).filter(Boolean);
  return cols.length > 0 && cols.some((c) => {
    const { s, l } = rgbToHsl(c);
    return c.a >= 0.5 && l > 0.42 && s >= 0.45 && l <= 0.72;
  });
}
const vividSel = new Set();
for (const f of files) {
  postcss.parse(readFileSync(join(dir, f), 'utf8')).walkDecls((d) => {
    if (!/^background(-color|-image)?$/.test(d.prop) || !d.parent.selector) return;
    if (isClipText(d.parent.selector)) return;
    if (vividBg(d.value)) d.parent.selector.split(',').forEach((x) => vividSel.add(baseSel(x)));
  });
}
const onVivid = (selector) => selector.split(',').every((x) => vividSel.has(baseSel(x)));

/* ---------------- generate ---------------- */
const out = postcss.root();
let rules = 0;
for (const f of files) {
  const src = postcss.parse(readFileSync(join(dir, f), 'utf8'), { from: f });
  src.walkRules((r) => {
    if (r.parent.type === 'atrule' && /keyframes$/i.test(r.parent.name)) return;
    if (KEEP_LIGHT.test(r.selector)) return;
    if (r.selector.includes("data-theme='dark'") || r.selector.includes('data-theme="dark"')) return;
    if (/::selection|:root$/.test(r.selector) && r.selector.trim() === ':root') return;
    let clip = isClipText(r.selector);
    r.each((d) => {
      if (d.type === 'decl' && /^(-webkit-)?background-clip$/.test(d.prop) && /text/.test(d.value)) clip = true;
      if (d.type === 'decl' && d.prop === '-webkit-text-fill-color' && /transparent/.test(d.value)) clip = true;
    });
    const keepText = onVivid(r.selector);
    const decls = [];
    r.each((d) => {
      if (d.type !== 'decl' || d.prop.startsWith('--')) return;
      const p = d.prop.toLowerCase();
      let role = null;
      if (TEXT_PROPS.has(p)) role = keepText ? null : 'text';
      else if (SURFACE_PROPS.has(p)) role = clip ? 'text' : 'surface';
      else if (BORDER_PROPS.test(p)) role = 'border';
      if (!role) return;
      const v = regrade(d.value, role);
      if (!v) return;
      let prop = d.prop;
      // Never re-emit the `background` shorthand when it only carries colours/gradients: it would reset
      // background-clip (gradient text), size and position set by other rules.
      if (p === 'background') {
        const outer = v.replace(/\([^()]*(\([^()]*(\([^()]*\))?[^()]*\))*[^()]*\)/g, '()');
        if (/^\s*(#[0-9a-f]{3,8}|rgba?\(\)|hsla?\(\)|white|black)\s*$/i.test(outer)) prop = 'background-color';
        else if (/^[\s,]*((repeating-)?(linear|radial|conic)-gradient\(\)[\s,]*)+$/i.test(outer)) prop = 'background-image';
      }
      decls.push(postcss.decl({ prop, value: v, important: d.important }));
    });
    if (!decls.length) return;
    const nr = postcss.rule({ selector: scope(r.selector) });
    decls.forEach((d) => nr.append(d));
    // Re-create the @media / @supports wrappers.
    let node = nr;
    let p = r.parent;
    while (p && p.type === 'atrule') {
      const at = postcss.atRule({ name: p.name, params: p.params });
      at.append(node);
      node = at;
      p = p.parent;
    }
    out.append(node);
    rules++;
  });
}
const header = `/* GENERATED by scripts/gen-dark.mjs – do not edit by hand. Hand-tuned dark-mode fixes: src/styles/dark.css */\n`;
writeFileSync(join(dir, 'dark.gen.css'), header + out.toString());
console.log(`[gen-dark] ${rules} rules from ${files.length} stylesheets -> src/styles/dark.gen.css`);
