/* Postbuild: sitemap.xml + robots.txt from what was actually exported. */
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'out');
const BASE = process.env.SITE_URL || 'https://greenhse.com';
const SKIP = /^\/(account|cart|checkout|layout-admin|layout-standalone|404)(\/|$)/;
const urls = [];
(function walk(dir, rel) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) { if (f !== '_next') walk(p, rel + f + '/'); }
    else if (f === 'index.html' && !SKIP.test(rel)) urls.push(rel);
  }
})(OUT, '/');
urls.sort();
const pri = (u) => (u === '/' ? '1' : u.startsWith('/product/') || u.startsWith('/blog/') ? '0.6' : '0.7');
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `<url>\n<loc>${BASE}${u}</loc>\n<changefreq>${u === '/' ? 'daily' : 'weekly'}</changefreq>\n<priority>${pri(u)}</priority>\n</url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), xml);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-Agent: *\nAllow: /\nDisallow: /account/\nDisallow: /cart/\nDisallow: /checkout/\nDisallow: /layout-admin/\n\nSitemap: ${BASE}/sitemap.xml\n`);
console.log('build-sitemap: ' + urls.length + ' urls');
