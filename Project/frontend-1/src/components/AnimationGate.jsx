// Site-wide performance guard.
//
// WHY THIS EXISTS
// The home page carries roughly 240 infinite CSS animations. Left alone they all keep ticking on
// every frame, on screen or not — and `content-visibility: auto` does NOT stop them: it skips
// *rendering* the subtree, but the animations keep running and keep costing style recalculation.
// Measured on this site before the guard was fixed: ~60 animations still running on sections the
// visitor had already scroll ed past.
//
// HOW IT WORKS
// An IntersectionObserver watches each section. On the way out, every animation still running
// inside it is paused through the Web Animations API; on the way back in, exactly those
// animations are resumed. Pausing an Animation object touches no selectors and invalidates no
// styles, which is the whole point.
//
// THREE THINGS THIS FILE GETS WRONG IF YOU CHANGE IT CARELESSLY — all three were real bugs here:
//
//  1. Do not pause via a CSS attribute + descendant selector (the pre-v3.1 approach:
//     `[data-still] *, [data-still] *::before`). Every toggle forced a full subtree style
//     recalculation, while scrolling, over hundreds of nodes.
//
//  2. Do not observe an element that CONTAINS another observed element. Resolving a parent with
//     `{ subtree: true }` grabs its children's animations and plays them straight back after a
//     child observer has just paused them. The page wrapper `div.home` holds every section, so
//     observing `main > *` alone silently cancelled the entire mechanism.
//
//  3. Do not cache the animation list. Lists must be queried live at the moment of the
//     transition: inside a `content-visibility` skipped subtree the browser has not instantiated
//     the animations yet, so a list captured there is empty — and caching that empty list
//     disables the guard for that section forever. Fast scrolling also batches an enter and an
//     exit into a single observer callback, so a cache primed only on entry is often never
//     primed at all.
//
// Resuming is deliberately narrow: only animations THIS file paused are played again, tracked by
// a flag on the Animation object. Calling play() indiscriminately would restart finished one-shot
// reveal animations every time a section scrolled back into view.
import { useEffect } from 'react';

const FLAG = '__t2oPaused';

// Candidate scopes; filtered in scan() so none of them contains another (see note 2 above).
const SELECTOR = 'main > *, main section, main .ribbons, .site-footer > .wrap > *';

/** Rough device-capability probe. Conservative: it only ever removes decoration. */
function isLowPower() {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8;
  const conn = navigator.connection || {};
  const slowNet = /(^|-)2g$/.test(conn.effectiveType || '') || conn.saveData === true;
  return cores <= 4 || mem <= 4 || slowNet;
}

export default function AnimationGate() {
  useEffect(() => {
    const root = document.documentElement;
    if (isLowPower()) root.classList.add('low-power');
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const supportsSubtree = (() => {
      try {
        document.body.getAnimations({ subtree: true });
        return true;
      } catch {
        return false;
      }
    })();

    const watched = new WeakSet();
    const observed = new Set(); // enumerable copy, for the hidden-tab pass

    const animsIn = (el) => {
      try {
        return supportsSubtree ? el.getAnimations({ subtree: true }) : el.getAnimations();
      } catch {
        return [];
      }
    };
    const smilIn = (el) => {
      const out = [];
      el.querySelectorAll('svg').forEach((svg) => {
        if (svg.querySelector('animate, animateMotion, animateTransform')) out.push(svg);
      });
      return out;
    };

    const freeze = (el) => {
      for (const a of animsIn(el)) {
        if (a.playState !== 'running') continue;
        try {
          a.pause();
          a[FLAG] = true;
        } catch {
          /* already finished or cancelled */
        }
      }
      for (const svg of smilIn(el)) {
        try {
          svg.pauseAnimations();
        } catch {
          /* nested <svg> or unsupported */
        }
      }
    };

    const thaw = (el) => {
      for (const a of animsIn(el)) {
        if (!a[FLAG] || a.playState !== 'paused') continue;
        try {
          a.play();
          a[FLAG] = false;
        } catch {
          /* ignore */
        }
      }
      for (const svg of smilIn(el)) {
        try {
          svg.unpauseAnimations();
        } catch {
          /* ignore */
        }
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) thaw(e.target);
          else freeze(e.target);
        }
      },
      { rootMargin: '150px 0px' }
    );

    /** Observe only leaf scopes — never an element that wraps another candidate (note 2). */
    const scan = () => {
      const all = [...document.querySelectorAll(SELECTOR)];
      for (const el of all) {
        if (watched.has(el)) continue;
        if (all.some((other) => other !== el && el.contains(other))) continue;
        watched.add(el);
        observed.add(el);
        io.observe(el);
      }
    };

    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300));
    idle(scan);

    // Route changes swap the whole <main>; re-scan then, debounced and off the critical path.
    let t = 0;
    const mo = new MutationObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        observed.clear();
        idle(scan);
      }, 250);
    });
    const main = document.getElementById('main');
    if (main) mo.observe(main, { childList: true });

    // Hidden tab: freeze everything, and let the observer thaw what is on screen when they return.
    const onVis = () => {
      root.toggleAttribute('data-hidden', document.hidden);
      if (document.hidden) observed.forEach(freeze);
      else
        observed.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom > -150 && r.top < window.innerHeight + 150) thaw(el);
        });
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(t);
      document.removeEventListener('visibilitychange', onVis);
      observed.clear();
    };
  }, []);
  return null;
}
