// Rate limits for the sign-up, login, CAPTCHA and email-link endpoints.
// Uses express-rate-limit (already a dependency). Counts are kept per client IP in memory, which is
// enough for one API process; behind several processes each one keeps its own count.
import rateLimit from "express-rate-limit";

const clientKey = (req) =>
    String(req.clientIP || (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.ip || "unknown");

const make = (windowMinutes, limit, message, extra = {}) =>
    rateLimit({
        windowMs: windowMinutes * 60 * 1000,
        limit,
        standardHeaders: "draft-7",
        legacyHeaders: false,
        validate: false,
        keyGenerator: clientKey,
        handler: (req, res) => res.status(429).json({ status: "error", message }),
        ...extra
    });

// New CAPTCHA pictures: plenty for people refreshing, too few for a solver farm.
export const captchaLimit = make(10, 60, "Too many new codes. Please wait a few minutes and try again.");

// Failed logins only (successful ones don't count), per IP + email.
export const loginLimit = make(15, 10, "Too many login attempts. Please wait 15 minutes or reset your password.", {
    skipSuccessfulRequests: true,
    keyGenerator: (req) => `${clientKey(req)}|${String(req.body?.mail || req.body?.phone || "").toLowerCase()}`
});

// New registrations from one IP.
export const registerLimit = make(60, 10, "Too many sign-ups from this connection. Please try again in an hour.");

// Email-link codes (6 digits) must not be guessable by brute force.
export const linkLimit = make(15, 30, "Too many attempts with this link. Please wait 15 minutes and try again.", {
    skipSuccessfulRequests: true
});
