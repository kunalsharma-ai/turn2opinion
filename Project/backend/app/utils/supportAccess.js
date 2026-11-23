// Access rules and mail recipients for support tickets (/api/v1/support).
// Pure helpers with no database imports, so they can be unit tested directly.

// Roles that may see and answer every ticket. Matches User.listTeamMembers()
// plus "administrator", which the User model also allows.
export const STAFF_ROLES = ["superadmin", "root", "admin", "administrator", "agent"];

const lower = value => String(value ?? "").trim().toLowerCase();

export function isStaff(role) {
    return STAFF_ROLES.includes(lower(role));
}

// Loads the caller's role (it is select:false on the User model, so req.user
// never carries it) and returns { id, email, staff }.
export async function resolveCaller(req, loadUser) {
    const user = req.user || {};
    let role = user.role;
    let email = user.mail;
    if (role === undefined && user._id && loadUser) {
        const full = await loadUser(user._id);
        role = full?.role;
        email = email ?? full?.mail;
    }
    return { id: user._id, email: lower(email), staff: isStaff(role) };
}

// Mongo filter for listing tickets. Staff keep the filter they sent; members
// only ever get their own tickets, whatever they send. Operator keys ($where,
// $or, ...) and object values are dropped for members so the email filter
// cannot be widened.
export function ticketListFilter(caller, body = {}) {
    const query = body && typeof body === "object" && !Array.isArray(body) ? body : {};
    if (caller.staff) return { ...query };
    const safe = {};
    for (const [key, value] of Object.entries(query)) {
        if (key.startsWith("$")) continue;
        if (key === "issueRaisedBy" || key.startsWith("issueRaisedBy.")) continue;
        if (value !== null && typeof value === "object") continue;
        safe[key] = value;
    }
    return { ...safe, "issueRaisedBy.email": caller.email || "\u0000no-email" };
}

export function canAccessTicket(caller, ticket) {
    if (!ticket) return false;
    if (caller.staff) return true;
    const owner = lower(ticket.issueRaisedBy?.email);
    return owner !== "" && owner === caller.email;
}

// Throws the same error for "missing" and "not yours", so members cannot
// probe which ticket ids exist.
export function assertTicketAccess(caller, ticket) {
    if (!canAccessTicket(caller, ticket)) throw new Error("Ticket not found");
    return ticket;
}

// Only staff may raise a ticket on behalf of another member (body.user).
export function mayRaiseForOthers(caller, body = {}) {
    return Boolean(caller.staff && body && "user" in body && body.user);
}

// SUPPORT_TEAM_EMAIL: one or more addresses, comma or semicolon separated.
// Returns [] when unset, which means "fall back to the team member list".
export function supportTeamAddresses(value = process.env.SUPPORT_TEAM_EMAIL) {
    return String(value ?? "")
        .split(/[,;]/)
        .map(x => x.trim())
        .filter(x => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x));
}

// Where the team copy of a ticket email goes: the configured support address
// when set, otherwise every team member (the behaviour before this change).
export function teamRecipients(teamMembers = [], value = process.env.SUPPORT_TEAM_EMAIL) {
    const configured = supportTeamAddresses(value);
    if (configured.length) return configured;
    return [...new Set((teamMembers || []).map(m => m?.mail).filter(Boolean))];
}
