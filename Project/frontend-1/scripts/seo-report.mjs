// Builds docs/seo-master-sheet.csv from the prerendered HTML in dist/client:
// URL, title, meta description, H1 count/text, canonical, robots, JSON-LD types, internal links, word count.
// Usage: npm run build && npm run seo:report
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const dir = resolve(process.argv[2] || 'dist/client');
const out = resolve(process.argv[3] || 'docs/seo-master-sheet.csv');
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') files.push(p);
  }
})(dir);

const pick = (re, s) => ((s.match(re) || [])[1] || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
const rows = [['URL', 'Title', 'Title length', 'Meta description', 'Desc length', 'H1 count', 'H1', 'Canonical', 'Robots', 'Schema types', 'Internal links', 'Words']];
for (const f of files.sort()) {
  const html = readFileSync(f, 'utf8');
  const url = '/' + relative(dir, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const title = pick(/<title>([^<]*)<\/title>/, html);
  const desc = pick(/<meta name="description" content="([^"]*)"/, html);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]).replace(/\s+/g, ' ').trim());
  const types = [...html.matchAll(/"@type":"(\w+)"/g)].map((m) => m[1]).filter((t, i, a) => a.indexOf(t) === i && !['ListItem', 'Question', 'Answer', 'PostalAddress', 'ContactPoint'].includes(t));
  const links = new Set([...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]).filter((h) => !/\.(css|js|png|svg|ico|webmanifest|woff)$/.test(h)));
  const words = strip(html.split('<main')[1] || '').split(/\s+/).filter(Boolean).length;
  rows.push([url, title, title.length, desc, desc.length, h1s.length, h1s[0] || '', pick(/<link rel="canonical" href="([^"]*)"/, html), pick(/<meta name="robots" content="([^"]*)"/, html), types.join(' '), links.size, words]);
}
mkdirSync(resolve(out, '..'), { recursive: true });
writeFileSync(out, rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n') + '\n');
const problems = rows.slice(1).filter((r) => r[5] !== 1 || !r[1] || !r[3] || !r[7]);
console.log(`[seo-report] ${rows.length - 1} pages -> ${out}`);
console.log(problems.length ? `Pages needing attention: ${problems.map((r) => r[0]).join(', ')}` : 'Every page has exactly one H1, a title, a description and a canonical.');
const titles = rows.slice(1).map((r) => r[1]);
const dupes = titles.filter((t, i) => titles.indexOf(t) !== i);
console.log(dupes.length ? `Duplicate titles: ${dupes.join(' | ')}` : 'All titles unique.');
