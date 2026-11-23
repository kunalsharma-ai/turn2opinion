// Unit tests for the member-data access rules (T2O-SEC-03 lock-down).
// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { isAdminRole, memberListQuery, checkQuery, userUpdate, safeFilter, REFERRAL_FIELDS } from "../app/utils/memberAccess.js";

test("only admin roles count as admin", () => {
    for (const r of ["admin", "Administrator", "superadmin", "root"]) assert.equal(isAdminRole(r), true, r);
    for (const r of ["respondent", "agent", "", undefined, null]) assert.equal(isAdminRole(r), false, String(r));
});

test("a member can list only their own referrals, whatever filter they send", () => {
    assert.deepEqual(memberListQuery({ referredBy: "me" }, "me"), { kind: "referrals", filter: { referredBy: "me" }, fields: REFERRAL_FIELDS });
    assert.deepEqual(memberListQuery({ referredBy: "someone-else" }, "me").filter, { referredBy: "me" });
    assert.deepEqual(memberListQuery({}, "me").filter, { referredBy: "me" });
    assert.deepEqual(memberListQuery({ category: "minor" }, "me").filter, { referredBy: "me" });
    assert.deepEqual(memberListQuery({ $where: "1" }, "me").filter, { referredBy: "me" });
    assert.deepEqual(memberListQuery(null, "me").filter, { referredBy: "me" });
});

test("the settings page can still ask whether an e-mail is taken, and nothing more", () => {
    assert.deepEqual(memberListQuery({ mail: " A@B.com " }, "me"), { kind: "mail-taken", filter: { mail: "a@b.com" } });
    assert.equal(memberListQuery({ mail: { $ne: "" } }, "me").kind, "referrals");
    assert.equal(memberListQuery({ mail: "a@b.com", category: "b2c" }, "me").kind, "referrals");
});

test("the public check takes only an e-mail or phone string", () => {
    assert.deepEqual(checkQuery({ mail: "X@y.com" }), { mail: "x@y.com" });
    assert.deepEqual(checkQuery({ phone: "+911234567890" }), { phone: "+911234567890" });
    assert.equal(checkQuery({ mail: { $ne: null } }), null);
    assert.equal(checkQuery({ role: "root" }), null);
    assert.equal(checkQuery({}), null);
});

test("a member updates only their own editable fields; an admin cannot set role, password or origin", () => {
    const body = { terms: ["t"], role: "root", password: "x", isVerified: { email: "verified" }, category: "b2b", "parent.consent": true, $set: {} };
    assert.deepEqual(userUpdate(body, { isAdmin: false }), { terms: ["t"] });
    const admin = userUpdate(body, { isAdmin: true });
    assert.equal("role" in admin, false);
    assert.equal("password" in admin, false);
    assert.equal("$set" in admin, false);
    assert.equal("parent.consent" in admin, false);
    assert.deepEqual(admin.category, "b2b");
});

test("admin filters keep their shape but lose code-running operators", () => {
    assert.deepEqual(safeFilter({ category: "b2c", $where: "sleep(1)", $or: [{ a: 1 }, { $expr: {} }] }), { category: "b2c", $or: [{ a: 1 }, {}] });
    assert.deepEqual(safeFilter("x"), {});
});
