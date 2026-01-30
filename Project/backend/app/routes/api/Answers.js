import express from "express";
import { Answer as answerController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, Mutate } from "../../utils/index.js"

const router = express.Router();
router
    .route("/")
    .get(expressRoute(
        async req => {
            let data = await answerController.summarize();
            let message = "";

            return { message, data }
        },
        answerController
    ))
export default router;