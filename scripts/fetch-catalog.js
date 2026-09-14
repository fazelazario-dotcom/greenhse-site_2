/* Prebuild: snapshot the product feeds the site is built from.
 *
 * Product pages (/product/<slug>/) are generated at build time from the same
 * feeds the live pages read in the browser (www.getestimate.greenhse.com/api).
 * This script pulls every feed and writes data/catalog.json. If the feed is
 * unreachable at build time the committed snapshot is kept, so a build never
 * fails because of the catalogue server.
 */
const fs = require('fs');
const path = require('path');

const FEEDS = [
  { id: 11, categoryLabel: 'Strip Lights' },
  { id: 5, categoryLabel: 'Downlights' },
  { id: 17, categoryLabel: '12V/24V Transformers / Controllers' },
  { id: 52, categoryLabel: 'Air Flow / Ceiling Fans' },
  { id: 19, categoryLabel: 'Smart Life' },
  { id: 23, categoryLabel: 'Batten Fittings / Batten Lights' },
  { id: 9, categoryLabel: 'Ceiling / Panel / Oyster Lights' },
  { id: 67, categoryLabel: 'Emergency Lights' },
  { id: 7, categoryLabel: 'Flood / Sports Lighting' },
  { id: 14, categoryLabel: 'High Bay Lights' },
  { id: 34, categoryLabel: 'Industrial Lighting' },
  { id: 58, categoryLabel: 'Landscape / Garden Lighting' },
  { id: 21, categoryLabel: 'Outdoor / Wall Lights' },
  { id: 12, categoryLabel: 'School & Commercial LED Lighting' },
  { id: 55, categoryLabel: 'Security / Sensors' },
  { id: 18, categoryLabel: 'Star Lights' },
  { id: 66, categoryLabel: 'LED Track / Linear Lights' },
  { id: 72, categoryLabel: 'Switches / Powerpoints' },
  /* catch-all: the whole product tree, used only to resolve product pages that
     sit outside the category feeds above (label 'Products', like the live site) */
  { id: 3, categoryLabel: 'Products' },
  { id: 16, categoryLabel: 'Products' },
  { id: 25, categoryLabel: 'Products' },
  { id: 74, categoryLabel: 'Products' },
];
const API = 'https://www.getestimate.greenhse.com/api';
const OUT = path.join(__dirname, '..', 'data', 'catalog.json');

async function getJson(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error(r.status + ' ' + url);
    return await r.json();
  } finally { clearTimeout(t); }
}

(async () => {
  const feeds = {};
  let ok = 0;
  for (const f of FEEDS) {
    try {
      const j = await getJson(`${API}/product.php?id=${f.id}`);
      const items = (Array.isArray(j.items) ? j.items : []).filter((p) => p.status === 1);
      let children = [];
      try {
        const c = await getJson(`${API}/categories.php?id=${f.id}`);
        children = (Array.isArray(c.items) ? c.items : []).map((x) => ({ id: x.id, name: x.name }));
      } catch (e) { /* optional */ }
      feeds[f.id] = { categoryLabel: f.categoryLabel, items, children };
      ok++;
      console.log(`fetch-catalog: ${f.categoryLabel} (${f.id}) - ${items.length} products`);
    } catch (e) {
      console.warn(`fetch-catalog: ${f.categoryLabel} (${f.id}) FAILED - ${e.message}`);
    }
  }
  if (ok === FEEDS.length) {
    fs.writeFileSync(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), feeds }));
    console.log('fetch-catalog: wrote ' + OUT);
  } else if (fs.existsSync(OUT)) {
    console.warn('fetch-catalog: some feeds failed - keeping the committed data/catalog.json');
  } else {
    throw new Error('fetch-catalog: feeds failed and no snapshot exists');
  }
})();
