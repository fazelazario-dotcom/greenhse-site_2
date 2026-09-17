'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import ProductCard from '../../components/product/ProductCard';
import * as ProductCard2 from '../../components/product/ProductCard';
import CatSections from '../../components/catalog/CatSections';
import VideosSection from '../../components/catalog/VideosSection';
import GuideSection from '../../components/catalog/GuideSection';
import * as Icons from '../../components/ui/Icons';
import * as api from '../../lib/api';
import * as withPinnedOrder from '../../lib/withPinnedOrder';
import * as asset from '../../lib/asset';
function F() {
  return (
    <section
      className={JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) + ' hero'}
    >
      <div
        aria-hidden="true"
        className={
          JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) + ' hero__scrim'
        }
      />
      <div
        className={
          JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) +
          ' container hero__inner'
        }
      >
        <span
          className={
            JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) +
            ' hero__eyebrow'
          }
        >
          {'Smart Life · App & Voice Control · Perth, WA'}
        </span>
        <h1
          className={
            JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) +
            ' hero__title'
          }
        >
          Your lighting,
          <br
            className={JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]])}
          />
          <span
            className={
              JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) +
              ' hero__accent'
            }
          >
            on command
          </span>
        </h1>
        <p
          className={
            JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) + ' hero__lead'
          }
        >
          Dimmable, colour-changing smart lighting you control from your phone, a wall panel, or your voice — Alexa and
          Google Home compatible, set up once and left to just work.
        </p>
        <div
          className={
            JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) +
            ' hero__actions'
          }
        >
          <a
            href="#smart-life"
            className={
              JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) +
              ' hero__btn hero__btn--primary'
            }
          >
            {'Shop Smart Life '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]])}
            >
              →
            </span>
          </a>
          <a
            href="/layout-app/"
            className={
              JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]]) +
              ' hero__btn hero__btn--ghost'
            }
          >
            {'Lighting Layout App '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['7ee332de86cdbf38', [asset.asset('/images/hero/smart-life-hero.webp')]]])}
            >
              →
            </span>
          </a>
        </div>
      </div>
      <JSXStyle
        id="7ee332de86cdbf38"
        dynamic={[asset.asset('/images/hero/smart-life-hero.webp')]}
      >{`.hero.__jsx-style-dynamic-selector{background-image:url(${asset.asset('/images/hero/smart-life-hero.webp')});background-position:100%;background-repeat:no-repeat;background-size:cover;position:relative;overflow:hidden}.hero__media.__jsx-style-dynamic-selector{width:64%;position:absolute;top:0;bottom:0;right:0}.hero__img.__jsx-style-dynamic-selector{object-fit:contain;object-position:center;width:100%;height:100%;display:block}.hero__scrim.__jsx-style-dynamic-selector{pointer-events:none;background:linear-gradient(90deg,#0a0a09 0% 28%,#0a0a09db 40%,#0a0a0966 56%,#0a0a0900 72%);position:absolute;inset:0}.hero__inner.__jsx-style-dynamic-selector{padding:100px 34px;position:relative}.hero__eyebrow.__jsx-style-dynamic-selector{font-family:var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--green-bright);font-size:12px;display:inline-block}.hero__title.__jsx-style-dynamic-selector{font-family:var(--font-display);letter-spacing:-.03em;color:#fff;margin:20px 0 0;font-size:max(40px,min(5.4vw,68px));font-weight:600;line-height:1.06}.hero__accent.__jsx-style-dynamic-selector{color:var(--green-bright)}.hero__lead.__jsx-style-dynamic-selector{color:#ffffffc7;max-width:46ch;margin:22px 0 0;font-size:16px;line-height:1.62}.hero__actions.__jsx-style-dynamic-selector{flex-wrap:wrap;gap:14px;margin-top:34px;display:flex}.hero__btn.__jsx-style-dynamic-selector{border-radius:var(--radius-sm);border:1px solid #0000;align-items:center;gap:9px;padding:14px 24px;font-size:14.5px;font-weight:500;transition:background .16s,border-color .16s,color .16s;display:inline-flex}.hero__btn--primary.__jsx-style-dynamic-selector{background:var(--green-bright);color:#04120b}.hero__btn--primary.__jsx-style-dynamic-selector:hover{background:var(--green-hover)}.hero__btn--ghost.__jsx-style-dynamic-selector{color:#fff;background:0 0;border-color:#ffffff80}.hero__btn--ghost.__jsx-style-dynamic-selector:hover{background:#ffffff14;border-color:#fff}@media (width<=900px){.hero.__jsx-style-dynamic-selector{min-height:676px}.hero__media.__jsx-style-dynamic-selector{width:100%!important}.hero__scrim.__jsx-style-dynamic-selector{background:linear-gradient(#0a0a0959 0%,#0a0a09b8 42%,#0a0a09 78%)}.hero__inner.__jsx-style-dynamic-selector{padding:200px 18px 56px}.hero__lead.__jsx-style-dynamic-selector{font-size:15.5px}.hero__btn.__jsx-style-dynamic-selector{flex:auto;justify-content:center}}`}</JSXStyle>
    </section>
  );
}
let h = [
    {
      Icon: Icons.IconPhone,
      label: 'No rewiring',
      text: 'Swap wall switches and physical dimmers for app, wall-panel and voice control.',
    },
    {
      Icon: Icons.IconWifi,
      label: 'Alexa & Google Home',
      text: 'Everything in this range works with both, slotting into your existing smart home routines.',
    },
    {
      Icon: Icons.IconSliders,
      label: 'CCT or RGBW',
      text: 'Tuneable-white products shift warm to cool; full-colour products add scenes on top.',
    },
  ],
  m = [
    {
      Icon: Icons.IconPhone,
      title: 'App, panel and voice control',
      text: 'Dim, colour-change, schedule and group lights by room, all from your phone, without rewiring — a wall switch still works alongside it.',
    },
    {
      Icon: Icons.IconWifi,
      title: 'Works with your smart home',
      text: 'Everything in this range works with Amazon Alexa and Google Home, so lighting slots into voice routines and automations alongside the rest of a smart home.',
    },
    {
      Icon: Icons.IconSliders,
      title: 'Tuneable white or full colour',
      text: 'Tuneable-white (CCT) products shift between warm and cool white for the time of day, while full-colour (RGB/RGBW) products add colour scenes on top.',
    },
  ];
