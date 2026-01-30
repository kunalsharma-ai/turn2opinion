import express from "express";
import { User as userController, OTP as otpController } from "../../controller/index.js";
import {
    Mutate,
    expressRoute,
    expressView,
    isAuthenticated,
    fsLogger,
    getMailer,
    sendMail,
    Token
} from "../../utils/index.js"


const router = express.Router();
router
    .route("/")
    .post(expressRoute(
        async req => {
            let info = Token.verify(req.body.token);
            const data = await userController.read(info.user);
            let message=`Please check your email ${info.email} to find a verification link on it and click to confirm the change of email address.`
            let status = await otpController.verify(info.user, "email", req.origin, info.otp);
            let otp = await otpController.generate(
                info.user,
                "email",
                req.origin,
                1 * 24 * 60 * 60 * 1000
            );
            let token = Token.generate({
                user: info.user,
                otp: otp.code,
                email: info.email
            }, "24h")
            let mailer = await getMailer(
                "register",
                "change-email-verify",
                {
                    user: data,
                    token,
                    email: info.email
                }
            )
            await sendMail(
                { origin: req.origin, "content-type": "application/json" },
                info.email,
                "My Frequent Rewards: Update E-Mail Address",
                mailer.data
            )
            return { message, data };
        },
        userController
    ))
    .patch(expressRoute(
        async req => {
            let [message, data] = ["Your email has been successfully updated. Now you can login with your new email id.", []]
            let info = Token.verify(req.body.token);
            let status = await otpController.verify(info.user, "email", req.origin, info.otp);
            if (status) await userController.update(info.user, {
                mail: info.email
            })
            return { message, data };
        },
        userController
    ))



export default router;