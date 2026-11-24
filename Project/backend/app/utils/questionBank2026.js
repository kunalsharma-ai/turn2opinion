// Question bank fixes of 2026-11-24 (scripts/question-bank-2026/changes.json, see scripts/question-bank-2026.js).
//
// plan() turns the change set into database writes for one panel (origin). It only touches the records the change
// set names and only the fields it lists, so type, category, isRequired, sortOrder and every other field stay as
// they are. Removals are soft deletes (isDeleted), like the admin's delete.
//
// Records are found by _id first (the change set was made from this database's export). When an _id is not in
// this panel, the natural key is used instead: question + value + label for options, name for questions,
// slug + category for profiles.

const s = (v) => String(v ?? "");
const sameList = (a, b) => JSON.stringify(a ?? []) === JSON.stringify(b ?? []);

// The question names whose records plan() needs to see.
export function touchedQuestions(changes) {
    const n = new Set();
    for (const k of ["update", "insert", "remove"]) for (const o of changes.options[k]) n.add(o.question);
    for (const k of ["update", "remove"]) for (const q of changes.questions[k]) n.add(q.name);
    for (const q of changes.questions.insert) { n.add(q.name); n.add(q.copyFrom); }
    return [...n];
}

/**
 * changes: parsed changes.json
 * existing: { questions, options, profiles }: every record of this origin (deleted ones too) for the
 *           names in touchedQuestions(changes), and all profiles of this origin.
 * Returns { writes: [{ collection, op: "update"|"insert", _id?, set?, doc? }], report: { applied, skipped, missing } }
 */
export function plan(changes, existing, origin, now = new Date()) {
    const writes = [];
    const report = { applied: {}, skipped: {}, missing: [] };
    const bump = (k, what = "applied") => { report[what][k] = (report[what][k] ?? 0) + 1; };
    const live = (d) => d.isDeleted !== true;

    // ---------- options ----------
    const opts = existing.options;
    const byId = new Map(opts.map((o) => [s(o._id), o]));
    const byKey = (o) => opts.filter((d) => d.question === o.question && d.value === o.value && d.label === o.label);
    const find = (o) => (byId.has(o._id) ? [byId.get(o._id)] : byKey(o).filter(live));

    for (const o of changes.options.update) {
        const hits = find(o);
        if (!hits.length) { report.missing.push(`option ${o.question} "${o.label}"`); continue; }
        for (const d of hits) {
            const set = {};
            for (const [k, v] of Object.entries(o.set)) if (k === "parentValue" ? !sameList(d[k], v) : d[k] !== v) set[k] = v;
            if (Object.keys(set).length) { writes.push({ collection: "Option", op: "update", _id: d._id, set }); bump("option updated"); }
            else bump("option already correct", "skipped");
        }
    }
    for (const o of changes.options.remove) {
        const hits = find(o).filter(live);
        if (!hits.length) { bump("option already removed", "skipped"); continue; }
        for (const d of hits) {
            writes.push({ collection: "Option", op: "update", _id: d._id, set: { isDeleted: true, "deleted.At": now } });
            bump("option removed");
        }
    }
    const questionsHere = new Set(existing.questions.filter(live).map((q) => q.name));
    const newQuestions = new Set(changes.questions.insert.map((q) => q.name));
    for (const o of changes.options.insert) {
        if (!questionsHere.has(o.question) && !newQuestions.has(o.question)) { bump("option for a question this panel does not have", "skipped"); continue; }
        const same = byKey(o);
        const alive = same.find(live);
        if (alive) {
            if (!sameList(alive.parentValue, o.parentValue)) {
                writes.push({ collection: "Option", op: "update", _id: alive._id, set: { parentValue: o.parentValue } });
                bump("option updated");
            } else bump("option already there", "skipped");
            continue;
        }
        if (same.length) {
            // A soft-deleted copy still holds the unique index (question, value, label, origin): bring it back.
            writes.push({ collection: "Option", op: "update", _id: same[0]._id, set: { isDeleted: false, isActive: true, parentValue: o.parentValue } });
            bump("option restored");
            continue;
        }
        writes.push({
            collection: "Option", op: "insert",
            doc: { question: o.question, label: o.label, value: o.value, parentValue: o.parentValue, origin, sortOrder: 0, isActive: true, isDeleted: false, isSelected: false, isExclusive: false, describeLabel: "", createdAt: now, updatedAt: now },
        });
        bump("option added");
    }

    // ---------- questions ----------
    const qs = existing.questions;
    const qById = new Map(qs.map((q) => [s(q._id), q]));
    const qFind = (q) => (qById.has(q._id) ? [qById.get(q._id)] : qs.filter((d) => d.name === q.name && live(d)));
    for (const q of changes.questions.update) {
        const hits = qFind(q);
        if (!hits.length) { report.missing.push(`question ${q.name}`); continue; }
        for (const d of hits) {
            const set = {};
            for (const [k, v] of Object.entries(q.set)) if (s(d[k]) !== s(v)) set[k] = v;
            if (Object.keys(set).length) { writes.push({ collection: "Question", op: "update", _id: d._id, set }); bump("question updated"); }
            else bump("question already correct", "skipped");
        }
    }
    for (const q of changes.questions.remove) {
        const hits = qFind(q).filter(live);
        if (!hits.length) { bump("question already removed", "skipped"); continue; }
        for (const d of hits) {
            writes.push({ collection: "Question", op: "update", _id: d._id, set: { isDeleted: true, "deleted.At": now } });
            bump("question removed");
        }
    }
    for (const q of changes.questions.insert) {
        if (qs.some((d) => d.name === q.name && live(d))) { bump("question already there", "skipped"); continue; }
        const templates = qs.filter((d) => d.name === q.copyFrom && live(d));
        if (!templates.length) { report.missing.push(`question ${q.copyFrom} (template for ${q.name})`); continue; }
        // One per category record of the template, so the new question reaches the same member types.
        for (const t of templates) {
            const { _id, createdAt, updatedAt, deleted, created, updated, __v, ...rest } = t;
            writes.push({ collection: "Question", op: "insert", doc: { ...rest, name: q.name, label: q.label, parent: q.parent, origin, isDeleted: false, isActive: true, createdAt: now, updatedAt: now } });
            bump("question added");
        }
    }

    // ---------- profiles ----------
    for (const p of changes.profiles.setPages) {
        const hits = existing.profiles.filter((d) => d.slug === p.slug && d.category === p.category && live(d));
        if (!hits.length) { bump(`profile not in this panel`, "skipped"); continue; }
        for (const d of hits) {
            if (sameList(d.pages, p.pages)) { bump("profile already correct", "skipped"); continue; }
            writes.push({ collection: "Profile", op: "update", _id: d._id, set: { pages: p.pages } });
            bump("profile pages updated");
        }
    }
    for (const p of changes.profiles.remove) {
        for (const d of existing.profiles.filter((d) => !s(d.slug) && live(d) && sameList(d.pages, p.pages))) {
            writes.push({ collection: "Profile", op: "update", _id: d._id, set: { isDeleted: true, "deleted.At": now } });
            bump("empty profile removed");
        }
    }
    return { writes, report };
}
