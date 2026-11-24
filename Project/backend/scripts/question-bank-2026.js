// Applies the question bank fixes of 2026-11-24 (question-bank-2026/changes.json) to one panel's database.
// Only the listed records and fields change; everything else (type, category, isRequired, sortOrder…) is kept.
// See app/utils/questionBank2026.js for the rules.
//
//   mongodb=<connection string> node scripts/question-bank-2026.js --origin www.turn2opinion.com            # dry run
//   mongodb=<connection string> node scripts/question-bank-2026.js --origin www.turn2opinion.com --apply    # write
//   mongodb=<connection string> node scripts/question-bank-2026.js --rollback logs/question-bank-2026-….json
//
// --apply first saves every record it is about to change, plus the ids it adds, to logs/question-bank-2026-*.json.
// --rollback puts those records back exactly as they were and deletes the added ones.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { plan, touchedQuestions } from "../app/utils/questionBank2026.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : undefined; };
const origin = arg("--origin");
const rollback = arg("--rollback");
const apply = process.argv.includes("--apply");
if (!process.env.mongodb || (!origin && !rollback)) {
    console.error("Usage: mongodb=<connection string> node scripts/question-bank-2026.js --origin <host> [--apply]\n" +
        "       mongodb=<connection string> node scripts/question-bank-2026.js --rollback <backup file>");
    process.exit(2);
}
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

const changes = JSON.parse(fs.readFileSync(path.join(here, "question-bank-2026", "changes.json"), "utf-8"));
const names = touchedQuestions(changes);
const existing = {
    questions: await db.collection("Question").find({ origin, name: { $in: names } }).toArray(),
    options: await db.collection("Option").find({ origin, question: { $in: names } }).toArray(),
    profiles: await db.collection("Profile").find({ origin }).toArray(),
};
const { writes, report } = plan(changes, existing, origin);

console.log(`${apply ? "Applying" : "Dry run (pass --apply to write)"} for ${origin}: ${writes.length} writes`);
for (const [k, v] of Object.entries(report.applied)) console.log(`  ${v} × ${k}`);
for (const [k, v] of Object.entries(report.skipped)) console.log(`  skipped ${v} × ${k}`);
if (report.missing.length) console.log(`  not found in this panel (${report.missing.length}):\n    ` + report.missing.join("\n    "));

// Answers saved under questions that are now removed stay as they are; this only reports them.
const gone = changes.questions.remove.map((q) => q.name);
const orphan = await db.collection("Answer").countDocuments({ origin, question: { $in: gone } });
if (orphan) console.log(`  note: ${orphan} saved answers belong to removed questions (${gone.join(", ")}); they are kept unchanged.`);

if (apply && writes.length) {
    const backup = { origin, at: new Date().toISOString(), before: {}, inserted: {} };
    for (const w of writes.filter((w) => w.op === "update")) {
        const list = (backup.before[w.collection] ??= []);
        if (!list.some((d) => String(d._id) === String(w._id))) {
            list.push(existing[{ Option: "options", Question: "questions", Profile: "profiles" }[w.collection]].find((d) => String(d._id) === String(w._id)));
        }
    }
    const file = path.join(here, "..", "logs", `question-bank-2026-${origin}-${Date.now()}.json`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const save = () => fs.writeFileSync(file, JSON.stringify(backup, null, 1));
    save();
    console.log(`  backup: ${file}`);
    for (const coll of ["Question", "Option", "Profile"]) {
        const mine = writes.filter((w) => w.collection === coll);
        const ins = mine.filter((w) => w.op === "insert").map((w) => ({ ...w.doc, _id: new ObjectId() }));
        backup.inserted[coll] = ins.map((d) => String(d._id));
        save(); // ids are recorded before they are written, so a rollback can always find them
        const ops = [
            ...mine.filter((w) => w.op === "update").map((w) => ({ updateOne: { filter: { _id: w._id }, update: { $set: { ...w.set, updatedAt: new Date() } } } })),
            ...ins.map((d) => ({ insertOne: { document: d } })),
        ];
        if (!ops.length) continue;
        try {
            const r = await db.collection(coll).bulkWrite(ops, { ordered: false });
            console.log(`  ${coll}: ${r.modifiedCount} updated, ${r.insertedCount} added`);
        } catch (e) {
            console.error(`  ${coll}: ${e.writeErrors?.length ?? 1} writes failed (others were applied): ${e.message}`);
        }
    }
    console.log("Done. To undo: node scripts/question-bank-2026.js --rollback " + path.relative(process.cwd(), file));
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
