/**
 * Turn2Opinion email design system — tokens.
 *
 * DESIGN LANGUAGE — "the conversation"
 * ------------------------------------
 * Turn2Opinion is about questions and answers, so every email is laid out as one:
 *
 *   1. THE STAGE     a royal-blue card that opens every email. It says, in white,
 *                    why the email was sent — before any artwork, greeting or ask —
 *                    beside a "portal" scene lifted from the website hero (a person
 *                    rising out of a pastel disc ringed by the logo's two arrows).
 *                    Its colour carries the meaning: blue = account, night = security
 *                    and internal, violet = parent/guardian, mint = approved/done,
 *                    coral = celebration and invitations.
 *   2. FACT PILLS    the three facts that decide whether to act now, as glass pills
 *                    on the stage.
 *   3. THE JOURNEY   where things stand, as a vertical track of done / now / next.
 *   4. THE ASK       one pill button in the website's blue→violet gradient.
 *   5. Q&A SECTIONS  every further section is headed by a question in a speech
 *                    bubble ("What opens once you're in?") with the answer below —
 *                    the email reads like a short survey of the member's own questions.
 *   6. SIGN-OFF      a chat bubble from the team, with the round "2" mark as avatar.
 *
 * The page itself stays white (the brief: white primary, blue secondary).
 * Every colour below is a token from the website's src/styles/base.css.
 */

export const BRAND = {
  name: 'Turn2Opinion',
  legalName: 'Frequent Research Fieldwork Solutions Pvt. Ltd.',
  parent: 'Frequent Research',
  tagline: 'Speak your mind. Shape what’s next. Get rewarded.',
  site: 'https://www.turn2opinion.com',
  support: 'support@turn2opinion.com',
  phoneDisplay: '+91 81300 15743',
  phoneHref: 'tel:+918130015743',
  whatsappDisplay: '+91 81782 00573',
  whatsappHref: 'https://wa.me/918178200573',
  address: 'Mangolpur Kalan, New Delhi 110085, India',
};

/** Hosted asset base. Override with T2O_ASSET_BASE (or --assets=) at build time. */
export const ASSETS = process.env.T2O_ASSET_BASE || 'https://www.turn2opinion.com/mailer/v1';
export const HERO = `${ASSETS}/heroes`;
export const ICO = `${ASSETS}/icons`;
export const UI = `${ASSETS}/ui`;
export const SOC = `${ASSETS}/social`;
export const LOGO = `${ASSETS}/brand`;

/** Manrope for headings and numbers, Inter for body, buttons and labels (site pairing). */
export const FONT = {
  display: "'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  body: "'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  mono: "'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace",
};

/** Website tokens (base.css :root). */
export const C = {
  ink: '#0E1B4D',
  ink2: '#24356F',
  night: '#0A1238',
  blue: '#1F5BFF',
  blueD: '#1544C9',
  sky: '#49B6FF',
  violet: '#7B5CFF',
  violetD: '#5A36D6',
  gold: '#FFB020',
  goldD: '#E08E00',
  goldText: '#9A5B00',   // text-safe gold on white / tint
  coral: '#FF5C7A',
  coralD: '#D63262',
  mint: '#12C29B',
  mintD: '#0B7D63',
  ok: '#0EA47F',
  danger: '#E5384F',
  paper: '#FFFFFF',
  mist: '#F3F6FF',
  mist2: '#E8EEFF',
  text: '#17224D',
  muted: '#56618C',
  line: '#E1E6F5',
  lineStrong: '#C5CEEA',

  // soft panel tints with their saturated edges
  tBlue: '#EEF3FF', lBlue: '#CFDCFF',
  tViolet: '#F3F0FF', lViolet: '#DCD2FF',
  tMint: '#E9FAF4', lMint: '#BDEEDD',
  tGold: '#FFF7E6', lGold: '#FFE2A8',
  tCoral: '#FFF0F3', lCoral: '#FFCCD6',
};

/**
 * Stage tones. `base` is the solid colour every client paints (Outlook included) and
 * is AA-contrast with white text; `grad` is the website-style gradient layered on top
 * for clients that support CSS gradients.
 */
export const STAGE = {
  blue:   { base: '#1F4FE0', grad: 'linear-gradient(135deg,#1A4FE6 0%,#1F5BFF 50%,#2F74F0 100%)', pill: 'rgba(255,255,255,.16)', pillLine: 'rgba(255,255,255,.34)', eyebrowInk: '#1544C9', label: 'Account' },
  night:  { base: '#0E1B4D', grad: 'linear-gradient(135deg,#0A1238 0%,#14286E 60%,#1F4FE0 130%)', pill: 'rgba(255,255,255,.12)', pillLine: 'rgba(255,255,255,.28)', eyebrowInk: '#0E1B4D', label: 'Security' },
  violet: { base: '#5A36D6', grad: 'linear-gradient(135deg,#4B2BC4 0%,#5E3DE0 55%,#7050EC 100%)', pill: 'rgba(255,255,255,.16)', pillLine: 'rgba(255,255,255,.34)', eyebrowInk: '#5A36D6', label: 'Parent / guardian' },
  mint:   { base: '#0A7660', grad: 'linear-gradient(135deg,#066450 0%,#0A7660 55%,#0C846A 100%)', pill: 'rgba(255,255,255,.16)', pillLine: 'rgba(255,255,255,.34)', eyebrowInk: '#0B7D63', label: 'Confirmed' },
  coral:  { base: '#C42858', grad: 'linear-gradient(135deg,#B42350 0%,#C92D5E 55%,#D6415C 100%)', pill: 'rgba(255,255,255,.16)', pillLine: 'rgba(255,255,255,.36)', eyebrowInk: '#D63262', label: 'Rewards' },
};

/** Primary button: the website's "Join free" gradient. */
export const BTN = {
  base: '#1F5BFF',
  grad: 'linear-gradient(100deg,#1F5BFF 0%,#4B5BFF 55%,#7B5CFF 100%)',
};

/** Layout. 600px column, 24px stage inset. */
export const W = 600;
export const PAD = 36;
export const TAP = 48;
