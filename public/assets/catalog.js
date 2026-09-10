/* Greenhse — live-catalogue check on category pages.
 *
 * Every category page ships its own product grid, built at deploy time, so it
 * renders instantly and still works when the store is slow or down.
 *
 * This file asks Magento GraphQL for the category at page load and, if the
 * store answers, adds the small green "Live catalogue" line under the heading.
 * That line can only appear from a real API response, so it is proof on the
 * page itself that the site is talking to the live store — the same idea as
 * "Live pricing" on the homepage. Prices themselves are painted over the cards
 * by assets/magento.js, which is a separate file.
 *
 * WHAT THIS DOES NOT DO ANY MORE (owner's call, round 34): it used to append
 * every product Magento listed in the category that the page didn't already
 * show, under a heading of its own further down the page.
 * In practice that surfaced the store's own category assignments to customers
 * — strip lights appearing under Smart Lights and Commercial Lighting, and the
 * same product listed twice under two different names. Category pages now show
 * exactly the products we put on them, and nothing else. A product added in
 * Magento appears here once it is added to the page.
 *
 * The category is identified by its Magento url_key, stamped on the page as
 * <section class="range" data-live-category="..."> by components/Cat.jsx.
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

  /* Only what the proof line needs — the category's name. Asking for the
     product list as well would fetch a payload nothing on the page reads. */
  var QUERY =
    '{categories(filters:{url_key:{eq:' + JSON.stringify(urlKey) + '}}){items{' +
    'name product_count}}}';

  function run() {
    gql(QUERY).then(function (d) {
      var items = (d.categories && d.categories.items) || [];
      if (!items.length) return;
      var cat = items[0];

      var head = section.querySelector('.range__copy');
      if (head && !head.querySelector('.range__live')) {
        var live = document.createElement('p');
        live.className = 'range__live';
        live.textContent = '✓ Live catalogue — prices and stock read from our system just now (' +
          cat.name + ')';
        head.appendChild(live);
      }

      document.dispatchEvent(new CustomEvent('greenhse:catalog', {
        detail: { urlKey: urlKey, name: cat.name }
      }));
    }).catch(function (e) {
      // The page's own listing stays; the live line just doesn't appear.
      console.warn('Live catalogue check failed:', e.message);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
