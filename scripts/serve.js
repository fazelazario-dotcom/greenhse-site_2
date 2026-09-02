#!/usr/bin/env node
/* Serves the built site (out/) locally EXACTLY the way Netlify serves it:
   static files with clean URLs, plus the three Magento proxies from
   public/_redirects — /mag/* (GraphQL: live prices, stock, login, cart,
   checkout), /docs/* (spec sheets) and /brand/* (logos).

     npm run build     (builds all 335 pages into out/)
     npm run preview   (this file — then open http://localhost:8080)

   Use this — or `npm run dev` — to review the site. Opening out/index.html
   straight from the file system does NOT work: the site uses root-absolute
   URLs (/products/…, /assets/…), which only resolve through a server.
   No dependencies; plain Node. */
const http = require('node:http');
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', 'out');
const PORT = process.env.PORT || 8080;

const PROXIES = [
  { prefix: '/mag/',   target: 'https://greenhse.com/' },
  { prefix: '/docs/',  target: 'https://greenhse.com/media/sparsh/product_attachment/' },
  { prefix: '/brand/', target: 'https://greenhse.com/media/wysiwyg/' },
];

const MIME = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css',
  '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.txt':'text/plain',
  '.xml':'application/xml', '.woff2':'font/woff2', '.pdf':'application/pdf' };

function proxy(req, res, rule) {
  const target = rule.target + req.url.slice(rule.prefix.length);
  // strip hop-by-hop / origin headers the upstream may reject
  const h = { ...req.headers, host: 'greenhse.com' };
  for (const k of ['connection','keep-alive','upgrade','origin','referer','accept-encoding','sec-fetch-site','sec-fetch-mode','sec-fetch-dest']) delete h[k];
  const opts = { method: req.method, headers: h };
  const up = https.request(target, opts, r => {
    const h = { ...r.headers }; delete h['content-encoding'];
    res.writeHead(r.statusCode, r.headers);
    r.pipe(res);
  });
  up.on('error', e => { res.writeHead(502); res.end('proxy error: ' + e.message); });
  req.pipe(up);
}

http.createServer((req, res) => {
  const rule = PROXIES.find(p => req.url.startsWith(p.prefix));
  if (rule) return proxy(req, res, rule);

  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(file) && fs.existsSync(file + '/index.html')) file += '/index.html';
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const nf = path.join(ROOT, '404.html');
    res.writeHead(404, { 'content-type': 'text/html' });
    return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found: ' + p);
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log('Greenhse site running at http://localhost:' + PORT);
  console.log('Live Magento data proxied: /mag/* /docs/* /brand/* -> greenhse.com');
});
