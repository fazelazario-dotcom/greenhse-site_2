# CODE MAP — where everything is

One file per page. One file per homepage section. One file per feature.
If you are looking for something, it is on this list.

Build: `npm install` → `npm run build` → all 335 pages land in `out/`.
(The build first assembles `public/assets/home-app.js` from the feature
files in `public/assets/home/` — see `scripts/build-home-app.js`.)

---

## Pages — every route and its file

| Page | URL | File |
|---|---|---|
| Homepage | `/` | `app/page.js` (assembles the section files below) |
| Downlights | `/products/lighting-perth/led-downlights-perth/` | `app/(chrome)/products/lighting-perth/led-downlights-perth/page.js` |
| Strip Lights | `/products/lighting-perth/led-strip-lights/` | `app/(chrome)/products/lighting-perth/led-strip-lights/page.js` |
| Ceiling / Panel / Oyster | `/lighting-perth/led-ceiling-lights-perth/` | `app/(chrome)/lighting-perth/led-ceiling-lights-perth/page.js` |
| Batten Fittings | `/lighting-perth/led-batten-lights-perth/` | `app/(chrome)/lighting-perth/led-batten-lights-perth/page.js` |
| Outdoor / Wall Lights | `/products/lighting-perth/led-outdoor-wall-lights-perth/` | `app/(chrome)/products/lighting-perth/led-outdoor-wall-lights-perth/page.js` |
| Landscape / Garden | `/products/lighting-perth/led-garden-pool-lights-perth/` | `app/(chrome)/products/lighting-perth/led-garden-pool-lights-perth/page.js` |
| Flood / Sports | `/products/lighting-perth/led-flood-lights-perth/` | `app/(chrome)/products/lighting-perth/led-flood-lights-perth/page.js` |
| High Bay | `/products/lighting-perth/high-bay-lights/` | `app/(chrome)/products/lighting-perth/high-bay-lights/page.js` |
| Industrial | `/lighting-perth/industrial-lighting-perth/` | `app/(chrome)/lighting-perth/industrial-lighting-perth/page.js` |
| School & Commercial | `/lighting-perth/commercial-lighting-perth/` | `app/(chrome)/lighting-perth/commercial-lighting-perth/page.js` |
| Emergency Lights | `/products/lighting-perth/emergency-lights/` | `app/(chrome)/products/lighting-perth/emergency-lights/page.js` |
| Star Lights | `/products/lighting-perth/led-star-lights/` | `app/(chrome)/products/lighting-perth/led-star-lights/page.js` |
| Track / Linear | `/products/lighting-perth/led-track-lights-perth/` | `app/(chrome)/products/lighting-perth/led-track-lights-perth/page.js` |
| Air Flow / Fans | `/products/lighting-perth/air-flow/` | `app/(chrome)/products/lighting-perth/air-flow/page.js` |
| Security / Sensors | `/products/lighting-perth/security-sensors/` | `app/(chrome)/products/lighting-perth/security-sensors/page.js` |
| Switches / Powerpoints | `/products/lighting-perth/glass-light-switch-perth-html/` | `app/(chrome)/products/lighting-perth/glass-light-switch-perth-html/page.js` |
| 12V/24V Transformers | `/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/` | `app/(chrome)/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/page.js` |
| Smart Life | `/automation/smart-lights-perth/` | `app/(chrome)/automation/smart-lights-perth/page.js` |
| All ~300 product pages | `/products/.../<product>/` | `app/(chrome)/[...slug]/page.js` → `components/Pdp.jsx`, data from `data/site.json` |
| Blog index | `/blog/` | `app/(chrome)/blog/page.js` |
| Blog posts (46) | `/blog/<slug>/` | `app/(chrome)/[...slug]/page.js` → `components/BlogPost.jsx` |
| All categories directory | `/categories/` | `app/(chrome)/categories/page.js` |
| About | `/about/` | `app/(chrome)/about/page.js` |
| Installation hub | `/installation/` | `app/(chrome)/installation/page.js` |
| Account / Checkout / policies / Light Lab | `/account/` etc. | `app/(chrome)/[...slug]/page.js` (content from `data/site.json`) + `public/assets/account.js`, `checkout.js`, `lightlab.js` |
| Layout planner | `/layout.html` | `public/layout.html` (self-contained twin: `public/layout-standalone.html`) |

## Homepage — one file per section (`data/sections/`)

Assembled in numeric order by `app/page.js`.

