# Turn2Opinion — copy deck

Subject lines, preheaders, calls to action and send classification for all 22
templates (4 lifecycle reminders + 18 system templates). Generated from the build:
edit the `meta` block in `react/src/emails/*.jsx` and re-run
`npm run build && npm run docs`.

**Subject line rules applied throughout**
- No invented urgency, no fake scarcity, no invented reward amounts — rewards come from
  merge fields or from the v6 dashboard rule (+50 points, +1 quality score per item).
- No all-caps words and no emoji in subjects.
- Three alternatives per template for A/B testing; option 1 is the primary and the
  one baked into the HTML <title>.

---

## L1. Password never set

| | |
|---|---|
| **Class** | Lifecycle — transactional, no unsubscribe link |
| **Trigger** | Registered on the portal but never set a password |
| **Replaces** | `MFR case1-password` |
| **Tone** | `blue` |
| **Template** | `liquid/case1-password.liquid` |
| **Plain text** | `text/case1-password.txt` |
| **Size** | 41.7 KB |

**Subject lines**

1. `{{ member.first_name | default: "Hi" }}, your Turn2Opinion account can’t be used yet`  ← primary
2. `One password stands between you and your first paid survey`
3. `Step 2 of 4: set your Turn2Opinion password`

**Preheader**

`Without a password we can’t send you a single survey. Setting one takes about 40 seconds.`

**Call to action**

- Primary: **Set my password** → `links.set_password`

**Why this was sent** (shown in the footer)

> You are receiving this because you registered for a Turn2Opinion account and the set-up is unfinished.

---

## L2. Terms not accepted

| | |
|---|---|
| **Class** | Lifecycle — transactional, no unsubscribe link |
| **Trigger** | Password created, research terms not accepted / no return login |
| **Replaces** | `MFR case2-terms` |
| **Tone** | `blue` |
| **Template** | `liquid/case2-terms.liquid` |
| **Plain text** | `text/case2-terms.txt` |
| **Size** | 36.9 KB |

**Subject lines**

1. `{{ member.first_name | default: "Hi" }}, one item is still open on your Turn2Opinion account`  ← primary
2. `Two of four done — the next step is one tap`
3. `Your Turn2Opinion account is built but not active yet`

**Preheader**

`Without your consent to the research terms we can’t match you to any study. It’s one tap.`

**Call to action**

- Primary: **Accept and activate** → `links.accept_terms`

**Why this was sent** (shown in the footer)

> You are receiving this because your Turn2Opinion account set-up is unfinished.

---

## L3. No profiles completed

| | |
|---|---|
| **Class** | Lifecycle — marketing, unsubscribe required |
| **Trigger** | Registered and terms accepted, but no profile completed |
| **Replaces** | `MFR case3-noprofiles` |
| **Tone** | `coral` |
| **Template** | `liquid/case3-noprofiles.liquid` |
| **Plain text** | `text/case3-noprofiles.txt` |
| **Size** | 46.9 KB |

**Subject lines**

1. `{{ member.first_name | default: "Hi" }}, your account is active — but matching can’t see you yet`  ← primary
2. `Your Opinion Kingdom is still a campsite`
3. `Your first 50 points are about two minutes away`

**Preheader**

`Surveys are matched on your profile. Your Basic profile takes about two minutes and earns 50 points.`

**Call to action**

- Primary: **Start my Basic profile** → `links.profiles`

**Why this was sent** (shown in the footer)

> You are receiving this because you are a Turn2Opinion member with no completed profiles.

---

## L4. Partial profiles

| | |
|---|---|
| **Class** | Lifecycle — marketing, unsubscribe required |
| **Trigger** | About-you profiles complete, surveys outstanding |
| **Replaces** | `MFR case4-partial` |
| **Tone** | `mint` |
| **Template** | `liquid/case4-partial.liquid` |
| **Plain text** | `text/case4-partial.txt` |
| **Size** | 45.4 KB |

**Subject lines**

1. `{{ member.first_name | default: "Hi" }}, {{ profile.completed_count | times: 50 }} points banked — your next survey is open`  ← primary
2. `Your kingdom is growing. The next building is one survey away`
3. `{{ profile.total_count | default: 37 | minus: profile.completed_count }} buildings still waiting in your Opinion Kingdom`

