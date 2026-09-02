import site from '../data/site.json';

/* One mapping from the static build's URLs to the app's clean URLs.
   Every old .html address 301s to its clean form via generated redirects,
   so nothing anyone has bookmarked or indexed breaks. */
export function cleanPath(p){
  if(!p) return p;
  if(p==='/index.html') return '/';
  if(p.endsWith('/index.html')) return p.slice(0,-'index.html'.length);
  if(p.endsWith('.html')) return p.slice(0,-5)+'/';
  return p;
}
export function mapHref(h){
  if(!h) return h;
  if(/^(https?:|#|tel:|mailto:|data:)/.test(h)) return h;
  // the planner ships as the self-contained tool it is
  if(h.startsWith('/layout.html')||h.startsWith('/layout-standalone.html')) return h;
  const [path,hash]=h.split('#');
  let c=cleanPath(path);
  /* the export writes every page as a folder, so an extensionless path
     needs its trailing slash — /products/x -> /products/x/ — or the local
     preview (and any strict static host) answers 404 */
  if(c && !c.endsWith('/') && !/\.[a-z0-9]+$/i.test(c.split('/').pop())) c+='/';
  return hash?c+'#'+hash:c;
}
export const SITE=site;
export function productByPath(p){ return site.products['/'+p] || site.products[p]; }
export function allPaths(){
  return {
    products:Object.keys(site.products),
    categories:Object.keys(site.categories),
    blogs:Object.keys(site.blogs),
    simple:Object.keys(site.simple),
  };
}
