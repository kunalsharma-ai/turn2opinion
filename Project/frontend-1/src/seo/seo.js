// Route-level SEO: builds <head> tags for the prerenderer and keeps them in sync on client navigation.
import { ENV } from '../config/env.js';
import { SITE } from '../config/site.js';
import { FAQ_GROUPS } from '../data/faqs.js';
import { TESTIMONIALS } from '../data/testimonials.js';
import { BLOG_POSTS } from '../data/blog/index.js';
import { isTeenPath } from './teen.js';

const abs = (path) => ENV.SITE_URL + (path.startsWith('/') ? path : '/' + path);

function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ENV.SITE_URL + '/#organization',
    name: SITE.name,
    url: ENV.SITE_URL + '/',
    logo: abs(SITE.logo),
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country
    },
    parentOrganization: { '@type': 'Organization', name: SITE.legalName, url: SITE.parentUrl },
    sameAs: [...new Set([...SITE.social.map((s) => s.url), ...(SITE.xHandle ? [`https://x.com/${SITE.xHandle}`] : [])])],
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'customer support', email: SITE.email, telephone: SITE.phone, availableLanguage: ['English'] }
    ]
  };
}

// The office as a local business, so search engines can tie the brand to a real, visitable place
// (Local SEO). It points back to the Organization node rather than repeating it.
function localBusiness() {
  const h = SITE.openingHours;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ENV.SITE_URL + '/#localbusiness',
    name: SITE.name,
    description: 'Paid online surveys and market research community for consumers and business professionals.',
    url: ENV.SITE_URL + '/',
    logo: abs(SITE.logo),
    image: abs(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: 'Free',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: 'Delhi',
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country
    },
    ...(SITE.geo ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.latitude, longitude: SITE.geo.longitude } } : {}),
    ...(h
      ? { openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }] }
      : {}),
    areaServed: 'Worldwide',
    parentOrganization: { '@id': ENV.SITE_URL + '/#organization' },
    sameAs: SITE.social.map((s) => s.url)
  };
}

function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ENV.SITE_URL + '/#website',
    name: SITE.name,
    url: ENV.SITE_URL + '/',
    publisher: { '@id': ENV.SITE_URL + '/#organization' },
    inLanguage: 'en'
  };
}

function breadcrumb(path, seo) {
  if (path === '/' || !seo.crumb) return null;
  const items = [{ name: 'Home', path: '/' }];
  if (seo.parent) items.push({ name: seo.parent.name, path: seo.parent.path });
  items.push({ name: seo.crumb, path });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': abs(seo.canonical || path) + '#breadcrumb',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) }))
  };
}

function faqPage(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  };
}

/**
 * Structured data for /about/reviews/.
 *
 * Deliberately a CollectionPage holding an ItemList of Review objects rather than an
 * aggregateRating bolted onto the Organization. Google does not allow self-serving reviews about
 * your own organisation to earn review rich results, so claiming them would be both ineffective
 * and against the guidelines. This markup is accurate — it describes exactly what the page is,
 * a list of member reviews we hold on record — and search engines can read it without us
 * pretending it is something it is not.
 *
 * Only reviews with a score on record are listed, capped so the JSON-LD stays small.
 */
function reviewsPage(path, seo, reviews) {
  const rated = (reviews || []).filter((r) => r.rating > 0 && r.text && r.name).slice(0, 30);
  if (!rated.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': abs(path) + '#reviews',
    name: seo.title,
    description: seo.description,
    url: abs(path),
    isPartOf: { '@id': ENV.SITE_URL + '/#website' },
    about: { '@id': ENV.SITE_URL + '/#organization' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: rated.length,
      itemListElement: rated.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Review',
          author: { '@type': 'Person', name: r.name },
          reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
          reviewBody: r.text,
          ...(r.date ? { datePublished: String(r.date).slice(0, 10) } : {}),
          itemReviewed: { '@type': 'Organization', name: SITE.name, url: ENV.SITE_URL + '/' }
        }
      }))
    }
  };
}

function article(path, seo) {
  const p = seo.post;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated || p.date,
    mainEntityOfPage: { '@id': abs(path) + '#webpage' },
    isPartOf: { '@id': ENV.SITE_URL + '/blog/#blog' },
    url: abs(path),
    image: abs(SITE.ogImage),
    keywords: (p.keywords || []).join(', '),
    articleSection: p.category,
    author: { '@type': 'Organization', name: 'Turn2Opinion Editorial Team', url: ENV.SITE_URL + '/about/' },
    publisher: { '@id': ENV.SITE_URL + '/#organization' },
    inLanguage: 'en'
  };
}

// One WebPage node per page, tied to the site, the organisation and the breadcrumb, so search
// engines and AI assistants read every page as part of one entity graph.
function webPage(path, seo, bc) {
  const url = abs(seo.canonical || path);
  const type = path === '/about/' ? 'AboutPage' : path === '/contact/' ? 'ContactPage' : path === '/faq/' ? 'FAQPage' : path === '/blog/' ? 'CollectionPage' : 'WebPage';
  if (type === 'FAQPage') return null; // faqPage() already describes /faq/
  const node = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': url + '#webpage',
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: 'en',
    isPartOf: { '@id': ENV.SITE_URL + '/#website' },
    about: { '@id': ENV.SITE_URL + '/#organization' },
    publisher: { '@id': ENV.SITE_URL + '/#organization' },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(SITE.ogImage), width: 1200, height: 630 }
  };
  if (bc) node.breadcrumb = { '@id': url + '#breadcrumb' };
  if (isTeenPath(path)) node.audience = { '@type': 'PeopleAudience', suggestedMinAge: 13, suggestedMaxAge: 17, audienceType: 'Teens with parent or guardian permission' };
  return node;
}

