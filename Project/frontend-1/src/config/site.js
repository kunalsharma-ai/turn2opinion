// Business facts used across the site, footer, contact page and JSON-LD.
// Change them here once; every page picks the change up.
export const SITE = {
  name: 'Turn2Opinion',
  legalName: 'Frequent Research Fieldwork Solutions Private Limited',
  parentBrand: 'Frequent Research',
  parentUrl: 'https://www.frequentresearch.com',
  tagline: 'Speak your mind. Shape what’s next. Get rewarded.',
  email: 'support@turn2opinion.com',
  phone: '+918130015743',
  phoneDisplay: '+91 81300 15743',
  whatsapp: '918178200573',
  whatsappDisplay: '+91 81782 00573',
  address: {
    street: 'Mangolpur Kalan',
    locality: 'New Delhi',
    postalCode: '110085',
    country: 'IN',
    countryName: 'India'
  },
  logo: '/images/brand/turn2opinion-logo.png',
  ogImage: '/images/og/turn2opinion-og.jpg',
  social: [
    { id: 'instagram', label: 'Instagram', handle: '@turn2opinion', url: 'https://www.instagram.com/turn2opinion/', qr: '/images/qr/instagram-qr.svg' },
    { id: 'facebook', label: 'Facebook', handle: 'tryturn2opinion', url: 'https://www.facebook.com/tryturn2opinion', qr: '/images/qr/facebook-qr.svg' },
    { id: 'linkedin', label: 'LinkedIn', handle: 'Turn2Opinion', url: 'https://www.linkedin.com/company/turn2opinionpanel/home/', qr: '/images/qr/linkedin-qr.svg' },
    { id: 'youtube', label: 'YouTube', handle: '@Turn2Opinion', url: 'https://www.youtube.com/@Turn2Opinion', qr: '/images/qr/youtube-qr.svg' }
  ],
  certifications: [
    { id: 'iso9001', label: 'ISO 9001:2015', note: 'Quality management' },
    { id: 'iso27001', label: 'ISO/IEC 27001:2013', note: 'Information security' },
    { id: 'iso20252', label: 'ISO 20252:2019', note: 'Market, opinion & social research' },
    { id: 'esomar', label: 'ESOMAR member', note: 'Global research code of conduct' },
    { id: 'msme', label: 'MSME registered', note: 'Government of India' }
  ],
  // Minimum age to register. The privacy policy allows under-18s with a parent/guardian acknowledgement.
  minAge: 13,
  adultAge: 18
};

export const waLink = (text = 'Hi Turn2Opinion, I have a question.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
