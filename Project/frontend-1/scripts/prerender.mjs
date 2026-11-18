// Static prerendering (SSG): writes one fully-rendered HTML file per route so search engines
// receive real content, unique <title>, meta description, canonical, Open Graph and JSON-LD
// for every URL. Also generates sitemap.xml and robots.txt from the route table.
//
// Usage (run by `npm run build`):  node scripts/prerender.mjs [clientDir] [serverEntry]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = resolve(root, process.argv[2] || 'dist/client');
const serverEntry = resolve(root, process.argv[3] || 'dist/server/entry-server.js');

if (!existsSync(join(clientDir, 'index.html')) || !existsSync(serverEntry)) {
  console.error('[prerender] Missing build output. Run "npm run build:client" and "npm run build:server" first.');
  process.exit(1);
}

const template = readFileSync(join(clientDir, 'index.html'), 'utf8');
// The template is the fresh Vite output. Prerendering overwrites it with the home page, so a second
// run without a new client build would stamp the home page onto every route: stop instead.
if (!template.includes('<!--app-html-->')) {
  console.error('[prerender] dist/client/index.html is already prerendered. Run the full `npm run build`.');
  process.exit(1);
}
const { render, allStaticPaths, ROUTES, NOT_FOUND, SITE_URL, BLOG_POSTS } = await import(pathToFileURL(serverEntry).href);

// Stylesheets: the five bundles from src/styles/index.css, built as separate entries (see
// vite.config.js). core, home and shell block the first paint on every page; pages blocks it on
// every page except the home page; late loads without blocking (media=print -> all). The home
// page also carries the pages href so src/app/styles.js can add it on the first navigation.
const manifestPath = join(clientDir, '.vite', 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
const cssHref = (name) => {
  const entry = manifest[`src/styles/${name}.css`];
  return entry ? '/' + entry.file : null;
};
const CSS = { core: cssHref('core'), home: cssHref('home'), pages: cssHref('pages'), shell: cssHref('shell'), late: cssHref('late'), dark: cssHref('dark') };
if (!CSS.core) console.warn('[prerender] No CSS bundles in the Vite manifest: pages will be unstyled.');

const MODE_HEAD = (href) =>
  `<script>(function(){try{if(JSON.parse(localStorage.getItem('t2o_mode'))==='dark'){document.documentElement.setAttribute('data-mode','dark');document.write('<link rel="stylesheet" href="${href}" data-css="dark" />')}}catch(e){}})();</script>`;

function cssTags(path) {
  const link = (key) => (CSS[key] ? `<link rel="stylesheet" href="${CSS[key]}" data-css="${key}" />` : '');
  const tags = [link('core'), link('home')];
  if (path !== '/') tags.push(link('pages'));
  tags.push(link('shell'));
  // late.css is attached by the boot script below, after the first paint (noscript fallback here).
  // Nothing in a first screen may depend on it: such rules belong in core/home/pages.
  if (CSS.late) tags.push(`<noscript><link rel="stylesheet" href="${CSS.late}" /></noscript>`);
  // Dark mode (src/utils/mode.js): a saved dark choice is applied, and its stylesheet linked, before the first paint.
  if (CSS.dark) tags.push(MODE_HEAD(CSS.dark));
  if (CSS.pages || CSS.dark) tags.push(`<script type="application/json" id="t2o-css">${JSON.stringify({ pages: CSS.pages, dark: CSS.dark })}</script>`);
  return tags.filter(Boolean).join('\n    ');
}

// Boot after the first paint. The pages are fully prerendered, so the first screen needs no
// JavaScript to appear; the app bundle and the late stylesheet are requested right after the
// first contentful paint (read from the Paint Timing API) and the web fonts have arrived (their
// swap repaints the largest text, so starting earlier would compete with it), instead of competing with the critical
// CSS and fonts for a phone's bandwidth. A hidden tab never paints, so a timer starts them anyway.
const MODULE_RE = /<script type="module" crossorigin src="([^"]+)"><\/script>/;
const moduleSrc = (template.match(MODULE_RE) || [])[1];
const BOOT = moduleSrc
  ? `<script>(function(){var d=document,done=0;function go(){if(done)return;done=1;var s=d.createElement('script');s.type='module';s.crossOrigin='';s.src='${moduleSrc}';d.head.appendChild(s);${
      CSS.late ? `var l=d.createElement('link');l.rel='stylesheet';l.href='${CSS.late}';l.setAttribute('data-css','late');d.head.appendChild(l);` : ''
    }}function later(){var f=d.fonts&&d.fonts.ready;f?f.then(function(){setTimeout(go,0)}):setTimeout(go,0)}try{new PerformanceObserver(function(l){if(l.getEntriesByName('first-contentful-paint').length)later()}).observe({type:'paint',buffered:true})}catch(e){requestAnimationFrame(function(){requestAnimationFrame(later)})}setTimeout(go,1500)})();</script>`
  : '';
