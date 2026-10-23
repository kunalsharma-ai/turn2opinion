/* Integration settings. Set window.T2O_CONFIG before the app script loads, e.g.
   <script>window.T2O_CONFIG = {
     endpoint: '/api/respondent/profile',     // POST target for completed profiles (JSON payload)
     headers: { 'X-CSRF-Token': '…' },
     credentials: 'include',
     dataUrl: '/api/respondent/questions',    // optional: folder/API serving core.json, city/<CC>.json, jobrole/<n>.json
     translate: {
       endpoint: '/api/translate',            // optional: your translation proxy (see server/translate-proxy.mjs)
       publicFallback: true                   // false = never call Google's public endpoint from the browser
     },
     images: { travel: '/img/travel.jpg' },   // optional: photo per world id for the stage panel
     api: '/api',                             // optional: validation/OTP/risk API (server/api-server.mjs); without it OTP runs in demo mode
     progressEndpoint: 'https://api.example.com/t2o/progress', // optional (v5.2): Opinion City progress for the 2-day reminder e-mails (server/reminders)
     memberId: '<panel member id>',           // optional: your member id, so reminders reach the right account (default: this browser's install id)
   }</script>
   Without an endpoint, answers are saved on the device exactly like the original page,
   and a 't2o:profile-submit' window event is dispatched with the payload. */
export const CFG = Object.assign(
  { endpoint: '', method: 'POST', headers: {}, credentials: 'same-origin', dataUrl: '', images: {}, translate: {}, api: '', progressEndpoint: '', memberId: '' },
  (typeof window !== 'undefined' && window.T2O_CONFIG) || {}
);

export async function submitProfile(payload) {
  window.dispatchEvent(new CustomEvent('t2o:profile-submit', { detail: payload }));
  if (!CFG.endpoint) return true;
  const r = await fetch(CFG.endpoint, {
    method: CFG.method,
    headers: Object.assign({ 'Content-Type': 'application/json' }, CFG.headers),
    credentials: CFG.credentials,
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('server responded ' + r.status);
  return true;
}
