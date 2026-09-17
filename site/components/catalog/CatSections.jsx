'use client';
import JSXStyle from 'styled-jsx/style';
export default function Default({ sections: e, renderCard: s }) {
  let t = (e || []).filter((e) => e.products.length > 0);
  return t.length <= 1 ? (
    <div className="jsx-315aa1fa2d59970a cat-grid">
      {(t[0]?.products || []).map(s)}
      <JSXStyle id="315aa1fa2d59970a">
        {
          '.cat-grid.jsx-315aa1fa2d59970a{grid-template-columns:repeat(4,1fr);gap:24px;display:grid}@media (width<=1080px){.cat-grid.jsx-315aa1fa2d59970a{grid-template-columns:repeat(2,1fr)}}@media (width<=560px){.cat-grid.jsx-315aa1fa2d59970a{grid-template-columns:1fr}}'
        }
      </JSXStyle>
    </div>
  ) : (
    <div className="jsx-dd8a3d18c432d3df cat-sections">
      <nav aria-label="Product groups" className="jsx-dd8a3d18c432d3df shelfnav">
        {t.map((e) => (
          <a key={e.id} href={`#${e.id}`} className="jsx-dd8a3d18c432d3df shelfnav__box">
            <span className="jsx-dd8a3d18c432d3df shelfnav__label">{e.label}</span>
            <span className="jsx-dd8a3d18c432d3df shelfnav__count">
              {e.products.length}
              {' product'}
              {1 === e.products.length ? '' : 's'}{' '}
              <span aria-hidden="true" className="jsx-dd8a3d18c432d3df">
                ↓
              </span>
            </span>
          </a>
        ))}
      </nav>
      {t.map((e) => (
        <div key={e.id} id={e.id} className="jsx-dd8a3d18c432d3df range__section">
          <h3 className="jsx-dd8a3d18c432d3df range__title--sub">{e.label}</h3>
          <div className="jsx-dd8a3d18c432d3df cat-grid">{e.products.map(s)}</div>
        </div>
      ))}
      <JSXStyle id="dd8a3d18c432d3df">
        {
          '.shelfnav.jsx-dd8a3d18c432d3df{grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin:0 0 34px;display:grid}.shelfnav__box.jsx-dd8a3d18c432d3df{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-sm);color:inherit;flex-direction:column;gap:6px;padding:14px 16px;text-decoration:none;transition:border-color .15s,background .15s;display:flex}.shelfnav__box.jsx-dd8a3d18c432d3df:hover{border-color:var(--green);background:var(--bg-raised)}.shelfnav__label.jsx-dd8a3d18c432d3df{letter-spacing:-.01em;font-size:14.5px;font-weight:600}.shelfnav__count.jsx-dd8a3d18c432d3df{font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);font-size:10px}.range__section.jsx-dd8a3d18c432d3df{scroll-margin-top:92px}.range__section.jsx-dd8a3d18c432d3df+.range__section.jsx-dd8a3d18c432d3df{margin-top:44px}.range__title--sub.jsx-dd8a3d18c432d3df{letter-spacing:-.02em;margin:0 0 20px;font-size:max(20px,min(2.4vw,26px));font-weight:600}.cat-grid.jsx-dd8a3d18c432d3df{grid-template-columns:repeat(4,1fr);gap:24px;display:grid}@media (width<=1080px){.cat-grid.jsx-dd8a3d18c432d3df{grid-template-columns:repeat(2,1fr)}}@media (width<=560px){.cat-grid.jsx-dd8a3d18c432d3df{grid-template-columns:1fr}}'
        }
      </JSXStyle>
    </div>
  );
}
