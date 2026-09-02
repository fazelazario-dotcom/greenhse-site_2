/* Greenhse — Light Lab
 *
 * A gallery of real jobs, each shown as a before/after wipe so a customer can
 * see what the lighting actually changed, plus the fittings that did it.
 *
 * ── HOW TO ADD A JOB ──────────────────────────────────────────────────────
 * Add an object to PROJECTS below. Only `title`, `after` and `room` are
 * required. Set `demo:false` (or delete the line) once it is a genuine job
 * with your own photos — demo entries carry an "Example" badge on the page.
 *
 *   {
 *     title:   'Kitchen and scullery, Ellenbrook',
 *     room:    'residential',           // residential | commercial | outdoor
 *     before:  '/img/jobs/ellenbrook-before.jpg',   // optional
 *     after:   '/img/jobs/ellenbrook-after.jpg',
 *     summary: 'One sentence on what the lighting had to fix.',
 *     fitted:  [ {name:'90mm 8W Downlight', qty:14, url:'/products/…html'} ],
 *     numbers: [ {label:'Old load', value:'600 W'}, {label:'New load', value:'112 W'} ],
 *     demo:    false
 *   }
 *
 * Photograph tip: stand in the same spot for both shots, same time of day,
 * same phone. The wipe only reads properly when the framing matches.
 * ──────────────────────────────────────────────────────────────────────── */

var LIGHTLAB_PROJECTS = [
  {
    title: 'Curved reception desk, commercial fit-out',
    room: 'commercial',
    after: '/img/gallery/24vstrip-channels-new-2.webp',
    summary: 'Continuous strip in an aluminium channel follows the curve of the joinery, so the desk reads as one clean line of light instead of a row of spots.',
    fitted: [
      { name: '24V Strip Channel Options', qty: 1, url: '/lighting-perth/led-strip-lights/24vstrip-channels-new/' },
      { name: '24V COB Strip, 9W/15W CCT', qty: 1, url: '/products/lighting-perth/led-strip-lights/st24v-9w-15w-cct-cob-1/' }
    ],
    demo: true
  },
  {
    title: 'Open-plan office, linear suspension',
    room: 'commercial',
    after: '/img/gallery/black-linear-modular-light-12.webp',
    summary: 'Suspended linear runs above the desk line give even light across the floor with no glare in the screens.',
    fitted: [
      { name: 'Black Linear Modular Lighting System', qty: 8, url: '/lighting-perth/led-strip-lights/black-linear-modular-light/' }
    ],
    demo: true
  },
  {
    title: 'Kitchen, under-cabinet and toe-kick',
    room: 'residential',
    after: '/img/gallery/24vstrip-channels-new-7.webp',
    summary: 'Strip under the overheads puts light on the bench instead of on the cook’s shoulders — the fix for working in your own shadow.',
    fitted: [
      { name: '24V SMD Strip', qty: 1, url: '/products/lighting-perth/led-strip-lights/st24v-smd-all/' },
      { name: '24V Transformer', qty: 1, url: '/products/lighting-perth/led-strip-lights/tr24v-all/' }
    ],
    demo: true
  },
  {
    title: 'Stair flight, recessed strip',
    room: 'residential',
    after: '/img/gallery/st24v-smd-all-3.webp',
    summary: 'Strip set into the stringer lights the tread, not the eye — safe to walk at night without lighting the whole void.',
    fitted: [
      { name: '24V SMD Strip', qty: 1, url: '/products/lighting-perth/led-strip-lights/st24v-smd-all/' }
    ],
    demo: true
  },
  {
    title: 'Retail floor, high-output linear',
    room: 'commercial',
    after: '/img/gallery/black-linear-modular-light-1.webp',
    summary: 'Continuous rows down the aisles keep product lit evenly to the bottom shelf.',
    fitted: [
      { name: 'Black Linear Modular Lighting System', qty: 24, url: '/lighting-perth/led-strip-lights/black-linear-modular-light/' }
    ],
    demo: true
  },
  {
    title: 'Feature ceiling, RGB colour change',
    room: 'commercial',
    after: '/img/gallery/st240v-rgb-2.webp',
    summary: 'RGB strip in the ceiling coffers — warm white for trade, colour for events, from the same fitting.',
    fitted: [
      { name: '240V RGB LED Strip Light', qty: 1, url: '/products/lighting-perth/led-strip-lights/st240v-rgb/' },
      { name: 'RGB Controller', qty: 1, url: '/products/lighting-perth/led-strip-lights/rgb-ctrlr-037/' }
    ],
    demo: true
  }
];

