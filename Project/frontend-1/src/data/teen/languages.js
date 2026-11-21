/**
 * Languages offered for survey delivery and interviews.
 *
 * `code` is a BCP-47 tag and is what your backend receives — never the display
 * name, which changes with the interface language. `flag` is the ISO country
 * whose flag is shown beside it, and `glyph` is one or two
 * characters of the script, used as the option icon so the list reads as a list
 * of writing systems rather than a wall of text.
 *
 * This is the same set the Member Profile Studio ships, trimmed to the 46 that
 * T2O currently fields studies in. Adding one is a single line here.
 */
export const LANGUAGES = [
  { code: 'en', flag: 'gb', native: 'English', name: 'English', glyph: 'Aa' },
  { code: 'hi', flag: 'in', native: 'हिन्दी', name: 'Hindi', glyph: 'अ' },
  { code: 'bn', flag: 'bd', native: 'বাংলা', name: 'Bengali', glyph: 'অ' },
  { code: 'ta', flag: 'in', native: 'தமிழ்', name: 'Tamil', glyph: 'அ' },
  { code: 'te', flag: 'in', native: 'తెలుగు', name: 'Telugu', glyph: 'అ' },
  { code: 'mr', flag: 'in', native: 'मराठी', name: 'Marathi', glyph: 'म' },
  { code: 'gu', flag: 'in', native: 'ગુજરાતી', name: 'Gujarati', glyph: 'ગ' },
  { code: 'kn', flag: 'in', native: 'ಕನ್ನಡ', name: 'Kannada', glyph: 'ಕ' },
  { code: 'ml', flag: 'in', native: 'മലയാളം', name: 'Malayalam', glyph: 'മ' },
  { code: 'pa', flag: 'in', native: 'ਪੰਜਾਬੀ', name: 'Punjabi', glyph: 'ਪ' },
  { code: 'or', flag: 'in', native: 'ଓଡ଼ିଆ', name: 'Odia', glyph: 'ଓ' },
  { code: 'as', flag: 'in', native: 'অসমীয়া', name: 'Assamese', glyph: 'অ' },
  { code: 'ur', flag: 'pk', native: 'اردو', name: 'Urdu', glyph: 'ا', dir: 'rtl' },
  { code: 'ne', flag: 'np', native: 'नेपाली', name: 'Nepali', glyph: 'न' },
  { code: 'si', flag: 'lk', native: 'සිංහල', name: 'Sinhala', glyph: 'සි' },
  { code: 'ar', flag: 'sa', native: 'العربية', name: 'Arabic', glyph: 'ع', dir: 'rtl' },
  { code: 'fa', flag: 'ir', native: 'فارسی', name: 'Persian', glyph: 'ف', dir: 'rtl' },
  { code: 'he', flag: 'il', native: 'עברית', name: 'Hebrew', glyph: 'א', dir: 'rtl' },
  { code: 'tr', flag: 'tr', native: 'Türkçe', name: 'Turkish', glyph: 'Tü' },
  { code: 'zh-CN', flag: 'cn', native: '简体中文', name: 'Chinese (Simplified)', glyph: '文' },
  { code: 'zh-TW', flag: 'tw', native: '繁體中文', name: 'Chinese (Traditional)', glyph: '語' },
  { code: 'ja', flag: 'jp', native: '日本語', name: 'Japanese', glyph: 'あ' },
  { code: 'ko', flag: 'kr', native: '한국어', name: 'Korean', glyph: '한' },
  { code: 'th', flag: 'th', native: 'ไทย', name: 'Thai', glyph: 'ก' },
  { code: 'vi', flag: 'vn', native: 'Tiếng Việt', name: 'Vietnamese', glyph: 'Vi' },
  { code: 'id', flag: 'id', native: 'Bahasa Indonesia', name: 'Indonesian', glyph: 'In' },
  { code: 'ms', flag: 'my', native: 'Bahasa Melayu', name: 'Malay', glyph: 'Ms' },
  { code: 'fil', flag: 'ph', native: 'Filipino', name: 'Filipino', glyph: 'Fi' },
  { code: 'km', flag: 'kh', native: 'ខ្មែរ', name: 'Khmer', glyph: 'ក' },
  { code: 'my', flag: 'mm', native: 'မြန်မာ', name: 'Burmese', glyph: 'မ' },
  { code: 'fr', flag: 'fr', native: 'Français', name: 'French', glyph: 'Fr' },
  { code: 'de', flag: 'de', native: 'Deutsch', name: 'German', glyph: 'De' },
  { code: 'es', flag: 'es', native: 'Español', name: 'Spanish', glyph: 'Es' },
  { code: 'pt', flag: 'br', native: 'Português', name: 'Portuguese', glyph: 'Pt' },
  { code: 'it', flag: 'it', native: 'Italiano', name: 'Italian', glyph: 'It' },
  { code: 'nl', flag: 'nl', native: 'Nederlands', name: 'Dutch', glyph: 'Nl' },
  { code: 'pl', flag: 'pl', native: 'Polski', name: 'Polish', glyph: 'Pl' },
  { code: 'ru', flag: 'ru', native: 'Русский', name: 'Russian', glyph: 'Я' },
  { code: 'uk', flag: 'ua', native: 'Українська', name: 'Ukrainian', glyph: 'Ї' },
  { code: 'ro', flag: 'ro', native: 'Română', name: 'Romanian', glyph: 'Ro' },
  { code: 'el', flag: 'gr', native: 'Ελληνικά', name: 'Greek', glyph: 'Ω' },
  { code: 'sv', flag: 'se', native: 'Svenska', name: 'Swedish', glyph: 'Sv' },
  { code: 'sw', flag: 'ke', native: 'Kiswahili', name: 'Swahili', glyph: 'Sw' },
  { code: 'ha', flag: 'ng', native: 'Hausa', name: 'Hausa', glyph: 'Ha' },
  { code: 'yo', flag: 'ng', native: 'Yorùbá', name: 'Yoruba', glyph: 'Yo' },
  { code: 'af', flag: 'za', native: 'Afrikaans', name: 'Afrikaans', glyph: 'Af' },
];

export const languageName = (code) => LANGUAGES.find((l) => l.code === code)?.native || code;

export default LANGUAGES;
