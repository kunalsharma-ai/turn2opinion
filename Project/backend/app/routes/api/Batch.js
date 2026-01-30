import express from "express";
import { Batch as Controller } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, Mutate }from "../../utils/index.js"

const router = express.Router();

router
    .route("/")
    .get(expressRoute(
        async req => {
            let data = await Controller.list();
            let message = "";

            return { message, data }
        },
        Controller
    ))
    .post(expressRoute(
        async req => {
            let data = await Controller.list(req.body);
            let message = "";

            return { message, data }
        },
        Controller
    ))
    .put(expressRoute(
        async req => {
            let data = await Controller.create(req.body);
            let message = "Scheduled successfully";

            return { message, data }
        },
        Controller
    ))
router
    .route("/:id")
    .get(expressRoute(
        async req => {
            let data = await Controller.read(req.params.id)
            let message = "";

            return { message, data }
        },
        Controller
    ))
    .put(expressRoute(
        async req => {
            let data = await Controller.update(req.params.id,req.body);
            let message = "";

            return { message, data }
        },
        Controller
    ))
    .delete(expressRoute(
        async req => {
            let data = await Controller.delete(req.params.id);
            let message = "";

            return { message, data }
        },
        Controller
    ))
    
export default router;