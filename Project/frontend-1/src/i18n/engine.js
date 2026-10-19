// Page translation engine.
//
// The site is written and prerendered in English (the source language, best for SEO). When a visitor picks
// another language, this engine walks the rendered page and swaps every visible text — headings, paragraphs,
// buttons, menus, form labels, placeholders, alt/aria/title texts, live-chat replies, pop-ups — for its
// translation, and keeps doing so as React renders new content (route changes, tabs, chat messages).
//
// Where translations come from, in order:
//   1. Bundled dictionaries — src/i18n/dict/<code>.js (hand-written: menus, buttons, hero, footer, cookie bar…)
//      plus src/i18n/generated/<code>.json (whole-site files created by `npm run i18n:generate`).
//      Instant, offline, work everywhere — including mainland China.
//   2. Your translation endpoint — VITE_TRANSLATE_URL (POST, see README → "Multilanguage"). The backend holds
//      the API key (Azure Translator / DeepL / Google Cloud / Alibaba Cloud MT…). Results are cached locally.
//   3. The browser's built-in on-device translator (Chrome 138+ desktop: window.Translator), when available.
//   Text with no translation from any source simply stays in English.
//
// Safety with React: the engine only changes the *value* of existing text nodes and attributes. It never
// adds, removes or wraps DOM nodes (which is what breaks React when Google Translate runs on a page), so
// hydration, routing and state keep working. Elements marked translate="no" or .notranslate are skipped.
import { BY_CODE, DEFAULT_LANG } from './languages.js';
import { providersFor } from './providers.js';

const SKIP = 'script,style,noscript,code,pre,textarea,svg,[translate="no"],.notranslate,[contenteditable="true"]';
const INLINE = new Set(['SPAN', 'B', 'STRONG', 'EM', 'I', 'SMALL', 'MARK', 'BR', 'SUP', 'SUB', 'ABBR', 'U', 'S', 'Q', 'CITE', 'TIME', 'DATA', 'svg', 'IMG', 'WBR']);
const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
const LETTER = /\p{L}/u;
const KEEP = new Set(['Turn2Opinion', 'TURN2OPINION', 'Turn2Opinion.com', 'turn2opinion.com', 'Frequent Research', 'PayPal', 'UPI', 'WhatsApp', 'ESOMAR', 'MSME', 'GDPR', 'Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Amazon']);
const norm = (s) => s.replace(/\s+/g, ' ').trim();

let lang = DEFAULT_LANG;
let dict = null; // Map key → translation for the active language
let observer = null;
let busy = false;
let queued = new Set();
let flushTimer = 0;
const nodeOrig = new WeakMap(); // Text node → English source text
const nodeSet = new WeakMap(); // Text node → value we wrote
const attrOrig = new WeakMap(); // Element → { attr: English }
const touched = new Set(); // nodes/elements we changed (so English can be restored)
const pending = new Map(); // key → Set(unit) waiting for a provider
let providerQueue = new Set();
let providerTimer = 0;
let providers = [];
let listeners = new Set();
let stats = { total: 0, done: 0, waiting: 0, provider: '' };

/* ---------------- caching of machine translations ---------------- */
const cacheKey = (code) => `t2o.tx.${code}`;
const memCache = new Map(); // code → Map
function cacheFor(code) {
  if (!memCache.has(code)) {
    let m = new Map();
    try {
      const raw = localStorage.getItem(cacheKey(code));
      if (raw) m = new Map(JSON.parse(raw));
    } catch {
      /* private mode / blocked storage */
    }
    memCache.set(code, m);
  }
  return memCache.get(code);
}
let saveTimer = 0;
function saveCache(code) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      const entries = [...cacheFor(code)].slice(-3000);
      localStorage.setItem(cacheKey(code), JSON.stringify(entries));
    } catch {
      /* quota exceeded: keep in memory only */
    }
  }, 800);
}

/* ---------------- dictionaries (lazy, one chunk per language) ---------------- */
const HAND = import.meta.glob('./dict/*.js');
const GENERATED = import.meta.glob('./generated/*.json');
let KEYS = null;

