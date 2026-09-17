import { allPosts, TOPIC_LIST } from '../../lib/blog';
import BlogFilters from '../../site/components/blog/BlogFilters';

export const metadata = {
  title: 'Lighting guides & advice | Greenhse Technologies Perth',
  description: 'Plain-English guides on LED lighting, energy savings and getting the right fitting for the job, written for Perth homes and businesses.',
  alternates: { canonical: '/blog/' },
};

const short = (s, n) => (s && s.length > n ? s.slice(0, n - 3).replace(/\s+\S*$/, '') + '…' : s || '');

/* /blog/ - this site's own posts: the newest one large, then every guide as
   a photographic card. Every post arrives cleaned by lib/blog.js; the topic
   pills filter the one grid client-side (site/components/blog/BlogFilters.jsx). */
export default function BlogIndex() {
  const posts = allPosts();
  const counts = {};
  posts.forEach((p) => { counts[p.topic.id] = (counts[p.topic.id] || 0) + 1; });
  const chips = [{ id: 'all', label: 'All guides' }].concat(TOPIC_LIST.filter((t) => counts[t.id]));
  const [first, ...rest] = posts;
  return (
    <main className="home bl-index">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bl-banner" src="/img/banners/blog-v2.webp" alt="Ideas to inspire: the Greenhse blog" />
      <section className="range" id="guides">
        <div className="container">
          <div className="range__head">
            <div className="range__copy">
              <span className="eyebrow">Blogs · Insights · Inspiration · Perth, WA</span>
              <h1 className="range__title">Lighting guides &amp; advice</h1>
              <p className="range__sub">Plain-English guides on LED lighting, energy savings and getting the right fitting for the job, written for Perth homes and businesses.</p>
            </div>
          </div>

          {first && (
            <a className="bl-feature" href={first.path}>
              <span className="bl-feature__tile">
                {first.thumb && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={first.thumb} alt="" fetchPriority="high" />
                )}
              </span>
              <span className="bl-feature__body">
                <span className="bl-eyebrow">Latest · {first.topic.label} · {first.minutes} min read</span>
                <span className="bl-feature__title">{first.title}</span>
                {first.lede && <span className="bl-feature__lede">{short(first.lede, 190)}</span>}
                <span className="bl-btn bl-feature__read">Read the guide</span>
              </span>
            </a>
          )}

          <BlogFilters chips={chips} counts={counts} total={posts.length} />
          <div className="grid">
            {rest.map((p) => (
              <a key={p.path} className="card" href={p.path} data-cats={p.topic.id}>
                {p.thumb ? (
                  <div className="card__tile">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt="" loading="lazy" />
                  </div>
                ) : (
                  <div className="card__tile card__tile--text"><span>Greenhse · Guide</span></div>
                )}
                <div className="card__body">
                  <span className="eyebrow">{p.topic.label} · {p.minutes} min read</span>
                  <span className="card__title">{p.title}</span>
                  {p.lede && <span className="card__lede">{short(p.lede, 120)}</span>}
                  <div className="card__foot">
                    <span className="bl-card-date">{p.date || ''}</span>
                    <span className="card__read">Read →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
