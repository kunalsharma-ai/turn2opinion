import { CrudController, Mutate } from "../utils/index.js";
import {
    Batch as batchModel
} from "../model/index.js";

class Batch extends CrudController {
}

export default new Batch(batchModel)