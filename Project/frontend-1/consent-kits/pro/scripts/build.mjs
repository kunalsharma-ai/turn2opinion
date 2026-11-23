// npm run build  → dist/
//
//   dist/index.html          standalone page, prerendered in English (fast first paint), CSS inlined, JS deferred
//   dist/assets/*.js         page code (+ one small chunk per translated language and one for the language sounds)
//   dist/embed/t2o-pro-consent.js   ONE file for pasting into your logged-in app (renders in a Shadow DOM, CSS inside)
//   dist/brand, fonts, favicon*  public files (also used by the embed via T2O_PRO_CONSENT.assetBase)
//   *.br / *.gz              pre-compressed copies for the web server
//
// Flags: --dev (unminified, no compression)
import { build } from 'esbuild';
import { cp, mkdir, readFile, readdir, rm, writeFile, stat } from 'node:fs/promises';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const dev = process.argv.includes('--dev');
const t0 = Date.now();
const define = { 'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production') };
// font URLs in CSS stay relative to the page (served from dist/fonts)
const publicUrls = { name: 'public-urls', setup: (b) => b.onResolve({ filter: /^(fonts|brand)\// }, (a) => ({ path: a.path, external: true })) };
const common = { absWorkingDir: root, plugins: [publicUrls], bundle: true, jsx: 'automatic', target: ['es2020'], loader: { '.js': 'jsx' }, define, legalComments: 'none', logLevel: 'warning' };

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'public'), dist, { recursive: true });
await cp(path.join(root, 'examples/embed-example.html'), path.join(dist, 'embed-example.html'));

/* 1. standalone page bundle (code-split: languages + sounds load on demand) */
const client = await build({
  ...common,
  entryPoints: { app: "src/main.jsx" },
  splitting: true,
  format: 'esm',
  outdir: path.join(dist, 'assets'),
  entryNames: '[name]-[hash]',
  chunkNames: 'c-[hash]',
  minify: !dev,
  metafile: true,
  write: true,
});
const outs = client.metafile.outputs;
const entry = Object.keys(outs).find((f) => outs[f].entryPoint === 'src/main.jsx');
const cssFile = outs[entry].cssBundle;
const css = await readFile(path.join(root, cssFile), 'utf8');
await rm(path.join(root, cssFile)); // inlined below
const rel = (f) => path.relative(dist, path.join(root, f)).split(path.sep).join('/');
const preloads = outs[entry].imports.filter((i) => i.kind === 'import-statement').map((i) => rel(i.path));

/* 2. prerender the English page */
const ssrOut = path.join(root, '.build/ssr.mjs');
await build({ ...common, entryPoints: ['src/entry-server.jsx'], platform: 'node', format: 'esm', outfile: ssrOut, loader: { '.js': 'jsx', '.css': 'empty' }, external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'] });
const { render } = await import(pathToFileURL(ssrOut).href + `?t=${Date.now()}`);
const appHtml = render();
await rm(path.join(root, '.build'), { recursive: true, force: true });

// language code → its text chunk, so the boot script can preload it in parallel with the app code
const langChunks = {};
for (const [f, o] of Object.entries(outs)) {
  for (const inp of Object.keys(o.inputs || {})) {
    const m = /src\/i18n\/strings\/([\w-]+)\.js$/.exec(inp);
    if (m && m[1] !== 'en' && f.endsWith('.js')) {
      if (m[1] === 'essential') { const { ESSENTIAL } = await import(pathToFileURL(path.join(root, 'src/i18n/strings/essential.js')).href); for (const code of Object.keys(ESSENTIAL)) langChunks[code] = rel(f); }
      else langChunks[m[1]] = rel(f);
    }
  }
}
let html = await readFile(path.join(root, 'index.html'), 'utf8');
html = html
  .replace('/*LANG_CHUNKS*/{}', () => JSON.stringify(langChunks))
  .replace('<!--app-css-->', () => `<style>${css}</style>`)
  .replace('<!--app-html-->', () => appHtml)
  .replace('<!--app-js-->', () => `${preloads.map((p) => `<link rel="modulepreload" href="${p}" />`).join('\n    ')}\n    <script type="module" src="${rel(entry)}"></script>`);
await writeFile(path.join(dist, 'index.html'), html);

/* 3. embed bundle — one classic script, CSS as text inside */
await build({
  ...common,
  entryPoints: ['src/embed.jsx'],
  format: 'iife',
  outfile: path.join(dist, 'embed/t2o-pro-consent.js'),
  minify: !dev,
  loader: { '.js': 'jsx', '.css': 'text' },
});
// minify the CSS text inside the embed (esbuild 'text' keeps it verbatim)
{
  const f = path.join(dist, 'embed/t2o-pro-consent.js');
  await writeFile(path.join(dist, 'embed/README.txt'), 'Embed: see README.md → "Integration → B. Embed in your app". Set T2O_PRO_CONSENT.assetBase to the URL of this dist/ folder.\n');
  void f;
}

/* 4. pre-compressed copies */
let n = 0;
if (!dev) {
  const walk = async (dir) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (/\.(html|js|css|svg|json|txt)$/.test(e.name) && (await stat(p)).size > 1024) {
        const buf = await readFile(p);
        await writeFile(`${p}.br`, brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }));
        await writeFile(`${p}.gz`, gzipSync(buf, { level: 9 }));
        n++;
      }
    }
  };
  await walk(dist);
}
const kb = async (f) => ((await stat(f)).size / 1024).toFixed(0);
const br = async (f) => { try { return ((await stat(`${f}.br`)).size / 1024).toFixed(0); } catch { return '-'; } };
console.log(
  `Built in ${((Date.now() - t0) / 1000).toFixed(1)}s → dist/index.html ${await kb(path.join(dist, 'index.html'))} KB (br ${await br(path.join(dist, 'index.html'))}) · app ${await kb(path.join(root, entry))} KB (br ${await br(path.join(root, entry))}) · embed ${await kb(path.join(dist, 'embed/t2o-pro-consent.js'))} KB · ${n} files compressed`
);
