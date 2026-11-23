// Storage helpers the v6 components expect. Answers are NOT kept here: they live on the server
// (POST /api/v1/me, PATCH /api/v1/me/profile). Only the "building raised" animation flags use the device.
export const LS = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } }
};
export const profileKey = (p) => p.c + ':' + p.s;
