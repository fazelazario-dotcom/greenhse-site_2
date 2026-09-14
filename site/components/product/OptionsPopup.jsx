'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import * as Icons from '../ui/Icons';
import * as api from '../../lib/api';
import * as nav from '../../lib/nav';
let o = new Set(['field', 'area']),
  l = new Set(['checkbox', 'multiple']),
  c = new Set(['drop_down', 'radio', 'checkbox', 'multiple', 'field', 'area']);
function d(e) {
  return o.has(e?.type);
}
function h(e) {
  return l.has(e?.type);
}
function f(e) {
  return (e || []).filter((e) => e.is_require);
}
function u(e) {
  return f(e).some((e) => !c.has(e?.type));
}
function p(e, t) {
  let i = {},
    s = [];
  for (let r of e || []) {
    let e = t[r.option_id],
      n = h(r) ? !Array.isArray(e) || 0 === e.length : null == e || !String(e).trim();
    if (r.is_require && n) {
      i[r.option_id] = 'This selection is required.';
      continue;
    }
    n ||
      s.push({
        option_id: String(r.option_id),
        option_value: h(r) ? e.join(',') : String(e),
      });
  }
  return {
    customOptions: s,
    errors: i,
  };
}
function x(e) {
  if (!e.price) return e.title;
  let t = `${'percent' === e.price_type ? `${e.price}%` : api.formatPrice(e.price)}`;
  return `${e.title} (+${t})`;
}
function M({ option: e, value: i, error: s, disabled: r, onChange: n, onToggleValue: a }) {
  let o = e.values || [];
  if ('drop_down' === e.type)
    return (
      <label className={`acc__field${s ? ' acc__field--error' : ''}`}>
        <span className="acc__label">
          {e.title}{' '}
          {e.is_require && (
            <span className="acc__req" aria-hidden="true">
              *
            </span>
          )}
        </span>
        <select className="acc__input" value={i ?? ''} onChange={(e) => n(e.target.value)} disabled={r}>
          <option value="">-- Please select --</option>
          {o.map((e) => (
            <option key={e.option_type_id} value={e.option_type_id}>
              {x(e)}
            </option>
          ))}
        </select>
        {s && <span className="acc__error">{s}</span>}
      </label>
    );
  if ('radio' === e.type || 'checkbox' === e.type || 'multiple' === e.type) {
    let l = h(e),
      c = l ? (Array.isArray(i) ? i : []) : i;
    return (
      <fieldset className={`option-group${s ? ' option-group--error' : ''}`}>
        <legend className="acc__label">
          {e.title}{' '}
          {e.is_require && (
            <span className="acc__req" aria-hidden="true">
              *
            </span>
          )}
        </legend>
        {o.map((i) => {
          let s = String(i.option_type_id),
            o = l ? c.includes(s) : String(c) === s;
          return (
            <label key={s} className="option-row">
              <input
                type={l ? 'checkbox' : 'radio'}
                name={`option-${e.option_id}`}
                checked={o}
                onChange={() => (l ? a(s) : n(s))}
                disabled={r}
              />
              <span>{x(i)}</span>
            </label>
          );
        })}
        {s && <span className="acc__error">{s}</span>}
      </fieldset>
    );
  }
  if (d(e)) {
    let A = 'area' === e.type ? 'textarea' : 'input';
    return (
      <label className={`acc__field${s ? ' acc__field--error' : ''}`}>
        <span className="acc__label">
          {e.title}{' '}
          {e.is_require && (
            <span className="acc__req" aria-hidden="true">
              *
            </span>
          )}
        </span>
        <A
          className="acc__input"
          type={'field' === e.type ? 'text' : void 0}
          value={i ?? ''}
          onChange={(e) => n(e.target.value)}
          disabled={r}
          maxLength={e.max_characters || void 0}
        />
        {s && <span className="acc__error">{s}</span>}
      </label>
    );
  }
  return null;
}
export const buildCustomOptionsPayload = p;
export const hasRequiredOptions = function (e) {
  return f(e).length > 0;
};
export const hasUnsupportedRequiredOptions = u;
export const isMultiOption = h;
export const isTextOption = d;
export default function Default({
  product: e,
  rawOptions: n,
  initialQty: o = 1,
  submitting: l,
  submitError: c,
  onClose: d,
  onSubmit: h,
}) {
  let [f, x] = React.useState({}),
    [j, b] = React.useState({}),
    [y, g] = React.useState(o);
  React.useEffect(() => {
    function e(e) {
      'Escape' === e.key && d();
    }
    document.addEventListener('keydown', e);
    let t = document.body.style.overflow;
    return (
      (document.body.style.overflow = 'hidden'),
      () => {
        (document.removeEventListener('keydown', e), (document.body.style.overflow = t));
      }
    );
  }, [d]);
  let v = u(n);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Options for ${e.name}`}
      onClick={d}
      className="jsx-4869654a6bb84182 overlay"
    >
      <div onClick={(e) => e.stopPropagation()} className="jsx-4869654a6bb84182 popup">
        <div className="jsx-4869654a6bb84182 popup__head">
          <h2 className="jsx-4869654a6bb84182 popup__title">{e.name}</h2>
          <button
            type="button"
            onClick={d}
            aria-label="Close"
            disabled={l}
            className="jsx-4869654a6bb84182 popup__close"
          >
            <Icons.IconClose width={14} height={14} />
          </button>
        </div>
        {v ? (
          <div className="jsx-4869654a6bb84182 popup__unsupported">
            <p className="jsx-4869654a6bb84182">This product needs an option we can't take through the site yet.</p>
            <a href={nav.company.showroom.phoneHref} className="jsx-4869654a6bb84182 btn btn-dark">
              {'Call '}
              {nav.company.showroom.phone}
              {' to order'}
            </a>
          </div>
        ) : (
          <form
            onSubmit={function (e) {
              e.preventDefault();
              let { customOptions: t, errors: i } = p(n, f);
              Object.keys(i).length > 0
                ? b(i)
                : h({
                    qty: y,
                    customOptions: t,
                  });
            }}
            noValidate={!0}
            className="jsx-4869654a6bb84182 popup__form"
          >
            {(n || []).map((e) => (
              <M
                key={e.option_id}
                option={e}
                value={f[e.option_id]}
                error={j[e.option_id]}
                disabled={l}
                onChange={(t) => {
                  var i;
                  return (
                    (i = e.option_id),
                    void (x((e) => ({
                      ...e,
                      [i]: t,
                    })),
                    b((e) =>
                      e[i]
                        ? {
                            ...e,
                            [i]: void 0,
                          }
                        : e,
                    ))
                  );
                }}
                onToggleValue={(t) => {
                  var i;
                  return (
                    (i = e.option_id),
                    void (x((e) => {
                      let s = Array.isArray(e[i]) ? e[i] : [],
                        r = s.includes(t) ? s.filter((e) => e !== t) : [...s, t];
                      return {
                        ...e,
                        [i]: r,
                      };
                    }),
                    b((e) =>
                      e[i]
                        ? {
                            ...e,
                            [i]: void 0,
                          }
                        : e,
                    ))
                  );
                }}
              />
            ))}
            <label className="jsx-4869654a6bb84182 acc__field">
              <span className="jsx-4869654a6bb84182 acc__label">Qty</span>
              <div role="group" aria-label="Quantity" className="jsx-4869654a6bb84182 qty">
                <button
                  type="button"
                  onClick={() => g((e) => Math.max(1, e - 1))}
                  disabled={l || y <= 1}
                  aria-label="Decrease quantity"
                  className="jsx-4869654a6bb84182"
                >
                  −
                </button>
                <span aria-live="polite" className="jsx-4869654a6bb84182 qty__val">
                  {y}
                </span>
                <button
                  type="button"
                  onClick={() => g((e) => e + 1)}
                  disabled={l}
                  aria-label="Increase quantity"
                  className="jsx-4869654a6bb84182"
                >
                  +
                </button>
              </div>
            </label>
            {c && (
              <p role="alert" className="jsx-4869654a6bb84182 submit-error">
                {c}
              </p>
            )}
            <div className="jsx-4869654a6bb84182 popup__actions">
              <button type="submit" disabled={l} className="jsx-4869654a6bb84182 btn btn-dark">
                {l ? 'Adding…' : 'Add to cart'}
              </button>
              <button type="button" onClick={d} disabled={l} className="jsx-4869654a6bb84182 btn btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <JSXStyle id="4869654a6bb84182">
        {
          '.overlay.jsx-4869654a6bb84182{z-index:130;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#14150f73;justify-content:center;align-items:flex-start;padding:46px 24px;animation:.18s fade;display:flex;position:fixed;inset:0}.popup.jsx-4869654a6bb84182{background:var(--bg-raised);border-radius:var(--radius-md);width:100%;max-width:460px;max-height:100%;padding:24px 26px 28px;animation:.22s rise;position:relative;overflow-y:auto;box-shadow:0 40px 90px -40px #14150f99}.popup__head.jsx-4869654a6bb84182{justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:18px;display:flex}.popup__title.jsx-4869654a6bb84182{letter-spacing:-.01em;margin:0;font-size:17px;font-weight:600;line-height:1.3}.popup__close.jsx-4869654a6bb84182{background:var(--bg-card);width:30px;height:30px;color:var(--ink);cursor:pointer;border:0;border-radius:50%;flex:none;place-items:center;display:grid}.popup__close.jsx-4869654a6bb84182:hover{background:var(--hover-bg)}.popup__form.jsx-4869654a6bb84182{flex-direction:column;gap:4px;display:flex}.popup__actions.jsx-4869654a6bb84182{gap:10px;margin-top:10px;display:flex}.popup__unsupported.jsx-4869654a6bb84182{text-align:center;padding:14px 0 4px}.popup__unsupported.jsx-4869654a6bb84182 p.jsx-4869654a6bb84182{color:var(--ink-soft);margin:0 0 16px;font-size:14px;line-height:1.55}.option-group.jsx-4869654a6bb84182{border:0;margin:0 0 16px;padding:0;display:block}.option-group--error.jsx-4869654a6bb84182 .acc__error{display:block}.option-row.jsx-4869654a6bb84182{border-bottom:1px solid var(--line);cursor:pointer;align-items:center;gap:10px;padding:8px 0;font-size:14px;display:flex}.option-row.jsx-4869654a6bb84182:last-of-type{border-bottom:0}.qty.jsx-4869654a6bb84182{border:1px solid var(--line-strong);border-radius:var(--radius-sm);align-items:center;height:44px;display:inline-flex;overflow:hidden}.qty.jsx-4869654a6bb84182 button.jsx-4869654a6bb84182{width:40px;height:100%;color:var(--ink);cursor:pointer;background:0 0;border:0;place-items:center;font-size:17px;line-height:1;display:grid}.qty.jsx-4869654a6bb84182 button.jsx-4869654a6bb84182:hover:not(:disabled){background:var(--hover-bg)}.qty.jsx-4869654a6bb84182 button.jsx-4869654a6bb84182:disabled{opacity:.4;cursor:not-allowed}.qty__val.jsx-4869654a6bb84182{text-align:center;font-variant-numeric:tabular-nums;min-width:38px;font-size:14.5px}.submit-error.jsx-4869654a6bb84182{color:#b3261e;border-radius:var(--radius-sm);background:#fdecea;border:1px solid #f3c4c0;margin:4px 0 0;padding:10px 12px;font-size:13px;line-height:1.45}@keyframes fade{0%{opacity:0}}@keyframes rise{0%{opacity:0;transform:translateY(10px)}}'
        }
      </JSXStyle>
    </div>
  );
}
