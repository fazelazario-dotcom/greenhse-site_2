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
import * as downlightFinder from '../../lib/downlightFinder';
import * as asset from '../../lib/asset';
import * as Icons from '../../components/ui/Icons';
function G() {
  return (
    <section
      className={JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) + ' hero'}
    >
      <div
        aria-hidden="true"
        className={
          JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) + ' hero__scrim'
        }
      />
      <div
        className={
          JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) +
          ' container hero__inner'
        }
      >
        <span
          className={
            JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) + ' hero__eyebrow'
          }
        >
          Star Lights · Australian Certified · Perth, WA
        </span>
        <h1
          className={
            JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) + ' hero__title'
          }
        >
          Your own
          <br className={JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]])} />
          <span
            className={
              JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) + ' hero__accent'
            }
          >
            night sky
          </span>
        </h1>
        <p
          className={
            JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) + ' hero__lead'
          }
        >
          3mm LED starlight ceilings that turn a bedroom, home theatre or feature wall into a twinkling starfield —
          steady, twinkle or colour-changing effects included.
        </p>
        <div
          className={
            JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) + ' hero__actions'
          }
        >
          <a
            href="#star-lights"
            className={
              JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) +
              ' hero__btn hero__btn--primary'
            }
          >
            {'Shop Star Lights '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]])}
            >
              →
            </span>
          </a>
          <a
            href="/layout-app/"
            className={
              JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]]) +
              ' hero__btn hero__btn--ghost'
            }
          >
            {'Lighting Layout App '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['32bb7e508654aa0e', [asset.asset('/images/hero/star-hero.webp')]]])}
            >
              →
            </span>
          </a>
        </div>
      </div>
      <JSXStyle
        id="32bb7e508654aa0e"
        dynamic={[asset.asset('/images/hero/star-hero.webp')]}
      >{`.hero.__jsx-style-dynamic-selector{background-image:url(${asset.asset('/images/hero/star-hero.webp')});background-position:100%;background-repeat:no-repeat;background-size:cover;position:relative;overflow:hidden}.hero__media.__jsx-style-dynamic-selector{width:64%;position:absolute;top:0;bottom:0;right:0}.hero__img.__jsx-style-dynamic-selector{object-fit:contain;object-position:center;width:100%;height:100%;display:block}.hero__scrim.__jsx-style-dynamic-selector{pointer-events:none;background:linear-gradient(90deg,#0a0a09 0% 28%,#0a0a09db 40%,#0a0a0966 56%,#0a0a0900 72%);position:absolute;inset:0}.hero__inner.__jsx-style-dynamic-selector{padding:100px 34px;position:relative}.hero__eyebrow.__jsx-style-dynamic-selector{font-family:var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--green-bright);font-size:12px;display:inline-block}.hero__title.__jsx-style-dynamic-selector{font-family:var(--font-display);letter-spacing:-.03em;color:#fff;margin:20px 0 0;font-size:max(40px,min(5.4vw,68px));font-weight:600;line-height:1.06}.hero__accent.__jsx-style-dynamic-selector{color:var(--green-bright)}.hero__lead.__jsx-style-dynamic-selector{color:#ffffffc7;max-width:46ch;margin:22px 0 0;font-size:16px;line-height:1.62}.hero__actions.__jsx-style-dynamic-selector{flex-wrap:wrap;gap:14px;margin-top:34px;display:flex}.hero__btn.__jsx-style-dynamic-selector{border-radius:var(--radius-sm);border:1px solid #0000;align-items:center;gap:9px;padding:14px 24px;font-size:14.5px;font-weight:500;transition:background .16s,border-color .16s,color .16s;display:inline-flex}.hero__btn--primary.__jsx-style-dynamic-selector{background:var(--green-bright);color:#04120b}.hero__btn--primary.__jsx-style-dynamic-selector:hover{background:var(--green-hover)}.hero__btn--ghost.__jsx-style-dynamic-selector{color:#fff;background:0 0;border-color:#ffffff80}.hero__btn--ghost.__jsx-style-dynamic-selector:hover{background:#ffffff14;border-color:#fff}@media (width<=900px){.hero.__jsx-style-dynamic-selector{min-height:676px}.hero__media.__jsx-style-dynamic-selector{width:100%!important}.hero__scrim.__jsx-style-dynamic-selector{background:linear-gradient(#0a0a0959 0%,#0a0a09b8 42%,#0a0a09 78%)}.hero__inner.__jsx-style-dynamic-selector{padding:200px 18px 56px}.hero__lead.__jsx-style-dynamic-selector{font-size:15.5px}.hero__btn.__jsx-style-dynamic-selector{flex:auto;justify-content:center}}`}</JSXStyle>
    </section>
  );
}
let m = [
    {
      Icon: Icons.IconBolt,
      label: 'Low-voltage',
      text: 'Individual 3mm LED points wire back to a central driver — no mains wiring or meaningful heat at the star point.',
    },
    {
      Icon: Icons.IconSparkle,
      label: 'Sized to the ceiling',
      text: "Kit size is driven by how many LED points and how much ceiling area you're covering.",
    },
    {
      Icon: Icons.IconWifi,
      label: 'RGBW option',
      text: 'RGBW driver units add colour-changing and twinkle effects on top of a plain steady-white starfield.',
    },
  ],
  p = [
    {
      Icon: Icons.IconBolt,
      title: 'How a star ceiling wires up',
      text: 'A star light kit runs individual 3mm LED points on thin low-voltage wires back to a central driver/transformer, through the ceiling, so each end point appears as its own twinkling star.',
    },
    {
      Icon: Icons.IconSparkle,
      title: 'Sizing the kit',
      text: "Kit size is driven by how many LED points (stars) and how much ceiling area you're covering — larger rooms or denser starfields need a higher-output driver and more LED points.",
    },
    {
      Icon: Icons.IconWifi,
      title: 'Plan it into the build',
      text: "Most kits are installed during a ceiling fit-out, with wiring run above the ceiling lining before it's closed up — worth planning early in a build or renovation rather than retrofitting.",
    },
  ];
