/* ============================================================
   Greenhse — rotating homepage banner (self-contained).

   The big hero becomes a slideshow of FULL banners. Slide 1 is
   the site's own "Light done right." banner, untouched. Every
   update after it is a banner in its own right — its own photo
   behind it, its own heading, text and button — sliding across
   one after the other.

   ADDING / CHANGING BANNERS (Magento admin → Content → Blocks):
     Identifier:  home-hero-slides     (exactly)
     Then, per banner, in the editor:
        <h2>New 24V channel range in store</h2>
        [Insert Image  →  the photo for this banner]
        <p>One or two lines of supporting text.</p>
        <p><a href="/products/">Button label</a></p>
     A heading starts a new banner. The first image in that
     block becomes its background, the first link becomes the
     green button. Up to five update banners; delete a heading
     block to remove that banner.

   No block, empty block, or a store that doesn't answer = the
   homepage keeps its normal single banner and nothing moves.

   Everything (styles + behaviour) lives in this one file, so it
   drops into any build with a single script tag. Slides every
   7 s, pauses while hovered, dots to jump, arrow keys work, and
   no auto-motion for visitors who ask for reduced motion.
   ============================================================ */
(function () {
  'use strict';

  var ENDPOINT   = '/mag/graphql';                 /* point at your GraphQL if hosted elsewhere */
  var BLOCK_ID   = 'home-hero-slides';             /* Magento CMS block identifier */
  var MEDIA_BASE = 'https://greenhse.com/media/';  /* for {{media url=...}} in block content */
  var ROTATE_MS  = 7000;
  var MAX_SLIDES = 5;

  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---- helpers ---- */
  function mediaUrl(u) {
    if (!u) return null;
    u = String(u);
    var m = u.match(/\{\{media\s+url=["']?([^"'}\s]+)["']?\s*\}\}/i);
    if (m) return MEDIA_BASE + m[1].replace(/^\/+/, '');
    if (/^https?:\/\//i.test(u) || u.charAt(0) === '/') return u;
    return null;
  }
  function safeHref(h) {
    h = String(h || '');
    return /^(https?:\/\/|\/|#)/i.test(h) ? h : null;
  }

  /* ---- read the CMS block into banners ---- *
   * heading starts a banner · first <img> = background photo ·
   * first <a> = button · remaining text = the line under it.   */
  function parse(html) {
    if (!html) return [];
    var doc;
    try { doc = new DOMParser().parseFromString(String(html), 'text/html'); }
    catch (e) { return []; }

    var out = [], cur = null;
    Array.prototype.slice.call(doc.body.children).forEach(function (n) {
      var tag = (n.tagName || '').toLowerCase();

      if (/^h[1-4]$/.test(tag)) {
        if (cur && cur.title) out.push(cur);
        cur = { title: (n.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 90),
                lede: '', cta: null, bg: null };
        return;
      }
      if (!cur) return;

      var img = tag === 'img' ? n : (n.querySelector && n.querySelector('img'));
      if (img && !cur.bg) cur.bg = mediaUrl(img.getAttribute('src'));

      var a = tag === 'a' ? n : (n.querySelector && n.querySelector('a[href]'));
      if (a && !cur.cta) {
        var href = safeHref(a.getAttribute('href'));
        if (href) {
          cur.cta = { href: href, label: (a.textContent || 'See more').replace(/\s+/g, ' ').trim().slice(0, 40) };
          var rest = (n.textContent || '').replace(a.textContent || '', '').replace(/\s+/g, ' ').trim();
          if (rest && cur.lede.length < 220) cur.lede += (cur.lede ? ' ' : '') + rest;
          return;
        }
      }

      var text = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (text && cur.lede.length < 220) cur.lede += (cur.lede ? ' ' : '') + text;
    });
    if (cur && cur.title) out.push(cur);
    return out.slice(0, MAX_SLIDES);
  }

  /* ---- one update banner ---- */
  function panelFor(s) {
    var p = document.createElement('div');
    p.className = 'ghs-panel';

    if (s.bg) {
      var bg = document.createElement('div');
      bg.className = 'ghs-bg';
      p.appendChild(bg);
      /* Paint the photo only once it has actually arrived — a slow
         store then costs a plain green banner, never a broken one. */
      var probe = new Image();
      probe.onload = function () {
        bg.style.backgroundImage = 'url("' + s.bg + '")';
        bg.classList.add('in');
      };
      probe.src = s.bg;
      var scrim = document.createElement('div');
      scrim.className = 'ghs-scrim';
      p.appendChild(scrim);
    }

    var wrap = document.createElement('div');
    wrap.className = 'wrap';

    var eb = document.createElement('p');
    eb.className = 'eyebrow hero-eyebrow';
    eb.textContent = 'Update · Greenhse';
    wrap.appendChild(eb);

    var h = document.createElement('h1');
    var words = s.title.split(' ');
    if (words.length > 1) {
      h.appendChild(document.createTextNode(words.slice(0, -1).join(' ') + ' '));
      var lit = document.createElement('span');
      lit.className = 'lit';
      lit.textContent = words[words.length - 1];
      h.appendChild(lit);
    } else h.textContent = s.title;
    wrap.appendChild(h);

    if (s.lede) {
      var l = document.createElement('p');
      l.className = 'lede';
      l.textContent = s.lede;
      wrap.appendChild(l);
    }
    if (s.cta) {
      var cta = document.createElement('div');
      cta.className = 'hero-cta';
      var a = document.createElement('a');
      a.className = 'btn btn-primary';
      a.href = s.cta.href;
      a.appendChild(document.createTextNode(s.cta.label + ' '));
      a.insertAdjacentHTML('beforeend',
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
      cta.appendChild(a);
      wrap.appendChild(cta);
    }

    p.appendChild(wrap);
    return p;
  }

  var CSS =
    '.ghs-track{position:absolute;inset:0;z-index:2;overflow:hidden}' +
    '.ghs-panel{position:absolute;inset:0;display:flex;align-items:center;' +
      'transform:translateX(100%);' + (reduced ? '' : 'transition:transform .62s cubic-bezier(.4,0,.2,1);') +
      'will-change:transform;background:linear-gradient(115deg,#0c1a10 0%,#123a1e 100%)}' +
    '.ghs-panel.ghs-home{background:none;transform:translateX(0)}' +
    '.ghs-panel .wrap{position:relative;z-index:3;width:100%;padding-top:60px;padding-bottom:60px}' +
    '.ghs-bg{position:absolute;inset:0;background-size:cover;background-position:center;' +
      'opacity:0;transition:opacity .5s ease;z-index:0}' +
    '.ghs-bg.in{opacity:1}' +
    '.ghs-scrim{position:absolute;inset:0;z-index:1;background:' +
      'linear-gradient(90deg,rgba(8,12,9,.93) 0%,rgba(8,12,9,.78) 42%,rgba(8,12,9,.30) 100%)}' +
    '.ghs-dots{position:absolute;left:0;right:0;bottom:26px;z-index:6;display:flex;gap:9px;' +
      'max-width:var(--maxw,1280px);margin:0 auto;padding:0 28px}' +
    '.ghs-dots button{width:28px;height:4px;border-radius:99px;border:0;padding:0;cursor:pointer;' +
      'background:rgba(255,255,255,.28);transition:background .25s}' +
    '.ghs-dots button.on{background:#00e676}' +
    '.ghs-dots button:hover{background:rgba(255,255,255,.6)}' +
    '@media(max-width:700px){.ghs-scrim{background:rgba(8,12,9,.82)}}';

  function build(hero, wrap, slides) {
    var style = document.createElement('style');
    style.textContent = CSS;
    hero.appendChild(style);

    var track = document.createElement('div');
    track.className = 'ghs-track';
    hero.insertBefore(track, wrap);

    /* Banner 1 = the site's own hero, moved in as-is so its text,
       buttons and styling stay exactly what the designer wrote. */
    var home = document.createElement('div');
    home.className = 'ghs-panel ghs-home';
    home.appendChild(wrap);
    track.appendChild(home);

    var panels = [home];
    slides.forEach(function (s) {
      var p = panelFor(s);
      track.appendChild(p);
      panels.push(p);
    });

    var total = panels.length, i = 0, hover = false, iv = null;

    var dots = document.createElement('div');
    dots.className = 'ghs-dots';
    dots.setAttribute('role', 'tablist');
    dots.setAttribute('aria-label', 'Banners');
    panels.forEach(function (_, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Banner ' + (k + 1));
      b.onclick = function () { go(k); restart(); };
      dots.appendChild(b);
    });
    hero.appendChild(dots);

    function mark() {
      Array.prototype.forEach.call(dots.children, function (b, k) {
        b.classList.toggle('on', k === i);
      });
      panels.forEach(function (p, k) { p.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
    }

    /* Slide across: the outgoing banner leaves one way, the incoming
       one is parked on the opposite side (no animation) and then
       slides in — so forwards and backwards both look right. */
    function go(n) {
      var next = ((n % total) + total) % total;
      if (next === i) return;
      var dir = (next > i) ? 1 : -1;
      if (i === total - 1 && next === 0) dir = 1;
      if (i === 0 && next === total - 1) dir = -1;

      var cur = panels[i], nx = panels[next];
      nx.style.transition = 'none';
      nx.style.transform = 'translateX(' + (dir * 100) + '%)';
      void nx.offsetWidth;                       /* commit the jump before animating */
      nx.style.transition = '';
      cur.style.transform = 'translateX(' + (-dir * 100) + '%)';
      nx.style.transform = 'translateX(0)';
      i = next;
      mark();
    }

    function restart() {
      if (iv) clearInterval(iv);
      if (!reduced && total > 1) iv = setInterval(function () { if (!hover) go(i + 1); }, ROTATE_MS);
    }

    hero.addEventListener('mouseenter', function () { hover = true; });
    hero.addEventListener('mouseleave', function () { hover = false; });
    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(i + 1); restart(); }
      if (e.key === 'ArrowLeft')  { go(i - 1); restart(); }
    });

    mark();
    restart();
  }

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
        if (slides.length) build(hero, wrap, slides);
      })
      .catch(function () { if (timer) clearTimeout(timer); /* single static banner stands */ });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
