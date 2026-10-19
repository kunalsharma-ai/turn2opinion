/* Safe localStorage wrapper + profile persistence.
   Storage keys are unchanged from the original page so existing saved answers keep working:
   t2oa:<category>:<profile>  completed answers  {a, r}
   t2od:<category>:<profile>  in-progress draft  {a, r, i, p, t}   (new: autosave)
   ui:mode / ui:sound / ui:cat  viewer preferences */
export const LS = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { /* storage blocked */ } },
};

export const profileKey = (p) => p.c + ':' + p.s;
const memDone = {};   // in-memory fallback when storage is blocked
const memDraft = {};
const parse = (v) => { try { return v ? JSON.parse(v) : null; } catch (e) { return null; } };
const clone = (x) => JSON.parse(JSON.stringify(x));

export function loadDone(p) {
  const k = profileKey(p);
  return memDone[k] || parse(LS.get('t2oa:' + k));
}
export function saveDone(p, ans, raw) {
  const k = profileKey(p), o = { a: clone(ans), r: clone(raw) };
  memDone[k] = o;
  LS.set('t2oa:' + k, JSON.stringify(o));
}
export function loadDraft(p) {
  const k = profileKey(p);
  return memDraft[k] !== undefined ? memDraft[k] : parse(LS.get('t2od:' + k));
}
export function saveDraft(p, o) {
  const k = profileKey(p), v = clone(o);
  memDraft[k] = v;
  LS.set('t2od:' + k, JSON.stringify(v));
}
export function clearDraft(p) {
  const k = profileKey(p);
  memDraft[k] = null;
  LS.del('t2od:' + k);
}
export function statusOf(p) {
  if (loadDone(p)) return { st: 'done', pct: 100 };
  const d = loadDraft(p);
  if (d && d.a && Object.keys(d.a).length) return { st: 'prog', pct: Math.max(1, Math.min(99, d.p || 0)), t: d.t };
  return { st: 'new', pct: 0 };
}
