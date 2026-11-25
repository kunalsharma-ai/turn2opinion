// Profile completion rewards (Round 23).
//
// Each Profile already carries `points` (default 50) but nothing ever credited them. When a member's
// profile reaches 100% (same count as ProfileController.status()), one Rewards document is written:
//   { user, origin, category: "profile", remarks: <profile slug>, points, status: "credited" }
// The write is an upsert keyed on (user, origin, category, remarks) with $setOnInsert, backed by a
// unique index on the Rewards model, so saving a finished profile again, two tabs saving at once or a
// later edit never credits the same profile twice. Points are only added, never taken back.
//
// Pure helpers take their data and writers as arguments so they can be unit tested without a database.

export const PROFILE_REWARD = "profile";
// Each finished profile also adds this much to the member's quality score (issue #40; the member area and Help
// centre promise "+50 points and +1 quality score" per profile). It is added only together with a NEW reward row,
// so it is just as idempotent, and never above the segment's quality scale.
export const QUALITY_PER_PROFILE = 1;

/** Profiles at 100% that have no reward yet. */
export function profilesToCredit(profiles = [], status = {}, creditedSlugs = []) {
    const done = new Set(creditedSlugs.map(String));
    return profiles
        .filter((p) => p && p.slug && !done.has(String(p.slug)))
        .filter((p) => Number(status?.[p.slug]) >= 100)
        .map((p) => ({ slug: String(p.slug), name: p.name || p.slug, points: Math.max(0, Math.round(Number(p.points ?? 50) || 0)) }))
        .filter((p) => p.points > 0);
}

/** The Rewards upsert for one profile: only inserts, never changes an existing credit. */
export function rewardUpsert({ user, origin, slug, name, points }) {
    const filter = { user, origin, category: PROFILE_REWARD, remarks: slug };
    return {
        filter,
        update: { $setOnInsert: { ...filter, points, status: "credited", title: name } },
        options: { upsert: true }
    };
}

/** A duplicate-key error from the unique index means another request credited it first: not an error. */
export const isDuplicate = (e) => e && (e.code === 11000 || /E11000|duplicate key/i.test(String(e.message || "")));

/**
 * Credit every newly completed profile once.
 * deps: { profiles(), status(), credited() -> [slug], upsert(filter, update, options) -> { upsertedCount } }
 * Returns the profiles credited by THIS call (empty when nothing new was finished).
 */
export async function creditCompletedProfiles({ user, origin }, deps) {
    if (!user) return [];
    const [profiles, status, credited] = await Promise.all([deps.profiles(), deps.status(), deps.credited()]);
    const due = profilesToCredit(profiles, status, credited);
    const out = [];
    for (const p of due) {
        const { filter, update, options } = rewardUpsert({ user, origin, ...p });
        try {
            const r = await deps.upsert(filter, update, options);
            const inserted = r ? (r.upsertedCount ?? (r.upserted ? 1 : 0)) > 0 : false;
            if (inserted) out.push(p);
        } catch (e) {
            if (!isDuplicate(e)) throw e;
        }
    }
    if (out.length && deps.addQuality) {
        try {
            await deps.addQuality(out.length * QUALITY_PER_PROFILE);
            out.forEach((p) => (p.quality = QUALITY_PER_PROFILE));
        } catch (e) {
            console.error("profile quality score update failed", e); // the points stay credited
        }
    }
    return out;
}

/**
 * The atomic updates that add `add` to a member's quality score without passing the segment's scale:
 * a member without a score starts at the model default (100), then $inc, then anything above the scale is cut back.
 * Atomic, so two saves finishing different profiles at the same moment both count.
 */
export function qualityUpdates(who, add, scale = 200) {
    const cap = Number(scale) > 0 ? Number(scale) : 200;
    return [
        { filter: { ...who, qualityScore: { $exists: false } }, update: { $set: { qualityScore: 100 } } },
        { filter: { ...who }, update: { $inc: { qualityScore: Number(add) || 0 } } },
        { filter: { ...who, qualityScore: { $gt: cap } }, update: { $set: { qualityScore: cap } } }
    ];
}

/** Sum of credited reward points (profile rewards and any other credited Rewards rows). */
export function sumCredited(rows = []) {
    return rows.filter((r) => r && (r.status || "credited") === "credited").reduce((a, r) => a + (Number(r.points) || 0), 0);
}
