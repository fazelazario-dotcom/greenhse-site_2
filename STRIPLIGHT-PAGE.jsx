/* =============================================================================
   GREENHSE — STRIP LIGHT PAGE                                  (Next.js, drop-in)
   =============================================================================

   WHAT THIS IS
   One self-contained Next.js page component for /strip-lights/. Everything is in
   this single file — product data, section order, filter categories, layout,
   styles (styled-jsx) and the add-to-cart hook. No extra CSS file, no config, no
   other component to wire up. Copy the file in, route to it, done.

   HOW TO USE IT (App Router)
       app/strip-lights/page.jsx        →  export { default } from './STRIPLIGHT-PAGE'
   or just rename this file to that path. For the Pages Router, drop it at
       pages/strip-lights.jsx
   It is a client component ('use client') because the category filter has state.

   ADD TO CART
   Each card calls onAddToCart({ sku, name, price, qty:1 }) if you pass that prop,
   otherwise it falls back to window.GreenhseCart?.add(...) and finally to a
   plain link to the product page. Wire it to whatever the site already uses:
       <StripLightPage onAddToCart={line => myCart.add(line)} />

   PRODUCT LINKS
   Cards link to `/product/<url_key>/` by default. Two ways to change that:
       <StripLightPage productUrl={p => `/shop/${p.key}/`} />          (client callers)
       <StripLightPage productUrls={{ '24v-smd-strip-light-12w': '/x/' }} />
   The second takes a plain object keyed by the product's url_key, so it can be
   passed from a SERVER component too (React won't let a server component hand a
   function to a client component). Anything not in the object uses the default.

   -----------------------------------------------------------------------------
   ⚠️  BEFORE THIS GOES LIVE — 6 things to confirm (owner's brief vs live store)
   -----------------------------------------------------------------------------
   1. PHOTOS MISSING (6). The five products in "Specialised display strip", plus
      the Long Run IP68, have no photo in Magento yet. They render a clear
      "PHOTO NEEDS TO BE UPLOADED" placeholder — drop the image URL into that
      product's `img` field when the photo exists and the placeholder disappears.
   2. DISPLAY STRIP IP20 needs a NEW PHOTO. The current Magento image
      (23w_m_high_lumen_3.png) has the rainbow high-colour graphic on it, which
      the owner wants gone. Flagged with `needsNewPhoto: true` — the card shows
      the note until the field is updated.
   3. WATTAGE: the brief says the 2700K and 3000K dotless COB strips are 15w/m.
      Magento currently lists 2700K as 12w/m and 3000K as 7.5w/m. The brief wins
      here (marked `reviewWattage`), but the store data should be corrected to
      match, or these numbers changed back.
   4. PRICES: the brief says 7.5w/m "from $12/m" and IP68 "from $15/m". Magento
      lists $16 and $16. The brief's prices are used (marked `reviewPrice`).
      Whichever is right, the store and this page must agree before launch.
   5. FIVE SPECIALISED PRODUCTS DON'T EXIST IN MAGENTO YET (neon RGB magic, spa
      RGBW magic, 6x12 CCT neon, meat strip, garden IP68). They are listed here
      with `magento: false` and no Add-to-cart button — they link to Contact
      instead so nobody can order something the store can't fulfil.
   6. REMOVED as instructed: "24V High Lumen RGB SMD Strip Light 16w/m"
      (sku `st24v-16w-RGB -SMD`). It is still in the Magento category, so it will
      reappear if anything auto-syncs from the category — remove it there too.
   ============================================================================= */

'use client';

import { useEffect, useMemo, useState } from 'react';

/* Save for later. Shares the site's `gh_wish` list in localStorage, so a heart
   ticked here shows up on the rest of the site too. Storage can be blocked
   (private windows, cleared site data), so every read and write is guarded and
   the page renders correctly with nothing saved. */
const WISH_KEY = 'gh_wish';
function readWish() {
  try {
    const v = JSON.parse(window.localStorage.getItem(WISH_KEY) || '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x) : [];
  } catch { return []; }
}
function writeWish(list) {
  try { window.localStorage.setItem(WISH_KEY, JSON.stringify(list)); } catch { /* not available */ }
}

const Heart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>
  </svg>
);