export default function Default() {
  let [e, p] = React.useState([]),
    [g, b] = React.useState(!0),
    [u, j] = React.useState(null),
    [_, y] = React.useState([]),
    [v, w] = React.useState(!0);
  (React.useEffect(() => {
    let e = !1;
    return (
      api
        .fetchStripLightProducts({
          id: api.SMART_LIFE_CATEGORY_ID,
          categoryLabel: 'Smart Life',
        })
        .then((a) => {
          e || p(a.filter((e) => 4 === e.visibility).reverse());
        })
        .catch((a) => {
          e || j(a.message);
        })
        .finally(() => {
          e || b(!1);
        }),
      () => {
        e = !0;
      }
    );
  }, []),
    React.useEffect(() => {
      let e = !1;
      return (
        (async () => {
          try {
            let a = await api.fetchCategory(api.SMART_LIFE_CATEGORY_ID),
              i = api.categoryChildren(a),
              s = await Promise.all(
                i.map(async (e) => {
                  let a = await api.fetchStripLightProducts({
                    id: e.id,
                    categoryLabel: 'Smart Life',
                  });
                  return {
                    id: `cat-${e.id}`,
                    label: e.name || `Category ${e.id}`,
                    products: a.filter((e) => 4 === e.visibility),
                  };
                }),
              );
            e || y(s);
          } catch {
          } finally {
            e || w(!1);
          }
        })(),
        () => {
          e = !0;
        }
      );
    }, []));
  let N = React.useMemo(() => withPinnedOrder.withPinnedOrder(e), [e]),
    k = React.useMemo(() => {
      let e = new Set();
      _.forEach((a) => a.products.forEach((a) => e.add(a.id)));
      let a = N.filter((a) => !e.has(a.id));
      return [
        ..._,
        ...(a.length
          ? [
              {
                id: 'more',
                label: 'More smart life products',
                products: a,
              },
            ]
          : []),
      ].map((e) => ({
        ...e,
        products: [...e.products].reverse(),
      }));
    }, [_, N]);
  return (
    <main className="jsx-7bcc1a320ca55763 home">
      <F />
      <section id="smart-life" className="jsx-7bcc1a320ca55763 range">
        <div className="jsx-7bcc1a320ca55763 container">
          <div className="jsx-7bcc1a320ca55763 range__head">
            <div className="jsx-7bcc1a320ca55763 range__copy">
              <span className="jsx-7bcc1a320ca55763 eyebrow">Featured · Smart Life</span>
              <h1 className="jsx-7bcc1a320ca55763 range__title">Find your perfect smart lighting</h1>
              <p className="jsx-7bcc1a320ca55763 range__sub">
                Browse the full Smart Life range below — Australian certified, Perth stock and support.
              </p>
            </div>
          </div>
          {!g && u && (
            <p className="jsx-7bcc1a320ca55763 range__status range__status--error">
              Couldn't load products right now. Please try again shortly.
            </p>
          )}
          {!u && (g || v) && (
            <div className="jsx-7bcc1a320ca55763 grid">
              <ProductCard2.ProductGridSkeleton count={8} />
            </div>
          )}
          {!u && !g && !v && <CatSections sections={k} renderCard={(e) => <ProductCard key={e.id} product={e} />} />}
        </div>
      </section>
      <section className="jsx-7bcc1a320ca55763 smart">
        <div className="jsx-7bcc1a320ca55763 container smart__inner">
          <div className="jsx-7bcc1a320ca55763 smart__copy">
            <span className="jsx-7bcc1a320ca55763 eyebrow eyebrow--light">Smart Life</span>
            <h2 className="jsx-7bcc1a320ca55763 smart__title">Your whole home, one tap away</h2>
            <p className="jsx-7bcc1a320ca55763 smart__sub">
              Greenhse smart lighting and automation lets you dim, schedule, group and voice-control every fitting — no
              rewiring, no hub headaches. Works with the lights you're already buying.
            </p>
            <ul className="jsx-7bcc1a320ca55763 smart__list">
              <li className="jsx-7bcc1a320ca55763">
                <Icons.IconSliders aria-hidden="true" />
                <span className="jsx-7bcc1a320ca55763">
                  <b className="jsx-7bcc1a320ca55763">Tune the light</b>
                  <p className="jsx-7bcc1a320ca55763">
                    Warm to cool white plus full RGB on smart downlights and strip.
                  </p>
                </span>
              </li>
              <li className="jsx-7bcc1a320ca55763">
                <Icons.IconClock aria-hidden="true" />
                <span className="jsx-7bcc1a320ca55763">
                  <b className="jsx-7bcc1a320ca55763">{'Schedules & scenes'}</b>
                  <p className="jsx-7bcc1a320ca55763">Sunrise wake-ups, away mode, one-tap "movie night".</p>
                </span>
              </li>
              <li className="jsx-7bcc1a320ca55763">
                <Icons.IconSparkle aria-hidden="true" />
                <span className="jsx-7bcc1a320ca55763">
                  <b className="jsx-7bcc1a320ca55763">{'Voice & app'}</b>
                  <p className="jsx-7bcc1a320ca55763">Alexa, Google Home and the Smart Life app, out of the box.</p>
                </span>
              </li>
            </ul>
            <a href="#smart-life" className="jsx-7bcc1a320ca55763 btn smart__cta">
              {'Shop smart lighting '}
              <span aria-hidden="true" className="jsx-7bcc1a320ca55763">
                →
              </span>
            </a>
          </div>
          <div aria-hidden="true" className="jsx-7bcc1a320ca55763 phone">
            <div className="jsx-7bcc1a320ca55763 phone__frame">
              <div className="jsx-7bcc1a320ca55763 phone__card">
                <span className="jsx-7bcc1a320ca55763 phone__room">Living room · Smart Life</span>
                <span className="jsx-7bcc1a320ca55763 phone__temp">2700K</span>
                <div className="jsx-7bcc1a320ca55763 phone__slider">
                  <span className="jsx-7bcc1a320ca55763 phone__slider-fill" />
                  <span className="jsx-7bcc1a320ca55763 phone__slider-handle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <VideosSection />
      <GuideSection
        eyebrow="Smart Life · Buying Guide"
        title="Smart Lighting Without the Rewiring"
        subtitle="App, wall-panel and voice control across your whole home — works with Amazon Alexa and Google Home out of the box."
        stats={h}
        cards={m}
        CalloutIcon={Icons.IconPhone}
        calloutText={
          <>
            Not sure what pairs with your existing setup? Call our Perth-based team on{' '}
            <a href="tel:+61892972969" className="jsx-7bcc1a320ca55763">
              (08) 9297 2969
            </a>{' '}
            and we'll help you plan it out.
          </>
        }
      />
      <JSXStyle id="7bcc1a320ca55763">
        {
          '.range.jsx-7bcc1a320ca55763{padding:20px 0 80px}.range__head.jsx-7bcc1a320ca55763{justify-content:space-between;align-items:flex-end;gap:40px;margin-bottom:34px;display:flex}.range__title.jsx-7bcc1a320ca55763{letter-spacing:-.03em;margin:2px 0 12px;font-size:max(30px,min(3.6vw,44px));font-weight:600;line-height:1.12}.range__sub.jsx-7bcc1a320ca55763{color:var(--ink-soft);margin:0;font-size:15px;line-height:1.6}.range__status.jsx-7bcc1a320ca55763{color:var(--ink-soft);padding:12px 0;font-size:14px}.range__status--error.jsx-7bcc1a320ca55763{color:#b3261e}.loading.jsx-7bcc1a320ca55763{flex-direction:column;justify-content:center;align-items:center;gap:18px;min-height:60vh;display:flex}.spinner.jsx-7bcc1a320ca55763{border:3px solid var(--line);border-top-color:var(--ink);border-radius:50%;width:40px;height:40px;animation:.8s linear infinite spin}.loading__text.jsx-7bcc1a320ca55763{color:var(--ink-soft);margin:0;font-size:14px}@keyframes spin{to{transform:rotate(360deg)}}.grid.jsx-7bcc1a320ca55763{grid-template-columns:repeat(4,1fr);gap:24px;display:grid}.eyebrow--light.jsx-7bcc1a320ca55763{color:var(--green-bright)}.smart.jsx-7bcc1a320ca55763{background:#060d0a;padding:88px 0}.smart__inner.jsx-7bcc1a320ca55763{grid-template-columns:1.1fr .9fr;align-items:center;gap:56px;display:grid}.smart__title.jsx-7bcc1a320ca55763{letter-spacing:-.03em;color:#fff;margin:10px 0 14px;font-size:max(28px,min(3.4vw,40px));font-weight:600;line-height:1.14}.smart__sub.jsx-7bcc1a320ca55763{color:#ffffffad;max-width:48ch;margin:0 0 28px;font-size:15px;line-height:1.62}.smart__list.jsx-7bcc1a320ca55763{flex-direction:column;margin:0 0 32px;padding:0;list-style:none;display:flex}.smart__list.jsx-7bcc1a320ca55763 li.jsx-7bcc1a320ca55763{border:1px solid #ffffff29;align-items:center;gap:16px;padding:16px 18px;display:flex}.smart__list.jsx-7bcc1a320ca55763 li.jsx-7bcc1a320ca55763 b.jsx-7bcc1a320ca55763{color:#fff;margin-bottom:4px;font-size:15px;font-weight:600;display:block}.smart__list.jsx-7bcc1a320ca55763 li.jsx-7bcc1a320ca55763 p.jsx-7bcc1a320ca55763{color:#ffffff9e;margin:0;font-size:13.5px;line-height:1.5}.smart__list.jsx-7bcc1a320ca55763 svg{color:#ffffffe6;flex:none;width:22px;height:22px}.smart__cta.jsx-7bcc1a320ca55763{background:var(--green-bright);color:#04120b}.smart__cta.jsx-7bcc1a320ca55763:hover{background:var(--green-hover)}.phone.jsx-7bcc1a320ca55763{justify-content:center;display:flex}.phone__frame.jsx-7bcc1a320ca55763{aspect-ratio:3/4;background:radial-gradient(60% 46% at 50% 32%,#ffc670 0%,#b8722b 32%,#4a2c10 62%,#100a05 100%);border:1px solid #ffffff1f;border-radius:30px;width:300px;height:500px;position:relative;overflow:hidden;box-shadow:0 40px 80px -30px #0009}.phone__card.jsx-7bcc1a320ca55763{-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);background:#060d0ab8;border:1px solid #ffffff1f;border-radius:16px;padding:16px 18px 18px;position:absolute;bottom:14px;left:14px;right:14px}.phone__room.jsx-7bcc1a320ca55763{font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:#ffffff8f;font-size:9.5px;display:block}.phone__temp.jsx-7bcc1a320ca55763{font-family:var(--font-mono);color:#fff;margin-top:6px;font-size:22px;display:block}.phone__slider.jsx-7bcc1a320ca55763{background:#fff;border-radius:999px;height:6px;margin-top:14px;position:relative}.phone__slider-fill.jsx-7bcc1a320ca55763{background:#060d0a59;border-radius:999px;position:absolute;inset:0 100% 0 0}.phone__slider-handle.jsx-7bcc1a320ca55763{background:#0096ff;border-radius:50%;width:14px;height:14px;position:absolute;top:50%;transform:translate(-50%,-50%);box-shadow:0 2px 6px #0006}@media (width<=1080px){.grid.jsx-7bcc1a320ca55763{grid-template-columns:repeat(2,1fr)}.smart__inner.jsx-7bcc1a320ca55763{grid-template-columns:1fr}.phone.jsx-7bcc1a320ca55763{order:-1}}@media (width<=860px){.range__head.jsx-7bcc1a320ca55763{flex-direction:column;align-items:flex-start;gap:24px}}@media (width<=560px){.grid.jsx-7bcc1a320ca55763{grid-template-columns:1fr}}'
        }
      </JSXStyle>
    </main>
  );
}
