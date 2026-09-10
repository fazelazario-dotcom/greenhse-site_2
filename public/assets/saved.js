/* Greenhse — save for later (the heart on a product card).
 *
 * Shares the homepage's list, key `gh_wish` in localStorage, so a heart
 * clicked on a category page lights up the heart and the counter on the
 * homepage and vice versa. The list holds SKUs; nothing else is stored.
 *
 * The heart sits inside the card's own link, so the click has to be caught
 * and stopped or the browser follows the card instead of saving.
 *
 * localStorage can be unavailable (private windows, blocked site data), so
 * every read and write is guarded. If it fails the heart simply doesn't
 * persist — the page still works.
 */
(function () {
  'use strict';

  var KEY = 'gh_wish';

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(v) ? v.filter(function (x) { return typeof x === 'string' && x; }) : [];
    } catch (e) { return []; }
  }
  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }

  function paint() {
    var have = read();
    document.querySelectorAll('[data-wish]').forEach(function (el) {
      var on = have.indexOf(el.getAttribute('data-wish')) > -1;
      el.classList.toggle('card__wishlist--active', on);
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function toggle(sku) {
    var list = read();
    var i = list.indexOf(sku);
    if (i > -1) list.splice(i, 1); else list.push(sku);
    write(list);
    paint();
  }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-wish]') : null;
    if (!el) return;
    /* the card around it is a link — don't navigate */
    e.preventDefault();
    e.stopPropagation();
    toggle(el.getAttribute('data-wish'));
  });

  /* the heart is a span-with-role inside a link, so give it the keyboard
     behaviour a button would have had */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target && e.target.closest ? e.target.closest('[data-wish]') : null;
    if (!el) return;
    e.preventDefault();
    toggle(el.getAttribute('data-wish'));
  });

  paint();
})();