**Preheader**

`Your About-you profiles are done. Surveys now open one at a time — the next is ready for you.`

**Call to action**

- Primary: **Continue my next survey** → `links.profiles`
- Secondary: See my kingdom → `links.account`

**Why this was sent** (shown in the footer)

> You are receiving this because you have unfinished Turn2Opinion profiles and surveys.

---

## 01. Verify email & set password

| | |
|---|---|
| **Class** | Auth — transactional, no unsubscribe link |
| **Trigger** | New respondent registered; email not yet verified |
| **Replaces** | `respondent.liquid` |
| **Tone** | `blue` |
| **Template** | `liquid/respondent.liquid` |
| **Plain text** | `text/respondent.txt` |
| **Size** | 34.0 KB |

**Subject lines**

1. `Verify your email to activate your Turn2Opinion account`  ← primary
2. `{{ user.name.first }}, one tap to activate your account`
3. `Confirm your email and set your Turn2Opinion password`

**Preheader**

`Confirm your address and choose a password in one step. The link is valid for 24 hours.`

**Call to action**

- Primary: **Verify my email** → `set-password?user=…&code=…`

**Why this was sent** (shown in the footer)

> You are receiving this because this address was used to register for a Turn2Opinion account.

---

## 02. Account active

| | |
|---|---|
| **Class** | Auth — transactional, no unsubscribe link |
| **Trigger** | Password created; account now active |
| **Replaces** | `welcome.liquid` |
| **Tone** | `mint` |
| **Template** | `liquid/welcome.liquid` |
| **Plain text** | `text/welcome.txt` |
| **Size** | 31.6 KB |

**Subject lines**

1. `Your Turn2Opinion account is active`  ← primary
2. `{{ user.name.first }}, you’re in — your first profile is waiting`
3. `Welcome to Turn2Opinion: here’s your first step`

**Preheader**

`Your password is set. Start with your Basic profile — about 2 minutes and your first 50 points.`

**Call to action**

- Primary: **Log in to my dashboard** → `?login`

**Why this was sent** (shown in the footer)

> You are receiving this because your Turn2Opinion account was just activated.

---

## 03. Forgot password

| | |
|---|---|
| **Class** | Auth — transactional, no unsubscribe link |
| **Trigger** | Password reset requested from the login page |
| **Replaces** | `forgot-password.liquid` |
| **Tone** | `night` |
| **Template** | `liquid/forgot-password.liquid` |
| **Plain text** | `text/forgot-password.txt` |
| **Size** | 23.5 KB |

**Subject lines**

1. `Reset your Turn2Opinion password`  ← primary
2. `{{ user.name.first }}, here’s your password reset link`
3. `Your Turn2Opinion password reset`

**Preheader**

`Use the link inside to choose a new password. It works once, for 24 hours.`

**Call to action**

- Primary: **Reset my password** → `forgot-password?user=…&code=…`

**Why this was sent** (shown in the footer)

> You are receiving this because a password reset was requested for your account.

---

## 04. Reset password

| | |
|---|---|
| **Class** | Auth — transactional, no unsubscribe link |
| **Trigger** | Password reset requested (record-led variant of 03) |
| **Replaces** | `reset-password.liquid` |
| **Tone** | `night` |
| **Template** | `liquid/reset-password.liquid` |
| **Plain text** | `text/reset-password.txt` |
| **Size** | 26.3 KB |

**Subject lines**

1. `Create a new Turn2Opinion password`  ← primary
2. `{{ user.name.first }}, create your new password`
3. `Your password reset link is inside`

**Preheader**

`A single-use link to choose a new password, valid for 24 hours.`

**Call to action**

- Primary: **Create a new password** → `forgot-password?user=…&code=…`

**Why this was sent** (shown in the footer)

> You are receiving this because a password reset was requested for your account.

---

## 05. Email change — confirm

| | |
|---|---|
| **Class** | Auth — transactional, no unsubscribe link |
| **Trigger** | Email change requested; confirmation sent to the current address |
| **Replaces** | `change-email.liquid` |
| **Tone** | `night` |
| **Template** | `liquid/change-email.liquid` |
| **Plain text** | `text/change-email.txt` |
| **Size** | 27.1 KB |

