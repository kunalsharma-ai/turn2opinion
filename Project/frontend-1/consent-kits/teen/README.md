# Turn2Opinion — Teen Research Terms & Parental Consent (ages 13–17)

A **standalone page** that your backend shows **after login, only to members aged 13–17**. It presents the universal
Frequent Research *Minor Research Participation Terms & Conditions and Parental Consent Agreement* and records two
separate decisions: the parent's / guardian's permission and the teen's own yes or no.
**The existing website is not changed.** Nothing here replaces or edits a current Turn2Opinion page.

## The page is four taps

| | Card | What happens |
|---|---|---|
| **A** | Terms & conditions | Six short topics in plain words. Opening one shows what each of its sections says; **“Read more”** opens the full legal text. **One tap** agrees to the terms. |
| **B** | Parent / guardian permission | **Three taps**, one per separate permission. Nothing is asked: the parent's name, relationship and contact were captured at registration, so the card only shows where the confirmation will be sent. Optional permissions sit behind an “Optional” strip. |
| **C** | Your decision | The teen's own **yes or no**, one tap. “No” stops everything and stores no guardian data. |
| **→** | Send | One button. Confetti, a fanfare and the consent record — downloadable as a **PDF**. |

No forms, no signature, no re-typing of anything the family has already given. Every click has a sound, and the whole
agreement — the information for parents, all 19 numbered sections with their full clauses, the declaration, the assent
points, the per-study card and the contacts — is one tap away in the reader, and in the PDF.

Design: "Two Turns". A navy side rail carries the **turn ring** — two arcs with arrowheads that echo the Turn2Opinion
swirl: the right arc turns for the parent (B), the left arc for the teen (C), and the centre counts the turns (0 / 2 →
2 / 2). Beside it, four numbered steps (Read · Parent · You · Send) fill a line as they are completed. The cards are flat
white panels on a pale-blue canvas, each tap-to-agree tile draws its own check, and a segmented bar fills under
Part B and Part C. On a phone the rail becomes a compact sticky strip. The account unlocks only when both arcs are
complete. Light and dark themes; English opens in the light theme. Fonts: Manrope 600–700 (headings, numbers) and Inter 400–600 (body, buttons, navigation). v1.1.0 adds an animated logo, a 3D flag scene, a moving background, per-section colour grading, diagrams and charts, and new sounds (see CHANGES.md).

## What's in the box

| Path | What it is |
|---|---|
| `dist/index.html` | Standalone page. English is prerendered (instant first paint) and the CSS is inlined. The JS is deferred and code-split per language. |
| `dist/embed/t2o-minor-consent.js` | **The one script your app pastes**: a ~0.4 KB loader. It loads `embed/t2o-minor-consent-app.js` (ES module, split per language) and renders in a **Shadow DOM**, so your CSS and ours cannot clash. |
| `dist/embed-example.html` | Copy-paste example of the embed inside a logged-in app. |
| `dist/flags/` | 270 country flags (SVG, MIT licence) used by the language picker, ribbon, 3D scene and the member\u2019s country. |
| `dist/brand/`, `dist/fonts/`, `favicon*` | Turn2Opinion logo and mark, Manrope + Inter (OFL), favicons. |
| `dist/icons/*.svg` | All 50 interface icons as standalone SVGs, each with alt text in `<title>`. |
| `dist/images/turn-ring.svg` | The turn-ring illustration (for guardian emails and help pages). |
| `dist/llms.txt` | Plain-text description of the teen page for AI assistants. |
| `*.br` / `*.gz` | Pre-compressed copies. Serve them with `Content-Encoding`. |
| `dist-preview/t2o-minor-consent-preview.html` | **One self-contained file** for review. It opens from disk with all 51 languages and sounds included. Demo mode: sending is simulated, and a "Simulate verification" button stands in for the guardian's link. |
| `server/minor-consent-api.mjs` | Reference API (Node 18+, no dependencies) with the activation rule enforced server-side. |
| `server/schema.sql` | Reference schema (PostgreSQL). DB constraints repeat the activation rule. |
| `src/` | React 19 source. Build with `npm run build`. |

