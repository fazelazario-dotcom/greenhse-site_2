/* ============================================================
   Greenhse — homepage announcements bar (self-contained).

   A thin strip that sits ABOVE the sticky header and rotates
   through short update messages. Everything lives in this one
   file — styles, markup, behaviour — so it can be dropped into
   any build with a single <script src="/assets/announce.js">.

   WHERE THE MESSAGES COME FROM
   The bar reads a CMS block from the Magento store, so the team
   edits messages in the admin they already use — no deploy:
     Magento admin → Content → Blocks → Add New Block
       Identifier:  site-announcements   (exactly)
       Content:     one paragraph per message. A paragraph may
                    contain one <a href> — the whole message
                    becomes that link.
   If the block doesn't exist or the store is slow, the bar shows
   the FALLBACK message instead, so it never renders broken.

   Design notes: colours and type match the site (ink #14150f,
   green #00a800, monospace label). The bar is static, so it
   scrolls away and the sticky header takes over — it never eats
   screen space past the first scroll. Respects reduced motion.
   The × hides it for the rest of the visit (sessionStorage).
   ============================================================ */
(function () {
  'use strict';

  /* ---- config (one line each to retarget) ---- */
  var ENDPOINT = '/mag/graphql';            /* same-origin proxy; point at your GraphQL if hosted elsewhere */
  var BLOCK_ID = 'site-announcements';      /* Magento CMS block identifier */
  var ROTATE_MS = 5500;                     /* time each message stays up */
  var FALLBACK = [
    { text: 'Perth stock & support — free Click & Collect at our Ellenbrook showroom', href: null }
  ];

  try { if (sessionStorage.getItem('gh_announce_hide') === '1') return; } catch (e) {}

  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---- styles ---- */
  var css =
    '#gh-announce{position:relative;z-index:210;background:#14150f;color:#f2f3ec;' +
      'font:500 13px/1.4 Poppins,system-ui,sans-serif;overflow:hidden}' +
    '#gh-announce .in{max-width:1280px;margin:0 auto;padding:8px 44px 8px 20px;' +
      'display:flex;align-items:center;gap:10px;min-height:34px}' +
    '#gh-announce .tag{display:inline-flex;align-items:center;gap:7px;flex:none;' +
      'font:600 10px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.14em;color:#9fdcb4}' +
    '#gh-announce .dot{width:7px;height:7px;border-radius:50%;background:#00a800;flex:none}' +
    (reduced ? '' :
      '@keyframes ghadot{0%,100%{box-shadow:0 0 0 0 rgba(0,168,0,.55)}70%{box-shadow:0 0 0 6px rgba(0,168,0,0)}}' +
      '#gh-announce .dot{animation:ghadot 2.4s ease-out infinite}') +
    '#gh-announce .msg{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      (reduced ? '' : 'transition:opacity .35s ease;') + 'opacity:1}' +
    '#gh-announce .msg.off{opacity:0}' +
    '#gh-announce .msg a{color:inherit;text-decoration:underline;text-underline-offset:3px;text-decoration-color:#00a800}' +
    '#gh-announce .msg a:hover{color:#9fdcb4}' +
    '#gh-announce .x{position:absolute;right:8px;top:50%;transform:translateY(-50%);' +
      'background:none;border:0;color:#8b8d80;font:16px/1 system-ui;cursor:pointer;padding:6px 10px}' +
    '#gh-announce .x:hover{color:#fff}' +
    '@media(max-width:560px){#gh-announce .tag span{display:none}}';

  /* ---- markup ---- */
  function build(messages) {
    if (!messages.length) return;
    var bar = document.createElement('div');
    bar.id = 'gh-announce';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Announcements');
    var style = document.createElement('style');
    style.textContent = css;
    bar.appendChild(style);

    var inner = document.createElement('div');
    inner.className = 'in';
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = '<i class="dot"></i><span>UPDATE</span>';
    var msg = document.createElement('div');
    msg.className = 'msg';
    msg.setAttribute('aria-live', 'polite');
    var x = document.createElement('button');
    x.className = 'x';
    x.type = 'button';
    x.setAttribute('aria-label', 'Hide announcements');
    x.textContent = '×';
    x.onclick = function () {
      try { sessionStorage.setItem('gh_announce_hide', '1'); } catch (e) {}
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    };
    inner.appendChild(tag); inner.appendChild(msg);
    bar.appendChild(inner); bar.appendChild(x);

    function render(i) {
      var m = messages[i];
      msg.textContent = '';
      if (m.href) {
        var a = document.createElement('a');
        a.href = m.href; a.textContent = m.text;
        msg.appendChild(a);
      } else {
        msg.textContent = m.text;
      }
    }
    render(0);

    /* Above the header: first thing in the body. The header is
       position:sticky, so once this scrolls away the nav pins
       to the top exactly as it does today. */
    document.body.insertBefore(bar, document.body.firstChild);

    if (messages.length > 1) {
      var i = 0;
      setInterval(function () {
        i = (i + 1) % messages.length;
        if (reduced) { render(i); return; }
        msg.classList.add('off');
        setTimeout(function () { render(i); msg.classList.remove('off'); }, 360);
      }, ROTATE_MS);
    }
  }

  /* ---- parse the CMS block into messages ---- *
   * One paragraph (or list item / line) per message, tags
   * stripped; if the paragraph holds a link, the message links
   * there. Content comes from the store admin, but we still
   * render TEXT only - never raw HTML. */
  function parse(html) {
    var doc;
    try { doc = new DOMParser().parseFromString(String(html || ''), 'text/html'); }
    catch (e) { return []; }
    var nodes = doc.querySelectorAll('p,li,h1,h2,h3,h4');
    var parts = nodes.length ? Array.prototype.slice.call(nodes) : [doc.body];
    var out = [];
    parts.forEach(function (n) {
      var text = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text) return;
      var href = null, a = n.querySelector && n.querySelector('a[href]');
      if (a) {
        var h = a.getAttribute('href') || '';
        if (/^(https?:\/\/|\/)/i.test(h)) href = h;
      }
      out.push({ text: text.slice(0, 160), href: href });
    });
    return out.slice(0, 6);
  }

  /* ---- fetch, with the fallback promise kept ---- */
  function boot() {
    var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : null;
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query:
        'query($id:[String]){cmsBlocks(identifiers:$id){items{identifier content}}}',
        variables: { id: [BLOCK_ID] } }),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) { return r.json(); })
      .then(function (j) {
        if (timer) clearTimeout(timer);
        var items = j && j.data && j.data.cmsBlocks && j.data.cmsBlocks.items;
        var block = items && items[0];
        var msgs = block ? parse(block.content) : [];
        build(msgs.length ? msgs : FALLBACK);
      })
      .catch(function () {
        if (timer) clearTimeout(timer);
        build(FALLBACK);
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
