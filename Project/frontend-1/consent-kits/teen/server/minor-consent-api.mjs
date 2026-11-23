// Reference implementation of the TEEN (13–17) consent API for your backend team (Node 18+, no dependencies).
// It shows the contract and the server-side rules. Production must store records in your member database
// (see schema.sql) and send the guardian message through your own email / SMS provider.
//
//   POST /api/minor-consent              body = the record the page sends (README → "API contract")
//                                         → { ok, consentId, accountActivationStatus, guardianContactMasked }
//   GET  /api/minor-consent/status       ?consentId=…   → { consentId, guardianPermissionStatus, teenAssent, accountActivationStatus }
//   POST /api/minor-consent/resend       { consentId }  → { ok }      (rate-limited: 1 per 60 s, 5 per day)
//   GET  /api/minor-consent/verify       ?token=…       → the link in the guardian's email / the SMS code check.
//                                         Marks the guardian verified and activates the account ONLY if every rule passes.
//   POST /api/minor-consent/withdraw     { consentId, by: 'guardian'|'teen' } → { ok }   (account goes back to 'blocked')
//
//   PORT=8791 TERMS_VERSION=MINOR-2026.10 node server/minor-consent-api.mjs
//
// THE ACTIVATION RULE (never decided by the browser):
//   active  ⇔  member age (from YOUR records) is 13–17
//           ∧  the terms were accepted (Part A, one tap on the page)
//           ∧  guardian contact verified (link clicked / code entered by the guardian)
//           ∧  teen assent = 'agreed'
//           ∧  required consents (participation, privacy, contact) are all true
//           ∧  termsVersion = current version ∧ not withdrawn
//
// THE GUARDIAN IS NOT SENT BY THE BROWSER. The page asks the family for nothing but taps: the parent's or
// guardian's name, relationship and contact were captured when the account was registered, so this server takes
// them from YOUR member record (guardianOnFile below) and sends the confirmation there. The page only receives
// a masked contact to display.
//
// IMPORTANT in production: take the participant id and age from YOUR session and member record, never from the
// body; verify CSRF; never send the guardian token to the teen's browser; keep consent records as evidence
// (append a new record when terms change instead of editing the old one); a teen's "no" stores no guardian data.
import { createServer } from 'node:http';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { appendFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(HERE, 'data');
const LOG = path.join(DATA, 'minor-consents.jsonl'); // append-only event log (one JSON per line)
const VERSION = process.env.TERMS_VERSION || 'MINOR-2026.10';
const REQUIRED = ['participation', 'privacy', 'contact'];
const OPTIONAL = ['studyContact', 'recording', 'sensitive'];
const RELATIONSHIPS = ['father', 'mother', 'guardian', 'representative'];
const SALT = process.env.HASH_SALT || 'change-me';
const MIN_AGE = 13;
const MAX_AGE = 17;

const sha = (s) => createHash('sha256').update(SALT + s).digest('hex');
const json = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
const s = (v, n) => String(v ?? '').trim().slice(0, n);

// ── tiny store: replay the event log into memory (production: SQL, see schema.sql) ──
const db = new Map(); // consentId → record
const resends = new Map(); // consentId → [timestamps]
async function load() {
  try {
    for (const line of (await readFile(LOG, 'utf8')).split('\n').filter(Boolean)) {
      const e = JSON.parse(line);
      db.set(e.record.consentId, e.record);
    }
  } catch { /* first run */ }
}
async function save(event, record) {
  db.set(record.consentId, record);
  await mkdir(DATA, { recursive: true });
  await appendFile(LOG, JSON.stringify({ event, at: new Date().toISOString(), record }) + '\n');
}

// ── replace with a lookup in YOUR member table (session → member) ──
function memberFromSession(req, body) {
  // DEMO ONLY: trusts the body. Production: const m = await members.byId(req.session.memberId)
  return { id: s(body.participantId, 64) || null, age: Number(req.headers['x-demo-age'] || 15), country: s(body.country, 2) };
}

// ── the guardian captured at registration — replace with YOUR member/guardian table ──
// Nothing here may come from the request body: that is the point of taking it from the record on file.
function guardianOnFile(member) {
  // DEMO ONLY. Production: const g = await guardians.forMember(member.id)
  return {
    name: process.env.DEMO_GUARDIAN_NAME || 'Parent on file',
    relationship: process.env.DEMO_GUARDIAN_REL || 'guardian',
    contactType: process.env.DEMO_GUARDIAN_PHONE ? 'phone' : 'email',
    contact: process.env.DEMO_GUARDIAN_PHONE || process.env.DEMO_GUARDIAN_EMAIL || `parent+${member.id}@example.com`,
    country: member.country || 'IN',
    verifiedBefore: false,
  };
}
const maskContact = (g) => (g.contactType === 'phone'
  ? `${'•'.repeat(Math.max(2, g.contact.length - 4))}${g.contact.slice(-4)}`
  : `${g.contact.slice(0, 1)}${'•'.repeat(Math.max(1, Math.min(6, g.contact.indexOf('@') - 1)))}${g.contact.slice(g.contact.indexOf('@'))}`);

// ── replace with your email / SMS provider ──
async function sendGuardianMessage(rec, token) {
  const link = `${process.env.PUBLIC_URL || 'http://localhost:8791'}/api/minor-consent/verify?token=${token}`;
  console.log(`[guardian ${rec.guardian.contactType} → ${rec.guardian.contact}] Please confirm permission for ${rec.participantId}: ${link}`);
}

function activationOf(r) {
  const ok = r.memberAgeOk
    && (r.termsAccepted === true || r.teenAssent?.status === 'declined')
    && r.guardianPermissionStatus === 'verified'
    && r.teenAssent?.status === 'agreed'
    && REQUIRED.every((k) => r.consents?.[k] === true)
    && r.policyVersion === VERSION
    && !r.withdrawal;
  return ok ? 'active' : (r.teenAssent?.status === 'declined' ? 'declined' : 'blocked');
}

async function body(req) {
  let raw = '';
  for await (const c of req) { raw += c; if (raw.length > 40000) throw Object.assign(new Error('too large'), { code: 413 }); }
  return JSON.parse(raw || '{}');
}

await load();
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  try {
    /* submit (agreed or declined) */
    if (url.pathname === '/api/minor-consent' && req.method === 'POST') {
      const b = await body(req);
      const m = memberFromSession(req, b);
      if (!m.id) return json(res, 401, { error: 'not signed in' });
      if (!(m.age >= MIN_AGE && m.age <= MAX_AGE)) return json(res, 403, { error: 'this agreement is only for members aged 13–17' });
      if (b.recordType !== 'minor-participation-consent') return json(res, 400, { error: 'wrong record type' });
      if (b.policyVersion !== VERSION) return json(res, 409, { error: 'terms version changed — reload the page', termsVersion: VERSION });
      const assent = b.teenAssent?.status;
      if (!['agreed', 'declined'].includes(assent)) return json(res, 422, { error: 'teen assent missing' });

      const base = {
        recordType: 'minor-participation-consent',
        consentId: `T2O-MC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 8).toUpperCase()}`,
        clientConsentId: s(b.consentId, 40),
        auditRef: `AUD-${randomBytes(6).toString('hex').toUpperCase()}`,
        participantId: m.id,
        memberAgeOk: true,
        ageBand: m.age <= 15 ? '13-15' : '16-17',
        country: s(b.country, 2) || m.country,
        policyVersion: VERSION,
        privacyNoticeVersion: s(b.privacyNoticeVersion, 40),
        assentVersion: s(b.assentVersion, 40),
        language: s(b.language, 10) || 'en',
        timezone: s(b.timezone, 60),
        termsAccepted: b.termsAccepted === true,
        termsTopics: Array.isArray(b.termsTopics) ? b.termsTopics.map((x) => s(x, 20)).slice(0, 12) : [],
        teenAssent: { status: assent, version: s(b.teenAssent?.version, 40), at: s(b.teenAssent?.at, 40) },
        receivedAt: new Date().toISOString(),
        ipHash: sha(req.socket.remoteAddress || '').slice(0, 16),
        userAgent: s(req.headers['user-agent'], 300),
        withdrawal: null,
      };

      if (assent === 'declined') {
        // data minimisation: no guardian details, no permissions
        const rec = { ...base, consents: {}, guardianPermissionStatus: 'not-requested' };
        rec.accountActivationStatus = activationOf(rec);
        await save('teen-declined', rec);
        return json(res, 200, { ok: true, consentId: rec.consentId, accountActivationStatus: rec.accountActivationStatus });
      }

      // the guardian comes from the member record, never from the browser
      const g = guardianOnFile(m);
      const contact = s(g.contact, 120);
      const errs = [];
      if (b.termsAccepted !== true) errs.push('termsAccepted');
      if (s(g.name, 120).length < 2 || !RELATIONSHIPS.includes(g.relationship)) errs.push('guardian.onFile');
      if (g.contactType === 'email' ? !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact) : !/^\+?[0-9 ()-]{7,20}$/.test(contact)) errs.push('guardian.contactOnFile');
      const c = b.consents || {};
      if (!REQUIRED.every((k) => c[k] === true)) errs.push('consents.required');
      // a missing or unusable guardian on file is a 409: the family must update it in their account first
      if (errs.some((e) => e.startsWith('guardian.'))) return json(res, 409, { error: 'no usable parent or guardian contact on file', fields: errs });
      if (errs.length) return json(res, 422, { error: 'invalid', fields: errs });

      const token = randomBytes(24).toString('base64url'); // goes ONLY to the guardian
      const rec = {
        ...base,
        guardian: { name: s(g.name, 120), relationship: g.relationship, contactType: g.contactType, contact, country: s(g.country, 2), source: 'member-record' },
        consents: Object.fromEntries([...REQUIRED, ...OPTIONAL].map((k) => [k, c[k] === true])),
        guardianPermissionStatus: 'pending',
        verification: { method: g.contactType === 'phone' ? 'sms-code' : 'email-link', tokenHash: sha(token), expiresAt: new Date(Date.now() + 7 * 864e5).toISOString(), status: 'pending' },
      };
      rec.accountActivationStatus = activationOf(rec); // always 'blocked' here
      await save('submitted', rec);
      await sendGuardianMessage(rec, token);
      // only the masked contact goes back to the teen's browser
      return json(res, 200, { ok: true, consentId: rec.consentId, accountActivationStatus: rec.accountActivationStatus, guardianContactMasked: maskContact(g) });
    }

    /* status (the page polls this while waiting) */
    if (url.pathname === '/api/minor-consent/status' && req.method === 'GET') {
      const r = db.get(url.searchParams.get('consentId') || '');
      if (!r) return json(res, 404, { error: 'not found' });
      // production: also check r.participantId === session member
      return json(res, 200, { consentId: r.consentId, guardianPermissionStatus: r.guardianPermissionStatus, teenAssent: r.teenAssent.status, accountActivationStatus: r.accountActivationStatus });
    }

    /* resend the guardian message */
    if (url.pathname === '/api/minor-consent/resend' && req.method === 'POST') {
      const { consentId } = await body(req);
      const r = db.get(s(consentId, 40));
      if (!r || r.guardianPermissionStatus !== 'pending') return json(res, 404, { error: 'nothing to resend' });
      const now = Date.now();
      const list = (resends.get(r.consentId) || []).filter((t) => now - t < 864e5);
      if (list.length >= 5 || (list.length && now - list[list.length - 1] < 60e3)) return json(res, 429, { error: 'please wait before sending again' });
      resends.set(r.consentId, [...list, now]);
      const token = randomBytes(24).toString('base64url');
      const rec = { ...r, verification: { ...r.verification, tokenHash: sha(token), expiresAt: new Date(now + 7 * 864e5).toISOString() } };
      await save('resent', rec);
      await sendGuardianMessage(rec, token);
      return json(res, 200, { ok: true });
    }

    /* guardian verification (link in the email / code page) */
    if (url.pathname === '/api/minor-consent/verify' && req.method === 'GET') {
      const h = sha(url.searchParams.get('token') || '');
      const r = [...db.values()].find((x) => x.verification?.tokenHash === h);
      if (!r) return json(res, 404, { error: 'link not valid' });
      if (Date.parse(r.verification.expiresAt) < Date.now()) return json(res, 410, { error: 'link expired — ask for a new one' });
      const rec = { ...r, guardianPermissionStatus: 'verified', verification: { ...r.verification, status: 'verified', tokenHash: null, verifiedAt: new Date().toISOString() } };
      rec.accountActivationStatus = activationOf(rec);
      await save('guardian-verified', rec);
      return json(res, 200, { ok: true, accountActivationStatus: rec.accountActivationStatus });
    }

    /* withdrawal (guardian or teen) */
    if (url.pathname === '/api/minor-consent/withdraw' && req.method === 'POST') {
      const b = await body(req);
      const r = db.get(s(b.consentId, 40));
      if (!r) return json(res, 404, { error: 'not found' });
      const rec = { ...r, withdrawal: { by: b.by === 'guardian' ? 'guardian' : 'teen', at: new Date().toISOString() } };
      rec.accountActivationStatus = activationOf(rec);
      await save('withdrawn', rec);
      return json(res, 200, { ok: true, accountActivationStatus: rec.accountActivationStatus });
    }

    json(res, 404, { error: 'not found' });
  } catch (e) {
    json(res, e.code === 413 ? 413 : 400, { error: e.code === 413 ? 'too large' : 'bad request' });
  }
}).listen(Number(process.env.PORT || 8791), () => console.log(`Minor consent API on :${process.env.PORT || 8791} (terms ${VERSION})`));
