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
import { ENV } from "../config/env.js";
import { api } from "./api.js";
import { store } from "./storage.js";
import { TESTIMONIALS } from "../data/testimonials.js";
import { FACETS, facetAverage } from "../data/reviewFacets.js";

const LOCAL_KEY = "t2o_my_reviews_v1";
const EVENT = "t2o:review";
let channel = null;

function getChannel() {
  if (
    channel ||
    typeof window === "undefined" ||
    !("BroadcastChannel" in window)
  )
    return channel;
  channel = new BroadcastChannel("t2o-reviews");
  channel.onmessage = (e) =>
    window.dispatchEvent(new CustomEvent(EVENT, { detail: e.data }));
  return channel;
}

const clean = (s, max) =>
  String(s || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
const score = (n) => {
  const v = Math.round(Number(n));
  return v >= 1 && v <= 5 ? v : 0;
};

/** Keep only the known facet keys, each 0 (unset) or 1–5. */
function cleanFacets(f) {
  const out = {};
  // Backend array bhejta hai: [{ key, value }, ...] — object format bhi chalta rahega.
  if (Array.isArray(f)) {
    f = Object.fromEntries(f.map((x) => [x && x.key, x && x.value]));
  }
  if (!f || typeof f !== "object") return out;
  for (const { key } of FACETS) {
    const v = score(f[key]);
    if (v) out[key] = v;
  }
  return out;
}

/** Keep four detail ratings: [surveys, rewards, support, mobile]. */
function cleanDetailRating(values) {
  if (!Array.isArray(values)) return [];

  return values.slice(0, 4).map((value) => {
    if (value === null || value === undefined || value === "") return null;

    const n = Number(value);
    return Number.isFinite(n) && n >= 1 && n <= 5 ? n : null;
  });
}

export function normaliseReview(r) {
  const facets = cleanFacets(r.facets);
  return {
    id: String(
      r.id || `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ),
    name: clean(r.name, 60),
    country: clean(r.country, 2).toUpperCase(),
    company: clean(r.company, 80),
    role: clean(r.role, 80),
    audience:
      r.audience === "professional" || r.audience === "consumer" || r.audience === "teen"
        ? r.audience
        : "",
    rating:
      r.rating == null || r.rating === ""
        ? 0
        : Math.min(5, Math.max(1, Math.round(Number(r.rating)) || 5)),
    facets,
    detailrating: cleanDetailRating(r.detailrating),
    text: clean(r.text, 600).replace(/\s{2,}/g, " "),
    tags: Array.isArray(r.tags)
      ? r.tags
          .map((t) =>
            typeof t === "string"
              ? clean(t, 30)
              : clean(t?.label ?? t?.name ?? "", 30),
          )
          .filter(Boolean)
          .slice(0, 4)
      : [],
    date: r.date === "" ? "" : r.date || new Date().toISOString(),
    sample: !!r.sample,
    mine: !!r.mine,
  };
}

const mineKey = (userId) => (userId ? `${LOCAL_KEY}_${userId}` : LOCAL_KEY);

export async function submitReview(input) {
  const review = normaliseReview({ ...input, mine: true });
  // Identity (name/country/company/role/audience/contact) ab server ko nahi jaati —
  // backend logged-in user (token) se khud leta hai. Auth header/cookie postJSON/api.js se jaana chahiye.
  const payload = {
    rating: review.rating,
    facets: Object.entries(review.facets).map(([key, value]) => ({ key, value })),
    text: review.text,
    tags: review.tags,
    captchaToken: input.captchaToken || null,
    captchaProvider: input.captchaProvider || null,
  };
  let res;
  if (ENV.DEMO_MODE) {
    res = { ok: true, demo: true, data: { message: "Preview mode: nothing was sent." } };
  } else {
    try {
      const raw = await api.post('/api/v1/testimonial', payload);
      // api.post success par seedha body deta hai, fail par error-body (throw nahi karta).
      const failed = !raw || raw.success === false || !!raw.error;
      res = { ok: !failed, status: failed ? 400 : 200, data: raw };
    } catch {
      res = { ok: false, status: 0, data: null, error: "network" };
    }
  }
  // const res = await api.post(ENV.API_REVIEWS_URL, {
  //   rating: review.rating,
  //   facets: Object.entries(review.facets).map(([key, value]) => ({ key, value })),
  //   text: review.text,
  //   tags: review.tags,
  //   captchaToken: input.captchaToken || null,
  //   captchaProvider: input.captchaProvider || null,
  // });

  // Show it to the author immediately either way; the server decides what everyone else sees.
  
  const k = mineKey(input.userId);
  const mine = store.get(k, []);
  store.set(k, [review, ...mine].slice(0, 10));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: review }));
  const ch = getChannel();
  if (ch) ch.postMessage(review);
  return { ...res, review };
}

export function getMyReviews(userId) {
  return store.get(mineKey(userId), []).map(normaliseReview);
}

export async function fetchApprovedReviews() {
  if (ENV.DEMO_MODE) return [];
  const data = await api.get("/api/v1/testimonial");
  const list = Array.isArray(data)
    ? data
    : data && Array.isArray(data.reviews)
      ? data.reviews
      : [];
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
  // Sample (placeholder) reviews show on their own panel but never count towards the site-wide score.
  const allRated = list.filter((r) => r.rating > 0);
  const rated = allRated.filter((r) => !r.sample);
  const count = rated.length;
  const avg = count ? rated.reduce((a, r) => a + r.rating, 0) / count : 0;
  const dist = [5, 4, 3, 2, 1].map(
    (s) => rated.filter((r) => r.rating === s).length,
  );

  const facets = {};
  for (const f of FACETS) {
    const vals = list.map((r) => (r.facets || {})[f.key]).filter((n) => n > 0);
    facets[f.key] = vals.length
      ? vals.reduce((a, b) => a + b, 0) / vals.length
      : 0;
  }

  const forAudience = (k) => {
    const sub = allRated.filter(
      (r) => r.audience === k || (!r.audience && k === "consumer"),
    );
    return {
      count: sub.length,
      avg: sub.length ? sub.reduce((a, r) => a + r.rating, 0) / sub.length : 0,
    };
  };

  return {
    avg,
    count,
    dist,
    facets,
    byAudience: {
      consumer: forAudience("consumer"),
      professional: forAudience("professional"),
      teen: forAudience("teen"),
    },
    countries: new Set(list.filter((r) => !r.sample).map((r) => r.country).filter(Boolean)).size,
  };
}

export { facetAverage };