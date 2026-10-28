# Ilves Coaching – landing page

One-page bilingual (ET primary / EN) landing page selling Sander's one-to-one triathlon coaching in Estonia.
Its only job: get qualified athletes to get in touch.

## Current phase
- **ET and EN are both live.** /index.html (ET, primary) and /en/index.html (EN) mirror each other exactly: same sections, order, layout and CTAs. Every change is made on both pages.
- ET/EN switch = plain links in the header. Shared main.js picks UI strings by <html lang>.
- Testimonials on EN are translations (no "translated" label); athletes approve translations.
- **SEO work in progress** (audit 2026-10-12, score 60/100). Done: HTTPS enforced, Google Search Console + Bing Webmaster Tools, sitemap submitted. **Sprint 1 done (2026-10-26):** hero/H1, CTA above fold, mobile nav, hero image sizes, JSON-LD, meta, sitemap lastmod. **Sprint 2 done (2026-10-28):** what's included (merged), "How it works", FAQ, privacy pages. Next: E-E-A-T (credential link, race results), Google Business Profile, listings.

## Stack
- Plain HTML + CSS, minimal vanilla JS. No frameworks, no build tools, no npm dependencies in production.
- Mobile-first, fast, accessible (semantic HTML, alt text, visible focus states, AA contrast, tap targets ≥44px).

## Structure
```
/index.html          Estonian (primary)
/en/index.html       English
/privaatsus/index.html   privacy (ET)
/en/privacy/index.html   privacy (EN)
/sertifikaat/index.html      World Triathlon Level 1 certificate (ET)
/en/certificate/index.html   certificate (EN)
/assets/css/style.css
/assets/js/main.js   only if needed (e.g. mobile nav)
/assets/fonts/       self-hosted woff2
/assets/img/         photos (webp + width/height set), favicon, og-image
/reference/          design drafts – NOT deployed, do not link
```
Exceptions to single page: the privacy page (/privaatsus/ + /en/privacy/), required because the contact form collects personal data, linked from the consent checkbox and the footer on all pages; and the certificate page (/sertifikaat/ + /en/certificate/), linked from the L1 stat in the stat band and a "(vaata sertifikaati)" / "(view certificate)" link right after "Level 1 treener" / "Level 1 Coach" in About.

## Brand
- Name: **Ilves Coaching** ("ilves" = lynx in Estonian). Logo: original geometric lynx head + stacked "ILVES / COACHING".
- Logo, favicon and social files in assets/img/ (from the brand kit). Black #0b0d0f / white only. Never edit the logo SVGs by hand.

## Design (source: reference/draft-v3.html)
- Black & white only. No accent colour.
- Headings: Barlow Condensed (600/800), uppercase. Body: Inter (400/500/600).
- Fonts are **self-hosted** in /assets/fonts – never load from Google Fonts (GDPR: sends visitor IP to Google).
- Sections in order: hero (full-bleed photo/video) → stat band → who it's for → what's included → how it works → statement band → about → testimonials → FAQ (<details>, no JS) → contact.
- Hero: H1 + primary CTA must be visible without scrolling at 375px and 1280px. Hero image: fetchpriority="high", correct `sizes`, never lazy-loaded.

## Positioning & content rules
- Coaching is mostly remote, but the word 'online' must not appear anywhere (visible text, meta, OG/Twitter, JSON-LD). Say it as ET 'asukohast sõltumata' / EN 'wherever you are'.
- Language line under the price (no full stop): ET "Juhendamine asukohast sõltumata, eesti ja inglise keeles" (menu item stays "Treening") / EN "Coaching wherever you are, in Estonian and English".
- H1: ET "Triatloni treener harrastussportlastele" / EN "Triathlon coaching for age-group athletes". "Ujumine. Ratas. Jooks." / "Swim. Bike. Run." is the eyebrow line.
- **Pricing:** a single anchor line, "Alates 100 €/kuu (täpne pakkumine personaalselt)" / "From €100/month (exact offer tailored to you)". No package tables. (Decided 2026-10-26; replaces the earlier no-pricing rule.)
- ET and EN must stay in sync: same sections, same order, same CTAs. Every change is made on both pages.
- Estonian written natively, informal "sina". Flag unsure sport terms with an HTML comment `<!-- CHECK TERM: ... -->`.
- Only qualification: World Triathlon Level 1 Coach. Don't add other claims, affiliations or testimonials.
- Credential verification URL: https://education.triathlon.org/admin/tool/certificate/index.php?code=8047798207SI (World Triathlon Coaches Level 1 Course, Pajulahti 2–4 Oct 2026, reg. no 102396, valid 4 years until Oct 2030). Also in JSON-LD Person.hasCredential.url.
- No guaranteed results, no health/medical claims.
- Mark every missing item with `<!-- TODO: ... -->` and a visible placeholder (never ship TODO inside JSON-LD).

## SEO (every page)
- Unique `<title>` and meta description (≤160 chars), canonical URL, hreflang `et`, `en`, `x-default` (→ ET).
- Open Graph + Twitter card tags, og-image 1200×630.
- JSON-LD @graph: Organization (not ProfessionalService – that is a LocalBusiness and requires a street address) + Person (hasCredential World Triathlon Level 1) + Offer/Service + WebSite + WebPage. Never mark up testimonials as Review/AggregateRating. No FAQPage/HowTo markup.
- Internal links to `/` and `/en/`, never `index.html`.
- Keywords: ET "triatloni treener", "triatloni treening", "individuaalne treening"; EN "triathlon coach Estonia", "triathlon coaching Estonia".
- Domain: https://ilvescoaching.ee (EN at /en/). Registrar: Zone (Zone DNS).

## Hosting
- GitHub Pages (repo under sanderilves) with custom domain ilvescoaching.ee, HTTPS enforced (verified 2026-10-26), CNAME file in repo root.
- DNS at Zone: 4× A + 4× AAAA to GitHub Pages, CNAME www → sanderilves.github.io, TXT _github-pages-challenge-sanderilves and TXT google-site-verification (keep both permanently).
- Relative asset paths; bump ?v= cache version on CSS/JS and og-image changes.
- Live and indexable (no noindex). sitemap.xml (with lastmod) + robots.txt in root.
- Repo notes (CLAUDE.md, handoff briefs, /reference/) are kept off the live site by the deploy workflow allowlist (.github/workflows/pages.yml copies only the listed site files into _site and adds .nojekyll), not by _config.yml – Jekyll never runs. Any new public file or folder (e.g. the privacy page) must be added to the workflow's copy list. The repo itself is public, so notes are still readable on GitHub.

## Contact & privacy
- Legal identity: Sander Ilves, private person (not registered as FIE). No registry code anywhere. He is the data controller on the privacy page.
- Primary CTA: contact form → #kontakt ("Võta ühendust" / "Get in touch"). No Calendly for now.
- Contact form: **Web3Forms** (free, no backend, works on GitHub Pages). Fields: name, email, message + required consent checkbox + short privacy note linking to the privacy page. No health data.
- Email: sander.ilves@hotmail.com – shown in the footer as a mailto link. Not in JSON-LD.
- No cookies, no tracking. Analytics only if cookieless, and only when Sander asks.

## Open decisions (ask, don't assume)
Analytics · photos · domain email (e.g. sander@ilvescoaching.ee)

## Before every commit
- Both pages updated and in sync.
- Check at 375px and 1280px widths.
- Valid HTML, no console errors, all images have alt + dimensions.
- JSON-LD passes Rich Results Test with 0 errors.
