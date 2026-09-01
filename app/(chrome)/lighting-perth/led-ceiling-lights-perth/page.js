import Cat from '../../../../components/Cat';
import { SITE } from '../../../../lib/site';

/* ============================================================
   CEILING / PANEL / OYSTER LIGHTS — category page
   URL: /lighting-perth/led-ceiling-lights-perth/
   Product groups on this page: Ceiling & oyster lights, Panel lights, Track & linear, Wall lights.
   Layout: photo hero -> "Find your perfect ..." head -> product-group
   boxes -> grouped product grid -> Videos & Instructions -> connection
   PDFs -> SEO copy. All rendered by components/Cat.jsx from this
   category's entry in data/site.json (+ hero/videos/PDFs/copy from
   data/cat-extras.json). Live prices come from assets/magento.js.
   ============================================================ */
const KEY = '/lighting-perth/led-ceiling-lights-perth/index.html';
const c = SITE.categories[KEY];

export const metadata = {
  title: c.title || c.h1,
  description: c.desc || undefined,
  alternates: { canonical: '/lighting-perth/led-ceiling-lights-perth/' },
};

export default function Page() {
  return <Cat c={c} path={KEY} />;
}
