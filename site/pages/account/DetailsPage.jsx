'use client';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import customerApi from '../../lib/customerApi';
import * as userSlice from '../../store/userSlice';
import useProfile from '../../hooks/useProfile';
import useRequireAuth from '../../hooks/useRequireAuth';
import Toast from '../../components/ui/Toast';
let l = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
export default function Default() {
  let e = useDispatch(),
    d = useRequireAuth(),
    { profile: u, loading: h, error: m } = useProfile(),
    [p, f] = React.useState(!1),
    [_, v] = React.useState({
      firstname: '',
      lastname: '',
    }),
    [y, x] = React.useState({}),
    [w, g] = React.useState(!1),
    [b, S] = React.useState(null),
    [j, N] = React.useState(!1),
    [P, C] = React.useState(l),
    [R, k] = React.useState({}),
    [F, z] = React.useState(!1),
    [T, A] = React.useState(!1);
  function O(e, t) {
    (v((s) => ({
      ...s,
      [e]: t,
    })),
      x((t) =>
        t[e]
          ? {
              ...t,
              [e]: void 0,
            }
          : t,
      ));
  }
  async function E(t) {
    let s;
    t.preventDefault();
    let r =
      ((s = {}),
      _.firstname.trim() || (s.firstname = 'Please enter your first name.'),
      _.lastname.trim() || (s.lastname = 'Please enter your last name.'),
      s);
    if ((x(r), !(Object.keys(r).length > 0))) {
      g(!0);
      try {
        let t = {
            customer: {
              firstname: _.firstname.trim(),
              lastname: _.lastname.trim(),
              email: u.email,
            },
          },
          s = await customerApi.updateProfile(t),
          r = {
            ...u,
            ...s,
            email: u.email,
          };
        (e(userSlice.updateUser(r)),
          f(!1),
          S({
            variant: 'success',
            message: 'Your details have been updated.',
          }));
      } catch (e) {
        if (401 === e.status) return void d();
        S({
          variant: 'error',
          message: e.message || "Couldn't save your details. Please try again.",
        });
      } finally {
        g(!1);
      }
    }
  }
  function q() {
    (N(!1), C(l), k({}), z(!1));
  }
  function I(e, t) {
    (C((s) => ({
      ...s,
      [e]: t,
    })),
      k((t) =>
        t[e]
          ? {
              ...t,
              [e]: void 0,
            }
          : t,
      ));
  }
  async function U(e) {
    let t;
    e.preventDefault();
    let s =
      ((t = {}),
      P.currentPassword || (t.currentPassword = 'Please enter your current password.'),
      P.newPassword
        ? P.newPassword.length < 8 && (t.newPassword = 'New password must be at least 8 characters.')
        : (t.newPassword = 'Please enter a new password.'),
      P.confirmPassword
        ? P.confirmPassword !== P.newPassword && (t.confirmPassword = "Passwords don't match.")
        : (t.confirmPassword = 'Please confirm your new password.'),
      t);
    if ((k(s), !(Object.keys(s).length > 0))) {
      A(!0);
      try {
        (await customerApi.changePassword({
          currentPassword: P.currentPassword,
          newPassword: P.newPassword,
        }),
          q(),
          S({
            variant: 'success',
            message: 'Your password has been updated.',
          }));
      } catch (e) {
        if (401 === e.status) return void d();
        S({
          variant: 'error',
          message: e.message || "Couldn't update your password. Please try again.",
        });
      } finally {
        A(!1);
      }
    }
  }
  return (
    <>
      <div className="acc__panel">
        <div className="acc__panel-head">
          <h2 className="acc__panel-title">My details</h2>
          {!h && u && !p && (
            <button
              type="button"
              className="btn btn-ghost acc__edit-btn"
              onClick={function () {
                (v({
                  firstname: u.firstname || '',
                  lastname: u.lastname || '',
                }),
                  x({}),
                  f(!0));
              }}
            >
              Edit
            </button>
          )}
        </div>
        {h && <p className="acc__hint">Loading your account details…</p>}
        {!h && m && (
          <span className="acc__error" role="alert">
            {m}
          </span>
        )}
        {!h && u && !p && (
          <div className="acc__section">
            <div className="acc__profile-row">
              <span className="acc__profile-label">First Name</span>
              <span>{u.firstname}</span>
            </div>
            <div className="acc__profile-row">
              <span className="acc__profile-label">Last Name</span>
              <span>{u.lastname}</span>
            </div>
            <div className="acc__profile-row">
              <span className="acc__profile-label">Email</span>
              <span>{u.email}</span>
            </div>
          </div>
        )}
        {!h && u && p && (
          <form className="acc__section" onSubmit={E} noValidate={!0}>
            <label className={`acc__field${y.firstname ? ' acc__field--error' : ''}`}>
              <span className="acc__label">
                {'First Name '}
                <span className="acc__req" aria-hidden="true">
                  *
                </span>
              </span>
              <input
                className="acc__input"
                type="text"
                value={_.firstname}
                onChange={(e) => O('firstname', e.target.value)}
                aria-required="true"
                aria-invalid={y.firstname ? 'true' : void 0}
              />
              {y.firstname && (
                <span className="acc__error" role="alert">
                  {y.firstname}
                </span>
              )}
            </label>
            <label className={`acc__field${y.lastname ? ' acc__field--error' : ''}`}>
              <span className="acc__label">
                {'Last Name '}
                <span className="acc__req" aria-hidden="true">
                  *
                </span>
              </span>
              <input
                className="acc__input"
                type="text"
                value={_.lastname}
                onChange={(e) => O('lastname', e.target.value)}
                aria-required="true"
                aria-invalid={y.lastname ? 'true' : void 0}
              />
              {y.lastname && (
                <span className="acc__error" role="alert">
                  {y.lastname}
                </span>
              )}
            </label>
            <label className="acc__field">
              <span className="acc__label">Email</span>
              <input className="acc__input" type="email" value={u.email} disabled={!0} />
            </label>
            <div className="acc__actions">
              <button type="submit" className="btn btn-dark acc__submit" disabled={w}>
                {w ? 'Saving…' : 'Save'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={function () {
                  (f(!1), x({}));
                }}
                disabled={w}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {!h && u && (
        <div className="acc__panel">
          <div className="acc__panel-head">
            <h2 className="acc__panel-title">Change Password</h2>
            {!j && (
              <button
                type="button"
                className="btn btn-ghost acc__edit-btn"
                onClick={function () {
                  (C(l), k({}), z(!1), N(!0));
                }}
              >
                Change
              </button>
            )}
          </div>
          {!j && <p className="acc__hint">Update your password to keep your account secure.</p>}
          {j && (
            <form className="acc__section" onSubmit={U} noValidate={!0}>
              <label className={`acc__field${R.currentPassword ? ' acc__field--error' : ''}`}>
                <span className="acc__label">
                  {'Current Password '}
                  <span className="acc__req" aria-hidden="true">
                    *
                  </span>
                </span>
                <input
                  className="acc__input"
                  type={F ? 'text' : 'password'}
                  value={P.currentPassword}
                  onChange={(e) => I('currentPassword', e.target.value)}
                  aria-required="true"
                  aria-invalid={R.currentPassword ? 'true' : void 0}
                  autoComplete="current-password"
                />
                {R.currentPassword && (
                  <span className="acc__error" role="alert">
                    {R.currentPassword}
                  </span>
                )}
              </label>
              <label className={`acc__field${R.newPassword ? ' acc__field--error' : ''}`}>
                <span className="acc__label">
                  {'New Password '}
                  <span className="acc__req" aria-hidden="true">
                    *
                  </span>
                </span>
                <input
                  className="acc__input"
                  type={F ? 'text' : 'password'}
                  value={P.newPassword}
                  onChange={(e) => I('newPassword', e.target.value)}
                  aria-required="true"
                  aria-invalid={R.newPassword ? 'true' : void 0}
                  autoComplete="new-password"
                />
                {R.newPassword && (
                  <span className="acc__error" role="alert">
                    {R.newPassword}
                  </span>
                )}
              </label>
              <label className={`acc__field${R.confirmPassword ? ' acc__field--error' : ''}`}>
                <span className="acc__label">
                  {'Confirm New Password '}
                  <span className="acc__req" aria-hidden="true">
                    *
                  </span>
                </span>
                <input
                  className="acc__input"
                  type={F ? 'text' : 'password'}
                  value={P.confirmPassword}
                  onChange={(e) => I('confirmPassword', e.target.value)}
                  aria-required="true"
                  aria-invalid={R.confirmPassword ? 'true' : void 0}
                  autoComplete="new-password"
                />
                {R.confirmPassword && (
                  <span className="acc__error" role="alert">
                    {R.confirmPassword}
                  </span>
                )}
              </label>
              <label className="acc__toggle">
                <input type="checkbox" checked={F} onChange={(e) => z(e.target.checked)} />
                Show Password
              </label>
              <div className="acc__actions">
                <button type="submit" className="btn btn-dark acc__submit" disabled={T}>
                  {T ? 'Updating…' : 'Update Password'}
                </button>
                <button type="button" className="btn btn-ghost" onClick={q} disabled={T}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      <Toast message={b?.message} variant={b?.variant} onDismiss={() => S(null)} />
    </>
  );
}
