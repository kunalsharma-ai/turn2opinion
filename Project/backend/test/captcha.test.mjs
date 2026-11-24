// Human check on sign-up and login (port of turn2opinion's utils/captcha.js). Real routes, real MongoDB.
//   MONGO_URL=mongodb://127.0.0.1:27017 BRAND=www.turn2opinion.com node --test --test-force-exit test/captcha.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const API_DIR = process.env.API_DIR || path.resolve(here, "..");
const from = (p) => import(pathToFileURL(path.join(API_DIR, p)).href);
dns.resolveMx = (domain, cb) => cb(null, [{ exchange: `mx.${domain}`, priority: 10 }]);
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
delete process.env.CAPTCHA_REQUIRED;

const { default: mongoose } = await import("mongoose");
const { default: express } = await import("express");
const { default: appRoute } = await from(process.env.ROUTES || "app/routes/index.js");
const { setOrigin } = await from(process.env.UTILS || "app/utils/index.js");

await mongoose.connect(`${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/captcha_${Date.now()}`);
const db = mongoose.connection.db;
const app = express();
app.use([express.json(), setOrigin, appRoute]);
const server = await new Promise((r) => { const s = app.listen(0, "127.0.0.1", () => r(s)); });
const HOST = process.env.BRAND || "www.myfrequentrewards.com";

let ipN = 0;
const call = (method, p, body) => new Promise((resolve, reject) => {
    const raw = body === undefined ? "" : JSON.stringify(body);
    ipN += 1;
    const req = http.request({ host: "127.0.0.1", port: server.address().port, method, path: p, headers: { host: HOST, "content-type": "application/json", "content-length": Buffer.byteLength(raw), "x-real-ip": `10.7.${ipN >> 8}.${ipN & 255}`, "x-forwarded-for": `10.7.${ipN >> 8}.${ipN & 255}` } }, (res) => {
        let t = ""; res.on("data", (c) => { t += c; });
        res.on("end", () => { let json = {}; try { json = JSON.parse(t); } catch { /* not JSON */ } resolve({ status: res.statusCode, json, text: t }); });
    });
    req.on("error", reject);
    req.end(raw);
});
const fresh = async (mode) => {
    const r = await call("GET", `/api/v1/user/captcha${mode ? `?mode=${mode}` : ""}`);
    const d = r.json.data;
    const doc = await db.collection("OTP").findOne({ user: new mongoose.Types.ObjectId(d.id), channel: "captcha" });
    return { ...d, answer: doc.code };
};
const msg = (r) => String(r.json.message || "");
const login = { mail: "nobody@example.invalid", password: "Not-the-password-1" };

test("a challenge is a picture drawn as paths (the answer is not in the markup), or a small sum", async () => {
    const c = await fresh();
    assert.equal(c.mode, "image");
    const svg = Buffer.from(c.image.split(",")[1], "base64").toString("utf8");
    assert.ok(svg.startsWith("<svg") && !svg.includes("<text") && !svg.includes(c.answer));
    assert.match(c.answer, /^[A-Z2-9]{5}$/);
    const t = await fresh("text");
    assert.match(t.question, /^What is \d plus \d\?$/);
});

test("with CAPTCHA_REQUIRED=true, login and sign-up without a check are refused", async () => {
    process.env.CAPTCHA_REQUIRED = "true";
    try {
        assert.match(msg(await call("POST", "/api/v1/user/login", login)), /human check/i);
        const before = await db.collection("User").countDocuments();
        const r = await call("PUT", "/api/v1/user", { mail: "bot@example.invalid", name: { first: "B", last: "Ot" }, dob: "1990-01-01", gender: "Female", category: "b2c" });
        assert.match(msg(r), /human check/i);
        assert.equal(await db.collection("User").countDocuments(), before, "no account is made");
    } finally { delete process.env.CAPTCHA_REQUIRED; }
    assert.doesNotMatch(msg(await call("POST", "/api/v1/user/login", login)), /human check/i, "older apps still work until it is switched on");
});

test("each challenge is checked once: a wrong answer spends it, and so does a right one", async () => {
    const c = await fresh();
    assert.match(msg(await call("POST", "/api/v1/user/login", { ...login, captcha: { id: c.id, answer: "WRONG" } })), /didn.t match|expired/i);
    assert.match(msg(await call("POST", "/api/v1/user/login", { ...login, captcha: { id: c.id, answer: c.answer } })), /didn.t match|expired/i, "spent by the wrong guess");
    const ok = await fresh();
    const r = await call("POST", "/api/v1/user/login", { ...login, captcha: { id: ok.id, answer: ok.answer.toLowerCase() } });
    assert.doesNotMatch(msg(r), /human check|didn.t match/i, "a right answer (any case) passes on to the password check");
    assert.match(msg(await call("POST", "/api/v1/user/login", { ...login, captcha: { id: ok.id, answer: ok.answer } })), /didn.t match|expired/i, "and can't be replayed");
});

test("a plain form can send captchaId and captchaAnswer; filters and expired checks are refused", async () => {
    const c = await fresh("text");
    assert.doesNotMatch(msg(await call("POST", "/api/v1/user/login", { ...login, captchaId: c.id, captchaAnswer: c.answer })), /human check|didn.t match/i);
    const d = await fresh();
    assert.match(msg(await call("POST", "/api/v1/user/login", { ...login, captcha: { id: { $ne: null }, answer: { $ne: null } } })), /didn.t match|expired/i);
    await db.collection("OTP").updateOne({ user: new mongoose.Types.ObjectId(d.id) }, { $set: { expiresAt: new Date(Date.now() - 1000) } });
    assert.match(msg(await call("POST", "/api/v1/user/login", { ...login, captcha: { id: d.id, answer: d.answer } })), /didn.t match|expired/i);
});

test.after(async () => { server.close(); await db.dropDatabase(); await mongoose.disconnect(); });
