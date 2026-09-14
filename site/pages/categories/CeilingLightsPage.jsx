'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import ProductCard from '../../components/product/ProductCard';
import * as ProductCard2 from '../../components/product/ProductCard';
import CatSections from '../../components/catalog/CatSections';
import VideosSection from '../../components/catalog/VideosSection';
import GuideSection from '../../components/catalog/GuideSection';
import * as api from '../../lib/api';
import * as withPinnedOrder from '../../lib/withPinnedOrder';
import * as asset from '../../lib/asset';
import * as Icons from '../../components/ui/Icons';
function G() {
  return (
    <section
      className={JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) + ' hero'}
    >
      <div
        aria-hidden="true"
        className={
          JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) + ' hero__scrim'
        }
      />
      <div
        className={
          JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) +
          ' container hero__inner'
        }
      >
        <span
          className={
            JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) + ' hero__eyebrow'
          }
        >
          Ceiling · Panel · Oyster Lights · Australian Certified · Perth, WA
        </span>
        <h1
          className={
            JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) + ' hero__title'
          }
        >
          Everyday light,
          <br className={JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]])} />
          <span
            className={
              JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) + ' hero__accent'
            }
          >
            done properly
          </span>
        </h1>
        <p
          className={
            JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) + ' hero__lead'
          }
        >
          Flush-mount oyster lights and slimline panels for bedrooms, living areas and offices — clean, even coverage
          that goes up in minutes and dims to suit the moment.
        </p>
        <div
          className={
            JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) + ' hero__actions'
          }
        >
          <a
            href="#ceiling"
            className={
              JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) +
              ' hero__btn hero__btn--primary'
            }
          >
            {'Shop Ceiling & Oyster Lights '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]])}
            >
              →
            </span>
          </a>
          <a
            href="/layout-app/"
            className={
              JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]]) +
              ' hero__btn hero__btn--ghost'
            }
          >
            {'Lighting Layout App '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['c494be1e3e0f0c6', [asset.asset('/images/hero/ceiling-hero.webp')]]])}
            >
              →
            </span>
          </a>
        </div>
      </div>
      <JSXStyle
        id="c494be1e3e0f0c6"
        dynamic={[asset.asset('/images/hero/ceiling-hero.webp')]}
      >{`.hero.__jsx-style-dynamic-selector{background-image:url(${asset.asset('/images/hero/ceiling-hero.webp')});background-position:100%;background-repeat:no-repeat;background-size:cover;position:relative;overflow:hidden}.hero__media.__jsx-style-dynamic-selector{width:64%;position:absolute;top:0;bottom:0;right:0}.hero__img.__jsx-style-dynamic-selector{object-fit:contain;object-position:center;width:100%;height:100%;display:block}.hero__scrim.__jsx-style-dynamic-selector{pointer-events:none;background:linear-gradient(90deg,#0a0a09 0% 28%,#0a0a09db 40%,#0a0a0966 56%,#0a0a0900 72%);position:absolute;inset:0}.hero__inner.__jsx-style-dynamic-selector{padding:100px 34px;position:relative}.hero__eyebrow.__jsx-style-dynamic-selector{font-family:var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--green-bright);font-size:12px;display:inline-block}.hero__title.__jsx-style-dynamic-selector{font-family:var(--font-display);letter-spacing:-.03em;color:#fff;margin:20px 0 0;font-size:max(40px,min(5.4vw,68px));font-weight:600;line-height:1.06}.hero__accent.__jsx-style-dynamic-selector{color:var(--green-bright)}.hero__lead.__jsx-style-dynamic-selector{color:#ffffffc7;max-width:46ch;margin:22px 0 0;font-size:16px;line-height:1.62}.hero__actions.__jsx-style-dynamic-selector{flex-wrap:wrap;gap:14px;margin-top:34px;display:flex}.hero__btn.__jsx-style-dynamic-selector{border-radius:var(--radius-sm);border:1px solid #0000;align-items:center;gap:9px;padding:14px 24px;font-size:14.5px;font-weight:500;transition:background .16s,border-color .16s,color .16s;display:inline-flex}.hero__btn--primary.__jsx-style-dynamic-selector{background:var(--green-bright);color:#04120b}.hero__btn--primary.__jsx-style-dynamic-selector:hover{background:var(--green-hover)}.hero__btn--ghost.__jsx-style-dynamic-selector{color:#fff;background:0 0;border-color:#ffffff80}.hero__btn--ghost.__jsx-style-dynamic-selector:hover{background:#ffffff14;border-color:#fff}@media (width<=900px){.hero.__jsx-style-dynamic-selector{min-height:676px}.hero__media.__jsx-style-dynamic-selector{width:100%!important}.hero__scrim.__jsx-style-dynamic-selector{background:linear-gradient(#0a0a0959 0%,#0a0a09b8 42%,#0a0a09 78%)}.hero__inner.__jsx-style-dynamic-selector{padding:200px 18px 56px}.hero__lead.__jsx-style-dynamic-selector{font-size:15.5px}.hero__btn.__jsx-style-dynamic-selector{flex:auto;justify-content:center}}`}</JSXStyle>
    </section>
  );
}
let p = [
    {
      Icon: Icons.IconLayout,
      label: 'Flush mount',
      text: 'No recess or ceiling cavity needed — a single fixing point straight to a flat or raked ceiling.',
    },
    {
      Icon: Icons.IconHome,
      label: 'Broad coverage',
      text: 'Panel profiles spread light evenly across a wider area than a single downward point.',
    },
    {
      Icon: Icons.IconThermometer,
      label: 'Tuneable white',
      text: 'Switchable or tuneable colour temperature — warm through to daylight — from the one fitting.',
    },
  ],
  x = [
    {
      Icon: Icons.IconLayout,
      title: 'Oyster lights',
      text: 'The classic round or oval flush-mount fitting — the fastest way to light a bedroom, hallway or living area with no recess needed.',
    },
    {
      Icon: Icons.IconHome,
      title: 'Panel lights',
      text: 'A slim square or rectangular profile that spreads light more evenly across a wider area — a common choice for kitchens, offices and studies.',
    },
    {
      Icon: Icons.IconThermometer,
      title: 'Colour temperature',
      text: 'Most of the range offers switchable or tuneable colour temperature, so a single light suits both a cosy evening and a bright working afternoon.',
    },
  ];
