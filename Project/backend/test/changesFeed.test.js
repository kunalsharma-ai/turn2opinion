// Unit tests for the changed-since feed helpers (routes/api/Changes.js). Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import {
    SETTLE_MS, clampLimit, decodeCursor, encodeCursor, isIdentifierQuestion, pageFilter, pageOf, toAnswer, toMember,
    memberProjection
} from "../app/utils/changesFeed.js";

const ID = "65a1b2c3d4e5f60718293a4b";

test("a cursor round-trips and rejects anything else", () => {
    const c = encodeCursor("2026-11-23T10:00:00.000Z", ID);
    assert.deepEqual(decodeCursor(c), { at: new Date("2026-11-23T10:00:00.000Z"), id: ID });
    for (const bad of ["", "abc", Buffer.from("[1]").toString("base64url"),
        Buffer.from(JSON.stringify(["nope", ID])).toString("base64url"),
        Buffer.from(JSON.stringify(["2026-11-23T10:00:00Z", "{$gt:''}"])).toString("base64url")])
        assert.throws(() => decodeCursor(bad), /Invalid cursor/);
});

test("a page continues after the cursor, including records that share its time", () => {
    const now = new Date("2026-11-23T12:00:00Z");
    const f = pageFilter({ origin: "t2o.example", cursor: encodeCursor("2026-11-23T10:00:00Z", ID), now });
    assert.equal(f.origin, "t2o.example");
    assert.deepEqual(f.updatedAt, { $lte: new Date(now.getTime() - SETTLE_MS) });
    assert.deepEqual(f.$or, [
        { updatedAt: { $gt: new Date("2026-11-23T10:00:00Z") } },
        { updatedAt: new Date("2026-11-23T10:00:00Z"), _id: { $gt: ID } }
    ]);
});

test("without a cursor, since sets the start; without either the whole history is read", () => {
    const now = new Date("2026-11-23T12:00:00Z");
    assert.deepEqual(pageFilter({ origin: "o", since: "2026-11-01T00:00:00Z", now }).updatedAt.$gte, new Date("2026-11-01T00:00:00Z"));
    const all = pageFilter({ origin: "o", now });
    assert.equal(all.$or, undefined);
    assert.equal(all.updatedAt.$gte, undefined);
    assert.throws(() => pageFilter({ origin: "o", since: "yesterday", now }), /Invalid since/);
    assert.throws(() => pageFilter({ origin: "", now }), /Missing tenant/);
});

test("limits are clamped per feed", () => {
    assert.equal(clampLimit(undefined, "members"), 200);
    assert.equal(clampLimit("0", "members"), 200);
    assert.equal(clampLimit("10000", "members"), 500);
    assert.equal(clampLimit("10000", "answers"), 1000);
    assert.equal(clampLimit("50", "deletions"), 50);
});

test("pageOf reads limit + 1 to know whether there is more, and keeps the cursor when nothing is new", () => {
    const docs = [1, 2, 3].map((i) => ({ _id: ID.slice(0, 23) + i, updatedAt: new Date(`2026-11-23T10:0${i}:00Z`) }));
    const p = pageOf(docs, 2, null);
    assert.equal(p.items.length, 2);
    assert.equal(p.more, true);
    assert.deepEqual(decodeCursor(p.cursor), { at: docs[1].updatedAt, id: docs[1]._id });
    assert.deepEqual(pageOf([], 2, "keep-me"), { items: [], cursor: "keep-me", more: false });
    assert.deepEqual(pageOf([], 2, undefined), { items: [], cursor: null, more: false });
});

test("a member record never carries the guardian's details, password or role", () => {
    const m = toMember({
        _id: ID, mail: "teen@x.test", category: "minor", password: "hash", role: "admin", isDeleted: true,
        name: { first: "A", last: "B", middle: "C" },
        address: [{ country: "in", state: "MH", city: "Pune", street: "1 Road", zip: "411001" }],
        parent: {
            email: "guardian@x.test", name: { first: "G" }, phone: "+91", dob: "1980-01-01", ip: "1.2.3.4",
            consent: true, consentStatus: "approved", consentAt: "2026-11-01", consentVersion: "MINOR-2026.10",
            onboarding: { a: 1 }
        }
    });
    const text = JSON.stringify(m);
    for (const leak of ["guardian@", "hash", "admin", "1.2.3.4", "1980", "1 Road", "411001", "onboarding", "\"C\""])
        assert.equal(text.includes(leak), false, leak);
    assert.equal(m.isDeleted, true);
    assert.equal(m.isActive, true);
    assert.equal(m.parent.consentStatus, "approved");
    assert.deepEqual(m.address, [{ country: "in", state: "MH", city: "Pune" }]);
    for (const f of ["password", "role", "parent.email", "parent.phone"]) assert.equal(memberProjection().split(" ").includes(f), false, f);
    assert.equal(m.isStaff, true);
    assert.equal(toMember({ _id: ID, role: "respondent" }).isStaff, false);
    assert.equal(toMember({ _id: ID }).isStaff, false);
});

test("answers are always lists of strings, and identifier questions are recognised", () => {
    assert.deepEqual(toAnswer({ _id: ID, user: "u", question: "q", answer: "x", updatedAt: "t" }).answer, ["x"]);
    assert.deepEqual(toAnswer({ _id: ID, user: "u", question: "q", answer: null }).answer, []);
    assert.deepEqual(toAnswer({ _id: ID, user: "u", question: "q", answer: [1, "b"] }).answer, ["1", "b"]);
    for (const q of ["mail", "phone", "dob", "add-phone2", "add-whatsapp"]) assert.equal(isIdentifierQuestion(q), true, q);
    for (const q of ["gender", "education", "add-phones"]) assert.equal(isIdentifierQuestion(q), false, q);
});

test("reward rows keep remarks only for profile credits, where it is the profile slug", async () => {
    const { toReward, REWARD_FIELDS } = await import("../app/utils/changesFeed.js");
    const base = { _id: ID, user: ID, points: "50", status: undefined, createdAt: "c", updatedAt: "u" };
    assert.deepEqual(toReward({ ...base, category: "profile", remarks: "household", title: "Household" }), {
        _id: ID, user: ID, category: "profile", points: 50, title: "Household", status: "credited", profile: "household",
        createdAt: "c", updatedAt: "u"
    });
    assert.equal(toReward({ ...base, category: "bonus", remarks: "note about this person" }).profile, null);
    assert.equal(JSON.stringify(toReward({ ...base, category: "bonus", remarks: "secret" })).includes("secret"), false);
    assert.equal(REWARD_FIELDS.includes("remarks"), true);
});

test("survey responses carry outcome and points, never telemetry or review notes", async () => {
    const { toResponse, RESPONSE_FIELDS, clampLimit: clamp } = await import("../app/utils/changesFeed.js");
    const r = toResponse({ _id: ID, user: ID, survey: { slug: "s1", name: "Survey" }, status: "complete", points: 120, loi: 12,
        telemetry: [{ key: "ip", value: "1.2.3.4" }], forReview: { note: "x" }, timeline: { start: "a", end: "b" }, updatedAt: "u" });
    assert.equal(r.survey, "s1");
    assert.equal(r.points, 120);
    assert.equal(r.isDeleted, false);
    assert.equal(JSON.stringify(r).includes("1.2.3.4"), false);
    for (const f of ["telemetry", "forReview", "rating"]) assert.equal(RESPONSE_FIELDS.includes(f), false, f);
    assert.equal(clamp("5000", "rewards"), 1000);
    assert.equal(clamp("5000", "responses"), 1000);
});
