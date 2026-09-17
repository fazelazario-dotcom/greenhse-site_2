'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
let t = [
    {
      id: 'YQxm2ZrDf9E',
      title: 'Home Lighting Layout App',
      imgPath: '/images/thumbnails/simple-lights.webp',
    },
    {
      id: 'z1bApcO04Bw',
      title: 'Guide to Connecting a Ubiquiti WiFi Extender',
      imgPath: '/images/thumbnails/connect-lights.webp',
    },
    {
      id: 'OcVDt_htuzk',
      title: 'Connecting Smart Downlights',
      imgPath: '/images/thumbnails/smart-lights.webp',
    },
    {
      id: 'BCo0g85LRvI',
      title: 'How to Put Your Smart Devices into Pairing Mode',
      imgPath: '/images/thumbnails/device-lights.webp',
    },
    {
      id: 'Q3iYeqDkIeE',
      title: 'Smart Stair Lights Connection',
      imgPath: '/images/thumbnails/stair-lights.webp',
    },
    {
      id: '7DAaL5gGab8',
      title: 'High-Quality Strip Lights in Perth',
      imgPath: '/images/thumbnails/strip-lights.webp',
    },
    {
      id: 'BtzC_uuHrZQ',
      title: 'High Bay Lights Explained',
      imgPath: '/images/thumbnails/highbay-lights.webp',
    },
    {
      id: 'B-Bx8YMpNXQ',
      title: 'Cabinet LED Strip Lighting Install Guide',
      imgPath: '/images/thumbnails/striping-lights.webp',
    },
    {
      id: 'kaPMJ-pcjG4',
      title: 'GH-B16 The Smarter Home Battery',
      imgPath: '/images/thumbnails/battery-lights.webp',
    },
    {
      id: '6dB0W9up8zA',
      title: '5070 LED Linkable Linear Modular',
      imgPath: '/images/thumbnails/lumen-lights.webp',
    },
    {
      id: '_1683KXx3eU',
      title: 'GH240/500 Area Lights',
      imgPath: '/images/thumbnails/area-lights.webp',
    },
    {
      id: 'd6ks02Kp6nQ',
      title: 'Design Perfect Lighting Layouts',
      imgPath: '/images/thumbnails/smarter-lights.webp',
    },
  ],
  r = 'https://greenhse.com/pub/media/sparsh/product_attachment',
  d = [
    {
      label: 'Smart Lighting — setup & info',
      href: `${r}/Smart_Info_Web_upload.pdf`,
    },
    {
      label: 'RGB Garden Lights — connection',
      href: `${r}/RGB Garden Lights connection_new.pdf`,
    },
    {
      label: 'Understanding Strip Lighting',
      href: `${r}/Understanding_strip_lighting.pdf`,
    },
    {
      label: 'Strip Lighting Profiles 2025',
      href: `${r}/Strip_Lighting_profiles_2025.pdf`,
    },
    {
      label: 'Single Colour Garden Lights — connection',
      href: `${r}/Single Colour Garden Lights connection_new.pdf`,
    },
    {
      label: '240V Strip Lighting',
      href: `${r}/240V-Strip-lighting-new.pdf`,
    },
    {
      label: 'Connecting & Setup',
      href: `${r}/Connecting_and_setup.pdf`,
    },
    {
      label: 'Star Lights — connection',
      href: `${r}/Star Lights connection_new.pdf`,
    },
    {
      label: 'Smart Stair Light — connection',
      href: `${r}/Smart Stair Light Connection.pdf`,
    },
  ];
