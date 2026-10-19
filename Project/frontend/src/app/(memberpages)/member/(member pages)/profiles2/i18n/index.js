/* Language state for the whole app.
   - t(key, vars)   interface text: hand-written bundle → live translation of the English text → English
   - tr(text)       content (questions, options, names): bundle names → pre-translated pack → live translation → English
   - setLang(code)  switches language, direction (RTL), accent colours and <html lang>
   Components call useI18n() so they re-render when a language or a batch of translations arrives. */
import { paletteOf } from './palette.js';
import { useSyncExternalStore } from 'react';
import EN from './en.js';
import { BY, BUNDLED, bcp, accentOf, detectLang } from './languages.js';
import { machineTranslate, canTranslate } from './translate.js';
import { LS } from '../lib/storage.js';

const S = { code: 'en', ui: EN, seed: new Map(), v: 0, how: 'default', mtDown: false };
const subs = new Set();
const mem = new Map();                       // code → Map(english → translation), persisted per language
const pending = new Set(), inflight = new Set(), failed = new Map();
let timer = 0, saveTimer = 0, fails = 0, seq = 0;

function emit() { S.v++; subs.forEach((f) => f()); }
export const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };
const snap = () => S.v;
export function useI18n() { useSyncExternalStore(subscribe, snap, snap); return S; }
export const lang = () => S.code;
export const langMeta = () => BY[S.code] || BY.en;
export const isRTL = () => (BY[S.code] || {}).d === 'rtl';

/* ---------- caches ---------- */
function cacheFor(code) {
  let m = mem.get(code);
  if (!m) {
    m = new Map();
    try { const raw = LS.get('t2o:mt:' + code); if (raw) for (const [k, v] of Object.entries(JSON.parse(raw))) m.set(k, v); } catch (e) { /* corrupt cache */ }
    mem.set(code, m);
  }
  return m;
}
function persist(code) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const m = mem.get(code); if (!m) return;
    let e = [...m.entries()]; if (e.length > 4000) e = e.slice(-4000);
    LS.set('t2o:mt:' + code, JSON.stringify(Object.fromEntries(e)));
  }, 900);
}

/* ---------- live translation queue ---------- */
const TRANSLATABLE = /\p{L}{2,}/u, SKIP = /^(https?:\/\/|www\.|[\w.+-]+@[\w-]+\.)/i;
function schedule() { if (!timer) timer = setTimeout(flush, 45); }
async function flush() {
  timer = 0;
  if (!pending.size || S.code === 'en') { pending.clear(); return; }
  const code = S.code, batch = [...pending].slice(0, 120);
  batch.forEach((k) => { pending.delete(k); inflight.add(k); });
  if (pending.size) schedule();
  try {
    const out = await machineTranslate(batch, code);
    const m = cacheFor(code);
    batch.forEach((k, i) => { if (out[i]) m.set(k, out[i]); else failed.set(k, Date.now() + 60000); });
    fails = 0; S.mtDown = false; persist(code);
  } catch (e) {
    fails++;
    batch.forEach((k) => failed.set(k, Date.now() + 20000 * Math.min(fails, 6)));
    if (fails >= 2) S.mtDown = true;
  }
  batch.forEach((k) => inflight.delete(k));
  if (S.code === code) emit();
}

export function tr(s) {
  if (s == null || S.code === 'en') return s;
  const k = String(s);
  const hit = S.seed.get(k) ?? cacheFor(S.code).get(k);
  if (hit !== undefined) return hit;
  if (!TRANSLATABLE.test(k) || SKIP.test(k) || !canTranslate()) return k;
  if (!inflight.has(k) && !((failed.get(k) || 0) > Date.now())) { pending.add(k); schedule(); }
  return k;
}
/* Translation if we already have it, without queueing a request (used while the visitor is typing). */
export function peekTr(s) {
  if (s == null || S.code === 'en') return s;
  const k = String(s);
  return S.seed.get(k) ?? cacheFor(S.code).get(k) ?? k;
}
export const isPending = (s) => S.code !== 'en' && s != null && (pending.has(String(s)) || inflight.has(String(s)));
export const anyPending = () => S.code !== 'en' && (pending.size > 0 || inflight.size > 0);

