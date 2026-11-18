// Social channels and QR codes for the whole Frequent Research family: the company, its three
// research panels and Sampledge. Copied from the Frequent Research website (build 82.3, Nov 2026)
// so both sites point to the same accounts. QR images live in public/images/qr/network/ and were
// taken from the same build; each one opens the `url` next to it.
//
// To add or change a channel, edit the entry here and replace its QR image.
const QR = (f) => `/images/qr/network/${f}.png`;
const WA = 'https://wa.me/918178200573';

export const NETWORK = [
  {
    id: 't2o',
    name: 'Turn2Opinion',
    kind: 'Consumer & B2B panel',
    tag: 'Turn your opinion into rewards.',
    c1: '#1E5BFF',
    c2: '#22D3EE',
    c0: '#071A4A',
    logo: '/images/brand/turn2opinion-wordmark.webp',
    site: 'https://www.turn2opinion.com/',
    siteQr: QR('t2o-site'),
    links: [
      { k: 'youtube', name: 'YouTube', handle: '@Turn2Opinion', url: 'https://www.youtube.com/@Turn2Opinion', qr: QR('t2o-youtube') },
      { k: 'instagram', name: 'Instagram', handle: '@turn2opinion', url: 'https://www.instagram.com/turn2opinion/', qr: QR('t2o-instagram') },
      { k: 'linkedin', name: 'LinkedIn', handle: 'company/turn2opinionpanel', url: 'https://www.linkedin.com/company/turn2opinionpanel', qr: QR('t2o-linkedin') },
      { k: 'facebook', name: 'Facebook', handle: 'tryturn2opinion', url: 'https://www.facebook.com/tryturn2opinion', qr: QR('t2o-facebook') },
      { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WA, qr: QR('t2o-whatsapp') }
    ]
  },
  {
    id: 'mfr',
    name: 'MyFrequentRewards',
    kind: 'Loyalty & rewards panel',
    tag: 'Share your views. Earn every time.',
    c1: '#F59E0B',
    c2: '#F0457E',
    c0: '#3A1A03',
    logo: '/images/brand/myfrequentrewards-wordmark.webp',
    site: 'https://www.myfrequentrewards.com/',
    siteQr: QR('mfr-site'),
    links: [
      { k: 'youtube', name: 'YouTube', handle: '@MyFrequentRewards', url: 'https://www.youtube.com/@MyFrequentRewards', qr: QR('mfr-youtube') },
      { k: 'instagram', name: 'Instagram', handle: '@myfrequentrewards', url: 'https://www.instagram.com/myfrequentrewards/', qr: QR('mfr-instagram') },
      { k: 'linkedin', name: 'LinkedIn', handle: 'company/myfrequentrewards', url: 'https://www.linkedin.com/company/myfrequentrewards/', qr: QR('mfr-linkedin') },
      { k: 'facebook', name: 'Facebook', handle: 'myfrequentreswards', url: 'https://www.facebook.com/myfrequentreswards/', qr: QR('mfr-facebook') },
      { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WA, qr: QR('mfr-whatsapp') }
    ]
  },
  {
    id: 'mho',
    name: 'MyHealthOpinions',
    kind: 'Healthcare panel',
    tag: 'Your experience can improve healthcare.',
    c1: '#E5484D',
    c2: '#FF9F43',
    c0: '#3A0B12',
    logo: '/images/brand/myhealthopinions-mark.webp',
    site: 'https://www.myhealthopinions.com/',
    siteQr: QR('mho-site'),
    links: [
      { k: 'youtube', name: 'YouTube', handle: '@MyHealthOpinions', url: 'https://www.youtube.com/@MyHealthOpinions', qr: QR('mho-youtube') },
      { k: 'instagram', name: 'Instagram', handle: '@myhealthopinions', url: 'https://www.instagram.com/myhealthopinions/', qr: QR('mho-instagram') },
      { k: 'linkedin', name: 'LinkedIn', handle: 'company/myhealthopinions', url: 'https://www.linkedin.com/company/myhealthopinions/posts/?feedView=all', qr: QR('mho-linkedin') },
      { k: 'facebook', name: 'Facebook', handle: 'myhealthopinions', url: 'https://www.facebook.com/myhealthopinions/', qr: QR('mho-facebook') },
      { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WA, qr: QR('mho-whatsapp') }
    ]
  },
  {
    id: 'fr',
    name: 'Frequent Research',
    kind: 'Fieldwork Solutions Pvt. Ltd.',
    tag: 'The ISO-certified research company behind every panel.',
    c1: '#5A3FE0',
    c2: '#38A3FF',
    c0: '#0E1B4D',
    logo: '/images/brand/frequent-research-mark.webp',
    site: 'https://panels.frequentresearch.com/',
    siteLabel: 'All our panels',
    siteQr: QR('fr-panels'),
    links: [
      { k: 'linkedin', name: 'LinkedIn', handle: 'frequentresearch', url: 'https://www.linkedin.com/company/frequentresearch', qr: QR('fr-linkedin') },
      { k: 'youtube', name: 'YouTube', handle: '@frequentresearch', url: 'https://www.youtube.com/@frequentresearch', qr: QR('fr-youtube') },
      { k: 'facebook', name: 'Facebook', handle: 'FrequentResearchFieldwork', url: 'https://www.facebook.com/FrequentResearchFieldwork', qr: QR('fr-facebook') },
      { k: 'instagram', name: 'Instagram', handle: '@frequentresearchfield', url: 'https://www.instagram.com/frequentresearchfield', qr: QR('fr-instagram') },
      { k: 'threads', name: 'Threads', handle: '@frequentresearchfield', url: 'https://www.threads.com/@frequentresearchfield', qr: QR('fr-threads') },
      { k: 'x', name: 'X', handle: '@frequentrfs', url: 'https://x.com/frequentrfs', qr: QR('fr-x') },
      { k: 'pinterest', name: 'Pinterest', handle: 'Frequent Research', url: 'https://pin.it/1ApfR1BQk', qr: QR('fr-pinterest') },
      { k: 'google', name: 'Google', handle: 'Find us & leave a review', url: 'https://share.google/Q2u2ukm6YPPESkJTb', qr: QR('google') },
      { k: 'whatsapp', name: 'WhatsApp', handle: '+91 81782 00573', url: WA, qr: QR('fr-whatsapp') }
    ]
  },
  {
    id: 'smp',
    name: 'Sampledge',
    kind: 'Project & sample management DIY tool',
    tag: 'Run your own sample and projects, end to end.',
    c1: '#7C4DFF',
    c2: '#2EE6A6',
    c0: '#160B3A',
    logo: '',
    site: 'https://www.sampledge.com/',
    siteQr: QR('smp-site'),
    links: [
      { k: 'youtube', name: 'YouTube', handle: '@Sampledge_DIY_Marketplace', url: 'https://www.youtube.com/@Sampledge_DIY_Marketplace', qr: QR('smp-youtube') },
      { k: 'instagram', name: 'Instagram', handle: '@sampledge_diy', url: 'https://www.instagram.com/sampledge_diy/', qr: QR('smp-instagram') },
      { k: 'threads', name: 'Threads', handle: '@sampledge_diy', url: 'https://www.threads.com/@sampledge_diy', qr: QR('smp-threads') },
      { k: 'x', name: 'X', handle: '@SampledgeX', url: 'https://x.com/SampledgeX', qr: QR('smp-x') },
      { k: 'linkedin', name: 'LinkedIn', handle: 'company/sampledge-diy-marketplace', url: 'https://www.linkedin.com/company/sampledge-diy-marketplace', qr: QR('smp-linkedin') },
      { k: 'facebook', name: 'Facebook', handle: 'Sampledge', url: 'https://www.facebook.com/people/Sampledge/61594616326502/', qr: QR('smp-facebook') },
      { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WA, qr: QR('smp-whatsapp') }
    ]
  }
];

/** Brand colours per platform, used for each card's colour grade. */
export const PLATFORM = {
  youtube: ['#FF0000', '#FF7A59'],
  instagram: ['#FF0069', '#FFB547'],
  linkedin: ['#0A66C2', '#38A3FF'],
  facebook: ['#0866FF', '#6FA8FF'],
  whatsapp: ['#0E9F4E', '#7CF5A6'],
  threads: ['#101010', '#6B6B6B'],
  x: ['#14171A', '#5B6B7A'],
  pinterest: ['#BD081C', '#FF5A6E'],
  google: ['#EA4335', '#FBBC05']
};
