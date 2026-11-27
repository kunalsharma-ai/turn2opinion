// Unit tests for the MADP Panel API Contract discovery answer (routes/api/Contract.js). Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { CAPABILITIES, CONTRACT_VERSION, discoveryFor } from "../app/utils/madpContract.js";

const CORE = ["contract.discovery", "questions.read", "options.read", "questionnaires.read",
    "changes.members", "changes.answers", "changes.deletions"];

test("declares contract 1.0.0, the tenant and every core capability", () => {
    const d = discoveryFor("www.turn2opinion.com", { GIT_SHA: "abc123" });
    assert.equal(d.contract, "madp-panel-api");
    assert.equal(d.version, CONTRACT_VERSION);
    assert.match(d.version, /^\d+\.\d+\.\d+$/);
    assert.deepEqual(d.brands, [{ origin: "www.turn2opinion.com" }]);
    assert.deepEqual(d.implementation, { name: "t2o-backend", version: "abc123" });
    for (const c of CORE) assert.ok(d.capabilities.includes(c), c);
    assert.ok(!d.capabilities.includes("special_category"));
});

test("declares special-category data only for the health panel", () => {
    assert.ok(discoveryFor("www.myhealthopinions.com").capabilities.includes("special_category"));
    assert.ok(!discoveryFor("www.myfrequentrewards.com").capabilities.includes("special_category"));
});

test("serves no admin capability: the signed admin API runs elsewhere", () => {
    assert.ok(CAPABILITIES.every((c) => !c.startsWith("admin.")));
});

test("holds no personal data", () => {
    const d = JSON.stringify(discoveryFor("www.turn2opinion.com"));
    assert.ok(!/@|mail|phone/.test(d));
});
