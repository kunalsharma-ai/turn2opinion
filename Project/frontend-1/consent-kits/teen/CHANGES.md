# Changes

## v1.1.0 — 2026-10-24 — fonts, animated logo, 3D scene, flags, diagrams, sounds

**Fonts (your pairing):** Manrope 600–700 for headings, numbers and statistics; Inter 400–500 for body text and
500–600 for buttons and navigation.

**Animated logo:** a light dot circles the swirl around the "2", a shine sweeps across the letters, the mark floats, and
hovering or clicking it sparkles (with a sound).

**Colour grading per section:** the background, rail, scroll bar and card banners change colour as you read —
Terms blue → sky, Parent violet → magenta, Your decision emerald → mint, Send sunset orange → pink.

**Moving background:** drifting colour blobs, a dotted grid that moves slower than the page, big turn-ring outlines
slowly turning, small rising bubbles, and a scroll-progress bar.

**3D scene:** the Turn2Opinion mark as a spinning coin, two tilted orbits of country flags (the member's own country
first) and floating bubbles; it leans towards the pointer; clicking the coin plays a chime.

**Flags:** 270 flag SVGs in `public/flags/` (MIT, flag-icons); shown on the language button, in the picker, on a
scrolling ribbon of all 51 languages (click one to switch), in the 3D scene and for the member's country in the rail.

**Diagrams and charts ("at a glance"), all drawn from the page's own data:**
- the four steps on an animated wave that fills and lights up as each step is done;
- the activation rule as a gate: parent's turn AND teen's turn → account opens (follows the real state);
- a bar chart of how many of the 19 sections each of the six topics holds, with count-up numbers;
- a donut of required vs optional permissions.
Labels reuse existing translated strings, so all 51 languages are covered (`npm run i18n:check` passes).

**Sounds:** new `sparkle` (logo), `whoosh` (a new section scrolls in), `blip` (language ribbon), `turn` (a turn of the
ring completes) and `coin` (3D coin). Ambient sounds wait for the first click, and everything stays silent when sound is off.

**Motion safety:** every animation stops under `prefers-reduced-motion`; the ribbon becomes a scrollable row.

## v1.0.0 — 2026-10-23 — Turn2Opinion teen consent page ("Two Turns")

The Turn2Opinion (T2O) edition of the teen (13–17) research terms and parental consent page. **Everything functional
is the same as the MyFrequentRewards v2.0.1 page; the design is new.**

**Same as the MyFrequentRewards page (unchanged):**
- The legal text: universal Frequent Research *Minor Research Participation Terms & Conditions and Parental Consent
  Agreement*, 19 sections in 6 topics, the declaration, the separate permissions, the teen's assent and the study card.
- Four taps (terms · three parent permissions · the teen's yes · send), nothing typed, no signature; "Read more" reader;
  PDF download; consent record; the teen's "No" stores no guardian data.
- 51 languages (241 strings each, checked by `npm run i18n:check`), right-to-left layout, light and dark themes, sound on
  every click, `prefers-reduced-motion`, keyboard support, alt text, print styles.
- Embed loader (Shadow DOM), reference API, SQL schema and the server-enforced activation rule.

**New design — "Two Turns":**
- Turn2Opinion logo and mark (from the supplied files); one blue family (navy, royal blue, sky) with mint for "done".
- Navy side rail with the **turn ring** (two arcs + arrowheads, centre count 0/2 → 2/2) and four numbered steps; on a
  phone it collapses to a sticky strip.
- Flat white cards, a two-up grid of topic rows, tap-to-agree rows whose check draws itself, segmented progress bars.
- Sora headings + Inter text. No 3D padlock, floating keys, combination dial or paper-craft layers.
- Confetti recoloured to the T2O palette.

**Renamed for T2O:** `window.T2O_MINOR`, events `t2o:minor-consent` / `t2o:minor-activated` / `t2o:minor-declined`,
language key `t2o.lang`, theme key `t2o.minor.theme`, consent reference `T2O-MC-YYYYMMDD-XXXXXXXX`, files
`embed/t2o-minor-consent.js`, `dist-preview/t2o-minor-consent-preview.html`.

**Includes the v2.0.1 fix from the MyFrequentRewards page:** the parent, teen and send cards are revealed even when the
viewer never reports scroll visibility.
