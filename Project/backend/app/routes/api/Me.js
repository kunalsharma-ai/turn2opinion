import express from "express";
import { teenCategory } from "../../utils/goLiveSetup.js";
import {
    Survey as surveyController,
    User as userController,
    OTP as otpController,
    Answer as answerController,
    Response as responseController,
    Profile as profileController
} from "../../controller/index.js";
import Category from "../../model/Category.js";
import { Profile as profileModel, Rewards as rewardsModel } from "../../model/index.js";
import { PROFILE_REWARD, creditCompletedProfiles, sumCredited } from "../../utils/profileRewards.js";
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
/** Credited Rewards rows for the signed-in member (profile completion credits and any others). */
async function myRewards(req) {
    return Mutate(await rewardsModel.find({ user: req.user._id, origin: req.origin }).sort({ createdAt: -1 }).lean());
}
/** Credit profiles this member has just finished (once each, see utils/profileRewards.js). */
async function creditProfiles(req) {
    const category = req.user.category || "b2c";
    profileController.request = req;
    return creditCompletedProfiles({ user: req.user._id, origin: req.origin }, {
        profiles: async () => Mutate(await profileModel.find({ category, isActive: true, isDeleted: false }, { slug: 1, name: 1, points: 1 }).lean()),
        status: async () => (await profileController.status()) || {},
        credited: async () => (await rewardsModel.find({ user: req.user._id, origin: req.origin, category: PROFILE_REWARD }, { remarks: 1 }).lean()).map((r) => r.remarks),
        upsert: (filter, update, options) => rewardsModel.updateOne(filter, update, options)
    });
}
Date.prototype.resetTime = function (type = "start") {
    if (type === "end") {
        this.setHours(23);
        this.setMinutes(59);
        this.setSeconds(59);
    } else {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
    }
}
const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Invalid request");
            answerController.request = req;
            let message = "";
            let data = Mutate(await userController.read(req.user._id))
            let navbar = [
                {
                    link: "/admin/dashboard",
                    text: "Admin Zone",
                    icon: "fa-solid fa-gear",
                    roles: ["admin", "superadmin", "root"]
                },
                {
                    link: "/member/dashboard",
                    text: "Dashboard",
                    icon: "icon-drawer",
                    roles: ["admin", "superadmin", "root", "respondent"]
                },
                {
                    link: "/member/myaccount",
                    text: "My Account",
                    icon: "icon-user",
                    roles: ["admin", "superadmin", "root", "respondent"]
                },
                {
                    link: "/member/settings",
                    text: "Settings",
                    icon: "icon-settings",
                    roles: ["admin", "superadmin", "root", "respondent"]
                }
            ]
                .map(link => link.roles.includes(data.role) ? ({
                    link: link.link,
                    text: link.text,
                    icon: link.icon
                }) : null)
                .filter(link => Boolean(link));
            data = { ...Mutate(data), ...req.user, navbar }
            data.firstname = data.name.first;
            data.lastname = data.name.last;

            return { message, data };
        },
        userController
    ))
    .post(expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Invalid request");
            answerController.request = req;
            let message = "";
            let data = Mutate(await userController.read(req.user._id))
            data.whatsapp = data.phone;
            let temp = Mutate(await answerController.getAnswers({ user: req.user._id, question: { $in: [...req.body.questions] } }))
            temp.firstname = data.name.first;
            temp.lastname = data.name.last;
            return { message, data: { ...data, ...temp } };
        },
        userController
    ))
    .patch(expressRoute(
        async req => {
            const [message, data] = ["Password Change Successfully", []];
            const { oldPassword, newPassword, cnfPassword } = req.body;
            if (newPassword !== cnfPassword) throw new Error("Invalid request")
            await userController.changePassword(oldPassword, newPassword);
            return { message, data }
        },
        userController
    ))
    .put(expressRoute(
        async req => {
            const [message, data] = ["Updated successfully", []];
            await userController.update(req.user._id, req.body);
            return { message, data };
        },
        userController
    ))
    .delete(async (req, res) => {
        res.cookie("authorization", null, {
            maxAge: -1
        })
        return res.json({})
    })
