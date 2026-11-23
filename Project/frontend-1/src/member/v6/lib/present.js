// Presentation helpers for the v6 Profiles & Surveys design (trimmed from the v6 lib/present.js).
// Only the pieces the cards, kingdom and emoji pickers need; the question data stays in data/source.js.
import { TW, TMAP } from './themes.js';

export const norm = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const cap = (s) => String(s).replace(/\b[a-z]/g, (c) => c.toUpperCase());
export const SENS=/^(gender|ethnicity|religion|relationship|personal-income|household-income|disabled.*|physically-challendged|sexual.*)$/;
export const RANGE_RE=/\d[\d,.]*\s*(-|–|to)\s*\d|^(up to|under|less than|below|more than|over|above|upto)\b|\d\s*\+|^\$?\d[\d,.]*$|\d\s*(or more|or less|and above|and over|plus)\b|^(none|zero|never)$/i;
export const SCALE_RE=/\b(never|rarely|seldom|sometimes|often|always|daily|weekly|monthly|yearly|annually|every|times a|once|twice|very|somewhat|extremely|not at all|slightly|moderately|likely|unlikely|satisfied|agree|disagree|frequently|occasionally)\b/i;
export const YES=/^(yes|no|not sure|maybe|don'?t know)\b/i;
export const rk=l=>{if(/^(none|zero|never|no )/i.test(l))return -1;const m=String(l).replace(/,/g,'').match(/\d+(\.\d+)?/);if(!m)return 1e15;let x=+m[0];if(/up to|upto|under|less than|below/i.test(l))x-=.5;if(/more than|over|above|\+/i.test(l))x+=.5;return x};
export const EXCL=/^(none|none of (the|these)|no,? none|not applicable|n\/a|i don'?t (use|have|own|do|watch|play|buy|know)|nothing|no one|neither)\b/i;

// our profile slugs that have no world of their own in v6 borrow the closest one
const ALIAS = {
  'shopping-retail': 'shopping', 'banking-financial': 'banking-financial-services', 'technology-digital': 'technology-digital-services',
  'technology-it': 'technology-digital-services', 'business-decisions': 'professional', 'hr-workplace': 'professional',
  'snacks-drinks': 'food-beverages', 'music-media': 'entertainment-media', 'sports-fitness': 'sports-physical-fitness',
  school: 'educational', hobbies: 'lifestyle-food', gaming: 'gaming-esports'
};
export const slugOf = (s) => (TMAP[s] ? s : ALIAS[s] || s);
export const themeId = (p) => { const s = slugOf(p.s); return TMAP[s] && TW[TMAP[s]] ? TMAP[s] : 'rewards'; };
export const themeOf = (p) => TW[themeId(p)];
export const pname = (p) => p.n;
export const pnameT = (p) => p.n;
export const qcount = (p) => p.q || 0;
