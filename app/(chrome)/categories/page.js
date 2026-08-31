import { SITE, cleanPath } from '../../../lib/site';
import nav from '../../../data/nav.json';

export const metadata={
  title:'LED Lighting Perth — All Categories | Greenhse Technologies',
  description:'Browse every Greenhse category: downlights, strip lighting, high bay, emergency, smart home and more. Perth stock, local support.',
  alternates:{canonical:'/categories/'},
};

/* The category directory, driven by the same nav data as the mega menu, with
   card imagery and counts pulled from each category's own page data. */
export default function Categories(){
  const cats=nav.mega.map(x=>{
    const key=x.href.endsWith('/')?x.href+'index.html':x.href;
    const c=SITE.categories[key]||{};
    return {href:cleanPath(x.href),label:x.label,banner:c.banner,count:(c.count||'').split('·')[0].trim()};
  });
  return (
    <main className="catdir">
      <div className="page-intro"><div>
        <h1>Every category</h1>
        <p>The whole range, grouped the way the catalogue is. Prices are live from our Magento store once each page loads.</p>
      </div></div>
      <section className="psec"><div className="cgrid2">
        {cats.map(c=>(
          <a key={c.href} className="ccard" href={c.href}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {c.banner ? <img src={c.banner} alt="" loading="lazy"/> : <span className="ccard-ph"/>}
            <span className="cname">{c.label}</span>
            {c.count ? <span className="ccount">{c.count}</span> : <span className="ccount">Browse the range</span>}
          </a>
        ))}
      </div></section>
    </main>
  );
}
