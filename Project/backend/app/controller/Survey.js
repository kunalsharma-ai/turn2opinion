import fs from "fs"

import { CrudController, fsLogger, Mutate } from "../utils/index.js";
import { Survey as modelSurvey } from "../model/index.js";

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
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        return await super.list(query, populateFields, sort, project)
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
        const category = this.request.user.category;
        if (!category) throw new Error("Invalid request")
        let temp = Mutate(await this.list({ slug, category }));
        if (temp.length !== 1)
            throw new Error("Invalid request")
        return temp[0];
    }
}


export default new Survey(modelSurvey)