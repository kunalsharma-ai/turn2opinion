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
import { limit } from "../../utils/security.js";

const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// The link e-mailed by /me/change-email: {user, otp, email}. A sign-in token (it has _id) is never one.
function changeToken(raw) {
    const info = Token.verify(String(raw || ""));
    if (!info || info._id || !/^[a-f0-9]{24}$/i.test(String(info.user || "")) || !MAIL.test(String(info.email || "")))
        throw new Error("This link is not valid. Please start the change of e-mail again.");
    return info;
}
const valid = (otp) => Boolean(otp) && !otp.expired;


const router = express.Router();
router
    .route("/")
    .post(limit(10, 15), expressRoute(
        async req => {
            let info = changeToken(req.body?.token);
            const data = await userController.read(info.user);
            let message = `Please check your email ${info.email} to find a verification link on it and click to confirm the change of email address.`
            let status = await otpController.verify(info.user, "email", req.origin, info.otp);
            if (!valid(status)) throw new Error("This link has expired. Please start the change of e-mail again.");
            if ((await userController.list({ mail: info.email })).length) throw new Error("This e-mail address is already used by another account.");
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
                `${process.env.PROJECT_NAME}: Update E-Mail Address`,
                mailer.data
            )
            return { message, data };
        },
        userController
    ))
    .patch(limit(10, 15), expressRoute(
        async req => {
            let [message, data] = ["Your email has been successfully updated. Now you can login with your new email id.", []]
            let info = changeToken(req.body?.token);
            let status = await otpController.verify(info.user, "email", req.origin, info.otp);
            if (!valid(status)) throw new Error("This link has expired. Please start the change of e-mail again.");
            if ((await userController.list({ mail: info.email })).length) throw new Error("This e-mail address is already used by another account.");
            await userController.update(info.user, {
                mail: info.email
            })
            await status.deleteOne(); // one use only
            return { message, data };
        },
        userController
    ))



export default router;