import express from "express";
import {
    Response as responseController,
    Survey as surveyController,
    User as userController
} from "../../controller/index.js";
import { Mutate, expressRoute, expressView, isAuthenticated, fsLogger } from "../../utils/index.js"

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";
            let data = await surveyController.list()
            return { message, data };
        },
        surveyController
    ))
    .post(isAuthenticated, expressRoute(
        async req => {
            let message = "";
            let data = Mutate(await surveyController.list(req.body))
            return { message, data }
        },
        surveyController
    ))
    .put(expressRoute(
        async req => {
            // Create new entry
            let message = "Survey created";
            let data = await surveyController.create(req.body);
            return { message, data };
        },
        surveyController
    ))
router
    .route("/responses/:slug")
    .get(expressRoute(
        async req => {
            let data = await responseController.list({
                "survey.slug": req.params.slug
            })
            return { message: "", data }
        },
        responseController
    ))
router
    .route("/response")
    .patch(expressRoute(
        async req => {
            responseController.request={
                user:{}
            }
            let data = await responseController.read(req.body.sid);
            if(!data)throw new Error("Invalid request");
            if(data.status !== req.body.status && ["invited","dropout",""].includes(data.status)){
                await responseController.update(req.body.sid,{
                   status:req.body.status,
                   "timeline.end":new Date()
               });
            }
            data = await responseController.read(req.body.sid);
            return { message: "", data }
        },
        responseController
    ))
router
    .route('/:id/invite')
    .post(isAuthenticated, expressRoute(
        async req => {
            const user = await userController.read(req.user._id);
            if (!["admin", "root"].includes(user.role)) {
                throw new Error("Access denied: Admin only");
            }
            let message = "Invitations sent";
            let data = await surveyController.bulkInvite(req.params.id, req.body);
            return { message, data };
        },
        surveyController
    ))
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            // read single entry
            let message = "";
            let data = await surveyController.read(req.params.id);
            return { message, data };
        },
        surveyController
    ))
    .put(expressRoute(
        async req => {
            // update single entry
            let message = "Survey updated";
            let data = await surveyController.update(req.params.id, req.body)
            return { message, data };
        },
        surveyController
    ))
    .delete(expressRoute(
        async req => {
            // delete single entry
            let message = "Survey Deleted";
            let data = await surveyController.delete(req.params.id)
            return { message, data };
        },
        surveyController
    ))
export default router;