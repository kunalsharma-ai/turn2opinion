
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
import { requireAdmin, requireMember, selfOrAdmin } from "../../utils/access.js";
import { checkQuery, isAdminRole, memberListQuery, omit, safeFilter, userUpdate } from "../../utils/memberAccess.js";
import { captchaLimit, loginLimit, registerLimit, linkLimit } from "../../utils/limits.js";
import { lockedFor, fail, clear, norm } from "../../utils/throttle.js";
import { withRequest } from "../../utils/requestContext.js";
import { ageInYears } from "../../model/User.js";
import * as Marketing from "../../utils/marketing.js";
import UserModel from "../../model/User.js";
import { Answers as answerModel, Response as responseModel, Tombstone as tombstoneModel } from "../../model/index.js";
import {
    TEEN_REG_CONSENT_VERSION, GUARDIAN_TERMS_VERSION, TEEN_STATEMENTS, GUARDIAN_REQUIRED, GUARDIAN_OPTIONAL, DECLINE_REASONS,
    linkFor, sigOk, maskEmail, registrationRef, cleanOnboarding, onboardingErrors, teenMail, brand
} from "../../utils/teen.js";
import { familyRecord } from "../../utils/teenFamily.js";
import { guardianAnswers } from "../../utils/parentProfile.js";
import { MINOR_CATEGORIES, isMinorCategory, teenCategory } from "../../utils/goLiveSetup.js";

const TEEN_LINK_MS = 7 * 24 * 60 * 60 * 1000; // parent onboarding and teen activation links
const TEEN_CONSENT_VERSION = "teen-consent-2026-11";
const PARENT_RELATIONS = ["mother", "father", "guardian"];
const isTeenUser = (u) => {
    if (!u) return false;
    const a = ageInYears(u.dob);
    return isMinorCategory(u.category) || (a !== null && a < 18);
};
// A deletion readers of GET /api/v1/changes/deletions must see. The member's id only, never their details.
const tombstone = (kind, user) => tombstoneModel.create({ kind, user: String(user._id ?? user), origin: user.origin });
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

// Links in the guardian's emails: /parent-consent/?user&code&s (+ &d=yes|no on the two decision buttons).
const siteOf = (req, user) => `https://${user?.origin || req.origin}`;
function guardianLinks(req, user, link) {
    if (!link) return null;
    const base = `${siteOf(req, user)}/parent-consent/?user=${user._id}&code=${link.code}&s=${link.sig}`;
    return { open: base, yes: `${base}&d=yes`, no: `${base}&d=no`, expiresAt: link.expiresAt };
}
const teenMailData = (req, user, extra = {}) => ({
    user,
    ref: registrationRef(user),
    site: siteOf(req, user),
    parentMasked: maskEmail(user?.parent?.email),
    teenMasked: maskEmail(user?.mail),
    relation: user?.parent?.relation === "guardian" ? "legal guardian" : user?.parent?.relation || "parent or guardian",
    ...extra
});

async function sendParentOnboarding(req, user, template = "minor", subject) {
    const otp = await otpController.generate(user._id, "parent-consent", user.origin || req.origin, TEEN_LINK_MS);
    if (otp?.cooldown) return otp;
    const link = linkFor(user._id, "parent-consent", otp);
    // `otp` stays in the data for older templates; new templates use `links`.
    await teenMail(req, user?.parent?.email, template,
        subject || `${user?.name?.first || "Your teen"} would like to join the ${brand()} Teen panel: your decision`,
        teenMailData(req, user, { otp: link, links: guardianLinks(req, user, link) }));
    return otp;
}

/** Verify a guardian link (code + signature) and return the teen record, or throw "Link Expired". */
async function guardianLink(req, id, body = req.body) {
    const otp = await otpController.verify(id, "parent-consent", req.origin, body.code);
    if (!otp || !sigOk(String(id), "parent-consent", String(body.code), body.s || body.sig)) throw new Error("Link Expired");
    const user = Mutate(await userController.read(id));
    if (!user || !user.parent?.email) throw new Error("Link Expired");
    if (["declined", "cancelled", "withdrawn"].includes(user.parent.consentStatus)) throw new Error("This Teen registration is closed.");
    return { otp, user };
}


