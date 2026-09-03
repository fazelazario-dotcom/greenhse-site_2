import Script from 'next/script';
import { SITE, mapHref } from '../lib/site';
import extras from '../data/cat-extras.json';

/* Category card data historically carried empty price/sku fields, which left
   the card amounts blank and gave magento.js nothing to hook its live prices
   onto. Resolve each card against the product it links to at build time, so
   every card shows the catalogue price AND carries the data-sku hook that
   the Magento API paints the live figure over at page load. */
function withProduct(c){
  if(c.price && c.sku) return c;
  const href=c.href||'';
  const p=SITE.products[href] || SITE.products[href.replace(/\/$/,'')+'.html'] || null;
  if(!p) return c;
  return {...c, price:c.price||p.price, sku:c.sku||p.sku};
}

/* Category landing page, in the demo build's template: full-bleed photo
   hero with scrim, "Find your perfect …" range head, the product card
   grid, the dark Videos & Instructions band with the connection-PDF
   list, and the SEO copy block. Everything is data-driven — the grid
   comes from data/site.json exactly as before (magento.js still keys
   off data-sku / data-price-target for live prices), and the hero /
   videos / guides / copy come from data/cat-extras.json, read off the
   demo build per category. Bespoke sections some categories carry
   (channel profiles, the Smart Life teaser) still travel as content
   HTML. */

function Title({t}){
  // "Strip lighting.\n⟨Perfect⟩ anywhere." → lines with the accent span
  const lines=String(t||'').split('\n');
  return lines.map((ln,i)=>{
    const m=ln.match(/^(.*)⟨(.*)⟩(.*)$/);
    return (
      <span key={i}>
        {i>0 && <br/>}
        {m ? <>{m[1]}<span className="hero__accent">{m[2]}</span>{m[3]}</> : ln}
      </span>
    );
  });
}

function Card({c: raw}){
  const c=withProduct(raw);
  const Tag=c.href?'a':'div';
  const body=(<>
    <div className="card__tile">
      <div className="visual visual--photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {c.img && <img src={c.img} alt={c.name} loading="lazy"/>}
      </div>
    </div>
    <div className="card__body">
      {/* the card is the light, its name and its price — spec chips live on
          the product page itself, not here */}
      {(c.eyebrow||c.meta) ? <span className="eyebrow">{c.eyebrow||c.meta}</span> : null}
      <span className="card__title">{c.name}</span>
      <div className="card__foot">
        <div className="card__price" {...(c.sku?{'data-sku':c.sku}:{})}>
          <span className="card__amount" {...(c.sku?{'data-price-target':true}:{})}>{c.price}</span>
          <span className="card__gst">{c.priceNote||'ex GST'}</span>
        </div>
        {c.href
          ? <span className="btn card__quote card__quote--call">View →</span>
          : <a className="btn card__quote card__quote--call" href="tel:0892972969">Call us</a>}
      </div>
    </div>
  </>);
  return c.href
    ? <a className="card" href={mapHref(c.href)}>{body}</a>
    : <div className="card">{body}</div>;
}

const PlaySvg=(
  <svg className="vid__play" width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
    <circle cx="26" cy="26" r="25" fill="#0a0a09" fillOpacity=".72" stroke="#fff" strokeOpacity=".85"/>
    <path d="M21 17l14 9-14 9z" fill="#fff"/>
  </svg>
);
const PdfSvg=(
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>
  </svg>
);

