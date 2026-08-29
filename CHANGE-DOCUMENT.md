# Greenhse website — change document

**Prepared for:** Jatin
**From:** Lazar
**Originally dated:** 27 August 2026 · **Addendum:** 28 August 2026
**Reference against:** live greenhse.com (Magento 2)

This document lists everything this build changes relative to the current
greenhse.com site, and how each piece is wired. It is written so it works either
way: if this build becomes the site, this is the handover; if the changes are
re-implemented in Magento, this is the build spec.

Nothing here needs to be taken on trust — every claim below points at a file or a
URL you can open.

---

## 1. What this build is

A static, multi-page rebuild of the LED-lighting site. 299 HTML pages, deployed to
Netlify from a plain folder — no build step (`netlify.toml` sets `command = ""`).

| Area | Pages |
|---|---|
| Product pages under `/products/` | 186 |
| Category + range pages under `/lighting-perth/` | 63 |
| Automation / smart lighting | 24 |
| Blog | 13 |
| Homepage, account, checkout, policies, tools | 13 |
| **Total** | **299** |

`sitemap.xml` lists 290 indexable URLs. 274 product images are served locally from
`/img/` rather than hot-linked off the Magento CDN.

---

## 2. Answering the two questions you raised

### "In website many things missing like payment, user login, checkout"

They are present and wired, not stubbed:

| Function | File | Magento GraphQL operations used |
|---|---|---|
| Login / register / password reset / order history | `assets/account.js` | `generateCustomerToken`, `createCustomer`, `requestPasswordResetEmail`, `customer { orders }` |
| Cart → address → shipping → billing → payment → order | `assets/checkout.js` | `addProductsToCart`, `setShippingAddressesOnCart`, `setShippingMethodsOnCart`, `setBillingAddressOnCart`, `setPaymentMethodOnCart`, `placeOrder` |
| Live price, GST price, stock, custom options | `assets/magento.js` | product query incl. `price_tiers` and customisable options |

Pages involved: `account.html`, `checkout.html`, `order-complete.html`.
Customer token is held in `localStorage.greenhse_token`. reCAPTCHA v2 tokens are
sent as the `X-ReCaptcha` header.

Note this uses a **customer** token, obtained by the customer logging in. No
administrative credential is present in the client.

### "I am not sure now all data coming directly from Magento or not yet?"

Prices, stock and customisable options are read live from Magento at page load.
Product names, descriptions, specs and photos are baked into the static pages —
that is deliberate, for speed and SEO, and it is the part that would need a
re-export if the catalogue changes materially.

**How the browser reaches Magento without CORS.** `_redirects` contains:

```
/mag/*  https://greenhse.com/:splat  200
```

Status **200 means Netlify proxies server-side** — it is not a 301. The browser
therefore makes a same-origin request to `/mag/graphql`, and no CORS headers are
required on the Magento end. This is why the CORS blocker from earlier is no longer
holding anything up. `assets/magento.js` falls back to calling
`https://greenhse.com/graphql` directly if the proxy is unavailable.

---

## 3. Integration details worth knowing before you touch anything

These were all found the hard way and are easy to get wrong a second time.

- **Product IDs are not Magento SKUs.** Site IDs are truncated to 18 characters and
  upper-cased; Magento's `sku` filter is case-sensitive, so a direct lookup fails for
  most products. `assets/sku-map.js` holds 249 mappings derived from each product's
  original Magento `url_key` (e.g. `DL10-PS` → `DL10PS`). 13 of those entries are
  flagged `v: 0` — matched by product name rather than url_key, and **not verified**.
- **The payment method input is `worldline_hosted_checkout`**, not `worldline_hc`.
- **`country_code` is a `String`.** It must be passed as `"AU"` with quotes, or
  Magento returns a 500 HTML page rather than a GraphQL error.
- **GraphQL requires POST.** A browser GET to `/graphql` returning
  `Syntax Error: Unexpected <EOF>` is correct behaviour, not a fault.
- **Grouped products** report a "from" price (the cheapest child) and are rendered
  with a "from" prefix rather than a flat figure. This is the one catalogue area not
  fully live.

