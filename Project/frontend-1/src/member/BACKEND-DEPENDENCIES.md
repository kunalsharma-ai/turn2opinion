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
| 13 | Quality score history | The Quality page shows the current score and an honest “history isn’t recorded yet” state | A dated score history, e.g. `GET /me/quality-history` |
| 14 | Referral participation | The referral journey shows Invited, Joined and Activated. Participated and Reward are labelled “Not shown yet” and “Programme rules”. | A per-referral survey count and reward status |
| 12 | Consent record details | `PUT /me {terms}` stores the consent ids only (the same as the agreement pages) | Store version, time and IP per consent, as is already done for Teens |

The live site also needs one routing change: see `README.md`, "Going live needs one gateway rule".
