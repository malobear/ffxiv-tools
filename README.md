# ffxiv-tools
Useful Tools &amp; Links for FFXIV!

Live page: https://malobear.github.io/ffxiv-tools/
Watchlist (unvetted, to explore later): https://malobear.github.io/ffxiv-tools/watchlist.html

## Two pages

- `index.html` — tools I actually use. This is the one worth sharing/linking.
- `watchlist.html` — tools I've heard about or seen recommended but haven't tried
  myself yet. A holding place, not an endorsement. Once something on the watchlist
  earns regular use, move its `<li>` block over to `index.html` (and delete it from
  the watchlist).

Both pages share the exact same structure, styling, and search/tag script — see below.

## Updating the list

Each category is a `<section>` in `<main>`, with an `<h2>` title and a `<ul>` of
`<li><a>` entries. To add a link, copy an existing `<li>` block in the right file/section
(or add a new `<section>`) following this shape:

```html
<li data-tags="tag-one, tag-two">
  <a href="https://example.com/" target="_blank" rel="noopener noreferrer">Name<span class="desc">Short description</span></a>
  <div class="tags"><button type="button">tag-one</button><button type="button">tag-two</button></div>
</li>
```

The `data-tags` attribute on the `<li>` and the `<button>` labels in `.tags` should
match (comma-separated, lowercase). New tags just work — the tag pill bar and the
search box pick them up automatically, no other file needs editing. Commit and push to
`main` and GitHub Pages redeploys within a minute or two.

The list itself is plain static HTML (not JS-generated) so it's fully visible to
search engines and link-preview bots without executing any script — search/filter and
tag pills are a JS enhancement layered on top; with JS disabled every link is still
shown, just without the filter UI.

The `application/ld+json` structured-data block (helps Google show rich results) is
generated at page load directly from the visible `<li>` content, so it's always in
sync with what's on the page — you never need to touch it by hand.

### Searching / sharing a filtered view

Typing in the search box filters by name, description, or tag, and updates the URL
(e.g. `?q=market`) so you can share a link straight to a filtered view. Clicking a tag
pill does the same for that tag.

## One-time setup (if Pages isn't enabled yet)

In the repo on GitHub: **Settings → Pages → Build and deployment → Source** = `Deploy from a branch`,
branch = `main`, folder = `/ (root)`. Save, then the live link above will start working.
