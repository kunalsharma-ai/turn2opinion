// Server-side CAPTCHA for registration and login.
//
// A challenge is stored as a short-lived OTP document (channel "captcha") so it works across
// several API processes and expires through the OTP collection's existing TTL index.
// Each challenge can be checked exactly once: verify() deletes it whatever the answer, so a
// solved or failed challenge can never be replayed or brute-forced. Answers are compared
// case-insensitively (the picture code only uses capital letters and digits).
//
// The picture is drawn as SVG paths from a small stroke font, never as <text>, so the answer is
// not readable from the markup.
import crypto from "node:crypto";
import mongoose from "mongoose";
import { OTP as otpModel } from "../model/index.js";

const CHARS = "ABCDEFGHJKLMNPRSTUVWXYZ2345678";
const TTL_MS = 5 * 60 * 1000;

// Stroke font on a 4 x 6 grid: each glyph is a list of polylines.
const GLYPHS = {
    A: [[[0, 6], [2, 0], [4, 6]], [[1, 3.6], [3, 3.6]]],
    B: [[[0, 0], [0, 6], [3, 6], [4, 5], [4, 4], [3, 3], [0, 3]], [[0, 0], [3, 0], [3.8, 0.8], [3.8, 2.2], [3, 3]]],
    C: [[[4, 0.6], [3.2, 0], [1, 0], [0, 1.2], [0, 4.8], [1, 6], [3.2, 6], [4, 5.4]]],
    D: [[[0, 0], [0, 6], [2.6, 6], [4, 4.6], [4, 1.4], [2.6, 0], [0, 0]]],
    E: [[[4, 0], [0, 0], [0, 6], [4, 6]], [[0, 3], [3, 3]]],
    F: [[[4, 0], [0, 0], [0, 6]], [[0, 3], [3, 3]]],
    G: [[[4, 0.8], [3, 0], [1, 0], [0, 1.2], [0, 4.8], [1, 6], [3, 6], [4, 5], [4, 3.4], [2.4, 3.4]]],
    H: [[[0, 0], [0, 6]], [[4, 0], [4, 6]], [[0, 3], [4, 3]]],
    J: [[[4, 0], [4, 4.8], [3, 6], [1, 6], [0, 5]]],
    K: [[[0, 0], [0, 6]], [[4, 0], [0, 3.4]], [[1.4, 2.4], [4, 6]]],
    L: [[[0, 0], [0, 6], [4, 6]]],
    M: [[[0, 6], [0, 0], [2, 3.4], [4, 0], [4, 6]]],
    N: [[[0, 6], [0, 0], [4, 6], [4, 0]]],
    P: [[[0, 6], [0, 0], [3, 0], [4, 1], [4, 2.2], [3, 3.2], [0, 3.2]]],
    R: [[[0, 6], [0, 0], [3, 0], [4, 1], [4, 2.2], [3, 3.2], [0, 3.2]], [[2, 3.2], [4, 6]]],
    S: [[[4, 0.8], [3, 0], [1, 0], [0, 1], [0, 2.2], [1, 3], [3, 3], [4, 3.8], [4, 5], [3, 6], [1, 6], [0, 5.2]]],
    T: [[[0, 0], [4, 0]], [[2, 0], [2, 6]]],
    U: [[[0, 0], [0, 4.8], [1, 6], [3, 6], [4, 4.8], [4, 0]]],
    V: [[[0, 0], [2, 6], [4, 0]]],
    W: [[[0, 0], [1, 6], [2, 2.6], [3, 6], [4, 0]]],
    X: [[[0, 0], [4, 6]], [[4, 0], [0, 6]]],
    Y: [[[0, 0], [2, 3], [4, 0]], [[2, 3], [2, 6]]],
    Z: [[[0, 0], [4, 0], [0, 6], [4, 6]]],
    2: [[[0, 1], [1, 0], [3, 0], [4, 1], [4, 2.4], [0, 6], [4, 6]]],
    3: [[[0, 0.6], [1, 0], [3, 0], [4, 1], [4, 2], [3, 3], [1.6, 3]], [[3, 3], [4, 4], [4, 5], [3, 6], [1, 6], [0, 5.4]]],
    4: [[[3, 6], [3, 0], [0, 4.2], [4, 4.2]]],
    5: [[[4, 0], [0.4, 0], [0, 2.8], [3, 2.6], [4, 3.6], [4, 5], [3, 6], [1, 6], [0, 5.2]]],
    6: [[[3.6, 0], [1.4, 0], [0, 1.6], [0, 4.8], [1, 6], [3, 6], [4, 5], [4, 3.8], [3, 2.8], [1, 2.8], [0, 3.8]]],
    7: [[[0, 0], [4, 0], [1.4, 6]]],
    8: [[[1, 3], [0, 2], [0, 1], [1, 0], [3, 0], [4, 1], [4, 2], [3, 3], [1, 3], [0, 4], [0, 5], [1, 6], [3, 6], [4, 5], [4, 4], [3, 3]]]
};

