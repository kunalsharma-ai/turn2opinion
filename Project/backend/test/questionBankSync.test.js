import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import zlib from "zlib";
import { check, fromExport, keyOf, plan } from "../app/utils/questionBankSync.js";

const O = "www.turn2opinion.com";
const id = (n) => n.toString(16).padStart(24, "0");
const q = (name, category = ["b2c"], more = {}) => ({ name, label: name, type: "text", parent: "", category, ...more });
const bank = (over = {}) => ({ Question: [], Profile: [], Option: [], ...over });

test("segment check: a Teen profile may only hold questions tagged for Teens", () => {
    const b = bank({
        Question: [q("firstname", ["b2c", "minor"]), q("personal-income", ["b2c"], { type: "radio" })],
        Option: [{ question: "personal-income", value: "Low", label: "Low", parentValue: [] }],
        Profile: [
            { slug: "basic", category: "b2c", pages: [["basic", "firstname", "personal-income"]] },
            { slug: "basic", category: "minor", pages: [["basic", "firstname", "personal-income"]] },
        ],
    });
    const { errors } = check(b);
    assert.equal(errors.length, 1);
    assert.match(errors[0], /basic \(minor\): "personal-income" is not tagged for segment minor/);
});

test("segment check: missing questions, choice questions without options and never-shown follow-ups", () => {
    const b = bank({
        Question: [q("gender", ["b2c"], { type: "radio" }), q("disabled", ["b2c"], { parent: "physically-challendged" })],
        Profile: [{ slug: "basic", category: "b2c", pages: [["basic", "gender", "ghost", "disabled"]] }],
    });
    const { errors, warnings } = check(b);
    assert.ok(errors.some((e) => /"ghost" does not exist/.test(e)));
    assert.ok(errors.some((e) => /"gender" is a choice question with no options/.test(e)));
    assert.ok(warnings.some((w) => /"disabled" follows "physically-challendged"/.test(w)));
});

test("matches by name, slug + segment and option value, never by _id; only changed fields are written", () => {
    const b = bank({
        Question: [q("gender", ["b2c", "minor"], { type: "radio", label: "Gender" })],
        Profile: [{ slug: "basic", category: "minor", pages: [["basic", "gender"]], points: 50 }],
        Option: [{ _id: id(99), question: "gender", value: "Male", label: "Male", parentValue: [] }],
    });
    const existing = {
        Question: [{ _id: id(1), ...q("gender", ["b2c"], { type: "radio", label: "Gender" }), origin: O }],
        Profile: [
            { _id: id(2), slug: "basic", category: "b2c", pages: [["basic", "gender", "mail"]], points: 50, origin: O },
            { _id: id(3), slug: "basic", category: "minor", pages: [["basic"]], points: 50, origin: O },
        ],
        Option: [{ _id: id(4), question: "gender", value: "Male", label: "male", parentValue: [], origin: O }],
    };
    const { writes, report } = plan(b, existing, O);
    assert.deepEqual(writes, [
        { collection: "Question", op: "update", _id: id(1), set: { category: ["b2c", "minor"] } },
        { collection: "Profile", op: "update", _id: id(3), set: { pages: [["basic", "gender"]] } },
        { collection: "Option", op: "update", _id: id(4), set: { label: "Male" } },
    ]);
    // the Consumer Basic is not in this export: reported, left alone without --prune
    assert.equal(report.Profile.notInExport, 1);
    const pruned = plan(b, existing, O, { prune: true }).writes.filter((w) => w.set?.isDeleted);
    assert.deepEqual(pruned.map((w) => w._id), [id(2)]);
});

test("adds missing records for this panel and switches deleted ones back on", () => {
    const now = new Date("2026-11-25T00:00:00Z");
    const b = bank({ Question: [q("religion"), q("zipcode")] });
    const existing = { Question: [{ _id: id(5), ...q("zipcode"), origin: O, isDeleted: true }] };
    const { writes, report } = plan(b, existing, O, { now });
    assert.deepEqual(writes, [
        { collection: "Question", op: "insert", doc: { isActive: true, isDeleted: false, ...q("religion"), origin: O, createdAt: now, updatedAt: now } },
        { collection: "Question", op: "update", _id: id(5), set: { isDeleted: false } },
    ]);
    assert.equal(report.Question.restored, 1);
});

test("option keys ignore the order of parent answers", () => {
    assert.equal(keyOf.Option({ question: "state", value: "X", parentValue: ["IN", "US"] }), keyOf.Option({ question: "state", value: "X", parentValue: ["US", "IN"] }));
});

test("the bundled Turn2Opinion bank passes the segment check and re-applies as a no-op", () => {
    const load = (n) => fromExport(JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL(`../scripts/question-bank-t2o/${n}.json.gz`, import.meta.url))).toString()));
    const b = { Question: load("Question"), Profile: load("Profile"), Option: load("Option") };
    assert.deepEqual(check(b).errors, []);
    for (const p of b.Profile.filter((p) => p.category === "minor")) {
        for (const n of p.pages.flatMap((pg) => pg.slice(1))) assert.ok(b.Question.find((x) => x.name === n).category.includes("minor"), n);
    }
    // a database that already holds this export (ids from that database) needs no writes
    const existing = Object.fromEntries(Object.entries(b).map(([c, list]) => [c, list.map((d, i) => ({ ...d, _id: id(i + 1), origin: O }))]));
    const { writes } = plan(b, existing, O);
    assert.equal(writes.length, 0);
});
