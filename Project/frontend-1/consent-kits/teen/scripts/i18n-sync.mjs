// npm run i18n:sync
//   Keeps every translation file to exactly the keys English has:
//     • adds the strings from scripts/i18n-new-strings.mjs (new or reworded interface text),
//     • keeps every existing translation of a key English still has,
//     • drops keys English no longer has (the parent form and signature, for instance),
//     • rewrites each file in the English key order, one key per line.
//   Run `npm run i18n:check` afterwards.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const { default: EN } = await imp('src/i18n/strings/en.js');
const { SECTIONS, DECLARATION, ASSENT } = await imp('src/content/terms.js');
const { LANGUAGES } = await imp('src/i18n/languages.js');
const { default: NEW } = await imp('scripts/i18n-new-strings.mjs');

const ORDER = [...Object.keys(EN)];
for (const n of Object.keys(SECTIONS)) ORDER.push(`t${n}`, `s${n}`);
DECLARATION.forEach((_, i) => ORDER.push(`d${i + 1}`));
ASSENT.forEach((_, i) => ORDER.push(`a${i + 1}`));
const WANT = new Set(ORDER);

const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;

let changed = 0;
const rows = [];
for (const l of LANGUAGES) {
  if (l.code === 'en') continue;
  const file = `src/i18n/strings/${l.code}.js`;
  const mod = await imp(file).catch(() => ({ default: {} }));
  const cur = mod.default || {};
  const head = (await readFile(path.join(root, file), 'utf8')).split('\n')[0];
  const next = {};
  let added = 0;
  let dropped = 0;
  for (const k of ORDER) {
    const v = (NEW[l.code] && NEW[l.code][k]) || cur[k];
    if (v) next[k] = v;
    if (!cur[k] && v) added++;
  }
  for (const k of Object.keys(cur)) if (!WANT.has(k)) dropped++;
  const body = ORDER.filter((k) => next[k]).map((k) => `  ${/^[A-Za-z_$][\w$]*$/.test(k) ? k : q(k)}: ${q(next[k])},`).join('\n');
  const out = `${head.startsWith('//') ? head : `// ${l.native}`}\nexport default {\n${body}\n};\n`;
  await writeFile(path.join(root, file), out);
  const missing = ORDER.filter((k) => !next[k]);
  if (added || dropped) changed++;
  rows.push(`${l.code.padEnd(6)} ${String(Object.keys(next).length).padStart(3)}/${ORDER.length}${added ? `  +${added}` : ''}${dropped ? `  -${dropped}` : ''}${missing.length ? `  MISSING: ${missing.join(' ')}` : ''}`);
}
console.log(rows.join('\n'));
console.log(`\n${ORDER.length} keys in English · ${changed} file(s) updated`);
