# Turn2Opinion — Consumer Panel Terms, Privacy Notice & Consent page

The page a member sees **right after logging in** (first login, and again whenever the terms version changes). It explains all 22 sections of the Consumer Panel Terms, Conditions, Privacy Notice and Consent in plain words first and in full below, then collects the member's choices (3 required, 4 optional) and stores a consent record through your API.

It is a separate page. The public website is not changed.

- **React 19 + esbuild.** Only three npm packages: `react`, `react-dom`, `esbuild`.
- **Two ways to use it:** a standalone page (`dist/index.html`), or one script you paste into your app (`dist/embed/t2o-consent.js`, isolated in a Shadow DOM).
- **Look: "your opinion, live".** The design is built around what consumers already do every day on their phones: rate, react, swipe, like. It is completely different from the MyFrequentRewards page (prize wheel, coins, golden ticket).
  - **3D phone.** A phone floats in the header and plays a looping mini survey, with story-style progress segments at the top:
    - a product rating whose stars pop in one by one;
    - a mood slider whose face turns from unsure to happy;
    - a quick poll whose bars grow.

    The member's reading count sits on the phone's screen. Every section read makes the phone burst with hearts.
  - **Around the phone.** Live reactions (hearts, stars, likes) rise beside it, colourful stickers bob around it, and chat bubbles with typing dots drift through the header.
  - **Chapters.** Each chapter banner has a rotating "story ring" around its icon and a beating heart badge, on a polka-dot sticker background with a big floating quote mark.
  - **Section cards.** Cards wobble like jelly on hover. When a section is read, a big heart pops over its tile (like a double-tap) and a beating heart appears in the "Read" badge.
  - **Switches and progress.** The switch knobs are little faces: unsure when off, smiling and yellow when on. The progress bar under the top bar is split into 22 story segments.
  - **After agreeing.** A little receipt printer "prints" the member's receipt on thermal paper with a zig-zag torn edge, while hearts and likes float up.
  - **Sounds.** A "social" set: bubble pops, swipes, a like-sparkle, a deflate, heart pops and a receipt-printer buzz with a happy chord. Each language also keeps its own sound signature.
- **Light and dark themes.** A sun/moon switch in the top bar lets the member choose, and the choice is remembered (`localStorage t2o.consent.theme`). Until they choose, English opens light and every other language opens dark. You can force one with `theme`. Each language tints both themes with its own colours.
- **51 languages** with the language button in the top bar. Each language plays its own sound when chosen, and every click has a sound.
- **Speed:** prerendered English HTML with its CSS inline. Lab measurements (Lighthouse-style throttling, median of 3–5 runs):

  | Mobile (4× CPU, slow 4G) | FCP | LCP | TBT | CLS |
  |---|---|---|---|---|
  | English | ≈ 0.57–0.58 s | ≈ 0.57–0.58 s | ≈ 115–135 ms | 0 |
  | Arabic | ≈ 0.56 s | ≈ 1.5 s | ≈ 140 ms | 0 |

  | Desktop | FCP | LCP | TBT |
  |---|---|---|---|
  | English | ≈ 0.38 s | ≈ 0.38 s | 0 |
  | Chinese | ≈ 0.32 s | ≈ 0.42 s | 0 |
- Every image and icon has alt text: see `ALT-TEXT.md` and `alt-text.csv`.

---

## 1. Run it

```bash
npm install
npm run build           # → dist/ (standalone page + embed script + compressed copies)
npm run preview         # → http://localhost:4300 (includes a demo /api/consent that logs what it receives)
npm run build:preview   # → dist-preview/t2o-consent-preview.html (single file, opens from disk, demo mode)
npm run serve:api       # reference consent API on :8790 (server/consent-api.mjs)
npm run alt:report      # regenerate ALT-TEXT.md + alt-text.csv
```

## 2. Integration

### When to show the page
After login, ask your backend whether the member has a consent record for the **current terms version** (`termsVersion`, default `2026.10`). If not, show this page instead of the dashboard. The reference endpoint `GET /api/consent/status?memberId=…` in `server/consent-api.mjs` shows the logic.

