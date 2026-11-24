import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

// Read here, edited only through the MFR admin API (all brands share one database). Site pages edited in the super admin console: the legal pages (privacy, terms, gdpr, cookies) and other text pages.
// One document per brand, key and language. `live` is what members see (a copy of the newest ContentRevision);
// `draft` is the console's working copy. body is a list of blocks, never HTML (see admin/content.js).
const copy = {
    title: String,
    body: { type: [mongoose.Schema.Types.Mixed], default: undefined },
};
export default mongooseModel(
    "ContentPage",
    {
        key: { type: String, required: true, trim: true, lowercase: true },
        lang: { type: String, required: true, default: "en" },
        kind: { type: String, enum: ["legal", "page"], required: true },
        version: { type: Number, default: 0 },
        live: { type: { ...copy, version: Number, publishedAt: Date, publishedBy: String, approvedBy: String }, default: null },
        draft: { type: { ...copy, state: { type: String, enum: ["editing", "review"] }, basedOn: Number, updatedBy: String, updatedAt: Date, reviewRequestedBy: String }, default: null },
        createdBy: String,
    },
    [[{ origin: 1, key: 1, lang: 1 }, { unique: true }]],
);