export default function Default() {
  let [e, f] = React.useState([]),
    [m, u] = React.useState(!0),
    [b, _] = React.useState(null),
    [j, y] = React.useState([]),
    [v, w] = React.useState(!0);
  (React.useEffect(() => {
    let e = !1;
    return (
      api
        .fetchStripLightProducts({
          id: api.CEILING_CATEGORY_ID,
          categoryLabel: 'Ceiling / Panel / Oyster Lights',
        })
        .then((a) => {
          e || f(a.filter((e) => 4 === e.visibility).reverse());
        })
        .catch((a) => {
          e || _(a.message);
        })
        .finally(() => {
          e || u(!1);
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
            let a = await api.fetchCategory(api.CEILING_CATEGORY_ID),
              i = api.categoryChildren(a),
              s = await Promise.all(
                i.map(async (e) => {
                  let a = await api.fetchStripLightProducts({
                    id: e.id,
                    categoryLabel: 'Ceiling / Panel / Oyster Lights',
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
      j.forEach((a) => a.products.forEach((a) => e.add(a.id)));
      let a = N.filter((a) => !e.has(a.id));
      return [
        ...j,
        ...(a.length
          ? [
              {
                id: 'more',
                label: 'More ceiling & panel lights',
                products: a,
              },
            ]
          : []),
      ].map((e) => ({
        ...e,
        products: [...e.products].reverse(),
      }));
    }, [j, N]);
  return (
    <main className="jsx-3ac0f3074f9c414a home">
      <G />
      <section id="ceiling" className="jsx-3ac0f3074f9c414a range">
        <div className="jsx-3ac0f3074f9c414a container">
          <div className="jsx-3ac0f3074f9c414a range__head">
            <div className="jsx-3ac0f3074f9c414a range__copy">
              <span className="jsx-3ac0f3074f9c414a eyebrow">{'Featured · Ceiling, Panel & Oyster Lights'}</span>
              <h1 className="jsx-3ac0f3074f9c414a range__title">Find your perfect ceiling light</h1>
              <p className="jsx-3ac0f3074f9c414a range__sub">
                Browse the full ceiling, panel and oyster light range below — Australian certified, Perth stock and
                support.
              </p>
            </div>
          </div>
          {!m && b && (
            <p className="jsx-3ac0f3074f9c414a range__status range__status--error">
              Couldn't load products right now. Please try again shortly.
            </p>
          )}
          {!b && (m || v) && (
            <div className="jsx-3ac0f3074f9c414a grid">
              <ProductCard2.ProductGridSkeleton count={8} />
            </div>
          )}
          {!b && !m && !v && <CatSections sections={k} renderCard={(e) => <ProductCard key={e.id} product={e} />} />}
        </div>
      </section>
      <VideosSection />
      <GuideSection
        eyebrow="Ceiling, Panel & Oyster Lights · Buying Guide"
        title="Flush-Mount Lighting for Every Room"
        subtitle="Round oyster fittings and slim panels — no recess needed, and most of the range shifts colour temperature from warm to daylight."
        stats={p}
        cards={x}
        CalloutIcon={Icons.IconPhone}
        calloutText={
          <>
            Not sure which size or output suits your room? Call our Perth-based team on{' '}
            <a href="tel:+61892972969" className="jsx-3ac0f3074f9c414a">
              (08) 9297 2969
            </a>{' '}
            and we'll help you choose.
          </>
        }
      />
      <JSXStyle id="3ac0f3074f9c414a">
        {
          '.range.jsx-3ac0f3074f9c414a{padding:20px 0 80px}.range__head.jsx-3ac0f3074f9c414a{justify-content:space-between;align-items:flex-end;gap:40px;margin-bottom:34px;display:flex}.range__title.jsx-3ac0f3074f9c414a{letter-spacing:-.03em;margin:2px 0 12px;font-size:max(30px,min(3.6vw,44px));font-weight:600;line-height:1.12}.range__sub.jsx-3ac0f3074f9c414a{color:var(--ink-soft);margin:0;font-size:15px;line-height:1.6}.range__status.jsx-3ac0f3074f9c414a{color:var(--ink-soft);padding:12px 0;font-size:14px}.range__status--error.jsx-3ac0f3074f9c414a{color:#b3261e}.loading.jsx-3ac0f3074f9c414a{flex-direction:column;justify-content:center;align-items:center;gap:18px;min-height:60vh;display:flex}.spinner.jsx-3ac0f3074f9c414a{border:3px solid var(--line);border-top-color:var(--ink);border-radius:50%;width:40px;height:40px;animation:.8s linear infinite spin}.loading__text.jsx-3ac0f3074f9c414a{color:var(--ink-soft);margin:0;font-size:14px}@keyframes spin{to{transform:rotate(360deg)}}.grid.jsx-3ac0f3074f9c414a{grid-template-columns:repeat(4,1fr);gap:24px;display:grid}@media (width<=1080px){.grid.jsx-3ac0f3074f9c414a{grid-template-columns:repeat(2,1fr)}}@media (width<=860px){.range__head.jsx-3ac0f3074f9c414a{flex-direction:column;align-items:flex-start;gap:24px}}@media (width<=560px){.grid.jsx-3ac0f3074f9c414a{grid-template-columns:1fr}}'
        }
      </JSXStyle>
    </main>
  );
}
