# Member area (frontend-1, Round 15)

The signed-in member area for the three panels: Consumer, Business professional and Teen (13–17).
It is one persistent React app mounted for every `/member/<page>/` route that frontend-1 serves.

| URL | Page |
| --- | --- |
| `/member/dashboard/` | Dashboard. Consumer, Professional or Teen layout, picked from `me.category`. |
| `/member/profiles/` | Profiles: welcome hero, Opinion Kingdom, About-you cards, Incomplete, sealed Surveys. Answering runs here. |
| `/member/surveys/` | Surveys: survey cards with filters, search and paging, starting a survey, participation history |
| `/member/rewards/` | Points and rewards |
| `/member/quality-score/` | Quality score |
| `/member/referrals/` | Invite & earn, history, follow-us bonuses |
| `/member/activity/` | Activity timeline |
| `/member/profile/` | My account: photo upload, details, location, Teen guardian card |
| `/member/settings/` | Appearance, sound, language, notifications, privacy, profile, account |

These pages stay on the existing member app (Project/frontend) and are linked from here with a full
page load. Their approved designs and animations are not reproduced:

- `/member/myaccount`: payment methods, pause and delete
- `/member/support`

**Going live needs one gateway rule.** Send the nine URLs above to frontend-1, and keep every other
`/member/*` URL on the existing app.

## Round 16 redesign

Three experiences, each with its own hero, layout, colours and section styles:

| Member type | Name | Hero visual (real data) | Profile section | Survey section |
| --- | --- | --- | --- | --- |
| Consumer | Opinion Playground | `OpinionLoop`: Opinion → Survey → Contribution → Reward → Impact | Profile road | Opportunity deck |
| Professional | Insight Studio | `InsightPipeline`: Responses → Data → Analysis → Insight | Research dossier | Research briefs |
| Teen | Voice Lab | `VoiceConstellation` plus guardian status | Profile quests | Missions |

Every dashboard follows the journey: profile above surveys, then rewards, quality, referrals, activity.
Section pages each have their own identity: Rewards (vault and milestone path), Quality (gauge, what /
why / how, tier ladder, strengths, next steps), Referrals (network and referral journey), Activity
(month-by-month river), My account (identity hero and membership card), Settings (control centre).
The header has a jump-to palette (Ctrl K), animated points and quality pills, and a profile-completion
ring on the avatar. Files: `components/art.jsx`, `components/Sections.jsx`, `dashboards/*.jsx`,
`member-x.css`, `member-xp.css`, `i18n/en-x.js`.

## Round 17 engagement features

Streaks, Quick Opinion polls, impact stories, monthly goals and instant alerts for everyone; gem
tiers, product testing, lucky spin and a referral leaderboard for Consumers; expert badges, a
benchmark report, charity donations and LinkedIn certificates for Professionals; learning badges,
season challenges, Teen-only polls, a guardian summary and guardian-approved gift cards (never cash)
for Teens. Files: `components/Engage.jsx`, `data/engage.js`, `member-xe.css`, `i18n/en-e.js`.

None of these has a backend yet, except WhatsApp alerts (the existing `communication-methods`
answer). `engageOn(id)` in `data/engage.js` returns true in the design preview and false on the live
site, so every unbuilt block renders nothing for real members. To switch one on, add its API adapter
and put its id in `LIVE`. The full list is in `BACKEND-DEPENDENCIES.md`, items 15 to 32.

## Round 18 section-page engagement

Rewards: savings goal, points forecast, bonus weekends and expiry reminders. Quality score: score
boosters, attention-check practice, Trusted Member badge and a monthly report card. Referrals: share
cards (WhatsApp, Instagram story image, QR code), milestones and friend nudges; Teens get invites only,
after confirming a guardian said OK, with no rewards. Activity: year in review, active-days heatmap,
category filter and a "why was I screened out?" explainer. My account: a downloadable member level
card, profile freshness and linked sign-in. Settings: survey preferences, quiet hours with digests, and
a data and privacy centre. Files: `components/Grow.jsx`, `components/qr.js`, `i18n/en-g.js`, styles
at the end of `member-xe.css`. Items 33 to 53 in `BACKEND-DEPENDENCIES.md` say which parts are live.

