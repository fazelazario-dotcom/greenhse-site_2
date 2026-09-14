'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Icons from '../ui/Icons';
import * as nav from '../../lib/nav';
import * as api from '../../lib/api';
import * as uiSlice from '../../store/uiSlice';
let d = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  c = /^[+()\d][\d\s()\-.]{6,}$/;
function u(e) {
  let t = {},
    s = e.name.trim();
  s ? s.length < 2 && (t.name = 'Name must be at least 2 characters.') : (t.name = 'Please enter your name.');
  let r = e.email.trim();
  r
    ? d.test(r) || (t.email = 'Enter a valid email address, e.g. you@company.com')
    : (t.email = 'Please enter your email address.');
  let i = e.phone.trim();
  return (
    i ? c.test(i) || (t.phone = 'Enter a valid phone number.') : (t.phone = 'Please enter your phone number.'),
    e.message.length > 500 && (t.message = 'Please keep your message under 500 characters.'),
    t
  );
}
export default function Default() {
  let e = useDispatch(),
    d = useSelector(uiSlice.selectEnquiryFor),
    [c, b] = React.useState({
      name: '',
      email: '',
      phone: '',
      message: '',
    }),
    [h, p] = React.useState({}),
    [m, f] = React.useState(!1),
    [x, _] = React.useState(null),
    [y, v] = React.useState(!1),
    [g, j] = React.useState(d);
  if (
    (d !== g &&
      (j(d),
      b({
        name: '',
        email: '',
        phone: '',
        message: '',
      }),
      p({}),
      f(!1),
      _(null),
      v(!1)),
    React.useEffect(() => {
      if (d) return (document.addEventListener('keydown', t), () => document.removeEventListener('keydown', t));
      function t(t) {
        'Escape' === t.key && e(uiSlice.closeEnquiry());
      }
    }, [d, e]),
    !d)
  )
    return null;
  function S(e, t) {
    (b((s) => ({
      ...s,
      [e]: t,
    })),
      p((t) =>
        t[e]
          ? {
              ...t,
              [e]: void 0,
            }
          : t,
      ));
  }
  function w(e) {
    let t = u(c);
    p((s) => ({
      ...s,
      [e]: t[e],
    }));
  }
  async function k(e) {
    if ((e.preventDefault(), m)) return;
    let t = u(c);
    if ((p(t), !(Object.keys(t).length > 0))) {
      (f(!0), _(null));
      try {
        let e = [`Enquiry about: ${d.name}`, c.message.trim()].filter(Boolean).join('\n\n');
        (await api.submitEnquiry({
          name: c.name,
          email: c.email,
          phone: c.phone,
          message: e,
        }),
          v(!0));
      } catch (e) {
        _(e.message);
      } finally {
        f(!1);
      }
    }
  }
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Call us about ${d.name}`}
      className="jsx-d90bcb43b3504343 overlay"
    >
      <div onClick={(e) => e.stopPropagation()} className="jsx-d90bcb43b3504343 sheet">
        <button
          type="button"
          onClick={() => e(uiSlice.closeEnquiry())}
          aria-label="Close"
          className="jsx-d90bcb43b3504343 sheet__close"
        >
          <Icons.IconClose />
        </button>
        {y ? (
          <div className="jsx-d90bcb43b3504343 done">
            <span aria-hidden="true" className="jsx-d90bcb43b3504343 done__mark">
              <Icons.IconCheck />
            </span>
            <h2 className="jsx-d90bcb43b3504343">Enquiry sent</h2>
            <p className="jsx-d90bcb43b3504343">
              Thanks{c.name ? `, ${c.name.split(' ')[0]}` : ''}
              {"— we've got your enquiry about "}
              <strong className="jsx-d90bcb43b3504343">{d.name}</strong>. Our team will call or email you back shortly.
            </p>
            <button
              type="button"
              onClick={() => e(uiSlice.closeEnquiry())}
              className="jsx-d90bcb43b3504343 btn btn-dark"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="jsx-d90bcb43b3504343 eyebrow">Call us about this product</span>
            <h2 className="jsx-d90bcb43b3504343">{d.name}</h2>
            <p className="jsx-d90bcb43b3504343 sheet__note">
              Leave your details and we'll call you back — or reach us directly on{' '}
              <a href={nav.company.showroom.phoneHref} className="jsx-d90bcb43b3504343">
                {nav.company.showroom.phone}
              </a>
              .
            </p>
            <form onSubmit={k} noValidate={!0} className="jsx-d90bcb43b3504343">
              <label className={`jsx-d90bcb43b3504343 field${h.name ? ' field--error' : ''}`}>
                <span className="jsx-d90bcb43b3504343 field__label">
                  Name{' '}
                  <span aria-hidden="true" className="jsx-d90bcb43b3504343 field__req">
                    *
                  </span>
                </span>
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => S('name', e.target.value)}
                  onBlur={() => w('name')}
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={h.name ? 'true' : void 0}
                  disabled={m}
                  className="jsx-d90bcb43b3504343"
                />
                {h.name && (
                  <span role="alert" className="jsx-d90bcb43b3504343 field__error">
                    {h.name}
                  </span>
                )}
              </label>
              <label className={`jsx-d90bcb43b3504343 field${h.email ? ' field--error' : ''}`}>
                <span className="jsx-d90bcb43b3504343 field__label">
                  Email{' '}
                  <span aria-hidden="true" className="jsx-d90bcb43b3504343 field__req">
                    *
                  </span>
                </span>
                <input
                  type="email"
                  value={c.email}
                  onChange={(e) => S('email', e.target.value)}
                  onBlur={() => w('email')}
                  placeholder="you@company.com"
                  aria-required="true"
                  aria-invalid={h.email ? 'true' : void 0}
                  disabled={m}
                  className="jsx-d90bcb43b3504343"
                />
                {h.email && (
                  <span role="alert" className="jsx-d90bcb43b3504343 field__error">
                    {h.email}
                  </span>
                )}
              </label>
              <label className={`jsx-d90bcb43b3504343 field${h.phone ? ' field--error' : ''}`}>
                <span className="jsx-d90bcb43b3504343 field__label">
                  Phone{' '}
                  <span aria-hidden="true" className="jsx-d90bcb43b3504343 field__req">
                    *
                  </span>
                </span>
                <input
                  type="tel"
                  value={c.phone}
                  onChange={(e) => S('phone', e.target.value)}
                  onBlur={() => w('phone')}
                  placeholder="(08) 9297 2969"
                  aria-required="true"
                  aria-invalid={h.phone ? 'true' : void 0}
                  disabled={m}
                  className="jsx-d90bcb43b3504343"
                />
                {h.phone && (
                  <span role="alert" className="jsx-d90bcb43b3504343 field__error">
                    {h.phone}
                  </span>
                )}
              </label>
              <label className={`jsx-d90bcb43b3504343 field${h.message ? ' field--error' : ''}`}>
                <span className="jsx-d90bcb43b3504343 field__label">
                  {'Message '}
                  <span className="jsx-d90bcb43b3504343 field__optional">optional</span>
                </span>
                <textarea
                  rows={4}
                  value={c.message}
                  onChange={(e) => S('message', e.target.value)}
                  onBlur={() => w('message')}
                  placeholder="Anything else we should know before we call."
                  aria-invalid={h.message ? 'true' : void 0}
                  disabled={m}
                  className="jsx-d90bcb43b3504343"
                />
                {h.message && (
                  <span role="alert" className="jsx-d90bcb43b3504343 field__error">
                    {h.message}
                  </span>
                )}
              </label>
              <p className="jsx-d90bcb43b3504343 field__note">
                <span aria-hidden="true" className="jsx-d90bcb43b3504343 field__req">
                  *
                </span>{' '}
                Required fields
              </p>
              {x && (
                <p role="alert" className="jsx-d90bcb43b3504343 submit-error">
                  {x}
                </p>
              )}
              <button type="submit" disabled={m} className="jsx-d90bcb43b3504343 btn btn-dark btn-block sheet__submit">
                {m ? 'Sending…' : 'Request a call back'}
              </button>
            </form>
          </>
        )}
      </div>
      <JSXStyle id="d90bcb43b3504343">
        {
          '.overlay.jsx-d90bcb43b3504343{z-index:120;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#14150f80;place-items:center;padding:24px;display:grid;position:fixed;inset:0;overflow-y:auto}.sheet.jsx-d90bcb43b3504343{background:var(--bg-raised);border-radius:var(--radius-md);width:100%;max-width:500px;padding:36px;position:relative;box-shadow:0 40px 90px -40px #14150f99}.sheet__close.jsx-d90bcb43b3504343{width:34px;height:34px;color:var(--ink);cursor:pointer;background:0 0;border:0;border-radius:50%;place-items:center;display:grid;position:absolute;top:14px;right:14px}.sheet__close.jsx-d90bcb43b3504343:hover{background:var(--hover-bg)}h2.jsx-d90bcb43b3504343{letter-spacing:-.02em;margin:10px 0 6px;font-size:24px;font-weight:600}.sheet__note.jsx-d90bcb43b3504343{color:var(--ink-soft);margin:0 0 26px;font-size:13.5px;line-height:1.6}.sheet__note.jsx-d90bcb43b3504343 a.jsx-d90bcb43b3504343{color:var(--green);font-weight:500}.field.jsx-d90bcb43b3504343{margin-bottom:16px;display:block}.field__label.jsx-d90bcb43b3504343{margin-bottom:7px;font-size:13px;font-weight:500;display:block}.field__optional.jsx-d90bcb43b3504343{font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);margin-left:4px;font-size:10px;font-weight:400}.field__req.jsx-d90bcb43b3504343{color:#b3261e;font-weight:600}.field__error.jsx-d90bcb43b3504343{color:#b3261e;margin-top:6px;font-size:12.5px;line-height:1.4;display:block}.field__note.jsx-d90bcb43b3504343{color:var(--ink-muted);margin:0 0 4px;font-size:12px}.field--error.jsx-d90bcb43b3504343 input,.field--error.jsx-d90bcb43b3504343 textarea,.field--error.jsx-d90bcb43b3504343 input:focus,.field--error.jsx-d90bcb43b3504343 textarea:focus{border-color:#b3261e}.field.jsx-d90bcb43b3504343 input,.field.jsx-d90bcb43b3504343 textarea{width:100%;color:var(--ink);background:var(--bg);border:1px solid var(--line-strong);border-radius:var(--radius-sm);resize:vertical;padding:12px 13px;font-family:inherit;font-size:14.5px}.field.jsx-d90bcb43b3504343 input:focus,.field.jsx-d90bcb43b3504343 textarea:focus{border-color:var(--ink);outline:none}.field.jsx-d90bcb43b3504343 ::placeholder{color:var(--ink-faint)}.field.jsx-d90bcb43b3504343 input:disabled,.field.jsx-d90bcb43b3504343 textarea:disabled{opacity:.6;cursor:not-allowed}.submit-error.jsx-d90bcb43b3504343{color:#b3261e;border-radius:var(--radius-sm);background:#fdecea;border:1px solid #f3c4c0;margin:0 0 12px;padding:10px 12px;font-size:13px;line-height:1.45}.sheet__submit.jsx-d90bcb43b3504343{height:50px;margin-top:8px;font-size:15px}.sheet__submit.jsx-d90bcb43b3504343:disabled{opacity:.6;cursor:not-allowed}.done.jsx-d90bcb43b3504343{text-align:center;padding:12px 0}.done__mark.jsx-d90bcb43b3504343{background:var(--green);color:#fff;border-radius:50%;place-items:center;width:46px;height:46px;margin:0 auto 16px;display:grid}.done.jsx-d90bcb43b3504343 p.jsx-d90bcb43b3504343{color:var(--ink-soft);max-width:38ch;margin:0 auto 24px;font-size:14.5px;line-height:1.65}'
        }
      </JSXStyle>
    </div>
  );
}
