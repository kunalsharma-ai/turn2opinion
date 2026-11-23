// Unit tests for the support ticket access rules and mail recipients.
// Run: npm test   (node's built-in test runner, no extra packages)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
    isStaff,
    resolveCaller,
    ticketListFilter,
    canAccessTicket,
    assertTicketAccess,
    mayRaiseForOthers,
    supportTeamAddresses,
    teamRecipients
} from "../app/utils/supportAccess.js";

const member = { id: "u1", email: "asha@example.com", staff: false };
const staff = { id: "a1", email: "help@example.com", staff: true };

test("staff roles", () => {
    for (const r of ["admin", "superadmin", "root", "administrator", "agent", "ADMIN"]) assert.equal(isStaff(r), true, r);
    for (const r of ["respondent", "", undefined, null, "teen"]) assert.equal(isStaff(r), false, String(r));
});

test("resolveCaller loads the hidden role and lowercases the email", async () => {
    const req = { user: { _id: "u1", mail: "Asha@Example.com" } };
    const who = await resolveCaller(req, async () => ({ role: "respondent" }));
    assert.deepEqual(who, { id: "u1", email: "asha@example.com", staff: false });
    const boss = await resolveCaller({ user: { _id: "a1", mail: "x@y.com" } }, async () => ({ role: "admin" }));
    assert.equal(boss.staff, true);
    const noUser = await resolveCaller({}, async () => ({ role: "admin" }));
    assert.equal(noUser.staff, false);
});

test("members only list their own tickets, whatever they send", () => {
    assert.deepEqual(ticketListFilter(member, {}), { "issueRaisedBy.email": "asha@example.com" });
    assert.deepEqual(
        ticketListFilter(member, { "issueRaisedBy.email": "someone-else@example.com" }),
        { "issueRaisedBy.email": "asha@example.com" }
    );
    assert.deepEqual(
        ticketListFilter(member, { $or: [{}], status: "open", "issueRaisedBy.email": { $ne: "" }, issueRaisedBy: { email: "z@z.com" }, ticketNo: { $gt: "" } }),
        { status: "open", "issueRaisedBy.email": "asha@example.com" }
    );
    // a member with no email on record matches nothing rather than everything
    assert.notEqual(ticketListFilter({ ...member, email: "" }, {})["issueRaisedBy.email"], "");
});

test("staff keep their filters (admin support page)", () => {
    assert.deepEqual(ticketListFilter(staff, {}), {});
    assert.deepEqual(ticketListFilter(staff, { status: "open" }), { status: "open" });
    assert.deepEqual(ticketListFilter(staff, { "issueRaisedBy.email": "asha@example.com" }), { "issueRaisedBy.email": "asha@example.com" });
});

test("reading a ticket: owner and staff yes, anyone else no", () => {
    const mine = { issueRaisedBy: { email: "ASHA@example.com" } };
    const theirs = { issueRaisedBy: { email: "ravi@example.com" } };
    assert.equal(canAccessTicket(member, mine), true);
    assert.equal(canAccessTicket(member, theirs), false);
    assert.equal(canAccessTicket(member, { issueRaisedBy: {} }), false);
    assert.equal(canAccessTicket(member, null), false);
    assert.equal(canAccessTicket(staff, theirs), true);
    assert.throws(() => assertTicketAccess(member, theirs), /Ticket not found/);
    assert.throws(() => assertTicketAccess(member, null), /Ticket not found/);
    assert.equal(assertTicketAccess(member, mine), mine);
});

test("only staff can raise a ticket for someone else", () => {
    assert.equal(mayRaiseForOthers(member, { user: "ravi@example.com" }), false);
    assert.equal(mayRaiseForOthers(staff, { user: "ravi@example.com" }), true);
    assert.equal(mayRaiseForOthers(staff, {}), false);
});

test("team copy goes to SUPPORT_TEAM_EMAIL when set", () => {
    const team = [{ mail: "a@t2o.com" }, { mail: "b@t2o.com" }, { mail: "a@t2o.com" }, {}];
    assert.deepEqual(teamRecipients(team, "support@turn2opinion.com"), ["support@turn2opinion.com"]);
    assert.deepEqual(teamRecipients(team, " one@x.com, two@x.com;bad "), ["one@x.com", "two@x.com"]);
    assert.deepEqual(supportTeamAddresses("not-an-email"), []);
});

test("team copy falls back to every team member when unset", () => {
    const team = [{ mail: "a@t2o.com" }, { mail: "b@t2o.com" }, { mail: "a@t2o.com" }, {}];
    assert.deepEqual(teamRecipients(team, undefined), ["a@t2o.com", "b@t2o.com"]);
    assert.deepEqual(teamRecipients(team, ""), ["a@t2o.com", "b@t2o.com"]);
    assert.deepEqual(teamRecipients(team, "not-an-email"), ["a@t2o.com", "b@t2o.com"]);
});
