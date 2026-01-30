import fs from "fs"

import { CrudController, fsLogger, Mutate } from "../utils/index.js";
import { Question as modelQuestion } from "../model/index.js";

class Question extends CrudController {
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
            instance.request={
            origin:"mho.sampledge.duckdns.org",
            user:{
            }
        }
    
        // this.loadDefaults();
        return instance;
    }
    async loadDefaults() {
        let data = JSON.parse(fs.readFileSync("/data/caregiver-que.json", "utf-8"));
        for (let index = 0; index < data.length; index++) {
            console.log("Loading Question " + (index + 1));
            await super.create(data[index]);
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
}


export default new Question(modelQuestion)