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
- Layout planner: open `/layout-app/?qa=1` (baseline **364/380**).

## Seeing the backend on a category page

Open any category page (e.g. `/products/lighting-perth/led-downlights-perth/`) with DevTools → Network open: you'll see the `/mag/graphql` POST calls to Magento. On the page itself, a green "✓ Live catalogue — N products synced from our stock system" line renders ONLY from a successful live API response, and products that exist in Magento but not in the pre-built page appear under "More in this category — live from Magento", rendered entirely from the API. Prices on the cards are also repainted live (e.g. a card baked at $6.00 shows the live $5.50). The homepage works the same way: the Browse & Build shop grid, the downlight and strip grids and the quick-view popup all repaint their prices from the API, and a green "✓ Live pricing" line appears under the shop heading only once Magento has answered.


## Customer layout submissions (viewing plans before install)

When a customer finishes a plan in the layout app and hits **Send**, the app
posts the whole thing — their name and contact details, the light schedule,
a marked-up plan image, **and the full editable plan** — to
`/api/submit-layout`, a Netlify serverless function that stores it in
Netlify Blobs. Nothing to host or maintain; it deploys with the site.

**To view submissions (staff):** open `/layout-admin.html` on the deployed
site and enter the admin key. Every submission shows as a card — customer
name, suburb, fitting count, total, plan preview. From there:

- **Open in planner** — loads the customer's exact plan into the layout app
  so you can check and edit it before install (the link is
  `/layout-app/?load=<id>`; it asks for the admin key once per browser).
- **Details** — the full plan image, contact details and light schedule.
- **.ghlayout** — downloads the plan as a file the planner's Open button reads.
- **Delete** — removes a submission once it's dealt with.

**One-time setup on Netlify:** Site configuration → Environment variables →
add `ADMIN_KEY` with a value of your choosing (this is the staff password —
anyone with it can read submissions), then redeploy. Without it the admin
endpoints answer 503 and customer sends still fall back to the
download-and-email-it flow, so nothing is ever lost.

**Running locally:** `npm run dev` / `npm run preview` have no serverless
functions, so Send falls back to downloading the submission file — that's
expected. To exercise the real flow locally use `npx netlify dev`
(needs a linked Netlify site), or just test on a deploy preview.

**Live drafts:** you don't have to wait for a customer to hit Send. From the
moment they load a floor plan (or place lights), the app quietly saves a
snapshot to your side whenever something changes, and it shows in
`/layout-admin/` as an amber-dashed **In progress** card — thumbnail, light
and room counts, last-change time, and an "Open in planner" button so you
can watch the plan take shape. There are no contact details until they
Send. When they DO send, the draft disappears and the submission takes its
place with a **green outline and a ✓ Completed badge**. Drafts untouched
for 14 days clean themselves up.

The customer never needs an account: name + email or phone is all the Send
form asks for. Oversized plans are handled — the app shrinks the plan photo
and image before sending so submissions stay under the function's ~6 MB limit.

## Layout app usage stats + email when a plan arrives

**Usage stats (automatic):** the layout app sends an anonymous usage beacon —
sessions, how many lights/rooms people place, PDF/PNG/print clicks, sends.
No names and no plan content are collected; staff loads (`?load=`) and QA
runs (`?qa=1`) are excluded. The dashboard sits at the top of
`/layout-admin/`: visitors, sessions, plans sent and PDFs for the last
7 days, plus a daily breakdown and a "what they did" list of recent
sessions. Data is stored in Netlify Blobs (store `usage`), function
`netlify/functions/track.mjs`.

**Email notification (one-time setup on Netlify):** when a customer sends a
plan, the submit function also files a Netlify Forms entry
("plan-submission") with the customer's details and two direct links —
"view in admin" (opens that plan's details) and "open in planner" (loads it
for editing). To get that as an email:

1. Netlify → your project → **Forms** → turn ON **Enable form detection**.
2. Trigger a deploy (or push) so Netlify detects the `plan-submission` form.
3. Netlify → Forms → **plan-submission** → **Notifications** (Settings & 
   usage) → **Add notification → Email notification** → enter the email 
   address that should receive new-plan alerts.

From then on every customer send = one email with the links. The free tier
covers 100 form submissions a month — plenty for plan sends. If the email
ever fails, nothing is lost: the plan is already stored and visible in
/layout-admin/.
