/* CHANGE-11 · "Each option should have a unique, fresh emoji that resonates with the option — no random emoji."
   optEmojiSet(n, labels) gives every option of a question its picture, in three steps:
     1. the v5 rules (lib/emoji.js) for clear matches, plus ~300 more keyword rules below
     2. numeric options (counts, ranges, money, time) get an ordered ladder that grows with the value:
        counts 1️⃣ 2️⃣ 3️⃣ …, money 🪙 💵 💰 💳 🏦 💎 👑 …, durations ⏱️ ⏲️ ⌛ ⏳ 🕰️ 📆 …, sizes 🌱 🌿 🪴 🌳 🌲 🏔️ …
     3. no emoji is ever repeated inside one question: a clash takes a related alternative; an option with no
        meaningful picture (e.g. a brand name) gets a monogram tile with its initials instead of a random emoji.
   Sensitive questions (gender identity, ethnicity, religion…) keep neutral treatment (no stereotyped pictures).
   Matching runs on the English text, so translations never change the picture. Presentation only. */
import { optEmoji } from './emoji.js';
import { SENS, rk, RANGE_RE } from './present.js';

const R = (re, e) => [new RegExp(re, 'i'), e];
/* checked before the v5 rules: fixes clashes such as "Mac Book" → 📚 */
const PRE = [
  R('mac ?book|imac|\\bmac\\b', '🍏'), R('chrome ?book', '🌐'), R('net ?book|note ?book|laptop', '💻'), R('gaming (pc|laptop)', '🎮'), R('e-?book|kindle|e-reader', '📱'), R('audio ?book', '🎧'),
  R('hospitality', '🛎️'), R('studio/bachelor|studio apartment', '🏠'),
];
const MORE = [
  R('studio', '🏠'), R('one[- ]bed', '🛏️'), R('two[- ]bed', '🛌'), R('three|four or more bed', '🏡'), R('\\bcheek', '😊'), R('\\bchin\\b', '🗿'), R('\\bear\\b|ears\\b', '👂'), R('eyelid|eye\\b|eyes\\b', '👁️'), R('\\blips?\\b', '👄'), R('face ?lift|\\bface\\b', '🙂'), R('\\bnose|rhinoplast', '👃'), R('\\bneck', '🦒'), R('\\babdomen|tummy|belly', '🫃'),
  R('bath & body|bath and body|\\bbath', '🛁'), R('oral care|toothpaste', '🪥'), R('hygiene', '🧼'), R('every 2|every two|every few|every 3', '🔄'), R('few times a year', '🎉'), R('mobile pay|payment app', '📱'), R('convertible', '🚘'), R('coupe', '🏎️'), R('wagon|estate car', '🚙'),
  R('visa\\b', '💳'), R('mastercard|master card|mastro', '💳'), R('amex|american express', '💳'), R('rupay', '💳'), R('checking|current account', '🏦'), R('savings account', '🐷'), R('life insurance|^life\\b', '❤️'), R('elder care|senior care', '👴'), R('event|party|social planning', '🎉'), R('budget', '📒'), R('organi[sz]ation|declutter', '🗃️'), R('agricultur|farm|plant science|horticult', '🌾'), R('animal science|veterinar', '🐄'), R('engineering', '⚙️'), R('mathemat|statistic', '📐'), R('architect', '🏛️'), R('nursing', '🩺'), R('medicine|medical', '⚕️'), R('humanities|arts\\b', '🎨'), R('natural science|science', '🔬'), R('social science', '🧠'), R('law\\b|legal|juris', '⚖️'), R('management', '📊'), R('accounts?\\b|accounting', '🧮'), R('production', '🏭'), R('warehous|store & ', '📦'), R('printer|copier', '🖨️'), R('server', '🗄️'), R('telecom', '📡'), R('recruit|hiring|new hires', '🧑‍💼'), R('maintenance|facilities', '🔧'), R('raw material', '🪨'), R('handheld|smart ?phone|cell', '📱'), R('virtuali', '🖥️'), R('meeting', '📅'), R('recently joined|new joiner', '🆕'), R('editorial|journalism|content', '📝'), R('customer success', '🤝'),
  R('^definitely yes|^yes,? definitely|^absolutely', '💯'), R('^probably yes|^likely|^yes,? probably', '👍'), R('^probably no|^unlikely', '👎'), R('^definitely no|^no,? definitely|^absolutely not', '❌'),
  R('^not applicable|^n/?a\\b', '➖'), R('^previously|^used to|in the past|^formerly', '⏪'), R('^both( equally)?\\b', '⚖️'), R('^myself|^me\\b|^i do\\b', '🙋'), R('^my (spouse|partner)|spouse|partner', '💑'),
  R('grandparent', '👵'), R('nanny|babysit', '🧑‍🍼'), R('daycare|day care|creche', '🏫'), R('preschool|kindergarten|nursery', '🧒'), R('tutor', '📖'), R('childcare|child care', '🧸'), R('friends?/family|family and friends|friends', '👨‍👩‍👧'),
  R('primary decision|sole decision|final decision|decision[- ]maker', '👑'), R('give input|recommend|influence the decision|^influencer|major influencer', '📣'), R('not (usually )?involved|no involvement', '🙅'), R('^shared|jointly|together', '🤝'),
  R('^action\\b', '💥'), R('comedy', '😂'), R('horror', '👻'), R('thriller|suspense|mystery', '🕵️'), R('drama', '🎭'), R('romance|romantic', '💕'), R('documentar', '🎞️'), R('animation|animated|cartoon|anime', '🧸'), R('sci-?fi|science fiction', '🛸'), R('fantasy', '🧙'), R('adventure', '🗺️'), R('reality', '📺'), R('musical', '🎶'), R('crime', '🚔'), R('family\\b', '👨‍👩‍👧'),
  R('strategy', '♟️'), R('racing', '🏎️'), R('simulation', '🛩️'), R('puzzle', '🧩'), R('fighting', '🥊'), R('^casual', '🎈'), R('\\bfps\\b|shooter', '🎯'), R('\\brpg\\b|role[- ]playing', '🧝'), R('\\bmoba\\b', '🛡️'), R('battle royale', '🪂'), R('sandbox|minecraft', '🧱'), R('platformer', '🍄'), R('card game|board game', '🃏'), R('trivia|quiz', '❓'),
  R('pinterest', '📌'), R('reddit', '👽'), R('snapchat', '👻'), R('twitch', '🟣'), R('linkedin', '💼'), R('discord', '🎧'), R('^x\\b|twitter', '✖️'), R('telegram', '✈️'), R('threads', '🧵'), R('quora', '❔'), R('wechat', '💬'), R('blog', '✍️'),
  R('diary', '📔'), R('advertis|ad test', '📢'), R('packag', '📦'), R('concept', '💡'), R('shopper|store research|in-store research', '🛒'), R('taste test|sensory', '👅'), R('home use|product test|in-home', '🏠'), R('usability|ux\\b|user experience', '🖱️'), R('eye[- ]tracking', '👁️'), R('mobile research|app-based', '📲'), R('online community', '🌐'), R('in-person|face to face|face-to-face', '🤝'), R('phone interview|telephone', '☎️'), R('research\\b', '🔬'),
  R('pharmac|chemist|drugstore', '💊'), R('^sports?\\b', '🏅'), R('^travel', '✈️'), R('technolog|^tech\\b', '💻'), R('entertainment', '🎉'), R('gaming|games?\\b', '🎮'), R('^business', '💼'), R('^food\\b', '🍽️'), R('^health\\b', '❤️‍🩹'), R('lifestyle', '🌟'), R('^radio', '📻'), R('hockey', '🏒'), R('baseball', '⚾'), R('wrestl', '🤼'), R('boxing|mma|martial', '🥋'), R('volleyball', '🏐'), R('rugby|american football', '🏉'), R('skiing|snowboard', '⛷️'), R('skate', '🛹'), R('surf', '🏄'), R('climb', '🧗'), R('chess', '♟️'), R('motorsport|formula|f1\\b', '🏁'), R('athletics|track and field', '🏃'),
  R('news', '📰'), R('search engine|google search', '🔍'), R('cloud', '☁️'), R('buy now pay later|bnpl|pay later', '🧾'), R('bank transfer|net ?banking|wire', '🏦'), R('cheque|check\\b', '🧾'), R('cash on delivery|\\bcod\\b', '💵'), R('smart home', '🏠'), R('watches', '⌚'), R('townhouse|row house', '🏘️'), R('\\bvan\\b|minivan', '🚐'), R('truck|pickup', '🛻'), R('cigarette', '🚬'), R('cigar\\b', '🚬'), R('hookah|shisha', '💨'), R('e-?cig|vape|vaping', '💨'), R('hostel', '🛏️'), R('bedding|mattress', '🛏️'), R('office suppl|stationery', '📎'), R('paint', '🎨'), R('draw|sketch', '✏️'), R('photograph', '📸'), R('gardening', '🌻'), R('knit|sew|craft', '🧶'), R('cooking|baking', '👩‍🍳'), R('reading', '📖'), R('writing', '✍️'), R('volunteer', '🤲'), R('meditat|mindful', '🧘'), R('theatre|theater', '🎭'), R('concert|live music', '🎤'), R('museum|art gallery', '🖼️'), R('nightlife|club', '🪩'), R('shopping', '🛍️'),
  R('liberal arts', '🎨'), R('private univ', '🏛️'), R('public univ|state univ', '🏫'), R('college|university', '🎓'), R('online (course|learning|class)|e-?learning', '💻'), R('community college', '🏫'), R('boarding', '🏰'),
  R('food & bev|food and bev', '🍱'), R('^beverage', '🧃'), R('organic', '🌱'), R('brand (store|outlet)|official store', '🏷️'), R('eye ?care|optical|glasses|spectacle', '👓'), R('contact lens', '👁️'), R('emergency', '🚑'), R('dental|dentist', '🦷'), R('physio', '🦵'), R('only when needed|as needed|when required', '🆘'), R('once or twice', '✌️'), R('^never\\b', '🚫'),
  R('harness|leash|collar', '🦮'), R('pet food|kibble', '🦴'), R('grooming', '✂️'), R('\\btoys?\\b', '🧸'), R('aquarium', '🐠'), R('litter', '🧻'),
  R('apple|iphone|ipad|macbook', '🍎'), R('android', '🤖'), R('windows', '🪟'), R('linux', '🐧'), R('playstation', '🎮'), R('xbox', '🟩'), R('nintendo', '🍄'),
  R('subscription', '🔁'), R('free\\b|freemium', '🆓'), R('premium|paid\\b', '💎'), R('trial', '🧪'), R('discount|coupon|promo', '🏷️'), R('loyalty|reward', '🎁'), R('cashback', '💸'), R('gift card|voucher', '🎫'),
  R('self[- ]service|kiosk', '🖥️'), R('drive[- ]?thru|drive[- ]?through', '🚗'), R('dine[- ]in', '🍽️'), R('take ?away|takeout|pick[- ]?up', '🥡'), R('home delivery|delivered', '🛵'), R('quick commerce|q-?commerce|10[- ]minute', '⚡'),
  R('public sector|govt|government|defen[cs]e', '🏛️'), R('non-?profit|ngo|charity', '🤲'), R('start-?up', '🚀'), R('enterprise|large (company|org)', '🏢'), R('small business|sme\\b|smb\\b', '🏪'), R('service', '🛎️'), R('consult', '🧑‍💼'), R('real estate|property', '🏘️'), R('insurance', '🛡️'), R('pharma', '💊'), R('automotive|auto\\b', '🚗'), R('aerospace|aviation', '✈️'), R('education', '🎓'), R('hospital|clinic', '🏥'), R('it services|software', '💻'), R('marketing|advertising|pr\\b', '📣'), R('research', '🔬'), R('logistic|shipping|courier', '🚚'), R('hr\\b|human resource', '🧑‍🤝‍🧑'), R('procure|purchas', '🛒'), R('operations', '⚙️'), R('legal', '⚖️'), R('customer (service|support)', '🎧'), R('design', '🎨'), R('product management', '🧭'), R('admin', '🗂️'), R('security', '🔐'),
  R('weekday', '📅'), R('lunch ?time|midday', '🥪'), R('late night|after midnight', '🌃'), R('early morning|dawn', '🌄'), R('holiday|festival|season', '🎊'), R('birthday', '🎂'), R('anniversar', '💝'), R('special occasion', '🥂'),
  R('quality', '🏅'), R('price|cheap|afford|value for money', '💲'), R('convenien', '👌'), R('brand\\b', '🏷️'), R('review|rating', '⭐'), R('recommendation|word of mouth', '🗣️'), R('habit|routine', '🔁'), R('taste|flavou?r', '😋'), R('health benefit|healthy', '🥦'), R('eco|sustainab|environment', '🌍'), R('design|look|style', '✨'), R('speed|fast', '⚡'), R('reliab|trust', '🤝'), R('innovation|new feature', '🆕'), R('availability|in stock', '📦'), R('safety|safe\\b', '🦺'), R('comfort', '🛋️'), R('performance', '🏎️'), R('battery', '🔋'), R('camera', '📷'), R('storage', '💾'), R('screen|display', '🖥️'),
  R('very (likely|interested|important)|extremely', '🤩'), R('somewhat|fairly|moderately', '🙂'), R('not very|slightly|a little', '😐'), R('not at all|not interested|not important', '😶'),
  R('increase|more than before|more often', '📈'), R('decrease|less than before|less often', '📉'), R('same|no change|about the same|stayed', '➡️'),
  R('male\\b|^man\\b', ''), // gender handled as sensitive
];

