// npm run build:preview → dist-preview/t2o-minor-consent-preview.html
// ONE self-contained file for review: opens from disk, all code, styles, fonts and images inlined, all 51
// languages and sounds included. Demo mode: sending is simulated (nothing leaves the browser) and a
// "Simulate verification" button stands in for the parent's confirmation link.
//
// The bundle is a CLASSIC script (IIFE), not an ES module: Safari, Firefox and several in-app file viewers
// refuse module scripts on file:// URLs, which would leave the reviewer with a blank page. Nothing else in the
// build uses this format — dist/ is still a code-split ES module.
import { build } from 'esbuild';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'dist-preview');
const pub = path.join(root, 'public');
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const uri = async (p) => `data:${MIME[path.extname(p)]};base64,${(await readFile(path.join(pub, p))).toString('base64')}`;

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
const res = await build({
  absWorkingDir: root,
  entryPoints: ['src/main.jsx'],
  bundle: true,
  splitting: false,
  format: 'iife',
  target: ['es2020'],
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  minify: true,
  legalComments: 'none',
  outdir: path.join(out, 'tmp'),
  write: false,
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [{ name: 'public', setup: (b) => b.onResolve({ filter: /^(fonts|brand)\// }, (a) => ({ path: a.path, external: true })) }],
  logLevel: 'warning',
});
let js = res.outputFiles.find((f) => f.path.endsWith('.js')).text;
let css = res.outputFiles.find((f) => f.path.endsWith('.css')).text;
for (const f of await readdir(path.join(pub, 'fonts'))) if (f.endsWith('.woff2')) css = css.split(`fonts/${f}`).join(await uri(`fonts/${f}`));
const assets = {};
for (const f of await readdir(path.join(pub, 'brand'))) if (f.endsWith('.webp')) assets[`brand/${f}`] = await uri(`brand/${f}`);

// country flags: the 51 language flags, the 3D scene's flags and every other flag under 7 KB (the heavier ones load from
// flags/ in the real build). Anything missing simply hides itself.
const NEED = new Set(['in','us','gb','au','ca','de','fr','br','jp','ae','sg','za', ...(await readFile(path.join(root, 'src/i18n/languages.js'), 'utf8')).matchAll(/flag: '(\w+)'/g)].map((m) => (Array.isArray(m) ? m[1] : m)));
for (const f of await readdir(path.join(pub, 'flags'))) {
  if (!f.endsWith('.svg')) continue;
  const code = f.slice(0, -4);
  const buf = await readFile(path.join(pub, 'flags', f));
  if (NEED.has(code) || buf.length < 7000) assets[`flags/${f}`] = `data:image/svg+xml;base64,${buf.toString('base64')}`;
}

// shown only if the script never runs (JavaScript switched off, or a viewer that blocks inline scripts)
const FALLBACK = `<div id="t2o-fallback" style="font:16px/1.6 system-ui,sans-serif;max-width:620px;margin:12vh auto;padding:0 24px;color:#0e1530">
<h1 style="font-size:22px;margin:0 0 10px">Turn2Opinion — teen participation agreement (preview)</h1>
<p>This preview needs JavaScript. If you are seeing this inside a document viewer or an email, save the file to your computer and open it in a browser (Chrome, Edge, Safari or Firefox).</p></div>`;

let html = await readFile(path.join(root, 'index.html'), 'utf8');
html = html
  .replace(/<link rel="(?:icon|apple-touch-icon|preload)"[^>]*>\s*/g, '')
  .replace('<script>window.T2O_MINOR = window.T2O_MINOR || {};</script>', () =>
    `<script>window.T2O_MINOR = { demo: true, member: { id: 'P-DEMO-0015', firstName: 'Aarav', age: 15, country: 'IN' }, continueUrl: '', logoutUrl: '' };window.__T2O_MINOR_ASSETS = ${JSON.stringify(assets)};</script>`)
  .replace('<!--app-css-->', () => `<link rel="icon" type="image/png" href="${assets['brand/t2o-mark.webp']}" />\n    <style>${css}</style>`)
  .replace(' data-prerendered="1"><!--app-html-->', `>${FALLBACK}`)
  .replace('<!--app-js-->', () => `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>`)
  .replace('<title>Teen research terms & parental consent — Turn2Opinion</title>', '<title>Teen research terms & parental consent — Turn2Opinion (preview)</title>');
const file = path.join(out, 't2o-minor-consent-preview.html');
await writeFile(file, html);
console.log(`Preview: ${path.relative(root, file)} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB)`);
