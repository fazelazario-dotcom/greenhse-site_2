/* Raw Magento product records already downloaded by any page (the category
   grids, the finders, the browse page) are indexed here by sku, so a lookup
   for a product that is on screen never fetches anything. */
const rawIndex = new Map();
export const registerRaw = (items) => { for (const p of Array.isArray(items) ? items : []) if (p && p.sku) rawIndex.set(String(p.sku).toLowerCase(), p); };
export const rawBySku = (sku) => rawIndex.get(String(sku).toLowerCase()) || null;