const ALT = {
  '🎓': ['🏛️', '📜', '🧑‍🎓'], '🔄': ['🔁', '♻️', '🔃'], '📰': ['🗞️', '📡', '📣'], '💳': ['💸', '🏧', '🪪', '💠', '🎴'], '🛏️': ['🛌', '🏨'], '⚕️': ['🩺', '💉', '🧬'], '📱': ['📲', '☎️', '📟'], '💻': ['🖥️', '⌨️', '🖱️'], '🛒': ['🛍️', '🧺', '🏬'], '🏬': ['🏪', '🛍️', '🏢'], '🍽️': ['🍴', '🥘', '🍲'], '🏠': ['🏡', '🏘️', '🛖'], '🏢': ['🏬', '🏗️', '🏙️'],
  '🚗': ['🚙', '🚘', '🏎️'], '✈️': ['🛫', '🛬', '🧳'], '🏦': ['🏧', '💹', '🪙'], '📈': ['🚀', '💹', '⬆️'], '🎮': ['🕹️', '👾', '🎲'], '🎬': ['🍿', '🎞️', '📽️'], '🎵': ['🎶', '🎼', '🎧'],
  '🔥': ['⚡', '🚀', '🌟'], '🌤️': ['⛅', '🌥️', '🌦️'], '🙂': ['😊', '😀', '🙃'], '😐': ['😑', '🤨', '😕'], '🙁': ['😞', '😟', '☹️'], '😍': ['🤩', '🥰', '😻'], '✅': ['👍', '✔️', '🟢'], '🚫': ['❌', '⛔', '🙅'],
  '🤔': ['🤷', '❔', '🫤'], '📅': ['🗓️', '📆', '🕐'], '🗓️': ['📆', '📅', '🕑'], '📆': ['🗓️', '📅', '🕒'], '🎉': ['🎊', '🥳', '🎈'], '🏥': ['⚕️', '🩺', '🚑'], '💊': ['💉', '🩹', '🧴'], '🧴': ['🧼', '🫧', '🪥'],
  '👕': ['👔', '👚', '🧥'], '👗': ['👘', '👚', '🥻'], '🐶': ['🐕', '🦮', '🐩'], '🐱': ['🐈', '😺', '🐈‍⬛'], '🍕': ['🍔', '🌮', '🥙'], '☕': ['🫖', '🧋', '🥤'], '🥤': ['🧃', '🧋', '🍹'], '🍺': ['🍻', '🍶', '🥂'], '🍷': ['🥂', '🍾', '🍸'],
  '📺': ['🖥️', '📡', '📼'], '🎧': ['🎙️', '🔊', '📻'], '📷': ['📸', '🎥', '📹'], '⚡': ['🔌', '🔋', '💡'], '🧑‍💼': ['👩‍💼', '👨‍💼', '💼'], '💼': ['👔', '🗂️', '📊'], '🏷️': ['🔖', '🎫', '🧾'], '📣': ['📢', '🗣️', '📯'], '👑': ['🏆', '🥇', '🎖️'],
  '🎁': ['🎀', '🛍️', '🎊'], '🔬': ['🧪', '🔭', '🧬'], '📝': ['🗒️', '📋', '✏️'], '⭐': ['🌟', '✨', '💫'], '💯': ['🤩', '🎯', '🌟'], '👍': ['👌', '🙌', '😊'], '👎': ['🙅', '🤏', '😕'], '❌': ['⛔', '🚫', '✖️'], '🤝': ['🫱', '👥', '🙌'], '🏅': ['🥇', '🏆', '🎖️'],
};
const LADDER = {
  money: ['🪙', '💵', '💶', '💷', '💰', '💳', '🏦', '💎', '👑', '🚀', '🌟', '🏰'],
  count: ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '➕'],
  time: ['⏱️', '⏲️', '⌛', '⏳', '🕐', '🕓', '🕰️', '📆', '🗓️', '📅', '🎂', '♾️'],
  size: ['🌱', '🌿', '🪴', '🌳', '🌲', '🏞️', '⛰️', '🏔️', '🌋', '🌍', '🌌', '✨'],
  pct: ['◔', '◑', '◕', '⬤'],
};
const MONEY_N = /income|revenue|spend|budget|salary|price|cost|amount|turnover|luxury6|wellness25/i;
const TIME_L = /\b(hours?|hrs?|minutes?|mins?|days?|weeks?|months?|years?|yrs?)\b/i;

