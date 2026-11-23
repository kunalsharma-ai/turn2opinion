// Builds ONE self-contained preview HTML (JS, CSS, fonts, images, flags inlined; hash routing; demo mode).
// usage: npm run preview:single   (writes preview/turn2opinion-preview.html)
// Uses esbuild, which is installed with Vite. For sharing a design preview only – never deploy this file.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
const proj = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(proj, process.argv[2] || 'preview/turn2opinion-preview.html');
mkdirSync(dirname(out), { recursive: true });
const env = { BASE_URL: './', MODE: 'production', PROD: true, DEV: false, SSR: false, VITE_SITE_URL: 'https://www.turn2opinion.com', VITE_ROUTER_MODE: 'hash', VITE_DEMO_MODE: 'true' };
const envPlugin = { name: 'asset-map', setup(b) {
  // Vite's `?inline` CSS import (member area): hand back the stylesheet text as a string.
  b.onResolve({ filter: /\?inline$/ }, (a) => ({ path: resolve(a.resolveDir, a.path.replace(/\?inline$/, '')), namespace: 'inline-css' }));
  b.onLoad({ filter: /.*/, namespace: 'inline-css' }, (a) => ({ contents: readFileSync(a.path, 'utf8'), loader: 'text' }));
  b.onLoad({ filter: /src[\/\\]config[\/\\]env\.js$/ }, (a) => {
    let s = readFileSync(a.path, 'utf8');
    s = s.replace(/export function asset\(path\) \{/, "export function asset(path) {\n  const __m = (typeof globalThis !== 'undefined' && globalThis.__T2O_ASSETS) || {};\n  const __k = '/' + String(path).replace(/^\\.?\\//, '');\n  if (__m[__k]) return __m[__k];");
    return { contents: s, loader: 'js' };
  });
  // The approved consent pages: bundled in (no separate host.js in a single file); their CSS is imported as text.
  b.onLoad({ filter: /src[\/\\]components[\/\\]onboarding[\/\\]ConsentKit\.jsx$/ }, (a) => {
    const kits = join(proj, 'consent-kits');
    const s = readFileSync(a.path, 'utf8').replace(/import\(\/\* @vite-ignore \*\/ asset\([^;]*\)\);/, () =>
      `({ consumer: () => import(${JSON.stringify(join(kits, 'consumer/src/host.jsx'))}), pro: () => import(${JSON.stringify(join(kits, 'pro/src/host.jsx'))}), teen: () => import(${JSON.stringify(join(kits, 'teen/src/host.jsx'))}) })[kind]();`);
    return { contents: s, loader: 'jsx' };
  });
  b.onLoad({ filter: /consent-kits[\/\\].*\.css$/ }, (a) => ({ contents: readFileSync(a.path, 'utf8'), loader: 'text' }));
  // esbuild has no import.meta.glob: expand each glob into a literal map of lazy imports.
  b.onLoad({ filter: /src[\/\\]i18n[\/\\]engine\.js$/ }, (a) => {
    const dir = dirname(a.path);
    const s = readFileSync(a.path, 'utf8').replace(/import\.meta\.glob\('\.\/(\w+)\/\*\.(\w+)'\)/g, (_, sub, ext) => {
      const files = readdirSync(join(dir, sub)).filter((f) => f.endsWith('.' + ext));
      return '{' + files.map((f) => `'./${sub}/${f}': () => import('./${sub}/${f}')`).join(',') + '}';
    });
    return { contents: s, loader: 'js', resolveDir: dir };
  });
} };
// MEMBER=1: the dashboard-only preview (src/member/preview-entry.jsx) with just the images it uses.
const MEMBER = process.env.MEMBER === '1';
const r = await build({ entryPoints: [join(proj, MEMBER ? 'src/member/preview-entry.jsx' : 'src/entry-client.jsx')], bundle: true, write: false, outdir: '/tmp/x', format: 'esm', splitting: false, minify: true, jsx: 'automatic', target: 'es2020', loader: { '.js': 'jsx' }, external: ['/fonts/*'], plugins: [envPlugin],
  define: { 'import.meta.env': JSON.stringify(env), 'process.env.NODE_ENV': '"production"' }, logLevel: 'warning' });
let js = r.outputFiles.find((f) => f.path.endsWith('.js')).text;
let css = r.outputFiles.find((f) => f.path.endsWith('.css')).text;
const pub = join(proj, 'public');
const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff': 'font/woff' };
const dataUri = (p) => { const e = extname(p); const buf = readFileSync(p);
  return e === '.svg' ? `data:image/svg+xml,${encodeURIComponent(buf.toString('utf8').replace(/\s+/g, ' '))}` : `data:${mime[e]};base64,${buf.toString('base64')}`; };
const map = {};
const walk = (d, rel) => { for (const n of readdirSync(d)) { const p = join(d, n), r2 = rel + '/' + n;
  if (statSync(p).isDirectory()) walk(p, r2); else if (mime[extname(n)] && !/og\//.test(r2) && extname(n) !== '.woff') map[r2] = dataUri(p); } };
walk(join(pub, 'flags'), '/flags');
if (MEMBER) walk(join(pub, 'images', 'brand'), '/images/brand');
else walk(join(pub, 'images'), '/images');
css = css.replace(/url\((["']?)\/fonts\/([^)"']+)\1\)/g, (_, q, f) => `url(${dataUri(join(pub, 'fonts', f))})`);
// the consent pages resolve brand/, fonts/ and flags/ through their own asset maps (see consent-kits/*/src/assets.js)
const kitMaps = {};
if (!MEMBER) {
  const kitMime = { ...mime, '.woff2': 'font/woff2' };
  for (const [kind, key] of [['consumer', '__T2O_CONSENT_ASSETS'], ['pro', '__T2O_PRO_ASSETS'], ['teen', '__T2O_MINOR_ASSETS']]) {
    const m = (kitMaps[key] = {});
    const kp = join(proj, 'consent-kits', kind, 'public');
    const w2 = (d, rel) => { for (const n of readdirSync(d)) { const p2 = join(d, n), r2 = rel ? rel + '/' + n : n;
      if (statSync(p2).isDirectory()) w2(p2, r2); else if (kitMime[extname(n)] && /^(brand|fonts|flags)\//.test(r2) && !/\.png$/.test(n)) {
        const e = extname(n); m[r2] = e === '.svg' ? dataUri(p2) : `data:${kitMime[e]};base64,${readFileSync(p2).toString('base64')}`; } } };
    w2(kp, '');
  }
}
const icon = dataUri(join(pub, 'favicon.svg'));
const safe = (s) => s.replace(/<\/(script|style)/gi, '<\\/$1');
const html = `<!doctype html>
<html lang="en" data-router="hash">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0E1B4D" />
<meta name="robots" content="noindex" />
<title>${MEMBER ? 'Turn2Opinion – Member Dashboard Preview' : 'Turn2Opinion – Website Preview'}</title>
<link rel="icon" href="${icon}" />
<!-- Self-contained PREVIEW build (demo mode, hash routing). Not for deployment: deploy dist/client from "npm run build". -->
<script>try{if(JSON.parse(localStorage.getItem('t2o_mode'))==='dark')document.documentElement.setAttribute('data-mode','dark')}catch(e){}</script>
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!document.documentElement.classList.contains('js-ready'))document.documentElement.classList.remove('js')},5000);</script>
<style>${safe(css)}</style>
<script>window.__T2O_ASSETS=${safe(JSON.stringify(map))};</script>${Object.entries(kitMaps).map(([k, m]) => `<script>window.${k}=${safe(JSON.stringify(m))};</script>`).join('')}
</head>
<body>
<div id="root"></div>
<script type="module">${safe(js)}</script>
</body>
</html>`;
writeFileSync(out, html);
console.log('wrote', out, (html.length / 1048576).toFixed(2) + ' MB', 'assets', Object.keys(map).length);
