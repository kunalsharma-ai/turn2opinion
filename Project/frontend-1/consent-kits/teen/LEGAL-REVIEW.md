# Before go-live: items for legal and compliance review

The agreement text came with placeholders. The page fills them with Turn2Opinion details so it works,
and **every one of them must be confirmed or replaced** in `src/config.js`, or overridden through `window.T2O_MINOR`.

> **Assumed values:** the Turn2Opinion website, support / privacy e-mail (`support@turn2opinion.com`), privacy URL
> (`https://www.turn2opinion.com/privacy`) and postal address were **not supplied** — they follow the pattern of the
> MyFrequentRewards page (same operator, same address) and must be replaced if Turn2Opinion uses different ones.

| Placeholder in the agreement | Value used now | Config key |
|---|---|---|
| Company | Frequent Research Fieldwork Solutions Pvt. Ltd. (d/b/a Turn2Opinion) | `operator` |
| Website | https://www.turn2opinion.com | `website` |
| Postal address | Mangolpur Kalan, New Delhi 110085, India | `address` |
| Privacy contact | support@turn2opinion.com | `privacyEmail` |
| Document version | MINOR-2026.10 | `termsVersion` |
| Privacy notice version | 2026.10 | `privacyNoticeVersion` |
| Assent text version | ASSENT-2026.10 | `assentVersion` |
| Effective date | 2026-10-21 | `effectiveDate` |
| Privacy notice link | https://www.turn2opinion.com/privacy | `privacyPolicyUrl` |

## Decisions the page makes that need a yes from counsel

### New in v2.0.0 — the short flow
1. **Consent is given by tapping, with no typed signature.** Each permission is a separate control that starts
   untapped and records its own timestamp; the record keeps the terms version, the assent version and the time of
   every tap. Confirm that this counts as valid consent (and, where a signature is expected, that the verification
   step below carries that weight).
2. **The parent's or guardian's details are not re-entered.** They come from the registration record, the page shows
   only a masked contact, and the server uses its own copy. Confirm that permission captured this way is tied to the
   right adult, and that nothing further must be shown to them before they tap.
3. **One tap accepts all of Part A.** The six topics summarise the 19 sections in plain words, and the full binding
   text is one tap away in the reader and in the PDF. Confirm this presentation meets your "clear and prominent"
   expectations; the record stores which topics were opened.
4. **The parent and the teen use the same device and page.** As before, the separation comes from the verification
   message sent to the guardian's own contact. Confirm this is acceptable where you operate.
5. **The PDF is the English version**, including the record. Confirm that providing the binding English copy (with the
   interface in the member's language) is sufficient, or whether a translated copy must be offered.

### Carried over from v1.0.0
6. **Age range 13–17** (`minAge`, `maxAge`). Some countries set a higher digital-consent age (up to 16 in parts of the
   EU) or need extra steps. Section 19 says local law comes first, and the backend must apply it per country.
7. **Guardian verification by email link or SMS code.** Confirm this counts as "verifiable parental consent" where you
   operate. Some places require stronger methods, such as payment-card checks or ID.
8. **Contact & verification is marked "required where applicable".** The page treats it as required everywhere so the
   guardian can be verified.
9. **Recording and sensitive-research permissions record interest only.** Each study asks again (the study card).
   Confirm this reading.
10. **A teen's "no" stores no guardian data.** Only the decline, its time and the versions are kept.
11. **Rewards may be paid to the parent or guardian** (section 14). Confirm against the reward operations.
12. **Translations**: the English text is binding (a notice says so in every language). The 50 translated interfaces,
    including the new tap-to-agree wording, have not been reviewed by native speakers or lawyers.
13. **Retention**: consent records are kept as evidence. Set retention periods per country in the backend.
