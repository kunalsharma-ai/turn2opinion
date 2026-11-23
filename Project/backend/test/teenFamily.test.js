// Unit tests for what a Teen may see of their guardian's records (utils/teenFamily.js).
// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { familyRecord, familyState, maskEmailT, maskPhoneT } from "../app/utils/teenFamily.js";

const onboarding = {
    "parent-first-name": "Meera", "parent-last-name": "Shah", "parent-name": "Meera Shah", "parent-gender": "Female",
    "parent-dob": "1984-05-02", P05: "35-44", P01: "IN", P02: "IN-MH", P03: "mother", "parent-marital": "Married",
    P04: "yes", P11: "2", P06: "en", P07: ["email", "whatsapp"], P08: "meera.shah@example.com", P09: "919812345678",
    P12: "yes", HQ1: ["allergy"], HQ2: "primary", HQ4: ["medication"], junk: "dropped"
};
const approved = () => ({
    registrationStatus: "account-active",
    teenConsent: { version: "T2O-TEEN-REG-2026.11", statements: ["terms", "privacy"], acceptedAt: new Date("2026-11-20T10:00:00Z") },
    parent: {
        email: "meera.shah@example.com", phone: "919812345678", relation: "mother", name: { first: "Meera", last: "Shah" },
        consent: true, consentStatus: "approved", decision: "yes", decisionAt: new Date("2026-11-20T11:00:00Z"),
        onboarding, onboardingAt: new Date("2026-11-20T11:05:00Z"), consentAt: new Date("2026-11-20T11:09:00Z"),
        consentVersion: "MINOR-2026.10", verifiedVia: "email-link",
        consentRecord: {
            version: "MINOR-2026.10", acceptedAt: new Date("2026-11-20T11:09:00Z"), termsRead: true, declaration: true,
            selections: { participation: true, privacy: true, contact: true, studyContact: true, recording: false, sensitive: false },
            teenRegistrationRef: "T2O-TN-ABC123", teenConsentVersion: "T2O-TEEN-REG-2026.11", ip: "10.1.2.3", userAgent: "Mozilla"
        }
    }
});

test("masks", () => {
    assert.equal(maskEmailT("meera.shah@example.com"), "m••••••h@e•••••.com");
    assert.equal(maskPhoneT("919812345678"), "••••••678");
    assert.equal(maskPhoneT(""), "");
});

test("approved guardian: every onboarding answer, masked contact, no IP or browser", () => {
    const r = familyRecord(approved());
    assert.equal(r.state, "approved");
    assert.equal(r.onboarding.P03, "mother");
    assert.deepEqual(r.onboarding.P07, ["email", "whatsapp"]);
    assert.deepEqual(r.onboarding.HQ1, ["allergy"]);
    assert.equal(r.onboarding.P08, "m••••••h@e•••••.com");
    assert.equal(r.onboarding.P09, "••••••678");
    assert.equal(r.onboarding.junk, undefined);
    assert.equal(r.guardian.email, "m••••••h@e•••••.com");
    assert.equal(r.guardian.phone, "••••••678");
    assert.equal(r.consent.selections.studyContact, true);
    assert.equal(r.consent.selections.recording, false);
    const text = JSON.stringify(r);
    assert.ok(!text.includes("10.1.2.3"), "IP never sent");
    assert.ok(!text.includes("Mozilla"), "browser never sent");
    assert.ok(!text.includes("meera.shah@example.com"), "full email never sent");
    assert.ok(!text.includes("919812345678"), "full phone never sent");
    assert.equal(r.teenConsent.statements.length, 2);
});

test("nothing from the form before approval", () => {
    for (const patch of [
        { consent: null, consentStatus: "pending", decision: undefined, consentRecord: undefined },
        { consent: null, consentStatus: "pending", decision: "yes", consentRecord: undefined }, // said yes, form sent, no consent yet
        { consent: false, consentStatus: "declined", decision: "no" },
        { consent: true, consentStatus: "withdrawn" }
    ]) {
        const u = approved();
        Object.assign(u.parent, patch);
        if (patch.consentStatus === "withdrawn") u.parent.consent = false;
        const r = familyRecord(u);
        assert.notEqual(r.state, "approved", JSON.stringify(patch));
        assert.equal(r.onboarding, undefined);
        assert.equal(r.guardian, undefined);
        assert.equal(r.consent, undefined);
    }
    assert.equal(familyState({ parent: { consentStatus: "withdrawn", consent: false } }), "withdrawn");
});

test("older approval without the onboarding form", () => {
    const u = approved();
    delete u.parent.onboarding;
    delete u.parent.onboardingAt;
    delete u.parent.consentRecord;
    u.parent.consentConfirmations = ["participation", "privacy"];
    const r = familyRecord(u);
    assert.equal(r.state, "approved-without-form");
    assert.equal(r.onboarding, null);
    assert.deepEqual(r.consent.selections, { participation: true, privacy: true });
});
