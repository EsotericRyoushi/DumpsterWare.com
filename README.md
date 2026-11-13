# DumpsterWare.com

The official DumpsterWare site — one studio, three divisions.

## Structure

| Path | Site |
| --- | --- |
| `/` | Redirects to `/home/` |
| `/home/` | **Company** — the studio, house rules, contact |
| `/games/` | **Games** - life-sim sandboxes with no finish line |
| `/apps/` | **Apps** — family apps such as Are We There Yet |
| `/tools/` | **Tools** — field tools such as EMT Bender Buddy |
| `/software/` | Redirects to `/home/` (old combined page) |
| `/programs/emt-bender/` | The playable EMT Bender Buddy PWA (self-contained) |

Shared files:

| Path | Purpose |
| --- | --- |
| `assets/css/site.css` | Design system, typography, shared components |
| `assets/css/pages.css` | Site switcher, page heroes, app and game cards, footer |
| `assets/js/site.js` | Sticky header, scroll reveal, current year |
| `assets/img/` | Brand art, WebP screenshots, brick texture, division icons |
| `404.html` | Styled not-found page |
| `legacy/` | The original 2021 Jekyll site, preserved for reference |

Every page shares the same header switcher — Company, Games, Apps, Tools — so
moving between sites is always one click.

## Editing

Plain HTML, CSS and JavaScript — no build step, no dependencies.

Open the root `index.html` in a browser (the relative paths work from disk), or
serve the folder locally:

```powershell
# from this directory
python -m http.server 8000
# then visit http://localhost:8000
```

A local server is recommended when testing `programs/emt-bender/` so the service
worker can register.

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

Day-to-day work happens on the `Dev` branch. Merge `Dev` into `main` to publish.

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

## Divisions

### Games

Life-sim sandboxes with no finish line — drop into a world, pick a trade, make
a living, and keep playing. The first project, working title
**Project: Sandbox**, is in development.

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
