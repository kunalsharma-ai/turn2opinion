// The vocabulary of the rating system — v3.2 "Opinion Gems".
//
// Design brief: no stars, no smiley faces, nothing that looks like every other review widget, and it
// must be instantly understandable. The idea: Turn2Opinion is about opinions having *value*, so a
// rating is a gem. Every step up the scale is a more precious stone, with its own cut, colour and
// light — and the plain word and number are always shown next to it, so nobody has to decode it:
//
//   1  Pebble    · Poor       grey river stone, no shine
//   2  Quartz    · Fair       rose-quartz crystal
//   3  Amber     · Good       golden trillion cut
//   4  Sapphire  · Great      deep-blue step cut
//   5  Diamond   · Excellent  iridescent brilliant cut, sparkles
//
// The same five gems are used everywhere a rating appears: the rating control, testimonials,
// notifications, the reviews page and the header menu badge.

/** The five rating levels, low to high. `c1`/`c2`/`c3` drive every gradient at that level. */
export const LEVELS = [
  { v: 1, key: 'pebble', gem: 'Pebble', word: 'Poor', short: 'Poor', c1: '#A3ADBF', c2: '#5B667D', c3: '#2F374A', glow: 'rgba(163,173,191,.45)', note: 'Something clearly went wrong.' },
  { v: 2, key: 'quartz', gem: 'Quartz', word: 'Fair', short: 'Fair', c1: '#FF9CC2', c2: '#E2457F', c3: '#8E1C4E', glow: 'rgba(255,92,150,.5)', note: 'Usable, but it needs work.' },
  { v: 3, key: 'amber', gem: 'Amber', word: 'Good', short: 'Good', c1: '#FFD36B', c2: '#F59E0B', c3: '#9A5200', glow: 'rgba(255,176,32,.55)', note: 'Does the job, no complaints.' },
  { v: 4, key: 'sapphire', gem: 'Sapphire', word: 'Great', short: 'Great', c1: '#8FC1FF', c2: '#2F6BFF', c3: '#11298F', glow: 'rgba(47,107,255,.55)', note: 'Better than most things I use.' },
  { v: 5, key: 'diamond', gem: 'Diamond', word: 'Excellent', short: 'Excellent', c1: '#B8FFF4', c2: '#22D3C5', c3: '#6D4BFF', glow: 'rgba(34,211,197,.6)', note: 'I tell other people about it.' }
];

export const levelOf = (v) => LEVELS[Math.min(5, Math.max(1, Math.round(v || 4))) - 1];

/**
 * The two audiences. Each one is a complete colour world, not just a label: the review studio, the
 * testimonial card shape, the notification and the reviews page all re-grade themselves from these.
 *   consumer      warm sunset world — testimonials appear as airmail postcards
 *   professional  cool midnight world — testimonials appear as conference passes
 */
export const AUDIENCES = {
  consumer: {
    key: 'consumer',
    label: 'Consumer',
    plural: 'Consumers',
    sub: 'Everyday life, shopping, family, leisure',
    pitch: 'I answer surveys about the things I buy, watch, eat and use.',
    icon: 'bag',
    c1: '#FF4D8D',
    c2: '#FF9F1C',
    c3: '#7B2CBF',
    ink: '#3B0A2A',
    card: 'postcard',
    askName: 'Where you work or study',
    askRole: 'Student, nurse, homemaker…'
  },
  professional: {
    key: 'professional',
    label: 'Business professional',
    plural: 'Professionals',
    sub: 'Work, tools, budgets, decisions',
    pitch: 'I answer B2B surveys about my industry, my role and the tools I choose.',
    icon: 'briefcase',
    c1: '#2F6BFF',
    c2: '#00D4A0',
    c3: '#0B1A4A',
    ink: '#07163F',
    card: 'pass',
    askName: 'Your company',
    askRole: 'IT manager, CFO, procurement lead…'
  }
};

export const audienceOf = (k) => AUDIENCES[k] || AUDIENCES.consumer;

/**
 * The four things we ask people to rate separately. Each has its own colour AND its own visual
 * metaphor so the four rows never read as one repeated widget:
 *   clock    a dial that sweeps round                (time well spent)
 *   coins    coins that drop onto a stack            (rewards)
 *   bubbles  chat bubbles that pop in                (support)
 *   battery  phone battery cells that charge         (mobile)
 */
export const FACETS = [
  { key: 'worth', label: 'Surveys worth my time', hint: 'Topics, length and how often you qualify', meter: 'clock', c1: '#2F6BFF', c2: '#49B6FF', icon: 'clock' },
  { key: 'rewards', label: 'Rewards arrive as promised', hint: 'Points, payout speed and choice of method', meter: 'coins', c1: '#F59E0B', c2: '#FFD36B', icon: 'coin' },
  { key: 'support', label: 'Support when I need it', hint: 'Live help, email and WhatsApp replies', meter: 'bubbles', c1: '#0EA47F', c2: '#5EF2C9', icon: 'chat' },
  { key: 'device', label: 'Works on my phone', hint: 'Speed and layout on mobile, tablet and desktop', meter: 'battery', c1: '#7B5CFF', c2: '#E879F9', icon: 'phone' }
];

/** Plain-words labels for a facet score 1–5 (shown under the facet meters). */
export const FACET_WORDS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

/** Quick-tap highlights. Positive set above 3, fix-it set at or below 3. */
export const HIGHLIGHTS = {
  up: ['Easy to use', 'Quick payouts', 'Interesting topics', 'Helpful support', 'Great on mobile', 'Fair rewards', 'Honest screening', 'Clear points'],
  down: ['More surveys', 'Fewer screen-outs', 'Faster payouts', 'Shorter surveys', 'Clearer invites', 'Better matching']
};

/** Sentence starters offered above the review box (tap to insert). */
export const STARTERS = {
  consumer: ['What I like most is…', 'My first reward…', 'I usually answer on…', 'One thing to improve…'],
  professional: ['The B2B surveys I get…', 'Compared with other panels…', 'The incentive arrived…', 'One thing to improve…']
};

/** Average of the facet scores a person actually set (0 when they set none). */
export function facetAverage(facets) {
  const vals = FACETS.map((f) => (facets || {})[f.key]).filter((n) => n > 0);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
}
