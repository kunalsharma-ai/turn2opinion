// Hardening against attackers and bots (Kunal, 24 Nov 2026: "no hacker or AI bot can hack this portal"), the T2O copy
// of kunalsharma-ai/MFR#62. Needs MongoDB; skipped without MONGO_URL.
//
//   MONGO_URL=mongodb://127.0.0.1:27017/t2o_security_hardening npm test
import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import http from "node:http";

const MONGO = process.env.MONGO_URL;
dns.resolveMx = (domain, cb) => cb(null, [{ exchange: `mx.${domain}`, priority: 10 }]);
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
delete process.env.SOCIAL_JWT_SECRET;

if (!MONGO) {
    test("security hardening (needs MONGO_URL)", { skip: true }, () => {});
} else {
    const { default: mongoose } = await import("mongoose");
    const { default: express } = await import("express");
    const { default: cookieParser } = await import("cookie-parser");
    const { default: jwt } = await import("jsonwebtoken");
    const { default: appRoute } = await import("../app/routes/index.js");
    const { setOrigin, Token } = await import("../app/utils/index.js");
    const { default: otpController } = await import("../app/controller/OTP.js");
    const { clean } = await import("../app/utils/security.js");
    const { default: bcrypt } = await import("bcryptjs");

    await mongoose.connect(`${MONGO}_${Date.now()}`);
    const db = mongoose.connection.db;
    const app = express();
    app.use([express.json(), cookieParser(), setOrigin, appRoute]);
    const server = await new Promise((r) => { const s = app.listen(0, "127.0.0.1", () => r(s)); });
    const PORT = server.address().port;
    const T2O = "www.turn2opinion.com", MFR = "www.myfrequentrewards.com", MHO = "www.myhealthopinions.com";

    let ipN = 0;
    const call = (host, method, path, body, { token } = {}) => new Promise((resolve, reject) => {
        const raw = body === undefined ? "" : JSON.stringify(body);
        ipN += 1;
        const req = http.request({ host: "127.0.0.1", port: PORT, method, path, headers: { host, "content-type": "application/json", "content-length": Buffer.byteLength(raw), "x-real-ip": `10.2.${ipN >> 8}.${ipN & 255}`, "x-forwarded-for": `10.2.${ipN >> 8}.${ipN & 255}`, ...(token ? { authorization: `Bearer ${token}` } : {}) } }, (res) => {
            let text = "";
            res.on("data", (c) => { text += c; });
            res.on("end", () => { let json = {}; try { json = JSON.parse(text); } catch { /* not JSON */ } resolve({ status: res.statusCode, json, text, headers: res.headers }); });
        });
        req.on("error", reject);
        req.end(raw);
    });
    const base = (origin) => ({ origin, isActive: true, isDeleted: false, createdAt: new Date(), updatedAt: new Date() });
    let n = 0;
    async function person(origin, { role = "respondent", password } = {}) {
        n += 1;
        const doc = { ...base(origin), name: { first: `Person${n}`, last: "Test" }, mail: `person${n}@example.invalid`, role, category: "b2c", dob: new Date("1990-01-01"), gender: "Female", isVerified: { email: "verified" }, memberStatus: "active", ...(password ? { password: await bcrypt.hash(password, 10) } : {}) };
        const { insertedId } = await db.collection("User").insertOne(doc);
        return { id: String(insertedId), mail: doc.mail, token: Token.generate({ _id: String(insertedId), origin }) };
    }
    const member = await person(T2O);
    const admin = await person(T2O, { role: "admin" });
    const mfrMember = await person(MFR);

    test("question, category, option, survey, testimonial and social changes need an admin", async () => {
        const { insertedId: q } = await db.collection("Question").insertOne({ ...base(T2O), name: "q_lock", label: "Locked?", type: "radio", category: ["b2c"] });
        const { insertedId: c } = await db.collection("Category").insertOne({ ...base(T2O), name: "cat_lock", label: "Cat" });
        const { insertedId: s } = await db.collection("Survey").insertOne({ ...base(T2O), name: "Locked survey", slug: "locked", points: 100 });
        const writes = [
            ["PUT", "/api/v1/question", { name: "q_new", label: "New", type: "radio" }],
            ["PUT", `/api/v1/question/${q}`, { label: "Hacked" }],
            ["DELETE", `/api/v1/question/${q}`],
            ["PUT", `/api/v1/category/${c}`, { label: "Hacked" }],
            ["PUT", "/api/v1/option/q_lock", { value: "9", label: "Evil" }],
            ["PUT", "/api/v1/survey", { name: "Evil", slug: "evil" }],
            ["PUT", `/api/v1/survey/${s}`, { points: 999999 }],
            ["GET", "/api/v1/survey/responses/locked"],
            ["PUT", "/api/v1/project-dev", { project: "x" }],
            ["PUT", "/api/v1/batch", { name: "spam", emails: ["a@example.invalid"], scheduledAt: new Date() }],
            ["POST", "/api/v1/integration/response/000000000000000000000000", { data: {} }],
        ];
        for (const [method, path, body] of writes) {
            assert.ok([401, 403].includes((await call(T2O, method, path, body)).status), `${method} ${path} without sign-in`);
            assert.equal((await call(T2O, method, path, body, { token: member.token })).status, 403, `${method} ${path} as a member`);
        }
        assert.equal((await db.collection("Question").findOne({ _id: q })).label, "Locked?");
        assert.equal((await db.collection("Survey").findOne({ _id: s })).points, 100);
        const ok = await call(T2O, "PUT", `/api/v1/question/${q}`, { label: "Fixed by admin" }, { token: admin.token });
        assert.equal(ok.status, 200, ok.text.slice(0, 200));
        assert.equal((await call(T2O, "GET", "/api/v1/question")).status, 200, "reading stays public");
    });

    test("only the member who owns a survey response can close it, and only to an end status", async () => {
        const other = await person(T2O);
        const { insertedId: r } = await db.collection("Response").insertOne({ ...base(T2O), user: new mongoose.Types.ObjectId(member.id), status: "invited", survey: { slug: "locked" }, points: 100 });
        assert.equal((await call(T2O, "PATCH", "/api/v1/survey/response", { sid: String(r), status: "complete" })).status, 401);
        await call(T2O, "PATCH", "/api/v1/survey/response", { sid: String(r), status: "complete" }, { token: other.token });
        assert.equal((await db.collection("Response").findOne({ _id: r })).status, "invited", "another member can't close it");
        await call(T2O, "PATCH", "/api/v1/survey/response", { sid: String(r), status: "approved" }, { token: member.token });
        assert.equal((await db.collection("Response").findOne({ _id: r })).status, "invited", "not to a status of the member's choosing");
        await call(T2O, "PATCH", "/api/v1/survey/response", { sid: String(r), status: "complete" }, { token: member.token });
        assert.equal((await db.collection("Response").findOne({ _id: r })).status, "complete");
    });

    test("sign-in: 10 wrong passwords lock the account, whatever address the bot uses", async () => {
        const p = await person(T2O, { password: "Right-Password-1" });
        for (let i = 0; i < 10; i += 1) await call(T2O, "POST", "/api/v1/user/login", { mail: p.mail, password: `wrong-${i}` });
        const locked = await call(T2O, "POST", "/api/v1/user/login", { mail: p.mail, password: "Right-Password-1" });
        assert.match(locked.json.message || "", /too many wrong attempts/i, locked.text.slice(0, 200));
    });

    test("an emailed code allows 5 wrong guesses, then it is gone; ids only", async () => {
        const p = await person(T2O);
        await db.collection("OTP").insertOne({ ...base(T2O), user: new mongoose.Types.ObjectId(p.id), channel: "email", code: "123456", createdAt: new Date(), expiresAt: new Date(Date.now() + 864e5) });
        for (let i = 0; i < 5; i += 1) assert.equal(await otpController.verify(p.id, "email", T2O, String(200000 + i)), null);
        assert.equal(await otpController.verify(p.id, "email", T2O, "123456"), null, "the right code no longer works");
        await db.collection("OTP").insertOne({ ...base(T2O), user: new mongoose.Types.ObjectId(p.id), channel: "email", code: "654321", createdAt: new Date(), expiresAt: new Date(Date.now() + 864e5) });
        assert.equal(await otpController.verify({ $ne: null }, "email", T2O, "654321"), null);
        assert.ok(await otpController.verify(p.id, "email", T2O, "654321"));
    });

    test("change of e-mail: an expired code and a sign-in token are refused", async () => {
        const p = await person(T2O);
        await db.collection("OTP").insertOne({ ...base(T2O), user: new mongoose.Types.ObjectId(p.id), channel: "email", code: "111111", createdAt: new Date(), expiresAt: new Date(Date.now() - 1000) });
        const link = Token.generate({ user: p.id, otp: "111111", email: "taken.over@example.invalid" }, "24h");
        await call(T2O, "PATCH", "/api/v1/change-email", { token: link });
        assert.equal((await db.collection("User").findOne({ _id: new mongoose.Types.ObjectId(p.id) })).mail, p.mail);
        const signin = await call(T2O, "PATCH", "/api/v1/change-email", { token: p.token });
        assert.match(signin.json.message || "", /not valid/i);
    });

    test("social sign-on: the key that used to be in the code no longer signs anyone in", async () => {
        const OLD = "8e2a8ad9aa0f57a3f8dd7ddda64da43745ee88dec1877a12bc639894937ac600b70721aa431ce6c778bc640b04fbfaecf8fdc68bfa989fb138bff5bfde2f647c";
        const r = await call(T2O, "GET", `/api/v1/auth/socials?token=${jwt.sign({ email: member.mail }, OLD)}`);
        assert.ok(!String(r.headers["set-cookie"] || "").includes("eyJ"), "no session token in a cookie");
        assert.match(String(r.headers.location || ""), /signup=1/);
    });

    test("tokens: only HS256; an admin of one brand can't read a member of another brand by id", async () => {
        const none = jwt.sign({ _id: member.id, origin: T2O }, null, { algorithm: "none" });
        assert.equal((await call(T2O, "GET", "/api/v1/me", undefined, { token: none })).status, 401);
        const r = await call(T2O, "GET", `/api/v1/user/${mfrMember.id}`, undefined, { token: admin.token });
        assert.ok(!r.text.includes(mfrMember.mail), r.text.slice(0, 200));
    });

    test("requests for different brands at the same moment never see each other's data", async () => {
        const tags = { [T2O]: "zzt2ozz", [MFR]: "zzmfrzz", [MHO]: "zzmhozz" };
        for (const [origin, tag] of Object.entries(tags)) {
            await db.collection("Question").insertOne({ ...base(origin), name: "same_name", label: `Label ${tag}`, type: "radio", category: ["b2c"] });
            await db.collection("Option").insertMany(Array.from({ length: 3 }, (_, i) => ({ ...base(origin), question: "same_name", value: `v${i}`, label: `Option ${tag}` })));
        }
        const res = await Promise.all(Array.from({ length: 90 }, (_, i) => { const h = [T2O, MFR, MHO][i % 3]; return call(h, "GET", "/api/v1/question").then((r) => [h, r]); }));
        for (const [host, r] of res) for (const [o, tag] of Object.entries(tags)) if (o !== host) assert.ok(!r.text.includes(tag), `${host} saw ${o}'s questions`);
    });

    test("code-running operators are dropped; security headers are sent", async () => {
        assert.deepEqual(clean({ a: { $in: [1] }, $where: "1", b: { $expr: {} } }), { a: { $in: [1] }, b: {} });
        const r = await call(T2O, "GET", "/api/v1/question");
        assert.equal(r.headers["x-content-type-options"], "nosniff");
        assert.equal(r.headers["cache-control"], "no-store");
    });

    test.after(async () => { server.close(); await mongoose.connection.db.dropDatabase(); await mongoose.disconnect(); });
}
