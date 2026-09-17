'use client';
import * as React from 'react';
import ReCaptcha from '../../components/ui/ReCaptcha';
import Toast from '../../components/ui/Toast';
import customerApi from '../../lib/customerApi';
import * as storage from '../../lib/storage';
let a = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export default function Default() {
  let [e, c] = React.useState(''),
    [l, u] = React.useState(!1),
    [d, p] = React.useState(null),
    [h, f] = React.useState({}),
    [m, y] = React.useState(!1),
    [_, v] = React.useState(null),
    [g, b] = React.useState(null),
    S = React.useRef(null);
  async function x(t) {
    let r, n;
    t.preventDefault();
    let i =
      ((r = {}),
      (n = e.trim())
        ? a.test(n) || (r.email = 'Enter a valid email address.')
        : (r.email = 'Please enter your email address.'),
      l || (r.captcha = !0),
      r);
    if ((f(i), !Object.keys(i).length)) {
      (y(!0), v(null));
      try {
        (await customerApi.forgotPassword(
          {
            email: e,
            template: 'email_reset',
            websiteId: 1,
          },
          d,
        ),
          storage.saveResetEmail(e),
          b({
            variant: 'success',
            message: 'Reset link sent! Please check your email.',
          }));
      } catch (e) {
        (v(e.message || "Couldn't send the reset link. Please try again."), S.current?.reset(), u(!1), p(null));
      } finally {
        y(!1);
      }
    }
  }
  return (
    <form className="acc__card" onSubmit={x} noValidate={!0}>
      <span className="eyebrow acc__eyebrow">Account</span>
      <h1 className="acc__cardtitle">Reset password</h1>
      <div className="acc__section">
        <p className="acc__hint">Please enter your email address below to receive a password reset link.</p>
        <label className={`acc__field${h.email ? ' acc__field--error' : ''}`}>
          <span className="acc__label">
            {'Email '}
            <span className="acc__req">*</span>
          </span>
          <input
            className="acc__input"
            type="email"
            value={e}
            maxLength={50}
            placeholder="you@company.com"
            onChange={(e) => {
              (c(e.target.value),
                h.email &&
                  f((e) => ({
                    ...e,
                    email: void 0,
                  })));
            }}
            aria-invalid={h.email ? 'true' : void 0}
          />
          {h.email && (
            <span className="acc__error" role="alert">
              {h.email}
            </span>
          )}
        </label>
        <span className="acc__counter">
          {e.length}/{50}
        </span>
        <ReCaptcha ref={S} setCaptchaToken={p} setCaptcha={u} setErrors={f} invalid={!!h.captcha} />
        {_ && (
          <p className="acc__error" role="alert">
            {_}
          </p>
        )}
        <div className="acc__actions">
          <button type="submit" className="btn btn-dark acc__submit">
            {m ? 'Sending...' : 'Send Link'}
          </button>
        </div>
      </div>
      <Toast message={g?.message} variant={g?.variant} onDismiss={() => b(null)} />
    </form>
  );
}
