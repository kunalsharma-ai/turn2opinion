// Records a brand-new panel database needs before members can use every feature (see scripts/golive-setup.js).
//
//   - Category per member type: GET /me/points reads the payout threshold from it. Without one, points used to fail
//     on every page (they now fall back to the default). Each panel has its own member types (PANEL_CATEGORIES).
//   - idconfig "support-ticket" per origin: every new support ticket takes its number from it
//     (model/idConfig.js generateID). Without one, "Raise a query" in the Help centre fails with "Misconfigured".
//
// plan() only decides what is missing; it never changes or overwrites a record that already exists.

export const CATEGORIES = ["b2c", "b2b", "minor"];
// MyHealthOpinions members are healthcare professionals, patients (also minor patients) and caregivers, with the
// category values its sign-up stores. Turn2Opinion and MyFrequentRewards use consumer, professional and teen.
export const MHO_CATEGORIES = ["healthcare professional", "patient", "care giver", "minor patient"];
// The member type a 13-17 year old gets at sign-up: MyHealthOpinions keeps a teen patient as "minor patient"
// (so a teen is never recorded as a patient they did not say they were, and a patient is not lost); everyone else
// joins the Teen panel as "minor".
export function teenCategory(requested) {
    return /patient/i.test(String(requested ?? "")) ? "minor patient" : "minor";
}
export const MINOR_CATEGORIES = ["minor", "minor patient"];
export const isMinorCategory = (c) => MINOR_CATEGORIES.includes(String(c ?? "").toLowerCase());
export function categoriesFor(origin) {
    return /myhealthopinions|mho/i.test(String(origin)) ? MHO_CATEGORIES : CATEGORIES;
}

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
 * names: the categories this panel needs (default: categoriesFor(origin)).
 * Returns the documents to insert for this origin.
 */
export function plan(existing, origin, names = categoriesFor(origin)) {
    if (!origin || typeof origin !== "string") throw new Error("origin is required, e.g. www.turn2opinion.com");
    const has = (list, f) => (list || []).some(f);
    const now = new Date();
    const base = { origin, isActive: true, isDeleted: false, sortOrder: 0, createdAt: now, updatedAt: now };
    const categories = names.filter(
        (name) => !has(existing.categories, (c) => c.name === name && (c.origin === origin || c.origin == null))
    ).map((name) => ({ ...base, name, thresholdPoints: 15000, qualityScoreScale: 200, terms: [] }));
    const idconfigs = has(existing.idconfigs, (c) => c.module === "support-ticket" && c.origin === origin)
        ? []
        : [{ ...base, module: "support-ticket", prefix: ticketPrefix(origin), suffix: "", sequence: 1, minLength: 4, limit: 100000000 }];
    return { categories, idconfigs };
}
