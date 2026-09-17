'use client';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import customerApi from '../../lib/customerApi';
import * as userSlice from '../../store/userSlice';
import useProfile from '../../hooks/useProfile';
import useRequireAuth from '../../hooks/useRequireAuth';
import Toast from '../../components/ui/Toast';
let o = [
    {
      id: 'AU',
      label: 'Australia',
    },
  ],
  d = {
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    postcode: '',
    country_id: 'AU',
    telephone: '',
    default_shipping: !1,
    default_billing: !1,
  };
export default function Default() {
  let e = useDispatch(),
    u = useRequireAuth(),
    { profile: h, loading: p, error: _ } = useProfile(),
    [f, m] = React.useState(null),
    [g, y] = React.useState(null),
    [v, x] = React.useState(d),
    [b, S] = React.useState({}),
    [j, N] = React.useState(!1),
    [C, w] = React.useState(null),
    R = h?.addresses || [];
  function k() {
    (m(null), y(null), S({}));
  }
  function F(e, t) {
    (x((s) => ({
      ...s,
      [e]: t,
    })),
      S((t) =>
        t[e]
          ? {
              ...t,
              [e]: void 0,
            }
          : t,
      ));
  }
  async function z(t) {
    let s;
    t.preventDefault();
    let i =
      ((s = {}),
      v.firstname.trim() || (s.firstname = 'Please enter a first name.'),
      v.lastname.trim() || (s.lastname = 'Please enter a last name.'),
      v.street.trim() || (s.street = 'Please enter a street address.'),
      v.city.trim() || (s.city = 'Please enter a city.'),
      v.postcode.trim() || (s.postcode = 'Please enter a postcode.'),
      v.telephone.trim() || (s.telephone = 'Please enter a phone number.'),
      s);
    if ((S(i), Object.keys(i).length > 0)) return;
    N(!0);
    let n = {
        firstname: v.firstname.trim(),
        lastname: v.lastname.trim(),
        street: [v.street.trim()],
        city: v.city.trim(),
        postcode: v.postcode.trim(),
        country_id: v.country_id,
        telephone: v.telephone.trim(),
        default_shipping: v.default_shipping,
        default_billing: v.default_billing,
      },
      l = (e) =>
        n.default_shipping || n.default_billing
          ? e.map((e) => ({
              ...e,
              default_shipping: !n.default_shipping && e.default_shipping,
              default_billing: !n.default_billing && e.default_billing,
            }))
          : e,
      c =
        'edit' === f
          ? l(R).map((e) =>
              e.id === g
                ? {
                    ...e,
                    ...n,
                    id: g,
                  }
                : e,
            )
          : [...l(R), n],
      o = 'edit' === f;
    try {
      let t = {
          customer: {
            firstname: h.firstname,
            lastname: h.lastname,
            email: h.email,
            addresses: c,
          },
        },
        s = await customerApi.updateProfile(t),
        i = {
          ...h,
          ...s,
          email: h.email,
        };
      (e(userSlice.updateUser(i)),
        k(),
        w({
          variant: 'success',
          message: o ? 'Address updated.' : 'Address added.',
        }));
    } catch (e) {
      if (401 === e.status) return void u();
      w({
        variant: 'error',
        message: e.message || "Couldn't save this address. Please try again.",
      });
    } finally {
      N(!1);
    }
  }
  return (
    <div className="acc__panel">
      <div className="acc__panel-head">
        <h2 className="acc__panel-title">Addresses</h2>
        {!p && h && !f && (
          <button
            type="button"
            className="btn btn-ghost acc__edit-btn"
            onClick={function () {
              (x({
                ...d,
                firstname: h.firstname || '',
                lastname: h.lastname || '',
                default_shipping: 0 === R.length,
                default_billing: 0 === R.length,
              }),
                y(null),
                S({}),
                m('add'));
            }}
          >
            Add address
          </button>
        )}
      </div>
      {p && <p className="acc__hint">Loading your addresses…</p>}
      {!p && _ && (
        <span className="acc__error" role="alert">
          {_}
        </span>
      )}
      {!p && h && !f && 0 === R.length && <p className="acc__empty">You haven't saved any addresses yet.</p>}
      {!p && h && !f && R.length > 0 && (
        <div className="acc__address-grid">
          {R.map((e, s) => (
            <div key={e.id ?? s} className="acc__address-card">
              <p className="acc__address-name">
                {e.firstname} {e.lastname}
              </p>
              <p>{(e.street || []).join(', ')}</p>
              <p>
                {e.city}
                {', '}
                {e.postcode}
              </p>
              <p>{e.country_id}</p>
              {e.telephone && <p>{e.telephone}</p>}
              {(e.default_shipping || e.default_billing) && (
                <div className="acc__address-tags">
                  {e.default_shipping && <span className="acc__badge">default shipping</span>}
                  {e.default_billing && <span className="acc__badge">default billing</span>}
                </div>
              )}
              <button
                type="button"
                className="btn btn-ghost acc__address-edit"
                onClick={() => {
                  (x({
                    firstname: e.firstname || '',
                    lastname: e.lastname || '',
                    street: (e.street || [])[0] || '',
                    city: e.city || '',
                    postcode: e.postcode || '',
                    country_id: e.country_id || 'AU',
                    telephone: e.telephone || '',
                    default_shipping: !!e.default_shipping,
                    default_billing: !!e.default_billing,
                  }),
                    y(e.id),
                    S({}),
                    m('edit'));
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
      {!p && h && f && (
        <form className="acc__section" onSubmit={z} noValidate={!0}>
          <label className={`acc__field${b.firstname ? ' acc__field--error' : ''}`}>
            <span className="acc__label">
              {'First Name '}
              <span className="acc__req" aria-hidden="true">
                *
              </span>
            </span>
            <input
              className="acc__input"
              type="text"
              value={v.firstname}
              onChange={(e) => F('firstname', e.target.value)}
              aria-required="true"
              aria-invalid={b.firstname ? 'true' : void 0}
            />
            {b.firstname && (
              <span className="acc__error" role="alert">
                {b.firstname}
              </span>
            )}
          </label>
          <label className={`acc__field${b.lastname ? ' acc__field--error' : ''}`}>
            <span className="acc__label">
              {'Last Name '}
              <span className="acc__req" aria-hidden="true">
                *
              </span>
            </span>
            <input
              className="acc__input"
              type="text"
              value={v.lastname}
              onChange={(e) => F('lastname', e.target.value)}
              aria-required="true"
              aria-invalid={b.lastname ? 'true' : void 0}
            />
            {b.lastname && (
              <span className="acc__error" role="alert">
                {b.lastname}
              </span>
            )}
          </label>
          <label className={`acc__field${b.street ? ' acc__field--error' : ''}`}>
            <span className="acc__label">
              {'Street Address '}
              <span className="acc__req" aria-hidden="true">
                *
              </span>
            </span>
            <input
              className="acc__input"
              type="text"
              value={v.street}
              onChange={(e) => F('street', e.target.value)}
              aria-required="true"
              aria-invalid={b.street ? 'true' : void 0}
            />
            {b.street && (
              <span className="acc__error" role="alert">
                {b.street}
              </span>
            )}
          </label>
          <label className={`acc__field${b.city ? ' acc__field--error' : ''}`}>
            <span className="acc__label">
              {'City '}
              <span className="acc__req" aria-hidden="true">
                *
              </span>
            </span>
            <input
              className="acc__input"
              type="text"
              value={v.city}
              onChange={(e) => F('city', e.target.value)}
              aria-required="true"
              aria-invalid={b.city ? 'true' : void 0}
            />
            {b.city && (
              <span className="acc__error" role="alert">
                {b.city}
              </span>
            )}
          </label>
          <label className={`acc__field${b.postcode ? ' acc__field--error' : ''}`}>
            <span className="acc__label">
              {'Postcode '}
              <span className="acc__req" aria-hidden="true">
                *
              </span>
            </span>
            <input
              className="acc__input"
              type="text"
              value={v.postcode}
              onChange={(e) => F('postcode', e.target.value)}
              aria-required="true"
              aria-invalid={b.postcode ? 'true' : void 0}
            />
            {b.postcode && (
              <span className="acc__error" role="alert">
                {b.postcode}
              </span>
            )}
          </label>
          <label className="acc__field">
            <span className="acc__label">Country</span>
            <select className="acc__input" value={v.country_id} onChange={(e) => F('country_id', e.target.value)}>
              {o.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.label}
                </option>
              ))}
            </select>
          </label>
          <label className={`acc__field${b.telephone ? ' acc__field--error' : ''}`}>
            <span className="acc__label">
              {'Phone Number '}
              <span className="acc__req" aria-hidden="true">
                *
              </span>
            </span>
            <input
              className="acc__input"
              type="tel"
              value={v.telephone}
              onChange={(e) => F('telephone', e.target.value)}
              aria-required="true"
              aria-invalid={b.telephone ? 'true' : void 0}
            />
            {b.telephone && (
              <span className="acc__error" role="alert">
                {b.telephone}
              </span>
            )}
          </label>
          <label className="acc__toggle">
            <input
              type="checkbox"
              checked={v.default_shipping}
              onChange={(e) => F('default_shipping', e.target.checked)}
            />
            Use as default shipping address
          </label>
          <label className="acc__toggle">
            <input
              type="checkbox"
              checked={v.default_billing}
              onChange={(e) => F('default_billing', e.target.checked)}
            />
            Use as default billing address
          </label>
          <div className="acc__actions">
            <button type="submit" className="btn btn-dark acc__submit" disabled={j}>
              {j ? 'Saving…' : 'edit' === f ? 'Save changes' : 'Save address'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={k} disabled={j}>
              Cancel
            </button>
          </div>
        </form>
      )}
      <Toast message={C?.message} variant={C?.variant} onDismiss={() => w(null)} />
    </div>
  );
}