**Subject lines**

1. `Confirm the email change on your Turn2Opinion account`  ← primary
2. `{{ user.name.first }}, was this you? Confirm your email change`
3. `Action needed: confirm your new email address`

**Preheader**

`Someone asked to move your account to a new address. Confirm only if it was you.`

**Call to action**

- Primary: **Yes, confirm this change** → `auth/change-email?confcode=…`

**Why this was sent** (shown in the footer)

> You are receiving this because a change of email address was requested on your account.

---

## 06. Email change — verify new address

| | |
|---|---|
| **Class** | Auth — transactional, no unsubscribe link |
| **Trigger** | Email change approved; verification sent to the new address |
| **Replaces** | `change-email-verify.liquid` |
| **Tone** | `blue` |
| **Template** | `liquid/change-email-verify.liquid` |
| **Plain text** | `text/change-email-verify.txt` |
| **Size** | 26.5 KB |

**Subject lines**

1. `Verify your new Turn2Opinion email address`  ← primary
2. `{{ user.name.first }}, one last step to switch your email`
3. `Confirm this is your new address`

**Preheader**

`The last step of your email change. Until you verify, the account keeps the old address.`

**Call to action**

- Primary: **Verify this address** → `auth/change-email?updatecode=…`

**Why this was sent** (shown in the footer)

> You are receiving this because this address was given as the new address for a Turn2Opinion account.

---

## 07. Parental consent required

| | |
|---|---|
| **Class** | Teen consent — transactional, no unsubscribe link |
| **Trigger** | Registrant indicated they are under 18 and gave a guardian email |
| **Replaces** | `parent-consent.liquid` |
| **Tone** | `violet` |
| **Template** | `liquid/parent-consent.liquid` |
| **Plain text** | `text/parent-consent.txt` |
| **Size** | 30.4 KB |

**Subject lines**

1. `Your consent is needed for {{ user.name.first }}’s Turn2Opinion account`  ← primary
2. `Parent or guardian approval required — Turn2Opinion`
3. `Please review your child’s Turn2Opinion registration`

**Preheader**

`The account stays inactive until a parent or guardian approves it. Declining is a perfectly ordinary answer.`

**Call to action**

- Primary: **Review and approve** → `auth/parent-consent?user=…&code=…`

**Why this was sent** (shown in the footer)

> You are receiving this because your email address was given as the parent or guardian contact during a registration.

---

## 08. Parental consent (compact)

| | |
|---|---|
| **Class** | Teen consent — transactional, no unsubscribe link |
| **Trigger** | Under-18 registration — shorter consent request |
| **Replaces** | `minor.liquid` |
| **Tone** | `violet` |
| **Template** | `liquid/minor.liquid` |
| **Plain text** | `text/minor.txt` |
| **Size** | 24.6 KB |

**Subject lines**

1. `Your consent is required — Turn2Opinion`  ← primary
2. `Approve {{ user.name.first }}’s Turn2Opinion account`
3. `A quick approval for your child’s registration`

**Preheader**

`Your child registered and gave your email. The account stays inactive until you approve.`

**Call to action**

- Primary: **Review and approve** → `auth/parent-consent?user=…&code=…`

**Why this was sent** (shown in the footer)

> You are receiving this because your email address was given as the parent or guardian contact during a registration.

---

## 09. Consent confirmed — guardian

| | |
|---|---|
| **Class** | Teen consent — transactional, no unsubscribe link |
| **Trigger** | Guardian completed the consent verification |
| **Replaces** | `minor-permitted-parent.liquid` |
| **Tone** | `mint` |
| **Template** | `liquid/minor-permitted-parent.liquid` |
| **Plain text** | `text/minor-permitted-parent.txt` |
| **Size** | 24.5 KB |

**Subject lines**

1. `Your consent has been recorded — Turn2Opinion`  ← primary
2. `Thank you — {{ user.name.first }}’s registration is approved`
3. `Consent confirmed for your child’s account`

**Preheader**

`Your approval is recorded and the account is now active. Your rights as a guardian are below.`

**Call to action**

- None — this template asks for nothing.

**Why this was sent** (shown in the footer)

> You are receiving this because you completed a parental consent verification.

