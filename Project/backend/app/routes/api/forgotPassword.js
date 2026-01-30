import express from "express";
import { User as userController, OTP as otpController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, getMailer, sendMail, Token } from "../../utils/index.js"

const router = express.Router();
router
    .route("/")
    .post(expressRoute(
        async req => {
            let message = "A password reset link has been sent to your mailbox, Please check your email and proceed.";
            let user = await userController.list({ mail: req.body.user });
            if (user.length !== 1)
                throw new Error("You have not registered with us with this email id. Please signup, or try some other email id.")
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
                "My Frequent Rewards: Forgot Password",
                mailer.data
            )
                //*/
            return { message, data: [] };
        },
        userController
    ))
    .patch(expressRoute(
        async req=>{

        },
        userController
    ))
// Generate and Send OTP
// Verify OTP
// Set Password
export default router;