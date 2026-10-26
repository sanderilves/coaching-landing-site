# Ilves Coaching: SEO Sprint 1 handoff for Claude Code

Source: SEO audit of 2026-10-12. Already done: HTTPS enforced, Google Search Console and Bing Webmaster Tools set up, sitemap submitted.
Apply every change to **both** `/index.html` (ET) and `/en/index.html` (EN). Keep the two pages in sync.

## Decisions (2026-10-26)
- **Pricing:** show one anchor line, "from X €/month". This replaces the old "no pricing" rule. X is still unknown, so use the TODO placeholder until Sander gives the number.
- **Delivery:** coaching is mostly remote, so "online" appears in the hero subline and in the meta description.
- **H1:** keyword-led version (below).
- **Primary CTA:** stays as the contact form (#kontakt). There is no Calendly link.

---

## 1. Hero copy

### ET
```html
<p class="eyebrow">Ujumine. Ratas. Jooks.</p>
<h1>Triatloni treener harrastussportlastele</h1>
<p class="hero-sub">Isiklik online-treeningplaan, mis arvestab sinu töö, pere ja vaba ajaga. Esimesest sprindist täispika distantsini.</p>
<!-- CHECK TERM: "online-treeningplaan", "täispikk distants" -->
<a class="btn" href="#kontakt">Võta ühendust</a>
<p class="hero-price">Alates <!-- TODO: hind -->X €/kuus · täpne pakkumine pärast tutvumisvestlust</p>
<p class="hero-lang">Treenin eesti ja inglise keeles.</p>
```

### EN
```html
<p class="eyebrow">Swim. Bike. Run.</p>
<h1>Triathlon coaching for age-group athletes</h1>
<p class="hero-sub">A personal online training plan built around your work, family and free time. From your first sprint to full distance.</p>
<a class="btn" href="#kontakt">Get in touch</a>
<p class="hero-price">From <!-- TODO: price -->X €/month · exact offer after an intro chat</p>
<p class="hero-lang">Coaching in English and Estonian.</p>
```

Layout requirements:
- The H1 and CTA must be visible without scrolling at both 375px and 1280px widths.
- On mobile, shrink or crop the hero photo so the H1 sits above the fold. It is currently at about y=610.

## 2. Meta tags

| | ET | EN |
|---|---|---|
| `<title>` | Triatloni treener harrastussportlastele \| Ilves Coaching | Triathlon Coach for Age-Group Athletes \| Ilves Coaching |
| description | Isiklik online triatloni treening harrastussportlastele. World Triathlon Level 1 treener. Plaan, mis sobib sinu eluga. Võta ühendust. | Online triathlon coaching for age-group athletes in Estonia. World Triathlon Level 1 coach. Coaching in English and Estonian. |

- Update `og:title`, `og:description` and the Twitter tags to match.
- Keep every description under 160 characters.

## 3. Mobile navigation
- Add a hamburger menu (minimal vanilla JS in `main.js`) so the About and Contact links stay reachable on mobile.
- Labels: ET "Treening / Minust / Kontakt", EN "Coaching / About / Contact". Keep the existing anchor ids.
- Every tap target must be at least 44×44 px.
- Accessibility:
  - The menu button needs `aria-expanded` and `aria-controls`.
  - Escape closes the menu.
  - Focus states must be visible.

## 4. Hero image performance
- Fix `sizes` so phones load the ~800w file, not the 1600w one. Start from `sizes="100vw"` and check the actual rendered width in DevTools.
- Add `fetchpriority="high"` to the hero image. Do **not** lazy-load it.
- Target: mobile LCP under 2.5 s in PageSpeed Insights.

## 5. JSON-LD
Put this in `<head>` on both pages. On EN, swap `inLanguage`, the `WebPage` `@id`/`url` and the description language.
Fill in the real asset paths. Do not mark up testimonials as Review or AggregateRating.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://ilvescoaching.ee/#business",
      "name": "Ilves Coaching",
      "url": "https://ilvescoaching.ee/",
      "logo": "https://ilvescoaching.ee/assets/img/TODO-logo.png",
      "image": "https://ilvescoaching.ee/assets/img/TODO-og-image.jpg",
      "description": "Isiklik online triatloni treening harrastussportlastele.",
      "areaServed": { "@type": "Country", "name": "Estonia" },
      "knowsLanguage": ["et", "en"],
      "founder": { "@id": "https://ilvescoaching.ee/#person" },
      "makesOffer": { "@id": "https://ilvescoaching.ee/#service" }
    },
    {
      "@type": "Person",
      "@id": "https://ilvescoaching.ee/#person",
      "name": "Sander Ilves",
      "jobTitle": "Triathlon Coach",
      "knowsLanguage": ["et", "en"],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "World Triathlon Level 1 Coach",
        "credentialCategory": "certification",
        "recognizedBy": { "@type": "Organization", "name": "World Triathlon", "url": "https://triathlon.org" }
      },
      "worksFor": { "@id": "https://ilvescoaching.ee/#business" }
    },
    {
      "@type": "Offer",
      "@id": "https://ilvescoaching.ee/#service",
      "itemOffered": {
        "@type": "Service",
        "name": "Online triathlon coaching",
        "serviceType": "Triathlon coaching",
        "provider": { "@id": "https://ilvescoaching.ee/#business" },
        "areaServed": { "@type": "Country", "name": "Estonia" }
      },
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "minPrice": "TODO",
        "priceCurrency": "EUR",
        "unitText": "MONTH"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://ilvescoaching.ee/#website",
      "url": "https://ilvescoaching.ee/",
      "name": "Ilves Coaching",
      "inLanguage": ["et", "en"],
      "publisher": { "@id": "https://ilvescoaching.ee/#business" }
    },
    {
      "@type": "WebPage",
      "@id": "https://ilvescoaching.ee/#webpage",
      "url": "https://ilvescoaching.ee/",
      "inLanguage": "et",
      "isPartOf": { "@id": "https://ilvescoaching.ee/#website" },
      "about": { "@id": "https://ilvescoaching.ee/#business" }
    }
  ]
}
</script>
```
- Leave the email address out of the schema until the domain email is decided.
- **Remove the whole `priceSpecification` block if X is still unknown at deploy time.** Never ship `"TODO"` in the live schema.

## 6. Clean-up
- Point internal links at `/` and `/en/` instead of `index.html` and `en/index.html`.
- Remove the leftover developer comment from the ET HTML.
- Add `<lastmod>` to sitemap.xml.

## Done when
- [ ] Both pages are in sync and checked at 375px and 1280px.
- [ ] Rich Results Test and validator.schema.org show 0 errors.
- [ ] PageSpeed Insights mobile LCP is under 2.5 s on `/`.
- [ ] No `TODO` text is visible on the live page (the HTML comments are fine).
- [ ] After deploy, request indexing for `/` and `/en/` in Search Console.