## Layers

```
routes.js  /member/:page/  ──►  MemberApp.jsx  (one instance, key "member-app")
                                   │
     data/source.js   adapters: raw API JSON ──► view models (adaptMe, adaptPoints, …)
     data/demo.js     preview fixtures (VITE_DEMO_MODE only)
     data/MemberData.jsx  provider: me first, then every section in parallel
                          useMe(), useSection(name) -> [data, status, retry]
                                   │
     theme/appearance.js  modes, palettes, contrast-checked tokens -> CSS vars on <html>
     theme/AppearanceProvider.jsx
     i18n/en.js + t.js    every visible string, {var} interpolation, plurals
                                   │
     components/ui.jsx       Button, Card, Badge, ProgressRing, Counter, Toggle, Segmented,
                             Tabs, Modal (portal), Skeleton, EmptyState, ErrorState, Toast …
     components/Shell.jsx    header, sidebar, bottom bar, drawer, notification centre,
                             appearance / language / sound controls, avatar menu
     components/Modules.jsx  WelcomeHero, PointsCard, QualityScoreCard, SurveySection,
                             ProfileCompletionCard, ReferralCard, ActivityTimeline,
                             Achievements, Expertise, Qualification, Insights, GuardianConsent
     dashboards/Dashboards.jsx  Consumer / Professional / Teen = config/memberTypes.js LAYOUT
     pages/Pages.jsx, pages/Account.jsx
     member.css              the design system: tokens, spacing (--s1…--s8), type scale,
                             radii, elevation, motion, every component, breakpoints
```

Nothing below `data/` calls `fetch`. To change where a number comes from, change one adapter.

## APIs used (all existing, unchanged)

| Section | Call |
| --- | --- |
| me | `GET /api/v1/me` |
| points | `GET /api/v1/me/points` |
| stats | `GET /api/v1/me/statistics` |
| surveys | `POST /api/v1/me/survey {status:'active'}` |
| activity | `POST /api/v1/response` |
| profiles | `POST /api/v1/profile {category}` |
| referrals | `POST /api/v1/user {referredBy}`, `GET/POST /api/v1/me/invite` |
| alerts | `GET /api/v1/alerts` |
| guardian (Teen) | `GET /api/v1/user/teen-profile` |
| socials | `GET /api/v1/socials`, `POST /api/v1/follow-social/verify` |
| photo | `POST /api/v1/upload/image`, then `PUT /api/v1/me {profilePicture}` |
| password | `PATCH /api/v1/me` |
| channels | `PATCH /api/v1/me/answer` |
| email | `PATCH /api/v1/me/change-email` |
| question | `POST /api/v1/question {name}` |
| options | `GET /api/v1/option/:name`, or `POST {parentValue}` for a dependent question |
| text checks | `GET /api/v1/validation/:name`, or `POST {parentValue}` |
| saved answers | `POST /api/v1/me {questions}` |
| save a profile | `PATCH /api/v1/me/profile {answers}` (sent after every step) |
| open a survey | `PUT /api/v1/me/survey {slug}`; a partner survey redirects to `link` with `$uid` = `respID` |
| finish a survey | `PATCH /api/v1/me/survey {answers, respID}` |
| phone country | `GET /api/v1/get-country` |

## Appearance

- **Mode:** Light, Dark, Night (warm, low blue) or Auto. Stored on the device (`t2o_member_appearance`).
  The member's mode is also copied to the public site's `t2o_mode`.
- **Palette:**
  - Six presets plus a custom colour.
  - Each member type has a default: Consumer Turn2 Blue, Professional Midnight, Teen Purple.
  - The accent is lightened or darkened until text on it reaches 4.5:1 contrast.
- **Motion:** "Reduce motion" in Settings, or the device setting, turns off tilt, counters and
  reveals.
- **Sound:** shares the site's sound switch (`t2o_chat_sound`). Only completion, points, achievement
  and notification cues play.

## Preview

`npm run preview:single` builds one HTML file with sample data. Use the "Preview as" and "State"
bar to switch between Consumer, Professional and Teen, and between data, loading, empty and error.

## Registration (pages/Join.jsx)

**Consumer and Professional** go through five steps:

