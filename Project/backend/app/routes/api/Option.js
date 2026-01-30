import express from "express";
import { Option as optionController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger } from "../../utils/index.js"

const router = express.Router();
router
    .route('/')
    .get(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .post(
        isAuthenticated,
        expressRoute(
            async req => {
                // Read all entries matching filter
                let message = "";
                let filters=Object.fromEntries(Object.entries({ question: req.params.parent, ...req.body }).map(val=>{
                    if(val[1] instanceof Array)
                        return [val[0],{$in:val[1]}]
                    return val;
                }))
                
                let data = await optionController.list(filters)
                return { message, data };
            },
            optionController
        )
    )
    .put(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
router
    .route('/:parent')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";
            let data = await optionController.list({ question: req.params.parent })
            console.log(data)
            return { message, data };
        },
        optionController
    ))
    .post(expressRoute(
        async req => {
            // Read all entries matching filter
            let message = "";
            let data = await optionController.list({ question: req.params.parent, ...req.body })
            return { message, data };
        },
        optionController
    ))
    .put(expressRoute(
        async req => {
            // Create new entry
            let message = "";
            let data = await optionController.create({ question: req.params.parent, ...req.body })
            console.log(data)
            return { message, data };
        },
        optionController
    ))
router
    .route('/:parent/:id')
    .get(expressRoute(
        async req => {
            // read single entry
            let message = "";
            let data = await optionController.read(req.params.id);
            return { message, data };
        },
        optionController
    ))
    .put(expressRoute(
        async req => {
            // update single entry
            let message = "";
            let data = await optionController.update(req.params.id, req.body)
            return { message, data };
        },
        optionController
    ))
    .delete(expressRoute(
        async req => {
            // delete single entry
            let message = "";
            let data = await optionController.delete(req.params.id)
            return { message, data };
        },
        optionController
    ))
export default router;