// The blog index lists every guide, newest first.
function blogList() {
  const posts = [...BLOG_POSTS].sort((a, b) => String(b.updated || b.date).localeCompare(String(a.updated || a.date)));
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': ENV.SITE_URL + '/blog/#blog',
    name: 'Turn2Opinion Blog',
    url: ENV.SITE_URL + '/blog/',
    inLanguage: 'en',
    publisher: { '@id': ENV.SITE_URL + '/#organization' },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: abs(`/blog/${p.slug}/`),
      datePublished: p.date,
      dateModified: p.updated || p.date
    }))
  };
}

/** Compute the full head description for a path. `data` is the route's loaded data (blog body etc.). */
export function buildHead(path, seo, data) {
  const canonical = abs(seo.canonical || path);
  const robots = seo.robots || 'index,follow,max-image-preview:large';
  const image = abs(SITE.ogImage);
  const schema = [];
  const kinds = seo.schema || [];
  if (kinds.includes('website')) schema.push(website());
  if (kinds.includes('organization')) schema.push(organization());
  if (kinds.includes('localBusiness')) schema.push(localBusiness());
  if (kinds.includes('article') && seo.post) schema.push(article(path, seo));
  if (kinds.includes('faq')) {
    const faqs = path === '/faq/' ? FAQ_GROUPS.flatMap((g) => g.items) : data && data.faqs;
    const f = faqPage(faqs);
    if (f) schema.push(f);
  }
  if (kinds.includes('aggregateRating')) {
    const rp = reviewsPage(path, seo, TESTIMONIALS);
    if (rp) schema.push(rp);
  }
  const bc = breadcrumb(path, seo);
  if (!seo.robots || !/noindex/.test(seo.robots)) {
    const wp = webPage(path, seo, bc);
    if (wp) schema.push(wp);
    if (path === '/blog/') schema.push(blogList());
  }
  if (bc) schema.push(bc);
  return {
    pixel: !isTeenPath(path),
    title: seo.title,
    description: seo.description,
    canonical,
    robots,
    ogType: seo.ogType || 'website',
    image,
    schema,
    keywords: seo.post ? seo.post.keywords : null,
    published: seo.post ? seo.post.date : null
  };
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// JSON-LD must not contain "</script"
const jsonLd = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

/** Serialise head tags for static HTML (used by the prerenderer). */
export function headToHtml(h) {
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="robots" content="${esc(h.robots)}" />`,
    `<link rel="canonical" href="${esc(h.canonical)}" />`,
    // The site is published in one language (English) at one URL per page; translations happen
    // in the browser. Self-referencing hreflang plus x-default tells search engines exactly that.
    `<link rel="alternate" hreflang="en" href="${esc(h.canonical)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${esc(h.canonical)}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:type" content="${esc(h.ogType)}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${esc(h.canonical)}" />`,
    `<meta property="og:image" content="${esc(h.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:type" content="${esc(SITE.ogImageType || 'image/png')}" />`,
    `<meta property="og:image:alt" content="${esc(SITE.name + ' – paid online surveys and rewards')}" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${esc(h.image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(SITE.name + ' – paid online surveys and rewards')}" />`
  ];
  if (SITE.xHandle) {
    tags.push(`<meta name="twitter:site" content="@${esc(SITE.xHandle)}" />`);
    tags.push(`<meta name="twitter:creator" content="@${esc(SITE.xHandle)}" />`);
  }
  if (h.published) tags.push(`<meta property="article:published_time" content="${esc(h.published)}" />`);
  if (ENV.GSC_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${esc(ENV.GSC_VERIFICATION)}" />`);
  for (const s of h.schema) tags.push(`<script type="application/ld+json" data-seo="1">${jsonLd(s)}</script>`);
  if (ENV.META_PIXEL_ID && h.pixel !== false) {
    // Teen (13–17) pages never get the pixel (h.pixel is false there, see src/seo/teen.js).
    // disablePushState stops the pixel counting in-app navigations on its own (analytics.js counts
    // them, skipping Teen pages), and autoConfig off stops automatic button-click events.
    // Meta Pixel base code with consent revoked by default; analytics.js grants it only after the
    // visitor accepts marketing cookies, so no cookies are set and no events leave the page before.
    tags.push(
      // The <noscript> image from Meta's snippet is left out on purpose: without JavaScript a
      // visitor can never accept cookies, so that image would track them without consent.
      `<!-- Meta Pixel Code --><script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];(f.t2oLate||function(x){x()})(function(){s.parentNode.insertBefore(t,s)})}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq.disablePushState=!0;fbq('consent','revoke');fbq('set','autoConfig',!1,'${ENV.META_PIXEL_ID}');fbq('init','${ENV.META_PIXEL_ID}');fbq('track','PageView');</script><!-- End Meta Pixel Code -->`
    );
  }
  return tags.join('\n    ');
}

/** Client-side: update head after in-app navigation. */
export function applyHead(h) {
  if (typeof document === 'undefined') return;
  document.title = h.title;
  const setMeta = (attr, key, content) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };
  setMeta('name', 'description', h.description);
  setMeta('name', 'robots', h.robots);
  setMeta('property', 'og:type', h.ogType);
  setMeta('property', 'og:title', h.title);
  setMeta('property', 'og:description', h.description);
  setMeta('property', 'og:url', h.canonical);
  setMeta('property', 'og:image', h.image);
  setMeta('name', 'twitter:title', h.title);
  setMeta('name', 'twitter:description', h.description);
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', h.canonical);
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.setAttribute('href', h.canonical));
  document.head.querySelectorAll('script[data-seo="1"]').forEach((n) => n.remove());
  for (const s of h.schema) {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.dataset.seo = '1';
    el.textContent = JSON.stringify(s);
    document.head.appendChild(el);
  }
}
