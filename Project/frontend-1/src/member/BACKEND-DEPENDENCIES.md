# Backend dependencies (not built)

Round 15 changed no backend code. Everything in the member area and the new registration flow uses
APIs that already exist. The items below are things the design would use if the API offered them.
Today each one is handled on the device or hidden.

| # | Need | What the frontend does today | Backend change that would enable it |
| --- | --- | --- | --- |
| 1 | Redeem points | "Redeem" links to the existing My account page, and only once the payout milestone is reached | A redemption endpoint (choose method, amount, confirm) |
| 2 | Pending points | Not shown. Only earned, redeemed and total are shown. | `pendingPoints` on `GET /me/points` |
| 3 | Notification read/unread | Read state is kept on the device (`t2o_member_read_alerts`) | A `read` flag on alerts, plus `PATCH /alerts/:id` |
| 4 | Appearance, sound and language on every device | Stored on the device only | A preferences field on the user, e.g. `PATCH /me {preferences}` |
| 5 | Achievements | Derived from real data on the device (first survey, profile complete, 10 surveys, quality 90 %, first referral, payout milestone, 50 surveys) | An achievements store, if badges should be awarded or counted server-side |
| 6 | Referral rewards | The page says rewards follow the programme rules. No amount is promised. | Crediting points when a referred member qualifies |
| 7 | Invite email | Uses `POST /me/invite` as is | The invite email links to `/?ref=` but registration reads `?ref=…&signup`. Its subject line should also be checked. |
| 8 | Support tickets | Links to the existing support page | The support ticket email goes to a test Gmail address. It should go to the support inbox. |
| 9 | Remove profile photo | Sends `PUT /me {profilePicture: null}`. Not verified against the API. | Confirm that `null` clears the photo, or add a delete call |
| 10 | Password before email check | Kept as is. Email is confirmed first, then the password is set. | Accepting a password at `PUT /user` would need a backend change, so the flow keeps the email step |
| 11 | More Professional sign-up fields | Only questions that already exist in the profile bank are offered (`empstat`, `industry`, `add-seniority`) | New answer keys, if more are wanted |
| 12 | Consent record details | `PUT /me {terms}` stores the consent ids only (the same as the agreement pages) | Store version, time and IP per consent, as is already done for Teens |
| 13 | Quality score history | The Quality page shows the current score and an honest “history isn’t recorded yet” state | A dated score history, e.g. `GET /me/quality-history` |
| 14 | Referral participation | The referral journey shows Invited, Joined and Activated. Participated and Reward are labelled “Not shown yet” and “Programme rules”. | A per-referral survey count and reward status |

## Engagement features (Round 17)

These are built as full UI with preview data (`data/engage.js`). On the live site each one is
switched off by `engageOn(id)` and renders nothing, so members never see a feature that cannot work.
When an API ships: add an adapter in `data/source.js`, have `engageData()` read it, and add the id to
`LIVE` in `data/engage.js`. Instant alerts by WhatsApp is the one exception: it already works through
the existing communication-methods answer.

