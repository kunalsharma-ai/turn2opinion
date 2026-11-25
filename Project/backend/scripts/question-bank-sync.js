// Loads a full question bank export (Question.json, Profile.json, Option.json) into one panel's database, so the
// site asks exactly those questions, each profile in its own segment (b2c = Consumer, minor = Teen).
// The bank Kunal shared on 2026-11-25 is in scripts/question-bank-t2o/ (gzipped).
//
//   mongodb=<connection string> node scripts/question-bank-sync.js --origin www.turn2opinion.com             # dry run
//   mongodb=<connection string> node scripts/question-bank-sync.js --origin www.turn2opinion.com --apply     # write
//   mongodb=<connection string> node scripts/question-bank-sync.js --rollback logs/question-bank-sync-….json
//
//   --dir <folder>   use another export (Question.json, Profile.json, Option.json, plain or .gz)
//   --prune          also switch off (isDeleted: true) records of this panel that the export no longer has
//   --force          write even when the segment check finds errors
//   --check          only check the export (no database needed)
//
// Records are matched by question name, profile slug + segment, and option question + value + parent answers, so
// saved member answers stay attached. --apply first saves every record it changes to logs/, and --rollback restores
// them and removes the records it added.
import fs from "fs";
import zlib from "zlib";
import path from "path";
import { fileURLToPath } from "url";
import { COLLECTIONS, check, fromExport, plan } from "../app/utils/questionBankSync.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : undefined; };
const has = (k) => process.argv.includes(k);
const origin = arg("--origin");
const rollback = arg("--rollback");
const dir = arg("--dir") || path.join(here, "question-bank-t2o");

function load(name) {
    for (const f of [`${name}.json`, `${name}.json.gz`]) {
        const p = path.join(dir, f);
        if (!fs.existsSync(p)) continue;
        const raw = fs.readFileSync(p);
        return fromExport(JSON.parse((f.endsWith(".gz") ? zlib.gunzipSync(raw) : raw).toString("utf-8")));
    }
    throw new Error(`${name}.json not found in ${dir}`);
}

if (!rollback) {
    const bank = Object.fromEntries(COLLECTIONS.map((c) => [c, load(c)]));
    const seg = {};
    for (const p of bank.Profile.filter((p) => !p.isDeleted)) seg[p.category] = (seg[p.category] || 0) + 1;
    console.log(`Export in ${path.relative(process.cwd(), dir) || "."}: ${bank.Question.length} questions, ${bank.Option.length} options, ` +
        `${bank.Profile.length} profiles (${Object.entries(seg).map(([k, v]) => `${v} ${k}`).join(", ")})`);
    const { errors, warnings } = check(bank);
    for (const w of warnings) console.log(`  warning: ${w}`);
    for (const e of errors) console.log(`  ERROR: ${e}`);
    if (!errors.length) console.log("  segment check passed: every profile only holds questions tagged for its segment");
    if (has("--check")) process.exit(errors.length ? 1 : 0);
    if (errors.length && has("--apply") && !has("--force")) {
        console.error("Not writing: fix the errors above or pass --force.");
        process.exit(1);
    }
    globalThis.__bank = bank;
}

if (!process.env.mongodb || (!origin && !rollback)) {
    console.error("Usage: mongodb=<connection string> node scripts/question-bank-sync.js --origin <host> [--apply] [--prune]\n" +
        "       mongodb=<connection string> node scripts/question-bank-sync.js --rollback <backup file>\n" +
        "       node scripts/question-bank-sync.js --check");
    process.exit(2);
}
const { default: mongoose } = await import("mongoose");
await mongoose.connect(process.env.mongodb);
const db = mongoose.connection.db;
const { ObjectId } = mongoose.Types;

if (rollback) {
    const b = JSON.parse(fs.readFileSync(rollback, "utf-8"));
    for (const [coll, docs] of Object.entries(b.before)) {
        for (const d of docs) await db.collection(coll).replaceOne({ _id: new ObjectId(d._id) }, revive(d));
    }
    for (const [coll, ids] of Object.entries(b.inserted)) {
        if (ids.length) await db.collection(coll).deleteMany({ _id: { $in: ids.map((i) => new ObjectId(i)) } });
    }
    console.log(`Rolled back ${b.origin}: restored ${Object.values(b.before).flat().length} records, removed ${Object.values(b.inserted).flat().length} added ones.`);
    await mongoose.disconnect();
    process.exit(0);
}

const bank = globalThis.__bank;
const existing = {};
for (const c of COLLECTIONS) existing[c] = await db.collection(c).find({ origin }).toArray();
const { writes, report } = plan(bank, existing, origin, { prune: has("--prune") });

console.log(`${has("--apply") ? "Applying" : "Dry run (pass --apply to write)"} for ${origin}: ${writes.length} writes`);
for (const [c, r] of Object.entries(report)) {
    console.log(`  ${c}: ${r.added} added, ${r.updated} updated, ${r.restored} switched back on, ${r.unchanged} unchanged, ` +
        `${r.notInExport} not in the export${has("--prune") ? ` (${r.removed} switched off)` : " (kept; --prune switches them off)"}`);
}

if (has("--apply") && writes.length) {
    const backup = { origin, at: new Date().toISOString(), before: {}, inserted: {} };
    for (const w of writes.filter((w) => w.op === "update")) {
        (backup.before[w.collection] ??= []).push(existing[w.collection].find((d) => String(d._id) === String(w._id)));
    }
    const file = path.join(here, "..", "logs", `question-bank-sync-${origin}-${Date.now()}.json`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const save = () => fs.writeFileSync(file, JSON.stringify(backup));
    save();
    console.log(`  backup: ${file}`);
    for (const coll of COLLECTIONS) {
        const mine = writes.filter((w) => w.collection === coll);
        const ins = mine.filter((w) => w.op === "insert").map((w) => ({ ...w.doc, _id: new ObjectId() }));
        backup.inserted[coll] = ins.map((d) => String(d._id));
        save(); // ids are recorded before they are written, so a rollback can always find them
        const ops = [
            ...mine.filter((w) => w.op === "update").map((w) => ({ updateOne: { filter: { _id: w._id }, update: { $set: { ...w.set, updatedAt: new Date() } } } })),
            ...ins.map((d) => ({ insertOne: { document: d } })),
        ];
        for (let i = 0; i < ops.length; i += 1000) {
            try {
                const r = await db.collection(coll).bulkWrite(ops.slice(i, i + 1000), { ordered: false });
                console.log(`  ${coll}: ${r.modifiedCount} updated, ${r.insertedCount} added`);
            } catch (e) {
                console.error(`  ${coll}: ${e.writeErrors?.length ?? 1} writes failed (others were applied): ${e.message}`);
            }
        }
    }
    console.log("Done. To undo: node scripts/question-bank-sync.js --rollback " + path.relative(process.cwd(), file));
}
await mongoose.disconnect();

// JSON turns ObjectIds and dates into strings; put them back for the restore.
function revive(d) {
    const out = {};
    for (const [k, v] of Object.entries(d)) {
        if (k === "_id" || (/^[0-9a-f]{24}$/.test(v) && /(^|\.)(By|_id)$/.test(k))) out[k] = new ObjectId(v);
        else if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v)) out[k] = new Date(v);
        else if (v && typeof v === "object" && !Array.isArray(v)) out[k] = revive(v);
        else out[k] = v;
    }
    return out;
}
