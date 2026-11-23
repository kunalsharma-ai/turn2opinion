// npm run alt:report
//   1. exports every interface icon as a standalone SVG → public/icons/<name>.svg (with <title> = alt text)
//   2. writes the turn-ring illustration → public/images/*.svg (for guardian emails, help pages, app stores)
//   3. writes ALT-TEXT.md + alt-text.csv: every image, icon and labelled / decorative graphic of the teen page
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pub = (...p) => path.join(root, 'public', ...p);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ── 1. icons ── */
const iconSrc = await readFile(path.join(root, 'src/components/Icons.jsx'), 'utf8');
const icons = [...iconSrc.matchAll(/^\s+(\w+): \{ s: '([^']*)', l: '([^']*)'\s*, alt: '([^']+)' \}/gm)].map((m) => ({ name: m[1], s: m[2], l: m[3], alt: m[4] }));
await mkdir(pub('icons'), { recursive: true });
for (const i of icons) {
  const body = i.s
    ? `<path d="${i.s}" transform="translate(1.1 1.3)" fill="#1e3a9e" opacity=".35"/><path d="${i.s}" fill="#2f6bff"/>${i.l ? `<path d="${i.l}" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`
    : `<path d="${i.l}" fill="none" stroke="#2f6bff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>`;
  await writeFile(pub('icons', `${i.name}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-labelledby="t"><title id="t">${esc(i.alt)}</title>${body}</svg>\n`);
}

/* ── 2. illustrations ── */
const IMAGES = {
  'turn-ring.svg': {
    alt: 'Ring made of two arcs with arrowheads — the right arc for the parent or guardian\u2019s permission (blue) and the left arc for the teen\u2019s own yes (cyan); the account opens only when both arcs are complete',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="240" height="240" role="img" aria-labelledby="t"><title id="t">ALT</title>
<defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f5bff"/><stop offset="1" stop-color="#52c8ff"/></linearGradient><linearGradient id="q" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#12b6e8"/><stop offset="1" stop-color="#7be3d0"/></linearGradient></defs>
<circle cx="100" cy="100" r="64" fill="#f4f7ff"/>
<path d="M116.22 24.2A78 78 0 0 1 177.8 116.22" transform="rotate(0 100 100)" fill="none" stroke="url(#p)" stroke-width="16" stroke-linecap="round"/>
<path d="M83.78 175.8A78 78 0 0 1 22.2 83.78" fill="none" stroke="url(#q)" stroke-width="16" stroke-linecap="round"/>
<text x="100" y="112" text-anchor="middle" font-family="Manrope,Arial,sans-serif" font-weight="800" font-size="46" fill="#0a1240">2</text>
</svg>`,
  },
};
await mkdir(pub('images'), { recursive: true });
for (const [f, { alt, svg }] of Object.entries(IMAGES)) await writeFile(pub('images', f), svg.replace('ALT', esc(alt)) + '\n');

/* ── 3. report ── */
const images = [];
const labels = [];
const decorative = [];
for (const f of (await readdir(path.join(root, 'src'), { recursive: true })).filter((f) => f.endsWith('.jsx'))) {
  const lines = (await readFile(path.join(root, 'src', f), 'utf8')).split('\n');
  lines.forEach((l, i) => {
    const where = `src/${f}:${i + 1}`;
    for (const m of l.matchAll(/<img\b[^>]*?src=\{asset\(['"]([^'"]+)['"]\)\}[^>]*?alt="([^"]*)"/g)) images.push([`public/${m[1]}`, m[2], where]);
    if (/role="img"/.test(l) && /aria-label=\{summary\}/.test(l)) labels.push(['Turn ring — announces both turns, e.g. “Account activation: Parent’s key — waiting; Your key — turned” (in the member’s language)', where]);
    if (/aria-pressed=\{on\}/.test(l)) labels.push(['Each tap-to-agree tile announces whether it is agreed (“Tap to agree” / “Agreed”, in the member’s language)', where]);
    if (/className="tr-svg"/.test(l)) decorative.push(['The ring drawing itself (two arcs with arrowheads, a dotted halo and the turn count). The same state is announced as text by the ring\u2019s label and shown in the send panel', where]);
    if (/className=\{`mi /.test(l)) decorative.push(['Check that draws itself on each tap-to-agree tile (\u201cAgreed\u201d is shown as text)', where]);
    if (/className="tb-segs"/.test(l)) decorative.push(['Segmented bar that fills as the parent\u2019s permissions and the teen\u2019s answer are given (the checklist says the same in text)', where]);
    if (/className="steps-line"/.test(l)) decorative.push(['Line joining the four steps in the side rail (the steps are real links with text)', where]);
    if (/className="confetti"/.test(l)) decorative.push(['Confetti and ribbons when the answer is sent (celebration only; it is skipped under prefers-reduced-motion)', where]);
  });
}
for (const [f, { alt }] of Object.entries(IMAGES)) images.push([`public/images/${f}`, alt, 'exported by scripts/alt-report.mjs (not used on the page)']);
images.push(['public/brand/t2o-mark-160.png / .webp / t2o-mark.png / .webp', 'Turn2Opinion seal', 'brand mark (favicon, home-screen icon)']);
images.push(['public/favicon.ico, favicon-32x32.png, apple-touch-icon.png', 'Turn2Opinion icon', 'browser tab / home-screen icon (no alt needed; listed for completeness)']);
const missing = images.filter(([, a]) => !a || !a.trim());

