// Parent profiling for the Teen panel (24 Nov 2026).
//
// The guardian onboarding form also asks the Global Teen Panel bank's "Asked to: Parent" questions
// (teen-p008..p010, teen-g003..g006, teen-h001..h007, teen-s001/s002/s004/s005, household-income).
// They are stored with the rest of the form in user.parent.onboarding and, once the guardian gives
// consent, saved to the Teen's own profile as ordinary Answer records, so the Teen panel, the
// surveys and the sync all read them like any other answer.
//
// teen-p001..p007 are not asked again: they are worked out from Module 1 (P03, P04, P07, P11,
// parent-dob) and the consent itself. Pure functions, no database, so they are unit-tested.
import { PARENT_QUESTIONS, INCOME_BY_COUNTRY } from "./parentProfileBank.js";

export const DERIVED = ["teen-p001", "teen-p002", "teen-p003", "teen-p004", "teen-p005", "teen-p006", "teen-p007"];
export const ASKED = Object.keys(PARENT_QUESTIONS).filter((k) => !DERIVED.includes(k));
export const isProfilingKey = (k) => ASKED.includes(k);

const list = (v) => (Array.isArray(v) ? v : v == null || v === "" ? [] : [v]).map((x) => String(x).trim()).filter(Boolean);

/** Keep a profiling answer only when every value is one the bank holds. Returns string, string[] or null. */
export function cleanProfilingAnswer(name, value, country) {
    const def = PARENT_QUESTIONS[name];
    if (!def || DERIVED.includes(name)) return null;
    const allowed = name === "household-income" ? INCOME_BY_COUNTRY[String(country || "").toUpperCase()] || [] : def.values;
    const vals = [...new Set(list(value))].filter((v) => allowed.includes(v));
    if (!vals.length) return null;
    return def.multi ? vals.slice(0, 40) : vals[0];
}

function age(dob, now) {
    const d = new Date(dob);
    if (!dob || isNaN(d)) return null;
    let a = now.getFullYear() - d.getFullYear();
    if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) a--;
    return a;
}
const BANDS = [[24, "18–24"], [34, "25–34"], [44, "35–44"], [54, "45–54"], [64, "55–64"], [Infinity, "65+"]];
const RELATION = { mother: "Mother", father: "Father", guardian: "Legal guardian", foster: "Other authorized guardian", caregiver: "Other authorized guardian" };
const AUTHORISED = { yes: "Yes", no: "No", unsure: "Unsure" };
const TEENS = { 1: "1", 2: "2", 3: "3" }; // "4 or more" cannot be split into the bank's 4 / 5+
const CHANNEL = { email: "Email", sms: "SMS", whatsapp: "WhatsApp where permitted" }; // a phone call has no bank option

/**
 * The Teen's Answer records that come from the guardian: { question: [values] }.
 * onboarding: user.parent.onboarding. consented: the guardian has given consent.
 */
export function guardianAnswers(onboarding, consented, now = new Date()) {
    const a = onboarding && typeof onboarding === "object" ? onboarding : {};
    const out = {};
    const put = (k, v) => { const l = list(v); if (l.length) out[k] = l; };

    const years = age(a["parent-dob"], now);
    if (years !== null && years >= 18) {
        put("teen-p001", "Yes");
        put("teen-p002", BANDS.find(([max]) => years <= max)[1]);
    }
    put("teen-p003", RELATION[a.P03]);
    put("teen-p004", AUTHORISED[a.P04]);
    put("teen-p005", TEENS[a.P11]);
    if (consented) put("teen-p006", "Yes");
    put("teen-p007", list(a.P07).map((c) => CHANNEL[c]).filter(Boolean));

    for (const k of ASKED) {
        const v = cleanProfilingAnswer(k, a[k], a.P01);
        if (v) put(k, v);
    }
    return out;
}