async function loadDict(code) {
  const map = new Map();
  if (!KEYS) KEYS = (await import('./dict/keys.js')).KEYS;
  const gen = GENERATED[`./generated/${code}.json`];
  if (gen) {
    const data = (await gen()).default || {};
    for (const [k, v] of Object.entries(data)) if (v) map.set(norm(k), v);
  }
  const hand = HAND[`./dict/${code}.js`];
  if (hand) {
    const list = (await hand()).default || [];
    KEYS.forEach((k, i) => list[i] && map.set(norm(k), list[i]));
  }
  return map;
}

/* Country names come from the browser's own CLDR data (Intl.DisplayNames) — every country, every language,
   no dictionary needed. Also matches "India flag"-style alt texts and UPPERCASE board labels. */
let COUNTRY = null;
const regionNames = new Map();
function countryName(key) {
  if (typeof Intl === 'undefined' || !Intl.DisplayNames) return undefined;
  if (!COUNTRY) {
    COUNTRY = new Map();
    try {
      const en = new Intl.DisplayNames(['en'], { type: 'region' });
      for (let a = 65; a <= 90; a++)
        for (let b = 65; b <= 90; b++) {
          const code = String.fromCharCode(a, b);
          const name = en.of(code);
          if (name && name !== code) COUNTRY.set(name.toLowerCase(), code);
        }
    } catch {
      /* old browser */
    }
    // Common names that differ from the browser's English CLDR names (kept small so the full country list isn't
    // pulled into the main bundle).
    const ALIASES = { 'czech republic': 'CZ', türkiye: 'TR', turkey: 'TR', 'south korea': 'KR', 'north korea': 'KP', vietnam: 'VN', russia: 'RU', iran: 'IR', syria: 'SY', laos: 'LA', taiwan: 'TW', 'hong kong': 'HK', macau: 'MO', 'ivory coast': 'CI', "côte d'ivoire": 'CI', uae: 'AE', usa: 'US', uk: 'GB', 'united states of america': 'US', palestine: 'PS', 'cape verde': 'CV', eswatini: 'SZ', swaziland: 'SZ', burma: 'MM', myanmar: 'MM', 'democratic republic of the congo': 'CD', 'republic of the congo': 'CG' };
    for (const [n, c] of Object.entries(ALIASES)) COUNTRY.set(n, c);
  }
  const flag = / flag$/i.test(key);
  const code = COUNTRY.get((flag ? key.slice(0, -5) : key).toLowerCase());
  if (!code) return undefined;
  let dn = regionNames.get(lang);
  if (!dn) {
    try {
      dn = new Intl.DisplayNames([lang], { type: 'region' });
    } catch {
      return undefined;
    }
    regionNames.set(lang, dn);
  }
  let name = dn.of(code);
  if (!name || name === code) return undefined;
  if (key === key.toUpperCase() && name.toUpperCase() !== name) name = name.toUpperCase();
  return name; // flag alt texts read just the country name
}

/* Dates such as "14 Jul 2026" are formatted for the visitor's locale (Intl.DateTimeFormat). */
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11 };
const dateFmt = new Map();
function localDate(key) {
  const m = key.match(/^(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept?|Oct|Nov|Dec)[a-z]* (\d{4})$/i);
  if (!m || typeof Intl === 'undefined') return undefined;
  let f = dateFmt.get(lang);
  if (!f) {
    try {
      f = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return undefined;
    }
    dateFmt.set(lang, f);
  }
  return f.format(new Date(Number(m[3]), MONTHS[m[2].toLowerCase()], Number(m[1])));
}

/* Number templates: "12 conditions" is looked up as "{0} conditions", so one translation covers every count.
   Numbers are re-inserted in the visitor's numbering style where it differs (e.g. Arabic-Indic digits stay as
   the site shows them, only grouping is kept). */
