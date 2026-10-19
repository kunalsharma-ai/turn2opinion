// Word-by-word entrance animation that stays translatable.
// In English every word is its own <span> (animated with --i). In any other language the sentence is rendered
// as ONE text node, so the translation engine (src/i18n/engine.js) can swap the whole sentence for its
// translation instead of trying to translate isolated words.
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function WordSplit({ text, varName = '--i' }) {
  const { lang } = useI18n();
  if (!text) return null;
  if (lang !== 'en') {
    return (
      <span className="ws-one" style={{ [varName]: 0 }}>
        {text}{' '}
      </span>
    );
  }
  return text.split(' ').map((w, i) => (
    <span key={i} style={{ [varName]: i }}>
      {w}{' '}
    </span>
  ));
}
