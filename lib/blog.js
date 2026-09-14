/* Blog post clean-up and enrichment, at build time.
 *
 * The 46 posts came across from the old Magento site as raw HTML, and they
 * carry the habits of that CMS: the page title glued onto the H1, empty
 * headings, the intro pasted twice, and links that point back at greenhse.com.
 * Rather than hand-edit every post (and have to remember to do it again for
 * the next one Keri writes), every post is cleaned here as it renders.
 *
 * Nothing here changes the words of a post. It removes what was never meant
 * to be seen, fixes where links go, and works out the things a reader wants
 * up front: how long it is, what is in it, and what to read next.
 */
import { SITE, cleanPath, mapHref } from './site';
import CATALOG from '../data/catalog.json';

const SUFFIX = /\s*[-–—|:·]?\s*(by\s+)?Greenhse(\s+Technologies)?(\s+Perth)?\s*$/i;

/* "Lumens vs Watts: What's the Difference? Greenhse Technologies" → the title */
export function cleanTitle(t) {
  return String(t || '').replace(SUFFIX, '').trim();
}

/* Old absolute links and .html addresses become this site's clean URLs, so a
   reader following a link inside a post stays here instead of landing on the
   old store.

   The old store also had URL shapes this site never had: a product at the
   root by its slug (/dl10-ps/), blog posts under /blog/post/ and /blogs/post/,
   and PDFs under /media/. Those are looked up here - a slug that matches one
   of our product pages goes there, an old blog address goes to the post, and
   a /media/ file goes through the /docs/ proxy that already serves them. What
   still cannot be placed is sent back to greenhse.com in full, so the link at
   least works instead of 404ing on this site. */
/* The site's own routes (the category pages, the shop, the account area). */
const APP_ROUTES = new Set(['/', '/products/', '/blog/', '/aboutus/', '/installation/', '/contact/', '/layout-app/', '/cart/', '/checkout/', '/account/',
  '/led-downlights-perth/', '/strip-lights/', '/smart-lights-perth/', '/led-batten-lights-perth/', '/led-track-lights-perth/', '/industrial-lighting-perth/',
  '/emergency-lights/', '/led-garden-pool-lights-perth/', '/air-flow/', '/led-flood-lights-perth/', '/high-bay-lights/', '/led-ceiling-lights-perth/',
  '/australian-certified-12v-24v-transformers-greenhouse-technologies/', '/security-sensors/', '/led-outdoor-wall-lights-perth/', '/commercial-lighting-perth/',
  '/led-star-lights/', '/glass-light-switch-perth-html/', '/privacy-policy-cookie-restriction-mode/', '/customer-service/', '/returns/']);
/* Old category addresses (the previous build and the old store) -> the category pages this site has. */
const CATEGORY_ALIASES = {
  '/categories/': '/products/',
  '/products/lighting-perth/led-downlights-perth/': '/led-downlights-perth/',
  '/products/lighting-perth/led-strip-lights/': '/strip-lights/',
  '/lighting-perth/led-strip-lights/': '/strip-lights/',
  '/automation/smart-lights-perth/': '/smart-lights-perth/',
  '/automation/': '/smart-lights-perth/',
  '/products/lighting-perth/smart-lights-perth/': '/smart-lights-perth/',
  '/lighting-perth/led-batten-lights-perth/': '/led-batten-lights-perth/',
  '/products/lighting-perth/led-track-lights-perth/': '/led-track-lights-perth/',
  '/lighting-perth/industrial-lighting-perth/': '/industrial-lighting-perth/',
  '/products/lighting-perth/emergency-lights/': '/emergency-lights/',
  '/products/lighting-perth/led-garden-pool-lights-perth/': '/led-garden-pool-lights-perth/',
  '/products/lighting-perth/air-flow/': '/air-flow/',
  '/products/lighting-perth/led-flood-lights-perth/': '/led-flood-lights-perth/',
  '/products/lighting-perth/high-bay-lights/': '/high-bay-lights/',
  '/lighting-perth/led-ceiling-lights-perth/': '/led-ceiling-lights-perth/',
  '/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/': '/australian-certified-12v-24v-transformers-greenhouse-technologies/',
  '/products/lighting-perth/security-sensors/': '/security-sensors/',
  '/products/lighting-perth/led-outdoor-wall-lights-perth/': '/led-outdoor-wall-lights-perth/',
  '/lighting-perth/commercial-lighting-perth/': '/commercial-lighting-perth/',
  '/products/lighting-perth/led-star-lights/': '/led-star-lights/',
  '/products/lighting-perth/glass-light-switch-perth-html/': '/glass-light-switch-perth-html/',
  '/lighting-perth/glass-light-switch-perth/': '/glass-light-switch-perth-html/',
  '/about/': '/aboutus/',
};
/* Products the old store sold under another address, and a few it no longer
   lists, sent to the current product or its category rather than off-site. */
