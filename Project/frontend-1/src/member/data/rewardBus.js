// One place that says "the member just earned something" (Round 23). source.js announces a reward only
// after the server confirmed the save: the profile credits the backend returns, or a completed survey.
// The shell listens once, reloads the real balance and plays the reward animation everywhere at once.
const EVT = 't2o:reward';

/** { kind: 'profile' | 'survey', slug, title, points } */
export function announceReward(r) {
  if (!r || !(r.points > 0) || typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVT, { detail: { ...r, at: Date.now() } }));
}

export function onReward(fn) {
  if (typeof window === 'undefined') return () => {};
  const h = (e) => fn(e.detail);
  window.addEventListener(EVT, h);
  return () => window.removeEventListener(EVT, h);
}