```bash
npm install
npm run build          # → dist/
npm run build:preview  # → dist-preview/t2o-minor-consent-preview.html
npm run preview        # http://localhost:4300 (demo API: the guardian "verifies" 8 s after sending)
npm run serve:api      # reference API on :8791
npm run i18n:sync      # adds/prunes interface text in all 50 translations (scripts/i18n-new-strings.mjs)
npm run i18n:check     # every language has all 241 keys and keeps its {0} placeholders
npm run alt:report     # exports icons/images + writes ALT-TEXT.md and alt-text.csv
```

## Integration

### When to show it
Show the page **after login** when the member's age (from **your** records) is **13–17** and there is no current record
with `accountActivationStatus = 'active'` for `termsVersion` `MINOR-2026.10`. Adults and under-13s never see the
agreement. If they reach it anyway, the page shows a short notice and a button back to their account.

### A. Standalone page (simplest)
Publish `dist/` at, say, `/minor-consent/` and redirect eligible teens there after login. Before the page script,
set the config:

```html
<script>window.T2O_MINOR = {
  member: { id: 'P-12345', firstName: 'Aarav', age: 15, country: 'IN' },
  guardian: { contactType: 'email', contact: 'parent@example.com', name: 'Priya Sharma', relationship: 'mother' },
};</script>
```
(`dist/index.html` already has a `window.T2O_MINOR = window.T2O_MINOR || {}` line. Render your values into it server-side.)

The `guardian` object is what you already hold from registration. The page **displays the contact masked**
(`p••••@example.com`) so the family can see where the confirmation will go, and sends **nothing of it back** — your
server uses its own copy (see "API contract"). If you prefer not to put the contact in the page at all, leave it out:
the card then says the confirmation is sent after the record is submitted.

### B. Embed inside your logged-in app
```html
<div id="t2o-minor"></div>
<script>
  window.T2O_MINOR = {
    member: { id: 'P-12345', firstName: 'Aarav', age: 15, country: 'IN' },
    guardian: { name: 'Priya Sharma', relationship: 'mother', contactType: 'email', contact: 'parent@example.com' },
    submitUrl: '/api/minor-consent', statusUrl: '/api/minor-consent/status',
    headers: { 'X-CSRF-Token': '…' }, continueUrl: '/dashboard', logoutUrl: '/logout',
  };
</script>
<script src="/minor-consent/embed/t2o-minor-consent.js" defer></script>
```
`assetBase` is worked out from the script URL. Set it yourself only if `brand/` and `fonts/` live somewhere else.
Events: `t2o:minor-consent` (record sent), `t2o:minor-activated`, `t2o:minor-declined`. Callbacks with the same
names are also available (`onSubmit`, `onActivated`, `onDecline`).

