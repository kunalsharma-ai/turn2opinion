// What a signed-in Teen may see of their guardian's records (23 Nov 2026).
// Used by GET /api/v1/user/teen-profile. Pure functions, no database, so they are unit-tested.
//
// Rules:
//   - Nothing from the onboarding form or the consent record is returned until the guardian has
//     said YES, finished the onboarding form AND given consent (status "approved"). Before that,
//     and after a withdrawal, only the stage is returned, never the answers.
//   - The guardian's contact details stay masked: email as m••••a@e•••••.com, mobile as its last
//     three digits. The IP address and browser stored with the consent record are never returned.
//   - Every other onboarding answer is returned as stored (keys P01..P12, HQ1/HQ2/HQ4, parent-*, and the
//     parent profiling answers under their Teen bank names, e.g. teen-h001, household-income),
//     so the member area can show each question with its answer.

export const maskEmailT = (v) => {
    const [u, d] = String(v || "").split("@");
    if (!d) return "";
    const [host, ...rest] = d.split(".");
    const mu = u.length <= 2 ? `${u[0] || ""}•` : `${u[0]}${"•".repeat(Math.min(6, u.length - 2))}${u.slice(-1)}`;
    const mh = host.length <= 2 ? `${host[0] || ""}•` : `${host[0]}${"•".repeat(Math.min(5, host.length - 1))}`;
    return `${mu}@${mh}.${rest.join(".")}`;
};
export const maskPhoneT = (v) => {
    const d = String(v || "").replace(/\D/g, "");
    return d.length >= 4 ? `••••••${d.slice(-3)}` : "";
};

const iso = (d) => {
    if (!d) return null;
    const t = new Date(d);
    return isNaN(t) ? null : t.toISOString();
};

/** "approved" once the guardian said yes, sent the onboarding form and gave consent. */
export function familyState(u) {
    const p = (u && u.parent) || {};
    if (p.consentStatus === "withdrawn") return "withdrawn";
    if (p.consentStatus === "declined" || p.decision === "no") return "declined";
    const consented = p.consent === true || p.consentStatus === "approved";
    if (consented && p.decision === "yes" && p.onboardingAt && p.onboarding && typeof p.onboarding === "object") return "approved";
    // Teens approved before the YES/NO onboarding form existed (before 21 Nov 2026) have consent but no form.
    if (consented) return "approved-without-form";
    return "pending";
}

/** The guardian block of GET /teen-profile. Safe to send to the teen. */
export function familyRecord(u) {
    const p = (u && u.parent) || {};
    const state = familyState(u);
    const base = { state, status: u?.registrationStatus || null };
    if (state !== "approved" && state !== "approved-without-form") return base;

    let onboarding = null;
    if (state === "approved") {
        onboarding = {};
        for (const [k, v] of Object.entries(p.onboarding)) {
            if (!/^(P\d{2}|HQ\d|parent-[a-z-]{2,30}|teen-[a-z0-9-]{2,40}|household-income)(-other)?$/.test(k)) continue;
            if (Array.isArray(v)) onboarding[k] = v.filter((x) => typeof x === "string").slice(0, 40);
            else if (typeof v === "string" || typeof v === "number") onboarding[k] = String(v);
        }
        if (onboarding.P08) onboarding.P08 = maskEmailT(onboarding.P08);
        if (onboarding.P09) onboarding.P09 = maskPhoneT(onboarding.P09);
    }

    const rec = p.consentRecord && typeof p.consentRecord === "object" ? p.consentRecord : null;
    const consent = rec
        ? {
              version: rec.version || p.consentVersion || null,
              acceptedAt: iso(rec.acceptedAt || p.consentAt),
              termsRead: rec.termsRead === true,
              declaration: rec.declaration === true,
              selections: rec.selections && typeof rec.selections === "object"
                  ? Object.fromEntries(Object.entries(rec.selections).map(([k, v]) => [k, v === true]))
                  : {},
              teenRegistrationRef: rec.teenRegistrationRef || null,
              teenConsentVersion: rec.teenConsentVersion || null,
              verifiedVia: p.verifiedVia || null
          }
        : {
              // older approvals: what the user record itself holds
              version: p.consentVersion || null,
              acceptedAt: iso(p.consentAt),
              termsRead: null,
              declaration: null,
              selections: Object.fromEntries((p.consentConfirmations || []).map((k) => [k, true])),
              teenRegistrationRef: null,
              teenConsentVersion: null,
              verifiedVia: p.verifiedVia || null
          };

    return {
        ...base,
        guardian: {
            relation: p.relation || null,
            name: { first: p.name?.first || "", middle: p.name?.middle || "", last: p.name?.last || "" },
            gender: p.gender || null,
            email: maskEmailT(p.email),
            phone: maskPhoneT(p.phone)
        },
        timeline: {
            requestedAt: iso(p.submittedAt),
            openedAt: iso(p.onboardingOpenedAt),
            decisionAt: iso(p.decisionAt),
            onboardingAt: iso(p.onboardingAt),
            consentAt: iso(p.consentAt)
        },
        decision: p.decision || null,
        needsReview: onboarding ? onboarding.P04 === "unsure" : false,
        onboarding,
        consent,
        teenConsent: u?.teenConsent
            ? { version: u.teenConsent.version || null, statements: Array.isArray(u.teenConsent.statements) ? u.teenConsent.statements : [], acceptedAt: iso(u.teenConsent.acceptedAt) }
            : null
    };
}
