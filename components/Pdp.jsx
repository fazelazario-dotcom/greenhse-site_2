import Script from 'next/script';
import { mapHref } from '../lib/site';
import Gallery from './Gallery';

/* Product detail page, in the demo build's template: crumbs, the
   two-column panel (photo gallery + buy info), trust ticks, Key
   features, Specifications, spec sheets, and the related-products
   rail. Rendered statically from data/site.json; live price and stock
   are painted over the static figures client-side by assets/magento.js,
   exactly as before (it keys off data-sku / data-price-target). */

const Tick=(
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
);
const PdfSvg=(
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
);

export default function Pdp({ p }){
  const catCrumb=(p.crumbs||[]).length>1 ? p.crumbs[p.crumbs.length-1] : null;
  return (<div className="tpl">
    <main className="detail">
      <div className="container">
        <nav aria-label="Breadcrumb" className="crumbs">
          {(p.crumbs||[]).map((c,i)=>(
            <span key={i}><a href={mapHref(c.href)}>{c.label}</a><span aria-hidden="true"> / </span></span>
          ))}
          <span className="crumbs__here">{p.crumbHere||p.name}</span>
        </nav>

        <div className="panel">
          <div className="panel__media">
            <Gallery images={p.images||[]} alt={p.name}/>
          </div>
          <div className="panel__info">
            {p.eyebrow && <span className="eyebrow">{p.eyebrow}</span>}
            <h1 className="panel__title">{p.name}</h1>
            {!!(p.chips||[]).length &&
              <div className="card__chips">{p.chips.map(c=><span key={c} className="chip-spec">{c}</span>)}</div>}
            {p.sku && (
              <div className="panel__price-row" data-sku={p.sku}>
                <span className="panel__price" data-price-target>{p.price}</span>
                <span className="panel__gst">ex-GST <span className="panel__sep">·</span> <span data-price-inc-target>{p.priceInc}</span> inc-GST</span>
                <span className="stock-live" data-stock-target hidden></span>
              </div>
            )}
            {p.descHtml && (
              <div className="panel__desc-wrap">
                <p className="panel__desc" dangerouslySetInnerHTML={{__html:p.descHtml}}/>
              </div>
            )}
            <div className="panel__buy">
              {p.sku
                ? <button type="button" className="btn panel__quote panel__quote--call"
                    data-cart-add={p.sku} data-cart-name={p.name} data-cart-price={p.price}>Add to cart</button>
                : null}
              {catCrumb &&
                <a className="btn btn-ghost" href={mapHref(catCrumb.href)}>More {String(catCrumb.label||'').toLowerCase()}</a>}
            </div>
            <div id="pdp-cartbar" hidden
              style={{margin:'10px 0 0',display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
              <span style={{fontSize:'13px',color:'#2c7a4b',fontWeight:600}}>
                ✓ In your cart: <span data-cart-count>0</span></span>
              <button type="button" className="btn btn-ghost" data-cart-checkout>Checkout →</button>
            </div>
            <p className="panel__pickup">Pickup: 5/1 Locke Ln, Ellenbrook WA 6069 · Perth stock and support.</p>
            <ul className="trust">
              <li><span aria-hidden="true">✓</span> Australian certified</li>
              <li><span aria-hidden="true">✓</span> Perth stock &amp; support</li>
              <li><span aria-hidden="true">✓</span> Fast WA delivery</li>
            </ul>
            {p.optionsFor && <div className="pdp-live" data-options-target data-for={p.optionsFor} hidden></div>}
            <div className="rule"></div>

            {!!(p.features||[]).length && (
              <section className="block"><h2>Key features</h2>
                <ul className="ticks">
                  {p.features.map((x,i)=><li key={i}>{Tick}<span>{x}</span></li>)}
                </ul>
              </section>
            )}

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

            {!!(p.specs||[]).length && (
              <section className="block"><h2>Specifications</h2>
                <table className="specs"><tbody>
                  {p.specs.map(([k,v],i)=><tr key={i}><th scope="row">{k}</th><td>{v}</td></tr>)}
                </tbody></table>
              </section>
            )}

            {!!(p.box||[]).length && (
              <section className="block"><h2>What&apos;s in the box</h2>
                <ul className="ticks">{p.box.map((x,i)=><li key={i}>{Tick}<span>{x}</span></li>)}</ul>
              </section>
            )}

            {!!(p.specsheets||[]).length && (
              <section className="block"><h2>Spec sheets</h2>
                <div className="specsheets">
                  {p.specsheets.map((x,i)=>(
                    <a key={i} className="ss-item" href={x.href} target="_blank" rel="noopener">{PdfSvg}<span>{x.label}</span><em>PDF</em></a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {!!(p.related||[]).length && (
          <section className="block block--cross"><h2>More in {p.relatedTitle}</h2>
            <div className="cross">
              {p.related.map((r,i)=>(
                <a key={i} className="cross__card" href={mapHref(r.href)}>
                  <span className="cross__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.img} alt={r.name} loading="lazy"/>
                  </span>
                  <span className="cross__body">
                    <span className="cross__name">{r.name}</span>
                    <span className="cross__price" data-sku={r.sku}><span data-price-target>{r.price}</span> <small>ex GST</small></span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
    <Script src="/assets/sku-map.js" strategy="afterInteractive"/>
    <Script src="/assets/magento.js" strategy="afterInteractive"/>
    <Script src="/assets/account.js" strategy="afterInteractive"/>
    <Script src="/assets/checkout.js" strategy="afterInteractive"/>
    <Script src="/assets/cart.js" strategy="afterInteractive"/>
  </div>);
}
