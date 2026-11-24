// Marketing e-mail consent ("News and offers"), ported from MFR#54. Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import * as M from "../app/utils/marketing.js";
import { MEMBER_FIELDS } from "../app/utils/changesFeed.js";
import { userUpdate } from "../app/utils/memberAccess.js";

// a stand-in for the User model: findOne().select().lean() and findOneAndUpdate().select().lean()
function fakeModel(user) {
    const calls = [];
    const chain = (v) => ({ select: () => ({ lean: async () => v }) });
    return {
        calls,
        findOne: () => chain(user),
        findOneAndUpdate: (filter, update) => {
            calls.push(update);
            return chain({ marketingOptIn: update.$set.marketingOptIn });
        },
    };
}
const id = new mongoose.Types.ObjectId();

test("unset means never asked, which counts as no", () => {
    assert.deepEqual(M.view(null), { granted: false, at: null, source: null, asked: false });
    assert.deepEqual(M.view({ marketingOptIn: {} }).asked, false);
    const at = new Date();
    assert.deepEqual(M.view({ marketingOptIn: { granted: true, at, source: "signup" } }), { granted: true, at, source: "signup", asked: true });
});

test("only a real true or false is accepted, with a known source", () => {
    assert.throws(() => M.change("yes", "profile"), /true or false/);
    assert.throws(() => M.change(true, "import"), /Unknown source/);
    const { entry, history } = M.change(true, "signup", "member");
    assert.equal(entry.wording, M.WORDING);
    assert.equal(history.by, "member");
});

test("setOptIn records the change and its history; a teen can't opt in but can withdraw", async () => {
    const adult = fakeModel({ _id: id, category: "b2c" });
    const r = await M.setOptIn(id, "www.turn2opinion.com", true, "profile", "member", adult);
    assert.equal(r.granted, true);
    assert.equal(adult.calls[0].$push.marketingOptInHistory.$slice, -50);
    const teen = fakeModel({ _id: id, category: "minor" });
    await assert.rejects(M.setOptIn(id, "www.turn2opinion.com", true, "profile", "member", teen), (e) => e.code === "teen_not_allowed");
    assert.equal((await M.setOptIn(id, "www.turn2opinion.com", false, "profile", "member", teen)).granted, false);
    await assert.rejects(M.setOptIn("nope", "x", true, "profile", "member", adult), (e) => e.code === "bad_request");
    await assert.rejects(M.setOptIn(id, "x", true, "profile", "member", fakeModel(null)), (e) => e.status === 404);
});

test("the consent kit's marketing id drives the opt-in, and teens never keep it", () => {
    assert.equal(M.termsChange(["terms"], ["terms", "marketing"]), true);
    assert.equal(M.termsChange(["marketing"], ["terms"]), false);
    assert.equal(M.termsChange(["marketing"], ["marketing", "terms"]), null);
    assert.equal(M.termsChange(undefined, []), null);
    assert.deepEqual(M.stripForTeen({ category: "minor" }, ["terms", "marketing"]), ["terms"]);
    assert.deepEqual(M.stripForTeen({ category: "b2c" }, ["terms", "marketing"]), ["terms", "marketing"]);
});

test("MADP's changes feed carries it; nobody writes it through the generic update", () => {
    assert.ok(MEMBER_FIELDS.includes("marketingOptIn"));
    assert.ok(!MEMBER_FIELDS.includes("marketingOptInHistory"));
    const body = { marketingOptIn: { granted: true }, marketingOptInHistory: [], terms: ["marketing"] };
    assert.deepEqual(userUpdate(body, { isAdmin: false }), { terms: ["marketing"] });
    const admin = userUpdate(body, { isAdmin: true });
    assert.equal("marketingOptIn" in admin, false);
    assert.equal("marketingOptInHistory" in admin, false);
});
