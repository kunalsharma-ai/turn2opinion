# Turn2Opinion — Comprehensive Project Links Analysis & Inventory

> **Document:** `linksAnalysis.md`  
> **Project:** Turn2Opinion Frontend (`turn2opinion-website`)  
> **Version:** 2.0.0 (Release v3.2 architecture)  
> **Scope:** Full audit of internal routes, navigation menus, blog citations, external partners, social media, contact channels, asset links, anchors, API endpoints, and sitemap coverage.

---

## 1. Executive Summary

This report provides an exhaustive inventory, health assessment, and architectural analysis of all hyperlinks, routes, anchors, protocols, and endpoint references in the Turn2Opinion frontend application.

### Key Metrics Summary Table

| Category | Count / Metrics | Description & Notes |
| :--- | :---: | :--- |
| **Total Declared Routes** | **49 valid routes** | 19 Base Pages + 30 Prerendered Blog Posts (plus `404` catch-all) |
| **Internal Route Occurrences** | **615+ occurrences** | Across JSX components, layout menus, markdown posts, and live chat intents |
| **Blog Post Internal Markdown Links** | **230 links** | Internal cross-links across 30 blog post markdown bodies (avg ~7.7 per post) |
| **Live Chat Assistant Source Links** | **274 mappings** | Knowledge base routes mapped to user queries (`site-qa.js`, `intents.js`) |
| **In-Page Fragment / Anchor Identifiers** | **37 distinct anchors** | Accessibility `#main`, review wall `#rv-wall`, `#faqs`, 30 blog TOCs, 4 legal TOCs |
| **External Reference Citations** | **98 instances (20 domains)**| Authoritative governmental, regulatory, and educational references in blogs |
| **Brand Family & Group Platforms** | **4 distinct platforms** | Turn2Opinion, MyFrequentRewards, MyHealthOpinions, Frequent Research |
| **Official Social & Community Channels**| **5 channels** | Instagram, Facebook, LinkedIn, YouTube, WhatsApp |
| **Communication Protocols** | **3 protocols** | `mailto:` (Support & Legal), `tel:` (Phone), `https://wa.me/` (WhatsApp API) |
| **Static Asset & Preload Links** | **12 references** | Web fonts (`woff`/`woff2`), Favicons, SVG QR codes, Web App Manifest |
| **SEO Canonical & Schema Identifiers** | **49 canonical URLs** | Canonical tags, Open Graph meta tags, JSON-LD `@id` entities |
| **API Endpoints & Services** | **7 endpoints** | Register, Login, Enquiry, Reviews, Socials Auth, Resend OTP, Password Reset |

---

## 2. Overall Link Health & Critical Findings

| Check / Verification | Status | Details / Impact |
| :--- | :---: | :--- |
| **Internal Route Resolvability** | **PASSED (100%)** | All 301 active internal `<Link to>` and markdown references resolve to valid routes. |
| **Anchor / ID Matching** | **PASSED (100%)** | Every anchor link (`#main`, `#rv-wall`, `#faqs`, dynamic TOCs) has a corresponding HTML `id`. |
| **External Reference Security** | **PASSED (100%)** | All external links open with `target="_blank"` and `rel="noopener noreferrer"`. |
| **Missing Export Bug in `api.js`** | **CRITICAL BUG** | `api` object is imported in 5 components but not exported in [src/utils/api.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/utils/api.js). |
| **Orphaned / Unrouted Pages** | **WARNING** | [ForgotPassword.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/ForgotPassword.jsx) & [ResetPassword.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/ResetPassword.jsx) exist but are not in [src/routes.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/routes.js). |
| **HTML Sitemap Coverage Omission** | **WARNING** | `/about/scan-connect/` is defined in routes/menus but missing from [HtmlSitemap.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/HtmlSitemap.jsx). |
| **Font Preload Suboptimality** | **OPTIMIZATION** | [index.html](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/index.html) preloads `.woff` instead of smaller, modern `.woff2` fonts. |
| **Self-Referential External Link** | **USABILITY** | In [QrHub.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/sections/QrHub.jsx), Turn2Opinion card opens `https://www.turn2opinion.com/` in a new tab. |

---

## 3. Core Internal Route Architecture (`src/routes.js`)

The application routes are registered centrally in [src/routes.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/routes.js). Each static route defines its page component, SEO metadata, JSON-LD schema directives, and sitemap configuration.

### Base Application Routes (19 Pages + 404)