const SLUG_ALIASES = {
  'remote-control-grp': '/product/led-wireless-remote-controllers/',
  '2in1-ctrlr-035': '/product/led-controller-single-dual-white/',
  'amari-dc-fan-56-bww': '/product/amari-dc-fan-56-bw/',
  'dl8es-flat-all-fp-1': '/product/dl8es-flat-all-fp/',
  'horizon-heater-lamps': '/product/horizon-heater-lamps-2/',
  '18w-wall-light-cct': '/product/wl18cct-1/',
  'dl10es': '/product/dl10es-flat-white-1/',
  'st24v-9w-15w-cct-cob-1': '/product/24v-dotless-cob-strip-light-16w/',
  't40-cct-batten-ip65-dim': '/product/t40-cct-batten-pro/',
  'tl-track-15-30w': '/led-track-lights-perth/',
  'tl-track-30w-1': '/led-track-lights-perth/',
  'gh-smart-socket': '/smart-lights-perth/',
  'wifi-garage-door': '/smart-lights-perth/',
  '24vstrip-channels': '/strip-lights/',
  'st24v-smd-all': '/strip-lights/',
  'led-adjustable-wall': '/led-outdoor-wall-lights-perth/',
  'wl-1-1-5m-30k-1': '/led-outdoor-wall-lights-perth/',
};
let PAGES = null;
function havePage(clean) {
  if (APP_ROUTES.has(clean)) return true;
  if (!PAGES) {
    PAGES = new Set();
    Object.keys(SITE.blogs).forEach(k => PAGES.add(cleanPath(k)));
  }
  return PAGES.has(clean);
}
/* Product slugs -> /product/<slug>/ (the catalogue snapshot the product pages are built from). */
let SLUGS = null;
function slugIndex() {
  if (SLUGS) return SLUGS;
  SLUGS = {};
  for (const id of Object.keys(CATALOG.feeds || {})) {
    for (const p of CATALOG.feeds[id].items || []) {
      const slug = (p.custom_attributes || []).find(a => a.attribute_code === 'url_key')?.value || p.sku;
      if (slug && !SLUGS[slug]) SLUGS[slug] = '/product/' + slug + '/';
    }
  }
  /* the previous build's product addresses (/products/lighting-perth/x/dl10-ps/) resolve by their last segment too */
  return SLUGS;
}
const ALIASES = CATEGORY_ALIASES;
function resolve(u) {
  if (!u || u === '/') return '/';
  const [path, hash] = u.split('#');
  const tail = hash ? '#' + hash : '';
  const clean = mapHref(path);
  const parts = clean.split('/').filter(Boolean);

  /* /blog/post/x/ and /blogs/post/x/ -> /blog/x/ */
  const bm = /^\/blogs?\/post\/([^/]+)\/?$/.exec(clean);
  if (bm && SITE.blogs['/blog/' + bm[1] + '.html']) return '/blog/' + bm[1] + '/' + tail;

  /* /media/... -> the proxy that already serves the old store's attachments */
  if (clean.startsWith('/media/sparsh/product_attachment/')) return '/docs/' + clean.slice('/media/sparsh/product_attachment/'.length);

  if (ALIASES[clean]) return ALIASES[clean] + tail;
  /* a category page of the previous build or the old store, by its last segment */
  for (const k of Object.keys(ALIASES)) if (clean.endsWith('/') && k.endsWith('/') && clean.split('/').filter(Boolean).pop() === k.split('/').filter(Boolean).pop() && parts.length <= 3) return ALIASES[k] + tail;

  /* a page we actually have - products, categories, posts, the simple pages,
     and the routes the app defines itself */
  if (havePage(clean)) return clean + tail;

  /* the last segment is a product slug we know */
  const slug = parts[parts.length - 1];
  if (slug && slugIndex()[slug]) return slugIndex()[slug] + tail;
  if (slug && SLUG_ALIASES[slug]) return SLUG_ALIASES[slug] + tail;

  return null;
}
/* One href, resolved the same way the post bodies are. */
export function resolveHref(h) {
  let u = String(h || '').replace(/^https?:\/\/(www\.)?greenhse\.com/, '');
  if (u === '' && /greenhse\.com/.test(h)) return '/';
  if (!u.startsWith('/')) return h;
  return resolve(u) || ('https://greenhse.com' + u);
}
function fixLinks(html) {
  return html.replace(/href="([^"]+)"/g, (m, h) => {
    let u = h.replace(/^https?:\/\/(www\.)?greenhse\.com/, '');
    if (u === '' && /greenhse\.com/.test(h)) return 'href="/"';   /* bare link to the old home */
    if (!u.startsWith('/')) return m;            /* other sites: leave alone */
    const r = resolve(u);
    if (r) return 'href="' + r + '"';
    return 'href="https://greenhse.com' + u + '"';   /* unknown: keep it working */
  });
}

