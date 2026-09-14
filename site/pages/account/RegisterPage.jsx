'use client';
import * as React from 'react';
import Link from 'next/link';
import ReCaptcha from '../../components/ui/ReCaptcha';
import Toast from '../../components/ui/Toast';
import * as navigation from 'next/navigation';
import customerApi from '../../lib/customerApi';
let c = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  l =
    'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.';
function d(e) {
  let t = 0;
  return (/[a-z]/.test(e) && t++, /[A-Z]/.test(e) && t++, /\d/.test(e) && t++, /[^A-Za-z0-9]/.test(e) && t++, t);
}
export default function Default() {
  let [e, u] = React.useState({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
    }),
    [p, h] = React.useState(!1),
    [f, m] = React.useState(!1),
    [y, _] = React.useState(null),
    [v, g] = React.useState({}),
    [b, x] = React.useState(!1),
    [S, w] = React.useState(null),
    j = React.useRef(null),
    R = navigation.useRouter(),
    N = (function (e) {
      if (!e) return null;
      let t = 0;
      return (e.length >= 8 && t++,
      e.length >= 12 && t++,
      /[a-z]/.test(e) && /[A-Z]/.test(e) && t++,
      /\d/.test(e) && t++,
      /[^A-Za-z0-9]/.test(e) && t++,
      t <= 1)
        ? {
            key: 'weak',
            label: 'Weak',
          }
        : 2 === t
          ? {
              key: 'fair',
              label: 'Medium',
            }
          : 3 === t
            ? {
                key: 'good',
                label: 'Strong',
              }
            : {
                key: 'strong',
                label: 'Very Strong',
              };
    })(e.password);
  function C(e, t) {
    (u((r) => ({
      ...r,
      [e]: t,
    })),
      g((t) =>
        t[e]
          ? {
              ...t,
              [e]: void 0,
            }
          : t,
      ));
  }
  async function k(t) {
    let r, n;
    t.preventDefault();
    let s =
      ((r = {}),
      e.firstName.trim() || (r.firstName = 'Please enter your first name.'),
      e.lastName.trim() || (r.lastName = 'Please enter your last name.'),
      (n = e.email.trim())
        ? c.test(n) || (r.email = 'Enter a valid email address.')
        : (r.email = 'Please enter your email address.'),
      e.password
        ? e.password.length < 8
          ? (r.password = 'Password must be at least 8 characters.')
          : 3 > d(e.password) && (r.password = l)
        : (r.password = 'Please enter a password.'),
      e.confirm
        ? e.confirm !== e.password && (r.confirm = "Passwords don't match.")
        : (r.confirm = 'Please confirm your password.'),
      f || (r.captcha = !0),
      r);
    if ((g(s), !(Object.keys(s).length > 0))) {
      x(!0);
      try {
        let t = {
            customer: {
              email: e.email,
              firstname: e.firstName,
              lastname: e.lastName,
              middlename: e.middleName,
            },
            password: e.password,
          },
          r = await customerApi.signup(t, y);
        r && r?.id
          ? (w({
              variant: 'success',
              message: 'Account created! Redirecting to sign in…',
            }),
            R.replace('/account/login/'))
          : (w({
              variant: 'error',
              message: "Couldn't create your account. Please try again.",
            }),
            j.current?.reset(),
            m(!1),
            _(null));
      } catch (e) {
        (w({
          variant: 'error',
          message: e.message || "Couldn't create your account. Please try again.",
        }),
          j.current?.reset(),
          m(!1),
          _(null));
      } finally {
        x(!1);
      }
    }
  }
  return (
    <form className="acc__card" onSubmit={k} noValidate={!0}>
      <span className="eyebrow acc__eyebrow">Account</span>
      <h1 className="acc__cardtitle">Create an account</h1>
      <div className="acc__section">
        <div className="acc__row">
          <label className={`acc__field${v.firstName ? ' acc__field--error' : ''}`}>
            <span className="acc__label">
              {'First Name '}
              <span className="acc__req" aria-hidden="true">
                *
              </span>
            </span>
            <input
              className="acc__input"
              type="text"
              value={e.firstName}
              onChange={(e) => C('firstName', e.target.value)}
              aria-required="true"
              aria-invalid={v.firstName ? 'true' : void 0}
            />
            {v.firstName && (
              <span className="acc__error" role="alert">
                {v.firstName}
              </span>
            )}
          </label>
          <label className={`acc__field${v.lastName ? ' acc__field--error' : ''}`}>
            <span className="acc__label">
              {'Last Name '}
              <span className="acc__req" aria-hidden="true">
                *
              </span>
            </span>
            <input
              className="acc__input"
              type="text"
              value={e.lastName}
              onChange={(e) => C('lastName', e.target.value)}
              aria-required="true"
              aria-invalid={v.lastName ? 'true' : void 0}
            />
            {v.lastName && (
              <span className="acc__error" role="alert">
                {v.lastName}
              </span>
            )}
          </label>
        </div>
      </div>
      <div>
        <label className={`acc__field${v.email ? ' acc__field--error' : ''}`}>
          <span className="acc__label">
            {'Email '}
            <span className="acc__req" aria-hidden="true">
              *
            </span>
          </span>
          <input
            className="acc__input"
            type="email"
            value={e.email}
            maxLength={50}
            onChange={(e) => C('email', e.target.value)}
            placeholder="you@company.com"
            aria-required="true"
            aria-invalid={v.email ? 'true' : void 0}
          />
          {v.email && (
            <span className="acc__error" role="alert">
              {v.email}
            </span>
          )}
        </label>
        <span className="acc__counter">
          {e.email.length}/{50}
        </span>
        <label className={`acc__field${v.password ? ' acc__field--error' : ''}`}>
          <span className="acc__label">
            {'Password '}
            <span className="acc__req" aria-hidden="true">
              *
            </span>
          </span>
          <input
            className="acc__input"
            type={p ? 'text' : 'password'}
            value={e.password}
            onChange={(e) => {
              var t;
              return (
                (t = e.target.value),
                void (u((e) => ({
                  ...e,
                  password: t,
                })),
                g((e) =>
                  !t || t.length < 8
                    ? e.password
                      ? {
                          ...e,
                          password: void 0,
                        }
                      : e
                    : 3 > d(t)
                      ? {
                          ...e,
                          password: l,
                        }
                      : e.password
                        ? {
                            ...e,
                            password: void 0,
                          }
                        : e,
                ))
              );
            }}
            aria-required="true"
            aria-invalid={v.password ? 'true' : void 0}
          />
          {v.password && (
            <span className="acc__error" role="alert">
              {v.password}
            </span>
          )}
        </label>
        {N && (
          <div className={`acc__meter acc__meter--${N.key}`}>
            {'Password Strength: '}
            {N.label}
          </div>
        )}
        <label
          className={`acc__field${v.confirm ? ' acc__field--error' : ''}`}
          style={{
            marginTop: 16,
          }}
        >
          <span className="acc__label">
            {'Confirm Password '}
            <span className="acc__req" aria-hidden="true">
              *
            </span>
          </span>
          <input
            className="acc__input"
            type={p ? 'text' : 'password'}
            value={e.confirm}
            onChange={(e) => C('confirm', e.target.value)}
            aria-required="true"
            aria-invalid={v.confirm ? 'true' : void 0}
          />
          {v.confirm && (
            <span className="acc__error" role="alert">
              {v.confirm}
            </span>
          )}
        </label>
        <label className="acc__toggle">
          <input type="checkbox" checked={p} onChange={(e) => h(e.target.checked)} />
          Show Password
        </label>
        <ReCaptcha ref={j} setCaptchaToken={_} setCaptcha={m} setErrors={g} invalid={!!v.captcha} />
        <div className="acc__actions">
          <button type="submit" className="btn btn-dark acc__submit" disabled={b}>
            {b ? 'Creating...' : 'Create an Account'}
          </button>
        </div>
        <div className="acc__linkrow acc__linkrow--center">
          <span className="acc__hinttext">Already have an account?</span>
          <Link className="acc__link" href="/account/login/">
            Sign in
          </Link>
        </div>
      </div>
      <Toast message={S?.message} variant={S?.variant} onDismiss={() => w(null)} />
    </form>
  );
}
