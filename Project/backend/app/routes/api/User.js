
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
import { asyncHandler, HttpError } from "express-web-tools"
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
import { createCaptcha, requireCaptcha } from "../../utils/captcha.js";
import { captchaLimit, loginLimit, registerLimit, linkLimit } from "../../utils/limits.js";
import { ageInYears } from "../../model/User.js";
import { Answers as answerModel, Response as responseModel } from "../../model/index.js";

const TEEN_LINK_MS = 7 * 24 * 60 * 60 * 1000; // parent onboarding and teen activation links
const TEEN_CONSENT_VERSION = "teen-consent-2026-11";
const PARENT_RELATIONS = ["mother", "father", "guardian"];
const isTeenUser = (u) => {
    if (!u) return false;
    const a = ageInYears(u.dob);
    return u.category === "minor" || (a !== null && a < 18);
};
const consentApproved = (u) => u?.parent?.consent === true || u?.parent?.consentStatus === "approved";

// Keep only the parent/guardian fields a sign-up form may set.
function cleanParent(p = {}) {
    const name = p.name || {};
    const out = {
        email: String(p.email || "").trim().toLowerCase(),
        relation: String(p.relation || "").trim().toLowerCase(),
        name: {
            first: String(name.first || "").trim(),
            middle: String(name.middle || "").trim(),
            last: String(name.last || "").trim()
        },
        phone: p.phone ? String(p.phone).trim() : undefined,
        dob: p.dob || undefined
    };
    // Gender is asked only for a legal guardian.
    if (out.relation === "guardian" && ["Male", "Female", "Other"].includes(p.gender)) out.gender = p.gender;
    if (out.relation === "mother") out.name.salutation = "Mrs.";
    if (out.relation === "father") out.name.salutation = "Mr.";
    return out;
}

function checkParent(parent, teenMail) {
    if (!parent.email) throw new Error("Enter your parent or guardian’s email address.");
    if (parent.email === String(teenMail || "").toLowerCase()) throw new Error("Your parent or guardian needs their own email address, not yours.");
    if (!PARENT_RELATIONS.includes(parent.relation)) throw new Error("Choose Mother, Father or Legal guardian.");
    if (!parent.name.first) throw new Error("Enter your parent or guardian’s first name.");
    const pAge = ageInYears(parent.dob);
    if (parent.dob && (pAge === null || pAge < 18)) throw new Error("A parent or guardian must be 18 or older.");
}

async function sendParentOnboarding(req, user) {
    const otp = await otpController.generate(user._id, "parent-consent", user.origin || req.origin, TEEN_LINK_MS);
    if (otp?.cooldown) return otp;
    const mailer = await getMailer("register", "minor", { user, otp });
    await sendMail(
        { origin: req.origin, "content-type": "application/json" },
        user?.parent?.email,
        `${process.env.PROJECT_NAME || "Turn2Opinion"}: Parent/Guardian Onboarding Form`,
        mailer.data
    );
    return otp;
}


