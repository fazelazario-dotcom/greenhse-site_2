import { prepPost, related, resolveHref } from '../lib/blog';

/* One blog post, laid out as an editorial page: a full-width photograph with
   the title set on it, a contents list, a single readable column with big
   type and plenty of air, and somewhere to go at the end.

   The raw post is cleaned by lib/blog.js on the way in (title suffix off,
   empty headings out, links kept on this site, no dashes). The photograph is
   the post's `hero` in data/site.json: the site's own photography, chosen by
   topic. The pictures inside the post stay where the author put them. */
export default function BlogPost({ b, path }){
  const post = prepPost(b, path);
  const more = related(post, 3);
  const eyebrow = [post.topic.label, post.minutes + ' min read'].join(' · ');
  return (
    <article className="bl-article">
      <header className={'bl-hero' + (post.hero ? '' : ' bl-hero--plain')}>
        {post.hero && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="bl-hero__img" src={post.hero} alt="" fetchPriority="high"/>
        )}
        <div className="bl-hero__shade" aria-hidden="true"/>
        <div className="bl-hero__inner">
          <p className="bl-crumb"><a href="/">Home</a><span>›</span><a href="/blog/">Blog</a><span>›</span><span>{post.topic.label}</span></p>
          <span className="bl-eyebrow">{eyebrow}</span>
          <h1>{post.title}</h1>
          {post.lede && <p className="bl-lede">{post.lede}</p>}
          <p className="bl-meta">
            <span>Greenhse Technologies</span>
            {post.date && <span>{post.date}</span>}
            <span>Perth, WA</span>
          </p>
        </div>
      </header>

      <div className="bl-wrap">
        {post.toc.length >= 3 && (
          <nav className="bl-toc" aria-label="In this guide">
            <p className="bl-toc-h">In this guide</p>
            <ol>{post.toc.map(t => <li key={t.id}><a href={'#'+t.id}>{t.text}</a></li>)}</ol>
          </nav>
        )}

        <div className="bl-body" dangerouslySetInnerHTML={{__html:post.bodyHtml}}/>

        <aside className="bl-cta">
          <span className="bl-eyebrow">Talk to a person</span>
          <h3>Not sure which fitting is right? Ask us.</h3>
          <p>Australian certified stock, a showroom in Ellenbrook and a team that will walk you through the choice, from a single downlight to a whole warehouse.</p>
          <p className="bl-cta-row">
            <a className="bl-btn" href="/contact/">Contact Greenhse</a>
            <a className="bl-btn bl-btn--ghost" href="/layout-app/">Plan a lighting layout</a>
          </p>
          <p className="bl-cta-foot">(08) 9297 2969 · 5/1 Locke Lane, Ellenbrook WA 6069</p>
        </aside>

        {!!(b.more||[]).length && (
          <div className="bl-more">
            <p className="bl-toc-h">Shop the range</p>
            <ul>{b.more.map((m,i)=><li key={i}><a href={resolveHref(m.href)}>{m.label}<span aria-hidden="true"> →</span></a></li>)}</ul>
          </div>
        )}
      </div>

      {!!more.length && (
        <section className="bl-related" aria-label="Read next">
          <div className="bl-related__inner">
            <div className="bl-related__head">
              <p className="bl-toc-h">Read next</p>
              <a className="bl-related__all" href="/blog/">All guides<span aria-hidden="true"> →</span></a>
            </div>
            <div className="bl-related-grid">
              {more.map(p => (
                <a key={p.path} className="bl-rcard" href={p.path}>
                  <span className="bl-rcard__tile">
                    {p.thumb
                      /* eslint-disable-next-line @next/next/no-img-element */
                      ? <img src={p.thumb} alt="" loading="lazy"/>
                      : <span className="bl-rcard-blank">Greenhse · Guide</span>}
                  </span>
                  <span className="bl-rcard-topic">{p.topic.label} · {p.minutes} min</span>
                  <span className="bl-rcard-title">{p.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
