'use client';
import JSXStyle from 'styled-jsx/style';
export default function Default({
  eyebrow: e,
  title: s,
  subtitle: t,
  stats: r,
  cards: d,
  CalloutIcon: N,
  calloutText: o,
}) {
  return (
    <section className="jsx-18b2f079281228a4 guide">
      <div className="jsx-18b2f079281228a4 container">
        <div className="jsx-18b2f079281228a4 guide__top">
          <div className="jsx-18b2f079281228a4 guide__intro">
            <span className="jsx-18b2f079281228a4 eyebrow">{e}</span>
            <h2 className="jsx-18b2f079281228a4 guide__title">{s}</h2>
            <p className="jsx-18b2f079281228a4 guide__sub">{t}</p>
          </div>
          <div className="jsx-18b2f079281228a4 guide__stats">
            {r.map(({ Icon: E, label: i, text: s }) => (
              <div key={i} className="jsx-18b2f079281228a4 guide__stat">
                <span aria-hidden="true" className="jsx-18b2f079281228a4 guide__stat-icon">
                  <E className="jsx-18b2f079281228a4" />
                </span>
                <div className="jsx-18b2f079281228a4">
                  <strong className="jsx-18b2f079281228a4">{i}</strong>
                  <p className="jsx-18b2f079281228a4">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="jsx-18b2f079281228a4 guide__grid">
          {d.map(({ Icon: EC, title: i, text: s }) => (
            <div key={i} className="jsx-18b2f079281228a4 guide__card">
              <span aria-hidden="true" className="jsx-18b2f079281228a4 guide__card-icon">
                <EC className="jsx-18b2f079281228a4" />
              </span>
              <h3 className="jsx-18b2f079281228a4">{i}</h3>
              <p className="jsx-18b2f079281228a4">{s}</p>
            </div>
          ))}
        </div>
        <div className="jsx-18b2f079281228a4 guide__callout">
          <span aria-hidden="true" className="jsx-18b2f079281228a4 guide__callout-icon">
            <N className="jsx-18b2f079281228a4" />
          </span>
          <p className="jsx-18b2f079281228a4">{o}</p>
        </div>
      </div>
      <JSXStyle id="18b2f079281228a4">
        {
          '.guide.jsx-18b2f079281228a4{border-top:1px solid var(--line);padding:72px 0 96px}.guide__top.jsx-18b2f079281228a4{border-bottom:1px solid var(--line);grid-template-columns:1.15fr 1fr;gap:48px;margin-bottom:40px;padding-bottom:40px;display:grid}.guide__title.jsx-18b2f079281228a4{letter-spacing:-.02em;margin:10px 0 12px;font-size:max(26px,min(3vw,36px));font-weight:600;line-height:1.16}.guide__sub.jsx-18b2f079281228a4{color:var(--ink-soft);max-width:46ch;margin:0;font-size:15px;line-height:1.65}.guide__stats.jsx-18b2f079281228a4{flex-direction:column;gap:18px;display:flex}.guide__stat.jsx-18b2f079281228a4{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-sm);align-items:flex-start;gap:14px;padding:16px 18px;display:flex}.guide__stat-icon.jsx-18b2f079281228a4{width:38px;height:38px;color:var(--green);background:#fff;border-radius:50%;flex:none;justify-content:center;align-items:center;display:flex}.guide__stat.jsx-18b2f079281228a4 strong.jsx-18b2f079281228a4{text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px;font-size:13px;font-weight:700;display:block}.guide__stat.jsx-18b2f079281228a4 p.jsx-18b2f079281228a4{color:var(--ink-soft);margin:0;font-size:13.5px;line-height:1.55}.guide__grid.jsx-18b2f079281228a4{grid-template-columns:repeat(3,1fr);gap:32px;margin-bottom:40px;display:grid}.guide__card-icon.jsx-18b2f079281228a4{background:var(--bg-card);width:40px;height:40px;color:var(--ink);border-radius:50%;justify-content:center;align-items:center;margin-bottom:14px;display:flex}.guide__card.jsx-18b2f079281228a4 h3.jsx-18b2f079281228a4{margin:0 0 8px;font-size:16px;font-weight:600}.guide__card.jsx-18b2f079281228a4 p.jsx-18b2f079281228a4{color:var(--ink-soft);margin:0;font-size:13.5px;line-height:1.65}.guide__callout.jsx-18b2f079281228a4{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-sm);align-items:center;gap:14px;padding:18px 22px;display:flex}.guide__callout-icon.jsx-18b2f079281228a4{width:34px;height:34px;color:var(--green);background:#fff;border-radius:50%;flex:none;justify-content:center;align-items:center;display:flex}.guide__callout.jsx-18b2f079281228a4 p.jsx-18b2f079281228a4{color:var(--ink-soft);margin:0;font-size:13.5px;line-height:1.6}@media (width<=1080px){.guide__grid.jsx-18b2f079281228a4{grid-template-columns:repeat(2,1fr)}}@media (width<=860px){.guide__top.jsx-18b2f079281228a4{grid-template-columns:1fr;gap:28px}}@media (width<=560px){.guide__grid.jsx-18b2f079281228a4{grid-template-columns:1fr}.guide__callout.jsx-18b2f079281228a4{flex-direction:column;align-items:flex-start}}'
        }
      </JSXStyle>
    </section>
  );
}