// the answer comes from crypto (never Math.random, whose output can be predicted); the drawing noise doesn't matter
const pick = (n) => crypto.randomInt(n);
const rnd = (n) => Math.floor(Math.random() * n);
const jitter = (n) => (Math.random() - 0.5) * n;

function glyphPath(ch, x, y, scale, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return (GLYPHS[ch] || [])
        .map((line) =>
            line
                .map(([gx, gy], i) => {
                    const lx = (gx - 2) * scale + jitter(1.6);
                    const ly = (gy - 3) * scale + jitter(1.6);
                    const px = x + lx * cos - ly * sin;
                    const py = y + lx * sin + ly * cos;
                    return `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`;
                })
                .join("")
        )
        .join("");
}

function drawSvg(code) {
    const w = 168;
    const h = 52;
    const colours = ["#0E1B4D", "#1F5BFF", "#7B5CFF", "#D6336C"];
    let noise = "";
    for (let i = 0; i < 6; i++) {
        noise += `<path d="M${rnd(w)} ${rnd(h)}C${rnd(w)} ${rnd(h)} ${rnd(w)} ${rnd(h)} ${rnd(w)} ${rnd(h)}" stroke="hsla(${200 + rnd(80)},70%,55%,.45)" stroke-width="${(1 + Math.random()).toFixed(1)}" fill="none"/>`;
    }
    for (let i = 0; i < 40; i++) noise += `<rect x="${rnd(w)}" y="${rnd(h)}" width="2" height="2" fill="hsla(${rnd(360)},60%,50%,.35)"/>`;
    const letters = code
        .split("")
        .map((ch, i) => {
            const d = glyphPath(ch, 20 + i * 31 + jitter(4), 26 + jitter(6), 4.6 + Math.random() * 0.8, (rnd(36) - 18) * (Math.PI / 180));
            return `<path d="${d}" stroke="${colours[rnd(colours.length)]}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
        })
        .join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8EEFF"/><stop offset="1" stop-color="#F3E9FF"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/>${noise}${letters}</svg>`;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

const normalise = (v) => String(v ?? "").replace(/\s+/g, "").toUpperCase();

/** Create a challenge. mode "image" (5-character picture) or "text" (a small sum, for accessibility). */
export async function createCaptcha(origin, mode = "image") {
    const id = new mongoose.Types.ObjectId();
    let answer;
    let payload;
    if (mode === "text") {
        const a = 2 + pick(8);
        const b = 1 + pick(9);
        answer = String(a + b);
        payload = { mode: "text", question: `What is ${a} plus ${b}?` };
    } else {
        answer = Array.from({ length: 5 }, () => CHARS[pick(CHARS.length)]).join("");
        payload = { mode: "image", image: drawSvg(answer) };
    }
    await otpModel.create({
        user: id,
        channel: "captcha",
        code: answer,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + TTL_MS),
        origin
    });
    return { id: String(id), expiresIn: TTL_MS / 1000, ...payload };
}

/** One-time check. Returns true only for an unexpired, unused challenge with the right answer. */
export async function verifyCaptcha(origin, id, answer) {
    if (!id || !/^[a-f0-9]{24}$/i.test(String(id)) || !answer || typeof answer !== "string") return false;
    const doc = await otpModel.findOneAndDelete({ user: id, channel: "captcha", origin });
    if (!doc) return false;
    if (new Date(doc.expiresAt).getTime() < Date.now()) return false;
    return normalise(doc.code) === normalise(answer);
}

/**
 * Checks req.body.captcha ({ id, answer }) and removes it from the body.
 * Clients that send no captcha (older apps) are let through unless CAPTCHA_REQUIRED=true,
 * so switching it on is a deploy setting, not a code change.
 */
export async function requireCaptcha(req) {
    const b = req.body || {};
    // { captcha: { id, answer } } from code, or flat captchaId / captchaAnswer fields from a plain form
    const c = b.captcha || (b.captchaId ? { id: b.captchaId, answer: b.captchaAnswer } : null);
    for (const k of ["captcha", "captchaId", "captchaAnswer"]) if (k in b) delete b[k];
    if (!c) {
        if (process.env.CAPTCHA_REQUIRED === "true") throw new Error("Complete the human check.");
        return;
    }
    const ok = await verifyCaptcha(req.origin, String(c.id || ""), typeof c.answer === "string" ? c.answer : "");
    if (!ok) throw new Error("The human check didn’t match or has expired. Please try the new code.");
}
