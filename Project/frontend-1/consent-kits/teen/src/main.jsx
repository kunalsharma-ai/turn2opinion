// Standalone page entry (dist/index.html) — teen participation terms & parental consent. The page is prerendered in English and hydrated here.
import { startTransition } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Root from './Root.jsx';
import { loadLanguage, pickInitialLanguage } from './i18n/I18n.jsx';
import { readConfig, ageBandOf, DEFAULT_CONFIG } from './config.js';
import { setAssetBase } from './assets.js';
import './styles/fonts.css';
import './styles/app.css';

const cfg = { ...readConfig(), standalone: true };
setAssetBase(cfg.assetBase);
const el = document.getElementById('t2o-minor');
// the single-file preview puts a "this page needs JavaScript" block in the mount point; the script is running, so it goes
const fallback = document.getElementById('t2o-fallback');
if (fallback) fallback.remove();
const lang = pickInitialLanguage(cfg);
// the prerender is the teen agreement; members outside 13–17 get the short notice instead (no hydration mismatch)
const band = ageBandOf(cfg);
const eligible = band !== 'adult' && band !== 'under';
// …and it was rendered with the default settings: a member's name, prefilled guardian details, versions, contacts
// etc. change the markup, so in that case React renders fresh over the pre-rendered frame instead of hydrating.
const SHOWN = ['guardian', 'theme', 'study', 'operator', 'supportEmail', 'privacyEmail', 'address', 'termsVersion', 'effectiveDate', 'assentVersion', 'privacyNoticeVersion', 'optionalConsents', 'contactTypes', 'website', 'privacyPolicyUrl', 'demo', 'logoutUrl', 'continueUrl'];
const shown = (c) => JSON.stringify([c.member && c.member.firstName, c.member && c.member.country, ...SHOWN.map((k) => c[k])]);
const asPrerendered = shown(cfg) === shown(DEFAULT_CONFIG);
if (lang === 'en' && eligible && asPrerendered && el.hasChildNodes() && el.dataset.prerendered === '1') {
  // English: attach to the prerendered page
  startTransition(() => hydrateRoot(el, <Root cfg={{ ...cfg, hydrating: true }} initial="en" />));
} else {
  // Another language: load its text first (preloaded by the boot script), then render it directly — no English
  // flash. Meanwhile the English pre-render stays on screen as a word-less frame (html.lang-boot); React swaps it
  // out at commit. The render runs as a transition and the page mounts in stages (see App.jsx), so the work is
  // sliced into short main-thread tasks.
  loadLanguage(lang).then(() => {
    const root = createRoot(el);
    startTransition(() => root.render(<Root cfg={cfg} initial={lang} />));
  });
}
