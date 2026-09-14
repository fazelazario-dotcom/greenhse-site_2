'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as nav from '../lib/nav';
import * as uiSlice from '../store/uiSlice';
import * as api from '../lib/api';
let o = {
    '12V/24V Transformers / Controllers': api.TRANSFORMERS_CATEGORY_ID,
    'Air Flow / Ceiling Fans': api.AIR_FLOW_CATEGORY_ID,
    'Batten Fittings / Batten Lights': api.BATTEN_CATEGORY_ID,
    'Ceiling / Panel / Oyster Lights': api.CEILING_CATEGORY_ID,
    Downlights: api.DOWNLIGHTS_CATEGORY_ID,
    'Emergency Lights': api.EMERGENCY_CATEGORY_ID,
    'Flood / Sports Lighting': api.FLOOD_CATEGORY_ID,
    'High Bay Lights': api.HIGH_BAY_CATEGORY_ID,
    'Industrial Lighting': api.INDUSTRIAL_CATEGORY_ID,
    'Landscape / Garden Lighting': api.GARDEN_CATEGORY_ID,
    'Outdoor / Wall Lights': api.OUTDOOR_WALL_CATEGORY_ID,
    'School & Commercial LED Lighting': api.COMMERCIAL_CATEGORY_ID,
    'Security / Sensors': api.SECURITY_CATEGORY_ID,
    'Star Lights': api.STAR_LIGHTS_CATEGORY_ID,
    'Strip Lights': api.STRIP_LIGHTS_CATEGORY_ID,
    'LED Track / Linear Lights': api.TRACK_CATEGORY_ID,
    'Switches / Powerpoints': api.SWITCHES_CATEGORY_ID,
    'Smart Life': api.SMART_LIFE_CATEGORY_ID,
  },
  c = [
    [
      'Smart Lighting — setup & info',
      'https://greenhse.com/pub/media/sparsh/product_attachment/Smart_Info_Web_upload.pdf',
      'Smart Life',
    ],
    [
      'RGB Garden Lights — connection',
      'https://greenhse.com/pub/media/sparsh/product_attachment/RGB%20Garden%20Lights%20connection_new.pdf',
      'Landscape / Garden Lighting',
    ],
    [
      'Understanding Strip Lighting',
      'https://greenhse.com/pub/media/sparsh/product_attachment/Understanding_strip_lighting.pdf',
      'Strip Lights',
    ],
    [
      'Strip Lighting Profiles 2025',
      'https://greenhse.com/pub/media/sparsh/product_attachment/Strip_Lighting_profiles_2025.pdf',
      'Strip Lights',
    ],
    [
      'Single Colour Garden Lights — connection',
      'https://greenhse.com/pub/media/sparsh/product_attachment/Single%20Colour%20Garden%20Lights%20connection_new.pdf',
      'Landscape / Garden Lighting',
    ],
    [
      '240V Strip Lighting',
      'https://greenhse.com/pub/media/sparsh/product_attachment/240V-Strip-lighting-new.pdf',
      'Strip Lights',
    ],
    [
      'Connecting & Setup',
      'https://greenhse.com/pub/media/sparsh/product_attachment/Connecting_and_setup.pdf',
      'Strip Lights',
    ],
    [
      'Star Lights — connection',
      'https://greenhse.com/pub/media/sparsh/product_attachment/Star%20Lights%20connection_new.pdf',
      'Star Lights',
    ],
    [
      'Smart Stair Light — connection',
      'https://greenhse.com/pub/media/sparsh/product_attachment/Smart%20Stair%20Light%20Connection.pdf',
      null,
    ],
  ],
  d = c.reduce((e, [t, s, i]) => (i && (e[i] ||= []).push([t, s]), e), {});
