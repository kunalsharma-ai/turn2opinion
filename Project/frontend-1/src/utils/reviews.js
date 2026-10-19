// Member reviews -> testimonials.
// 1. A review is POSTed to VITE_API_REVIEWS_URL (backend stores it, ideally with moderation).
// 2. The testimonials wall GETs approved reviews from the same URL and polls for new ones.
// 3. The visitor's own review appears instantly in their browser (and other open tabs via
//    BroadcastChannel) so they see it land in the testimonials straight away.
//
// v3.2: the testimonials deck and reviews page poll approved reviews every 30 s, and the example
// backend can publish instantly (REVIEWS_AUTO_PUBLISH=true) so a new review reaches everyone.
//
// v3.1 adds the four facet scores (see src/data/reviewFacets.js) and the audience world, both of
// which the testimonial wall and the reviews page use for colour grading.
import { ENV } from '../config/env.js';
import { getJSON, postJSON } from './api.js';
import { store } from './storage.js';
import { TESTIMONIALS } from '../data/testimonials.js';
import { FACETS, facetAverage } from '../data/reviewFacets.js';

const LOCAL_KEY = 't2o_my_reviews_v1';
const EVENT = 't2o:review';
let channel = null;

function getChannel() {
  if (channel || typeof window === 'undefined' || !('BroadcastChannel' in window)) return channel;
  channel = new BroadcastChannel('t2o-reviews');
  channel.onmessage = (e) => window.dispatchEvent(new CustomEvent(EVENT, { detail: e.data }));
  return channel;
}

const clean = (s, max) => String(s || '').replace(/[<>]/g, '').trim().slice(0, max);
const score = (n) => {
  const v = Math.round(Number(n));
  return v >= 1 && v <= 5 ? v : 0;
};

/** Keep only the known facet keys, each 0 (unset) or 1–5. */
function cleanFacets(f) {
  const out = {};
  if (!f || typeof f !== 'object') return out;
  for (const { key } of FACETS) {
    const v = score(f[key]);
    if (v) out[key] = v;
  }
  return out;
}

export function normaliseReview(r) {
  const facets = cleanFacets(r.facets);
  return {
    id: String(r.id || `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
    name: clean(r.name, 60),
    country: clean(r.country, 2).toUpperCase(),
    company: clean(r.company, 80),
    role: clean(r.role, 80),
    audience: r.audience === 'professional' || r.audience === 'consumer' ? r.audience : '',
    rating: r.rating == null || r.rating === '' ? 0 : Math.min(5, Math.max(1, Math.round(Number(r.rating)) || 5)), // 0 = no rating on record
    facets,
    text: clean(r.text, 600).replace(/\s{2,}/g, ' '),
    tags: Array.isArray(r.tags) ? r.tags.map((t) => clean(t, 30)).filter(Boolean).slice(0, 4) : [],
    date: r.date === '' ? '' : r.date || new Date().toISOString(),
    mine: !!r.mine
  };
}

export async function submitReview(input) {
  const review = normaliseReview({ ...input, mine: true });
  const res = await postJSON(ENV.API_REVIEWS_URL, {
    name: review.name,
    country: review.country,
    company: review.company,
    role: review.role,
    audience: review.audience,
    rating: review.rating,
    facets: review.facets,
    text: review.text,
    tags: review.tags,
    captchaToken: input.captchaToken || null,
    captchaProvider: input.captchaProvider || null,
    // Private: for verifying the reviewer. The backend must never return these in GET responses.
    contact: input.contact || null
  });
  // Show it to the author immediately either way; the server decides what everyone else sees.
  const mine = store.get(LOCAL_KEY, []);
  store.set(LOCAL_KEY, [review, ...mine].slice(0, 10));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: review }));
  const ch = getChannel();
  if (ch) ch.postMessage(review);
  return { ...res, review };
}

export function getMyReviews() {
  return store.get(LOCAL_KEY, []).map(normaliseReview);
}

export async function fetchApprovedReviews() {
  if (ENV.DEMO_MODE) return [];
  const data = await getJSON(ENV.API_REVIEWS_URL);
  const list = Array.isArray(data) ? data : data && Array.isArray(data.reviews) ? data.reviews : [];
  return list.map(normaliseReview).filter((r) => r.text && r.name);
}

/** Subscribe to new reviews (this tab + other tabs). Returns unsubscribe. */
export function onReview(cb) {
  getChannel();
  const h = (e) => cb(normaliseReview(e.detail));
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

export function seedTestimonials() {
  return TESTIMONIALS.map(normaliseReview);
}

/* ------------------------------------------------------------------------------------------
   Aggregates — used by the reviews page, the testimonial header and the footer badge.
   ------------------------------------------------------------------------------------------ */

/** { avg, count, dist[5..1], facets{key:avg}, byAudience{consumer,professional} } */
export function summarise(list) {
  const rated = list.filter((r) => r.rating > 0);
  const count = rated.length;
  const avg = count ? rated.reduce((a, r) => a + r.rating, 0) / count : 0;
  const dist = [5, 4, 3, 2, 1].map((s) => rated.filter((r) => r.rating === s).length);

  const facets = {};
  for (const f of FACETS) {
    const vals = list.map((r) => (r.facets || {})[f.key]).filter((n) => n > 0);
    facets[f.key] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  }

  const forAudience = (k) => {
    const sub = rated.filter((r) => r.audience === k || (!r.audience && k === 'consumer'));
    return { count: sub.length, avg: sub.length ? sub.reduce((a, r) => a + r.rating, 0) / sub.length : 0 };
  };

  return {
    avg,
    count,
    dist,
    facets,
    byAudience: { consumer: forAudience('consumer'), professional: forAudience('professional') },
    countries: new Set(list.map((r) => r.country).filter(Boolean)).size
  };
}

export { facetAverage };
