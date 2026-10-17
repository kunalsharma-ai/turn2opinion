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

export function getConsent() {
  return typeof window === 'undefined' ? null : store.get(CONSENT_KEY, null);
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
  if (gtmLoaded || !ENV.GTM_ID) return;
  gtmLoaded = true;
  dl().push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(ENV.GTM_ID);
  document.head.appendChild(s);
}

/** Call once on startup. */
export function initAnalytics() {
  if (typeof window === 'undefined') return;
  const c = getConsent();
  gtag('consent', 'default', { ...consentState(null), wait_for_update: 500 });
  if (c) {
    gtag('consent', 'update', consentState(c));
    if (c.analytics || c.marketing) loadGtm();
  }
}

export function saveConsent(c) {
  const value = { necessary: true, analytics: !!c.analytics, marketing: !!c.marketing, preferences: !!c.preferences, ts: Date.now() };
  store.set(CONSENT_KEY, value);
  gtag('consent', 'update', consentState(value));
  if (value.analytics || value.marketing) loadGtm();
  window.dispatchEvent(new CustomEvent('t2o:consent', { detail: value }));
  return value;
}

/** Push a business event to the dataLayer (GTM maps it to GA4 / Meta). */
export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  dl().push({ event, ...params });
}

export function trackPageView(path, title) {
  track('page_view', { page_path: path, page_title: title });
}
