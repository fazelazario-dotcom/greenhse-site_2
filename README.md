# Greenhse Technologies — website

A static, multi-page LED-lighting site for Greenhse Technologies (Perth, WA),
rebuilt from the Magento 2 shop at greenhse.com. **299 HTML pages, no build step.**
The repository root *is* the site: deploy the folder as-is.

Commerce is live against Magento 2 over GraphQL — this is not a mockup with
placeholder buttons. Accounts, cart, checkout, prices and stock all talk to the
real backend.

---

## Start here

| If you want to… | Read |
|---|---|
| Understand what this changes vs. greenhse.com, and why | [`CHANGE-DOCUMENT.md`](CHANGE-DOCUMENT.md) |
| Pick the work up and run it | [`HANDOVER.md`](HANDOVER.md) |
| See what's still outstanding | §7 of the change document |
| Re-implement any of this in Magento | The change document is written to double as a build spec |

Everything in those documents points at a file or a URL you can open. Nothing needs
to be taken on trust.

## Run it locally

No dependencies, no install:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Two caveats when running locally:

- **Magento calls will fail.** The `/mag/*` proxy is a Netlify rewrite rule, so it
  only exists once deployed. Prices and stock will show their static fallbacks.
- **Spec sheet PDFs will 404** for the same reason — see "Proxy rules" below.

## Deploy

```bash
npx netlify-cli deploy --dir . --no-build --prod
```

`--no-build` matters. `netlify.toml` sets `command = ""`, but a build command
configured in the Netlify UI takes precedence over the file and will try to run
`npm run build` against a folder that has no package.json.

## Proxy rules

`_redirects` carries three rewrites. All are **status 200 — proxies, not
redirects** — which is what avoids CORS:

| Rule | Purpose |
|---|---|
| `/mag/*  https://greenhse.com/:splat  200` | GraphQL. `assets/magento.js` posts to `/mag/graphql` |
| `/docs/*  https://greenhse.com/media/sparsh/product_attachment/:splat  200` | Product spec sheet PDFs |
| `/brand/*  https://greenhse.com/media/wysiwyg/:splat  200` | Brand and client logos |

**At the domain cutover** these three need repointing to `mag.greenhse.com`, or the
site will proxy to itself and loop. Alternatively `docs/fetch-spec-sheets.sh`
downloads all 117 spec sheets so `/docs/*` can be served locally instead — that
removes one runtime dependency on Magento and is probably the better end state.

## Layout

```
index.html              Homepage: shop grid, product modal, downlight finder,
                        strip finder, applications carousel, QA suite (~870 KB, one file)
installation.html       Installation guides + the full spec sheet index (243 links)
layout.html             Lighting layout planner
layout-standalone.html  Offline copy of the planner, images inlined (2.4 MB)
light-lab.html          Before/after job showcase
account.html            Login, register, password reset, order history
checkout.html           Cart → address → shipping → billing → payment → placeOrder
assets/site-v4.css      The entire design system. One stylesheet, all 299 pages
assets/magento.js       Product, price, stock, customisable options
assets/account.js       Customer auth. Token in localStorage.greenhse_token
assets/checkout.js      Checkout flow
assets/sku-map.js       249 site-ID → Magento-SKU mappings (see below)
products/               186 product pages
lighting-perth/         63 category and range pages
automation/             24 smart lighting pages
blog/                   13 posts
img/                    274 localised product photos
docs/                   Spec sheet manifest + fetch script (not the PDFs themselves)
```

## Things that will bite you

Each of these cost real time to find. They are not hypothetical.

- **Product IDs are not Magento SKUs.** Site IDs are truncated to 18 characters and
  upper-cased; Magento's `sku` filter is case-sensitive. `assets/sku-map.js` holds the
  249 mappings (`DL10-PS` → `DL10PS`). 13 entries are flagged `v: 0` — matched by
  product name rather than `url_key`, and **unverified**.
- **The payment method input is `worldline_hosted_checkout`**, not `worldline_hc`.
- **`country_code` is a `String`.** Pass `"AU"` with quotes, or Magento returns a 500
  HTML page instead of a GraphQL error.
- **GraphQL requires POST.** A browser GET to `/graphql` returning
  `Syntax Error: Unexpected <EOF>` is correct behaviour, not a fault.
- **Grouped products** report a "from" price (cheapest child) and render with a "from"
  prefix. This is the one catalogue area not fully live.

## QA

There are two suites, both built into the pages — no runner, no CI:

| Page | Tests | State |
|---|---|---|
| `index.html?qa=1` → QA tab → Run tests | 116 | 110 passing |
| `layout.html?qa=1` (runs automatically) | 372 | 356 passing |

The 6 + 16 failures are pre-existing and are content decisions rather than code
faults — they are itemised in §6 of the change document. Both suites are gated behind
`?qa=1` so customers never see them.

If you change anything, run both before deploying. They are fast and they have caught
real regressions.

## Conventions

- **One stylesheet.** `assets/site-v4.css` — 252 selectors, Poppins + JetBrains Mono,
  `--green:#00c400`, `--ink:#14150f`. Don't add per-page `<style>` blocks; the homepage
  has a legacy one and it has already caused one duplicated-nav bug.
- **Bulk edits are scripted, never hand-repeated.** 299 pages share a header and footer.
  Any script that patches them should assert an exact match count and abort before
  writing rather than half-applying.
- **Images are local.** Product photos live in `/img/`, not hot-linked off the Magento
  CDN. New photos go there as `.webp`.
