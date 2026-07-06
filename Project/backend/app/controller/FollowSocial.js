import { CrudController } from "express-web-tools";
import { FollowSocial as followSocialModel } from "../model/index.js";

class FollowSocial extends CrudController {

}

export default new FollowSocial(followSocialModel);