/* -----------------------------------------------------------------------------
   FILTER CATEGORIES
   A product may belong to several — a wet-area RGB strip shows under both.
   Order here is the order of the chips on the page.
----------------------------------------------------------------------------- */
export const CATEGORIES = [
  { id: 'all',        label: 'All strip lights' },
  { id: 'white',      label: 'White adjustable' },
  { id: 'wet',        label: 'Wet areas' },
  { id: 'rgb',        label: 'RGB' },
  { id: 'longrun',    label: 'Long run' },
  { id: 'fullcolour', label: 'Full colour' },
  { id: 'controllers',label: 'Controllers' },
];

const MEDIA = 'https://greenhse.com/media/catalog/product/cache/d0ce8581b8eaac8b5e50cad6dde77aa4';

/* The two CTA links. On greenhse.netlify.app the strip finder is a wizard on the
   homepage and the planner lives at /layout-app/ — change these two lines if your
   routes differ. */
const FINDER_URL = '/#strip-finder';
const LAYOUT_URL = '/layout-app/';

/* Where a product card links to. The default matches a /product/<url_key>/ route.
   If your site uses a different shape, either edit this line or pass a
   `productUrl` prop:  <StripLightPage productUrl={p => `/shop/${p.key}/`} />
   The function is given the whole product object, so you can key off sku too. */
const PRODUCT_URL = (p) => `/product/${p.key}/`;

