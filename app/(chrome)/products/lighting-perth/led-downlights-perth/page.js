import Cat from '../../../../../components/Cat';
import { SITE } from '../../../../../lib/site';

/* ============================================================
   DOWNLIGHTS — category page
   URL: /products/lighting-perth/led-downlights-perth/
   Product groups on this page: Standard downlights, Low glare, Smart & colour, Large & commercial.
   Layout: photo hero -> "Find your perfect ..." head -> product-group
   boxes -> grouped product grid -> Videos & Instructions -> connection
   PDFs -> SEO copy. All rendered by components/Cat.jsx from this
   category's entry in data/site.json (+ hero/videos/PDFs/copy from
   data/cat-extras.json). Live prices come from assets/magento.js.
   ============================================================ */
const KEY = '/products/lighting-perth/led-downlights-perth/index.html';
const c = SITE.categories[KEY];

export const metadata = {
  title: c.title || c.h1,
  description: c.desc || undefined,
  alternates: { canonical: '/products/lighting-perth/led-downlights-perth/' },
};

export default function Page() {
  return <Cat c={c} path={KEY} />;
}
