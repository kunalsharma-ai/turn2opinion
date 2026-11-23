# Performance

> v1.1.0 adds a moving background, a 3D scene, diagrams and flags. They use only CSS transforms and SVG, the flags are
> small lazy-loaded SVGs, and the heavy parts mount after the first screen — but this has **not been measured**; run
> `npm run perf` and PageSpeed Insights on the deployed URL. The single-file preview is about 2.8 MB because it inlines every
> font, language and most flags; the real build does not.

Not yet measured for the Turn2Opinion edition. The page keeps the architecture of the MyFrequentRewards v2.0.1 page
(measured there: mobile LCP about 0.8 s in English, CLS 0.000, 187 KB transferred); the design change removed the 3D
lock, dial and floating layers, so it should be equal or lighter, but **run `npm run perf` and PageSpeed Insights on the
deployed URL to confirm** (`npm run perf` needs Playwright installed).

## What makes it fast
- English prerendered into `index.html` with the CSS inlined; first paint needs no JavaScript.
- Only the first screen (headline + terms card) is hydrated first; the parent card, the teen's card and the send panel
  mount in a short follow-up task.
- The 19 section cards and their full legal text mount only when the reader is opened.
- Code-split languages (one small chunk each); language sounds load only when the picker opens.
- Animations are transform / opacity / stroke-offset only and stop under `prefers-reduced-motion`.
- Sounds are synthesized (Web Audio): 0 KB of audio. The PDF is written in the browser: no library, no request.
- Pre-compressed `.br` / `.gz` for every text asset; images are WebP, icons are SVG.

## Known cost: complex scripts
Hindi and other Indic, Thai and Khmer scripts spend extra time on text layout because Manrope and Inter have no
Devanagari glyphs (a fallback font shapes them). Ship a subset of Noto Sans Devanagari / Tamil / … and preload it only
for that language to improve this.

## Server settings (recommended)
- Serve `*.br` (or `*.gz`) with the matching `Content-Encoding` and `Vary: Accept-Encoding`.
- `Cache-Control: public, max-age=31536000, immutable` for `assets/`, `embed/e-*.js`, `fonts/`, `brand/` and `icons/`
  (version their URL if you change brand, fonts or icons).
- `Cache-Control: no-cache` for `index.html` and `embed/t2o-minor-consent.js` / `t2o-minor-consent-app.js`.
- HTTP/2 or HTTP/3.
