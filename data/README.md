# Homepage content data

These JSON files are the public content source for the homepage.

- `projects.json` drives the five-item project spotlight. Each record has an `id`, `title`, `category`, `summary`, `tags`, and an optional `image`, `href`, or `visualLabel`.
- `publications.json` contains the publication records previously listed in `index.html`. Each record has an `id`, `year`, `type`, `citation`, and searchable `tags`.

Edit the JSON, keep the same field names, and push the change to publish it. The files are public, so do not put private notes, passwords, or API keys here. The homepage only reads these records; it does not write changes back to GitHub.
