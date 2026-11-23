# Turn2Opinion — Business Professionals Panel: Terms, Privacy Notice & Consent page

A stand-alone page for **business-professional members**, shown right after login and before their B2B dashboard. It does not touch the website or the consumer consent page: it has its own ids, its own config object, its own storage keys and its own API path, so both consent pages can live in the same app.

**What the member sees: "global insight network"**

The page is designed for business professionals and looks completely different from the MyFrequentRewards business page (skyline, pass, stamps, slider, gold certificate) and from both consumer pages.

- **Insight globe.** A glowing 3D wireframe globe (meridians and parallels) turns slowly with the Turn2Opinion "2" at its core.
  - 23 expert nodes sit on business hubs around the world, one per clause, and light up as the member reviews the agreement.
  - Data satellites circle on tilted orbits, insight arcs shoot between continents and sonar pings pulse.
  - A "connected expert" chip shows the member's name, job title and member ID.
  - When the agreement is signed, the whole network turns green.
- **Metro-line agenda.** A sticky line under the top bar has six stations, one per track (Membership, You & your employer, Data & privacy, Studies & honoraria, Clients/contact/cookies, Account & complaints), plus Approvals. The line fills in each track's colour as its clauses are reviewed, and the current station glows.
- **Track headers.** Each header shows a numbered tile, a sparkline that draws itself when it scrolls into view, and a ring gauge of the track's progress.
- **Clause cards.** Glass cards with a light sweep and a colour edge that grows on hover. Each card shows "What this means for you" in plain language. **Read the full clause** unfolds a document viewer in the centre of the screen (a bottom sheet on phones) with the full legal text and previous/next navigation.
- **Approvals checklist.** Each tick draws itself with a green scan sweep. Four approvals are required and five are optional, and each links back to its clauses.
- **Press-and-hold to sign.** Hold the round Turn2Opinion button: a ring fills, charge blips rise, and a progress line runs along the bottom. Letting go early resets it. On a keyboard, Enter or Space signs straight away.
- **Signing.** The agreement then "travels" along a beam into the network node.
- **Sealed envelope.** On confirmation, the letter slides into an envelope, the flap closes, a Turn2Opinion seal presses on and the envelope flies away. The confirmation card then rises with an animated check and every detail of the record.
- **Dark / light switch.** A sun/moon toggle in the top bar, remembered per member (`localStorage t2o.pro.theme`). English opens light and other languages open dark until the member chooses.
- **51 languages.** Each language has its **own colour palette** (globe, nodes, arcs, buttons, seal) and its **own sound signature**, in both light and dark.
- **Sound on every click.** A "network" set: glassy clicks, data swipes, sonar pings for reviewed clauses, charge blips while holding, a digital confirm for approvals, and a seal thump with an arpeggio on signing. Everything is synthesised live (no audio files), and there is a mute button.

## 1. Run it

```bash
npm install           # react 19.2.8, react-dom 19.2.8, esbuild 0.28.2
npm run build         # → dist/ (index.html prerendered + hydrated, embed/t2o-pro-consent.js, .br/.gz copies)
npm run preview       # → http://localhost:4300 (serves dist/ like production, demo API included)
npm run build:preview # → dist-preview/t2o-pro-consent-preview.html (ONE file, opens offline by double-click)
npm run alt:report    # → ALT-TEXT.md + alt-text.csv
npm run serve:api     # reference backend (server/consent-api.mjs) on :8790
```

## 2. Integration

**When to show the page:** after a business member logs in, show it if they have no consent record, or if their latest record's `termsVersion` differs from the current one. `GET /api/consent/business/status` in `server/` shows how.

### A. Standalone page (simplest)

Publish `dist/` (for example at `/business/consent/`). In `dist/index.html`, fill the config block **server-side** for the logged-in member:

```html
<script>
  window.T2O_PRO_CONSENT = {
    member: { id: 'B-10293', firstName: 'Arjun', jobTitle: 'IT Director', company: 'Northwind Ltd' },
    submitUrl: '/api/consent/business',
    headers: { 'X-CSRF-Token': '…' },
    continueUrl: '/business/dashboard',
    logoutUrl: '/logout',
  };
</script>
```

### B. Embed in your app (paste after login)

Copy this into the page that loads after login. It renders inside a Shadow DOM, so your styles and the page's styles never mix (full file: `examples/embed-example.html`).

```html
<div id="t2o-pro-consent"></div>
<script>window.T2O_PRO_CONSENT = { member: { id: '…', firstName: '…', jobTitle: '…', company: '…' }, assetBase: '/business/consent/' };</script>
<script src="/business/consent/embed/t2o-pro-consent.js" defer></script>
```