### A. Standalone page (simplest)
Publish the contents of `dist/` at, for example, `https://www.turn2opinion.com/consent/`. Put the member's data in the `window.T2O_CONSENT` object near the top of `dist/index.html`. Render that line server-side, or serve the file through your template engine:

```html
<script>window.T2O_CONSENT = {
  member: { id: '12345', firstName: 'Priya' },
  submitUrl: '/api/consent',
  headers: { 'X-CSRF-Token': '{{csrf}}' },
  continueUrl: '/dashboard',
  logoutUrl: '/logout'
};</script>
```

### B. Embed in your app (paste after login)
```html
<div id="t2o-consent"></div>
<script>window.T2O_CONSENT = { member: { id: '12345', firstName: 'Priya' }, submitUrl: '/api/consent',
         continueUrl: '/dashboard', logoutUrl: '/logout', assetBase: 'https://www.turn2opinion.com/consent/' };</script>
<script src="https://www.turn2opinion.com/consent/embed/t2o-consent.js" defer></script>
```
- The page renders inside a **Shadow DOM**, so your CSS and its CSS never affect each other. Use `isolate: false` to render in the normal DOM instead.
- `assetBase` is the URL where the `dist/` folder (`brand/`, `fonts/`) is published.
- A working example is in `examples/embed-example.html`.

### Configuration (`window.T2O_CONSENT`, defaults in `src/config.js`)
| Key | Default | Meaning |
|---|---|---|
| `member` | `{}` | `{ id, firstName, email, country }`. `firstName` appears in the greeting, and `id` is sent with the record |
| `submitUrl` | `/api/consent` | Where the consent record is POSTed (JSON, `credentials: 'include'`) |
| `headers` | `{}` | Extra request headers (CSRF token, auth) |
| `continueUrl` | `/dashboard` | The "Continue to your dashboard" button. Leave it blank to keep the receipt on screen |
| `logoutUrl` | `/logout` | "Not now" → "Log out" |
| `termsVersion` | `2026.10` | Bump it when the meaning of the terms changes. Members are then asked again |
| `effectiveDate`, `lastUpdated` | `2026-10-18` | Shown under the title. **Legal must confirm these dates** |
| `operator`, `website`, `supportEmail`, `privacyEmail`, `address` | Turn2Opinion data | Fill the placeholders of the terms (operator, contact, privacy contact) |
| `privacyPolicyUrl`, `cookiePolicyUrl` | site pages | Footer links |
| `theme` | `auto` | `auto`: English → light, other languages → dark, until the member uses the sun/moon switch. Or `light` / `dark`. The member's own choice always wins |
| `language` | `auto` | The first language. `auto` means: `?lang=` in the URL, then the member's choice on the main site (`t2o.lang`), then the browser language |
| `translateUrl` | `''` | Optional machine translation of the full legal text. Uses the same contract as the website's `/api/translate` |
| `assetBase` | `''` | Base URL for `brand/` and `fonts/` (embed mode) |
| `onAccept(record)`, `onDecline()` | — | Optional callbacks (embed mode) |
| `demo` | `false` | Preview only: the POST is simulated |

**Events:** `window` receives `t2o:consent` (with `detail` = the record) after a successful save, and `t2o:consent-declined` when the member logs out from the "Not now" dialog.

### API contract — `POST submitUrl`
Request body:
```json
{
  "consentId": "T2O-20261018-1O024069",
  "memberId": "12345",
  "termsVersion": "2026.10",
  "effectiveDate": "2026-10-18",
  "language": "hi",
  "acceptedAt": "2026-10-18T09:53:18.260Z",
  "timezone": "Asia/Kolkata",
  "consents": { "terms": true, "privacy": true, "age": true, "marketing": false, "analytics": true, "recordings": false, "sensitive": false },
  "sectionsRead": [1, 2, 3, 4, 22],
  "sectionsOpened": [3],
  "pageUrl": "https://…/consent/",
  "userAgent": "…"
}
```
Respond with `200 { "ok": true, "consentId": "…" }`. Your `consentId` replaces the client one on the member's receipt. Any non-2xx response shows "We couldn't save your choices" with a retry.

