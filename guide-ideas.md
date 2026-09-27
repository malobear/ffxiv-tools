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

**Research note (structural finding from later research, applies to every idea
below):** the mounts guide only produces a real "buy vs. grind" comparison when the
trade-in currency itself is a tradeable voucher/token (Bicolor Gemstone Voucher,
Turali Bicolor Gemstone Voucher, seasonal event tokens). Raw bound tribal-quest
currencies, Bozjan Mettle, Island Sanctuary's Seafarer's Cowrie, and MGP are all
confirmed never marketboardable, so any entry funded purely by one of those
collapses to "grind only," same as the Marid pilot case. Fertile ground for new
guides is specifically the rest of what the Bicolor Gemstone Voucher vendors
(Edelina in Mor Dhona, and the Dawntrail Turali equivalent) sell: mounts aren't the
only thing on that list.

---

## Trade-in minions guide

Direct sibling to the mount guide, same shape: minions unlocked by trading in
tribal-quest currency, tomestones, Bicolor Gemstone Vouchers, or seasonal tokens,
compared live against buying the mats vs. (rarely) the minion itself.

**Top candidate to build next**: reuses `trade-in-mounts.html`'s architecture
almost as-is (`costForQty`, `computeVerdict`, `computeSavings`, order-book walk), and
for the voucher-funded minions specifically, the same currency IDs the mounts page
already fetches and caches (Bicolor Gemstone Voucher 35833, Turali Bicolor Gemstone
Voucher 43961).

Notes:
- Currently-obtainable minions only, same exclusion rule as mounts.
- Data source: Console Games Wiki minion pages, cross-checked against
  `ffxivcollect.com/minions` for enumeration and acquisition-method tagging (wiki is
  still the source of truth per this project's sourcing rule; ffxivcollect is just
  for finding the full list to check against).
- Likely a bigger list than mounts, since minions are a larger collectible category
  overall, so this probably needs the same "verify one pilot end-to-end before
  scaling" approach used for the mounts guide.
- Open question: whether to share a price cache with `trade-in-mounts.html` for the
  overlapping voucher currencies (mirrors the `market-region.js` sharing decision
  already made for DC/region preference), or keep the two pages fully independent.

---

## Trade-in orchestrion rolls guide

Rolls purchased with Bicolor Gemstone Vouchers or seasonal tokens, compared against
the roll's own marketboard price where the roll itself is also tradeable. Orchestrion
rolls hit the "just buy the finished item" branch more often than mounts do, since
rolls are commonly resellable themselves.

Notes:
- Second priority after minions.
- Data source: `thonky.com`'s orchestrion roll list and `ffxivcollect.com/orchestrions`
  both tag acquisition method (gil vendor, quest, dungeon/raid drop, crafted,
  gemstone vendor, MGP), so this needs a filtering pass to isolate just the
  currency-funded subset, since a large fraction are plain gil-vendor purchases (no
  tradeoff at all) or raid/dungeon drops.
- **Risk:** no reliable, authoritative per-run drop rate exists for the raid/dungeon-
  drop rolls, so the "grind cost" side can't be computed as a number for those.
  They'd need a qualitative note instead, or exclusion from the guide entirely.

---

## Trade-in chocobo barding guide

Smaller, cleaner category: barding sold via Achievement Certificates, Tomestones of
Allegory, Skybuilders' Scrips (Ishgardian Restoration), and MGP.

Notes:
- Smallest item count of the three new ideas (dozens, not hundreds), a good size
  for a second pilot if minions turns out to be too large to tackle in one pass.
- Most of the funding currencies here are likely bound (Achievement Certificates,
  MGP). Skybuilders' Scrip marketability specifically is unconfirmed and needs
  checking before this is worth building; if it's bound too, most of this list is
  "grind only" like the Marid pilot case, which is a much weaker guide.

---

## Ideas considered and ruled out

Recorded so these don't get re-researched later:

- **Triple Triad cards**: confirmed not marketboard-tradeable at all (only
  sellable to an NPC for MGP, and MGP can't be spent on the marketboard either).
  There's no "buy" side to compare against, so no guide is possible in this shape.
- **Doman Mahjong shop**: just another MGP-reward system, not a distinct tradeable
  currency. Folds into the general MGP problem below rather than being its own
  guide.
- **Gold Saucer MGP items broadly**: MGP itself is never gil-buyable, so the "buy
  the mats" side of the comparison doesn't exist. The only occasional tradeoff is
  "grind MGP vs. buy the rare marketboard-tradeable exception" (e.g. Sabotender
  Emperador, Pod 602), which is too sparse and inconsistent across items to carry a
  whole guide. Better as a footnote callout inside the mounts/minions guides than
  its own page.
- **Housing furnishings**: a real buy-vs-grind tradeoff exists (crafted/vendor/
  gemstone-bought vs. marketboard) but the item count is enormous and heavily
  overlaps with the "framing kits" already sold by the gemstone vendor. Worth
  revisiting as a much bigger future project, not a near-term pick.
