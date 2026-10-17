// Member reviews -> testimonials.
// 1. A review is POSTed to VITE_API_REVIEWS_URL (backend stores it, ideally with moderation).
// 2. The testimonials wall GETs approved reviews from the same URL and polls for new ones.
// 3. The visitor's own review appears instantly in their browser (and other open tabs via
//    BroadcastChannel) so they see it land in the testimonials straight away.
import { ENV } from '../config/env.js';
import { getJSON, postJSON } from './api.js';
import { store } from './storage.js';
import { TESTIMONIALS } from '../data/testimonials.js';

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

export function normaliseReview(r) {
  return {
    id: String(r.id || `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
    name: clean(r.name, 60),
    country: clean(r.country, 2).toUpperCase(),
    company: clean(r.company, 80),
    role: clean(r.role, 80),
    audience: r.audience === 'professional' || r.audience === 'consumer' ? r.audience : '',
    rating: r.rating == null || r.rating === '' ? 0 : Math.min(5, Math.max(1, Math.round(Number(r.rating)) || 5)), // 0 = no star rating on record
    text: clean(r.text, 600),
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
    text: review.text,
    tags: review.tags,
    captchaToken: input.captchaToken || null,
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
