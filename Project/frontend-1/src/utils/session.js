// Signed-in check for the public pages. The API keeps the session in an httpOnly cookie, so the
// only way to know is to ask /api/v1/me.
import { api } from './api.js';
import { ENV } from '../config/env.js';
import { hrefFor } from '../router/Router.jsx';

export const DASHBOARD = '/member/dashboard/';

export async function isLoggedIn() {
  try {
    const me = await api.get('/api/v1/me');
    return me?.status === 'success' && me.data ? me.data : null;
  } catch {
    return null;
  }
}

/** Sign-up and login are for visitors: a signed-in member goes to their dashboard instead. */
export async function redirectIfLoggedIn() {
  const me = await isLoggedIn();
  if (me) window.location.replace(hrefFor(DASHBOARD));
  return me;
}

/** The panel agreement pages (existing Consumer and Professional T&C forms, served at /user/). */
export function termsUrl(cat, type) {
  const c = cat === 'b2b' || (!cat && type === 'pro') ? 'b2b' : 'b2c';
  return ENV.DEMO_MODE ? hrefFor('/terms/') : `/user/terms-${c}.html`;
}

/** Retired page: the welcome questions were removed from registration (Round 15). Kept so old links work. */
export const WELCOME = '/welcome/';
/** After logging in: always the dashboard (no welcome questions any more). */
export async function afterLogin() {
  return hrefFor(DASHBOARD);
}

const CH_KEY = 't2o_welcome_channels';
export const welcomeChannels = {
  set(list) {
    try {
      sessionStorage.setItem(CH_KEY, JSON.stringify(list || []));
    } catch {
      /* private mode: the channels simply are not saved with the answers */
    }
  },
  take() {
    try {
      const v = JSON.parse(sessionStorage.getItem(CH_KEY) || '[]');
      sessionStorage.removeItem(CH_KEY);
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  }
};
