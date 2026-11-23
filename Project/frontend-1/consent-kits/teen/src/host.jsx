// Turn2Opinion host entry (added for the website; not part of the delivered package).
// The site's registration / guardian pages load this module and call mount(element, config):
//   - the page renders inside a Shadow DOM on that element (same as the package's own embed.jsx),
//   - config is the package's config (src/config.js) plus the host hooks save(record), onContinue(record),
//     onDecline() and, for the Teen page, mode: 'guardian' and text: { key: 'English override' }.
// Returns a function that unmounts it.
import { createRoot } from 'react-dom/client';
import Root from './Root.jsx';
import { loadLanguage, pickInitialLanguage } from './i18n/I18n.jsx';
import { DEFAULT_CONFIG } from './config.js';
import { setAssetBase, asset } from './assets.js';
import FONTS from './styles/fonts.css';
import CSS from './styles/app.css';

export function mount(host, given = {}) {
  const cfg = { ...DEFAULT_CONFIG, ...given, standalone: false };
  cfg.member = { ...DEFAULT_CONFIG.member, ...(given.member || {}) };
  if (DEFAULT_CONFIG.guardian) cfg.guardian = { ...DEFAULT_CONFIG.guardian, ...(given.guardian || {}) };
  setAssetBase(cfg.assetBase);
  const fid = 't2o-kit-fonts';
  if (!document.getElementById(fid)) {
    const f = document.createElement('style');
    f.id = fid;
    f.textContent = FONTS.replace(/url\(['"]?(fonts\/[^'")]+)['"]?\)/g, (m, p) => `url('${asset(p)}')`);
    document.head.appendChild(f);
  }
  const shadow = host.shadowRoot || host.attachShadow({ mode: 'open' });
  while (shadow.firstChild) shadow.firstChild.remove();
  const st = document.createElement('style');
  // host hook: a few rules from the site (e.g. keep the skip link hidden until it is focused)
  st.textContent = CSS + (given.hostCss || '');
  shadow.appendChild(st);
  const target = document.createElement('div');
  target.id = 't2o-minor';
  shadow.appendChild(target);
  let root = null;
  let gone = false;
  const lang = pickInitialLanguage(cfg);
  loadLanguage(lang).then(() => {
    if (gone) return;
    root = createRoot(target);
    root.render(<Root cfg={cfg} initial={lang} />);
  });
  return () => {
    gone = true;
    if (root) root.unmount();
  };
}
