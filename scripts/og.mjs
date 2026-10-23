// Regenerates the 1200x630 link-preview cards (og-*.png) in the repo root.
//
//   pnpm install
//   pnpm exec playwright install chromium   (first time only)
//   pnpm og                                 (all cards)
//   pnpm og tools plugins                   (only the named cards)
//
// To add or edit a card, change the CARDS list below, then reference the
// generated og-<name>.png from the page's og:image / twitter:image tags.
// Set CHROMIUM_PATH to use an existing Chromium binary instead of Playwright's.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const OUT_DIR = fileURLToPath(new URL("..", import.meta.url));
const DOMAIN = "xivkit.com";

// name -> og-<name>.png. The "XIVKit" title on the home card replaces the wordmark.
const CARDS = [
  { name: "tools", title: "XIVKit", description: "Curated FFXIV tools, calculators, and reference sites. Updated whenever something new is worth keeping.", tags: ["market", "crafting", "checklist", "glamour", "guides"] },
  { name: "plugins", title: "FFXIV Plugins", description: "Dalamud plugins I actually use, client-side tools for housing, chat, glamour, and more.", tags: ["housing", "chat", "glamour", "ui"] },
  { name: "watchlist", title: "FFXIV Watchlist", description: "Tools I've heard about or seen recommended but haven't tried myself yet.", tags: ["theorycrafting", "gear", "checklist"] },
  { name: "jump-puzzle-macros", title: "Jump Puzzle Macros", description: "Timed macro-and-hotbar technique for jumping exact, repeatable distances, with copyable macros and a calibration spot.", tags: ["guide", "macro"] },
  { name: "trade-in-mounts", title: "Trade-in mounts: grind vs. buy the mats", description: "Every trade-in mount, with live market prices and a straight verdict: grind it out, or buy your way there.", tags: ["guide", "mounts", "market"] },
  { name: "inventory-decluttering", title: "Inventory & retainer decluttering", description: "A decision tree for what to keep, bank, or discard, plus the short list of items that never come back.", tags: ["guide", "inventory"] },
  { name: "hunt-for-astronomy", title: "Hunt for Astronomy: what's worth the tomes", description: "Every reward in the trove, where else it drops, market board prices, and a straight verdict on the tomestones.", tags: ["guide", "market", "tomestones"] },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const page = ({ title, description, tags }) => `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:linear-gradient(135deg,#10131a,#0d0e12);font-family:"Liberation Sans",Arial,Helvetica,sans-serif;color:#eceef3;position:relative;overflow:hidden}
.top{position:absolute;left:80px;top:80px;display:flex;align-items:center;gap:20px}
.badge{width:72px;height:72px;border-radius:16px;background:#1b1f2a;border:3px solid #7db8ff;display:flex;align-items:center;justify-content:center;color:#7db8ff;font-weight:700;font-size:25px}
.word{font-size:34px;font-weight:700;color:#7db8ff;letter-spacing:.5px}
h1{position:absolute;left:80px;top:190px;width:1040px;font-size:72px;line-height:1.1;font-weight:700}
p{position:absolute;left:80px;width:900px;font-size:30px;line-height:1.35;color:#9aa1b2}
.tags{position:absolute;left:80px;bottom:80px;display:flex;gap:12px}
.tags span{padding:10px 21px;border-radius:999px;background:#1b1f2a;border:1px solid #2a2f3d;color:#9aa1b2;font-size:21px}
.url{position:absolute;right:80px;bottom:84px;font-size:26px;color:#7db8ff}
</style>
<div class="top"><div class="badge">XIV</div>${title === "XIVKit" ? "" : '<div class="word">XIVKit</div>'}</div>
<h1>${esc(title)}</h1><p>${esc(description)}</p>
<div class="tags">${tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
<div class="url">${DOMAIN}</div>
<script>
  var h = document.querySelector("h1"), p = document.querySelector("p");
  p.style.top = (h.offsetTop + h.offsetHeight + 22) + "px";
</script>`;

const wanted = process.argv.slice(2);
const cards = wanted.length ? CARDS.filter((c) => wanted.includes(c.name)) : CARDS;
const unknown = wanted.filter((n) => !CARDS.some((c) => c.name === n));
if (unknown.length) {
  console.error(`Unknown card(s): ${unknown.join(", ")}. Known: ${CARDS.map((c) => c.name).join(", ")}`);
  process.exit(1);
}

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const card of cards) {
  await tab.setContent(page(card));
  await tab.screenshot({ path: `${OUT_DIR}og-${card.name}.png` });
  console.log(`og-${card.name}.png`);
}
await browser.close();
