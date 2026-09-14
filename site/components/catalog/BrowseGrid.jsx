'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../product/ProductCard';
import * as ProductCard2 from '../product/ProductCard';
import * as Icons from '../ui/Icons';
import * as api from '../../lib/api';
import * as productsApi from '../../lib/productsApi';
import * as withPinnedOrder from '../../lib/withPinnedOrder';
import * as catalogSlice from '../../store/catalogSlice';
export default function Default({
  heading: e = 'Browse & Build your order',
  subheading: h = 'Search, filter, compare specs, save and add to cart.',
  gridHeading: g = 'Popular Picks',
  limit: x,
  showViewAll: u = !1,
}) {
  let f = useDispatch(),
    m = useSelector(catalogSlice.selectCategories),
    j = useSelector(catalogSlice.selectCategoriesStatus),
    v = useSelector(catalogSlice.selectProducts),
    _ = useSelector(catalogSlice.selectProductsStatus),
    w = useSelector(catalogSlice.selectProductsError),
    [k, y] = React.useState(''),
    [S, N] = React.useState(''),
    [P, L] = React.useState(null);
  (React.useEffect(() => {
    (f(catalogSlice.categoriesLoading()),
      productsApi
        .getProductCategories()
        .then((e) => f(catalogSlice.categoriesLoaded(e)))
        .catch((e) => f(catalogSlice.categoriesFailed(e.message))));
  }, [f]),
    React.useEffect(() => {
      let e = setTimeout(() => N(k.trim()), 400);
      return () => clearTimeout(e);
    }, [k]),
    React.useEffect(() => {
      let e = !1,
        i = m.find((e) => e.id === P);
      return (
        f(catalogSlice.productsLoading()),
        productsApi
          .getAllProducts({
            search: S,
            categoryId: P || '',
          })
          .then(({ products: s }) => {
            if (e) return;
            let t = s.filter((e) => 4 === e.visibility),
              d = 'number' == typeof x ? t.slice(0, x) : t;
            f(
              catalogSlice.productsLoaded({
                products: d.map((e) => api.normalizeProduct(e, i?.name?.trim() || 'Products')),
                totalCount: t.length,
              }),
            );
          })
          .catch((i) => {
            e || f(catalogSlice.productsFailed(i.message));
          }),
        () => {
          e = !0;
        }
      );
    }, [f, P, S, m, x]));
  let C = React.useMemo(() => withPinnedOrder.withPinnedOrder(v), [v]);
  return (
    <>
      <section id="browse" className="jsx-d74257bd42bc40c6 browse">
        <div className="jsx-d74257bd42bc40c6 container">
          {u ? (
            <div className="jsx-d74257bd42bc40c6 head-row">
              <div className="jsx-d74257bd42bc40c6 section-head">
                <h2 className="jsx-d74257bd42bc40c6 section-title">{e}</h2>
                {h && <p className="jsx-d74257bd42bc40c6 section-sub">{h}</p>}
              </div>
              <Link className="link-mono head-row__link" href="/products/">
                {'View all products '}
                <span aria-hidden="true" className="jsx-d74257bd42bc40c6">
                  →
                </span>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="jsx-d74257bd42bc40c6 section-title">{e}</h2>
              {h && <p className="jsx-d74257bd42bc40c6 section-sub">{h}</p>}
            </>
          )}
          <form role="search" onSubmit={(e) => e.preventDefault()} className="jsx-d74257bd42bc40c6 search">
            <Icons.IconSearch className="search__icon" aria-hidden="true" />
            <input
              id="site-search-input"
              type="search"
              placeholder="Search downlights, high bay, strip, sensors…"
              value={k}
              onChange={(e) => y(e.target.value)}
              aria-label="Search products"
              className="jsx-d74257bd42bc40c6 search__input"
            />
          </form>
          <div id="chips" role="group" aria-label="Filter by category" className="jsx-d74257bd42bc40c6 chips">
            <button
              type="button"
              onClick={() => L(null)}
              className={`jsx-d74257bd42bc40c6 chip${null === P ? ' is-active' : ''}`}
            >
              All
            </button>
            {m.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => L(e.id)}
                className={`jsx-d74257bd42bc40c6 chip${P === e.id ? ' is-active' : ''}`}
              >
                {e.name.trim()}
              </button>
            ))}
            {'failed' === j && <span className="jsx-d74257bd42bc40c6 chips__error">Couldn't load categories.</span>}
          </div>
        </div>
      </section>
      <section id="popular" className="jsx-d74257bd42bc40c6 picks">
        <div className="jsx-d74257bd42bc40c6 container">
          <h2 className="jsx-d74257bd42bc40c6 section-title">{g}</h2>
          {'loading' === _ || 'idle' === _ ? (
            <div className="jsx-d74257bd42bc40c6 grid">
              <ProductCard2.ProductGridSkeleton count={8} />
            </div>
          ) : 'failed' === _ ? (
            <p className="jsx-d74257bd42bc40c6 picks__empty">
              Couldn't load products right now{w ? `: ${w}` : '.'}
              {' Please try again shortly.'}
            </p>
          ) : C.length > 0 ? (
            <div className="jsx-d74257bd42bc40c6 grid">
              {C.map((e) => (
                <ProductCard key={e.id} product={e} />
              ))}
            </div>
          ) : (
            <p className="jsx-d74257bd42bc40c6 picks__empty">No products match your search.</p>
          )}
        </div>
      </section>
      <JSXStyle id="d74257bd42bc40c6">
        {
          '.section-head.jsx-d74257bd42bc40c6{margin-bottom:34px}.section-title.jsx-d74257bd42bc40c6{letter-spacing:-.03em;margin:10px 0;font-size:max(28px,min(3.4vw,40px));font-weight:600;line-height:1.14}.section-sub.jsx-d74257bd42bc40c6{color:var(--ink-soft);max-width:56ch;margin:0;font-size:15px;line-height:1.6}.head-row.jsx-d74257bd42bc40c6{justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:34px;display:flex}.head-row.jsx-d74257bd42bc40c6 .section-head.jsx-d74257bd42bc40c6{margin-bottom:0}.head-row__link{flex:none;margin-bottom:6px}.browse.jsx-d74257bd42bc40c6{padding:56px 0 8px}.search.jsx-d74257bd42bc40c6{margin:26px 0 18px;position:relative}.search__icon{color:var(--ink-muted);position:absolute;top:50%;left:16px;transform:translateY(-50%)}.search__input.jsx-d74257bd42bc40c6{border:1px solid var(--line-strong);border-radius:var(--radius-sm);width:100%;color:var(--ink);background:#fff;padding:14px 16px 14px 44px;font-size:14.5px}.search__input.jsx-d74257bd42bc40c6:focus{border-color:var(--ink);outline:none}.chips.jsx-d74257bd42bc40c6{white-space:nowrap;scrollbar-width:thin;scrollbar-color:var(--ink-faint) var(--line);padding-bottom:14px;overflow:auto hidden}.chips.jsx-d74257bd42bc40c6::-webkit-scrollbar{height:5px}.chips.jsx-d74257bd42bc40c6::-webkit-scrollbar-track{background:var(--line);border-radius:999px}.chips.jsx-d74257bd42bc40c6::-webkit-scrollbar-thumb{background:var(--ink-faint);border-radius:999px}.chips.jsx-d74257bd42bc40c6.jsx-d74257bd42bc40c6::-webkit-scrollbar-thumb:hover{background:var(--ink-muted)}.chip.jsx-d74257bd42bc40c6{white-space:nowrap;color:var(--ink-soft);border:1px solid var(--line-strong);cursor:pointer;background:#fff;border-radius:999px;margin-right:8px;padding:8px 16px;font-size:13px;font-weight:500;transition:background .16s,color .16s,border-color .16s;display:inline-block}.chip.jsx-d74257bd42bc40c6:last-child{margin-right:0}.chips__error.jsx-d74257bd42bc40c6{color:var(--ink-muted);padding:8px 0;font-size:12.5px;display:inline-block}.chip.jsx-d74257bd42bc40c6:hover{border-color:var(--ink);color:var(--ink)}.chip.is-active.jsx-d74257bd42bc40c6{background:var(--ink);border-color:var(--ink);color:#fff}.picks.jsx-d74257bd42bc40c6{padding:32px 0 80px}.picks.jsx-d74257bd42bc40c6 .section-title.jsx-d74257bd42bc40c6{margin-bottom:24px}.picks__empty.jsx-d74257bd42bc40c6{color:var(--ink-soft);padding:40px 0;font-size:14px}.grid.jsx-d74257bd42bc40c6{grid-template-columns:repeat(4,1fr);gap:24px;display:grid}@media (width<=1080px){.grid.jsx-d74257bd42bc40c6{grid-template-columns:repeat(2,1fr)}}@media (width<=640px){.head-row.jsx-d74257bd42bc40c6{flex-direction:column;align-items:flex-start;gap:16px}.grid.jsx-d74257bd42bc40c6{grid-template-columns:1fr}}'
        }
      </JSXStyle>
    </>
  );
}
