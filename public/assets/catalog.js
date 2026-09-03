/* Greenhse — LIVE category listings from Magento.
 *
 * Every category page carries its curated, pre-built product grid so the page
 * renders instantly (and still works if Magento is down). This file then makes
 * the listing genuinely backend-driven: on load it asks Magento GraphQL for
 * the category's CURRENT product list and
 *
 *   1. shows a "Live catalogue" line naming how many products the backend
 *      returned — proof on the page itself that the data came from the API;
 *   2. appends any product Magento has in the category that the pre-built
 *      grid doesn't show, as live-rendered cards (name, photo, price and
 *      stock straight from the API response) — so a product added in Magento
 *      appears on the site WITHOUT a rebuild.
 *
 * The category is identified by its Magento url_key, stamped on the page as
 * <section class="range" data-live-category="..."> by components/Cat.jsx.
 * Product links resolve through catalog-map.js (url_key -> local page).
 * Endpoint strategy matches magento.js: same-origin /mag/graphql proxy first
 * (Netlify _redirects, dev rewrites, preview server), direct as fallback.
 */
(function () {
  'use strict';

  var ENDPOINT = '/mag/graphql';
  var DIRECT = 'https://greenhse.com/graphql';
  if (location.protocol === 'file:') ENDPOINT = DIRECT;

  var section = document.querySelector('[data-live-category]');
  if (!section) return;
  var urlKey = section.getAttribute('data-live-category');
  if (!urlKey) return;

  function gql(query) {
    var init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    };
    return fetch(ENDPOINT, init).then(function (r) {
      if (!r.ok && ENDPOINT !== DIRECT) return fetch(DIRECT, init);
      return r;
    }).catch(function () {
      if (ENDPOINT !== DIRECT) return fetch(DIRECT, init);
      throw new Error('unreachable');
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (j) {
      if (j.errors && j.errors.length) throw new Error(j.errors[0].message);
      return j.data;
    });
  }

  var QUERY =
    '{categories(filters:{url_key:{eq:' + JSON.stringify(urlKey) + '}}){items{' +
    'name product_count ' +
    'products(pageSize:100,sort:{position:ASC}){items{' +
    'sku name url_key stock_status __typename ' +
    'price_range{minimum_price{final_price{value currency}}maximum_price{final_price{value}}}' +
    'small_image{url}}}}}}';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function money(v) { return '$' + Number(v).toFixed(2); }

  /* url_keys of the products the pre-built grid already shows, read off the
     card links themselves — /products/.../dl03-4kit-1/ -> dl03-4kit-1 */
  function bakedKeys() {
    var keys = {};
    section.querySelectorAll('.grid a.card[href]').forEach(function (a) {
      var parts = a.getAttribute('href').split('#')[0].split('/').filter(Boolean);
      if (parts.length) keys[parts[parts.length - 1]] = true;
    });
    return keys;
  }

  function cardHTML(p) {
    var map = window.GREENHSE_CATALOG_MAP || {};
    var local = map[p.url_key] || null;
    var min = p.price_range.minimum_price.final_price;
    var max = p.price_range.maximum_price.final_price;
    var from = (p.__typename === 'GroupedProduct' || p.__typename === 'ConfigurableProduct' || max.value > min.value);
    var img = p.small_image && p.small_image.url ? p.small_image.url : '';
    var out = p.stock_status !== 'IN_STOCK';
    var body =
      '<div class="card__tile"><div class="visual visual--photo">' +
      (img ? '<img src="' + esc(img) + '" alt="' + esc(p.name) + '" loading="lazy">' : '') +
      '</div></div>' +
      '<div class="card__body">' +
      '<span class="eyebrow">Live from our stock system</span>' +
      '<span class="card__title">' + esc(p.name) + '</span>' +
      '<div class="card__foot"><div class="card__price">' +
      '<span class="card__amount">' + (from ? 'From ' : '') + money(min.value) + '</span>' +
      '<span class="card__gst">' + (out ? 'out of stock' : 'ex GST') + '</span>' +
      '</div>' +
      (local
        ? '<span class="btn card__quote card__quote--call">View →</span>'
        : (out
          ? '<span class="btn card__quote card__quote--call" style="opacity:.55">Out of stock</span>'
          : '<button type="button" class="btn card__quote card__quote--call" data-live-add="' + esc(p.sku) + '"' +
            ' data-live-name="' + esc(p.name) + '" data-live-price="' + min.value + '">Add to cart</button>')) +
      '</div></div>';
    return local
      ? '<a class="card" href="' + esc(local) + '">' + body + '</a>'
      : '<div class="card">' + body + '</div>';
  }

  /* API-only cards have no product page, so their button adds straight to
     the shared cart (assets/cart.js) - line id = the Magento sku, which
     skuFor passes through at checkout. */
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-live-add]') : null;
    if (!b || !window.GreenhseCart) return;
    window.GreenhseCart.add(b.getAttribute('data-live-add'), b.getAttribute('data-live-name'),
      +b.getAttribute('data-live-price') || 0, 1);
    var was = b.textContent; b.textContent = '✓ Added'; b.disabled = true;
    setTimeout(function () { b.textContent = was; b.disabled = false; }, 900);
  });

  function run() {
    gql(QUERY).then(function (d) {
      var items = (d.categories && d.categories.items) || [];
      if (!items.length) return;
      var cat = items[0];
      var products = (cat.products && cat.products.items) || [];

      /* the on-page proof: this line only renders from a successful
         Magento response, and names what the backend returned */
      var head = section.querySelector('.range__copy');
      if (head && !head.querySelector('.range__live')) {
        var live = document.createElement('p');
        live.className = 'range__live';
        live.textContent = '✓ Live catalogue — ' + products.length +
          ' product' + (products.length === 1 ? '' : 's') +
          ' synced from our stock system (' + cat.name + ')';
        head.appendChild(live);
      }

      /* products Magento lists for this category that the pre-built page
         doesn't carry -> rendered entirely from the API response */
      var have = bakedKeys();
      var extra = products.filter(function (p) { return p.url_key && !have[p.url_key]; });
      if (extra.length && !section.querySelector('.range__section--live')) {
        var div = document.createElement('div');
        div.className = 'range__section range__section--live';
        div.innerHTML =
          '<div class="range__head range__head--sub"><div class="range__copy">' +
          '<h3 class="range__title range__title--sub">More in this category — live from Magento</h3>' +
          '<p class="range__sub">These ' + (extra.length === 1 ? 'is 1 product' : 'are ' + extra.length + ' products') +
          ' our stock system lists here that the page above doesn’t — rendered straight from the API response.</p>' +
          '</div></div>' +
          '<div class="grid">' + extra.map(cardHTML).join('') + '</div>';
        var container = section.querySelector('.container');
        if (container) container.appendChild(div);
      }

      document.dispatchEvent(new CustomEvent('greenhse:catalog', {
        detail: { urlKey: urlKey, total: products.length, appended: extra.length }
      }));
    }).catch(function (e) {
      // The pre-built listing stays; live layer just doesn't decorate it.
      console.warn('Live catalogue fetch failed:', e.message);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