// ---------- welcome questionnaire ----------
// Every member (Consumer, Professional and Teen) answers a few welcome questions after they log in
// for the first time (GET /welcome tells the site whether they still need to; PUT /welcome saves;
// Kunal, 20 Nov 2026). Older clients may still send answers at sign-up, which are saved as before. Answers are stored as ordinary Answer records (the same records the member
// profiles read). When the questionnaire is complete, a "welcome" Response is recorded so the member
// area does not ask the welcome survey a second time.
const ANSWER_KEY = /^[a-z0-9][a-z0-9_\-]{0,59}$/i;
function cleanWelcome(w) {
    if (!w || typeof w !== "object" || Array.isArray(w)) return null;
    const out = {};
    for (const [k, v] of Object.entries(w).slice(0, 80)) {
        if (!ANSWER_KEY.test(k)) continue;
        const list = (Array.isArray(v) ? v : [v])
            .filter((x) => typeof x === "string" || typeof x === "number")
            .map((x) => String(x).trim().slice(0, 200))
            .filter(Boolean)
            .slice(0, 60);
        if (list.length) out[k] = list;
    }
    return Object.keys(out).length ? out : null;
}
async function saveWelcome(req, user, answers, complete = true) {
    if (!answers) return;
    const origin = user.origin || req.origin;
    const ops = Object.entries(answers).map(([question, answer]) => ({
        updateOne: {
            filter: { question, user: String(user._id), origin },
            update: { question, answer, user: String(user._id), origin },
            upsert: true
        }
    }));
    try {
        if (ops.length) await answerModel.bulkWrite(ops, { ordered: false });
        if (!complete) return;
        const now = new Date();
        await responseModel.updateOne(
            { "survey.slug": "welcome", user: user._id },
            { $setOnInsert: { user: user._id, survey: { name: "Welcome", slug: "welcome" }, timeline: { start: now, end: now }, status: "complete", source: "sign-up", points: 0, origin } },
            { upsert: true }
        );
        userController.request.user = {};
        await userController.update(user._id, { welcomeCompletedAt: now });
    } catch (err) {
        // The account exists either way; a failed save here only means the member area asks again.
        console.error("welcome answers not saved", err?.message);
        if (!complete) return;
        throw err;
    }
}

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
        registerLimit,
        expressRoute(
            async req => {
                await requireCaptcha(req);
                const userInfo = req.body;
                const welcome = cleanWelcome(req.body.welcome);
                const unwantedCols = ["password", "fullName", "age", "role", "isVerified", "registrationStatus", "welcome", "welcomeCompletedAt"];
                for (let index = 0; index < unwantedCols.length; index++) {
                    const col = unwantedCols[index];
                    if (col in userInfo) delete (userInfo[col]);
                }
                // Panel by date of birth, decided here so a changed form value can't bypass it.
                const age = ageInYears(userInfo.dob);
                if (age !== null && age < 13) throw new Error("Turn2Opinion members must be at least 13 years old.");
                const isTeen = age !== null && age < 18;
                let teenWithParent = false;
                if (isTeen) {
                    userInfo.category = "minor";
                    if (userInfo.parent && userInfo.parent.email) {
                        const parent = cleanParent(userInfo.parent);
                        checkParent(parent, userInfo.mail);
                        userInfo.parent = {
                            ...parent,
                            consent: null,
                            consentStatus: "pending",
                            submittedAt: new Date()
                        };
                        teenWithParent = true;
                    } else throw new Error("Members aged 13 to 17 join the Teen panel, which needs a parent or guardian’s details and consent.");
                } else {
                    delete userInfo.parent;
                    if (userInfo.category === "minor") userInfo.category = "b2c";
                }
                if (Array.isArray(userInfo.terms)) userInfo.terms = userInfo.terms.filter((t) => typeof t === "string").slice(0, 20);
                let message = "";
                let data = await userController.create(userInfo);
                // Only contact/location answers here; every member answers the welcome questions after login.
                try { await saveWelcome(req, Mutate(data), welcome, false); } catch { /* saved again after login */ }

                if (teenWithParent) {
                    // Teen sign-up: the parent/guardian gets the onboarding form first. The teen's own
                    // activation (set-password) link is sent only after the parent consents.
                    await sendParentOnboarding(req, Mutate(data));
                    // A short note to the teen too: what happens next (no link, nothing to do yet).
                    try {
                        const note = await getMailer("register", "minor-request-child", { user: Mutate(data) });
                        await sendMail({ origin: req.origin, "content-type": "application/json" }, data.mail, `${process.env.PROJECT_NAME || "Turn2Opinion"}: Your Teen request is waiting for your parent or guardian`, note.data);
                    } catch (err) { console.error("teen request note not sent", err?.message); }
                    return {
                        message: "Registration request submitted. We emailed the parent/guardian onboarding form.",
                        data: { user: data._id, registrationStatus: "parent-verification-pending" }
                    };
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
                const emailStatus = await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    data.mail,
                    `${process.env.PROJECT_NAME || "Turn 2 Opinion"}: Registration`,
                    mailer.data
                )
                // Never return the verification code itself: it would let anyone skip the email check.
                return { message, data: { user: data._id, expiresAt: otp?.expiresAt, registrationStatus: "email-verification-pending" } };
            },
            userController
        )
    )
    .patch(
        linkLimit,
        expressRoute(
            async req => {
                if (!req?.body?.password || !req?.body?.confirmPassword || req?.body?.password !== req?.body?.confirmPassword) throw new Error("Passwords not matching.")
                // The account-creation page also sends a CAPTCHA (and gets the strong-password rule).
                // The older reset-password page doesn't, so both stay optional unless it is included.
                const wantsCaptcha = "captcha" in req.body;
                if (wantsCaptcha) await requireCaptcha(req);
                const pw = String(req.body.password);
                if (wantsCaptcha && (pw.length < 8 || !/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/\d/.test(pw) || !/[^A-Za-z0-9]/.test(pw)))
                    throw new Error("Use at least 8 characters with upper and lower case letters, a number and a symbol.");
                const message = "Your password is created. Go to login page and proceed.";
                let otp = await otpController.verify(req.body.userID, "email", req.origin, req.body.emailOTP);
                if (!otp) throw new Error("Link Expired. Unable to set password.");
                const who = await userController.read(req.body.userID);
                if (isTeenUser(who) && who?.parent?.email && !consentApproved(who))
                    throw new Error("Your parent or guardian hasn’t given consent yet. Your account switches on after they do.");
                let status = await userController.setPassword(req.body.userID, req.body.password)
                if (!status) throw new Error("Something went wrong. Please contact support for more details");
                await otp.remove();
                // Teen accounts: tell the parent/guardian the account is now active.
                if (isTeenUser(who) && who?.parent?.email) {
                    try {
                        const m = await getMailer("register", "minor-activated-parent", { user: Mutate(who) });
                        await sendMail({ origin: req.origin, "content-type": "application/json" }, who.parent.email, `${process.env.PROJECT_NAME || "Turn2Opinion"}: ${who?.name?.first || "Your teen"}’s Teen account is active`, m.data);
                    } catch (err) { console.error("parent activation note not sent", err?.message); }
                }
                // Sign the member in straight away (same token and cookie as /login), so the last
                // sign-up step doesn't need a second login with a new CAPTCHA.
                const token = Token.generate({
                    _id: status._id,
                    category: status.category,
                    email: status.mail,
                    phone: status.phone,
                    name: status.name,
                    origin: status.origin,
                    role: who?.role || "respondent"
                })
                return { message, data: [], token };
            },
            userController
        )
    )
