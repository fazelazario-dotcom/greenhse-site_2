import Script from 'next/script';
import { mapHref } from '../lib/site';

function Pcard({c}){
  return (
    <a className="pcard" href={mapHref(c.href)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {c.img && <img src={c.img} alt={c.name} loading="lazy"
        {...(c.fallback?{onError:undefined}:{})}/>}
      <span className="pname">{c.name}</span>
      {c.meta ? <span className="pmeta">{c.meta}</span> : null}
      <span className="pprice" data-sku={c.sku}><span data-price-target>{c.price}</span> <small>ex GST</small></span>
    </a>
  );
}

/* Category landing page. The hero banner, intro, finder band and product grid
   are all data-driven; the handful of bespoke marketing sections some category
   pages carry (channel profiles, the Smart Life teaser) travel as content HTML
   until someone wants to componentise them individually. */
export default function Cat({ c }){
  return (<>
    {c.banner && (
      <section className="cat-hero">
        <div className="hero-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="banner" src={c.banner} alt={c.bannerAlt||''}/>
          {(c.hotspots||[]).map((h,i)=>(
            <a key={i} className={'hot '+h.cls} href={mapHref(h.href)} aria-label={h.label}></a>
          ))}
        </div>
        {(c.h1||c.intro) && (
          <div className="cat-copy">
            {c.h1 && <h1>{c.h1}</h1>}
            {c.intro && <p>{c.intro}</p>}
            {c.count && <p className="count">{c.count}</p>}
          </div>
        )}
      </section>
    )}
    {!c.banner && c.h1 && (
      <div className="page-intro"><div><h1>{c.h1}</h1>{c.intro && <p>{c.intro}</p>}
        {c.count && <p className="count">{c.count}</p>}</div></div>
    )}
    {c.finder && (
      <div className="finder-band"><div className="fb-in">
        <b>{c.finder.lead}</b> {c.finder.rest} <a className="fb-btn" href={mapHref(c.finder.href)}>{c.finder.cta}</a>
      </div></div>
    )}
    {!!(c.jump||[]).length && (
      <nav className="jump-nav">{c.jump.map(j=><a key={j.anchor} href={'#'+j.anchor}>{j.label}</a>)}</nav>
    )}
    {(c.sections||[]).filter(Boolean).map((s,si)=>(
      <section key={si} className="psec" id={s.id||undefined}>
        <div className="psec-head"><h2>{s.h2}</h2>{s.sub&&<p>{s.sub}</p>}{s.note&&<span className="psec-note">{s.note}</span>}</div>
        <div className="pgrid">{s.cards.map((x,i)=><Pcard key={i} c={x}/>)}</div>
      </section>
    ))}
    {!(c.sections||[]).length && !!(c.cards||[]).length && (
      <section className="psec"><div className="pgrid">{c.cards.map((x,i)=><Pcard key={i} c={x}/>)}</div></section>
    )}
    {(c.bespokeHtml||[]).map((h,i)=>(
      <div key={i} dangerouslySetInnerHTML={{__html:h}}/>
    ))}
    {c.endHtml && <div className="page-end" dangerouslySetInnerHTML={{__html:c.endHtml}}/>}
    <Script src="/assets/sku-map.js" strategy="afterInteractive"/>
    <Script src="/assets/magento.js" strategy="afterInteractive"/>
  </>);
}
