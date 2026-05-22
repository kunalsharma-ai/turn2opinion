import express from "express";
import ansRouter from "./api/Answers.js";
import authRouter from "./api/Auth.js";
import batchRouter from "./api/Batch.js"
import categoryRouter from "./api/Category.js";
import feasibilityRouter from "./api/Feasibility.js";
import forgotPassword from "./api/forgotPassword.js";
import questionRouter from "./api/Question.js";
import optionRouter from "./api/Option.js";
import optionsRouter from "./api/options.js";
import surveyRouter from "./api/Survey.js";
import profileRouter from "./api/Profile.js";
import userRouter from "./api/User.js";
import projectRouter from "./api/ProjectLaunch.js";
import supportRouter from "./api/Support.js";
import meResponse from "./api/Response.js";
import llmRouter from "./api/llm.js"

import { isAuthenticated } from "../utils/index.js";

import meRouter from "./api/Me.js";
import changeEmail from "./api/changeEmail.js"
const router = express.Router();
router
    .use("/api/v1/llm", llmRouter)
    .use("/api/v1/auth",authRouter)
    .use("/api/v1/answers", ansRouter)
    .use("/api/v1/category", categoryRouter)
    .use("/api/v1/survey", surveyRouter)
    .use("/api/v1/question", questionRouter)
    .use("/api/v1/option", optionRouter)
    .use("/api/v1/options", optionsRouter)
    .use("/api/v1/user", (req, res, next) => {
        console.log("user route called");
        next()
    }, userRouter)
    .use("/api/v1/profile", profileRouter)
    .use("/api/v1/forgot-password", forgotPassword)
    .use("/api/v1/change-email", changeEmail)
    .use("/api/v1/feasibility", feasibilityRouter)
    .use("/api/v1/project-dev", projectRouter)
    .use("/api/v1/me", isAuthenticated, meRouter)
    .use("/api/v1/response", isAuthenticated, meResponse)
    .use("/api/v1/support", isAuthenticated, supportRouter)
    .use("/api/v1/project", isAuthenticated, projectRouter)
    .use("/api/v1/batch", isAuthenticated, batchRouter)


// router
//     .use("/api/v1/respondent",respondentRouter)
export default router;