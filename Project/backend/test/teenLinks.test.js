// Teen registration helpers (utils/teen.js): signed email links, masking, registration
// reference and the guardian onboarding form rules. Pure functions, no database.
// Test cases TC-GRD-* and TC-SEC-* in the QA suite (turn2opinion-test-cases.xlsx).
// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";

process.env.LINK_SECRET = "test-link-secret";
const T = await import("../app/utils/teen.js");

test("a signed link verifies only for the same member, channel and code", () => {
    const sig = T.linkSig("u1", "email", "123456");
    assert.equal(sig.length, 32);
    assert.equal(T.sigOk("u1", "email", "123456", sig), true);
    assert.equal(T.sigOk("u2", "email", "123456", sig), false, "other member");
    assert.equal(T.sigOk("u1", "parent", "123456", sig), false, "other channel");
    assert.equal(T.sigOk("u1", "email", "654321", sig), false, "new code kills the old link");
});

test("a missing, short, long or tampered signature is refused", () => {
    const sig = T.linkSig("u1", "email", "123456");
    for (const bad of [undefined, null, "", 123, sig.slice(0, 31), sig + "0", sig.replace(/^./, (c) => (c === "a" ? "b" : "a")), ["x"]])
        assert.equal(T.sigOk("u1", "email", "123456", bad), false, String(bad));
});

test("the signature depends on the server secret", () => {
    const a = T.linkSig("u1", "email", "123456");
    process.env.LINK_SECRET = "another-secret";
    const b = T.linkSig("u1", "email", "123456");
    process.env.LINK_SECRET = "test-link-secret";
    assert.notEqual(a, b);
});

test("linkFor hands templates the code and signature, never the OTP document", () => {
    const expiresAt = new Date("2026-12-01T00:00:00Z");
    const l = T.linkFor("u1", "parent", { code: "111222", expiresAt, _id: "otp1", user: "u1" });
    assert.deepEqual(Object.keys(l).sort(), ["code", "expiresAt", "sig"]);
    assert.equal(T.sigOk("u1", "parent", "111222", l.sig), true);
    assert.equal(T.linkFor("u1", "parent", null), null);
    assert.equal(T.linkFor("u1", "parent", {}), null);
});

test("guardian links point at /parent-consent/ on the member's own brand, with YES and NO buttons", () => {
    const user = { _id: "abc123", origin: "www.turn2opinion.com" };
    const g = T.guardianLinks({ origin: "other.example" }, user, { code: "999000", sig: "s".repeat(32), expiresAt: 1 });
    assert.equal(g.open, `https://www.turn2opinion.com/parent-consent/?user=abc123&code=999000&s=${"s".repeat(32)}`);
    assert.equal(g.yes, `${g.open}&d=yes`);
    assert.equal(g.no, `${g.open}&d=no`);
    assert.equal(T.guardianLinks({}, user, null), null);
});

test("emails are masked so neither the guardian nor the Teen address is shown in full", () => {
    assert.equal(T.maskEmail("asha.k@gmail.com"), "a••••k@g••••.com");
    assert.equal(T.maskEmail("ab@x.co"), "a•@x•.co");
    assert.equal(T.maskEmail("parent@mail.example.co.uk"), "p••••t@m•••.example.co.uk");
    for (const bad of ["", null, undefined, "no-at-sign"]) assert.equal(T.maskEmail(bad), "");
});

test("the registration reference is T2O-TN- plus the last six characters of the id, upper case", () => {
    assert.equal(T.registrationRef({ _id: "665f1c2a9b8e7d6c5b4a3f2e" }), "T2O-TN-4A3F2E");
    assert.equal(T.registrationRef(null), "");
    assert.equal(T.registrationRef({}), "");
});

test("the Teen must tick all 7 confirmations, and the guardian has 3 required permissions", () => {
    assert.equal(T.TEEN_STATEMENTS.length, 7);
    assert.deepEqual(T.GUARDIAN_REQUIRED, ["participation", "privacy", "contact"]);
    assert.equal(T.GUARDIAN_OPTIONAL.length, 3);
    assert.ok(T.DECLINE_REASONS.includes("not-guardian"));
});

test("cleanOnboarding keeps only questionnaire keys, trims and caps values", () => {
    const out = T.cleanOnboarding({
        "parent-first-name": "  Meera  ",
        P07: ["email", 5, " sms ", ""],
        "P03-other": "Aunt",
        role: "root",
        $where: "1",
        password: "x",
        P99x: "nope",
        P05: "x".repeat(400),
        P06: { $ne: 1 }
    });
    assert.equal(out["parent-first-name"], "Meera");
    assert.deepEqual(out.P07, ["email", "sms"]);
    assert.equal(out["P03-other"], "Aunt");
    assert.equal(out.P05.length, 300);
    for (const k of ["role", "$where", "password", "P99x", "P06"]) assert.equal(k in out, false, k);
    assert.equal(T.cleanOnboarding(null), null);
    assert.equal(T.cleanOnboarding(["P01"]), null);
    assert.equal(T.cleanOnboarding("P01"), null);
});

const full = () => ({
    "parent-first-name": "Meera", "parent-dob": "1985-04-02", P01: "IN", P03: "mother", "parent-marital": "married",
    P04: "yes", P11: "1", P06: "english", P07: ["email"], P12: "yes"
});

test("onboarding needs every required answer, an authorised guardian and a mobile for SMS/call/WhatsApp", () => {
    assert.equal(T.onboardingErrors(full()), "");
    for (const k of T.ONBOARDING_REQUIRED) {
        const a = full();
        delete a[k];
        assert.match(T.onboardingErrors(a), /every required question/, k);
    }
    assert.match(T.onboardingErrors({ ...full(), P07: [] }), /every required question/);
    assert.match(T.onboardingErrors({ ...full(), P04: "no" }), /legally authorised guardian/);
    for (const c of ["sms", "call", "whatsapp"]) {
        assert.match(T.onboardingErrors({ ...full(), P07: ["email", c] }), /mobile number/, c);
        assert.equal(T.onboardingErrors({ ...full(), P07: [c], P09: "9876543210" }), "", c);
    }
});
