// Makes one panel's question bank (Question, Profile and Option collections) match a full export of it,
// segment by segment. Pure functions (no database), so they are unit-tested; scripts/question-bank-sync.js runs them.
//
// Records are matched by the keys the rest of the site relies on, never by _id (the export may come from another
// database):  Question by `name`,  Profile by `slug` + `category`,  Option by `question` + `value` + `parentValue`.
// Segments: a Profile's `category` is its segment (b2c = Consumer, minor = Teen, b2b = Professional). Every question
// a profile lists must be tagged with that segment in the Question's `category`, so a Teen profile can only hold
// questions meant for Teens.

export const COLLECTIONS = ["Question", "Profile", "Option"];
const SKIP = new Set(["_id", "__v", "createdAt", "updatedAt", "deleted", "createdBy", "updatedBy"]);
const CHOICE = new Set(["radio", "checkbox", "select", "multiselect"]);

export const keyOf = {
    Question: (d) => String(d.name ?? ""),
    Profile: (d) => `${d.slug ?? ""}|${d.category ?? ""}`,
    Option: (d) => `${d.question ?? ""}|${d.value ?? ""}|${[...(d.parentValue || [])].map(String).sort().join(",")}`,
};
export const namesOf = (p) => (Array.isArray(p.pages) ? p.pages : []).flatMap((pg) => (Array.isArray(pg) ? pg.slice(1) : []));
const alive = (d) => !d.isDeleted;

/** Stable comparison of plain JSON values (key order does not matter). */
function same(a, b) {
    const norm = (v) =>
        v && typeof v === "object"
            ? Array.isArray(v) ? v.map(norm) : Object.fromEntries(Object.keys(v).sort().map((k) => [k, norm(v[k])]))
            : v ?? null;
    return JSON.stringify(norm(a)) === JSON.stringify(norm(b));
}
const fields = (d) => Object.fromEntries(Object.entries(d).filter(([k]) => !SKIP.has(k)));

/**
 * Checks the export before anything is written.
 * errors (block --apply): a profile lists a question that does not exist or is not tagged for its segment,
 *   a choice question has no options, the same key appears twice.
 * warnings: a follow-up whose parent no profile of that segment asks (it can never be shown), unused questions.
 */
export function check(bank) {
    const errors = [], warnings = [];
    const q = new Map();
    for (const c of COLLECTIONS) {
        const seen = new Set();
        for (const d of bank[c] || []) {
            const k = keyOf[c](d);
            if (seen.has(k)) (c === "Option" ? warnings : errors).push(`${c} listed twice: ${k}`);
            seen.add(k);
        }
    }
    for (const d of bank.Question || []) q.set(d.name, d);
    const optionsOf = new Set((bank.Option || []).filter(alive).map((o) => o.question));
    const asked = {}; // segment -> question names its profiles ask
    for (const p of (bank.Profile || []).filter(alive)) (asked[p.category] ??= new Set(), namesOf(p).forEach((n) => asked[p.category].add(n)));
    for (const p of (bank.Profile || []).filter(alive)) {
        const where = `${p.slug} (${p.category})`;
        if (!p.slug || !p.category) errors.push(`Profile without slug or segment: ${JSON.stringify(p.name ?? p.slug ?? "")}`);
        for (const n of namesOf(p)) {
            const d = q.get(n);
            if (!d || d.isDeleted) { errors.push(`${where}: question "${n}" does not exist`); continue; }
            if (!(d.category || []).includes(p.category)) errors.push(`${where}: "${n}" is not tagged for segment ${p.category} (tagged ${JSON.stringify(d.category || [])})`);
            if (CHOICE.has(String(d.type).toLowerCase()) && !optionsOf.has(n)) errors.push(`${where}: "${n}" is a choice question with no options`);
            if (d.parent && !asked[p.category]?.has(d.parent)) warnings.push(`${where}: "${n}" follows "${d.parent}", which no ${p.category} profile asks, so it is never shown`);
        }
    }
    const used = new Set(Object.values(asked).flatMap((s) => [...s]));
    const unused = (bank.Question || []).filter((d) => alive(d) && !used.has(d.name) && !(bank.Question || []).some((x) => x.parent === d.name && used.has(x.name)));
    if (unused.length) warnings.push(`${unused.length} questions are in no profile (kept, not shown): ${unused.map((d) => d.name).slice(0, 15).join(", ")}${unused.length > 15 ? "…" : ""}`);
    return { errors, warnings };
}

/**
 * The writes that make the database match the export for one panel (origin).
 * bank / existing: { Question: [], Profile: [], Option: [] } (existing = that panel's records, deleted ones included).
 * prune: records alive in the database but missing from the export are soft-deleted (isDeleted: true);
 *   without it they are only reported.
 * Returns { writes: [{ collection, op: "update"|"insert", _id?, set?, doc? }], report: { <collection>: counts } }
 */
export function plan(bank, existing, origin, { prune = false, now = new Date() } = {}) {
    const writes = [], report = {};
    for (const c of COLLECTIONS) {
        const r = (report[c] = { unchanged: 0, updated: 0, added: 0, restored: 0, notInExport: 0, removed: 0 });
        const db = new Map();
        for (const d of existing[c] || []) {
            const k = keyOf[c](d);
            // the same key twice in the database: prefer the live one
            if (!db.has(k) || (db.get(k).isDeleted && !d.isDeleted)) db.set(k, d);
        }
        const inFile = new Set();
        for (const src of bank[c] || []) {
            const k = keyOf[c](src);
            if (inFile.has(k)) continue;
            inFile.add(k);
            const want = { ...fields(src), origin };
            const have = db.get(k);
            if (!have) {
                writes.push({ collection: c, op: "insert", doc: { isActive: true, isDeleted: false, ...want, createdAt: now, updatedAt: now } });
                r.added++;
                continue;
            }
            const set = {};
            for (const [f, v] of Object.entries(want)) if (!same(have[f], v)) set[f] = v;
            if (have.isDeleted && want.isDeleted !== true) { set.isDeleted = false; r.restored++; }
            if (Object.keys(set).length) { writes.push({ collection: c, op: "update", _id: have._id, set }); if (!have.isDeleted) r.updated++; }
            else r.unchanged++;
        }
        for (const [k, d] of db) {
            if (inFile.has(k) || d.isDeleted) continue;
            r.notInExport++;
            if (prune) { writes.push({ collection: c, op: "update", _id: d._id, set: { isDeleted: true, "deleted.At": now } }); r.removed++; }
        }
    }
    return { writes, report };
}

/** Mongo extended JSON ({"$oid"}, {"$date"}) from an export into plain values; ids are dropped later. */
export function fromExport(v) {
    if (Array.isArray(v)) return v.map(fromExport);
    if (v && typeof v === "object") {
        if (typeof v.$oid === "string") return v.$oid;
        if (v.$date !== undefined) return new Date(typeof v.$date === "object" ? Number(v.$date.$numberLong) : v.$date);
        return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fromExport(x)]));
    }
    return v;
}
