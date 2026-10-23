/* Opinion Points: 100 points for every completed profile, 1,000 points = 1 USD.
   Points are derived from the completed profiles saved on this device (t2oa:<category>:<profile>), so they
   are awarded exactly once per profile: editing answers later never adds more.
   The numbers here are for display. Payouts must be calculated on your server from the profiles it received.

   The reward animations play once per profile: +100 flies to the header on the completion screen, and the
   tower is built in the city the next time the respondent is on the hub (see "delivery" below). */
import { PROFILES } from './data.js';
import { loadDone, LS, profileKey } from './storage.js';
import { CFG } from './config.js';
import { installId } from './signals.js';
import { levelOf } from './city-art.js';
import { lang } from '../i18n/index.js';
import { bcp } from '../i18n/languages.js';

export const POINTS_PER_PROFILE = 100;
export const POINTS_PER_USD = 1000;
export const LEVEL_KEYS = ['rw_lv0', 'rw_lv1', 'rw_lv2', 'rw_lv3', 'rw_lv4'];

const subs = new Set();
let ver = 0;
export const subscribeRewards = (f) => { subs.add(f); return () => subs.delete(f); };
export const rewardsVersion = () => ver;
export function emitRewards() { ver++; subs.forEach((f) => f()); }

export const catProfiles = (cat) => PROFILES.filter((p) => p.c === cat);
export const isDone = (p) => !!loadDone(p);
export const doneKeys = () => PROFILES.filter(isDone).map(profileKey);
export const totalPoints = () => doneKeys().length * POINTS_PER_PROFILE;

const usdFmt = new Map();
/** 1200 → "$1.20" in the current language's number format */
export function fmtUsd(points) {
  const c = bcp(lang());
  let f = usdFmt.get(c);
  if (!f) { try { f = new Intl.NumberFormat(c, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }); } catch (e) { f = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }); } usdFmt.set(c, f); }
  return f.format(points / POINTS_PER_USD);
}

/* ---------- delivery ----------
   rw:paid  profiles whose +100 has landed in the points counter (header pill and the city's neon sign)
   rw:seen  profiles whose tower has been built in the city on the hub
   The completion screen pays the points (a +100 flies to the header pill); the hub then builds the tower.
   Anything not yet paid or built when the respondent leaves is celebrated the next time. */
const sets = {};
function readSet(name) { try { const v = JSON.parse(LS.get(name) || 'null'); return Array.isArray(v) ? v : null; } catch (e) { return null; } }
const setOf = (name) => sets[name] || (sets[name] = readSet(name) || []);
function addTo(name, key) { const s = setOf(name); if (s.includes(key)) return; s.push(key); LS.set(name, JSON.stringify(s)); emitRewards(); }
/* First visit with this feature: profiles completed before rewards existed count as built and paid (no replay). */
export function initSeen() {
  for (const name of ['rw:seen', 'rw:paid']) if (!readSet(name)) { sets[name] = doneKeys(); LS.set(name, JSON.stringify(sets[name])); }
}
export const isSeen = (key) => setOf('rw:seen').includes(key);
export const isPaid = (key) => setOf('rw:paid').includes(key);
export const markSeen = (key) => { addTo('rw:paid', key); addTo('rw:seen', key); };
export const markPaid = (key) => addTo('rw:paid', key);
/** completed but whose tower is not yet built on the hub, in profile order */
export const pendingKeys = (cat) => catProfiles(cat).filter((p) => isDone(p) && !isSeen(profileKey(p))).map(profileKey);
/** points already shown in the counters (a flying +100 adds the rest when it lands) */
export const deliveredPoints = () => doneKeys().filter((k) => isPaid(k)).length * POINTS_PER_PROFILE;

export function cityStats(cat) {
  const ps = catProfiles(cat), done = ps.filter(isDone).length, total = ps.length;
  const lv = levelOf(done, total), pts = totalPoints();
  const nextUsd = (Math.floor(pts / POINTS_PER_USD) + 1) * POINTS_PER_USD;
  return { done, total, pts, lv, nextUsd, toUsd: nextUsd - pts, max: done === total };
}

/* ---------- reminder-service sync ----------
   POSTs the respondent's progress so the reminder service (server/reminders) can e-mail them every 2 days
   about the profiles still to complete. Set window.T2O_CONFIG.progressEndpoint to enable. */
let syncT = 0;
export function syncProgress() {
  const url = CFG.progressEndpoint; if (!url || typeof fetch === 'undefined') return;
  clearTimeout(syncT);
  syncT = setTimeout(() => {
    const A = {};
    for (const p of PROFILES) { const d = loadDone(p); if (d && d.a) Object.assign(A, d.a); }
    const cat = PROFILES.some((p) => p.c === 'minor' && isDone(p)) && !PROFILES.some((p) => p.c === 'b2c' && isDone(p)) ? 'minor' : 'b2c';
    const ps = catProfiles(cat), completed = ps.filter(isDone).map((p) => p.s);
    const body = {
      respondentId: CFG.memberId || installId(), email: A.mail || '', name: A.firstname ? String(A.firstname).trim().split(' ')[0] : '',
      language: lang(), category: cat, completed, pending: ps.filter((p) => !isDone(p)).map((p) => p.s),
      points: totalPoints(), usd: totalPoints() / POINTS_PER_USD, at: new Date().toISOString(),
    };
    fetch(url, { method: 'POST', credentials: CFG.credentials, headers: Object.assign({ 'Content-Type': 'application/json' }, CFG.headers), body: JSON.stringify(body), keepalive: true }).catch(() => {});
  }, 400);
}