/* -----------------------------------------------------------------------------
   PRODUCTS
   sku / price / url_key come straight from the live Magento catalogue so
   Add to cart works untouched. `cats` drives the filters. Sections below decide
   what appears where and in what order.
----------------------------------------------------------------------------- */
export const PRODUCTS = {

  /* ---------- Premium all purpose (was "Wet area strips") ---------- */
  smd12: {
    sku: 'st24v-12w-SMD', key: '24v-smd-strip-light-12w', magento: true,
    name: '24V High Lumen SMD Strip Light 12w/m',
    blurb: 'The everyday workhorse. Bright, even light for cove, cabinet and under-bench runs.',
    price: 16.00, unit: '/m', chips: ['24V', '12w/m', 'IP65'],
    img: `${MEDIA}/3/0/3000k_smd_.png`,
    cats: ['white', 'wet'],
  },
  smd20: {
    sku: 'st24v-20w-SMD-1', key: '24v-smd-strip-light-20w', magento: true,
    name: '24V High Lumen SMD Strip Light 20w/m',
    blurb: 'Same strip, more output — for high ceilings, deep coves and feature walls.',
    price: 17.00, unit: '/m', chips: ['24V', '20w/m', 'IP65'],
    img: `${MEDIA}/5/5/5500k_12wm.png`,
    cats: ['white', 'wet'],
  },
  display23: {
    sku: 'st24v-23w-SMD-1-1', key: '24v-smd-display-strip-light-23w', magento: true,
    name: 'DISPLAY STRIP IP20',
    blurb: 'High colour accuracy (CRI 90+) — colours read true, which is what display, retail and joinery lighting lives or dies on.',
    price: 17.00, unit: '/m', chips: ['24V', '23w/m', 'IP20', 'High CRI'],
    img: `${MEDIA}/2/3/23w_m_high_lumen_3.png`,
    needsNewPhoto: 'Current photo still has the rainbow high-colour graphic on it — replace with a clean product shot.',
    /* Fixed high-CRI white — not adjustable, so not under White adjustable. */
    cats: [],
  },

  /* ---------- Long run ---------- */
  v240pro: {
    sku: 'ST240V-PRO', key: '240v-strip-light-pro', magento: true,
    name: '240V Strip Light Pro /Metre',
    blurb: 'Mains voltage, so it runs for tens of metres off one feed. The long-run answer for warehouses, verandahs and perimeter lighting.',
    price: 20.00, unit: '/m', chips: ['240V', 'IP65', 'Long run'],
    img: `${MEDIA}/x/h/xh4a8857.png`,
    /* Mains voltage. IP65 or not, a 240V strip is not what goes in a bathroom
       or a pool surround, so it is long run only. */
    cats: ['longrun'],
  },
  cob75: {
    sku: 'ST24V-7.5 3000k COB', key: '24v-dotless-cob-strip-light-3000k', magento: true,
    name: '24V Long Run COB Strip Light 7.5w/m',
    blurb: 'Low wattage per metre means a much longer run off a single transformer, with the same dotless line of light. Pick the colour temperature — it is fixed, not adjustable.',
    price: 12.00, unit: '/m', from: true, chips: ['24V', '7.5w/m', 'Dotless', 'Long run'],
    img: `${MEDIA}/c/o/cob_3000k.png`,
    variants: ['2700K — warm', '3000K — warm white', '4000K — neutral'],
    reviewPrice: 'Brief says from $12/m; Magento currently $16.',
    /* Long run, not "white adjustable": three fixed colour temperatures to
       choose between is not one strip that tunes warm to cool. */
    cats: ['longrun'],
  },
  cobIp68: {
    sku: 'ST24V-LONGRUN-IP68', key: '24v-long-run-cob-strip-ip68', magento: false,
    name: '24V Long Run COB Strip Light IP68',
    blurb: 'Fully sealed for permanent wet and buried locations — garden beds, water features, pool surrounds.',
    price: 15.00, unit: '/m', from: true, chips: ['24V', 'IP68', 'Long run', 'Submersible'],
    img: null,
    reviewPrice: 'Brief says from $15/m.',
    cats: ['longrun', 'wet'],
  },

  /* ---------- Dotless COB ---------- */
  cobCct16: {
    sku: 'ST24V-16 CCT-1', key: '24v-dotless-cob-strip-light-16w', magento: true,
    name: '24V Dotless CCT COB Strip Light 16w/m',
    blurb: 'CCT — warm to cool white, adjustable. One strip that goes from 2700K relaxed to 6000K task light. Available IP20 for indoors and IP65 for wet areas.',
    price: 18.00, unit: '/m', chips: ['24V', '16w/m', 'CCT', 'IP20 / IP65'],
    img: `${MEDIA}/i/m/img_5788_1.png`,
    variants: ['IP20 — indoor', 'IP65 — wet area'],
    cats: ['white', 'wet'],
  },
  cob2700_3000: {
    sku: 'ST24V-12- 2700k COB', key: '24v-dotless-cob-strip-light-2700k', magento: true,
    name: '24V Dotless COB Strip Light 15w/m — 2700K & 3000K',
    blurb: 'Fixed warm white, dotless. 2700K for a soft, lamp-like glow; 3000K for a slightly cleaner warm. Same strip, pick your colour.',
    price: 17.00, unit: '/m', chips: ['24V', '15w/m', '2700K / 3000K', 'Dotless'],
    img: `${MEDIA}/c/o/cobx480-24-ycc_cob_strip_light__1.png`,
    variants: ['2700K — warm', '3000K — warm white'],
    alsoSku: 'ST24V-7.5 3000k COB',
    reviewWattage: 'Brief says 15w/m; Magento lists 2700K at 12w/m and 3000K at 7.5w/m.',
    /* Fixed warm white — not adjustable. */
    cats: [],
  },

  /* ---------- RGB & full colour ---------- */
  rgbCob16: {
    sku: 'ST24V-16w-RGB-COB', key: '24v-dotless-rgb-cob-strip-light-16w', magento: true,
    name: '24V Dotless RGB COB Strip Light 16w/m',
    blurb: 'Full colour with no visible dots — a solid line of colour rather than a row of pixels.',
    price: 18.00, unit: '/m', chips: ['24V', '16w/m', 'RGB', 'IP20'],
    img: `${MEDIA}/c/o/cob-rgb2.png`,
    cats: ['rgb', 'fullcolour'],
  },
  rgbCob15: {
    sku: 'ST24V-15w-RGB-COB-1', key: '24v-dotless-rgb-cob-strip-light-15w', magento: true,
    name: '24V Dotless RGB COB Strip Light 15w/m',
    blurb: 'The IP65 version of the dotless RGB — colour where it can get damp.',
    price: 18.00, unit: '/m', chips: ['24V', '15w/m', 'RGB', 'IP65'],
    img: `${MEDIA}/2/_/2_25_2.png`,
    cats: ['rgb', 'fullcolour', 'wet'],
  },
  v240rgb: {
    sku: 'ST240V-RGB', key: '240v-rgb-led-strip-light', magento: true,
    name: '240V RGB LED Strip Light /Metre',
    blurb: 'Mains-voltage colour for long outdoor runs — eaves, fences, pergolas.',
    price: 20.00, unit: '/m', chips: ['240V', 'RGB', 'IP65', 'Long run'],
    img: `${MEDIA}/8/-/8-5.png`,
    cats: ['longrun'],
  },

  /* ---------- Specialised display strip (photos to come) ---------- */
  gardenIp68: {
    sku: 'ST24V-GARDEN-IP68', key: '24v-long-run-garden-strip-ip68', magento: false,
    name: 'Garden Strip IP68',
    blurb: 'Sealed for garden beds and in-ground use, and low enough per metre to run the length of a yard.',
    price: 15.00, unit: '/m', from: true, chips: ['24V', 'IP68', 'Garden'],
    img: null,
    cats: ['wet'],
  },
  neonRgbMagic: {
    sku: 'NEON-12X12-RGB-MAGIC', key: '12x12-neon-rgb-magic', magento: false,
    name: '12×12 SPI Neon RGB',
    blurb: 'Addressable colour in a 12×12 neon profile — chase, fade and pixel effects, not just one colour at a time. Comes with its own profile.',
    price: null, unit: '/m', chips: ['12×12', 'Neon', 'SPI RGB', 'Own profile'],
    img: null,
    cats: ['rgb', 'fullcolour', 'wet'],
  },
  spaRgbwMagic: {
    sku: 'SPA-RGBW-IP65-MAGIC', key: 'spa-rgbw-ip65-magic', magento: false,
    name: 'SPI RGBW',
    blurb: 'RGBW addressable — full colour plus a dedicated white chip, sealed to IP65 for spa and wet surrounds. Comes with its own profile.',
    price: null, unit: '/m', chips: ['SPI', 'RGBW', 'IP65', 'Own profile'],
    img: null,
    cats: ['rgb', 'fullcolour', 'wet'],
  },
  neonCct: {
    sku: 'NEON-6X12-CCT', key: '6x12-cct-neon-strip', magento: false,
    name: 'Sidebend Neon CCT',
    blurb: 'A slim 6×12 neon profile in adjustable white — soft, continuous line light for detail work and signage.',
    price: null, unit: '/m', chips: ['Neon', 'Sidebend', 'CCT'],
    img: null,
    cats: ['white', 'wet'],
  },
  meatStrip: {
    sku: 'MEAT-STRIP', key: 'meat-display-strip', magento: false,
    name: 'Meat Strip',
    blurb: 'Purpose-tuned display strip for butchery and deli cabinets — the spectrum that keeps product looking fresh rather than grey.',
    price: null, unit: '/m', chips: ['Display', 'Food-safe cabinet', 'Speciality'],
    img: null,
    reviewCat: 'Filed under "Full colour" for now — tell us which filter the meat strip should sit under.',
    cats: ['fullcolour'],
  },

  /* ---------- Controllers & accessories ---------- */
  controllers: {
    sku: 'ctrlr-strip-all-New', key: 'led-strip-light-controllers-receivers', magento: true,
    name: 'Controllers / Receivers for LED Strip Light',
    blurb: 'The brains between the transformer and the strip — single colour, CCT, RGB and RGBW receivers.',
    price: 15.00, unit: '', from: true, chips: ['Controller', 'All strip types'],
    img: `${MEDIA}/g/r/group_controllers_1.png`,
    cats: ['controllers'],
  },
  remotes: {
    sku: 'remote-control-grp', key: 'led-wireless-remote-controllers', magento: true,
    name: 'LED Wireless Remote Controllers',
    blurb: 'Handsets and wall panels to drive the receivers — no app required.',
    price: 17.00, unit: '', from: true, chips: ['Remote', 'Wall panel'],
    img: `${MEDIA}/g/r/group_remotes_1.png`,
    cats: ['controllers'],
  },
  tr24: {
    sku: 'TR24V-ALL', key: '24v-transformers-australian-certified', magento: true,
    name: '24V Transformers, Australian Certified',
    blurb: 'Size by watts per metre × run length, plus about 20% headroom, then take the next size up.',
    price: 30.00, unit: '', from: true, chips: ['24V', 'Certified'],
    img: `${MEDIA}/1/_/1_logo.png`,
    cats: ['controllers'],
  },
  tr12: {
    sku: 'TR12V-ALL', key: '12v-transformers-australian-certified', magento: true,
    name: '12V Transformers, Australian Certified',
    blurb: 'For the 12V strip and garden ranges. Same sizing rule as the 24V units.',
    price: 22.00, unit: '', from: true, chips: ['12V', 'Certified'],
    img: `${MEDIA}/1/_/1_certification.png`,
    cats: ['controllers'],
  },
  channels: {
    sku: '24v-strip-channel-group', key: '24v-strip-channel-group', magento: true,
    name: '24V Strip Channels & Profiles',
    blurb: 'Surface, recess, wing, thin, corner and mini profiles in silver, white and black, with diffusers and end caps.',
    price: 30.00, unit: '', from: true, chips: ['Aluminium', '12 profiles'],
    img: `${MEDIA}/g/r/group_1_3.png`,
    cats: ['controllers'],
  },
};

