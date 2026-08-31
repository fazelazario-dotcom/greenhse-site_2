import Link from 'next/link';
import nav from '../data/nav.json';

/* The one header and one footer for the whole site. In the static build these
   were copied into 334 files and every change was a scripted bulk edit; here
   they live once. Class names are kept from the static build so site.css
   styles them unchanged. */

export function Header(){
  return (<>
    <input type="checkbox" id="ghd-mtoggle" className="ghd-mchk" />
    <header className="ghd"><div className="ghd-wrap"><nav className="ghd-nav" aria-label="Main">
      <Link className="ghd-brand" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/inline/greenhse-mark.webp" alt="Greenhse Technologies" width={34} height={34}/>
        <span className="ghd-name">green<b>hse</b></span>
      </Link>
      <ul className="ghd-main">
        <li>
          <button aria-haspopup="true">Products <i className="ghd-caret"></i></button>
          <div className="ghd-mega" role="menu">
            <div className="ghd-mgrid">
              {nav.mega.map(x=><a key={x.href} href={x.href}>{x.label}</a>)}
            </div>
            <div className="ghd-mfoot">
              <span>{nav.megaFoot}</span>
              <a href="/layout.html">Plan your layout ↗</a>
              <a href="/categories/">Browse the full range →</a>
            </div>
          </div>
        </li>
        {nav.main.map(x=>(
          <li key={x.href}><a className={x.dot?'ghd-dot':undefined} href={x.href}>{x.label}</a></li>
        ))}
      </ul>
      <div className="ghd-tools">
        <a className="ghd-ic ghd-ic--search" href="/categories/" aria-label="Browse all products">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        </a>
        <a className="ghd-ic" href="/account.html" aria-label="Your account">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>
        </a>
        <a className="ghd-ic" href="/#shop" aria-label="Cart">
          <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
        </a>
        <label htmlFor="ghd-mtoggle" className="ghd-burger" aria-label="Open menu">
          <svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </label>
      </div>
    </nav></div></header>
    <label htmlFor="ghd-mtoggle" className="ghd-scrim"></label>
    <aside className="ghd-mnav" aria-label="Menu">
      <div className="ghd-mnav-head">
        <span className="ghd-name">green<b>hse</b></span>
        <label htmlFor="ghd-mtoggle" className="ghd-mclose">×</label>
      </div>
      {nav.mobile.map(x=><a key={x.href+x.label} className="ghd-mlink" href={x.href}>{x.label}</a>)}
    </aside>
  </>);
}

export function Footer(){
  return (
    <footer className="ftr">
      <div className="ftr-in">
        <div>
          <b>Greenhse Technologies</b><br/>
          5/1 Locke Ln, Ellenbrook WA 6069<br/>
          <a href="tel:+61892972969">(08) 9297 2969</a> · Mon–Fri 8AM–5PM
        </div>
        <div className="ftr-cats">
          {nav.mega.map(x=><a key={x.href} href={x.href}>{x.label}</a>)}
        </div>
      </div>
      <div className="ftr-legal">
        <a href="/about.html">About</a> · <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a> · <a href="/returns.html">Returns &amp; Shipping</a> · <a href="/contact.html">Contact</a>
        <br/>© 2026 Greenhse Technologies. Prices exclude GST unless stated.
        Specifications are supplier figures and may change without notice.
      </div>
    </footer>
  );
}
