// Route-level tests for /api/v1/support: the real router with an in-memory
// ticket store, fake users and a captured mailer (no database, no email service).
// Run: npm test
import { test, mock, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import express from "express";

// The real APIResponse and expressRoute are used; expressRoute is loaded after
// the mock below so it resolves "./index.js" to the mock, not the database layer.
const APIResponse = await import("../app/utils/APIResponse.js");
let realExpressRoute;

const users = {
    u1: { _id: "u1", mail: "asha@example.com", fullName: "Asha", role: "respondent" },
    u2: { _id: "u2", mail: "ravi@example.com", fullName: "Ravi", role: "respondent" },
    a1: { _id: "a1", mail: "lead@turn2opinion.com", fullName: "Lead", role: "admin" }
};
let tickets = [];
let sent = [];
let deleted = [];

const matches = (t, q) => Object.entries(q).every(([k, v]) =>
    k.split(".").reduce((o, p) => o?.[p], t) === v);

const supportController = {
    request: null,
    async list(q) { return tickets.filter(t => matches(t, q)); },
    async read(id) { const t = tickets.find(x => x._id === id); if (!t) throw new Error("Item not found"); return t; },
    async create(d) { const t = { _id: `t${tickets.length + 1}`, ticketNo: `T${tickets.length + 1}`, ...d }; tickets.push(t); return t; },
    async delete(id) { deleted.push(id); },
    async conversation(t) { return [{ ticketNo: t.ticketNo, message: "hi" }]; },
    async reply(t, d) { return { ticketNo: t.ticketNo, message: d.message }; }
};
const User = {
    request: null,
    model: { findById: id => ({ select: async () => users[id] && { role: users[id].role, mail: users[id].mail } }) },
    async read(id) { return users[id]; },
    async list(q) { return Object.values(users).filter(u => u.mail === q.mail); },
    async listTeamMembers() { return [{ mail: "agent1@turn2opinion.com" }, { mail: "agent2@turn2opinion.com" }]; }
};

mock.module("../app/controller/index.js", { namedExports: { Support: supportController, User } });
mock.module("../app/utils/index.js", {
    namedExports: {
        APIResponse,
        Mutate: d => JSON.parse(JSON.stringify(d)),
        expressRoute: (cb, C) => (req, res) => realExpressRoute(cb, C)(req, res),
        expressView: () => () => {},
        isAuthenticated: (req, res, next) => next(),
        fsLogger: class {},
        Token: {},
        getMailer: async (group, name) => ({ data: `<${name}>` }),
        sendMail: async (headers, to, subject, content) => { sent.push({ to, subject, content }); return {}; }
    }
});
realExpressRoute = (await import("../app/utils/expressRoute.js")).default;
const { default: router } = await import("../app/routes/api/Support.js");

let server, base;
before(async () => {
    const app = express();
    app.use(express.json());
    // stands in for setOrigin + isAuthenticated: x-user picks the signed-in user (role is not on req.user, as in production)
    app.use((req, res, next) => {
        req.origin = "turn2opinion";
        const u = users[req.headers["x-user"]];
        req.user = u && { _id: u._id, mail: u.mail, fullName: u.fullName };
        next();
    });
    app.use("/api/v1/support", router);
    await new Promise(r => { server = app.listen(0, r); });
    base = `http://127.0.0.1:${server.address().port}/api/v1/support`;
});
after(() => server?.close());
beforeEach(() => {
    sent = []; deleted = [];
    tickets = [
        { _id: "t1", ticketNo: "T1", subject: "Asha's points", issueRaisedBy: { name: "Asha", email: "asha@example.com" } },
        { _id: "t2", ticketNo: "T2", subject: "Ravi's DOB", issueRaisedBy: { name: "Ravi", email: "ravi@example.com" } }
    ];
    delete process.env.SUPPORT_TEAM_EMAIL;
});

const call = async (user, method, path = "", body) => {
    const r = await fetch(base + path, {
        method,
        headers: { "x-user": user, "content-type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
    });
    return { status: r.status, json: await r.json() };
};
const ids = r => r.json.data.map(t => t._id).sort();

test("ticket-created email goes to the member who raised it", async () => {
    const r = await call("u1", "PUT", "", { subject: "Help", description: "Points missing", category: "rewards" });
    assert.equal(r.status, 200);
    const toUser = sent.filter(m => m.content === "<ticket-created-user>").map(m => m.to);
    assert.deepEqual(toUser, ["asha@example.com"]);
    assert.ok(!sent.some(m => /gmail\.com/.test(m.to)), "no hard-coded test inbox");
    assert.equal(tickets.at(-1).issueRaisedBy.email, "asha@example.com");
});

test("team copy: every team member when SUPPORT_TEAM_EMAIL is unset", async () => {
    await call("u1", "PUT", "", { subject: "Help" });
    const toTeam = sent.filter(m => m.content === "<ticket-created-team>").map(m => m.to);
    assert.deepEqual(toTeam, ["agent1@turn2opinion.com", "agent2@turn2opinion.com"]);
});

test("team copy: SUPPORT_TEAM_EMAIL when set", async () => {
    process.env.SUPPORT_TEAM_EMAIL = "support@turn2opinion.com";
    await call("u1", "PUT", "", { subject: "Help" });
    const toTeam = sent.filter(m => m.content === "<ticket-created-team>").map(m => m.to);
    assert.deepEqual(toTeam, ["support@turn2opinion.com"]);
    await call("a1", "PUT", "/t1/reply", { message: "Fixed", status: "closed" });
    const updTeam = sent.filter(m => m.content === "<ticket-updated-team>").map(m => m.to);
    assert.deepEqual(updTeam, ["support@turn2opinion.com"]);
});

test("a member cannot raise a ticket in someone else's name", async () => {
    await call("u1", "PUT", "", { subject: "Help", user: "ravi@example.com" });
    assert.equal(tickets.at(-1).issueRaisedBy.email, "asha@example.com");
    // staff still can (admin redemptions / support pages)
    await call("a1", "PUT", "", { subject: "On behalf", user: "ravi@example.com" });
    assert.equal(tickets.at(-1).issueRaisedBy.email, "ravi@example.com");
});

test("list: members see only their own tickets", async () => {
    assert.deepEqual(ids(await call("u1", "GET")), ["t1"]);
    assert.deepEqual(ids(await call("u1", "POST", "", { "issueRaisedBy.email": "asha@example.com" })), ["t1"]);
    assert.deepEqual(ids(await call("u1", "POST", "", { "issueRaisedBy.email": "ravi@example.com" })), ["t1"]);
    assert.deepEqual(ids(await call("u1", "POST", "", {})), ["t1"]);
});

test("list: staff still see every ticket", async () => {
    assert.deepEqual(ids(await call("a1", "GET")), ["t1", "t2"]);
    assert.deepEqual(ids(await call("a1", "POST", "", { "issueRaisedBy.email": "ravi@example.com" })), ["t2"]);
});

test("read, conversation and reply are limited to the owner", async () => {
    assert.equal((await call("u1", "GET", "/t1")).status, 200);
    assert.equal((await call("u1", "GET", "/t1/reply")).status, 200);
    assert.equal((await call("u1", "PUT", "/t1/reply", { message: "Any news?" })).status, 200);

    for (const [method, path] of [["GET", "/t2"], ["GET", "/t2/reply"], ["PUT", "/t2/reply"], ["GET", "/nope"]]) {
        sent = [];
        const r = await call("u1", method, path, method === "PUT" ? { message: "x" } : undefined);
        assert.equal(r.status, 404, `${method} ${path}`);
        assert.equal(r.json.message, "Ticket not found");
        assert.equal(sent.length, 0, "no email for a refused reply");
    }
});

test("staff can read and reply to any ticket", async () => {
    assert.equal((await call("a1", "GET", "/t2")).status, 200);
    assert.equal((await call("a1", "GET", "/t2/reply")).status, 200);
    const r = await call("a1", "PUT", "/t2/reply", { message: "Done", status: "closed" });
    assert.equal(r.status, 200);
    assert.ok(sent.some(m => m.to === "ravi@example.com" && m.content === "<ticket-updated-user>"));
});

test("delete is staff only", async () => {
    assert.equal((await call("u1", "DELETE", "/t1")).status, 404);
    assert.deepEqual(deleted, []);
    assert.equal((await call("a1", "DELETE", "/t2")).status, 200);
    assert.deepEqual(deleted, ["t2"]);
});
