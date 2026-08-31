# FFXIV Tools & Links

A curated, hand-picked list of FFXIV tools I actually use: market board data, crafting trackers, glamour and mod sources, Dalamud plugins, and other reference sites. Kept small on purpose, updated whenever something new earns a spot.

Live page: https://malobear.github.io/ffxiv-tools/
Watchlist (unvetted, to explore later): https://malobear.github.io/ffxiv-tools/watchlist.html
Plugins: https://malobear.github.io/ffxiv-tools/plugins.html
Venues: https://malobear.github.io/ffxiv-tools/venues.html

FINAL FANTASY XIV is a registered trademark of Square Enix Holdings Co., Ltd. This project is an unofficial, fan-made list, not affiliated with or endorsed by Square Enix. Each page carries the same notice in its footer.

## Four pages

- `index.html`: tools I actually use. This is the one worth sharing/linking.
- `watchlist.html`: tools I've heard about or seen recommended but haven't tried
  myself yet. A holding place, not an endorsement. Once something on the watchlist
  earns regular use, move its `<li>` block over to `index.html` (and delete it from
  the watchlist).
- `plugins.html`: Dalamud plugins I actually use. Kept separate since these are
  third-party client mods, not sanctioned tools like the others, and the page carries
  a note about that. Tag any plugin that isn't in Dalamud's default plugin directory
  (i.e. needs a custom repo added under Dalamud Settings → Experimental) with
  `experimental`.
- `venues.html`: player-run venues I actually visit, with hours and an in-game
  address. See "Venue entries" below for the extra attributes this page uses.

All four pages share the exact same structure, styling, and search/tag script. See below.

## Updating the list

Each category is a `<section>` in `<main>`, with an `<h2>` title and a `<ul>` of
`<li><a>` entries. To add a link, copy an existing `<li>` block in the right file/section
(or add a new `<section>`) following this shape:

```html
<li data-tags="tag-one, tag-two">
  <a href="https://example.com/" target="_blank" rel="noopener noreferrer"><img class="favicon" alt="" loading="lazy" decoding="async"><span class="link-body">Name<span class="desc">Short description</span></span></a>
  <div class="tags"><button type="button">tag-one</button><button type="button">tag-two</button></div>
</li>
```

The `data-tags` attribute on the `<li>` and the `<button>` labels in `.tags` should
match (comma-separated, lowercase). New tags just work: the tag pill bar and the
search box pick them up automatically, no other file needs editing. The favicon
`<img>` needs no `src`: it's filled in automatically at page load from the link's
own domain (via Google's favicon service), so you never have to go hunt one down.
Commit and push to `main` and GitHub Pages redeploys within a minute or two. Worth
bumping the matching `<lastmod>` date in `sitemap.xml` when you edit a page.

The list itself is plain static HTML (not JS-generated) so it's fully visible to
search engines and link-preview bots without executing any script. Search/filter and
tag pills are a JS enhancement layered on top; with JS disabled every link is still
shown, just without the filter UI.

The `application/ld+json` structured-data block (helps Google show rich results) is
generated at page load directly from the visible `<li>` content, so it's always in
sync with what's on the page, and you never need to touch it by hand.

### Translations

The site is localized into English, Japanese, German, and French via `i18n.js` and
the `i18n/*.json` files. Item **names** stay in English/original form in every
language (they're mostly brand names); only descriptions, tags, and UI chrome are
translated. When you add a new `<li>`, also add its description under a unique slug
in `i18n/en.json`'s `items` object (e.g. `"myslug": "Short description"`), then set
`data-i18n="items.myslug"` on the `<span class="desc">` in each of the three HTML
files where it's needed. Adding the same key to `i18n/ja.json`, `de.json`, and
`fr.json` is optional: a missing key falls back to the English text automatically,
so the site never breaks, it just shows English for that one entry until translated.

### Venue entries

`venues.html` `<li>` elements carry extra attributes beyond `data-tags`:

```html
<li data-tags="tavern, lounge" data-day="mon" data-start="22:30" data-end="00:17"
    data-tz="America/New_York" data-li-command="/li Malboro Lavender Beds 23 11">
```

- `data-day`/`data-start`/`data-end`/`data-tz`: the venue's own posted open hours, as
  written (in whatever timezone the venue posts, given as an IANA zone name like
  `America/New_York`). The page's own script converts this to each visitor's local
  time and weekday client-side, so don't pre-convert it yourself. `data-end` earlier
  than `data-start` is treated as crossing midnight into the next day.
- `data-li-command`: the exact command copied by the address button, for the
  [Lifestream](https://github.com/NightmareXIV/Lifestream) plugin's `/li` travel
  command, in the form `/li <World> <District> <Ward> <Plot>` (data center and the
  `W`/`P` prefixes are omitted). Get the address from the venue's own site; don't
  guess at ward/plot numbers.

Inside `.venue-meta`, also add a plain-text `<span class="address">` with the same
address written out for humans to read (e.g. `Malboro - Lavender Beds - Ward 23 Plot
11`), so it's visible without clicking anything. Not translated across languages,
same as item names, since it's real place names/numbers.

### Searching / sharing a filtered view

Typing in the search box filters by name, description, or tag, and updates the URL
(e.g. `?q=market`) so you can share a link straight to a filtered view. Clicking a tag
pill does the same for that tag.

## One-time setup (if Pages isn't enabled yet)

In the repo on GitHub: **Settings → Pages → Build and deployment → Source** = `Deploy from a branch`,
branch = `main`, folder = `/ (root)`. Save, then the live link above will start working.
