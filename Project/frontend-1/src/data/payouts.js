// Payout methods by country. UPI is an India-only payment method:
// - India (IN): UPI, PayPal, Wire Transfer, Amazon Gift Card
// - Everywhere else: PayPal, Wire Transfer, Amazon Gift Card
// Every widget that shows payout methods (toasts, reward routes, chat) must use methodsFor().
export const METHOD_META = {
  UPI: { icon: 'phone', color: '#0E7A4B' },
  PayPal: { icon: 'wallet', color: '#003087' },
  'Wire Transfer': { icon: 'transfer', color: '#5A36D6' },
  'Amazon Gift Card': { icon: 'gift', color: '#C76E00' }
};

const INDIA = ['UPI', 'PayPal', 'Wire Transfer', 'Amazon Gift Card'];
const REST_OF_WORLD = ['PayPal', 'Wire Transfer', 'Amazon Gift Card'];

export function methodsFor(countryCode) {
  return String(countryCode).toUpperCase() === 'IN' ? INDIA : REST_OF_WORLD;
}
