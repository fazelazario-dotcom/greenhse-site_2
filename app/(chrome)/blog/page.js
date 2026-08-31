import { SITE, cleanPath } from '../../../lib/site';

export const metadata={
  title:'Lighting guides & advice | Greenhse Technologies Perth',
  description:'Plain-English guides on LED lighting, energy savings and getting the right fitting for the job — written for Perth homes and businesses.',
};

export default function BlogIndex(){
  const posts=Object.entries(SITE.blogs).map(([path,b])=>({path:cleanPath(path),...b}));
  const key=p=>Date.parse(p.date||'')||Date.parse('2026-12-31');
  posts.sort((a,b)=>key(b)-key(a));
  return (
    <div className="bl-index">
      <p className="bl-crumb"><a href="/">Home</a> › Blog</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/banners/blog-v2.webp" alt="Ideas to inspire — the Greenhse blog"
        style={{width:'100%',height:'auto',borderRadius:4,margin:'2px 0 26px',display:'block'}}/>
      <h1>Lighting guides &amp; advice</h1>
      <p className="bl-lede">Plain-English guides on LED lighting, energy savings and getting the right fitting for the job — written for Perth homes and businesses.</p>
      {posts.map(p=>(
        <a key={p.path} className="bl-card" href={p.path}>
          <h2>{p.h1}</h2>
          <p>{(p.lede||p.desc||'').slice(0,220)}</p>
        </a>
      ))}
    </div>
  );
}
