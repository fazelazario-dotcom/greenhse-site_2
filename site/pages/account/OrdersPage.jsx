'use client';
import * as React from 'react';
import Link from 'next/link';
import * as navigation from 'next/navigation';
import { useDispatch } from 'react-redux';
import ordersApi from '../../lib/ordersApi';
import * as cartSlice from '../../store/cartSlice';
import useProfile from '../../hooks/useProfile';
import useRequireAuth from '../../hooks/useRequireAuth';
import * as api from '../../lib/api';
import Toast from '../../components/ui/Toast';
let h = {
  pending: 'Pending',
  processing: 'Processing',
  complete: 'Complete',
  closed: 'Closed',
  canceled: 'Cancelled',
  holded: 'On hold',
  payment_review: 'Payment review',
  fraud: 'Fraud review',
};
export default function Default() {
  let e = useDispatch(),
    p = navigation.useRouter(),
    f = useRequireAuth(),
    { profile: m, loading: _ } = useProfile(),
    [y, v] = React.useState([]),
    [g, S] = React.useState(!0),
    [x, b] = React.useState(''),
    [j, w] = React.useState(null),
    [C, R] = React.useState(null);
  async function k(t) {
    if (!j) {
      w(t.entity_id);
      try {
        let r = await ordersApi.resolveReorderCart(t);
        (await Promise.all(r.map((t) => e(cartSlice.addItem(t)).unwrap())), p.push('/cart'));
      } catch (e) {
        if (401 === e.status) return void f();
        R({
          variant: 'error',
          message: e.message || "Couldn't reorder this — please try again.",
        });
      } finally {
        w(null);
      }
    }
  }
  React.useEffect(() => {
    if (_) return;
    if (!m?.id) return void S(!1);
    let e = !1;
    return (
      S(!0),
      b(''),
      ordersApi
        .getCustomerOrders({
          customerId: m.id,
        })
        .then(({ orders: t }) => {
          e || v(t);
        })
        .catch((t) => {
          if (!e) {
            if (401 === t.status) return void f();
            b(t.message || "Couldn't load your orders.");
          }
        })
        .finally(() => {
          e || S(!1);
        }),
      () => {
        e = !0;
      }
    );
  }, [m?.id, _]);
  let A = _ || g;
  return (
    <div className="acc__panel">
      <div className="acc__panel-head">
        <h2 className="acc__panel-title">{'Orders & quotes'}</h2>
      </div>
      {A && <p className="acc__hint">Loading your orders…</p>}
      {!A && x && (
        <span className="acc__error" role="alert">
          {x}
        </span>
      )}
      {!A && !x && 0 === y.length && <p className="acc__empty">You haven't placed any orders yet.</p>}
      {!A && !x && y.length > 0 && (
        <div className="acc__table-wrap">
          <table className="acc__table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total inc GST</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {y.map((e) => {
                var r;
                let i;
                return (
                  <tr key={e.entity_id}>
                    <td>#{e.increment_id}</td>
                    <td>
                      {(function (e) {
                        if (!e) return '—';
                        let t = new Date(e);
                        return Number.isNaN(t.getTime())
                          ? '—'
                          : t.toLocaleDateString('en-AU', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            });
                      })(e.created_at)}
                    </td>
                    <td>
                      {(i = Array.isArray(e.items) ? e.items : []).length
                        ? i.map((e) => `${e.qty_ordered ?? 1} \xd7 ${e.name ?? e.sku}`).join(', ')
                        : '—'}
                    </td>
                    <td>{'number' == typeof e.grand_total ? api.formatPrice(e.grand_total) : '—'}</td>
                    <td>
                      <span className="acc__status">
                        {(r = e.status) ? h[r] || r.charAt(0).toUpperCase() + r.slice(1) : '—'}
                      </span>
                    </td>
                    <td>
                      <div className="acc__table-actions">
                        <Link
                          href={`/account/orders/view/?order=${e.entity_id}`}
                          className="btn btn-ghost acc__table-btn"
                        >
                          View Order
                        </Link>
                        <button
                          type="button"
                          className="btn btn-dark acc__table-btn"
                          onClick={() => k(e)}
                          disabled={j === e.entity_id}
                        >
                          {j === e.entity_id ? 'Adding…' : 'Reorder'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Toast message={C?.message} variant={C?.variant} onDismiss={() => R(null)} />
    </div>
  );
}
