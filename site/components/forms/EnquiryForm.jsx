'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Icons from '../ui/Icons';
import * as api from '../../lib/api';
import * as api2 from '../../lib/api';
import * as cartSlice from '../../store/cartSlice';
import * as uiSlice from '../../store/uiSlice';
let c = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  u = /^[+()\d][\d\s()\-.]{6,}$/;
function f(e) {
  let t = {},
    s = e.name.trim();
  s ? s.length < 2 && (t.name = 'Name must be at least 2 characters.') : (t.name = 'Please enter your name.');
  let r = e.email.trim();
  r
    ? c.test(r) || (t.email = 'Enter a valid email address, e.g. you@company.com')
    : (t.email = 'Please enter your email address.');
  let i = e.phone.trim();
  return (
    i ? u.test(i) || (t.phone = 'Enter a valid phone number.') : (t.phone = 'Please enter your phone number.'),
    e.message.length > 500 && (t.message = 'Please keep your message under 500 characters.'),
    t
  );
}
export default function Default() {
  let e = useDispatch(),
    c = useSelector(uiSlice.selectQuoteFor),
    u = !!c?.cartCheckout,
    h = useSelector(cartSlice.selectCartItems),
    p = useSelector(cartSlice.selectCartSubtotal),
    m = useSelector(cartSlice.selectCartTotalIncGst),
    [b, x] = React.useState({
      name: '',
      email: '',
      phone: '',
      message: '',
    }),
    [_, j] = React.useState({}),
    [g, v] = React.useState(!1),
    [y, S] = React.useState(null),
    [w, k] = React.useState(!1),
    [N, R] = React.useState(0),
    [z, C] = React.useState(c);
  if (
    (c !== z &&
      (C(c),
      x({
        name: '',
        email: '',
        phone: '',
        message: '',
      }),
      j({}),
      v(!1),
      S(null),
      k(!1),
      R(0)),
    React.useEffect(() => {
      if (c) return (document.addEventListener('keydown', t), () => document.removeEventListener('keydown', t));
      function t(t) {
        'Escape' === t.key && e(uiSlice.closeQuote());
      }
    }, [c, e]),
    !c)
  )
    return null;
  function q(e, t) {
    (x((s) => ({
      ...s,
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
  function F(e) {
    let t = f(b);
    j((s) => ({
      ...s,
      [e]: t[e],
    }));
  }
  async function T(t) {
    if ((t.preventDefault(), g)) return;
    let s = f(b);
    if ((j(s), !(Object.keys(s).length > 0))) {
      (v(!0), S(null));
      try {
        (await api2.submitQuoteRequest({
          ...b,
          product: u ? null : c,
          items: u ? h : null,
        }),
          R(u ? h.length : 1),
          k(!0),
          u && e(cartSlice.clearCart()));
      } catch (e) {
        S(e.message);
      } finally {
        v(!1);
      }
    }
  }
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={u ? 'Request a quote for your cart' : `Request a quote for ${c.name}`}
      className="jsx-85edd084fb48b4a3 overlay"
    >
      <div onClick={(e) => e.stopPropagation()} className="jsx-85edd084fb48b4a3 sheet">
        <button
          type="button"
          onClick={() => e(uiSlice.closeQuote())}
          aria-label="Close"
          className="jsx-85edd084fb48b4a3 sheet__close"
        >
          <Icons.IconClose />
        </button>
        {w ? (
          <div className="jsx-85edd084fb48b4a3 done">
            <span aria-hidden="true" className="jsx-85edd084fb48b4a3 done__mark">
              <Icons.IconCheck />
            </span>
            <h2 className="jsx-85edd084fb48b4a3">Quote requested</h2>
            <p className="jsx-85edd084fb48b4a3">
              Thanks{b.name ? `, ${b.name.split(' ')[0]}` : ''}— we've got your request for{' '}
              {u ? (
                <strong className="jsx-85edd084fb48b4a3">
                  {'your '}
                  {N}
                  {' selected product'}
                  {1 === N ? '' : 's'}
                </strong>
              ) : (
                <strong className="jsx-85edd084fb48b4a3">
                  {'the '}
                  {c.name}
                </strong>
              )}
              . We'll come back to you by email with pricing and lead time.
            </p>
            <button type="button" onClick={() => e(uiSlice.closeQuote())} className="jsx-85edd084fb48b4a3 btn btn-dark">
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="jsx-85edd084fb48b4a3 eyebrow">Request a quote</span>
            {u ? (
              <>
                <h2 className="jsx-85edd084fb48b4a3">Your selection</h2>
                <ul className="jsx-85edd084fb48b4a3 qitems">
                  {h.map((e) => (
                    <li key={e.id} className="jsx-85edd084fb48b4a3 qitem">
                      <span className="jsx-85edd084fb48b4a3 qitem__name">
                        {e.name}{' '}
                        <span className="jsx-85edd084fb48b4a3 qitem__qty">
                          {'× '}
                          {e.qty}
                        </span>
                      </span>
                      <span className="jsx-85edd084fb48b4a3 qitem__price">{api.formatPrice(e.price * e.qty)}</span>
                    </li>
                  ))}
                </ul>
                <p className="jsx-85edd084fb48b4a3 sheet__price">
                  {api.formatPrice(m)}
                  {' incl. GST'}{' '}
                  <span className="jsx-85edd084fb48b4a3">
                    {'· '}
                    {api.formatPrice(p)}
                    {' ex-GST'}
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2 className="jsx-85edd084fb48b4a3">{c.name}</h2>
                <p className="jsx-85edd084fb48b4a3 sheet__price">
                  {api.formatPrice(c.price)} <span className="jsx-85edd084fb48b4a3">ex-GST</span>
                </p>
              </>
            )}
            <form onSubmit={T} noValidate={!0} className="jsx-85edd084fb48b4a3">
              <label className={`jsx-85edd084fb48b4a3 field${_.name ? ' field--error' : ''}`}>
                <span className="jsx-85edd084fb48b4a3 field__label">
                  Name{' '}
                  <span aria-hidden="true" className="jsx-85edd084fb48b4a3 field__req">
                    *
                  </span>
                </span>
                <input
                  type="text"
                  value={b.name}
                  onChange={(e) => q('name', e.target.value)}
                  onBlur={() => F('name')}
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={_.name ? 'true' : void 0}
                  disabled={g}
                  className="jsx-85edd084fb48b4a3"
                />
                {_.name && (
                  <span role="alert" className="jsx-85edd084fb48b4a3 field__error">
                    {_.name}
                  </span>
                )}
              </label>
              <label className={`jsx-85edd084fb48b4a3 field${_.email ? ' field--error' : ''}`}>
                <span className="jsx-85edd084fb48b4a3 field__label">
                  Email{' '}
                  <span aria-hidden="true" className="jsx-85edd084fb48b4a3 field__req">
                    *
                  </span>
                </span>
                <input
                  type="email"
                  value={b.email}
                  onChange={(e) => q('email', e.target.value)}
                  onBlur={() => F('email')}
                  placeholder="you@company.com"
                  aria-required="true"
                  aria-invalid={_.email ? 'true' : void 0}
                  disabled={g}
                  className="jsx-85edd084fb48b4a3"
                />
                {_.email && (
                  <span role="alert" className="jsx-85edd084fb48b4a3 field__error">
                    {_.email}
                  </span>
                )}
              </label>
              <label className={`jsx-85edd084fb48b4a3 field${_.phone ? ' field--error' : ''}`}>
                <span className="jsx-85edd084fb48b4a3 field__label">
                  Phone{' '}
                  <span aria-hidden="true" className="jsx-85edd084fb48b4a3 field__req">
                    *
                  </span>
                </span>
                <input
                  type="tel"
                  value={b.phone}
                  onChange={(e) => q('phone', e.target.value)}
                  onBlur={() => F('phone')}
                  placeholder="(08) 9297 2969"
                  aria-required="true"
                  aria-invalid={_.phone ? 'true' : void 0}
                  disabled={g}
                  className="jsx-85edd084fb48b4a3"
                />
                {_.phone && (
                  <span role="alert" className="jsx-85edd084fb48b4a3 field__error">
                    {_.phone}
                  </span>
                )}
              </label>
              <label className={`jsx-85edd084fb48b4a3 field${_.message ? ' field--error' : ''}`}>
                <span className="jsx-85edd084fb48b4a3 field__label">
                  {'Message '}
                  <span className="jsx-85edd084fb48b4a3 field__optional">optional</span>
                </span>
                <textarea
                  rows={4}
                  value={b.message}
                  onChange={(e) => q('message', e.target.value)}
                  onBlur={() => F('message')}
                  placeholder="Lengths, quantities, or anything else we should know."
                  aria-invalid={_.message ? 'true' : void 0}
                  disabled={g}
                  className="jsx-85edd084fb48b4a3"
                />
                {_.message && (
                  <span role="alert" className="jsx-85edd084fb48b4a3 field__error">
                    {_.message}
                  </span>
                )}
              </label>
              <p className="jsx-85edd084fb48b4a3 field__note">
                <span aria-hidden="true" className="jsx-85edd084fb48b4a3 field__req">
                  *
                </span>{' '}
                Required fields
              </p>
              <p className="jsx-85edd084fb48b4a3 custom-note">
                As strip lighting systems are highly customised, every quote request will be carefully checked by the
                Greenhse team and confirmed with you before your order is processed.
              </p>
              {y && (
                <p role="alert" className="jsx-85edd084fb48b4a3 submit-error">
                  {y}
                </p>
              )}
              <button type="submit" disabled={g} className="jsx-85edd084fb48b4a3 btn btn-dark btn-block sheet__submit">
                {g ? 'Sending…' : 'Send request'}
              </button>
            </form>
          </>
        )}
      </div>
      <JSXStyle id="85edd084fb48b4a3">
        {
          '.overlay.jsx-85edd084fb48b4a3{z-index:120;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#14150f80;place-items:center;padding:24px;display:grid;position:fixed;inset:0;overflow-y:auto}.sheet.jsx-85edd084fb48b4a3{background:var(--bg-raised);border-radius:var(--radius-md);width:100%;max-width:500px;padding:36px;position:relative;box-shadow:0 40px 90px -40px #14150f99}.sheet__close.jsx-85edd084fb48b4a3{width:34px;height:34px;color:var(--ink);cursor:pointer;background:0 0;border:0;border-radius:50%;place-items:center;display:grid;position:absolute;top:14px;right:14px}.sheet__close.jsx-85edd084fb48b4a3:hover{background:var(--hover-bg)}h2.jsx-85edd084fb48b4a3{letter-spacing:-.02em;margin:10px 0 6px;font-size:24px;font-weight:600}.sheet__price.jsx-85edd084fb48b4a3{font-family:var(--font-mono);color:var(--ink-soft);margin:0 0 26px;font-size:13px}.sheet__price.jsx-85edd084fb48b4a3 span.jsx-85edd084fb48b4a3{color:var(--ink-muted);font-size:10.5px}.qitems.jsx-85edd084fb48b4a3{border-top:1px solid var(--line);border-bottom:1px solid var(--line);max-height:120px;margin:14px 0 18px;padding:14px 0;list-style:none;overflow-y:auto}.qitem.jsx-85edd084fb48b4a3{justify-content:space-between;align-items:baseline;gap:12px;padding:6px 0;font-size:14px;display:flex}.qitem__name.jsx-85edd084fb48b4a3{color:var(--ink-soft);min-width:0}.qitem__qty.jsx-85edd084fb48b4a3{font-family:var(--font-mono);color:var(--ink-muted);font-size:11px}.qitem__price.jsx-85edd084fb48b4a3{white-space:nowrap;font-weight:500}.field.jsx-85edd084fb48b4a3{margin-bottom:16px;display:block}.field__label.jsx-85edd084fb48b4a3{margin-bottom:7px;font-size:13px;font-weight:500;display:block}.field__optional.jsx-85edd084fb48b4a3{font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);margin-left:4px;font-size:10px;font-weight:400}.field__req.jsx-85edd084fb48b4a3{color:#b3261e;font-weight:600}.field__error.jsx-85edd084fb48b4a3{color:#b3261e;margin-top:6px;font-size:12.5px;line-height:1.4;display:block}.field__note.jsx-85edd084fb48b4a3{color:var(--ink-muted);margin:0 0 4px;font-size:12px}.custom-note.jsx-85edd084fb48b4a3{color:var(--ink-soft);border:1px solid var(--line);border-left:3px solid var(--green);border-radius:var(--radius-sm);background:#f4f4f4;margin:12px 0 4px;padding:11px 13px;font-size:12.5px;line-height:1.5}.field--error.jsx-85edd084fb48b4a3 input,.field--error.jsx-85edd084fb48b4a3 textarea,.field--error.jsx-85edd084fb48b4a3 input:focus,.field--error.jsx-85edd084fb48b4a3 textarea:focus{border-color:#b3261e}.field.jsx-85edd084fb48b4a3 input,.field.jsx-85edd084fb48b4a3 textarea{width:100%;color:var(--ink);background:var(--bg);border:1px solid var(--line-strong);border-radius:var(--radius-sm);resize:vertical;padding:12px 13px;font-family:inherit;font-size:14.5px}.field.jsx-85edd084fb48b4a3 input:focus,.field.jsx-85edd084fb48b4a3 textarea:focus{border-color:var(--ink);outline:none}.field.jsx-85edd084fb48b4a3 ::placeholder{color:var(--ink-faint)}.submit-error.jsx-85edd084fb48b4a3{color:#b3261e;border-radius:var(--radius-sm);background:#fdecea;border:1px solid #f3c4c0;margin:0 0 12px;padding:10px 12px;font-size:13px;line-height:1.45}.sheet__submit.jsx-85edd084fb48b4a3{height:50px;margin-top:8px;font-size:15px}.sheet__submit.jsx-85edd084fb48b4a3:disabled,.field.jsx-85edd084fb48b4a3 input:disabled,.field.jsx-85edd084fb48b4a3 textarea:disabled{opacity:.6;cursor:not-allowed}.done.jsx-85edd084fb48b4a3{text-align:center;padding:12px 0}.done__mark.jsx-85edd084fb48b4a3{background:var(--green);color:#fff;border-radius:50%;place-items:center;width:46px;height:46px;margin:0 auto 16px;display:grid}.done.jsx-85edd084fb48b4a3 p.jsx-85edd084fb48b4a3{color:var(--ink-soft);max-width:38ch;margin:0 auto 24px;font-size:14.5px;line-height:1.65}'
        }
      </JSXStyle>
    </div>
  );
}
