import express from "express";
import { Category as categoryController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger } from "../../utils/index.js"

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";
            let data = await categoryController.list()
            return { message, data };
        },
        categoryController
    ))
    .post(expressRoute(
        async req => {
            // Read all entries matching filter
            let message = "";
            let data = await categoryController.list(req.body)
            return { message, data };
        },
        categoryController
    ))
    .put(expressRoute(
        async req => {
            // Create new entry
            let message = "";
            let data = await categoryController.create(req.body);
            return { message, data };
        },
        categoryController
    ))
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            // read single entry
            let message = "";
            let data = await categoryController.read(req.params.id);
            return { message, data };
        },
        categoryController
    ))
    .put(expressRoute(
        async req => {
            // update single entry
            let message = "";
            let data = await categoryController.update(req.params.id, req.body)
            return { message, data };
        },
        categoryController
    ))
    .delete(expressRoute(
        async req => {
            // delete single entry
            let message = "";
            let data = await categoryController.delete(req.params.id)
            return { message, data };
        },
        categoryController
    ))
export default router;