| Route Path | Component File | Page Title / Focus | Priority | Changefreq | Robots Directives |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `/` | [Home.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Home.jsx) | Paid Online Surveys & Rewards \| Turn2Opinion | 1.0 | weekly | `index,follow` |
| `/how-it-works/` | [HowItWorks.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/HowItWorks.jsx) | How Paid Online Surveys Work \| Turn2Opinion | 0.9 | monthly | `index,follow` |
| `/paid-surveys/` | [PaidSurveys.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/PaidSurveys.jsx) | Paid Online Surveys – Share Your Opinion & Earn Rewards | 0.9 | weekly | `index,follow` |
| `/profiling/` | [Profiling.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Profiling.jsx) | Survey Profiling & Quality Score \| Turn2Opinion | 0.8 | monthly | `index,follow` |
| `/rewards/` | [Rewards.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Rewards.jsx) | Survey Rewards – Earn & Redeem Your Way \| Turn2Opinion | 0.9 | monthly | `index,follow` |
| `/faq/` | [Faq.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Faq.jsx) | Paid Surveys FAQ – Questions & Answers \| Turn2Opinion | 0.7 | monthly | `index,follow` |
| `/about/` | [About.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/About.jsx) | About Turn2Opinion \| Global Opinion & Survey Community | 0.7 | monthly | `index,follow` |
| `/about/reviews/` | [Reviews.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Reviews.jsx) | Member Ratings & Reviews \| Turn2Opinion | 0.8 | weekly | `index,follow` |
| `/about/scan-connect/` | [ScanConnect.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/ScanConnect.jsx) | Scan & Connect – QR Codes & Social Channels | 0.5 | monthly | `index,follow` |
| `/blog/` | [Blog.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Blog.jsx) | Blogs: Earn Money Online & Paid Survey Guides | 0.8 | weekly | `index,follow` |
| `/contact/` | [Contact.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Contact.jsx) | Contact Turn2Opinion \| 24/7 Help, WhatsApp & Email | 0.6 | yearly | `index,follow` |
| `/join/` | [Join.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Join.jsx) | Join Free – Create Your Turn2Opinion Account | 0.8 | yearly | `index,follow` |
| `/login/` | [Login.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Login.jsx) | Member Login \| Turn2Opinion | N/A | Excluded | `noindex,follow` |
| `/privacy/` | [Privacy.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Privacy.jsx) | Privacy Policy \| Turn2Opinion | 0.3 | yearly | `index,follow` |
| `/gdpr/` | [Gdpr.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Gdpr.jsx) | GDPR & Data Protection \| Turn2Opinion | 0.3 | yearly | `index,follow` |
| `/cookies/` | [Cookies.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Cookies.jsx) | Cookie Policy \| Turn2Opinion | 0.3 | yearly | `index,follow` |
| `/terms/` | [Terms.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Terms.jsx) | Terms & Conditions \| Turn2Opinion | 0.3 | yearly | `index,follow` |
| `/sitemap/` | [HtmlSitemap.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/HtmlSitemap.jsx) | Sitemap \| Turn2Opinion | 0.2 | monthly | `index,follow` |
| `/404/` | [NotFound.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/NotFound.jsx) | Page not found \| Turn2Opinion | N/A | Excluded | `noindex,follow` |

---

## 4. Prerendered Blog Dynamic Routes (`/blog/:slug/`)

All 30 articles registered in [src/data/blog/index.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/data/blog/index.js) are rendered via [BlogPost.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/BlogPost.jsx) with static parameter expansion:

