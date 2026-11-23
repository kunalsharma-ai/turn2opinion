// A slow ribbon of every interface language with its flag. Click one to switch language (with its signature
// sound). It pauses on hover or focus; under prefers-reduced-motion it becomes a plain scrollable row.
import Flag from './Flag.jsx';
import { useI18n } from '../i18n/I18n.jsx';
import { playAmbient, playLanguage, preloadLanguageSounds } from '../sound.js';

export default function LangRibbon() {
  const { lang, setLang, languages, t } = useI18n();
  const pick = (code) => { playLanguage(code); setLang(code); };
  return (
    <section className="ribbon" aria-label={t('language')} onPointerEnter={() => preloadLanguageSounds()}>
      <div className="rb-track">
        {[0, 1].map((copy) => languages.map((l) => (
          <button key={`${copy}-${l.code}`} type="button" className={`rb-chip ${l.code === lang ? 'is-current' : ''}`} style={{ '--l1': l.grade[0], '--l2': l.grade[1] }}
            tabIndex={copy ? -1 : 0} aria-hidden={copy ? 'true' : undefined} aria-pressed={copy ? undefined : l.code === lang}
            onPointerEnter={() => playAmbient('blip')} onClick={() => pick(l.code)}>
            <Flag cc={l.flag} /><span lang={l.code} dir={l.dir || 'auto'}>{l.native}</span>
          </button>
        )))}
      </div>
    </section>
  );
}