export default function Cat({ c, path }){
  const x=(path && extras[path]) || null;
  /* Magento url_key for this category — the last real segment of its path.
     catalog.js reads it off the section and fetches the LIVE product list
     for the category from Magento GraphQL at page load. */
  const urlKey=path ? path.replace(/\/index\.html$/,'').split('/').filter(Boolean).pop() : null;
  const sections=(c.sections||[]).filter(Boolean);
  const flatCards=!sections.length ? (c.cards||[]) : null;
  const hero=x?.hero || c.banner;
  const finderHref=c.finder?mapHref(c.finder.href):null;

  return (<div className="tpl">
    {hero && (
      <section className="hero">
        <div aria-hidden="true" className="hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero} alt="" width={963} height={822} fetchPriority="high" className="hero__img"/>
        </div>
        <div aria-hidden="true" className="hero__scrim"></div>
        <div className="container hero__inner">
          {x?.eyebrow && <span className="hero__eyebrow">{x.eyebrow}</span>}
          <h1 className="hero__title">{x?.title ? <Title t={x.title}/> : (c.h1||c.title)}</h1>
          {(x?.lead||c.intro) && <p className="hero__lead">{x?.lead||c.intro}</p>}
          <div className="hero__actions">
            {finderHref && <a href={finderHref} className="hero__btn hero__btn--primary">{c.finder.cta||'Open the finder'} <span aria-hidden="true">→</span></a>}
            <a href="/layout-app/" className="hero__btn hero__btn--ghost">Lighting Layout App <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    )}
    {!hero && (c.h1||c.intro) && (
      <div className="page-intro"><div><h1>{c.h1}</h1>{c.intro && <p>{c.intro}</p>}</div></div>
    )}

    <section className="range" id={c.rangeId||undefined} data-live-category={urlKey||undefined}>
      <div className="container">
        <div className="range__head">
          <div className="range__copy">
            {(x?.range?.eyebrow) && <span className="eyebrow">{x.range.eyebrow}</span>}
            <h2 className="range__title">{x?.range?.title || c.h1 || 'Browse the range'}</h2>
            {(x?.range?.sub || c.count) && <p className="range__sub">{x?.range?.sub || c.count}</p>}
          </div>
          {finderHref && <a className="link-mono range__finder" href={finderHref}>Open the finder <span aria-hidden="true">→</span></a>}
        </div>
        {(sections.length>1 || (c.jumpExtra||[]).length>0) && (
          <nav className="shelfnav" aria-label="Product groups">
            {sections.map(s=>(
              <a key={s.id} className="shelfnav__box" href={'#'+s.id}>
                <span className="shelfnav__label">{s.h2}</span>
                <span className="shelfnav__count">{s.cards.length} product{s.cards.length===1?'':'s'} ↓</span>
              </a>
            ))}
            {(c.jumpExtra||[]).map(j=>(
              <a key={j.id} className="shelfnav__box" href={'#'+j.id}>
                <span className="shelfnav__label">{j.label}</span>
                <span className="shelfnav__count">{j.count} ↓</span>
              </a>
            ))}
          </nav>
        )}
        {x?.banner && (
          <div className="sl-banner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={x.banner.img} alt={x.banner.alt||''} loading="eager" width={980} height={980}/>
            <span>{x.banner.caption}</span>
          </div>
        )}
        {flatCards && <div className="grid">{flatCards.map((cd,i)=><Card key={i} c={cd}/>)}</div>}
        {sections.map((s,si)=>(
          <div key={si} id={s.id||undefined} className="range__section">
            {(si>0||s.h2!==x?.range?.title) && s.h2 && (
              <div className="range__head range__head--sub">
                <div className="range__copy">
                  <h3 className="range__title range__title--sub">{s.h2}</h3>
                  {s.sub && <p className="range__sub">{s.sub}</p>}
                  {s.note && <p className="range__sub range__note">{s.note}</p>}
                </div>
              </div>
            )}
            <div className="grid">{s.cards.map((cd,i)=><Card key={i} c={cd}/>)}</div>
          </div>
        ))}
      </div>
    </section>

    {(c.bespokeHtml||[]).map((h,i)=>(
      <div key={i} dangerouslySetInnerHTML={{__html:h}}/>
    ))}

    {!!(x?.videos||[]).length && (
      <section className="videos" id="videos">
        <div className="container">
          <div className="videos__head">
            <span className="videos__eyebrow">Videos &amp; Instructions</span>
          </div>
          <div className="videos__grid">
            {x.videos.map(v=>(
              <a key={v.id} className="vid vid--thumb" aria-label={'Play video: '+v.label}
                 href={'https://www.youtube.com/watch?v='+v.id} target="_blank" rel="noreferrer noopener"
                 style={{backgroundImage:`url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)`}}>
                {PlaySvg}
              </a>
            ))}
          </div>
          {!!(x?.guides||[]).length && (
            <div className="guides">
              <h3 className="guides__title">Connection &amp; setup PDFs</h3>
              <div className="guides__grid">
                {x.guides.map(g=>(
                  <a key={g.href} href={g.href} target="_blank" rel="noreferrer noopener" className="guide">
                    {PdfSvg}<span>{g.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    )}

    {x?.info?.html ? (
      <section className="info">
        <div className="container">
          {x.info.eyebrow && <span className="eyebrow">{x.info.eyebrow}</span>}
          <div className="info__body" dangerouslySetInnerHTML={{__html:x.info.html}}/>
        </div>
      </section>
    ) : (c.endHtml ? <div className="page-end" dangerouslySetInnerHTML={{__html:c.endHtml}}/> : null)}

    <Script src="/assets/sku-map.js" strategy="afterInteractive"/>
    <Script src="/assets/magento.js" strategy="afterInteractive"/>
    <Script src="/assets/catalog-map.js" strategy="afterInteractive"/>
    <Script src="/assets/catalog.js" strategy="afterInteractive"/>
  </div>);
}
