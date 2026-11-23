import { test } from "node:test";
import assert from "node:assert/strict";
import { plan, ticketPrefix } from "../app/utils/goLiveSetup.js";

test("a fresh database gets three categories and a ticket counter", () => {
    const p = plan({ categories: [], idconfigs: [] }, "www.turn2opinion.com");
    assert.deepEqual(p.categories.map((c) => c.name), ["b2c", "b2b", "minor"]);
    assert.equal(p.categories[0].thresholdPoints, 15000);
    assert.equal(p.idconfigs.length, 1);
    assert.equal(p.idconfigs[0].module, "support-ticket");
    assert.equal(p.idconfigs[0].prefix, "T2O-");
    assert.ok(p.idconfigs.every((c) => c.origin === "www.turn2opinion.com"));
});

test("existing records are never duplicated or changed", () => {
    const p = plan(
        { categories: [{ name: "b2c", origin: "www.turn2opinion.com" }, { name: "minor", origin: null }], idconfigs: [{ module: "support-ticket", origin: "www.turn2opinion.com" }] },
        "www.turn2opinion.com"
    );
    assert.deepEqual(p.categories.map((c) => c.name), ["b2b"]);
    assert.equal(p.idconfigs.length, 0);
});

test("another panel's records don't count, and each panel gets its own prefix", () => {
    const p = plan({ categories: [], idconfigs: [{ module: "support-ticket", origin: "www.turn2opinion.com" }] }, "www.myfrequentrewards.com");
    assert.equal(p.idconfigs[0].prefix, "MFR-");
    assert.equal(ticketPrefix("www.myhealthopinions.com"), "MHO-");
    assert.equal(ticketPrefix("panel.example.org"), "PANE-");
});

test("origin is required", () => {
    assert.throws(() => plan({ categories: [], idconfigs: [] }, ""), /origin is required/);
});