| Slug / URL Path | Category | Read Time | Published Date | Meta Title |
| :--- | :--- | :---: | :---: | :--- |
| `/blog/earn-money-online-realistic-guide/` | Earn online | 7 min | 2026-10-08 | Earn Money Online: A Realistic Beginner’s Guide (2026) |
| `/blog/earn-money-online-without-investment/` | Earn online | 6 min | 2026-10-05 | Earn Money Online Without Investment: 12 Legit Ways |
| `/blog/paid-surveys-complete-guide/` | Paid surveys | 6 min | 2026-10-02 | Paid Surveys: Complete Guide to Getting Paid for Opinions |
| `/blog/online-surveys-for-money-beginners/` | Paid surveys | 6 min | 2026-09-29 | Online Surveys for Money: Beginner’s Step-by-Step Playbook |
| `/blog/paid-surveys-for-cash-vs-gift-cards/` | Rewards & payouts | 6 min | 2026-09-26 | Paid Surveys for Cash vs Gift Cards: Which Is Better? |
| `/blog/get-paid-to-do-surveys-tips/` | Paid surveys | 6 min | 2026-09-23 | Paid to Do Surveys: 15 Tips to Qualify for More |
| `/blog/swagbucks-surveys-vs-survey-communities/`| Paid surveys | 6 min | 2026-09-20 | Swagbucks Surveys vs Dedicated Survey Communities |
| `/blog/online-work-from-home-without-investment/`| Work from home | 7 min | 2026-09-17 | Online Work From Home Without Investment: Real Options |
| `/blog/online-jobs-from-home-no-investment-scams/`| Safety & privacy | 7 min | 2026-09-14 | Online Jobs From Home, No Investment: Spot the Scams |
| `/blog/earn-dollars-online-without-investment-india/`| Earn online | 6 min | 2026-09-11 | Earn Dollars Online Without Investment From India |
| `/blog/free-money-making-online-myths/` | Safety & privacy | 7 min | 2026-09-08 | Free Money Making Online: Myths vs Real Opportunities |
| `/blog/online-income-ideas-beginners/` | Earn online | 6 min | 2026-09-05 | Online Income Ideas for Beginners (and Where Surveys Fit) |
| `/blog/make-money-without-any-investment-30-day-plan/`| Earn online | 7 min | 2026-09-02 | Make Money Without Any Investment: 30-Day Starter Plan |
| `/blog/paid-surveys-for-business-professionals/`| Professionals | 7 min | 2026-08-30 | Paid Surveys for Business Professionals (B2B Surveys) |
| `/blog/surveys-for-it-decision-makers/` | Professionals | 6 min | 2026-08-27 | Paid Surveys for IT Decision-Makers & Tech Professionals |
| `/blog/paid-surveys-for-healthcare-professionals/`| Professionals | 7 min | 2026-08-24 | Paid Surveys for Healthcare Professionals & Clinicians |
| `/blog/survey-profiling-more-invitations/` | Paid surveys | 7 min | 2026-08-21 | Survey Profiling: How to Get More Paid Survey Invitations |
| `/blog/why-you-get-screened-out-of-surveys/` | Paid surveys | 6 min | 2026-08-18 | Why You Get Screened Out of Surveys & How to Reduce It |
| `/blog/survey-rewards-points-thresholds-explained/`| Rewards & payouts | 7 min | 2026-08-15 | Survey Rewards Explained: Points, Thresholds & Redemption |
| `/blog/upi-paypal-wire-amazon-survey-payouts/` | Rewards & payouts | 7 min | 2026-08-12 | UPI vs PayPal vs Wire vs Amazon Gift Card: Survey Payouts |
| `/blog/are-paid-surveys-safe-data-privacy/` | Safety & privacy | 6 min | 2026-08-09 | Are Paid Surveys Safe? Data Privacy & Your GDPR Rights |
| `/blog/survey-quality-checks-explained/` | Safety & privacy | 6 min | 2026-08-06 | Survey Quality Checks Explained: Attention & Bot Checks |
| `/blog/earn-money-online-for-students/` | Work from home | 6 min | 2026-08-03 | Earn Money Online as a Student, Without Investment |
| `/blog/online-earning-for-homemakers/` | Work from home | 6 min | 2026-07-31 | Online Earning for Homemakers: Flexible Work From Home |
| `/blog/side-income-for-working-professionals/` | Professionals | 6 min | 2026-07-28 | Side Income for Working Professionals: Paid Surveys |
| `/blog/earn-money-online-using-phone/` | Paid surveys | 6 min | 2026-07-25 | Earn Money Online Using Your Phone: Mobile Surveys Guide |
| `/blog/online-work-for-retirees-senior-citizens/`| Work from home | 6 min | 2026-07-22 | Online Work Without Investment for Retirees & Seniors |
| `/blog/how-market-research-uses-your-opinion/` | Paid surveys | 7 min | 2026-07-19 | How Market Research Uses Your Survey Opinion |
| `/blog/paid-surveys-around-the-world/` | Rewards & payouts | 6 min | 2026-07-16 | Paid Surveys Worldwide: Rewards in the US, UK, UAE, India… |
| `/blog/first-week-paid-surveys-checklist/` | Paid surveys | 6 min | 2026-07-13 | First Week of Paid Surveys: A Day-by-Day Checklist |

---

## 5. Global Navigation & Layout Menus

### 5.1 Header Navigation ([src/components/Header.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/Header.jsx))

#### Main Nav Bar & Dropdowns

| Item Label | Target URL | Nav Level | Submenu Items / Details |
| :--- | :--- | :---: | :--- |
| **Home** | `/` | Top Level | Primary home landing |
| **About Us** | `/about/` | Dropdown Parent | Trigger for 3-item animated dropdown panel: |
| ↳ *About Turn2Opinion* | `/about/` | Sub-item 1 | "Who we are, our certifications and reach" |
| ↳ *Our Ratings & Reviews*| `/about/reviews/` | Sub-item 2 | "Real scores from consumers and professionals" |
| ↳ *Scan & Connect* | `/about/scan-connect/` | Sub-item 3 | "QR codes for our panels and social channels" |
| **Earn** | `/paid-surveys/` | Top Level | Consumer & professional survey categories |
| **How It Works** | `/how-it-works/` | Top Level | 6-step roadmap |
| **Rewards** | `/rewards/` | Top Level | Payment methods & redemption thresholds |
| **Trust & Safety** | `/profiling/` | Top Level | Quality score, BOT protection & validation |
| **Blogs** | `/blog/` | Top Level | Guides & news (annotated with *Trending* badge) |
| **FAQ** | `/faq/` | Top Level | Help desk questions & answers |
| **Contact** | `/contact/` | Top Level | 24/7 channels, switchboard & office |

