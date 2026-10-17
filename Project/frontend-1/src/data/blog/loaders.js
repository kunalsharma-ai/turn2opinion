// Code-split loaders for blog bodies. Keep in sync with ./index.js (scripts/check-content.mjs verifies this).
const LOADERS = {
  'earn-money-online-realistic-guide': () => import('./posts/earn-money-online-realistic-guide.js'),
  'earn-money-online-without-investment': () => import('./posts/earn-money-online-without-investment.js'),
  'paid-surveys-complete-guide': () => import('./posts/paid-surveys-complete-guide.js'),
  'online-surveys-for-money-beginners': () => import('./posts/online-surveys-for-money-beginners.js'),
  'paid-surveys-for-cash-vs-gift-cards': () => import('./posts/paid-surveys-for-cash-vs-gift-cards.js'),
  'get-paid-to-do-surveys-tips': () => import('./posts/get-paid-to-do-surveys-tips.js'),
  'swagbucks-surveys-vs-survey-communities': () => import('./posts/swagbucks-surveys-vs-survey-communities.js'),
  'online-work-from-home-without-investment': () => import('./posts/online-work-from-home-without-investment.js'),
  'online-jobs-from-home-no-investment-scams': () => import('./posts/online-jobs-from-home-no-investment-scams.js'),
  'earn-dollars-online-without-investment-india': () => import('./posts/earn-dollars-online-without-investment-india.js'),
  'free-money-making-online-myths': () => import('./posts/free-money-making-online-myths.js'),
  'online-income-ideas-beginners': () => import('./posts/online-income-ideas-beginners.js'),
  'make-money-without-any-investment-30-day-plan': () => import('./posts/make-money-without-any-investment-30-day-plan.js'),
  'paid-surveys-for-business-professionals': () => import('./posts/paid-surveys-for-business-professionals.js'),
  'surveys-for-it-decision-makers': () => import('./posts/surveys-for-it-decision-makers.js'),
  'paid-surveys-for-healthcare-professionals': () => import('./posts/paid-surveys-for-healthcare-professionals.js'),
  'survey-profiling-more-invitations': () => import('./posts/survey-profiling-more-invitations.js'),
  'why-you-get-screened-out-of-surveys': () => import('./posts/why-you-get-screened-out-of-surveys.js'),
  'survey-rewards-points-thresholds-explained': () => import('./posts/survey-rewards-points-thresholds-explained.js'),
  'upi-paypal-wire-amazon-survey-payouts': () => import('./posts/upi-paypal-wire-amazon-survey-payouts.js'),
  'are-paid-surveys-safe-data-privacy': () => import('./posts/are-paid-surveys-safe-data-privacy.js'),
  'survey-quality-checks-explained': () => import('./posts/survey-quality-checks-explained.js'),
  'earn-money-online-for-students': () => import('./posts/earn-money-online-for-students.js'),
  'online-earning-for-homemakers': () => import('./posts/online-earning-for-homemakers.js'),
  'side-income-for-working-professionals': () => import('./posts/side-income-for-working-professionals.js'),
  'earn-money-online-using-phone': () => import('./posts/earn-money-online-using-phone.js'),
  'online-work-for-retirees-senior-citizens': () => import('./posts/online-work-for-retirees-senior-citizens.js'),
  'how-market-research-uses-your-opinion': () => import('./posts/how-market-research-uses-your-opinion.js'),
  'paid-surveys-around-the-world': () => import('./posts/paid-surveys-around-the-world.js'),
  'first-week-paid-surveys-checklist': () => import('./posts/first-week-paid-surveys-checklist.js'),
};

export const hasPost = (slug) => Object.prototype.hasOwnProperty.call(LOADERS, slug);

/** Resolve a post body: { body: markdown string, faqs: [{ q, a }] } */
export async function loadPostBody(slug) {
  if (!hasPost(slug)) return null;
  const mod = await LOADERS[slug]();
  return mod.default;
}