const NUM = /\d[\d,]*(?:\.\d+)?/g;
function templated(key) {
  const nums = key.match(NUM);
  if (!nums) return undefined;
  const tpl = key.replace(NUM, () => '{#}');
  let i = 0;
  const t = tpl.replace(/\{#\}/g, () => `{${i++}}`);
  const hit = dict?.get(t) ?? cacheFor(lang).get(t);
  return hit === undefined ? undefined : hit.replace(/\{(\d+)\}/g, (_, k) => nums[Number(k)] ?? '');
}

const VERBATIM = /^(?:[\w.+-]+@[\w-]+(?:\.[\w-]+)+|@[\w.]+|https?:\/\/\S+|www\.\S+)$/; // emails, handles, URLs

function lookup(key) {
  if (KEEP.has(key) || VERBATIM.test(key)) return key;
  return dict?.get(key) ?? cacheFor(lang).get(key) ?? templated(key) ?? localDate(key) ?? countryName(key);
}


/* ---------------- units: what gets translated as one sentence ---------------- */
function skipped(el) {
  return !el || el.closest(SKIP);
}

/** The text nodes of an element that holds one sentence split by inline tags (<b>, <span>…).
 *  Only elements rendered inline count — a <b> title and a <small> subtitle shown on separate lines are
 *  two texts, but "Get rewarded <span class=grad>your way</span>" is one sentence. */
const inlineCache = new WeakMap();
function rendersInline(el) {
  if (!inlineCache.has(el)) inlineCache.set(el, getComputedStyle(el).display.startsWith('inline'));
  return inlineCache.get(el);
}
function blockOf(text) {
  let el = text.parentElement;
  while (el && INLINE.has(el.tagName) && el.parentElement && !el.matches('.btn-label') && rendersInline(el)) el = el.parentElement;
  if (!el || el === document.body) return null;
  const kids = el.getElementsByTagName('*');
  if (kids.length > 40) return null;
  for (const k of kids) {
    if (k.namespaceURI === 'http://www.w3.org/2000/svg') continue;
    if (!INLINE.has(k.tagName) || !rendersInline(k)) return null;
    if (k.getAttribute('translate') === 'no' || k.classList.contains('notranslate')) return null;
  }
  const texts = [];
  let solid = 0;
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    if (n.parentElement.closest('svg')) continue;
    texts.push(n);
    if (hasText(n)) solid++;
  }
  return solid > 1 ? { el, texts } : null;
}

function origOf(node) {
  const cur = node.nodeValue;
  // First visit, or React replaced the text we wrote with new English content.
  if (!nodeOrig.has(node) || nodeSet.get(node) !== cur) nodeOrig.set(node, cur);
  return nodeOrig.get(node);
}

const hasText = (n) => !!(n.nodeValue.trim() || (nodeSet.get(n) === n.nodeValue && (nodeOrig.get(n) || '').trim()));

function write(node, value) {
  if (node.nodeValue !== value) node.nodeValue = value;
  nodeSet.set(node, value);
  touched.add(node);
}

function applyUnit(unit) {
  if (unit.texts) {
    const origs = unit.texts.map(origOf);
    const key = norm(origs.join(''));
    if (!key || !LETTER.test(key)) return;
    if (lang === DEFAULT_LANG) return unit.texts.forEach((t, i) => write(t, origs[i]));
    const tr = lookup(key);
    if (tr === undefined) return want(key, unit);
    const lead = unit.texts.findIndex((t, i) => origs[i].trim());
    unit.texts.forEach((t, i) => write(t, i === lead ? (/^\s/.test(origs.join('')) ? ' ' : '') + tr + (/\s$/.test(origs.join('')) ? ' ' : '') : ''));
    return;
  }
  const node = unit.node;
  const orig = origOf(node);
  const key = norm(orig);
  if (!key || !LETTER.test(key)) return;
  if (lang === DEFAULT_LANG) return write(node, orig);
  const tr = lookup(key);
  if (tr === undefined) return want(key, unit);
  write(node, orig.replace(/\S[\s\S]*\S|\S/, tr));
}

function applyAttrs(el) {
  for (const a of ATTRS) {
    if (!el.hasAttribute(a)) continue;
    let o = attrOrig.get(el);
    if (!o) attrOrig.set(el, (o = {}));
    const cur = el.getAttribute(a);
    if (!(a in o) || (o[`_${a}`] !== cur)) o[a] = cur;
    const key = norm(o[a]);
    if (!key || !LETTER.test(key)) continue;
    let val = o[a];
    if (lang !== DEFAULT_LANG) {
      const tr = lookup(key);
      if (tr === undefined) {
        want(key, { attr: a, el });
        continue;
      }
      val = tr;
    }
    o[`_${a}`] = val;
    if (cur !== val) el.setAttribute(a, val);
    touched.add(el);
  }
}

function want(key, unit) {
  if (!pending.has(key)) pending.set(key, new Set());
  pending.get(key).add(unit);
  if (providers.length) {
    providerQueue.add(key);
    clearTimeout(providerTimer);
    providerTimer = setTimeout(runProviders, 120);
  }
}

/* ---------------- walking the page ---------------- */
function translateTree(root) {
  if (!root || skipped(root.nodeType === 1 ? root : root.parentElement)) return;
  const seenBlocks = new Set();
  const visit = (node) => {
    const parent = node.parentElement;
    if (!parent || skipped(parent)) return;
    if (!hasText(node)) return;
    const block = blockOf(node);
    if (block) {
      if (seenBlocks.has(block.el)) return;
      seenBlocks.add(block.el);
      applyUnit(block);
    } else applyUnit({ node });
  };
  if (root.nodeType === 3) visit(root);
  else {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) visit(n);
    const els = root.querySelectorAll ? root.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(',')) : [];
    if (root.nodeType === 1 && ATTRS.some((a) => root.hasAttribute(a)) && !skipped(root)) applyAttrs(root);
    for (const el of els) if (!skipped(el)) applyAttrs(el);
  }
}

