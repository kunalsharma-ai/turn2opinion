import express from "express";
import { expressRoute, Mutate } from "../../utils/index.js";
import { Survey, Category, Response as ResponseController, User as userController, Answer as answerController } from "../../controller/index.js"
const router = express.Router();

/**
 * 
Respondent profile
Question-Options
Publish Survey
 */
router
    .route('/new-survey')
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
    .route('/respondent-profile/:respondentID')
    .get(
        expressRoute(
            async req => {
                let response = Mutate(await ResponseController.read(req.params.respondentID));
                userController.request = req;
                answerController.request = req;
                let user = Mutate(await userController.read(response.user));
                let profileAnswers = Mutate(await answerController.list({ user: user._id.toString() }, null, {}, "+answer")).reduce((a, c) => {
                    if ("question" in c) a[c.question] = (c.answer instanceof Array && c.answer.length === 1) ? c.answer[0] : c.answer;
                    return a;
                }, {});
                return { message: "", data: { ...user, ...profileAnswers } }
            },
            ResponseController
        )
    )
    .post(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .put(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .copy(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
router
    .route('/response')
    .get(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .post(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .put(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })
    .copy(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })

export default router;

