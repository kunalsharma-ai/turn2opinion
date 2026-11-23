/**
 * Local preview server.
 *
 *   npm run serve        ->  http://localhost:4300
 *
 * Renders on every request, so editing a .jsx and refreshing the browser shows the
 * change with no rebuild step. Assets are served from ../assets, so the local
 * renders use the real images.
 *
 *   /                      the studio preview (built on demand)
 *   /m/:id                 one mailer as HTML, sample data
 *   /m/:id.liquid          one mailer as a Liquid template (text/plain)
 *   /assets/*              the image assets
 */
import express from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';
import { ROOT, renderAll } from './render.mjs';

const PORT = process.env.PORT || 4300;
const ASSET_DIR = path.resolve(ROOT, '..', 'assets');
const app = express();

app.use('/assets', express.static(ASSET_DIR));

const render = (mode) => renderAll({ mode, assetBase: '/assets' });

app.get('/', async (_req, res) => {
  const list = await render('html');
  res.type('html').send(`<!DOCTYPE html><html><head><meta charset="utf-8">
<title>T2O mailers — dev</title>
<style>
 body{font:15px/1.6 system-ui,sans-serif;background:#F3F6FF;color:#0E1B4D;margin:0;padding:40px 24px}
 h1{font-size:24px;margin:0 0 6px} p.l{color:#56618C;margin:0 0 28px}
 ul{list-style:none;padding:0;max-width:760px;margin:0}
 li{margin:0 0 9px;background:#fff;border:1px solid #E1E6F5;
    border-radius:12px;padding:14px 16px;display:flex;gap:14px;align-items:center}
 a{color:#1F5BFF;text-decoration:none;font-weight:700}
 a:hover{text-decoration:underline}
 small{color:#56618C;display:block;margin-top:2px}
 .sp{flex:1;min-width:0}
</style></head><body>
<h1>Turn2Opinion mailers</h1>
<p class="l">Rendered live from <code>src/emails/*.jsx</code>. Edit and refresh.</p>
<ul>${list.map(({ meta }) => `<li>
  <div class="sp"><a href="/m/${meta.id}">${meta.name}</a> — ${meta.code} · ${meta.kind}
  <small>${meta.trigger}</small></div>
  <a href="/m/${meta.id}.liquid">liquid</a>
</li>`).join('')}</ul>
</body></html>`);
});

app.get('/m/:id.liquid', async (req, res) => {
  const hit = (await render('liquid')).find((x) => x.meta.id === req.params.id);
  if (!hit) return res.status(404).type('text').send('No such mailer');
  res.type('text/plain; charset=utf-8').send(hit.body);
});

app.get('/m/:id', async (req, res) => {
  const hit = (await render('html')).find((x) => x.meta.id === req.params.id);
  if (!hit) return res.status(404).type('text').send('No such mailer');
  res.type('html').send(hit.body);
});

app.listen(PORT, () => {
  console.log(`\n  T2O mailer dev server  →  http://localhost:${PORT}\n`);
});
