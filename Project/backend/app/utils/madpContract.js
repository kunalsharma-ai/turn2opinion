// MADP Panel API Contract discovery (contract 1.0.0, docs/PANEL_API_CONTRACT.md in kunalsharma-ai/MADP).
// GET /api/v1/contract tells MADP which contract version this backend speaks and which capabilities it serves, so
// MADP only calls those. It holds no personal data. Admin token only, like the changes feeds.
export const CONTRACT = "madp-panel-api";
export const CONTRACT_VERSION = "1.0.0";

// What this backend serves for every tenant (routes/api/Question.js, Option.js, Profile.js, User.js, Changes.js).
export const CAPABILITIES = [
    "contract.discovery",
    "questions.read",
    "options.read",
    "questionnaires.read",
    "members.read",
    "answers.read",
    "changes.members",
    "changes.answers",
    "changes.deletions",
    "changes.rewards",
    "changes.responses"
];

const list = (v) => String(v || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
// Tenants whose answers include health data (MHO). MADP treats MHO as special-category whatever is declared.
const specialOrigins = () =>
    list(process.env.MADP_SPECIAL_CATEGORY_ORIGINS ?? "www.myhealthopinions.com,myhealthopinions.com");

/** The discovery answer for one tenant (the request's Host, as everywhere else on this backend). */
export function discoveryFor(origin, env = process.env) {
    const host = String(origin || "").toLowerCase();
    const capabilities = [...CAPABILITIES];
    if (specialOrigins().includes(host)) capabilities.push("special_category");
    return {
        contract: CONTRACT,
        version: CONTRACT_VERSION,
        implementation: { name: "t2o-backend", version: env.GIT_SHA || "unknown" },
        brands: [{ origin: host }],
        capabilities,
        limits: { maxPageSize: 500 }
    };
}
