/* Privacy-conscious quality signals collected in the browser (no canvas/audio fingerprinting, no tracking
   across sites). Sent with each submitted profile so the server can score it; nothing here blocks a respondent.
   - device: browser, OS, device type, screen, language(s), time zone, a random per-browser install id and a
     hash of coarse device traits (to notice "1 device → 20 accounts")
   - automation: navigator.webdriver, headless user agents, missing pointer/keyboard activity
   - behaviour: time per question, paste events in identity fields, total completion time */
import { LS } from './storage.js';

const now = () => Date.now();
const S = { qStart: 0, times: [], pastes: {}, keys: 0, pointer: 0, started: now() };

export function installId() {
  let id = LS.get('t2o:iid');
  if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + now().toString(36)); LS.set('t2o:iid', id); }
  return id;
}
async function sha256(s) {
  try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('').slice(0, 32); }
  catch (e) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return 'h' + (h >>> 0).toString(16); }
}
function uaInfo() {
  const ua = navigator.userAgent || '';
  const os = /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android' : /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'Other';
  const br = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Other';
  const ver = (ua.match(/(?:Edg|OPR|Firefox|Chrome|Version)\/(\d+)/) || [])[1] || '';
  const type = /Mobi|iPhone|Android.*Mobile/.test(ua) ? 'mobile' : /iPad|Tablet|Android/.test(ua) ? 'tablet' : 'desktop';
  return { os, browser: br, version: ver, type, ua };
}
export function automation() {
  const ua = navigator.userAgent || '', f = [];
  if (navigator.webdriver) f.push('webdriver');
  if (/HeadlessChrome|PhantomJS|Puppeteer|Playwright|Selenium/i.test(ua)) f.push('headless_ua');
  if (navigator.languages && navigator.languages.length === 0) f.push('no_languages');
  if (window.outerWidth === 0 && window.outerHeight === 0) f.push('no_window');
  return f;
}
/* Guess the visitor's country (only to pre-select the phone country code): browser region, then time zone. */
export function guessCountry(tzMap) {
  for (const l of navigator.languages || [navigator.language]) { const m = /[-_]([A-Z]{2})$/i.exec(l || ''); if (m) return m[1].toUpperCase(); }
  try { const z = Intl.DateTimeFormat().resolvedOptions().timeZone; if (tzMap && tzMap[z]) return tzMap[z]; } catch (e) { /* ignore */ }
  return 'US';
}

/* behaviour hooks (called by the app) */
export const track = {
  question() { if (S.qStart) S.times.push(now() - S.qStart); S.qStart = now(); },
  paste(field) { S.pastes[field] = (S.pastes[field] || 0) + 1; },
  key() { S.keys++; },
  pointer() { S.pointer++; },
};
if (typeof window !== 'undefined') {
  addEventListener('keydown', () => track.key(), { passive: true, capture: true });
  addEventListener('pointerdown', () => track.pointer(), { passive: true, capture: true });
}
/* remember which member emails used this browser (counts only, for the "many accounts, one device" signal) */
export function noteAccount(email) {
  if (!email) return 0;
  let list = []; try { list = JSON.parse(LS.get('t2o:accts') || '[]'); } catch (e) { list = []; }
  const h = String(email).toLowerCase();
  if (!list.includes(h)) list.push(h);
  LS.set('t2o:accts', JSON.stringify(list.slice(-20)));
  return list.length;
}

export async function collectSignals() {
  const u = uaInfo(), tz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return ''; } })();
  const scr = { w: screen.width, h: screen.height, dpr: devicePixelRatio || 1, depth: screen.colorDepth };
  const traits = [u.os, u.browser, u.type, scr.w + 'x' + scr.h, scr.dpr, navigator.hardwareConcurrency || 0, navigator.deviceMemory || 0, tz, (navigator.languages || []).join(',')].join('|');
  const times = S.times.slice().sort((a, b) => a - b), med = times.length ? times[Math.floor(times.length / 2)] : null;
  const auto = automation();
  let accounts = 0; try { accounts = JSON.parse(LS.get('t2o:accts') || '[]').length; } catch (e) { accounts = 0; }
  return {
    device: { ...u, screen: scr, cores: navigator.hardwareConcurrency || null, memory: navigator.deviceMemory || null, touch: navigator.maxTouchPoints || 0 },
    language: navigator.language, languages: navigator.languages || [], timezone: tz, tzOffset: new Date().getTimezoneOffset(),
    installId: installId(), deviceHash: await sha256(traits),
    automation: auto, bot: auto.length > 0,
    behaviour: { questions: times.length, medianMs: med, totalMs: now() - S.started, pastes: S.pastes, keys: S.keys, pointer: S.pointer },
    tooFast: times.length >= 10 && med != null && med < 1200,
    pasteIdentity: ['firstname', 'lastname', 'dob'].some((f) => S.pastes[f]),
    deviceAccounts: accounts,
  };
}
