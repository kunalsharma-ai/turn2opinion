import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import { plan, touchedQuestions } from "../app/utils/questionBank2026.js";

const O = "www.turn2opinion.com";
const id = (n) => n.toString(16).padStart(24, "0");
const changes = (over = {}) => ({
    questions: { update: [], insert: [], remove: [], ...over.questions },
    options: { update: [], insert: [], remove: [], ...over.options },
    profiles: { setPages: [], remove: [], ...over.profiles },
});

test("changes.json is well formed and names every question it touches", () => {
    const c = JSON.parse(fs.readFileSync(new URL("../scripts/question-bank-2026/changes.json", import.meta.url)));
    assert.ok(c.options.update.length && c.options.insert.length && c.options.remove.length);
    for (const o of [...c.options.update, ...c.options.remove]) assert.match(o._id, /^[0-9a-f]{24}$/);
    assert.ok(touchedQuestions(c).includes("pets-animal-care28"));
    for (const q of c.questions.insert) assert.ok(q.copyFrom, q.name);
});

test("updates only the listed fields, found by _id", () => {
    const existing = { questions: [], profiles: [], options: [{ _id: id(1), question: "jobrole", label: "Teller", value: "Teller", parentValue: ["Food & Bevarage Department"], type: "x" }] };
    const c = changes({ options: { update: [{ _id: id(1), question: "jobrole", label: "Teller", value: "Teller", set: { parentValue: ["Food & Beverage Department"] } }] } });
    const { writes } = plan(c, existing, O);
    assert.deepEqual(writes, [{ collection: "Option", op: "update", _id: id(1), set: { parentValue: ["Food & Beverage Department"] } }]);
});

test("falls back to question + value + label when the _id is from another panel, and is idempotent", () => {
    const row = { _id: id(9), question: "beauty1", label: "Body Lotion", value: "Body Lotion" };
    const c = changes({ options: { remove: [{ _id: id(1), question: "beauty1", label: "Body Lotion", value: "Body Lotion" }] } });
    assert.equal(plan(c, { questions: [], profiles: [], options: [row] }, O).writes[0]._id, id(9));
    assert.equal(plan(c, { questions: [], profiles: [], options: [{ ...row, isDeleted: true }] }, O).writes.length, 0);
});

test("adds a missing option once, restores a soft-deleted copy instead of clashing with the unique index", () => {
    const q = [{ _id: id(5), name: "travel-tourism1" }];
    const c = changes({ options: { insert: [{ question: "travel-tourism1", label: "None", value: "None", parentValue: [] }] } });
    const add = plan(c, { questions: q, profiles: [], options: [] }, O).writes;
    assert.equal(add[0].op, "insert");
    assert.equal(add[0].doc.origin, O);
    assert.equal(plan(c, { questions: q, profiles: [], options: [{ _id: id(2), question: "travel-tourism1", label: "None", value: "None", parentValue: [] }] }, O).writes.length, 0);
    const back = plan(c, { questions: q, profiles: [], options: [{ _id: id(3), question: "travel-tourism1", label: "None", value: "None", isDeleted: true }] }, O).writes;
    assert.deepEqual(back[0].set, { isDeleted: false, isActive: true, parentValue: [] });
    // a panel without the question gets nothing
    assert.equal(plan(c, { questions: [], profiles: [], options: [] }, O).writes.length, 0);
});

test("new questions copy type, category and flags from their template, one per category record", () => {
    const tpl = { _id: id(7), name: "pet15", label: "Do you have Pets?", type: "radio", category: ["b2c"], isRequired: true, origin: O, createdAt: "x" };
    const tpl2 = { ...tpl, _id: id(8), category: ["minor"] };
    const c = changes({ questions: { insert: [{ name: "pets-animal-care28", label: "Do you currently own or care for a dog?", parent: "pet16", copyFrom: "pet15" }] } });
    const { writes } = plan(c, { questions: [tpl, tpl2], profiles: [], options: [] }, O);
    assert.equal(writes.length, 2);
    assert.equal(writes[0].doc.type, "radio");
    assert.deepEqual(writes[1].doc.category, ["minor"]);
    assert.equal(writes[0].doc.parent, "pet16");
    assert.equal(writes[0].doc._id, undefined);
    assert.equal(writes[0].doc.createdAt instanceof Date, true);
    const again = plan(c, { questions: [tpl, { ...tpl, _id: id(9), name: "pets-animal-care28" }], profiles: [], options: [] }, O);
    assert.equal(again.writes.length, 0);
});

test("profiles: pages set by slug and category, empty header-only profile soft-deleted", () => {
    const profiles = [
        { _id: id(1), slug: "shopping", category: "b2c", pages: [["Shopping", "shopping20", ""]] },
        { _id: id(2), slug: "shopping", category: "minor", pages: [["shopping", "shopping20"]] },
        { _id: id(3), slug: "", name: "", category: "", pages: [["Food & Grocery"]] },
    ];
    const c = changes({ profiles: { setPages: [{ slug: "shopping", category: "b2c", pages: [["Shopping", "shopping24"]] }], remove: [{ slug: "", pages: [["Food & Grocery"]] }] } });
    const { writes } = plan(c, { questions: [], options: [], profiles }, O);
    assert.deepEqual(writes.map((w) => w._id), [id(1), id(3)]);
    assert.equal(writes[1].set.isDeleted, true);
});
