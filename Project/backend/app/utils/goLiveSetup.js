// Records a brand-new panel database needs before members can use every feature (see scripts/golive-setup.js).
//
//   - Category per member type (b2c Consumer, b2b Professional, minor Teen): GET /me/points reads the payout
//     threshold from it. Without one, points used to fail on every page (they now fall back to the default).
//   - idconfig "support-ticket" per origin: every new support ticket takes its number from it
//     (model/idConfig.js generateID). Without one, "Raise a query" in the Help centre fails with "Misconfigured".
//
// plan() only decides what is missing; it never changes or overwrites a record that already exists.

export const CATEGORIES = ["b2c", "b2b", "minor"];

// Ticket number prefix per panel, e.g. T2O-0001. Anything else gets the first label of its host name.
const PREFIX = [
    [/turn2opinion|t2o/i, "T2O-"],
    [/myfrequentrewards|mfr/i, "MFR-"],
    [/myhealthopinions|mho/i, "MHO-"],
];
export function ticketPrefix(origin) {
    const hit = PREFIX.find(([re]) => re.test(String(origin)));
    if (hit) return hit[1];
    const first = String(origin).replace(/^www\./i, "").split(".")[0].replace(/[^a-z0-9]/gi, "");
    return (first.slice(0, 4) || "TKT").toUpperCase() + "-";
}

/**
 * existing: { categories: [{ name, origin }], idconfigs: [{ module, origin }] } as found in the database.
 * Returns the documents to insert for this origin.
 */
export function plan(existing, origin) {
    if (!origin || typeof origin !== "string") throw new Error("origin is required, e.g. www.turn2opinion.com");
    const has = (list, f) => (list || []).some(f);
    const now = new Date();
    const base = { origin, isActive: true, isDeleted: false, sortOrder: 0, createdAt: now, updatedAt: now };
    const categories = CATEGORIES.filter(
        (name) => !has(existing.categories, (c) => c.name === name && (c.origin === origin || c.origin == null))
    ).map((name) => ({ ...base, name, thresholdPoints: 15000, qualityScoreScale: 200, terms: [] }));
    const idconfigs = has(existing.idconfigs, (c) => c.module === "support-ticket" && c.origin === origin)
        ? []
        : [{ ...base, module: "support-ticket", prefix: ticketPrefix(origin), suffix: "", sequence: 1, minLength: 4, limit: 100000000 }];
    return { categories, idconfigs };
}
