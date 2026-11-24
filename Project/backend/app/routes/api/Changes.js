// Changed-since feeds, for MADP and other admin integrations. Admin accounts only. Read-only.
//   GET /api/v1/changes/members    ?cursor=&since=&limit<=500   member records changed, incl. deactivated and soft-deleted
//   GET /api/v1/changes/answers    ?cursor=&since=&limit<=1000  profile answers changed (identifier questions left out)
//   GET /api/v1/changes/deletions  ?cursor=&since=&limit<=1000  members deleted for good, and answer resets
//   GET /api/v1/changes/rewards    ?cursor=&since=&limit<=1000  reward rows (points credited, and status changes)
//   GET /api/v1/changes/responses  ?cursor=&since=&limit<=1000  survey responses (outcome and points)
// Every answer is { status: "success", data: { items, cursor, more } }. Store `cursor` and send it back next time;
// `more` is true when another page is ready now. Only the tenant of the request (its Host) is ever read.
import express from "express";
import mongoose from "mongoose";
import { requireAdmin } from "../../utils/access.js";
import {
    Answers as answerModel, Response as responseModel, Rewards as rewardsModel, Tombstone as tombstoneModel, User as userModel
} from "../../model/index.js";
import {
    IDENTIFIER_QUESTIONS, PAGE_SORT, RESPONSE_FIELDS, REWARD_FIELDS, clampLimit, memberProjection, pageFilter, pageOf, toAnswer,
    toMember, toResponse, toReward, toTombstone
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

const toItem = { members: toMember, answers: toAnswer, deletions: toTombstone, rewards: toReward, responses: toResponse };

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
        tombstoneModel.find(filter).select("kind user updatedAt").sort(PAGE_SORT).limit(n).lean()))
    .get("/rewards", requireAdmin, feed("rewards", (filter, n) =>
        rewardsModel.find(filter).select(REWARD_FIELDS).sort(PAGE_SORT).limit(n).lean()))
    .get("/responses", requireAdmin, feed("responses", (filter, n) =>
        // Deleted responses are changes a reader must see, so the soft-delete flag is read, not filtered.
        responseModel.find(filter).select(RESPONSE_FIELDS).sort(PAGE_SORT).limit(n).lean()));

export default router;