if (!moduleSrc) console.warn('[prerender] App module script not found in index.html; leaving it as built.');
const shell = moduleSrc ? template.replace(MODULE_RE, '').replace(/<link rel="modulepreload"[^>]*>\s*/g, '').replace('</body>', `${BOOT}\n  </body>`) : template;

const fill = (path, head, html) =>
  shell.replace('<!--app-head-->', cssTags(path) + '\n    ' + head).replace('<!--app-html-->', html);

let count = 0;
for (const { path } of allStaticPaths()) {
  const { html, head } = await render(path);
  const outDir = join(clientDir, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), fill(path, head, html));
  count++;
}

// 404 page (served by the web server for unknown URLs; see deploy/ configs)
{
  const { html, head } = await render(NOT_FOUND.path);
  writeFileSync(join(clientDir, '404.html'), fill(NOT_FOUND.path, head, html));
}

// sitemap.xml – only canonical, indexable, 200-status URLs
const today = new Date().toISOString().slice(0, 10);
const postDate = Object.fromEntries(BLOG_POSTS.map((p) => [`/blog/${p.slug}/`, p.updated || p.date]));
const latestPost = BLOG_POSTS.map((p) => p.updated || p.date).sort().pop() || today;
const urls = [];
for (const { path, route } of allStaticPaths()) {
  if (!route.sitemap) continue;
  const lastmod = postDate[path] || (path === '/blog/' || path === '/' ? latestPost : today);
  urls.push(
    `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.sitemap.changefreq}</changefreq>\n    <priority>${route.sitemap.priority}</priority>\n  </url>`
  );
}
writeFileSync(
  join(clientDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
);

// robots.txt – allow everything needed to render; point to the sitemap
writeFileSync(
  join(clientDir, 'robots.txt'),
  [
    '# Turn2Opinion robots.txt (generated by scripts/prerender.mjs)',
    '# Search engines and AI assistants are welcome on every public page. Internal tools stay out.',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /docs/',
    'Disallow: /questions/',
    'Disallow: /upivalidate/',
    '',
    // Named explicitly so AI-readiness checks (and the crawlers themselves) see a clear yes.
    ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot'].flatMap((ua) => [
      `User-agent: ${ua}`,
      'Allow: /',
      'Disallow: /api/',
      ''
    ]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    ''
  ].join('\n')
);

// llms.txt – a plain-text map of the public site for AI assistants and LLM crawlers (GEO), built
// from the same route table so it never drifts from the real pages. The profile builder keeps its
// own file at /profiles/llms.txt.
{
  const seoOf = (route, params) => (typeof route.seo === 'function' ? route.seo(params) : route.seo) || {};
  const pages = [];
  const posts = [];
  for (const { path, route, params } of allStaticPaths()) {
    if (!route.sitemap) continue;
    const seo = seoOf(route, params);
    const line = `- [${seo.title}](${SITE_URL}${path}): ${seo.description}`;
    (path.startsWith('/blog/') && path !== '/blog/' ? posts : pages).push(line);
  }
  const llms = [
    '# Turn2Opinion',
    '',
    '> Turn2Opinion is a free paid-online-surveys community run by Frequent Research Fieldwork Solutions Private Limited, an ISO-certified market research company in New Delhi, India. Consumers and business professionals join free, complete market research surveys that match their profile, earn points and redeem them in eight ways: PayPal, cash rewards, bank transfer, wire transfer, shopping vouchers, grocery vouchers, digital gift cards and, for members in India, UPI. There is no fee and no investment.',
    '',
    'Key facts:',
    '- Joining is free; members never pay to take part.',
    '- Two audiences: consumers (B2C surveys) and business professionals such as IT decision-makers, managers and healthcare professionals (B2B surveys).',
    '- Rewards: eight payout options (PayPal, cash rewards, bank transfer, wire transfer, shopping vouchers, grocery vouchers, digital gift cards, and UPI for members in India). Every survey shows its reward and length before it starts.',
    '- Ratings: members rate Turn2Opinion in gems, from Pebble (1) through Quartz, Amber and Sapphire to Diamond (5); every review is published at /about/reviews/.',
    '- Quality: profiling, bot checks and multi-layer verification keep the panel genuine.',
    `- Support: ${'support@turn2opinion.com'}, live chat and WhatsApp.`,
    '',
    '## Pages',
    '',
    ...pages,
    '',
    '## Guides',
    '',
    ...posts,
    '',
    '## Optional',
    '',
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Respondent profile builder overview](${SITE_URL}/profiles/llms.txt)`,
    ''
  ].join('\n');
  writeFileSync(join(clientDir, 'llms.txt'), llms);
}

console.log(`[prerender] ${count} pages + 404.html, sitemap.xml (${urls.length} URLs), robots.txt -> ${clientDir}`);
void ROUTES;
