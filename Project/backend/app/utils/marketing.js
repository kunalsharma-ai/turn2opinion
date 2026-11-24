// Marketing e-mail consent ("News and offers"), ported from kunalsharma-ai/MFR#54.
// Kunal's decision (24 Nov 2026): an explicit opt-in, stored with a timestamp. Nothing is ticked by default and nothing
// opts existing members in. On T2O the box is the consent kit's "marketing" id, saved in User.terms through
// PUT /api/v1/me; every change of that id is recorded here as User.marketingOptIn (+ history). Teens can't opt in;
// withdrawing always works. MADP reads User.marketingOptIn (changes feed) as the `email_marketing` consent purpose.
import mongoose from "mongoose";
import User from "../model/User.js";

export const WORDING = "news-offers-v1"; // "News and offers" / "Send me news and offers"
export const SOURCES = ["signup", "profile", "admin"];
const HISTORY_MAX = 50;

export class MarketingError extends Error {
    constructor(code, message, status = 400) { super(message); this.code = code; this.status = status; }
}
export const isTeen = (u) => String(u?.category || "").toLowerCase().includes("minor");

/** The member's state as shown to them and to MADP. Unset means never asked, which counts as no. */
export function view(u) {
    const m = u?.marketingOptIn;
    if (!m || typeof m.granted !== "boolean") return { granted: false, at: null, source: null, asked: false };
    return { granted: m.granted, at: m.at || null, source: m.source || null, asked: true };
}

/** The fields to $set for a change. `granted` must be a real boolean: anything else is refused. */
export function change(granted, source, by = "member", now = new Date()) {
    if (typeof granted !== "boolean") throw new MarketingError("bad_request", "optIn must be true or false.");
    if (!SOURCES.includes(source)) throw new MarketingError("bad_request", "Unknown source.");
    const entry = { granted, at: now, source, wording: WORDING };
    return { entry, history: { ...entry, by: String(by).slice(0, 80) } };
}

/** Record a change for one member. Refuses a teen opting in; a withdrawal always goes through. */
export async function setOptIn(userOrId, origin, granted, source, by, model = User) {
    const id = String(userOrId?._id || userOrId || "");
    if (!mongoose.isValidObjectId(id)) throw new MarketingError("bad_request", "Bad member id.");
    const u = await model.findOne({ _id: new mongoose.Types.ObjectId(id), origin }).select("category").lean();
    if (!u) throw new MarketingError("not_found", "No such member.", 404);
    if (granted === true && isTeen(u)) throw new MarketingError("teen_not_allowed", "Teen Panel members can't sign up for marketing e-mails.", 403);
    const { entry, history } = change(granted, source, by);
    const updated = await model.findOneAndUpdate(
        { _id: u._id, origin },
        { $set: { marketingOptIn: entry }, $push: { marketingOptInHistory: { $each: [history], $slice: -HISTORY_MAX } } },
        { new: true }
    ).select("marketingOptIn").lean();
    return view(updated);
}

/** Whether "marketing" was added or removed between two terms lists: true, false, or null for no change. */
export function termsChange(before = [], after = []) {
    const had = Array.isArray(before) && before.includes("marketing");
    const has = Array.isArray(after) && after.includes("marketing");
    return had === has ? null : has;
}

/** Call with the terms before and after a save: a change of the "marketing" id is recorded with a timestamp. */
export async function syncFromTerms(userId, origin, before = [], after = [], source = "profile") {
    const next = termsChange(before, after);
    if (next === null) return null;
    return setOptIn(userId, origin, next, source, "member");
}
export const stripForTeen = (user, terms) => (Array.isArray(terms) && isTeen(user) ? terms.filter((t) => t !== "marketing") : terms);
/** Fields a member or admin may never write through the generic updates: they change only through setOptIn. */
export const PROTECTED = ["marketingOptIn", "marketingOptInHistory"];
