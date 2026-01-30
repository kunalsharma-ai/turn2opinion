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
                // Read all entries matching filter            
                // console.log({
                //     user:req.user
                // })
                optionController.request = req;
                let message = "";
                let questions = Mutate(await questionController.list({ ...req.body, category: req.user.category }))
                let data = [];
                for (let index = 0; index < questions.length; index++) {
                    const que = questions[index];                    
                    let options = Mutate(await optionController.list({ question: que.name })).map(opt => ({
                            label: opt.label,
                            value: opt.value.trim(),
                            parentValue: [null, undefined, ""].includes(que.parent) ? [] : opt.parentValue
                        }))
                    data.push({
                        category: req.user.category,
                        type: que.type,
                        name: que.name,
                        size: que.size,
                        label: (que.type === "note") ? que.description : que.label,
                        parent: [null, undefined, ""].includes(que.parent) ? undefined : que.parent,
                        required: que.isRequired ?? false,
                        disabled: !(que.isEditable ?? true),
                        options
                    })
                }
                /*
                // console.log(options.length)
                let data = questions.map(que => {
                    return {
                        category: req.user.category,
                        type: que.type,
                        name: que.name,
                        size: que.size,
                        label: (que.type === "note") ? que.description : que.label,
                        parent: [null, undefined, ""].includes(que.parent) ? undefined : que.parent,
                        required: que.isRequired ?? false,
                        disabled: !(que.isEditable ?? true),
                        options: options.filter(opt => opt.question === que.name).map(opt => ({
                            label: opt.label,
                            value: opt.value.trim(),
                            parentValue: [null, undefined, ""].includes(que.parent) ? [] : opt.parentValue
                        }))
                    }
                })
                    //*/
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