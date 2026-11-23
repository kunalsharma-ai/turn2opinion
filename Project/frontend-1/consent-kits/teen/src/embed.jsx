// Embed entry (dist/embed/t2o-minor-consent.js) — for pasting into your logged-in app:
//
//   <div id="t2o-minor"></div>
//   <script>window.T2O_MINOR = { member: { id: '123', firstName: 'Priya' }, submitUrl: '/api/minor-consent',
//            continueUrl: '/dashboard', logoutUrl: '/logout', assetBase: '/minor-consent/' };</script>
//   <script src="/minor-consent/embed/t2o-minor-consent.js" defer></script>
//
// The page renders inside a Shadow DOM, so its styles can't clash with your app's CSS (and yours can't break it).
// Set T2O_MINOR.isolate = false to render in the light DOM instead. Fonts are added to the document once.
import { createRoot } from 'react-dom/client';
import Root from './Root.jsx';
import { loadLanguage, pickInitialLanguage } from './i18n/I18n.jsx';
import { readConfig } from './config.js';
import { setAssetBase, asset } from './assets.js';
import FONTS from './styles/fonts.css';
import CSS from './styles/app.css';

function mount() {
  const cfg = { ...readConfig(), standalone: false };
  setAssetBase(cfg.assetBase);
  let host = document.getElementById(cfg.mountId || 't2o-minor');
  if (!host) {
    host = document.createElement('div');
    host.id = 't2o-minor';
    document.body.appendChild(host);
  }
  if (!document.getElementById('t2o-minor-fonts')) {
    const f = document.createElement('style');
    f.id = 't2o-minor-fonts';
    f.textContent = FONTS.replace(/url\(['"]?(fonts\/[^'")]+)['"]?\)/g, (m, p) => `url('${asset(p)}')`);
    document.head.appendChild(f);
  }
  let target = host;
  if (cfg.isolate !== false && host.attachShadow) {
    const shadow = host.shadowRoot || host.attachShadow({ mode: 'open' });
    const st = document.createElement('style');
    st.textContent = CSS;
    shadow.appendChild(st);
    target = document.createElement('div');
    shadow.appendChild(target);
  } else if (!document.getElementById('t2o-minor-css')) {
    const st = document.createElement('style');
    st.id = 't2o-minor-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  const lang = pickInitialLanguage(cfg);
  loadLanguage(lang).then(() => createRoot(target).render(<Root cfg={cfg} initial={lang} />));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
else mount();
