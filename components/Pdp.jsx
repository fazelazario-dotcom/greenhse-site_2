import Script from 'next/script';
import { mapHref } from '../lib/site';

/* Product detail page. Rendered statically from data/site.json; live price and
   stock are painted over the static figures client-side by assets/magento.js,
   exactly as the static build did (it keys off data-sku / data-price-target). */
export default function Pdp({ p }){
  return (<>
    <nav className="crumbs" aria-label="Breadcrumb">
      {(p.crumbs||[]).map((c,i)=>(
        <span key={i}><a href={mapHref(c.href)}>{c.label}</a><span> / </span></span>
      ))}
      <span className="here">{p.crumbHere||p.name}</span>
    </nav>
    <main className="pdp">
      <div className="pdp-media">
        {(p.images||[]).slice(0,1).map(src=>(
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={src} src={src} alt={p.name} width={900} height={900}/>
        ))}
      </div>
      <div className="pdp-info">
        {p.eyebrow && <div className="eyebrow">{p.eyebrow}</div>}
        <h1>{p.name}</h1>
        {!!(p.chips||[]).length &&
          <div className="chips">{p.chips.map(c=><span key={c} className="chip">{c}</span>)}</div>}
        {p.sku && (
          <div className="price" data-sku={p.sku}>
            <span data-price-target>{p.price}</span>{' '}
            <small>ex GST · <span data-price-inc-target>{p.priceInc}</span> inc GST</small>
            <span className="stock-live" data-stock-target hidden></span>
          </div>
        )}
        {p.descHtml && <p className="desc" dangerouslySetInnerHTML={{__html:p.descHtml}}/>}
        <div className="cta">
          <a className="btn dark" href="tel:0892972969">Call (08) 9297 2969 to order</a>
          {(p.crumbs||[]).length>1 &&
            <a className="btn" href={mapHref(p.crumbs[p.crumbs.length-1].href)}>More {String(p.crumbs[p.crumbs.length-1].label||'').toLowerCase()}</a>}
        </div>
        <p className="pickup">Pickup: 5/1 Locke Ln, Ellenbrook WA 6069 · Perth stock and support.</p>
        {p.optionsFor && <div className="pdp-live" data-options-target data-for={p.optionsFor} hidden></div>}
      </div>
    </main>

    {!!(p.options||[]).length && (
      <section className="block"><h2>Options</h2>
        <ul className="opts">
          {p.options.map((o,i)=>(
            <li key={i}><b>{o.name}</b><span>{o.price}</span>
              {o.sheet && <a className="opt-sheet" href={o.sheet} target="_blank" rel="noopener" title={o.sheetTitle||undefined}>Spec sheet ↓</a>}
            </li>
          ))}
        </ul>
      </section>
    )}

    {!!(p.specsheets||[]).length && (
      <section className="block"><h2>Spec sheets</h2>
        <div className="specsheets">
          {p.specsheets.map((x,i)=>(
            <a key={i} className="ss-item" href={x.href} target="_blank" rel="noopener">{x.label}<em>PDF</em></a>
          ))}
        </div>
      </section>
    )}

    {!!(p.specs||[]).length && (
      <section className="block"><h2>Specifications</h2>
        <table className="spec"><tbody>
          {p.specs.map(([k,v],i)=><tr key={i}><th>{k}</th><td>{v}</td></tr>)}
        </tbody></table>
      </section>
    )}
    {!!(p.box||[]).length && (
      <section className="block"><h2>What&apos;s in the box</h2>
        <ul className="bul">{p.box.map((x,i)=><li key={i}>{x}</li>)}</ul>
      </section>
    )}
    {!!(p.features||[]).length && (
      <section className="block"><h2>Features</h2>
        <ul className="bul">{p.features.map((x,i)=><li key={i}>{x}</li>)}</ul>
      </section>
    )}
    {!!(p.related||[]).length && (
      <section className="block"><h2>More in {p.relatedTitle}</h2>
        <div className="rgrid">
          {p.related.map((r,i)=>(
            <a key={i} className="rcard" href={mapHref(r.href)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.img} alt={r.name} loading="lazy"/>
              <span className="rname">{r.name}</span>
              <span className="rprice" data-sku={r.sku}><span data-price-target>{r.price}</span> <small>ex GST</small></span>
            </a>
          ))}
        </div>
      </section>
    )}
    <Script src="/assets/sku-map.js" strategy="afterInteractive"/>
    <Script src="/assets/magento.js" strategy="afterInteractive"/>
  </>);
}
