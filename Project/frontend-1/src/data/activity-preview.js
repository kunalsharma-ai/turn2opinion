// PREVIEW-ONLY sample tickets. Loaded only when VITE_DEMO_MODE=true (the shareable preview file), never in a
// production build, and every ticket built from this list carries a visible "Preview data" badge.
// Real "reward paid" tickets come from VITE_ACTIVITY_FEED_URL (docs/api-contract.md).
// UPI appears only for India (IN); cleanEvent() enforces this anyway.
export const PREVIEW_EVENTS = [
  { name: 'Aarav Sharma', role: 'College student', audience: 'consumer', country: 'IN', city: 'Delhi', method: 'UPI (India)', amount: 1200, currency: 'INR', mins: 4 },
  { name: 'Sophie Weber', role: 'Management consultant', audience: 'professional', country: 'DE', city: 'Munich', method: 'PayPal', amount: 35, currency: 'EUR', mins: 9 },
  { name: 'Miguel Santos', role: 'Customer service rep', audience: 'consumer', country: 'PH', city: 'Cebu', method: 'Digital Gift Cards', amount: 10, currency: 'USD', mins: 12 },
  { name: 'Kenji Tanaka', role: 'Product manager', audience: 'professional', country: 'JP', city: 'Osaka', method: 'Wire Transfer', amount: 6000, currency: 'JPY', mins: 17 },
  { name: 'Ananya Rao', role: 'Healthcare administrator', audience: 'professional', country: 'IN', city: 'Bengaluru', method: 'UPI (India)', amount: 2500, currency: 'INR', mins: 21 },
  { name: 'Mariana Costa', role: 'Homemaker', audience: 'consumer', country: 'BR', city: 'Recife', method: 'Grocery Vouchers', amount: 40, currency: 'BRL', mins: 26 },
  { name: 'Omar Al-Farsi', role: 'Procurement manager', audience: 'professional', country: 'AE', city: 'Dubai', method: 'Wire Transfer', amount: 150, currency: 'AED', mins: 33 },
  { name: 'Ethan Miller', role: 'University student', audience: 'consumer', country: 'US', city: 'Austin', method: 'Cash Rewards', amount: 15, currency: 'USD', mins: 38 },
  { name: 'Abena Owusu', role: 'Small business owner', audience: 'professional', country: 'GH', city: 'Accra', method: 'Bank Transfer', amount: 20, currency: 'USD', mins: 44 },
  { name: 'Rahul Mehta', role: 'Marketing manager', audience: 'professional', country: 'IN', city: 'Mumbai', method: 'Shopping Vouchers', amount: 1500, currency: 'INR', mins: 49 },
  { name: 'Olivia Bennett', role: 'Retail shopper', audience: 'consumer', country: 'GB', city: 'Leeds', method: 'PayPal', amount: 8, currency: 'GBP', mins: 55 },
  { name: 'Valentina Fernández', role: 'Talent acquisition', audience: 'professional', country: 'AR', city: 'Córdoba', method: 'Wire Transfer', amount: 25, currency: 'USD', mins: 58 }
];
