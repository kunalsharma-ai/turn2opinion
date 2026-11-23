// Look of a profile card (icon and colour) and the #anchor deep links used by the dashboards.
import { isHashMode } from '../../router/Router.jsx';

const ART = [
  [/^basic/, 'id', 'blue'],
  [/educat|school|learn/, 'cap', 'orange'],
  [/profession|work|job/, 'briefcase', 'slate'],
  [/bank/, 'bank', 'green'],
  [/financ|money|income/, 'coin', 'green'],
  [/hobb/, 'sparkles', 'pink'],
  [/parent|family|kid/, 'heart', 'pink'],
  [/electronic|gadget|phone/, 'phone', 'blue'],
  [/shop|retail/, 'bag', 'orange'],
  [/tech|digital|it$|\bit\b/, 'chip', 'blue'],
  [/fashion|apparel|cloth/, 'cart', 'pink'],
  [/beauty|personal|care/, 'sparkles', 'pink'],
  [/food|beverage|snack|drink/, 'cup', 'orange'],
  [/travel|tour/, 'plane', 'blue'],
  [/pet/, 'paw', 'green'],
  [/home|household/, 'home', 'slate'],
  [/gam|esport/, 'game', 'violet'],
  [/music|media/, 'play', 'violet'],
  [/sport|fitness/, 'ball', 'green'],
  [/business|decision/, 'scale', 'slate'],
  [/hr|workplace/, 'users', 'violet'],
  [/auto|car/, 'car', 'slate'],
  [/health/, 'heart', 'green']
];
export function profileArt(p) {
  const key = `${p.slug || ''} ${p.name || ''}`.toLowerCase();
  const hit = ART.find(([re]) => re.test(key));
  return { icon: hit ? hit[1] : 'clipboard', tone: hit ? hit[2] : 'blue' };
}

/** The #anchor of the current URL (history mode "#x", hash-router mode "#/path/?a=x"). */
export function readAnchor() {
  if (typeof window === 'undefined') return '';
  const h = window.location.hash || '';
  if (isHashMode()) {
    const m = h.match(/[?&]a=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : '';
  }
  return decodeURIComponent(h.replace(/^#/, ''));
}
export function clearAnchor() {
  if (typeof window === 'undefined') return;
  try {
    if (isHashMode()) window.history.replaceState({}, '', window.location.hash.replace(/[?&]a=[^&]+/, ''));
    else window.history.replaceState({}, '', window.location.pathname + window.location.search);
  } catch {
    /* ignore */
  }
}
