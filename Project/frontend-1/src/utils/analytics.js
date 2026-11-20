// Consent-aware tag loading. GTM (which then manages GA4, Meta Pixel, etc.) is only injected
// after the visitor allows analytics or marketing cookies. Google Consent Mode v2 defaults to "denied".
import { ENV } from '../config/env.js';
import { store } from './storage.js';

export const CONSENT_KEY = 't2o_consent_v1';
let gtmLoaded = false;

function dl() {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}
function gtag() {
  // eslint-disable-next-line prefer-rest-params
  dl().push(arguments);
}

// The choice is kept in localStorage and mirrored in a first-party cookie (essential, 12 months,
// shared by turn2opinion.com and www.turn2opinion.com), so it survives either being cleared.
const COOKIE = 't2o_consent';
function readCookie() {
  try {
    const m = document.cookie.match(/(?:^|; )t2o_consent=([^;]*)/);
    return m ? JSON.parse(decodeURIComponent(m[1])) : null;
  } catch {
    return null;
  }
}
function writeCookie(value) {
  try {
    const host = window.location.hostname;
    const domain = /(^|\.)turn2opinion\.com$/.test(host) ? '; domain=.turn2opinion.com' : '';
    const secure = window.location.protocol === 'https:' ? '; secure' : '';
    document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax${domain}${secure}`;
  } catch {
    /* ignore */
  }
}

export function getConsent() {
  if (typeof window === 'undefined') return null;
  const local = store.get(CONSENT_KEY, null);
  if (local) return local;
  const fromCookie = readCookie();
  if (fromCookie) store.set(CONSENT_KEY, fromCookie);
  return fromCookie;
}

function consentState(c) {
  const g = (b) => (b ? 'granted' : 'denied');
  return {
    analytics_storage: g(c && c.analytics),
    ad_storage: g(c && c.marketing),
    ad_user_data: g(c && c.marketing),
    ad_personalization: g(c && c.marketing),
    functionality_storage: g(c && c.preferences),
    personalization_storage: g(c && c.preferences),
    security_storage: 'granted'
  };
}

function loadGtm() {
  if (gtmLoaded || window.__t2oGtmLoaded || !ENV.GTM_ID) return;
  gtmLoaded = true;
  window.__t2oGtmLoaded = 1;
  dl().push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(ENV.GTM_ID);
  document.head.appendChild(s);
}

// Meta Pixel consent: the base code in the page head starts revoked (see src/seo/seo.js).
function metaConsent(c) {
  if (typeof window.fbq === 'function') window.fbq('consent', c && c.marketing ? 'grant' : 'revoke');
}

/** Call once on startup. */
export function initAnalytics() {
  if (typeof window === 'undefined') return;
  const c = getConsent();
  gtag('consent', 'default', { ...consentState(null), wait_for_update: 500 });
  if (c) {
    gtag('consent', 'update', consentState(c));
    metaConsent(c);
    if (c.analytics || c.marketing) loadGtm();
  }
}

export function saveConsent(c) {
  const value = { necessary: true, analytics: !!c.analytics, marketing: !!c.marketing, preferences: !!c.preferences, ts: Date.now() };
  store.set(CONSENT_KEY, value);
  writeCookie(value);
  gtag('consent', 'update', consentState(value));
  metaConsent(value);
  if (value.analytics || value.marketing) loadGtm();
  window.dispatchEvent(new CustomEvent('t2o:consent', { detail: value }));
  return value;
}

/** Push a business event to the dataLayer (GTM maps it to GA4 / Meta). */
export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  dl().push({ event, ...params });
}

let firstView = true;
export function trackPageView(path, title) {
  track('page_view', { page_path: path, page_title: title });
  // The pixel base code in the page head already counts the first page; count each in-app
  // navigation after it (held back by fbq until marketing consent is granted).
  if (firstView) firstView = false;
  else if (typeof window.fbq === 'function') window.fbq('track', 'PageView');
}
