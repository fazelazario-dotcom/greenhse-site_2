'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import * as Icons from '../components/ui/Icons';
import * as api from '../lib/api';
import * as storage from '../lib/storage';
import * as cartSlice from '../store/cartSlice';
import * as userSlice from '../store/userSlice';
import useProfile from '../hooks/useProfile';
import useRequireAuth from '../hooks/useRequireAuth';
import customerApi from '../lib/customerApi';
import cartApi from '../lib/cartApi';
let l = [
  {
    src: 'https://greenhse.com/static/version1786961845/frontend/Sm/ozone/en_AU/Worldline_PaymentCore/images/pm/pp_logo_320.svg',
    alt: 'Google Pay',
  },
  {
    src: 'https://greenhse.com/static/version1786961845/frontend/Sm/ozone/en_AU/Worldline_PaymentCore/images/pm/pp_logo_1.svg',
    alt: 'Visa',
  },
  {
    src: 'https://greenhse.com/static/version1786961845/frontend/Sm/ozone/en_AU/Worldline_PaymentCore/images/pm/pp_logo_3.svg',
    alt: 'Mastercard',
  },
  {
    src: 'https://greenhse.com/static/version1786961845/frontend/Sm/ozone/en_AU/Worldline_PaymentCore/images/pm/pp_logo_132.svg',
    alt: 'Diners Club International',
  },
];
function CC() {
  return (
    <div aria-label="Accepted payment methods" className="jsx-f3b2719e158a209d payment-logos">
      {l.map((e) => (
        <span key={e.src} title={e.alt} className="jsx-f3b2719e158a209d payment-logos__badge">
          <img
            src={e.src}
            alt={e.alt}
            width={44}
            height={28}
            loading="lazy"
            decoding="async"
            className="jsx-f3b2719e158a209d"
          />
        </span>
      ))}
      <JSXStyle id="f3b2719e158a209d">
        {
          '.payment-logos.jsx-f3b2719e158a209d{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.payment-logos__badge.jsx-f3b2719e158a209d{background:#fff;border-radius:4px;justify-content:center;align-items:center;width:80px;height:78px;display:flex;overflow:hidden}.payment-logos__badge.jsx-f3b2719e158a209d img.jsx-f3b2719e158a209d{object-fit:contain;width:100%;height:100%}'
        }
      </JSXStyle>
    </div>
  );
}
let j = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  f = [
    {
      id: 'AU',
      label: 'Australia',
    },
  ],
  g = {
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    postcode: '',
    country_id: 'AU',
    telephone: '',
  };
