import fs from "fs"

import { CrudController, fsLogger, Mutate } from "../utils/index.js";
import { Survey as modelSurvey, User as userModel, Response as responseModel, Answers as answerModel } from "../model/index.js";

const norm = (v) => String(v ?? "").trim().toLowerCase();
const qualifies = (filters, answers) =>
    Object.entries(filters || {}).every(([question, allowed]) => {
        const allow = [].concat(allowed).map(norm);
        if (!allow.length) return true;
        const mine = [].concat(answers?.[question] ?? []).map(norm);
        return mine.some((a) => allow.includes(a));
    });

class Survey extends CrudController {
    fixUserIssue() {
        super.request = {
            ...this.request,
            user: {
                _id: null
            }
        }
    }
    constructor(model) {
        let instance = super(model)
        instance.request = {
            origin: "mho.sampledge.duckdns.org",
            user: {
            }
        }
        this.loadDefaults();
        return instance;
    }
    async loadDefaults() {
        return;
        let data = JSON.parse(fs.readFileSync("/data/survey.json", "utf-8"));
        for (let index = 0; index < data.length; index++) {
            const survey = await super.create(data[index]);
        }
    }
    async list(query = {}, populateFields = null, sort = {}, project = "+isActive +sortOrder") {
        return await super.list(query, populateFields, sort, project);
    }

    async applyEligibility(surveys, user) {
        if (!user?._id) return surveys;
        if (!Array.isArray(surveys) || surveys.length === 0) return surveys;

        const rows = await modelSurvey
            .find({ _id: { $in: surveys.map((s) => s._id) } })
            .select("filters")
            .lean();
        const filtersById = new Map(rows.map((r) => [String(r._id), r.filters || {}]));

        const questions = [
            ...new Set([...filtersById.values()].flatMap((f) => Object.keys(f))),
        ];
        if (questions.length === 0) return surveys;

        const answerRows = await answerModel
            .find({ user: String(user._id), question: { $in: questions } })
            .select("+answer")
            .lean();
        const answers = {};
        answerRows.forEach((r) => {
            answers[r.question] = [].concat(r.answer ?? []);
        });

        return surveys.filter((s) =>
            qualifies(filtersById.get(String(s._id)), answers),
        );
    }

    async create(data) {
        let item = await super.list(data);
        if (item.length !== 0) throw new Error(`Survey ${data.name} already exists`);
        this.fixUserIssue();
        return await super.create(data)
    }
    async update(id, data) {
        this.fixUserIssue();
        return await super.update(id, data);
    }
    async read(id) {
        return await super.read(id)
    }
    async delete(id) {
        this.fixUserIssue();
        return await super.delete(id);
    }
    async getQuestions(slug) {
        let survey = await this.openBySlug(slug)
        let questions = survey.pages.map(page => {
            page.shift();
            return page;
        })
        return questions.flat();
    }

    async openBySlug(slug) {
        const user = this.request.user;
        const category = user.category;
        if (!category) throw new Error("Invalid request")
        let temp = Mutate(await this.list({ slug, category }));
        if (temp.length !== 1)
            throw new Error("Invalid request")
        const allowed = await this.applyEligibility(temp, user);
        if (allowed.length !== 1)
            throw new Error("Invalid request")
        return temp[0];
    }
    async bulkInvite(id, filters) {

        const survey = await super.read(id);
        if (!survey) throw new Error("Survey not found");

        if ("autoInvite" in filters) {
            survey.autoInvite = Boolean(filters.autoInvite);
            await survey.save();
        }

        const query = {
            ...this.commonFilters
        };

        if (!filters.all) {
            query.category = survey.category;
        }

        const users = await userModel.find(query);
        const invites = users.map(user => ({
            user: user._id,
            survey: {
                name: survey.name,
                slug: survey.slug
            },
            status: "invited",
            source: survey.source,
            points: survey.points,
            ...this.commonFilters
        }));

        try {
            await responseModel.insertMany(invites, { ordered: false });
        } catch (e) {
            fsLogger.Log("Bulk invite partial completion", e.message);
        }
        return { count: users.length };
    }
    async receive(data) {
        // check if survey exists
        let temp = await super.findOne({ name: data.name })
        if (temp) {
            console.log(temp);
            throw new Error("Survey already launched through this panel");
        }
        let survey = await super.create(data);
        return survey;
    }
}

const surveyController = new Survey(modelSurvey);

import("../controller/Response.js")
    .then(({ default: responseController }) => {
        if (!responseController || responseController.__surveyFilterPatched) return;
        responseController.__surveyFilterPatched = true;

        const originalMySurveys = responseController.mySurveys;
        responseController.mySurveys = async function (...args) {
            const user = this.request?.user;   // await se pehle
            const list = await originalMySurveys.apply(this, args);
            return surveyController.applyEligibility(list, user);
        };

        responseController.mySurveyCounts = async function () {
            const user = this.request.user;    // await se pehle
            const taken = Mutate(await responseModel.find({
                user: user._id,
                ...this.commonFilters
            }, { "slug": "$survey.slug" })).map(r => r.slug);

            let surveys = Mutate(await modelSurvey.aggregate([
                {
                    $match: {
                        ...this.commonFilters,
                        category: user.category,
                        slug: { $nin: taken }
                    }
                }
            ]));
            surveys = await surveyController.applyEligibility(surveys, user);

            if (!surveys.length) return [];
            const countBy = (src) => surveys.filter((s) => s.source === src).length;
            return {
                _id: user.category,
                count: surveys.length,
                internal: countBy("internal"),
                external: countBy("external"),
                sampledge: countBy("sampledge"),
            };
        };
        console.log("survey filter patch applied");
    })
    .catch((err) => console.error("survey filter patch FAILED:", err));

export default surveyController