(function () {
  'use strict';
  var PLACEHOLDER = '/img/gallery/_before-placeholder.webp';
  var grid, filterBar, active = 'all';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function card(p, i) {
    var before = p.before || PLACEHOLDER;
    var fitted = (p.fitted || []).map(function (f) {
      var label = (f.qty ? f.qty + ' × ' : '') + esc(f.name);
      return f.url ? '<a href="' + esc(f.url) + '">' + label + '</a>'
                   : '<span>' + label + '</span>';
    }).join('');
    var nums = (p.numbers || []).map(function (n) {
      return '<div class="ll-num"><span class="k">' + esc(n.label) + '</span>' +
             '<b>' + esc(n.value) + '</b></div>';
    }).join('');
    return '' +
      '<article class="ll-card" data-room="' + esc(p.room || 'other') + '">' +
        (p.demo ? '<span class="ll-demo" title="Placeholder — swap in a real job">Example</span>' : '') +
        '<div class="ll-wipe" data-wipe="' + i + '">' +
          '<img class="ll-after" src="' + esc(p.after) + '" alt="' + esc(p.title) + ' — after">' +
          '<div class="ll-beforewrap"><img class="ll-before" src="' + esc(before) + '" alt="' + esc(p.title) + ' — before"></div>' +
          '<span class="ll-tag ll-tag-b">Before</span><span class="ll-tag ll-tag-a">After</span>' +
          '<input class="ll-range" type="range" min="0" max="100" value="50" ' +
            'aria-label="Reveal before and after for ' + esc(p.title) + '">' +
          '<span class="ll-handle" aria-hidden="true"></span>' +
        '</div>' +
        '<div class="ll-body">' +
          '<h3>' + esc(p.title) + '</h3>' +
          (p.summary ? '<p>' + esc(p.summary) + '</p>' : '') +
          (nums ? '<div class="ll-nums">' + nums + '</div>' : '') +
          (fitted ? '<div class="ll-fitted"><span class="ll-lab">What went in</span>' + fitted + '</div>' : '') +
        '</div>' +
      '</article>';
  }

  /* The wipe is driven by a real range input: it drags with the mouse, works
     on touch, and takes arrow keys for anyone using a keyboard — all without
     writing a custom drag handler. */
  function wire(el) {
    var range = el.querySelector('.ll-range');
    var wrap = el.querySelector('.ll-beforewrap');
    var handle = el.querySelector('.ll-handle');
    function paint() {
      var v = Number(range.value);
      wrap.style.width = v + '%';
      handle.style.left = v + '%';
    }
    range.addEventListener('input', paint);
    paint();
  }

  function render() {
    var list = LIGHTLAB_PROJECTS.filter(function (p) {
      return active === 'all' || (p.room || 'other') === active;
    });
    grid.innerHTML = list.length
      ? list.map(card).join('')
      : '<p class="ll-empty">No jobs in this category yet.</p>';
    grid.querySelectorAll('.ll-wipe').forEach(wire);
  }

  function start() {
    grid = document.getElementById('ll-grid');
    filterBar = document.getElementById('ll-filters');
    if (!grid) return;
    if (filterBar) {
      filterBar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-room-filter]');
        if (!b) return;
        active = b.getAttribute('data-room-filter');
        filterBar.querySelectorAll('[data-room-filter]').forEach(function (x) {
          x.setAttribute('aria-pressed', String(x === b));
        });
        render();
      });
    }
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
