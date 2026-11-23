// Standalone page entry (dist/index.html). The page is prerendered in English and hydrated here.
import { startTransition } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Root from './Root.jsx';
import { loadLanguage, pickInitialLanguage } from './i18n/I18n.jsx';
import { readConfig } from './config.js';
import { setAssetBase } from './assets.js';
import './styles/fonts.css';
import './styles/app.css';

const cfg = { ...readConfig(), standalone: true };
setAssetBase(cfg.assetBase);
const el = document.getElementById('t2o-consent');
const lang = pickInitialLanguage(cfg);
if (lang === 'en' && el.hasChildNodes() && el.dataset.prerendered === '1') {
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
