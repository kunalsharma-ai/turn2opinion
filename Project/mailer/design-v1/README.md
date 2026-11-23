# Turn2Opinion emails, design v1

The source of every template in `Project/mailer` (except `project/newproject.liquid`, which is empty, and
`footer.liquid`, which the new templates no longer include). React components render each email twice: as a
sample HTML preview and as the Liquid template the mail service sends.

```bash
cd Project/mailer/design-v1
npm ci
npm run build            # dist/liquid, dist/html, dist/text
npm run lint             # parses and renders every Liquid template and text part
```

Then copy each `dist/liquid/<name>.liquid` over the template of the same name in `Project/mailer/` (26 files).

## What did not change

Every template keeps the merge fields, links and sending logic it had before. Links are written exactly as the
old templates wrote them (`src/lib/fields.js`, `url`). Only these additions, each with a safe fallback:

| Template | Addition | Fallback when the field is not sent |
| --- | --- | --- |
| all with a greeting | `user.name.first` | "there" |
| welcome | greeting by first name | "Hi there" |
| newsurvey | `survey.link` (the old button had an empty link) | the member's Surveys page |
| ticket-updated-user | `repliedBy.fullName` on the reply bubble | "Turn2Opinion Support" |

## Images

The emails load their images from `https://www.turn2opinion.com/mailer/v1/` (`Project/frontend-1/public/mailer/v1/`).
That path must be live before the new templates are sent. To host them elsewhere, rebuild with
`npm run build -- --assets=<https base>`.

## Designs with no email today (not wired up)

`07-parent-consent` (the long consent request; the Teen flow uses the guardian YES / NO email instead) and the four
lifecycle reminders `case1-password`, `case2-terms`, `case3-noprofiles`, `case4-partial` are built in `dist/` but no
backend code sends them yet.

## Links to check (kept as they were)

- `respondent`, `forgot-password`, `reset-password` and `welcome` build their links with `http://{{user.origin}}`.
  These carry one-time codes, so the backend origin should be served over HTTPS.
- `ticket-updated-*` print `reply.message` without escaping, as before: the backend should sanitise it.
- The old `change-email` linked to a frequentresearch.com support address; the new footer uses support@turn2opinion.com.
