// Pages made for the Teen panel (13–17) and their parents. Meta's advertising terms restrict
// tracking and ad targeting of under-18s, so the Meta Pixel never loads or fires on these pages
// (see src/seo/seo.js and src/utils/analytics.js). Google Tag Manager still follows the visitor's
// cookie choice; keep any Meta tags inside GTM off these paths too.
import { BLOG_POSTS } from '../data/blog/index.js';

const TEEN_PREFIXES = ['/earn/teens/', '/join/teen/', '/parent-consent/', '/teen/'];
const TEEN_POSTS = new Set(BLOG_POSTS.filter((p) => p.category === 'Teens & family').map((p) => `/blog/${p.slug}/`));

export function isTeenPath(path) {
  const p = String(path || '/').split(/[?#]/)[0].replace(/\/?$/, '/');
  return TEEN_PREFIXES.some((t) => p.startsWith(t)) || TEEN_POSTS.has(p);
}
