/* Greenhse — category filter boxes.
 *
 * A category page can carry `filters` in data/site.json. Cat.jsx then renders
 * the boxes above the grid as BUTTONS (data-cat="wet") instead of jump links,
 * and stamps every card with data-cats="wet white". This file makes them work.
 *
 * Why filters rather than stacked sections: a strip is often genuinely in more
 * than one category — the 240V Pro is long run AND wet area AND white. With
 * stacked sections it would have to be printed on the page two or three times.
 * One grid plus filters shows it once and finds it under either heading.
 *
 * Nothing here is required for the page to work. With JS off, or if this file
 * fails to load, every card stays visible and the boxes do nothing — the page
 * is exactly the pre-built listing it has always been.
 */
(function () {
  'use strict';

  var nav = document.querySelector('[data-cat-filters]');
  if (!nav) return;
  var section = nav.closest('.range') || document;

  function cards() {
    return Array.prototype.slice.call(section.querySelectorAll('.grid > .card'));
  }
  function catsOf(el) {
    return (' ' + (el.getAttribute('data-cats') || '') + ' ');
  }

  /* Counts are written at run time rather than baked into the page, so a card
     added later (including one catalog.js appends live from Magento) is
     counted without anyone editing the JSON. */
  function label(n) { return n + (n === 1 ? ' product' : ' products'); }

  function recount() {
    var all = cards();
    Array.prototype.forEach.call(nav.querySelectorAll('[data-cat]'), function (b) {
      var id = b.getAttribute('data-cat');
      var n = id === 'all' ? all.length : all.filter(function (c) {
        return catsOf(c).indexOf(' ' + id + ' ') > -1;
      }).length;
      var out = b.querySelector('[data-cat-count]');
      if (out) out.textContent = label(n);
      /* A category with nothing in it is shown but visibly inert, rather than
         silently disappearing — an empty group is usually a data gap someone
         needs to see, not something to hide. */
      b.disabled = n === 0;
      b.style.opacity = n === 0 ? '.45' : '';
    });
  }

  function apply(id) {
    var any = false;
    cards().forEach(function (c) {
      var show = id === 'all' || catsOf(c).indexOf(' ' + id + ' ') > -1;
      c.style.display = show ? '' : 'none';
      if (show) any = true;
    });

    /* Hide any section left with nothing showing, heading and all — including
       the "live from Magento" block catalog.js appends, whose cards carry no
       categories and so belong only to All. */
    Array.prototype.forEach.call(section.querySelectorAll('.range__section'), function (sec) {
      var visible = Array.prototype.slice.call(sec.querySelectorAll('.grid > .card'))
        .some(function (c) { return c.style.display !== 'none'; });
      sec.style.display = visible ? '' : 'none';
    });

    Array.prototype.forEach.call(nav.querySelectorAll('[data-cat]'), function (b) {
      var on = b.getAttribute('data-cat') === id;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-on', on);
    });

    if (!any) apply('all');
  }

  nav.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-cat]') : null;
    if (!b || b.disabled) return;
    apply(b.getAttribute('data-cat'));
    var top = nav.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });

  recount();
  apply('all');

  /* catalog.js appends live products after its fetch resolves; re-count then
     so the All box reflects what is actually on the page. */
  document.addEventListener('greenhse:catalog', recount);
})();