function run(fn) {
  busy = true;
  try {
    fn();
  } finally {
    observer?.takeRecords();
    busy = false;
  }
}

function flush() {
  flushTimer = 0;
  const roots = [...queued];
  queued = new Set();
  run(() => roots.forEach((r) => r.isConnected && translateTree(r)));
  report();
}

function schedule(node) {
  queued.add(node);
  if (!flushTimer) flushTimer = setTimeout(flush, 40);
}

function onMutations(list) {
  if (busy) return;
  for (const m of list) {
    if (m.type === 'characterData') schedule(m.target);
    else if (m.type === 'attributes') schedule(m.target);
    else m.addedNodes.forEach((n) => (n.nodeType === 1 || n.nodeType === 3) && schedule(n));
  }
}

/* ---------------- machine translation providers ---------------- */
async function runProviders() {
  const keys = [...providerQueue];
  providerQueue = new Set();
  if (!keys.length || !providers.length) return;
  const code = lang;
  stats.waiting = keys.length;
  report();
  let left = keys;
  for (const p of providers) {
    if (!left.length) break;
    stats.provider = p.name;
    report();
    let results = [];
    try {
      results = await p.translate(left, (done) => {
        stats.waiting = Math.max(0, left.length - done);
        report();
      });
    } catch {
      results = [];
    }
    if (code !== lang) return; // language changed meanwhile
    const missed = [];
    left.forEach((k, i) => {
      const tr = results[i];
      if (tr && typeof tr === 'string') {
        cacheFor(code).set(k, tr);
        const units = pending.get(k);
        pending.delete(k);
        if (units) run(() => units.forEach((u) => (u.attr ? u.el.isConnected && applyAttrs(u.el) : (u.node || u.el)?.isConnected !== false && applyUnit(u))));
      } else missed.push(k);
    });
    left = missed;
  }
  saveCache(code);
  stats.waiting = 0;
  stats.provider = '';
  report();
}

