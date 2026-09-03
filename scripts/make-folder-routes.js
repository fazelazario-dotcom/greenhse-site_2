/* Postbuild: give the three real .html pages proper folder routes, so every
 * URL on the site is the same Next.js-style folder shape (/layout/ instead of
 * /layout.html). The .html files stay in out/ as sources, and public/_redirects
 * 301s them to the folder routes on Netlify, so old links keep working.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'out');
/* 'layout' can't be a dev route (it collides with Next's reserved layout.js
   concept and loops the dev router), so the planner's route is /layout-app/. */
const PAGES = { 'layout': 'layout-app', 'layout-standalone': 'layout-standalone', 'layout-admin': 'layout-admin' };

for (const name of Object.keys(PAGES)) {
  const src = path.join(OUT, name + '.html');
  if (!fs.existsSync(src)) {
    console.warn('make-folder-routes: missing ' + src + ' — skipped');
    continue;
  }
  const dir = path.join(OUT, PAGES[name]);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, path.join(dir, 'index.html'));
  console.log('make-folder-routes: /' + PAGES[name] + '/ ready');
}
