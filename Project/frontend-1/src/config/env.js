// Single place that reads build-time environment variables.
// Everything here ends up in the public bundle: never put secrets in VITE_* variables.
const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

const str = (v, fallback = '') => (typeof v === 'string' && v.trim() !== '' ? v.trim() : fallback);

export const ENV = {
  SITE_URL: str(env.VITE_SITE_URL, 'https://www.turn2opinion.com').replace(/\/$/, ''),
  ROUTER_MODE: str(env.VITE_ROUTER_MODE, 'history') === 'hash' ? 'hash' : 'history',
  BASE_URL: str(env.BASE_URL, '/'),
  API_SIGNUP_URL: str(env.VITE_API_SIGNUP_URL, '/api/register'),
  API_LOGIN_URL: str(env.VITE_API_LOGIN_URL, '/api/login'),
  API_ENQUIRY_URL: str(env.VITE_API_ENQUIRY_URL, '/api/enquiry'),
  API_REVIEWS_URL: str(env.VITE_API_REVIEWS_URL, '/api/reviews'),
  ACTIVITY_FEED_URL: str(env.VITE_ACTIVITY_FEED_URL),
  DASHBOARD_URL: str(env.VITE_DASHBOARD_URL, '/dashboard'),
  RECAPTCHA_SITE_KEY: str(env.VITE_RECAPTCHA_SITE_KEY),
  // The site's Tag Manager container (also referenced in index.html). Loaded only after cookie consent.
  GTM_ID: str(env.VITE_GTM_ID, 'GTM-MF5D955'),
  // Meta (Facebook) Pixel ID (public, not a secret). Override with VITE_META_PIXEL_ID; set it to
  // "none" to turn the pixel off. When set, the pixel loads on every page in consent mode: nothing is
  // tracked or stored until the visitor allows marketing cookies (see src/utils/analytics.js).
  META_PIXEL_ID: str(env.VITE_META_PIXEL_ID, '1009909728169388').replace(/\D/g, ''),
  TAWK_PROPERTY_ID: str(env.VITE_TAWK_PROPERTY_ID),
  TAWK_WIDGET_ID: str(env.VITE_TAWK_WIDGET_ID),
  GSC_VERIFICATION: str(env.VITE_GSC_VERIFICATION),
  DEMO_MODE: str(env.VITE_DEMO_MODE) === 'true'
};

/** Prefix a public/ asset path with the configured base URL. */
export function asset(path) {
  const base = ENV.BASE_URL.endsWith('/') ? ENV.BASE_URL : ENV.BASE_URL + '/';
  return base + String(path).replace(/^\//, '');
}
