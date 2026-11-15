# DumpsterWare.com

The official DumpsterWare site — one studio, three divisions.

## Structure

| Path | Site |
| --- | --- |
| `/` | Redirects to `/home/` |
| `/home/` | **Company** — the studio, house rules, contact |
| `/games/` | **Games** — life-sim sandboxes with no finish line |
| `/games/sandbox/` | **Project: Sandbox** — the working-title game, in depth |
| `/apps/` | **Apps** — family apps such as Are We There Yet |
| `/tools/` | **Tools** — field tools such as EMT Bender Buddy |
| `/devlog/` | **Devlog** — notes from the workshop |
| `/software/` | Redirects to `/home/` (old combined page) |
| `/programs/emt-bender/` | The playable EMT Bender Buddy PWA (self-contained) |

Shared files:

| Path | Purpose |
| --- | --- |
| `assets/css/site.css` | Design system, typography, shared components |
| `assets/css/pages.css` | Site switcher, page heroes, app/game cards, devlog, footer |
| `assets/js/site.js` | Sticky header, scroll reveal, current year |
| `assets/img/` | Brand art, WebP screenshots, brick texture, division icons, share card |
| `assets/img/og-default.svg` | Source art for the social share card |
| `assets/img/og-default.jpg` | Rendered 1200×630 share card used by `og:image` |
| `site.webmanifest` | Installable site metadata and home-screen icons |
| `robots.txt` | Crawl rules; points at the sitemap and hides `/legacy/` |
| `sitemap.xml` | Canonical list of indexable pages |
| `404.html` | Styled not-found page |
| `legacy/` | The original 2021 Jekyll site, preserved for reference |

Every page shares the same header switcher — Company, Games, Apps, Tools — so
moving between sites is always one click. The devlog is linked from the footer
and from the "From the workshop" section on the home page.

## Editing

Plain HTML, CSS and JavaScript — no build step, no dependencies.

Open the root `index.html` in a browser (the relative paths work from disk), or
serve the folder locally:

```powershell
# from this directory
python -m http.server 8000
# or, without Python
npx serve .
# then visit http://localhost:8000
```

A local server is recommended when testing `programs/emt-bender/` so the service
worker can register.

### Adding a devlog entry

1. Copy an existing `<article class="log-entry reveal" id="…">` block in
   `devlog/index.html` and put the newest entry first.
2. Give the article a short, stable `id` and set the
   `<time datetime="YYYY-MM-DD">` value to match the visible date.
3. Add a matching teaser to the "From the workshop" grid on `home/index.html`,
   linking to `/devlog/#your-id`.
4. If you add a whole new page (not just an entry), add its URL to
   `sitemap.xml` and refresh the `lastmod` dates for pages that changed.

### Updating the share card

`assets/img/og-default.jpg` is rendered from `assets/img/og-default.svg` at
1200×630. Edit the SVG, then rasterize it (any SVG-to-JPEG tool works; the
current file was produced with `sharp`) and keep the same filename so every
page's `og:image` keeps working.

### Metadata

Every indexable page has a canonical URL, Open Graph and Twitter card tags,
and a link to `site.webmanifest`. The canonical base is currently:

```
https://esotericryoushi.github.io/DumpsterWare.com/
```

If the site moves to a custom domain, update the canonical URLs, `og:url`,
`og:image`, `sitemap.xml`, `robots.txt` and the manifest `start_url` together.

## Routing

The root `index.html` sends visitors to `/home/` with a meta refresh plus a
JavaScript fallback. `_redirects` adds server-level rules for Netlify and
Cloudflare Pages:

```
/           /home/    301
/software/  /home/    301
```

GitHub Pages ignores `_redirects` and uses the meta refresh pages instead.

## Hosting

Live at **https://esotericryoushi.github.io/DumpsterWare.com/** on GitHub Pages
(public repo, deployed from `main` / root). `.nojekyll` disables Jekyll
processing, and pushes to `main` rebuild automatically.

Day-to-day work happens on the `Dev` branch. Merge `Dev` into `main` to publish:

```powershell
git switch Dev
git push origin Dev
# when ready to go live
git switch main
git merge Dev
git push origin main
```

Changes on `Dev` are not visible on the live site until that merge happens.

For a custom domain, add `dumpsterware.com` in the repository's Pages settings
and create the DNS records GitHub shows; GitHub provisions HTTPS. The `CNAME`
file was removed because the domain did not resolve.

## Quality notes

- Semantic landmarks, one `<h1>` per page, labelled navigation regions and a skip link to a focusable `<main>`.
- Layout verified from 320px to 1440px with no horizontal overflow.
- Colour pairs meet WCAG AA; includes `forced-colors` and `prefers-contrast` handling.
- `prefers-reduced-motion` disables reveals and transitions.
- Images use WebP with JPEG/PNG fallbacks, responsive `srcset` on the hero art, and `loading="lazy"` below the fold.
- Uses modern CSS: `text-wrap: balance`/`pretty`, `font-size-adjust`, `color-scheme`, `scrollbar-color`, `clamp()` typography.
- Type is Fraunces (display) and Inter (body), both with `font-display: swap`.
- Lighthouse (accessibility, best practices, SEO) audits at 100 on the local build.
- Social sharing uses a dedicated 1200×630 card; `sitemap.xml`, `robots.txt` and a web manifest cover discovery and install.

## Divisions

### Games

Life-sim sandboxes with no finish line — drop into a world, pick a trade, make
a living, and keep playing. The first project, working title
**Project: Sandbox**, is in development; it has its own page at
`/games/sandbox/`.

### Apps

Family apps for the road and the kitchen table.

- **Are We There Yet** — a family road-trip app, in development.

### Tools

Practical, offline-first tools for the trades.

- **EMT Bender Buddy** — a conduit-bending calculator for electricians. The web
  build lives in `programs/emt-bender/`; the native Godot build is developed in
  a separate private repository.

---

© DumpsterWare
