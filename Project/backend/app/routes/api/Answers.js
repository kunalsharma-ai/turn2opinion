import express from "express";
import { Answer as answerController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, Mutate } from "../../utils/index.js"
import { requireAdmin } from "../../utils/access.js";

const router = express.Router();
router
    .route("/")
    // every member's answers keyed by member id: admins only (was open to anyone)
    .get(requireAdmin, expressRoute(
        async req => {
            let data = await answerController.summarize();
            let message = "";

            return { message, data }
        },
        answerController
    ))
export default router;