---

## 10. Registration approved — member

| | |
|---|---|
| **Class** | Teen consent — transactional, no unsubscribe link |
| **Trigger** | Guardian approved; the young member can now take part |
| **Replaces** | `minor-permitted-child.liquid` |
| **Tone** | `coral` |
| **Template** | `liquid/minor-permitted-child.liquid` |
| **Plain text** | `text/minor-permitted-child.txt` |
| **Size** | 24.0 KB |

**Subject lines**

1. `You’re approved — welcome to Turn2Opinion`  ← primary
2. `{{ user.name.first }}, your account is ready`
3. `Good news: your parent said yes`

**Preheader**

`Your parent or guardian confirmed their consent. Log in and start your Basic profile.`

**Call to action**

- Primary: **Go to my account** → `?login`

**Why this was sent** (shown in the footer)

> You are receiving this because your parent or guardian approved your Turn2Opinion registration.

---

## 11. Referral invitation

| | |
|---|---|
| **Class** | Engagement — marketing, unsubscribe required |
| **Trigger** | An existing member invited this address |
| **Replaces** | `invite.liquid` |
| **Tone** | `coral` |
| **Template** | `liquid/invite.liquid` |
| **Plain text** | `text/invite.txt` |
| **Size** | 31.2 KB |

**Subject lines**

1. `{{ user.fullName }} invited you to Turn2Opinion`  ← primary
2. `{{ user.fullName }} thinks your opinion is worth rewarding`
3. `An invitation to get rewarded for your opinions`

**Preheader**

`Free to join, no investment. Share your opinions in paid surveys and get rewarded your way.`

**Call to action**

- Primary: **Accept the invitation** → `ref.link`

**Why this was sent** (shown in the footer)

> You are receiving this because a Turn2Opinion member sent you an invitation.

---

## 12. New survey available

| | |
|---|---|
| **Class** | Engagement — marketing, unsubscribe required |
| **Trigger** | Member matched to an open study |
| **Replaces** | `newsurvey.liquid` |
| **Tone** | `blue` |
| **Template** | `liquid/newsurvey.liquid` |
| **Plain text** | `text/newsurvey.txt` |
| **Size** | 24.7 KB |

**Subject lines**

1. `{{ survey.name }} — {{ survey.points }} points, about {{ survey.time }} min`  ← primary
2. `{{ user.name.first }}, a new survey matches your profile`
3. `New on Turn2Opinion: {{ survey.name }}`

**Preheader**

`You match the audience for a new study. The reward and length are inside — decide in a second.`

**Call to action**

- Primary: **Start the survey** → `survey.link`

**Why this was sent** (shown in the footer)

> You are receiving this because you are a Turn2Opinion member matched to this study.

---

## 13. Birthday greeting

| | |
|---|---|
| **Class** | Engagement — marketing, unsubscribe required |
| **Trigger** | Member’s birthday |
| **Replaces** | `birthday.liquid` |
| **Tone** | `coral` |
| **Template** | `liquid/birthday.liquid` |
| **Plain text** | `text/birthday.txt` |
| **Size** | 19.1 KB |

**Subject lines**

1. `Happy birthday, {{ user.name.first }}!`  ← primary
2. `A birthday wish from Turn2Opinion`
3. `{{ user.name.first }}, today is all yours`

**Preheader**

`No survey, nothing to do — just a good wish from all of us.`

**Call to action**

- None — this template asks for nothing.

**Why this was sent** (shown in the footer)

> You are receiving this because you are a Turn2Opinion member and today is the birthday on your profile.

---

## 14. Ticket received — member

| | |
|---|---|
| **Class** | Support — transactional, no unsubscribe link |
| **Trigger** | Member submitted a support ticket |
| **Replaces** | `ticket-created-user.liquid` |
| **Tone** | `blue` |
| **Template** | `liquid/ticket-created-user.liquid` |
| **Plain text** | `text/ticket-created-user.txt` |
| **Size** | 24.9 KB |

**Subject lines**

1. `We have your request — ticket {{ data.ticketNo }}`  ← primary
2. `Ticket {{ data.ticketNo }} received: {{ data.subject }}`
3. `Your Turn2Opinion support request is logged`

**Preheader**