function y(e) {
  let s = {};
  return (
    e.firstname.trim() || (s.firstname = 'Please enter a first name.'),
    e.lastname.trim() || (s.lastname = 'Please enter a last name.'),
    e.street.trim() || (s.street = 'Please enter a street address.'),
    e.city.trim() || (s.city = 'Please enter a city.'),
    e.postcode.trim() || (s.postcode = 'Please enter a postcode.'),
    e.telephone.trim() || (s.telephone = 'Please enter a phone number.'),
    s
  );
}
export default function Default() {
  let e = useDispatch(),
    l = useRequireAuth(),
    v = useSelector(cartSlice.selectCartItems),
    N = useSelector(cartSlice.selectCartSubtotal),
    S = useSelector(cartSlice.selectCartStatus),
    { profile: w, loading: C, error: k } = useProfile(),
    P = useSelector(userSlice.selectToken),
    z = 'loading' === S && 0 === v.length;
  console.log('343', w);
  let A = w?.addresses || [],
    R = A.find((e) => String(e.id) === String(w?.default_shipping)) || A[0] || null,
    F = !!w,
    T = !!P && !F,
    [I, $] = React.useState(!1),
    [O, E] = React.useState(null),
    [U, G] = React.useState([]),
    [q, M] = React.useState(null),
    [D, W] = React.useState(null),
    [L, Y] = React.useState(null),
    [B, Q] = React.useState(null),
    [K, V] = React.useState(!1),
    [J, Z] = React.useState(g),
    [H, X] = React.useState({}),
    [ee, es] = React.useState(!1),
    [ea, et] = React.useState(''),
    [ei, er] = React.useState(null),
    [en, el] = React.useState('idle'),
    [ec, ed] = React.useState(!1),
    [eo, eb] = React.useState(''),
    [eu, ep] = React.useState(null),
    [em, eh] = React.useState(!1),
    [ex, e_] = React.useState(g),
    [ej, ef] = React.useState({}),
    eg = U.find((e) => D && e.carrier_code === D.carrier_code && e.method_code === D.method_code) || U[0] || null,
    ey = Number(eg?.amount) || 0,
    ev = N + ey,
    eN = ev * api.GST_RATE,
    eS = ev + eN,
    ew = !F && 'unavailable' === en && !ec,
    eC = !F && ('available' === en || ('unavailable' === en && ec)),
    ek =
      eC &&
      ex.firstname.trim() &&
      ex.lastname.trim() &&
      ex.street.trim() &&
      ex.city.trim() &&
      ex.postcode.trim() &&
      ex.telephone.trim()
        ? {
            firstname: ex.firstname.trim(),
            lastname: ex.lastname.trim(),
            street: [ex.street.trim()],
            city: ex.city.trim(),
            postcode: ex.postcode.trim(),
            country_id: ex.country_id,
            telephone: ex.telephone.trim(),
          }
        : null,
    eP = F ? R : ek,
    ez = F
      ? {
          firstName: w.firstname || '',
          lastName: w.lastname || '',
          email: w.email || '',
          phone: R?.telephone || '',
        }
      : {
          firstName: '',
          lastName: '',
          email: ea.trim(),
          phone: '',
          isNewCustomer: !0,
        };
  async function eA() {
    let e = ea.trim();
    if (e) {
      if (!j.test(e)) {
        (er('Enter a valid email address, e.g. you@company.com'), el('idle'));
        return;
      }
      (er(null), el('checking'));
      try {
        let s = await customerApi.isEmailAvailable(e);
        el(s ? 'available' : 'unavailable');
      } catch (e) {
        (el('idle'), er(e.message || "Couldn't check this email right now. Please try again."));
      }
    }
  }
  async function eR(s) {
    if ((s.preventDefault(), !em)) {
      if (!eo) return void ep('Please enter your password.');
      (eh(!0), ep(null));
      try {
        let s = await customerApi.login({
          username: ea.trim(),
          password: eo,
        });
        (storage.saveAuthToken(s),
          e(
            userSlice.setCredentials({
              token: s,
            }),
          ));
        let a = storage.getGuestCartId();
        if (a)
          try {
            let s = await customerApi.getProfile();
            (e(userSlice.updateUser(s)),
              await cartApi.mergeGuestCart({
                guestCartId: a,
                customerId: s.id,
              }));
          } catch {}
        storage.clearGuestCartId();
        try {
          let s = await customerApi.createCart();
          (storage.saveQuoteId(s), e(userSlice.setQuoteId(s)));
        } catch {}
        e(cartSlice.fetchCart());
      } catch (e) {
        ep(e.message || 'Sign in failed. Please check your password and try again.');
      } finally {
        eh(!1);
      }
    }
  }
  function eF(e, s) {
    (e_((a) => ({
      ...a,
      [e]: s,
    })),
      ef((s) =>
        s[e]
          ? {
              ...s,
              [e]: void 0,
            }
          : s,
      ));
  }
  async function eT(e) {
    let s = {
      firstname: e?.firstname || '',
      lastname: e?.lastname || '',
      street: e?.street || '',
      city: e?.city || '',
      region: e?.region?.region || '',
      region_id: e?.region_id || '',
      postcode: e?.postcode || '',
      country_id: e?.country_id || '',
      telephone: e?.telephone || '',
    };
    try {
      let e;
      if (F)
        e = await customerApi.getEstimateShippingMethods({
          address: s,
        });
      else {
        let s = storage.getGuestCartId();
        if (!s) return void G([]);
        e = await cartApi.getGuestEstimateShippingMethods({
          cartId: s,
          address: {
            country_id: 'AU',
            postcode: '2000',
            city: 'Sydney',
            street: ['395 Pitt Street'],
          },
        });
      }
      (e && Array.isArray(e) && G(e), M(null));
    } catch (e) {
      M(e.message || "Couldn't load shipping methods.");
    }
  }
  async function eI(s) {
    let a = await customerApi.updateProfile({
      customer: {
        firstname: w.firstname,
        lastname: w.lastname,
        email: w.email,
        addresses: s,
      },
    });
    e(
      userSlice.updateUser({
        ...w,
        ...a,
        email: w.email,
      }),
    );
  }
  async function e$(e) {
    if (!w || L || (R && String(e.id) === String(R.id))) return;
    (Y(e.id), Q(null));
    let s = A.map((s) => ({
      ...s,
      default_shipping: String(s.id) === String(e.id),
    }));
    try {
      await eI(s);
    } catch (e) {
      if (401 === e.status) return void l();
      Q(e.message || "Couldn't update your shipping address. Please try again.");
    } finally {
      Y(null);
    }
  }
  function eO() {
    ee || V(!1);
  }
  function eE(e, s) {
    (Z((a) => ({
      ...a,
      [e]: s,
    })),
      X((s) =>
        s[e]
          ? {
              ...s,
              [e]: void 0,
            }
          : s,
      ));
  }
  async function eU(e) {
    e.preventDefault();
    let s = y(J);
    if ((X(s), Object.keys(s).length > 0)) return;
    (es(!0), Q(null));
    let a = {
        firstname: J.firstname.trim(),
        lastname: J.lastname.trim(),
        street: [J.street.trim()],
        city: J.city.trim(),
        postcode: J.postcode.trim(),
        country_id: J.country_id,
        telephone: J.telephone.trim(),
        default_shipping: !0,
        default_billing: 0 === A.length,
      },
      t = [
        ...A.map((e) => ({
          ...e,
          default_shipping: !1,
        })),
        a,
      ];
    try {
      (await eI(t), V(!1), Z(g));
    } catch (e) {
      if (401 === e.status) return void l();
      Q(e.message || "Couldn't save this address. Please try again.");
    } finally {
      es(!1);
    }
  }
  async function eG(s) {
    if ((s.preventDefault(), I)) return;
    if (!F) {
      if (ew) return void E('Please sign in, or choose to continue as guest, before placing your order.');
      if (!ea.trim() || 'idle' === en || 'checking' === en) return void er('Please enter your email address.');
      let e = y(ex);
      if ((ef(e), Object.keys(e).length > 0)) return;
    }
    if (!eP)
      return void E(
        F
          ? 'Please add a shipping address before placing your order.'
          : 'Please fill in your delivery address before placing your order.',
      );
    if (U.length > 0 && !eg) return void E('Please select a shipping method before placing your order.');
    ($(!0), E(null), Date.now());
    let a = w?.addresses?.find((e) => !0 == e.default_billing);
    try {
      window.location.origin;
      let s = {
        paymentMethod: {
          method: 'worldline_hosted_checkout',
        },
        email: F ? ez.email : ea?.trim(),
        billing_address: {
          firstname: F ? a?.firstname || 'John' : ex?.firstname || 'John',
          lastname: F ? a?.lastname || 'Smith' : ex?.lastname || 'Smith',
          email: F ? w?.email || 'john@example.com' : ea?.trim() || 'john@example.com',
          street: F ? a?.street || ['123 Main Street'] : [ex?.street || ''],
          city: F ? a?.city || 'Perth' : ex?.city || 'Perth',
          region: F ? a?.region?.region_code || 'WA' : ex?.region_code || 'WA',
          postcode: F ? a?.postcode || '6000' : ex?.postcode || '6000',
          country_id: 'AU',
          telephone: F ? a?.telephone || '0400000000' : ex?.telephone || '0400000000',
        },
      };
      F || (s.cart_id = storage.getGuestCartId());
      let t = await customerApi.createOrder(s);
      if (F) {
        storage.clearQuoteId();
        try {
          let s = await customerApi.createCart();
          (storage.saveQuoteId(s), e(userSlice.setQuoteId(s)));
        } catch {}
      } else {
        storage.clearGuestCartId();
        try {
          let e = await cartApi.createGuestCart();
          storage.saveGuestCartId(e);
        } catch {}
      }
      try {
        await e(cartSlice.fetchCart()).unwrap();
      } catch {}
      window.location.href = t?.redirect_url;
    } catch (e) {
      (E(e.message), $(!1));
    }
  }
  return (
    React.useEffect(() => {
      F ? eT(R) : eT(ek);
    }, [F, R, eC, ex.firstname, ex.lastname, ex.street, ex.city, ex.postcode, ex.country_id, ex.telephone]),
    (console.log('$#4554545', ex), z) ? (
      <main className="acc checkout-page">
        <div className="container">
          <CheckoutSteps current="checkout" />
          <h1 className="acc__title">Checkout</h1>
          <div className="acc__panel empty">
            <p className="empty__title">Loading your cart…</p>
          </div>
        </div>
      </main>
    ) : 0 === v.length ? (
      <main className="acc checkout-page">
        <div className="container">
          <CheckoutSteps current="checkout" />
          <h1 className="acc__title">Checkout</h1>
          <div className="acc__panel empty">
            <p className="empty__title">Your cart is empty</p>
            <p className="empty__sub">Add something to your cart before checking out.</p>
            <Link href="/" className="btn btn-dark">
              Keep shopping
            </Link>
          </div>
        </div>
      </main>
    ) : (
      <main className="jsx-be2e187b1d3648ab acc checkout-page">
        <div className="jsx-be2e187b1d3648ab container">
          <CheckoutSteps current="checkout" />
          <h1 className="jsx-be2e187b1d3648ab acc__title">Checkout</h1>
          <form onSubmit={eG} noValidate={!0} className="jsx-be2e187b1d3648ab layout">
            <div className="jsx-be2e187b1d3648ab fields">
              {!F && T && (
                <section className="jsx-be2e187b1d3648ab acc__panel">
                  <h2 className="jsx-be2e187b1d3648ab acc__legend">Customer information</h2>
                  <p className="jsx-be2e187b1d3648ab acc__hint">Signing you in…</p>
                </section>
              )}
              {!F && !T && (
                <section className="jsx-be2e187b1d3648ab acc__panel">
                  <h2 className="jsx-be2e187b1d3648ab acc__legend">Customer information</h2>
                  <label className={`jsx-be2e187b1d3648ab acc__field${ei ? ' acc__field--error' : ''}`}>
                    <span className="jsx-be2e187b1d3648ab acc__label">
                      {'Email address '}
                      <span aria-hidden="true" className="jsx-be2e187b1d3648ab acc__req">
                        *
                      </span>
                    </span>
                    <input
                      type="email"
                      value={ea}
                      onChange={(e) => {
                        (et(e.target.value), er(null), el('idle'), ed(!1), eb(''), ep(null));
                      }}
                      onBlur={eA}
                      placeholder="you@company.com"
                      disabled={I || em}
                      className="jsx-be2e187b1d3648ab acc__input"
                    />
                    {ei && <span className="jsx-be2e187b1d3648ab acc__error">{ei}</span>}
                  </label>
                  {'checking' === en && <p className="jsx-be2e187b1d3648ab acc__hint">Checking your email…</p>}
                  {eC && (
                    <p className="jsx-be2e187b1d3648ab acc__hint">
                      You'll check out as a guest — you can create an account after checkout.
                    </p>
                  )}
                  {ew && (
                    <div className="jsx-be2e187b1d3648ab login-prompt">
                      <p className="jsx-be2e187b1d3648ab acc__hint">
                        You already have an account with us. Sign in, or continue as guest.
                      </p>
                      <div className="jsx-be2e187b1d3648ab">
                        <label className={`jsx-be2e187b1d3648ab acc__field${eu ? ' acc__field--error' : ''}`}>
                          <span className="jsx-be2e187b1d3648ab acc__label">Password</span>
                          <input
                            type="password"
                            value={eo}
                            onChange={(e) => {
                              (eb(e.target.value), ep(null));
                            }}
                            disabled={em}
                            className="jsx-be2e187b1d3648ab acc__input"
                          />
                          {eu && <span className="jsx-be2e187b1d3648ab acc__error">{eu}</span>}
                        </label>
                        <div className="jsx-be2e187b1d3648ab login-prompt__actions">
                          <button
                            type="button"
                            disabled={em}
                            onClick={eR}
                            className="jsx-be2e187b1d3648ab btn btn-dark"
                          >
                            {em ? 'Signing in…' : 'Login'}
                          </button>
                          <Link href="/account/forgotpassword/" className="link-mono">
                            Forgot your password?
                          </Link>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => ed(!0)}
                        disabled={em}
                        className="jsx-be2e187b1d3648ab btn btn-ghost login-prompt__guest"
                      >
                        Continue as guest
                      </button>
                    </div>
                  )}
                </section>
              )}
              {(F || eC) && (
                <section className="jsx-be2e187b1d3648ab acc__panel">
                  <div className="jsx-be2e187b1d3648ab acc__panel-head">
                    <h2 className="jsx-be2e187b1d3648ab acc__legend acc__panel-title">Address information</h2>
                    {F && (
                      <button
                        type="button"
                        onClick={function () {
                          (Z({
                            ...g,
                            firstname: w?.firstname || '',
                            lastname: w?.lastname || '',
                          }),
                            X({}),
                            Q(null),
                            V(!0));
                        }}
                        disabled={I}
                        className="jsx-be2e187b1d3648ab btn btn-ghost acc__edit-btn"
                      >
                        + New address
                      </button>
                    )}
                  </div>
                  {B && (
                    <span role="alert" className="jsx-be2e187b1d3648ab acc__error">
                      {B}
                    </span>
                  )}
                  {F ? (
                    0 === A.length ? (
                      <p className="jsx-be2e187b1d3648ab acc__empty">
                        You haven't saved a shipping address yet. Add one to continue.
                      </p>
                    ) : (
                      <div className="jsx-be2e187b1d3648ab acc__address-grid">
                        {A.map((e, a) => {
                          let t = R && String(e.id) === String(R.id);
                          return (
                            <div
                              key={e.id ?? a}
                              className={`jsx-be2e187b1d3648ab acc__address-card address-card${t ? ' address-card--selected' : ''}`}
                            >
                              <p className="jsx-be2e187b1d3648ab acc__address-name">
                                {e.firstname} {e.lastname}
                              </p>
                              <p className="jsx-be2e187b1d3648ab">{(e.street || []).join(', ')}</p>
                              <p className="jsx-be2e187b1d3648ab">
                                {e.city}
                                {', '}
                                {e.postcode}
                              </p>
                              <p className="jsx-be2e187b1d3648ab">{e.country_id}</p>
                              {e.telephone && <p className="jsx-be2e187b1d3648ab">{e.telephone}</p>}
                              {t && (
                                <div className="jsx-be2e187b1d3648ab acc__address-tags">
                                  <span className="jsx-be2e187b1d3648ab acc__badge">shipping here</span>
                                </div>
                              )}
                              {!t && (
                                <button
                                  type="button"
                                  onClick={() => e$(e)}
                                  disabled={null !== L || I}
                                  className="jsx-be2e187b1d3648ab btn btn-ghost acc__address-edit"
                                >
                                  {L === e.id ? 'Updating…' : 'Ship here'}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )
                  ) : (
                    <>
                      <div className="jsx-be2e187b1d3648ab field-row">
                        <label className={`jsx-be2e187b1d3648ab acc__field${ej.firstname ? ' acc__field--error' : ''}`}>
                          <span className="jsx-be2e187b1d3648ab acc__label">First name</span>
                          <input
                            type="text"
                            value={ex.firstname}
                            onChange={(e) => eF('firstname', e.target.value)}
                            disabled={I}
                            className="jsx-be2e187b1d3648ab acc__input"
                          />
                          {ej.firstname && <span className="jsx-be2e187b1d3648ab acc__error">{ej.firstname}</span>}
                        </label>
                        <label className={`jsx-be2e187b1d3648ab acc__field${ej.lastname ? ' acc__field--error' : ''}`}>
                          <span className="jsx-be2e187b1d3648ab acc__label">Last name</span>
                          <input
                            type="text"
                            value={ex.lastname}
                            onChange={(e) => eF('lastname', e.target.value)}
                            disabled={I}
                            className="jsx-be2e187b1d3648ab acc__input"
                          />
                          {ej.lastname && <span className="jsx-be2e187b1d3648ab acc__error">{ej.lastname}</span>}
                        </label>
                      </div>
                      <label className={`jsx-be2e187b1d3648ab acc__field${ej.street ? ' acc__field--error' : ''}`}>
                        <span className="jsx-be2e187b1d3648ab acc__label">Street address</span>
                        <input
                          type="text"
                          value={ex.street}
                          onChange={(e) => eF('street', e.target.value)}
                          disabled={I}
                          className="jsx-be2e187b1d3648ab acc__input"
                        />
                        {ej.street && <span className="jsx-be2e187b1d3648ab acc__error">{ej.street}</span>}
                      </label>
                      <div className="jsx-be2e187b1d3648ab field-row">
                        <label className={`jsx-be2e187b1d3648ab acc__field${ej.city ? ' acc__field--error' : ''}`}>
                          <span className="jsx-be2e187b1d3648ab acc__label">City</span>
                          <input
                            type="text"
                            value={ex.city}
                            onChange={(e) => eF('city', e.target.value)}
                            disabled={I}
                            className="jsx-be2e187b1d3648ab acc__input"
                          />
                          {ej.city && <span className="jsx-be2e187b1d3648ab acc__error">{ej.city}</span>}
                        </label>
                        <label className={`jsx-be2e187b1d3648ab acc__field${ej.postcode ? ' acc__field--error' : ''}`}>
                          <span className="jsx-be2e187b1d3648ab acc__label">Postcode</span>
                          <input
                            type="text"
                            value={ex.postcode}
                            onChange={(e) => eF('postcode', e.target.value)}
                            disabled={I}
                            className="jsx-be2e187b1d3648ab acc__input"
                          />
                          {ej.postcode && <span className="jsx-be2e187b1d3648ab acc__error">{ej.postcode}</span>}
                        </label>
                      </div>
                      <label className="jsx-be2e187b1d3648ab acc__field">
                        <span className="jsx-be2e187b1d3648ab acc__label">Country</span>
                        <select
                          value={ex.country_id}
                          onChange={(e) => eF('country_id', e.target.value)}
                          disabled={I}
                          className="jsx-be2e187b1d3648ab acc__input"
                        >
                          {f.map((e) => (
                            <option key={e.id} value={e.id} className="jsx-be2e187b1d3648ab">
                              {e.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className={`jsx-be2e187b1d3648ab acc__field${ej.telephone ? ' acc__field--error' : ''}`}>
                        <span className="jsx-be2e187b1d3648ab acc__label">Phone number</span>
                        <input
                          type="tel"
                          value={ex.telephone}
                          onChange={(e) => eF('telephone', e.target.value)}
                          disabled={I}
                          className="jsx-be2e187b1d3648ab acc__input"
                        />
                        {ej.telephone && <span className="jsx-be2e187b1d3648ab acc__error">{ej.telephone}</span>}
                      </label>
                    </>
                  )}
                </section>
              )}
            </div>
            <aside className="jsx-be2e187b1d3648ab acc__panel summary">
              <h2 className="jsx-be2e187b1d3648ab summary__title">Shipping Methods</h2>
              {!q && !eP && (
                <p className="jsx-be2e187b1d3648ab acc__hint">Add a shipping address to see delivery options.</p>
              )}
              <ul className="jsx-be2e187b1d3648ab summary__items">
                {U.map((e) => {
                  let a = eg && eg.carrier_code === e.carrier_code && eg.method_code === e.method_code;
                  return (
                    <label
                      key={`${e?.carrier_code}-${e?.method_code}`}
                      className="jsx-be2e187b1d3648ab delivery-option"
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={!!a}
                        onChange={() => W(e)}
                        disabled={I}
                        className="jsx-be2e187b1d3648ab"
                      />
                      <span className="jsx-be2e187b1d3648ab">
                        <li className="jsx-be2e187b1d3648ab summary__item">
                          <span className="jsx-be2e187b1d3648ab">{api.formatPrice(e?.amount)}</span>
                          <span className="jsx-be2e187b1d3648ab">{e?.method_title}</span>
                        </li>
                        <span className="jsx-be2e187b1d3648ab delivery-option__hint">{e?.carrier_title}</span>
                      </span>
                    </label>
                  );
                })}
              </ul>
              <div className="jsx-be2e187b1d3648ab payment-section">
                <h2 className="jsx-be2e187b1d3648ab acc__legend">Payment</h2>
                <p className="jsx-be2e187b1d3648ab payment-copy">
                  Pay with Additional Payment Methods by ANZ Worldline. It'll redirect you to ANZ secure payment site..
                </p>
                <CC />
              </div>
            </aside>
            <aside className="jsx-be2e187b1d3648ab acc__panel summary">
              <h2 className="jsx-be2e187b1d3648ab summary__title">Order summary</h2>
              <ul className="jsx-be2e187b1d3648ab summary__items">
                {v.map((e) => (
                  <li key={e.id} className="jsx-be2e187b1d3648ab summary__item">
                    <span className="jsx-be2e187b1d3648ab">
                      {e.name} <span className="jsx-be2e187b1d3648ab summary__qty">×{e.qty}</span>
                    </span>
                    <span className="jsx-be2e187b1d3648ab">{api.formatPrice(e.price * e.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="jsx-be2e187b1d3648ab summary__row">
                <span className="jsx-be2e187b1d3648ab">Cart Subtotal</span>
                <span className="jsx-be2e187b1d3648ab">{api.formatPrice(N)}</span>
              </div>
              <div className="jsx-be2e187b1d3648ab summary__row summary__row--shipping">
                <span className="jsx-be2e187b1d3648ab">Shipping</span>
                <span className="jsx-be2e187b1d3648ab">{api.formatPrice(ey)}</span>
              </div>
              {eg && (
                <p className="jsx-be2e187b1d3648ab summary__shipping-hint">
                  {eg.carrier_title}
                  {eg.method_title ? ` - ${eg.method_title}` : ''}
                </p>
              )}
              <div className="jsx-be2e187b1d3648ab summary__row">
                <span className="jsx-be2e187b1d3648ab">Tax</span>
                <span className="jsx-be2e187b1d3648ab">{api.formatPrice(eN)}</span>
              </div>
              <div className="jsx-be2e187b1d3648ab summary__row summary__row--sub">
                <span className="jsx-be2e187b1d3648ab">AU/GST (10%)</span>
                <span className="jsx-be2e187b1d3648ab">{api.formatPrice(eN)}</span>
              </div>
              <div className="jsx-be2e187b1d3648ab summary__row summary__row--total">
                <span className="jsx-be2e187b1d3648ab">Order Total Incl. Tax</span>
                <span className="jsx-be2e187b1d3648ab">{api.formatPrice(eS)}</span>
              </div>
              <div className="jsx-be2e187b1d3648ab summary__row">
                <span className="jsx-be2e187b1d3648ab">Order Total Excl. Tax</span>
                <span className="jsx-be2e187b1d3648ab">{api.formatPrice(ev)}</span>
              </div>
              <p className="jsx-be2e187b1d3648ab summary__note">
                You'll pay securely on the next page — we'll email your order confirmation once payment goes through.
              </p>
              {O && (
                <p role="alert" className="jsx-be2e187b1d3648ab submit-error">
                  {O}
                </p>
              )}
              <button type="submit" disabled={I} className="jsx-be2e187b1d3648ab btn btn-dark btn-block summary__cta">
                {I ? 'Placing order…' : 'Place order'}
              </button>
            </aside>
          </form>
          {K && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Add a new address"
              onClick={eO}
              className="jsx-be2e187b1d3648ab overlay"
            >
              <div onClick={(e) => e.stopPropagation()} className="jsx-be2e187b1d3648ab popup">
                <div className="jsx-be2e187b1d3648ab popup__head">
                  <h2 className="jsx-be2e187b1d3648ab popup__title">New address</h2>
                  <button
                    type="button"
                    onClick={eO}
                    aria-label="Close"
                    disabled={ee}
                    className="jsx-be2e187b1d3648ab popup__close"
                  >
                    <Icons.IconClose width={14} height={14} />
                  </button>
                </div>
                <form onSubmit={eU} noValidate={!0} className="jsx-be2e187b1d3648ab popup__form">
                  <div className="jsx-be2e187b1d3648ab field-row">
                    <label className={`jsx-be2e187b1d3648ab acc__field${H.firstname ? ' acc__field--error' : ''}`}>
                      <span className="jsx-be2e187b1d3648ab acc__label">First name</span>
                      <input
                        type="text"
                        value={J.firstname}
                        onChange={(e) => eE('firstname', e.target.value)}
                        disabled={ee}
                        className="jsx-be2e187b1d3648ab acc__input"
                      />
                      {H.firstname && <span className="jsx-be2e187b1d3648ab acc__error">{H.firstname}</span>}
                    </label>
                    <label className={`jsx-be2e187b1d3648ab acc__field${H.lastname ? ' acc__field--error' : ''}`}>
                      <span className="jsx-be2e187b1d3648ab acc__label">Last name</span>
                      <input
                        type="text"
                        value={J.lastname}
                        onChange={(e) => eE('lastname', e.target.value)}
                        disabled={ee}
                        className="jsx-be2e187b1d3648ab acc__input"
                      />
                      {H.lastname && <span className="jsx-be2e187b1d3648ab acc__error">{H.lastname}</span>}
                    </label>
                  </div>
                  <label className={`jsx-be2e187b1d3648ab acc__field${H.street ? ' acc__field--error' : ''}`}>
                    <span className="jsx-be2e187b1d3648ab acc__label">Street address</span>
                    <input
                      type="text"
                      value={J.street}
                      onChange={(e) => eE('street', e.target.value)}
                      disabled={ee}
                      className="jsx-be2e187b1d3648ab acc__input"
                    />
                    {H.street && <span className="jsx-be2e187b1d3648ab acc__error">{H.street}</span>}
                  </label>
                  <div className="jsx-be2e187b1d3648ab field-row">
                    <label className={`jsx-be2e187b1d3648ab acc__field${H.city ? ' acc__field--error' : ''}`}>
                      <span className="jsx-be2e187b1d3648ab acc__label">City</span>
                      <input
                        type="text"
                        value={J.city}
                        onChange={(e) => eE('city', e.target.value)}
                        disabled={ee}
                        className="jsx-be2e187b1d3648ab acc__input"
                      />
                      {H.city && <span className="jsx-be2e187b1d3648ab acc__error">{H.city}</span>}
                    </label>
                    <label className={`jsx-be2e187b1d3648ab acc__field${H.postcode ? ' acc__field--error' : ''}`}>
                      <span className="jsx-be2e187b1d3648ab acc__label">Postcode</span>
                      <input
                        type="text"
                        value={J.postcode}
                        onChange={(e) => eE('postcode', e.target.value)}
                        disabled={ee}
                        className="jsx-be2e187b1d3648ab acc__input"
                      />
                      {H.postcode && <span className="jsx-be2e187b1d3648ab acc__error">{H.postcode}</span>}
                    </label>
                  </div>
                  <label className="jsx-be2e187b1d3648ab acc__field">
                    <span className="jsx-be2e187b1d3648ab acc__label">Country</span>
                    <select
                      value={J.country_id}
                      onChange={(e) => eE('country_id', e.target.value)}
                      disabled={ee}
                      className="jsx-be2e187b1d3648ab acc__input"
                    >
                      {f.map((e) => (
                        <option key={e.id} value={e.id} className="jsx-be2e187b1d3648ab">
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={`jsx-be2e187b1d3648ab acc__field${H.telephone ? ' acc__field--error' : ''}`}>
                    <span className="jsx-be2e187b1d3648ab acc__label">Phone number</span>
                    <input
                      type="tel"
                      value={J.telephone}
                      onChange={(e) => eE('telephone', e.target.value)}
                      disabled={ee}
                      className="jsx-be2e187b1d3648ab acc__input"
                    />
                    {H.telephone && <span className="jsx-be2e187b1d3648ab acc__error">{H.telephone}</span>}
                  </label>
                  {B && (
                    <p role="alert" className="jsx-be2e187b1d3648ab submit-error">
                      {B}
                    </p>
                  )}
                  <div className="jsx-be2e187b1d3648ab popup__actions">
                    <button type="submit" disabled={ee} className="jsx-be2e187b1d3648ab btn btn-dark">
                      {ee ? 'Saving…' : 'Save address'}
                    </button>
                    <button type="button" onClick={eO} disabled={ee} className="jsx-be2e187b1d3648ab btn btn-ghost">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <JSXStyle id="be2e187b1d3648ab">
          {
            '.checkout-page.jsx-be2e187b1d3648ab{background:var(--bg);min-height:60vh}.empty.jsx-be2e187b1d3648ab{text-align:center;padding:56px 24px}.empty__title.jsx-be2e187b1d3648ab{margin:0 0 6px;font-size:18px;font-weight:600}.empty__sub.jsx-be2e187b1d3648ab{color:var(--ink-muted);margin:0 0 22px;font-size:14px}.layout.jsx-be2e187b1d3648ab{grid-template-columns:1fr 1fr 340px;align-items:start;gap:24px;display:grid}.fields.jsx-be2e187b1d3648ab{flex-direction:column;gap:20px;min-width:0;display:flex}.field-row.jsx-be2e187b1d3648ab{grid-template-columns:1fr 1fr;gap:16px;display:grid}.field-row.jsx-be2e187b1d3648ab .acc__field.jsx-be2e187b1d3648ab{max-width:none}.delivery-option.jsx-be2e187b1d3648ab{border-bottom:1px solid var(--line);cursor:pointer;align-items:flex-start;gap:10px;padding:12px 0;font-size:14px;display:flex}.delivery-option.jsx-be2e187b1d3648ab:last-of-type{border-bottom:0}.delivery-option.jsx-be2e187b1d3648ab input.jsx-be2e187b1d3648ab{flex:none;margin-top:3px}.delivery-option.jsx-be2e187b1d3648ab b.jsx-be2e187b1d3648ab{font-weight:600;display:block}.delivery-option__hint.jsx-be2e187b1d3648ab{color:var(--ink-muted);margin-top:2px;font-size:12.5px;display:block}.address-card.jsx-be2e187b1d3648ab{transition:border-color .15s,background .15s;position:relative}.address-card--selected.jsx-be2e187b1d3648ab{border-color:var(--green);background:var(--hover-bg)}.address-card.jsx-be2e187b1d3648ab .acc__badge{border-color:var(--green);color:var(--green-hover)}.login-prompt.jsx-be2e187b1d3648ab{border-top:1px solid var(--line);margin-top:4px;padding-top:18px}.login-prompt__actions.jsx-be2e187b1d3648ab{align-items:center;gap:16px;margin-top:4px;display:flex}.login-prompt__guest.jsx-be2e187b1d3648ab{margin-top:14px}.overlay.jsx-be2e187b1d3648ab{z-index:120;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#14150f73;justify-content:center;align-items:flex-start;padding:46px 24px;animation:.18s fade;display:flex;position:fixed;inset:0}.popup.jsx-be2e187b1d3648ab{background:var(--bg-raised);border-radius:var(--radius-md);width:100%;max-width:480px;max-height:100%;padding:24px 26px 28px;animation:.22s rise;position:relative;overflow-y:auto;box-shadow:0 40px 90px -40px #14150f99}.popup__head.jsx-be2e187b1d3648ab{justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;display:flex}.popup__title.jsx-be2e187b1d3648ab{letter-spacing:-.01em;margin:0;font-size:17px;font-weight:600}.popup__close.jsx-be2e187b1d3648ab{background:var(--bg-card);width:30px;height:30px;color:var(--ink);cursor:pointer;border:0;border-radius:50%;flex:none;place-items:center;display:grid}.popup__close.jsx-be2e187b1d3648ab:hover{background:var(--hover-bg)}.popup__form.jsx-be2e187b1d3648ab{flex-direction:column;gap:16px;display:flex}.popup__form.jsx-be2e187b1d3648ab .acc__field.jsx-be2e187b1d3648ab{max-width:none}.popup__actions.jsx-be2e187b1d3648ab{gap:10px;margin-top:4px;display:flex}@keyframes fade{0%{opacity:0}}@keyframes rise{0%{opacity:0;transform:translateY(10px)}}.payment-section.jsx-be2e187b1d3648ab{border-top:1px solid var(--line);margin-top:22px;padding-top:18px}.payment-copy.jsx-be2e187b1d3648ab{color:var(--ink-muted);margin:0 0 14px;font-size:14.5px;line-height:1.55}.summary.jsx-be2e187b1d3648ab{position:sticky;top:24px}.summary__title.jsx-be2e187b1d3648ab{letter-spacing:-.01em;margin:0 0 16px;font-size:17px;font-weight:600}.summary__items.jsx-be2e187b1d3648ab{margin:0 0 4px;padding:0;list-style:none}.summary__item.jsx-be2e187b1d3648ab{color:var(--ink-soft);justify-content:space-between;align-items:baseline;gap:12px;padding:7px 0;font-size:13.5px;display:flex}.summary__qty.jsx-be2e187b1d3648ab{font-family:var(--font-mono);color:var(--ink-muted);font-size:11px}.summary__row.jsx-be2e187b1d3648ab{color:var(--ink-soft);border-top:1px solid var(--line);justify-content:space-between;align-items:baseline;gap:12px;padding:8px 0;font-size:14px;display:flex}.summary__row--total.jsx-be2e187b1d3648ab{color:var(--ink);padding-top:12px;font-size:16px;font-weight:600}.summary__row--shipping.jsx-be2e187b1d3648ab{padding-bottom:0}.summary__row--sub.jsx-be2e187b1d3648ab{color:var(--ink-muted);border-top:0;padding-top:0;font-size:12.5px}.summary__shipping-hint.jsx-be2e187b1d3648ab{color:var(--ink-muted);margin:0 0 4px;font-size:12px;line-height:1.5}.summary__note.jsx-be2e187b1d3648ab{color:var(--ink-muted);border:1px solid var(--line);border-radius:var(--radius-sm);background:#f4f4f4;margin:16px 0;padding:11px 13px;font-size:12.5px;line-height:1.55}.summary__cta.jsx-be2e187b1d3648ab{height:50px}.summary__cta.jsx-be2e187b1d3648ab:disabled{opacity:.6;cursor:not-allowed}.submit-error.jsx-be2e187b1d3648ab{color:#b3261e;border-radius:var(--radius-sm);background:#fdecea;border:1px solid #f3c4c0;margin:0 0 12px;padding:10px 12px;font-size:13px;line-height:1.45}@media (width<=860px){.layout.jsx-be2e187b1d3648ab{grid-template-columns:1fr}.summary.jsx-be2e187b1d3648ab{position:static}.field-row.jsx-be2e187b1d3648ab{grid-template-columns:1fr}}'
          }
        </JSXStyle>
      </main>
    )
  );
}
