// Go-live setup for a panel database: adds the records a fresh database is missing (see app/utils/goLiveSetup.js).
// It only inserts what is missing and never changes an existing record.
//
//   mongodb=<connection string> node scripts/golive-setup.js --origin www.turn2opinion.com            # dry run
//   mongodb=<connection string> node scripts/golive-setup.js --origin www.turn2opinion.com --apply    # write
//
// --origin is the panel's host name exactly as the API sees it (req.origin, stored on every record).
import mongoose from "mongoose";
import { plan } from "../app/utils/goLiveSetup.js";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : undefined; };
const origin = arg("--origin");
const apply = process.argv.includes("--apply");
if (!process.env.mongodb || !origin) {
    console.error("Usage: mongodb=<connection string> node scripts/golive-setup.js --origin <host> [--apply]");
    process.exit(2);
}
await mongoose.connect(process.env.mongodb);
const db = mongoose.connection.db;
const existing = {
    categories: await db.collection("Category").find({ isDeleted: { $ne: true } }, { projection: { name: 1, origin: 1 } }).toArray(),
    idconfigs: await db.collection("idconfig").find({ isDeleted: { $ne: true } }, { projection: { module: 1, origin: 1 } }).toArray(),
};
const todo = plan(existing, origin);
console.log(`${apply ? "Adding" : "Would add (dry run, pass --apply to write)"} for ${origin}:`);
console.log(`  Category: ${todo.categories.map((c) => c.name).join(", ") || "nothing missing"}`);
console.log(`  Support ticket numbers: ${todo.idconfigs.map((c) => `${c.prefix}0001…`).join(", ") || "already set up"}`);
if (apply) {
    if (todo.categories.length) await db.collection("Category").insertMany(todo.categories);
    if (todo.idconfigs.length) await db.collection("idconfig").insertMany(todo.idconfigs);
    console.log("Done.");
}
await mongoose.disconnect();