function N(e) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...e}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}
function O({ solid: e, ...i }) {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" {...i}>
      <circle cx="12" cy="12" r="11" fill={e ? '#060d0a' : 'rgba(6,13,10,0.6)'} stroke="rgba(255,255,255,0.9)" />
      <path d="M10 8.3v7.4l6.4-3.7L10 8.3Z" fill="#fff" />
    </svg>
  );
}
export default function Default() {
  let [e, r] = React.useState(() => new Set());
  return (
    <section id="videos" className="jsx-92ba3e14f8d587d7 videos">
      <div className="jsx-92ba3e14f8d587d7 container">
        <div className="jsx-92ba3e14f8d587d7 videos__head">
          <span className="jsx-92ba3e14f8d587d7 videos__eyebrow">{'Videos & Instructions'}</span>
        </div>
        <div className="jsx-92ba3e14f8d587d7 videos__grid">
          {t.map((i) =>
            e.has(i.id) ? (
              <div key={i.id} className="jsx-92ba3e14f8d587d7 vid">
                <iframe
                  src={`https://www.youtube.com/embed/${i.id}?autoplay=1`}
                  title={i.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={!0}
                  className="jsx-92ba3e14f8d587d7 vid__frame"
                />
              </div>
            ) : (
              <button
                key={i.id}
                type="button"
                onClick={() => {
                  var e;
                  return ((e = i.id), void r((a) => new Set(a).add(e)));
                }}
                aria-label={`Play video: ${i.title}`}
                style={{
                  backgroundImage: `url(${i.imgPath})`,
                  backgroundSize: i.thumbFit || 'cover',
                }}
                className="jsx-92ba3e14f8d587d7 vid vid--thumb"
              >
                <O
                  className={`vid__play${'contain' === i.thumbFit ? ' vid__play--solid' : ''}`}
                  solid={'contain' === i.thumbFit}
                  aria-hidden="true"
                />
              </button>
            ),
          )}
        </div>
        <div className="jsx-92ba3e14f8d587d7 guides">
          <h3 className="jsx-92ba3e14f8d587d7 guides__title">{'Connection & setup PDFs'}</h3>
          <div className="jsx-92ba3e14f8d587d7 guides__grid">
            {d.map((e) => (
              <a
                key={e.label}
                href={e.href}
                target="_blank"
                rel="noreferrer noopener"
                className="jsx-92ba3e14f8d587d7 guide"
              >
                <N aria-hidden="true" />
                <span className="jsx-92ba3e14f8d587d7">{e.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <JSXStyle id="92ba3e14f8d587d7">
        {
          '.videos.jsx-92ba3e14f8d587d7{background:#0d1210;padding:88px 0 96px}.videos__head.jsx-92ba3e14f8d587d7{margin-bottom:36px}.videos__eyebrow.jsx-92ba3e14f8d587d7{font-family:var(--font-mono);letter-spacing:.28em;text-transform:uppercase;color:var(--green-bright);font-size:11px;display:inline-block}.videos__title.jsx-92ba3e14f8d587d7{letter-spacing:-.03em;color:#fff;margin:12px 0 10px;font-size:max(30px,min(3.6vw,44px));font-weight:600;line-height:1.12}.videos__sub.jsx-92ba3e14f8d587d7{color:#c7c7bb;margin:0;font-size:15px;line-height:1.6}.videos__grid.jsx-92ba3e14f8d587d7{grid-template-columns:repeat(3,1fr);gap:22px;display:grid}.vid.jsx-92ba3e14f8d587d7{aspect-ratio:16/9;border-radius:var(--radius-sm);background:#000;border:1px solid #ffffff1a;position:relative;overflow:hidden}.vid__frame.jsx-92ba3e14f8d587d7{border:0;width:100%;height:100%;display:block;position:absolute;inset:0}.vid--thumb.jsx-92ba3e14f8d587d7{cursor:pointer;background-position:50%;background-repeat:no-repeat;background-size:cover;justify-content:center;align-items:center;padding:0;display:flex}.vid__play.jsx-92ba3e14f8d587d7{filter:drop-shadow(0 4px 10px #00000080);transition:transform .15s}.vid__play--solid.jsx-92ba3e14f8d587d7{width:20%;height:auto}.vid--thumb.jsx-92ba3e14f8d587d7:hover .vid__play.jsx-92ba3e14f8d587d7{transform:scale(1.08)}.guides.jsx-92ba3e14f8d587d7{border-top:1px solid #ffffff1f;margin-top:56px;padding-top:40px}.guides__title.jsx-92ba3e14f8d587d7{letter-spacing:-.01em;color:#fff;margin:0 0 20px;font-size:20px;font-weight:600}.guides__grid.jsx-92ba3e14f8d587d7{border-radius:var(--radius-sm);background:#ffffff1f;border:1px solid #ffffff1f;grid-template-columns:repeat(3,1fr);gap:1px;display:grid;overflow:hidden}.guide.jsx-92ba3e14f8d587d7{color:#ffffffdb;background:#0d1210;align-items:center;gap:11px;padding:16px 18px;font-size:14px;transition:background .16s,color .16s;display:flex}.guide.jsx-92ba3e14f8d587d7 svg{color:var(--green-bright);flex:none}.guide.jsx-92ba3e14f8d587d7:hover{color:#fff;background:#00c4001a}@media (width<=1080px){.videos__grid.jsx-92ba3e14f8d587d7,.guides__grid.jsx-92ba3e14f8d587d7{grid-template-columns:repeat(2,1fr)}}@media (width<=640px){.videos.jsx-92ba3e14f8d587d7{padding:64px 0 72px}.videos__grid.jsx-92ba3e14f8d587d7,.guides__grid.jsx-92ba3e14f8d587d7{grid-template-columns:1fr}.videos__grid.jsx-92ba3e14f8d587d7{gap:16px}}'
        }
      </JSXStyle>
    </section>
  );
}
