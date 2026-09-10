/* One version stamp for every file we serve out of /public/assets/.
 *
 * Those filenames never change, so a browser that cached /assets/catalog.js
 * last week keeps running last week's code no matter what we deploy — the
 * "I fixed it but it's still there" trap. Appending ?v=<ASSET_V> gives each
 * release its own URL, which no cache can satisfy from an old entry, so a
 * deploy reaches everyone the moment they load the page.
 *
 * BUMP THIS whenever anything under public/assets/ changes.
 */
export const ASSET_V = '36';

/* asset('/assets/cart.js') -> '/assets/cart.js?v=36' */
export function asset(path) {
  return path + (path.includes('?') ? '&' : '?') + 'v=' + ASSET_V;
}
