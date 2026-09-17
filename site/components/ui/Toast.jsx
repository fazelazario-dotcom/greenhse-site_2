'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import * as Icons from './Icons';
export default function Default({ message: e, variant: a = 'success', onDismiss: i, duration: o = 4e3 }) {
  return (React.useEffect(() => {
    if (!e) return;
    let t = setTimeout(i, o);
    return () => clearTimeout(t);
  }, [e, o, i]),
  e) ? (
    <div role="status" aria-live="polite" className={`jsx-5492d118cadcb677 toast toast--${a}`}>
      <span aria-hidden="true" className="jsx-5492d118cadcb677 toast__mark">
        {'error' === a ? '!' : <Icons.IconCheck />}
      </span>
      <span className="jsx-5492d118cadcb677 toast__text">{e}</span>
      <button type="button" onClick={i} aria-label="Dismiss" className="jsx-5492d118cadcb677 toast__close">
        <Icons.IconClose width={12} height={12} />
      </button>
      <JSXStyle id="5492d118cadcb677">
        {
          '.toast.jsx-5492d118cadcb677{z-index:140;border-radius:var(--radius-sm);background:var(--ink);color:#fff;align-items:center;gap:10px;max-width:calc(100vw - 32px);padding:13px 16px 13px 20px;font-size:14px;animation:.22s toast-in;display:inline-flex;position:fixed;bottom:26px;left:50%;transform:translate(-50%);box-shadow:0 18px 40px -18px #14150fb3}.toast__mark.jsx-5492d118cadcb677{border-radius:50%;flex:none;place-items:center;width:20px;height:20px;font-size:12px;font-weight:700;display:grid}.toast--success.jsx-5492d118cadcb677 .toast__mark.jsx-5492d118cadcb677{background:var(--green-bright);color:#04120b}.toast--error.jsx-5492d118cadcb677 .toast__mark.jsx-5492d118cadcb677{color:#fff;background:#e5484d}.toast__text.jsx-5492d118cadcb677{line-height:1.3}.toast__close.jsx-5492d118cadcb677{color:#fff9;cursor:pointer;background:0 0;border:none;flex:none;place-items:center;width:22px;height:22px;margin-left:4px;display:grid}.toast__close.jsx-5492d118cadcb677:hover{color:#fff}@keyframes toast-in{0%{opacity:0;transform:translate(-50%,10px)}}'
        }
      </JSXStyle>
    </div>
  ) : null;
}
