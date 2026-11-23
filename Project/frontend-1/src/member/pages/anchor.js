// Deep links into the Profiles and Surveys pages: /member/profiles/#p-<slug>, /member/surveys/#start-<slug>.
// In the preview (hash routing) the anchor travels as ?a=<anchor> inside the hash.
import { isHashMode } from '../../router/Router.jsx';

export function readAnchor() {
  if (typeof window === 'undefined') return '';
  const h = window.location.hash || '';
  if (isHashMode()) {
    const m = h.match(/[?&]a=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : '';
  }
  return decodeURIComponent(h.replace(/^#/, ''));
}
export function clearAnchor() {
  if (typeof window === 'undefined') return;
  try {
    if (isHashMode()) window.history.replaceState({}, '', window.location.hash.replace(/[?&]a=[^&]+/, ''));
    else window.history.replaceState({}, '', window.location.pathname + window.location.search);
  } catch {
    /* ignore */
  }
}
