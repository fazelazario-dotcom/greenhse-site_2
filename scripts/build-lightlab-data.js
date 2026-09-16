/* ============================================================
   Prebuild: public/light-lab-data.json — the catalogue Light Lab works from.

   Two sources, joined:

     site/planner/data/products.js   the planner's PRODUCTS array. This is the only place
                          in the project where beam angle, wattage, lumens, IP
                          and cut-out have already been parsed out of the
                          Magento description HTML, so it is the spec source.

     data/catalog.json    the live feed snapshot written by fetch-catalog.js.
                          It carries the current price, the real product photo
                          and the url_key for the product page link.

   The join is by Magento url_key, taken off the planner's own product URL.
   The planner's ids are that url_key upper-cased and truncated to 18, so a
   SKU-only index misses most of the catalogue; SKU prefix is the fallback.

   Output shape:
     { builtAt, buckets:[{id,label,surface,model,hint,products:[id,...]}],
       products:{ id:{ name, sku, price, img, page, beam, watts, lumens,
                       ip, cct, cutout, perMetre, blurb } } }

   Light Lab fetches this at runtime. It is same-origin, so it works on the
   deployed site, in `npm run dev` and under `npm run preview` alike.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'light-lab-data.json');

/* ---------- the planner's parsed specs ---------- */
function plannerProducts() {
  /* The planner is a React route now; its catalogue is a module. */
  const html = fs.readFileSync(path.join(ROOT, 'site', 'planner', 'data', 'products.js'), 'utf8');
  const i = html.indexOf('const PRODUCTS=[');
  if (i < 0) throw new Error('build-lightlab-data: PRODUCTS not found in site/planner/data/products.js');
  const line = html.slice(i, html.indexOf('\n', i));
  return JSON.parse(line.slice(line.indexOf('['), line.lastIndexOf(']') + 1));
}

const attr = (it, code) => {
  const a = (it.custom_attributes || []).find((x) => x.attribute_code === code);
  return a ? a.value : null;
};

/* ---------- the live feed snapshot ----------
   Indexed three ways, because the planner's ids are derived from the Magento
   url_key (upper-cased, truncated to 18) and not from the SKU, so a SKU-only
   index misses most of the catalogue. The url_key taken off the planner's own
   product URL is the reliable join; SKU prefix is the fallback for the handful
   whose URL was written before a rename. */
function catalogIndex() {
  const ix = { slug: {}, sku: {} };
  const p = path.join(ROOT, 'data', 'catalog.json');
  if (fs.existsSync(p)) {
    const feeds = (JSON.parse(fs.readFileSync(p, 'utf8')).feeds) || {};
    for (const feed of Object.values(feeds)) {
      for (const it of (feed.items || [])) {
        if (!it || !it.sku) continue;
        const k = attr(it, 'url_key');
        if (k && !ix.slug[k.toLowerCase()]) ix.slug[k.toLowerCase()] = it;
        const s = String(it.sku).toUpperCase().slice(0, 18);
        if (!ix.sku[s]) ix.sku[s] = it;
      }
    }
  }
  /* Ten products exist only as grouped-product children and were recovered
     into catalog-extra.json by an earlier round. They carry a ready-made
     image URL rather than a media gallery, so they are shaped to match. */
  const x = path.join(ROOT, 'data', 'catalog-extra.json');
  if (fs.existsSync(x)) {
    for (const it of JSON.parse(fs.readFileSync(x, 'utf8'))) {
      if (!it || !it.slug) continue;
      const shaped = {
        sku: it.sku, price: it.price, __img: it.image,
        custom_attributes: [{ attribute_code: 'url_key', value: it.slug }],
      };
      if (!ix.slug[it.slug.toLowerCase()]) ix.slug[it.slug.toLowerCase()] = shaped;
    }
  }
  return ix;
}

/* The planner stores each product's page as the old store URL. The last path
   segment is the Magento url_key, which is what the id was truncated from. */
function slugOf(p) {
  const m = /\/([^/]+)\.html$/.exec(p.url || '');
  return m ? m[1].toLowerCase() : null;
}
function lookup(ix, p) {
  const s = slugOf(p);
  if (s && ix.slug[s]) return ix.slug[s];
  /* dl8es-flat-all-fp-1 in the planner, dl8es-flat-all-fp on the site. */
  if (s && ix.slug[s.replace(/-\d$/, '')]) return ix.slug[s.replace(/-\d$/, '')];
  const base = p.id.replace(/-\d$/, '').toUpperCase().slice(0, 18);
  return ix.sku[base] || ix.sku[p.id.toUpperCase().slice(0, 18)] || null;
}

