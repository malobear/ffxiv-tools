# ffxiv-tools
Useful Tools &amp; Links for FFXIV!

Live page: https://malobear.github.io/ffxiv-tools/

## Updating the list

Each category is a `<section>` in `index.html`'s `<main>`, with an `<h2>` title and a
`<ul>` of `<li><a>` entries. To add a link, copy an existing `<li>` line in the right
section (or add a new `<section>`) following the same shape, then commit and push to
`main` — GitHub Pages redeploys automatically within a minute or two.

The list is plain static HTML (not JS-generated) so it's fully visible to search
engines and link-preview bots without executing any script.

## One-time setup (if Pages isn't enabled yet)

In the repo on GitHub: **Settings → Pages → Build and deployment → Source** = `Deploy from a branch`,
branch = `main`, folder = `/ (root)`. Save, then the live link above will start working.
