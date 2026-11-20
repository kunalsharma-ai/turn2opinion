// Code-split loaders for blog bodies. Keep in sync with ./index.js (scripts/check-content.mjs verifies this).
const LOADERS = {
  'teen-paid-surveys-parent-guide': () => import('./posts/teen-paid-surveys-parent-guide.js'),
  'ai-in-everyday-life-consumer-opinions': () => import('./posts/ai-in-everyday-life-consumer-opinions.js'),
  'how-teens-can-earn-money-online-safely': () => import('./posts/how-teens-can-earn-money-online-safely.js'),
  'quick-commerce-10-minute-delivery-trend': () => import('./posts/quick-commerce-10-minute-delivery-trend.js'),
  'teen-gaming-trends-2026': () => import('./posts/teen-gaming-trends-2026.js'),
  'deepfakes-misinformation-trust': () => import('./posts/deepfakes-misinformation-trust.js'),
  'parental-consent-online-research-explained': () => import('./posts/parental-consent-online-research-explained.js'),
  'upi-digital-payments-trends': () => import('./posts/upi-digital-payments-trends.js'),
  'teen-money-habits-first-rewards': () => import('./posts/teen-money-habits-first-rewards.js'),
  'sustainable-shopping-trends': () => import('./posts/sustainable-shopping-trends.js'),
  'teen-screen-time-balance': () => import('./posts/teen-screen-time-balance.js'),
  'creator-economy-short-video': () => import('./posts/creator-economy-short-video.js'),
  'teens-spot-online-scams': () => import('./posts/teens-spot-online-scams.js'),
  'electric-vehicles-consumer-sentiment': () => import('./posts/electric-vehicles-consumer-sentiment.js'),
  'why-brands-want-teen-opinions': () => import('./posts/why-brands-want-teen-opinions.js'),
  'remote-hybrid-work-2026': () => import('./posts/remote-hybrid-work-2026.js'),
  'exam-season-study-apps-teens': () => import('./posts/exam-season-study-apps-teens.js'),
  'wellness-wearables-health-tech': () => import('./posts/wellness-wearables-health-tech.js'),
  'teen-privacy-checklist': () => import('./posts/teen-privacy-checklist.js'),
  'ai-and-market-research-future-surveys': () => import('./posts/ai-and-market-research-future-surveys.js'),
  'family-conversations-about-money-online': () => import('./posts/family-conversations-about-money-online.js'),
  'subscription-fatigue': () => import('./posts/subscription-fatigue.js'),
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
