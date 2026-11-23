// npm run build:consent-kits
//
// Builds the three approved consent pages (consent-kits/<kind>/, React source as delivered, plus the small
// Turn2Opinion host hooks listed in consent-kits/README.md) into public/consent-kit/<kind>/:
//   host.js            ES module: mount(element, config) -> unmount   (src/host.jsx)
//   c-*.js             code-split chunks (one per translated language, sounds, ...)
//   brand/ fonts/ ...  the package's public files (resolved through config.assetBase)
// The output is committed, so the site's normal build needs nothing extra. Run this after changing a kit.
import { build } from 'esbuild';
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const KITS = ['consumer', 'pro', 'teen'];
const PUBLIC_DIRS = ['brand', 'fonts', 'flags', 'icons', 'images'];
const only = process.argv.slice(2).filter((a) => KITS.includes(a));

for (const kind of only.length ? only : KITS) {
  const kit = path.join(root, 'consent-kits', kind);
  const out = path.join(root, 'public', 'consent-kit', kind);
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  const t0 = Date.now();
  await build({
    absWorkingDir: kit,
    entryPoints: { host: 'src/host.jsx' },
    bundle: true,
    splitting: true,
    format: 'esm',
    outdir: out,
    entryNames: '[name]',
    chunkNames: 'c-[hash]',
    jsx: 'automatic',
    target: ['es2020'],
    loader: { '.js': 'jsx', '.css': 'text' },
    define: { 'process.env.NODE_ENV': '"production"' },
    plugins: [{ name: 'public-urls', setup: (b) => b.onResolve({ filter: /^(fonts|brand)\// }, (a) => ({ path: a.path, external: true })) }],
    minify: true,
    legalComments: 'none',
    logLevel: 'warning'
  });
  for (const d of PUBLIC_DIRS) {
    const src = path.join(kit, 'public', d);
    try {
      await stat(src);
      await cp(src, path.join(out, d), { recursive: true });
    } catch {
      /* this kit has no such folder */
    }
  }
  const size = (await stat(path.join(out, 'host.js'))).size;
  const files = (await readdir(out)).length;
  console.log(`consent-kit/${kind}: host.js ${(size / 1024).toFixed(0)} KB, ${files} entries, ${Date.now() - t0} ms`);
}
