
Date.prototype.isMinor = function (cn = "IN") {
    let today = new Date();
    let age = (today - this) / (365.25 * 24 * 3600 * 1000);
    return age < 18
}


String.prototype.sluggify = function () {
    return this.trim() // Remove leading/trailing whitespace
        .toLowerCase() // Convert to lowercase for consistency
        .replace(/[^a-z0-9\s]/g, "-") // Replace special characters with dash
        .replace(/\s+/g, ".") // Replace whitespace sequences with dash
        .replace(/\.+/g, ".") // Collapse multiple consecutive dashes
        .replace(/^\.|\.$/g, ""); // Remove leading/trailing dashes
};

import express from "express";
import { asyncHandler } from "express-web-tools"
import {
    User as userController,
    OTP as otpController,
    Answer as answerController,
    Response as responseController
} from "../../controller/index.js";
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
    .route('/')
    .get(
        asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                // Read all entries
                let message = "";
                let data = await userController.list()
                return { message, data };
            },
            userController
        )
    )
    .post(
        asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                // Read all entries matching filter
                let message = "";
                responseController.request = req;
                let status = Mutate(await responseController.surveySummaryByUsers())
                let data = Mutate(await userController.list(req.body, null, {}, "+role")).map(
                    user => {
                        const stat = status.find(st => st._id === user._id);
                        user.status = {
                            "total": 0,
                            "complete": 0,
                            "disqualified": 0,
                            "abdoned": 0,
                            "internal": 0,
                            "external": 0,
                            "points": 0,
                            "totalRewards": 0,
                            ...stat
                        }
                        return user;
                    }
                )
                return { message, data };
            },
            userController
        )
    )
    .put(
        expressRoute(
            async req => {
                const userInfo = req.body;
                const unwantedCols = ["password", "fullName", "age"];
                for (let index = 0; index < unwantedCols.length; index++) {
                    const col = unwantedCols[index];
                    if (col in userInfo) delete (userInfo[col]);
                }
                let message = "";
                let data = await userController.create(userInfo);

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
                const emailStatus = await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    data.mail,
                    `${process.env.PROJECT_NAME || "Turn 2 Opinion"}: Registration`,
                    mailer.data
                )
                return { message, data: otp };
            },
            userController
        )
    )
    .patch(
        expressRoute(
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
        )
    )
router
    .post("/check", expressRoute(
        async req => {
            let data = await userController.list(req.body);
            return { message: "", data: data.length }
        },
        userController
    ))
router
    .get(
        "/birthday/today",
        expressRoute(
            async req => {
                const status = "success";
                let data = await userController.birthday();
                const message = `Total ${data.length} users found with birthday`;
                return { message, status, data };
            },
            userController
        )
    )
    .get(
        "/summarize",
        asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                const message = "";
                let data = await userController.summary();
                return { message, data }
            },
            userController
        )
    )
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
    .post(
        "/autologin",
        asyncHandler(isAuthenticated),
        expressRoute(
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
        )
    )
    .delete(
        `/terms`,
        asyncHandler(isAuthenticated), expressRoute(
            async req => {
                const message = "Terms reset";
                let token;
                const user = await userController.update(req.body._id, { terms: [] });
                if (!user) throw new Error("Invalid request");
                return { message, data: [], token }
            },
            userController
        )
    )
    .post(
        "/refresh",
        expressRoute(
            async req => {
                const message = "Refreshed Respondent, All Records other than registration details removed.";
                const data = await userController.refreshUser(req.body);
                return { message, data }
            },
            userController
        ))
    .post(
        `/resend`,
        asyncHandler(isAuthenticated),
        expressRoute(
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
                        `${process.env.PROJECT_NAME || "Turn 2 Opinion"}: Registration`,
                        mailer.data
                    )
                })

                return { message: "Please check your email to proceed.", data: [] };
                // }
                // return { message:"Please check your email to proceed.", data };
            },
            userController
        )
    )

    .post(
        `/:user/profile-data`,
        asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                // let data = await userController.read(req.params.user)
                answerController.request = req;
                let temp = Mutate(await answerController.getAnswers({ user: req.params.user, question: { $in: [...req.body.questions] } }))
                return {
                    message: "under development", data: temp
                }
            },
            userController
        )
    )
