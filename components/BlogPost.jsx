import { mapHref } from '../lib/site';

export default function BlogPost({ b }){
  return (
    <article className="bl-article">
      <p className="bl-crumb"><a href="/">Home</a> › <a href="/blog/">Blog</a></p>
      <h1>{b.h1}</h1>
      {b.lede && <p className="bl-lede">{b.lede}</p>}
      {b.date && <p className="bl-date">{b.date}</p>}
      <div dangerouslySetInnerHTML={{__html:b.bodyHtml}}/>
      <div className="bl-cta">
        <h3>Need a hand choosing?</h3>
        <p>We&apos;re a Perth LED supplier — Australian certified stock, local support, and someone who&apos;ll actually talk you through it.</p>
        <a className="bl-btn" href="/#contact">Talk to us</a>
      </div>
      {!!(b.more||[]).length && (
        <div className="bl-more"><h3>More reading</h3>
          <ul>{b.more.map((m,i)=><li key={i}><a href={mapHref(m.href)}>{m.label}</a></li>)}</ul>
        </div>
      )}
    </article>
  );
}
