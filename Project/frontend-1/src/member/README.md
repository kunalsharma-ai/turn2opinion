# Member area (frontend-1, Round 15)

The signed-in member area for the three panels: Consumer, Business professional and Teen (13–17).
It is one persistent React app mounted for every `/member/<page>/` route that frontend-1 serves.

| URL | Page |
| --- | --- |
| `/member/dashboard/` | Dashboard. Consumer, Professional or Teen layout, picked from `me.category`. |
| `/member/rewards/` | Points and rewards |
| `/member/quality-score/` | Quality score |
| `/member/referrals/` | Invite & earn, history, follow-us bonuses |
| `/member/activity/` | Activity timeline |
| `/member/profile/` | My account: photo upload, details, location, Teen guardian card |
| `/member/settings/` | Appearance, sound, language, notifications, privacy, profile, account |

These pages stay on the existing member app (Project/frontend) and are linked from here with a full
page load. Their approved designs and animations are not reproduced:

- `/member/surveys`: survey cards and survey flow
- `/member/profiles`: the "Welcome! Your world is waiting" hero and Opinion Kingdom
- `/member/myaccount`: payment methods, pause and delete
- `/member/support`

**Going live needs one gateway rule.** Send the seven URLs above to frontend-1, and keep every other
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
