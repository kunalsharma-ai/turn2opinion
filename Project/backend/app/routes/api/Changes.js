// Changed-since feeds, for MADP and other admin integrations. Admin accounts only. Read-only.
//   GET /api/v1/changes/members    ?cursor=&since=&limit<=500   member records changed, incl. deactivated and soft-deleted
//   GET /api/v1/changes/answers    ?cursor=&since=&limit<=1000  profile answers changed (identifier questions left out)
//   GET /api/v1/changes/deletions  ?cursor=&since=&limit<=1000  members deleted for good, and answer resets
// Every answer is { status: "success", data: { items, cursor, more } }. Store `cursor` and send it back next time;
// `more` is true when another page is ready now. Only the tenant of the request (its Host) is ever read.
import express from "express";
import mongoose from "mongoose";
import { requireAdmin } from "../../utils/access.js";
import { Answers as answerModel, Tombstone as tombstoneModel, User as userModel } from "../../model/index.js";
import {
    IDENTIFIER_QUESTIONS, PAGE_SORT, clampLimit, memberProjection, pageFilter, pageOf, toAnswer, toMember, toTombstone
} from "../../utils/changesFeed.js";

const toId = (id) => new mongoose.Types.ObjectId(id);

function feed(name, run) {
    return async (req, res) => {
        const limit = clampLimit(req.query.limit, name);
        let filter;
        try {
            filter = pageFilter({ origin: req.origin, cursor: req.query.cursor, since: req.query.since, toId });
        } catch (e) {
            return res.status(400).json({ status: "error", message: e.message });
        }
        try {
            const docs = await run(filter, limit + 1);
            return res.json({ status: "success", data: pageOf(docs, limit, req.query.cursor, toItem[name]) });
        } catch (e) {
            return res.status(500).json({ status: "error", message: "Could not read changes" });
        }
    };
}

const toItem = { members: toMember, answers: toAnswer, deletions: toTombstone };

const router = express.Router();
router
    .get("/members", requireAdmin, feed("members", (filter, n) =>
        // No isActive/isDeleted filter: deactivated and deleted members are changes a reader must see.
        userModel.find(filter).select(`${memberProjection()} +isActive +isDeleted`).sort(PAGE_SORT).limit(n).lean()))
    .get("/answers", requireAdmin, feed("answers", (filter, n) =>
        answerModel
            .find({ ...filter, question: { $nin: IDENTIFIER_QUESTIONS, $not: /^add-phone\d*$/ } })
            .select("user question +answer updatedAt")
            .sort(PAGE_SORT).limit(n).lean()))
    .get("/deletions", requireAdmin, feed("deletions", (filter, n) =>
        tombstoneModel.find(filter).select("kind user updatedAt").sort(PAGE_SORT).limit(n).lean()));

export default router;
