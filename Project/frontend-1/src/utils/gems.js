// Gems ka data endpoint se (category ke hisaab se) — array form mein.
//
// Endpoint response (GET {API_GEMS_URL}?audience=consumer|professional):
// {
//   "gems": [ { "v":1, "key":"pebble", "gem":"Pebble", "word":"Poor", "short":"Poor",
//               "c1":"#A3ADBF", "c2":"#5B667D", "c3":"#2F374A", "glow":"rgba(163,173,191,.45)",
//               "note":"Something clearly went wrong." }, ...5 items, v = 1..5 ],
//   "chips":   { "up": ["Easy to use", ...], "down": ["More surveys", ...] },
//   "starters": ["What I like most is…", ...],
//   "facets":  [ { "key":"worth", "label":"…", "hint":"…", "meter":"clock|coins|bubbles|battery",
//                  "c1":"#2F6BFF", "c2":"#49B6FF", "icon":"clock" }, ... ]
// }
// Sab fields optional hain: jo field nahi aayi / galat aayi, uska static default (reviewFacets.js) chalta rehta hai.
//
// Kaam kaise karta hai: reviewFacets.js ke LEVELS / HIGHLIGHTS / STARTERS / FACETS arrays-objects ko
// IN-PLACE update karta hai. Isliye Gem.jsx, GemForge.jsx, FacetDials.jsx, VoiceCard.jsx mein koi change nahi.
import { useEffect, useSyncExternalStore } from 'react';
import { ENV } from '../config/env.js';
import { api } from './api.js';
import { FACETS, HIGHLIGHTS, LEVELS, STARTERS } from '../data/reviewFacets.js';

const METERS = ['clock', 'coins', 'bubbles', 'battery'];
const subs = new Set();
let version = 0;
let loadedFor = '';

const str = (x) => typeof x === 'string' && x.trim().length > 0;
const strList = (a) => Array.isArray(a) && a.length > 0 && a.every(str);

function validGems(a) {
  return (
    Array.isArray(a) &&
    a.length === 5 &&
    a.every((g, i) => g && g.v === i + 1 && str(g.key) && str(g.gem) && str(g.word) && str(g.c1) && str(g.c2) && str(g.c3)) // v 1..5, order fixed
  );
}
function validFacets(a) {
  return Array.isArray(a) && a.length > 0 && a.every((f) => f && str(f.key) && str(f.label) && METERS.includes(f.meter) && str(f.c1) && str(f.c2));
}

/** Endpoint ka data apply karo (galat/adhoora data ignore). */
export function setGemConfig(cfg, audience) {
  if (!cfg || typeof cfg !== 'object') return false;
  let changed = false;
  if (validGems(cfg.gems)) {
    LEVELS.splice(0, LEVELS.length, ...cfg.gems.map((g) => ({ short: g.word, glow: 'rgba(255,255,255,.4)', note: '', ...g })));
    changed = true;
  }
  if (cfg.chips) {
    if (strList(cfg.chips.up)) HIGHLIGHTS.up = cfg.chips.up;
    if (strList(cfg.chips.down)) HIGHLIGHTS.down = cfg.chips.down;
    changed = true;
  }
  if (strList(cfg.starters)) {
    STARTERS[audience] = cfg.starters;
    changed = true;
  }
  if (validFacets(cfg.facets)) {
    FACETS.splice(0, FACETS.length, ...cfg.facets);
    changed = true;
  }
  if (changed) {
    version += 1;
    subs.forEach((f) => f());
  }
  return changed;
}

/** Ek baar (category ke liye) endpoint se laao. Fail ho to defaults chalte rahenge. */
export async function loadGemConfig(audience) {
  if (!ENV.API_GEMS_URL || ENV.DEMO_MODE || loadedFor === audience) return false;
  try {
    const data = await api.get(`${ENV.API_GEMS_URL}?audience=${encodeURIComponent(audience)}`);
    const cfg = data && data.data ? data.data : data; // {data:{...}} ya seedha {...}
    if (setGemConfig(cfg, audience)) {
      loadedFor = audience;
      return true;
    }
  } catch (e) {
    /* defaults chalte rahenge */
  }
  return false;
}

/** Component ko re-render karwane ke liye (data aane ke baad). */
export function useGemConfig() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    () => version
  );
}

/* ---------------- /api/v1/me se logged-in user ---------------- */
let meState = { user: null, loading: true };
let mePromise = null;
const meSubs = new Set();
const setMe = (next) => {
  meState = next;
  meSubs.forEach((f) => f());
};

export function refreshMe() {
  mePromise = api.get('/api/v1/me')
    .then((d) => {
      const raw = d && d.data ? d.data : d; // {data:{...}} or the user itself
      // The API sends _id / mail / name.first; widgets read id / email / firstName.
      const u = raw && typeof raw === 'object' && (raw._id || raw.id || raw.mail || raw.email)
        ? { ...raw, id: raw.id || raw._id, email: raw.email || raw.mail, firstName: raw.firstName || raw.name?.first }
        : null;
      setMe({ user: u, loading: false });
    })
    .catch(() => setMe({ user: null, loading: false })); // 401 / error = logged-out
  return mePromise;
}

export function useMe() {
  const state = useSyncExternalStore(
    (cb) => {
      meSubs.add(cb);
      return () => meSubs.delete(cb);
    },
    () => meState
  );
  useEffect(() => {
    if (!mePromise) refreshMe(); // ek hi baar fetch, sab components share karte hain
  }, []);
  return state; // { user, loading }
}