---

## 4. What this build adds that greenhse.com does not have

| Feature | Where | What it does |
|---|---|---|
| **Layout planner** | `layout.html` (`layout-standalone.html` = offline copy with images inlined) | Customer loads their own floor plan, sets scale, places fittings room by room, exports a costed light schedule for their electrician |
| **Downlight finder** | `index.html` | Guided wizard with beam diagrams; recommends by room size, ceiling height, glare and colour temperature |
| **Strip light finder** | `index.html` | Same pattern for strip and channel selection |
| **Installation hub** | `installation.html` | Guides plus the complete spec sheet index — 243 links |
| **Light Lab** | `light-lab.html` | Before/after job showcase |
| **Channel profile cards** | `products/lighting-perth/led-strip-lights/index.html#channels` | 7 channel profiles with supplier cross-section drawings |
| **Built-in QA suites** | any page as `?qa=1` | 488 automated content and behaviour checks, run from the page |
| **Policy pages** | `privacy.html`, `terms.html`, `returns.html`, `contact.html` | — |

---

## 5. Catalogue and content corrections made

Corrections to product data, audited against live greenhse.com and against supplier
brochures. These apply to the catalogue regardless of which site ships.

- 250 products audited for price, specs, description and photo
- Strip lighting specs corrected from supplier brochures
- 88 mangled acronyms fixed in product copy
- False "RGB + white" claims removed where the product does not support it
- Channel galleries deduplicated across all 10 affected products
- Product images localised off the Magento CDN into `/img/`
- 12 blog posts migrated, with `_redirects` entries mapping every old
  `/blogs/post/<slug>` URL to its new location

**Six price corrections**, each verified against Magento — the catalogue held two
different prices for the same product in 11 places:

| Product | Was | Now |
|---|---|---|
| 12V transformers | $15.00 | $22.00 |
| 24V transformers | $15.00 | $30.00 |
| Blizzard | $145.00 | $125.00 |
| DL9RGBW-PBT (two entries) | $25.00 | $27.00 |
| DL25-20-140 | $35.00 | $40.00 |
| DL03-4KIT | $66.00 | $46.00 |

Five further grouped products disagree between the stored price and Magento's "from"
price. **These were deliberately not guessed at** and need Keri: Super Slim
Floodlights, 24W Twin Floodlights/Sensor, Kinetic RF Switch and Receiver, Kinetic
Switch Receiver, 3W Smart RGBW Star Lights.

**Two real bugs fixed in the downlight finder** (both would exist in any
re-implementation of that wizard):

1. At 90 mm the finder claimed *"low glare is only made in 70 and 90 mm, so at 90 mm
   every option is a wide standard beam"* — self-contradictory. The guard was
   `dlBandIndex >= 2`, which started lying the moment the 30 mm band was added at
   index 0. It now tests whether the glare question was actually skipped.
2. The glare question's hint read its option count from `DL_Q[1]`, which is the
   star-light colour question, not glare. Now looked up by key.

---

## 6. Current QA state

| Suite | Tests | Passing |
|---|---|---|
| `index.html?qa=1` → QA tab → Run tests | 116 | 110 |
| `layout.html?qa=1` (runs automatically) | 372 | 356 |

The 22 failures are all pre-existing — they fail identically on the build from before
this round of work, so they are a standing to-do list, not a regression. The homepage
six are content decisions:

| Test | Reading | Who decides |
|---|---|---|
| 20 W/m offered in 4000K and 5500K only | `standard still offers 4` | Keri — confirm against catalogue |
| Meeting prices applied (SMD $14 / CCT $16 / RGB $17) | SMD is $18, not $14 | Keri — which price is correct |
| Long Run COB sold as IP20 and IP67 | `noStray=false` — a stray card somewhere | Lazar |
| Finder place visuals are real photos | cove & wet install visuals | Lazar |
| Chip thumbnails are embedded, not hot-linked | stale assertion — photos now ship as files | Lazar (fix the test) |
| Glare comparison photo is embedded | stale assertion — same reason | Lazar (fix the test) |

