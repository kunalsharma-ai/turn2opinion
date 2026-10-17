// Content QA for blogs: word count (1500–2000 incl. FAQs), internal + external links, FAQs,
// and that every post in src/data/blog/index.js has a matching body file and loader.
// Usage: npm run check:content
import { readdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const { BLOG_POSTS } = await import(pathToFileURL(resolve(root, 'src/data/blog/index.js')).href);
const loaders = readFileSync(resolve(root, 'src/data/blog/loaders.js'), 'utf8');
const files = new Set(readdirSync(resolve(root, 'src/data/blog/posts')).map((f) => f.replace(/\.js$/, '')));

const words = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#>*|_-]/g, ' ').split(/\s+/).filter(Boolean).length;
let problems = 0;
const rows = [];
for (const p of BLOG_POSTS) {
  const issues = [];
  if (!files.has(p.slug)) issues.push('missing body file');
  if (!loaders.includes(`'${p.slug}'`)) issues.push('missing loader');
  let body = '';
  let faqs = [];
  try {
    const mod = await import(pathToFileURL(resolve(root, `src/data/blog/posts/${p.slug}.js`)).href);
    body = mod.default.body;
    faqs = mod.default.faqs || [];
  } catch (e) {
    issues.push('cannot import: ' + e.message);
  }
  const total = words(body) + faqs.reduce((n, f) => n + words(f.q + ' ' + f.a), 0);
  const internal = (body.match(/\]\(\/[^)]*\)/g) || []).length;
  const external = (body.match(/\]\(https?:\/\/[^)]*\)/g) || []).length;
  if (total < 1500 || total > 2000) issues.push(`word count ${total}`);
  if (internal < 3) issues.push(`only ${internal} internal links`);
  if (external < 2) issues.push(`only ${external} external links`);
  if (faqs.length < 4) issues.push(`only ${faqs.length} FAQs`);
  const missingKw = p.keywords.filter((k) => !(body.toLowerCase() + p.title.toLowerCase()).includes(k.toLowerCase().split(' ').slice(0, 3).join(' ')));
  if (missingKw.length > 2) issues.push('keywords barely used: ' + missingKw.join(', '));
  rows.push(`${issues.length ? '✗' : '✓'} ${String(total).padStart(4)}w  int:${internal} ext:${external} faq:${faqs.length}  ${p.slug}${issues.length ? '  -> ' + issues.join('; ') : ''}`);
  problems += issues.length ? 1 : 0;
}
console.log(rows.join('\n'));
console.log(problems ? `\n${problems} post(s) need attention` : `\nAll ${BLOG_POSTS.length} posts pass`);
process.exitCode = problems ? 1 : 0;