/* The product photo Magento marks as the main image, falling back to the first
   gallery entry. Served through the same resizer the rest of the site uses. */
function photo(it) {
  if (!it) return null;
  if (it.__img) return it.__img;
  const g = it.media_gallery_entries || [];
  const main = g.find((e) => (e.types || []).includes('image')) || g[0];
  const file = (main && main.file) || attr(it, 'image');
  if (!file || file === 'no_selection') return null;
  return 'https://greenhse.com/media/catalog/product' + file;
}

/* ---------- which bucket a fitting belongs in ----------
   Light Lab asks "where does this go in the room", not "what category is it
   in on the website", so the buckets are by surface. A few products sit in a
   Magento category that does not describe where they hang (wall lights filed
   under downlights, star lights filed in both), so the name is what decides. */
const isWall  = (p) => /wall light|up\/down|bollard|step light/i.test(p.name);
const isStar  = (p) => /star ?light|starlight/i.test(p.name);
const isTrack = (p) => /track|linear|suspension/i.test(p.name);
const isPanel = (p) => /panel light/i.test(p.name);
const isFanLight = (p) => /with cct light|with light/i.test(p.name);
const isBathFan  = (p) => /exhaust|bathroom mate|heater|heather|promax/i.test(p.name);
/* Drivers, remotes, controllers and bare channel profiles are real products
   but they are not something you point at in a photograph. They stay out of
   the picker and get added to the quote automatically where a run needs one. */
const isAccessory = (p) =>
  /driver|remote|controller|channel|transformer|socket|quick connect|plug base/i.test(
    p.name + ' ' + p.id
  );

function bucketFor(p) {
  if (isAccessory(p)) return null;
  if (isStar(p)) return 'star';
  if (isWall(p)) return 'wall';
  if (isTrack(p)) return 'track';
  switch (p.cat) {
    case 'downlights': return 'downlight';
    case 'ceiling':    return isPanel(p) ? 'panel' : 'oyster';
    case 'batten':     return 'batten';
    case 'strip':      return 'strip';
    case 'fans':       return isBathFan(p) ? 'bathroom' : 'fan';
    case 'landscape':  return 'garden';
    case 'outdoor':    return 'garden';
    case 'flood':      return 'flood';
    case 'sensors':    return 'flood';
    case 'highbay':    return 'highbay';
    case 'industrial': return 'highbay';
    case 'track':      return 'track';
    case 'emergency':  return 'emergency';
    default:           return null;
  }
}

/* label       what the drawer tab says
   surface     where it can be dropped: ceiling | wall | bench | ground
   model       how the light is drawn: cone | wash | bar | point | flood | none
   hint        one plain line under the tab */
const BUCKETS = [
  { id: 'downlight', label: 'Downlights',      surface: 'ceiling', model: 'cone',
    hint: 'Recessed into the ceiling. The everyday light for a room.' },
  { id: 'oyster',    label: 'Ceiling lights',  surface: 'ceiling', model: 'cone',
    hint: 'Surface mounted, for concrete ceilings, rentals and low voids.' },
  { id: 'panel',     label: 'Panels',          surface: 'ceiling', model: 'cone',
    hint: 'Flat low glare light for offices, shops and studies.' },
  { id: 'batten',    label: 'Battens',         surface: 'ceiling', model: 'bar',
    hint: 'Linear surface fittings. Cheap even light for garages and sheds.' },
  { id: 'track',     label: 'Track & linear',  surface: 'ceiling', model: 'cone',
    hint: 'Aimed light for artwork, islands and retail displays.' },
  { id: 'wall',      label: 'Wall lights',     surface: 'wall',    model: 'wash',
    hint: 'Up and down the wall. Adds the layer downlights cannot.' },
  { id: 'strip',     label: 'Strip & cove',    surface: 'bench',   model: 'bar',
    hint: 'Under benches, in coves and along stairs. Sold per metre.' },
  { id: 'star',      label: 'Star lights',     surface: 'ceiling', model: 'point',
    hint: 'Tiny 3 W points. An effect, not the light for the room.' },
  { id: 'fan',       label: 'Fans',            surface: 'ceiling', model: 'cone',
    hint: 'One per room, centred. A fan with a light does both jobs.' },
  { id: 'bathroom',  label: 'Bathroom',        surface: 'ceiling', model: 'cone',
    hint: 'Exhaust fans, bathroom mates and heat lamps.' },
  { id: 'garden',    label: 'Garden & path',   surface: 'ground',  model: 'point',
    hint: 'Spike lights, bollards and path lighting for outside.' },
  { id: 'flood',     label: 'Flood & sensor',  surface: 'wall',    model: 'flood',
    hint: 'Driveways, yards and security. Wide, bright, weatherproof.' },
  { id: 'highbay',   label: 'High bay',        surface: 'ceiling', model: 'cone',
    hint: 'Warehouses, workshops and factory floors.' },
  { id: 'emergency', label: 'Emergency & exit', surface: 'ceiling', model: 'none',
    hint: 'Required in commercial fit-outs. No lighting effect shown.' },
];