function stripTags(s) { return String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }

/* No dashes. The owner does not want em dashes, en dashes or a spaced hyphen
   used as punctuation anywhere in the blog. Applied at render, so the stored
   post (some are Craig's and must stay as written) is never edited:
     "cheaper — meaning"   -> "cheaper, meaning"
     "2700–5500K"          -> "2700 to 5500K"
     "shallow ceilings - de" -> "shallow ceilings, de"
   Hyphens inside words (energy-efficient, low-glare) are spelling, not
   punctuation, and stay. */
export function noDashes(s, joiner) {
  /* Only the text between tags is punctuation. Attribute values (hrefs like
     /p36-60x60-cct/ and image names like t40cctip65-2_1.webp) must be left
     exactly as they are or the links and pictures break. */
  return String(s || '').split(/(<[^>]*>)/).map((part, i) => (i % 2 ? part : noDashesText(part, joiner))).join('')
    .replace(/\s+((?:<[^>]*>\s*)*),/g, '$1,');                      /* "CAMERA</strong> <strong>, INDOORS" -> no gap before the comma */
}
function noDashesText(s, joiner) {
  const j = joiner || ', ';
  return String(s || '')
    .replace(/(\d)\s*[\u2013\u2014-]\s*(\d)/g, '$1 to $2')           /* number ranges */
    .replace(/\s*[\u2014\u2013]\s*/g, j)                              /* em / en dash as punctuation */
    .replace(/(\S)\s+-\s+(\S)/g, '$1' + j + '$2')                    /* spaced hyphen as punctuation */
    .replace(/^\s*-\s+(\S)/, j.replace(/^\s+/, '') + '$1')           /* "...</strong> - the only" : hyphen at the start of a text node */
    .replace(/(\S)\s+-\s*$/, '$1' + j)                                /* "Standards - </strong>the" : hyphen at the end of a text node */
    .replace(/,\s*,/g, ',')
    .replace(/([.!?:;])\s*,\s*/g, '$1 ')                              /* "word. , next" -> "word. next" */
    .replace(/\s+,/g, ',');
}

