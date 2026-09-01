import { SITE, cleanPath } from '../../../lib/site';

export const metadata={
  title:'Lighting guides & advice | Greenhse Technologies Perth',
  description:'Plain-English guides on LED lighting, energy savings and getting the right fitting for the job — written for Perth homes and businesses.',
};

/* Blog index, in the demo build's card-grid style. Each post's first
   image becomes its card tile (extracted from the body at build time);
   the handful of posts with no image get a plain text card. */
function firstImg(html){
  const m=/<img[^>]*src="([^"]+)"/.exec(html||'');
  return m?m[1]:null;
}

export default function BlogIndex(){
  const posts=Object.entries(SITE.blogs).map(([path,b])=>({path:cleanPath(path),img:firstImg(b.bodyHtml),...b}));
  const key=p=>Date.parse(p.date||'')||Date.parse('2026-12-31');
  posts.sort((a,b)=>key(b)-key(a));
  return (
    <div className="tpl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/banners/blog-v2.webp" alt="Ideas to inspire — the Greenhse blog"
        style={{width:'100%',height:'auto',display:'block'}}/>
      <section className="range">
        <div className="container">
          <div className="range__head">
            <div className="range__copy">
              <span className="eyebrow">Blogs · Insights · Inspiration · Perth, WA</span>
              <h1 className="range__title">Lighting guides &amp; advice</h1>
              <p className="range__sub">Plain-English guides on LED lighting, energy savings and getting the right fitting for the job — written for Perth homes and businesses.</p>
            </div>
          </div>
          <div className="grid">
            {posts.map(p=>(
              <a key={p.path} className="card" href={p.path}>
                {p.img ? (
                  <div className="card__tile">
                    <div className="visual visual--photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt="" loading="lazy"/>
                    </div>
                  </div>
                ) : (
                  <div className="card__tile card__tile--text"><span>Greenhse · Guide</span></div>
                )}
                <div className="card__body">
                  {p.date ? <span className="eyebrow">{p.date}</span> : <span className="eyebrow">Guide</span>}
                  <span className="card__title">{p.h1}</span>
                  <div className="card__foot">
                    <span className="btn card__quote card__quote--call">Read →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
