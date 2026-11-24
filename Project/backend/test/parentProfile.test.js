import test from "node:test";
import assert from "node:assert/strict";
import { guardianAnswers, cleanProfilingAnswer, ASKED, DERIVED } from "../app/utils/parentProfile.js";
import { familyRecord } from "../app/utils/teenFamily.js";

const now = new Date("2026-11-24T12:00:00Z");
const form = {
    "parent-first-name": "Asha", "parent-dob": "1985-03-02", P01: "IN", P03: "mother", P04: "yes", P11: "2", P07: ["email", "call", "whatsapp"],
    "teen-p008": "Yes", "teen-h001": "4", "teen-h006": ["Dog", "Cat"], "teen-g006": "Hindi", "teen-g005": ["Hindi", "English"], "teen-s001": "Full-time",
};

test("teen-p001..p007 are worked out from Module 1 and the consent, never asked", () => {
    const a = guardianAnswers(form, true, now);
    assert.deepEqual(a["teen-p001"], ["Yes"]);
    assert.deepEqual(a["teen-p002"], ["35–44"]);
    assert.deepEqual(a["teen-p003"], ["Mother"]);
    assert.deepEqual(a["teen-p004"], ["Yes"]);
    assert.deepEqual(a["teen-p005"], ["2"]);
    assert.deepEqual(a["teen-p006"], ["Yes"]);
    assert.deepEqual(a["teen-p007"], ["Email", "WhatsApp where permitted"]);
    assert.equal(guardianAnswers(form, false, now)["teen-p006"], undefined);
    assert.equal(guardianAnswers({ ...form, P11: "4+" }, true, now)["teen-p005"], undefined);
    for (const k of DERIVED) assert.ok(!ASKED.includes(k));
});

test("asked answers are copied under their bank names, as lists", () => {
    const a = guardianAnswers(form, true, now);
    assert.deepEqual(a["teen-h001"], ["4"]);
    assert.deepEqual(a["teen-h006"], ["Dog", "Cat"]);
    assert.deepEqual(a["teen-g005"], ["Hindi", "English"]);
    assert.deepEqual(a["teen-s001"], ["Full-time"]);
    assert.equal(a["parent-first-name"], undefined);
    assert.equal(a.P03, undefined);
});

test("values the bank does not hold are dropped; household income follows the country", () => {
    assert.equal(cleanProfilingAnswer("teen-h001", "99"), null);
    assert.deepEqual(cleanProfilingAnswer("teen-h006", ["Dog", "Dragon"]), ["Dog"]);
    assert.equal(cleanProfilingAnswer("teen-s001", ["Full-time", "Retired"]), "Full-time");
    assert.equal(cleanProfilingAnswer("teen-p006", "Yes"), null);
    assert.equal(cleanProfilingAnswer("household-income", "up to 30000", "US"), "up to 30000");
    assert.equal(cleanProfilingAnswer("household-income", "up to 30000", "ZZ"), null);
});

test("the family record returns the parent profiling answers", () => {
    const rec = familyRecord({ parent: { consent: true, consentStatus: "approved", decision: "yes", onboardingAt: now, onboarding: { ...form, "teen-zz!": "x" } } });
    assert.deepEqual(rec.onboarding["teen-h006"], ["Dog", "Cat"]);
    assert.equal(rec.onboarding["teen-s001"], "Full-time");
    assert.equal(rec.onboarding["teen-zz!"], undefined);
});
