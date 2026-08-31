/* Greenhse — URL sync for product modals
 *
 * The site's JS runs inside an IIFE, so its functions aren't reachable here,
 * and a modal can be opened from at least five different places (product card,
 * kit parts list, "add" on a product with options, channel picker, related
 * products inside the modal itself).
 *
 * Rather than depend on catching the right click or the right DOM mutation,
 * this polls the modal a few times a second and mirrors whatever product is
 * currently showing. Reading two attributes on a 4Hz timer costs nothing and
 * it can't miss a path.
 *
 * The main add-to-cart button carries data-frommodal, which distinguishes it
 * from the related-product tiles further down the modal.
 */
(function () {
  var MAP = window.GREENHSE_PRODUCT_URLS || {};
  var homeUrl = location.pathname + location.search + location.hash;
  var openId = null;
  var modal = null;

  function isOpen() {
    return !!modal && modal.classList.contains('open');
  }

  function currentId() {
    if (!modal) return null;
    // The primary button for the product the modal is actually showing.
    var el = modal.querySelector('[data-add][data-frommodal]');
    if (el && el.dataset.add) return el.dataset.add;
    // Fallbacks, in order of reliability.
    el = modal.querySelector('[data-wish]');
    if (el && el.dataset.wish) return el.dataset.wish;
    el = modal.querySelector('[data-add]');
    return el ? el.dataset.add : null;
  }

  function apply() {
    if (!isOpen()) {
      if (openId !== null) {
        openId = null;
        try { history.replaceState({}, '', homeUrl); } catch (e) {}
      }
      return;
    }

    var id = currentId();
    if (!id || id === openId) return;

    var url = MAP[id];
    if (!url) return;   // unmapped product — leave the URL alone

    if (openId === null) {
      // Remember where we were so closing returns there.
      homeUrl = location.pathname + location.search + location.hash;
      try { history.pushState({ pid: id }, '', url); } catch (e) {}
    } else {
      // Switching product inside an open modal shouldn't stack history entries.
      try { history.replaceState({ pid: id }, '', url); } catch (e) {}
    }
    openId = id;
  }

  function start() {
    modal = document.getElementById('modal');
    if (!modal) return;

    // Poll: catches every way the modal can change, regardless of timing.
    setInterval(apply, 250);

    // Observer too, so the common case updates instantly rather than up to
    // 250ms later.
    new MutationObserver(apply).observe(modal, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true
    });

    // Back button closes the modal instead of leaving the site.
    window.addEventListener('popstate', function () {
      if (openId !== null && isOpen()) {
        openId = null;
        modal.classList.remove('open');
        modal.classList.remove('over-wiz');
      }
    });

    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