function slug(s) {
  return stripTags(s).toLowerCase().replace(/&[a-z]+;|&#\d+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'section';
}

/* The whole clean-up in one pass. Returns a new object; b is untouched. */
export function prepPost(b, path) {
  let html = String(b.bodyHtml || '');

  /* 1. the header photograph is the post's `hero` in data/site.json (the
     site's own photography). A post without one uses its first image as the
     header instead, lifted out of the body. */
  let hero = b.hero || null;
  if (!hero) html = html.replace(/^\s*(?:<p[^>]*>)?\s*<img[^>]*src="([^"]+)"[^>]*>\s*(?:<\/p>)?/i, (m, src) => { hero = src; return ''; });

  /* 2. headings and paragraphs with nothing in them */
  html = html.replace(/<(h[1-6]|p)[^>]*>(\s|&nbsp;|<br\s*\/?>|<(?:b|strong|i|em|span)[^>]*>\s*<\/(?:b|strong|i|em|span)>)*<\/\1>/gi, '');

  /* 3. the intro pasted again as the first paragraph: the lede is shown on
     the header photograph, so the repeat is dropped from the body. */
  const lede = stripTags(b.lede);
  const norm = (t) => stripTags(t).toLowerCase().replace(/[^a-z0-9]+/g, '');
  if (lede) {
    const m = /<p(?![^>]*>\s*<img)[^>]*>([\s\S]*?)<\/p>/i.exec(html);
    if (m && stripTags(m[1]) && norm(m[1]).slice(0, 60) === norm(lede).slice(0, 60)) html = html.replace(m[0], '');
  }
  /* the first real paragraph is set larger, as the deck */
  html = html.replace(/<p(?![^>]*class=)(?![^>]*>\s*<img)([^>]*)>/i, '<p class="bl-deck"$1>');

  /* 4. links stay on this site */
  html = fixLinks(html);

  /* 5. give every h2 an id so the contents list can jump to it */
  const toc = [];
  html = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (m, attrs, inner) => {
    const text = stripTags(inner);
    if (!text) return '';
    let id = slug(text), n = 1;
    while (toc.some(t => t.id === id)) id = slug(text) + '-' + (++n);
    toc.push({ id, text: noDashes(text, ': ') });
    return '<h2 id="' + id + '"' + attrs.replace(/\sid="[^"]*"/, '') + '>' + inner + '</h2>';
  });

  /* the picture for the card on the index: the header image, or failing
     that the first image anywhere in the post */
  const anyImg = /<img[^>]*src="([^"]+)"/i.exec(html);
  const thumb = hero || (anyImg ? anyImg[1] : null);

  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));

  return {
    ...b,
    path: cleanPath(path),
    title: noDashes(cleanTitle(b.h1 || b.title), ': '),
    lede: lede ? noDashes(b.lede) : '',
    hero,
    thumb,
    bodyHtml: noDashes(html),
    toc,
    words,
    minutes,
    topic: topicOf(b),
  };
}

/* A post's topic, from its title — drives the filter chips on the index and
   the "related" picks. Order matters: first match wins. */
const TOPICS = [
  ['smart',     'Smart home',    /smart|wifi|wi-fi|bluetooth|mesh|\bapps?\b|switch|kinetic|ghz|\bdevices?\b|ubiquiti/i],
  ['strip',     'Strip lighting',/strip|cob|neon|24v|240v/i],
  ['downlight', 'Downlights',    /downlight|glare|ceiling light|track/i],
  ['outdoor',   'Outdoor & garden', /garden|outdoor|wall light|star light|flood|area light|pool/i],
  ['commercial','Commercial',    /high bay|warehouse|office|industrial|commercial|batten/i],
  ['energy',    'Energy & battery', /battery|greencharge|energy|solar|sustainab|saving/i],
  ['guides',    'Guides',        /./],
];
export function topicOf(b) {
  const t = cleanTitle(b.h1 || b.title) + ' ' + (b.lede || '');
  for (const [id, label, re] of TOPICS) if (re.test(t)) return { id, label };
  return { id: 'guides', label: 'Guides' };
}
export const TOPIC_LIST = TOPICS.map(([id, label]) => ({ id, label }));

/* Every post, cleaned and newest first. */
export function allPosts() {
  const posts = Object.entries(SITE.blogs).map(([path, b]) => prepPost(b, path));
  const key = p => Date.parse(p.date || '') || 0;
  posts.sort((a, b) => key(b) - key(a));
  return posts;
}

/* Three to read next: same topic first, then anything else that shares a
   word in the title, then the newest. Never the post itself. */
export function related(post, n = 3) {
  const all = allPosts().filter(p => p.path !== post.path);
  const words = new Set(post.title.toLowerCase().split(/\W+/).filter(w => w.length > 4));
  const score = p => (p.topic.id === post.topic.id ? 10 : 0) +
    p.title.toLowerCase().split(/\W+/).filter(w => words.has(w)).length;
  return all.map(p => [score(p), p]).sort((a, b) => b[0] - a[0]).slice(0, n).map(x => x[1]);
}
