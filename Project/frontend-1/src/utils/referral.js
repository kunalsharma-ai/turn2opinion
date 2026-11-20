// Referral links look like https://www.turn2opinion.com/?ref=<memberId>&signup (built by the API's
// invite emails and the member area). The id is kept for 30 days on this device and sent as
// `referredBy` when the visitor signs up, so the referrer sees them in their referrals list.
import { store } from './storage.js';

const KEY = 't2o_ref_v1';
const DAYS = 30;
const ID_RE = /^[a-f0-9]{24}$/i;

/** Call once on startup. Returns true when the link asked to open the sign-up page. */
export function captureReferral() {
  if (typeof window === 'undefined') return false;
  try {
    const q = new URLSearchParams(window.location.search);
    const ref = q.get('ref');
    if (ref && ID_RE.test(ref)) {
      store.set(KEY, { id: ref, at: Date.now() });
      return q.has('signup') && !/^\/join\//.test(window.location.pathname);
    }
  } catch {
    /* ignore */
  }
  return false;
}

export function readReferral() {
  const v = store.get(KEY, null);
  if (!v || !ID_RE.test(v.id || '') || Date.now() - (v.at || 0) > DAYS * 864e5) return null;
  return v.id;
}

export function clearReferral() {
  store.remove(KEY);
}
