import Cat from '../../../../components/Cat';
import { SITE } from '../../../../lib/site';

/* ============================================================
   SCHOOL & COMMERCIAL LED LIGHTING — category page
   URL: /lighting-perth/commercial-lighting-perth/
   Product groups on this page: Downlights, Panels & ceiling lights, Battens, track & linear, Wall lights, High bay, flood & area, Strip lighting, Emergency & exit.
   Layout: photo hero -> "Find your perfect ..." head -> product-group
   boxes -> grouped product grid -> Videos & Instructions -> connection
   PDFs -> SEO copy. All rendered by components/Cat.jsx from this
   category's entry in data/site.json (+ hero/videos/PDFs/copy from
   data/cat-extras.json). Live prices come from assets/magento.js.
   ============================================================ */
const KEY = '/lighting-perth/commercial-lighting-perth/index.html';
const c = SITE.categories[KEY];

export const metadata = {
  title: c.title || c.h1,
  description: c.desc || undefined,
  alternates: { canonical: '/lighting-perth/commercial-lighting-perth/' },
};

export default function Page() {
  return <Cat c={c} path={KEY} />;
}
