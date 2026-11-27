// Sign-in tokens (utils/token.js) and password hashing (utils/password.js).
// Test cases TC-AUTH-* and TC-SEC-* in the QA suite (turn2opinion-test-cases.xlsx).
// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

process.env.JWT_SECRET = "test-jwt-secret";
const Token = (await import("../app/utils/token.js")).default;
const Password = (await import("../app/utils/password.js")).default;

const member = { _id: "u1", category: "b2c", email: "asha@example.com", origin: "www.turn2opinion.com", role: "respondent" };

test("a token made at login verifies and carries the member's id, panel and brand", () => {
    const t = Token.generate(member);
    const d = Token.verify(t);
    assert.equal(d._id, "u1");
    assert.equal(d.category, "b2c");
    assert.equal(d.origin, "www.turn2opinion.com");
    assert.ok(d.exp - d.iat === 7 * 24 * 3600, "default life is 7 days");
});

test("an expired token is refused", () => {
    const t = jwt.sign(member, process.env.JWT_SECRET, { expiresIn: -10, algorithm: "HS256" });
    assert.throws(() => Token.verify(t), /Invalid token/);
});

test("a token signed with another secret, or edited, is refused", () => {
    assert.throws(() => Token.verify(jwt.sign(member, "someone-else", { algorithm: "HS256" })), /Invalid token/);
    const [h, , s] = Token.generate(member).split(".");
    const forged = Buffer.from(JSON.stringify({ ...member, role: "root" })).toString("base64url");
    assert.throws(() => Token.verify(`${h}.${forged}.${s}`), /Invalid token/);
});

test("an unsigned (alg none) or HS512 token is refused: only HS256 is accepted", () => {
    const none = `${Buffer.from('{"alg":"none","typ":"JWT"}').toString("base64url")}.${Buffer.from(JSON.stringify(member)).toString("base64url")}.`;
    assert.throws(() => Token.verify(none), /Invalid token/);
    assert.throws(() => Token.verify(jwt.sign(member, process.env.JWT_SECRET, { algorithm: "HS512" })), /Invalid token/);
    for (const junk of ["", "abc", null, undefined]) assert.throws(() => Token.verify(junk), /Invalid token/);
});

test("passwords are stored as bcrypt hashes and only the right password matches", async () => {
    const h = await Password.hash("Str0ng!pass");
    assert.match(h, /^\$2[aby]\$10\$/);
    assert.notEqual(h, "Str0ng!pass");
    assert.equal(await Password.compare("Str0ng!pass", h), true);
    assert.equal(await Password.compare("str0ng!pass", h), false);
    assert.equal(await Password.compare("", h), false);
    assert.notEqual(await Password.hash("Str0ng!pass"), h, "salted: same password, new hash");
});
