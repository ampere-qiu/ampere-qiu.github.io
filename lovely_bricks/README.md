# Lovely Bricks

A standalone, responsive LEGO fan portfolio at https://mondheera.website/lovely_bricks/.

## Publishing

GitHub Pages publishes the repository's `main` branch from `/`. This folder is served directly at `/lovely_bricks/`; no build step, package installation, JavaScript, or settings changes are required. The root homepage, CNAME, and existing shared assets remain unchanged.

## Editing

- `index.html`: page copy, navigation, Instagram links, and portfolio sections.
- `style.css`: responsive layout, colors, and typography, scoped to this page by its separate stylesheet.
- `assets/*.svg`: original brick illustrations and favicon. No external image or font services are used.
- The builder portrait reuses `../images/illustrations/sigfig.png` from the existing website.

The three collection cards are clearly labeled as illustrated previews, not completed builds. To add real work, place your own build photos in `assets/`, replace each card image and alt text in `index.html`, and update the card descriptions and preview notice. Use relative image paths so they work at the subdirectory URL.

Preview from the repository root with `python3 -m http.server 8000`, then open http://localhost:8000/lovely_bricks/.
