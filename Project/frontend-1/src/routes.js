// Route table: URL -> page module + SEO metadata.
// Every indexable page owns a unique title, description, canonical, robots directive and schema.
// scripts/prerender.mjs reads this table to write one static HTML file per route plus sitemap.xml.
import { BLOG_POSTS, getPostMeta } from './data/blog/index.js';
import { loadPostBody } from './data/blog/loaders.js';

const page = (loader) => loader; // readability helper

const MEMBER_TITLES = {
  dashboard: 'Dashboard',
  rewards: 'Points & rewards',
  'quality-score': 'Quality score',
  referrals: 'Referrals',
  activity: 'Activity',
  profile: 'My account',
  settings: 'Settings'
};
const MEMBER_PAGES = Object.keys(MEMBER_TITLES);

export const ROUTES = [
  {
    path: '/',
    load: page(() => import('./pages/Home.jsx')),
    seo: {
      title: 'Paid Online Surveys for Money & Rewards | Turn2Opinion',
      description:
        'Earn money online without investment. Take paid surveys for money as a consumer or professional, join Turn2Opinion free and redeem PayPal, UPI or gift cards.',
      schema: ['website', 'organization', 'localBusiness']
    },
    sitemap: { priority: '1.0', changefreq: 'weekly' }
  },
  {
    path: '/how-it-works/',
    load: page(() => import('./pages/HowItWorks.jsx')),
    seo: {
      title: 'How Paid Online Surveys Work – Earn Rewards | Turn2Opinion',
      description:
        'See how Turn2Opinion works: create a free profile, get matching survey invites, share honest opinions and redeem PayPal, wire, gift card or UPI rewards.',
      crumb: 'How It Works'
    },
    sitemap: { priority: '0.9', changefreq: 'monthly' }
  },
  {
    path: '/paid-surveys/',
    load: page(() => import('./pages/PaidSurveys.jsx')),
    seo: {
      title: 'Paid Online Surveys – Share Your Opinion & Earn Rewards',
      description:
        'Explore paid online surveys for consumers and professionals. Get paid to do surveys on shopping, tech, health, finance and business – no investment needed.',
      crumb: 'Paid Surveys'
    },
    sitemap: { priority: '0.9', changefreq: 'weekly' }
  },
  // Round 10 (Kunal, 20 Nov 2026): the Earn menu, one page per audience plus the eligibility guide.
  {
    path: '/earn/consumers/',
    load: page(() => import('./pages/EarnConsumers.jsx')),
    seo: {
      title: 'Paid Surveys for Consumers – Earn From Everyday Life | Turn2Opinion',
      description:
        'Shoppers, students, parents, gamers and travellers: turn the opinions you already have into PayPal, UPI, voucher and gift card rewards. Free to join.',
      crumb: 'Consumers',
      parent: { path: '/paid-surveys/', name: 'Earn' }
    },
    sitemap: { priority: '0.9', changefreq: 'monthly' }
  },
  {
    path: '/earn/business-professionals/',
    load: page(() => import('./pages/EarnProfessionals.jsx')),
    seo: {
      title: 'Paid B2B Surveys for Business Professionals | Turn2Opinion',
      description:
        'Managers, IT buyers, finance leads, engineers and founders: get paid for B2B surveys matched to your role, seniority and industry. Verified, private, free.',
      crumb: 'Business Professionals',
      parent: { path: '/paid-surveys/', name: 'Earn' }
    },
    sitemap: { priority: '0.9', changefreq: 'monthly' }
  },
  {
    path: '/earn/teens/',
    load: page(() => import('./pages/EarnMinors.jsx')),
    seo: {
      title: 'Teen Survey Panel for Ages 13–17 With Parent Permission | Turn2Opinion',
      description:
        'Our new teen panel lets 13 to 17 year olds share their views safely: a parent or guardian gives permission, the teen decides, and every study is age-checked.',
      crumb: 'Teens (13–17)',
      parent: { path: '/paid-surveys/', name: 'Earn' }
    },
    sitemap: { priority: '0.8', changefreq: 'monthly' }
  },
  {
    path: '/earn/who-can-join/',
    load: page(() => import('./pages/EarnWhoCanJoin.jsx')),
    seo: {
      title: 'Who Can Join Turn2Opinion? Age, Country & Role Guide',
      description:
        'Check if you can join Turn2Opinion: adults 18+, business professionals and teens aged 13–17 with parent permission, across 55 countries. One honest account each.',
      crumb: 'Who can join',
      parent: { path: '/paid-surveys/', name: 'Earn' }
    },
    sitemap: { priority: '0.8', changefreq: 'monthly' }
  },
  {
    path: '/profiling/',
    load: page(() => import('./pages/Profiling.jsx')),
    seo: {
      title: 'Survey Profiling & Quality Score Explained | Turn2Opinion',
      description:
        'Complete your Turn2Opinion profile to match more paid surveys. See how profiling, quality scores, bot checks and multi-layer security protect honest members.',
      crumb: 'Profiling & Quality'
    },
    sitemap: { priority: '0.8', changefreq: 'monthly' }
  },
  {
    path: '/rewards/',
    load: page(() => import('./pages/Rewards.jsx')),
    seo: {
      title: 'Survey Rewards – Earn & Redeem Your Way | Turn2Opinion',
      description:
        'Turn survey points into PayPal, wire transfer, Amazon gift card or UPI rewards. See how earning, balance tracking and reward claims work at Turn2Opinion.',
      crumb: 'Rewards'
    },
    sitemap: { priority: '0.9', changefreq: 'monthly' }
  },
  {
    path: '/faq/',
    load: page(() => import('./pages/Faq.jsx')),
    seo: {
      title: 'Paid Surveys FAQ – Questions & Answers | Turn2Opinion',
      description:
        'Answers about registration, eligibility, survey invitations, profiles, rewards, payment timelines, privacy and account settings at Turn2Opinion.',
      crumb: 'FAQ',
      schema: ['faq']
    },
    sitemap: { priority: '0.7', changefreq: 'monthly' }
  },
  {
    path: '/about/',
    load: page(() => import('./pages/About.jsx')),
    seo: {
      title: 'About Turn2Opinion | Global Opinion & Survey Community',
      description:
        'Turn2Opinion is the consumer and business opinion community of Frequent Research, an ISO-certified research company with members in 55 countries.',
      crumb: 'About'
    },
    sitemap: { priority: '0.7', changefreq: 'monthly' }
  },
  {
    // Ratings & reviews live under About, because they are part of who we are rather than a
    // marketing page. Linked from the About page, the testimonial section, the rating panel,
    // the review notifications and the footer.
    path: '/about/reviews/',
    load: page(() => import('./pages/Reviews.jsx')),
    seo: {
      title: 'Member Ratings & Reviews of Paid Surveys | Turn2Opinion',
      description:
        'Real Turn2Opinion reviews from consumers and professionals worldwide. See our average score and how members rate surveys, rewards, support and the mobile site.',
      crumb: 'Our Ratings & Reviews',
      parent: { path: '/about/', name: 'About' },
      schema: ['aggregateRating']
    },
    sitemap: { priority: '0.8', changefreq: 'weekly' }
  },
  {
    // Scan & Connect (v3.2): the QR hub — panels, parent company and social channels — on its own
    // page, reachable from the About Us menu. The same hub still closes every other page's footer.
    path: '/about/scan-connect/',
    load: page(() => import('./pages/ScanConnect.jsx')),
    seo: {
      title: 'Scan & Connect – QR Codes & Social Channels | Turn2Opinion',
      description:
        'Scan a QR code to open Turn2Opinion, MyFrequentRewards, MyHealthOpinions or Frequent Research, or follow us on Instagram, Facebook, LinkedIn, YouTube and X.',
      crumb: 'Scan & Connect',
      parent: { path: '/about/', name: 'About' }
    },
    sitemap: { priority: '0.5', changefreq: 'monthly' }
  },
  {
    path: '/blog/',
    load: page(() => import('./pages/Blog.jsx')),
    seo: {
      title: 'Blogs: Earn Money Online & Paid Survey Guides | Turn2Opinion',
      description:
        'Practical blogs on earning money online without investment, paid surveys for money, online work from home, survey rewards and staying safe from scams.',
      crumb: 'Blogs'
    },
    sitemap: { priority: '0.8', changefreq: 'weekly' }
  },
  {
    path: '/blog/:slug/',
    load: page(() => import('./pages/BlogPost.jsx')),
    data: (params) => loadPostBody(params.slug),
    exists: (params) => Boolean(getPostMeta(params.slug)),
    staticParams: () => BLOG_POSTS.map((p) => ({ slug: p.slug })),
    seo: (params) => {
      const post = getPostMeta(params.slug);
      return {
        title: post.metaTitle || `${post.title} | Turn2Opinion`,
        description: post.description,
        ogType: 'article',
        crumb: post.title,
        parent: { path: '/blog/', name: 'Blogs' },
        schema: ['article', 'faq'],
        post
      };
    },
    sitemap: { priority: '0.6', changefreq: 'monthly' }
  },
  {
    path: '/contact/',
    load: page(() => import('./pages/Contact.jsx')),
    seo: {
      title: 'Contact Turn2Opinion | 24/7 Help, WhatsApp & Email',
      description:
        'Questions about surveys, rewards or your account? Reach Turn2Opinion through 24/7 live help, WhatsApp, email or phone, or send us a message.',
      crumb: 'Contact'
    },
    sitemap: { priority: '0.6', changefreq: 'yearly' }
  },
  {
    path: '/join/',
    load: page(() => import('./pages/Join.jsx')),
    seo: {
      title: 'Join Free – Create Your Paid Surveys Account | Turn2Opinion',
      description:
        'Create your free Turn2Opinion account in minutes. No fees, no investment – just verify your email and phone and start receiving paid survey invitations.',
      crumb: 'Join free'
    },
    sitemap: { priority: '0.8', changefreq: 'yearly' }
  },
  {
    // Clean URL for the business-professional sign-up (replaces /join?category=professional).
    // Same page as /join/ with the professional form preselected, so it points its canonical at
    // /join/ and stays out of the index and the sitemap.
    path: '/join/professional/',
    load: page(() => import('./pages/Join.jsx')),
    seo: {
      title: 'Join Free as a Business Professional | Turn2Opinion',
      description:
        'Create your free Turn2Opinion professional account in minutes. No fees, no investment – verify your details and start receiving paid B2B survey invitations.',
      crumb: 'Join free',
      canonical: '/join/',
      robots: 'noindex,follow'
    },
    sitemap: false
  },
  {
    // Teen (13–17) sign-up: same page as /join/ with the Teen option preselected.
    path: '/join/teen/',
    load: page(() => import('./pages/Join.jsx')),
    seo: {
      title: 'Join the Teen Panel (13–17) | Turn2Opinion',
      description:
        'Teens aged 13 to 17 can join the Turn2Opinion teen panel. Sign up, then a parent or guardian gives permission before any survey starts.',
      crumb: 'Join free',
      canonical: '/join/',
      robots: 'noindex,follow'
    },
    sitemap: false
  },
  {
    // Parent/guardian onboarding and consent form for a Teen sign-up (link from the parent's email).
    path: '/parent-consent/',
    load: page(() => import('./pages/ParentConsent.jsx')),
    seo: {
      title: 'Parent or Guardian Consent – Teen Panel | Turn2Opinion',
      description: 'Complete the parent or guardian onboarding form and consent for a Turn2Opinion Teen panel sign-up.',
      crumb: 'Parent consent',
      robots: 'noindex,nofollow'
    },
    sitemap: false
  },
  {
    // Teen profile section (signed-in Teen members): their record, the guardian record kept apart,
    // consent records and the 13 Teen profile worlds.
    path: '/teen/profile/',
    load: page(() => import('./pages/TeenProfile.jsx')),
    seo: {
      title: 'My Teen Profile | Turn2Opinion',
      description: 'Your Teen panel profile, consent records and profile worlds.',
      crumb: 'My Teen profile',
      robots: 'noindex,nofollow'
    },
    sitemap: false
  },
  {
    // The Teen participation agreement (MINOR-2026.10), linked from the Teen registration.
    path: '/teen/agreement/',
    load: page(() => import('./pages/TeenAgreement.jsx')),
    seo: {
      title: 'Teen Participation Agreement (13–17) | Turn2Opinion',
      description: 'How the Turn2Opinion Teen panel works for teens aged 13 to 17 and their parents or guardians: permission, privacy, rewards and your rights.',
      crumb: 'Teen agreement',
      robots: 'noindex,follow'
    },
    sitemap: false
  },
  {
    // Member area (Round 15): Dashboard, Rewards, Quality score, Referrals, Activity, Account and
    // Settings, one persistent app. Profiles and Surveys stay on the existing member app.
    path: '/member/:page/',
    exists: (p) => MEMBER_PAGES.includes(p.page),
    staticParams: () => MEMBER_PAGES.map((page) => ({ page })),
    load: page(() => import('./member/MemberApp.jsx')),
    seo: (p) => ({
      title: `${MEMBER_TITLES[p.page] || 'Member area'} | Turn2Opinion`,
      description: 'Your Turn2Opinion member area: surveys, points, quality score, referrals and settings.',
      crumb: MEMBER_TITLES[p.page] || 'Member area',
      robots: 'noindex,nofollow'
    }),
    sitemap: false
  },
  {
    // Retired: the welcome questions were removed (Round 15). Old links redirect to the dashboard.
    path: '/welcome/',
    load: page(() => import('./pages/Welcome.jsx')),
    seo: {
      title: 'Welcome | Turn2Opinion',
      description: 'A few quick welcome questions so your first surveys fit you.',
      crumb: 'Welcome',
      robots: 'noindex,nofollow'
    },
    sitemap: false
  },
  {
    path: '/login/',
    load: page(() => import('./pages/Login.jsx')),
    seo: {
      title: 'Member Login | Turn2Opinion',
      description: 'Log in to your Turn2Opinion account to see available surveys, track points and claim rewards.',
      crumb: 'Login',
      robots: 'noindex,follow'
    },
    sitemap: false
  },
  {
    path: '/forgot-password/',
    load: page(() => import('./pages/ForgotPassword.jsx')),
    seo: {
      title: 'Forgot Password | Turn2Opinion',
      description: 'Reset your Turn2Opinion account password using your registered email address.',
      crumb: 'Forgot password',
      robots: 'noindex,follow'
    },
    sitemap: false
  },
  {
    path: '/reset-password/',
    load: page(() => import('./pages/ResetPassword.jsx')),
    seo: {
      title: 'Reset Password | Turn2Opinion',
      description: 'Set a new password for your Turn2Opinion account.',
      crumb: 'Reset password',
      robots: 'noindex,follow'
    },
    sitemap: false
  },
  {
    path: '/privacy/',
    load: page(() => import('./pages/Privacy.jsx')),
    seo: {
      title: 'Privacy Policy – How We Protect Your Data | Turn2Opinion',
      description:
        'How Turn2Opinion and Frequent Research collect, use, protect and retain personal information, your choices, and parental rights for members under 18.',
      crumb: 'Privacy Policy'
    },
    sitemap: { priority: '0.3', changefreq: 'yearly' }
  },
  {
    path: '/gdpr/',
    load: page(() => import('./pages/Gdpr.jsx')),
    seo: {
      title: 'GDPR & Data Protection Rights for Members | Turn2Opinion',
      description:
        'How Turn2Opinion runs GDPR-compliant market research: consent, purpose limitation, retention, your right to erasure and how to contact us about your data.',
      crumb: 'GDPR'
    },
    sitemap: { priority: '0.3', changefreq: 'yearly' }
  },
  {
    path: '/cookies/',
    load: page(() => import('./pages/Cookies.jsx')),
    seo: {
      title: 'Cookie Policy – Cookies We Use and Why | Turn2Opinion',
      description:
        'The essential, performance, social and unclassified cookies Turn2Opinion uses, what each does, how long it lasts, and how to change your cookie preferences.',
      crumb: 'Cookie Policy'
    },
    sitemap: { priority: '0.3', changefreq: 'yearly' }
  },
  {
    path: '/terms/',
    load: page(() => import('./pages/Terms.jsx')),
    seo: {
      title: 'Terms & Conditions for Survey Members | Turn2Opinion',
      description:
        'Turn2Opinion terms of use and general consent: what data we collect, why we collect it, and what you agree to when you join and take part in research.',
      crumb: 'Terms & Conditions'
    },
    sitemap: { priority: '0.3', changefreq: 'yearly' }
  },
  {
    path: '/sitemap/',
    load: page(() => import('./pages/HtmlSitemap.jsx')),
    seo: {
      title: 'Sitemap – All Pages, Guides & Blogs | Turn2Opinion',
      description:
        'Browse every Turn2Opinion page in one place: paid surveys, rewards, profiling, FAQs, blog guides on earning money online, policies and contact details.',
      crumb: 'Sitemap'
    },
    sitemap: { priority: '0.2', changefreq: 'monthly' }
  }
];

