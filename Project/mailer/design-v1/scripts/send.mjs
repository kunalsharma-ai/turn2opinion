/**
 * Send one mailer to a real inbox over SMTP — the only way to know how a template
 * actually lands, since no simulator reproduces Outlook's Word engine exactly.
 *
 *   SMTP_HOST=smtp.example.com SMTP_PORT=587 \
 *   SMTP_USER=... SMTP_PASS=... \
 *   node scripts/send.mjs --id=respondent --to=you@example.com
 *
 * Options
 *   --id=<mailer id>      required, e.g. respondent or case3-noprofiles
 *   --to=<address>        required; repeat with commas for several recipients
 *   --from=<address>      default no-reply@turn2opinion.com
 *   --assets=<base-url>   image host; MUST be publicly reachable for a real send
 *   --liquid              send the Liquid template rendered against sample data
 *                         (use this to test what the ESP will actually produce)
 */
import nodemailer from 'nodemailer';
import { Liquid } from 'liquidjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { renderAll, DIST } from './render.mjs';
import { SAMPLE, TICKET_SAMPLE, isTicket } from './samples.mjs';

const arg = (k, d) => {
  const hit = process.argv.find((a) => a.startsWith(`--${k}=`));
  return hit ? hit.split('=').slice(1).join('=') : d;
};
const flag = (k) => process.argv.includes(`--${k}`);

const id = arg('id');
const to = arg('to');
const from = arg('from', 'Turn2Opinion <no-reply@turn2opinion.com>');
const assets = arg('assets', process.env.T2O_ASSET_BASE);

if (!id || !to) {
  console.error('\n  Need --id and --to.  Example:\n' +
    '  node scripts/send.mjs --id=respondent --to=you@example.com\n');
  process.exit(1);
}

const { SMTP_HOST, SMTP_PORT = '587', SMTP_USER, SMTP_PASS } = process.env;
if (!SMTP_HOST || !SMTP_USER) {
  console.error('\n  Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS first.\n');
  process.exit(1);
}

const mode = flag('liquid') ? 'liquid' : 'html';
const hit = (await renderAll({ mode, assetBase: assets })).find((x) => x.meta.id === id);
if (!hit) {
  console.error(`\n  No mailer with id "${id}".\n`);
  process.exit(1);
}

let html = hit.body;
let subject = (hit.meta.subjectsSample || hit.meta.subjects)[0];

if (mode === 'liquid') {
  // render the Liquid exactly as the ESP would, so what lands in the inbox is
  // the real merged output rather than the sample-data variant
  const engine = new Liquid({ strictFilters: true });
  const data = isTicket(id) ? TICKET_SAMPLE : SAMPLE;
  html = await engine.parseAndRender(hit.body, data);
  subject = await engine.parseAndRender(hit.meta.subjects[0], data);
}

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

/** Plain-text alternative: the real text part from dist/text, merged in liquid mode. */
let text = await fs.readFile(path.join(DIST, 'text', `${id}.txt`), 'utf8').catch(() => hit.meta.preheader);
if (mode === 'liquid') text = await new Liquid().parseAndRender(text, isTicket(id) ? TICKET_SAMPLE : SAMPLE);

const info = await transport.sendMail({
  from, to, subject, html, text,
  headers: hit.meta.transactional ? {} : { 'List-Unsubscribe': '<https://www.turn2opinion.com/unsubscribe>' },
});

console.log(`\n  Sent ${id} (${mode}) to ${to}`);
console.log(`  Subject: ${subject}`);
console.log(`  Message id: ${info.messageId}\n`);