router
    .route("/apps")
    .get(
        expressRoute(
            async req => {
                let data = await userController.appsList(req.query, null, {}, "+role");
                console.log({ AppList: data })
                return { message: `${data.length} apps found`, data }
            },
            userController
        )
    )
    .post(
        expressRoute(
            async req => {
                let data = await userController.appLoginUser(req.body);
                console.log({ AppLogin: data })
                const token = Token.generate({
                    _id: data._id,
                    category: data.category,
                    email: data.mail,
                    phone: data.phone,
                    name: data.name,
                    origin: data.origin,
                    role: data.role
                }, "365d")
                return {
                    message: "", data: {
                        token
                    }
                }
            },
            userController
        )
    )
    .put(
        isAuthenticated,
        expressRoute(
            async req => {
                let data = await userController.appCreateUser({
                    name: {
                        first: req.body.name.first,
                        last: "app"
                    },
                    gender: "Other",
                    dob: (new Date()).setYear((new Date()).getFullYear() - 18),
                    mail: req.body.name.first.toLowerCase().sluggify() + "@frequentresearch.com",
                    isVerified: {
                        email: "verified",
                    },
                    origin: req.origin,
                    role: "root",
                    timezone: "Asia/Kolkata"
                })
                console.log({ AppCreate: data })
                return {
                    message: "App created",
                    data
                }
            },
            userController
        )
    )
    .patch(
        expressRoute(
            async req => {
                let data = await userController.update(req.body._id, req.body);
                return { message: "App Updated", data }
            },
            userController
        )
    )
    .delete(
        expressRoute(
            async req => {
                let data = await userController.delete(req.body.userID);
                return { message: "App Deleted", data }
            },
            userController
        )
    )
router
    .route("/response/:id")
    .post(
        expressRoute(
            async req => {

                return {
                    message: "under development",
                    data: []
                }
            },
            responseController
        )
    )
    .all((req, res, next) => {
        console.log(req)
        next()
    })
router
    .route('/:id')
    .get(
        asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                let message = "";
                let data = await userController.read(req.params.id);
                return { message, data };
            },
            userController
        )
    )
    .post(
        // asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                // read single entry
                let message = ""
                let otp = await otpController.verify(req.params.id, "email", req.origin, req.body.code)
                if (!otp) throw new Error("Link Expired")
                return { message, data: {} };
            },
            userController
        )
    )
    .put(
        asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                // update single entry
                let message = "";
                let data = await userController.update(req.params.id, req.body)
                return { message, data };
            },
            userController
        )
    )
    .patch(
        // asyncHandler(isAuthenticated),
        expressRoute(
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
                            `${process.env.PROJECT_NAME || "Turn 2 Opinion"}: Registration`,
                            mailer.data
                        )
                    })

                    return { message, data: [] };
                }
                return { message, data };
            },
            userController
        )
    )
    .delete(
        asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                // delete single entry
                let message = "";
                let data = await userController.delete(req.params.id)
                return { message, data };
            },
            userController
        )
    )
router.get(
    "/:id/profile",
    isAuthenticated,
    expressRoute(
        async req => {
            const data = Mutate(await userController.read(req.params.id));
            answerController.request = req;
            let profileData = Mutate(await answerController.getAnswers({ user: req.params.id }))
            console.log(profileData)
            return {
                data: { ...data, ...profileData },
                message: "",
                status: "success"
            }
        },
        userController
    )
)
router.get(
    "/:id/survey",
    isAuthenticated,
    expressRoute(
        async (req) => {
            const data = await responseController.list({ user: req.params.id })
            return { message: `Total ${data.length} records found`, status: "success", data }
        },
        responseController
    )
)
export default router;