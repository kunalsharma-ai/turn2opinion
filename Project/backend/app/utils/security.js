// Request hardening shared by every member route (added Nov 2026, "keep the portal safe from hackers and bots").
//   securityHeaders  browser security headers on every answer, and no caching of API answers
//   sanitizeInput    drops Mongo operators that run code, reach other collections or scan text from bodies and queries
//   clientIp         the visitor's address as the gateway saw it (nginx sets X-Real-IP to $remote_addr)
//   limit            a per-address rate limit with a friendly 429
import rateLimit from "express-rate-limit";

export function securityHeaders(req, res, next) {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    if (String(req.originalUrl || req.url).startsWith("/api/")) {
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
    }
    next();
}

// The browser may still send ordinary filters ($in, $nin, $gt...) - the member and old admin pages do. These never:
const BLOCKED = new Set([
    "$where", "$function", "$accumulator", "$expr", "$jsonSchema", "$regex", "$options", "$text", "$lookup",
    "$graphLookup", "$unionWith", "$out", "$merge", "$set", "$unset", "$rename", "$inc", "$push", "$pull",
    "$addToSet", "$setOnInsert", "$currentDate", "$mul", "$min", "$max", "$bit",
]);
const BAD_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export function clean(v, depth = 0) {
    if (depth > 20) return undefined;
    if (Array.isArray(v)) return v.map((x) => clean(x, depth + 1));
    if (v && typeof v === "object" && !(v instanceof Date) && !Buffer.isBuffer(v)) {
        const o = {};
        for (const [k, x] of Object.entries(v)) {
            if (BAD_KEYS.has(k) || BLOCKED.has(k) || k.includes("\0")) continue;
            o[k] = clean(x, depth + 1);
        }
        return o;
    }
    return v;
}
export function sanitizeInput(req, res, next) {
    if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) req.body = clean(req.body);
    if (req.query && typeof req.query === "object") {
        const q = clean(req.query);
        for (const k of Object.keys(req.query)) delete req.query[k];
        Object.assign(req.query, q);
    }
    next();
}

export const clientIp = (req) =>
    String(req.headers["x-real-ip"] || req.socket?.remoteAddress || req.ip || "").trim();

export const limit = (max, minutes, message = "Too many attempts. Please wait a few minutes and try again.") => rateLimit({
    windowMs: minutes * 60 * 1000, max, standardHeaders: true, legacyHeaders: false, validate: false,
    keyGenerator: (req) => `${req.origin || ""}|${clientIp(req)}`,
    handler: (req, res) => res.status(429).json({ status: "error", message }),
});
