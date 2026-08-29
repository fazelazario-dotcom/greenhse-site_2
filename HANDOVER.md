# Greenhse website — handover

**Working copy:** `greenhse-channels-final.zip` (937 files, ~14 MB). Unzip it and that folder *is* the site — deploy the folder root to Netlify. Currently live at `https://greenhse.netlify.app`; target is `greenhse.com`.

---

## What this site is

A static, multi-page LED-lighting site (298 HTML pages) rebuilt from the old Magento shop at greenhse.com. It has:

- 250 products, audited against live greenhse.com (prices, specs, descriptions, photos)
- Real accounts + real checkout wired to the live Magento 2 backend over GraphQL
- A hosted lighting **layout planner** (`layout.html`, plus a self-contained `layout-standalone.html`)
- A **Light Lab** (`light-lab.html`) — before/after job showcase
- Policy + contact pages: `privacy.html`, `terms.html`, `returns.html`, `contact.html`
- A built-in QA suite: open any page as `index.html?qa=1`, click the QA tab, "Run tests"

## How it talks to Magento

`_redirects` contains:

```
/mag/*  https://greenhse.com/:splat  200
```

Status **200 = proxy, not redirect**, which is what avoids CORS. `assets/magento.js` posts to `/mag/graphql`.

- `assets/magento.js` — product query (incl. `price_tiers` and customisable options), paints `[data-price-target]`, `[data-price-inc-target]` (×1.1 for GST), `[data-stock-target]`, `[data-options-target][data-for="<PID>"]`
- `assets/account.js` — login/register/reset/orders; token in `localStorage.greenhse_token`; reCAPTCHA v2 token sent as the `X-ReCaptcha` header
- `assets/checkout.js` — cart → address → shipping → billing → payment → placeOrder
- `assets/sku-map.js` — 249 mappings, because site IDs are truncated/upper-cased vs Magento SKUs (`DL10-PS` → `DL10PS`)

Gotchas already paid for:
- The payment method input is **`worldline_hosted_checkout`**, not `worldline_hc`
- `country_code` is a `String` — it must be `"AU"` with quotes, or Magento returns a 500 HTML page
- GraphQL requires POST; a browser GET to `/graphql` correctly returns `Syntax Error: Unexpected <EOF>` — that is not a fault

## Still outstanding

1. **One real end-to-end test order.** Never placed — do it yourself on the live site.
2. **`mag.greenhse.com` does not exist** (NXDOMAIN). Before the domain cutover, Jatin needs to create the subdomain + SSL and change the Magento base URL. That is his job, not a site-file change.
3. **5 products have no photo yet** — add these to `/img/`: `airforce-3-in-1-dc.webp`, `15w-8w-gimbal-low-glare-downlight.webp`, `dl40-30-280-cct-pa.webp`, `st24v-smd-all-4.webp`, `hb150-so-120-cct.webp`
4. **Light Lab needs real job photos** — the 6 before/after pairs in `assets/lightlab.js` are marked `demo:true` placeholders.
5. **Open question:** the 30W track light is white on our site and black in Magento. Which is right?

## QA suite: 109 / 115 passing

Six known failures, all outside the channels work:

| Test | Reading |
|---|---|
| 20 W/m offered in 4000K and 5500K only | `standard still offers 4` — content check, worth confirming against the catalogue |
| Meeting prices applied (SMD $14 / CCT $16 / RGB $17) | SMD is $18, not $14 — decide which is correct |
| Long Run COB sold as IP20 and IP67 | `noStray=false` — a stray card somewhere |
| Finder place visuals are real photos | cove & wet install visuals |
| Chip thumbnails are embedded, not hot-linked | stale wording; photos now ship as files |
| Glare comparison photo is embedded | same — the assertion still wants a data: URI |

The last two are stale assertions rather than site faults: photos used to be inlined as `data:` URIs and now ship as real files under `/img/`, which is smaller and cacheable.

---

## Changes made in the session that produced this zip

### Channels (the requested work)

- **Channel gallery deduplicated, 19 → 18 images.** The hero `/img/24vstrip-channels.webp` (400 px) and the first gallery image `24vstrip-channels-new-0.webp` (713 px) were the same photo. Kept the higher-resolution one.
- Same dedup applied across **all 10 product galleries** that had it — same generated markup, same duplication. Thumb counts, the `1 / N` counter and the main image were all rebuilt to match, and every gallery was re-tested for thumbnail→main swapping.
- **Added the supplier cross-section drawing to all 7 channel profile cards** on the strip-lights page (`#channels`). The drawings were already in the `CHANIMG` bundle but only ever reached the modal.
- **Modal image can no longer render blank.** The variant photo now falls back to the product's own shot if it fails to load, and the panel frames the shot — several channel and transformer photos are a white product on a white background and were reading as an empty panel.

### Fixes found along the way

- **Real bug:** at 90 mm the finder claimed *"low glare is only made in 70 and 90 mm, so at 90 mm every option is a wide standard beam"* — self-contradictory. The guard was `dlBandIndex >= 2`, which started lying the moment the 30 mm band was added at index 0. It now asks whether the glare question was actually skipped.
- **Real bug:** the glare question's hint read its option count from `DL_Q[1]`, which is the *star-light colour* question, not glare. Now looked up by key.
- **QA suite corrected, not relaxed.** Tests drove the finder by option *index*, so adding the 30 mm band silently made them answer different questions — two were crashing outright. They now pick by label. `DL03-ALL` was removed from the "must be excluded" list because the 30 mm star light is deliberately a finder size now. Nine `startsWith("data:image")` assertions became `isRealAsset()`, which accepts a data URI **or** a real local image path.

That took the suite from 94/115 to 109/115.

## Where things live

| What | File |
|---|---|
| Channel photos, dimension drawings, per-option map, catalogue ambiguity notes | `CHANIMG`, in `index.html` |
| Homepage shop grid, modal, both finders, QA suite | `index.html` (~830 KB, one file) |
| Channels PDP | `lighting-perth/led-strip-lights/24vstrip-channels-new.html` |
| Channel profile cards | `products/lighting-perth/led-strip-lights/index.html`, `#channels` |

`CHANIMG` also carries a `flags` array recording genuine catalogue ambiguities — e.g. the catalogue sells both a "Surface Rectangle · Black · 17.4 mm" and a "Black Cover · Black · 16.9 mm", and the supplier drawings suggest these may be one item listed twice. Nothing was merged or renamed; both are listed exactly as the catalogue has them. Worth a decision.
