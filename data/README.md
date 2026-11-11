# Public site content

The main site uses separate static HTML pages: `index.html`, `profile.html`, `research.html`, `publications.html`, and `projects.html`. The top navigation moves between these pages instead of combining the site into one long page.

These JSON files are the public content source for the project and publication pages.

- `projects.json` drives the five-item project spotlight. Each record has an `id`, `title`, `category`, `summary`, `tags`, and an optional `image`, `href`, or `visualLabel`.
- `publications.json` contains the publication records previously listed on the homepage. Each record has an `id`, `year`, `type`, `citation`, and searchable `tags`.

Edit the JSON, keep the same field names, and push the change to publish it. The files are public, so do not put private notes, passwords, or API keys here. The homepage only reads these records; it does not write changes back to GitHub.
