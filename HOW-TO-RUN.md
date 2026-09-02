# How to run this site

```
npm install
npm run build      # builds all 335 pages into out/
npm run preview    # serves the built site at http://localhost:8080
```

or for development with hot reload:

```
npm run dev        # http://localhost:3000
```

Both ways serve the FULL site — every category page, every product page,
blog, account, checkout — **with the Magento backend connected**: live
prices, stock, login, cart and checkout all work, proxied to
greenhse.com exactly as the production Netlify deploy does it
(`/mag/*` → Magento GraphQL, `/docs/*` → spec sheets, `/brand/*` → logos).

## ⚠️ Do NOT open `out/index.html` by double-clicking it

The site uses root-absolute URLs (`/products/…`, `/assets/…`), the same as
any production site. Opened from the file system (`file://…`), every link
and image path breaks and it looks like "only the homepage works". It must
be served — `npm run preview`, `npm run dev`, or any static server pointed
at `out/` will do.

## Where the backend is wired

| What | File |
|---|---|
| Live price / stock / options on every page | `public/assets/magento.js` → POST `/mag/graphql` |
| Login / register / orders | `public/assets/account.js` |
| Cart → shipping → payment → placeOrder | `public/assets/checkout.js` |
| Site ID → Magento SKU map | `public/assets/sku-map.js` |
| Proxy rules (production) | `public/_redirects` (Netlify) |
| Proxy rules (npm run dev) | `next.config.js` rewrites |
| Proxy rules (npm run preview) | `scripts/serve.js` |

Product names, photos and descriptions are baked in at build time on
purpose — instant loads and full SEO — and the live figures are painted
over them from Magento at page load. That split is documented in
`claude/change-document.md` §2.

## Where everything else is

See `CODE-MAP.md` — one file per page, one file per homepage section,
one file per feature, all listed.

## Tests

- Homepage: open `/?qa=1` → QA tab → Run tests (baseline **110/116**).
- Layout planner: open `/layout.html?qa=1` (baseline **363/379**).
