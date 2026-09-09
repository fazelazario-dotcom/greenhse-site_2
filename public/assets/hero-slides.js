/* ============================================================
   Greenhse — rotating homepage hero (self-contained).

   Turns the big "Light done right." banner into a slideshow:
   slide 1 is always the hero exactly as designed, and extra
   slides — updates, new products, promos — come from a Magento
   CMS block, so the team adds and changes them in the admin
   they already use. No block (or a slow store) = the hero
   stays exactly as it is today and nothing moves.

   EDITING THE SLIDES (Magento admin → Content → Blocks):
     Identifier:  home-hero-slides   (exactly)
     Content, one slide after another:
       <h2>Slide title goes here</h2>
       <p>One or two lines of supporting text.</p>
       <p><a href="/products/">Button label</a></p>
     A heading starts a new slide; paragraphs under it become
     the text; the first link becomes the green button. Up to
     five extra slides.

   Everything lives in this one file (styles + behaviour) so it
   can be dropped into any build with a single script tag.
   Rotates every 7 s with a crossfade, pauses while hovered,
   dots to jump between slides, no auto-motion for visitors
   with reduced-motion set. Text-only rendering — CMS HTML is
   never injected raw.
   ============================================================ */
(function () {
  'use strict';

  var ENDPOINT = '/mag/graphql';        /* point at your GraphQL if hosted elsewhere */
  var BLOCK_ID = 'home-hero-slides';    /* Magento CMS block identifier */
  var ROTATE_MS = 7000;

  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function boot() {
    var hero = document.querySelector('.hero');
    var wrap = hero && hero.querySelector('.wrap');
    if (!hero || !wrap) return;

    var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : null;
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'query($id:[String]){cmsBlocks(identifiers:$id){items{identifier content}}}',
        variables: { id: [BLOCK_ID] }
      }),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) { return r.json(); })
      .then(function (j) {
        if (timer) clearTimeout(timer);
        var items = j && j.data && j.data.cmsBlocks && j.data.cmsBlocks.items;
        var slides = parse(items && items[0] && items[0].content);
        if (slides.length) start(hero, wrap, slides);
      })
      .catch(function () { if (timer) clearTimeout(timer); /* static hero stands */ });
  }

  /* headings start slides; paragraphs fill them; first link = button */
  function parse(html) {
    if (!html) return [];
    var doc;
    try { doc = new DOMParser().parseFromString(String(html), 'text/html'); }
    catch (e) { return []; }
    var out = [], cur = null;
    Array.prototype.slice.call(doc.body.children).forEach(function (n) {
      var tag = (n.tagName || '').toLowerCase();
      var text = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (/^h[1-4]$/.test(tag)) {
        if (cur && cur.title) out.push(cur);
        cur = { title: text.slice(0, 90), lede: '', cta: null };
        return;
      }
      if (!cur || !text) return;
      var a = n.querySelector && n.querySelector('a[href]');
      if (a && !cur.cta) {
        var h = a.getAttribute('href') || '';
        if (/^(https?:\/\/|\/|#)/i.test(h)) {
          cur.cta = { href: h, label: (a.textContent || 'See more').trim().slice(0, 40) };
          var rest = text.replace((a.textContent || '').trim(), '').trim();
          if (rest && cur.lede.length < 220) cur.lede += (cur.lede ? ' ' : '') + rest;
          return;
        }
      }
      if (cur.lede.length < 220) cur.lede += (cur.lede ? ' ' : '') + text;
    });
    if (cur && cur.title) out.push(cur);
    return out.slice(0, 5);
  }

  function start(hero, wrap, slides) {
    /* slide 0 is the hero as authored; CMS slides follow */
    var homeHTML = wrap.innerHTML;
    var total = slides.length + 1;
    var i = 0, hover = false, iv = null;

    var style = document.createElement('style');
    style.textContent =
      (reduced ? '' : '.hero .wrap{transition:opacity .45s ease}') +
      '.hero .wrap.gh-off{opacity:0}' +
      '.gh-dots{position:absolute;left:0;right:0;bottom:26px;display:flex;gap:9px;' +
        'justify-content:flex-start;max-width:1280px;margin:0 auto;padding:0 clamp(20px,5vw,64px);z-index:5}' +
      '.gh-dots button{width:26px;height:4px;border-radius:99px;border:0;padding:0;cursor:pointer;' +
        'background:rgba(255,255,255,.25);transition:background .25s}' +
      '.gh-dots button.on{background:#00e676}' +
      '.gh-dots button:hover{background:rgba(255,255,255,.55)}';
    hero.appendChild(style);

    var dots = document.createElement('div');
    dots.className = 'gh-dots';
    dots.setAttribute('role', 'tablist');
    dots.setAttribute('aria-label', 'Hero slides');
    for (var d = 0; d < total; d++) (function (d) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Slide ' + (d + 1));
      b.onclick = function () { go(d); restart(); };
      dots.appendChild(b);
    })(d);
    hero.appendChild(dots);

    function mark() {
      Array.prototype.forEach.call(dots.children, function (b, k) {
        b.classList.toggle('on', k === i);
      });
    }

    function renderSlide(s) {
      wrap.textContent = '';
      var eb = document.createElement('p');
      eb.className = 'eyebrow hero-eyebrow';
      eb.textContent = 'Update · Greenhse';
      var h = document.createElement('h1');
      var words = s.title.split(' ');
      if (words.length > 1) {
        h.appendChild(document.createTextNode(words.slice(0, -1).join(' ') + ' '));
        var lit = document.createElement('span');
        lit.className = 'lit';
        lit.textContent = words[words.length - 1];
        h.appendChild(lit);
      } else h.textContent = s.title;
      wrap.appendChild(eb); wrap.appendChild(h);
      if (s.lede) {
        var p = document.createElement('p');
        p.className = 'lede';
        p.textContent = s.lede;
        wrap.appendChild(p);
      }
      if (s.cta) {
        var cta = document.createElement('div');
        cta.className = 'hero-cta';
        var a = document.createElement('a');
        a.className = 'btn btn-primary';
        a.href = s.cta.href;
        a.innerHTML = '';
        a.appendChild(document.createTextNode(s.cta.label + ' '));
        a.insertAdjacentHTML('beforeend',
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
        cta.appendChild(a);
        wrap.appendChild(cta);
      }
    }

    function paint() {
      if (i === 0) wrap.innerHTML = homeHTML;
      else renderSlide(slides[i - 1]);
      mark();
    }

    function go(n) {
      i = ((n % total) + total) % total;
      if (reduced) { paint(); return; }
      wrap.classList.add('gh-off');
      setTimeout(function () { paint(); wrap.classList.remove('gh-off'); }, 460);
    }

    function tick() { if (!hover) go(i + 1); }
    function restart() {
      if (iv) clearInterval(iv);
      if (!reduced) iv = setInterval(tick, ROTATE_MS);
    }

    hero.addEventListener('mouseenter', function () { hover = true; });
    hero.addEventListener('mouseleave', function () { hover = false; });

    mark();
    restart();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
