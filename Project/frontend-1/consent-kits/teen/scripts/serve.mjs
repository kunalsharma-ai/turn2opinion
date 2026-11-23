// npm run preview → http://localhost:4300  (serves dist/ like a real host: brotli/gzip copies, correct types)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), process.argv[2] || 'dist');
const port = Number(process.env.PORT || 4300);
const SENT = new Map(); // demo only
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2' };
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  // demo API so the whole flow can be tried locally: the guardian "verifies" 8 s after sending
  if (url.pathname === '/api/minor-consent' && req.method === 'POST') {
    let body = '';
    for await (const c of req) body += c;
    let rec = {};
    try { rec = JSON.parse(body); } catch { /* ignore */ }
    console.log('record received:', body.slice(0, 400));
    if (rec.consentId) SENT.set(rec.consentId, Date.now());
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true, consentId: rec.consentId, accountActivationStatus: 'blocked' }));
  }
  if (url.pathname === '/api/minor-consent/resend' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }
  if (url.pathname === '/api/minor-consent/status') {
    const at = SENT.get(url.searchParams.get('consentId') || '');
    const active = at && Date.now() - at > 8000;
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify({ guardianPermissionStatus: active ? 'verified' : 'pending', teenAssentStatus: 'agreed', accountActivationStatus: active ? 'active' : 'blocked' }));
  }
  let file = path.join(root, decodeURIComponent(url.pathname));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  try { if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html'); } catch { file = path.join(root, 'index.html'); }
  const headers = { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', Vary: 'Accept-Encoding' };
  const ae = String(req.headers['accept-encoding'] || '');
  for (const [enc, ext] of [['br', '.br'], ['gzip', '.gz']]) {
    if (!ae.includes(enc)) continue;
    try { const b = await readFile(file + ext); res.writeHead(200, { ...headers, 'Content-Encoding': enc }); return res.end(b); } catch { /* none */ }
  }
  try { const b = await readFile(file); res.writeHead(200, headers); res.end(b); } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, () => console.log(`Teen agreement page: http://localhost:${port}`));
