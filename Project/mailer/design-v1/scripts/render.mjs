/**
 * Shared render pipeline used by build.mjs and preview.mjs.
 *
 * Bundles the JSX tree with esbuild, imports it, and renders each mailer to a string
 * in either 'html' (sample data) or 'liquid' (merge tags) mode.
 */
import { build as esbuild } from 'esbuild';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const DIST = path.join(ROOT, 'dist');

export const DOCTYPE =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ' +
  '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'" };

/**
 * Tidy React's output:
 *   1. drop the <t2o-raw> carriers used to inject VML and conditional comments
 *   2. in liquid mode, un-escape entities INSIDE Liquid tags only — React escapes
 *      `>` and `"`, which would otherwise break {% if x > 0 %} and | default: "y"
 *   3. re-attach the doctype, which React will not emit
 */
export function clean(html, { liquid = false } = {}) {
  let s = html.replace(/<\/?t2o-raw>/g, '')
    .replace(/ xmlnsv=/g, ' xmlns:v=').replace(/ xmlnso=/g, ' xmlns:o=');
  if (liquid) {
    s = s.replace(/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/g, (t) =>
      t.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;|&#39;/g, (e) => ENT[e]));
  }
  if (!s.startsWith('<!DOCTYPE')) s = `${DOCTYPE}\n${s}`;
  return s;
}

/**
 * Bundle + import the mailer registry.
 * The bundle is written inside the package (not os.tmpdir) so that `react` and
 * `react-dom`, which stay external, still resolve against ./node_modules.
 *
 * @param {string} [assetBase] value for T2O_ASSET_BASE, read by src/lib/theme.js
 */
export async function loadEmails(assetBase) {
  if (assetBase) process.env.T2O_ASSET_BASE = assetBase;
  else delete process.env.T2O_ASSET_BASE;

  await fs.mkdir(path.join(ROOT, '.build'), { recursive: true });
  const out = path.join(ROOT, '.build', `mailers-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.mjs`);
  await esbuild({
    entryPoints: [path.join(ROOT, 'src', 'index.js')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    jsx: 'automatic',
    outfile: out,
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    logLevel: 'warning',
  });
  const mod = await import(path.resolve(out));
  return { ...mod, _bundlePath: out };
}

/** Render every mailer in one mode. Returns [{ meta, body }]. */
export async function renderAll({ mode = 'html', assetBase } = {}) {
  const { EMAILS, setMode, _bundlePath } = await loadEmails(assetBase);
  setMode(mode);
  const out = EMAILS.map(({ meta, Component }) => ({
    meta,
    body: clean(renderToStaticMarkup(React.createElement(Component)), { liquid: mode === 'liquid' }),
  }));
  setMode('html');
  await fs.unlink(_bundlePath).catch(() => {});
  return out;
}