router
    .get("/points",
        expressRoute(
            async req => {
                let message = "";
                let data = []
                responseController.request = req;
                let category = await Category.findOne({ name: req.user.category })
                // a member with no completed survey yet has 0 survey points (getPoints throws then)
                let respPoints = await responseController.getPoints().catch(() => 0);
                // profile completion credits (Round 23); older members are credited on their next profile save
                let rewardPoints = sumCredited(await myRewards(req).catch(() => []));
                data = {
                    respPoints,
                    rewardPoints,
                    redeemPoints: 0,
                    totalPoints: (respPoints + rewardPoints - 0),
                    // a panel without a Category record yet (a fresh database) uses the model's default threshold
                    threshold: category?.thresholdPoints ?? Category.schema.path("thresholdPoints").defaultValue,
                    conversionRate: 0.001
                }
                return { message, data }
            },
            userController
        )
    )
    .get(`/statistics`,
        expressRoute(
            async req => {
                let data = [];
                let message = "";

                responseController.request = req;
                data = Mutate(await responseController.surveySummary());
                if (data.length === 1) data = data[0]
                return { message, data }
            },
            responseController
        )
    )
    .get(`/rewards`,
        expressRoute(
            async req => {
                let message = "";
                // credited rewards (profile completion and others), newest first
                const rows = await myRewards(req).catch(() => []);
                const earned = sumCredited(rows);
                const data = {
                    total: earned,
                    claimed: 0,
                    earned,
                    history: rows.map((r) => ({ id: r._id, category: r.category, slug: r.remarks, title: r.title || r.remarks, points: r.points, status: r.status, at: r.createdAt }))
                }
                return { message, data }
            },
            responseController
        )
    )
    .patch(`/answer`,
        expressRoute(
            async req => {
                let [message, data] = ["Updated successfully", []]
                const questions = Object.keys(req.body);
                const answers = questions.map(fld => {
                    return {
                        user: req.user._id,
                        question: fld,
                        answer: req.body[fld]
                    }
                })
                await answerController.save(answers)
                return { message, data }
            },
            answerController
        )
    )
    .patch("/change-category",
        expressRoute(
            async req => {
                const [message, data] = [
                    "Category Updated",
                    await userController.changeCategory(req.body.category)
                ];
                return { message, data };
            },
            userController
        )
    )
    .patch("/payment-method",
        expressRoute(
            async req => {
                const [message, data] = [
                    "Payment Method Updated",
                    await userController.changePaymentMethod(req.body)
                ];
                return { message, data };
            },
            userController
        )
    )
    .patch("/parent-details",
        expressRoute(
            async req => {
                const current = await userController.read(req.user._id);
                const body = { ...req.body, category: teenCategory(current?.category) };
                if (body.parent && typeof body.parent === "object")
                    body.parent = { ...body.parent, consent: null, consentStatus: "pending", submittedAt: new Date() };
                await userController.update(req.user._id, body);
                let user = Mutate(await userController.read(req.user._id))
                let otp=await otpController.generate(
                    user._id,
                    "parent-consent",
                    user.origin,
                    1 * 24 * 60 * 60 * 1000
                )
                let mailer = await getMailer(
                    "register",
                    "minor",
                    {
                        user,
                        otp
                    }
                )
                const emailStatus = await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    user?.parent?.email,
                    `${process.env.PROJECT_NAME}: Child Registration`,
                    mailer.data
                )
                console.log(emailStatus)
                return {
                    status: "success",
                    message: "",
                    data: user
                }
            },
            userController
        )
    )