| # | Feature (`id`) | Who | What the frontend does today | Backend change that would enable it |
| --- | --- | --- | --- | --- |
| 15 | Daily streak (`streak`) | All | Preview only. Shows the last 7 days, best streak and a "claim bonus" button. | Record one qualifying action per day (survey opened or poll vote), return `{days, best, week[7], bonus, claimedToday}`, and credit the bonus points on claim |
| 16 | Quick Opinion polls (`polls`) | All | Preview only. One-tap vote, then animated results. The vote is kept on the device. | Poll storage per audience (Consumer, Professional, Teen), one vote per member, `POST /polls/:id/vote` and live result totals |
| 17 | Your impact stories (`stories`) | All | Preview only. Cards that link a survey to a change a brand made. | A small content store of approved stories (survey, change, date, audience), edited by the research team |
| 18 | Monthly goal bonus (`goal`) | All | Progress is real (this month's completed surveys from the activity feed). Target and bonus are preview values. | A monthly target per member type and crediting the bonus once when it is reached |
| 19 | Push notifications (`push`) | Consumer, Professional | Preview only, the toggle is kept on the device. WhatsApp is live through `communication-methods`. Teens get email and dashboard only. | Web push subscription storage and sending a push when a well-matched survey opens. WhatsApp sending for new matches also needs to be confirmed on the backend. |
| 20 | Gem tiers Bronze to Diamond (`tiers`) | Consumer | The tier is computed on the device from completed surveys (0 / 5 / 15 / 30 / 60). Perks are listed but not applied. | Tier stored on the member, plus the perks themselves: tier-based survey targeting and faster redemption |
| 21 | Product testing (`tests`) | Consumer | Preview only. Product cards with an Apply button. | Product test campaigns, applications, selection and shipping status |
| 22 | Lucky spin and prize draws (`spin`) | Consumer | Preview only. One spin per completed profile; the result is picked on the device. | Server-side spin allowance and prize choice (never on the device), crediting the prize, and written prize-draw rules checked by legal for each country |
| 23 | Referral leaderboard (`leaderboard`) | Consumer | Preview only. Monthly podium plus the member's rank. Only first names and an initial are shown. | Monthly qualified-referral counts with privacy-safe names, prize rules and prize crediting |
| 24 | Expert badges by industry (`experts`) | Professional | Preview only. Gold / Silver / Bronze per industry with what each level unlocks. | Studies completed per industry, badge levels, and invitations to paid interviews and focus groups for qualifying members |
| 25 | Anonymous benchmark report (`benchmark`) | Professional | Preview only. The member's answers next to peer averages. | Aggregated peer results by industry and company size, with a minimum group size so no one can be identified |
| 26 | Charity donations (`donate`) | Professional | Preview only. Three causes and an amount slider, open from 500 points. | A donation redemption type, a list of partner charities and donation receipts |
| 27 | LinkedIn certificates (`certs`) | Professional | Preview only. The "Add to LinkedIn" button uses LinkedIn's public add-to-profile link. | Certificate records with an id and a public verification page the LinkedIn entry can point to |
| 28 | Teen learning badges (`learning`) | Teen | Preview only. Short lessons; reading one earns the badge on the device. | Store earned learning badges per Teen |
| 29 | Season challenges (`season`) | Teen | Preview only. A season with three challenges and progress. | Seasons, challenges, progress tracking and points for completed challenges |
| 30 | Teen-only polls (`polls`) | Teen | Same as item 16, shown with a Teen-only label. | Polls limited to Teen members, results shared back only to Teens |
| 31 | Guardian summary email (`summary`) | Teen | Preview only. Shows what the guardian receives: totals only, never answers. | A weekly or monthly summary email to the consenting guardian, and a way for the guardian to change how often |
| 32 | Guardian-approved gift cards (`giftcards`) | Teen | Preview only. Teens pick a gift card (no cash), the request waits for the guardian. | A gift card catalogue, a redemption request, a guardian approval email with Yes / No (like the consent email), and delivery once approved |

## Section-page engagement (Round 18)

Built in `components/Grow.jsx`. Features marked **Live** use only data the site already has, or keep
the member's choice on their device, so they show on the live site today. The rest are preview only
(hidden by `engageOn`) until their API exists.

| # | Feature (`id`) | Page | Status today | Backend change that would enable it |
| --- | --- | --- | --- | --- |
| 33 | Savings goal (`savings`) | Rewards | **Live.** The goal is kept on the device (`t2o_member_goal`), and the survey countdown uses the member's average points per survey. | Optional: store the goal on the member so it follows them across devices |
| 34 | Points forecast (`forecast`) | Rewards | **Live.** Uses points earned per week over the last 8 weeks. | None |
| 35 | Bonus weekends and double-points surveys (`bonus`) | Rewards, dashboards | Preview only: a banner with a live countdown | Bonus campaigns (multiplier, start, end, eligible surveys) and crediting the extra points |
| 36 | Points expiry reminders (`expiry`) | Rewards | Preview only | Only if points are given an expiry rule: the next expiring amount and date, plus a reminder email |
| 37 | Score boosters (`boosters`; estimates `boostPts`) | Quality score | **Live** task list (open profiles, phone number, unfinished surveys, practice). The "+N" score estimates are preview only. | The real effect of each task on the quality score |
| 38 | Monthly quality report card (`report`) | Quality score | Preview only. The live site keeps the "history isn't recorded yet" state. | Monthly score snapshots (see item 13) and completed and screened-out counts per month |
| 39 | Attention-check practice (`practice`) | Quality score | **Live.** Nothing is sent or scored. | None |
| 40 | Trusted Member badge at 180+ (`trusted`) | Quality score | Preview only | A Trusted flag and priority targeting for invites |
| 41 | Share cards: WhatsApp, Instagram story, QR (`share`) | Referrals | **Live.** The QR code is generated in the browser (`components/qr.js`, no library), and the story image is drawn on a canvas. | None |
| 42 | Referral milestones at 1, 3, 5 and 10 friends (`refMilestones`) | Referrals | Preview only. Not shown to Teens. | Milestone rules and crediting (see items 6 and 14) |
| 43 | Nudge a friend (`nudge`) | Referrals | Preview only. Not shown to Teens. | Whether a referred friend has completed a survey, plus a rate-limited reminder email |
| 44 | Teen invites with guardian OK (`teenInvite`) | Referrals | **Live.** Share buttons stay disabled until the Teen confirms a guardian said OK. There are no rewards and no milestones. | None. A guardian-side approval could be added later. |
| 45 | Year in review (`wrapped`) | Activity | **Live**, from the activity feed. The impact line shows only when impact stories exist (item 17). | None |
| 46 | Activity heatmap (`heatmap`) | Activity | **Live**, from the activity feed | None |
| 47 | Category filter and screen-out explainer (`screenout`) | Activity | **Live.** The category comes from `survey.surveyCategory` when the response API includes it; otherwise the filter hides itself. | Include `survey.surveyCategory` in `POST /api/v1/response` results, if it is not already there |
| 48 | Member level card download (`levelcard`) | My account | **Live.** Shows first name and last initial only. | None |
| 49 | Profile freshness (`freshness`) | My account | Preview only | A last-updated date per profile in `POST /api/v1/profile` |
| 50 | Linked accounts, Google and phone (`linked`) | My account | Preview only | Google sign-in and phone (OTP) login linked to the member |
| 51 | Survey preferences (`prefs`) | Settings | Preview only | Store preferred length, topics to avoid and best time, and use them in survey matching |
| 52 | Quiet hours and digest (`quiet`) | Settings | Preview only | Store them and have email, WhatsApp and push sending respect them |
| 53 | Data and privacy centre (`datacentre`; full copy `dataFull`) | Settings | **Live**: who-sees-what, plus a JSON download of the account data the page already holds. "Full copy with answers" is preview only. | A full data-export request that includes survey answers |

The live site also needs one routing change: see `README.md`, "Going live needs one gateway rule".