export const NOT_FOUND = {
  path: '/404/',
  load: page(() => import('./pages/NotFound.jsx')),
  seo: {
    title: 'Page not found | Turn2Opinion',
    description: 'This page could not be found. Explore paid surveys, rewards and blogs on Turn2Opinion.',
    robots: 'noindex,follow'
  },
  sitemap: false
};

function matchPattern(pattern, path) {
  const a = pattern.split('/').filter(Boolean);
  const b = path.split('/').filter(Boolean);
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

/** Resolve a normalised path to { route, params }. Falls back to NOT_FOUND. */
export function matchRoute(path) {
  for (const route of ROUTES) {
    const params = matchPattern(route.path, path);
    if (params && (!route.exists || route.exists(params))) return { route, params };
  }
  return { route: NOT_FOUND, params: {}, notFound: true };
}

/** Concrete paths for prerendering (dynamic routes expanded). */
export function allStaticPaths() {
  const out = [];
  for (const r of ROUTES) {
    if (r.staticParams) {
      for (const params of r.staticParams()) {
        out.push({ path: r.path.replace(/:([a-z]+)/gi, (_, k) => params[k]), route: r, params });
      }
    } else out.push({ path: r.path, route: r, params: {} });
  }
  return out;
}

export function resolveSeo(route, params) {
  return typeof route.seo === 'function' ? route.seo(params) : route.seo;
}