function monogram(l) {
  const w = String(l).replace(/\(.*?\)/g, '').replace(/[^\p{L}\p{N}\s&-]/gu, ' ').trim().split(/[\s&/-]+/).filter(Boolean);
  const m = (w.length > 1 ? w[0][0] + w[1][0] : (w[0] || '?').slice(0, 2)).toUpperCase();
  return { mono: m };
}
const sens0 = (n) => SENS.test(n) || /^(org-)?(country|state|city)$/.test(n) || /nationality|residence|language/.test(n);
const cache = new Map();
/** [emoji | {mono}] for every option label of question n (stable for the same labels) */
export function optEmojiSet(n, labels) {
  const key = n + '\u0001' + labels.join('\u0002'); const hit = cache.get(key); if (hit) return hit;
  const sens = SENS.test(n) || /^(org-)?(country|state|city)$/.test(n) || /nationality|residence|language/.test(n);
  let out = labels.map((l) => { if (!sens0(n)) for (const [r, em] of PRE) if (r.test(l)) return em; return optEmoji(n, l) || ''; });
  if (!sens) {
    out = out.map((e, i) => { if (e) return e; const l = String(labels[i]).replace(/\s*\((e\.g\.?|eg|such as|like)[^)]*\)/gi, '').trim(); for (const [r, em] of MORE) if (em && r.test(l)) return em; return ''; });
    /* numeric ladders */
    const num = labels.map((l) => RANGE_RE.test(l) || /^\s*[<>≤≥]?\s*\d/.test(l));
    const freq = labels.some((l) => /\b(times?|weekly|monthly|daily|yearly|every|per|a (week|month|year)|once|twice)\b/i.test(l));
    if (!freq && num.filter(Boolean).length >= Math.max(2, labels.length * 0.5)) {
      const kind = MONEY_N.test(n) || labels.some((l) => /[$€£₹¥]|usd|inr/i.test(l)) ? 'money' : labels.some((l) => /%/.test(l)) ? 'pct' : labels.some((l) => TIME_L.test(l)) ? 'time'
        : labels.every((l, i) => !num[i] || /^\s*\d{1,2}\s*$|^\s*\d{1,2}\s*(\+|or more)/.test(l)) ? 'count' : 'size';
      const order = labels.map((l, i) => [rk(l), i]).filter(([, i]) => num[i]).sort((a, b) => a[0] - b[0]);
      const lad = LADDER[kind];
      order.forEach(([v, i], r) => {
        if (kind === 'count') { const d = parseInt(String(labels[i]).replace(/[^\d]/g, ''), 10); out[i] = d >= 0 && d <= 10 && !/\+|more/i.test(labels[i]) ? LADDER.count[d] : '➕'; }
        else out[i] = lad[Math.min(lad.length - 1, Math.round(r * (lad.length - 1) / Math.max(1, order.length - 1)))];
      });
    }
  }
  /* uniqueness inside the question */
  const used = new Set();
  out = out.map((e, i) => {
    if (!e) return sens ? '' : monogram(labels[i]);
    if (!used.has(e)) { used.add(e); return e; }
    const alt = (ALT[e] || []).find((a) => !used.has(a));
    if (alt) { used.add(alt); return alt; }
    return sens ? '' : monogram(labels[i]);
  });
  cache.set(key, out);
  return out;
}