/* ---------- interface text ---------- */
const ZEROS = [0x30, 0x660, 0x6f0, 0x7c0, 0x966, 0x9e6, 0xa66, 0xae6, 0xb66, 0xbe6, 0xc66, 0xce6, 0xd66, 0xde6, 0xe50, 0xed0, 0xf20, 0x1040, 0x1090, 0x17e0, 0x1810, 0xabf0, 0xff10];
const asciiDigits = (s) => s.replace(/\p{Nd}/gu, (c) => { const p = c.codePointAt(0), z = ZEROS.find((z0) => p >= z0 && p <= z0 + 9); return z != null ? String(p - z) : c; });
/* Placeholders survive machine translation as unusual numbers, then are put back. */
function trTemplate(en) {
  if (!/\{\w+\}/.test(en)) return tr(en);
  const names = [];
  const prot = en.replace(/\{(\w+)\}/g, (_, n) => { names.push(n); return String(7301 + names.length - 1); });
  const out = tr(prot);
  if (out === prot) return en;
  let r = asciiDigits(out);
  names.forEach((n, i) => { r = r.replace(String(7301 + i), '{' + n + '}'); });
  return names.every((n) => r.includes('{' + n + '}')) ? r : en;
}
const nfCache = new Map();
export function nf(n) {
  const c = bcp(S.code);
  let f = nfCache.get(c);
  if (!f) { try { f = new Intl.NumberFormat(c); } catch (e) { f = new Intl.NumberFormat('en'); } nfCache.set(c, f); }
  return f.format(n);
}
export function t(key, vars) {
  let s = S.ui[key];
  if (s == null) { const en = EN[key] ?? key; s = S.code === 'en' ? en : trTemplate(en); }
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? (typeof vars[k] === 'number' ? nf(vars[k]) : vars[k]) : m));
}

/* Country names in the visitor's language, straight from the browser (no translation request). */
const rnCache = new Map();
export function regionName(cc) {
  if (S.code === 'en' || !/^[A-Z]{2}$/.test(cc || '')) return null;
  const c = bcp(S.code);
  let d = rnCache.get(c);
  if (d === undefined) { try { d = new Intl.DisplayNames([c], { type: 'region', fallback: 'none' }); } catch (e) { d = null; } rnCache.set(c, d); }
  try { const n = d && d.of(cc); return n && n !== cc ? n : null; } catch (e) { return null; }
}

/* ---------- loading bundles ---------- */
const bundleCache = new Map();
async function loadBundle(code) {
  if (bundleCache.has(code)) return bundleCache.get(code);
  let b = null;
  if (typeof window !== 'undefined' && window.T2O_I18N && window.T2O_I18N[code]) { b = window.T2O_I18N[code]; bundleCache.set(code, b); return b; }
  try { b = JSON.parse(LS.get('t2o:ui:' + code) || 'null'); } catch (e) { b = null; }
  const fresh = fetch(`i18n/ui/${code}.json?v=3`).then((r) => (r.ok ? r.json() : null)).then((j) => {
    if (j) { LS.set('t2o:ui:' + code, JSON.stringify(j)); bundleCache.set(code, j); }
    return j;
  }).catch(() => null);
  if (!b) b = await fresh;
  if (b) bundleCache.set(code, b);
  return b;
}
export function preloadLang(code) { if (BUNDLED.has(code) && code !== 'en') loadBundle(code); }
/* Optional pre-translated question bank (scripts/pretranslate.mjs writes public/i18n/content/<code>.json). */
const packs = new Map();
let packList = null;   // i18n/content/index.json lists which languages have a pack, so we never request a missing file
function loadPack(code) {
  if (packs.has(code)) return packs.get(code);
  if (typeof location !== 'undefined' && location.protocol === 'file:') return Promise.resolve(null);
  if (!packList) packList = fetch('i18n/content/index.json').then((r) => (r.ok ? r.json() : [])).catch(() => []);
  const p = packList.then((list) => (Array.isArray(list) && list.includes(code)
    ? fetch(`i18n/content/${code}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null) : null));
  packs.set(code, p);
  return p;
}

function applyDom(code) {
  const l = BY[code] || BY.en, root = document.documentElement, [a, b] = accentOf(l);
  root.lang = bcp(code);
  root.dir = l.d || 'ltr';
  root.style.setProperty('--la', a);
  root.style.setProperty('--la2', b);
  paletteOf(code, [a, b]).forEach((c, i) => root.style.setProperty('--l' + (i + 1), c));   // five-colour language grading
  root.dataset.lang = code;
}

/* Switch language. `wrap` lets the caller run the DOM swap inside a view transition. */
export async function setLang(code, { how = 'user', wrap } = {}) {
  if (!BY[code]) code = 'en';
  const my = ++seq;
  let ui = EN, seed = new Map();
  if (code !== 'en') {
    if (BUNDLED.has(code)) {
      const b = await loadBundle(code);
      if (b) { ui = Object.assign({}, EN, b.ui); seed = new Map(Object.entries(b.c || {})); } else ui = {};
    } else ui = {};
  }
  if (my !== seq) return;
  const apply = () => {
    S.code = code; S.ui = ui; S.seed = seed; S.how = how; S.mtDown = false; fails = 0;
    pending.clear(); failed.clear(); cacheFor(code);
    applyDom(code);
    if (how === 'user') LS.set('ui:lang', code);
    emit();
  };
  if (wrap) wrap(apply); else apply();
  if (code !== 'en') loadPack(code).then((pk) => {
    if (!pk || S.code !== code) return;
    for (const [k, v] of Object.entries(pk)) if (!S.seed.has(k)) S.seed.set(k, v);
    emit();
  });
}

export function initialLang() {
  const saved = LS.get('ui:lang');
  if (saved && BY[saved]) return { code: saved, how: 'saved' };
  return detectLang();
}
