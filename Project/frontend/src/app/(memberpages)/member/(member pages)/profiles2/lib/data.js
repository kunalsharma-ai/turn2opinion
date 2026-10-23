/* Loads the question bank on demand, in small pieces:
     data/core.json            questions + every option list except cities and job titles (~140 KB gzipped)
     data/city/<CC>.json       cities for one country, fetched when a state in that country is picked
     data/jobrole/<n>.json     job titles for one department
   Sources, in order: window.T2O_DATA (the single-file preview embeds everything, gzip+base64),
   then T2O_CONFIG.dataUrl (a folder or API serving the same files), then ./data/ next to the app. */
import IDX from '../data/profiles-index.json';
import { CFG } from './config.js';
const filled = (a) => a != null && a !== '' && !(Array.isArray(a) && !a.length);

export const PROFILES = IDX;
const BASE = (CFG.dataUrl || '/profiles/data').replace(/\/$/, '') + '/';

let embedded = null;
async function fromEmbedded() {
  if (embedded) return embedded;
  const s = atob(window.T2O_DATA), b = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
  const stream = new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'));
  embedded = await new Response(stream).json();
  window.T2O_DATA = null;
  return embedded;
}
const hasEmbedded = () => typeof window !== 'undefined' && (window.T2O_DATA || embedded);

async function getJSON(path) {
  const r = await fetch(BASE + path, { credentials: CFG.credentials });
  if (!r.ok) throw new Error(path + ' returned ' + r.status);
  return r.json();
}

let corePromise = null;
export function loadData() {
  if (corePromise) return corePromise;
  corePromise = (async () => {
    let j;
    if (hasEmbedded()) { const e = await fromEmbedded(); j = { Q: e.Q, A: e.A, L: e.L, O: Object.assign({}, e.O, { city: {}, jobrole: {} }), lazy: e.lazy }; }
    else j = await getJSON('core.json');
    j.O.city = j.O.city || {}; j.O.jobrole = j.O.jobrole || {};
    for (const [k, v] of Object.entries(j.L || {})) j.O[k] = j.O[v];   // aliases share the same object
    return { P: IDX, Q: j.Q, O: j.O, A: j.A, L: j.L || {}, lazy: j.lazy || { city: [], jobrole: {} }, loaded: new Map() };
  })();
  corePromise.catch(() => { corePromise = null; });
  return corePromise;
}
/* Warm the core file when someone hovers or focuses a profile card. */
export const warm = new Set();       // other things to warm up at the same time (code chunks)
export function prefetchCore() { loadData().catch(() => {}); warm.forEach((f) => f()); warm.clear(); }

function loadChunk(D, kind, id) {
  const key = kind + ':' + id;
  if (!D.loaded.has(key)) D.loaded.set(key, fetchChunk(D, kind, id).catch((e) => { D.loaded.delete(key); throw e; }));
  return D.loaded.get(key);
}
async function fetchChunk(D, kind, id) {
  {
    let part;
    if (hasEmbedded()) {
      const e = await fromEmbedded();
      part = kind === 'city' ? Object.fromEntries(Object.entries(e.O.city).filter(([k]) => k.split('-')[0] === id))
        : Object.fromEntries(Object.entries(e.O.jobrole).filter(([k]) => D.lazy.jobrole[k] === id));
    } else part = await getJSON(`${kind}/${id}.json`);
    Object.assign(D.O[kind], part);
  }
}

/* Make sure every lazily loaded option list the session can currently reach is in memory.
   Call before computing visibility (next question, resume, review). Cheap when nothing is missing. */
export async function ensureFor(s) {
  const D = s.D, jobs = [];
  for (const [n] of s.flat) {
    const c = D.A[n] || n, canon = (D.L && D.L[c]) || c;
    if (canon !== 'city' && canon !== 'jobrole') continue;
    const par = D.Q[n] && D.Q[n][1], a = par && s.ans[par];
    if (!filled(a)) continue;
    for (const k of (Array.isArray(a) ? a : [a])) {
      if (canon === 'city') { const cc = String(k).split('-')[0]; if (D.lazy.city.includes(cc)) jobs.push(loadChunk(D, 'city', cc)); }
      else if (D.lazy.jobrole[k] != null) jobs.push(loadChunk(D, 'jobrole', D.lazy.jobrole[k]));
    }
  }
  if (!jobs.length) return false;
  await Promise.all(jobs);
  s.cache.clear();
  return true;
}
