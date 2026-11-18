// Light / dark mode. Stored in localStorage 't2o_mode' and applied as html[data-mode='dark'].
// (html[data-theme] is taken: it is the colour grade for non-English languages.)
//
// Production ships the dark stylesheet as its own bundle. prerender.mjs writes a tiny head script that
// applies a saved dark choice before the first paint; on a first switch this file loads the bundle
// before the page changes, so the switch never shows half-styled content.
import { store } from './storage.js';

const KEY = 't2o_mode';
export const getMode = () => (typeof document !== 'undefined' && document.documentElement.dataset.mode === 'dark' ? 'dark' : 'light');
export const savedMode = () => (store.get(KEY, 'light') === 'dark' ? 'dark' : 'light');

function darkHref() {
  const el = typeof document !== 'undefined' && document.getElementById('t2o-css');
  if (!el) return null;
  try {
    return JSON.parse(el.textContent).dark || null;
  } catch {
    return null;
  }
}
function ensureDarkCss() {
  const href = darkHref();
  if (!href || document.querySelector('link[data-css="dark"]')) return Promise.resolve();
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.css = 'dark';
    link.onload = resolve;
    link.onerror = resolve;
    document.head.appendChild(link);
  });
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function burst(to, x, y) {
  const b = document.createElement('div');
  b.className = `mode-burst to-${to}`;
  b.style.setProperty('--mx', `${x}px`);
  b.style.setProperty('--my', `${y}px`);
  b.setAttribute('aria-hidden', 'true');
  b.innerHTML = Array.from({ length: 16 }, (_, k) => `<i style="--k:${k}"></i>`).join('');
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 1400);
}

/** Switch mode with the reveal animation and sound. `origin` is the element the reveal grows from. */
export async function setMode(next, origin) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  if (next === getMode()) return;
  if (next === 'dark') await ensureDarkCss();
  store.set(KEY, next);
  const r = origin && origin.getBoundingClientRect ? origin.getBoundingClientRect() : null;
  const x = r ? r.left + r.width / 2 : innerWidth / 2;
  const y = r ? r.top + r.height / 2 : innerHeight * 0.9;
  html.style.setProperty('--mx', `${x}px`);
  html.style.setProperty('--my', `${y}px`);
  html.style.setProperty('--mr', `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 40}px`);
  import('./sound.js').then((m) => m.playMode(next)).catch(() => {});
  window.dispatchEvent(new CustomEvent('t2o:mode', { detail: next }));
  const apply = () => {
    if (next === 'dark') html.dataset.mode = 'dark';
    else delete html.dataset.mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#060A22' : '#0E1B4D');
  };
  if (reduced()) return apply();
  burst(next, x, y);
  if (document.startViewTransition) {
    html.classList.add('mode-anim');
    const t = document.startViewTransition(apply);
    t.finished.finally(() => html.classList.remove('mode-anim'));
  } else {
    const v = document.createElement('div');
    v.className = 'mode-veil';
    v.style.setProperty('--veil', next === 'dark' ? '#060a22' : '#ffffff');
    v.style.setProperty('--mx', `${x}px`);
    v.style.setProperty('--my', `${y}px`);
    document.body.appendChild(v);
    setTimeout(apply, 260);
    setTimeout(() => v.remove(), 900);
  }
}
