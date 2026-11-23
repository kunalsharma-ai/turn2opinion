// npm run i18n:check → checks that all 50 translations carry every interface text (the full legal clauses stay
// in binding English with an optional machine translation). `npm run i18n:sync` is what adds and prunes them.
// Fails when a key is missing from a language that should have it, when a {0} placeholder is lost, or when a
// translation is identical to English for a long sentence (usually a copy-paste slip).
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const { default: EN } = await imp('src/i18n/strings/en.js');
const { SECTIONS, DECLARATION, ASSENT } = await imp('src/content/terms.js');
const { LANGUAGES } = await imp('src/i18n/languages.js');

const BASE = { ...EN };
for (const [n, s] of Object.entries(SECTIONS)) { BASE[`t${n}`] = s.title; BASE[`s${n}`] = s.short; }
DECLARATION.forEach((d, i) => { BASE[`d${i + 1}`] = d; });
ASSENT.forEach((a, i) => { BASE[`a${i + 1}`] = a; });

export const CORE = [
  'agreement', 'ages', 'language', 'sound_on', 'sound_off', 'theme_light', 'theme_dark', 'h1', 'lead',
  'role1_h', 'role2_h', 'role3_h', 'mins',
  'lock_title', 'lock_locked', 'lock_parent', 'lock_teen', 'lock_wait', 'lock_ready', 'lock_turned', 'lock_verifying', 'lock_open',
  'info_h', 'info_rule', 'j_read', 'j_parent', 'j_teen', 'j_send', 'part', 'partA_h', 'partA_p', 'partB_h', 'partB_p', 'partC_h', 'partC_p', 'partD_h',
  'ch_join', 'ch_permission', 'ch_safety', 'ch_data', 'ch_rewards', 'ch_help',
  'in_short', 'read_more', 'full_agreement', 'section', 'legal_en',
  ...Object.keys(SECTIONS).flatMap((n) => [`t${n}`, `s${n}`]),
  // the four taps and what they say
  'terms_accept', 'tap_agree', 'agreed', 'done_count',
  'b2_h', 'b3_h', 'b3_lead', 'required', 'optional', 'on_file', 'on_file_note',
  'c_participation_k', 'c_participation', 'c_privacy_k', 'c_privacy', 'c_contact_k', 'c_contact',
  'c_studyContact_k', 'c_studyContact', 'c_recording_k', 'c_recording', 'c_sensitive_k', 'c_sensitive',
  'c_lead', 'c_if', ...ASSENT.map((_, i) => `a${i + 1}`), 'c_decide', 'c_choose', 'yes_opt', 'no_opt', 'no_h', 'no_p',
  'send_btn', 'not_now', 'send_note', 'done_h', 'done_p', 'done_active_h', 'done_active_p', 'continue', 'download_pdf', 'search',
];
const FULL = ['zh-CN', 'zh-TW', 'hi', 'es', 'ar', 'pt', 'fr', 'de', 'ja', 'ko', 'id', 'ru'];

if (process.argv[1] && process.argv[1].endsWith('i18n-check.mjs')) {
  let bad = 0;
  const rows = [];
  for (const l of LANGUAGES) {
    if (l.code === 'en') continue;
    let d = {};
    try { d = (await imp(`src/i18n/strings/${l.code}.js`)).default; } catch { d = {}; }
    const want = Object.keys(BASE); // every language carries every interface text
    const missing = want.filter((k) => !d[k]);
    const extra = Object.keys(d).filter((k) => !(k in BASE));
    const ph = Object.keys(d).filter((k) => BASE[k] && (BASE[k].match(/\{\d\}/g) || []).some((x) => !d[k].includes(x)));
    const same = Object.keys(d).filter((k) => BASE[k] && BASE[k].length > 30 && d[k] === BASE[k]);
    if (missing.length || extra.length || ph.length || same.length) bad++;
    rows.push(`${l.code.padEnd(6)} ${String(Object.keys(d).length).padStart(4)}/${want.length}${missing.length ? `  missing: ${missing.join(' ')}` : ''}${extra.length ? `  unknown: ${extra.join(' ')}` : ''}${ph.length ? `  placeholder lost: ${ph.join(' ')}` : ''}${same.length ? `  same as English: ${same.join(' ')}` : ''}`);
  }
  console.log(rows.join('\n'));
  console.log(`\n${Object.keys(BASE).length} keys in English · ${CORE.length} core keys · ${bad ? `${bad} language(s) need attention` : 'all languages complete'}`);
  if (bad) process.exitCode = 1;
}