/* Products the drawer leads with, per bucket. Same reasoning as the planner's
   PICKER_MAIN: a wall of near-identical names stalls the person who just
   wants to see what their room would look like. Anything not listed still
   appears, below the line, under "Show the rest". */
const LEAD = {
  downlight: ['DL9ES-FLAT-HL', 'DL10ES-FLAT-WHITE-', 'DL10-PS', 'DL9RGBW-BT1'],
  oyster:    ['C25-CCT-PA', 'P24SE-CCT', 'P24-WIFI'],
  panel:     ['P36-60X60-CCT', 'P36UP-30X120-CCT'],
  batten:    ['T40-CCT-BATTEN-PRO'],
  wall:      ['MR10-CCT-WALL-B', 'WL8-CCT-BW-1', 'W10-CCT-BW'],
  strip:     ['ST24V-9W-15W-CCT-C', 'ST24V-SMD-ALL-1', 'ST24V-RGB-COB'],
  star:      ['DL03-ALL-1', 'DL03-4KIT-2'],
  fan:       ['AMARI-DC-52-FAN-LI', 'AMARI-DC-FAN-56-LI'],
};

/* Strip is quoted per metre, so a "quantity" on the plan is metres of run.
   Everything else is counted in fittings. */
const perMetre = (p) => p.cat === 'strip' && /\/ ?metre|per metre/i.test(p.name);

/* A short line under each product in the drawer. What it is, how bright, what
   it costs — no product codes, nothing to look up. */
function blurb(p, price) {
  const bits = [];
  const w = String(p.watts || '').match(/(\d+)/);
  if (w) bits.push(w[1] + 'W');
  const lm = String(p.lumens || '').match(/(\d+)/);
  if (lm) bits.push(Number(lm[1]).toLocaleString() + ' lumens');
  const b = String(p.beam || '').match(/(\d+)/);
  if (b) bits.push(b[1] + '° beam');
  if (p.ip && /ip\d/i.test(p.ip)) bits.push(String(p.ip).match(/IP\d+/i)[0]);
  if (price > 0) bits.push('$' + price.toFixed(2) + (perMetre(p) ? ' per metre' : ' each'));
  return bits.join(' · ');
}

function build() {
  const P = plannerProducts();
  const ix = catalogIndex();
  const products = {};
  const byBucket = {};

  for (const p of P) {
    const b = bucketFor(p);
    if (!b) continue;
    const live = lookup(ix, p);
    const price = live && typeof live.price === 'number' ? live.price : p.price;
    const slug = live ? attr(live, 'url_key') : null;

    if (products[p.id]) continue;
    products[p.id] = {
      name: p.name,
      sku: live ? live.sku : null,
      price: Math.round(price * 100) / 100,
      img: photo(live),
      page: slug ? '/product/' + slug + '/' : null,
      beam: p.beam || null,
      watts: p.watts || null,
      lumens: p.lumens || null,
      ip: p.ip || null,
      cct: p.cct || null,
      cutout: p.cutout || null,
      perMetre: perMetre(p),
      blurb: blurb(p, price),
      desc: (p.desc || '').slice(0, 400),
    };
    (byBucket[b] = byBucket[b] || []).push(p.id);
  }

  /* Lead products first, in the order they are listed; the rest keep
     catalogue order behind them. */
  for (const [b, ids] of Object.entries(byBucket)) {
    const lead = (LEAD[b] || []).filter((id) => ids.includes(id));
    byBucket[b] = lead.concat(ids.filter((id) => !lead.includes(id)));
  }

  const buckets = BUCKETS
    .filter((b) => (byBucket[b.id] || []).length)
    .map((b) => ({ ...b, lead: (LEAD[b.id] || []).length || 3, products: byBucket[b.id] }));

  const out = { builtAt: new Date().toISOString(), buckets, products };
  fs.writeFileSync(OUT, JSON.stringify(out));

  const n = Object.keys(products).length;
  const withImg = Object.values(products).filter((x) => x.img).length;
  const withPage = Object.values(products).filter((x) => x.page).length;
  console.log(
    'build-lightlab-data: ' + n + ' products in ' + buckets.length + ' buckets, ' +
    withImg + ' with a photo, ' + withPage + ' linked to a product page'
  );
  for (const b of buckets) console.log('  ' + b.id.padEnd(10) + b.products.length);
}

build();
