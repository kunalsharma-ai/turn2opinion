// English source strings for the hand-written dictionaries (src/i18n/dict/<code>.js).
// Each language file exports an array in EXACTLY this order (index = key). `npm run i18n:check` verifies
// that every language has the same number of entries. Empty string / missing = falls back to the
// translation provider or English.
//
// Keys are the visible text as rendered (whitespace collapsed). A sentence that is split by inline tags
// (e.g. "Get rewarded <span>your way</span>") is one key. Numbers can be templated: "{0} checks…".
// To add a string: append it at the END of this list and append its translation at the end of every file.
export const KEYS = [
  // 0–17 header & navigation
  'Home', 'About Us', 'Earn', 'How It Works', 'Rewards', 'Trust & Safety', 'Blogs', 'Trending', 'FAQ', 'Contact',
  'Log in', 'Join free', 'Skip to content', 'Open menu', 'Close menu', 'Live help, 24/7', 'Main', 'Mobile',
  // 18–34 language picker
  'Choose your language', 'Every language has its own colour and sound.', 'Search languages', 'Suggested for you', 'Sound on',
  'Sound off', 'Translating the page…', 'Translate everything on this page', 'Menus and key sections are translated. Some longer text is still in English.', 'Global',
  'Asia', 'India', 'Middle East', 'Europe & Americas', 'Africa',
  'Close', 'Clear search',
  // 35–66 home hero: audience switch, ribbons, mottos, headline
  'I want to earn as', 'Consumers', 'Professionals', 'Students', 'Parents', 'Gamers', 'Shoppers', 'Travellers', 'Pet parents', 'Foodies',
  'Retirees', 'IT managers', 'Doctors', 'CFOs', 'Marketers', 'Engineers', 'HR leaders', 'Founders', 'Buyers', 'Shop it.',
  'Rate it.', 'Get rewarded for it.', 'Your expertise.', 'Your schedule.', 'Your reward.', 'Paid Online Surveys.', 'Your Opinion Matters.',
  'Your weekly shop, your favourite shows, the apps on your phone – the opinions you already have can earn you rewards.',
  'Decision-makers and specialists: give ten focused minutes to the studies shaping your industry – and get rewarded like the expert you are.',
  'Earn money online without investment: Turn2Opinion pays everyday people for honest answers, with no fees and no catch. Built for',
  'and pretty much everyone in between.',
  'Earn money online without investment by sharing what you know at work: Turn2Opinion rewards professionals for B2B studies matched to their role. Built for',
  // 67–79 rotating audience words
  'and specialists in every industry.', 'students', 'homemakers', 'gamers', 'retirees', 'parents', 'shoppers', 'pet parents', 'travellers', 'doctors',
  'marketers', 'engineers', 'founders',
  // 80–89 hero actions
  'buyers', 'Join free as a consumer', 'Join free as a professional', 'How it works', 'Free forever', 'No investment', 'PayPal, wire, gift cards & UPI in India', 'Reward jar', 'Your rewards', 'Reward unlocked',
  // 90–113 hero portal: personas, questions and answers
  '+ points', '+ reward', 'Redeem via PayPal', 'Redeem via UPI (India)', 'Redeem via wire transfer', 'Redeem via Amazon gift card', 'IT & operations', 'Finance leaders',
  'What made you pick that brand last time?', 'A friend recommended it', 'Console, PC or mobile – where do you play most?', 'Mostly mobile',
  'Takeaway or cooking at home tonight?', 'Cooking, obviously', 'Window seat or aisle?', 'Window, every time',
  'Who signs off new software at your company?', 'My team decides', 'Which payment tools does your business use?', 'Two banks, one fintech',
  'How often do you trial new dev tools?', 'Every quarter', 'Which channel brought your best leads this year?', 'Search and WhatsApp',
  // 114–159 home sections
  'Get paid to do surveys', 'From free sign-up to your first reward',
  'Sign up, answer honestly, get paid. That really is the whole thing – and it never costs you a rupee, dollar or euro.',
  'Sign up free', 'Register with an active email and phone number, then verify both with a link and an OTP.',
  'Share your opinion', 'Complete your profile, get matched invitations and answer honestly – on mobile or desktop.',
  'Get rewarded', 'Reach your threshold and redeem through PayPal, wire transfer or Amazon gift cards – plus UPI in India.',
  'Learn how paid online surveys work',
  'We value your feedback – your opinion gets rewarded',
  'Browse a few of our paid surveys. Every one shows its reward and length before you start – and you learn something new along the way.',
  'Explore paid surveys', 'Who we invite? Honestly, almost everyone',
  'From C-suite leaders and IT decision-makers to students, gamers and pet parents – profiles across industries, departments, job titles, demographics and lifestyles.',
  'Business professionals', 'Spin a profile', 'Profile match-o-matic',
  'One community, flags from five regions',
  'Members join from North and South America, Europe, Asia Pacific, the Middle East and Africa. Pick a region to spin its flags.',
  'Hear about new surveys the way you like',
  'Pick how we reach you. When a survey fits your profile, you’ll know about it – and you can switch channels any time.',
  'Get paid the way that suits you',
  'PayPal, a bank transfer or an Amazon gift card – and UPI if you live in India. You choose when you cash out.',
  'Where do you live?', 'I live in India', 'Anywhere else', 'Every profile has a way to earn', 'Your reward journey',
  '{0} checks stand between bots and your rewards',
  'Bots and copy-paste answers spoil things for everyone. These checks keep them out, so genuine members qualify more often.',
  'Verification & validation protocols', 'Multi-layer authentication protects every account and every response.',
  'Your details stay with us',
  'We don’t sell, rent or share your personal details. Answers are reported in aggregate, never tied to your name.',
  'Hear it from members', 'Real reviews from real members. Post yours and it shows up here straight away.',
  'Add your voice', 'Your review shows up here straight away.', 'All member reviews',
  'A real research company stands behind us', 'About Turn2Opinion', 'Trending on the blog',
  'Plain-talking guides on earning money online, paid surveys for money and working from home without investment.',
  'All blogs', 'Quick answers', 'Pick a question and get a straight answer. Live help answers 24/7.', 'All FAQs',
  // 160–199 footer
  'Your opinion already has value. Start collecting it.',
  'Consumers and professionals earn rewards for honest answers – redeemed through PayPal, wire transfer and Amazon gift cards worldwide, plus UPI for members in India.',
  'See how it works', 'Details never sold', '24/7 live help', 'Follow the conversation',
  'New survey drops, payout tips and member stories – wherever you scroll.', 'Hover or tap for QR', 'Scan to follow', 'Scan to join on mobile',
  'Earn with paid surveys', 'Trust & safety', 'About us', 'Sitemap', 'Learn', 'Legal', 'Privacy policy', 'GDPR compliance', 'Cookie policy', 'Terms of use',
  'Talk to us',
  'Turn2Opinion is the worldwide consumer and business opinion community of Frequent Research. Share your perspective on research that shapes real products and services – and get rewarded for it.',
  'Your personal details stay with us. We never sell or share them with anyone else.',
  'The company behind Turn2Opinion', 'Full-service market research from New Delhi, trusted by brands, agencies and public bodies.',
  'Visit Frequent Research', 'Certifications and affiliations', 'Quality management', 'Information security', 'Market, opinion & social research',
  'Global research code of conduct', 'Government of India', 'ESOMAR member', 'MSME registered', 'A brand of',
  'Rewards and payment methods vary by country. Survey availability depends on your profile.',
  'Fieldwork Solutions Pvt. Ltd.',
  // 197–215 cookie bar & floating widgets
  'Cookies, your call',
  'We use essential cookies to run the site and, with your OK, analytics and marketing cookies to improve it. See our',
  'cookie policy', 'Necessary', 'Analytics', 'Marketing', 'Preferences', 'Save choices', 'Customise', 'Essential only', 'Accept all',
  'WhatsApp us', 'Live help 24/7', 'Rate your experience', 'Reward paid', 'Dismiss', 'Open live help, available 24/7', 'Close live help',
];
