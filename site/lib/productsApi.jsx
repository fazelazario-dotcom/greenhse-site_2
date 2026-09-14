/* Product lookups for the browse page, the cards and the product page.
 *
 * The live site did these through Magento's admin REST API with an admin
 * token in the browser. That token must never ship to a browser, so this
 * version reads the same public per-category feeds the rest of the site uses
 * (www.getestimate.greenhse.com/api) and answers the same questions from
 * them: category list, search, product by sku, product by id. The shapes
 * returned are the raw Magento product records, exactly as before.
 */
import * as api from './api';
import { registerRaw, rawBySku } from './rawIndex';

const FEEDS = api.PRODUCT_RESOLUTION_FEEDS;
const PRODUCTS_ROOT = 45; // the store's "Products" category (the browse page's top-level groups live under it)

let rootCategories = null;
/* Top-level product categories: the grandchildren of category 45, active only,
   the same list the admin API gave the browse page. */
const getProductCategories = async () => {
  if (rootCategories && Date.now() - rootCategories.timestamp < 3e5) return rootCategories.promise;
  const promise = (async () => {
    const top = await api.fetchCategory(PRODUCTS_ROOT);
    const kids = api.categoryChildren(top);
    const parent = kids[0];
    if (!parent) return [];
    const sub = await api.fetchCategory(parent.id);
    return api.categoryChildren(sub).map((c) => ({ id: c.id, name: c.name, is_active: true }));
  })();
  rootCategories = { promise, timestamp: Date.now() };
  promise.catch(() => { rootCategories = null; });
  return promise;
};


/* One cached fetch per feed, so a sku lookup never downloads a feed twice. */
const feedCache = new Map();
const feedItems = (id) => {
  if (!feedCache.has(id)) {
    const pr = fetch(`https://www.getestimate.greenhse.com/api/product.php?id=${id}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j) => { const items = (Array.isArray(j.items) ? j.items : []).filter((p) => p.status === 1); registerRaw(items); return items; })
      .catch(() => { feedCache.delete(id); return []; });
    feedCache.set(id, pr);
  }
  return feedCache.get(id);
};

let allCache = null;
/* Every product in every feed, de-duplicated by id. */
const getAllProductsFull = async () => {
  const seen = new Map();
  const feeds = await Promise.all(FEEDS.map((f) => feedItems(f.id)));
  for (const items of feeds) for (const p of items) if (!seen.has(p.id)) seen.set(p.id, p);
  return [...seen.values()];
};
const getCachedAllProducts = () => {
  if (!allCache) allCache = getAllProductsFull().catch((e) => { allCache = null; throw e; });
  return allCache;
};

/* The first feed (in the site's category order) that carries a matching product. */
const findInFeeds = (match) =>
  new Promise((resolve, reject) => {
    let pending = FEEDS.length, done = false;
    const results = new Array(FEEDS.length);
    const settle = () => {
      for (let i = 0; i < results.length; i++) {
        if (results[i] === undefined) return;
        if (results[i]) { done = true; return resolve(results[i]); }
      }
    };
    FEEDS.forEach((f, i) => {
      feedItems(f.id).then((items) => { results[i] = items.find(match) || null; }, () => { results[i] = null; }).then(() => {
        if (done) return;
        settle();
        if (!done && --pending === 0) { done = true; resolve(null); }
      });
    });
  });

const categoryIds = (p) => {
  const v = (p.custom_attributes || []).find((a) => a.attribute_code === 'category_ids')?.value;
  return Array.isArray(v) ? v.map(String) : [];
};

/* Search / filter, paged like the admin API was. */
const getAllProducts = async ({ search = '', categoryId = '', page = 1, pageSize = 100 } = {}) => {
  let items;
  if (categoryId) {
    const r = await fetch(`https://www.getestimate.greenhse.com/api/product.php?id=${encodeURIComponent(categoryId)}`, { cache: 'no-store' });
    if (!r.ok) throw Object.assign(new Error(`Failed to fetch products: ${r.status}`), { status: r.status });
    const j = await r.json();
    items = (Array.isArray(j.items) ? j.items : []).filter((p) => p.status === 1);
    if (!items.length) items = (await getCachedAllProducts()).filter((p) => categoryIds(p).includes(String(categoryId)));
  } else items = await getCachedAllProducts();
  const q = search.trim().toLowerCase();
  if (q) items = items.filter((p) => String(p.name || '').toLowerCase().includes(q));
  const start = (page - 1) * pageSize;
  return { products: items.slice(start, start + pageSize), totalCount: items.length };
};

const bySku = new Map();
const getProductBySku = async (sku) => {
  const key = String(sku);
  const c = bySku.get(key);
  if (c && Date.now() - c.timestamp < 6e4) return c.promise;
  const lower = key.toLowerCase();
  const known = rawBySku(key);
  if (known) return known;
  const promise = findInFeeds((p) => p.sku === key || String(p.sku).toLowerCase() === lower).then((hit) => {
    if (!hit) throw Object.assign(new Error(`Product ${key} not found`), { status: 404 });
    return hit;
  });
  bySku.set(key, { promise, timestamp: Date.now() });
  promise.catch(() => bySku.delete(key));
  return promise;
};

/* A sku that can be added to the cart: the sku itself, or the nearest parent
   (option skus like DL10-PS-BLACK fall back to DL10-PS). */
const resolveAddableSku = async (sku) => {
  if (!sku) return sku;
  try { await getProductBySku(sku); return sku; } catch {}
  const parts = String(sku).split('-');
  for (let i = parts.length - 1; i >= 1; i--) {
    const cand = parts.slice(0, i).join('-');
    try { await getProductBySku(cand); return cand; } catch {}
  }
  return sku;
};

const getProductById = async (id) => findInFeeds((p) => String(p.id) === String(id));

export default {
  getProductCategories,
  getAllProducts,
  getProductBySku,
  resolveAddableSku,
  getProductById,
  getAllProductsFull,
  getCachedAllProducts,
};
export { getAllProducts, getCachedAllProducts, getProductById, getProductBySku, getProductCategories };
