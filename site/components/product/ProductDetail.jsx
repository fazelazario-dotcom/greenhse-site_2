'use client';
import JSXStyle from 'styled-jsx/style';
import * as navigation from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import ProductVisual from './ProductVisual';
import * as React from 'react';
import * as resizedImage from '../../lib/resizedImage';
import OptionsPopup from './OptionsPopup';
import * as Icons from '../ui/Icons';
import * as api from '../../lib/api';
import * as api2 from '../../lib/api';
import * as productsApi from '../../lib/productsApi';
import * as OptionsPopup2 from './OptionsPopup';
import * as stripFinder from '../../lib/stripFinder';
import * as cartSlice from '../../store/cartSlice';
import * as uiSlice from '../../store/uiSlice';
import * as userSlice from '../../store/userSlice';
import * as wishlistSlice from '../../store/wishlistSlice';
function LC({ product: e }) {
  let t = Array.isArray(e.images) ? e.images.filter(Boolean) : [],
    r = t.length > 1,
    [c, f] = React.useState(0);
  React.useEffect(() => {
    f(0);
  }, [e.id]);
  let d = r
    ? {
        ...e,
        image: t[c],
      }
    : e;
  return (
    <div className="jsx-210aca1b79786e62 gallery">
      {r && (
        <div role="tablist" aria-label={`${e.name} photos`} className="jsx-210aca1b79786e62 gallery__thumbs">
          {t.map((e, s) => (
            <button
              key={e}
              type="button"
              role="tab"
              aria-selected={s === c}
              onClick={() => f(s)}
              className={`jsx-210aca1b79786e62 gallery__thumb${s === c ? ' is-active' : ''}`}
            >
              <img
                src={resizedImage.resizedImage(e, 160)}
                alt=""
                loading="lazy"
                decoding="async"
                className="jsx-210aca1b79786e62"
              />
            </button>
          ))}
        </div>
      )}
      <div className="jsx-210aca1b79786e62 gallery__main">
        <ProductVisual product={d} fit="panel" />
      </div>
      <JSXStyle id="210aca1b79786e62">
        {
          '.gallery.jsx-210aca1b79786e62{flex-direction:row;gap:12px;width:100%;display:flex}.gallery__main.jsx-210aca1b79786e62{aspect-ratio:1;background:var(--bg-plate);width:100%;position:relative;overflow:hidden}.gallery__thumbs.jsx-210aca1b79786e62{scrollbar-width:none;flex-direction:column;gap:8px;width:76px;max-height:568px;padding-bottom:2px;display:flex;overflow-y:auto}.gallery__thumb.jsx-210aca1b79786e62{border:1px solid var(--line);border-radius:var(--radius-sm);cursor:pointer;background:#fff;flex:none;width:64px;height:64px;padding:6px;transition:border-color .15s,box-shadow .15s}.gallery__thumb.jsx-210aca1b79786e62 img.jsx-210aca1b79786e62{object-fit:contain;width:100%;height:100%;display:block}.gallery__thumb.jsx-210aca1b79786e62:hover{border-color:var(--line-strong)}.gallery__thumb.is-active.jsx-210aca1b79786e62{border-color:var(--green);box-shadow:0 0 0 1px var(--green)}'
        }
      </JSXStyle>
    </div>
  );
}
let j = ['Australian certified', 'Perth stock & support', 'Fast WA delivery'];
export default function Default({ product: e, onNavigate: o, variant: y = 'page' }) {
  let v,
    k = useDispatch(),
    _ = navigation.useRouter(),
    C = useSelector(userSlice.selectIsAuthenticated),
    N = useSelector(wishlistSlice.selectWishlistItemByProductId(e?.id ?? null)),
    S = !!N,
    [I, T] = React.useState([]),
    [B, P] = React.useState(!0),
    [R, L] = React.useState(1),
    [V, O] = React.useState(!1),
    [A, q] = React.useState(null),
    [K, W] = React.useState(!1),
    [$, E] = React.useState(!1),
    [G, z] = React.useState(null),
    [M, F] = React.useState(!1),
    [H, D] = React.useState(null),
    [U, Y] = React.useState([]),
    [Q, J] = React.useState(null),
    [X, Z] = React.useState(null),
    [ee, ea] = React.useState(null);
  React.useEffect(() => {
    if (!e?.sku) return;
    let a = !1;
    return (
      productsApi
        .getProductBySku(e.sku)
        .then((s) => {
          !a && s && ea(api2.normalizeProduct(s, e.category));
        })
        .catch(() => {}),
      () => {
        a = !0;
      }
    );
  }, [e?.sku, e?.category]);
  let es = ee?.id === e?.id ? ee : e;
  try {
    v = JSON.parse(es?.extensionAttributes?.spec_sheets);
  } catch {
    v = null;
  }
  let et = Array.isArray(v) && v?.length > 0 ? v : [],
    [er, en] = React.useState(e?.id);
  if (
    (e?.id !== er && (en(e?.id), E(!1)),
    React.useEffect(() => {
      let e = !1;
      return (
        (async () => {
          try {
            let a = await productsApi.getCachedAllProducts();
            e || T(a);
          } catch (a) {
            (console.log('Failed to fetch products:', a), e || T([]));
          } finally {
            e || P(!1);
          }
        })(),
        () => {
          e = !0;
        }
      );
    }, []),
    React.useEffect(() => {
      let e = !1;
      if (es?.sku === '24vStrip-Channels-new') {
        let e = stripFinder
          .channelPool(I)
          .filter((e) => 'number' == typeof e.price)
          .sort((e, a) => e.price - a.price);
        (Y(e), J(es?.id ?? null), Z(e.find((e) => e.sku === es.sku)?.sku ?? null));
        return;
      }
      return (
        Promise.all(
          (es?.groupedSkus || []).map((e) =>
            productsApi
              .getProductBySku(e)
              .then((e) => (e ? api2.normalizeProduct(e, es.category) : null))
              .catch(() => null),
          ),
        ).then((a) => {
          if (e) return;
          let s = a
            .filter(Boolean)
            .filter((e) => 'number' == typeof e.price)
            .sort((e, a) => e.price - a.price);
          (Y(s), J(es?.id ?? null), Z(s.find((e) => e.sku === es.sku)?.sku ?? null));
        }),
        () => {
          e = !0;
        }
      );
    }, [es, I]),
    !e)
  )
    return null;
  let ei = (function (e, a) {
      try {
        let s = e?.sku?.toLowerCase(),
          t = s?.split('-')[0],
          r = a
            ?.filter((a) => {
              if (!a?.sku) return !1;
              let s = a?.sku?.toLowerCase(),
                r = s?.split('-')[0];
              return a?.id !== e?.id && r === t;
            })
            .slice(0, 4),
          n = r?.map((e) => ({
            ...e,
            slug: api2.getAttr(e, 'url_key') || e.sku,
            image: api2.getImage(e),
          }));
        return Array.isArray(n) ? n : [];
      } catch {
        return [];
      }
    })(es, I),
    eo = Array.isArray(es.box) ? es.box : [],
    el = Array.isArray(es.features) ? es.features : [],
    ec = Array.isArray(es.specFields)
      ? es.specFields
      : [
          {
            label: 'Category',
            value: es.category,
          },
        ].filter((e) => e.value),
    ef = Array.isArray(es.specs) ? es.specs : [],
    ed =
      ef.length > 0
        ? [
            {
              label: 'Category',
              value: es.category,
            },
            ...ef,
          ]
        : ec,
    ep = 'number' == typeof es.price,
    eu = es.groupedSkus?.length > 0 && Q !== es.id,
    eh = Q === es.id && U.length > 0,
    em = (eh && U.find((e) => e.sku === X)) || null,
    eg = em || es,
    ex = !1 !== eg.inStock,
    eb = !!eg.callUs;
  async function ew() {
    if (!V && !eb) {
      if (eh && !em) return void q('Please choose an option first.');
      (O(!0), q(null));
      try {
        let e = em
          ? em.options || []
          : ee?.id === es.id
            ? ee.options
            : await productsApi
                .getProductBySku(es.sku)
                .then((e) => e?.options || [])
                .catch(() => []);
        if (OptionsPopup2.hasRequiredOptions(e))
          return void z({
            rawOptions: e,
          });
        (await k(
          cartSlice.addItem({
            ...eg,
            quantity: R,
          }),
        ).unwrap(),
          L(1));
      } catch (e) {
        q(e.message || "Couldn't add this to your cart.");
      } finally {
        O(!1);
      }
    }
  }
  async function ej() {
    if (!C) return void _.push('/account/login/');
    if (!K) {
      (W(!0), q(null));
      try {
        S
          ? await k(wishlistSlice.removeWishlistItem(N.wishlistItemId)).unwrap()
          : await k(wishlistSlice.addWishlistItem(es)).unwrap();
      } catch (e) {
        q(e.message || "Couldn't update your wish list.");
      } finally {
        W(!1);
      }
    }
  }
  async function ey({ qty: e, customOptions: a }) {
    (F(!0), D(null));
    try {
      (await k(
        cartSlice.addItem({
          ...eg,
          quantity: e,
          customOptions: a,
        }),
      ).unwrap(),
        z(null),
        L(1));
    } catch (e) {
      D(e.message || "Couldn't add this to your cart.");
    } finally {
      F(!1);
    }
  }
  return (
    encodeURIComponent(es.name),
    (
      <div className="jsx-f665f548c6a16a7f panel">
        <div className="jsx-f665f548c6a16a7f panel__media">
          <LC product={em || es} />
        </div>
        <div className="jsx-f665f548c6a16a7f panel__info">
          <span className="jsx-f665f548c6a16a7f eyebrow">{es.category}</span>
          <h1 className="jsx-f665f548c6a16a7f panel__title">{es.name}</h1>
          <div className="jsx-f665f548c6a16a7f panel__price-row">
            <span className="jsx-f665f548c6a16a7f panel__price">
              {ep ? `${api.formatPrice(es.price)}` : 'Price on request'}
            </span>
            {ep && (
              <span className="jsx-f665f548c6a16a7f panel__gst">
                {'ex-GST '}
                <span className="jsx-f665f548c6a16a7f panel__sep">·</span> {api.formatPrice(api.incGst(es.price))}
                {' inc-GST'}
              </span>
            )}
            <span className={`jsx-f665f548c6a16a7f panel__stock${ex ? ' panel__stock--in' : ''}`}>
              {ex ? 'In stock' : 'Out of stock'}
            </span>
          </div>
          {es.sku && (
            <p className="jsx-f665f548c6a16a7f panel__sku">
              {'SKU: '}
              {es.sku}
            </p>
          )}
          {es.description && (
            <div className="jsx-f665f548c6a16a7f panel__desc-wrap">
              <p className={`jsx-f665f548c6a16a7f panel__desc${$ ? ' panel__desc--expanded' : ''}`}>{es.description}</p>
              {es.description.length > 180 && (
                <button type="button" onClick={() => E((e) => !e)} className="jsx-f665f548c6a16a7f panel__desc-toggle">
                  {$ ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}
          {(eh || eu) && (
            <section className="jsx-f665f548c6a16a7f options">
              <label htmlFor="panel-option" className="jsx-f665f548c6a16a7f options__label">
                Choose option{eh && ` — ${U.length} available`}
              </label>
              {eu ? (
                <p className="jsx-f665f548c6a16a7f options__loading">Loading options…</p>
              ) : (
                <>
                  <select
                    id="panel-option"
                    value={em?.sku || ''}
                    onChange={(e) => Z(e.target.value)}
                    className="jsx-f665f548c6a16a7f"
                  >
                    {!em && (
                      <option value="" disabled={!0} className="jsx-f665f548c6a16a7f">
                        Select an option
                      </option>
                    )}
                    {U.map((e) => (
                      <option key={e.sku} value={e.sku} className="jsx-f665f548c6a16a7f">
                        {e.name}
                        {' — '}
                        {api.formatPrice(e.price)}
                      </option>
                    ))}
                  </select>
                  <div className="jsx-f665f548c6a16a7f options__grid">
                    {U.map((e) => (
                      <button
                        key={e.sku}
                        type="button"
                        onClick={() => Z(e.sku)}
                        aria-pressed={e.sku === em?.sku}
                        className={`jsx-f665f548c6a16a7f options__swatch${e.sku === em?.sku ? ' is-active' : ''}`}
                      >
                        <span className="jsx-f665f548c6a16a7f options__swatch-media">
                          <ProductVisual product={e} fit="cross" />
                        </span>
                        <span className="jsx-f665f548c6a16a7f options__swatch-name">{e.name}</span>
                        <span className="jsx-f665f548c6a16a7f options__swatch-price">{api.formatPrice(e.price)}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}
          <div className="jsx-f665f548c6a16a7f panel__buy">
            {eb ? (
              <button
                type="button"
                onClick={() => k(uiSlice.requestEnquiry(eg))}
                className="jsx-f665f548c6a16a7f btn panel__quote panel__quote--call"
              >
                Call Us
              </button>
            ) : (
              <>
                <div role="group" aria-label="Quantity" className="jsx-f665f548c6a16a7f qty">
                  <button
                    type="button"
                    onClick={() => L((e) => Math.max(1, e - 1))}
                    disabled={!ep || !ex || R <= 1}
                    aria-label="Decrease quantity"
                    className="jsx-f665f548c6a16a7f"
                  >
                    −
                  </button>
                  <span aria-live="polite" className="jsx-f665f548c6a16a7f qty__val">
                    {R}
                  </span>
                  <button
                    type="button"
                    onClick={() => L((e) => e + 1)}
                    disabled={!ep || !ex}
                    aria-label="Increase quantity"
                    className="jsx-f665f548c6a16a7f"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={ew}
                  disabled={!ep || !ex || V}
                  className="jsx-f665f548c6a16a7f btn btn-dark panel__quote"
                >
                  {ex ? (V ? 'Adding…' : 'Add to cart') : 'Out of stock'}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={ej}
              disabled={K}
              aria-label={S ? `Remove ${es.name} from wish list` : `Add ${es.name} to wish list`}
              aria-pressed={S}
              className={`jsx-f665f548c6a16a7f panel__wishlist${S ? ' panel__wishlist--active' : ''}`}
            >
              <Icons.IconHeart fill={S ? 'currentColor' : 'none'} />
            </button>
          </div>
          {A && <p className="jsx-f665f548c6a16a7f panel__buy-error">{A}</p>}
          <ul className="jsx-f665f548c6a16a7f trust">
            {j.map((e) => (
              <li key={e} className="jsx-f665f548c6a16a7f">
                <span aria-hidden="true" className="jsx-f665f548c6a16a7f">
                  ✓
                </span>{' '}
                {e}
              </li>
            ))}
          </ul>
          <div className="jsx-f665f548c6a16a7f rule" />
          {eo.length > 0 && (
            <section className="jsx-f665f548c6a16a7f block">
              <h2 className="jsx-f665f548c6a16a7f">What's in the box</h2>
              <ul className="jsx-f665f548c6a16a7f ticks">
                {eo.map((e) => (
                  <li key={e} className="jsx-f665f548c6a16a7f">
                    <Icons.IconCheck />
                    <span className="jsx-f665f548c6a16a7f">{e}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {el.length > 0 && (
            <section className="jsx-f665f548c6a16a7f block">
              <h2 className="jsx-f665f548c6a16a7f">Key features</h2>
              <ul className="jsx-f665f548c6a16a7f ticks">
                {el.map((e) => (
                  <li key={e} className="jsx-f665f548c6a16a7f">
                    <Icons.IconCheck />
                    <span className="jsx-f665f548c6a16a7f">{e}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {ed.length > 0 && (
            <section className="jsx-f665f548c6a16a7f block">
              <h2 className="jsx-f665f548c6a16a7f">Specifications</h2>
              <table className="jsx-f665f548c6a16a7f specs">
                <tbody className="jsx-f665f548c6a16a7f">
                  {ed.map((e) => (
                    <tr key={e.label} className="jsx-f665f548c6a16a7f">
                      <th scope="row" className="jsx-f665f548c6a16a7f">
                        {e.label}
                      </th>
                      <td className="jsx-f665f548c6a16a7f">{e.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
          {et?.length > 0 && (
            <section className="jsx-f665f548c6a16a7f block">
              <h2 className="jsx-f665f548c6a16a7f">Spec sheets</h2>
            </section>
          )}
          <div className={'jsx-f665f548c6a16a7f ' + ((et?.length > 0 ? 'specsheets' : '') || '')}>
            {et.map((e, s) => (
              <a key={s} href={e?.url} target="_blank" rel="noopener" className="jsx-f665f548c6a16a7f ss-item">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="jsx-f665f548c6a16a7f">
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    className="jsx-f665f548c6a16a7f"
                  />
                  <path d="M14 2v6h6" className="jsx-f665f548c6a16a7f" />
                </svg>
                <span className="jsx-f665f548c6a16a7f">{e?.label}</span>
                <em className="jsx-f665f548c6a16a7f">PDF</em>
              </a>
            ))}
          </div>
          {(B || ei.length > 0) && (
            <section className="jsx-f665f548c6a16a7f block">
              <h2 className="jsx-f665f548c6a16a7f">You might also need</h2>
              <div className="jsx-f665f548c6a16a7f cross">
                {B
                  ? Array.from({
                      length: 4,
                    }).map((e, s) => (
                      <div
                        key={s}
                        aria-hidden="true"
                        className="jsx-f665f548c6a16a7f cross__card cross__card--skeleton"
                      >
                        <span className="jsx-f665f548c6a16a7f cross__media sk" />
                        <span className="jsx-f665f548c6a16a7f cross__body">
                          <span className="jsx-f665f548c6a16a7f sk sk--cross-name" />
                          <span className="jsx-f665f548c6a16a7f sk sk--cross-price" />
                        </span>
                      </div>
                    ))
                  : ei.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => (o ? o(e) : k(uiSlice.openQuickView(e)))}
                        className="jsx-f665f548c6a16a7f cross__card"
                      >
                        <span className="jsx-f665f548c6a16a7f cross__media">
                          <ProductVisual product={e} fit="cross" />
                        </span>
                        <span className="jsx-f665f548c6a16a7f cross__body">
                          <span className="jsx-f665f548c6a16a7f cross__name">{e.name}</span>
                          <span className="jsx-f665f548c6a16a7f cross__price">
                            {'number' == typeof e.price ? api.formatPrice(e.price) : 'POA'}
                          </span>
                        </span>
                      </button>
                    ))}
              </div>
            </section>
          )}
        </div>
        {G && (
          <OptionsPopup
            product={eg}
            rawOptions={G.rawOptions}
            initialQty={R}
            submitting={M}
            submitError={H}
            onClose={() => {
              M || (z(null), D(null));
            }}
            onSubmit={ey}
          />
        )}
        <JSXStyle id="f665f548c6a16a7f">
          {
            '.panel.jsx-f665f548c6a16a7f{grid-template-columns:1fr 1fr;align-items:start;gap:48px;display:grid}.panel__media.jsx-f665f548c6a16a7f{position:sticky;top:24px}.panel__title.jsx-f665f548c6a16a7f{letter-spacing:-.02em;margin:10px 0 16px;font-size:max(26px,min(2.4vw,32px));font-weight:600;line-height:1.2}.panel__price-row.jsx-f665f548c6a16a7f{flex-wrap:wrap;align-items:baseline;gap:16px;display:flex}.panel__price.jsx-f665f548c6a16a7f{letter-spacing:-.02em;font-size:34px;font-weight:600}.panel__gst.jsx-f665f548c6a16a7f{font-family:var(--font-mono);color:var(--ink-muted);font-size:11px}.panel__sep.jsx-f665f548c6a16a7f{margin:0 4px}.panel__stock.jsx-f665f548c6a16a7f{font-family:var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:#b3261e;border-radius:var(--radius-sm);background:#b3261e14;border:1px solid #b3261e40;align-items:center;padding:4px 10px;font-size:11px;font-weight:600;display:inline-flex}.panel__stock--in.jsx-f665f548c6a16a7f{color:var(--green-hover);background:#00a80014;border-color:#00a80040}.panel__sku.jsx-f665f548c6a16a7f{font-family:var(--font-mono);color:var(--ink-muted);margin:8px 0 0;font-size:11.5px}.panel__desc-wrap.jsx-f665f548c6a16a7f{margin:18px 0 20px}.panel__desc.jsx-f665f548c6a16a7f{color:var(--ink-soft);-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical;max-width:54ch;margin:0 0 6px;font-size:15px;line-height:1.7;display:-webkit-box;overflow:hidden}.panel__desc--expanded.jsx-f665f548c6a16a7f{-webkit-line-clamp:unset;line-clamp:unset;overflow:visible}.panel__desc-toggle.jsx-f665f548c6a16a7f{font-family:var(--font-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--green);cursor:pointer;background:0 0;border:0;padding:0;font-size:11.5px;display:inline-block}.panel__desc-toggle.jsx-f665f548c6a16a7f:hover{color:var(--green-hover)}.panel__bullets.jsx-f665f548c6a16a7f{margin:0 0 26px}.panel__bullets.jsx-f665f548c6a16a7f li.jsx-f665f548c6a16a7f{font-size:14px}.options.jsx-f665f548c6a16a7f{margin:0 0 26px}.options__label.jsx-f665f548c6a16a7f{font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--green);margin-bottom:6px;font-size:10px;display:block}.options__loading.jsx-f665f548c6a16a7f{color:var(--ink-muted);margin:0;font-size:13.5px}.options.jsx-f665f548c6a16a7f select{width:100%;color:var(--ink);border:1px solid var(--line-strong);border-radius:var(--radius-sm);cursor:pointer;background:#fff;padding:11px 12px;font-family:inherit;font-size:14px}.options.jsx-f665f548c6a16a7f select:focus{border-color:var(--ink);outline:none}.options__grid.jsx-f665f548c6a16a7f{grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px;display:grid}.options__swatch.jsx-f665f548c6a16a7f{text-align:left;border:1px solid var(--line);border-radius:var(--radius-sm);background:var(--bg-raised);cursor:pointer;flex-direction:column;padding:8px;transition:border-color .15s,box-shadow .15s;display:flex}.options__swatch.jsx-f665f548c6a16a7f:hover{border-color:var(--line-strong)}.options__swatch.is-active.jsx-f665f548c6a16a7f{border-color:var(--green);box-shadow:0 0 0 1px var(--green);background:#fff}.options__swatch-media.jsx-f665f548c6a16a7f{aspect-ratio:4/3;background:#fff;width:100%;display:block;overflow:hidden}.options__swatch-name.jsx-f665f548c6a16a7f{margin-top:8px;font-size:11.5px;line-height:1.35}.options__swatch-price.jsx-f665f548c6a16a7f{color:var(--ink-muted);margin-top:3px;font-size:11px}.panel__actions.jsx-f665f548c6a16a7f{flex-wrap:wrap;gap:10px;margin-bottom:12px;display:flex}.panel__actions-call.jsx-f665f548c6a16a7f,.panel__actions-site.jsx-f665f548c6a16a7f{white-space:nowrap;flex:1;min-width:200px;height:48px;font-size:14px}.panel__pickup-note.jsx-f665f548c6a16a7f{color:var(--ink-muted);margin:0;font-size:12.5px;line-height:1.55}.panel__buy.jsx-f665f548c6a16a7f{align-items:stretch;gap:12px;display:flex}.qty.jsx-f665f548c6a16a7f{border:1px solid var(--line-strong);border-radius:var(--radius-sm);flex:none;align-items:center;height:52px;display:inline-flex;overflow:hidden}.qty.jsx-f665f548c6a16a7f button.jsx-f665f548c6a16a7f{width:42px;height:100%;color:var(--ink);cursor:pointer;background:0 0;border:0;place-items:center;font-size:18px;line-height:1;display:grid}.qty.jsx-f665f548c6a16a7f button.jsx-f665f548c6a16a7f:hover:not(:disabled){background:var(--hover-bg)}.qty.jsx-f665f548c6a16a7f button.jsx-f665f548c6a16a7f:disabled{opacity:.4;cursor:not-allowed}.qty__val.jsx-f665f548c6a16a7f{text-align:center;font-variant-numeric:tabular-nums;min-width:40px;font-size:15px}.panel__quote.jsx-f665f548c6a16a7f{flex:1;max-width:320px;height:52px;font-size:15px}.panel__quote--call.jsx-f665f548c6a16a7f{background:var(--green);color:#04120b}.panel__quote--call.jsx-f665f548c6a16a7f:hover{background:var(--green-hover)}.panel__wishlist.jsx-f665f548c6a16a7f{border:1px solid var(--line-strong);border-radius:var(--radius-sm);width:52px;height:52px;color:var(--ink);cursor:pointer;background:0 0;flex:none;place-items:center;transition:color .15s,border-color .15s;display:grid}.panel__wishlist.jsx-f665f548c6a16a7f:hover,.panel__wishlist--active.jsx-f665f548c6a16a7f{color:var(--green);border-color:var(--green)}.panel__wishlist.jsx-f665f548c6a16a7f:disabled{opacity:.6;cursor:not-allowed}.panel__buy-error.jsx-f665f548c6a16a7f{color:#b3261e;margin:10px 0 0;font-size:12.5px;line-height:1.45}.trust.jsx-f665f548c6a16a7f{flex-wrap:wrap;gap:8px 22px;margin:20px 0 0;padding:0;list-style:none;display:flex}.trust.jsx-f665f548c6a16a7f li.jsx-f665f548c6a16a7f{font-family:var(--font-mono);color:var(--green-bright);font-size:11.5px}.trust.jsx-f665f548c6a16a7f li.jsx-f665f548c6a16a7f span.jsx-f665f548c6a16a7f{color:var(--green-bright);margin-right:4px}.rule.jsx-f665f548c6a16a7f{background:var(--line);height:1px;margin:26px 0 4px}.block.jsx-f665f548c6a16a7f{margin-top:26px}.block.jsx-f665f548c6a16a7f h2.jsx-f665f548c6a16a7f{letter-spacing:-.01em;margin:0 0 14px;font-size:17px;font-weight:600}.specsheets.jsx-f665f548c6a16a7f{background:#faf9f6;border:1px solid #dedbd1;border-radius:6px;margin-top:18px;padding:14px 16px 8px}.ss-head.jsx-f665f548c6a16a7f{letter-spacing:.14em;text-transform:uppercase;color:#666a5e;margin-bottom:8px;font-family:JetBrains Mono,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px}.ss-item.jsx-f665f548c6a16a7f{color:#14150f;border-top:1px solid #dedbd1;align-items:center;gap:10px;padding:9px 0;font-size:13.5px;font-weight:500;transition:color .18s;display:flex}.ss-item.jsx-f665f548c6a16a7f:first-of-type{border-top:0}.ss-item.jsx-f665f548c6a16a7f svg.jsx-f665f548c6a16a7f{stroke:#00a800;stroke-width:1.7px;fill:none;stroke-linejoin:round;flex:none;width:17px;height:17px}.ss-item.jsx-f665f548c6a16a7f span.jsx-f665f548c6a16a7f{flex:auto;line-height:1.4}.ss-item.jsx-f665f548c6a16a7f em.jsx-f665f548c6a16a7f{letter-spacing:.12em;color:#666a5e;border:1px solid #dedbd1;border-radius:4px;flex:none;padding:2px 7px;font-family:JetBrains Mono,SFMono-Regular,Menlo,Consolas,monospace;font-size:9.5px;font-style:normal}.ss-item.jsx-f665f548c6a16a7f:hover{color:#007d00}.ss-item.jsx-f665f548c6a16a7f:hover em.jsx-f665f548c6a16a7f{color:#007d00;border-color:#00c400}.specs.jsx-f665f548c6a16a7f{border-collapse:collapse;border:1px solid var(--line);border-radius:var(--radius-sm);width:100%;font-size:14px;overflow:hidden}.specs.jsx-f665f548c6a16a7f tr.jsx-f665f548c6a16a7f:not(:last-child){border-bottom:1px solid var(--line)}.specs.jsx-f665f548c6a16a7f tr.jsx-f665f548c6a16a7f:nth-child(2n){background:var(--bg-card)}.specs.jsx-f665f548c6a16a7f th.jsx-f665f548c6a16a7f{text-align:left;vertical-align:top;width:32%;font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);padding:16px 20px;font-size:10.5px;font-weight:400}.specs.jsx-f665f548c6a16a7f td.jsx-f665f548c6a16a7f{color:var(--ink);padding:16px 20px;font-weight:500;line-height:1.55}.panel__external.jsx-f665f548c6a16a7f{margin-top:26px}.cross__card--skeleton.jsx-f665f548c6a16a7f{cursor:default}.sk.jsx-f665f548c6a16a7f{border-radius:var(--radius-sm);background:linear-gradient(90deg, var(--line) 0%, var(--line-strong) 50%, var(--line) 100%);background-size:200% 100%;animation:1.4s ease-in-out infinite sk-shimmer}.sk--cross-name.jsx-f665f548c6a16a7f{width:80%;height:13px}.sk--cross-price.jsx-f665f548c6a16a7f{width:40%;height:13px;margin-top:6px}@keyframes sk-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.sk.jsx-f665f548c6a16a7f{animation:none}}.cross.jsx-f665f548c6a16a7f{grid-template-columns:1fr 1fr;gap:12px;display:grid}.cross__card.jsx-f665f548c6a16a7f{text-align:left;border:1px solid var(--line);border-radius:var(--radius-sm);background:var(--bg-raised);cursor:pointer;flex-direction:column;padding:12px;display:flex}.cross__card.jsx-f665f548c6a16a7f:hover{border-color:var(--ink)}.cross__media.jsx-f665f548c6a16a7f{aspect-ratio:16/9;background:#fff;width:100%;display:block;overflow:hidden}.cross__body.jsx-f665f548c6a16a7f{flex-direction:column;gap:6px;padding:12px 2px 2px;display:flex}.cross__name.jsx-f665f548c6a16a7f{font-size:13px;font-weight:500;line-height:1.35}.cross__price.jsx-f665f548c6a16a7f{color:var(--ink-muted);font-size:13px}.panel__permalink.jsx-f665f548c6a16a7f{color:var(--ink-muted);margin-top:26px;font-size:13.5px;display:inline-block}.panel__permalink.jsx-f665f548c6a16a7f:hover{color:var(--green)}@media (width<=900px){.panel.jsx-f665f548c6a16a7f{grid-template-columns:1fr;gap:26px}.panel__media.jsx-f665f548c6a16a7f{position:static}.cross.jsx-f665f548c6a16a7f{grid-template-columns:1fr}.options__grid.jsx-f665f548c6a16a7f{grid-template-columns:repeat(2,1fr)}}'
          }
        </JSXStyle>
      </div>
    )
  );
}
