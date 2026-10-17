// Tiny synthesized "pop" (Web Audio API) – no audio files to download.
// Browsers only allow sound after a user gesture, so call pop() from click/keyboard handlers.
import { store } from './storage.js';

const KEY = 't2o_chat_sound';
let ctx = null;

export const soundEnabled = () => store.get(KEY, true) !== false;
export const setSoundEnabled = (on) => store.set(KEY, !!on);

export function pop({ pitch = 1, volume = 0.22 } = {}) {
  if (typeof window === 'undefined' || !soundEnabled()) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = ctx || new AC();
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420 * pitch, t);
    osc.frequency.exponentialRampToValueAtTime(980 * pitch, t + 0.07);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  } catch {
    /* audio unavailable – stay silent */
  }
}
