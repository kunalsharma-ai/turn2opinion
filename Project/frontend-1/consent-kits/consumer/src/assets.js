// Public files (brand/, fonts/, flags/) resolved against config.assetBase — so the page works at any URL and
// inside your app (embed mode). The single-file preview registers data: URIs in window.__T2O_CONSENT_ASSETS.
let base = '';
export function setAssetBase(b) {
  base = b ? (b.endsWith('/') ? b : `${b}/`) : '';
}
export function asset(p) {
  const clean = p.replace(/^\//, '');
  if (typeof window !== 'undefined' && window.__T2O_CONSENT_ASSETS && window.__T2O_CONSENT_ASSETS[clean]) return window.__T2O_CONSENT_ASSETS[clean];
  return base ? base + clean : clean; // relative to the page by default
}
