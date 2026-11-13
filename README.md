# DumpsterWare.com

The official DumpsterWare site — one company, three divisions.

## Structure

| Path | Site |
| --- | --- |
| `/` | Redirects to `/home/` |
| `/home/` | **Company** — who we are, how we work, contact |
| `/games/` | **Games** — story-driven games from the world we grew up in |
| `/software/` | **Software** — EMT Bender Buddy, Are We There Yet, and future tools |
| `/programs/emt-bender/` | The playable EMT Bender Buddy PWA (self-contained) |

Shared files:

| Path | Purpose |
| --- | --- |
| `assets/css/site.css` | Design system, typography, shared components |
| `assets/css/pages.css` | Division switcher, page heroes, app and game cards, footer |
| `assets/js/site.js` | Sticky header, scroll reveal, current year |
| `assets/img/` | Brand art, WebP screenshots, brick texture, division icons |
| `404.html` | Styled not-found page |
| `legacy/` | The original 2021 Jekyll site, preserved for reference |

Every page shares the same header switcher, so moving between Company, Games,
and Software is always one click.

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
JavaScript fallback. `_redirects` adds a server-level rule for Netlify and
Cloudflare Pages:

```
/    /home/    301
```

GitHub Pages ignores `_redirects` and uses the meta refresh instead.

## Hosting

The root of `main` is deploy-ready for static hosting. `.nojekyll` disables
Jekyll processing so files are served exactly as committed.

The `CNAME` file was removed because `dumpsterware.com` did not resolve. Re-add
it at the repo root once the custom domain is configured.

## Quality notes

- Semantic landmarks, one `<h1>` per page, labelled navigation regions and a skip link to a focusable `<main>`.
- Layout verified from 320px to 1440px with no horizontal overflow.
- Colour pairs meet WCAG AA; includes `forced-colors` and `prefers-contrast` handling.
- `prefers-reduced-motion` disables reveals and transitions.
- Images use WebP with JPEG/PNG fallbacks, responsive `srcset` on the hero art, and `loading="lazy"` below the fold.
- Uses modern CSS: `text-wrap: balance`/`pretty`, `font-size-adjust`, `color-scheme`, `scrollbar-color`, `clamp()` typography.
- Type is Fraunces (display) and Inter (body), both with `font-display: swap`.

## Divisions

### Company

The parent site. The garage, the standards, and the contact details.

### Games

Story-driven games drawn from the faith, family, and folklore we grew up in.
The first project, working title **Project: Belonging**, is in development.

### Software

- **EMT Bender Buddy** — a conduit-bending calculator for electricians. The web
  build lives in `programs/emt-bender/`; the native Godot build is developed at
  [`emt-bender-buddy-godot`](https://github.com/EsotericRyoushi/emt-bender-buddy-godot).
- **Are We There Yet** — a family road-trip app, in development.

---

© DumpsterWare
