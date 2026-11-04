# Lovely Bricks

A standalone, responsive LEGO fan portfolio at https://mondheera.website/lovely_bricks/.

## Publishing

GitHub Pages publishes the repository's `main` branch from `/`. This folder is served directly at `/lovely_bricks/`; no build step, package installation, JavaScript, or settings changes are required. The root homepage, CNAME, and existing shared assets remain unchanged.

## Editing

- `index.html`: page copy, navigation, Instagram links, and portfolio sections.
- `style.css`: responsive layout, colors, and typography, scoped to this page by its separate stylesheet.
- `assets/*.svg`: original brick illustrations and favicon. No external image or font services are used.
- The builder portrait reuses `../images/illustrations/sigfig.png` from the existing website.

The collection uses real Instagram thumbnails with links to the original posts. Use relative image paths so they work at the subdirectory URL.

Preview from the repository root with `python3 -m http.server 8000`, then open http://localhost:8000/lovely_bricks/.

## Public Instagram snapshot and research (4 November 2026)

The collection now uses six real public Instagram grid thumbnails, exported from the rendered profile with a source link for every post. `data/instagram.json` records dates, links, local image names, and editorial image descriptions. It is a manually curated snapshot, not a live feed. Instagram requested login to read full captions and carousel contents, so the site does not claim to reproduce those captions. Do not use temporary Instagram CDN URLs in the page; the authorized thumbnails are stored locally under `assets/instagram-*.jpg`.

Research references:
- https://mondheera.website/#pub — BricksTory (EC 2024) and Thinking by Hand (EC 2025).
- https://ec2025.entcomp.org/international-session/ — official abstract for the extended BricksTory, by Mondheera Pituxcoosuvarn and Yohei Murakami.
- https://mondheera.website/#other — LEGO MASTERS JAPAN 2023 and Japan Brickfest background. The current professional title follows the personal website rather than the older Instagram bio.

To add or change a selected post, update both the static card in `index.html` and its record in `data/instagram.json`. The original SVG artwork remains available in `assets/`; the homepage now features photography.
