'use client';
import JSXStyle from 'styled-jsx/style';
import Link from 'next/link';
import * as React from 'react';
import * as navigation from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import ProductVisual from './ProductVisual';
import OptionsPopup from './OptionsPopup';
import * as Icons from '../ui/Icons';
import * as api from '../../lib/api';
import * as api2 from '../../lib/api';
import * as productsApi from '../../lib/productsApi';
import * as OptionsPopup2 from './OptionsPopup';
import * as cartSlice from '../../store/cartSlice';
import * as uiSlice from '../../store/uiSlice';
import * as userSlice from '../../store/userSlice';
import * as wishlistSlice from '../../store/wishlistSlice';
function PC({ product: e, options: s, submitting: a, submitError: n, onClose: o, onSubmit: l }) {
  let [u, x] = React.useState(null),
    [h, f] = React.useState(1),
    [b, m] = React.useState(null);
  (React.useEffect(() => {
    function e(e) {
      'Escape' === e.key && o();
    }
    document.addEventListener('keydown', e);
    let t = document.body.style.overflow;
    return (
      (document.body.style.overflow = 'hidden'),
      () => {
        (document.removeEventListener('keydown', e), (document.body.style.overflow = t));
      }
    );
  }, [o]),
    React.useEffect(() => {
      !u && s?.length && x(s[0].sku);
    }, [s, u]));
  let j = null === s;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Options for ${e.name}`}
      onClick={o}
      className="jsx-e2a9eb12a962e100 overlay"
    >
      <div onClick={(e) => e.stopPropagation()} className="jsx-e2a9eb12a962e100 popup">
        <div className="jsx-e2a9eb12a962e100 popup__head">
          <h2 className="jsx-e2a9eb12a962e100 popup__title">{e.name}</h2>
          <button
            type="button"
            onClick={o}
            aria-label="Close"
            disabled={a}
            className="jsx-e2a9eb12a962e100 popup__close"
          >
            <Icons.IconClose width={14} height={14} />
          </button>
        </div>
        {j ? (
          <p className="jsx-e2a9eb12a962e100 popup__hint">Loading options…</p>
        ) : 0 === s.length ? (
          <p className="jsx-e2a9eb12a962e100 popup__hint">
            We couldn't load the options for this product — please try its product page instead.
          </p>
        ) : (
          <form
            onSubmit={function (e) {
              e.preventDefault();
              let t = s?.find((e) => e.sku === u);
              t
                ? (m(null),
                  l({
                    product: t,
                    qty: h,
                  }))
                : m('Please choose an option first.');
            }}
            noValidate={!0}
            className="jsx-e2a9eb12a962e100 popup__form"
          >
            <fieldset className={`jsx-e2a9eb12a962e100 option-group${b ? ' option-group--error' : ''}`}>
              <legend className="jsx-e2a9eb12a962e100 acc__label">Option</legend>
              {s.map((e) => (
                <label key={e.sku} className="jsx-e2a9eb12a962e100 option-row">
                  <input
                    type="radio"
                    name="grouped-option"
                    checked={u === e.sku}
                    onChange={() => {
                      (x(e.sku), m(null));
                    }}
                    disabled={a}
                    className="jsx-e2a9eb12a962e100"
                  />
                  <span className="jsx-e2a9eb12a962e100 option-row__name">{e.name}</span>
                  <span className="jsx-e2a9eb12a962e100 option-row__price">
                    {'number' == typeof e.price ? api.formatPrice(e.price) : '—'}
                  </span>
                </label>
              ))}
              {b && <span className="jsx-e2a9eb12a962e100 acc__error">{b}</span>}
            </fieldset>
            <label className="jsx-e2a9eb12a962e100 acc__field">
              <span className="jsx-e2a9eb12a962e100 acc__label">Qty</span>
              <div role="group" aria-label="Quantity" className="jsx-e2a9eb12a962e100 qty">
                <button
                  type="button"
                  onClick={() => f((e) => Math.max(1, e - 1))}
                  disabled={a || h <= 1}
                  aria-label="Decrease quantity"
                  className="jsx-e2a9eb12a962e100"
                >
                  −
                </button>
                <span aria-live="polite" className="jsx-e2a9eb12a962e100 qty__val">
                  {h}
                </span>
                <button
                  type="button"
                  onClick={() => f((e) => e + 1)}
                  disabled={a}
                  aria-label="Increase quantity"
                  className="jsx-e2a9eb12a962e100"
                >
                  +
                </button>
              </div>
            </label>
            {n && (
              <p role="alert" className="jsx-e2a9eb12a962e100 submit-error">
                {n}
              </p>
            )}
            <div className="jsx-e2a9eb12a962e100 popup__actions">
              <button type="submit" disabled={a} className="jsx-e2a9eb12a962e100 btn btn-dark">
                {a ? 'Adding…' : 'Add to cart'}
              </button>
              <button type="button" onClick={o} disabled={a} className="jsx-e2a9eb12a962e100 btn btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <JSXStyle id="e2a9eb12a962e100">
        {
          '.overlay.jsx-e2a9eb12a962e100{z-index:130;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#14150f73;justify-content:center;align-items:flex-start;padding:46px 24px;animation:.18s fade;display:flex;position:fixed;inset:0}.popup.jsx-e2a9eb12a962e100{background:var(--bg-raised);border-radius:var(--radius-md);width:100%;max-width:460px;max-height:100%;padding:24px 26px 28px;animation:.22s rise;position:relative;overflow-y:auto;box-shadow:0 40px 90px -40px #14150f99}.popup__head.jsx-e2a9eb12a962e100{justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:18px;display:flex}.popup__title.jsx-e2a9eb12a962e100{letter-spacing:-.01em;margin:0;font-size:17px;font-weight:600;line-height:1.3}.popup__close.jsx-e2a9eb12a962e100{background:var(--bg-card);width:30px;height:30px;color:var(--ink);cursor:pointer;border:0;border-radius:50%;flex:none;place-items:center;display:grid}.popup__close.jsx-e2a9eb12a962e100:hover{background:var(--hover-bg)}.popup__form.jsx-e2a9eb12a962e100{flex-direction:column;gap:4px;display:flex}.popup__actions.jsx-e2a9eb12a962e100{gap:10px;margin-top:10px;display:flex}.popup__hint.jsx-e2a9eb12a962e100{color:var(--ink-soft);margin:0;padding:6px 0 4px;font-size:14px;line-height:1.55}.option-group.jsx-e2a9eb12a962e100{border:0;margin:0 0 16px;padding:0;display:block}.option-group--error.jsx-e2a9eb12a962e100 .acc__error{display:block}.option-row.jsx-e2a9eb12a962e100{border-bottom:1px solid var(--line);cursor:pointer;align-items:center;gap:10px;padding:10px 0;font-size:14px;display:flex}.option-row.jsx-e2a9eb12a962e100:last-of-type{border-bottom:0}.option-row__name.jsx-e2a9eb12a962e100{flex:1;min-width:0}.option-row__price.jsx-e2a9eb12a962e100{white-space:nowrap;flex:none;font-weight:600}.qty.jsx-e2a9eb12a962e100{border:1px solid var(--line-strong);border-radius:var(--radius-sm);align-items:center;height:44px;display:inline-flex;overflow:hidden}.qty.jsx-e2a9eb12a962e100 button.jsx-e2a9eb12a962e100{width:40px;height:100%;color:var(--ink);cursor:pointer;background:0 0;border:0;place-items:center;font-size:17px;line-height:1;display:grid}.qty.jsx-e2a9eb12a962e100 button.jsx-e2a9eb12a962e100:hover:not(:disabled){background:var(--hover-bg)}.qty.jsx-e2a9eb12a962e100 button.jsx-e2a9eb12a962e100:disabled{opacity:.4;cursor:not-allowed}.qty__val.jsx-e2a9eb12a962e100{text-align:center;font-variant-numeric:tabular-nums;min-width:38px;font-size:14.5px}.submit-error.jsx-e2a9eb12a962e100{color:#b3261e;border-radius:var(--radius-sm);background:#fdecea;border:1px solid #f3c4c0;margin:4px 0 0;padding:10px 12px;font-size:13px;line-height:1.45}@keyframes fade{0%{opacity:0}}@keyframes rise{0%{opacity:0;transform:translateY(10px)}}'
        }
      </JSXStyle>
    </div>
  );
}
function GC() {
  return (
    <div aria-hidden="true" className="jsx-8fe0893026103c69 card">
      <div className="jsx-8fe0893026103c69 card__tile sk" />
      <div className="jsx-8fe0893026103c69 card__body">
        <div className="jsx-8fe0893026103c69 sk sk--eyebrow" />
        <div className="jsx-8fe0893026103c69 sk sk--title" />
        <div className="jsx-8fe0893026103c69 sk sk--title sk--title-short" />
        <div className="jsx-8fe0893026103c69 card__chips">
          <div className="jsx-8fe0893026103c69 sk sk--chip" />
          <div className="jsx-8fe0893026103c69 sk sk--chip" />
        </div>
        <div className="jsx-8fe0893026103c69 card__foot">
          <div className="jsx-8fe0893026103c69 card__price">
            <div className="jsx-8fe0893026103c69 sk sk--price" />
            <div className="jsx-8fe0893026103c69 sk sk--gst" />
          </div>
          <div className="jsx-8fe0893026103c69 sk sk--btn" />
        </div>
      </div>
      <JSXStyle id="8fe0893026103c69">
        {
          '.card.jsx-8fe0893026103c69{flex-direction:column;display:flex}.card__tile.jsx-8fe0893026103c69{aspect-ratio:1;border:1px solid #dadad6}.card__body.jsx-8fe0893026103c69{background:#f4f4f4;border:1px solid #dadad6;border-top:0;flex-direction:column;flex:1;padding:14px 14px 16px;display:flex}.card__chips.jsx-8fe0893026103c69{flex-wrap:wrap;gap:6px;margin-top:11px;display:flex}.card__foot.jsx-8fe0893026103c69{justify-content:space-between;align-items:flex-end;gap:12px;margin-top:auto;padding-top:16px;display:flex}.card__price.jsx-8fe0893026103c69{flex-direction:column;gap:7px;display:flex}.sk.jsx-8fe0893026103c69{border-radius:var(--radius-sm);background:linear-gradient(90deg, var(--line) 0%, var(--line-strong) 50%, var(--line) 100%);background-size:200% 100%;animation:1.4s ease-in-out infinite sk-shimmer}.sk--eyebrow.jsx-8fe0893026103c69{width:72px;height:10px}.sk--title.jsx-8fe0893026103c69{width:88%;height:15px;margin-top:10px}.sk--title-short.jsx-8fe0893026103c69{width:55%;margin-top:7px}.sk--chip.jsx-8fe0893026103c69{border-radius:999px;width:54px;height:20px}.sk--price.jsx-8fe0893026103c69{width:64px;height:20px}.sk--gst.jsx-8fe0893026103c69{width:40px;height:9px}.sk--btn.jsx-8fe0893026103c69{width:84px;height:34px}@keyframes sk-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.sk.jsx-8fe0893026103c69{animation:none}}'
        }
      </JSXStyle>
    </div>
  );
}
export default function Default({ product: e }) {
  let g = useDispatch(),
    y = navigation.useRouter(),
    _ = useSelector(userSlice.selectIsAuthenticated),
    v = useSelector(wishlistSlice.selectWishlistItemByProductId(e.id)),
    w = !!v,
    k = 'number' == typeof e.price,
    S = !1 !== e.inStock,
    [N, C] = React.useState(!1),
    [z, R] = React.useState(null),
    [q, F] = React.useState(!1),
    [A, O] = React.useState(null),
    [I, T] = React.useState(!1),
    [E, W] = React.useState(null),
    [P, L] = React.useState(!1),
    [$, B] = React.useState(null),
    [M, Q] = React.useState(!1),
    [G, D] = React.useState(null);
  async function U() {
    if (!N) {
      if (e.priceIsFrom || e.groupedSkus?.length > 0) {
        (L(!0), B(null), D(null));
        let t = e.groupedSkus || [];
        B(
          (
            await Promise.all(
              t.map((t) =>
                productsApi
                  .getProductBySku(t)
                  .then((t) => (t ? api2.normalizeProduct(t, e.category) : null))
                  .catch(() => null),
              ),
            )
          )
            .filter(Boolean)
            .filter((e) => 'number' == typeof e.price)
            .sort((e, t) => e.price - t.price),
        );
        return;
      }
      (C(!0), R(null));
      try {
        let t = await productsApi.getProductBySku(e.sku).catch(() => null),
          i = t?.options || [];
        if (OptionsPopup2.hasRequiredOptions(i))
          return void O({
            rawOptions: i,
          });
        await g(cartSlice.addItem(e)).unwrap();
      } catch (e) {
        R(e.message || "Couldn't add this to your cart.");
      } finally {
        C(!1);
      }
    }
  }
  async function H({ qty: t, customOptions: i }) {
    (T(!0), W(null));
    try {
      (await g(
        cartSlice.addItem({
          ...e,
          quantity: t,
          customOptions: i,
        }),
      ).unwrap(),
        O(null));
    } catch (e) {
      W(e.message || "Couldn't add this to your cart.");
    } finally {
      T(!1);
    }
  }
  async function V({ product: e, qty: t }) {
    (Q(!0), D(null));
    try {
      (await g(
        cartSlice.addItem({
          ...e,
          quantity: t,
        }),
      ).unwrap(),
        L(!1));
    } catch (e) {
      D(e.message || "Couldn't add this to your cart.");
    } finally {
      Q(!1);
    }
  }
  async function Z() {
    if (!_) return void y.push('/account/login/');
    if (!q) {
      (F(!0), R(null));
      try {
        w
          ? await g(wishlistSlice.removeWishlistItem(v.wishlistItemId)).unwrap()
          : await g(wishlistSlice.addWishlistItem(e)).unwrap();
      } catch (e) {
        R(e.message || "Couldn't update your wish list.");
      } finally {
        F(!1);
      }
    }
  }
  return (
    <article className="jsx-e09c6bdae25bba6b card">
      <div className="jsx-e09c6bdae25bba6b card__tile">
        <button
          type="button"
          onClick={() => {
            y.push(`/product/${e.slug}`);
          }}
          aria-label={`Quick view: ${e.name}`}
          className="jsx-e09c6bdae25bba6b card__open"
        >
          <ProductVisual product={e} />
        </button>
        <button
          type="button"
          onClick={Z}
          disabled={q}
          aria-label={w ? `Remove ${e.name} from wish list` : `Add ${e.name} to wish list`}
          aria-pressed={w}
          className={`jsx-e09c6bdae25bba6b card__wishlist${w ? ' card__wishlist--active' : ''}`}
        >
          <Icons.IconHeart fill={w ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="jsx-e09c6bdae25bba6b card__body">
        <span className="jsx-e09c6bdae25bba6b eyebrow">{e.category}</span>
        <Link href={`/product/${e.slug}`} className="card__title">
          {e.name}
        </Link>
        <div className="jsx-e09c6bdae25bba6b card__chips">
          {e.chips.map((e) => (
            <span key={e} className="jsx-e09c6bdae25bba6b chip-spec">
              {e}
            </span>
          ))}
        </div>
        <div className="jsx-e09c6bdae25bba6b card__foot">
          <div className="jsx-e09c6bdae25bba6b card__price">
            <span className="jsx-e09c6bdae25bba6b card__amount">
              {null != e.price ? (
                <>
                  {e.priceIsFrom && <span className="jsx-e09c6bdae25bba6b card__from">From</span>}
                  {api.formatPrice(e.price)}
                </>
              ) : (
                'Price on request'
              )}
            </span>
            <span className="jsx-e09c6bdae25bba6b card__gst">ex-GST</span>
            {!S && <span className="jsx-e09c6bdae25bba6b card__stock">Out of stock</span>}
          </div>
          {e.callUs ? (
            <button
              type="button"
              onClick={() => g(uiSlice.requestEnquiry(e))}
              aria-label={`Call us about ${e.name}`}
              className="jsx-e09c6bdae25bba6b btn card__quote card__quote--call"
            >
              Call Us
            </button>
          ) : (
            <button
              type="button"
              onClick={U}
              disabled={!k || !S || N}
              aria-label={`Add ${e.name} to cart`}
              className="jsx-e09c6bdae25bba6b btn btn-dark card__quote"
            >
              {S ? (
                N ? (
                  'Adding…'
                ) : (
                  <>
                    {'Add '}
                    <span aria-hidden="true" className="jsx-e09c6bdae25bba6b">
                      +
                    </span>
                  </>
                )
              ) : (
                'Out of stock'
              )}
            </button>
          )}
        </div>
        {z && <p className="jsx-e09c6bdae25bba6b card__error">{z}</p>}
      </div>
      {A && (
        <OptionsPopup
          product={e}
          rawOptions={A.rawOptions}
          submitting={I}
          submitError={E}
          onClose={() => {
            I || (O(null), W(null));
          }}
          onSubmit={H}
        />
      )}
      {P && (
        <PC
          product={e}
          options={$}
          submitting={M}
          submitError={G}
          onClose={() => {
            M || (L(!1), D(null));
          }}
          onSubmit={V}
        />
      )}
      <JSXStyle id="e09c6bdae25bba6b">
        {
          '.card.jsx-e09c6bdae25bba6b{flex-direction:column;display:flex}.card__tile.jsx-e09c6bdae25bba6b{aspect-ratio:1;background:#fff;border:1px solid #dadad6;position:relative;overflow:hidden}.card__open.jsx-e09c6bdae25bba6b{cursor:pointer;background:0 0;border:0;width:100%;height:100%;padding:0;display:block}.card__open.jsx-e09c6bdae25bba6b .visual{transition:transform .4s}.card.jsx-e09c6bdae25bba6b:hover .card__open.jsx-e09c6bdae25bba6b .visual{transform:scale(1.03)}.card__wishlist.jsx-e09c6bdae25bba6b{z-index:1;width:34px;height:34px;color:var(--ink);cursor:pointer;background:0 0;border:0;place-items:center;transition:color .15s;display:grid;position:absolute;top:10px;right:10px}.card__wishlist.jsx-e09c6bdae25bba6b:hover,.card__wishlist--active.jsx-e09c6bdae25bba6b{color:var(--green)}.card__wishlist.jsx-e09c6bdae25bba6b:disabled{opacity:.6;cursor:not-allowed}.card__body.jsx-e09c6bdae25bba6b{background:#f4f4f4;border:1px solid #dadad6;border-top:0;flex-direction:column;flex:1;padding:14px 14px 16px;display:flex}.card__title.jsx-e09c6bdae25bba6b{letter-spacing:-.01em;margin-top:6px;font-size:16px;font-weight:600;line-height:1.35}.card__title.jsx-e09c6bdae25bba6b:hover{color:var(--green)}.card__chips.jsx-e09c6bdae25bba6b{flex-wrap:wrap;gap:6px;margin-top:11px;display:flex}.card__foot.jsx-e09c6bdae25bba6b{justify-content:space-between;align-items:flex-start;gap:12px;margin-top:auto;padding-top:16px;display:flex}.card__price.jsx-e09c6bdae25bba6b{flex-direction:column;display:flex}.card__amount.jsx-e09c6bdae25bba6b{letter-spacing:-.01em;align-items:baseline;gap:6px;font-size:21px;font-weight:600;line-height:1.2;display:flex}.card__from.jsx-e09c6bdae25bba6b{font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);font-size:10px;font-weight:400}.card__gst.jsx-e09c6bdae25bba6b{font-family:var(--font-mono);color:var(--ink-muted);margin-top:2px;font-size:10px}.card__stock.jsx-e09c6bdae25bba6b{font-family:var(--font-mono);letter-spacing:.06em;text-transform:uppercase;color:#b3261e;margin-top:4px;font-size:10px;font-weight:600;display:inline-block}.card__quote.jsx-e09c6bdae25bba6b{white-space:nowrap;padding:10px 18px;font-size:13px}.card__quote.jsx-e09c6bdae25bba6b:disabled{opacity:.5;cursor:not-allowed}.card__quote--call.jsx-e09c6bdae25bba6b{background:var(--green);color:#04120b}.card__quote--call.jsx-e09c6bdae25bba6b:hover{background:var(--green-hover)}.card__error.jsx-e09c6bdae25bba6b{color:#b3261e;margin:8px 0 0;font-size:11.5px;line-height:1.4}'
        }
      </JSXStyle>
    </article>
  );
}
export const ProductGridSkeleton = function ({ count: e = 8 }) {
  return Array.from({
    length: e,
  }).map((e, i) => <GC key={i} />);
};
