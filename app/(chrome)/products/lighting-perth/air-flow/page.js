import Cat from '../../../../../components/Cat';
import { SITE } from '../../../../../lib/site';

/* ============================================================
   AIR FLOW / CEILING FANS — category page
   URL: /products/lighting-perth/air-flow/
   Product groups on this page: Ceiling fans, Exhaust fans, Bathroom heat & light.
   Layout: photo hero -> "Find your perfect ..." head -> product-group
   boxes -> grouped product grid -> Videos & Instructions -> connection
   PDFs -> SEO copy. All rendered by components/Cat.jsx from this
   category's entry in data/site.json (+ hero/videos/PDFs/copy from
   data/cat-extras.json). Live prices come from assets/magento.js.
   ============================================================ */
const KEY = '/products/lighting-perth/air-flow/index.html';
const c = SITE.categories[KEY];

export const metadata = {
  title: c.title || c.h1,
  description: c.desc || undefined,
  alternates: { canonical: '/products/lighting-perth/air-flow/' },
};

export default function Page() {
  return <Cat c={c} path={KEY} />;
}
