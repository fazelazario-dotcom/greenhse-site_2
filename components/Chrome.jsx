import Link from 'next/link';
import nav from '../data/nav.json';
import { SITE, mapHref } from '../lib/site';

/* The one header and one footer for the whole site, in the demo build's
   design (site-header / nav / mega / drawer / site-footer). Interactivity
   is CSS-only — the mega opens on hover/focus, the mobile drawer on a
   checkbox — so this stays a server component and works with JS disabled.
   The account/cart/search actions keep the same destinations the old
   header had; magento.js keys off nothing in here. */

function catCount(href){
  // product count per category, shown in the mega like the demo does
  const keys=[href+'index.html', href.replace(/\/$/,'')+'.html'];
  for(const k of keys){
    const c=SITE.categories[k];
    if(!c) continue;
    const seen=new Set();
    (c.sections||[]).forEach(s=>(s.cards||[]).forEach(x=>seen.add(x.href||x.name)));
    (c.cards||[]).forEach(x=>seen.add(x.href||x.name));
    if(seen.size) return seen.size;
  }
  return null;
}

const Svg={
  caret:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav__caret" aria-hidden="true"><path d="m5 9 7 7 7-7"/></svg>,
  search:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  cart:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  user:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>,
  burger:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>,
  ext:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>,
};

export function Header(){
  return (<>
    <input type="checkbox" id="gh-drawer" className="drawer-chk" aria-hidden="true"/>
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" aria-label="greenhse Technologies — home" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/greenhse-logo-main.png" alt="greenhse Technologies" className="brand__img" width={130} height={64} fetchPriority="high"/>
        </Link>
        <nav className="nav" aria-label="Primary">
          <div className="nav__mega">
            <button type="button" className="nav__link nav__trigger" aria-expanded="false" aria-haspopup="true">
              Products{Svg.caret}
            </button>
            <div className="mega" role="menu">
              <div className="mega__grid">
                {nav.mega.map(x=>{
                  const n=catCount(x.href);
                  return (
                    <a key={x.href} className="mega__item" href={mapHref(x.href)}>
                      {x.label}{n?<span className="mega__count">{n}</span>:null}
                    </a>
                  );
                })}
              </div>
              <div className="mega__foot">
                <span className="mega__note">{nav.megaFoot}</span>
                <a className="mega__cta" href="/layout-app/">Plan your layout ↗</a>
                <a className="mega__cta" href="/categories/">Browse the full range →</a>
              </div>
            </div>
          </div>
          {nav.main.map(x=>(
            <a key={x.href+x.label} className={'nav__link'+(x.dot?' nav__dot':'')} href={mapHref(x.href)}>{x.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="cart-btn" aria-label="Browse all products" href="/categories/">{Svg.search}</a>
          <a className="cart-btn" aria-label="View cart" href="/#shop">{Svg.cart}</a>
          <div className="account">
            <a className="account__btn" aria-label="Account" href="/account/">{Svg.user}</a>
          </div>
          <label htmlFor="gh-drawer" className="nav__burger" aria-label="Open menu">{Svg.burger}</label>
        </div>
      </div>
    </header>
    <div className="drawer" id="menu-drawer">
      <nav className="drawer__nav" aria-label="Menu">
        <span className="drawer__heading">Products</span>
        {nav.mega.map(x=><a key={x.href} className="drawer__sublink" href={mapHref(x.href)}>{x.label}</a>)}
        <span className="drawer__heading">Explore</span>
        {nav.main.map(x=><a key={x.href+x.label} className="drawer__link" href={mapHref(x.href)}>{x.label}</a>)}
        <a className="drawer__link" href="/layout-app/">Layout planner</a>
        <a className="drawer__link" href="/account/">Account</a>
      </nav>
    </div>
  </>);
}

export function Footer(){
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/greenhse-logo.png" alt="greenhse Technologies" width={150} height={64} loading="lazy"/>
          </span>
          <p className="site-footer__blurb">
            Greenhse Technologies — Perth&apos;s trusted LED lighting and smart home supplier.
            Certified fittings, expert advice, local support.
          </p>
          <div className="showroom">
            <span className="showroom__label">Perth showroom</span>
            <address className="showroom__lines">
              <span>5/1 Locke Ln, Ellenbrook WA 6069</span>
              <span>T: <a href="tel:+61892972969">(08) 9297 2969</a></span>
              <span>Mon–Fri 8AM–5PM</span>
            </address>
          </div>
          <ul className="socials">
            <li><a href="https://www.facebook.com/greenhouseinternational/" className="socials__link" aria-label="Facebook" target="_blank" rel="noreferrer noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.55.45-1 1-1Z"/></svg>
            </a></li>
            <li><a href="https://www.instagram.com/greenhsetechnologies/" className="socials__link" aria-label="Instagram" target="_blank" rel="noreferrer noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>
            </a></li>
            <li><a href="https://www.youtube.com/@GreenhseTechnologies" className="socials__link" aria-label="YouTube" target="_blank" rel="noreferrer noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.5 8.2a3 3 0 0 0-2.1-2.1C18.5 5.6 12 5.6 12 5.6s-6.5 0-8.4.5A3 3 0 0 0 1.5 8.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 3.8 3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-3.8ZM10 15.1V8.9l5.2 3.1L10 15.1Z"/></svg>
            </a></li>
          </ul>
        </div>
        <div className="site-footer__cols">
          {nav.footer.map(col=>(
            <div className="fcol" key={col.title}>
              <h2 className="fcol__title">{col.title}</h2>
              <ul className="fcol__list">
                {col.links.map(l=>(
                  <li key={l.href+l.label}>
                    <a className="fcol__link" href={mapHref(l.href)}
                       {...(/^https?:/.test(l.href)?{target:'_blank',rel:'noreferrer noopener'}:{})}>
                      {l.label}{l.ext?Svg.ext:null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container site-footer__bar">
        <span className="site-footer__copy">© 2026 Greenhse Technologies. All rights reserved. Prices exclude GST unless stated.</span>
        <ul className="legal">
          <li><a className="legal__link" href="/privacy/">Privacy</a></li>
          <li><a className="legal__link" href="/terms/">Terms</a></li>
          <li><a className="legal__link" href="/returns/">Returns &amp; Shipping</a></li>
          <li><a className="legal__link" href="/contact/">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