#### Header Action Buttons & Mobile Menu
- **Log in**: `/login/` (Ghost button on desktop and mobile drawer)
- **Join free**: `/join/` (Primary shimmer button on desktop and mobile drawer)
- **Mobile Drawer Social Links**:
  - Instagram: `https://www.instagram.com/turn2opinion/`
  - Facebook: `https://www.facebook.com/tryturn2opinion`
  - LinkedIn: `https://www.linkedin.com/company/turn2opinionpanel/home/`
  - YouTube: `https://www.youtube.com/@Turn2Opinion`
  - WhatsApp: `https://wa.me/918178200573`

---

### 5.2 Footer Navigation ([src/components/Footer.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/Footer.jsx))

#### Column 1: Earn
- [Earn with paid surveys](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/PaidSurveys.jsx) -> `/paid-surveys/`
- [How it works](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/HowItWorks.jsx) -> `/how-it-works/`
- [Rewards](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Rewards.jsx) -> `/rewards/`
- [Trust & safety](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Profiling.jsx) -> `/profiling/`
- [Join free](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Join.jsx) -> `/join/`

#### Column 2: Learn
- [About us](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/About.jsx) -> `/about/`
- [Ratings & reviews](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Reviews.jsx) -> `/about/reviews/`
- [Scan & connect](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/ScanConnect.jsx) -> `/about/scan-connect/`
- [Blogs](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Blog.jsx) -> `/blog/`
- [FAQ](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Faq.jsx) -> `/faq/`
- [Contact](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Contact.jsx) -> `/contact/`
- [Sitemap](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/HtmlSitemap.jsx) -> `/sitemap/`

#### Column 3: Legal
- [Privacy policy](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Privacy.jsx) -> `/privacy/`
- [GDPR compliance](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Gdpr.jsx) -> `/gdpr/`
- [Cookie policy](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Cookies.jsx) -> `/cookies/`
- [Terms of use](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Terms.jsx) -> `/terms/`

#### Column 4: Talk to Us (Direct Communication)
- **Email**: `mailto:support@turn2opinion.com`
- **Phone**: `tel:+918130015743` (Display: `+91 81300 15743`)
- **WhatsApp**: `https://wa.me/918178200573?text=Hi%20Turn2Opinion%2C%20I%20have%20a%20question.`

#### Stage Hero CTA & Parent Company Link
- **Join Free CTA**: `/join/`
- **See how it works CTA**: `/how-it-works/`
- **Visit Frequent Research**: `https://www.frequentresearch.com` (`target="_blank" rel="noopener noreferrer"`)

---

### 5.3 HTML Sitemap ([src/pages/HtmlSitemap.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/HtmlSitemap.jsx))

The HTML sitemap categorizes all public pages for human visitors and crawlers:

```
Main pages:
  ├── Home                                  -> /
  ├── How It Works                          -> /how-it-works/
  ├── Paid Surveys                          -> /paid-surveys/
  ├── Survey Profiling & Quality Score       -> /profiling/
  ├── Survey Rewards                        -> /rewards/
  ├── About Turn2Opinion                    -> /about/
  ├── Member Ratings & Reviews              -> /about/reviews/
  ├── Contact                               -> /contact/
  ├── Join free                             -> /join/
  └── Member login                          -> /login/

Help & resources:
  ├── Frequently Asked Questions            -> /faq/
  └── Blogs                                 -> /blog/

Legal:
  ├── Privacy Policy                        -> /privacy/
  ├── GDPR & Data Protection                -> /gdpr/
  ├── Cookie Policy                         -> /cookies/
  └── Terms & Conditions                    -> /terms/

All blogs:
  └── [All 30 blog post links dynamically generated] -> /blog/:slug/
```

> [!WARNING] **Omission in `HtmlSitemap.jsx`**  
> While `/about/scan-connect/` is a key indexable landing page present in `routes.js`, `Header.jsx`, and `Footer.jsx`, it is **not listed** under "Main pages" or "Help & resources" in `HtmlSitemap.jsx`.

---

## 6. External Citations & Authoritative References (Blog Posts)

Across the 30 blog post markdown files in [src/data/blog/posts/](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/data/blog/posts/), there are **98 external link occurrences** pointing to **20 authoritative domains**. Every post satisfies the content quality rule of $\ge 2$ external links.

