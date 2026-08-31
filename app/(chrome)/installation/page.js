import { SITE, cleanPath } from '../../../lib/site';

export const metadata={
  title:'Installation Help & Spec Sheets | Greenhse Technologies',
  description:'Step-by-step installation help across the whole range, plus the complete spec sheet library — every transformer size, every product with a data sheet.',
  alternates:{canonical:'/installation/'},
};

/* The installation hub, driven by the harvested dataset the static page carried
   inline: 194 products with sheets across 117 PDFs, all served via the /docs/*
   proxy so the files come straight from Magento. */
export default function Installation(){
  const {CATEGORIES=[],PRODUCTS=[],GUIDES=[]}=SITE.installation||{};
  const SHEETS=SITE.installation?.SPECSHEETS||{};
  const prodByCat={};
  PRODUCTS.forEach(p=>{(prodByCat[p.cat]=prodByCat[p.cat]||[]).push(p);});
  const urlPath=u=>cleanPath(u.replace('https://greenhse.com',''));
  return (
    <main className="ins">
      <div className="page-intro"><div>
        <p className="eyebrow">Installation help</p>
        <h1>A guide for every product</h1>
        <p>Step-by-step installation help across the whole range. Pick a category to
           download its specification sheets and guides where applicable.</p>
      </div></div>
      <div className="ins-warn">⚠ In Australia, connecting any 240V mains fitting must be done by a licensed
        electrician. These guides are general help, not a substitute for a qualified installer.</div>
      <div className="ins-guides">
        {GUIDES.map(([label,href],i)=>(
          <a key={i} className="ins-guide" href={href} target="_blank" rel="noopener">{label} ↗</a>
        ))}
      </div>
      {CATEGORIES.map(cat=>{
        const prods=(prodByCat[cat.id]||[]);
        const withSheets=prods.filter(p=>{
          const key=p.url.replace('https://greenhse.com','');
          return (SHEETS[key]||[]).length;
        });
        const total=withSheets.reduce((n,p)=>n+(SHEETS[p.url.replace('https://greenhse.com','')]||[]).length,0);
        return (
          <details key={cat.id} className="ins-cat">
            <summary><b>{cat.name}</b><span className="ins-cnt">{total} spec sheets</span></summary>
            <div className="ins-body">
              {!withSheets.length && <p className="ins-none">No spec sheets in this category — call us and we&apos;ll send what you need.</p>}
              {withSheets.map(p=>{
                const key=p.url.replace('https://greenhse.com','');
                return (
                  <div key={p.id} className="ins-row">
                    <a className="ins-name" href={urlPath(p.url)}>{p.name}</a>
                    {(SHEETS[key]||[]).map(([file,label],j)=>(
                      <a key={j} className="ins-sheet" href={'/docs/'+file} target="_blank" rel="noopener">{label||'Spec sheet'} ↓</a>
                    ))}
                  </div>
                );
              })}
            </div>
          </details>
        );
      })}
    </main>
  );
}
