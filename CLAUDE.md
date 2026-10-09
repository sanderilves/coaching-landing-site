# Coaching landing page

One-page bilingual (ET primary / EN) landing page selling Sander's one-to-one triathlon coaching in Estonia.
Its only job: get qualified athletes to book a free intro call.

## Current phase
- Building the Estonian site only. EN (/en/) is paused: don't create or update it, hide the ET/EN switch, and leave out hreflang en tags until EN is built. When EN starts, mirror ET exactly.

## Stack
- Plain HTML + CSS, minimal vanilla JS. No frameworks, no build tools, no npm dependencies in production.
- Mobile-first, fast, accessible (semantic HTML, alt text, visible focus states, AA contrast).

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

## Design (source: reference/draft-v3.html)
- Black & white only. No accent colour.
- Headings: Barlow Condensed (600/800), uppercase. Body: Inter (400/500/600).
- Fonts are **self-hosted** in /assets/fonts – never load from Google Fonts (GDPR: sends visitor IP to Google).
- Sections in order: hero (full-bleed photo/video) → stat band → who it's for → what's included → statement band → about → contact.
- The draft's JS language toggle is replaced by two real pages; the ET/EN switch is a plain link between them.

## Content rules
- ET and EN must stay in sync: same sections, same order, same CTAs. Every change is made on both pages.
- Estonian written natively, informal "sina". Flag unsure sport terms with an HTML comment `<!-- CHECK TERM: ... -->`.
- No pricing anywhere. Pricing questions → "personal offer, contact me".
- Only qualification: World Triathlon Level 1 Coach. Don't add other claims, affiliations or testimonials.
- No guaranteed results, no health/medical claims.
- Mark every missing item with `<!-- TODO: ... -->` and a visible placeholder.

## SEO (every page)
- Unique `<title>` and meta description, canonical URL, hreflang `et`, `en`, `x-default` (→ ET).
- Open Graph + Twitter card tags, og-image 1200×630.
- Keywords: ET "triatloni treener", "triatloni treening", "individuaalne treening"; EN "triathlon coach Estonia", "triathlon coaching Tallinn".
- Domain not decided: use `https://DOMAIN.TODO` everywhere so it's a single find-and-replace.

## Contact & privacy
- Primary CTA: Calendly (separate coaching event) – URL is TODO. Secondary: mailto – address is TODO.
- Contact form: NOT decided. Keep a marked placeholder only. Do not build one or pick a provider.
- No cookies, no tracking. Analytics only if cookieless, and only when Sander asks.

## Open decisions (ask, don't assume)
Domain · hosting · Calendly URL · email · contact form · analytics · photos · Sander's race background copy

## Before every commit
- Both pages updated and in sync.
- Check at 375px and 1280px widths.
- Valid HTML, no console errors, all images have alt + dimensions.

## Preview hosting
- Preview runs on GitHub Pages: https://sanderilves.github.io/coaching-landing-site/ (served from a subpath).
- Deployed by `.github/workflows/pages.yml` on every push to `main`. Only `index.html`, `en/` and `assets/` are published – never `reference/` or the `.md` files. New site files/folders must be added to the workflow's copy step.
- All links to pages and assets must be relative (no leading "/"), or they break under the subpath.
- Both pages carry `<meta name="robots" content="noindex">` while in preview. Remove it only when the site goes live on its real domain.
- The repo is public: never commit secrets, personal data or unpublished private material.