`Your request is logged and with our team. Expect a reply within 24 to 48 hours.`

**Call to action**

- None — this template asks for nothing.

**Why this was sent** (shown in the footer)

> You are receiving this because you submitted a support request to Turn2Opinion.

---

## 15. New ticket — team

| | |
|---|---|
| **Class** | Support — transactional, no unsubscribe link |
| **Trigger** | Internal: a member opened a support ticket |
| **Replaces** | `ticket-created-team.liquid` |
| **Tone** | `night` |
| **Template** | `liquid/ticket-created-team.liquid` |
| **Plain text** | `text/ticket-created-team.txt` |
| **Size** | 15.3 KB |

**Subject lines**

1. `New ticket {{ data.ticketNo }}: {{ data.subject }}`  ← primary
2. `[T2O] New ticket {{ data.ticketNo }} from {{ user.name }}`
3. `Turn2Opinion support — new ticket {{ data.ticketNo }}`

**Preheader**

`Open, awaiting first response. Member details inside.`

**Call to action**

- None — this template asks for nothing.

**Why this was sent** (shown in the footer)

> Internal notification from the Turn2Opinion support system.

---

## 16. Ticket updated — member

| | |
|---|---|
| **Class** | Support — transactional, no unsubscribe link |
| **Trigger** | A ticket the member opened received a reply |
| **Replaces** | `ticket-updated-user.liquid` |
| **Tone** | `mint` |
| **Template** | `liquid/ticket-updated-user.liquid` |
| **Plain text** | `text/ticket-updated-user.txt` |
| **Size** | 20.3 KB |

**Subject lines**

1. `Update on your ticket {{ reply.ticketNo }}`  ← primary
2. `We’ve replied to ticket {{ reply.ticketNo }}`
3. `Turn2Opinion support: a new reply for you`

**Preheader**

`A new message has been added to your support ticket. The full reply is inside.`

**Call to action**

- None — this template asks for nothing.

**Why this was sent** (shown in the footer)

> You are receiving this because a support ticket you opened has been updated.

---

## 17. Ticket updated — team

| | |
|---|---|
| **Class** | Support — transactional, no unsubscribe link |
| **Trigger** | Internal: a ticket received a new reply |
| **Replaces** | `ticket-updated-team.liquid` |
| **Tone** | `night` |
| **Template** | `liquid/ticket-updated-team.liquid` |
| **Plain text** | `text/ticket-updated-team.txt` |
| **Size** | 15.3 KB |

**Subject lines**

1. `Ticket {{ reply.ticketNo }} updated by {{ repliedBy.fullName }}`  ← primary
2. `[T2O] Ticket {{ reply.ticketNo }} — new reply`
3. `Turn2Opinion support — ticket {{ reply.ticketNo }} awaiting review`

**Preheader**

`A new message was added. Review and respond if needed.`

**Call to action**

- None — this template asks for nothing.

**Why this was sent** (shown in the footer)

> Internal notification from the Turn2Opinion support system.

---

## 18. New registration — admin

| | |
|---|---|
| **Class** | Admin — transactional, no unsubscribe link |
| **Trigger** | Internal: a new member registered |
| **Replaces** | `newuser.liquid` |
| **Tone** | `night` |
| **Template** | `liquid/newuser.liquid` |
| **Plain text** | `text/newuser.txt` |
| **Size** | 14.1 KB |

**Subject lines**

1. `New registration on Turn2Opinion`  ← primary
2. `[T2O] New member: {{ user.name.first }} ({{ user._id }})`
3. `Turn2Opinion — new member registered`

**Preheader**

`A new member has registered successfully. Details inside.`

**Call to action**

- None — this template asks for nothing.

**Why this was sent** (shown in the footer)

> Internal notification from the Turn2Opinion registration system.

---

## Sender configuration

| | |
|---|---|
| From name | Turn2Opinion |
| From address | `no-reply@turn2opinion.com` |
| Reply-to | `support@turn2opinion.com` |
| List-Unsubscribe | Required on every marketing send; omit on transactional |
| Authentication | SPF, DKIM and DMARC on the sending domain |

Keep the From name and address identical across all 22. A consistent sender
identity does more for inbox placement than any subject-line tactic.