The last two assert `data:` URIs; images now ship as real files under `/img/`, which
is smaller and cacheable. The assertions are out of date, not the site.

---

## 7. Outstanding work

**Needs Jatin — infrastructure only, cannot be done from the site files:**

1. **`mag.greenhse.com` does not exist** (NXDOMAIN). Create the subdomain, issue SSL,
   and point the Magento base URL at it. This must happen before the domain cutover.
2. **DNS cutover** for `greenhse.com` when the go/no-go is given.
3. At cutover, repoint the `/mag/*`, `/docs/*` and `/brand/*` rules in `_redirects` to
   `mag.greenhse.com`, or the site will proxy to itself.

**Needs Keri — catalogue decisions:**

4. The five grouped-product prices in §5.
5. The 30 W track light is white on this build and black in Magento. Which is correct?
6. The two QA price/spec questions in §6.
7. The catalogue lists both a *"Surface Rectangle · Black · 17.4 mm"* and a
   *"Black Cover · Black · 16.9 mm"* channel. Supplier drawings suggest these may be
   one item listed twice. Nothing has been merged or renamed — both are listed exactly
   as the catalogue has them. Needs a decision.

**Needs Lazar:**

8. One real end-to-end test order, placed and confirmed in Magento admin.
9. Four product photos still missing from `/img/`: `airforce-3-in-1-dc.webp`,
   `15w-8w-gimbal-low-glare-downlight.webp`, `dl40-30-280-cct-pa.webp`,
   `hb150-so-120-cct.webp`.
10. Light Lab: the 6 before/after pairs in `assets/lightlab.js` are placeholders
    flagged `demo: true` and need real job photos.
11. Verify the 13 unverified `v: 0` SKU mappings.

---

## 8. File map

| What | File |
|---|---|
| Homepage, shop grid, product modal, both finders, applications carousel, QA suite | `index.html` (~870 KB, single file) |
| Installation guides + full spec sheet index | `installation.html` |
| Design system — every page, one stylesheet | `assets/site-v4.css` |
| Magento product/price/stock integration | `assets/magento.js` |
| Accounts | `assets/account.js` |
| Checkout | `assets/checkout.js` |
| Site ID → Magento SKU map (249 entries) | `assets/sku-map.js` |
| Product galleries | `assets/gallery.js` |
| Light Lab data | `assets/lightlab.js` |
| Old-URL redirects + the three proxy rules | `_redirects` |
| Netlify config (empty build command — required) | `netlify.toml` |
| Cache and security headers | `_headers` |
| Spec sheet manifest + fetch script | `docs/` |

---

# Addendum — 28 August 2026

Everything below was done after the original document was written.

## 9. Design

The entire visual design was ported from the Next.js demo build so the two are
consistent. `assets/site-v4.css` was rewritten against that design system —
Poppins + JetBrains Mono, `--green:#00c400`, `--ink:#14150f`, `--bg:#eee`,
`--bg-card:#f4f2ec`, `--bg-tile:#101010`, radii 4/6/10 px — with **all 252 original
selectors preserved**, so no page lost its styling in the swap.

One thing to know if you touch the header: Poppins is a wider face than the demo's
Space Grotesk, and this build has 11 nav items against the demo's 9. The row
overflowed and painted across the logo. It is held by `overflow:hidden` on
`.ghd-main`/`.mainnav`, 13 px type, 7 px padding, and a burger breakpoint at 1200 px.
Measured clean from 1600 px down to 1280 px. Adding a twelfth nav item will break it
again.

## 10. Spec sheets

Requested by Keri: *"we have to give specs sheets for each product."*

All 250 product pages on greenhse.com were harvested — zero fetch errors — yielding
**194 products with spec sheets across 117 distinct PDFs**.

| Where | What |
|---|---|
| `installation.html` | Complete index — 243 links, grouped by category |
| Each product page | Its own sheets, in a `.specsheets` panel |
| Transformer pages | Sheet paired to each individual size in the Options table |

The transformer pages carry sheets on 5 of 6 sizes (12V) and 5 of 7 (24V). The 12V
120W, 24V 120W and 24V 320W have no sheet on the original site either — that is a
gap in the source data, not a porting miss.