router
    .get("/welcome", asyncHandler(isAuthenticated), expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Please log in.");
            const user = Mutate(await userController.read(req.user._id));
            if (!user || !user._id) throw new Error("Invalid request");
            let done = Boolean(user.welcomeCompletedAt);
            // members who finished the member-area welcome survey before this change count as done
            if (!done) done = Boolean(await responseModel.exists({ "survey.slug": "welcome", user: user._id, status: "complete" }));
            return { message: "ok", data: { done, category: user.category } };
        },
        userController
    ))
router
    .put("/welcome", asyncHandler(isAuthenticated), expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Please log in to save your welcome answers.");
            const user = Mutate(await userController.read(req.user._id));
            if (!user || !user._id) throw new Error("Invalid request");
            const answers = cleanWelcome(req.body?.welcome);
            if (!answers) throw new Error("Please answer the welcome questions.");
            await saveWelcome(req, user, answers, true);
            return { message: "Welcome answers saved", data: { welcomeCompletedAt: new Date() } };
        },
        userController
    ))
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
    .get("/captcha", captchaLimit, expressRoute(
        async req => {
            const data = await createCaptcha(req.origin, req.query.mode === "text" ? "text" : "image");
            return { message: "", data };
        },
        userController
    ))
    .post("/login", loginLimit, expressRoute(
        async req => {
            const message = "Login successful";
            let data = [];
            await requireCaptcha(req);
            let user;
            try {
                user = await userController.login(req.body);
            } catch (err) {
                // A Teen awaiting consent has no password yet, so login stops at "Account is inactive".
                // Say why instead (that message already shows the account exists, so nothing new leaks).
                if (/inactive/i.test(err.message) && req.body.mail) {
                    const [pending] = await userController.list({ mail: req.body.mail });
                    if (pending && isTeenUser(pending) && pending.parent?.email && !consentApproved(pending))
                        throw new Error(pending.parent?.consentStatus === "withdrawn"
                            ? "Your parent or guardian has withdrawn consent, so this Teen account is paused."
                            : "Your parent or guardian hasn’t approved your Teen account yet. We’ve emailed them the onboarding form.");
                }
                throw err;
            }
            // Teen accounts open only after the parent/guardian has consented.
            const teen = isTeenUser(user);
            if (teen && user?.parent?.email && !consentApproved(user))
                throw new Error("Your parent or guardian hasn’t approved your Teen account yet. We’ve emailed them the onboarding form.");
            if (teen && user?.parent?.consentStatus === "withdrawn")
                throw new Error("Your parent or guardian has withdrawn consent, so this Teen account is paused.");
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
        // asyncHandler(isAuthenticated),
        expressRoute(
            async req => {
                // update single entry
                let message = req.body.action;
                let data = await userController.findOne({ mail: req.body.mail, origin: req.origin });

                // User extst check
                if (!data) {
                    return {
                        status: "error",
                        message: "User not found",
                    };
                }

                // already varified check
                if (data.emailVerified) {
                    return {
                        status: "error",
                        message: "Email is already verified.",
                    };
                }

                // if (req.body.action === "resend-otp") {
                let otp = await otpController.generate(
                    data._id,
                    "email",
                    req.origin,
                    1 * 24 * 60 * 60 * 1000
                );

                if (otp?.cooldown) {
                    return {
                        status: "error",
                        message: `Please wait ${otp.remaining} seconds before requesting another email.`,
                    };
                }

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
    .put(
        "/parent-consent/:id",
        linkLimit,
        expressRoute(
            async req => {
                let message = "Permission updated."
                let data = [];
                let otp = await otpController.verify(req.params.id, "parent-consent", req.origin, req.body.code)
                if (!otp) throw new Error("Link Expired")
                const before = await userController.read(req.params.id);
                // The onboarding form may complete or correct the parent/guardian details.
                const update = {
                    "parent.consent": true,
                    "parent.consentStatus": "approved",
                    "parent.consentAt": new Date(),
                    "parent.consentVersion": String(req.body.version || TEEN_CONSENT_VERSION).slice(0, 60),
                    "parent.consentIP": String(req.clientIP || req.ip || ""),
                    "parent.verifiedVia": "email-link"
                };
                if (Array.isArray(req.body.confirmations)) update["parent.consentConfirmations"] = req.body.confirmations.filter((c) => typeof c === "string").slice(0, 12);
                if (Array.isArray(req.body.terms)) update.terms = req.body.terms;
                if (req.body.parent && typeof req.body.parent === "object") {
                    const p = cleanParent({ ...before.parent, ...req.body.parent, email: before?.parent?.email });
                    checkParent(p, before.mail);
                    update["parent.name"] = p.name;
                    update["parent.relation"] = p.relation;
                    if (p.phone) update["parent.phone"] = p.phone;
                    if (p.dob) update["parent.dob"] = p.dob;
                    if (p.gender) update["parent.gender"] = p.gender;
                }
                userController.request.user = {};
                let user = Mutate(await userController.update(req.params.id, update))
                let mailer = await getMailer(
                    "register",
                    "minor-permitted-parent",
                    {
                        user
                    }
                );
                await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    user?.parent?.email,
                    `${process.env.PROJECT_NAME}: Child Permitted to take survey`,
                    mailer.data
                )

                // A teen who signed up through the Teen form has no password yet: send a one-time,
                // time-limited activation link so they can create it.
                let activation = null;
                if (user?.isVerified?.email !== "verified") {
                    activation = await otpController.generate(user._id, "email", user.origin || req.origin, TEEN_LINK_MS);
                    if (activation?.cooldown) activation = null;
                }
                mailer = await getMailer(
                    "register",
                    "minor-permitted-child",
                    {
                        user,
                        otp: activation
                    }
                );
                await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    user?.mail,
                    `${process.env.PROJECT_NAME}: Your parent granted you access of panel.`,
                    mailer.data
                )
                await otpController.delete(otp._id);
                data = { registrationStatus: activation ? "account-activation-pending" : "account-active" };
                return { message, data };
            },
            userController
        )
    )
    .post(
        "/parent-consent-resend",
        linkLimit,
        expressRoute(
            async req => {
                // A teen whose parent lost the email asks for it again from the login page.
                // Same reply whether or not the address exists, so it can't be used to find accounts.
                const done = { message: "If there is a pending Teen request for this email, we’ve sent the form to the parent or guardian again.", data: [] };
                const found = await userController.findOne({ mail: String(req.body.mail || "").trim().toLowerCase(), origin: req.origin });
                if (!found) return done;
                const user = Mutate(await userController.read(found._id));
                if (!user?.parent?.email || consentApproved(user)) return done;
                const otp = await sendParentOnboarding(req, user);
                if (otp?.cooldown) throw new Error(`Please wait ${otp.remaining} seconds before sending it again.`);
                return done;
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
        linkLimit,
        expressRoute(
            async req => {
                // read single entry
                let message = ""
                let channel = req.body.channel ?? "email"
                if (!["email", "parent-consent"].includes(channel)) throw new Error("Link Expired")
                let otp = await otpController.verify(req.params.id, channel, req.origin, req.body.code)
                if (!otp) throw new Error("Link Expired")
                let user = await userController.read(req.params.id);
                if (channel === "parent-consent") {
                    // The parent sees only what the onboarding form needs, not the teen's whole record.
                    if (!user?.parent?.onboardingOpenedAt) {
                        userController.request.user = {};
                        await userController.update(req.params.id, { "parent.onboardingOpenedAt": new Date() });
                    }
                    // What the teen submitted, for the parent to review (no password, no internal fields).
                    let answers = {};
                    try {
                        answerController.request = { ...req, user: { _id: user._id }, origin: user.origin || req.origin };
                        answers = Mutate(await answerController.getAnswers({ user: String(user._id) })) || {};
                    } catch { answers = {}; }
                    const home = Array.isArray(user.address) && user.address[0] ? user.address[0] : {};
                    return {
                        message,
                        data: {
                            _id: user._id,
                            name: { first: user?.name?.first, middle: user?.name?.middle, last: user?.name?.last },
                            teen: {
                                mail: user.mail,
                                phone: user.phone,
                                dob: user.dob,
                                gender: user.gender,
                                address: { country: home.country, state: home.state, city: home.city, zipcode: home.zipcode },
                                answers
                            },
                            category: user.category,
                            origin: user.origin,
                            parent: user.parent,
                            isMinor: user.isMinor,
                            registrationStatus: "consent-pending"
                        }
                    };
                }
                return { message, data: user };
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