/* -----------------------------------------------------------------------------
   SECTIONS — the order of the page, and the order within each section.
----------------------------------------------------------------------------- */
export const SECTIONS = [
  {
    id: 'all-purpose',
    title: 'PREMIUM ALL PURPOSE STRIPLIGHT',
    intro: 'The strip that suits most jobs — bright, sealed and reliable. Start with 12w/m and step up if the ceiling is high or the cove is deep.',
    items: ['smd12', 'smd20', 'display23'],
  },
  {
    id: 'long-run',
    title: 'LONG RUN',
    intro: 'For runs that keep going — mains voltage, or low wattage per metre so one transformer carries further.',
    items: ['v240pro', 'cob75', 'cobIp68'],
  },
  {
    id: 'dotless-cob',
    title: 'DOTLESS COB',
    intro: 'A solid line of light with no dots — the finish you want anywhere the strip is visible or reflected.',
    items: ['cobCct16', 'cob2700_3000'],
  },
  {
    id: 'rgb-colour',
    title: 'RGB & FULL COLOUR',
    intro: 'Colour changing, dotless and mains-voltage options.',
    items: ['rgbCob16', 'rgbCob15', 'v240rgb'],
  },
  {
    id: 'specialised',
    title: 'SPECIALISED DISPLAY STRIP',
    intro: 'Purpose-built strips — sealed garden runs, neon profiles, addressable “magic” colour and display cabinet lighting.',
    items: ['gardenIp68', 'neonRgbMagic', 'spaRgbwMagic', 'neonCct', 'meatStrip'],
  },
  {
    id: 'controllers',
    title: 'CONTROLLERS, TRANSFORMERS & CHANNELS',
    intro: 'Everything that makes the strip work and look finished.',
    items: ['controllers', 'remotes', 'tr24', 'tr12', 'channels'],
  },
];

