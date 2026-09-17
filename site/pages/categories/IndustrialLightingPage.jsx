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
      className={JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) + ' hero'}
    >
      <div
        aria-hidden="true"
        className={
          JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) + ' hero__scrim'
        }
      />
      <div
        className={
          JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) +
          ' container hero__inner'
        }
      >
        <span
          className={
            JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) +
            ' hero__eyebrow'
          }
        >
          Industrial Lighting · Australian Certified · Perth, WA
        </span>
        <h1
          className={
            JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) +
            ' hero__title'
          }
        >
          Built tough,
          <br
            className={JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]])}
          />
          <span
            className={
              JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) +
              ' hero__accent'
            }
          >
            runs longer
          </span>
        </h1>
        <p
          className={
            JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) + ' hero__lead'
          }
        >
          Vapor-tight and heavy-duty LED fittings for workshops, coolrooms and production floors — sealed against dust
          and moisture, made to keep working shift after shift.
        </p>
        <div
          className={
            JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) +
            ' hero__actions'
          }
        >
          <a
            href="#industrial"
            className={
              JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) +
              ' hero__btn hero__btn--primary'
            }
          >
            {'Shop Industrial Lighting '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]])}
            >
              →
            </span>
          </a>
          <a
            href="/layout-app/"
            className={
              JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]]) +
              ' hero__btn hero__btn--ghost'
            }
          >
            {'Lighting Layout App '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['920774409f4e9464', [asset.asset('/images/hero/industrial-hero.webp')]]])}
            >
              →
            </span>
          </a>
        </div>
      </div>
      <JSXStyle
        id="920774409f4e9464"
        dynamic={[asset.asset('/images/hero/industrial-hero.webp')]}
      >{`.hero.__jsx-style-dynamic-selector{background-image:url(${asset.asset('/images/hero/industrial-hero.webp')});background-position:100%;background-repeat:no-repeat;background-size:cover;position:relative;overflow:hidden}.hero__media.__jsx-style-dynamic-selector{width:64%;position:absolute;top:0;bottom:0;right:0}.hero__img.__jsx-style-dynamic-selector{object-fit:contain;object-position:center;width:100%;height:100%;display:block}.hero__scrim.__jsx-style-dynamic-selector{pointer-events:none;background:linear-gradient(90deg,#0a0a09 0% 28%,#0a0a09db 40%,#0a0a0966 56%,#0a0a0900 72%);position:absolute;inset:0}.hero__inner.__jsx-style-dynamic-selector{padding:100px 34px;position:relative}.hero__eyebrow.__jsx-style-dynamic-selector{font-family:var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--green-bright);font-size:12px;display:inline-block}.hero__title.__jsx-style-dynamic-selector{font-family:var(--font-display);letter-spacing:-.03em;color:#fff;margin:20px 0 0;font-size:max(40px,min(5.4vw,68px));font-weight:600;line-height:1.06}.hero__accent.__jsx-style-dynamic-selector{color:var(--green-bright)}.hero__lead.__jsx-style-dynamic-selector{color:#ffffffc7;max-width:46ch;margin:22px 0 0;font-size:16px;line-height:1.62}.hero__actions.__jsx-style-dynamic-selector{flex-wrap:wrap;gap:14px;margin-top:34px;display:flex}.hero__btn.__jsx-style-dynamic-selector{border-radius:var(--radius-sm);border:1px solid #0000;align-items:center;gap:9px;padding:14px 24px;font-size:14.5px;font-weight:500;transition:background .16s,border-color .16s,color .16s;display:inline-flex}.hero__btn--primary.__jsx-style-dynamic-selector{background:var(--green-bright);color:#04120b}.hero__btn--primary.__jsx-style-dynamic-selector:hover{background:var(--green-hover)}.hero__btn--ghost.__jsx-style-dynamic-selector{color:#fff;background:0 0;border-color:#ffffff80}.hero__btn--ghost.__jsx-style-dynamic-selector:hover{background:#ffffff14;border-color:#fff}@media (width<=900px){.hero.__jsx-style-dynamic-selector{min-height:676px}.hero__media.__jsx-style-dynamic-selector{width:100%!important}.hero__scrim.__jsx-style-dynamic-selector{background:linear-gradient(#0a0a0959 0%,#0a0a09b8 42%,#0a0a09 78%)}.hero__inner.__jsx-style-dynamic-selector{padding:200px 18px 56px}.hero__lead.__jsx-style-dynamic-selector{font-size:15.5px}.hero__btn.__jsx-style-dynamic-selector{flex:auto;justify-content:center}}`}</JSXStyle>
    </section>
  );
}
let p = [
    {
      Icon: Icons.IconIndustrial,
      label: 'Sealed & rated',
      text: 'Vapor-tight (IP65+) fixtures with gasket-sealed lenses handle dust and wash-down cleaning.',
    },
    {
      Icon: Icons.IconLeaf,
      label: 'Impact-resistant',
      text: 'Polycarbonate lenses hold up better than glass around moving equipment and forklifts.',
    },
    {
      Icon: Icons.IconEye,
      label: 'High CRI options',
      text: 'Higher CRI ratings are available where colour accuracy matters — quality control, food prep, print.',
    },
  ],
  x = [
    {
      Icon: Icons.IconIndustrial,
      title: 'Built for the environment',
      text: "Dust, moisture, wash-down cleaning, vibration and long duty cycles all shorten the life of a fitting that isn't built for it — this range covers the sealed, heavy-duty fittings made to handle it.",
    },
    {
      Icon: Icons.IconLeaf,
      title: 'Vapor-tight and impact-resistant',
      text: 'Vapor-tight (IP65+) fixtures with a gasket-sealed lens and toggle-clamp latches are the standard choice for coolrooms and wash-down areas, with polycarbonate lenses that hold up around forklifts.',
    },
    {
      Icon: Icons.IconSliders,
      title: 'Colour accuracy vs simple coverage',
      text: "Where colour accuracy matters, look for a higher CRI rating; where it's just about safe, reliable coverage, standard output fittings paired with a pushbutton or contactor control keep things simple.",
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
          id: api.INDUSTRIAL_CATEGORY_ID,
          categoryLabel: 'Industrial Lighting',
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
            let a = await api.fetchCategory(api.INDUSTRIAL_CATEGORY_ID),
              i = api.categoryChildren(a),
              t = await Promise.all(
                i.map(async (e) => {
                  let a = await api.fetchStripLightProducts({
                    id: e.id,
                    categoryLabel: 'Industrial Lighting',
                  });
                  return {
                    id: `cat-${e.id}`,
                    label: e.name || `Category ${e.id}`,
                    products: a.filter((e) => 4 === e.visibility),
                  };
                }),
              );
            e || y(t);
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
                label: 'More industrial lighting',
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
      <section id="industrial" className="jsx-3ac0f3074f9c414a range">
        <div className="jsx-3ac0f3074f9c414a container">
          <div className="jsx-3ac0f3074f9c414a range__head">
            <div className="jsx-3ac0f3074f9c414a range__copy">
              <span className="jsx-3ac0f3074f9c414a eyebrow">Featured · Industrial Lighting</span>
              <h1 className="jsx-3ac0f3074f9c414a range__title">Find your perfect industrial light</h1>
              <p className="jsx-3ac0f3074f9c414a range__sub">
                Browse the full industrial lighting range below — Australian certified, Perth stock and support.
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
        eyebrow="Industrial Lighting · Buying Guide"
        title="Heavy-Duty Lighting for Industrial Sites"
        subtitle="Sealed, impact-resistant fittings built for dust, moisture, wash-down cleaning and long duty cycles — not a commercial fitting pushed past its limits."
        stats={p}
        cards={x}
        CalloutIcon={Icons.IconPhone}
        calloutText={
          <>
            Not sure what rating or output your site needs? Call our Perth-based team on{' '}
            <a href="tel:+61892972969" className="jsx-3ac0f3074f9c414a">
              (08) 9297 2969
            </a>{' '}
            and we'll help you spec it.
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
