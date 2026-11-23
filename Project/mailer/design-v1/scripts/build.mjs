/**
 * Build every template into the four artefacts a real deployment needs:
 *
 *   dist/html/<id>.html      sample-data render (inbox + Litmus testing)
 *   dist/liquid/<id>.liquid  Liquid template for the ESP
 *   dist/text/<id>.txt       plain-text alternative (Liquid merge tags included)
 *   dist/manifest.json       subjects, preheaders, CTAs, a11y + compat notes
 *
 *   node scripts/build.mjs [--only=html|liquid|text] [--assets=<base-url>]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { DIST, renderAll, loadEmails } from './render.mjs';

const arg = (k) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').split('=')[1];
const only = arg('only');
const assetBase = arg('assets');

const banner = (m) => `{%- comment -%}
===============================================================================
  Turn2Opinion — email system v1 ("the conversation")
  -----------------------------------------------------------------------------
  Template   : ${m.code}. ${m.name}
  File       : ${m.id}.liquid
  Class      : ${m.kind}${m.transactional ? ' (transactional — no unsubscribe)' : ' (marketing — unsubscribe required)'}
  Trigger    : ${m.trigger}
  Tone       : ${m.tone}
  Replaces   : ${m.source || '—'}

  SUBJECT LINES — pick one, or A/B them
${m.subjects.map((s, i) => `    ${i + 1}. ${s}`).join('\n')}

  PREHEADER
    ${m.preheader}

  PRIMARY CTA
    ${m.cta ? `${m.cta.label}  ->  ${m.cta.dest}` : 'none — this template asks for nothing'}

  PLAIN-TEXT ALTERNATIVE
    dist/text/${m.id}.txt — send as the text/plain part of a multipart message.
    HTML-only mail is scored down by most spam filters.

  Generated from react/src/emails/${m.file} — edit the JSX and re-run
  \`npm run build\`. Hand edits to this file are overwritten.

  Images are served from the base configured at build time; upload assets/
  there before sending. Serve over HTTPS from a stable path — clients do not
  retry a 404, so a moved asset breaks every copy already delivered.
===============================================================================
{%- endcomment -%}
`;

async function main() {
  for (const d of ['html', 'liquid', 'text']) {
    await fs.mkdir(path.join(DIST, d), { recursive: true });
  }

  const manifest = [];

  if (only !== 'liquid' && only !== 'text') {
    for (const { meta, body } of await renderAll({ mode: 'html', assetBase })) {
      await fs.writeFile(path.join(DIST, 'html', `${meta.id}.html`), body, 'utf8');
      manifest.push({ ...meta, bytes: Buffer.byteLength(body) });
    }
  }

  if (only !== 'html' && only !== 'text') {
    for (const { meta, body } of await renderAll({ mode: 'liquid', assetBase })) {
      await fs.writeFile(path.join(DIST, 'liquid', `${meta.id}.liquid`),
        banner(meta) + body, 'utf8');
    }
  }

  // plain text: rendered in liquid mode so the text part carries the same merge tags
  if (only !== 'html' && only !== 'liquid') {
    const { EMAILS, setMode, _bundlePath } = await loadEmails(assetBase);
    setMode('liquid');
    for (const { meta, text } of EMAILS) {
      if (typeof text !== 'function') continue;
      await fs.writeFile(path.join(DIST, 'text', `${meta.id}.txt`),
        `${text().trim()}\n`, 'utf8');
    }
    setMode('html');
    await fs.unlink(_bundlePath).catch(() => {});
  }

  if (manifest.length) {
    await fs.writeFile(path.join(DIST, 'manifest.json'),
      JSON.stringify(manifest, null, 2), 'utf8');
  }

  const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
  console.log(`\nBuilt ${manifest.length} Turn2Opinion templates`);
  console.log(`Assets base: ${assetBase || process.env.T2O_ASSET_BASE || 'default (theme.js)'}\n`);
  for (const m of manifest) {
    // Gmail clips past ~102KB and hides the remainder behind "View entire message"
    const warn = m.bytes > 102400 ? '  ** over Gmail 102KB clip **' : '';
    console.log(`  ${m.code.padEnd(4)} ${m.name.padEnd(34)} ${kb(m.bytes).padStart(9)}  ${m.kind}${warn}`);
  }
  console.log('');
}

main().catch((e) => { console.error(e); process.exit(1); });
