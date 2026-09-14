'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import * as navigation from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import ProductVisual from '../product/ProductVisual';
import * as Icons from '../ui/Icons';
import * as api from '../../lib/api';
import * as storage from '../../lib/storage';
import * as cartSlice from '../../store/cartSlice';
export default function Default() {
  let e = useDispatch(),
    f = navigation.useRouter(),
    h = useSelector(cartSlice.selectCartIsOpen),
    x = useSelector(cartSlice.selectCartItems),
    u = useSelector(cartSlice.selectCartSubtotal),
    p = useSelector(cartSlice.selectCartTotalIncGst),
    j = useSelector(cartSlice.selectPendingItemIds),
    m = 'loading' === useSelector(cartSlice.selectCartStatus) && 0 === x.length;
  return (React.useEffect(() => {
    if (!h) return;
    function t(t) {
      'Escape' === t.key && e(cartSlice.closeCart());
    }
    document.addEventListener('keydown', t);
    let i = document.body.style.overflow;
    return (
      (document.body.style.overflow = 'hidden'),
      () => {
        (document.removeEventListener('keydown', t), (document.body.style.overflow = i));
      }
    );
  }, [h, e]),
  h) ? (
    <div role="dialog" aria-modal="true" aria-label="Your cart" className="jsx-b3ea2d35acc82a1d overlay">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => e(cartSlice.closeCart())}
        className="jsx-b3ea2d35acc82a1d overlay__scrim"
      />
      <aside className="jsx-b3ea2d35acc82a1d cart-drawer">
        <header className="jsx-b3ea2d35acc82a1d drawer__head">
          <h2 className="jsx-b3ea2d35acc82a1d drawer__title">Your cart</h2>
          <button
            type="button"
            onClick={() => e(cartSlice.closeCart())}
            aria-label="Close"
            className="jsx-b3ea2d35acc82a1d drawer__close"
          >
            <Icons.IconClose />
          </button>
        </header>
        {m ? (
          <div className="jsx-b3ea2d35acc82a1d empty">
            <p className="jsx-b3ea2d35acc82a1d empty__title">Loading your cart…</p>
          </div>
        ) : 0 === x.length ? (
          <div className="jsx-b3ea2d35acc82a1d empty">
            <p className="jsx-b3ea2d35acc82a1d empty__title">Your cart is empty</p>
            <button
              type="button"
              onClick={() => e(cartSlice.closeCart())}
              className="jsx-b3ea2d35acc82a1d btn btn-dark"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <ul className="jsx-b3ea2d35acc82a1d lines">
              {x.map((i) => {
                let s = j.includes(i.itemId);
                return (
                  <li key={i.itemId} className="jsx-b3ea2d35acc82a1d line">
                    <span className="jsx-b3ea2d35acc82a1d line__media">
                      <ProductVisual product={i} fit="cross" />
                    </span>
                    <div className="jsx-b3ea2d35acc82a1d line__main">
                      <div className="jsx-b3ea2d35acc82a1d line__top">
                        <div className="jsx-b3ea2d35acc82a1d line__id">
                          <span className="jsx-b3ea2d35acc82a1d line__name">{i.name}</span>
                          <span className="jsx-b3ea2d35acc82a1d line__cat">{i.category}</span>
                        </div>
                        <span className="jsx-b3ea2d35acc82a1d line__price">{api.formatPrice(i.price * i.qty)}</span>
                      </div>
                      <div className="jsx-b3ea2d35acc82a1d line__bottom">
                        <div
                          role="group"
                          aria-label={`Quantity for ${i.name}`}
                          className="jsx-b3ea2d35acc82a1d stepper"
                        >
                          <button
                            type="button"
                            onClick={() => e(cartSlice.decrementQty(i))}
                            disabled={s}
                            aria-label="Decrease quantity"
                            className="jsx-b3ea2d35acc82a1d"
                          >
                            −
                          </button>
                          <span aria-live="polite" className="jsx-b3ea2d35acc82a1d stepper__val">
                            {i.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => e(cartSlice.incrementQty(i))}
                            disabled={s}
                            aria-label="Increase quantity"
                            className="jsx-b3ea2d35acc82a1d"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => e(cartSlice.removeItem(i))}
                          disabled={s}
                          className="jsx-b3ea2d35acc82a1d line__remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <footer className="jsx-b3ea2d35acc82a1d foot">
              <div className="jsx-b3ea2d35acc82a1d foot__row">
                <span className="jsx-b3ea2d35acc82a1d foot__label">Subtotal (ex-GST)</span>
                <span className="jsx-b3ea2d35acc82a1d foot__val">{api.formatPrice(u)}</span>
              </div>
              <div className="jsx-b3ea2d35acc82a1d foot__row foot__row--total">
                <span className="jsx-b3ea2d35acc82a1d foot__label">Total incl. GST</span>
                <span className="jsx-b3ea2d35acc82a1d foot__val foot__val--total">{api.formatPrice(p)}</span>
              </div>
              <p className="jsx-b3ea2d35acc82a1d foot__note">Freight calculated at checkout</p>
              <button
                type="button"
                onClick={function () {
                  0 !== x.length &&
                    (e(cartSlice.closeCart()), f.push(storage.getAuthToken() ? '/cart/' : '/account/login/'));
                }}
                className="jsx-b3ea2d35acc82a1d foot__cta"
              >
                Proceed to Checkout
              </button>
            </footer>
          </>
        )}
      </aside>
      <JSXStyle id="b3ea2d35acc82a1d">
        {
          '.overlay.jsx-b3ea2d35acc82a1d{z-index:130;justify-content:flex-end;display:flex;position:fixed;inset:0}.overlay__scrim.jsx-b3ea2d35acc82a1d{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);cursor:pointer;background:#14150f80;border:0;padding:0;animation:.18s fade;position:absolute;inset:0}.cart-drawer.jsx-b3ea2d35acc82a1d{background:var(--bg-raised);flex-direction:column;width:min(460px,100vw);height:100%;animation:.24s slide;display:flex;position:relative;box-shadow:-30px 0 70px -30px #14150f80}.drawer__head.jsx-b3ea2d35acc82a1d{border-bottom:1px solid var(--line);flex:none;justify-content:space-between;align-items:center;padding:22px 24px;display:flex}.drawer__title.jsx-b3ea2d35acc82a1d{letter-spacing:-.02em;margin:0;font-size:22px;font-weight:600}.drawer__close.jsx-b3ea2d35acc82a1d{width:36px;height:36px;color:var(--ink);cursor:pointer;background:0 0;border:0;border-radius:50%;place-items:center;display:grid}.drawer__close.jsx-b3ea2d35acc82a1d:hover{background:var(--hover-bg)}.empty.jsx-b3ea2d35acc82a1d{text-align:center;flex-direction:column;flex:1;justify-content:center;align-items:center;gap:6px;padding:40px;display:flex}.empty__title.jsx-b3ea2d35acc82a1d{margin:0;font-size:17px;font-weight:600}.empty__sub.jsx-b3ea2d35acc82a1d{color:var(--ink-muted);margin:0 0 18px;font-size:14px}.lines.jsx-b3ea2d35acc82a1d{flex:1;min-height:0;margin:0;padding:8px 24px;list-style:none;overflow-y:auto}.line.jsx-b3ea2d35acc82a1d{border-bottom:1px solid var(--line);gap:14px;padding:18px 0;display:flex}.line__media.jsx-b3ea2d35acc82a1d{background:var(--bg-plate);border:1px solid var(--line);border-radius:var(--radius-sm);flex:none;width:62px;height:62px;overflow:hidden}.line__main.jsx-b3ea2d35acc82a1d{flex-direction:column;flex:1;gap:12px;min-width:0;display:flex}.line__top.jsx-b3ea2d35acc82a1d{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}.line__id.jsx-b3ea2d35acc82a1d{flex-direction:column;gap:3px;min-width:0;display:flex}.line__name.jsx-b3ea2d35acc82a1d{font-size:14.5px;font-weight:500;line-height:1.3}.line__cat.jsx-b3ea2d35acc82a1d{font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);font-size:10px}.line__price.jsx-b3ea2d35acc82a1d{white-space:nowrap;font-size:15px;font-weight:600}.line__bottom.jsx-b3ea2d35acc82a1d{justify-content:space-between;align-items:center;gap:12px;display:flex}.stepper.jsx-b3ea2d35acc82a1d{border:1px solid var(--line-strong);border-radius:var(--radius-sm);align-items:center;display:inline-flex;overflow:hidden}.stepper.jsx-b3ea2d35acc82a1d button.jsx-b3ea2d35acc82a1d{width:30px;height:30px;color:var(--ink);cursor:pointer;background:0 0;border:0;place-items:center;font-size:16px;line-height:1;display:grid}.stepper.jsx-b3ea2d35acc82a1d button.jsx-b3ea2d35acc82a1d:hover{background:var(--hover-bg)}.stepper.jsx-b3ea2d35acc82a1d button.jsx-b3ea2d35acc82a1d:disabled{opacity:.4;cursor:not-allowed}.stepper__val.jsx-b3ea2d35acc82a1d{text-align:center;font-variant-numeric:tabular-nums;min-width:34px;font-size:14px}.line__remove.jsx-b3ea2d35acc82a1d{color:var(--ink-muted);text-underline-offset:2px;cursor:pointer;background:0 0;border:0;font-size:13px;text-decoration:underline}.line__remove.jsx-b3ea2d35acc82a1d:hover{color:#b3261e}.line__remove.jsx-b3ea2d35acc82a1d:disabled{opacity:.5;cursor:not-allowed}.foot.jsx-b3ea2d35acc82a1d{border-top:1px solid var(--line);background:var(--bg-raised);flex:none;padding:20px 24px 24px}.foot__row.jsx-b3ea2d35acc82a1d{justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:10px;display:flex}.foot__label.jsx-b3ea2d35acc82a1d{font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);font-size:11px}.foot__val.jsx-b3ea2d35acc82a1d{font-size:15px;font-weight:500}.foot__row--total.jsx-b3ea2d35acc82a1d .foot__label.jsx-b3ea2d35acc82a1d{color:var(--ink)}.foot__val--total.jsx-b3ea2d35acc82a1d{letter-spacing:-.01em;font-size:22px;font-weight:600}.foot__note.jsx-b3ea2d35acc82a1d{color:var(--ink-muted);margin:4px 0 16px;font-size:12.5px}.foot__cta.jsx-b3ea2d35acc82a1d{border-radius:var(--radius-sm);background:var(--green-bright);color:#04120b;cursor:pointer;border:0;width:100%;height:52px;font-size:15px;font-weight:600;transition:background .16s}.foot__cta.jsx-b3ea2d35acc82a1d:hover{background:var(--green-hover)}@keyframes fade{0%{opacity:0}}@keyframes slide{0%{transform:translate(100%)}}@media (width<=480px){.drawer__head.jsx-b3ea2d35acc82a1d,.lines.jsx-b3ea2d35acc82a1d,.foot.jsx-b3ea2d35acc82a1d{padding-left:16px;padding-right:16px}}'
        }
      </JSXStyle>
    </div>
  ) : null;
}
