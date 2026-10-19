/* Emoji layer (v5): every profile has its own emoji trio, every question gets an emoji that matches what it asks,
   and answer options get an emoji when one clearly fits. Matching runs on the English text, so translations
   never change the picture. Sensitive questions (ethnicity, religion, gender…) get neutral emoji only — no
   stereotyped pictures on options. Emoji are drawn by the visitor's own system font: no image downloads. */
import { SENS } from './present.js';

/* profile slug → [hero, satellite, satellite] */
export const PROFILE_EMOJI = {
  basic: ['🪪', '🌍', '👋'], professional: ['💼', '📈', '🏢'], educational: ['🎓', '📚', '✏️'], financial: ['💰', '📊', '🏦'],
  parenting: ['👨‍👩‍👧', '🍼', '🧸'], 'home-pet': ['🏡', '🐶', '🪴'], shopping: ['🛍️', '🛒', '🏷️'], 'lifestyle-food': ['🍜', '☕', '🥗'],
  travel: ['✈️', '🧳', '🗺️'], automobile: ['🚗', '⛽', '🛞'], health: ['🩺', '💊', '❤️'], beauty: ['💄', '👗', '✨'], tech: ['📱', '💻', '📺'],
  sports: ['⚽', '🏃', '🏆'], game: ['🎮', '🕹️', '👾'], mr: ['📝', '🎁', '⭐'], 'luxury-premium': ['💎', '⌚', '👜'],
  'food-beverages': ['🥤', '🍫', '🧃'], 'restaurants-food-delivery': ['🍕', '🛵', '🍔'], 'consumer-electronics': ['🎧', '📷', '🔌'],
  'technology-digital-services': ['☁️', '🔐', '💻'], 'automotive-mobility': ['⚡', '🚙', '🛴'], 'travel-tourism': ['🏝️', '🏨', '📸'],
  'entertainment-media': ['🎬', '🍿', '🎵'], 'gaming-esports': ['🏆', '🎧', '🎮'], 'sports-physical-fitness': ['🏋️', '🚴', '🥇'],
  'health-wellness': ['🧘', '🥑', '💤'], 'beauty-personal-care': ['🧴', '💅', '🌸'], 'fashion-apparel': ['👟', '🧥', '🕶️'],
  'home-household': ['🛋️', '🧺', '🔧'], 'pets-animal-care': ['🐾', '🐱', '🦴'], 'banking-financial-services': ['🏦', '💳', '📈'],
  'tobacco-nicotine-alcoholic': ['🍷', '🍺', '🥂'], 'household-services': ['🧹', '🛠️', '🧽'], 'content-creator-social-influence1': ['🎥', '📲', '🌟'],
  'research-panel': ['🔬', '📋', '💬'], additional: ['🛡️', '📇', '🧾'],
};
export const profileEmoji = (slug) => PROFILE_EMOJI[slug] || ['⭐', '✨', '💫'];

