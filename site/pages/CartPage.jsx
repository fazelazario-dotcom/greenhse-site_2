'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import Link from 'next/link';
import * as navigation from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import ProductVisual from '../components/product/ProductVisual';
import * as Icons from '../components/ui/Icons';
import * as api from '../lib/api';
import * as storage from '../lib/storage';
import customerApi from '../lib/customerApi';
import cartApi from '../lib/cartApi';
import useProfile from '../hooks/useProfile';
import * as cartSlice from '../store/cartSlice';
let m = 'Shipping Non-Perth Area (Quote will be given)';
export default function Default() {
  let e = useDispatch(),
    j = navigation.useRouter(),
    { profile: g } = useProfile(),
    y = useSelector(cartSlice.selectCartItems),
    b = useSelector(cartSlice.selectCartSubtotal),
    _ = useSelector(cartSlice.selectPendingItemIds),
    v = 'loading' === useSelector(cartSlice.selectCartStatus) && 0 === y.length,
    w = !!g,
    S = g?.addresses || [],
    k = S.find((e) => String(e.id) === String(g?.default_shipping)) || S[0] || null,
    [N, C] = React.useState([]),
    [R, z] = React.useState(!0),
    [F, T] = React.useState(null),
    [P, A] = React.useState(!1),
    W = N.find((e) => F && e.carrier_code === F.carrier_code && e.method_code === F.method_code) || N[0] || null,
    I = !!(W && (W.method_title === m || W.carrier_title === m)),
    E = Number(W?.amount) || 0,
    L = b + E,
    B = I ? 0 : L * api.GST_RATE,
    M = I ? b : L + B;
  return (
    React.useEffect(() => {
      if (0 === y.length) return;
      let e = !1;
      return (
        z(!0),
        (async () => {
          try {
            let t;
            if (w) {
              let e = {
                firstname: k?.firstname || '',
                lastname: k?.lastname || '',
                street: k?.street || '',
                city: k?.city || '',
                region: k?.region?.region || '',
                region_id: k?.region_id || '',
                postcode: k?.postcode || '',
                country_id: k?.country_id || '',
                telephone: k?.telephone || '',
              };
              t = await customerApi.getEstimateShippingMethods({
                address: e,
              });
            } else {
              let s = storage.getGuestCartId();
              if (!s) {
                e || C([]);
                return;
              }
              t = await cartApi.getGuestEstimateShippingMethods({
                cartId: s,
                address: {
                  country_id: 'AU',
                  postcode: '2000',
                  city: 'Sydney',
                  street: ['395 Pitt Street'],
                },
              });
            }
            !e && Array.isArray(t) && C(t);
          } catch {
          } finally {
            e || z(!1);
          }
        })(),
        () => {
          e = !0;
        }
      );
    }, [w, k, y.length]),
    (
      <main className="jsx-a66cf8537f7cbc10 acc cart-page">
        <div className="jsx-a66cf8537f7cbc10 container">
          <CheckoutSteps current="cart" />
          <h1 className="jsx-a66cf8537f7cbc10 acc__title">Your cart</h1>
          {v ? (
            <div className="jsx-a66cf8537f7cbc10 acc__panel empty">
              <p className="jsx-a66cf8537f7cbc10 empty__title">Loading your cart…</p>
            </div>
          ) : 0 === y.length ? (
            <div className="jsx-a66cf8537f7cbc10 acc__panel empty">
              <p className="jsx-a66cf8537f7cbc10 empty__title">Your cart is empty</p>
              <Link href="/" className="btn btn-dark">
                Keep shopping
              </Link>
            </div>
          ) : (
            <div className="jsx-a66cf8537f7cbc10 layout">
              <div className="jsx-a66cf8537f7cbc10 acc__panel lines-panel">
                <ul className="jsx-a66cf8537f7cbc10 lines">
                  {y.map((s) => {
                    let i = _.includes(s.itemId);
                    return (
                      <li key={s.itemId} className="jsx-a66cf8537f7cbc10 line">
                        <span className="jsx-a66cf8537f7cbc10 line__media">
                          <ProductVisual product={s} fit="cross" />
                        </span>
                        <div className="jsx-a66cf8537f7cbc10 line__main">
                          <div className="jsx-a66cf8537f7cbc10 line__top">
                            <span className="jsx-a66cf8537f7cbc10 line__name">{s.name}</span>
                            <span className="jsx-a66cf8537f7cbc10 line__price">{api.formatPrice(s.price * s.qty)}</span>
                          </div>
                          <p className="jsx-a66cf8537f7cbc10 line__spec">
                            {s.category}
                            {s.chips?.length ? ` \xb7 ${s.chips.join(' · ')}` : ''}
                            {' ·'} {api.formatPrice(s.price)}
                            {' ex-GST each'}
                          </p>
                          <div className="jsx-a66cf8537f7cbc10 line__bottom">
                            <div
                              role="group"
                              aria-label={`Quantity for ${s.name}`}
                              className="jsx-a66cf8537f7cbc10 stepper"
                            >
                              <button
                                type="button"
                                onClick={() => e(cartSlice.decrementQty(s))}
                                disabled={i}
                                aria-label="Decrease quantity"
                                className="jsx-a66cf8537f7cbc10"
                              >
                                −
                              </button>
                              <span aria-live="polite" className="jsx-a66cf8537f7cbc10 stepper__val">
                                {s.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => e(cartSlice.incrementQty(s))}
                                disabled={i}
                                aria-label="Increase quantity"
                                className="jsx-a66cf8537f7cbc10"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => e(cartSlice.removeItem(s))}
                              disabled={i}
                              className="jsx-a66cf8537f7cbc10 line__remove"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <aside className="jsx-a66cf8537f7cbc10 acc__panel summary">
                <h2 className="jsx-a66cf8537f7cbc10 summary__title">Summary</h2>
                {!R && N.length > 0 && (
                  <div className={`jsx-a66cf8537f7cbc10 ship${P ? ' ship--open' : ''}`}>
                    <h3 className="jsx-a66cf8537f7cbc10 ship__title">Shipping - Select your preferred option</h3>
                    <button
                      type="button"
                      aria-expanded={P}
                      onClick={() => A((e) => !e)}
                      className="jsx-a66cf8537f7cbc10 ship__trigger"
                    >
                      <span className="jsx-a66cf8537f7cbc10 ship__trigger-main">
                        <span className="jsx-a66cf8537f7cbc10 ship__trigger-row">
                          <span className="jsx-a66cf8537f7cbc10">{api.formatPrice(W?.amount)}</span>
                          <span className="jsx-a66cf8537f7cbc10">{W?.method_title}</span>
                        </span>
                        {W?.carrier_title && <span className="jsx-a66cf8537f7cbc10 ship__hint">{W.carrier_title}</span>}
                      </span>
                      <Icons.IconChevronDown className="ship__chevron" aria-hidden="true" />
                    </button>
                    {P && (
                      <ul className="jsx-a66cf8537f7cbc10 ship__list">
                        {N.map((e) => {
                          let s = W && W.carrier_code === e.carrier_code && W.method_code === e.method_code;
                          return (
                            <label
                              key={`${e?.carrier_code}-${e?.method_code}`}
                              className="jsx-a66cf8537f7cbc10 ship__option"
                            >
                              <input
                                type="radio"
                                name="cartShippingMethod"
                                checked={!!s}
                                onChange={() => {
                                  (T(e), A(!1));
                                }}
                                className="jsx-a66cf8537f7cbc10"
                              />
                              <span className="jsx-a66cf8537f7cbc10">
                                <span className="jsx-a66cf8537f7cbc10 ship__row">
                                  <span className="jsx-a66cf8537f7cbc10">{api.formatPrice(e?.amount)}</span>
                                  <span className="jsx-a66cf8537f7cbc10">{e?.method_title}</span>
                                </span>
                                <span className="jsx-a66cf8537f7cbc10 ship__hint">{e?.carrier_title}</span>
                              </span>
                            </label>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
                <div className="jsx-a66cf8537f7cbc10 summary__row">
                  <span className="jsx-a66cf8537f7cbc10">Subtotal (ex-GST)</span>
                  <span className="jsx-a66cf8537f7cbc10">{api.formatPrice(b)}</span>
                </div>
                {W && (
                  <div className="jsx-a66cf8537f7cbc10 summary__row">
                    <span className="jsx-a66cf8537f7cbc10">Shipping</span>
                    <span className="jsx-a66cf8537f7cbc10">{api.formatPrice(E)}</span>
                  </div>
                )}
                {!I && (
                  <div className="jsx-a66cf8537f7cbc10 summary__row">
                    <span className="jsx-a66cf8537f7cbc10">GST 10%</span>
                    <span className="jsx-a66cf8537f7cbc10">{api.formatPrice(B)}</span>
                  </div>
                )}
                <div className="jsx-a66cf8537f7cbc10 summary__row summary__row--total">
                  <span className="jsx-a66cf8537f7cbc10">Total{I ? '' : ' inc GST'}</span>
                  <span className="jsx-a66cf8537f7cbc10">{api.formatPrice(M)}</span>
                </div>
                {I ? (
                  <p className="jsx-a66cf8537f7cbc10 summary__note">
                    We don’t have a live rate for your area, we will send you a quote with delivery shortly
                  </p>
                ) : (
                  <p className="jsx-a66cf8537f7cbc10 summary__note">
                    Every quote request is carefully checked by our team before payment is finalised — we'll call if
                    anything needs checking.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => j.push('/checkout/cart/')}
                  className="jsx-a66cf8537f7cbc10 btn btn-dark btn-block summary__cta"
                >
                  Proceed to checkout
                </button>
                <Link href="/" className="btn btn-ghost btn-block summary__keep">
                  Keep shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
        <JSXStyle id="a66cf8537f7cbc10">
          {
            '.cart-page.jsx-a66cf8537f7cbc10{background:var(--bg);min-height:60vh}.empty.jsx-a66cf8537f7cbc10{text-align:center;padding:56px 24px}.empty__title.jsx-a66cf8537f7cbc10{margin:0 0 6px;font-size:18px;font-weight:600}.empty__sub.jsx-a66cf8537f7cbc10{color:var(--ink-muted);margin:0 0 22px;font-size:14px}.layout.jsx-a66cf8537f7cbc10{grid-template-columns:1fr 340px;align-items:start;gap:24px;display:grid}.lines-panel.jsx-a66cf8537f7cbc10{padding:8px 28px}.lines.jsx-a66cf8537f7cbc10{margin:0;padding:0;list-style:none}.line.jsx-a66cf8537f7cbc10{border-bottom:1px solid var(--line);gap:16px;padding:22px 0;display:flex}.line.jsx-a66cf8537f7cbc10:last-child{border-bottom:0}.line__media.jsx-a66cf8537f7cbc10{background:var(--bg-plate);border:1px solid var(--line);border-radius:var(--radius-sm);flex:none;width:76px;height:76px;overflow:hidden}.line__main.jsx-a66cf8537f7cbc10{flex:1;min-width:0}.line__top.jsx-a66cf8537f7cbc10{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}.line__name.jsx-a66cf8537f7cbc10{letter-spacing:-.01em;font-size:15.5px;font-weight:600}.line__price.jsx-a66cf8537f7cbc10{white-space:nowrap;font-size:15.5px;font-weight:600}.line__spec.jsx-a66cf8537f7cbc10{color:var(--ink-muted);margin:4px 0 14px;font-size:12.5px}.line__bottom.jsx-a66cf8537f7cbc10{justify-content:space-between;align-items:center;gap:12px;display:flex}.stepper.jsx-a66cf8537f7cbc10{border:1px solid var(--line-strong);border-radius:var(--radius-sm);align-items:center;display:inline-flex;overflow:hidden}.stepper.jsx-a66cf8537f7cbc10 button.jsx-a66cf8537f7cbc10{width:32px;height:32px;color:var(--ink);cursor:pointer;background:0 0;border:0;place-items:center;font-size:16px;line-height:1;display:grid}.stepper.jsx-a66cf8537f7cbc10 button.jsx-a66cf8537f7cbc10:hover{background:var(--hover-bg)}.stepper.jsx-a66cf8537f7cbc10 button.jsx-a66cf8537f7cbc10:disabled{opacity:.4;cursor:not-allowed}.stepper__val.jsx-a66cf8537f7cbc10{text-align:center;font-variant-numeric:tabular-nums;min-width:36px;font-size:14px}.line__remove.jsx-a66cf8537f7cbc10{color:var(--ink-muted);text-underline-offset:2px;cursor:pointer;background:0 0;border:0;font-size:13px;text-decoration:underline}.line__remove.jsx-a66cf8537f7cbc10:hover{color:#b3261e}.line__remove.jsx-a66cf8537f7cbc10:disabled{opacity:.5;cursor:not-allowed}.summary.jsx-a66cf8537f7cbc10{position:sticky;top:24px}.summary__title.jsx-a66cf8537f7cbc10{letter-spacing:-.01em;margin:0 0 18px;font-size:17px;font-weight:600}.ship.jsx-a66cf8537f7cbc10{border-bottom:1px solid var(--line);margin:0 0 18px;padding-bottom:14px}.ship__title.jsx-a66cf8537f7cbc10{letter-spacing:-.01em;margin:0 0 8px;font-size:13px;font-weight:600}.ship__trigger.jsx-a66cf8537f7cbc10{border:1px solid var(--line-strong);border-radius:var(--radius-sm);background:var(--bg-card,#fff);cursor:pointer;text-align:left;width:100%;font:inherit;color:inherit;justify-content:space-between;align-items:flex-start;gap:10px;padding:9px 11px;display:flex}.ship--open.jsx-a66cf8537f7cbc10 .ship__trigger.jsx-a66cf8537f7cbc10{border-color:var(--ink)}.ship__trigger-main.jsx-a66cf8537f7cbc10{flex:1;min-width:0}.ship__trigger-row.jsx-a66cf8537f7cbc10{justify-content:space-between;gap:12px;font-size:13.5px;display:flex}.ship__chevron.jsx-a66cf8537f7cbc10{color:var(--ink-muted);flex:none;margin-top:3px;transition:transform .15s}.ship--open.jsx-a66cf8537f7cbc10 .ship__chevron.jsx-a66cf8537f7cbc10{transform:rotate(180deg)}.ship__list.jsx-a66cf8537f7cbc10{border:1px solid var(--line);border-radius:var(--radius-sm);margin:8px 0 0;padding:0 11px;list-style:none}.ship__option.jsx-a66cf8537f7cbc10{border-bottom:1px solid var(--line);cursor:pointer;align-items:flex-start;gap:10px;padding:10px 0;font-size:13.5px;display:flex}.ship__option.jsx-a66cf8537f7cbc10:last-of-type{border-bottom:0;padding-bottom:0}.ship__option.jsx-a66cf8537f7cbc10 input.jsx-a66cf8537f7cbc10{flex:none;margin-top:3px}.ship__row.jsx-a66cf8537f7cbc10{justify-content:space-between;gap:12px;display:flex}.ship__hint.jsx-a66cf8537f7cbc10{color:var(--ink-muted);margin-top:2px;font-size:12px;display:block}.summary__row.jsx-a66cf8537f7cbc10{color:var(--ink-soft);border-bottom:1px solid var(--line);justify-content:space-between;align-items:baseline;gap:12px;padding:8px 0;font-size:14px;display:flex}.summary__row--total.jsx-a66cf8537f7cbc10{color:var(--ink);border-bottom:0;padding-top:12px;font-size:16px;font-weight:600}.summary__note.jsx-a66cf8537f7cbc10{color:var(--ink-muted);border:1px solid var(--line);border-radius:var(--radius-sm);background:#f4f4f4;margin:16px 0;padding:11px 13px;font-size:12.5px;line-height:1.55}.summary__cta.jsx-a66cf8537f7cbc10{height:50px;margin-bottom:10px}.summary__keep.jsx-a66cf8537f7cbc10{height:46px}@media (width<=860px){.layout.jsx-a66cf8537f7cbc10{grid-template-columns:1fr}.summary.jsx-a66cf8537f7cbc10{position:static}}@media (width<=480px){.lines-panel.jsx-a66cf8537f7cbc10{padding:8px 18px}}'
          }
        </JSXStyle>
      </main>
    )
  );
}
