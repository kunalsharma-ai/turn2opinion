// Supported interface languages.
//
//   code    BCP-47 tag written to <html lang> and used for dictionaries (src/i18n/dict/<code>.js)
//   mt      code passed to machine-translation providers (backend endpoint / browser Translator API)
//   native  name in its own script (what visitors look for)    name  English name
//   glyph   one or two characters of the script, shown on the language orb
//   dir     'rtl' for Arabic, Persian, Hebrew, Urdu
//   flag    flag file in /public/flags (a region that commonly uses the language — never a statement of nationality)
//   grade   the colour grade the whole site shifts to when this language is chosen [primary, secondary, glow]
//   sound   the sound signature in src/i18n/sounds.js
//   choose  "Choose your language" in that language (shown in the rotating picker title)
//   region  group in the picker
export const LANGUAGES = [
  { code: 'en', mt: 'en', native: 'English', name: 'English', glyph: 'Aa', flag: 'gb', region: 'Global', grade: ['#1f5bff', '#7b5cff', '#49b6ff'], sound: 'en', choose: 'Choose your language' },
  { code: 'zh-CN', mt: 'zh', native: '简体中文', name: 'Chinese (Simplified)', glyph: '文', flag: 'cn', region: 'Asia', grade: ['#e8112d', '#ffb400', '#ff6a3d'], sound: 'zh-CN', choose: '选择您的语言' },
  { code: 'zh-TW', mt: 'zh-Hant', native: '繁體中文', name: 'Chinese (Traditional)', glyph: '語', flag: 'tw', region: 'Asia', grade: ['#c9184a', '#f4c95d', '#1b998b'], sound: 'zh-TW', choose: '選擇您的語言' },
  { code: 'ja', mt: 'ja', native: '日本語', name: 'Japanese', glyph: 'あ', flag: 'jp', region: 'Asia', grade: ['#ff5d9e', '#4b3cc9', '#ffb3cf'], sound: 'ja', choose: '言語を選択してください' },
  { code: 'ko', mt: 'ko', native: '한국어', name: 'Korean', glyph: '한', flag: 'kr', region: 'Asia', grade: ['#1f5fd1', '#e8364a', '#69d2e7'], sound: 'ko', choose: '언어를 선택하세요' },
  { code: 'hi', mt: 'hi', native: 'हिन्दी', name: 'Hindi', glyph: 'अ', flag: 'in', region: 'India', grade: ['#ff8a00', '#e6007e', '#00a99d'], sound: 'hi', choose: 'अपनी भाषा चुनें' },
  { code: 'bn', mt: 'bn', native: 'বাংলা', name: 'Bengali', glyph: 'অ', flag: 'bd', region: 'India', grade: ['#00875a', '#f42a41', '#ffd166'], sound: 'bn', choose: 'আপনার ভাষা বেছে নিন' },
  { code: 'ta', mt: 'ta', native: 'தமிழ்', name: 'Tamil', glyph: 'அ', flag: 'in', region: 'India', grade: ['#c1121f', '#f4a261', '#2a9d8f'], sound: 'ta', choose: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்' },
  { code: 'te', mt: 'te', native: 'తెలుగు', name: 'Telugu', glyph: 'అ', flag: 'in', region: 'India', grade: ['#8338ec', '#ffb703', '#fb5607'], sound: 'te', choose: 'మీ భాషను ఎంచుకోండి' },
  { code: 'mr', mt: 'mr', native: 'मराठी', name: 'Marathi', glyph: 'म', flag: 'in', region: 'India', grade: ['#ff6d00', '#9d0208', '#ffd60a'], sound: 'mr', choose: 'तुमची भाषा निवडा' },
  { code: 'gu', mt: 'gu', native: 'ગુજરાતી', name: 'Gujarati', glyph: 'ગ', flag: 'in', region: 'India', grade: ['#e63946', '#3a86ff', '#ffbe0b'], sound: 'gu', choose: 'તમારી ભાષા પસંદ કરો' },
  { code: 'pa', mt: 'pa', native: 'ਪੰਜਾਬੀ', name: 'Punjabi', glyph: 'ਪ', flag: 'in', region: 'India', grade: ['#ff9f1c', '#5f0f40', '#2ec4b6'], sound: 'pa', choose: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ' },
  { code: 'kn', mt: 'kn', native: 'ಕನ್ನಡ', name: 'Kannada', glyph: 'ಕ', flag: 'in', region: 'India', grade: ['#e10600', '#ffd400', '#4361ee'], sound: 'kn', choose: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ' },
  { code: 'ml', mt: 'ml', native: 'മലയാളം', name: 'Malayalam', glyph: 'മ', flag: 'in', region: 'India', grade: ['#2d6a4f', '#ffc300', '#52b788'], sound: 'ml', choose: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക' },
  { code: 'ur', mt: 'ur', native: 'اردو', name: 'Urdu', glyph: 'ا', flag: 'pk', dir: 'rtl', region: 'India', grade: ['#0b7a3e', '#8fd694', '#c9a227'], sound: 'ur', choose: 'اپنی زبان منتخب کریں' },
  { code: 'ar', mt: 'ar', native: 'العربية', name: 'Arabic', glyph: 'ع', flag: 'sa', dir: 'rtl', region: 'Middle East', grade: ['#00a86b', '#d4af37', '#1d6fb8'], sound: 'ar', choose: 'اختر لغتك' },
  { code: 'fa', mt: 'fa', native: 'فارسی', name: 'Persian', glyph: 'ف', flag: 'ir', dir: 'rtl', region: 'Middle East', grade: ['#00a3e0', '#c8102e', '#f1c40f'], sound: 'fa', choose: 'زبان خود را انتخاب کنید' },
  { code: 'he', mt: 'he', native: 'עברית', name: 'Hebrew', glyph: 'א', flag: 'il', dir: 'rtl', region: 'Middle East', grade: ['#1f4fd8', '#66c7f4', '#b388ff'], sound: 'he', choose: 'בחרו את השפה שלכם' },
  { code: 'tr', mt: 'tr', native: 'Türkçe', name: 'Turkish', glyph: 'Ç', flag: 'tr', region: 'Middle East', grade: ['#e30a17', '#00b4d8', '#ffd166'], sound: 'tr', choose: 'Dilinizi seçin' },
  { code: 'es', mt: 'es', native: 'Español', name: 'Spanish', glyph: 'Ñ', flag: 'es', region: 'Europe & Americas', grade: ['#d4142a', '#ffc400', '#ff6b35'], sound: 'es', choose: 'Elige tu idioma' },
  { code: 'pt', mt: 'pt', native: 'Português', name: 'Portuguese', glyph: 'Ã', flag: 'br', region: 'Europe & Americas', grade: ['#00a651', '#ffdf00', '#1e5bc6'], sound: 'pt', choose: 'Escolha o seu idioma' },
  { code: 'fr', mt: 'fr', native: 'Français', name: 'French', glyph: 'É', flag: 'fr', region: 'Europe & Americas', grade: ['#2d5bff', '#ef4135', '#b39dff'], sound: 'fr', choose: 'Choisissez votre langue' },
  { code: 'it', mt: 'it', native: 'Italiano', name: 'Italian', glyph: 'È', flag: 'it', region: 'Europe & Americas', grade: ['#009246', '#ce2b37', '#f4a259'], sound: 'it', choose: 'Scegli la tua lingua' },
  { code: 'de', mt: 'de', native: 'Deutsch', name: 'German', glyph: 'ß', flag: 'de', region: 'Europe & Americas', grade: ['#ffb800', '#dd0000', '#5c5c7a'], sound: 'de', choose: 'Wählen Sie Ihre Sprache' },
  { code: 'nl', mt: 'nl', native: 'Nederlands', name: 'Dutch', glyph: 'IJ', flag: 'nl', region: 'Europe & Americas', grade: ['#ff6f00', '#21468b', '#7fd1ff'], sound: 'nl', choose: 'Kies je taal' },
  { code: 'ru', mt: 'ru', native: 'Русский', name: 'Russian', glyph: 'Я', flag: 'ru', region: 'Europe & Americas', grade: ['#2747c9', '#d52b1e', '#a5b4ff'], sound: 'ru', choose: 'Выберите язык' },
  { code: 'uk', mt: 'uk', native: 'Українська', name: 'Ukrainian', glyph: 'Ї', flag: 'ua', region: 'Europe & Americas', grade: ['#0057b7', '#ffd700', '#7cc6fe'], sound: 'uk', choose: 'Оберіть мову' },
  { code: 'pl', mt: 'pl', native: 'Polski', name: 'Polish', glyph: 'Ł', flag: 'pl', region: 'Europe & Americas', grade: ['#dc143c', '#ff8fa3', '#7b61ff'], sound: 'pl', choose: 'Wybierz język' },
  { code: 'sv', mt: 'sv', native: 'Svenska', name: 'Swedish', glyph: 'Å', flag: 'se', region: 'Europe & Americas', grade: ['#006aa7', '#fecc00', '#9bd3ff'], sound: 'sv', choose: 'Välj ditt språk' },
  { code: 'nb', mt: 'nb', native: 'Norsk', name: 'Norwegian', glyph: 'Ø', flag: 'no', region: 'Europe & Americas', grade: ['#3ddc97', '#ba0c2f', '#4361ee'], sound: 'nb', choose: 'Velg språket ditt' },
  { code: 'da', mt: 'da', native: 'Dansk', name: 'Danish', glyph: 'Æ', flag: 'dk', region: 'Europe & Americas', grade: ['#c8102e', '#ffb5c2', '#ff9e00'], sound: 'da', choose: 'Vælg dit sprog' },
  { code: 'fi', mt: 'fi', native: 'Suomi', name: 'Finnish', glyph: 'Ä', flag: 'fi', region: 'Europe & Americas', grade: ['#0b4fbf', '#6fd3ff', '#a0ffe6'], sound: 'fi', choose: 'Valitse kieli' },
  { code: 'el', mt: 'el', native: 'Ελληνικά', name: 'Greek', glyph: 'Ω', flag: 'gr', region: 'Europe & Americas', grade: ['#0d5eaf', '#4cc9f0', '#f7b801'], sound: 'el', choose: 'Επιλέξτε τη γλώσσα σας' },
  { code: 'cs', mt: 'cs', native: 'Čeština', name: 'Czech', glyph: 'Ř', flag: 'cz', region: 'Europe & Americas', grade: ['#11457e', '#d7141a', '#9ad1ff'], sound: 'cs', choose: 'Vyberte si jazyk' },
  { code: 'hu', mt: 'hu', native: 'Magyar', name: 'Hungarian', glyph: 'Ő', flag: 'hu', region: 'Europe & Americas', grade: ['#3f8f55', '#cd2a3e', '#f4e285'], sound: 'hu', choose: 'Válassza ki a nyelvet' },
  { code: 'ro', mt: 'ro', native: 'Română', name: 'Romanian', glyph: 'Ă', flag: 'ro', region: 'Europe & Americas', grade: ['#1d4ed8', '#fcd116', '#ce1126'], sound: 'ro', choose: 'Alegeți limba' },
  { code: 'id', mt: 'id', native: 'Bahasa Indonesia', name: 'Indonesian', glyph: 'Id', flag: 'id', region: 'Asia', grade: ['#ce1126', '#f4a259', '#2a9d8f'], sound: 'id', choose: 'Pilih bahasa Anda' },
  { code: 'ms', mt: 'ms', native: 'Bahasa Melayu', name: 'Malay', glyph: 'Ms', flag: 'my', region: 'Asia', grade: ['#1a3fb8', '#cc0001', '#ffcc00'], sound: 'ms', choose: 'Pilih bahasa anda' },
  { code: 'th', mt: 'th', native: 'ไทย', name: 'Thai', glyph: 'ก', flag: 'th', region: 'Asia', grade: ['#a51931', '#f4c430', '#6c5ce7'], sound: 'th', choose: 'เลือกภาษาของคุณ' },
  { code: 'vi', mt: 'vi', native: 'Tiếng Việt', name: 'Vietnamese', glyph: 'Đ', flag: 'vn', region: 'Asia', grade: ['#da251d', '#ffcd00', '#00a86b'], sound: 'vi', choose: 'Chọn ngôn ngữ của bạn' },
  { code: 'fil', mt: 'fil', native: 'Filipino', name: 'Filipino', glyph: 'Ng', flag: 'ph', region: 'Asia', grade: ['#0038a8', '#ce1126', '#fcd116'], sound: 'fil', choose: 'Piliin ang iyong wika' },
  { code: 'sw', mt: 'sw', native: 'Kiswahili', name: 'Swahili', glyph: 'Sw', flag: 'ke', region: 'Africa', grade: ['#008c51', '#f4c430', '#e76f51'], sound: 'sw', choose: 'Chagua lugha yako' },
];

export const DEFAULT_LANG = 'en';

/** Languages shown on the white (light) theme; every other language gets its dark colour-graded theme.
 *  English is light because it is the default the site is prerendered in. Add codes here to make more
 *  languages light (e.g. LIGHT_THEME = new Set(LANGUAGES.map((l) => l.code)) for an all-white site). */
export const LIGHT_THEME = new Set(['en']);
export const themeFor = (code) => (LIGHT_THEME.has(code) ? 'light' : 'dark');
export const BY_CODE = Object.fromEntries(LANGUAGES.map((l) => [l.code, l]));

/** Best supported language for a browser locale list (navigator.languages), or null. */
export function matchLocale(locales = []) {
  for (const raw of locales) {
    const loc = String(raw || '').toLowerCase();
    if (!loc) continue;
    if (loc.startsWith('zh')) return /tw|hk|mo|hant/.test(loc) ? 'zh-TW' : 'zh-CN';
    if (loc === 'no' || loc.startsWith('nb') || loc.startsWith('nn')) return 'nb';
    if (loc.startsWith('tl') || loc.startsWith('fil')) return 'fil';
    if (loc.startsWith('iw')) return 'he';
    if (loc.startsWith('in') && loc.length === 2) return 'id';
    const base = loc.split('-')[0];
    const hit = LANGUAGES.find((l) => l.code.toLowerCase() === loc || l.code.toLowerCase() === base);
    if (hit) return hit.code;
  }
  return null;
}

/** Resolve "zh", "zh-cn", "ZH-CN", "chinese" etc. from a ?lang= campaign parameter. */
export function resolveLang(value) {
  if (!value) return null;
  const v = String(value).trim();
  const exact = LANGUAGES.find((l) => l.code.toLowerCase() === v.toLowerCase() || l.name.toLowerCase() === v.toLowerCase());
  return exact ? exact.code : matchLocale([v]);
}
