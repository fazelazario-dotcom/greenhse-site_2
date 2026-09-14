'use client';
import JSXStyle from 'styled-jsx/style';
let t = [
  {
    key: 'cart',
    label: 'Cart',
  },
  {
    key: 'checkout',
    label: 'Checkout',
  },
  {
    key: 'done',
    label: 'Done',
  },
];
export default function Default({ current: e }) {
  let i = t.findIndex((s) => s.key === e);
  return (
    <nav aria-label="Checkout progress" className="jsx-824e0e3a6fd76cb8 steps">
      {t.map((e, a) => (
        <span
          key={e.key}
          aria-current={a === i ? 'step' : void 0}
          className={`jsx-824e0e3a6fd76cb8 steps__item${a === i ? ' is-current' : ''}${a < i ? ' is-done' : ''}`}
        >
          {e.label}
        </span>
      ))}
      <JSXStyle id="824e0e3a6fd76cb8">
        {
          '.steps.jsx-824e0e3a6fd76cb8{font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;align-items:center;gap:10px;margin-bottom:18px;font-size:11px;display:flex}.steps__item.jsx-824e0e3a6fd76cb8{color:var(--ink-faint)}.steps__item.jsx-824e0e3a6fd76cb8:not(:last-child):after{content:"·";color:var(--ink-faint);margin-left:10px}.steps__item.is-done.jsx-824e0e3a6fd76cb8{color:var(--ink-muted)}.steps__item.is-current.jsx-824e0e3a6fd76cb8{color:var(--ink);font-weight:600}'
        }
      </JSXStyle>
    </nav>
  );
}
