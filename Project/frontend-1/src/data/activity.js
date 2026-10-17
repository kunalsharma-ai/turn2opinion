// "Now inviting" spotlights shown in the reward ticket while no live feed is connected: who we invite,
// from where and on what topics. They are not claims that anyone was paid.
// Real "reward paid" tickets come from VITE_ACTIVITY_FEED_URL – format in docs/api-contract.md.
export const SPOTLIGHTS = [
  { role: 'IT decision-makers', country: 'DE', topic: 'Cloud & cybersecurity studies', icon: 'chip' },
  { role: 'Nurses & clinicians', country: 'PH', topic: 'Healthcare experience surveys', icon: 'pulse' },
  { role: 'College students', country: 'IN', topic: 'Apps, gaming & streaming', icon: 'cap' },
  { role: 'Homemakers', country: 'BR', topic: 'Grocery & household brands', icon: 'bag' },
  { role: 'Finance managers', country: 'GB', topic: 'Banking & fintech research', icon: 'bank' },
  { role: 'Farm owners', country: 'AU', topic: 'Agribusiness & equipment', icon: 'leaf' },
  { role: 'HR directors', country: 'AE', topic: 'Workplace & hiring trends', icon: 'users' },
  { role: 'EV owners', country: 'US', topic: 'Automotive & mobility', icon: 'car' },
  { role: 'Small business owners', country: 'MX', topic: 'Payments & software tools', icon: 'briefcase' },
  { role: 'Pet parents', country: 'CA', topic: 'Pet food & care', icon: 'paw' },
  { role: 'Marketing managers', country: 'SG', topic: 'Advertising & media', icon: 'megaphone' },
  { role: 'Gamers', country: 'KR', topic: 'Console & mobile gaming', icon: 'game' },
  { role: 'Procurement leads', country: 'NL', topic: 'Supply chain & sourcing', icon: 'truck' },
  { role: 'Working parents', country: 'ZA', topic: 'Family & education', icon: 'heart' },
  { role: 'Software engineers', country: 'IN', topic: 'Developer tools & AI', icon: 'chip' },
  { role: 'Frequent travellers', country: 'FR', topic: 'Airlines & hotels', icon: 'plane' },
  { role: 'Pharmacists', country: 'EG', topic: 'Medicines & pharmacy retail', icon: 'flask' },
  { role: 'Retirees', country: 'JP', topic: 'Health, travel & finance', icon: 'clock' }
];

// Payout methods are NOT stored per spotlight: they are derived from the country with methodsFor()
// (src/data/payouts.js), so UPI only ever appears for India.
