// Page videos — one entry per page, each with its own showcase template.
//
// HOW TO ADD A VIDEO
//   Paste the YouTube video ID (the part after "watch?v=" or "youtu.be/") into `yt` for that page,
//   e.g. yt: 'dQw4w9WgXcQ'. Optional `start` (seconds) starts playback part-way in.
//   While `yt` is empty the page still shows its showcase, with a "Watch on YouTube" button that
//   opens the Turn2Opinion channel instead of an embedded player.
//
// The player is a privacy-friendly facade: nothing from YouTube loads until the visitor presses
// play, and then only from youtube-nocookie.com. So these sections cost no third-party requests,
// cookies or Core Web Vitals on page load.
//
// `template` picks the visual world of the showcase (see components/video/templates.jsx and
// styles/video.css). Every page has its own, so no two pages present their video the same way.
export const YT_CHANNEL = 'https://www.youtube.com/@Turn2Opinion';

export const PAGE_VIDEOS = [
  {
    path: '/',
    template: 'premiere',
    yt: '',
    eyebrow: 'Now showing',
    title: 'Your opinion,',
    em: 'on the big screen',
    lede: 'Two minutes on how a few honest answers turn into PayPal, UPI and gift-card rewards.',
    points: ['Join · free, in two minutes', 'Answer · surveys matched to you', 'Redeem · PayPal, wire, gift card or UPI'],
    cta: { label: 'Join free', to: '/join/' }
  },
  {
    path: '/how-it-works/',
    template: 'blueprint',
    yt: '',
    eyebrow: 'Walkthrough',
    title: 'The whole journey,',
    em: 'drawn to scale',
    lede: 'Sign-up, profile, invitations, screening and payout: every step in one short explainer.',
    points: ['01 · Create your profile', '02 · Get matched invitations', '03 · Share honest answers', '04 · Redeem your points'],
    cta: { label: 'Start step one', to: '/join/' }
  },
  {
    path: '/paid-surveys/',
    template: 'arcade',
    yt: '',
    eyebrow: 'Player one',
    title: 'Pick a survey,',
    em: 'score rewards',
    lede: 'A tour of the survey categories, what each one pays and how long it takes.',
    points: ['Consumer · shopping, food, tech', 'Professional · B2B and IT', 'Every survey · reward shown up front'],
    cta: { label: 'See all surveys', to: '/paid-surveys/' }
  },
  {
    path: '/profiling/',
    template: 'lab',
    yt: '',
    eyebrow: 'Inside the lab',
    title: 'How profiling',
    em: 'finds your surveys',
    lede: 'Why a complete profile means more invitations, and how quality checks keep things fair.',
    points: ['Scan · your profile answers', 'Match · surveys that fit you', 'Protect · bot and quality checks'],
    cta: { label: 'Complete my profile', to: '/join/' }
  },
  {
    path: '/rewards/',
    template: 'vault',
    yt: '',
    eyebrow: 'Unlocked',
    title: 'From points',
    em: 'to payout',
    lede: 'Watch a balance turn into PayPal, a wire transfer, an Amazon gift card or UPI.',
    points: ['PayPal · worldwide', 'Wire · straight to your bank', 'Gift card · Amazon vouchers', 'UPI · members in India'],
    cta: { label: 'Start earning', to: '/join/' }
  },
  {
    path: '/faq/',
    template: 'chat',
    yt: '',
    eyebrow: 'Quick answers',
    title: 'Your top questions,',
    em: 'answered on camera',
    lede: 'Eligibility, invitations, screen-outs and payments, explained in plain words.',
    points: ['Who can join?', 'Why was I screened out?', 'When do I get paid?'],
    cta: { label: 'Ask live help', to: '/contact/' }
  },
  {
    path: '/about/',
    match: 'exact',
    template: 'documentary',
    yt: '',
    eyebrow: 'The story',
    title: 'Who we are,',
    em: 'in our own words',
    lede: 'Meet Turn2Opinion and Frequent Research, the ISO-certified team behind the panel.',
    points: ['Frequent Research · New Delhi', 'ISO 9001, 27001 and 20252', 'Members in 55 countries'],
    cta: { label: 'Contact the team', to: '/contact/' }
  },
  {
    path: '/about/reviews/',
    template: 'awards',
    yt: '',
    eyebrow: 'Member voices',
    title: 'The reviews,',
    em: 'read out loud',
    lede: 'Real members on surveys, rewards, support and the mobile site, low scores included.',
    points: ['Surveys', 'Rewards', 'Support', 'Mobile'],
    cta: { label: 'Write a review', to: '/about/reviews/' }
  },
  {
    path: '/about/scan-connect/',
    template: 'broadcast',
    yt: '',
    eyebrow: 'On air',
    title: 'Every channel,',
    em: 'one scan away',
    lede: 'Where we post, what you will find on each channel and how to follow every panel.',
    points: ['YouTube · walkthroughs', 'Instagram · reward drops', 'LinkedIn · B2B research'],
    cta: { label: 'Subscribe on YouTube', to: YT_CHANNEL }
  },
  {
    path: '/blog/',
    template: 'magazine',
    yt: '',
    eyebrow: 'Cover story',
    title: 'Earn online,',
    em: 'the honest way',
    lede: 'Our editors on paid surveys, side income and spotting the scams.',
    points: ['Guides', 'Myths busted', 'Payout explainers'],
    cta: { label: 'Read the latest', to: '/blog/' }
  },
  {
    path: '/blog/',
    match: 'prefix',
    template: 'reader',
    yt: '',
    eyebrow: 'Watch the article',
    title: 'Prefer video?',
    em: 'Watch the summary',
    lede: 'The short version of this guide, with the key points on screen.',
    points: ['Key points', 'Examples', 'Next steps'],
    cta: { label: 'More guides', to: '/blog/' }
  },
  {
    path: '/contact/',
    template: 'postcard',
    yt: '',
    eyebrow: 'Greetings from New Delhi',
    title: 'Say hello,',
    em: 'we answer',
    lede: 'Live help 24/7, WhatsApp and email: which one to use and how fast we reply.',
    points: ['Live help · 24/7', 'WhatsApp · +91 81782 00573', 'Email · support@turn2opinion.com'],
    cta: { label: 'Open live help', to: '/contact/' }
  },
  {
    path: '/join/',
    match: 'prefix',
    template: 'boarding',
    yt: '',
    eyebrow: 'Boarding now',
    title: 'Your first survey',
    em: 'departs here',
    lede: 'A two-minute sign-up guide: what we ask, why we ask it and what happens next.',
    points: ['Gate · sign up', 'Seat · your profile', 'Arrival · first reward'],
    cta: { label: 'Join free', to: '/join/' }
  },
  {
    path: '/login/',
    template: 'keyhole',
    yt: '',
    eyebrow: 'Members only',
    title: 'Keep your account',
    em: 'locked tight',
    lede: 'Signing in, resetting a password and keeping your rewards safe.',
    points: ['Strong passwords', 'OTP checks', 'Never share codes'],
    cta: { label: 'Forgot password?', to: '/forgot-password/' }
  },
  { path: '/forgot-password/', template: 'keyhole', yt: '', eyebrow: 'Recovery', title: 'Back in', em: 'in a minute', lede: 'How password resets work, and what we will never ask you for.', points: ['Email link', 'New password', 'Signed in'], cta: { label: 'Log in', to: '/login/' } },
  { path: '/reset-password/', template: 'keyhole', yt: '', eyebrow: 'Recovery', title: 'Set a new', em: 'password', lede: 'Pick something strong and unique. Here is how.', points: ['12+ characters', 'Unique to us', 'Never shared'], cta: { label: 'Log in', to: '/login/' } },
  {
    path: '/privacy/',
    template: 'shield',
    yt: '',
    eyebrow: 'Your data',
    title: 'Privacy,',
    em: 'explained simply',
    lede: 'What we collect, why we collect it, and the controls you have.',
    points: ['Never sold', 'Aggregate reporting', 'Delete any time'],
    cta: { label: 'Contact privacy', to: '/contact/' }
  },
  {
    path: '/gdpr/',
    template: 'stars',
    yt: '',
    eyebrow: 'GDPR',
    title: 'Your rights,',
    em: 'in two minutes',
    lede: 'Access, correction, deletion and portability, and how to ask for each.',
    points: ['Access', 'Rectify', 'Erase', 'Port'],
    cta: { label: 'Make a request', to: '/contact/' }
  },
  {
    path: '/cookies/',
    template: 'jar',
    yt: '',
    eyebrow: 'Cookies',
    title: 'What is in',
    em: 'the cookie jar',
    lede: 'Essential, analytics, marketing and preference cookies, and how to switch them.',
    points: ['Essential', 'Analytics', 'Marketing', 'Preferences'],
    cta: { label: 'Cookie settings', to: '/cookies/' }
  },
  {
    path: '/terms/',
    template: 'scroll',
    yt: '',
    eyebrow: 'The fine print',
    title: 'Our terms,',
    em: 'minus the jargon',
    lede: 'The rules that keep the panel fair for members and clients alike.',
    points: ['One account each', 'Honest answers', 'Fair rewards'],
    cta: { label: 'Questions? Ask us', to: '/contact/' }
  },
  {
    path: '/sitemap/',
    template: 'atlas',
    yt: '',
    eyebrow: 'Site tour',
    title: 'Find your way',
    em: 'around',
    lede: 'A quick tour of every corner of Turn2Opinion.',
    points: ['Earn', 'Learn', 'Connect'],
    cta: { label: 'Go home', to: '/' }
  },
  {
    path: '/404/',
    template: 'atlas',
    yt: '',
    eyebrow: 'Lost?',
    title: 'Wrong turn,',
    em: 'right site',
    lede: 'This page moved, but your rewards did not. Here is where to go next.',
    points: ['Home', 'Surveys', 'Help'],
    cta: { label: 'Go home', to: '/' }
  }
];

const norm = (p) => (String(p || '/').split(/[?#]/)[0].replace(/\/+$/, '') || '') + '/';

/** The video for a path: an exact match first, then the longest prefix match. */
export function videoFor(path) {
  const p = norm(path);
  const exact = PAGE_VIDEOS.find((v) => v.match !== 'prefix' && norm(v.path) === p);
  if (exact) return exact;
  return (
    PAGE_VIDEOS.filter((v) => v.match === 'prefix' && p.startsWith(norm(v.path)) && p !== norm(v.path)).sort((a, b) => b.path.length - a.path.length)[0] ||
    PAGE_VIDEOS.find((v) => v.match === 'prefix' && norm(v.path) === p) ||
    null
  );
}

export const ytEmbed = (v) =>
  `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.yt)}?autoplay=1&rel=0&modestbranding=1&playsinline=1${v.start ? `&start=${+v.start}` : ''}`;