| External Target URL | Primary Domain | Occurrences | Topic / Context | Representative Anchor Labels |
| :--- | :--- | :---: | :--- | :--- |
| `https://cybercrime.gov.in/` | `cybercrime.gov.in` | **17x** | Indian National Cyber Crime Reporting Portal | "National Cyber Crime Reporting Portal", "cybercrime reporting portal" |
| `https://esomar.org/` | `esomar.org` | **13x** | Global market & social research industry body | "ESOMAR", "ESOMAR code of conduct", "research industry codes" |
| `https://www.npci.org.in/` | `npci.org.in` | **9x** | National Payments Corporation of India (UPI standards) | "National Payments Corporation of India", "NPCI guidelines" |
| `https://gdpr.eu/what-is-gdpr/` | `gdpr.eu` | **8x** | European GDPR regulation & compliance guide | "General Data Protection Regulation (GDPR)", "GDPR" |
| `https://www.incometax.gov.in/`| `incometax.gov.in` | **6x** | Government of India Income Tax Portal | "Income Tax Department of India", "tax reporting rules" |
| `https://www.iso.org/standard/73671.html` | `iso.org` | **6x** | ISO 20252:2019 Market & Opinion Research standard | "ISO 20252", "international research standards" |
| `https://www.linkedin.com/` | `linkedin.com` | **6x** | Professional networking & remote employment | "LinkedIn", "professional networking" |
| `https://consumer.ftc.gov/articles/job-scams` | `ftc.gov` | **5x** | US Federal Trade Commission job scam guide | "spotting job scams", "FTC consumer advice" |
| `https://www.paypal.com/` | `paypal.com` | **5x** | International payment processing & terms | "PayPal", "PayPal terms", "payment service" |
| `https://www.rbi.org.in/` | `rbi.org.in` | **4x** | Reserve Bank of India consumer awareness | "Reserve Bank of India", "RBI awareness notices" |
| `https://www.upwork.com/` | `upwork.com` | **3x** | Freelance platform comparison | "Upwork", "freelance platforms" |
| `https://www.fiverr.com/` | `fiverr.com` | **3x** | Freelance micro-task comparison | "Fiverr", "online freelance gigs" |
| `https://en.wikipedia.org/wiki/Market_research` | `wikipedia.org` | **2x** | Encyclopedia overview of market research | "Wikipedia overview of market research" |
| `https://www.meity.gov.in/` | `meity.gov.in` | **2x** | Ministry of Electronics and Information Technology | "Ministry of Electronics and Information Technology" |
| `https://www.ncs.gov.in/` | `ncs.gov.in` | **2x** | National Career Service (Govt of India) | "National Career Service", "government employment portal" |
| `https://www.sebi.gov.in/` | `sebi.gov.in` | **2x** | Securities and Exchange Board of India | "SEBI", "financial regulator warnings" |
| `https://www.investopedia.com/terms/m/marketresearch.asp` | `investopedia.com` | **2x** | Financial/business market research definition | "Investopedia guide to market research" |
| `https://www.swagbucks.com/` | `swagbucks.com` | **1x** | Survey aggregator comparison | "Swagbucks" |
| `https://reportfraud.ftc.gov/` | `ftc.gov` | **1x** | FTC fraud reporting portal | "ReportFraud.ftc.gov" |
| `https://www.ephmra.org/` | `ephmra.org` | **1x** | European Pharmaceutical Market Research Association | "European Pharmaceutical Market Research Association (EphMRA)" |

---

## 7. Brand Family & Ecosystem Links

Turn2Opinion operates within the Frequent Research family of panels. Defined in [src/config/site.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/config/site.js) and showcased in [QrHub.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/sections/QrHub.jsx):

```
                                  ┌──────────────────────────────────────────────┐
                                  │ Frequent Research Fieldwork Solutions        │
                                  │ https://www.frequentresearch.com             │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                     ┌───────────────────────────────────┼───────────────────────────────────┐
                     │                                   │                                   │
                     ▼                                   ▼                                   ▼
        ┌─────────────────────────┐         ┌─────────────────────────┐         ┌─────────────────────────┐
        │ Turn2Opinion            │         │ MyFrequentRewards       │         │ MyHealthOpinions        │
        │ https://www.turn2opinion│         │ https://www.myfrequent  │         │ https://www.myhealth    │
        │ .com/                   │         │ rewards.com/            │         │ opinions.com/           │
        │ (Consumer & B2B)        │         │ (Loyalty & Rewards)     │         │ (Healthcare & Clinical) │
        └─────────────────────────┘         └─────────────────────────┘         └─────────────────────────┘
```

| Brand / Panel | Category | Destination URL | Static QR Code Asset | Brand Logo Asset |
| :--- | :--- | :--- | :--- | :--- |
| **Turn2Opinion** | Consumer & B2B panel | `https://www.turn2opinion.com/` | `/images/qr/turn2opinion-qr.svg` | `/images/brand/turn2opinion-wordmark.webp` |
| **MyFrequentRewards** | Loyalty & rewards panel | `https://www.myfrequentrewards.com/` | `/images/qr/myfrequentrewards-qr.svg` | `/images/brand/myfrequentrewards-wordmark.webp` |
| **MyHealthOpinions** | Healthcare panel | `https://www.myhealthopinions.com/` | `/images/qr/myhealthopinions-qr.svg` | `/images/brand/myhealthopinions-mark.webp` |
| **Frequent Research** | Parent fieldwork company| `https://www.frequentresearch.com/` | `/images/qr/frequentresearch-qr.svg` | `/images/brand/frequent-research-mark.webp` |

---

## 8. Social Media Channels & Sharing Links

### 8.1 Official Brand Channels ([src/config/site.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/config/site.js))

