// Changed-since feeds for MADP (and any other admin integration). Pure helpers with no database imports, so they
// can be unit tested directly. The routes that use them are in ../routes/api/Changes.js.
//
// Every feed is ordered by (updatedAt, _id) and paged with an opaque cursor that holds the last record's position,
// so a reader that stores the cursor gets each change exactly once, in order, and never misses a record that two
// pages share the same updatedAt. Records written in the last SETTLE_MS are held back for the next call, so a write
// still in flight when a page is read cannot land behind the cursor.

export const SETTLE_MS = 5_000;
export const MAX_LIMIT = { members: 500, answers: 1000, deletions: 1000, rewards: 1000, responses: 1000 };
const DEFAULT_LIMIT = 200;

// Member fields a feed reader gets. The guardian's own details (name, e-mail, phone, date of birth, IP address and
// onboarding answers) are never included: only the status of their consent. The role is read only to set isStaff
// (admin and integration accounts), and is not sent.
export const MEMBER_FIELDS = [
    "_id", "respondentID", "category", "mail", "phone", "name.first", "name.last", "gender", "dob", "timezone",
    "address.country", "address.state", "address.city", "isVerified", "qualityScore", "isActive", "isDeleted",
    "createdAt", "updatedAt", "consent", "terms",
    "parent.consent", "parent.consentStatus", "parent.consentAt", "parent.consentVersion", "parent.decision",
    "parent.decisionAt"
];
export const memberProjection = () => `${MEMBER_FIELDS.join(" ")} +role`;

// Profile questions whose answers are contact details or direct identifiers. They are already on the member
// record, so the answers feed leaves them out rather than handing out a second, unprotected copy.
export const IDENTIFIER_QUESTIONS = [
    "firstname", "lastname", "fullname", "mail", "alternate-email", "workemail", "phone", "alternate-phone",
    "phone1", "add-whatsapp", "dob", "zipcode"
];
export const isIdentifierQuestion = (name) => IDENTIFIER_QUESTIONS.includes(name) || /^add-phone\d*$/.test(String(name));

export const TOMBSTONE_KINDS = ["member", "answers"];

export function clampLimit(value, feed) {
    const max = MAX_LIMIT[feed] ?? DEFAULT_LIMIT;
    const n = Number.parseInt(value, 10);
    if (!Number.isFinite(n) || n < 1) return Math.min(DEFAULT_LIMIT, max);
    return Math.min(n, max);
}

const HEX24 = /^[0-9a-f]{24}$/i;

export function encodeCursor(updatedAt, id) {
    const t = new Date(updatedAt);
    if (Number.isNaN(t.getTime())) throw new Error("Invalid cursor time");
    return Buffer.from(JSON.stringify([t.toISOString(), String(id)])).toString("base64url");
}

// Returns { at: Date, id: string } or throws a message fit for a 400 answer.
export function decodeCursor(cursor) {
    let parsed;
    try {
        parsed = JSON.parse(Buffer.from(String(cursor), "base64url").toString("utf8"));
    } catch (e) {
        throw new Error("Invalid cursor");
    }
    if (!Array.isArray(parsed) || parsed.length !== 2) throw new Error("Invalid cursor");
    const at = new Date(parsed[0]);
    if (Number.isNaN(at.getTime()) || !HEX24.test(String(parsed[1]))) throw new Error("Invalid cursor");
    return { at, id: String(parsed[1]) };
}

/**
 * The Mongo filter for one page. `toId` turns the cursor's id string into the stored _id type (ObjectId).
 *   cursor - continue after this position (wins over since)
 *   since  - ISO time to start from when there is no cursor (records updated at or after it)
 */
