import Script from 'next/script';
import fs from 'node:fs';
import path from 'node:path';

export const metadata={
  title:'Greenhse Technologies — Trusted LED Lighting & Smart Home, Perth',
  description:'From a single downlight to a full commercial fit-out — Greenhse Technologies supplies certified, energy-smart LED lighting and home automation, all in one place.',
  alternates:{canonical:'/'},
  openGraph:{
    title:'Greenhse Technologies — Trusted LED Lighting & Smart Home, Perth',
    description:'Certified, energy-smart LED lighting and home automation — Perth stock, expert advice, local support.',
    url:'/', siteName:'Greenhse Technologies', locale:'en_AU', type:'website',
  },
};

const JSONLD={
  '@context':'https://schema.org',
  '@type':'HomeAndConstructionBusiness',
  name:'Greenhse Technologies',
  description:'Certified, energy-smart LED lighting and home automation supplier in Perth, WA.',
  url:'https://greenhse.com/',
  telephone:'+61 8 9297 2969',
  address:{'@type':'PostalAddress',streetAddress:'5/1 Locke Ln',addressLocality:'Ellenbrook',addressRegion:'WA',postalCode:'6069',addressCountry:'AU'},
  openingHours:'Mo-Fr 08:00-17:00',
};

/* The homepage is the one page on the site that is an application rather than
   a document. Its markup lives ONE FILE PER SECTION in data/sections/ —
   00-header, 01-hero, 02-categories, 03-shop … 22-toasts — assembled here in
   manifest order (files 01–14 sit inside <main id="top">). The behaviour is
   the same deal: one file per feature in public/assets/home/, built into
   home-app.js (see scripts/build-home-app.js). The module renders the shop
   grid, cart, both finder wizards, the applications carousel and the QA suite
   into this skeleton, wiring everything by element id. */
function assembleSkeleton(){
  const dir=path.join(process.cwd(),'data','sections');
  const order=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8')).order;
  const part=f=>fs.readFileSync(path.join(dir,f),'utf8');
  const inMain=order.slice(1,15).map(part).join('');
  const after=order.slice(15).map(part).join('');
  return part(order[0])+'<main id="top">'+inMain+'</main>'+after;
}

export default function Home(){
  const skeleton=assembleSkeleton();
  return (<>
    <link rel="stylesheet" href="/assets/home.css"/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(JSONLD)}}/>
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
