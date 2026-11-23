// Reference implementation of the consent API for your backend team (Node 18+, no dependencies).
// It shows the contract and the checks; production should store records in your member database.
//
// Business Professionals Panel.
//
//   POST /api/consent/business          body = the record the page sends (README → "API contract") → { ok, consentId }
//   GET  /api/consent/business/status   ?memberId=123 → { needsConsent, termsVersion, record }  (show the page or not)
//
//   PORT=8790 CURRENT_TERMS_VERSION=B2B-2026.10 node server/consent-api.mjs
//
// IMPORTANT in production: take the member id from YOUR session (cookie / token), never trust memberId from the
// body; verify CSRF; store the server time and the client IP hash; keep records for as long as the law requires
// (consent records are evidence — do not delete them when terms change, append a new record instead).
import { createServer } from 'node:http';
import { createHash, randomUUID } from 'node:crypto';
import { appendFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(HERE, 'data');
const LOG = path.join(DATA, 'business-consents.jsonl'); // one JSON record per line (append-only)
const VERSION = process.env.CURRENT_TERMS_VERSION || 'B2B-2026.10';
const REQUIRED = ['terms', 'privacy', 'accuracy', 'confidential'];
const OPTIONAL = ['interviews', 'clientContact', 'sensitive', 'marketing', 'analytics'];
const SALT = process.env.IP_SALT || 'change-me';

const json = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };

async function readAll() {
  try { return (await readFile(LOG, 'utf8')).split('\n').filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; }
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/api/consent/business' && req.method === 'POST') {
    let raw = '';
    for await (const c of req) { raw += c; if (raw.length > 20000) return json(res, 413, { error: 'too large' }); }
    let b;
    try { b = JSON.parse(raw); } catch { return json(res, 400, { error: 'bad json' }); }
    const memberId = String(b.memberId || '').slice(0, 64); // ← production: from the session instead
    if (!memberId) return json(res, 401, { error: 'not signed in' });
    if (b.panel !== 'business') return json(res, 400, { error: 'wrong panel' });
    if (b.termsVersion !== VERSION) return json(res, 409, { error: 'terms version changed — reload the page', termsVersion: VERSION });
    const c = b.consents || {};
    if (!REQUIRED.every((k) => c[k] === true)) return json(res, 422, { error: 'required consents missing' });
    const record = {
      consentId: `T2O-B2B-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 8).toUpperCase()}`,
      clientConsentId: String(b.consentId || '').slice(0, 40),
      panel: 'business',
      memberId,
      termsVersion: VERSION,
      language: String(b.language || 'en').slice(0, 10),
      consents: Object.fromEntries([...REQUIRED, ...OPTIONAL].map((k) => [k, c[k] === true])),
      clausesReviewed: Array.isArray(b.clausesReviewed) ? b.clausesReviewed.filter((n) => Number.isInteger(n) && n >= 1 && n <= 23).slice(0, 23) : [],
      theme: b.theme === 'dark' ? 'dark' : 'light',
      acceptedAtClient: String(b.acceptedAt || '').slice(0, 40),
      receivedAt: new Date().toISOString(),
      timezone: String(b.timezone || '').slice(0, 60),
      ipHash: createHash('sha256').update(SALT + (req.socket.remoteAddress || '')).digest('hex').slice(0, 16),
      userAgent: String(req.headers['user-agent'] || '').slice(0, 300),
    };
    await mkdir(DATA, { recursive: true });
    await appendFile(LOG, JSON.stringify(record) + '\n');
    return json(res, 200, { ok: true, consentId: record.consentId });
  }
  if (url.pathname === '/api/consent/business/status' && req.method === 'GET') {
    const memberId = url.searchParams.get('memberId') || '';
    const mine = (await readAll()).filter((r) => r.memberId === memberId);
    const last = mine[mine.length - 1] || null;
    return json(res, 200, { needsConsent: !last || last.termsVersion !== VERSION, termsVersion: VERSION, record: last });
  }
  json(res, 404, { error: 'not found' });
}).listen(Number(process.env.PORT || 8790), () => console.log(`Business consent API on :${process.env.PORT || 8790} (terms ${VERSION})`));
