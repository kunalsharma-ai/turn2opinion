// The site-wide sound switch, kept tiny so the header button can use it without loading the synthesiser.
// Every sound on the site (arrival chime, notifications, chat, survey machine, theme switch) checks this.
// Changes are broadcast as a `t2o:sound` window event so every switch on the page stays in sync.
import { store } from './storage.js';

const KEY = 't2o_chat_sound';

export const soundEnabled = () => store.get(KEY, true) !== false;

export function setSoundPref(on) {
  store.set(KEY, !!on);
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('t2o:sound', { detail: !!on }));
}

/** Subscribe to changes; returns an unsubscribe function. */
export function onSoundChange(fn) {
  if (typeof window === 'undefined') return () => {};
  const h = (e) => fn(!!e.detail);
  window.addEventListener('t2o:sound', h);
  return () => window.removeEventListener('t2o:sound', h);
}
