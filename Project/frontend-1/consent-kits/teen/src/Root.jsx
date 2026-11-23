import { useEffect } from 'react';
import App from './App.jsx';
import { I18nProvider, pickInitialLanguage, useI18n } from './i18n/I18n.jsx';

// Switches to the member's language right after hydration (the prerendered HTML is English).
// Embed mode (no prerender): pick the member's language after the first render.
function Boot({ cfg }) {
  const { setLangSilently } = useI18n();
  useEffect(() => {
    setLangSilently(pickInitialLanguage(cfg));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function Root({ cfg, initial }) {
  return (
    <I18nProvider config={cfg} initial={initial || 'en'}>
      {initial ? null : <Boot cfg={cfg} />}
      <App cfg={cfg} />
    </I18nProvider>
  );
}
