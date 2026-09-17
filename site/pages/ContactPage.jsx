'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import * as Icons from '../components/ui/Icons';
import ReCaptcha from '../components/ui/ReCaptcha';
import * as api from '../lib/api';
import * as nav from '../lib/nav';
let a = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function C() {
  let [e, c] = React.useState({
      name: '',
      email: '',
      phone: '',
      message: '',
    }),
    [d, l] = React.useState(!1),
    [u, p] = React.useState(null),
    [h, f] = React.useState({}),
    [m, y] = React.useState(!1),
    [_, g] = React.useState(null),
    [v, x] = React.useState(!1),
    b = React.useRef(null);
  function S(e, t) {
    (c((r) => ({
      ...r,
      [e]: t,
    })),
      f((t) =>
        t[e]
          ? {
              ...t,
              [e]: void 0,
            }
          : t,
      ));
  }
  async function j(t) {
    let r, n;
    if ((t.preventDefault(), m)) return;
    let i =
      ((r = {}),
      e.name.trim() || (r.name = 'Please enter your name.'),
      (n = e.email.trim())
        ? a.test(n) || (r.email = 'Enter a valid email address, e.g. you@company.com')
        : (r.email = 'Please enter your email address.'),
      e.message.trim() || (r.message = 'Please enter your message.'),
      d || (r.captcha = !0),
      r);
    if ((f(i), !(Object.keys(i).length > 0))) {
      (y(!0), g(null));
      try {
        (await api.submitContactMessage(e), x(!0));
      } catch (e) {
        (g(e.message), b.current?.reset(), l(!1), p(null));
      } finally {
        y(!1);
      }
    }
  }
  return v ? (
    <div className="acc__done">
      <Icons.IconCheck />
      <span>
        Thanks{e.name ? `, ${e.name.split(' ')[0]}` : ''}— we've got your message and will be in touch shortly.
      </span>
    </div>
  ) : (
    <form onSubmit={j} noValidate={!0} className="jsx-a9c21d0f275000d3 contact-form">
      <label className={`jsx-a9c21d0f275000d3 acc__field acc__field--wide${h.name ? ' acc__field--error' : ''}`}>
        <span className="jsx-a9c21d0f275000d3 acc__label">Your name</span>
        <input
          type="text"
          value={e.name}
          onChange={(e) => S('name', e.target.value)}
          aria-required="true"
          aria-invalid={h.name ? 'true' : void 0}
          disabled={m}
          className="jsx-a9c21d0f275000d3 acc__input"
        />
        {h.name && (
          <span role="alert" className="jsx-a9c21d0f275000d3 acc__error">
            {h.name}
          </span>
        )}
      </label>
      <label className={`jsx-a9c21d0f275000d3 acc__field acc__field--wide${h.email ? ' acc__field--error' : ''}`}>
        <span className="jsx-a9c21d0f275000d3 acc__label">Your email</span>
        <input
          type="email"
          value={e.email}
          onChange={(e) => S('email', e.target.value)}
          aria-required="true"
          aria-invalid={h.email ? 'true' : void 0}
          disabled={m}
          className="jsx-a9c21d0f275000d3 acc__input"
        />
        {h.email && (
          <span role="alert" className="jsx-a9c21d0f275000d3 acc__error">
            {h.email}
          </span>
        )}
      </label>
      <label className="jsx-a9c21d0f275000d3 acc__field acc__field--wide">
        <span className="jsx-a9c21d0f275000d3 acc__label">Your phone (optional)</span>
        <input
          type="tel"
          value={e.phone}
          onChange={(e) => S('phone', e.target.value)}
          disabled={m}
          className="jsx-a9c21d0f275000d3 acc__input"
        />
      </label>
      <label className={`jsx-a9c21d0f275000d3 acc__field acc__field--wide${h.message ? ' acc__field--error' : ''}`}>
        <span className="jsx-a9c21d0f275000d3 acc__label">Your message</span>
        <textarea
          rows={6}
          value={e.message}
          onChange={(e) => S('message', e.target.value)}
          placeholder="Tell us about your project, order or question. If it's a trade or project job, include the suburb and rough timeline."
          aria-required="true"
          aria-invalid={h.message ? 'true' : void 0}
          disabled={m}
          className="jsx-a9c21d0f275000d3 acc__input"
        />
        {h.message && (
          <span role="alert" className="jsx-a9c21d0f275000d3 acc__error">
            {h.message}
          </span>
        )}
      </label>
      <ReCaptcha ref={b} setCaptchaToken={p} setCaptcha={l} setErrors={f} invalid={!!h.captcha} />
      {_ && (
        <p role="alert" className="jsx-a9c21d0f275000d3 acc__error">
          {_}
        </p>
      )}
      <div className="jsx-a9c21d0f275000d3 acc__actions">
        <button type="submit" disabled={m} className="jsx-a9c21d0f275000d3 btn btn-dark acc__submit">
          {m ? 'Sending…' : 'Send message'}
        </button>
      </div>
      <p className="jsx-a9c21d0f275000d3 contact-form__note">
        Doing a whole build or fit-out? Attach nothing here — send your plans through the{' '}
        <a
          href="/layout-app/"
          className="jsx-a9c21d0f275000d3 acc__link"
        >
          Layout App
        </a>{' '}
        and we'll cost the lighting schedule.
      </p>
      <JSXStyle id="a9c21d0f275000d3">
        {
          '.contact-form.jsx-a9c21d0f275000d3{max-width:520px}.acc__field--wide.jsx-a9c21d0f275000d3{max-width:none}textarea.acc__input.jsx-a9c21d0f275000d3{resize:vertical;min-height:140px}.contact-form__note.jsx-a9c21d0f275000d3{color:var(--ink-soft);margin-top:16px;font-size:13.5px;line-height:1.6}'
        }
      </JSXStyle>
    </form>
  );
}
export default function Default() {
  let { showroom: e } = nav.company,
    n = `https://www.google.com/maps/embed?pb=${e.mapQuery}&z=16`;
  return (
    <main className="jsx-5d0927b653534495 acc contact-page">
      <div className="jsx-5d0927b653534495 container">
        <h1 className="jsx-5d0927b653534495 acc__title contact-page__title">Contact us</h1>
        <p className="jsx-5d0927b653534495 contact-page__sub">
          Call, drop in, or send a message — local Perth support from the team at Ellenbrook.
        </p>
        <div className="jsx-5d0927b653534495 contact-page__grid">
          <C />
          <div className="jsx-5d0927b653534495 info-stack">
            {[
              {
                heading: 'Phone',
                body: (
                  <a className="info-card__link" href={e.phoneHref}>
                    {e.phone}
                  </a>
                ),
              },
              {
                heading: 'Showroom & pickup',
                body: <p>{e.address}</p>,
              },
              {
                heading: 'Hours',
                body: e.hoursDetail.map((e) => <p key={e}>{e}</p>),
              },
              {
                heading: 'Trade & projects',
                body: (
                  <p>
                    Builders, sparkies and shopfitters: call for trade pricing, or send plans via the{' '}
                    <a
                      className="info-card__link info-card__link--inline"
                      href="/layout-app/"
                    >
                      Layout App
                    </a>{' '}
                    for a costed lighting schedule.
                  </p>
                ),
              },
            ].map((e) => (
              <div key={e.heading} className="jsx-5d0927b653534495 info-card">
                <h2 className="jsx-5d0927b653534495">{e.heading}</h2>
                {e.body}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="jsx-5d0927b653534495 contact-page__map">
        <iframe
          src={n}
          title={`Map to ${e.label}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="jsx-5d0927b653534495"
        />
      </div>
      <JSXStyle id="5d0927b653534495">
        {
          '.contact-page.jsx-5d0927b653534495{background:var(--bg)}.contact-page__title.jsx-5d0927b653534495{margin-bottom:10px}.contact-page__sub.jsx-5d0927b653534495{color:var(--ink-soft);max-width:56ch;margin:0 0 36px;font-size:15px;line-height:1.6}.contact-page__grid.jsx-5d0927b653534495{grid-template-columns:1.5fr 1fr;align-items:start;gap:56px;display:grid}.info-stack.jsx-5d0927b653534495{flex-direction:column;gap:16px;display:flex}.info-card.jsx-5d0927b653534495{background:var(--bg-card);border-radius:var(--radius-md);padding:20px 22px}.info-card.jsx-5d0927b653534495 h2.jsx-5d0927b653534495{letter-spacing:-.01em;color:var(--ink);margin:0 0 8px;font-size:15px;font-weight:600}.info-card.jsx-5d0927b653534495 p.jsx-5d0927b653534495{color:var(--ink-soft);margin:0;font-size:14px;line-height:1.6}.info-card__link.jsx-5d0927b653534495{color:var(--ink-soft);font-size:14px}.info-card__link.jsx-5d0927b653534495:hover{color:var(--green)}.info-card__link--inline.jsx-5d0927b653534495{text-underline-offset:2px;text-decoration:underline}.contact-page__map.jsx-5d0927b653534495{width:100%;height:420px;margin-top:56px;padding:39px}.contact-page__map.jsx-5d0927b653534495 iframe.jsx-5d0927b653534495{border:0;width:100%;height:100%;display:block}@media (width<=860px){.contact-page__grid.jsx-5d0927b653534495{grid-template-columns:1fr;gap:40px}}@media (width<=560px){.contact-page__map.jsx-5d0927b653534495{height:280px}}'
        }
      </JSXStyle>
    </main>
  );
}
