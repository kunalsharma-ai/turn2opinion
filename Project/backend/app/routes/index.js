import express from "express";
import alertsRoute from "./api/Alerts.js";
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
import integrationRoutes from "./api/integrationRoutes.js";
import validationRoutes from "./api/Validation.js";
import socialsRouter from "./api/Socials.js";
import cpiRouter from "./api/CPI.js";
import { isAuthenticated } from "../utils/index.js";
import followSocialRouter from "./api/FollowSocial.js";
import testimonialRouter from "./api/Testimonials.js";
import meRouter from "./api/Me.js";
import changeEmail from "./api/changeEmail.js"
import changesRouter from "./api/Changes.js";
import { requireAdmin } from "../utils/access.js";
import { bindRequest } from "../utils/requestContext.js";
import { securityHeaders, sanitizeInput } from "../utils/security.js";
const router = express.Router();
router
    // every answer gets the browser security headers; member routes run in their own request context (so two
    // requests can't swap brands or members while they wait for the database) and never see code-running Mongo
    // operators
    .use(securityHeaders)
    .use("/api/v1", bindRequest, sanitizeInput)
    .use("/api/v1/testimonial", testimonialRouter)
    .use("/api/v1/llm", llmRouter)
    .use("/api/v1/newsletter", (r, s) => {
        console.log(r);
        const { body, files } = r;
        // console.log({ body, files })
        return s.json({
            status: "error",
            message: "under development"
        })
    })
    .use("/api/v1/alerts", alertsRoute)
    .use("/api/v1/auth", authRouter)
    .use("/api/v1/answers", ansRouter)
    .use("/api/v1/category", categoryRouter)
    .use("/api/v1/survey", surveyRouter)
    .use("/api/v1/question", questionRouter)
    .use("/api/v1/option", optionRouter)
    .use("/api/v1/options", optionsRouter)
    .use("/api/v1/validation", validationRoutes)
    .use("/api/v1/user", userRouter)
    .use("/api/v1/profile", profileRouter)
    .use("/api/v1/forgot-password", forgotPassword)
    .use("/api/v1/change-email", changeEmail)
    .use("/api/v1/feasibility", feasibilityRouter)
    .use("/api/v1/filtered-users", feasibilityRouter)
    .use("/api/v1/cpi", cpiRouter)
    // projects, scheduled e-mail batches and the survey-tool answer import are admin tools (project-dev and
    // integration had no sign-in at all; any member could create projects or schedule e-mails from the brand)
    .use("/api/v1/project-dev", requireAdmin, projectRouter)
    .use("/api/v1/me", isAuthenticated, meRouter)
    .use("/api/v1/response", isAuthenticated, meResponse)
    .use("/api/v1/support", isAuthenticated, supportRouter)
    .use("/api/v1/project", requireAdmin, projectRouter)
    .use("/api/v1/batch", requireAdmin, batchRouter)
    .use("/api/v1/integration", requireAdmin, integrationRoutes)
    .use("/api/v1/changes", changesRouter)
    .use("/api/v1/socials", socialsRouter)
    .use("/api/v1/follow-social", isAuthenticated, followSocialRouter)
// router
//     .use("/api/v1/respondent",respondentRouter)
export default router;



function responseTimeout(timeout = 30_000) {
    return (req, res, next) => {
        console.log("Setting up timer for 30 sec")
        let finished = false;

        const clock = setInterval(() => {
            console.log((new Date).toISOString());
        }, 1000)
        const timer = setTimeout(() => {
            if (finished) return;
            console.log("stopping clock")
            clearInterval(clock);
            finished = true;

            const error = new Error(
                `Request timeout after ${timeout / 1000} seconds`
            );
            console.log("Timeout")
            error.status = 504;
            error.code = 'REQUEST_TIMEOUT';

            next(error);
        }, timeout);

        const cleanup = () => {
            if (finished) return;
            console.log("cleaing clock")
            clearInterval(clock)
            finished = true;
            clearTimeout(timer);
        };

        res.once('finish', cleanup);
        res.once('close', cleanup);

        next();
    };
}