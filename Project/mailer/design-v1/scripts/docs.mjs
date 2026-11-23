/**
 * Generate docs/copy-deck.md from the build manifest, so the deck can never drift
 * from the templates it documents. Run after `npm run build`.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { DIST, ROOT } from './render.mjs';

const OUT = path.resolve(ROOT, '..', 'docs', 'copy-deck.md');
const manifest = JSON.parse(await fs.readFile(path.join(DIST, 'manifest.json'), 'utf8'));


let md = `# Turn2Opinion — copy deck

Subject lines, preheaders, calls to action and send classification for all 22
templates (4 lifecycle reminders + 18 system templates). Generated from the build:
edit the \`meta\` block in \`react/src/emails/*.jsx\` and re-run
\`npm run build && npm run docs\`.

**Subject line rules applied throughout**
- No invented urgency, no fake scarcity, no invented reward amounts — rewards come from
  merge fields or from the v6 dashboard rule (+50 points, +1 quality score per item).
- No all-caps words and no emoji in subjects.
- Three alternatives per template for A/B testing; option 1 is the primary and the
  one baked into the HTML <title>.

---

`;

for (const m of manifest) {
  md += `## ${m.code}. ${m.name}\n\n`;
  md += `| | |\n|---|---|\n`;
  md += `| **Class** | ${m.kind} — ${m.transactional ? 'transactional, no unsubscribe link' : 'marketing, unsubscribe required'} |\n`;
  md += `| **Trigger** | ${m.trigger} |\n`;
  if (m.source) md += `| **Replaces** | \`${m.source}\` |\n`;
  md += `| **Tone** | \`${m.tone}\` |\n`;
  md += `| **Template** | \`liquid/${m.id}.liquid\` |\n`;
  md += `| **Plain text** | \`text/${m.id}.txt\` |\n`;
  md += `| **Size** | ${(m.bytes / 1024).toFixed(1)} KB |\n\n`;

  md += `**Subject line${m.subjects.length > 1 ? 's' : ''}**\n\n`;
  m.subjects.forEach((s, i) => {
    md += `${i + 1}. \`${s}\`${i === 0 && m.subjects.length > 1 ? '  ← primary' : ''}\n`;
  });
  md += `\n**Preheader**\n\n\`${m.preheader}\`\n\n`;

  md += `**Call to action**\n\n`;
  md += m.cta
    ? `- Primary: **${m.cta.label}** → \`${m.cta.dest}\`\n`
    : `- None — this template asks for nothing.\n`;
  if (m.secondary) md += `- Secondary: ${m.secondary.label} → \`${m.secondary.dest}\`\n`;
  md += `\n**Why this was sent** (shown in the footer)\n\n> ${m.reason}\n\n`;

  if (m.notes?.a11y?.length) {
    md += `**Accessibility notes**\n\n`;
    m.notes.a11y.forEach((n) => { md += `- ${n}\n`; });
    md += '\n';
  }
  if (m.notes?.compat?.length) {
    md += `**Client compatibility notes**\n\n`;
    m.notes.compat.forEach((n) => { md += `- ${n}\n`; });
    md += '\n';
  }
  md += `---\n\n`;
}

md += `## Sender configuration

| | |
|---|---|
| From name | Turn2Opinion |
| From address | \`no-reply@turn2opinion.com\` |
| Reply-to | \`support@turn2opinion.com\` |
| List-Unsubscribe | Required on every marketing send; omit on transactional |
| Authentication | SPF, DKIM and DMARC on the sending domain |

Keep the From name and address identical across all 22. A consistent sender
identity does more for inbox placement than any subject-line tactic.
`;

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, md, 'utf8');
console.log(`\nCopy deck written: ${OUT}  (${manifest.length} templates)\n`);
