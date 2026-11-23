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

// ---- v6 field rules (lib/present.js of the v6 deliverable): which control fits each question, icons, flags ----
export const PRIV=/^(firstname|lastname|mail|alternate-email|phone|alternate-phone|dob|age|zipcode|org-zipcode|workemail|payment-method.*|social-media.*|company-address|orglocation|orgwebsite|orglinkedin)$/;
export const IK=[[/^yes\b/i,'check'],[/^no\b/i,'x'],[/\b(cars?|vehicles?|suvs?|sedans?|hatchbacks?|trucks?|motorbikes?|motorcycles?|scooters?|evs?|electric vehicles?|hybrids?)\b|\bdriv/i,'car'],[/\b(flight|airline|air travel|plane|abroad|international|trip|holiday|vacation|cruise)/i,'send'],[/\b(dogs?|cats?|pets?|birds?|fish|puppy|puppies|kittens?|rabbits?|hamsters?|animals?)\b/i,'paw'],[/\b(laptop|computer|pc|desktop|mac|notebook)\b/i,'laptop'],[/\b(smartphone|mobile|phone|android|iphone|ios|tablet|ipad)/i,'phone'],[/\b(tv|television|netflix|prime video|ott|streaming|movie|film|cinema|series)/i,'tv'],[/\b(console|playstation|xbox|nintendo|switch|steam|game|gaming|esport)/i,'gamepad'],[/\b(vr|virtual reality|headset)/i,'headset'],[/\b(music|spotify|song|audio|podcast|radio|headphone|earbud|speaker)/i,'music'],[/\b(camera|photo|video|youtube|vlog|creator|content|reel)/i,'video'],[/\b(smartwatch|watch|wearable|fitness band|tracker)/i,'clock'],[/\b(internet|wi-?fi|broadband|online|websites?|web|apps?|digital|e-?mail)\b/i,'wifi'],[/\b(software|saas|cloud|technolog|developer|engineer)|\b(ai|it|tech|data)\b/i,'chip'],[/\b(bank|loan|mortgage|credit|debit|card|account)/i,'bank'],[/\b(invest|stock|share|mutual|fund|crypto|trading|bond|pension|retire|saving)/i,'chart'],[/\binsur/i,'shield'],[/\b(cash|money|pay\b|payment|wallet|upi|paypal|income|salary|budget|price|cheap|discount|deal|offer)/i,'wallet'],[/\b(shop|store|mall|retail|supermarket|grocer|market|e-?commerce|amazon|flipkart)/i,'cart'],[/\b(cloth|apparel|fashion|dress|shirt|wear|shoe|footwear|jean|sneaker)/i,'shirt'],[/\b(luxury|premium|jewel|gold|diamond|designer|exclusive)/i,'gem'],[/\b(beauty|skin|makeup|cosmetic|hair|fragrance|perfume|nail|spa|salon|grooming|spf|serum)/i,'sparkle'],[/\b(beer|wine|whisk|vodka|rum|gin|spirit|alcohol|liquor|cocktail|cigar|cigarette|tobacco|vape|nicotine|smok)/i,'glass'],[/\b(coffee|tea|drink|beverage|juice|soda|water|milk|energy drink)/i,'cup'],[/\b(food|meal|restaurant|dining|dine|eat|cook|pizza|burger|snack|breakfast|lunch|dinner|vegan|vegetarian|meat|delivery|takeaway|fast food|cuisine|bakery)/i,'food'],[/\b(gym|fitness|workout|yoga|running|jog|cycl|swim|exercise|training|weights)/i,'dumbbell'],[/\b(sport|football|soccer|cricket|basketball|tennis|golf|rugby|hockey|baseball|badminton|athlet)/i,'ball'],[/\b(doctor|hospital|clinic|medic|medicine|pharma|nurse|dental|therapy|health|vitamin|supplement|prescription)/i,'heartpulse'],[/\b(wellness|meditat|mental|sleep|organic|natural|herbal|eco|green|sustainab)/i,'leaf'],[/\b(school|college|university|degree|student|study|course|class|education|learn|diploma|bachelor|master|phd|doctorate|tuition)/i,'cap'],[/\b(book|read|magazine|newspaper|news|publication|blog|comic)/i,'book'],[/\b(manufactur|factory|industr|construct|mining|energy sector|utilities)/i,'factory'],[/\b(job|work|employ|business|office|company|corporate|professional|manager|executive|director|freelanc|self-employed|owner|ceo|founder)/i,'briefcase'],[/\b(family|child|kid|baby|parent|son|daughter|toddler|teen)/i,'users'],[/\b(friend|social|facebook|instagram|twitter|linkedin|whatsapp|tiktok|snapchat|community|influenc)/i,'users'],[/\b(survey|research|panel|questionnaire|feedback|opinion|poll|focus group|interview|test)/i,'clipboard'],[/\b(reward|gift|voucher|coupon|point|cashback|prize|loyalty)/i,'gift'],[/\b(homes?|houses?|apartments?|flats?|villas?|rent|rented|own|owned|furniture|kitchen|garden|appliances?)\b/i,'home'],[/\b(clean|repair|plumb|maintenance|laundry|electrician|carpent|pest|service)/i,'tool'],[/\b(city|urban|town|rural|village|suburb|region|local|nearby|location)/i,'pin'],[/\b(solar|electric|power|battery|charg)/i,'bolt'],[/\b(daily|weekly|monthly|time|hour|minute|year|week|month|day|often|frequent|once|twice)/i,'clock'],[/\b(none|never|not applicable|n\/a|don'?t|do not|prefer not)/i,'x']];
export const iconFor=l=>{for(const[r,i]of IK)if(r.test(l))return i;return null};
export const FI=[[/mail|paypal|amazon/,'mail'],[/whatsapp|phone/,'call'],[/^(firstname|lastname)$/,'user'],[/dob/,'calendar'],[/zip|location|address/,'pin'],[/website|linkedin|social|youtube|instagram|facebook|-x$/,'link'],[/upi|bank|ifsc|payment/,'wallet'],[/count|^age$|food1[0-8]/,'hash']];
export const fieldIcon = (n) => (FI.find((x) => x[0].test(n)) || [0, 'text'])[1];
export function qIcon(s, n, t) {
  if (/^(org-)?(country|state|city)$/.test(n)) return n.endsWith('country') ? 'globe' : 'pin';
  const f = FI.find((x) => x[0].test(n));
  if (f && !s.opts(n)) return f[1];
  return SENS.test(n) ? t.icon : (iconFor(s.q(n)) || t.icon);
}
export function flagFor(s, n, l, v) {
  if (/^(org-)?country$/.test(n)) return /^[A-Z]{2}$/.test(v) ? v : '';
  if (/^(org-)?state$/.test(n)) return String(v).slice(0, 2);
  if (/countr|travel|destination|visit|abroad|region/i.test(s.q(n))) return CC[norm(l)] || '';
  return '';
}
export function ctxFlag(s, n) {
  if (/^state$|^city$/.test(n)) return s.ans.country;
  if (/^org-(state|city)$/.test(n)) return s.ans['org-country'];
  return '';
}
export function kind(n, o, m) {
  const L = o.map((x) => x[0]);
  // long lists never show every option at once: a searchable dropdown (multi-select for "select all that apply")
  const place = /^(org-)?(country|state|city)$|countr|nationalit|^jobrole$|-jobtype$/.test(n);
  if (m) return place && o.length > 8 ? 'mcombo' : o.length <= 16 ? 'mtiles' : o.length <= 40 ? 'chips' : 'mcombo';
  if (place && o.length > 8) return 'combo';
  if (o.length <= 3 && L.every((l) => YES.test(l)) && L.some((l) => /^yes/i.test(l))) return 'bin';
  const nr = L.filter((l) => RANGE_RE.test(l)).length;
  if (o.length >= 3 && o.length <= 14 && nr >= Math.max(3, L.length * 0.7)) return 'levels';
  if (o.length >= 3 && o.length <= 7 && L.filter((l) => SCALE_RE.test(l)).length >= L.length * 0.6) return 'scale';
  if (o.length <= 8) return 'tiles';
  if (o.length <= 24) return 'rows';
  return 'combo';
}
export const showIcons = (n) => !SENS.test(n) && !/^(org-)?(country|state|city)$/.test(n);
const pool = (t) => [t.icon].concat(t.sats || [], t.fl || []);
export function iconsFor(o, t) {
  const P = pool(t), m = o.map((x) => iconFor(x[0])), u = new Set(m.filter(Boolean));
  return u.size <= 1 && o.length > 2 ? o.map((_, k) => P[k % P.length]) : m.map((x, k) => x || P[k % P.length]);
}
export const MONEY_Q = /^(personal-income|household-income|organization-revenue|luxury6)$/;
// option labels arrive ready to show (money questions already carry the member's currency)
export const optLabel = (s, n, l, v) => (s && s.show ? s.show(v, l) : l);
export const optLabelPeek = optLabel;
// country names used for flags on travel / destination questions
const CC = { usa: 'US', 'united states': 'US', uk: 'GB', 'united kingdom': 'GB', uae: 'AE', 'south korea': 'KR', russia: 'RU', vietnam: 'VN', india: 'IN', canada: 'CA', australia: 'AU', singapore: 'SG', germany: 'DE', france: 'FR', japan: 'JP', china: 'CN', italy: 'IT', spain: 'ES', thailand: 'TH', 'new zealand': 'NZ' };