router
    .route("/change-email")
    .patch(expressRoute(
        async req => {
            let [message, data] = ["", await userController.read(req.user._id)];
            let otp = await otpController.generate(
                data._id,
                "email",
                req.origin,
                1 * 24 * 60 * 60 * 1000
            );
            let token = Token.generate({
                user: data._id,
                otp: otp.code,
                email: req.body.email
            }, "24h")
            let mailer = await getMailer(
                "register",
                "change-email",
                {
                    user: data,
                    token,
                    email: req.body.email
                }
            )

            await sendMail(
                { origin: req.origin, "content-type": "application/json" },
                data.mail,
                `${process.env.PROJECT_NAME}: Update E-Mail Address`,
                mailer.data
            )
            message = `Please check your inbox and spam folders of email (${data.mail}) to proceed further in the process.`
            return { message, data };
        },
        userController
    ))
router
    .route("/invite")
    .post(expressRoute(
        async req => {
            const me = await userController.read(req?.user?._id);
            let mails = req.body.emails ?? [];
            let users = Mutate(await userController.list({
                mail: { $in: mails }
            })).map(u => u.mail)
            console.log({ users });
            const emails = mails.filter(e => !users.includes(e));
            // /*
            let mailer = await getMailer(
                "register",
                "invite",
                {
                    user: me,
                    ref: {
                        link: `https://${req.origin}/?ref=${me._id}&signup`
                    }
                }
            )

            for (let index = 0; index < emails.length; index++) {
                const email = emails[index];
                await sendMail(
                    {
                        origin: req.origin,
                        "content-type": "application/json"
                    },
                    email,
                    `Invitation from ${me.fullName} to join ${process.env.PROJECT_NAME}, A survey portal for Business 2 Business Industry`,
                    mailer.data
                )
            }
            await userController.addInvites(emails);
            return {
                message: "E-Mail Sent Successfully", data: {
                    invited: emails,
                    alreadyRegistered: users
                }
            }
        },
        userController
    ))
    .get(expressRoute(
        async req => {
            return {
                message: "",
                data: await userController.invitedUsers()
            }
        },
        userController
    ))
router
    .route("/profile")
    .get(expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Invalid request");
            answerController.request = req;
            let message = "";
            let data = Mutate(await userController.read(req.user._id))
            let navbar = [
                {
                    link: "/admin/dashboard",
                    text: "Admin Zone",
                    icon: "fa-solid fa-gear",
                    roles: ["admin", "superadmin", "root", "administrator"]
                },
                {
                    link: "/member/dashboard",
                    text: "Dashboard",
                    icon: "icon-drawer",
                    roles: ["admin", "superadmin", "root", "respondent", "administrator"]
                },
                {
                    link: "/member/myaccount",
                    text: "My Account",
                    icon: "icon-user",
                    roles: ["admin", "superadmin", "root", "respondent", "administrator"]
                },
                {
                    link: "/member/settings",
                    text: "Settings",
                    icon: "icon-settings",
                    roles: ["admin", "superadmin", "root", "respondent", "administrator"]
                }
            ]
                .map(link => link.roles.includes(data.role) ? ({
                    link: link.link,
                    text: link.text,
                    icon: link.icon
                }) : null)
                .filter(link => Boolean(link));
            let profileData = Mutate(await answerController.getAnswers({ user: req.user._id }))
            data = { ...profileData, ...Mutate(data), ...req.user, navbar }
            data.firstname = data.name.first;
            data.lastname = data.name.last;

            return { message, data };
        },
        userController
    ))
    .patch(expressRoute(
        async req => {
            const user = req.user;
            // const { questions, answers } = req.body;
            const answers = req.body;
            const questions = Object.keys(req.body);
            if (!user || !questions || !(questions instanceof Array) || questions.length < 1) throw new Error("Invalid request");
            const updatedAnswers = questions.map(fld => {
                if (!(fld in answers)) return false;
                return {
                    user: user._id,
                    question: fld,
                    answer: answers[fld]
                }
            }).filter(q => Boolean(q))
            await answerController.save(updatedAnswers)
            // profiles this save completed earn their points once; data lists them ([] when none)
            let credited = [];
            try {
                credited = await creditProfiles(req);
            } catch (e) {
                console.error("profile reward credit failed", e);
            }
            return { message: "Profile updated successfully", data: credited }
        },
        answerController
    ))
