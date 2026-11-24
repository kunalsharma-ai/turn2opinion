// Teen registration helpers (Teen panel, ages 13-17; 21 Nov 2026).
// Used by routes/api/User.js. Nothing here talks to the database directly.
import crypto from "crypto";
import { getMailer, sendMail } from "./index.js";
import { cleanProfilingAnswer, isProfilingKey } from "./parentProfile.js";

// Version strings stored with every consent record. Bump when the wording changes.
export const TEEN_REG_CONSENT_VERSION = "T2O-TEEN-REG-2026.11";   // the teen's own step-3 confirmations
export const GUARDIAN_TERMS_VERSION = "MINOR-2026.10";            // the guardian agreement (Parts A-C)

// The teen's step-3 statements. Every one is required and recorded by id.
export const TEEN_STATEMENTS = ["guardian-aware", "terms", "privacy", "teen-notice", "how-it-works", "accurate", "not-consent"];

// Guardian consent selections (agreement MINOR-2026.10, Part B3).
export const GUARDIAN_REQUIRED = ["participation", "privacy", "contact"];
export const GUARDIAN_OPTIONAL = ["studyContact", "recording", "sensitive"];

export const DECLINE_REASONS = ["not-now", "learn-more", "privacy", "activities", "not-guardian", "not-recognised", "other"];

// ---------- signed links ----------
// Email links carry the one-time code from the OTP store AND a signature over (user, channel, code).
// The code alone is six digits; the signature makes a link impossible to guess, and because the code
// changes with every new link, each signature is unique and dies with its code.
const secret = () => process.env.LINK_SECRET || process.env.JWT_SECRET || "t2o-link";
export function linkSig(user, channel, code) {
    return crypto.createHmac("sha256", secret()).update(`${user}|${channel}|${code}`).digest("hex").slice(0, 32);
}
export function sigOk(user, channel, code, sig) {
    if (typeof sig !== "string" || sig.length !== 32) return false;
    const want = Buffer.from(linkSig(user, channel, code));
    const got = Buffer.from(sig);
    return want.length === got.length && crypto.timingSafeEqual(want, got);
}
/** What a template needs to build a link: never the OTP document itself. */
export const linkFor = (user, channel, otp) =>
    otp && otp.code ? { code: otp.code, sig: linkSig(String(user), channel, otp.code), expiresAt: otp.expiresAt } : null;

// ---------- masking ----------
export function maskEmail(v) {
    const [u, d] = String(v || "").split("@");
    if (!d) return "";
    const [host, ...rest] = d.split(".");
    const mu = u.length <= 2 ? `${u[0] || ""}•` : `${u[0]}${"•".repeat(Math.min(6, u.length - 2))}${u.slice(-1)}`;
    const mh = host.length <= 2 ? `${host[0] || ""}•` : `${host[0]}${"•".repeat(Math.min(5, host.length - 1))}`;
    return `${mu}@${mh}.${rest.join(".")}`;
}

export const registrationRef = (u) => (u && u._id ? `T2O-TN-${String(u._id).slice(-6).toUpperCase()}` : "");

// ---------- answers from the guardian onboarding form ----------
// Keys follow the questionnaire (P01..P12, HQ1/HQ2/HQ4, parent-*). Only strings and string lists,
// trimmed and capped; "Other" free text is kept under <key>-other.
// The parent profiling questions (Teen bank names such as teen-h001, household-income) are kept only
// with values the bank holds (utils/parentProfile.js).
const KEY = /^(P\d{2}|HQ\d|parent-[a-z-]{2,30})(-other)?$/;
export function cleanOnboarding(a) {
    if (!a || typeof a !== "object" || Array.isArray(a)) return null;
    const out = {};
    for (const [k, v] of Object.entries(a).slice(0, 120)) {
        if (isProfilingKey(k)) {
            const p = cleanProfilingAnswer(k, v, a.P01);
            if (p) out[k] = p;
            continue;
        }
        if (!KEY.test(k)) continue;
        if (Array.isArray(v)) {
            const list = v.filter((x) => typeof x === "string").map((x) => x.trim().slice(0, 120)).filter(Boolean).slice(0, 20);
            if (list.length) out[k] = list;
        } else if (typeof v === "string" || typeof v === "number") {
            const s = String(v).trim().slice(0, 300);
            if (s) out[k] = s;
        }
    }
    return out;
}
// The questions that must be answered before the consent form opens.
export const ONBOARDING_REQUIRED = ["parent-first-name", "parent-dob", "P01", "P03", "parent-marital", "P04", "P11", "P06", "P07", "P12"];
export function onboardingErrors(a) {
    const missing = ONBOARDING_REQUIRED.filter((k) => !a[k] || (Array.isArray(a[k]) && !a[k].length));
    if (missing.length) return "Please answer every required question in the onboarding form.";
    if (a.P04 === "no") return "Only a parent or legally authorised guardian can give this permission.";
    const contact = Array.isArray(a.P07) ? a.P07 : [a.P07];
    if (contact.some((c) => ["sms", "call", "whatsapp"].includes(c)) && !a.P09) return "Add a mobile number, or choose email only.";
    return "";
}

// ---------- mail ----------
/** Render a template from Project/mailer and send it. Failures are logged, never thrown. */
export async function teenMail(req, to, template, subject, data) {
    if (!to) return false;
    try {
        const m = await getMailer("register", template, data);
        await sendMail({ origin: req.origin, "content-type": "application/json" }, to, subject, m.data);
        return true;
    } catch (err) {
        console.error(`teen mail ${template} not sent`, err?.message);
        return false;
    }
}
export const brand = () => process.env.PROJECT_NAME || "Turn2Opinion";
