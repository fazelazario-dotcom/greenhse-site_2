import { notFound } from 'next/navigation';
import Script from 'next/script';
import { SITE, cleanPath } from '../../../lib/site';
import Pdp from '../../../components/Pdp';
import BlogPost from '../../../components/BlogPost';

/* This catch-all route drives the PRODUCT pages, BLOG POSTS and content
   pages (account, checkout, policies, light-lab) from data/site.json.

   It does NOT render the category pages any more: every category landing
   has its own page file under app/(chrome)/ — e.g.
   app/(chrome)/products/lighting-perth/led-downlights-perth/page.js —
   one file per page, each documenting its own URL and product groups. */

function lookup(slugParts){
  const clean='/'+slugParts.join('/')+'/';
  const candidates=[
    clean.slice(0,-1)+'.html',          // /about/  -> /about.html
    clean+'index.html',                 // /products/x/ -> /products/x/index.html
  ];
  for(const k of candidates){
    if(SITE.products[k])   return {kind:'product', data:SITE.products[k], key:k};
    if(SITE.blogs[k])      return {kind:'blog', data:SITE.blogs[k], key:k};
    if(SITE.simple[k])     return {kind:'simple', data:SITE.simple[k], key:k};
  }
  return null;
}

export function generateStaticParams(){
  const paths=[];
  const add=p=>{
    const c=cleanPath(p);
    if(c==='/') return;
    paths.push({slug:c.split('/').filter(Boolean)});
  };
  Object.keys(SITE.products).forEach(add);
  // categories are NOT added here — each has its own page.js (see above)
  Object.keys(SITE.blogs).forEach(add);
  Object.keys(SITE.simple).forEach(add);
  return paths;
}
export const dynamicParams=false;

export function generateMetadata({params}){
  const hit=lookup(params.slug);
  if(!hit) return {};
  const d=hit.data;
  return {
    title:d.title||d.name||d.h1,
    description:d.desc||undefined,
    alternates:{ canonical: cleanPath(d.canonical?d.canonical.replace('https://greenhse.com',''):undefined) },
  };
}

export default function Page({params}){
  const hit=lookup(params.slug);
  if(!hit) notFound();
  if(hit.kind==='product') return <Pdp p={hit.data}/>;
  if(hit.kind==='blog') return <main className="bl-article"><BlogPost b={hit.data}/></main>;
  // Content page: markup carried as data, page-scoped css alongside, and the
  // page's own client behaviour (account, checkout, light lab) loaded as the
  // same scripts the static build used. They attach to the same element ids.
  const d=hit.data;
  return (<>
    {d.css ? <style dangerouslySetInnerHTML={{__html:d.css}}/> : null}
    <div dangerouslySetInnerHTML={{__html:d.bodyHtml}}/>
    {(d.scripts||[]).map(src=><Script key={src} src={src} strategy="afterInteractive"/>)}
    {(d.inline||[]).map((code,i)=><Script key={'i'+i} id={'inline-'+params.slug.join('-')+'-'+i} strategy="lazyOnload" dangerouslySetInnerHTML={{__html:code}}/>)}
  </>);
}