### Config (`window.T2O_MINOR`)
| Key | Default | Notes |
|---|---|---|
| `member` | `{ id, firstName, age, ageBand, country }` | `age` or `ageBand` (`13-15` / `16-17`) decides eligibility. The first name only personalises the greeting. |
| `guardian` | empty | `{ name, relationship, contactType, contact, country, verified }` **from registration** — shown masked, never sent back. **Permission tiles always start untapped.** |
| `submitUrl` / `statusUrl` / `pollMs` | `/api/minor-consent`, `/api/minor-consent/status`, 6000 | Blank `submitUrl` means no request is made. |
| `headers` | `{}` | Added to every request (CSRF etc.). Cookies are sent (`credentials: 'include'`). |
| `continueUrl` / `logoutUrl` | `/dashboard` / `/logout` | |
| `termsVersion`, `privacyNoticeVersion`, `assentVersion`, `effectiveDate` | `MINOR-2026.10`, `2026.10`, `ASSENT-2026.10`, `2026-10-21` | **LEGAL** (see LEGAL-REVIEW.md) |
| `operator`, `website`, `supportEmail`, `privacyEmail`, `address`, `privacyPolicyUrl` | Turn2Opinion public details | **LEGAL** |
| `optionalConsents` | `['studyContact','recording','sensitive']` | Show only activities that are actually proposed. `[]` hides the optional strip. |
| `study` | `null` | The study card in the reader and the PDF (`title, purpose, topics, duration, collected, recipients, reward, risks, permission, support`). `null` shows the template example. |
| `language` | `'auto'` | `?lang=` → `language` → `localStorage['t2o.lang']` (shared with the main site) → browser → English. |
| `theme` | `'auto'` | English opens light. The member's switch is remembered (`t2o.minor.theme`). |
| `translateUrl` | `''` | Optional machine translation of the *full* legal text (same contract as the website's `/api/translate`). |
| `demo` | `false` | Preview only. |

## API contract

`POST submitUrl` sends the record as JSON (`recordType: 'minor-participation-consent'`):

- **Teen said yes:**
  - `participantId`, `ageBand`, `country`, `policyVersion`, `privacyNoticeVersion`, `assentVersion`, `language`, `timezone`
  - `termsAccepted: true`, `termsTopics` (the six topics), `topicsOpened`
  - `guardian { onFile: true, contactType, country }` — **no name, no contact, no signature**: the browser never sends
    them, your server reads them from the member record it already holds
  - `consents { participation, privacy, contact, studyContact?, recording?, sensitive? }`, `optionalOffered`
  - `guardianPermissionStatus: 'pending'`, `verification { method }`
  - `teenAssent { status: 'agreed', version, at }`
  - `studyPermissions`, `timestamps { pageOpenedAt, termsAcceptedAt, guardianPermissionAt, teenAssentAt, submittedAt }`
  - `accountActivationStatus: 'blocked'`
- **Teen said no:** the same base fields, plus `teenAssent.status: 'declined'`, `consents: {}`, and
  `guardianPermissionStatus: 'not-requested'`. **No guardian data at all**, which is data minimisation.

The response is `{ ok, consentId, accountActivationStatus, guardianContactMasked? }`. If it returns `active`, the page
opens at once.

`GET statusUrl?consentId=…` returns `{ guardianPermissionStatus, accountActivationStatus }`. The page polls it while it
shows "waiting for verification" and unlocks when it sees `active`.

`POST submitUrl + '/resend'` with `{ consentId }` sends the guardian message again. Rate-limit it.

**The activation rule is enforced by the server, never the browser:**
`active ⇔ age 13–17 (your records) ∧ terms accepted ∧ guardian contact verified ∧ teen assent = agreed ∧ participation ∧ privacy ∧ contact ∧ current terms version ∧ not withdrawn.`
`server/minor-consent-api.mjs` shows it end to end:
- submit, then status, then resend
- `guardianOnFile(member)` — the one place to plug in your guardian table (replaces anything the browser might claim)
- `GET /verify?token=` (the guardian's link; only a hash of the token is stored)
- `POST /withdraw`
- age gate (403), terms/consent checks (422), missing guardian on file (409) and version check (409)

## The PDF

"Download PDF" (on the result screen, in the reader and in the footer) writes the agreement in the browser — no
library, no request. It contains the consent record, the information for parents, all 19 sections with their full
clauses, the declaration and permissions, the teen's assent points, the per-study card and the contacts; about 25–70 KB
and 9 pages. The text is the **binding English version** (the member's language is recorded in the consent record).

## Accessibility
- Every image, icon and graphic has alt text, or is marked decorative when the text beside it says the same (`ALT-TEXT.md`, `alt-text.csv`).
- The lock announces both keys' status as text; every tile announces "Tap to agree" / "Agreed".
- The page works with the keyboard alone: a skip link, focus-trapped dialogs, and arrow keys in the language list.
- Visible focus rings. Right-to-left layout for Arabic, Hebrew, Urdu and Persian.
- `prefers-reduced-motion` stops every animation, including the confetti; sound can be switched off and stays off.
- Print styles give a clean paper copy — printing with the reader open prints the full agreement.

## Languages
There are 51 interface languages. Each one has all 241 strings, checked by `npm run i18n:check`. All 19 plain-language
summaries, the six topics, the permissions, the assent, the study card and every message are translated.
The full legal text of each section is in English, which is the binding version. A "Translate full text" button uses
`translateUrl` when it is configured.

> **Translations need native review before go-live.** They were written for this page and checked by machine for
> completeness and placeholders, not by native speakers or lawyers. This matters most for the permission wording
> (Part B) and the assent (Part C).

## Documents
`CHANGES.md` · `PERFORMANCE.md` · `LEGAL-REVIEW.md` · `ALT-TEXT.md` · `alt-text.csv` · `public/llms.txt`
