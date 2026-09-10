import Script from 'next/script';
import { asset } from '../../../lib/assets';
import StripLightPage from '../../../STRIPLIGHT-PAGE';

/* ============================================================
   STRIP LIGHTS — rebuilt page (round 31)
   URL: /strip-lights/

   Everything on this page comes from STRIPLIGHT-PAGE.jsx, which sits at the
   TOP LEVEL of the project (next to README.md) so it is easy to find and hand
   to Jatin —
   that ONE file holds the product data, the section order, the filter
   categories, the layout and the styles. It is deliberately
   self-contained so Jatin can copy it straight into his build with
   nothing else to wire up.

   This wrapper only does the two site-specific things:
     1. loads /assets/cart.js so Add to cart works here, and
     2. points the cards at this site's product pages, which are
        SKU-shaped (/products/lighting-perth/led-strip-lights/<sku>/)
        rather than the /product/<url_key>/ default in the component.

   The old category page at /products/lighting-perth/led-strip-lights/
   is untouched, so the two can be compared side by side.
   ============================================================ */

export const metadata = {
  title: 'Strip Lighting Perth | LED Strip Lights, Channels & Controllers | Greenhse',
  description:
    'LED strip lighting by the metre in Perth — all-purpose SMD, dotless COB, CCT adjustable white, RGB, ' +
    'long-run 240V and IP68, plus channels, transformers and controllers. Australian certified, in stock in Ellenbrook.',
  alternates: { canonical: '/strip-lights/' },
};

const CAT = '/products/lighting-perth/led-strip-lights/';

/* Keyed by the product's Magento url_key (p.key in the component). This is a
   plain object, not a function, because a server component cannot hand a
   function to a client component. Products with no page of their own are
   simply left out and fall back to the component's default link. */
const PDP = {
  '24v-smd-strip-light-12w':              CAT + 'st24v-smd-all/',
  '24v-smd-strip-light-20w':              CAT + 'st24v-smd-all/',
  '24v-smd-display-strip-light-23w':      CAT + 'st24v-smd-all-4/',
  '240v-strip-light-pro':                 CAT + 'st240v-pro/',
  '24v-dotless-cob-strip-light-3000k':    '/products/strip/st24v-longrun-ip68/',
  '24v-long-run-cob-strip-ip68':          '/products/strip/st24v-longrun-ip68/',
  '24v-long-run-garden-strip-ip68':       '/products/strip/st24v-longrun-ip68/',
  '24v-dotless-cob-strip-light-16w':      CAT + 'st24v-9w-15w-cct-cob-1/',
  '24v-dotless-cob-strip-light-2700k':    CAT + 'st24v-9w-15w-cct-cob-1/',
  '24v-dotless-rgb-cob-strip-light-16w':  CAT + 'st24v-rgb-cob/',
  '24v-dotless-rgb-cob-strip-light-15w':  CAT + 'st24v-rgb-cob/',
  '240v-rgb-led-strip-light':             CAT + 'st240v-rgb/',
  'led-strip-light-controllers-receivers':CAT + 'rgb-ctrlr-037/',
  'led-wireless-remote-controllers':      CAT + 'remote-control-grp/',
  '24v-transformers-australian-certified':CAT + 'tr24v-all/',
  '12v-transformers-australian-certified':CAT + 'tr12v-all/',
  '24v-strip-channel-group':              '/lighting-perth/led-strip-lights/24vstrip-channels-new/',

  /* No product page of their own yet — send these to the category page so
     nothing links into a 404. Replace each one as its page is created. */
  '12x12-neon-rgb-magic':                 CAT,
  'spa-rgbw-ip65-magic':                  CAT,
  '6x12-cct-neon-strip':                  CAT,
  'meat-display-strip':                   CAT,
};

export default function Page() {
  return (
    <>
      <Script src={asset("/assets/cart.js")} strategy="afterInteractive" />
      <StripLightPage productUrls={PDP} />
    </>
  );
}
