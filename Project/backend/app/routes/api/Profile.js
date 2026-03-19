import express from "express";
import { Profile as profileController } from "../../controller/index.js";
import { Mutate, expressRoute, expressView, isAuthenticated, fsLogger, getMailer, sendMail, Token } from "../../utils/index.js"

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";
            let data = await profileController.list()
            return { message, data };
        },
        profileController
    ))
    
    .post(isAuthenticated, expressRoute(
        async req => {
            // Read all entries matching filter
            let message = "";
            let status = await profileController.status();
            let data = Mutate(await profileController.list(req.body,null,{sortOrder:1},"+sortOrder"))
            for (let index = 0; index < data.length; index++) {
                let profile = data[index];
                profile["status"] = status[profile.slug] ?? -1;
            }
            // throw new Error("it works")
            return { message, data };
        },
        profileController
    ))
    .put(isAuthenticated, expressRoute(
        async req => {
            let data = await profileController.create(req.body)
            return {
                message: "It works well",
                data
            }
        },
        profileController
    ))
    .patch(expressRoute(
        async req => {
            return {
                message: "It works well",
                data: []
            }
        },
        profileController
    ))


router
    .route('/:id')
    .get(isAuthenticated, expressRoute(
        async req => {
            // read single entry
            let message = "";
            let data = await profileController.read(req.params.id)
            return { message, data };
        },
        profileController
    ))
    .post(expressRoute(
        async req => {
            // read single entry
            let message = ""
            let otp = []
            return { message, data: {} };
        },
        profileController
    ))
    .put(isAuthenticated, expressRoute(
        async req => {
            // update single entry
            let message = "Updated";
            let data = await profileController.update(req.params.id, req.body)
            return { message, data };
        },
        profileController
    ))
    .patch(expressRoute(
        async req => {
            // update single entry
            let message = "";
            let data = []
            return { message, data };
        },
        profileController
    ))
    .delete(expressRoute(
        async req => {
            // delete single entry
            let message = "";
            let data = await profileController.delete(req.params.id)
            return { message, data };
        },
        profileController
    ))
export default router;