/* Greenhse — Magento GraphQL integration
 *
 * Live price and stock on the static pages, plus a guest cart that hands off
 * to Magento's own checkout.
 *
 * Notes for whoever maintains this:
 *  - The site's product ids are NOT Magento SKUs. They're truncated to 18
 *    chars and upper-cased, and Magento's sku filter is case-sensitive, so a
 *    direct lookup fails for most products. sku-map.js holds the real mapping,
 *    derived from each product's original Magento url_key.
 *  - Entries with v:0 were matched by product name rather than url_key and
 *    have NOT been verified. Check those before trusting them.
 *  - Grouped products report a "from" price (the cheapest child), so they're
 *    rendered with a "from" prefix rather than a flat figure.
 */
(function () {
  'use strict';

  /* Same-origin path. Netlify rewrites /mag/* to greenhse.com server-side
     (see _redirects), so no CORS headers are needed on Magento. DIRECT is the
     fallback for anywhere the proxy isn't available - opening this file from
     disk, or a host without the rewrite. */
  var ENDPOINT = '/mag/graphql';
  var DIRECT   = 'https://greenhse.com/graphql';
  /* Always try the same-origin proxy first — Netlify provides it in
     production (_redirects), `npm run dev` provides it via next.config.js
     rewrites, and `npm run preview` via scripts/serve.js. The old hostname
     allow-list here forced DIRECT on localhost, where the browser's CORS
     policy blocks it — which is why local runs looked "not API connected".
     Only a file:// open (no server at all) goes DIRECT immediately;
     anywhere else the DIRECT fallback still kicks in automatically if the
     proxy is missing. */
  if (location.protocol === 'file:') {
    ENDPOINT = DIRECT;
  }

  /* Try the proxy; if it fails outright (404/502/network), fall back to calling
     Magento directly and remember that for the rest of the session. */
  var proxyDead = false;
  function fetchWithFallback(init) {
    var url = proxyDead ? DIRECT : ENDPOINT;
    return fetch(url, init).then(function (r) {
      if (!r.ok && !proxyDead && url !== DIRECT) {
        proxyDead = true;
        return fetch(DIRECT, init);
      }
      return r;
    }).catch(function (e) {
      if (!proxyDead && url !== DIRECT) { proxyDead = true; return fetch(DIRECT, init); }
      throw e;
    });
  }

  /* Read the SKU map lazily: with next/script the load order of sku-map.js
     and this file is not guaranteed, and capturing the map once at startup
     meant that when this file won the race, every lookup returned null and
     no Magento call was ever made — pages looked static. */
  function MAPNOW() { return window.GREENHSE_SKU_MAP || {}; }
  var cache = {};

  function skuFor(pid) {
    var e = MAPNOW()[pid];
    return e ? e.sku : null;
  }

  function gql(query, variables) {
    return fetchWithFallback({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query, variables: variables || {} })
    }).then(function (r) {
      if (!r.ok) throw new Error('Magento HTTP ' + r.status);
      return r.json();
    }).then(function (j) {
      if (j.errors && j.errors.length) throw new Error(j.errors[0].message);
      return j.data;
    });
  }

  var PRODUCT_QUERY =
    'query($s:[String]){products(filter:{sku:{in:$s}},pageSize:200){items{' +
    'sku name stock_status __typename ' +
    'price_range{minimum_price{final_price{value currency}}' +
    'maximum_price{final_price{value}}}' +
    /* Bulk breaks and cover/finish options live in Magento, so they are read
       from it rather than duplicated into 255 pages by hand. Grouped-product
       children are deliberately not requested: Magento hides them from the
       API when they are set "not visible individually", and it returns nulls
       rather than an error, which would look like a bug here. */
    'price_tiers{quantity final_price{value}}' +
    '... on CustomizableProductInterface{options{title required ' +
    '... on CustomizableDropDownOption{value{title price price_type}}}}' +
    '}}}';

  function fetchProducts(skus) {
    var need = skus.filter(function (s) { return s && !(s in cache); });
    if (!need.length) return Promise.resolve(cache);

    var batches = [];
    for (var i = 0; i < need.length; i += 50) batches.push(need.slice(i, i + 50));

    return Promise.all(batches.map(function (b) {
      return gql(PRODUCT_QUERY, { s: b }).catch(function () { return null; });
    })).then(function (results) {
      results.forEach(function (d) {
        if (!d || !d.products) return;
        d.products.items.forEach(function (it) {
          var min = it.price_range.minimum_price.final_price;
          var max = it.price_range.maximum_price.final_price;
          cache[it.sku] = {
            sku: it.sku,
            name: it.name,
            inStock: it.stock_status === 'IN_STOCK',
            price: min.value,
            priceMax: max.value,
            currency: min.currency,
            grouped: it.__typename === 'GroupedProduct' ||
                     it.__typename === 'ConfigurableProduct' ||
                     max.value > min.value,
            tiers: (it.price_tiers || []).slice().sort(function (a, b) {
              return a.quantity - b.quantity;
            }),
            options: (it.options || []).filter(function (o) {
              return o && o.value && o.value.length;
            })
          };
        });
      });
      return cache;
    });
  }

  function money(v) {
    return '$' + Number(v).toFixed(2);
  }

  /* ---- render into the page ------------------------------------------- */

  function paint() {
    var nodes = [].slice.call(document.querySelectorAll('[data-sku],[data-view],[data-add]'));
    if (!nodes.length) return;

    var wanted = {};
    nodes.forEach(function (n) {
      var pid = n.dataset.sku || n.dataset.view || n.dataset.add;
      var sku = skuFor(pid);
      if (sku) wanted[sku] = true;
    });

    var skus = Object.keys(wanted);
    if (!skus.length) return;

    fetchProducts(skus).then(function () {
      nodes.forEach(function (n) {
        var pid = n.dataset.sku || n.dataset.view || n.dataset.add;
        var sku = skuFor(pid);
        var p = sku && cache[sku];
        if (!p) return;

        /* Magento quotes ex-GST, which is how the site shows its headline
           figure; the inc-GST line beside it is that plus 10%. Both are
           replaced together so they can never disagree on screen. */
        var priceEl = n.querySelector('[data-price-target]');
        if (priceEl) {
          priceEl.textContent = (p.grouped ? 'From ' : '') + money(p.price);
        }

        var incEl = n.querySelector('[data-price-inc-target]');
        if (incEl) {
          incEl.textContent = money(p.price * 1.1);
        }

        /* Bulk breaks and options, written the way a customer reads them.
           The block stays hidden when Magento has neither, so a plain
           product does not gain an empty panel. */
        var optEl = n.querySelector('[data-options-target]') ||
                    document.querySelector('[data-options-target][data-for="' + pid + '"]');
        if (optEl) {
          var bits = '';
          (p.tiers || []).forEach(function (t) {
            bits += '<div class="lv-row"><span class="lv-k">Buy ' + t.quantity + '+</span>' +
                    '<b>' + money(t.final_price.value) + ' each</b>' +
                    '<span class="lv-x">ex GST</span></div>';
          });
          (p.options || []).forEach(function (o) {
            var vals = o.value.map(function (v) {
              var extra = v.price ? ' <em>+' + money(v.price) + '</em>' : '';
              return '<span class="lv-opt">' + v.title + extra + '</span>';
            }).join('');
            bits += '<div class="lv-row"><span class="lv-k">' + o.title + '</span>' +
                    '<span class="lv-vals">' + vals + '</span></div>';
          });
          if (bits) {
            optEl.innerHTML = '<div class="lv-head">Options &amp; bulk pricing</div>' + bits +
              '<div class="lv-note">Live from our stock system — call (08) 9297 2969 to order with options.</div>';
            optEl.hidden = false;
          } else {
            optEl.hidden = true;
          }
        }

        var stockEl = n.querySelector('[data-stock-target]');
        if (stockEl) {
          stockEl.textContent = p.inStock ? 'In stock' : 'Out of stock — call us';
          stockEl.dataset.inStock = String(p.inStock);
          stockEl.hidden = false;
        }
      });

      document.dispatchEvent(new CustomEvent('greenhse:prices', { detail: cache }));
    }).catch(function (e) {
      // Static prices stay on the page rather than showing an error.
      console.warn('Magento price fetch failed:', e.message);
    });
  }

  /* ---- guest cart ------------------------------------------------------ */

  var CART_KEY = 'greenhse_cart_id';

  function cartId() {
    try { return sessionStorage.getItem(CART_KEY); } catch (e) { return null; }
  }

  function setCartId(id) {
    try { sessionStorage.setItem(CART_KEY, id); } catch (e) {}
  }

  function ensureCart() {
    var id = cartId();
    if (id) return Promise.resolve(id);
    return gql('mutation{createEmptyCart}').then(function (d) {
      setCartId(d.createEmptyCart);
      return d.createEmptyCart;
    });
  }

  var ADD =
    'mutation($id:String!,$sku:String!,$qty:Float!){' +
    'addSimpleProductsToCart(input:{cart_id:$id,cart_items:[{data:{sku:$sku,quantity:$qty}}]})' +
    '{cart{total_quantity}}}';

  function addToCart(pid, qty) {
    var sku = skuFor(pid);
    if (!sku) return Promise.reject(new Error('No Magento SKU for ' + pid));
    return ensureCart().then(function (id) {
      return gql(ADD, { id: id, sku: sku, qty: qty || 1 });
    }).then(function (d) {
      var n = d.addSimpleProductsToCart.cart.total_quantity;
      document.dispatchEvent(new CustomEvent('greenhse:cart', { detail: { count: n } }));
      return n;
    });
  }

  function checkoutUrl() {
    // Magento's own checkout picks up the guest cart by id.
    var id = cartId();
    return id ? 'https://greenhse.com/checkout/cart/' : 'https://greenhse.com/checkout/';
  }

  /* ---- boot ------------------------------------------------------------ */

  function start() {
    paint();
    /* Belt and braces for script-order races: repaint once the sku map has
       definitely arrived, and again shortly after, so live Magento prices
       land no matter which script executed first. */
    setTimeout(paint, 400);
    setTimeout(paint, 1500);
    window.addEventListener('load', function () { paint(); });
    // Modal contents render after open, so repaint when the DOM changes.
    var modal = document.getElementById('modal');
    if (modal) {
      new MutationObserver(function () { paint(); })
        .observe(modal, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  window.GreenhseMagento = {
    gql: gql,
    skuFor: skuFor,
    fetchProducts: fetchProducts,
    paint: paint,
    addToCart: addToCart,
    ensureCart: ensureCart,
    checkoutUrl: checkoutUrl,
    cache: cache
  };
})();