let md = `# Alternative text — Turn2Opinion teen (13–17) consent page\n\nEvery image, icon and graphic has alternative text (read by screen readers, shown if an image cannot load) or is marked decorative because the text next to it says the same thing. Generated by \`npm run alt:report\`.\n\n`;
md += `## Images (${images.length})\n\n| File | Alt text | Where |\n|---|---|---|\n${images.map(([s, a, w]) => `| \`${s}\` | ${a || '**MISSING**'} | ${w} |`).join('\n')}\n\n`;
md += `## Icons (${icons.length}) — \`src/components/Icons.jsx\`, also exported to \`public/icons/<name>.svg\`\n\nEach icon renders \`role="img"\` with this text as \`aria-label\` (or \`<title>\` in the exported SVG). Icons sitting next to text that says the same are rendered with \`decorative\` (\`aria-hidden\`) so screen readers do not read them twice.\n\n| Icon | File | Alt text |\n|---|---|---|\n${icons.map((i) => `| \`${i.name}\` | \`public/icons/${i.name}.svg\` | ${i.alt} |`).join('\n')}\n\n`;
md += `## Labelled graphics (${labels.length})\n\n| Label | Where |\n|---|---|\n${labels.map(([a, w]) => `| ${a} | \`${w}\` |`).join('\n')}\n\n`;
decorative.push(
  ['Animated background: drifting colour blobs, a dotted grid, large outlines of the turn ring and small rising bubbles', 'src/components/Backdrop.jsx'],
  ['3D scene beside the headline: the Turn2Opinion mark as a spinning coin, two orbits of country flags and floating bubbles (the page text says everything it says)', 'src/components/Hero3D.jsx'],
  ['Light dot and shine animation on the header logo (the logo picture has the alt text “Turn2Opinion logo”)', 'src/components/AnimLogo.jsx'],
  ['Country flags next to language names, the member\u2019s country and in the language picker (the country or language name is always written beside them)', 'src/components/Flag.jsx'],
  ['Scroll progress bar at the top of the page', 'src/App.jsx'],
);
md += `## Decorative graphics (${decorative.length}) — \`aria-hidden="true"\`\n\n| Graphic | Where |\n|---|---|\n${decorative.map(([a, w]) => `| ${a} | \`${w}\` |`).join('\n')}\n`;
await writeFile(path.join(root, 'ALT-TEXT.md'), md);
const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
await writeFile(path.join(root, 'alt-text.csv'), ['type,name_or_file,alt_text,where',
  ...images.map(([s, a, w]) => ['image', s, a, w].map(q).join(',')),
  ...icons.map((i) => ['icon', `public/icons/${i.name}.svg`, i.alt, 'src/components/Icons.jsx'].map(q).join(',')),
  ...labels.map(([a, w]) => ['graphic', '', a, w].map(q).join(',')),
  ...decorative.map(([a, w]) => ['decorative', '', a, w].map(q).join(','))].join('\n') + '\n');
console.log(`Alt text: ${images.length} images, ${icons.length} icons (exported), ${labels.length} labelled, ${decorative.length} decorative, ${missing.length} missing → ALT-TEXT.md, alt-text.csv`);
if (missing.length) process.exit(1);
void pathToFileURL;
