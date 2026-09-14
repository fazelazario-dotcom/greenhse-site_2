'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import Link from 'next/link';
import ProductPage from '../product/ProductPage';
import * as api from '../../lib/api';
export default function Default() {
  let [e, o] = React.useState('checking'),
    [l, c] = React.useState(null);
  return (React.useEffect(() => {
    let e,
      t = (e = window.location.pathname.match(/^\/product\/([^/]+)\/?$/)) ? decodeURIComponent(e[1]) : null;
    if (!t) return void o('not-found');
    let i = !1;
    return (
      (async () => {
        let e =
          (
            await Promise.all(
              api.PRODUCT_RESOLUTION_FEEDS.map((e) => api.fetchStripLightProductBySlug(t, e).catch(() => null)),
            )
          ).find(Boolean) || null;
        i || (e ? (c(e), o('found')) : o('not-found'));
      })(),
      () => {
        i = !0;
      }
    );
  }, []),
  'checking' === e) ? (
    <main className="jsx-88b9ef482e438b44 nf-checking">
      <span aria-hidden="true" className="jsx-88b9ef482e438b44 nf-spinner" />
      <p className="jsx-88b9ef482e438b44">Loading…</p>
      <JSXStyle id="88b9ef482e438b44">
        {
          '.nf-checking.jsx-88b9ef482e438b44{flex-direction:column;justify-content:center;align-items:center;gap:16px;min-height:60vh;display:flex}.nf-spinner.jsx-88b9ef482e438b44{border:3px solid var(--line);border-top-color:var(--ink);border-radius:50%;width:36px;height:36px;animation:.8s linear infinite nf-spin}@keyframes nf-spin{to{transform:rotate(360deg)}}.nf-checking.jsx-88b9ef482e438b44 p.jsx-88b9ef482e438b44{color:var(--ink-soft);margin:0;font-size:14px}'
        }
      </JSXStyle>
    </main>
  ) : 'found' === e ? (
    <ProductPage product={l} />
  ) : (
    <main className="jsx-536541fbd9190a0 nf">
      <div className="jsx-536541fbd9190a0 container nf__inner">
        <p className="jsx-536541fbd9190a0 nf__eyebrow">404</p>
        <h1 className="jsx-536541fbd9190a0 nf__title">Page not found</h1>
        <p className="jsx-536541fbd9190a0 nf__sub">
          We couldn't find what you were looking for — it may have been moved or is no longer available.
        </p>
        <Link href="/" className="btn btn-dark">
          Back to home
        </Link>
      </div>
      <JSXStyle id="536541fbd9190a0">
        {
          '.nf.jsx-536541fbd9190a0{align-items:center;min-height:60vh;display:flex}.nf__inner.jsx-536541fbd9190a0{text-align:center;padding:80px 24px}.nf__eyebrow.jsx-536541fbd9190a0{font-family:var(--font-mono);letter-spacing:.14em;color:var(--ink-muted);margin:0 0 10px;font-size:12px}.nf__title.jsx-536541fbd9190a0{letter-spacing:-.02em;margin:0 0 12px;font-size:max(26px,min(3.4vw,38px));font-weight:600}.nf__sub.jsx-536541fbd9190a0{color:var(--ink-soft);max-width:46ch;margin:0 auto 26px;font-size:15px}'
        }
      </JSXStyle>
    </main>
  );
}
