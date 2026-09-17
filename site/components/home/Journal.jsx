'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import Link from 'next/link';
import * as blogApi from '../../lib/blogApi';
let i = ['#5d6151', '#1c4a2c', 'var(--green-bright)'];
export default function Default() {
  let [e, o] = React.useState([]),
    [l, c] = React.useState(!0),
    [d, f] = React.useState(null);
  return (
    React.useEffect(() => {
      let e = !1;
      return (
        blogApi
          .getBlogPosts({
            pageSize: 6,
          })
          .then(({ posts: a }) => {
            e || o(a.slice(0, 6));
          })
          .catch((a) => {
            e || f(a.message);
          })
          .finally(() => {
            e || c(!1);
          }),
        () => {
          e = !0;
        }
      );
    }, []),
    (
      <section id="blog" className="jsx-c8a8b45753b44f0f journal">
        <div className="jsx-c8a8b45753b44f0f container">
          <div className="jsx-c8a8b45753b44f0f head-row">
            <div className="jsx-c8a8b45753b44f0f section-head">
              <span className="jsx-c8a8b45753b44f0f eyebrow">Blog</span>
              <h2 className="jsx-c8a8b45753b44f0f section-title">{'Lighting guides & ideas'}</h2>
              <p className="jsx-c8a8b45753b44f0f section-sub">
                Practical advice on choosing, installing and saving with LED — straight from the Greenhse team.
              </p>
            </div>
            <Link className="link-mono head-row__link" href="/blog/">
              {'All articles '}
              <span aria-hidden="true" className="jsx-c8a8b45753b44f0f">
                →
              </span>
            </Link>
          </div>
          {l && (
            <div className="jsx-c8a8b45753b44f0f loading">
              <span role="status" aria-label="Loading" className="jsx-c8a8b45753b44f0f spinner" />
              <p className="jsx-c8a8b45753b44f0f loading__text">Loading posts…</p>
            </div>
          )}
          {!l && d && (
            <p className="jsx-c8a8b45753b44f0f journal__status journal__status--error">
              Couldn't load posts right now. Please try again shortly.
            </p>
          )}
          {!l && !d && 0 === e.length && (
            <p className="jsx-c8a8b45753b44f0f journal__status">No posts yet — check back soon.</p>
          )}
          {!l && !d && e.length > 0 && (
            <div className="jsx-c8a8b45753b44f0f journal__grid">
              {e.map((e, t) => (
                <Link key={e.id} href={`/blog/${e.slug}/`} className="journal-card">
                  {e.image && (
                    <span className="jsx-c8a8b45753b44f0f journal-card__tile">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={e.image} alt="" loading="lazy" className="jsx-c8a8b45753b44f0f" />
                    </span>
                  )}
                  <span
                    style={{
                      background: i[t % i.length],
                    }}
                    aria-hidden="true"
                    className="jsx-c8a8b45753b44f0f journal-card__bar"
                  />
                  <div className="jsx-c8a8b45753b44f0f journal-card__body">
                    <span className="jsx-c8a8b45753b44f0f eyebrow journal-card__eyebrow">{e.topic ? `${e.topic} · ${e.minutes} min read` : 'Greenhse Journal'}</span>
                    <h3 className="jsx-c8a8b45753b44f0f journal-card__title">{e.title}</h3>
                    <span className="jsx-c8a8b45753b44f0f link-mono journal-card__link">
                      {'Read article '}
                      <span aria-hidden="true" className="jsx-c8a8b45753b44f0f">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <JSXStyle id="c8a8b45753b44f0f">
          {
            '.section-head.jsx-c8a8b45753b44f0f{margin-bottom:34px}.section-title.jsx-c8a8b45753b44f0f{letter-spacing:-.03em;margin:10px 0;font-size:max(28px,min(3.4vw,40px));font-weight:600;line-height:1.14}.section-sub.jsx-c8a8b45753b44f0f{color:var(--ink-soft);max-width:56ch;margin:0;font-size:15px;line-height:1.6}.head-row.jsx-c8a8b45753b44f0f{justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:34px;display:flex}.head-row.jsx-c8a8b45753b44f0f .section-head.jsx-c8a8b45753b44f0f{margin-bottom:0}.head-row__link{flex:none;margin-bottom:6px}.loading.jsx-c8a8b45753b44f0f{flex-direction:column;justify-content:center;align-items:center;gap:18px;min-height:320px;display:flex}.spinner.jsx-c8a8b45753b44f0f{border:3px solid var(--line);border-top-color:var(--ink);border-radius:50%;width:36px;height:36px;animation:.8s linear infinite spin}.loading__text.jsx-c8a8b45753b44f0f{color:var(--ink-soft);margin:0;font-size:14px}@keyframes spin{to{transform:rotate(360deg)}}.journal.jsx-c8a8b45753b44f0f{padding:0 0 70px}.journal__grid.jsx-c8a8b45753b44f0f{grid-template-columns:repeat(3,1fr);gap:24px;display:grid}.journal__status.jsx-c8a8b45753b44f0f{color:var(--ink-soft);padding:12px 0;font-size:14px}.journal__status--error.jsx-c8a8b45753b44f0f{color:#b3261e}.journal-card{border:1px solid var(--line);border-radius:var(--radius-sm);color:inherit;background:#fff;flex-direction:column;text-decoration:none;transition:box-shadow .16s,transform .16s;display:flex;overflow:hidden}.journal-card:hover{transform:translateY(-2px);box-shadow:0 6px 18px #14150f1a}.journal-card__tile.jsx-c8a8b45753b44f0f{display:block;aspect-ratio:16/9;overflow:hidden;background:#101010}.journal-card__tile.jsx-c8a8b45753b44f0f img.jsx-c8a8b45753b44f0f{width:100%;height:100%;object-fit:cover;object-position:72% center;display:block;transition:transform .5s cubic-bezier(.2,.7,.2,1)}.journal-card:hover .journal-card__tile.jsx-c8a8b45753b44f0f img.jsx-c8a8b45753b44f0f{transform:scale(1.04)}.journal-card__bar.jsx-c8a8b45753b44f0f{width:100%;height:4px;display:block}.journal-card__body.jsx-c8a8b45753b44f0f{flex-direction:column;flex:1;gap:12px;padding:24px 22px 26px;display:flex}.journal-card__eyebrow.jsx-c8a8b45753b44f0f{color:var(--ink-muted)}.journal-card__title.jsx-c8a8b45753b44f0f{letter-spacing:-.01em;-webkit-line-clamp:3;-webkit-box-orient:vertical;flex:1;margin:0;font-size:18px;font-weight:600;line-height:1.35;display:-webkit-box;overflow:hidden}.journal-card__link.jsx-c8a8b45753b44f0f{margin-top:auto}@media (width<=860px){.journal__grid.jsx-c8a8b45753b44f0f{grid-template-columns:1fr}}@media (width<=640px){.head-row.jsx-c8a8b45753b44f0f{flex-direction:column;align-items:flex-start;gap:16px}}'
          }
        </JSXStyle>
      </section>
    )
  );
}
