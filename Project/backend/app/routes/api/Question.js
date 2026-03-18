import express from "express";
import { Question as questionController, Option as optionController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, Mutate } from "../../utils/index.js"

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";

            let optionStatus = await optionController.summary();
            let data = Mutate(await questionController.list()).map(elm => {
                return {
                    ...elm,
                    count: optionStatus[elm.name] ?? 0
                }
            })
            return { message, data };
        },
        questionController
    ))
    .post(
        isAuthenticated,
        expressRoute(
            async req => {
                optionController.request = req;
                let message = "";
                let data = Mutate(await questionController.list(
                    { ...req.body, category: req.user.category }
                ))

                return { message, data };
            },
            questionController
        ))
    .put(expressRoute(
        async req => {
            // Create new entry
            let message = "";
            let data = await questionController.create(req.body);
            return { message, data };
        },
        questionController
    ))
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            // read single entry
            let message = "";
            let data = await questionController.read(req.params.id);
            return { message, data };
        },
        questionController
    ))
    .put(expressRoute(
        async req => {
            // update single entry
            let message = "";
            let data = await questionController.update(req.params.id, req.body)
            return { message, data };
        },
        questionController
    ))
    .patch(expressRoute(
        async req => {
            // update single entry
            let message = "";
            let data = await questionController.deleteParent(req.params.id)
            return { message, data };
        },
        questionController
    ))
    .delete(expressRoute(
        async req => {
            // delete single entry
            let message = "";
            let data = await questionController.delete(req.params.id)
            return { message, data };
        },
        questionController
    ))
export default router;