// ---------- parent profiling ----------
// When the guardian gives consent, their onboarding answers that belong to the Teen bank (and the
// ones worked out from Module 1, teen-p001..p007) become the Teen's own Answer records.
async function saveGuardianAnswers(req, user) {
    const answers = guardianAnswers(user?.parent?.onboarding, true);
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
    } catch (err) {
        // Consent is recorded either way; the Teen panel then simply asks these questions.
        console.error("guardian answers not saved", err?.message);
    }
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
        requireAdmin,
        expressRoute(
            async req => {
                // Read all entries. isStaff marks admin and integration accounts, so a reader such as MADP can leave
                // them out of member counts; the role itself is not sent.
                let message = "";
                let data = Mutate(await userController.list({}, null, {}, "+role")).map(({ role, ...u }) => ({ ...u, isStaff: isAdminRole(role) }));
                return { message, data };
            },
            userController
        )
    )
    .post(
        requireMember,
        expressRoute(
            async req => {
                // Read all entries matching filter
                let message = "";
                if (!req.isAdmin) {
                    // A member sees only their own referrals, or whether an e-mail is taken (settings page).
                    const q = memberListQuery(req.body, req.user._id);
                    if (q.kind === "mail-taken") {
                        const found = await userController.list(q.filter, null, {}, "_id");
                        return { message, data: found.length ? [{}] : [] };
                    }
                    const own = Mutate(await userController.list(q.filter, null, {}, q.fields));
                    return { message, data: own.map(({ _id, mail, fullName, name, isVerified, createdAt }) => ({ _id, mail, fullName, name, isVerified: { email: isVerified?.email }, createdAt })) };
                }
                responseController.request = req;
                let status = Mutate(await responseController.surveySummaryByUsers())
                let data = Mutate(await userController.list(safeFilter(req.body), null, {}, "+role")).map(
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
                if (age !== null && age < 13) throw new Error(`${brand()} members must be at least 13 years old.`);
                const isTeen = age !== null && age < 18;
                let teenWithParent = false;
                if (isTeen) {
                    userInfo.category = teenCategory(userInfo.category);
                    if (userInfo.parent && userInfo.parent.email) {
                        const parent = cleanParent(userInfo.parent);
                        checkParent(parent, userInfo.mail);
                        // The teen's own step-3 confirmations: every statement, recorded with its version.
                        const said = Array.isArray(userInfo.teenConsent?.statements) ? userInfo.teenConsent.statements.filter((x) => typeof x === "string") : [];
                        const missing = TEEN_STATEMENTS.filter((k) => !said.includes(k));
                        if (missing.length) throw new Error("Please tick every confirmation on the consent step.");
                        userInfo.teenConsent = { version: TEEN_REG_CONSENT_VERSION, statements: TEEN_STATEMENTS, acceptedAt: new Date(), ip: String(req.clientIP || req.ip || "") };
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
                    delete userInfo.teenConsent;
                    if (userInfo.category === "minor") userInfo.category = "b2c";
                    if (userInfo.category === "minor patient") userInfo.category = "patient";
                }
                if (Array.isArray(userInfo.terms)) userInfo.terms = Marketing.stripForTeen(userInfo, userInfo.terms.filter((t) => typeof t === "string").slice(0, 20));
                // marketing consent is written only through utils/marketing.js, never straight from the form
                const marketingOptIn = typeof userInfo.marketingOptIn === "boolean" ? userInfo.marketingOptIn : Array.isArray(userInfo.terms) && userInfo.terms.includes("marketing") ? true : null;
                for (const k of Marketing.PROTECTED) delete userInfo[k];
                let message = "";
                let data = await userController.create(userInfo);
                // "News and offers": recorded only for an explicit choice (unticked by default); a teen never opts in
                if (marketingOptIn !== null && !(marketingOptIn && Marketing.isTeen(data))) await Marketing.setOptIn(data._id, req.origin, marketingOptIn, "signup", "member");
                // Only contact/location answers here; every member answers the welcome questions after login.
                try { await saveWelcome(req, Mutate(data), welcome, false); } catch { /* saved again after login */ }

                if (teenWithParent) {
                    // Teen sign-up: the parent/guardian gets the onboarding form first. The teen's own
                    // activation (set-password) link is sent only after the parent consents.
                    const saved = Mutate(data);
                    await sendParentOnboarding(req, saved);
                    // Email 1 to the teen: what happens next (no link, nothing to do yet).
                    await teenMail(req, saved.mail, "minor-request-child", `${brand()}: we've asked your ${saved.parent?.relation === "guardian" ? "guardian" : saved.parent?.relation || "parent"} to approve your Teen account`, teenMailData(req, saved));
                    return {
                        message: "Registration request submitted. We emailed the parent/guardian onboarding form.",
                        data: { user: data._id, ref: registrationRef(saved), parentMasked: maskEmail(saved.parent?.email), registrationStatus: "parent-verification-pending" }
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
                // Teen password links are signed (see utils/teen.js): the 6-digit code alone is not enough.
                if (isTeenUser(who) && who?.parent?.email && !sigOk(String(req.body.userID), "email", String(req.body.emailOTP), req.body.sig))
                    throw new Error("Link Expired. Unable to set password.");
                let status = await userController.setPassword(req.body.userID, req.body.password)
                if (!status) throw new Error("Something went wrong. Please contact support for more details");
                await otp.remove();
                // Teen accounts: confirm to the teen, and tell the parent/guardian the account is now active.
                if (isTeenUser(who) && who?.parent?.email) {
                    const w = Mutate(who);
                    await teenMail(req, w.mail, "teen-activated-child", `${brand()}: your Teen account is switched on`, teenMailData(req, w));
                    await teenMail(req, w.parent.email, "minor-activated-parent", `${brand()}: ${w?.name?.first || "Your teen"}’s Teen account is active`, teenMailData(req, w));
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
            // Public: only "is this e-mail or phone in use?", never a free-form filter.
            const q = checkQuery(req.body);
            if (!q) throw new Error("Invalid request");
            let data = await userController.list(q, null, {}, "_id");
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
        requireAdmin,
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
            // strings only (an object here would be a database filter), and a per-account lock after 10 wrong
            // passwords in 15 minutes, so a bot that keeps changing its address gets no further
            const { mail, phone, password } = req.body || {};
            if (typeof password !== "string" || !password || (typeof mail !== "string" && typeof phone !== "string"))
                throw new Error("E-Mail id or Password is invalid");
            const who = `login:${req.origin}:${norm(typeof mail === "string" && mail ? mail : phone)}`;
            const wait = await lockedFor(who);
            if (wait) throw new Error(`Too many wrong attempts. Please wait ${wait} minute${wait === 1 ? "" : "s"} or reset your password.`);
            let user;
            try {
                user = await userController.login(typeof mail === "string" && mail ? { mail, password } : { phone, password });
                await clear(who);
            } catch (err) {
                if (/invalid/i.test(err.message)) await fail(who, { max: 10, windowMin: 15, lockMin: 15 });
                // A Teen awaiting consent has no password yet, so login stops at "Account is inactive".
                // Say why instead (that message already shows the account exists, so nothing new leaks).
                if (/inactive/i.test(err.message) && req.body.mail) {
                    const [pending] = await userController.list({ mail: req.body.mail });
                    if (pending && isTeenUser(pending) && pending.parent?.email && !consentApproved(pending))
                        throw new Error(pending.parent?.consentStatus === "withdrawn"
                            ? "Your parent or guardian has withdrawn consent, so this Teen account is paused."
                            : pending.parent?.consentStatus === "declined"
                                ? "Your parent or guardian decided not to enrol you in the Teen panel, so this registration can’t go ahead."
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
        requireAdmin,
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
        requireAdmin, expressRoute(
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
        requireAdmin,
        expressRoute(
            async req => {
                const message = "Refreshed Respondent, All Records other than registration details removed.";
                const data = await userController.refreshUser(req.body);
                const member = await userController.model.findById(req.body.user).select("origin").lean();
                if (member) await tombstone("answers", member);
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
        selfOrAdmin("user"),
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
        requireAdmin,
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
        requireAdmin,
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
        requireAdmin,
        expressRoute(
            async req => {
                let data = await userController.update(req.body._id, omit(req.body, ["_id", "origin", "password"]));
                return { message: "App Updated", data }
            },
            userController
        )
    )
    .delete(
        requireAdmin,
        expressRoute(
            async req => {
                let data = await userController.delete(req.body.userID);
                if (data) await tombstone("member", data);
                return { message: "App Deleted", data }
            },
            userController
        )
    )
// ---------- Teen registration: the guardian's side ----------
//   POST /parent-decision/:id    YES or NO from the invitation (NO is final and closes the request)
//   PUT  /parent-onboarding/:id  the onboarding form (Module 1), after YES
//   PUT  /parent-consent/:id     the consent form (agreement MINOR-2026.10), after the onboarding form
//   POST /parent-link-renew/:id  a fresh link to the guardian's stored address when theirs expired
// Every call needs the signed link (code + s). Stages can't be skipped: each checks the one before.
router
    .post(
        "/parent-decision/:id",
        linkLimit,
        expressRoute(
            async req => {
                const { otp, user } = await guardianLink(req, req.params.id);
                const decision = req.body.decision === "yes" ? "yes" : req.body.decision === "no" ? "no" : "";
                if (!decision) throw new Error("Choose Yes or No.");
                if (consentApproved(user)) throw new Error("You have already given consent for this Teen account.");
                userController.request.user = {};
                if (decision === "yes") {
                    const first = user.parent.decision !== "yes";
                    await userController.update(req.params.id, { "parent.decision": "yes", "parent.decisionAt": user.parent.decisionAt || new Date() });
                    // Approval confirmation with a link back to the form, in case the page is closed half-way.
                    if (first) {
                        const fresh = Mutate(await userController.read(req.params.id));
                        const link = linkFor(user._id, "parent-consent", otp);
                        await teenMail(req, user.parent.email, "teen-parent-approved", `${brand()}: thank you, here is how to finish ${user.name?.first || "your teen"}’s enrolment`, teenMailData(req, fresh, { links: guardianLinks(req, fresh, link) }));
                    }
                    return { message: "Thank you. Please complete the onboarding form.", data: { registrationStatus: user.parent.onboardingAt ? "consent-pending" : "onboarding-pending" } };
                }
                const reasons = (Array.isArray(req.body.reasons) ? req.body.reasons : []).filter((r) => DECLINE_REASONS.includes(r));
                const note = String(req.body.note || "").trim().slice(0, 1000);
                await userController.update(req.params.id, {
                    "parent.decision": "no",
                    "parent.decisionAt": new Date(),
                    "parent.consent": false,
                    "parent.consentStatus": "declined",
                    "parent.declineReasons": reasons,
                    "parent.declineNote": note,
                    registrationClosedAt: new Date(),
                    registrationClosedReason: "guardian-declined"
                });
                await otpController.delete(otp._id);
                const fresh = Mutate(await userController.read(req.params.id));
                await teenMail(req, user.parent.email, "teen-parent-declined", `${brand()}: we have recorded your decision`, teenMailData(req, fresh, { notRecognised: reasons.includes("not-recognised") || reasons.includes("not-guardian") }));
                await teenMail(req, user.mail, "teen-declined-child", `${brand()}: an update on your Teen registration`, teenMailData(req, fresh));
                return { message: "Your decision is recorded. The Teen account will not be created.", data: { registrationStatus: "registration-rejected" } };
            },
            userController
        )
    )
    .put(
        "/parent-onboarding/:id",
        linkLimit,
        expressRoute(
            async req => {
                const { user } = await guardianLink(req, req.params.id);
                if (user.parent.decision !== "yes") throw new Error("Please choose Yes on the invitation first.");
                if (consentApproved(user)) throw new Error("You have already given consent for this Teen account.");
                const answers = cleanOnboarding(req.body.answers) || {};
                // Fields captured at registration are the guardian's to confirm here, never the teen's email.
                answers.P08 = user.parent.email;
                const err = onboardingErrors(answers);
                if (err) throw new Error(err);
                const pAge = ageInYears(answers["parent-dob"]);
                if (pAge === null || pAge < 18) throw new Error("A parent or guardian must be 18 or older.");
                const rel = ["mother", "father", "guardian"].includes(answers.P03) ? answers.P03 : user.parent.relation;
                const update = {
                    "parent.onboarding": answers,
                    "parent.onboardingAt": new Date(),
                    "parent.name": { ...(user.parent.name || {}), first: answers["parent-first-name"], middle: answers["parent-middle-name"] || "", last: answers["parent-last-name"] || "" },
                    "parent.dob": answers["parent-dob"],
                    "parent.relation": rel
                };
                if (answers.P09) update["parent.phone"] = String(answers.P09).replace(/\D/g, "").slice(0, 16);
                if (rel === "guardian" && ["Male", "Female", "Other"].includes(answers["parent-gender"])) update["parent.gender"] = answers["parent-gender"];
                userController.request.user = {};
                await userController.update(req.params.id, update);
                return { message: "Onboarding form saved.", data: { registrationStatus: "consent-pending", needsReview: answers.P04 === "unsure" } };
            },
            userController
        )
    )
    .post(
        "/parent-link-renew/:id",
        linkLimit,
        expressRoute(
            async req => {
                // Same reply whatever happens, so the page can't be used to learn anything about the account.
                const done = { message: "If this request is still open, we’ve emailed a new link to the parent or guardian’s address on file.", data: [] };
                let user = null;
                try { user = Mutate(await userController.read(req.params.id)); } catch { return done; }
                if (!user?.parent?.email || consentApproved(user) || ["declined", "cancelled", "withdrawn"].includes(user.parent.consentStatus)) return done;
                userController.request.user = {};
                await userController.update(req.params.id, { "parent.linkRenewedAt": new Date(), ...(user.parent.consentStatus === "expired" ? { "parent.consentStatus": "pending" } : {}) });
                const otp = await sendParentOnboarding(req, user, "teen-link-renewed", `${brand()}: your new link for ${user.name?.first || "your teen"}’s Teen registration`);
                if (otp?.cooldown) throw new Error(`Please wait ${otp.remaining} seconds before asking again.`);
                return done;
            },
            userController
        )
    )
    .put(
        "/parent-consent/:id",
        linkLimit,
        expressRoute(
            async req => {
                const { otp, user: before } = await guardianLink(req, req.params.id);
                if (consentApproved(before)) throw new Error("You have already given consent for this Teen account.");
                if (before.parent.decision !== "yes") throw new Error("Please choose Yes on the invitation first.");
                if (!before.parent.onboardingAt) throw new Error("Please complete the onboarding form first.");
                const sel = req.body.selections && typeof req.body.selections === "object" ? req.body.selections : {};
                if (req.body.declaration !== true) throw new Error("Please confirm the declaration.");
                const missing = GUARDIAN_REQUIRED.filter((k) => sel[k] !== true);
                if (missing.length) throw new Error("Please tick the three required permissions.");
                if (req.body.termsRead !== true) throw new Error("Please confirm you have read the agreement.");
                const now = new Date();
                const record = {
                    version: GUARDIAN_TERMS_VERSION,
                    acceptedAt: now,
                    termsRead: true,
                    declaration: true,
                    selections: Object.fromEntries([...GUARDIAN_REQUIRED, ...GUARDIAN_OPTIONAL].map((k) => [k, sel[k] === true])),
                    teenRegistrationRef: registrationRef(before),
                    teenConsentVersion: before.teenConsent?.version || null,
                    ip: String(req.clientIP || req.ip || ""),
                    userAgent: String(req.headers["user-agent"] || "").slice(0, 200)
                };
                const update = {
                    "parent.consent": true,
                    "parent.consentStatus": "approved",
                    "parent.consentAt": now,
                    "parent.consentVersion": GUARDIAN_TERMS_VERSION,
                    "parent.consentIP": record.ip,
                    "parent.consentConfirmations": Object.keys(record.selections).filter((k) => record.selections[k]),
                    "parent.consentRecord": record,
                    "parent.verifiedVia": "email-link"
                };
                userController.request.user = {};
                const user = Mutate(await userController.update(req.params.id, update));
                await saveGuardianAnswers(req, { ...before, ...user, parent: { ...(before.parent || {}), ...(user?.parent || {}) } });
                // Onboarding completion to the guardian.
                await teenMail(req, user?.parent?.email, "minor-permitted-parent", `${brand()}: onboarding complete for ${user?.name?.first || "your teen"}`, teenMailData(req, user, { record }));

                // The teen has no password yet: a one-time, signed, time-limited link to create it.
                let activation = null;
                if (user?.isVerified?.email !== "verified") {
                    activation = await otpController.generate(user._id, "email", user.origin || req.origin, TEEN_LINK_MS);
                    if (activation?.cooldown) activation = null;
                }
                const link = linkFor(user._id, "email", activation);
                await teenMail(req, user?.mail, "minor-permitted-child", `${brand()}: your ${user.parent?.relation === "guardian" ? "guardian" : user.parent?.relation || "parent"} said yes. Create your password`, teenMailData(req, user, {
                    otp: link,
                    activate: link ? `${siteOf(req, user)}/join/teen/?user=${user._id}&code=${link.code}&s=${link.sig}&activate=1` : null
                }));
                await otpController.delete(otp._id);
                return { message: "Permission recorded.", data: { registrationStatus: activation ? "account-activation-pending" : "account-active", ref: registrationRef(user), teenMasked: maskEmail(user.mail), consentVersion: GUARDIAN_TERMS_VERSION, acceptedAt: now } };
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
                if (!user?.parent?.email || consentApproved(user) || ["declined", "cancelled", "withdrawn"].includes(user.parent.consentStatus)) return done;
                const otp = await sendParentOnboarding(req, user);
                if (otp?.cooldown) throw new Error(`Please wait ${otp.remaining} seconds before sending it again.`);
                return done;
            },
            userController
        )
    )
// ---------- Teen profile (signed-in teen) ----------
// GET  /teen-profile  the teen's record, the guardian record kept apart (masked), consent records and
//                     every profile answer already on file, so no question is asked twice.
// PUT  /teen-profile  saves profile answers; contact phone is the only registration field a teen can
//                     change alone (name, birthday, email and country go through support + guardian).
router
    .get("/teen-profile", asyncHandler(isAuthenticated), expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Please log in.");
            const user = Mutate(await userController.read(req.user._id));
            if (!user || !isTeenUser(user)) throw new Error("This page is for Teen panel members.");
            let answers = {};
            try {
                answers = Mutate(await withRequest({ ...req, user: { _id: user._id }, origin: user.origin || req.origin }, () => answerController.getAnswers({ user: String(user._id) }))) || {};
            } catch { answers = {}; }
            const home = Array.isArray(user.address) && user.address[0] ? user.address[0] : {};
            const p = user.parent || {};
            return {
                message: "ok",
                data: {
                    ref: registrationRef(user),
                    status: user.registrationStatus,
                    teen: { name: user.name, mail: user.mail, phone: user.phone, dob: user.dob, gender: user.gender, address: home },
                    guardian: {
                        relation: p.relation,
                        name: { first: p.name?.first, last: p.name?.last },
                        email: maskEmail(p.email),
                        approvedAt: p.consentAt,
                        language: p.onboarding?.P06 || null
                    },
                    consents: [
                        user.teenConsent && { who: "teen", version: user.teenConsent.version, at: user.teenConsent.acceptedAt },
                        p.consentRecord && { who: "guardian", version: p.consentRecord.version, at: p.consentRecord.acceptedAt, selections: p.consentRecord.selections }
                    ].filter(Boolean),
                    answers,
                    // 23 Nov 2026: the guardian's onboarding answers and consent record, only once the
                    // guardian approved and finished onboarding; contact details masked (utils/teenFamily.js).
                    family: familyRecord(user)
                }
            };
        },
        userController
    ))
    .put("/teen-profile", asyncHandler(isAuthenticated), expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Please log in.");
            const user = Mutate(await userController.read(req.user._id));
            if (!user || !isTeenUser(user)) throw new Error("This page is for Teen panel members.");
            if (!consentApproved(user)) throw new Error("Your Teen account isn’t active yet.");
            const answers = cleanWelcome(req.body?.answers);
            // Never let a profile save overwrite what registration or the guardian recorded.
            if (answers) for (const k of ["D01", "D02", "D03", "D06", "country", "state"]) delete answers[k];
            if (answers && Object.keys(answers).length) await saveWelcome(req, user, answers, false);
            if (typeof req.body?.phone === "string") {
                const ph = req.body.phone.replace(/\D/g, "").slice(0, 16);
                userController.request.user = {};
                await userController.update(user._id, { phone: ph || undefined });
            }
            return { message: "Saved", data: { saved: answers ? Object.keys(answers).length : 0 } };
        },
        userController
    ))

// ---------- Teen registration reminders (run by a scheduler, e.g. hourly) ----------
// POST /teen-reminders with header x-cron-key: <TEEN_CRON_KEY>. Without the env var it is off.
//   guardian hasn't decided or finished after 2 days -> onboarding reminder (max 3, 3 days apart)
//   the same day, the teen gets one "still waiting" note
//   link expired with the request still open -> status "expired" + renewal email with a fresh link
router.post("/teen-reminders", expressRoute(
    async req => {
        const key = process.env.TEEN_CRON_KEY;
        if (!key || req.headers["x-cron-key"] !== key) throw new Error("Not allowed");
        const now = Date.now();
        const DAY = 24 * 3600 * 1000;
        const open = (await userController.list({ category: { $in: MINOR_CATEGORIES }, "parent.consentStatus": { $in: ["pending", "expired"] } })).map(Mutate);
        const sent = { reminders: 0, renewals: 0 };
        for (const u of open) {
            const p = u.parent || {};
            if (!p.email || consentApproved(u)) continue;
            const since = new Date(p.lastReminderAt || p.linkRenewedAt || p.submittedAt || u.createdAt || now).getTime();
            const age = now - new Date(p.submittedAt || u.createdAt || now).getTime();
            userController.request.user = {};
            if (age > TEEN_LINK_MS && p.consentStatus !== "expired" && !(p.linkRenewedAt && now - new Date(p.linkRenewedAt).getTime() < TEEN_LINK_MS)) {
                await userController.update(u._id, { "parent.consentStatus": "expired", "parent.linkRenewedAt": new Date() });
                await sendParentOnboarding(req, u, "teen-link-renewed", `${brand()}: a new link for ${u.name?.first || "your teen"}’s Teen registration`);
                sent.renewals++;
                continue;
            }
            if ((p.remindersSent || 0) < 3 && now - since > (p.remindersSent ? 3 : 2) * DAY) {
                await userController.update(u._id, { "parent.remindersSent": (p.remindersSent || 0) + 1, "parent.lastReminderAt": new Date() });
                await sendParentOnboarding(req, u, "teen-onboarding-reminder", `Reminder: ${u.name?.first || "your teen"} is waiting for your decision`);
                if (!p.remindersSent) await teenMail(req, u.mail, "teen-pending-reminder-child", `${brand()}: still waiting for your ${p.relation === "guardian" ? "guardian" : p.relation || "parent"}`, teenMailData(req, u));
                sent.reminders++;
            }
        }
        return { message: "ok", data: sent };
    },
    userController
))
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
        selfOrAdmin("id"),
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
                if (channel === "parent-consent" && !sigOk(String(req.params.id), channel, String(req.body.code), req.body.s || req.body.sig)) throw new Error("Link Expired");
                // Teen password links are signed too.
                if (channel === "email" && isTeenUser(user) && user?.parent?.email && !sigOk(String(req.params.id), channel, String(req.body.code), req.body.s || req.body.sig)) throw new Error("Link Expired");
                if (channel === "parent-consent" && ["declined", "cancelled", "withdrawn"].includes(user?.parent?.consentStatus)) throw new Error("This Teen registration is closed.");
                if (channel === "parent-consent") {
                    // The parent sees only what the onboarding form needs, not the teen's whole record.
                    if (!user?.parent?.onboardingOpenedAt) {
                        userController.request.user = {};
                        await userController.update(req.params.id, { "parent.onboardingOpenedAt": new Date() });
                    }
                    // What the teen submitted, for the parent to review (no password, no internal fields).
                    let answers = {};
                    try {
                        answers = Mutate(await withRequest({ ...req, user: { _id: user._id }, origin: user.origin || req.origin }, () => answerController.getAnswers({ user: String(user._id) }))) || {};
                    } catch { answers = {}; }
                    const home = Array.isArray(user.address) && user.address[0] ? user.address[0] : {};
                    return {
                        message,
                        data: {
                            _id: user._id,
                            name: { first: user?.name?.first, middle: user?.name?.middle, last: user?.name?.last },
                            teen: {
                                mail: maskEmail(user.mail),
                                phone: user.phone ? `••••${String(user.phone).slice(-3)}` : "",
                                dob: user.dob,
                                gender: user.gender,
                                address: { country: home.country, state: home.state, city: home.city, zipcode: home.zipcode },
                                answers
                            },
                            category: user.category,
                            origin: user.origin,
                            // The guardian's own record, minus internal fields.
                            parent: {
                                relation: user.parent?.relation, name: user.parent?.name, email: user.parent?.email, phone: user.parent?.phone,
                                dob: user.parent?.dob, gender: user.parent?.gender, consent: user.parent?.consent, consentStatus: user.parent?.consentStatus,
                                decision: user.parent?.decision, onboarding: user.parent?.onboarding, onboardingAt: user.parent?.onboardingAt
                            },
                            teenConsent: user.teenConsent ? { version: user.teenConsent.version, acceptedAt: user.teenConsent.acceptedAt } : null,
                            ref: registrationRef(user),
                            expiresAt: otp.expiresAt,
                            terms: { version: GUARDIAN_TERMS_VERSION },
                            isMinor: user.isMinor,
                            registrationStatus: user.registrationStatus
                        }
                    };
                }
                return { message, data: user };
            },
            userController
        )
    )
    .put(
        selfOrAdmin("id"),
        expressRoute(
            async req => {
                // update single entry: a member only their own SELF_EDITABLE fields, an admin anything but ADMIN_BLOCKED
                let message = "";
                const update = userUpdate(req.body, { isAdmin: req.isAdmin });
                if (!Object.keys(update).length) throw new Error("Nothing to update");
                // terms carry the consent kit's "marketing" id: keep User.marketingOptIn in step (teens never keep it)
                let termsBefore = null;
                if (Array.isArray(update.terms)) {
                    const cur = await UserModel.findOne({ _id: req.params.id, origin: req.origin }).select("terms category").lean();
                    termsBefore = cur?.terms || [];
                    update.terms = Marketing.stripForTeen(cur, update.terms);
                }
                let data = await userController.update(req.params.id, update)
                if (termsBefore) {
                    const next = Marketing.termsChange(termsBefore, update.terms);
                    if (next !== null) await Marketing.setOptIn(req.params.id, req.origin, next, req.isAdmin ? "admin" : "profile", req.isAdmin ? `admin:${req.user?._id || ""}` : "member");
                }
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
                // Public (the "resend verification e-mail" button). It never returns the member's record.
                let message = req.body.action;
                let data = await userController.read(req.params.id);
                if (req.body.action === "resend-otp") {
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

                    return { message, data: [] };
                }
                return { message, data: [] };
            },
            userController
        )
    )
    .delete(
        requireAdmin,
        expressRoute(
            async req => {
                // delete single entry
                let message = "";
                let data = await userController.delete(req.params.id)
                if (data) await tombstone("member", data);
                return { message, data };
            },
            userController
        )
    )
router.get(
    "/:id/profile",
    selfOrAdmin("id"),
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
    selfOrAdmin("id"),
    expressRoute(
        async (req) => {
            const data = await responseController.list({ user: req.params.id })
            return { message: `Total ${data.length} records found`, status: "success", data }
        },
        responseController
    )
)
export default router;