export function pageFilter({ origin, cursor, since, now = new Date(), toId = (x) => x }) {
    if (!origin) throw new Error("Missing tenant");
    const until = new Date(now.getTime() - SETTLE_MS);
    const filter = { origin, updatedAt: { $lte: until } };
    if (cursor) {
        const c = decodeCursor(cursor);
        filter.$or = [{ updatedAt: { $gt: c.at } }, { updatedAt: c.at, _id: { $gt: toId(c.id) } }];
    } else if (since) {
        const s = new Date(since);
        if (Number.isNaN(s.getTime())) throw new Error("Invalid since");
        filter.updatedAt.$gte = s;
    }
    return filter;
}

export const PAGE_SORT = { updatedAt: 1, _id: 1 };

/**
 * The answer for a page of documents read with limit + 1: `more` says whether another page is ready now, and
 * `cursor` is where the next call continues (the incoming cursor again when nothing new was found).
 */
export function pageOf(docs, limit, incomingCursor, map = (d) => d) {
    const more = docs.length > limit;
    const items = more ? docs.slice(0, limit) : docs;
    const last = items[items.length - 1];
    return {
        items: items.map(map),
        cursor: last ? encodeCursor(last.updatedAt, last._id) : (incomingCursor || null),
        more
    };
}

// A member record as the feed hands it out: only MEMBER_FIELDS, whatever the query returned.
const STAFF_ROLES = ["administrator", "admin", "superadmin", "root"];

export function toMember(u = {}) {
    const p = u.parent || {};
    const out = {
        _id: String(u._id),
        respondentID: u.respondentID,
        category: u.category,
        mail: u.mail,
        phone: u.phone,
        name: u.name ? { first: u.name.first, last: u.name.last } : undefined,
        gender: u.gender,
        dob: u.dob,
        timezone: u.timezone,
        address: Array.isArray(u.address) ? u.address.map((a) => ({ country: a?.country, state: a?.state, city: a?.city })) : [],
        isVerified: u.isVerified,
        qualityScore: u.qualityScore,
        isActive: u.isActive !== false,
        isDeleted: u.isDeleted === true,
        isStaff: STAFF_ROLES.includes(String(u.role ?? "").trim().toLowerCase()),
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        consent: u.consent,
        terms: u.terms,
        parent: {
            consent: p.consent ?? null,
            consentStatus: p.consentStatus,
            consentAt: p.consentAt,
            consentVersion: p.consentVersion,
            decision: p.decision,
            decisionAt: p.decisionAt
        }
    };
    return out;
}

export function toAnswer(a = {}) {
    return {
        _id: String(a._id),
        user: String(a.user),
        question: a.question,
        answer: Array.isArray(a.answer) ? a.answer.map(String) : a.answer == null ? [] : [String(a.answer)],
        updatedAt: a.updatedAt
    };
}

export function toTombstone(t = {}) {
    return { _id: String(t._id), kind: t.kind, user: String(t.user), at: t.updatedAt };
}

// Reward rows as the feed hands them out. `remarks` is free text written by admins, so it is left out, except for
// profile-completion credits, where it is the profile slug (see utils/profileRewards.js).
export const REWARD_FIELDS = "user category points title status remarks createdAt updatedAt";

export function toReward(r = {}) {
    return {
        _id: String(r._id),
        user: String(r.user),
        category: r.category,
        points: Number(r.points) || 0,
        title: r.title ?? null,
        status: r.status || "credited",
        profile: r.category === "profile" ? (r.remarks ?? null) : null,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
    };
}

// Survey responses: who took which survey, the outcome and the points it carries. Telemetry, review notes and
// ratings are left out.
export const RESPONSE_FIELDS = "user survey.slug status points loi source timeline.start timeline.end createdAt updatedAt +isDeleted";

export function toResponse(r = {}) {
    return {
        _id: String(r._id),
        user: String(r.user),
        survey: r.survey?.slug ?? null,
        status: r.status || "invited",
        points: Number(r.points) || 0,
        loi: Number(r.loi) || 0,
        source: r.source ?? null,
        startedAt: r.timeline?.start ?? null,
        endedAt: r.timeline?.end ?? null,
        isDeleted: r.isDeleted === true,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
    };
}