| Platform | Handle / Identifier | Destination URL | QR Code Asset | Accent Gradient |
| :--- | :--- | :--- | :--- | :--- |
| **Instagram** | `@turn2opinion` | `https://www.instagram.com/turn2opinion/` | `/images/qr/instagram-qr.svg` | `#C13584` → `#F77737` |
| **Facebook** | `tryturn2opinion` | `https://www.facebook.com/tryturn2opinion` | `/images/qr/facebook-qr.svg` | `#1877F2` → `#49B6FF` |
| **LinkedIn** | `Turn2Opinion` | `https://www.linkedin.com/company/turn2opinionpanel/home/` | `/images/qr/linkedin-qr.svg` | `#0A66C2` → `#12C29B` |
| **YouTube** | `@Turn2Opinion` | `https://www.youtube.com/@Turn2Opinion` | `/images/qr/youtube-qr.svg` | `#FF0000` → `#FF8A3D` |
| **WhatsApp** | `+91 81782 00573` | `https://wa.me/918178200573` | `/images/qr/whatsapp-qr.svg` | `#25D366` → `#0E7A4B` |

### 8.2 Dynamic Blog Sharing Links ([src/pages/BlogPost.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/BlogPost.jsx))

Every blog post provides dynamic sharing buttons formatted with standard web intent query parameters:
- **LinkedIn**: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`
- **WhatsApp**: `https://wa.me/?text=${encodeURIComponent(postTitle + ' ' + canonicalUrl)}`

---

## 9. Direct Communication Protocols (`mailto:`, `tel:`, WhatsApp)

| Protocol | Link URI / Generator | Context & Locations Used | Purpose |
| :--- | :--- | :--- | :--- |
| **Email** | `mailto:support@turn2opinion.com` | Footer contact col, Contact page switchboard, GDPR page (`Gdpr.jsx`), Terms (`Terms.jsx`), Privacy (`Privacy.jsx`), LiveChat handoff | General inquiries, GDPR data erasure/access requests |
| **Email (Subject)**| `mailto:support@turn2opinion.com?subject=Password%20reset%20request` | [Login.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Login.jsx) | Fallback password reset trigger on the login form |
| **Telephone** | `tel:+918130015743` | Footer contact col, Contact switchboard ([Contact.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Contact.jsx)), Schema metadata | Direct phone support during IST office hours |
| **WhatsApp API**| `https://wa.me/918178200573` | Mobile navigation drawer, QrHub social cards | Instant direct messenger access |
| **WhatsApp Deep Link**| `waLink("Hi Turn2Opinion, I have a question.")` | Footer contact, Contact switchboard, LiveChat handoff button | Direct messaging with pre-populated message string |

---

## 10. In-Page Fragment & Anchor Identifiers (Hash Links)

| Anchor Target | Triggering Source File | Destination Element & ID | Functional Description |
| :--- | :--- | :--- | :--- |
| `#main` | [App.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/App.jsx) (`<a href="#main" className="skip-link">`) | `<main id="main">` | Accessibility "Skip to content" keyboard link |
| `#rv-wall` | [Reviews.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Reviews.jsx) (`<a href="#rv-wall">`) | `<section id="rv-wall">` | Smooth jump from hero directly to review filter wall |
| `#faqs` | [BlogPost.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/BlogPost.jsx) (`<a href="#faqs">`) | `<h2 id="faqs">` | Table of contents jump to post FAQ accordion |
| `#{h.id}` | [BlogPost.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/BlogPost.jsx) (`toc.map`) | `<h2 id={slugify(b.text)}>` | Dynamic Table of Contents jumps for all H2 headings |
| `#{s.id}` | [LegalLayout.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/LegalLayout.jsx) | `<section id={s.id}>` | Sticky sidebar scroll-spy TOC on Privacy, Terms, GDPR, Cookies |
| `#about-menu` | [Header.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/Header.jsx) | `<div id="about-menu">` | ARIA dropdown panel relationship controller |
| `#footer-cta-title` | [Footer.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/Footer.jsx) | `<h2 id="footer-cta-title">` | ARIA section labelling for footer hero stage |
| `#qr-title` / `#qr-family-h` | [QrHub.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/sections/QrHub.jsx) | `<h2 id="...">` | Accessible section headers for QR Hub |

---

## 11. Live Chat Assistant Knowledge Base Links

The 24/7 AI/heuristic assistant engine ([src/utils/assistant.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/utils/assistant.js)) surfaces contextual `Read more:` source links stored in `src/data/assistant/site-qa.js` and `src/data/assistant/intents.js`.

**Audit Result:** All **274 question-intent mappings** point to valid, canonical internal routes.

### Most Frequently Recommended Landing Pages by the Assistant

