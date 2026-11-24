// Public read of pages published from the MADP console (the editor is the MFR admin API; brands share one database).
//   MONGO_URL=mongodb://127.0.0.1:27017/t2o_content npm test
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

const MONGO = process.env.MONGO_URL;
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

if (!MONGO) {
    test("content pages (needs MONGO_URL)", { skip: true }, () => {});
} else {
    const { default: mongoose } = await import("mongoose");
    const { default: express } = await import("express");
    const { default: appRoute } = await import("../app/routes/index.js");
    const { setOrigin } = await import("../app/utils/index.js");
    await mongoose.connect(`${MONGO}_${Date.now()}`);
    const db = mongoose.connection.db;
    const app = express();
    app.use([express.json(), setOrigin, appRoute]);
    const server = await new Promise((r) => { const s = app.listen(0, "127.0.0.1", () => r(s)); });
    const T2O = "www.turn2opinion.com", MFR = "www.myfrequentrewards.com";
    const get = (host, path) => new Promise((resolve, reject) => {
        http.get({ host: "127.0.0.1", port: server.address().port, path, headers: { host } }, (res) => {
            let t = ""; res.on("data", (c) => { t += c; });
            res.on("end", () => resolve({ status: res.statusCode, json: JSON.parse(t || "{}") }));
        }).on("error", reject);
    });
    const page = (origin, key, lang, live, draft = null) => ({ origin, key, lang, kind: "legal", version: live ? live.version : 0, live, draft, isDeleted: false, isActive: true, createdAt: new Date(), updatedAt: new Date() });

    test("the site gets the published copy for its own brand only, never the draft", async () => {
        await db.collection("ContentPage").insertMany([
            page(T2O, "privacy", "en", { title: "Privacy", body: ["Live text."], version: 3, publishedAt: new Date() }, { title: "Draft", body: ["Secret draft."], state: "editing" }),
            page(T2O, "privacy", "hi", { title: "गोपनीयता", body: ["हिंदी"], version: 1, publishedAt: new Date() }),
            page(T2O, "terms", "en", null, { title: "Draft only", body: ["x"], state: "review" }),
            page(MFR, "cookies", "en", { title: "MFR cookies", body: ["mfr"], version: 1, publishedAt: new Date() }),
        ]);
        const r = await get(T2O, "/api/v1/content/privacy");
        assert.equal(r.status, 200);
        assert.deepEqual([r.json.data.title, r.json.data.body, r.json.data.version], ["Privacy", ["Live text."], 3]);
        assert.ok(!JSON.stringify(r.json).includes("Secret draft"));
        assert.equal((await get(T2O, "/api/v1/content/privacy?lang=hi")).json.data.lang, "hi");
        assert.equal((await get(T2O, "/api/v1/content/privacy?lang=es")).json.data.lang, "en");
        assert.equal((await get(T2O, "/api/v1/content/terms")).status, 404, "a draft is never shown");
        assert.equal((await get(T2O, "/api/v1/content/cookies")).status, 404, "another brand's page is never shown");
        assert.equal((await get(T2O, "/api/v1/content/..%2Fx")).status, 404);
    });

    test.after(async () => { server.close(); await db.dropDatabase(); await mongoose.disconnect(); });
}