function u(e) {
  try {
    let t = JSON.parse(e?.extensionAttributes?.spec_sheets);
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}
export default function Default() {
  let e = useDispatch(),
    [f, h] = React.useState({});
  return (
    React.useEffect(() => {
      let e = !1;
      return (
        nav.productCategories.forEach((t) => {
          let s = o[t.label];
          s &&
            api
              .fetchStripLightProducts({
                id: s,
                categoryLabel: t.label,
              })
              .then((s) => {
                e ||
                  h((e) => ({
                    ...e,
                    [t.label]: s,
                  }));
              })
              .catch(() => {
                e ||
                  h((e) => ({
                    ...e,
                    [t.label]: [],
                  }));
              });
        }),
        () => {
          e = !0;
        }
      );
    }, []),
    (
      <main className="jsx-f1e3ebd05d546fcc home">
        <section id="installation" className="jsx-f1e3ebd05d546fcc install">
          <div className="jsx-f1e3ebd05d546fcc container">
            <span className="jsx-f1e3ebd05d546fcc eyebrow">Installation Help</span>
            <h1 className="jsx-f1e3ebd05d546fcc install__title">A guide for every product</h1>
            <p className="jsx-f1e3ebd05d546fcc install__sub">
              {'Step-by-step installation help across the whole range. '}
              <br className="jsx-f1e3ebd05d546fcc" />
              Pick a category to download it's specification sheets and guides where applicable.
            </p>
            <p className="jsx-f1e3ebd05d546fcc install__disclaimer">
              <span aria-hidden="true" className="jsx-f1e3ebd05d546fcc">
                ⚠
              </span>
              {
                ' In Australia, connecting any 240V mains fitting must be done by a licensed electrician. These guides are general help, not a substitute for a qualified installer.'
              }
            </p>
            <div className="jsx-f1e3ebd05d546fcc install__pdfrow">
              {c.map(([e, s]) => (
                <a
                  key={e}
                  href={s}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="jsx-f1e3ebd05d546fcc install__pdf"
                >
                  {e}{' '}
                  <span aria-hidden="true" className="jsx-f1e3ebd05d546fcc">
                    ↗
                  </span>
                </a>
              ))}
            </div>
            <div className="jsx-f1e3ebd05d546fcc install__list">
              {nav.productCategories.map((s) => {
                let i = d[s.label] || [],
                  n = f[s.label],
                  r = void 0 === n,
                  l = r ? 0 : n.reduce((e, t) => e + u(t).length, 0);
                return (
                  <details key={s.label} className="jsx-f1e3ebd05d546fcc install__cat">
                    <summary className="jsx-f1e3ebd05d546fcc">
                      <span className="jsx-f1e3ebd05d546fcc">{s.label}</span>
                      <span className="jsx-f1e3ebd05d546fcc install__count">
                        {r ? `${s.count} guides` : l > 0 ? `${l} spec sheets` : `${n.length} guides`}
                      </span>
                    </summary>
                    <div className="jsx-f1e3ebd05d546fcc install__panel">
                      {r && <p className="jsx-f1e3ebd05d546fcc install__loading">Loading guides…</p>}
                      {!r && n.length > 0 && (
                        <ul className="jsx-f1e3ebd05d546fcc install__guidelist">
                          {n.map((s) => {
                            let i = u(s);
                            return (
                              <li key={s.id} className="jsx-f1e3ebd05d546fcc">
                                <button
                                  type="button"
                                  onClick={() => e(uiSlice.openQuickView(s))}
                                  className="jsx-f1e3ebd05d546fcc"
                                >
                                  <span className="jsx-f1e3ebd05d546fcc">{s.name}</span>
                                  <span aria-hidden="true" className="jsx-f1e3ebd05d546fcc install__guidelist-tag">
                                    Guide →
                                  </span>
                                </button>
                                {i.length > 0 && (
                                  <div className="jsx-f1e3ebd05d546fcc install__specsheets">
                                    {i.map((e, s) => (
                                      <a
                                        key={s}
                                        href={e?.url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="jsx-f1e3ebd05d546fcc install__specsheet"
                                      >
                                        {e?.label}
                                        <span aria-hidden="true" className="jsx-f1e3ebd05d546fcc">
                                          {' ↓'}
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {i.length > 0 && (
                        <ul className="jsx-f1e3ebd05d546fcc install__guidelist install__guidelist--pdf">
                          {i.map(([e, s]) => (
                            <li key={e} className="jsx-f1e3ebd05d546fcc">
                              <a href={s} target="_blank" rel="noreferrer noopener" className="jsx-f1e3ebd05d546fcc">
                                <span className="jsx-f1e3ebd05d546fcc">{e}</span>
                                <span aria-hidden="true" className="jsx-f1e3ebd05d546fcc install__guidelist-tag">
                                  PDF ↗
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                      <a href={s.href} className="jsx-f1e3ebd05d546fcc link-mono install__browse">
                        {'Browse '}
                        {s.label}{' '}
                        <span aria-hidden="true" className="jsx-f1e3ebd05d546fcc">
                          →
                        </span>
                      </a>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
        <JSXStyle id="f1e3ebd05d546fcc">
          {
            '.install.jsx-f1e3ebd05d546fcc{background:var(--bg-raised);padding:40px 0 96px}.install__title.jsx-f1e3ebd05d546fcc{letter-spacing:-.03em;margin:2px 0 12px;font-size:max(30px,min(3.6vw,44px));font-weight:600;line-height:1.12}.install__sub.jsx-f1e3ebd05d546fcc{color:var(--ink-soft);max-width:66ch;margin:0 0 26px;font-size:15px;line-height:1.6}.install__disclaimer.jsx-f1e3ebd05d546fcc{color:#6a5a2e;background:#fbf6ec;border:1px solid #e7dcc4;max-width:820px;margin:0 0 26px;padding:14px 16px;font-size:13px;line-height:1.5}.install__pdfrow.jsx-f1e3ebd05d546fcc{flex-wrap:wrap;gap:8px;margin-bottom:34px;display:flex}.install__pdf.jsx-f1e3ebd05d546fcc{font-family:var(--font-mono);letter-spacing:.02em;border:1px solid var(--line);border-radius:var(--radius-sm);color:var(--ink);background:#fff;padding:9px 13px;font-size:11.5px;transition:background .15s,color .15s}.install__pdf.jsx-f1e3ebd05d546fcc:hover{background:var(--ink);color:#fff}.install__list.jsx-f1e3ebd05d546fcc{flex-direction:column;gap:8px;display:flex}.install__cat.jsx-f1e3ebd05d546fcc{border:1px solid var(--line);border-radius:var(--radius-sm);background:#fff}.install__cat.jsx-f1e3ebd05d546fcc summary.jsx-f1e3ebd05d546fcc{cursor:pointer;justify-content:space-between;align-items:center;gap:16px;padding:16px 20px;font-size:16px;font-weight:600;list-style:none;display:flex}.install__cat.jsx-f1e3ebd05d546fcc summary.jsx-f1e3ebd05d546fcc::-webkit-details-marker{display:none}.install__count.jsx-f1e3ebd05d546fcc{font-family:var(--font-mono);color:var(--ink-muted);text-transform:uppercase;letter-spacing:.06em;flex:none;font-size:10.5px;font-weight:500}.install__panel.jsx-f1e3ebd05d546fcc{border-top:1px solid var(--line);padding:12px 20px 18px}.install__guidelist.jsx-f1e3ebd05d546fcc{margin:0 0 10px;padding:0;list-style:none}.install__guidelist--pdf.jsx-f1e3ebd05d546fcc{border-top:1px solid var(--line);padding-top:10px}.install__guidelist.jsx-f1e3ebd05d546fcc a,.install__guidelist.jsx-f1e3ebd05d546fcc button{text-align:left;width:100%;color:var(--ink);border-radius:var(--radius-sm);cursor:pointer;background:0 0;border:0;justify-content:space-between;align-items:center;gap:12px;padding:10px 8px;font-family:inherit;font-size:13.5px;transition:background .12s;display:flex}.install__guidelist.jsx-f1e3ebd05d546fcc a:hover,.install__guidelist.jsx-f1e3ebd05d546fcc button:hover{background:var(--bg-card)}.install__guidelist-tag.jsx-f1e3ebd05d546fcc{font-family:var(--font-mono);color:var(--green);text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;flex:none;font-size:10px}.install__specsheets.jsx-f1e3ebd05d546fcc{flex-wrap:wrap;gap:6px;padding:0 8px 12px;display:flex}.install__specsheets.jsx-f1e3ebd05d546fcc a.install__specsheet{width:auto;font-family:var(--font-mono);letter-spacing:.02em;text-transform:uppercase;border:1px solid var(--line);color:#00c400;white-space:normal;background:#fff;border-radius:999px;justify-content:flex-start;align-items:center;gap:4px;padding:6px 12px;font-size:10.5px;transition:background .12s,color .12s;display:inline-flex}.install__specsheets.jsx-f1e3ebd05d546fcc a.install__specsheet:hover{background:var(--ink);color:#fff}.install__loading.jsx-f1e3ebd05d546fcc{color:var(--ink-muted);margin:0 0 10px;font-size:13px}.install__browse.jsx-f1e3ebd05d546fcc{font-size:11px}'
          }
        </JSXStyle>
      </main>
    )
  );
}