/* question rules: first match wins (checked on question name, then question text) */
const QN = [
  [/^firstname$|^lastname$|middlename|preferredname/, '🙂'], [/^mail$|email/, '📧'], [/phone|whatsapp/, '📱'], [/^dob$|^age$/, '🎂'],
  [/^gender$/, '🙂'], [/^country$|nationality|residence/, '🌍'], [/^state$|^city$|location|^org-(state|city)/, '📍'], [/zip|postcode|postal/, '📮'],
  [/ethnicity|religion/, '🤝'], [/relationship|marital/, '💞'], [/income/, '💰'], [/^rural$/, '🏘️'], [/children|child_|kids/, '🧒'],
  [/address/, '🏠'], [/linkedin/, '🔗'], [/website/, '🌐'], [/upi|bank|payment|paypal|amazon/, '💳'], [/instagram/, '📸'], [/facebook/, '👍'],
  [/youtube/, '▶️'], [/social-media-x/, '✖️'], [/verify-/, '🔐'], [/company|org/, '🏢'], [/jobtitle|jobrole|seniority|department/, '🧑‍💼'],
  [/experience/, '⏳'], [/institution|grad-year|education|ed_/, '🎓'], [/language/, '🗣️'], [/referral/, '📣'], [/accessib|challendged|disab/, '♿'],
];
const QT = [
  [/\b(car|vehicle|drive|driving|automobile|suv|fuel|petrol|diesel)\b/i, '🚗'], [/\b(electric vehicle|ev|charging)\b/i, '⚡'], [/\b(motorbike|motorcycle|scooter|two-wheeler)\b/i, '🛵'],
  [/\b(flight|fly|airline|airport)\b/i, '✈️'], [/\b(hotel|stay|accommodation|resort|airbnb)\b/i, '🏨'], [/\b(travel|trip|holiday|vacation|tour|destination)\b/i, '🧳'],
  [/\b(dog|puppy)\b/i, '🐶'], [/\b(cat|kitten)\b/i, '🐱'], [/\b(pet|animal|vet)\b/i, '🐾'],
  [/\b(coffee)\b/i, '☕'], [/\b(tea)\b/i, '🍵'], [/\b(beer)\b/i, '🍺'], [/\b(wine)\b/i, '🍷'], [/\b(alcohol|spirits|whisk|vodka|liquor)\b/i, '🥃'],
  [/\b(smok|cigar|tobacco|nicotine|vape)\b/i, '🚬'], [/\b(beverage|drink|juice|soda|soft drink)\b/i, '🥤'], [/\b(snack|chocolate|sweet)\b/i, '🍫'],
  [/\b(restaurant|dine|dining|eat out)\b/i, '🍽️'], [/\b(delivery|order food|takeaway|swiggy|zomato|uber eats)\b/i, '🛵'], [/\b(cook|recipe|kitchen)\b/i, '🍳'],
  [/\b(food|meal|diet|vegetarian|vegan|grocery|groceries)\b/i, '🥗'], [/\b(skin|skincare|cream|lotion)\b/i, '🧴'], [/\b(make-?up|cosmetic|lipstick)\b/i, '💄'],
  [/\b(hair|shampoo|salon)\b/i, '💇'], [/\b(fragrance|perfume|deodorant)\b/i, '🌸'], [/\b(cloth|apparel|fashion|wear|dress|outfit)\b/i, '👗'],
  [/\b(shoe|footwear|sneaker)\b/i, '👟'], [/\b(luxury|premium|designer|jewel|watch)\b/i, '💎'], [/\b(shop|purchase|buy|bought|store|retail|e-?commerce)\b/i, '🛍️'],
  [/\b(smartphone|mobile phone|phone|iphone|android)\b/i, '📱'], [/\b(laptop|computer|pc|desktop)\b/i, '💻'], [/\b(tv|television|streaming|netflix|ott|series|movie|film|cinema)\b/i, '🎬'],
  [/\b(music|song|spotify|podcast|radio)\b/i, '🎵'], [/\b(camera|photo)\b/i, '📷'], [/\b(headphone|earbud|speaker|audio)\b/i, '🎧'], [/\b(smart ?watch|wearable|fitness band)\b/i, '⌚'],
  [/\b(internet|broadband|wi-?fi|isp|data plan)\b/i, '📶'], [/\b(app|software|cloud|saas|subscription)\b/i, '☁️'], [/\b(ai|artificial intelligence|chatgpt)\b/i, '🤖'],
  [/\b(security|privacy|password|cyber)\b/i, '🔐'], [/\b(game|gaming|console|playstation|xbox|nintendo|esport)\b/i, '🎮'],
  [/\b(sport|football|soccer|cricket|basketball|tennis|match)\b/i, '⚽'], [/\b(gym|fitness|workout|exercise|yoga|run|jog|cycle|cycling|swim)\b/i, '🏋️'],
  [/\b(health|doctor|hospital|clinic|medical|medicine|disease|illness|condition|diagnos)\b/i, '🩺'], [/\b(insurance)\b/i, '🛡️'],
  [/\b(sleep)\b/i, '😴'], [/\b(stress|mental|wellbeing|well-being|meditat|mindful)\b/i, '🧘'], [/\b(vitamin|supplement|pill|tablet)\b/i, '💊'],
  [/\b(bank|account|loan|mortgage|credit|debit|card)\b/i, '🏦'], [/\b(invest|stock|share|mutual fund|crypto|trading|saving|pension|retire)\b/i, '📈'],
  [/\b(money|spend|budget|price|cost|pay)\b/i, '💸'], [/\b(home|house|apartment|flat|rent|own|property|residential)\b/i, '🏡'],
  [/\b(furniture|sofa|appliance|household)\b/i, '🛋️'], [/\b(clean|laundry|repair|plumb|maintenance|service)\b/i, '🧹'],
  [/\b(baby|infant|toddler|diaper|nappy)\b/i, '🍼'], [/\b(child|children|kid|son|daughter|parent|school)\b/i, '🧒'], [/\b(family|household members|living with)\b/i, '👨‍👩‍👧'],
  [/\b(job|work|employ|occupation|career|profession|business|industry|sector|organi[sz]ation|company)\b/i, '💼'], [/\b(decision|influence|approve)\b/i, '🧠'],
  [/\b(education|degree|study|university|college|course|class|diploma|qualification)\b/i, '🎓'], [/\b(read|book|magazine|news)\b/i, '📚'],
  [/\b(survey|research|panel|questionnaire|interview|feedback|opinion)\b/i, '📝'], [/\b(reward|gift|voucher|incentive|points)\b/i, '🎁'],
  [/\b(video|zoom|teams|webcam)\b/i, '🎥'], [/\b(social|instagram|facebook|tiktok|influenc|creator|content|followers|youtube)\b/i, '📲'],
  [/\b(how often|frequency|how frequently|times)\b/i, '🔁'], [/\b(when|time|hours?|minutes?|duration)\b/i, '⏰'], [/\b(how many|number of|count)\b/i, '🔢'],
  [/\b(brand|favourite|favorite|prefer|like the most)\b/i, '⭐'], [/\b(language)\b/i, '🗣️'], [/\b(country|countries|abroad|international)\b/i, '🌍'],
];
export function qEmoji(name, text, slug) {
  for (const [r, e] of QN) if (r.test(name)) return e;
  if (!SENS.test(name)) for (const [r, e] of QT) if (r.test(text)) return e;
  return profileEmoji(slug)[0];
}

