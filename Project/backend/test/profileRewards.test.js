// Unit tests for profile completion rewards (credited once per member and profile).
// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { profilesToCredit, rewardUpsert, creditCompletedProfiles, sumCredited, isDuplicate, PROFILE_REWARD } from "../app/utils/profileRewards.js";

const profiles = [
    { slug: "basic", name: "Basic", points: 50 },
    { slug: "travel", name: "Travel", points: 70 },
    { slug: "free", name: "Free", points: 0 },
    { slug: "nopoints", name: "No points field" }
];

test("only 100% profiles without a credit are due", () => {
    const due = profilesToCredit(profiles, { basic: 100, travel: 99, free: 100, nopoints: 100 }, []);
    assert.deepEqual(due.map((p) => p.slug), ["basic", "nopoints"]);
    assert.equal(due[1].points, 50, "missing points uses the model default of 50");
    assert.deepEqual(profilesToCredit(profiles, { basic: 100 }, ["basic"]), []);
    assert.deepEqual(profilesToCredit(profiles, {}, []), []);
});

test("the upsert only inserts and never changes an existing credit", () => {
    const u = rewardUpsert({ user: "u1", origin: "t2o", slug: "basic", name: "Basic", points: 50 });
    assert.deepEqual(u.filter, { user: "u1", origin: "t2o", category: PROFILE_REWARD, remarks: "basic" });
    assert.deepEqual(Object.keys(u.update), ["$setOnInsert"]);
    assert.equal(u.update.$setOnInsert.points, 50);
    assert.equal(u.options.upsert, true);
});

/** In-memory Rewards collection with the same unique key as the model index. */
function store() {
    const rows = new Map();
    return {
        rows,
        credited: async () => [...rows.values()].map((r) => r.remarks),
        upsert: async (filter, update) => {
            const k = JSON.stringify(filter);
            if (rows.has(k)) return { upsertedCount: 0 };
            rows.set(k, { ...update.$setOnInsert });
            return { upsertedCount: 1 };
        }
    };
}

test("finishing a profile credits it once, saving again credits nothing", async () => {
    const db = store();
    const deps = { profiles: async () => profiles, status: async () => ({ basic: 100, travel: 40 }), credited: db.credited, upsert: db.upsert };
    const first = await creditCompletedProfiles({ user: "u1", origin: "t2o" }, deps);
    assert.deepEqual(first.map((p) => [p.slug, p.points]), [["basic", 50]]);
    const again = await creditCompletedProfiles({ user: "u1", origin: "t2o" }, deps);
    assert.deepEqual(again, []);
    assert.equal(db.rows.size, 1);
});

test("two saves at the same moment still credit once", async () => {
    const db = store();
    // both requests read "nothing credited yet" before either writes
    const deps = { profiles: async () => profiles, status: async () => ({ travel: 100 }), credited: async () => [], upsert: db.upsert };
    const [a, b] = await Promise.all([creditCompletedProfiles({ user: "u1", origin: "t2o" }, deps), creditCompletedProfiles({ user: "u1", origin: "t2o" }, deps)]);
    assert.equal(a.length + b.length, 1);
    assert.equal(db.rows.size, 1);
});

test("a duplicate-key error from the unique index is treated as already credited", async () => {
    const deps = {
        profiles: async () => profiles,
        status: async () => ({ basic: 100 }),
        credited: async () => [],
        upsert: async () => {
            const e = new Error("E11000 duplicate key error collection: Rewards");
            e.code = 11000;
            throw e;
        }
    };
    assert.deepEqual(await creditCompletedProfiles({ user: "u1", origin: "t2o" }, deps), []);
    assert.equal(isDuplicate({ code: 11000 }), true);
    assert.equal(isDuplicate(new Error("network")), false);
    await assert.rejects(creditCompletedProfiles({ user: "u1" }, { ...deps, upsert: async () => { throw new Error("network"); } }), /network/);
});

test("credits are per member", async () => {
    const db = store();
    const deps = { profiles: async () => profiles, status: async () => ({ basic: 100 }), credited: async () => [], upsert: db.upsert };
    await creditCompletedProfiles({ user: "u1", origin: "t2o" }, deps);
    await creditCompletedProfiles({ user: "u2", origin: "t2o" }, deps);
    assert.equal(db.rows.size, 2);
    assert.deepEqual(await creditCompletedProfiles({ user: null }, deps), []);
});

test("balance sums only credited rows", () => {
    assert.equal(sumCredited([{ points: 50 }, { points: 70, status: "credited" }, { points: 500, status: "reversed" }, null]), 120);
    assert.equal(sumCredited([]), 0);
});
