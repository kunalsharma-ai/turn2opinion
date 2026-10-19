/* Presentation rules: icon keywords, flags, theme lookup and which control fits each question. */
import { INCOME_Q, incomeLabel } from './income.js';
import { TW, TMAP, NAMES } from './themes.js';
import { tr, peekTr, regionName } from '../i18n/index.js';
export const norm = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const cap = (s) => String(s).replace(/\b[a-z]/g, (c) => c.toUpperCase());
export const SENS=/^(gender|ethnicity|religion|relationship|personal-income|household-income|disabled.*|physically-challendged|sexual.*)$/;
export const PRIV=/^(firstname|lastname|mail|alternate-email|phone|alternate-phone|dob|age|zipcode|org-zipcode|workemail|payment-method.*|social-media.*|company-address|orglocation|orgwebsite|orglinkedin)$/;
export const IK=[[/^yes\b/i,'check'],[/^no\b/i,'x'],[/\b(cars?|vehicles?|suvs?|sedans?|hatchbacks?|trucks?|motorbikes?|motorcycles?|scooters?|evs?|electric vehicles?|hybrids?)\b|\bdriv/i,'car'],[/\b(flight|airline|air travel|plane|abroad|international|trip|holiday|vacation|cruise)/i,'send'],[/\b(dogs?|cats?|pets?|birds?|fish|puppy|puppies|kittens?|rabbits?|hamsters?|animals?)\b/i,'paw'],[/\b(laptop|computer|pc|desktop|mac|notebook)\b/i,'laptop'],[/\b(smartphone|mobile|phone|android|iphone|ios|tablet|ipad)/i,'phone'],[/\b(tv|television|netflix|prime video|ott|streaming|movie|film|cinema|series)/i,'tv'],[/\b(console|playstation|xbox|nintendo|switch|steam|game|gaming|esport)/i,'gamepad'],[/\b(vr|virtual reality|headset)/i,'headset'],[/\b(music|spotify|song|audio|podcast|radio|headphone|earbud|speaker)/i,'music'],[/\b(camera|photo|video|youtube|vlog|creator|content|reel)/i,'video'],[/\b(smartwatch|watch|wearable|fitness band|tracker)/i,'clock'],[/\b(internet|wi-?fi|broadband|online|websites?|web|apps?|digital|e-?mail)\b/i,'wifi'],[/\b(software|saas|cloud|technolog|developer|engineer)|\b(ai|it|tech|data)\b/i,'chip'],[/\b(bank|loan|mortgage|credit|debit|card|account)/i,'bank'],[/\b(invest|stock|share|mutual|fund|crypto|trading|bond|pension|retire|saving)/i,'chart'],[/\binsur/i,'shield'],[/\b(cash|money|pay\b|payment|wallet|upi|paypal|income|salary|budget|price|cheap|discount|deal|offer)/i,'wallet'],[/\b(shop|store|mall|retail|supermarket|grocer|market|e-?commerce|amazon|flipkart)/i,'cart'],[/\b(cloth|apparel|fashion|dress|shirt|wear|shoe|footwear|jean|sneaker)/i,'shirt'],[/\b(luxury|premium|jewel|gold|diamond|designer|exclusive)/i,'gem'],[/\b(beauty|skin|makeup|cosmetic|hair|fragrance|perfume|nail|spa|salon|grooming|spf|serum)/i,'sparkle'],[/\b(beer|wine|whisk|vodka|rum|gin|spirit|alcohol|liquor|cocktail|cigar|cigarette|tobacco|vape|nicotine|smok)/i,'glass'],[/\b(coffee|tea|drink|beverage|juice|soda|water|milk|energy drink)/i,'cup'],[/\b(food|meal|restaurant|dining|dine|eat|cook|pizza|burger|snack|breakfast|lunch|dinner|vegan|vegetarian|meat|delivery|takeaway|fast food|cuisine|bakery)/i,'food'],[/\b(gym|fitness|workout|yoga|running|jog|cycl|swim|exercise|training|weights)/i,'dumbbell'],[/\b(sport|football|soccer|cricket|basketball|tennis|golf|rugby|hockey|baseball|badminton|athlet)/i,'ball'],[/\b(doctor|hospital|clinic|medic|medicine|pharma|nurse|dental|therapy|health|vitamin|supplement|prescription)/i,'heartpulse'],[/\b(wellness|meditat|mental|sleep|organic|natural|herbal|eco|green|sustainab)/i,'leaf'],[/\b(school|college|university|degree|student|study|course|class|education|learn|diploma|bachelor|master|phd|doctorate|tuition)/i,'cap'],[/\b(book|read|magazine|newspaper|news|publication|blog|comic)/i,'book'],[/\b(manufactur|factory|industr|construct|mining|energy sector|utilities)/i,'factory'],[/\b(job|work|employ|business|office|company|corporate|professional|manager|executive|director|freelanc|self-employed|owner|ceo|founder)/i,'briefcase'],[/\b(family|child|kid|baby|parent|son|daughter|toddler|teen)/i,'users'],[/\b(friend|social|facebook|instagram|twitter|linkedin|whatsapp|tiktok|snapchat|community|influenc)/i,'users'],[/\b(survey|research|panel|questionnaire|feedback|opinion|poll|focus group|interview|test)/i,'clipboard'],[/\b(reward|gift|voucher|coupon|point|cashback|prize|loyalty)/i,'gift'],[/\b(homes?|houses?|apartments?|flats?|villas?|rent|rented|own|owned|furniture|kitchen|garden|appliances?)\b/i,'home'],[/\b(clean|repair|plumb|maintenance|laundry|electrician|carpent|pest|service)/i,'tool'],[/\b(city|urban|town|rural|village|suburb|region|local|nearby|location)/i,'pin'],[/\b(solar|electric|power|battery|charg)/i,'bolt'],[/\b(daily|weekly|monthly|time|hour|minute|year|week|month|day|often|frequent|once|twice)/i,'clock'],[/\b(none|never|not applicable|n\/a|don'?t|do not|prefer not)/i,'x']];
export const iconFor=l=>{for(const[r,i]of IK)if(r.test(l))return i;return null};
export const FI=[[/mail|paypal|amazon/,'mail'],[/whatsapp|phone/,'call'],[/^(firstname|lastname)$/,'user'],[/dob/,'calendar'],[/zip|location|address/,'pin'],[/website|linkedin|social|youtube|instagram|facebook|-x$/,'link'],[/upi|bank|ifsc|payment/,'wallet'],[/count|^age$|food1[0-8]/,'hash']];
export const RANGE_RE=/\d[\d,.]*\s*(-|–|to)\s*\d|^(up to|under|less than|below|more than|over|above|upto)\b|\d\s*\+|^\$?\d[\d,.]*$|\d\s*(or more|or less|and above|and over|plus)\b|^(none|zero|never)$/i;
export const SCALE_RE=/\b(never|rarely|seldom|sometimes|often|always|daily|weekly|monthly|yearly|annually|every|times a|once|twice|very|somewhat|extremely|not at all|slightly|moderately|likely|unlikely|satisfied|agree|disagree|frequently|occasionally)\b/i;
export const YES=/^(yes|no|not sure|maybe|don'?t know)\b/i;
export const rk=l=>{if(/^(none|zero|never|no )/i.test(l))return -1;const m=String(l).replace(/,/g,'').match(/\d+(\.\d+)?/);if(!m)return 1e15;let x=+m[0];if(/up to|upto|under|less than|below/i.test(l))x-=.5;if(/more than|over|above|\+/i.test(l))x+=.5;return x};
export const EXCL=/^(none|none of (the|these)|no,? none|not applicable|n\/a|i don'?t (use|have|own|do|watch|play|buy|know)|nothing|no one|neither)\b/i;
export const fieldIcon = (n) => (FI.find((x) => x[0].test(n)) || [0, 'text'])[1];
export const themeId = (p) => (TMAP[p.s] && TW[TMAP[p.s]] ? TMAP[p.s] : 'rewards');
export const themeOf = (p) => TW[themeId(p)];
export const pname = (p) => NAMES[p.n] || cap(p.n);
export const qcount = (p) => p.p.reduce((s, g) => s + g[1].length, 0);
export function qIcon(s, n, t) {
  if (/^(org-)?(country|state|city)$/.test(n)) return n.endsWith('country') ? 'globe' : 'pin';
  const f = FI.find((x) => x[0].test(n));
  if (f && !s.opts(n)) return f[1];
  return SENS.test(n) ? t.icon : (iconFor(s.q(n)) || t.icon);
}
/* countries: name -> ISO code, used for flags on travel/destination questions */
const CC = {}; export const CN = {};
export function buildCountryMap(D) {
  const c = D.O.country && D.O.country[''];
  if (!c) return;
  c.forEach(([l, v]) => { CC[norm(l)] = v; CN[v] = l; });
  Object.assign(CC, { usa: 'US', 'united states': 'US', uk: 'GB', 'united kingdom': 'GB', uae: 'AE', 'south korea': 'KR', russia: 'RU', vietnam: 'VN' });
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
export const isCount = (s, n) => s.spec(n).kind === 'count';
export function kind(n, o, m) {
  const L = o.map((x) => x[0]);
  if (m) return o.length <= 16 ? 'mtiles' : 'chips';
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

/* ---------- translated text helpers ---------- */
const COUNTRY_Q = /^(org-)?country$/;
/* Option label in the visitor's language. Country lists use the browser's own localized names. */
export function optLabel(s, n, l, v) {
  if (COUNTRY_Q.test(n) && /^[A-Z]{2}$/.test(v)) return regionName(v) || tr(l);
  if (INCOME_Q.test(n)) { const x = incomeLabel(l, s.ctx ? s.ctx(n).A.country : s.ans.country); if (x) return x; }
  return tr(l);
}
export function optLabelPeek(s, n, l, v) {
  if (COUNTRY_Q.test(n) && /^[A-Z]{2}$/.test(v)) return regionName(v) || peekTr(l);
  if (INCOME_Q.test(n)) { const x = incomeLabel(l, s.ctx ? s.ctx(n).A.country : s.ans.country); if (x) return x; }
  return peekTr(l);
}
export const qText = (s, n) => tr(s.q(n));
export function ansLabel(s, n, v) {
  const o = s.opts(n), spec = s.ans && s.ans[n + '-other'];
  const f = (x) => { const h = o && o.find((y) => y[1] == x); if (!h) return x; const l = optLabel(s, n, h[0], h[1]); return spec && /^\s*(others?|something else|any ?other|another)\b|please specify|\(specify\)/i.test(h[0]) ? l + ': ' + spec : l; };
  return Array.isArray(v) ? v.map(f).join(', ') : f(v);
}
export const pnameT = (p) => tr(pname(p));
export const secName = (sec) => tr(cap(sec).trim());