PDFs are proxied live from Magento via `/docs/*`. `docs/fetch-spec-sheets.sh`
downloads all 117 if you would rather serve them locally, and `docs/spec-sheets.csv`
is the full manifest.

## 11. Homepage

- Applications section rebuilt as an auto-scrolling carousel — 23 slides, CSS
  scroll-snap plus an IntersectionObserver, and it honours
  `prefers-reduced-motion`. No carousel library.
- Installation help and spec sheets **removed** from the homepage and consolidated
  into `installation.html`, which is now linked from the main nav.

## 12. Layout planner

Seven changes, all covered by the 372-test suite:

1. Star lights space at a maximum of 50 cm apart
2. Rooms 5 m and over ask more-light / less-light and place 6–9 accordingly;
   bedrooms stay at 4
3. Proper pendant lighting symbol
4. Wall lights are outdoor-only and throw 180° forward, not behind
5. Fan question comes first when a bedroom or alfresco is selected
6. Smart lights available in the room light picker
7. Darker green drag-box outline
8. "Rooms finished" panel on the right, listing each completed room with dropdowns

---

# Addendum 2 — 29 August 2026

## 13. Content brought across from the Next.js demo build

The demo build at `greenhse-demolights.netlify.app` was crawled in full (328 URLs
from its sitemap) and compared against this build page by page.

**35 blog posts carried over.** The blog went from 12 posts to 46, matching the
demo build exactly. Each was rebuilt into this build's template — same header,
footer, design system and `?qa=1`-gated tooling as the rest of the site.

- 71 images localised into `/blog/img/` (38 MB of source PNG/JPEG re-encoded to
  2.5 MB + 1.5 MB of WebP at 1200px). No runtime dependency on the Magento CDN.
- 32 unresolved Magento `{{media url="..."}}` template directives were resolved
  to real files. **These are still broken on the demo build** — the directives
  were never evaluated, so those images 404 there.
- 495 inline `color` / `font-size` / `font-family` declarations from the Magento
  WYSIWYG were stripped so the design system governs typography. One of them,
  `#2dc26b`, measured 3.45:1 and failed contrast.
- 92 redirects added mapping `/blogs/<slug>` to `/blog/<slug>.html`.
- One image reference is corrupt at source (`{{media url="` with no filename, in
  `guide-to-effective-led-area-lights`) and was dropped rather than shipped broken.

**`about.html` added.** The demo build has an About Us page and this build had
none. Rebuilt with the same content — company background, the Belmont Small
Business Award, the showroom details — and linked from the footer on every page.

## 14. Product coverage — the 132-page difference is deduplication

The demo build lists 258 product URLs against this build's 136. Every one of the
132 was checked. None is a missing product:

| Count | What they are |
|---|---|
| 34 | Switch gang/colour variants |
| 15 | Transformer sizes — this build lists all of them in one Options table with prices and spec sheets |
| 13 | Strip channel profiles — consolidated into the 7 channel cards |
| 12 | Controllers |
| 11 | Remotes |
| 7 | Downlight colour/size variants |
| 6 | `-fp` duplicates of pages that already exist here |
| 5 | Kinetic receivers |
| 4 | Floodlight sizes |
| 4 | Garden light accessories (cables, T-pieces) |
| 4 | Twin spot variants |
| 15 | Numbered duplicates (`-1`, `-2`, `-3`) of pages that already exist here |
| **2** | **`test-led-1` and `test-led-2` — test products, publicly visible on the demo build** |

Two things need a decision rather than a code change:

1. **`ct24v-magic-sp530e`** is the one slug with no equivalent anywhere in this
   build. It needs a price, specs and a photo before a page can be made — Keri.
2. **The test products** should be removed from Magento, not just from a front
   end, or they will keep reappearing in any export.

## 15. Thin content carried across as-is

Two of the ported posts are near-empty on the source site and remain so here:
`lighting-layout-guidelines` (61 words) and `smart-life-connection` (95 words,
essentially a YouTube link). Thin pages are an SEO liability. They should be
expanded, merged into a fuller guide, or marked `noindex` — a content decision.
