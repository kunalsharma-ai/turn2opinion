/* One-time-code verification for email and phone.
   With T2O_CONFIG.api set, codes are created, sent and checked by the server (server/api-server.mjs):
     POST {api}/otp/send   { channel: 'email'|'sms', to }      → { id, expiresIn, resendIn }
     POST {api}/otp/verify { id, code }                         → { verified: true } | { error: 'wrong'|'expired'|'locked', attemptsLeft }
   Without an API (static preview), a DEMO mode generates the code in the browser and shows it on screen.
   Demo verification is stored as "demo", never as "verified".
   Limits (same on the server): code valid 10 min · 5 attempts · resend after 45 s · max 3 resends per contact. */
import { CFG } from './config.js';

export const OTP_LIMITS = { ttl: 600, attempts: 5, cooldown: 45, resends: 3 };
const demo = new Map();   // id → { code, exp, left, to }
const sends = new Map();  // to → count

async function post(path, body) {
  const r = await fetch(CFG.api.replace(/\/$/, '') + path, {
    method: 'POST', credentials: CFG.credentials, headers: Object.assign({ 'Content-Type': 'application/json' }, CFG.headers), body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok && !j.error) throw new Error('otp ' + r.status);
  return j;
}

export const otpMode = () => (CFG.api ? 'server' : 'demo');

export async function sendCode(channel, to) {
  if (CFG.api) return post('/otp/send', { channel, to });
  const n = (sends.get(to) || 0) + 1;
  if (n > OTP_LIMITS.resends + 1) return { error: 'resends' };
  sends.set(to, n);
  const code = String(Math.floor(100000 + (crypto.getRandomValues ? crypto.getRandomValues(new Uint32Array(1))[0] % 900000 : Math.random() * 900000)));
  const id = 'demo-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  demo.set(id, { code, exp: Date.now() + OTP_LIMITS.ttl * 1000, left: OTP_LIMITS.attempts, to });
  return { id, expiresIn: OTP_LIMITS.ttl, resendIn: OTP_LIMITS.cooldown, demoCode: code };
}

export async function checkCode(id, code) {
  if (CFG.api) return post('/otp/verify', { id, code });
  const d = demo.get(id);
  if (!d) return { error: 'expired' };
  if (Date.now() > d.exp) { demo.delete(id); return { error: 'expired' }; }
  if (d.left <= 0) return { error: 'locked' };
  if (String(code).trim() !== d.code) { d.left--; return d.left > 0 ? { error: 'wrong', attemptsLeft: d.left } : { error: 'locked' }; }
  demo.delete(id);
  return { verified: true, demo: true };
}
