# SEO audit: what the code fixes and what you still need to do

Based on the SEOptimer audit of turn2opinion.com (18 Nov 2026, overall B-).

## Fixed in code (this PR)

| Audit item | Fix |
| --- | --- |
| Title tag too short (44) | Home title is now 53 characters; every indexable page and blog post is 50–60. |
| Meta description too long (176) | Home is 156; every indexable page and blog post is 120–160. |
| Keyword consistency | Title, description and H2s now use "paid online surveys", "paid surveys for cash", "earn money online without investment". The ~200 job titles ("… Manager") that dominated the page text now render only when "See every profile type" is opened. |
| Amount of content | New "Earn money online without investment" section on the home page (four short articles). |
| Image alt attributes (67 missing) | Every flag now has alt text ("Flag of India"); profile and sign-up illustrations too. 0 images without alt on the home page. |
| Hreflang | Self-referencing `hreflang="en"` and `x-default` on every page. |
| Friendly links | Hero button goes to `/join/` or `/join/professional/` instead of `/join?category=…`; footer WhatsApp link has no query string. |
| Local Business schema | `ProfessionalService` (a LocalBusiness type) JSON-LD on the home page. |
| Open Graph image | Pointed at `/og-image.png` (1200×630). The old path did not exist, so share previews had no picture. |
| Facebook Pixel | Pixel 1009909728169388 on every page, in consent mode: it records nothing until the visitor accepts marketing cookies, then counts every page view, including in-app navigations. Override with `VITE_META_PIXEL_ID` (`none` turns it off). |
| X profile | @TurnToOpinion linked: `twitter:site`/`twitter:creator` on every page, Organization `sameAs`, header/footer icons and a QR card in Scan & Connect. |
| GEO / llms.txt | `llms.txt` is now generated from the route table and describes the whole site (the old one described only the profile builder). |
| Render-blocking / font preload | Fonts preload the `.woff2` files the CSS actually uses (the `.woff` preload made browsers download each font twice). |
| Production build was broken | `npm run build` crashed while prerendering `/login/` (`window` used on the server), and the build shipped no CSS at all. Both fixed: the five CSS bundles are now built and linked into every prerendered page, with the late bundle non-blocking. |
| Multiple redirects, browser caching | `deploy/nginx.conf`: one 301 from any http/bare-domain URL to `https://www.turn2opinion.com`, 1-year caching for hashed assets, gzip. Needs to be applied on the server (see below). |

## Steps only you can take

1. **Deploy the prerendered build.** Run `npm run build` in `Project/frontend-1` and serve `dist/client` (not the Vite dev server). With Docker, the image uses `Project/frontend-1/nginx.conf` and the Dockerfile must copy `dist/client`: `COPY --from=builder /frfs/dist/client/ /usr/share/nginx/html/`. The audit's "Rendering 9785%" means the live HTML is almost empty and JavaScript builds the page, which is what you get from a dev server or a client-only build.
2. **Apply `deploy/nginx.conf`** (or copy its redirect and cache blocks into your OpenResty gateway). This fixes "Avoid multiple page redirects" (1.65 s on mobile) and "Browser caching".
3. **Add a DMARC record** in GoDaddy DNS (ns13/ns14.domaincontrol.com): TXT host `_dmarc`, value `v=DMARC1; p=none; rua=mailto:support@turn2opinion.com; fo=1`. After a few weeks of clean reports, move to `p=quarantine`.
4. ~~Create an X (Twitter) account~~ Done: @TurnToOpinion is linked in this PR.
5. ~~Facebook Pixel~~ Done: pixel 1009909728169388 is installed in this PR.
6. **Google Business Profile:** claim/verify the New Delhi office, then copy its opening hours and map pin into `openingHours` / `geo` in `src/config/site.js` so the schema matches.
7. **Backlinks (Links grade F):** most current backlinks are from low-quality auto-generated "SEO report" sites. Earn real ones: list on survey-site review/comparison sites (SurveyPolice etc.), get Frequent Research, MyFrequentRewards and MyHealthOpinions to link to turn2opinion.com, submit guest posts on personal-finance/side-income blogs, PR for survey findings, and disavow the spam domains in Google Search Console if they grow.
8. **YouTube:** post the how-to and payout videos regularly and link the channel from newsletters/emails to grow subscribers (currently 5).
9. **Search Console:** submit `https://www.turn2opinion.com/sitemap.xml` after deploying and set `VITE_GSC_VERIFICATION` if not already verified.
10. **Re-run SEOptimer** after deploy.

## Not fully fixable without a redesign

- **Inline styles (Low priority):** ~700 `style` attributes are React CSS custom properties (`--k`, `--i`, `--c`) that drive the animations. Removing them means rewriting most animated sections; it does not affect ranking.
- **Rendered content (GEO):** React still hydrates the page, so some rendering will always be reported, but with the prerendered build the HTML already contains all the text.
