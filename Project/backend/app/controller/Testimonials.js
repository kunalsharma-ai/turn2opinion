import { CrudController, Mutate, API } from "express-web-tools";
import { Testimonial as modelTestimonail } from "../model/index.js";
import fs from "fs";

function loadJson(file) {
    if (fs.existsSync(file))
        return JSON.parse(
            fs.readFileSync(file, "utf-8")
        )
    return []
}
const temp = loadJson("/data/testimonials.json")
class Testimonial extends CrudController {
    async create(data) {
        super.request = this.request;
        return await super.create({
            ...data,
            reviewer: this.request.user._id,
            isActive: false
        })
    }

    async list(query = {}, populateFields = "reviewer", sort = {}, project = null) {

        let testim = (await super.list(query, populateFields, sort, project)).map(v => {
            return {
                ...v, reviewer: {
                    name: v.reviewer.name,
                    country: v.reviewer.country,
                    address: v.reviewer.address,
                    category: v.reviewer.category
                }
            }
        })
        return [...testim, ...temp]
    }
}

export default new Testimonial(modelTestimonail);