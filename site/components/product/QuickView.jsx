'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetail from './ProductDetail';
import * as Icons from '../ui/Icons';
import * as uiSlice from '../../store/uiSlice';
export default function Default() {
  let e = useDispatch(),
    a = useSelector(uiSlice.selectQuickView),
    c = React.useRef(null);
  return (React.useEffect(() => {
    if (!a) return;
    function t(t) {
      'Escape' === t.key && e(uiSlice.closeQuickView());
    }
    document.addEventListener('keydown', t);
    let i = document.body.style.overflow;
    return (
      (document.body.style.overflow = 'hidden'),
      () => {
        (document.removeEventListener('keydown', t), (document.body.style.overflow = i));
      }
    );
  }, [a, e]),
  React.useEffect(() => {
    c.current && (c.current.scrollTop = 0);
  }, [a]),
  a) ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={a.name}
      onClick={() => e(uiSlice.closeQuickView())}
      className="jsx-7f6710ec25d45517 overlay"
    >
      <div ref={c} onClick={(e) => e.stopPropagation()} className="jsx-7f6710ec25d45517 sheet">
        <button
          type="button"
          onClick={() => e(uiSlice.closeQuickView())}
          aria-label="Close"
          className="jsx-7f6710ec25d45517 sheet__close"
        >
          <Icons.IconClose />
        </button>
        <div className="jsx-7f6710ec25d45517 sheet__inner">
          <ProductDetail product={a} onNavigate={(t) => e(uiSlice.openQuickView(t))} variant="modal" />
        </div>
      </div>
      <JSXStyle id="7f6710ec25d45517">
        {
          '.overlay.jsx-7f6710ec25d45517{z-index:115;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#14150f73;justify-content:center;align-items:flex-start;padding:46px 24px;animation:.18s fade;display:flex;position:fixed;inset:0}.sheet.jsx-7f6710ec25d45517{background:var(--bg-raised);border-radius:var(--radius-md);width:100%;max-width:1000px;max-height:100%;animation:.22s rise;position:relative;overflow-y:auto;box-shadow:0 40px 90px -40px #14150f99}.sheet__inner.jsx-7f6710ec25d45517{padding:44px 44px 48px}.sheet__close.jsx-7f6710ec25d45517{float:right;z-index:2;background:var(--bg-raised);width:34px;height:34px;color:var(--ink);cursor:pointer;border:0;border-radius:50%;place-items:center;margin:14px 16px 0 0;display:grid;position:sticky;top:14px}.sheet__close.jsx-7f6710ec25d45517:hover{background:var(--hover-bg)}@keyframes fade{0%{opacity:0}}@keyframes rise{0%{opacity:0;transform:translateY(10px)}}@media (width<=640px){.overlay.jsx-7f6710ec25d45517{padding:0}.sheet.jsx-7f6710ec25d45517{border-radius:0;max-height:100vh}.sheet__inner.jsx-7f6710ec25d45517{padding:20px 20px 36px}}'
        }
      </JSXStyle>
    </div>
  ) : null;
}