| # | Section on the page | File |
|---|---|---|
| 00 | Header + mobile nav | `data/sections/00-header-and-mobile-nav.html` |
| 01 | Hero — "Light done right." | `data/sections/01-hero.html` |
| 02 | Category tiles — "Everything that lights a space" | `data/sections/02-categories.html` |
| 03 | Shop — "Browse & build your order" | `data/sections/03-shop-browse-and-build.html` |
| 04 | Downlight finder section | `data/sections/04-downlight-finder-section.html` |
| 05 | Strip light finder section | `data/sections/05-strip-light-finder-section.html` |
| 06 | Smart Life | `data/sections/06-smart-life.html` |
| 07 | Energy / Green Charge | `data/sections/07-energy-green-charge.html` |
| 08 | Applications carousel | `data/sections/08-applications-carousel.html` |
| 09 | Resources — "Plan it before you buy it" | `data/sections/09-resources-plan-it.html` |
| 10 | Blog teasers | `data/sections/10-blog-teasers.html` |
| 11 | Videos | `data/sections/11-videos.html` |
| 12 | FAQ | `data/sections/12-faq.html` |
| 13 | About | `data/sections/13-about.html` |
| 14 | Contact / signup | `data/sections/14-contact-signup.html` |
| 15 | Footer | `data/sections/15-footer.html` |
| 16–22 | Overlays: cart drawer, quick-view modal, strip finder wizard, downlight finder wizard, cookie bar, legal, toasts/QA | `data/sections/16-…` to `22-…` |

## Homepage behaviour — one file per feature (`public/assets/home/`)

Built into `public/assets/home-app.js` by `scripts/build-home-app.js`
(automatic on `npm run build`). **Edit these, never the built file.**

| Feature | File |
|---|---|
| Helpers + catalogue data (categories, banner artwork, FAQ text) | `public/assets/home/01-core-helpers-and-data.js` |
| App state (cart, wishlist, filters, wizard answers) | `public/assets/home/02-state.js` |
| Shop grid, nav menus, category tiles, filter chips | `public/assets/home/03-shop-grid-and-nav.js` |
| Cart + wishlist | `public/assets/home/04-cart-and-wishlist.js` |
| Product quick-view modal | `public/assets/home/05-quick-view-modal.js` |
| FAQ accordion, toasts, drawers, form validation | `public/assets/home/06-faq-toasts-and-chrome.js` |
| **STRIP LIGHT FINDER** | `public/assets/home/07-strip-light-finder.js` |
| **DOWNLIGHT FINDER** (questions, diagrams, match + price, filter chips, guide) | `public/assets/home/08-downlight-finder.js` |
| Legal page drafts | `public/assets/home/09-legal-pages.js` |
| Installation guides (in the modal) | `public/assets/home/10-installation-guides.js` |
| Applications carousel | `public/assets/home/11-applications-carousel.js` |
| Boot, scroll-reveal, wizard auto-open wiring | `public/assets/home/12-boot-and-wiring.js` |
| QA / launch-readiness test suite (`/?qa=1`) | `public/assets/home/13-qa-test-suite.js` |

## Shared templates and data

| What | File |
|---|---|
| Header + footer used by every non-home page | `components/Chrome.jsx` |
| Category page template (hero, group boxes, grid, videos, PDFs, SEO copy) | `components/Cat.jsx` |
| Product page template | `components/Pdp.jsx` + `components/Gallery.jsx` |
| Blog post template | `components/BlogPost.jsx` |
| All catalogue data — products, categories (incl. product groups), blogs, content pages | `data/site.json` |
| Per-category hero image, videos, connection PDFs, SEO copy | `data/cat-extras.json` |
| Nav + footer link lists | `data/nav.json` |
| Site-wide styles / design system | `app/_styles/site.css` + `app/_styles/port.css` |
| Homepage styles | `public/assets/home.css` |

## Magento API integration (live prices, login, cart, checkout)

| What | File |
|---|---|
| Live price / stock / options painted onto every page | `public/assets/magento.js` (POSTs to `/mag/graphql` — proxied to Magento by the `/mag/*` rule in `public/_redirects`) |
| Login / register / password reset / order history | `public/assets/account.js` |
| Cart → address → shipping → payment → placeOrder | `public/assets/checkout.js` |
| Site product ID → Magento SKU map (249 entries) | `public/assets/sku-map.js` |

## Tests

Homepage: open `/?qa=1` → QA tab → Run tests (baseline 110/116).
Layout planner: open `/layout.html?qa=1` (baseline 363/379).
Test source: `public/assets/home/13-qa-test-suite.js` and the QA block at the end of `public/layout.html`.

## Live category listings (Magento-driven)

Every category page fetches its CURRENT product list from Magento GraphQL at page load (`public/assets/catalog.js`, wired in `components/Cat.jsx` via `data-live-category`). On a successful API response the page shows a green "✓ Live catalogue — N products synced from our stock system" line under the range heading, and any product Magento lists in the category that the pre-built grid doesn't carry is appended as a live-rendered card (name, photo, price, stock straight from the API). `public/assets/catalog-map.js` (GENERATED by `scripts/build-catalog-map.js` on every build) maps Magento url_keys to this site's pages for the links.

The homepage shop is live-priced the same way: every card in the Browse & Build grid (and the downlight/strip teaser grids, and the quick-view modal for non-option products) carries `data-sku` / `data-price-target` hooks that `assets/magento.js` paints live prices over, grids repaint on every re-render (`repaintLive()` in `public/assets/home/01-core-helpers-and-data.js`), the cart uses the live price when Magento has answered, and a "✓ Live pricing" line appears under the shop heading only after a successful API response.

