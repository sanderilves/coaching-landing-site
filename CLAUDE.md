# Coaching landing page

One-page bilingual (ET primary / EN) landing page selling Sander's one-to-one triathlon coaching in Estonia.
Its only job: get qualified athletes to get in touch.

## Current phase
- Both languages are live: ET at /index.html, EN at /en/index.html, linked by the ET / EN switch in the header.
- The pages mirror each other: same sections, order, layout, classes, images and form. Only text, lang, meta, section/heading IDs and asset paths (../ on EN) differ.
- EN testimonials are translations (approved by the athletes), shown without a "translated" label.
- Every change is made on both pages. UI strings used by main.js (form errors, success, carousel labels) live in the `STRINGS` object, keyed by language.

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
/assets/img/         photos (webp + width/height set), logo/
/assets/img/favicon/ favicon.ico, favicon.svg, apple-touch-icon.png (brand kit only)
/assets/img/social/  og-image-et.png, og-image-en.png (1200×630, brand kit). Bump their ?v= in og:image when replaced, so link previews refresh.
/favicon.ico         copy of the brand favicon at the root (some apps only request it there)
/robots.txt, /sitemap.xml, /CNAME
```

## Design
- Black & white only. No accent colour.
- Headings: Barlow Condensed (600/800), uppercase. Body: Inter (400/500/600).
- Fonts are **self-hosted** in /assets/fonts – never load from Google Fonts (GDPR: sends visitor IP to Google).
- Sections in order: hero (full-bleed photo/video) → stat band → who it's for → what's included → statement band → about → testimonials → contact.
- The draft's JS language toggle is replaced by two real pages; the ET/EN switch is a plain link between them.

## Content rules
- ET and EN must stay in sync: same sections, same order, same CTAs. Every change is made on both pages.
- Estonian written natively, informal "sina". Flag unsure sport terms with an HTML comment `<!-- CHECK TERM: ... -->`.
- No pricing anywhere. Pricing questions → "personal offer, contact me".
- Only qualification: World Triathlon Level 1 Coach. Don't add other claims or affiliations.
- Real testimonials only, with written consent; any edited version approved by the athlete.
- Adding a testimonial = copy one `<figure class="t-card">` block inside `.t-cards` (on both pages; EN text needs the athlete's approval). main.js picks the layout from the card count: 1 = centred card, 2–3 = grid on desktop, 4+ = carousel (3 visible) on desktop; 2+ = swipe carousel below 900px.
- No guaranteed results, no health/medical claims.
- Mark every missing item with `<!-- TODO: ... -->` and a visible placeholder.

## SEO (every page)
- Unique `<title>` and meta description, canonical URL, hreflang `et`, `en`, `x-default` (→ ET).
- Open Graph + Twitter card tags, og-image 1200×630.
- Keywords: ET "triatloni treener", "triatloni treening", "individuaalne treening"; EN "triathlon coach Estonia", "triathlon coaching Tallinn".
- Domain: https://ilvescoaching.ee (ET at /, EN at /en/). Canonical, hreflang, og:url and image URLs use it; keep sitemap.xml in sync when pages are added.

## Contact & privacy
- Primary CTA: the contact form. No Calendly for now.
- Contact form: Web3Forms (plain POST, enhanced with fetch in assets/js/main.js). Fields: name, email, message, required consent checkbox, privacy note. No health data. Access key is set in index.html (public by design – Web3Forms keys only allow sending to the owner's inbox).
- Email: sander.ilves@hotmail.com. Not shown in the footer; only used in main.js as the fallback link when the contact form fails to send.
- No cookies, no tracking. Analytics only if cookieless, and only when Sander asks.

## Open decisions (ask, don't assume)
Analytics · photos

## Before every commit
- Both pages updated and in sync.
- Check at 375px and 1280px widths.
- Valid HTML, no console errors, all images have alt + dimensions.

## Hosting
- GitHub Pages with the custom domain ilvescoaching.ee (CNAME file in the repo root; custom domain + "Enforce HTTPS" set in the repo's Pages settings).
- Deployed by `.github/workflows/pages.yml` on every push to `main`. Only `index.html`, `en/`, `assets/`, `robots.txt`, `sitemap.xml` and `CNAME` are published – never the `.md` files. New site files/folders must be added to the workflow's copy step.
- Keep links to pages and assets relative (no leading "/"), so local file previews keep working.
- style.css and main.js are linked with a version query (`?v=16`), the same number on both pages. Bump it on every change to either file, so browsers never run a cached old file.
- The repo is public: never commit secrets, personal data or unpublished private material.
