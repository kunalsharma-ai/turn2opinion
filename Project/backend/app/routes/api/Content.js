// Public side of pages edited in the MADP console (the editor itself is the MFR admin API; all brands share one
// database). GET /api/v1/content/:key?lang=hi gives the published copy in that language or English, or 404 when
// nothing is published and the site shows its built-in text. No sign-in needed. Same answer as MFR's route.
import express from "express";
import { ContentPage } from "../../model/index.js";

const KEY = /^[a-z0-9][a-z0-9-]{1,59}$/;
const LANG = /^[a-z]{2}(-[A-Z]{2})?$/;

export async function forSite(origin, key, lang = "en") {
    const k = String(key || "").toLowerCase();
    if (!KEY.test(k)) return null;
    const langs = LANG.test(String(lang)) && lang !== "en" ? [lang, "en"] : ["en"];
    const rows = await ContentPage.find({ origin, key: k, lang: { $in: langs }, live: { $ne: null }, isDeleted: { $ne: true } }).lean();
    const p = langs.map((l) => rows.find((r) => r.lang === l)).find(Boolean);
    if (!p) return null;
    return { key: p.key, lang: p.lang, kind: p.kind, title: p.live.title, body: p.live.body, version: p.live.version, publishedAt: p.live.publishedAt };
}

export default express.Router().get("/:key", async (req, res) => {
    try {
        const data = await forSite(req.origin, req.params.key, req.query.lang);
        if (!data) return res.status(404).json({ status: "error", code: "not_found", message: "No published page" });
        return res.json({ status: "success", message: "", data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ status: "error", code: "server", message: "Something went wrong" });
    }
});
