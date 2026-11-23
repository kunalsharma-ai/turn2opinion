/**
 * Parse and render every generated .liquid and .txt against payloads shaped like the
 * real call sites. Catches unbalanced tags, unknown filters and unresolved output
 * before the ESP does. Also renders the lifecycle templates at several profile counts
 * so every branch of the kingdom-level logic is exercised.
 */
import { Liquid } from 'liquidjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { DIST } from './render.mjs';
import { SAMPLE, TICKET_SAMPLE, isTicket } from './samples.mjs';

const engine = new Liquid({ strictFilters: true, strictVariables: false });
let bad = 0;

async function lintDir(dir, ext) {
  const full = path.join(DIST, dir);
  const files = (await fs.readdir(full)).filter((f) => f.endsWith(ext)).sort();
  console.log(`\n  ${dir}/`);
  for (const f of files) {
    const src = await fs.readFile(path.join(full, f), 'utf8');
    const counts = f.startsWith('case') ? [0, 1, 4, 9, 17, 27, 36, 37] : [null];
    try {
      let size = 0;
      for (const n of counts) {
        const data = isTicket(f) ? TICKET_SAMPLE : (n === null ? SAMPLE : { ...SAMPLE, profile: { ...SAMPLE.profile, completed_count: n } });
        const out = await engine.parseAndRender(src, data);
        const left = out.match(/\{\{|\{%/g);
        if (left) throw new Error(`${left.length} unresolved tag(s) at count ${n}`);
        size = Buffer.byteLength(out);
      }
      console.log(`    ok ${f.padEnd(34)} ${(size / 1024).toFixed(1)} KB${counts.length > 1 ? `  (${counts.length} profile states)` : ''}`);
    } catch (e) {
      bad += 1;
      console.log(`    x  ${f.padEnd(34)} ${e.message.split('\n')[0]}`);
    }
  }
}

await lintDir('liquid', '.liquid');
await lintDir('text', '.txt');
console.log(bad ? `\n  ${bad} file(s) failed\n` : '\n  All templates and text parts OK\n');
process.exit(bad ? 1 : 0);
