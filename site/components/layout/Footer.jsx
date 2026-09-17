'use client';
import Link from 'next/link';
import * as navigation from 'next/navigation';
import * as nav from '../../lib/nav';
import * as Icons from '../ui/Icons';
import * as asset from '../../lib/asset';
let l = {
  facebook: Icons.IconFacebook,
  instagram: Icons.IconInstagram,
  youtube: Icons.IconYoutube,
};
function O({ href: e, children: s, onClick: n, ...a }) {
  let i = e.startsWith('/') || e.startsWith('#'),
    l = e.startsWith('tel:') || e.startsWith('mailto:');
  return i ? (
    <Link href={e} onClick={n} {...a}>
      {s}
    </Link>
  ) : (
    <a
      href={e}
      {...(l
        ? {}
        : {
            target: '_blank',
            rel: 'noreferrer noopener',
          })}
      {...a}
    >
      {s}
    </a>
  );
}
export default function Default() {
  let e = new Date().getFullYear(),
    { showroom: r } = nav.company,
    u = navigation.usePathname();
  function c(e, t) {
    let r,
      s = -1 === (r = t.indexOf('#')) ? null : t.slice(r + 1);
    s &&
      '/' === u &&
      (e.preventDefault(),
      document.getElementById(s)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      }));
  }
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__logo">
            <img
              src={asset.asset('/greenhse-logo.png')}
              alt="greenhse Technologies"
              width={150}
              height={64}
              loading="lazy"
            />
          </span>
          <p className="site-footer__blurb">{nav.company.blurb}</p>
          <div className="showroom">
            <span className="showroom__label">{r.label}</span>
            <address className="showroom__lines">
              <span>{r.address}</span>
              <span>
                {'T: '}
                <a href={r.phoneHref}>{r.phone}</a>
              </span>
              <span>{r.hours}</span>
            </address>
          </div>
          <ul className="socials">
            {nav.socialLinks.map((e) => {
              let R = l[e.icon];
              return (
                <li key={e.label}>
                  <a
                    href={e.href}
                    className="socials__link"
                    aria-label={e.label}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <R aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="site-footer__cols">
          {nav.footerColumns.map((e) => (
            <div key={e.title} className="fcol">
              <h2 className="fcol__title">{e.title}</h2>
              <ul className="fcol__list">
                {e.links.map((e) => (
                  <li key={e.label}>
                    <O href={e.href} className="fcol__link" onClick={(t) => c(t, e.href)}>
                      {e.label}
                      {e.external && <Icons.IconArrowUpRight aria-hidden="true" />}
                    </O>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container site-footer__bar">
        <span className="site-footer__copy">
          {'© '}
          {e}
          {' Greenhse Technologies. All rights reserved.'}
        </span>
        <ul className="legal">
          {nav.legalLinks.map((e) => (
            <li key={e.label}>
              <O href={e.href} className="legal__link" onClick={(t) => c(t, e.href)}>
                {e.label}
              </O>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
