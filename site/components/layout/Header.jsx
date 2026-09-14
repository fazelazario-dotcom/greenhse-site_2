'use client';
import * as React from 'react';
import Link from 'next/link';
import * as navigation from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import * as nav from '../../lib/nav';
import * as Icons from '../ui/Icons';
import * as cartSlice from '../../store/cartSlice';
import * as wishlistSlice from '../../store/wishlistSlice';
import * as storage from '../../lib/storage';
import * as userSlice from '../../store/userSlice';
import * as asset from '../../lib/asset';
function H({ href: e, children: r, ...n }) {
  return e.startsWith('/') || e.startsWith('#') ? (
    <Link href={e} {...n}>
      {r}
    </Link>
  ) : (
    <a href={e} target="_blank" rel="noreferrer noopener" {...n}>
      {r}
    </a>
  );
}
export default function Default() {
  let [e, p] = React.useState(!1),
    [m, g] = React.useState(!1),
    [y, b] = React.useState(!1),
    w = React.useRef(null),
    _ = navigation.useRouter(),
    j = navigation.usePathname(),
    v = useDispatch(),
    x = useSelector(cartSlice.selectCartCount),
    k = useSelector(wishlistSlice.selectWishlistCount),
    P = useSelector(userSlice.selectIsAuthenticated),
    I = useSelector(userSlice.selectUser);
  function S(e, t) {
    let r,
      s = -1 === (r = t.indexOf('#')) ? null : t.slice(r + 1);
    s &&
      '/' === j &&
      (e.preventDefault(),
      document.getElementById(s)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      }));
  }
  return (
    React.useEffect(() => {
      if (e)
        return (
          document.addEventListener('pointerdown', t),
          document.addEventListener('keydown', r),
          () => {
            (document.removeEventListener('pointerdown', t), document.removeEventListener('keydown', r));
          }
        );
      function t(e) {
        w.current && !w.current.contains(e.target) && p(!1);
      }
      function r(e) {
        'Escape' === e.key && p(!1);
      }
    }, [e]),
    React.useEffect(
      () => (
        (document.body.style.overflow = m ? 'hidden' : ''),
        () => {
          document.body.style.overflow = '';
        }
      ),
      [m],
    ),
    (
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label="greenhse Technologies — home">
            <img
              src={asset.asset('/greenhse-logo-main.png')}
              alt="greenhse Technologies"
              className="brand__img"
              width={130}
              height={64}
              fetchPriority="high"
            />
          </Link>
          <nav className="nav" aria-label="Primary">
            {nav.navLinks.map((r) =>
              r.menu ? (
                <div key={r.label} className="nav__mega" ref={w}>
                  <button
                    type="button"
                    className={`nav__link nav__trigger${e ? ' is-open' : ''}`}
                    aria-expanded={e}
                    onClick={() => p((e) => !e)}
                  >
                    {r.label}
                    <Icons.IconChevronDown className="nav__caret" aria-hidden="true" />
                  </button>
                  {e && (
                    <div className="mega">
                      <ul className="mega__grid">
                        {nav.productCategories.map((e) => (
                          <li key={e.label}>
                            <H href={e.href} className="mega__item" onClick={() => p(!1)}>
                              <span className="mega__label">{e.label}</span>
                            </H>
                          </li>
                        ))}
                      </ul>
                      <div className="mega__foot">
                        <span className="mega__note">{nav.productsMenuFooter.note}</span>
                        <H href={nav.productsMenuFooter.cta.href} className="mega__cta" onClick={() => p(!1)}>
                          {nav.productsMenuFooter.cta.label} <span aria-hidden="true">→</span>
                        </H>
                      </div>
                    </div>
                  )}
                </div>
              ) : r.dot ? (
                <H key={r.label} href={r.href} className="nav__link" onClick={(e) => S(e, r.href)}>
                  {r.label}
                  {r.dot && <span className="nav__dot" aria-hidden="true" />}
                </H>
              ) : (
                <H key={r.label} href={r.href} className="nav__link" onClick={(e) => S(e, r.href)}>
                  {r.label}
                </H>
              ),
            )}
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="cart-btn"
              aria-label="Search products"
              onClick={function () {
                '/' === j
                  ? (document.getElementById('browse')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    }),
                    window.setTimeout(() => {
                      document.getElementById('site-search-input')?.focus();
                    }, 400))
                  : _.push('/#browse');
              }}
            >
              <Icons.IconSearch />
            </button>
            {P && (
              <Link
                href="/account/wishlist/"
                className="cart-btn"
                aria-label={`View wish list${k ? `, ${k} item${1 === k ? '' : 's'}` : ''}`}
              >
                <Icons.IconHeart />
                {k > 0 && <span className="cart-btn__badge">{k}</span>}
              </Link>
            )}
            <Link
              href="/cart"
              className="cart-btn"
              aria-label={`View cart${x ? `, ${x} item${1 === x ? '' : 's'}` : ''}`}
            >
              <Icons.IconBag />
              {x > 0 && <span className="cart-btn__badge">{x}</span>}
            </Link>
            <div className="account" onMouseEnter={() => b(!0)} onMouseLeave={() => b(!1)}>
              <Link
                href={P ? '/account/' : '/account/login/'}
                className="account__btn"
                aria-label={P ? `My Account${I?.firstname ? `, ${I.firstname}` : ''}` : 'Account'}
              >
                <Icons.IconUser />
              </Link>
              {y && (
                <div className="account__menu" role="menu">
                  {P ? (
                    <>
                      <Link href="/account/" className="account__item" role="menuitem" onClick={() => b(!1)}>
                        My Account
                      </Link>
                      <button
                        type="button"
                        className="account__item account__item--btn"
                        role="menuitem"
                        onClick={function () {
                          (storage.clearAuthToken(),
                            storage.clearQuoteId(),
                            v(userSlice.userLogout()),
                            v(cartSlice.resetCartState()),
                            v(wishlistSlice.resetWishlistState()),
                            b(!1),
                            _.push('/account/login/'));
                        }}
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/account/login/" className="account__item" role="menuitem" onClick={() => b(!1)}>
                        Sign In
                      </Link>
                      <Link href="/account/create/" className="account__item" role="menuitem" onClick={() => b(!1)}>
                        Create an Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              className="nav__burger"
              aria-label={m ? 'Close menu' : 'Open menu'}
              aria-expanded={m}
              onClick={() => g((e) => !e)}
            >
              {m ? <Icons.IconClose /> : <Icons.IconMenu />}
            </button>
          </div>
        </div>
        {m && (
          <div className="drawer">
            <nav className="container drawer__nav" aria-label="Mobile">
              {nav.navLinks.map((e) => (
                <H
                  key={e.label}
                  href={e.href}
                  className="drawer__link"
                  onClick={(t) => {
                    (S(t, e.href), g(!1));
                  }}
                >
                  {e.label}
                  {e.dot && <span className="nav__dot" aria-hidden="true" />}
                </H>
              ))}
              <span className="drawer__heading">All categories</span>
              {nav.productCategories.map((e) => (
                <H key={e.label} href={e.href} className="drawer__sublink" onClick={() => g(!1)}>
                  <span>{e.label}</span>
                  <span className="mega__count">{e.count}</span>
                </H>
              ))}
            </nav>
          </div>
        )}
      </header>
    )
  );
}
