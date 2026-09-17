'use client';
import Link from 'next/link';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as wishlistSlice from '../../store/wishlistSlice';
import * as api from '../../lib/api';
import useRequireAuth from '../../hooks/useRequireAuth';
import Toast from '../../components/ui/Toast';
export default function Default() {
  let e = useDispatch(),
    l = useRequireAuth(),
    u = useSelector(wishlistSlice.selectWishlistItems),
    d = useSelector(wishlistSlice.selectWishlistStatus),
    h = useSelector(wishlistSlice.selectWishlistError),
    f = 'idle' === d || 'loading' === d,
    [p, m] = React.useState(null),
    [_, v] = React.useState(null);
  async function y(t) {
    if (!p) {
      m(t.wishlistItemId);
      try {
        (await e(wishlistSlice.moveWishlistItemToCart(t.wishlistItemId)).unwrap(),
          v({
            variant: 'success',
            message: `${t.name} moved to your cart.`,
          }));
      } catch (e) {
        if (401 === e.status) return void l();
        v({
          variant: 'error',
          message: e.message || "Couldn't move this to your cart.",
        });
      } finally {
        m(null);
      }
    }
  }
  async function S(t) {
    if (!p) {
      m(t.wishlistItemId);
      try {
        (await e(wishlistSlice.removeWishlistItem(t.wishlistItemId)).unwrap(),
          v({
            variant: 'success',
            message: `${t.name} removed from your wish list.`,
          }));
      } catch (e) {
        if (401 === e.status) return void l();
        v({
          variant: 'error',
          message: e.message || "Couldn't remove this item.",
        });
      } finally {
        m(null);
      }
    }
  }
  return (
    React.useEffect(() => {
      e(wishlistSlice.fetchWishlist());
    }, [e]),
    (
      <div className="acc__panel">
        <div className="acc__panel-head">
          <h2 className="acc__panel-title">Wish List</h2>
        </div>
        {f && <p className="acc__hint">Loading your wish list…</p>}
        {!f && h && (
          <span className="acc__error" role="alert">
            {h}
          </span>
        )}
        {!f && !h && 0 === u.length && <p className="acc__empty">You haven't added anything to your wish list yet.</p>}
        {!f && !h && u.length > 0 && (
          <div className="acc__address-grid">
            {u.map((e) => (
              <div key={e.wishlistItemId} className="acc__address-card">
                <p className="acc__address-name">
                  {e.slug ? <Link href={`/product/${e.slug}`}>{e.name}</Link> : e.name}
                </p>
                {e.sku && (
                  <p>
                    {'SKU: '}
                    {e.sku}
                  </p>
                )}
                <p>{null != e.price ? api.formatPrice(e.price) : 'Price on request'}</p>
                <div className="acc__address-tags">
                  <button
                    type="button"
                    className="btn btn-dark acc__address-edit"
                    onClick={() => y(e)}
                    disabled={p === e.wishlistItemId}
                  >
                    {p === e.wishlistItemId ? 'Moving…' : 'Move to cart'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost acc__address-edit"
                    onClick={() => S(e)}
                    disabled={p === e.wishlistItemId}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Toast message={_?.message} variant={_?.variant} onDismiss={() => v(null)} />
      </div>
    )
  );
}
