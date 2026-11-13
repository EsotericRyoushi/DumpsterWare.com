# DumpsterWare.com

The official DumpsterWare website — a static portfolio for the studio and its
programs.

## What's here

| Path | Purpose |
| --- | --- |
| `index.html` | The whole landing page (hero, programs, about, contact) |
| `assets/css/site.css` | Design system and layout |
| `assets/js/site.js` | Mobile nav, scroll reveal, sticky header |
| `assets/img/` | Brand art, WebP screenshots, brick texture, icons |
| `programs/emt-bender/` | The playable EMT Bender Buddy PWA (self-contained) |
| `404.html` | Styled not-found page |
| `legacy/` | The original 2021 Jekyll site, preserved for reference |

## Editing

Everything is plain HTML, CSS and JavaScript — no build step, no dependencies.

Open `index.html` in a browser, or serve the folder locally:

```powershell
# from this directory
python -m http.server 8000
# then visit http://localhost:8000
```

A local server is recommended when testing `programs/emt-bender/` so the service
worker can register.

## Hosting

The root of `main` is deploy-ready for GitHub Pages (Static HTML). `.nojekyll`
disables Jekyll processing so files are served exactly as committed.

The `CNAME` file was removed because `dumpsterware.com` did not resolve. Re-add
it at the repo root if the custom domain is configured again.

## Quality notes

- Semantic landmarks, one `<h1>`, labelled navigation regions and a skip link to a focusable `<main>`.
- Layout verified from 320px to 1440px with no horizontal overflow.
- Colour pairs meet WCAG AA; includes `forced-colors` and `prefers-contrast` handling.
- `prefers-reduced-motion` disables reveals and transitions.
- Hero image is WebP with a JPEG fallback, `fetchpriority="high"` and responsive `srcset`; below-fold screenshots are WebP with PNG fallbacks and `loading="lazy"`.
- Uses modern CSS: `text-wrap: balance`/`pretty`, `font-size-adjust`, `color-scheme`, `scrollbar-color`, `clamp()` typography.
- Type is Fraunces (display) and Inter (body), both with `font-display: swap`.

## Programs

### EMT Bender Buddy

A conduit-bending calculator for electricians. The web build lives in
`programs/emt-bender/`; the native Godot build is developed at
[`emt-bender-buddy-godot`](https://github.com/EsotericRyoushi/emt-bender-buddy-godot).

---

© DumpsterWare
