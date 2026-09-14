'use client';
import JSXStyle from 'styled-jsx/style';
import Link from 'next/link';
import * as Icons from '../components/ui/Icons';
import * as nav from '../lib/nav';
import * as asset from '../lib/asset';
let n = [
    'Supply of high quality, energy-efficient products direct to consumers at a low cost',
    'Australian owned and operating since 2010',
    'Over 20 years experience',
    'Strong focus on R&D and engineering improvement',
    'Design and development of products',
    'Winner of Belmont Small Business Award — overall judges award for environmental, energy efficiency and innovation',
  ],
  l = [
    'Domestic, retail, commercial and industrial — small or large quantities',
    'Shortest return on investment',
    'Expert advice and free lighting design, energy saving/cost saving report',
    'Wholesale prices direct to public',
    'Australian certified products with public liability cover',
    'Shipping throughout Australia/world wide',
  ];
export default function Default() {
  return (
    <main className="jsx-fea762a8339a253 acc about-page">
      <div className="jsx-fea762a8339a253 container">
        <span className="jsx-fea762a8339a253 eyebrow">Who we are</span>
        <h1 className="jsx-fea762a8339a253 acc__title">About Us</h1>
        <p className="jsx-fea762a8339a253 about-page__lead">{nav.company.blurb}</p>
      </div>
      <section className="jsx-fea762a8339a253 about-block">
        <div className="jsx-fea762a8339a253 container about-block__inner">
          <div className="jsx-fea762a8339a253 about-block__copy">
            <span className="jsx-fea762a8339a253 eyebrow">Since 2010</span>
            <h2 className="jsx-fea762a8339a253 about-block__title">The Greenhse Advantage</h2>
            <ul className="jsx-fea762a8339a253 about-block__list">
              {n.map((e) => (
                <li key={e} className="jsx-fea762a8339a253">
                  <Icons.IconCheck aria-hidden="true" />
                  <span className="jsx-fea762a8339a253">{e}</span>
                </li>
              ))}
            </ul>
            <Link className="btn about-block__cta" href="/products/">
              {'Browse our range '}
              <span aria-hidden="true" className="jsx-fea762a8339a253">
                →
              </span>
            </Link>
          </div>
          <div className="jsx-fea762a8339a253 about-block__visual">
            <img
              src={asset.asset('/images/about/about-img.jpg')}
              alt="A parent and child reading together by warm, low-glare LED light"
              loading="lazy"
              className="jsx-fea762a8339a253"
            />
          </div>
        </div>
      </section>
      <section className="jsx-fea762a8339a253 about-block about-block--dark">
        <div className="jsx-fea762a8339a253 container about-block__inner">
          <div className="jsx-fea762a8339a253 about-block__copy">
            <span className="jsx-fea762a8339a253 eyebrow eyebrow--light">Why choose us</span>
            <h2 className="jsx-fea762a8339a253 about-block__title">Why Greenhse?</h2>
            <ul className="jsx-fea762a8339a253 about-block__list">
              {l.map((e) => (
                <li key={e} className="jsx-fea762a8339a253">
                  <Icons.IconCheck aria-hidden="true" />
                  <span className="jsx-fea762a8339a253">{e}</span>
                </li>
              ))}
            </ul>
            <Link className="btn about-block__cta about-block__cta--bright" href="/contact/">
              {'Get in touch '}
              <span aria-hidden="true" className="jsx-fea762a8339a253">
                →
              </span>
            </Link>
          </div>
          <div className="jsx-fea762a8339a253 about-block__visual about-block__visual--bottom">
            <img
              src={asset.asset('/images/about/about-img.jpg')}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="jsx-fea762a8339a253"
            />
          </div>
        </div>
      </section>
      <p className="jsx-fea762a8339a253 about-page__legal">
        KEWBEN PTY LTD T/A GREENHOUSE TECHNOLOGIES
        <br className="jsx-fea762a8339a253" />
        ABN: 32 474 204 312
      </p>
      <JSXStyle id="fea762a8339a253">
        {
          '.about-page__lead.jsx-fea762a8339a253{max-width:64ch;color:var(--ink-soft);margin:-10px 0 0;font-size:15px;line-height:1.65}.about-block.jsx-fea762a8339a253{background:var(--bg);padding:72px 0}.about-block--dark.jsx-fea762a8339a253{background:#060d0a}.eyebrow--light.jsx-fea762a8339a253{color:var(--green-bright)}.about-block__inner.jsx-fea762a8339a253{grid-template-columns:1.1fr .9fr;align-items:center;gap:56px;display:grid}.about-block__title.jsx-fea762a8339a253{letter-spacing:-.02em;color:var(--ink);margin:10px 0 22px;font-size:max(26px,min(3vw,34px));font-weight:600;line-height:1.16}.about-block--dark.jsx-fea762a8339a253 .about-block__title.jsx-fea762a8339a253{color:#fff}.about-block__list.jsx-fea762a8339a253{flex-direction:column;margin:0 0 30px;padding:0;list-style:none;display:flex}.about-block__list.jsx-fea762a8339a253 li.jsx-fea762a8339a253{border-bottom:1px solid var(--line);align-items:flex-start;gap:14px;padding:14px 4px;transition:padding-left .16s,border-color .16s;display:flex}.about-block__list.jsx-fea762a8339a253 li.jsx-fea762a8339a253:first-child{border-top:1px solid var(--line)}.about-block__list.jsx-fea762a8339a253 li.jsx-fea762a8339a253:hover{border-color:var(--green);padding-left:10px}.about-block--dark.jsx-fea762a8339a253 .about-block__list.jsx-fea762a8339a253 li.jsx-fea762a8339a253{border-color:#ffffff29}.about-block--dark.jsx-fea762a8339a253 .about-block__list.jsx-fea762a8339a253 li.jsx-fea762a8339a253:hover{border-color:var(--green-bright)}.about-block__list.jsx-fea762a8339a253 li.jsx-fea762a8339a253 span.jsx-fea762a8339a253{color:var(--ink-soft);font-size:14.5px;line-height:1.55}.about-block--dark.jsx-fea762a8339a253 .about-block__list.jsx-fea762a8339a253 li.jsx-fea762a8339a253 span.jsx-fea762a8339a253{color:#ffffffb3}.about-block__list.jsx-fea762a8339a253 svg{width:18px;height:18px;color:var(--green);flex:none;margin-top:2px;transition:transform .16s}.about-block__list.jsx-fea762a8339a253 li.jsx-fea762a8339a253:hover svg{transform:scale(1.15)}.about-block--dark.jsx-fea762a8339a253 .about-block__list.jsx-fea762a8339a253 svg{color:var(--green-bright)}.about-block__cta{background:var(--ink);color:#fff}.about-block__cta:hover{background:#2c2e26}.about-block__cta--bright{background:var(--green-bright);color:#04120b}.about-block__cta--bright:hover{background:var(--green-hover)}.about-block__visual.jsx-fea762a8339a253{border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 30px 70px -30px #14150f59}.about-block--dark.jsx-fea762a8339a253 .about-block__visual.jsx-fea762a8339a253{box-shadow:0 40px 80px -30px #0009}.about-block__visual.jsx-fea762a8339a253 img.jsx-fea762a8339a253{object-fit:cover;object-position:top;width:100%;height:460px;transition:transform .5s;display:block}.about-block__visual--bottom.jsx-fea762a8339a253 img.jsx-fea762a8339a253{object-position:bottom}.about-block__visual.jsx-fea762a8339a253:hover img.jsx-fea762a8339a253{transform:scale(1.05)}.about-page__legal.jsx-fea762a8339a253{text-align:center;color:var(--ink-muted);padding:40px 0 20px;font-size:12px;line-height:1.6}@media (width<=1080px){.about-block__inner.jsx-fea762a8339a253{grid-template-columns:1fr}.about-block__visual.jsx-fea762a8339a253{order:-1}.about-block__visual.jsx-fea762a8339a253 img.jsx-fea762a8339a253{height:340px}}@media (width<=640px){.about-block.jsx-fea762a8339a253{padding:52px 0}}'
        }
      </JSXStyle>
    </main>
  );
}
