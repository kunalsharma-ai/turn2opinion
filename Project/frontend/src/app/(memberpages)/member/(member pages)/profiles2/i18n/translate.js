/* Machine translation providers for question/answer text.
   Order: 1) your own endpoint (T2O_CONFIG.translate.endpoint) — recommended for production,
          2) Google's public web endpoint (no key, rate-limited; fine for previews and low traffic).
   Set T2O_CONFIG.translate.publicFallback = false to never call Google directly from the browser.
   Endpoint contract:  POST { q: string[], source: 'en', target: '<code>' }  →  { translations: string[] }
   (A plain JSON array is accepted too.) A sample Node proxy for Google Cloud Translation is in server/. */
import { CFG } from '../lib/config.js';

const TC = Object.assign({ endpoint: '', headers: {}, publicFallback: true, maxChars: 1600 }, CFG.translate || {});

async function viaEndpoint(texts, target) {
  const r = await fetch(TC.endpoint, {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, TC.headers),
    credentials: CFG.credentials,
    body: JSON.stringify({ q: texts, source: 'en', target }),
  });
  if (!r.ok) throw new Error('translate endpoint ' + r.status);
  const j = await r.json();
  const out = Array.isArray(j) ? j : j.translations || (j.data && j.data.translations && j.data.translations.map((x) => x.translatedText));
  if (!Array.isArray(out) || out.length !== texts.length) throw new Error('bad translate response');
  return out.map((x) => (typeof x === 'string' ? x : x && (x.text || x.translatedText)) || null);
}

const GURL = 'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=en&tl=';
async function gtx(text, target) {
  const r = await fetch(GURL + encodeURIComponent(target) + '&q=' + encodeURIComponent(text), { credentials: 'omit' });
  if (!r.ok) throw new Error('gtx ' + r.status);
  const j = await r.json();
  return (j[0] || []).map((x) => x[0] || '').join('');
}
/* Several strings go in one request, one per line; if the line count doesn't survive, fall back to one by one. */
async function viaPublic(texts, target) {
  const out = new Array(texts.length).fill(null), groups = [];
  let cur = [], len = 0;
  texts.forEach((t, i) => {
    const s = t.replace(/\s*\n\s*/g, ' ');
    if (cur.length && len + s.length > TC.maxChars) { groups.push(cur); cur = []; len = 0; }
    cur.push([i, s]); len += s.length + 1;
  });
  if (cur.length) groups.push(cur);
  await Promise.all(groups.map(async (g) => {
    const res = await gtx(g.map((x) => x[1]).join('\n'), target);
    const lines = res.split('\n');
    if (lines.length === g.length) { g.forEach(([i], k) => { out[i] = lines[k].trim(); }); return; }
    for (const [i, s] of g) { try { out[i] = (await gtx(s, target)).trim(); } catch (e) { /* leave null */ } }
  }));
  return out;
}

export const canTranslate = () => !!(TC.endpoint || TC.publicFallback);

export async function machineTranslate(texts, target) {
  if (TC.endpoint) {
    try { return await viaEndpoint(texts, target); } catch (e) { if (!TC.publicFallback) throw e; }
  }
  if (TC.publicFallback) return viaPublic(texts, target);
  throw new Error('no translation provider');
}
