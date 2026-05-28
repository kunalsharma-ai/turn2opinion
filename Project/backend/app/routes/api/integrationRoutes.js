import express from "express";
import { expressRoute } from "../../utils/index.js";
import { Survey, Category } from "../../controller/index.js"
const router = express.Router();

router
    .route('/')
    .get(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .post(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .put(
        expressRoute(
            async (req) => {
                Category.request = req;
                let category = await Category.findOne({ name: { $in: ["b2c", "b2b"] } });

                let data = await Survey.receive({
                    slug: req.body.slug ?? "",
                    name: req.body.name ?? "",
                    category: req.body.category ?? category.name,
                    source: req.body.source ?? "internal",
                    points: req.body.points ?? 0,
                    status: "draft",
                    loi: req.body.loi ?? 0,
                    filters: req.body.filters ?? {},
                    batchSize: req.body.batchSize ?? 0,
                    link: req.body.link ?? ""
                });
                return {
                    message: "Ready for launch",
                    data
                }
            },
            Survey
        )
    )
    .patch(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .copy(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
router
    .route('/:id')
    .get(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .post(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .put(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .copy(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })

export default router;