export default function Default() {
  let [e, h] = React.useState([]),
    [x, b] = React.useState(!0),
    [_, j] = React.useState(null),
    [w, y] = React.useState([]),
    [v, k] = React.useState(!0);
  (React.useEffect(() => {
    let e = !1;
    return (
      api
        .fetchStripLightProducts({
          id: api.STAR_LIGHTS_CATEGORY_ID,
          categoryLabel: 'Star Lights',
        })
        .then((t) => {
          e || h(t.filter((e) => 4 === e.visibility).reverse());
        })
        .catch((t) => {
          e || j(t.message);
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
            let t = await api.fetchCategory(api.STAR_LIGHTS_CATEGORY_ID),
              a = api.categoryChildren(t),
              i = await Promise.all(
                a.map(async (e) => {
                  let t = await api.fetchStripLightProducts({
                    id: e.id,
                    categoryLabel: 'Star Lights',
                  });
                  return {
                    id: `cat-${e.id}`,
                    label: e.name || `Category ${e.id}`,
                    products: t.filter((e) => 4 === e.visibility),
                  };
                }),
              );
            e || y(i);
          } catch {
          } finally {
            e || k(!1);
          }
        })(),
        () => {
          e = !0;
        }
      );
    }, []));
  let N = React.useMemo(() => withPinnedOrder.withPinnedOrder(e), [e]),
    S = React.useMemo(() => {
      let e = new Set();
      w.forEach((t) => t.products.forEach((t) => e.add(t.id)));
      let t = N.filter((t) => !e.has(t.id) && downlightFinder.dlIsStarFitting(t));
      return [
        ...w,
        ...(t.length
          ? [
              {
                id: 'more',
                label: 'More star lights',
                products: t,
              },
            ]
          : []),
      ].map((e) => ({
        ...e,
        products: [...e.products].reverse(),
      }));
    }, [w, N]);
  return (
    <main className="jsx-3ac0f3074f9c414a home">
      <G />
      <section id="star-lights" className="jsx-3ac0f3074f9c414a range">
        <div className="jsx-3ac0f3074f9c414a container">
          <div className="jsx-3ac0f3074f9c414a range__head">
            <div className="jsx-3ac0f3074f9c414a range__copy">
              <span className="jsx-3ac0f3074f9c414a eyebrow">Featured · Star Lights</span>
              <h1 className="jsx-3ac0f3074f9c414a range__title">Find your perfect star light kit</h1>
              <p className="jsx-3ac0f3074f9c414a range__sub">
                Browse the full star light range below — Australian certified, Perth stock and support.
              </p>
            </div>
          </div>
          {!x && _ && (
            <p className="jsx-3ac0f3074f9c414a range__status range__status--error">
              Couldn't load products right now. Please try again shortly.
            </p>
          )}
          {!_ && (x || v) && (
            <div className="jsx-3ac0f3074f9c414a grid">
              <ProductCard2.ProductGridSkeleton count={8} />
            </div>
          )}
          {!_ && !x && !v && <CatSections sections={S} renderCard={(e) => <ProductCard key={e.id} product={e} />} />}
        </div>
      </section>
      <VideosSection />
      <GuideSection
        eyebrow="Star Lights · Buying Guide"
        title="Star Ceilings for Bedrooms and Home Theatres"
        subtitle="Low-voltage 3mm LED points wired back to a central driver — steady white, tri-colour or full RGBW."
        stats={m}
        cards={p}
        CalloutIcon={Icons.IconPhone}
        calloutText={
          <>
            Planning a star ceiling for a bedroom or home theatre? Call our Perth-based team on{' '}
            <a href="tel:+61892972969" className="jsx-3ac0f3074f9c414a">
              (08) 9297 2969
            </a>{' '}
            and we'll help you size the kit.
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