/* option rules (English label). Only clear matches get an emoji. */
const OPT = [
  [/^yes\b/i, '✅'], [/^no\b|^none\b|^never\b|^not at all|^i don'?t\b|^i do not\b/i, '🚫'], [/^not sure|^maybe|^don'?t know|^can'?t say/i, '🤔'], [/prefer not/i, '🤐'],
  [/^(others?|something else|any ?other|another)\b|please specify/i, '✍️'],
  [/\b(cloth|apparel|fashion|garment)/i, '👕'], [/\baccessor/i, '👜'], [/\belectronic|gadget/i, '🔌'], [/\bhome d[eé]cor|decorative/i, '🖼️'], [/\bgrocer|food items/i, '🛒'],
  [/\bwellness/i, '🌿'], [/\bbeauty|personal care|cosmetic/i, '💄'], [/\bfurnitur/i, '🛋️'], [/\bbooks?\b|stationery/i, '📚'], [/\bpets?\b|pet supplies|pet food/i, '🐾'], [/\bsports? (goods|equipment)|fitness equipment/i, '🏸'], [/\bjewel/i, '💍'],
  [/\bdaily\b|every ?day/i, '📅'], [/\bweekly\b|a week|per week/i, '🗓️'], [/\bmonthly\b|a month|per month/i, '📆'], [/\b(yearly|annually|a year|per year)\b/i, '🎉'],
  [/\b(rarely|occasionally|sometimes)\b/i, '🌤️'], [/\b(often|frequently|always|regularly)\b/i, '🔥'],
  [/\bvery satisfied|extremely|excellent|love\b/i, '😍'], [/\bsatisfied|good|like\b/i, '🙂'], [/\bneutral|average|okay\b/i, '😐'], [/\bdissatisfied|poor|bad|dislike/i, '🙁'],
  [/\bfull[- ]time\b/i, '🧑‍💼'], [/\bpart[- ]time\b/i, '⏱️'], [/\bself[- ]employed|business owner|entrepreneur/i, '🚀'], [/\bfreelanc/i, '💻'], [/\bstudent\b/i, '🎒'],
  [/\bretired\b/i, '🏖️'], [/\bunemployed|looking for work|job ?seeker/i, '🔎'], [/\bhomemaker|stay[- ]at[- ]home/i, '🏠'],
  [/\bmarried\b/i, '💍'], [/\bsingle\b/i, '🧍'], [/\bdivorced|separated\b/i, '💔'], [/\bwidowed\b/i, '🕊️'], [/\bpartner|relationship|living together/i, '💑'],
  [/\b(phd|doctorate)\b/i, '🎓'], [/\bmaster/i, '📜'], [/\bbachelor|graduate|degree/i, '🎓'], [/\bhigh school|secondary|school\b/i, '🏫'], [/\bdiploma|vocational|certificate/i, '📄'],
  [/\burban|city\b/i, '🏙️'], [/\bsuburb/i, '🏘️'], [/\brural|village|countryside/i, '🌾'],
  [/\bown(ed)?\b|homeowner|mortgage/i, '🔑'], [/\brent(ed|ing)?\b/i, '🏢'], [/\bapartment|flat\b/i, '🏢'], [/\bhouse|villa|bungalow/i, '🏡'],
  [/\bdog/i, '🐶'], [/\bcat\b|cats\b/i, '🐱'], [/\bbird/i, '🐦'], [/\bfish/i, '🐠'], [/\brabbit|hamster|guinea/i, '🐰'], [/\breptile|turtle|snake/i, '🐢'],
  [/\b(car|sedan|hatchback|suv)\b/i, '🚗'], [/\belectric|ev\b/i, '⚡'], [/\bhybrid/i, '🔋'], [/\bmotorbike|motorcycle|scooter|two-wheeler/i, '🛵'], [/\bbicycle|bike|cycle\b/i, '🚲'],
  [/\bbus\b/i, '🚌'], [/\btrain|metro|subway|rail/i, '🚆'], [/\btaxi|cab|uber|ola|ride-hailing/i, '🚕'], [/\bwalk/i, '🚶'], [/\bflight|plane|air\b/i, '✈️'],
  [/\bandroid\b/i, '🤖'], [/\biphone|ios|apple\b/i, '🍎'], [/\blaptop|notebook|macbook/i, '💻'], [/\bdesktop|pc\b/i, '🖥️'], [/\btablet|ipad/i, '📱'],
  [/\bsmart ?tv|television|\btv\b/i, '📺'], [/\bsmart ?watch|watch\b/i, '⌚'], [/\bheadphone|earbud|earphone/i, '🎧'], [/\bspeaker/i, '🔊'], [/\bcamera/i, '📷'],
  [/\bconsole|playstation|xbox|nintendo|switch\b/i, '🎮'], [/\bpc gaming|steam/i, '🖱️'], [/\bmobile gam/i, '📱'], [/\bvr\b|virtual reality/i, '🥽'],
  [/\bnetflix|prime video|disney|hotstar|streaming|ott/i, '🍿'], [/\bspotify|music|song/i, '🎵'], [/\bpodcast/i, '🎙️'], [/\byoutube/i, '▶️'], [/\binstagram/i, '📸'],
  [/\bfacebook/i, '👍'], [/\btiktok|reels|shorts/i, '🎬'], [/\bwhatsapp|message|chat/i, '💬'], [/\bemail|e-mail/i, '📧'], [/\bsms|text message/i, '✉️'],
  [/\bcricket/i, '🏏'], [/\bfootball|soccer/i, '⚽'], [/\bbasketball/i, '🏀'], [/\btennis|badminton/i, '🎾'], [/\bgolf/i, '⛳'], [/\bswim/i, '🏊'], [/\brun|jog|marathon/i, '🏃'],
  [/\bgym|weights|strength/i, '🏋️'], [/\byoga|pilates|meditation/i, '🧘'], [/\bcycl/i, '🚴'], [/\bhiking|trek/i, '🥾'], [/\bdance/i, '💃'],
  [/\bcoffee/i, '☕'], [/\btea\b/i, '🍵'], [/\bbeer/i, '🍺'], [/\bwine/i, '🍷'], [/\bwhisk|vodka|rum|gin|spirit|liquor/i, '🥃'], [/\bjuice/i, '🧃'], [/\bwater\b/i, '💧'],
  [/\bsoft drink|soda|cola|carbonated/i, '🥤'], [/\benergy drink/i, '⚡'], [/\bmilk|dairy/i, '🥛'], [/\bchocolate|sweets|candy|dessert/i, '🍫'], [/\bpizza/i, '🍕'],
  [/\bburger|fast food/i, '🍔'], [/\bchinese|noodle/i, '🍜'], [/\bindian|curry/i, '🍛'], [/\bsushi|japanese/i, '🍣'], [/\bvegan|vegetarian|salad|healthy/i, '🥗'],
  [/\bmeat|chicken|non-veg/i, '🍗'], [/\bseafood|fish\b/i, '🐟'], [/\bbread|bakery|cake/i, '🥐'], [/\bfruit/i, '🍎'], [/\bsnack|chips/i, '🍿'],
  [/\bonline\b|website|e-?commerce|amazon|flipkart/i, '🛒'], [/\bin[- ]store|offline|mall|shop\b|supermarket/i, '🏬'], [/\bdiscount|sale|deal|coupon|offer/i, '🏷️'],
  [/\bcredit card/i, '💳'], [/\bdebit card/i, '💳'], [/\bcash\b/i, '💵'], [/\bupi|wallet|paytm|gpay|phonepe|apple pay/i, '📲'], [/\bcrypto|bitcoin/i, '🪙'],
  [/\bstock|share|equity|mutual fund|invest/i, '📈'], [/\bsaving|deposit|fixed deposit/i, '🐷'], [/\bloan|mortgage|emi/i, '🏦'], [/\binsurance/i, '🛡️'], [/\bgold/i, '🥇'],
  [/\bskin ?care|moisturi|serum|cream/i, '🧴'], [/\bmake-?up|lipstick|foundation|mascara/i, '💄'], [/\bhair/i, '💇'], [/\bperfume|fragrance|deodorant/i, '🌸'], [/\bnail/i, '💅'],
  [/\bshampoo|soap|body wash/i, '🧼'], [/\bshav|razor|trimmer/i, '🪒'], [/\bsunscreen|spf/i, '🌞'], [/\bdental|tooth/i, '🦷'],
  [/\bdiabetes/i, '🩸'], [/\bheart|blood pressure|hypertension|cholesterol/i, '❤️'], [/\basthma|allerg/i, '🌬️'], [/\barthritis|joint|back pain/i, '🦴'],
  [/\bdepress|anxiety|mental/i, '🧠'], [/\bcancer/i, '🎗️'], [/\bpregnan/i, '🤰'], [/\bvitamin|supplement/i, '💊'], [/\bdoctor|hospital|clinic/i, '🏥'],
  [/\bbeach|island/i, '🏝️'], [/\bmountain|hill/i, '🏔️'], [/\bhotel|resort/i, '🏨'], [/\bhomestay|airbnb|rental/i, '🏠'], [/\bcruise/i, '🛳️'], [/\bcamping/i, '🏕️'],
  [/\bbusiness trip|work travel/i, '💼'], [/\bdomestic/i, '🗺️'], [/\binternational|abroad/i, '🌏'],
  [/\bclean/i, '🧹'], [/\blaundry/i, '🧺'], [/\bplumb/i, '🔧'], [/\belectric(ian|al)/i, '💡'], [/\bpest/i, '🐜'], [/\bgarden/i, '🌿'], [/\bcook|chef/i, '👩‍🍳'],
  [/\bsolar/i, '☀️'], [/\bwind\b/i, '🌬️'], [/\bfurniture|sofa/i, '🛋️'], [/\bkitchen|appliance|refrigerator|fridge|microwave|washing machine/i, '🍳'],
  [/\bbaby|infant|toddler/i, '🍼'], [/\btoy/i, '🧸'], [/\bschool|tuition|study/i, '📚'], [/\bteen/i, '🧑'],
  [/\bsurvey/i, '📝'], [/\binterview|focus group/i, '🗣️'], [/\bvideo/i, '🎥'], [/\bproduct test|usability/i, '🧪'], [/\bgift card|voucher|reward|points/i, '🎁'], [/\bpaypal/i, '💸'],
  [/\bmorning/i, '🌅'], [/\bafternoon/i, '☀️'], [/\bevening/i, '🌆'], [/\bnight/i, '🌙'], [/\bweekend/i, '🎈'],
  [/\bmanager|director|head of|vp\b|vice president/i, '🧑‍💼'], [/\bceo|cfo|cto|founder|owner|chief/i, '👑'], [/\bengineer|developer|it\b/i, '👩‍💻'],
  [/\bhealthcare|nurse|medical/i, '⚕️'], [/\bteacher|education/i, '👩‍🏫'], [/\bsales|marketing/i, '📣'], [/\bfinance|accounting|banking/i, '💹'], [/\bretail/i, '🛍️'],
  [/\bmanufactur|factory|industrial/i, '🏭'], [/\bgovernment|public sector/i, '🏛️'], [/\blegal|law/i, '⚖️'], [/\bagricultur|farm/i, '🚜'], [/\bconstruction/i, '🏗️'],
  [/\bhospitality|restaurant|hotel/i, '🍽️'], [/\btransport|logistics/i, '🚚'], [/\bmedia|advertising/i, '📺'], [/\btelecom/i, '📡'], [/\benergy|oil|gas\b/i, '🛢️'],
];
/* Every rule is word-anchored on each alternative ("hair" must not match "air"), and the e.g. list in brackets
   is ignored so "Beauty products (e.g., hair care)" is judged by "Beauty products". */
function splitTop(src) { const out = []; let d = 0, cur = ''; for (let i = 0; i < src.length; i++) { const c = src[i]; if (c === '\\') { cur += c + src[++i]; continue; } if (c === '(') d++; if (c === ')') d--; if (c === '|' && !d) { out.push(cur); cur = ''; } else cur += c; } out.push(cur); return out; }
const anchor = (r) => { const s = r.source; if (!s.startsWith('\\b') || s.startsWith('\\b(')) return r; return new RegExp(splitTop(s).map((a) => (a.startsWith('\\b') || a.startsWith('^') ? a : '\\b' + a)).join('|'), r.flags); };
const OPTA = OPT.map(([r, e]) => [anchor(r), e]);
export function optEmoji(n, label) {
  label = String(label).replace(/\s*\((e\.g\.?|eg|i\.e\.?|such as|like)[^)]*\)/gi, '').trim() || String(label);
  if (SENS.test(n) || /^(org-)?(country|state|city)$/.test(n) || /nationality|residence|language/.test(n)) return /^prefer not/i.test(label) ? '🤐' : /^(others?|another)\b/i.test(label) ? '✍️' : '';
  for (const [r, e] of OPTA) if (r.test(label)) return e;
  return '';
}
