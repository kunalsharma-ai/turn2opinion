import { StrictMode, startTransition } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { preloadPath } from './app/routeCache.js';
import { normalizePath, isHashMode } from './router/Router.jsx';
import { captureReferral } from './utils/referral.js';

// Dev and the single-file preview use one combined stylesheet. The production build ships the
// same rules as four separate bundles, linked by scripts/prerender.mjs — see src/styles/index.css.
if (import.meta.env.DEV) import('./styles/index.css');

// Referral links (/?ref=<id>&signup): remember the referrer and open the sign-up page.
if (captureReferral()) location.replace('/join/' + location.search);

const container = document.getElementById('root');
const path = isHashMode() ? normalizePath(location.hash.replace(/^#/, '') || '/') : normalizePath(location.pathname);

/** Runs after the browser has actually painted a frame (two frames, to be sure), or straight
 *  away if there is nothing painted yet to protect. */
function afterFirstPaint(fn) {
  if (typeof requestAnimationFrame !== 'function') return fn();
  return requestAnimationFrame(() => requestAnimationFrame(() => fn()));
}

// Load the current page module first so hydration matches the prerendered HTML exactly.
preloadPath(path).finally(() => {
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  const prerendered = container.firstElementChild && !isHashMode();
  const start = () => {
    // Hydrating inside a transition lets React work in short slices and yield to the browser
    // between them, so taps and scrolls are never stuck behind one long hydration task.
    if (prerendered) startTransition(() => hydrateRoot(container, app));
    else createRoot(container).render(app);
    document.documentElement.classList.add('js-ready');
  };
  // Every route is prerendered, so the page the visitor is looking at is already complete and
  // readable. Hydration is a few hundred milliseconds of uninterruptible main-thread work, so it
  // waits for the browser to put that first frame on screen instead of racing it: the text,
  // layout and images appear at the same moment either way, and the Largest Contentful Paint no
  // longer sits behind React. Without prerendered markup there is nothing to show yet, so that
  // render starts immediately.
  if (prerendered) afterFirstPaint(start);
  else start();
});
