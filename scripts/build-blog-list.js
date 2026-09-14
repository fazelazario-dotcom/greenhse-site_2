/* Prebuild: the short list of blog posts the homepage journal shows
   (id, title, slug, excerpt, date), newest first. Source: data/site.json. */
const fs = require('fs');
const path = require('path');
const site = require(path.join(__dirname, '..', 'data', 'site.json'));
const strip = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const SUFFIX = /\s*[-–—|:·]?\s*(by\s+)?Greenhse(\s+Technologies)?(\s+Perth)?\s*$/i;
const clean = (t) => String(t || '').replace(SUFFIX, '').replace(/\s*[\u2014\u2013]\s*/g, ': ').trim();
/* the same topic labels lib/blog.js gives the posts (kept in step by hand) */
const TOPICS = [
  ['Smart home', /smart|wifi|wi-fi|bluetooth|mesh|\bapps?\b|switch|kinetic|ghz|\bdevices?\b|ubiquiti/i],
  ['Strip lighting', /strip|cob|neon|24v|240v/i],
  ['Downlights', /downlight|glare|ceiling light|track/i],
  ['Outdoor & garden', /garden|outdoor|wall light|star light|flood|area light|pool/i],
  ['Commercial', /high bay|warehouse|office|industrial|commercial|batten/i],
  ['Energy & battery', /battery|greencharge|energy|solar|sustainab|saving/i],
];
const topicOf = (b) => { const t = clean(b.h1 || b.title) + ' ' + (b.lede || ''); for (const [l, re] of TOPICS) if (re.test(t)) return l; return 'Guides'; };
const posts = Object.entries(site.blogs).map(([p, b], i) => ({
  id: i + 1,
  title: clean(b.h1 || b.title),
  slug: p.replace(/^\/blog\//, '').replace(/\.html$/, ''),
  excerpt: strip(b.lede || b.bodyHtml).slice(0, 160),
  image: b.hero || null,
  topic: topicOf(b),
  minutes: Math.max(1, Math.round(strip(b.bodyHtml).split(/\s+/).filter(Boolean).length / 220)),
  publishDate: b.date || null,
}));
const key = (p) => Date.parse(p.publishDate || '') || 0;
posts.sort((a, b) => key(b) - key(a));
fs.writeFileSync(path.join(__dirname, '..', 'data', 'blog-list.json'), JSON.stringify(posts));
console.log('build-blog-list: ' + posts.length + ' posts');
