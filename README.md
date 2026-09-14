# Greenhse Technologies — website

Next.js 14 (App Router, static export). Deploys to Netlify from `main`.

This build is the demolights.greenhse.com design and pages, rebuilt as source
in this project — every page, the product catalogue, cart, checkout and
account area — plus this site's own blog (`/blog/`) and layout planner
(`/layout-app/`).

```
npm install
npm run build      # fetches the catalogue, builds every page into out/
npm run preview    # serves out/ at http://localhost:8080 with the Magento proxy
npm run dev        # development server at http://localhost:3000
```

## Where things are

| Folder | What |
| --- | --- |
| `app/` | One route file per page. `app/layout.js` is the shared shell (store, header, page, footer, overlays). |
| `site/pages/` | The page components: homepage, each category page, products, cart, checkout, account, contact, about, installation, policies. |
| `site/components/` | Header, footer, product card, product detail, quick view, finders, forms, cart drawer, cookie notice. |
| `site/lib/` | Data: `api.jsx` (catalogue feeds, product shaping, forms), `productsApi.jsx` (lookups), `cartApi.jsx`, `customerApi.jsx`, `ordersApi.jsx`, `nav.jsx` (menus), `storage.jsx`. |
| `site/store/` | Redux slices: cart, user, wishlist, catalogue, finder products, UI. |
| `data/catalog.json` | Snapshot of the product feeds, refreshed by `scripts/fetch-catalog.js` on every build (product pages are built from it). |
| `data/site.json` | This site's blog posts: `bodyHtml` (the rewritten post, 600 to 1000 words), `bodyHtmlOriginal` (the Magento original, kept for reference), `hero` (the header photograph, from `public/images/hero/`), `lede`, `date`. Rendered by `lib/blog.js` (clean-up, link mapping, no dashes) and `components/BlogPost.jsx`; styles in `app/_styles/blog.css`; the list at `/blog/` in `app/blog/page.js`; the homepage journal reads `data/blog-list.json`, written by `scripts/build-blog-list.js` on every build. To add a post: add an entry to `data/site.json` (HTML fragment with `p, h2, h3, ul, ol, li, strong, em, a, img, table`), pick a `hero` from `public/images/hero/`, put pictures in `public/blog/img/`, and build. |
| `public/layout.html` | The layout planner (`/layout-app/`), with `layout-standalone.html` and `layout-admin.html`. |
| `netlify/functions/` | Layout planner submissions, drafts and tracking. |
| `public/_redirects` | Magento proxy (`/mag/*`) and redirects from old addresses. |

## How the backend is reached

- **Products, categories, finders**: `https://www.getestimate.greenhse.com/api/product.php?id=<category>` and `categories.php` — public, read-only, CORS-open. Same feeds the live demo uses.
- **Cart, sign-in, account, orders, checkout**: Magento on greenhse.com, through the site's own `/mag/*` proxy (Netlify `_redirects`; `scripts/serve.js` and `next.config.js` give `preview`/`dev` the same proxy). The proxy is needed because greenhse.com only accepts demolights.greenhse.com as a browser origin.
- **Orders list**: Magento GraphQL with the customer's own token (the demo used an admin token in the browser — removed).
- **Product images**: served through images.weserv.nl, as on the demo.
- **Forms** (quote, enquiry, contact, subscribe): the same endpoints as the demo.

## Light Lab — `/light-lab/`

`public/light-lab.html` + `public/light-lab.js`, a standalone app served at
`/light-lab/` by `scripts/make-folder-routes.js`, the same way the planner is.
It is deliberately not a Next route.

The customer loads a photo of their own room, drops real fittings into it,
turns them on and sees the light. Everything runs in the browser and the photo
is never uploaded; only a small preview goes with a sent list.

- Catalogue: `public/light-lab-data.json`, written at `prebuild` by
  `scripts/build-lightlab-data.js` from `public/layout.html` (parsed specs) and
  `data/catalog.json` (live price, photo, product page). Joined by Magento
  url_key, not by SKU.
- Self test: `/light-lab/?qa=1`. Baseline **62/62**.
- Quote requests post to `/.netlify/functions/submit-layout` with
  `jobType: 'Light Lab'`, so they land in the same admin list as the planner's.
- The lighting is an impression, not a photometric simulation, and the page
  says so in three places. Keep it that way.
