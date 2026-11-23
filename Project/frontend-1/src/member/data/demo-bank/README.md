# Preview question bank (demo mode only)

`bank.json` is the full Turn2Opinion question bank that the approved v6 Profiles & Surveys deliverables
were built and verified on (their DATA.md: all 820 questions, every option list and all 50 profiles match
the admin export). The preview (`VITE_DEMO_MODE=true`) reads it through `../demoQuestions.js`, so every
profile and survey in the preview shows every question and option. The live site never loads it: real
members get their questions from `/api/v1/profile`, `/api/v1/question` and `/api/v1/option/:name`.

| Key | From the v6 deliverables | What it holds |
|---|---|---|
| `Q` | `public/data/core.json` | question name → [text, parent question] |
| `O` | `public/data/core.json` | option lists, keyed by the parent's answer (`''` = no parent) |
| `A`, `L` | `public/data/core.json` | questions that reuse another question's / a shared list |
| `jobrole` | `public/data/jobrole/*.json` (merged) | job titles per department |
| `city` | `public/data/city/{IN,US,GB,CA,AU,SG,AE}.json` | cities per state for the preview's countries |
| `profiles` | `src/data/profiles-index.json` | the 50 profiles (Consumer/Pro `b2c`, Teen `minor`) and their questions in order |
