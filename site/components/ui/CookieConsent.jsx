'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import * as cookies from '../../lib/cookies';
let o = 'cookie_consent';
export default function Default() {
  let [e, s] = React.useState(!1);
  React.useEffect(() => {
    cookies.getCookie(o) || s(!0);
  }, []);
  let c = (e) => {
    (cookies.setCookie(o, e, 31536e3), s(!1));
  };
  return e ? (
    <div role="dialog" aria-live="polite" aria-label="Cookie consent" className="jsx-7f23d31cc2dcd7b1 cookie-consent">
      <p className="jsx-7f23d31cc2dcd7b1 cookie-consent__text">
        We use essential cookies to make this site work, and — with your OK — analytics to improve it. See our{' '}
        <a href="/privacy-policy-cookie-restriction-mode" className="jsx-7f23d31cc2dcd7b1">
          Privacy Policy
        </a>
        .
      </p>
      <div className="jsx-7f23d31cc2dcd7b1 cookie-consent__actions">
        <button
          type="button"
          onClick={() => c('declined')}
          className="jsx-7f23d31cc2dcd7b1 cookie-consent__btn cookie-consent__btn--decline"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => c('accepted')}
          className="jsx-7f23d31cc2dcd7b1 cookie-consent__btn cookie-consent__btn--accept"
        >
          Accept
        </button>
      </div>
      <JSXStyle id="7f23d31cc2dcd7b1">
        {
          '.cookie-consent.jsx-7f23d31cc2dcd7b1{z-index:150;border-radius:var(--radius-md);background:var(--bg-plate);border:1px solid var(--line);flex-wrap:wrap;align-items:center;gap:16px 24px;width:calc(100% - 40px);max-width:720px;padding:16px 20px;animation:.22s cookie-consent-in;display:flex;position:fixed;bottom:20px;left:50%;transform:translate(-50%);box-shadow:0 18px 40px -18px #14150f59}.cookie-consent__text.jsx-7f23d31cc2dcd7b1{color:var(--ink-soft);flex:320px;margin:0;font-size:14px;line-height:1.5}.cookie-consent__text.jsx-7f23d31cc2dcd7b1 a.jsx-7f23d31cc2dcd7b1{color:var(--ink);text-decoration:underline}.cookie-consent__actions.jsx-7f23d31cc2dcd7b1{flex:none;gap:10px;margin-left:auto;display:flex}.cookie-consent__btn.jsx-7f23d31cc2dcd7b1{border-radius:var(--radius-sm);cursor:pointer;white-space:nowrap;padding:10px 18px;font-size:14px;font-weight:500}.cookie-consent__btn--decline.jsx-7f23d31cc2dcd7b1{border:1px solid var(--line-strong);color:var(--ink);background:0 0}.cookie-consent__btn--decline.jsx-7f23d31cc2dcd7b1:hover{background:var(--bg-card)}.cookie-consent__btn--accept.jsx-7f23d31cc2dcd7b1{background:var(--green);border:1px solid var(--green);color:#04120b}.cookie-consent__btn--accept.jsx-7f23d31cc2dcd7b1:hover{background:var(--green-hover);border-color:var(--green-hover)}@keyframes cookie-consent-in{0%{opacity:0;transform:translateY(12px)}}@media (width<=560px){.cookie-consent.jsx-7f23d31cc2dcd7b1{width:calc(100% - 24px);max-width:none;bottom:12px}.cookie-consent__actions.jsx-7f23d31cc2dcd7b1{width:100%;margin-left:0}.cookie-consent__btn.jsx-7f23d31cc2dcd7b1{flex:1}}'
        }
      </JSXStyle>
    </div>
  ) : null;
}
