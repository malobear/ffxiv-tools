# Guide ideas

Backlog of guide/tool ideas for this repo, not part of the live site. When one is
ready to build, it'll likely become its own page (like `hunt-for-astronomy.html` or
`jump-puzzle-macros.html`) and get linked from `index.html`.

Format per idea: a short pitch, then notes on scope and data sources.

---

## Trade-in mount cost/value guide

Cover every mount obtained by trading in items (tribal quest currencies, tomestones,
Bozjan/Zadnor, Island Sanctuary, seasonal event currencies, Doman Mahjong, etc.), and
for each one:

- How to obtain it (which currency/items, where to turn them in).
- Whether the required trade-in items are marketboardable, and if so their live
  Universalis price.
- Whether the mount itself is ever resellable (most aren't; a few limited cases might
  be, worth double-checking per mount rather than assuming).

Goal: let someone compare "grind it out" vs "buy the mats off the board" vs (rare
cases) "just buy the mount," using live prices rather than a static gil estimate that
goes stale.

Notes:
- This will need live market data (Universalis API), so it's more of a small
  interactive tool than a static markdown/HTML guide, similar in spirit to a
  mini-calculator page rather than a plain link list entry.
- Data-gathering will need a mount-by-mount pass (source: item(s)/currency needed,
  vendor/turn-in NPC, item marketboardability) before any UI work starts. The wiki is
  the source of truth for this, per the existing convention of re-verifying item
  sources against the wiki rather than Teamcraft.
- **Decided:** currently-obtainable mounts only. Permanently unavailable
  seasonal/collab/promo mounts are excluded from the full data-gathering pass.
- **Decided:** where both the trade-in currency and the finished mount item are
  marketboardable, the "grind vs. buy mats vs. buy mount" verdict is computed live
  from whatever prices are currently loaded (see `computeVerdict()` in
  `trade-in-mounts.html`), not hardcoded at research time — a verdict based on a
  price snapshot would silently go wrong as prices move. Verdicts are only
  hardcoded when they're a structural fact (e.g. neither side is marketable, so
  it's grind-only regardless of price).
