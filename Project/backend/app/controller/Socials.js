import {CrudController} from "express-web-tools";
import {Socials as socialsModel} from "../model/index.js";

class Socials extends CrudController {

}

export default new Socials(socialsModel);