### Configuration (`window.T2O_PRO_CONSENT`, defaults in `src/config.js`)

| Key | Default | Meaning |
|---|---|---|
| `member` | `{ id, firstName, email, country, jobTitle, company }` | Shown on the globe's expert chip and the confirmation card, and sent with the record |
| `submitUrl` | `/api/consent/business` | Where the signed record is POSTed (JSON). Leave blank to send nothing |
| `headers` | `{}` | Extra request headers (CSRF etc.) |
| `continueUrl` | `/dashboard` | The "Enter your dashboard" button after signing |
| `logoutUrl` | `/logout` | Used by "Not now → Log out" |
| `termsVersion` | `B2B-2026.10` | Bump this when the meaning of the terms changes |
| `effectiveDate` / `lastUpdated` | `2026-10-18` | Shown in the header (**legal to confirm**) |
| `operator`, `panelName`, `supportEmail`, `privacyEmail`, `address`, `website` | Frequent Research Fieldwork Solutions Pvt. Ltd. (d/b/a Turn2Opinion)… | Fill the placeholders in the legal text |
| `privacyPolicyUrl`, `cookiePolicyUrl` | turn2opinion.com/… | Footer links |
| `language` | `auto` | `auto` uses `?lang=`, then the member's choice on the main site (`localStorage t2o.lang`), then the browser language. Or set a code such as `de` |
| `theme` | `auto` | `auto`: English → light, other languages → dark, until the member chooses. Or `light` / `dark`. The member's own choice (`localStorage t2o.pro.theme`) always wins |
| `translateUrl` | `''` | Optional machine-translation endpoint (same contract as the website's `/api/translate`) |
| `assetBase` | `''` | Where `brand/` and `fonts/` live (embed mode) |
| `onAccept(record)`, `onDecline()` | — | Optional callbacks |

**Events:**

- `window` → `t2o:consent` (`detail` = the record, with `detail.panel === 'business'`).
- `t2o:consent-declined`.

### API contract — `POST submitUrl`

```json
{
  "consentId": "T2O-B2B-20261018-7Q2K",
  "panel": "business",
  "memberId": "B-10293",
  "termsVersion": "B2B-2026.10",
  "effectiveDate": "2026-10-18",
  "language": "de",
  "theme": "dark",
  "acceptedAt": "2026-10-18T10:51:51.000Z",
  "timezone": "Europe/Berlin",
  "consents": {
    "terms": true, "privacy": true, "accuracy": true, "confidential": true,
    "interviews": true, "clientContact": false, "sensitive": false, "marketing": false, "analytics": true
  },
  "clausesReviewed": [1, 2, 3, 5, 6, 23],
  "pageUrl": "…",
  "userAgent": "…"
}
```

**Response:** `200 { "ok": true, "consentId": "T2O-B2B-…" }`. The server id replaces the client id on the confirmation card. Any non-2xx response shows "Couldn't save" and lets the member try again.

**Required approvals:** `terms`, `privacy`, `accuracy`, `confidential`. The server must reject a record without them (the reference returns 422), and must reject a stale `termsVersion` (409).

**In production:**

- Take the member id from **your session**, not from the request body.
- Check CSRF.
- Store the server time and a salted IP hash.
- Keep records append-only.

`server/schema.sql` has a suggested table (`business_member_consents`).

| Approval | Required | Clauses |
|---|---|---|
| `terms`: accept the Terms & Conditions | ✔ | 1–2, 7–8, 13, 18, 21–22 |
| `privacy`: processing under the Privacy Notice | ✔ | 3–4, 9–10, 15, 17 |
| `accuracy`: age requirement and accurate professional details | ✔ | 2, 5, 20 |
| `confidential`: no confidential business information | ✔ | 6, 19 |
| `interviews`: expert interviews, calls, recordings | – | 12 |
| `clientContact`: identified studies / client follow-up | – | 9–10 |
| `sensitive`: sensitive or regulated topics | – | 3F |
| `marketing`: newsletters and offers | – | 11 |
| `analytics`: optional analytics cookies | – | 14 |

## 3. Editing the content

| What | Where |
|---|---|
| Legal text of the 23 clauses, plain-language summaries, the six tracks and their hues, icons | `src/content/terms.js` |
| Approvals (required/optional, clause references) | `CONSENTS` in `src/content/terms.js` |
| Interface text (English) | `src/i18n/strings/en.js` |
| Translations | `src/i18n/strings/<code>.js` (12 full), plus `essential.js` and `ess-1/2/3.js` (38 languages) |
| Languages, colour palette and sound per language | `src/i18n/languages.js`, `src/i18n/sounds.js` |
| Click sounds (tap, paper, stamp = approval confirm, tick = hold charge, sign…) | `src/sound.js` |
| Look, themes, animation | `src/styles/app.css` (light and dark variables at the top), `src/components/InsightGlobe.jsx`, `src/components/Approvals.jsx` (hold-to-sign, envelope) |
| Logo / mark | `public/brand/` |

If you change the meaning of a clause, bump `termsVersion` and update the translated `t<n>`/`s<n>` lines.

## 4. Languages: what is translated

| Languages | Translated |
|---|---|
| English | Everything (source) |
| 简体中文, 繁體中文, हिन्दी, Español, العربية, Português, Français, Deutsch, 日本語, 한국어, Bahasa Indonesia, Русский | The whole interface: all 23 clause titles and plain-language summaries, the tracks, all 9 approvals, the dialogs, the certificate and the theme switch |
| The other 38 languages | The title, the 3 steps, the 6 track names, **all 9 approvals**, the sign control, the main buttons and the theme labels. Other text falls back as described below |

- **Machine translation.** If `translateUrl` is set (or the browser has a built-in translator), the remaining text is machine-translated. Otherwise it shows in English.
- **Full legal text.** The drawer shows each full clause in English, the binding version, with a note saying so. With a translation provider, the member can press "Translate this clause" to get a machine translation, labelled as such.
- **Arabic, Urdu, Persian and Hebrew** run right-to-left.
- **Review.** Have a native speaker or your legal translator check the translations before relying on them in a market.

## 5. Accessibility, sound, motion, themes

- **Keyboard.** There is a skip link to the approvals and visible focus rings. Esc closes the drawer and dialogs; Alt+←/→ moves between clauses. The sign button signs with Enter or Space (no holding needed on a keyboard).
- **Screen readers.** The language search supports arrow keys and Enter. Approvals are real checkboxes, and the globe announces review progress.
- **Alt text.** Every image and icon has alt text (`ALT-TEXT.md`, `alt-text.csv`).
- **Sound.** Sounds are synthesised in the browser and every click plays one. The mute button is in the top bar.
- **Motion.** Animations use only `transform`/`opacity`. The globe pauses off screen, and `prefers-reduced-motion` turns motion off.
- **Themes.** Light and dark use the same per-language palette. The theme is applied before the first paint, so there is no flash.
- **Print and download.** "Print the agreement" prints all 23 clauses in full. "Download certificate" saves an HTML copy of the consent certificate.

## 6. Performance (lab, Lighthouse-style throttling, median of runs)

| | FCP | LCP | CLS | TBT |
|---|---|---|---|---|
| Mobile, English (4× CPU, slow 4G) | 0.56 s | 0.56 s | 0 | ~95 ms |
| Mobile, Arabic | 0.57–0.61 s | 1.6–1.8 s | 0 | ~215–260 ms (just above the 200 ms target) |
| Desktop, English | 0.43 s | 0.43 s | 0 | 0 ms |
| Desktop, Korean | 0.33 s | 0.53 s | 0 | ~25 ms |

**How the speed is achieved:**

- **English** is prerendered and hydrated.
- **Other languages** are handled this way:
  - The boot script picks the member's language and theme before the first paint and preloads that language's text.
  - Meanwhile the page shows a word-less frame (bar, globe, panels), so no English flashes.
  - The page then mounts track by track in short tasks.
- **Off-screen sections** use `content-visibility`.
- **Fonts** are two self-hosted variable WOFF2 files.
- **The Turn2Opinion mark** is drawn as SVG, so there are no extra image requests. On non-English pages, the globe's extras (nodes, orbits, arcs, pings) mount a moment after the first paint.

**Hosting:** serve `dist/` with the `.br`/`.gz` copies (nginx `brotli_static on; gzip_static on;`). Cache `assets/` and `fonts/` for a year (`immutable`). The page is `noindex`, and because it sits behind login PageSpeed Insights cannot test it directly.

## 7. Before go-live (checklist)

- [ ] Legal confirms the text, `effectiveDate`/`lastUpdated`, the operator name and the contacts (`src/config.js`)
- [ ] The backend implements `POST /api/consent/business` and the "needs consent?" check (`server/` has the reference)
- [ ] `submitUrl`, `continueUrl`, `logoutUrl` and the CSRF header are set
- [ ] A native speaker reviews the translations for your launch markets
- [ ] Optional: set `translateUrl` for machine translation of the remaining text
