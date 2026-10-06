Paste this into Claude Code as your first message:

---

Read CLAUDE.md and reference/draft-v3.html. We're turning the draft into the real site.

First, make a short plan and wait for my OK. Then:

1. Create the folder structure from CLAUDE.md and a .gitignore (ignore .DS_Store).
2. Move the draft's CSS into /assets/css/style.css. Clean it up and remove the draft-only styles (draft banner, striped placeholders stay only where a real photo is still missing).
3. Download Barlow Condensed (600, 800) and Inter (400, 500, 600) as woff2 into /assets/fonts and use @font-face. No Google Fonts link.
4. Build /index.html (ET) and /en/index.html (EN) from the draft copy. Replace the JS toggle with a plain ET/EN link between the pages.
5. Add all SEO tags from CLAUDE.md with https://DOMAIN.TODO as the domain.
6. Add a simple placeholder favicon and og-image.
7. Keep every missing item as a visible placeholder + <!-- TODO --> comment.
8. Start a local server, check both pages at 375px and 1280px, and list every TODO left.
9. Make the first git commit.