/* ---------------- status reporting ---------------- */
function report() {
  const needsClick = providers.some((p) => p.name === 'device-needs-click');
  const usable = providers.some((p) => p.name !== 'device-needs-click');
  for (const fn of listeners) fn({ lang, waiting: stats.waiting, provider: stats.provider, pending: pending.size, hasProvider: usable, needsClick });
}
export function onStatus(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ---------------- public API ---------------- */
function restoreEnglish() {
  run(() => {
    for (const n of touched) {
      if (!n.isConnected) {
        touched.delete(n);
        continue;
      }
      if (n.nodeType === 3) {
        const o = nodeOrig.get(n);
        if (o !== undefined && nodeSet.get(n) === n.nodeValue) write(n, o);
      } else {
        const o = attrOrig.get(n);
        if (o) for (const a of ATTRS) if (a in o && n.getAttribute(a) === o[`_${a}`]) { n.setAttribute(a, o[a]); o[`_${a}`] = o[a]; }
      }
    }
  });
}

/**
 * Switch the page language. Returns when the bundled dictionary has been applied
 * (machine translation of the remaining text continues in the background).
 * @param {string} code  language code from languages.js
 * @param {{interactive?: boolean}} opts  interactive = called from a click (allows on-device model download)
 */
export async function setPageLanguage(code, { interactive = false } = {}) {
  const meta = BY_CODE[code] || BY_CODE[DEFAULT_LANG];
  lang = meta.code;
  pending.clear();
  providerQueue.clear();
  const html = document.documentElement;
  html.lang = meta.code;
  html.dir = meta.dir || 'ltr';
  html.dataset.lang = meta.code;

  if (lang === DEFAULT_LANG) {
    dict = null;
    providers = [];
    restoreEnglish();
    observer?.disconnect(); // English is the source: no watching, zero overhead
    observer = null;
    report();
    return;
  }
  dict = await loadDict(lang).catch((e) => { console.warn('[i18n] dictionary failed', e); return new Map(); });
  if (lang !== meta.code) return;
  // Dictionary first: menus, buttons and key sections switch instantly…
  providers = [];
  start();
  run(() => translateTree(document.body));
  report();
  if (typeof window !== 'undefined' && window.__T2O_I18N_DEBUG) console.log('[i18n]', lang, dict.size);
  // …then machine translation for the rest (never blocks the page; gives up after 4 s).
  const found = await Promise.race([providersFor(meta, { interactive }).catch(() => []), new Promise((r) => setTimeout(() => r([]), 4000))]);
  if (lang !== meta.code) return;
  providers = found;
  for (const k of pending.keys()) providerQueue.add(k);
  if (providerQueue.size) runProviders();
  report();
}

function start() {
  if (observer || typeof MutationObserver === 'undefined') return;
  observer = new MutationObserver(onMutations);
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
}

/** Retry machine translation after a user gesture (e.g. the on-device model needs a click to download). */
export async function retryWithGesture() {
  const meta = BY_CODE[lang];
  if (!meta || lang === DEFAULT_LANG) return;
  providers = await providersFor(meta, { interactive: true }).catch(() => []);
  for (const k of pending.keys()) providerQueue.add(k);
  runProviders();
}

/** Translate a short string for React-rendered UI (uses the same dictionaries/cache, never providers). */
export function tr(text) {
  if (lang === DEFAULT_LANG) return text;
  return lookup(norm(text)) ?? text;
}

export const currentLanguage = () => lang;

/** A country's name in the active language (browser CLDR data), e.g. countryLabel('id', 'Indonesia'). */
export function countryLabel(code, fallback = '') {
  if (lang === DEFAULT_LANG || typeof Intl === 'undefined' || !Intl.DisplayNames) return fallback;
  try {
    return new Intl.DisplayNames([lang], { type: 'region' }).of(String(code).toUpperCase()) || fallback;
  } catch {
    return fallback;
  }
}

// Tooling hook (used by scripts that harvest untranslated strings in a headless browser). Harmless in production.
if (typeof window !== 'undefined') window.__t2oI18nPending = () => [...pending.keys()];
