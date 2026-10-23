# Turn2Opinion Respondent Profile — Next.js single page

Self-contained App Router page for the v5.2 respondent profile builder.

Route after install: **`/profiles`**

## Folder layout (everything lives under `app/profiles`)

```
app/profiles/
  page.jsx              ← Next.js page ('use client')
  App.jsx               ← main React app
  components/           ← UI components
  lib/                  ← engine, validation, storage, etc.
  i18n/                 ← languages + translation
  data/                 ← profiles-index + alt-text (bundled)
  styles/               ← app.css, v5.css, city.css
  static/               ← must be served at URL /profiles/*
      data/             ← core.json, city/, jobrole/
      flags/
      i18n/
      illustrations/
      icons/
      images/
      img/
      …
  README.md
```

## Install into an existing Next.js project

1. **Copy the page module**

   ```bash
   # from your Next.js project root
   cp -R path/to/this/app/profiles  app/profiles
   ```

2. **Expose static assets at `/profiles/*`**

   Next.js only serves files from the project `public/` directory.

   ```bash
   mkdir -p public/profiles
   cp -R app/profiles/static/.  public/profiles/
   ```

   After this, URLs like `/profiles/data/core.json` and `/profiles/flags/sprite.webp` work.

3. **Optional: configure API / submit endpoint**

   In any client layout, root layout, or before the page mounts:

   ```js
   // e.g. in app/layout.jsx inside a client component, or a <Script>
   if (typeof window !== 'undefined') {
     window.T2O_CONFIG = {
       endpoint: '/api/respondent/profile',   // POST completed profiles
       dataUrl: '/profiles/data',             // already the default
       api: '/api',                           // OTP / validation (optional)
       progressEndpoint: '',                  // Opinion City reminders (optional)
       memberId: '',
     };
   }
   ```

4. Open **`http://localhost:3000/profiles`**

## Requirements

- Next.js 13+ (App Router)
- React 18 or 19
- No extra npm packages required for the UI itself (React only)
- JSON imports must be allowed (default in modern Next.js)

## Notes

- All asset paths are prefixed with `/profiles/` so nothing depends on files outside this folder (except the copy step into `public/profiles`).
- Server-side pieces from the original Vite project (`server/`, reminder e-mails, translate proxy) are **not** included. Wire those as separate Next.js API routes if you need them.
- Original build/scripts/dev tooling is not needed; Next.js handles bundling.

## Original package

Source: turn2opinion-respondent-profile v5.2  
50 profiles · 135 languages · Opinion City rewards · validation + risk scoring.