1. **Details.** Includes Country, State, City and ZIP, and for Professionals three optional work
   answers from the profile bank.
2. **Confirm email.** Opened from the email link.
3. **Create password.** This call also signs the member in.
4. **Consent & Terms.** `components/onboarding/ConsentPanel.jsx` shows the approved agreement from
   `src/data/consent/`, generated word for word by `scripts/extract-consent.mjs`. Choices are saved
   with `PUT /api/v1/me {terms}`.
5. **Dashboard.**

There are no welcome questions. `/welcome/` now redirects to the dashboard.

**Teen** keeps its existing steps: You, then Parent or guardian, then Consent & send. The guardian's
YES and NO email buttons open `/parent-consent/` at the matching question (unchanged). After the
guardian consents, the Teen sets a password, sees a consent receipt (who, date, version, ✓) and is
taken to the Teen dashboard.

## Profiles and Surveys (Round 19, v6 design in Round 20)

Round 20 carries the approved **v6 "Profiles & Surveys" design** (developer deliverables v6) onto the
same data. The v6 visuals live in `v6/` and run on the member area's endpoints; nothing in v6's own
local question bank, storage or submission code is used.

- **`v6/`**: `components/` (Hero, Kingdom, ItemCard, LockedPopup, Celebration, Icon, Logo, Odo from v6;
  `Flow.jsx` rewritten on our endpoints), `lib/` (v6 art, emoji, themes, fx, celebrations; `progression.js`,
  `rewards.js`, `present.js` rewritten for our profile list), `i18n/` (v6 English strings), `Stage.jsx`
  (the `#t2o` root shared by both pages), `questions.js` (question rules), `v6.css` (GENERATED from the
  v6 stylesheets, every selector scoped to `#t2o`, v6 dark theme mapped to `data-mb-mode` dark/night)
  and `member-v6.css` (member-area layer: fitting in the shell, Surveys page, history).
- **Profiles** (`pages/Profiles.jsx`): hero greeting with the Opinion Galaxy, "{Name}'s Opinion Kingdom"
  (a building per profile/survey, treasury with the member's real points and quality score, level
  stones, treasure chest, royal seals, starry night in dark mode), About you · Profiles, Incomplete,
  Surveys (8 shown, then "Show all").
- **About-you profiles** are `basic` and `educational` (`ABOUT_YOU`, as in v6); a panel without them
  (Teen) uses its first two. Every other profile is shown as a survey.
- **Unlocking (v6 rules)**: only the first unfinished About-you profile is open; surveys stay sealed
  until About you is complete, then open **one at a time** in the order the API lists them. Completed
  items stay open for updating. Tapping a locked card or plot shows "Sealed for now!" with what unlocks it.
- **Question flow** (`v6/components/Flow.jsx`): one question per screen on the item's own world
  colours, flow bar with journey track and "Question n of N", single-choice auto-advance, emoji per
  option, filter on long lists, chips for long multi-selects. Same rules as before: dependent options,
  exclusive / None / Prefer-not-to-say / Others + specify, max selections, validation patterns, phone
  with country code (locked once saved), age vs date of birth. **A profile saves page by page**
  (`PATCH /api/v1/me/profile` when the member leaves a page's last question); a Turn2Opinion survey saves
  once at the end (`PATCH /api/v1/me/survey`). Completing a profile for the first time shows the v6
  celebration (its building rises, +50 points, +1 quality).
- **Surveys** (`pages/Surveys.jsx`): v6-style header with earned points, All new / High reward / Short,
  search, paid invitations as colour cards, topic surveys as v6 cards (sealed until About you, then one
  at a time), 12 / 24 / 48 per page, terms check, participation history with From / To, search,
  "Resume" on Turn2Opinion-hosted dropouts. Partner surveys still redirect to their link.
- **Deep links**: `/member/profiles/#p-<slug>` opens a profile (or its sealed message),
  `/member/surveys/#start-<slug>` starts a survey (`pages/anchor.js`).
- The device keeps only which kingdom buildings have already been raised (`t2o:member:built`), so each
  rise animation plays once.
- Preview data: `data/demoQuestions.js` (questions, options, answers kept for the browser session).