router
    .route("/survey")
    .get(expressRoute(
        async req => {
            let message = "";
            let data = await responseController.mySurveyCounts();
            return { message, data }
        },
        responseController
    ))
    .post(expressRoute(
        async req => {
            let message = "";
            const { dateRange, source, status, slug } = req.body;

            let filters = {}
            if (dateRange && (dateRange instanceof Array) && dateRange.length === 2) {
                const start = new Date(dateRange[0]);
                const end = new Date(dateRange[1]);
                start.resetTime("start");
                end.resetTime("end");
                filters = {
                    ...filters,
                    createdAt: {
                        $gte: start,
                        $lte: end
                    }
                }
            }
            if (source) {
                filters = {
                    ...filters,
                    source
                }
            }
            if (status) {
                filters = {
                    ...filters,
                    status
                }
            }
            if (slug) {
                filters = {
                    ...filters,
                    slug
                }
            }

            let data = await responseController.mySurveys(filters);
            // throw new Error("Under development")
            return { message, data }
        },
        responseController
    ))
    .put(expressRoute(
        async req => {
            let message = "";
            surveyController.request = req;
            let data = await surveyController.openBySlug(req.body.slug)
            if (!data) throw new Error("Invalid Request");
            let resp = Mutate(await responseController.createOrUpdate({
                user: req.user._id,
                survey: {
                    name: data.name,
                    slug: data.slug
                },
                timeline: {
                    start: new Date(),
                },
                telemetry: [
                    {
                        key: "UserAgent",
                        value: req.headers["user-agent"]
                    },
                    {
                        key: "Languages",
                        value: req.headers["accept-language"]
                    },
                    {
                        key: "IP Address",
                        value: req.clientIP
                    }
                ],
                status: "dropout",
                source: data.source,
                points: data.points
            }))

            return { message, data: { ...data, respID: resp._id, userInfo: req.user } }
        },
        responseController
    ))
    .patch(expressRoute(
        async req => {
            surveyController.request = req;
            answerController.request = req;
            let message = "";
            let data = []
            let response = await responseController.read(req.body.respID);
            // a member can only complete their own response (points follow the response)
            if (!response || String(response.user?._id ?? response.user) !== String(req.user._id)) throw new Error("Invalid request");

            // if (response.status !== "dropout") throw new Error("Invalid request");

            let questions = await surveyController.getQuestions(response.survey.slug);

            const answers = questions.filter(fld => Boolean(req.body[fld])).filter(fld => !(["age"].includes(fld))).map(fld => {
                return {
                    user: req.user._id,
                    question: fld,
                    answer: ("address-practice" === fld) ? JSON.stringify(req.body[fld]) : req.body[fld]
                }
            })
            const me = questions.filter(fld => typeof req.body[fld] === "object").map(
                fld => {
                    let temp = fld.split("-")
                    const ans = req.body[fld];
                    let gps = ans?.consent === "Yes" ? {
                        type: "Point",
                        coordinates: [ans.coordinates.lat, ans.coordinates.lng]
                    } : null;

                    if (temp[0] === "address") {
                        return {
                            address: {
                                tag: temp[1],
                                house: ans.line1,
                                street: ans.line2,
                                city: ans.city,
                                state: ans.state,
                                zipcode: ans.zipcode,
                                country: ans.country,
                                gps
                            }
                        }
                    }
                    else {
                        return { [fld]: ans }
                    }
                }
            )
            userController.req = req;
            for (let index = 0; index < me.length; index++) {
                const element = me[index];
                let resp = await userController.update(req.user._id, element)
            }
            await answerController.save(answers)
            response.status = "complete";
            response.timeline.end = new Date();
            await response.save()
            return { message, data }
        },
        responseController
    ))
export default router;