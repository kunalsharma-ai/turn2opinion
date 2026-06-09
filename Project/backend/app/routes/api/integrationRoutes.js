import express from "express";
import { expressRoute, isAuthenticated, Mutate, translate } from "../../utils/index.js";
import { Survey, Category, Response as ResponseController, User as userController, Answer as answerController } from "../../controller/index.js"
import { Option as optionModel, Question as questionModel } from "../../model/index.js";
import { surveyQuestions } from "../../utils/translate.js";
const router = express.Router();

router
    .route('/new-survey')
    .put(
        isAuthenticated,
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
                let questions = surveyQuestions(response.survey.slug);
                questions = questions.filter(q => ("name" in q && Boolean(q.name)));
                for (let i = 0; i < questions.length; i++) {
                    const question = await questionModel.findOne({ name: questions[i].name });// questions[i];
                    let parentValue = (Boolean(question) && ("parent" in question) && !["", null, undefined, []].includes(question.parent)) ? profileAnswers[question.parent] : ""
                    let options = (parentValue !== "") ? Mutate(await optionModel.find({ question: question?.name, parentValue })) : Mutate(await optionModel.find({ question: question?.name }))
                    questions[i].options = options.map(option => option.label)
                }
                return { message: "", data: { ...user, ...profileAnswers, options: questions.filter(q => q.options.length > 0) } }
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
    .route('/response/:responseID')
    .get(async (req, res) => { return res.status(502).json({ status: "success", message: "1Not implemented" }) })
    .post(
        expressRoute(
            async req => {
                const response = await ResponseController.read(req.params.responseID)
                const user = await userController.read(response.user);
                req.user = user
                ResponseController.request = req;
                const data = await ResponseController.update(req.params.responseID, { forReview: req.body.data });
                let translatedData = translate(response.survey.slug, req.body.data);
                let security = ["age", "gender"]
                for (let i = 0; i < security.length; i++) {
                    const element = security[i];
                    if (!(element in translatedData)) continue;
                    if (element === "age") {
                        let age = translatedData["age"];
                        if (typeof age === "number" && age.diff(user?.age?.years ?? 0) < 1) continue;
                        if (typeof age === "string") continue; // Shall be thought latter
                    }
                    if (translatedData[element] === user[element]) throw new Error(element)
                }


                answerController.request = req

                let answers = Object.entries(translatedData).map(tmp => {
                    return {
                        user: response.user.toString(),
                        question: tmp[0],
                        answer: tmp[1]
                    }
                })
                await answerController.save(answers)

                return { message: "Status updated", data }
            },
            ResponseController
        )
    )
    .put(async (req, res) => { return res.status(502).json({ status: "success", message: "3Not implemented" }) })
    .patch(async (req, res) => { return res.status(502).json({ status: "success", message: "4Not implemented" }) })
    .delete(async (req, res) => { return res.status(502).json({ status: "success", message: "5Not implemented" }) })
    .copy(async (req, res) => { return res.status(502).json({ status: "success", message: "Not implemented" }) })

export default router;

