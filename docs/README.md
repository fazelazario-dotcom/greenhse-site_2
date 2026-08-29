# /docs — supplier spec sheets

The product pages and the Installation index link to `/docs/<file>.pdf`.

Right now those paths are **proxied** to the Magento media folder by this rule
in `_redirects`:

```
/docs/*  https://greenhse.com/media/sparsh/product_attachment/:splat  200
```

Status 200 means Netlify fetches the file server-side, so visitors just see a
normal PDF at `greenhse.com/docs/...`.

## Before the domain cutover — do one of these

**Option A — repoint the proxy.** When Magento moves to `mag.greenhse.com`,
change that one line to:

```
/docs/*  https://mag.greenhse.com/media/sparsh/product_attachment/:splat  200
```

**Option B — host the files here (better).** Copy the 117 PDFs into this
folder. Netlify serves a real file ahead of a rewrite rule, so they take over
automatically and the proxy becomes a fallback. This is the same reasoning
behind localising the product images: it removes the dependency on Magento
staying up at a particular hostname.

`spec-sheets.csv` in this folder lists every file, its title, and the products
that reference it. `fetch-spec-sheets.sh` downloads the lot.

## Do not rename these files

The filenames come from Magento and are referenced by 194 product pages plus
the Installation index. If one has to change, update `assets/../index.html`
(`SPECSHEETS`) and the `.specsheets` block on the product page together.
