import { CrudController, Mutate } from "express-web-tools"
import { Alerts as modelAlerts } from "../model/index.js";

class Alerts extends CrudController {
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        return super.list({
            ...query,
            user: this.request.user._id
        }, populateFields, sort, project)
    }
}
export default new Alerts(modelAlerts)