| Internal Target Path | Intent & Question Matches | Topic Domains |
| :--- | :---: | :--- |
| `/faq/` | **26 intents** | General questions, verification, age rules, registration help |
| `/rewards/` | **11 intents** | Payout methods, thresholds, points expiry, Amazon vouchers |
| `/profiling/` | **9 intents** | Quality score, profile questions, account validation |
| `/paid-surveys/` | **8 intents** | Survey eligibility, screen-outs, study durations |
| `/blog/survey-quality-checks-explained/` | **8 intents** | Bot checks, attention questions, red herrings |
| `/blog/earn-money-online-using-phone/` | **8 intents** | Mobile device surveys, notifications |
| `/blog/survey-rewards-points-thresholds-explained/` | **8 intents** | Threshold redemption timing, points conversion |
| `/how-it-works/` | **7 intents** | Registration steps, earning lifecycle |
| `/blog/online-jobs-from-home-no-investment-scams/` | **7 intents** | Scam prevention, safety, registration fees warnings |
| `/blog/paid-surveys-around-the-world/` | **7 intents** | Supported countries, currency conversions |
| `/blog/get-paid-to-do-surveys-tips/` | **7 intents** | Qualification tips, avoiding screen-outs |
| `/blog/why-you-get-screened-out-of-surveys/` | **7 intents** | Quota full, demographic misfit explanation |
| `/blog/upi-paypal-wire-amazon-survey-payouts/` | **7 intents** | UPI in India vs PayPal international comparison |
| `/blog/paid-surveys-for-cash-vs-gift-cards/` | **7 intents** | Cash vs voucher speed and flexibility |

---

## 12. Static Assets, Preloads, Fonts & CDNs

### 12.1 Preloads & Favicons ([index.html](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/index.html))

| Asset Path | Link Rel | Type / Format | Status / Verification |
| :--- | :--- | :--- | :--- |
| `/favicon.ico` | `icon` | `image/x-icon` | Present in `public/favicon.ico` (4,755 bytes) |
| `/favicon.svg` | `icon` | `image/svg+xml` | Present in `public/favicon.svg` (573 bytes) |
| `/apple-touch-icon.png` | `apple-touch-icon` | `image/png` | Present in `public/apple-touch-icon.png` (7,798 bytes) |
| `/site.webmanifest` | `manifest` | `application/manifest+json` | Present in `public/site.webmanifest` |
| `/fonts/inter-var.woff` | `preload` | `font/woff` | Present in `public/fonts/inter-var.woff` (34,636 bytes) |
| `/fonts/manrope-var.woff` | `preload` | `font/woff` | Present in `public/fonts/manrope-var.woff` (27,064 bytes) |

### 12.2 External CDNs & Third-Party Scripts

| External URL | Source Location | Purpose |
| :--- | :--- | :--- |
| `https://www.googletagmanager.com/gtm.js?id=GTM-MF5D955` | [index.html](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/index.html) | Google Tag Manager main analytics loader |
| `https://www.googletagmanager.com/ns.html?id=GTM-MF5D955` | [index.html](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/index.html) | Google Tag Manager fallback iframe (`<noscript>`) |
| `https://www.google.com/recaptcha/api.js?...` | [Captcha.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/Captcha.jsx) | Google reCAPTCHA v2 / v3 script |
| `https://unpkg.com/swagger-ui-dist/swagger-ui.css` | `public/docs/index.html` | Swagger UI stylesheet |
| `https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js` | `public/docs/index.html` | Swagger UI core runtime bundle |
| `https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js` | `public/docs/index.html` | Swagger UI standalone preset plugin |

---

## 13. API Endpoints & Environment Service Links

Managed via [src/config/env.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/config/env.js) and [src/utils/api.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/utils/api.js):

| Config Key / Variable | Default URL / Path | Target Method | Component Usage |
| :--- | :--- | :---: | :--- |
| `API_SIGNUP_URL` | `/api/register` | `POST` | [Join.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Join.jsx) (Member account creation) |
| `API_LOGIN_URL` | `/api/login` | `POST` | [Login.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Login.jsx) (Member authentication) |
| `API_ENQUIRY_URL` | `/api/enquiry` | `POST` | [Contact.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Contact.jsx), [LiveChat.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/LiveChat.jsx) |
| `API_REVIEWS_URL` | `/api/reviews` | `GET`, `POST` | [reviews.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/utils/reviews.js), [Reviews.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Reviews.jsx) |
| Direct Endpoint | `/api/v1/auth/socials` | `POST` | [SocialAuth.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/SocialAuth.jsx) |
| Direct Endpoint | `/api/v1/socials` | `GET` | [FollowUs.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/FollowUs.jsx) |
| Direct Endpoint | `/api/v1/user/resend` | `POST` | [ResendVerify.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/ResendVerify.jsx) |
| Direct Endpoint | `/api/v1/forgot-password`| `POST` | [ForgotPassword.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/ForgotPassword.jsx) *(Orphaned)* |
| Direct Endpoint | `/api/v1/user` | `PATCH` | [ResetPassword.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/ResetPassword.jsx) *(Orphaned)* |

---

## 14. Detailed Inconsistencies, Architectural Risks & Actionable Recommendations

