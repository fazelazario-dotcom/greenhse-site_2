# Greenhse Technologies — Next.js build

The Greenhse site as a Next.js 14 (App Router) project. **335 routes, four page
components, one data file.** Same design, same URLs (via 301s), same live
Magento commerce as the static build it replaces.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
```

Deploys on Netlify with `command = "npm run build"`, `publish = "out"`
(already in `netlify.toml`).

## Architecture

```
app/
  layout.js                 fonts (next/font) + global stylesheet
  page.js                   homepage — see "The homepage" below
  (chrome)/
    layout.js               shared <Header/> / <Footer/> for every other page
    [...slug]/page.js       ONE route drives all 331 templated pages
    blog/page.js            blog index, sorted from data
    categories/page.js      category directory, driven by nav data
    installation/page.js    spec-sheet library (194 products, 117 PDFs)
    about/page.js
components/
  Chrome.jsx                header (mega menu) + footer — defined once, not 334 times
  Pdp.jsx                   product detail page
  Cat.jsx                   category landing page
  BlogPost.jsx              blog article
data/
  site.json                 every product, category and post, extracted from the
                            audited static build (names, prices, specs, options,
                            spec sheets, galleries, SEO meta)
  nav.json                  the menu, one place
lib/site.js                 URL mapping + data access
public/
  assets/*.js               the Magento client layer (see below) + homepage app
  img/, blog/img/           localised imagery
  layout.html               the lighting layout planner (see below)
  _redirects                Magento proxies + 301s from every old .html URL
```

## How the commerce works

Pages are fully static; **price, stock and cart are painted client-side from
Magento**, exactly as before:

- `public/_redirects` proxies `/mag/*` → `greenhse.com` with **status 200**
  (a server-side proxy, not a redirect — that is what avoids CORS).
- `assets/magento.js` posts GraphQL to `/mag/graphql` and fills
  `[data-price-target]`, `[data-stock-target]`, `[data-options-target]` —
  the React components render those exact attributes.
- `assets/account.js` / `assets/checkout.js` run the customer flows on
  `/account/` and `/checkout/`. Customer token in `localStorage.greenhse_token`.
  **No admin credential anywhere in the client.**

Hard-won integration facts (do not relearn these the hard way):
site IDs ≠ Magento SKUs — `assets/sku-map.js` holds the 249 mappings;
the payment method input is `worldline_hosted_checkout`;
`country_code` must be the string `"AU"` or Magento 500s;
GraphQL is POST-only.

## The homepage

The homepage is an application, not a document: 27 KB of skeleton markup that
`public/assets/home-app.js` (730 KB) renders the shop grid, cart, both finder
wizards and the applications carousel into. It ships its own header because the
cart/search/menu buttons are wired into it by id. It is loaded as a module by
`app/page.js` and is the natural next thing to componentise, section by section
— everything else already is.

## The layout planner

`public/layout.html` is a deliberate exception: a self-contained 730 KB canvas
application (the room-by-room lighting planner) with its own 372-test QA suite
(`/layout.html?qa=1`). It has no server dependency and no reason to be React
today. Treat it as a bundled tool.

## URLs

Clean URLs everywhere (`/products/.../tr12v-all/`). Every address from the
static build — all 334 `.html` paths, plus the legacy `/blogs/<slug>` Magento
addresses — 301s to its new home via `public/_redirects`, so nothing indexed
or bookmarked breaks.

## At the domain cutover

Point `/mag/*`, `/docs/*` and `/brand/*` in `public/_redirects` at
`mag.greenhse.com` (they currently target `greenhse.com`), or the site will
proxy to itself. Creating that subdomain + SSL and moving the Magento base URL
is infrastructure work, not a change in this repo.
