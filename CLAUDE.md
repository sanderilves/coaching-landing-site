# Ilves Coaching – landing page

One-page bilingual (ET primary / EN) landing page selling Sander's one-to-one triathlon coaching in Estonia.
Its only job: get qualified athletes to get in touch.

## Current phase
- **ET and EN are both live.** /index.html (ET, primary) and /en/index.html (EN) mirror each other exactly: same sections, order, layout and CTAs. Every change is made on both pages.
- ET/EN switch = plain links in the header. Shared main.js picks UI strings by <html lang>.
- Testimonials on EN are translations (no "translated" label); athletes approve translations.
- **SEO work in progress** (audit 2026-10-12, score 60/100). Done: HTTPS enforced, Google Search Console + Bing Webmaster Tools, sitemap submitted. Next: Sprint 1 (see sprint1-handoff.md): hero/H1, CTA above fold, mobile nav, hero image sizes, JSON-LD.

## Stack
- Plain HTML + CSS, minimal vanilla JS. No frameworks, no build tools, no npm dependencies in production.
- Mobile-first, fast, accessible (semantic HTML, alt text, visible focus states, AA contrast, tap targets ≥44px).

## Structure
```
/index.html          Estonian (primary)
/en/index.html       English
/assets/css/style.css
/assets/js/main.js   only if needed (e.g. mobile nav)
/assets/fonts/       self-hosted woff2
/assets/img/         photos (webp + width/height set), favicon, og-image
/reference/          design drafts – NOT deployed, do not link
```
Planned exception to single page: a short privacy page (/privaatsus/ + /en/privacy/), required because the contact form collects personal data.

## Brand
- Name: **Ilves Coaching** ("ilves" = lynx in Estonian). Logo: original geometric lynx head + stacked "ILVES / COACHING".
- Logo, favicon and social files in assets/img/ (from the brand kit). Black #0b0d0f / white only. Never edit the logo SVGs by hand.

## Design (source: reference/draft-v3.html)
- Black & white only. No accent colour.
- Headings: Barlow Condensed (600/800), uppercase. Body: Inter (400/500/600).
- Fonts are **self-hosted** in /assets/fonts – never load from Google Fonts (GDPR: sends visitor IP to Google).
- Sections in order: hero (full-bleed photo/video) → stat band → distance strip → who it's for → what's included → statement band → about → contact.
- Hero: H1 + primary CTA must be visible without scrolling at 375px and 1280px. Hero image: fetchpriority="high", correct `sizes`, never lazy-loaded.

## Positioning & content rules
- Coaching is **mostly remote (online)**. Say "online" in the hero subline and in meta descriptions.
- H1: ET "Triatloni treener harrastussportlastele" / EN "Triathlon coaching for age-group athletes". "Ujumine. Ratas. Jooks." / "Swim. Bike. Run." is the eyebrow line.
- **Pricing:** a single anchor line, "Alates X €/kuus · täpne pakkumine pärast tutvumisvestlust" / "From X €/month · exact offer after an intro chat". No package tables. (Decided 2026-10-26; replaces the earlier no-pricing rule.)
- ET and EN must stay in sync: same sections, same order, same CTAs. Every change is made on both pages.
- Estonian written natively, informal "sina". Flag unsure sport terms with an HTML comment `<!-- CHECK TERM: ... -->`.
- Only qualification: World Triathlon Level 1 Coach. Don't add other claims, affiliations or testimonials.
- No guaranteed results, no health/medical claims.
- Mark every missing item with `<!-- TODO: ... -->` and a visible placeholder (never ship TODO inside JSON-LD).

## SEO (every page)
- Unique `<title>` and meta description (≤160 chars), canonical URL, hreflang `et`, `en`, `x-default` (→ ET).
- Open Graph + Twitter card tags, og-image 1200×630.
- JSON-LD @graph: ProfessionalService + Person (hasCredential World Triathlon Level 1) + Offer/Service + WebSite + WebPage. Never mark up testimonials as Review/AggregateRating. No FAQPage/HowTo markup.
- Internal links to `/` and `/en/`, never `index.html`.
- Keywords: ET "triatloni treener", "triatloni treening", "individuaalne treening"; EN "triathlon coach Estonia", "online triathlon coaching".
- Domain: https://ilvescoaching.ee (EN at /en/). Registrar: Zone (Zone DNS).

## Hosting
- GitHub Pages (repo under sanderilves) with custom domain ilvescoaching.ee, HTTPS enforced (verified 2026-10-26), CNAME file in repo root.
- DNS at Zone: 4× A + 4× AAAA to GitHub Pages, CNAME www → sanderilves.github.io, TXT _github-pages-challenge-sanderilves and TXT google-site-verification (keep both permanently).
- Relative asset paths; bump ?v= cache version on CSS/JS and og-image changes.
- Live and indexable (no noindex). sitemap.xml (with lastmod) + robots.txt in root.
- Repo notes (CLAUDE.md, handoff briefs, /reference/) must not be publicly served: exclude them via _config.yml, or keep handoff briefs uncommitted.

## Contact & privacy
- Primary CTA: contact form → #kontakt ("Võta ühendust" / "Get in touch"). No Calendly for now.
- Contact form: **Web3Forms** (free, no backend, works on GitHub Pages). Fields: name, email, message + required consent checkbox + short privacy note linking to the privacy page. No health data.
- Email: sander.ilves@hotmail.com – shown in the footer as a mailto link. Not in JSON-LD.
- No cookies, no tracking. Analytics only if cookieless, and only when Sander asks.

## Open decisions (ask, don't assume)
Price X · analytics · photos · domain email (e.g. sander@ilvescoaching.ee)

## Before every commit
- Both pages updated and in sync.
- Check at 375px and 1280px widths.
- Valid HTML, no console errors, all images have alt + dimensions.
- JSON-LD passes Rich Results Test with 0 errors.
