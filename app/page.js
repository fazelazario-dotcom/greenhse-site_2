import Script from 'next/script';
import fs from 'node:fs';
import path from 'node:path';

export const metadata={
  title:'Greenhse Technologies — Trusted LED Lighting & Smart Home, Perth',
  description:'From a single downlight to a full commercial fit-out — Greenhse Technologies supplies certified, energy-smart LED lighting and home automation, all in one place.',
  alternates:{canonical:'/'},
};

/* The homepage is the one page on the site that is an application rather than
   a document: 27 KB of skeleton markup that a 730 KB module (public/assets/
   home-app.js) renders the shop grid, cart, both finder wizards, the
   applications carousel and the QA suite into. It ships its own header and
   footer because the cart, search and menu buttons live in them and the module
   wires those by id. Componentising it section by section is the natural next
   refactor; everything else on the site is already components + data. */
export default function Home(){
  const skeleton=fs.readFileSync(path.join(process.cwd(),'data','home-body.html'),'utf8');
  return (<>
    <link rel="stylesheet" href="/assets/home.css"/>
    <div dangerouslySetInnerHTML={{__html:skeleton}}/>
    <Script src="/assets/sku-map.js" strategy="afterInteractive"/>
    <Script src="/assets/account.js" strategy="afterInteractive"/>
    <Script src="/assets/checkout.js" strategy="afterInteractive"/>
    <Script src="/assets/magento.js" strategy="afterInteractive"/>
    <Script src="/assets/product-urls.js" strategy="afterInteractive"/>
    <Script src="/assets/url-sync4.js" strategy="afterInteractive"/>
    <Script src="/assets/home-app.js" strategy="afterInteractive"/>
  </>);
}