/* ============================================================================
   COMPONENT
   ============================================================================ */
export default function StripLightPage({ onAddToCart, productUrl, productUrls }) {
  const [cat, setCat] = useState('all');

  /* Read after mount, never during render — the server has no localStorage and
     a mismatch would blow up hydration. */
  const [wish, setWish] = useState([]);
  useEffect(() => { setWish(readWish()); }, []);
  function toggleWish(sku) {
    setWish((prev) => {
      const next = prev.includes(sku) ? prev.filter((s) => s !== sku) : prev.concat(sku);
      writeWish(next);
      return next;
    });
  }

  /* One place decides where a card points, so the caller can override it —
     either with a function, or with a plain url_key -> href object. */
  const href = (p) => {
    if (typeof productUrl === 'function') return productUrl(p);
    if (productUrls && productUrls[p.key]) return productUrls[p.key];
    return PRODUCT_URL(p);
  };

  /* Sections keep their order; a filter just hides the cards that don't match,
     and any section left with nothing drops out entirely. */
  const visible = useMemo(() => {
    return SECTIONS.map((s) => ({
      ...s,
      keys: s.items.filter((k) => {
        const p = PRODUCTS[k];
        if (!p) return false;
        return cat === 'all' || (p.cats || []).includes(cat);
      }),
    })).filter((s) => s.keys.length);
  }, [cat]);

  const counts = useMemo(() => {
    const c = {};
    CATEGORIES.forEach((k) => {
      c[k.id] = k.id === 'all'
        ? Object.keys(PRODUCTS).length
        : Object.values(PRODUCTS).filter((p) => (p.cats || []).includes(k.id)).length;
    });
    return c;
  }, []);

  function add(p) {
    const line = { sku: p.sku, name: p.name, price: p.price, qty: 1 };
    if (typeof onAddToCart === 'function') return onAddToCart(line);
    if (typeof window !== 'undefined' && window.GreenhseCart && window.GreenhseCart.add) {
      return window.GreenhseCart.add(p.sku, p.name, p.price, 1);
    }
    if (typeof window !== 'undefined') window.location.href = href(p);
  }

  return (
    <main className="sl">
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <p className="eyebrow">STRIP LIGHTING · PERTH, WA</p>
        <h1>Strip lighting, <span className="lit">wall to wall</span></h1>
        <p className="lede">
          Strips by the metre, every channel profile, transformers and controllers — all in one
          place, all Australian certified, all in stock in Ellenbrook.
        </p>
        <div className="cta">
          <a className="btn" href={FINDER_URL}>Strip Light Finder →</a>
          <a className="btn ghost" href={LAYOUT_URL}>Lighting Layout App</a>
        </div>
      </section>

      {/* ---------------- filters ---------------- */}
      <nav className="filters" aria-label="Filter strip lights">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={'chip' + (cat === c.id ? ' on' : '')}
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
          >
            {c.label}<span className="n">{counts[c.id]}</span>
          </button>
        ))}
      </nav>

      {/* ---------------- sections ---------------- */}
      {visible.map((s) => (
        <section className="sec" id={s.id} key={s.id}>
          <header className="sechead">
            <h2>{s.title}</h2>
            <p>{s.intro}</p>
          </header>

          <div className="grid">
            {s.keys.map((k) => {
              const p = PRODUCTS[k];
              return (
                <article className="card" key={k} data-cats={p.cats.join(' ')}>
                  <button
                    type="button"
                    className={'wish' + (wish.includes(p.sku) ? ' on' : '')}
                    aria-pressed={wish.includes(p.sku)}
                    aria-label={(wish.includes(p.sku) ? 'Remove ' : 'Save ') + p.name}
                    onClick={() => toggleWish(p.sku)}
                  ><Heart /></button>
                  <a className="shot" href={href(p)} aria-label={p.name}>
                    {p.img ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={p.img} alt={p.name} loading="lazy" />
                    ) : (
                      <span className="nophoto">
                        <b>PHOTO NEEDS TO BE UPLOADED</b>
                        <em>{p.name}</em>
                      </span>
                    )}
                  </a>

                  <div className="body">
                    <p className="kicker">STRIP LIGHTS</p>
                    <h3><a href={href(p)}>{p.name}</a></h3>

                    <ul className="chips">
                      {(p.chips || []).map((c) => <li key={c}>{c}</li>)}
                    </ul>

                    {p.blurb && <p className="blurb">{p.blurb}</p>}

                    {p.variants && (
                      <ul className="variants">
                        {p.variants.map((v) => <li key={v}>{v}</li>)}
                      </ul>
                    )}

                    {/* Notes for the team — see the checklist at the top of the file.
                        Delete this block before launch, or leave it: it only renders
                        when a product still needs attention. */}
                    {(p.needsNewPhoto || p.reviewPrice || p.reviewWattage || p.reviewCat) && (
                      <p className="todo">
                        {p.needsNewPhoto && <span>📷 {p.needsNewPhoto} </span>}
                        {p.reviewWattage && <span>⚠️ {p.reviewWattage} </span>}
                        {p.reviewPrice && <span>⚠️ {p.reviewPrice} </span>}
                        {p.reviewCat && <span>⚠️ {p.reviewCat}</span>}
                      </p>
                    )}

                    <div className="foot">
                      <div className="price">
                        {p.price != null ? (
                          <>
                            <b>{p.from ? 'from ' : ''}${p.price.toFixed(2)}</b>
                            <small>ex-GST{p.unit}</small>
                          </>
                        ) : (
                          <><b>Price on request</b><small>ex-GST{p.unit}</small></>
                        )}
                      </div>

                      {p.magento ? (
                        <button type="button" className="add" onClick={() => add(p)}>
                          Add to cart
                        </button>
                      ) : (
                        <a className="add ghost" href="/contact/">Enquire</a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      {/* ---------------- help ---------------- */}
      <section className="help">
        <h2>Not sure which strip?</h2>
        <p>
          Four questions and the Strip Light Finder narrows it down — voltage, wet area, colour and
          how long the run is. Or call the showroom on <a href="tel:0892972969">(08) 9297 2969</a>.
        </p>
        <a className="btn" href={FINDER_URL}>Open the Strip Light Finder →</a>
      </section>

      {/* =========================================================================
          STYLES — styled-jsx, scoped to this component. Nothing else to import.
          ========================================================================= */}
      <style jsx>{`
        .sl { --ink:#14150f; --paper:#f4f5f0; --line:#dedcd2; --green:#00a800;
              --green-d:#14512C; --muted:#6b6e5f;
              color:var(--ink); background:var(--paper);
              font-family:Poppins,system-ui,-apple-system,sans-serif; }

        /* hero */
        .hero { background:#0e120d; color:#f2f3ec; padding:72px clamp(20px,5vw,64px) 64px; }
        .eyebrow { font-family:ui-monospace,Menlo,Consolas,monospace; font-size:11.5px;
                   letter-spacing:.22em; color:#9fdcb4; margin:0 0 14px; }
        .hero h1 { font-size:clamp(34px,5.4vw,62px); line-height:1.05; font-weight:800;
                   letter-spacing:-.02em; margin:0 0 16px; }
        .lit { color:#00c400; }
        .lede { max-width:620px; font-size:16.5px; line-height:1.65; color:#d7dcd2; margin:0 0 26px; }
        .cta { display:flex; gap:12px; flex-wrap:wrap; }
        .btn { display:inline-block; background:var(--green); color:#0b1109; font-weight:700;
               padding:14px 24px; border-radius:3px; text-decoration:none; font-size:15px; }
        .btn.ghost { background:#fff; color:var(--ink); }

        /* filters */
        .filters { position:sticky; top:0; z-index:20; display:flex; gap:8px; flex-wrap:wrap;
                   padding:16px clamp(20px,5vw,64px); background:rgba(244,245,240,.94);
                   backdrop-filter:saturate(1.2) blur(8px); border-bottom:1px solid var(--line); }
        .chip { display:inline-flex; align-items:center; gap:7px; padding:9px 14px; border-radius:99px;
                border:1px solid var(--line); background:#fff; color:var(--ink);
                font:600 12.5px/1 inherit; cursor:pointer; transition:border-color .15s,background .15s; }
        .chip:hover { border-color:var(--green-d); }
        .chip.on { background:var(--green-d); border-color:var(--green-d); color:#fff; }
        .chip .n { font-size:10.5px; font-weight:700; opacity:.6; font-variant-numeric:tabular-nums; }

        /* sections */
        .sec { padding:52px clamp(20px,5vw,64px) 8px; }
        .sechead h2 { font-size:clamp(19px,2.4vw,26px); font-weight:800; letter-spacing:.01em; margin:0 0 8px; }
        .sechead p { max-width:680px; color:var(--muted); font-size:14.5px; line-height:1.6; margin:0 0 26px; }

        .grid { display:grid; gap:20px; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); }

        /* card */
        .card { background:#fff; border:1px solid var(--line); border-radius:10px; overflow:hidden;
                display:flex; flex-direction:column; position:relative;
                transition:box-shadow .2s,border-color .2s; }
        .wish { position:absolute; top:10px; right:10px; z-index:2; width:34px; height:34px;
                display:grid; place-items:center; border:0; background:none; padding:0;
                color:var(--ink); cursor:pointer; transition:color .15s; }
        .wish:hover, .wish.on { color:var(--green); }
        .wish.on svg { fill:currentColor; }
        .card:hover { border-color:#c9cfc2; box-shadow:0 8px 26px rgba(20,21,15,.07); }
        .shot { display:block; aspect-ratio:4/3; background:#fbfbf8; display:grid; place-items:center;
                padding:14px; border-bottom:1px solid var(--line); }
        .shot img { max-width:100%; max-height:100%; object-fit:contain; }
        .nophoto { display:grid; gap:6px; place-items:center; text-align:center; padding:18px;
                   border:2px dashed #c9cfc2; border-radius:8px; width:100%; height:100%;
                   align-content:center; }
        .nophoto b { font:700 11px/1.4 ui-monospace,Menlo,Consolas,monospace; letter-spacing:.1em;
                     color:#9a6b1f; }
        .nophoto em { font-style:normal; font-size:11.5px; color:var(--muted); }

        .body { padding:16px 18px 18px; display:flex; flex-direction:column; flex:1; }
        .kicker { font:600 10px/1 ui-monospace,Menlo,Consolas,monospace; letter-spacing:.18em;
                  color:var(--muted); margin:0 0 8px; }
        .body h3 { font-size:16px; line-height:1.35; font-weight:700; margin:0 0 10px; }
        .body h3 a { color:inherit; text-decoration:none; }
        .body h3 a:hover { color:var(--green-d); }

        .chips { list-style:none; display:flex; flex-wrap:wrap; gap:6px; margin:0 0 12px; padding:0; }
        .chips li { font:600 10.5px/1 ui-monospace,Menlo,Consolas,monospace; letter-spacing:.04em;
                    padding:5px 8px; border:1px solid var(--line); border-radius:4px; color:#3a3d33; }

        .blurb { font-size:13.5px; line-height:1.6; color:var(--muted); margin:0 0 12px; }
        .variants { list-style:none; margin:0 0 12px; padding:0; display:grid; gap:4px; }
        .variants li { font-size:12.5px; color:#3a3d33; padding-left:14px; position:relative; }
        .variants li::before { content:'·'; position:absolute; left:4px; color:var(--green); font-weight:800; }

        .todo { font-size:11.5px; line-height:1.55; color:#9a3412; background:#fdf3ec;
                border:1px solid #eccfb8; border-radius:6px; padding:8px 10px; margin:0 0 12px; }

        .foot { margin-top:auto; display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .price b { display:block; font-size:21px; font-weight:800; letter-spacing:-.01em; }
        .price small { font:400 11px/1 ui-monospace,Menlo,Consolas,monospace; color:var(--muted); }
        .add { background:var(--green); color:#0b1109; border:0; border-radius:4px; padding:12px 18px;
               font:700 13.5px/1 inherit; cursor:pointer; text-decoration:none; display:inline-block; }
        .add:hover { background:var(--green-d); color:#fff; }
        .add.ghost { background:#fff; color:var(--ink); border:1px solid var(--line); }
        .add.ghost:hover { border-color:var(--green-d); color:var(--green-d); background:#fff; }

        /* help */
        .help { margin:56px clamp(20px,5vw,64px) 72px; padding:36px; background:#fff;
                border:1px solid var(--line); border-radius:10px; }
        .help h2 { font-size:22px; font-weight:800; margin:0 0 10px; }
        .help p { color:var(--muted); font-size:15px; line-height:1.65; max-width:620px; margin:0 0 20px; }
        .help a { color:var(--green-d); }
        .help .btn { color:#0b1109; text-decoration:none; }

        @media (max-width:600px) {
          .grid { grid-template-columns:1fr; }
          .filters { padding:12px 20px; }
        }
      `}</style>
    </main>
  );
}
