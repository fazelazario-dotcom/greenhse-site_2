/* Greenhse — product image gallery.
 *
 * Progressive enhancement: the page ships with the main photo already in the
 * HTML (so it shows without JavaScript and search engines still index it).
 * This adds the thumbnail strip, switching, and a lightbox on top.
 */
(function () {
  'use strict';

  function init(root) {
    var main = root.querySelector('.pg-main img');
    var thumbs = [].slice.call(root.querySelectorAll('.pg-thumb'));
    if (!main || thumbs.length < 2) return;

    var shots = thumbs.map(function (t) {
      return { full: t.getAttribute('data-full'), alt: t.getAttribute('data-alt') || main.alt };
    });
    var at = 0;
    var counter = root.querySelector('.pg-count');

    function show(i, focusThumb) {
      at = (i + shots.length) % shots.length;
      main.src = shots[at].full;
      main.alt = shots[at].alt;
      thumbs.forEach(function (t, n) { t.setAttribute('aria-current', n === at ? 'true' : 'false'); });
      if (counter) counter.textContent = (at + 1) + ' / ' + shots.length;
      if (focusThumb) thumbs[at].focus();
      if (lb.classList.contains('open')) paintLb();
    }

    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      /* Left/right arrows walk the strip, the way a gallery is expected to
         behave once a thumbnail has focus. */
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1, true); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); show(at - 1, true); }
      });
    });

    /* ---- lightbox ---- */
    var lb = document.createElement('div');
    lb.className = 'pg-lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Product images');
    lb.innerHTML =
      '<button class="pg-x" aria-label="Close">&times;</button>' +
      '<button class="pg-prev" aria-label="Previous image">&#8249;</button>' +
      '<button class="pg-next" aria-label="Next image">&#8250;</button>' +
      '<img alt=""><div class="pg-cap"></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.pg-cap');
    var lastFocus = null;

    function paintLb() {
      lbImg.src = shots[at].full;
      lbImg.alt = shots[at].alt;
      lbCap.textContent = (at + 1) + ' of ' + shots.length + ' — press Esc to close';
    }
    function open() {
      lastFocus = document.activeElement;
      paintLb(); lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.pg-x').focus();
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    root.querySelector('.pg-main').addEventListener('click', open);
    lb.querySelector('.pg-x').addEventListener('click', close);
    lb.querySelector('.pg-prev').addEventListener('click', function () { show(at - 1); });
    lb.querySelector('.pg-next').addEventListener('click', function () { show(at + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(at + 1);
      if (e.key === 'ArrowLeft') show(at - 1);
    });

    show(0);
  }

  function start() {
    document.querySelectorAll('.pdp-gallery').forEach(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
