// Reward options, shared across the Frequent Research group (same eight options as MyFrequentRewards).
// UPI and Cash Rewards are India-only (Kunal's feedback, 20 Nov 2026):
// - India (IN): all eight options
// - Everywhere else: the six options without UPI and Cash Rewards
// Every widget that shows payout methods (tickets, reward routes, chat) must use methodsFor().
export const REWARDS = [
  { id: 'paypal', name: 'PayPal', short: 'PayPal', kind: 'money', icon: 'wallet', c1: '#003087', c2: '#009CDE', line: 'Rewards sent straight to your PayPal wallet, used worldwide.', best: 'Worldwide', arrive: 'To your PayPal email' },
  { id: 'cash', name: 'Cash Rewards', short: 'Cash', kind: 'money', icon: 'cash', c1: '#0F9D58', c2: '#7BE495', line: 'Turn your balance into cash rewards, for members in India only.', best: 'India only', only: 'IN', arrive: 'Cash to spend' },
  { id: 'bank', name: 'Bank Transfer', short: 'Bank', kind: 'money', icon: 'bank', c1: '#0E7C66', c2: '#3DDBB4', line: 'Paid directly into your verified bank account.', best: 'Bank-first members', arrive: 'To your bank account' },
  { id: 'wire', name: 'Wire Transfer', short: 'Wire', kind: 'money', icon: 'globe', c1: '#0B1E5B', c2: '#2F6BFF', line: 'Secure international transfer to your verified account.', best: 'International', arrive: 'International transfer' },
  { id: 'upi', name: 'UPI (India)', short: 'UPI', kind: 'money', icon: 'upi', c1: '#5B2EA6', c2: '#ED752E', line: 'Instant transfer to your UPI ID, for members in India only.', best: 'India only', only: 'IN', arrive: 'To your UPI ID' },
  { id: 'shopping', name: 'Shopping Vouchers', short: 'Shopping', kind: 'voucher', icon: 'cart', c1: '#E8590C', c2: '#FFB347', line: 'Vouchers for popular stores, online and on the high street.', best: 'Shoppers', arrive: 'Store voucher code' },
  { id: 'grocery', name: 'Grocery Vouchers', short: 'Grocery', kind: 'voucher', icon: 'basket', c1: '#C77700', c2: '#FFD43B', line: 'Put your rewards towards the weekly shop.', best: 'Families', arrive: 'Grocery voucher code' },
  { id: 'giftcards', name: 'Digital Gift Cards', short: 'Gift cards', kind: 'voucher', icon: 'card', c1: '#7048E8', c2: '#C084FC', line: 'Instant e-gift codes for brands such as Amazon, sent to your inbox.', best: 'Instant codes', arrive: 'E-gift code by email' }
];

export const REWARD_KINDS = {
  money: { label: 'Money to your account', c: '#14C9B5' },
  voucher: { label: 'Vouchers & gift cards', c: '#FF8A00' }
};

/** One line for copy: "PayPal, cash rewards, bank or wire transfer, ... plus UPI in India". */
export const REWARDS_LINE = 'PayPal, bank or wire transfer, shopping and grocery vouchers and digital gift cards, plus cash rewards and UPI in India';
export const REWARDS_SHORT = 'PayPal, bank, wire, vouchers and gift cards, plus cash and UPI in India';

export const METHOD_META = Object.fromEntries(REWARDS.map((r) => [r.name, { icon: r.icon, color: r.c1, c2: r.c2, short: r.short, kind: r.kind, id: r.id }]));
// The UPI key without the "(India)" suffix is kept so older feed events still resolve.
METHOD_META.UPI = METHOD_META['UPI (India)'];

const INDIA = REWARDS.map((r) => r.name);
const REST_OF_WORLD = REWARDS.filter((r) => !r.only).map((r) => r.name);

export function methodsFor(countryCode) {
  return String(countryCode).toUpperCase() === 'IN' ? INDIA : REST_OF_WORLD;
}

/** Maps any feed/legacy label ("Amazon Gift Card", "UPI", "wire") to one of the eight reward names. */
export function normalizeMethod(m = '') {
  const a = String(m).toLowerCase();
  if (a.includes('upi')) return 'UPI (India)';
  if (a.includes('paypal')) return 'PayPal';
  if (a.includes('wire')) return 'Wire Transfer';
  if (a.includes('bank')) return 'Bank Transfer';
  if (a.includes('grocery')) return 'Grocery Vouchers';
  if (a.includes('shopping') || a.includes('voucher')) return 'Shopping Vouchers';
  if (a.includes('gift') || a.includes('amazon')) return 'Digital Gift Cards';
  if (a.includes('cash')) return 'Cash Rewards';
  return m;
}
