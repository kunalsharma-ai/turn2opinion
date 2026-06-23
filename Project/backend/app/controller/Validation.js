import { CrudController } from "express-web-tools";
import { Validation as validationModel } from "../model/index.js";

class Validation extends CrudController {
    fixUserIssue() {
        super.request = {
            ...this.request,
            user: {
                _id: null
            }
        }
    }
    async read(question) {
        let data=await super.findOne({ question })
        console.log(data)
        return data;
    }
    async filterAndRead(question, query) {
        return await super.findOne({ question, ...query })
    }
}

export default new Validation(validationModel);