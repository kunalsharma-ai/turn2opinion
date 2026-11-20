// Signed-in check for the public pages. The API keeps the session in an httpOnly cookie, so the
// only way to know is to ask /api/v1/me.
import { api } from './api.js';

export const DASHBOARD = '/member/dashboard';

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
  if (me) window.location.replace(DASHBOARD);
  return me;
}
