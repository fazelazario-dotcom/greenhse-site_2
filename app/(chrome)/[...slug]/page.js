import { notFound } from 'next/navigation';
import Script from 'next/script';
import { SITE, cleanPath } from '../../../lib/site';
import Pdp from '../../../components/Pdp';
import Cat from '../../../components/Cat';
import BlogPost from '../../../components/BlogPost';

/* One catch-all route drives every templated page on the site - all products,
   category landings, blog posts and the content pages - from data/site.json.
   The static build carried 334 hand-maintained HTML files; this carries four
   components and one data file. */

function lookup(slugParts){
  const clean='/'+slugParts.join('/')+'/';
  const candidates=[
    clean.slice(0,-1)+'.html',          // /about/  -> /about.html
    clean+'index.html',                 // /products/x/ -> /products/x/index.html
  ];
  for(const k of candidates){
    if(SITE.products[k])   return {kind:'product', data:SITE.products[k], key:k};
    if(SITE.categories[k]) return {kind:'category', data:SITE.categories[k], key:k};
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
  Object.keys(SITE.categories).forEach(add);
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
  if(hit.kind==='category') return <Cat c={hit.data} path={hit.key}/>;
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
