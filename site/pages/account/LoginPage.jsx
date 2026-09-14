'use client';
import Link from 'next/link';
import * as React from 'react';
import * as navigation from 'next/navigation';
import { useDispatch } from 'react-redux';
import ReCaptcha from '../../components/ui/ReCaptcha';
import Toast from '../../components/ui/Toast';
import customerApi from '../../lib/customerApi';
import cartApi from '../../lib/cartApi';
import * as storage from '../../lib/storage';
import * as userSlice from '../../store/userSlice';
import * as cartSlice from '../../store/cartSlice';
let h = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export default function Default() {
  let e = navigation.useRouter(),
    f = useDispatch(),
    [m, y] = React.useState({
      email: '',
      password: '',
    }),
    [_, v] = React.useState(!1),
    [g, b] = React.useState(!1),
    [S, x] = React.useState(null),
    [w, j] = React.useState({}),
    [R, C] = React.useState(!1),
    [O, k] = React.useState(null),
    E = React.useRef(null);
  function F(e, t) {
    (y((r) => ({
      ...r,
      [e]: t,
    })),
      j((t) =>
        t[e]
          ? {
              ...t,
              [e]: void 0,
            }
          : t,
      ));
  }
  async function N(t) {
    let r, n;
    t.preventDefault();
    let i =
      ((r = {}),
      (n = m.email.trim())
        ? h.test(n) || (r.email = 'Enter a valid email address.')
        : (r.email = 'Please enter your email address.'),
      m.password || (r.password = 'Please enter your password.'),
      g || (r.captcha = !0),
      r);
    if ((j(i), !(Object.keys(i).length > 0))) {
      C(!0);
      try {
        let t = {
            username: m.email,
            password: m.password,
          },
          r = await customerApi.login(t, S);
        (storage.saveAuthToken(r),
          f(
            userSlice.setCredentials({
              token: r,
            }),
          ));
        let n = storage.getGuestCartId();
        if (n)
          try {
            let e = await customerApi.getProfile();
            (f(userSlice.updateUser(e)),
              await cartApi.mergeGuestCart({
                guestCartId: n,
                customerId: e.id,
              }));
          } catch {}
        storage.clearGuestCartId();
        try {
          let e = await customerApi.createCart();
          (storage.saveQuoteId(e), f(userSlice.setQuoteId(e)));
        } catch {}
        (f(cartSlice.fetchCart()),
          k({
            variant: 'success',
            message: 'Signed in successfully.',
          }),
          e.replace('/account/'));
      } catch (e) {
        (k({
          variant: 'error',
          message: e.message || 'Sign in failed. Please try again.',
        }),
          E.current?.reset(),
          b(!1),
          x(null));
      } finally {
        C(!1);
      }
    }
  }
  return (
    <form className="acc__card" onSubmit={N} noValidate={!0}>
      <span className="eyebrow acc__eyebrow">Account</span>
      <h1 className="acc__cardtitle">Sign in</h1>
      <div className="acc__section">
        <label className={`acc__field${w.email ? ' acc__field--error' : ''}`}>
          <span className="acc__label">Email</span>
          <input
            className="acc__input"
            type="email"
            value={m.email}
            maxLength={50}
            onChange={(e) => F('email', e.target.value)}
            placeholder="you@example.com"
            aria-required="true"
            aria-invalid={w.email ? 'true' : void 0}
          />
          {w.email && (
            <span className="acc__error" role="alert">
              {w.email}
            </span>
          )}
        </label>
        <label className={`acc__field${w.password ? ' acc__field--error' : ''}`}>
          <span className="acc__label">Password</span>
          <input
            className="acc__input"
            type={_ ? 'text' : 'password'}
            value={m.password}
            onChange={(e) => F('password', e.target.value)}
            placeholder="Your password"
            aria-required="true"
            aria-invalid={w.password ? 'true' : void 0}
          />
          {w.password && (
            <span className="acc__error" role="alert">
              {w.password}
            </span>
          )}
        </label>
        <label className="acc__toggle">
          <input type="checkbox" checked={_} onChange={(e) => v(e.target.checked)} />
          Show Password
        </label>
        <ReCaptcha ref={E} setCaptchaToken={x} setCaptcha={b} setErrors={j} invalid={!!w.captcha} />
        <div className="acc__actions">
          <button type="submit" className="btn btn-dark acc__submit" disabled={R}>
            {R ? 'Signing…' : 'Sign in'}
          </button>
        </div>
        <div className="acc__linkrow">
          <Link className="acc__link" href="/account/forgotpassword/">
            Forgot password?
          </Link>
          <Link className="acc__link" href="/account/create/">
            Create an account
          </Link>
        </div>
      </div>
      <Toast message={O?.message} variant={O?.variant} onDismiss={() => k(null)} />
    </form>
  );
}
