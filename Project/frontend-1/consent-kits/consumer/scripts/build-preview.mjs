// npm run build:preview → dist-preview/t2o-consent-preview.html
// ONE self-contained file for review: opens from disk, all code, styles, fonts and images inlined, all 51
// languages and sounds included. Demo mode: "I agree" is simulated (nothing is sent anywhere).
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
  format: 'esm',
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
for (const f of await readdir(path.join(pub, 'brand'))) if (f.endsWith('.webp') || f === 'turn2opinion-mark-192.png') assets[`brand/${f}`] = await uri(`brand/${f}`);

let html = await readFile(path.join(root, 'index.html'), 'utf8');
html = html
  .replace(/<link rel="(?:icon|apple-touch-icon|preload)"[^>]*>\s*/g, '')
  .replace('<script>window.T2O_CONSENT = window.T2O_CONSENT || {};</script>', () =>
    `<script>window.T2O_CONSENT = { demo: true, member: { id: 'DEMO-001', firstName: 'Priya' }, continueUrl: '', logoutUrl: '' };window.__T2O_CONSENT_ASSETS = ${JSON.stringify(assets)};</script>`)
  .replace('<!--app-css-->', () => `<link rel="icon" type="image/png" href="${assets['brand/turn2opinion-mark-192.png']}" />\n    <style>${css}</style>`)
  .replace(' data-prerendered="1"><!--app-html-->', '>')
  .replace('<!--app-js-->', () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`)
  .replace('<title>Your panel agreement — Turn2Opinion</title>', '<title>Your panel agreement — Turn2Opinion (preview)</title>');
const file = path.join(out, 't2o-consent-preview.html');
await writeFile(file, html);
console.log(`Preview: ${path.relative(root, file)} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB)`);
