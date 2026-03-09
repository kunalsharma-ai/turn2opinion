
Date.prototype.isMinor = function (cn = "IN") {
    let today = new Date();
    let age = (today - this) / (365.25 * 24 * 3600 * 1000);
    return age < 18
}

import express from "express";
import {
    User as userController,
    OTP as otpController,
    Answer as answerController,
} from "../../controller/index.js";
import { Mutate,expressRoute, expressView, isAuthenticated, fsLogger, getMailer, sendMail, Token } from "../../utils/index.js"

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";
            let data = await userController.list()
            return { message, data };
        },
        userController
    ))
    .post(expressRoute(
        async req => {
            // Read all entries matching filter
            let message = "";
            let data = await userController.list(req.body, null, {}, "+role")
            return { message, data };
        },
        userController
    ))
    .put(expressRoute(
        async req => {
            const userInfo = req.body;
            const unwantedCols = ["password", "fullName", "age"];
            for (let index = 0; index < unwantedCols.length; index++) {
                const col = unwantedCols[index];
                if (col in userInfo) delete (userInfo[col]);
            }
            let message = "";
            // console.log({ userInfo })
            // throw new Error("abhi testing mode me hai");
            let data = await userController.create(userInfo);
            // generate otp
            const isMinor = (new Date(userInfo.dob)).isMinor();

            if (isMinor) {
                let otp = await otpController.generate(
                    data._id,
                    "parent-email",
                    req.origin,
                    7 * 24 * 60 * 60 * 1000
                )
                let mailer = await getMailer(
                    "register",
                    "parent-consent",
                    {
                        user: data,
                        otp
                    }
                )
                console.log({
                    emailStatus: await sendMail(
                        { origin: req.origin, "content-type": "application/json" },
                        data?.parent?.email,
                        `My Frequent Rewards: Registration Consent for ${data.name.first}`,
                        mailer.data
                    )
                })
                return { message: "Please ask your parent to check their inbox and share consent for you to join this panel.", data: null };
            }
            let otp = await otpController.generate(
                data._id,
                "email",
                req.origin,
                1 * 24 * 60 * 60 * 1000
            );

            let mailer = await getMailer(
                "register",
                "respondent",
                {
                    user: data,
                    otp
                }
            )
            console.log({
                emailStatus: await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    data.mail,
                    "My Frequent Rewards: Registration",
                    mailer.data
                )
            })

            return { message, data: otp };
        },
        userController
    ))
    .patch(expressRoute(
        async req => {
            if (!req?.body?.password || !req?.body?.confirmPassword || req?.body?.password !== req?.body?.confirmPassword) throw new Error("Passwords not matching.")
            const message = "Your password is created. Go to login page and proceed.";
            let otp = await otpController.verify(req.body.userID, "email", req.origin, req.body.emailOTP);
            if (!otp) throw new Error("Link Expired. Unable to set password.");
            let status = await userController.setPassword(req.body.userID, req.body.password)
            if (!status) throw new Error("Something went wrong. Please contact support for more details");
            await otp.remove();
            return { message, data: [] };
        },
        userController
    ))
router
    .get("/summarize", expressRoute(
        async req => {
            const message = "";
            let data = await userController.summary();
            return { message, data }
        },
        userController
    ))
    .post("/login", expressRoute(
        async req => {
            const message = "Login successful";
            let data = [];
            const user = await userController.login(req.body);
            const token = Token.generate({
                _id: user._id,
                category: user.category,
                email: user.mail,
                phone: user.phone,
                name: user.name,
                origin: user.origin,
                role: user.role
            })
            return { message, data: [], token }
        },
        userController
    ))
    .post("/autologin", expressRoute(
        async req => {
            const message = "Login successful";
            let token;
            const user = await userController.read(req.body._id);
            if (!user) throw new Error("Invalid request");
            token = Token.generate({
                _id: user._id,
                category: user.category,
                email: user.email,
                phone: user.phone,
                name: user.name,
                origin: user.origin
            })
            // throw new Error("Abhi login hold pe hai")
            return { message, data: [], token }
        },
        userController
    ))
    .delete(`/terms`, expressRoute(
        async req => {
            const message = "Terms reset";
            let token;
            const user = await userController.update(req.body._id, { terms: [] });
            if (!user) throw new Error("Invalid request");
            return { message, data: [], token }
        },
        userController
    ))
    .post("/refresh", expressRoute(
        async req => {
            const message = "Refreshed Respondent, All Records other than registration details removed.";
            const data = await userController.refreshUser(req.body);
            return { message, data }
        },
        userController
    ))
    .post(`/resend`, expressRoute(
        async req => {
            // update single entry
            let message = req.body.action;
            let data = await userController.findOne({ mail: req.body.mail, origin: req.origin });

            // if (req.body.action === "resend-otp") {
            let otp = await otpController.generate(
                data._id,
                "email",
                req.origin,
                1 * 24 * 60 * 60 * 1000
            );
            let mailer = await getMailer(
                "register",
                "respondent",
                {
                    user: data,
                    otp
                }
            )
            console.log({
                emailStatus: await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    data.mail,
                    "My Frequent Rewards: Registration",
                    mailer.data
                )
            })

            return { message: "Please check your email to proceed.", data: [] };
            // }
            // return { message:"Please check your email to proceed.", data };
        },
        userController
    ))
    .post(`/:user/profile-data`, expressRoute(
        async req => {
            let data = await userController.read(req.params.user)
            answerController.request = req;
            let temp = Mutate(await answerController.getAnswers({ user: req.params.user, question: { $in: [...req.body.questions] } }))
            return {
                message: "under development", data:temp
            }
        },
        userController
    ))
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            let message = "";
            let data = await userController.read(req.params.id);
            return { message, data };
        },
        userController
    ))
    .post(expressRoute(
        async req => {
            // read single entry
            let message = ""
            let otp = await otpController.verify(req.params.id, "email", req.origin, req.body.code)
            if (!otp) throw new Error("Link Expired")
            return { message, data: {} };
        },
        userController
    ))
    .put(expressRoute(
        async req => {
            // update single entry
            let message = "";
            let data = await userController.update(req.params.id, req.body)
            return { message, data };
        },
        userController
    ))
    .patch(expressRoute(
        async req => {
            // update single entry
            let message = req.body.action;
            let data = await userController.read(req.params.id);
            if (req.body.action === "resend-otp") {
                let otp = await otpController.generate(
                    user._id,
                    "email",
                    req.origin,
                    1 * 24 * 60 * 60 * 1000
                );
                let mailer = await getMailer(
                    "register",
                    "respondent",
                    {
                        user: data,
                        otp
                    }
                )
                console.log({
                    emailStatus: await sendMail(
                        { origin: req.origin, "content-type": "application/json" },
                        data.mail,
                        "My Frequent Rewards: Registration",
                        mailer.data
                    )
                })

                return { message, data: [] };
            }
            return { message, data };
        },
        userController
    ))
    .delete(expressRoute(
        async req => {
            // delete single entry
            let message = "";
            let data = await userController.delete(req.params.id)
            return { message, data };
        },
        userController
    ))
export default router;