// Language UI (always loaded): the header/footer language button. The picker itself lives in LanguagePicker.jsx
// and is loaded on demand (see App.jsx), so it adds nothing to the first page load.
import { useI18n } from '../i18n/I18nProvider.jsx';
import Icon from './Icon.jsx';

/** Warm up the picker chunk as soon as someone points at or focuses the button, so it opens instantly. */
const preload = () => import('./LanguagePicker.jsx').catch(() => {});

/** Header button — always visible, desktop and mobile. */
export function LanguageButton({ compact = false }) {
  const { meta, openPicker } = useI18n();
  return (
    <button
      type="button"
      className={`lang-btn ${compact ? 'is-compact' : ''}`}
      onClick={openPicker}
      onPointerEnter={preload}
      onFocus={preload} aria-haspopup="dialog" aria-label={`${meta.native} — change language (${meta.name})`}>
      <span className="lb-orb" aria-hidden="true">
        <span className="lb-glyph notranslate" translate="no">{meta.glyph}</span>
      </span>
      <span className="lb-txt notranslate" translate="no">{meta.native}</span>
      <Icon name="chevron" size={14} className="lb-caret" />
    </button>
  );
}

