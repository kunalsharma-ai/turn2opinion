// Turn2Opinion sound design — synthesised with the Web Audio API, so there are no audio files to
// download and nothing blocks the first paint.
//
// IMPORTANT — how "a sound when someone opens the website" actually works:
// Every browser blocks audio until the visitor has interacted with the page (Chrome, Safari,
// Firefox and every mobile browser enforce this; it cannot be worked around, and trying to is what
// gets a site muted permanently by the browser). So the arrival chime is *armed* on load and fires
// on the visitor's very first gesture — the first tap, click, key press or scroll. In practice that
// is within a second or two of arriving and it feels like an opening sound. If they never interact,
// no sound plays, which is exactly the behaviour the browser intends.
//
// Everything is rate-limited and respects a persisted mute switch, plus prefers-reduced-motion
// (people who ask for less motion generally want less noise too).
import { store } from './storage.js';

const KEY = 't2o_chat_sound';
const ARRIVAL_KEY = 't2o_arrival_played';
let ctx = null;
let master = null;
let armed = false;
let lastAt = 0;

export const soundEnabled = () => store.get(KEY, true) !== false;
export const setSoundEnabled = (on) => {
  store.set(KEY, !!on);
  if (on) ensure();
};

function ensure() {
  if (typeof window === 'undefined') return null;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
      // A gentle shelf keeps the chimes from sounding harsh on phone speakers.
      const shelf = ctx.createBiquadFilter();
      shelf.type = 'highshelf';
      shelf.frequency.value = 5200;
      shelf.gain.value = -5;
      master.connect(shelf).connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

const quiet = () =>
  !soundEnabled() ||
  (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/** One voice: a sine/triangle partial with its own envelope. */
function voice(t, freq, { dur = 0.5, vol = 0.18, type = 'sine', detune = 0, attack = 0.008 } = {}) {
  const c = ctx;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.detune.setValueAtTime(detune, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** A struck-bell partial stack — the signature timbre of the brand sound. */
function bell(t, freq, { vol = 0.14, dur = 1.6 } = {}) {
  voice(t, freq, { dur, vol, type: 'sine' });
  voice(t, freq * 2.01, { dur: dur * 0.6, vol: vol * 0.4, type: 'sine' });
  voice(t, freq * 3.02, { dur: dur * 0.35, vol: vol * 0.18, type: 'sine' });
}

/** Shared rate limit so a burst of events never turns into noise. */
function gate(minGapMs) {
  const now = Date.now();
  if (now - lastAt < minGapMs) return false;
  lastAt = now;
  return true;
}

/* ============================== The sounds ============================== */

/**
 * ARRIVAL — the site's signature. A rising five-note figure on a D major pentatonic
 * (D4 A4 D5 E5 A5) over a soft pad swell, ending on a shimmer. Roughly 1.6 s.
 * Plays once per browser session.
 */
export function playArrival() {
  if (quiet() || !ensure()) return;
  const t = ctx.currentTime + 0.04;
  const notes = [293.66, 440.0, 587.33, 659.25, 880.0];
  notes.forEach((f, i) => bell(t + i * 0.085, f, { vol: 0.15 - i * 0.012, dur: 1.8 - i * 0.15 }));
  // pad swell underneath
  voice(t, 146.83, { dur: 1.9, vol: 0.07, type: 'triangle' });
  voice(t, 220.0, { dur: 1.9, vol: 0.05, type: 'triangle', detune: 6 });
  // closing shimmer
  bell(t + 0.62, 1174.66, { vol: 0.06, dur: 1.1 });
  lastAt = Date.now();
}

/** NOTIFICATION — a two-note "ping-up" for review toasts and activity tickets. */
export function playNotify({ up = true } = {}) {
  if (quiet() || !ensure() || !gate(900)) return;
  const t = ctx.currentTime + 0.01;
  const a = up ? 659.25 : 587.33;
  const b = up ? 987.77 : 440.0;
  bell(t, a, { vol: 0.11, dur: 0.6 });
  bell(t + 0.09, b, { vol: 0.09, dur: 0.75 });
}

/** TICK — a tiny click as the rating dial crosses a level. Very short, very quiet. */
export function playTick(level = 3) {
  if (quiet() || !ensure() || !gate(70)) return;
  const t = ctx.currentTime + 0.005;
  voice(t, 420 + level * 110, { dur: 0.09, vol: 0.055, type: 'triangle', attack: 0.004 });
}

/** SUCCESS — a warm three-note resolve after a review is posted. */
export function playSuccess() {
  if (quiet() || !ensure()) return;
  const t = ctx.currentTime + 0.02;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => bell(t + i * 0.1, f, { vol: 0.13 - i * 0.015, dur: 1.5 }));
  voice(t, 261.63, { dur: 1.4, vol: 0.06, type: 'triangle' });
  lastAt = Date.now();
}

/** Legacy name kept so existing call sites (live chat) keep working. */
export function pop({ pitch = 1, volume = 0.22 } = {}) {
  if (quiet() || !ensure() || !gate(120)) return;
  const t = ctx.currentTime;
  voice(t, 520 * pitch, { dur: 0.16, vol: Math.min(0.2, volume), type: 'sine' });
  voice(t + 0.03, 880 * pitch, { dur: 0.2, vol: Math.min(0.14, volume * 0.6), type: 'sine' });
}

/* ============================== Arming ============================== */

/**
 * Call once on load. Unlocks audio on the visitor's first gesture and plays the arrival chime
 * (once per session). Returns a cleanup function.
 */
export function armArrivalSound() {
  if (typeof window === 'undefined' || armed) return () => {};
  armed = true;
  let done = false;
  const already = (() => {
    try {
      return sessionStorage.getItem(ARRIVAL_KEY) === '1';
    } catch {
      return false;
    }
  })();

  const fire = () => {
    if (done) return;
    done = true;
    off();
    if (already || quiet()) {
      ensure(); // still unlock the context for later notification sounds
      return;
    }
    try {
      sessionStorage.setItem(ARRIVAL_KEY, '1');
    } catch {
      /* private mode: the chime may replay next navigation, which is harmless */
    }
    // A beat after the gesture so it reads as the site greeting them, not as a click sound.
    setTimeout(playArrival, 220);
  };

  const events = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'];
  const off = () => events.forEach((e) => window.removeEventListener(e, fire));
  events.forEach((e) => window.addEventListener(e, fire, { once: true, passive: true }));
  return off;
}
