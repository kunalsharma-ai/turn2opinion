# Turn2Opinion mailers — pre-send QA checklist

## Build
- [ ] `npm run build -- --assets=<real HTTPS base>` — no warnings, every template under 102 KB
- [ ] `npm run lint` — "All templates and text parts OK"
- [ ] `assets/` uploaded to that base; open one hero URL in a browser to confirm

## Content
- [ ] Sender: Turn2Opinion `<no-reply@turn2opinion.com>`, reply-to `support@turn2opinion.com`
- [ ] Portal routes confirmed for turn2opinion.com: `/set-password`, `/forgot-password`, `/auth/parent-consent`, `/auth/change-email`, `/?login`, `/member`, `/member/profiles`, `/account/terms`, `/account/preferences`
- [ ] `reply.message` sanitised in the backend (or escaped in 16/17)
- [ ] Lifecycle payload sends `profile.completed_count` and `profile.total_count` (37 for adults)
- [ ] Reward wording (+50 points, +1 quality score) matches what the server actually credits

## Clients (minimum)
- [ ] Outlook for Windows (desktop) — VML pill button shows, layout single column at 600px
- [ ] Gmail web + Gmail app (Android/iOS) — stage stacks with art on top on phones
- [ ] Apple Mail / iOS Mail — hero float plays; stops with Reduce Motion on
- [ ] Outlook.com dark mode — page stays white, stage text readable
- [ ] Images blocked — purpose, fact pills, journey, buttons and all numbers still readable

## Classification
- [ ] Transactional stream (no unsubscribe injected): L1, L2, 01–10, 14, 16
- [ ] Internal stream: 15, 17, 18
- [ ] Marketing stream with List-Unsubscribe: L3, L4, 11, 12, 13

## Accessibility
- [ ] Every hero has a descriptive alt; decorative icons have empty alt
- [ ] Buttons ≥ 48px tall; text contrast on all five stage tones ≥ 4.5:1 for body copy
- [ ] `lang="en"` and a real `<title>` on every document