### 1. [CRITICAL BUG] Missing `api` Export in `src/utils/api.js`
- **Location:** [src/utils/api.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/utils/api.js)
- **Problem:** Several components import `{ api }` from `../utils/api.js`:
  - `src/components/SocialAuth.jsx` (line 2)
  - `src/components/FollowUs.jsx` (line 2)
  - `src/components/ResendVerify.jsx` (line 2)
  - `src/pages/ForgotPassword.jsx` (line 3)
  - `src/pages/ResetPassword.jsx` (line 3)
  However, `api.js` only exports `postJSON`, `getJSON`, and `failureMessage`. It does **not** export an `api` helper object (e.g. `{ get, post, patch }`).
- **Impact:** Any component invoking `api.get(...)` or `api.post(...)` will crash at runtime with `TypeError: Cannot read properties of undefined`.
- **Recommended Fix:** Add an `api` export to `src/utils/api.js`:
  ```javascript
  export const api = {
    get: (url, opts) => getJSON(url, opts),
    post: (url, body, opts) => postJSON(url, body, opts),
    patch: async (url, body, opts) => {
      // implement fetch with method: 'PATCH'
    }
  };
  ```

---

### 2. [ARCHITECTURE] Orphaned / Unrouted Pages (`ForgotPassword` & `ResetPassword`)
- **Location:** [src/pages/ForgotPassword.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/ForgotPassword.jsx) and [src/pages/ResetPassword.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/ResetPassword.jsx)
- **Problem:** Both files are completely implemented React page components with forms, breadcrumbs, validation, and API integration. However, neither route is registered in [src/routes.js](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/routes.js).
- **Consequence:** 
  1. In [src/pages/Login.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Login.jsx) line 133, "Forgot password?" is wired to a `mailto:` link instead of routing to the dedicated page:
     ```jsx
     <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('Password reset request')}`} className="login-forgot">
       Forgot password?
     </a>
     ```
  2. In `src/data/assistant/intents.js`, the chatbot promises: *"Use “Forgot password?” on the login page – we’ll email you a reset link."*
- **Recommended Fix:** 
  1. Add `/forgot-password/` and `/reset-password/` to `ROUTES` in `src/routes.js` with `sitemap: false` and `robots: 'noindex,follow'`.
  2. Change [Login.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/Login.jsx) line 133 to `<Link to="/forgot-password/" className="login-forgot">Forgot password?</Link>`.

---

### 3. [SITEMAP] Missing `/about/scan-connect/` in `HtmlSitemap.jsx`
- **Location:** [src/pages/HtmlSitemap.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/pages/HtmlSitemap.jsx)
- **Problem:** The v3.2 release promoted the Scan & Connect QR hub to its own dedicated page at `/about/scan-connect/`. While it is included in `src/routes.js`, `Header.jsx`, and `Footer.jsx`, it was omitted from the `GROUPS` array in `HtmlSitemap.jsx`.
- **Recommended Fix:** Add `['/about/scan-connect/', 'Scan & Connect']` under the `'Main pages'` group in `HtmlSitemap.jsx`.

---

### 4. [PERFORMANCE] Font Preload Modernization (`woff` vs `woff2`)
- **Location:** [index.html](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/index.html) lines 23-36
- **Problem:** `index.html` currently specifies:
  ```html
  <link rel="preload" href="/fonts/inter-var.woff" as="font" type="font/woff" crossorigin />
  <link rel="preload" href="/fonts/manrope-var.woff" as="font" type="font/woff" crossorigin />
  ```
  Both `inter-var.woff2` (27.6 KB) and `manrope-var.woff2` (21.9 KB) already exist in `public/fonts/` and are actively referenced in `src/styles/base.css`. WOFF2 offers 20–25% smaller file size and faster decompression.
- **Recommended Fix:** Update the preloads in `index.html` to target `.woff2` with `type="font/woff2"`.

---

### 5. [UX/SEO] Self-Referential External Link in `QrHub.jsx`
- **Location:** [src/components/sections/QrHub.jsx](file:///home/frfs/Projects/turn2opinion/Project/frontend-1/src/components/sections/QrHub.jsx) lines 26-33
- **Problem:** The Family rail card for Turn2Opinion (`p.self = true`) uses an `<a>` tag with `href={p.url}` (`https://www.turn2opinion.com/`) and `target="_blank"`. When a user visits `/about/scan-connect/` or views the footer and clicks on the Turn2Opinion card, it opens a duplicate tab of the current domain.
- **Recommended Fix:** For cards where `p.self === true`, prevent new tab spawning or render a non-navigating badge / router link to `#top`.

---

## 15. Conclusion

The Turn2Opinion website exhibits a well-structured linking architecture:
- **100% of currently active internal routes resolve cleanly**, with zero broken page links across navigation, components, and blog markdown files.
- **Anchor tag hygiene is excellent**, with all in-page jumps matching valid element IDs.
- **External citations strictly comply** with security protocols (`rel="noopener noreferrer"` and `target="_blank"`).
- Resolving the **5 identified architectural and implementation items** (particularly the `api` export in `api.js` and routing for `ForgotPassword.jsx`/`ResetPassword.jsx`) will bring the codebase to full production integrity.
