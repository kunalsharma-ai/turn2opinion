// Who may read or change member records (T2O-SEC-03 lock-down, Nov 2026; same rules as MFR's utils/access.js).
// Pure helpers with no database imports, so they can be unit tested directly. The Express middleware that uses
// them is in ./access.js.

export const ADMIN_ROLES = ["administrator", "admin", "superadmin", "root"];
export const isAdminRole = (role) => ADMIN_ROLES.includes(String(role ?? "").trim().toLowerCase());

// Fields a member may change on their own record (PUT /api/v1/user/:id by the member themselves).
// Everything else (role, category, verification, quality score, password, e-mail, date of birth, Teen and
// guardian data) is changed only by an admin or by its own dedicated flow.
export const SELF_EDITABLE = ["terms", "notification", "consent", "socials", "profilePicture", "timezone", "paymentMethod"];
// Fields an admin may never set through the generic update (they have their own flows).
export const ADMIN_BLOCKED = ["password", "_id", "origin", "role", "createdAt", "updatedAt"];
// What a member sees about the people who joined with their referral link.
export const REFERRAL_FIELDS = "mail name isVerified createdAt";

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

export function pick(obj = {}, keys = []) {
    const out = {};
    if (!isPlainObject(obj)) return out;
    for (const k of keys) if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
    return out;
}

export function omit(obj = {}, keys = []) {
    const out = isPlainObject(obj) ? { ...obj } : {};
    for (const k of keys) delete out[k];
    // no Mongo operators or dotted paths from the browser
    for (const k of Object.keys(out)) if (k.startsWith("$") || k.includes(".")) delete out[k];
    return out;
}

// A Mongo filter from an admin's browser: drops operators that run code or reach other collections.
export function safeFilter(f = {}) {
    const bad = new Set(["$where", "$function", "$accumulator", "$expr", "$lookup"]);
    const walk = (v) => {
        if (Array.isArray(v)) return v.map(walk);
        if (isPlainObject(v)) {
            const o = {};
            for (const [k, x] of Object.entries(v)) if (!bad.has(k)) o[k] = walk(x);
            return o;
        }
        return v;
    };
    return isPlainObject(f) ? walk(f) : {};
}

/**
 * POST /api/v1/user for a member who is not an admin. The member area uses it for two things only:
 *   - the referrals page, { referredBy: <me> }: the member gets their own referrals, with REFERRAL_FIELDS;
 *   - the settings page, { mail: "<address>" }: whether an address is already taken (the same answer the public
 *     POST /user/check gives), as at most one bare record with no fields.
 * Anything else falls back to the member's own referrals, so a member can never list other members.
 */
export function memberListQuery(body, meId) {
    const b = isPlainObject(body) ? body : {};
    const keys = Object.keys(b);
    if (keys.length === 1 && keys[0] === "mail" && typeof b.mail === "string")
        return { kind: "mail-taken", filter: { mail: b.mail.trim().toLowerCase() } };
    return { kind: "referrals", filter: { referredBy: String(meId) }, fields: REFERRAL_FIELDS };
}

/** POST /api/v1/user/check is public: it may only ask whether an e-mail or phone number is in use. */
export function checkQuery(body) {
    const b = isPlainObject(body) ? body : {};
    const out = {};
    if (typeof b.mail === "string" && b.mail.trim()) out.mail = b.mail.trim().toLowerCase();
    if (typeof b.phone === "string" && b.phone.trim()) out.phone = b.phone.trim();
    return Object.keys(out).length ? out : null;
}

/** What PUT /api/v1/user/:id may write: a member only SELF_EDITABLE fields, an admin anything but ADMIN_BLOCKED. */
export function userUpdate(body, { isAdmin }) {
    return isAdmin ? omit(body, ADMIN_BLOCKED) : omit(pick(body, SELF_EDITABLE), []);
}
