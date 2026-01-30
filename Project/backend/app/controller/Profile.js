import { CrudController } from "../utils/index.js";
import { Profile as profileModel } from "../model/index.js";

class ProfileController extends CrudController {
  async list(query) {
    console.log(query);
    console.log(await super.list());
    return await super.list(query);
  }
}

export default new ProfileController(profileModel);
