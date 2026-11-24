import express from "express";
import { User as userController, OTP as otpController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, getMailer, sendMail, Token } from "../../utils/index.js"
import { limit } from "../../utils/security.js";
import { lockedFor, fail, norm } from "../../utils/throttle.js";

const router = express.Router();
router
    .route("/")
    .post(limit(10, 15), expressRoute(
        async req => {
            // Same answer whether or not the e-mail is registered, so the form cannot be used to find out who is a member.
            let message = "If this e-mail is registered with us, a password reset link is on its way. Please check your mailbox.";
            if (typeof req.body?.user !== "string" || !req.body.user.trim()) throw new Error("Please enter your e-mail address.");
            // at most 3 reset e-mails an hour to one address, so the form can't be used to flood someone's inbox
            const key = `reset:${req.origin}:${norm(req.body.user)}`;
            if (await lockedFor(key)) return { message, data: [] };
            await fail(key, { max: 3, windowMin: 60, lockMin: 60 });
            let user = await userController.list({ mail: req.body.user.trim() });
            if (user.length !== 1) return { message, data: [] };
            let otp = await otpController.generate(
                user[0]._id,
                "email",
                req.origin,
                1 * 24 * 60 * 60 * 1000
            );
            let mailer = await getMailer(
                "register",
                "forgot-password",
                {
                    user: user[0],
                    otp
                }
            )
            // /*
            await sendMail(
                { origin: req.origin, "content-type": "application/json" },
                user[0].mail,
                `${process.env.PROJECT_NAME}: Forgot Password`,
                mailer.data
            )
            //*/
            return { message, data: [] };
        },
        userController
    ))
    .patch(expressRoute(
        async req => {

        },
        userController
    ))
// Generate and Send OTP
// Verify OTP
// Set Password
export default router;