The server must:
- take the member id from the **session**, not from the body;
- verify that the three required consents are `true`;
- verify the CSRF token;
- store the server time;
- keep records append-only (they are evidence).

`server/consent-api.mjs` (Node reference) and `server/schema.sql` (table) show all of this.

## 3. Editing the content
| What | Where |
|---|---|
| Legal text of the 22 sections, chapters, colours, icons | `src/content/terms.js` |
| Consent checkboxes (which are required, which sections they refer to) | `CONSENTS` in `src/content/terms.js` |
| Interface text + plain-language summaries (English) | `src/i18n/strings/en.js` (UI), plus `title`/`short` in `terms.js` |
| Translations | `src/i18n/strings/<code>.js` (12 full) and `src/i18n/strings/essential.js` (38 languages, essentials) |
| Languages, colour grades, sound per language | `src/i18n/languages.js`, `src/i18n/sounds.js` |
| Click sounds | `src/sound.js` |
| Look and feel | `src/styles/app.css` (light = English, classic = other languages) |
| Logo / mark | `public/brand/` |

If you change the meaning of any section, bump `termsVersion` and update the translations of the changed `title`/`short`.

## 4. Languages: what is translated
| Languages | Translated |
|---|---|
| English | Everything (source) |
| 简体中文, 繁體中文, हिन्दी, Español, العربية, Português, Français, Deutsch, 日本語, 한국어, Bahasa Indonesia, Русский | The whole interface: every section title, every plain-language summary, all consent boxes, buttons, dialogs and the receipt |
| The other 38 languages | The title, the 3 steps, the 6 chapter names, **every consent box**, and the main buttons. Everything else follows below |

- **Remaining text:** if `translateUrl` is set (or the browser has a built-in translator), the rest is machine-translated. Otherwise it shows in English.
- **Full legal text:** shown in English, the binding version. A note says so. With a translation provider, the member can press "Translate the full text" for a machine translation, labelled as such.
- **Review:** have the translations reviewed by a native speaker (or your legal translator) before relying on them in a market.

## 5. Accessibility, sound, motion
- Keyboard: skip link, focus rings, Esc closes dialogs, arrow keys and Enter in the language search. Screen readers get labelled switches, live progress and dialogs.
- Sounds are synthesised in the browser (no audio files). There is a mute button in the top bar, and it shares the Turn2Opinion website's sound setting (`t2o.sound`).
- Animations use only `transform`/`opacity`. The phone pauses off screen, the chat bubbles stay in the header, and `prefers-reduced-motion` turns motion off and hides the confetti.
- Non-English pages are handled this way:
  - Before the first paint, the boot script picks the member's language and theme.
  - The page then shows a word-less frame (bar, phone, panels), so no English flashes.
  - The chapters then mount one by one in short tasks.
- Off-screen chapters use `content-visibility`.
- Print: the "Print" button prints every section in full. "Download a copy" saves an HTML copy of the terms plus the member's receipt.

## 6. Hosting
Serve `dist/` with the `.br`/`.gz` copies (nginx `brotli_static on; gzip_static on;`), and cache `assets/` and `fonts/` for a year (`immutable`). The page is `noindex`. It sits behind login, so PageSpeed Insights cannot test it directly; the lab numbers above come from the same throttling.

## 7. Before go-live (checklist)
- [ ] Legal confirms the text, `effectiveDate`/`lastUpdated`, operator name and contacts (`src/config.js`)
- [ ] Backend implements `POST /api/consent` + the "needs consent?" check (`server/` has the reference)
- [ ] `submitUrl`, `continueUrl`, `logoutUrl`, CSRF header set
- [ ] Native-speaker review of the translations for your launch markets
- [ ] Optional: `translateUrl` for machine translation of the remaining text
