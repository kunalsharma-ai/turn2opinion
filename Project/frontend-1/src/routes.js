// Route table: URL -> page module + SEO metadata.
// Every indexable page owns a unique title, description, canonical, robots directive and schema.
// scripts/prerender.mjs reads this table to write one static HTML file per route plus sitemap.xml.
import { BLOG_POSTS, getPostMeta } from './data/blog/index.js';
import { loadPostBody } from './data/blog/loaders.js';

const page = (loader) => loader; // readability helper

export const ROUTES = [
  {
    path: '/',
    load: page(() => import('./pages/Home.jsx')),
    seo: {
      title: 'Paid Online Surveys & Rewards | Turn2Opinion',
      description:
        'Earn money online without investment by sharing your opinion. Join Turn2Opinion free and take paid surveys as a consumer or business professional, then redeem rewards your way.',
      schema: ['website', 'organization']
    },
    sitemap: { priority: '1.0', changefreq: 'weekly' }
  },
  {
    path: '/how-it-works/',
    load: page(() => import('./pages/HowItWorks.jsx')),
    seo: {
      title: 'How Paid Online Surveys Work | Turn2Opinion',
      description:
        'See how Turn2Opinion works: create a free profile, receive matching survey invitations, share honest opinions and redeem rewards through PayPal, wire transfer, gift cards or UPI in India.',
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
        'Explore paid online surveys for consumers and professionals. Get paid to do surveys on shopping, technology, health, finance and business topics – no investment needed.',
      crumb: 'Paid Surveys'
    },
    sitemap: { priority: '0.9', changefreq: 'weekly' }
  },
  {
    path: '/profiling/',
    load: page(() => import('./pages/Profiling.jsx')),
    seo: {
      title: 'Survey Profiling & Quality Score | Turn2Opinion',
      description:
        'Complete your Turn2Opinion profile to match more surveys. Learn how profiling, quality scores, bot validation and multi-layer security checks protect honest members.',
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
        'Turn survey points into rewards via PayPal, wire transfer, Amazon gift cards or UPI (India). Learn how earning, balance tracking and reward claims work at Turn2Opinion.',
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
      title: 'Member Ratings & Reviews | Turn2Opinion',
      description:
        'Real Turn2Opinion ratings and reviews from consumers and business professionals in dozens of countries. See the average score, how members rate surveys, rewards, support and mobile, and read every review in full.',
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
        'Scan a QR code to open Turn2Opinion, our sister panels MyFrequentRewards and MyHealthOpinions, Frequent Research, or follow us on Instagram, Facebook, LinkedIn, YouTube and WhatsApp.',
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
        'Practical blogs on earning money online without investment, paid surveys for cash, online work from home, survey rewards and staying safe from scams.',
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
      title: 'Join Free – Create Your Turn2Opinion Account',
      description:
        'Create your free Turn2Opinion account in minutes. No fees, no investment – just verify your email and phone and start receiving paid survey invitations.',
      crumb: 'Join free'
    },
    sitemap: { priority: '0.8', changefreq: 'yearly' }
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
      title: 'Privacy Policy | Turn2Opinion',
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
      title: 'GDPR & Data Protection | Turn2Opinion',
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
      title: 'Cookie Policy | Turn2Opinion',
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
      title: 'Terms & Conditions | Turn2Opinion',
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
      title: 'Sitemap | Turn2Opinion',
      description: 'Every page on Turn2Opinion in one place: surveys, rewards, profiling, blogs, help and legal pages.',
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
