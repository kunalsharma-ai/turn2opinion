// The one route stylesheet, for client-side navigation.
//
// Every page is served with core.css, home.css and shell.css; only the inner pages also get
// pages.css (see the stylesheet notes in scripts/prerender.mjs). So the home page is the one
// page that starts without it, and the first navigation away from the home page has to add it
// before the new page is shown. Its href is written into the page by prerender.mjs as
// <script type="application/json" id="t2o-css">.
//
// The new <link> goes BEFORE the shell stylesheet, never at the end of <head>, so the cascade
// stays core -> home -> pages -> shell exactly as src/styles/index.css documents it.
let MAP = null;

function map() {
  if (MAP) return MAP;
  MAP = {};
  if (typeof document !== 'undefined') {
    const el = document.getElementById('t2o-css');
    if (el) {
      try {
        MAP = JSON.parse(el.textContent) || {};
      } catch {
        MAP = {};
      }
    }
  }
  return MAP;
}

/** Resolves once the stylesheet this path needs is applied (immediately if it already is). */
export function ensureRouteCss(path) {
  if (typeof document === 'undefined' || path === '/') return Promise.resolve();
  const href = map().pages;
  // Dev, the single-file preview and any build without the map ship one combined stylesheet.
  if (!href || document.querySelector('link[data-css="pages"]')) return Promise.resolve();
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.css = 'pages';
    link.onload = resolve;
    link.onerror = resolve; // never block a navigation on a stylesheet
    const shell = document.querySelector('link[data-css="shell"]');
    if (shell && shell.parentNode) shell.parentNode.insertBefore(link, shell);
    else document.head.appendChild(link);
  });
}
