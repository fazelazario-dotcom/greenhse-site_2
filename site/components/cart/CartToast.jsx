'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import { useSelector } from 'react-redux';
import * as Icons from '../ui/Icons';
import * as cartSlice from '../../store/cartSlice';
export default function Default() {
  let e = useSelector(cartSlice.selectCartToast),
    [u, a] = React.useState(!1);
  return (React.useEffect(() => {
    if (!e.nonce) return;
    a(!0);
    let t = setTimeout(() => a(!1), 2600);
    return () => clearTimeout(t);
  }, [e.nonce]),
  u && e.name) ? (
    <div role="status" aria-live="polite" className="jsx-efd226f4c5afdc38 toast">
      <span aria-hidden="true" className="jsx-efd226f4c5afdc38 toast__mark">
        <Icons.IconCheck />
      </span>
      <span className="jsx-efd226f4c5afdc38 toast__text">
        {e.name}
        {' added to cart'}
      </span>
      <JSXStyle id="efd226f4c5afdc38">
        {
          '.toast.jsx-efd226f4c5afdc38{z-index:140;border-radius:var(--radius-sm);background:var(--ink);color:#fff;align-items:center;gap:10px;max-width:calc(100vw - 32px);padding:13px 20px;font-size:14px;animation:.22s toast-in;display:inline-flex;position:fixed;bottom:26px;left:50%;transform:translate(-50%);box-shadow:0 18px 40px -18px #14150fb3}.toast__mark.jsx-efd226f4c5afdc38{background:var(--green-bright);color:#04120b;border-radius:50%;flex:none;place-items:center;width:20px;height:20px;display:grid}.toast__text.jsx-efd226f4c5afdc38{line-height:1.3}@keyframes toast-in{0%{opacity:0;transform:translate(-50%,10px)}}'
        }
      </JSXStyle>
    </div>
  ) : null;
}
