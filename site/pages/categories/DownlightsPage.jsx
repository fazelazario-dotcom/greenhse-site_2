'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import ProductCard from '../../components/product/ProductCard';
import * as ProductCard2 from '../../components/product/ProductCard';
import CatSections from '../../components/catalog/CatSections';
import VideosSection from '../../components/catalog/VideosSection';
import * as navigation from 'next/navigation';
import { useDispatch } from 'react-redux';
import ProductVisual from '../../components/product/ProductVisual';
import OptionsPopup from '../../components/product/OptionsPopup';
import * as Icons from '../../components/ui/Icons';
import * as api from '../../lib/api';
import * as asset from '../../lib/asset';
import * as cartSlice from '../../store/cartSlice';
import * as productsApi from '../../lib/productsApi';
import * as OptionsPopup2 from '../../components/product/OptionsPopup';
import * as api2 from '../../lib/api';
import * as downlightFinder from '../../lib/downlightFinder';
import GuideSection from '../../components/catalog/GuideSection';
import * as withPinnedOrder from '../../lib/withPinnedOrder';
let y = {
    3200: '#ffb457',
    4e3: '#ffdca3',
    5e3: '#fff3d6',
    6e3: '#eaf2ff',
    blue: '#3b82f6',
    rgbw: 'linear-gradient(90deg,#ff5b5b,#ffd25b,#5bff8f,#5bc8ff,#a15bff)',
  },
  w = [
    {
      key: '30',
      mm: 30,
      lm: 280,
    },
    {
      key: '70',
      mm: 70,
      lm: 650,
    },
    {
      key: '90',
      mm: 90,
      lm: 1e3,
    },
    {
      key: '110',
      mm: 110,
      lm: 1200,
    },
  ],
  v = '#15170F',
  k = '#9b9d8e';
function _({ active: e }) {
  let a = 30 + 2 * Math.max(...w.map((e) => (0.72 * e.mm) / 2)),
    r = 14,
    s = w.map((t) => {
      let s = (0.72 * t.mm) / 2,
        i = r + s,
        l = e && 'unsure' !== e && e === t.key;
      return (
        (r += 2 * s + 22),
        {
          ...t,
          r: s,
          cx: i,
          cy: a - s,
          on: l,
        }
      );
    }),
    i = r - 22 + 14;
  return (
    <figure className="dl-cutfig">
      <svg viewBox={`0 0 ${i.toFixed(0)} ${a + 40}`} role="img" aria-label="Downlight cut-out sizes drawn to scale">
        {s.map((e) => (
          <g key={e.key}>
            <circle
              cx={e.cx.toFixed(1)}
              cy={e.cy.toFixed(1)}
              r={e.r.toFixed(1)}
              fill={e.on ? '#F2C230' : '#ffffff'}
              fillOpacity={e.on ? 0.55 : 1}
              stroke={e.on ? v : k}
              strokeWidth={e.on ? 2.4 : 1.3}
            />
            <text
              x={e.cx.toFixed(1)}
              y={(e.cy - e.r - 9).toFixed(1)}
              fontSize="11.5"
              textAnchor="middle"
              fill={e.on ? v : '#5d6151'}
              fontWeight="700"
            >
              {e.lm}
              {' lm'}
            </text>
            <text
              x={e.cx.toFixed(1)}
              y={a + 15}
              fontSize="10"
              textAnchor="middle"
              fill={e.on ? v : '#6b6e5f'}
              fontWeight={e.on ? '700' : '400'}
            >
              {e.mm}
              {' mm'}
            </text>
          </g>
        ))}
        <text x={14} y={a + 32} fontSize="9.5" fill={k}>
          CUT-OUT DIAMETER IN MILLIMETRES — DRAWN TO SCALE
        </text>
      </svg>
      <figcaption>
        <b>Measure the hole, not the fitting.</b>
        {
          ' The cut-out is the opening in the plasterboard. Hold a tape across the middle of an existing hole — edge to edge. Most Perth homes are 90mm.'
        }
      </figcaption>
    </figure>
  );
}
function N() {
  return (
    <div className="dl-glare">
      <figure className="dl-photo dl-photo-sm">
        <img
          src={asset.asset('/images/finder/dl-glare-photo.webp')}
          alt="The same living room lit with a low glare downlight and with a normal downlight"
          loading="lazy"
        />
        <figcaption>
          {
            'Same room, same time of day, same sofa. The only thing that changed is the fitting. On the left you see the '
          }
          <b>light</b>
          {'; on the right you see the '}
          <b>globe</b>.
        </figcaption>
      </figure>
      <div className="dl-glare-pair">
        <figure>
          <img src={asset.asset('/images/finder/dl-beam-std.svg')} alt="Standard, 110 degree beam, source in view" />
        </figure>
        <figure>
          <img src={asset.asset('/images/finder/dl-beam-low.svg')} alt="Low glare, 60 degree beam, source hidden" />
        </figure>
      </div>
      <div className="dl-glare-facts">
        <div>
          <dt>Pool width</dt>
          <dd>2.9× the drop</dd>
          <dd className="alt">1.2× the drop</dd>
        </div>
        <div>
          <dt>Fittings for 20 m²</dt>
          <dd>4–5</dd>
          <dd className="alt">8–10</dd>
        </div>
        <div>
          <dt>Source visible</dt>
          <dd>Yes, from most angles</dd>
          <dd className="alt">No, set behind a baffle</dd>
        </div>
        <div>
          <dt>Under a fan</dt>
          <dd>Flicker risk</dd>
          <dd className="alt">Steady</dd>
        </div>
      </div>
      <p className="dl-glare-cap">
        {'The beam angle is the whole difference. '}
        <b>Standard</b>
        {
          ' throws wide from a lamp sitting at the ceiling face — fewer fittings, but the chip is in view wherever you stand.'
        }{' '}
        <b>Low glare</b>
        {
          ' sets the lamp back behind a dark baffle and narrows the cone, so the ceiling reads calm and nothing catches your eye — at the cost of roughly twice as many fittings.'
        }
      </p>
      <h4 className="dl-glare-sub">With a ceiling fan in the room</h4>
      <div className="dl-glare-pair">
        <figure>
          <img
            src={asset.asset('/images/finder/dl-fan-std.svg')}
            alt="Standard downlights with a ceiling fan — blades cut the light"
          />
        </figure>
        <figure>
          <img
            src={asset.asset('/images/finder/dl-fan-low.svg')}
            alt="Low glare downlights with a ceiling fan — blades miss the light"
          />
        </figure>
      </div>
      <p className="dl-glare-cap">
        Looking down at the ceiling. What decides flicker is how wide the beam still is{' '}
        <b>where the blades actually are</b>
        {
          ' — about 350mm below the ceiling, not down at the floor. A 110° beam is a metre wide by then, so it reaches inside the blade circle and every blade that passes cuts it. A 60° beam is only 400mm wide there and lands outside the blades entirely.'
        }
      </p>
    </div>
  );
}
function ZC({ product: e, tags: a, primary: r, onAdd: s }) {
  let i = downlightFinder.dlLum(e);
  return (
    <div className={`dl-rec${r ? ' dl-rec--primary' : ''}`}>
      <div className="dl-rec__top">
        <span className="dl-rec__media">
          <ProductVisual product={e} fit="cross" />
        </span>
        <div className="dl-rec__id">
          <span className="dl-rec__name">{e.name}</span>
          <div className="dl-tags">{a}</div>
          {i && <span className="dl-rec__lum">{i}</span>}
          <span className="dl-rec__price">
            <strong>{api.formatPrice(e.price)}</strong>{' '}
            <small>
              {'ex-GST each · '}
              {api.formatPrice(api.incGst(e.price))}
              {' inc'}
            </small>
          </span>
        </div>
      </div>
      {s && (
        <button type="button" className="dl-rec__add" onClick={s}>
          Add to cart →
        </button>
      )}
    </div>
  );
}
function S({ product: e }) {
  let a = downlightFinder.dlCut(e),
    r = downlightFinder.dlBeam(e),
    s = downlightFinder.dlIP(e),
    i = [
      ['Cut-out', a ? a.txt : null],
      ['Beam angle', null != r ? `${r}\xb0 (${r < 90 ? 'low glare' : 'standard'})` : null],
      ['Brightness', downlightFinder.dlLum(e)],
      ['Power', downlightFinder.dlWatt(e)],
      ['Dimming', downlightFinder.dlDim(e)],
      ['Weather', null != s ? `IP${s}${s >= 65 ? ' — wet areas OK' : ' — indoor / sheltered'}` : null],
      ['Colours', downlightFinder.dlSpecValue(e, 'Light Output Colour')],
      ['Lifespan', downlightFinder.dlSpecValue(e, 'Lifespan')],
    ];
  return (
    <div className="dl-specs">
      <h4 className="dl-specs-h">The numbers on this fitting</h4>
      {i.map(([e, a]) => (
        <div key={e} className="dl-spec-row">
          <span>{e}</span>
          <b>{a || <em className="dl-spec-miss">not published — ask us</em>}</b>
        </div>
      ))}
    </div>
  );
}
function C({ qty: e, setQty: a, autoQty: r, answers: s, back: i }) {
  let l = s.size && 'skip' !== s.size;
  if (l && null != r) {
    let [i, l] = s.size.split('x');
    return (
      <div className="dl-qty">
        <h4>How many you need</h4>
        <div className="dl-qty-row">
          <button type="button" onClick={() => a((e) => Math.max(1, e - 1))}>
            −
          </button>
          <span className="dl-qty__n">{e}</span>
          <button type="button" onClick={() => a((e) => e + 1)}>
            +
          </button>
          <span className="dl-qty__lbl">
            {'downlights for a '}
            {i}
            {'m × '}
            {l}m room
            {e !== r && (
              <em>
                {' (we suggested '}
                {r})
              </em>
            )}
          </span>
        </div>
      </div>
    );
  }
  if (l && null == r) {
    let [r, i] = s.size.split('x');
    return (
      <div className="dl-qty">
        <h4>How many</h4>
        <p
          className="dl-qty-src"
          style={{
            margin: '0 0 12px',
          }}
        >
          {r}
          {'m × '}
          {i}m is past our on-site sizing table. Call <a href="tel:+61892972969">(08) 9297 2969</a>
          {' or use the'}{' '}
          <a href="/layout-app/">
            layout planner
          </a>{' '}
          and we'll set out the grid properly.
        </p>
        <div className="dl-qty-row">
          <button type="button" onClick={() => a((e) => Math.max(1, e - 1))}>
            −
          </button>
          <span className="dl-qty__n">{e}</span>
          <button type="button" onClick={() => a((e) => e + 1)}>
            +
          </button>
          <span className="dl-qty__lbl">fittings — set it yourself for now</span>
        </div>
      </div>
    );
  }
  return (
    <div className="dl-qty">
      <h4>How many</h4>
      <div className="dl-qty-row">
        <button type="button" onClick={() => a((e) => Math.max(1, e - 1))}>
          −
        </button>
        <span className="dl-qty__n">{e}</span>
        <button type="button" onClick={() => a((e) => e + 1)}>
          +
        </button>
        <span className="dl-qty__lbl">fittings</span>
      </div>
      <p className="dl-qty-src">
        Tell us the room size and we'll work the count out for you —{' '}
        <button
          type="button"
          className="dl-restart"
          style={{
            display: 'inline',
          }}
          onClick={i}
        >
          go back a step
        </button>
        .
      </p>
    </div>
  );
}
function T({ product: e, qty: a, addToCart: r }) {
  let s = e.price * a,
    i = api.incGst(s);
  return (
    <div className="dl-price-block">
      <h4>Your price</h4>
      <div className="dl-price-row">
        <span>{e.name}</span>
        <b>
          {api.formatPrice(e.price)}
          {' ex'}
        </b>
      </div>
      <div className="dl-price-row">
        <span>Quantity</span>
        <b>
          {'× '}
          {a}
        </b>
      </div>
      <div className="dl-price-row">
        <span>Subtotal ex-GST</span>
        <b>{api.formatPrice(s)}</b>
      </div>
      <div className="dl-price-row">
        <span>GST 10%</span>
        <b>{api.formatPrice(i - s)}</b>
      </div>
      <div className="dl-price-row dl-price-row--total">
        <span>Total inc GST</span>
        <b>{api.formatPrice(i)}</b>
      </div>
      <p className="dl-price-gst">
        Fittings only. Installation must be done by a licensed electrician — we can put you in touch with one.
      </p>
      <button type="button" className="dl-rec__add" onClick={() => r(e, a)}>
        {'Add '}
        {a}
        {' to the cart — '}
        {api.formatPrice(i)}
        {' inc GST'}
      </button>
    </div>
  );
}
function I() {
  return (
    <div className="dl-star">
      <p className="eyebrow">30mm · Star lights</p>
      <h3>For features, walls and bathrooms</h3>
      <p className="dl-star-lede">
        {'Star lights are not room lighting. They pick out a '}
        <b>feature</b>
        {', wash a '}
        <b>wall</b>
        {', or sit in a '}
        <b>bathroom</b>
        {
          ' ceiling where a big fitting would look wrong. One 3W head, 280 lumens, into a 30mm hole. You would not light a lounge with them — you would light the thing in the lounge worth looking at.'
        }
      </p>
      <h4 className="dl-star-sub">The three places they earn their money</h4>
      <div className="dl-star-uses">
        <div>
          <b>Features</b>
          <em>
            A run above a bar, in a bulkhead, or over a stair. Small enough that you see the light, not the fitting.
          </em>
        </div>
        <div>
          <b>Walls</b>
          <em>A line 300mm off the wall turns plaster or stone into the feature. This is where they look best.</em>
        </div>
        <div>
          <b>Bathrooms</b>
          <em>Around a mirror or over a niche, where a 90mm downlight is too much fitting for the ceiling.</em>
        </div>
      </div>
      <h4 className="dl-star-sub">Wiring — the part people get wrong</h4>
      <p className="dl-star-lede">
        {'They run on '}
        <b>12V</b>
        {' from a transformer, not off mains. Each head plugs into a T-piece and the heads sit about '}
        <b>1m apart</b>
        {' along the cable.'}
      </p>
      <p className="dl-star-rule">
        <b>The hard limit: 6 lights per cable.</b>
        {' Want more than six? You run a second cable back to the same controller — you do not extend the first one.'}
      </p>
      <h4 className="dl-star-sub">Pick the transformer by how many lights</h4>
      <table className="dl-star-tbl">
        <tbody>
          <tr>
            <th>12V 20W</th>
            <td>
              {'1 line of 6 — '}
              <b>up to 6 lights</b>
            </td>
            <td className="p">$22 +GST</td>
          </tr>
          <tr>
            <th>12V 40W</th>
            <td>
              {'2 lines of 6 — '}
              <b>up to 12 lights</b>
            </td>
            <td className="p">$35 +GST</td>
          </tr>
          <tr>
            <th>12V 75W</th>
            <td>
              {'Up to 4 lines — '}
              <b>rated to 18 lights</b>
            </td>
            <td className="p">$60 +GST</td>
          </tr>
          <tr>
            <th>T-piece + head</th>
            <td>One per light, roughly 1m apart</td>
            <td className="p">$16 +GST</td>
          </tr>
        </tbody>
      </table>
      <p className="dl-star-note">
        All three transformers are IP20, so they go somewhere dry — in the roof space or a cupboard, not in the bathroom
        itself.
      </p>
      <h4 className="dl-star-sub">Controller and remote</h4>
      <table className="dl-star-tbl">
        <tbody>
          <tr>
            <th>3-in-1 controller</th>
            <td>Colour and dimming from a remote</td>
            <td className="p">$15 +GST</td>
          </tr>
          <tr>
            <th>3-in-1 SMART controller</th>
            <td>Same, plus phone control, timers and schedules through Tuya or Smart Life</td>
            <td className="p">$25 +GST</td>
          </tr>
          <tr>
            <th>RGB+CCT remote</th>
            <td>Handset, one zone</td>
            <td className="p">$17 +GST</td>
          </tr>
          <tr>
            <th>4-zone remote, RGB+CCT</th>
            <td>Wall panel in black or white, runs four zones</td>
            <td className="p">$35 +GST</td>
          </tr>
        </tbody>
      </table>
      <div className="dl-star-warn">
        <b>For your electrician</b>
        <p>
          {'Input is '}
          <b>V+ red, V− black</b>. Wire it backwards and the controller fails, and that is not covered by warranty.
          Output is black V+, red R, green G, blue B, white W. SET has to be selected so the controller shows a green
          indicator light.
        </p>
      </div>
    </div>
  );
}
function L() {
  return (
    <svg viewBox="0 0 160 104" role="img" aria-label="Garage lit with a batten">
      <rect width="160" height="104" fill="#faf9f4" />
      <rect x="0" y="0" width="160" height="12" fill="#15170f" />
      <rect x="34" y="14" width="92" height="6" rx="3" fill="#f2c230" />
      <path d="M34 20 L14 92 H146 L126 20 Z" fill="#f2c230" opacity="0.26" />
      <rect x="10" y="30" width="60" height="62" fill="#fff" stroke="#15170f" strokeWidth="1.4" />
      <line x1="10" y1="44" x2="70" y2="44" stroke="#c9c6b8" />
      <line x1="10" y1="58" x2="70" y2="58" stroke="#c9c6b8" />
      <line x1="10" y1="72" x2="70" y2="72" stroke="#c9c6b8" />
      <rect x="86" y="64" width="60" height="5" fill="#15170f" />
      <line x1="92" y1="69" x2="92" y2="92" stroke="#15170f" strokeWidth="1.5" />
      <line x1="140" y1="69" x2="140" y2="92" stroke="#15170f" strokeWidth="1.5" />
      <line x1="0" y1="92" x2="160" y2="92" stroke="#c9c6b8" strokeWidth="1.6" />
    </svg>
  );
}
function QC({ product: e, loading: a, back: r, restart: s, addToCart: i }) {
  return (
    <div className="dl-result">
      <button type="button" className="link-back" onClick={r}>
        ← Back to the downlights
      </button>
      <span className="prog">✓ A better answer than downlights</span>
      <h2>For a garage or laundry, use a batten</h2>
      <div className="dl-scene">
        <L />
      </div>
      <p className="sw-hint">
        A grid of downlights in a garage leaves shadows exactly where you're working. One 1.2m batten throws a long even
        band of light across the whole bay — it's cheaper, brighter and it's what our team fits every time.
      </p>
      {a ? (
        <p className="dl-summary">Finding it…</p>
      ) : e ? (
        <>
          <ZC product={e} />
          <p className="dl-batten-where">One per bay for a single garage, two for a double.</p>
          <button type="button" className="dl-rec__add" onClick={() => i(e, 1)}>
            {'Add one batten to the cart — '}
            {api.formatPrice(api.incGst(e.price))}
            {' inc GST'}
          </button>
        </>
      ) : (
        <div className="callus">
          We don't have battens loaded right now — give us a call on <a href="tel:+61892972969">(08) 9297 2969</a>.
        </div>
      )}
      <button type="button" className="dl-restart" onClick={s}>
        ← Start the finder again
      </button>
    </div>
  );
}
function P({ open: e, onClose: s }) {
  let i = useDispatch(),
    l = navigation.useRouter(),
    [n, c] = React.useState([]),
    [x, m] = React.useState([]),
    [w, v] = React.useState(!0),
    [k, z] = React.useState({}),
    [S, C] = React.useState(0),
    [T, I] = React.useState(''),
    [L, A] = React.useState(''),
    [E, D] = React.useState(1),
    [F, B] = React.useState(null),
    [O, R] = React.useState(null),
    [$, M] = React.useState(!1),
    [H, Q] = React.useState(null),
    [K, Y] = React.useState(null),
    [V, U] = React.useState(null),
    [Z, J] = React.useState(!1),
    [X, ee] = React.useState(null),
    [et, ea] = React.useState(!1);
  if (
    (React.useEffect(() => {
      e && (C(0), z({}), I(''), A(''), D(1), B(null), J(!1));
    }, [e]),
    React.useEffect(() => {
      if (!Z || X) return;
      let e = !1;
      return (
        ea(!0),
        api2
          .fetchStripLightProducts({
            id: api2.BATTEN_CATEGORY_ID,
            categoryLabel: 'Battens',
          })
          .then((t) => {
            e ||
              ee(
                t.find((e) => e.sku?.toLowerCase() === 't40-cct-batten-pro') ||
                  t.find((e) => /1\.2m.*40w.*batten/i.test(e.name)) ||
                  null,
              );
          })
          .catch(() => {
            e || ee(null);
          })
          .finally(() => {
            e || ea(!1);
          }),
        () => {
          e = !0;
        }
      );
    }, [Z, X]),
    React.useEffect(() => {
      if (!e) return;
      let t = !1;
      return (
        v(!0),
        api2
          .fetchStripLightProducts({
            id: api2.DOWNLIGHTS_CATEGORY_ID,
            categoryLabel: 'Downlights',
          })
          .then((e) => {
            t || c(e.filter((e) => 4 === e.visibility));
          })
          .catch(() => {
            t || c([]);
          })
          .finally(() => {
            t || v(!1);
          }),
        () => {
          t = !0;
        }
      );
    }, [e]),
    React.useEffect(() => {
      if ('30' !== k.cut || x.length) return;
      let e = !1;
      return (
        api2
          .fetchStripLightProducts({
            id: api2.STAR_LIGHTS_CATEGORY_ID,
            categoryLabel: 'Star Lights',
          })
          .then((t) => {
            e || m(t.filter((e) => 4 === e.visibility));
          })
          .catch(() => {
            e || m([]);
          }),
        () => {
          e = !0;
        }
      );
    }, [k.cut, x.length]),
    React.useEffect(() => {
      if (!n.length || !k.cut || '30' === k.cut || '110' === k.cut) return void U((e) => (e ? null : e));
      if (k.colour) return;
      let e = downlightFinder.dlColourOptsFor(n, k);
      if (e.length > 1) return void U((e) => (e ? null : e));
      let t = e[0]?.[1] || 'tri';
      (z((e) =>
        e.colour
          ? e
          : {
              ...e,
              colour: t,
            },
      ),
        U(
          'tri' === t
            ? "RGBW and phone control are only made in 90mm (and one 160mm fitting), so at this size it's tricolour — warm, natural or cool, switched at install."
            : null,
        ));
    }, [k.cut, k.glare, k.colour, n]),
    React.useEffect(() => {
      if (e) return (document.addEventListener('keydown', t), () => document.removeEventListener('keydown', t));
      function t(e) {
        'Escape' === e.key && s();
      }
    }, [e, s]),
    !e)
  )
    return null;
  let er = downlightFinder.visibleDlQuestions(k, n),
    es = S >= er.length,
    ei = er[S],
    el = (e) => ('function' == typeof e.hint ? e.hint(k) : e.hint);
  function en() {
    Z ? J(!1) : C((e) => Math.max(0, e - 1));
  }
  function eo() {
    (z({}), C(0), I(''), A(''), D(1), B(null), J(!1));
  }
  async function ed(e, t) {
    Y(null);
    let a = await productsApi.getProductBySku(e.sku).catch(() => null),
      r = a?.options || [];
    if (OptionsPopup2.hasRequiredOptions(r))
      return void R({
        product: e,
        qty: t,
        rawOptions: r,
      });
    try {
      (await i(
        cartSlice.addItem({
          ...e,
          quantity: t,
        }),
      ).unwrap(),
        s(),
        l.push('/cart'));
    } catch (e) {
      Y(e.message || "Couldn't add this to your cart.");
    }
  }
  async function ec({ qty: e, customOptions: t }) {
    if (O) {
      (M(!0), Q(null));
      try {
        (await i(
          cartSlice.addItem({
            ...O.product,
            quantity: e,
            customOptions: t,
          }),
        ).unwrap(),
          R(null),
          s(),
          l.push('/cart'));
      } catch (e) {
        Q(e.message || "Couldn't add this to your cart.");
      } finally {
        M(!1);
      }
    }
  }
  let eh = '30' === k.cut;
  return (
    <div role="dialog" aria-modal="true" aria-label="Downlight finder" className="jsx-295a12219cad25e3 overlay">
      <div onClick={(e) => e.stopPropagation()} className="jsx-295a12219cad25e3 sheet">
        <header className="jsx-295a12219cad25e3 sheet__bar">
          <span className="jsx-295a12219cad25e3 sheet__label">◈ Downlight finder</span>
          <button type="button" onClick={s} aria-label="Close" className="jsx-295a12219cad25e3 sheet__close">
            <Icons.IconClose />
          </button>
        </header>
        <div className="jsx-295a12219cad25e3 sheet__body">
          {Z ? (
            <QC product={X} loading={et} back={en} restart={eo} addToCart={ed} />
          ) : es ? (
            eh ? (
              <W answers={k} starProducts={x} qty={E} setQty={D} back={en} restart={eo} addToCart={ed} />
            ) : (
              <G
                answers={k}
                products={n}
                loading={w}
                qty={E}
                setQty={D}
                autoQty={F}
                colourAutoNote={V}
                back={en}
                restart={eo}
                addToCart={ed}
              />
            )
          ) : (
            <>
              {S > 0 && (
                <button type="button" onClick={en} className="jsx-295a12219cad25e3 link-back">
                  ← Back
                </button>
              )}
              <span className="jsx-295a12219cad25e3 prog">
                {'Question '}
                {S + 1}
                {' of '}
                {er.length}
              </span>
              <h2 className="jsx-295a12219cad25e3">{ei.q}</h2>
              {el(ei) && <p className="jsx-295a12219cad25e3 sw-hint">{el(ei)}</p>}
              {'cut' === ei.key && <_ active={k.cut} />}
              {'glare' === ei.key && <N />}
              {ei.size ? (
                <div className="jsx-295a12219cad25e3 dl-size">
                  <div className="jsx-295a12219cad25e3 dl-size__row">
                    <input
                      type="number"
                      min="1"
                      step="0.1"
                      inputMode="decimal"
                      placeholder="Width, m"
                      value={T}
                      onChange={(e) => I(e.target.value)}
                      aria-label="Room width in metres"
                      className="jsx-295a12219cad25e3"
                    />
                    <span aria-hidden="true" className="jsx-295a12219cad25e3">
                      ×
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="0.1"
                      inputMode="decimal"
                      placeholder="Length, m"
                      value={L}
                      onChange={(e) => A(e.target.value)}
                      aria-label="Room length in metres"
                      className="jsx-295a12219cad25e3"
                    />
                    <span className="jsx-295a12219cad25e3 len__unit">metres</span>
                    <button
                      type="button"
                      onClick={function () {
                        let e = !0 === downlightFinder.dlWantLow(k),
                          t = downlightFinder.estimateDownlightCount(T, L, e);
                        (z((e) => ({
                          ...e,
                          size: `${T}x${L}`,
                        })),
                          null != t && (B(t), D(t)),
                          C((e) => e + 1));
                      }}
                      disabled={!T || !L}
                      className="jsx-295a12219cad25e3 len__go"
                    >
                      Continue →
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={function () {
                      (z((e) => ({
                        ...e,
                        size: 'skip',
                      })),
                        C((e) => e + 1));
                    }}
                    className="jsx-295a12219cad25e3 dl-size__skip"
                  >
                    Skip — I'll set the quantity myself
                  </button>
                  <button
                    type="button"
                    onClick={function () {
                      J(!0);
                    }}
                    className="jsx-295a12219cad25e3 dl-size__skip"
                  >
                    It's a garage or workshop — show me battens instead →
                  </button>
                </div>
              ) : (
                <div className="jsx-295a12219cad25e3 options">
                  {('function' == typeof ei.opts ? ei.opts(k) : ei.opts).map(([e, a]) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        var e;
                        let t, r;
                        return (
                          (e = ei.key),
                          (t = downlightFinder.DOWNLIGHT_Q.findIndex((t) => t.key === e)),
                          (r = downlightFinder.DOWNLIGHT_Q.slice(t + 1).map((e) => e.key)),
                          void (z((t) => {
                            let s = {
                              ...t,
                              [e]: a,
                            };
                            return (r.forEach((e) => delete s[e]), s);
                          }),
                          r.includes('size') && (I(''), A(''), B(null)),
                          C((e) => e + 1))
                        );
                      }}
                      className="jsx-295a12219cad25e3 option"
                    >
                      {'starcol' === ei.key && (
                        <span
                          style={{
                            background: y[a],
                          }}
                          aria-hidden="true"
                          className="jsx-295a12219cad25e3 dl-swatch"
                        />
                      )}
                      <span className="jsx-295a12219cad25e3 option__label">{e}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {K && <p className="jsx-295a12219cad25e3 dl-cart-error">{K}</p>}
        <footer className="jsx-295a12219cad25e3 sheet__foot">
          <button type="button" onClick={s} className="jsx-295a12219cad25e3 browse">
            I know what I want — let me browse
          </button>
        </footer>
      </div>
      {O && (
        <OptionsPopup
          product={O.product}
          rawOptions={O.rawOptions}
          initialQty={O.qty}
          submitting={$}
          submitError={H}
          onClose={() => {
            $ || (R(null), Q(null));
          }}
          onSubmit={ec}
        />
      )}
      <JSXStyle id="295a12219cad25e3">
        {
          '.overlay.jsx-295a12219cad25e3{z-index:110;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#14150f73;place-items:center;padding:24px;display:grid;position:fixed;inset:0}.sheet.jsx-295a12219cad25e3{background:#fff;flex-direction:column;width:100%;max-width:480px;max-height:calc(100vh - 48px);display:flex;position:relative;overflow:hidden;box-shadow:0 40px 90px -40px #14150f99}.sheet__bar.jsx-295a12219cad25e3{background:var(--bg-tile);color:#fff;flex:none;justify-content:space-between;align-items:center;gap:12px;padding:14px 12px 14px 20px;display:flex}.sheet__label.jsx-295a12219cad25e3{font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:#9b9b93;font-size:11px}.sheet__close.jsx-295a12219cad25e3{color:#fff;cursor:pointer;background:0 0;border:0;border-radius:50%;place-items:center;width:32px;height:32px;display:grid}.sheet__close.jsx-295a12219cad25e3:hover{background:#ffffff1f}.sheet__body.jsx-295a12219cad25e3{background-color:#f7f6f1;min-height:0;padding:22px 20px 24px;overflow-y:auto}.prog{font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--green);font-size:11px;display:block}.overlay h2{letter-spacing:-.02em;margin:8px 0 14px;font-size:20px;font-weight:600}.link-back{letter-spacing:0;text-transform:none;color:var(--ink-muted);cursor:pointer;background:0 0;border:0;margin-bottom:14px;padding:0;font-family:inherit;font-size:13px;display:block}.link-back:hover{color:var(--ink)}.sw-hint{color:#4d5741;border-left:3px solid var(--green);border-radius:0 var(--radius-sm) var(--radius-sm) 0;background:#e9ebda;margin:0 0 16px;padding:12px 14px;font-size:13px;line-height:1.55}.callus{color:#f6f4ec;background:var(--ink);border-radius:var(--radius-sm);margin:0 0 16px;padding:16px 18px;font-size:14px;line-height:1.6}.callus a{color:#46b06e;font-weight:700}.options.jsx-295a12219cad25e3{flex-direction:column;gap:9px;display:flex}.option.jsx-295a12219cad25e3{text-align:left;border:1px solid var(--line);border-radius:var(--radius-sm);color:var(--ink);cursor:pointer;background:#f7f6f1;align-items:center;gap:12px;padding:10px 16px;font-size:14.5px;line-height:1.4;transition:border-color .15s,background .15s,color .15s;display:flex}.option.jsx-295a12219cad25e3:hover{border-color:var(--ink);background:var(--ink);color:#fff}.option__label.jsx-295a12219cad25e3{flex:1}.dl-swatch.jsx-295a12219cad25e3{border:1px solid #00000026;border-radius:50%;flex:none;width:22px;height:22px}.dl-cutfig{border:1px solid var(--line);background:#fff;margin:0 0 14px;padding:10px 8px 6px}.dl-cutfig svg{width:100%;height:auto;display:block}.dl-cutfig figcaption{color:var(--ink-soft);border-top:1px solid var(--line);margin-top:6px;padding:8px 4px 2px;font-size:11.5px;line-height:1.45}.dl-photo{border:1px solid var(--line);background:#fff;margin:0 0 16px}.dl-photo img{width:100%;height:auto;display:block}.dl-photo figcaption{color:var(--ink-soft);border-top:1px solid var(--line);padding:8px 11px;font-size:11.5px;line-height:1.5}.dl-glare{margin:0 0 14px}.dl-glare-pair{grid-template-columns:1fr 1fr;gap:8px;display:grid}.dl-glare-pair figure{border:1px solid var(--line);background:#fff;margin:0;padding:6px}.dl-glare-pair img{width:100%;height:auto;display:block}.dl-glare-sub{font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--green);border-top:1px solid var(--line);margin:22px 0 10px;padding-top:16px;font-size:11px}.dl-glare-facts{border-top:1px solid var(--line);grid-template-columns:1fr;gap:0;margin:16px 0 4px;display:grid}.dl-glare-facts>div{border-bottom:1px solid var(--line);grid-template-columns:minmax(120px,1.1fr) 1fr 1fr;align-items:baseline;gap:10px;padding:9px 0;display:grid}.dl-glare-facts dt{font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin:0;font-size:9.5px}.dl-glare-facts dd{color:var(--ink);margin:0;font-size:13px}.dl-glare-facts dd.alt{color:#2f6b47;font-weight:500}.dl-glare-cap{color:var(--ink-soft);margin-top:8px;font-size:12px;line-height:1.5}.dl-glare-cap b{color:var(--ink)}@media (width<=420px){.dl-glare-pair{grid-template-columns:1fr}}@media (width<=640px){.dl-glare-facts>div{grid-template-columns:1fr;gap:2px;padding:11px 0}.dl-glare-facts dd:before{content:"Standard — ";color:var(--ink-muted);font-size:11px}.dl-glare-facts dd.alt:before{content:"Low glare — ";color:var(--ink-muted);font-size:11px}}.dl-size.jsx-295a12219cad25e3{flex-direction:column;gap:10px;display:flex}.dl-size__row.jsx-295a12219cad25e3{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.dl-size__row.jsx-295a12219cad25e3 input.jsx-295a12219cad25e3{width:90px;color:var(--ink);border:1px solid var(--line-strong);border-radius:var(--radius-sm);background:#fff;padding:10px 12px;font-family:inherit;font-size:16px;font-weight:600}.dl-size__row.jsx-295a12219cad25e3 input.jsx-295a12219cad25e3:focus{border-color:var(--green);outline:none;box-shadow:0 0 0 3px #00c4002e}.len__unit.jsx-295a12219cad25e3{font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);font-size:11px}.len__go.jsx-295a12219cad25e3{border:1px solid var(--line-strong);border-radius:var(--radius-sm);color:var(--ink);cursor:pointer;background:#f7f6f1;margin-left:auto;padding:12px 18px;font-size:14px;font-weight:500;transition:border-color .15s,background .15s}.len__go.jsx-295a12219cad25e3:hover:not(:disabled){border-color:var(--ink);background:#fff}.len__go.jsx-295a12219cad25e3:disabled{opacity:.5;cursor:not-allowed}.dl-size__skip.jsx-295a12219cad25e3{color:var(--ink-muted);cursor:pointer;background:0 0;border:0;align-self:flex-start;padding:0;font-size:12.5px}.dl-size__skip.jsx-295a12219cad25e3:hover{color:var(--ink)}.dl-cart-error.jsx-295a12219cad25e3{color:#9e2b1f;border-radius:0 var(--radius-sm) var(--radius-sm) 0;background:#fbeae7;border-left:3px solid #c0563e;margin:0 20px;padding:10px 12px;font-size:12.5px;line-height:1.5}.sheet__foot.jsx-295a12219cad25e3{border-top:1px solid var(--line);background-color:#f7f6f1;flex:none;padding:14px 20px 18px}.browse.jsx-295a12219cad25e3{width:100%;font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--line-strong);border-radius:var(--radius-sm);color:var(--ink);cursor:pointer;background:#f7f6f1;padding:14px 16px;font-size:11.5px}.browse.jsx-295a12219cad25e3:hover{border-color:var(--ink);background:#fff}.dl-result .prog{margin-bottom:4px}.dl-result h2{margin-top:4px}.dl-summary{color:var(--ink-soft);margin:0 0 14px;font-size:15px;line-height:1.6}.dl-note{color:#6b5626;background:#fcf3e2;border-left:2px solid #c9932f;margin:0 0 12px;padding:10px 12px;font-size:12.5px;line-height:1.55}.dl-tags{flex-wrap:wrap;gap:5px;margin:3px 0;display:flex}.dl-tag{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.03em;color:var(--ink-soft);background:#eceade;border-radius:999px;padding:3px 9px;font-size:10px}.dl-tag--lg{color:#2f6b1f;background:#00c40024}.dl-rec{border:1px solid var(--line);border-radius:var(--radius-sm);background:#fff;margin-bottom:10px;padding:14px}.dl-rec--primary{border-color:var(--ink)}.dl-rec__top{gap:14px;display:flex}.dl-rec__media{border:1px solid var(--line);background:#f7f6f1;border-radius:3px;flex:none;width:76px;height:58px;overflow:hidden}.dl-rec__id{flex-direction:column;gap:3px;min-width:0;display:flex}.dl-rec__name{font-size:14.5px;font-weight:600;line-height:1.3}.dl-rec__lum{font-family:var(--font-mono);color:var(--ink-muted);font-size:10.5px}.dl-rec__price{margin-top:2px;font-size:14.5px}.dl-rec__price small{font-family:var(--font-mono);color:var(--ink-muted);font-size:10px}.dl-rec__add{border-radius:var(--radius-sm);background:var(--ink);color:#fff;cursor:pointer;border:0;width:100%;margin-top:12px;padding:12px 16px;font-size:14px;font-weight:500}.dl-rec__add:hover{background:#2c2e26}.dl-scene{border:1px solid var(--line);border-radius:var(--radius-sm);background:#fff;margin-bottom:14px;overflow:hidden}.dl-scene svg{width:100%;height:auto;display:block}.dl-batten-where{color:var(--ink-soft);margin:-6px 0 12px;font-size:12px}.dl-specs{border:1px solid var(--line);border-radius:var(--radius-sm);background:#fff;margin:14px 0;padding:14px 16px}.dl-specs-h{font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--green);margin:0 0 10px;font-size:10px}.dl-spec-row{border-bottom:1px solid var(--line);justify-content:space-between;gap:12px;padding:7px 0;font-size:13px;display:flex}.dl-spec-row:last-of-type{border-bottom:0}.dl-spec-row span{color:var(--ink-muted)}.dl-spec-row b{text-align:right;font-weight:600}.dl-spec-miss{color:var(--ink-muted);font-style:italic;font-weight:400}.dl-star{border:1px solid var(--line);border-radius:var(--radius-sm);background:#fff;margin:20px 0 6px;padding:18px}.dl-star h3{letter-spacing:-.01em;margin:4px 0 10px;font-size:18px}.dl-star-lede{color:var(--ink-soft);margin:0;font-size:13.5px;line-height:1.6}.dl-star-sub{font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--green);border-top:1px solid var(--line);margin:22px 0 10px;padding-top:14px;font-size:10px}.dl-star-uses{grid-template-columns:repeat(3,1fr);gap:10px;display:grid}.dl-star-uses>div{border:1px solid var(--line);border-radius:var(--radius-sm);background:var(--bg-card);padding:12px 13px}.dl-star-uses b{margin-bottom:4px;font-size:13px;font-weight:600;display:block}.dl-star-uses em{color:var(--ink-soft);font-size:12px;font-style:normal;line-height:1.5;display:block}.dl-star-rule{color:var(--ink-soft);margin:12px 0 0;font-size:13px;line-height:1.55}.dl-star-tbl{border-collapse:collapse;width:100%;font-size:13px}.dl-star-tbl th{text-align:left;white-space:nowrap;vertical-align:top;width:1%;padding:8px 12px 8px 0;font-weight:600}.dl-star-tbl td{color:var(--ink-soft);padding:8px 0}.dl-star-tbl td.p{white-space:nowrap;text-align:right;font-family:var(--font-mono);color:var(--ink-soft);width:1%;font-size:12px}.dl-star-tbl tr+tr th,.dl-star-tbl tr+tr td{border-top:1px solid var(--line)}.dl-star-note{color:var(--ink-muted);margin:12px 0 0;font-size:12px;line-height:1.55}.dl-star-warn{border-radius:0 var(--radius-sm) var(--radius-sm) 0;background:#c0563e0f;border-left:3px solid #c0563e;margin-top:20px;padding:14px 16px}.dl-star-warn b{font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:#c0563e;margin-bottom:6px;font-size:10px;display:block}.dl-star-warn p{color:var(--ink-soft);margin:0;font-size:12.5px;line-height:1.6}@media (width<=480px){.dl-star-uses{grid-template-columns:1fr}}.dl-qty{border:1px solid var(--line);border-radius:var(--radius-sm);background:#fff;margin:12px 0;padding:14px 16px}.dl-qty h4{font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--green);margin:0 0 10px;font-size:10px}.dl-qty-row{flex-wrap:wrap;align-items:center;gap:12px;display:flex}.dl-qty-row button{border:1px solid var(--line-strong);border-radius:var(--radius-sm);cursor:pointer;background:#fff;flex:none;width:34px;height:34px;font-size:17px}.dl-qty-row button:hover{border-color:var(--ink)}.dl-qty__n{text-align:center;min-width:24px;font-size:22px;font-weight:700}.dl-qty__lbl{color:var(--ink-soft);flex:1;min-width:130px;font-size:13px;line-height:1.4}.dl-qty__lbl em{color:var(--ink-muted);font-style:normal}.dl-qty-src{color:var(--ink-muted);margin:9px 0 0;font-size:11.5px;line-height:1.5}.dl-qty-src a{color:var(--green);font-weight:600}.dl-price-block{border:1px solid var(--ink);border-radius:var(--radius-sm);background:var(--bg-card);margin:12px 0 16px;padding:14px 16px}.dl-price-block h4{font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--green);margin:0 0 10px;font-size:10px}.dl-price-row{border-bottom:1px solid var(--line);justify-content:space-between;gap:12px;padding:7px 0;font-size:13.5px;display:flex}.dl-price-row span{color:var(--ink-soft)}.dl-price-row:last-of-type{border-bottom:0}.dl-price-row--total{border-top:2px solid var(--ink);border-bottom:0;margin-top:4px;padding-top:11px;font-size:15px}.dl-price-row--total b{font-size:19px}.dl-price-gst{color:var(--ink-muted);margin:9px 0 0;font-size:11.5px}.alts{margin-top:4px}.alts summary{color:var(--ink-soft);cursor:pointer;padding:8px 0;font-size:13px;font-weight:500;list-style:none}.alts summary::-webkit-details-marker{display:none}.alts summary:before{content:"+ "}.alts[open] summary:before{content:"− "}.alts summary:hover{color:var(--ink)}.dl-restart{color:var(--ink-muted);cursor:pointer;background:0 0;border:0;margin-top:10px;padding:0;font-family:inherit;font-size:12.5px;text-decoration:underline;display:block}.dl-restart:hover{color:var(--ink)}'
        }
      </JSXStyle>
    </div>
  );
}
function G({
  answers: e,
  products: a,
  loading: r,
  qty: s,
  setQty: i,
  autoQty: l,
  colourAutoNote: n,
  back: o,
  restart: d,
  addToCart: c,
}) {
  let { primary: h, alts: p } = downlightFinder.pickDlRecommendation(a, e),
    x = downlightFinder.dlBand(e.cut),
    m = downlightFinder.dlWantLow(e);
  if (r)
    return (
      <div className="dl-result">
        <button type="button" className="link-back" onClick={o}>
          ← Back
        </button>
        <p className="dl-summary">Finding your match…</p>
      </div>
    );
  if (!h)
    return (
      <div className="dl-result">
        <button type="button" className="link-back" onClick={o}>
          ← Back
        </button>
        <div className="callus">
          We don't have an online match for that combination — give us a call on{' '}
          <a href="tel:+61892972969">(08) 9297 2969</a>
          {" and we'll find it in the warehouse."}
        </div>
      </div>
    );
  let f = downlightFinder.dlCut(h),
    u = downlightFinder.dlBeam(h),
    g = downlightFinder.dlIP(h),
    b = (
      <>
        {f && (
          <span className="dl-tag">
            {'Cut-out '}
            {f.txt}
          </span>
        )}
        {null != u && (
          <span className={`dl-tag${u < 90 ? ' dl-tag--lg' : ''}`}>
            {u}
            {'° '}
            {u < 90 ? 'low glare' : 'standard'}
          </span>
        )}
        {null != g && <span className="dl-tag">IP{g}</span>}
      </>
    );
  return (
    <div className="dl-result">
      <button type="button" className="link-back" onClick={o}>
        ← Back
      </button>
      <span className="prog">✓ Your match</span>
      <h2>This is the one:</h2>
      <p className="dl-summary">{downlightFinder.dlSummary(e)}</p>
      {n && <div className="dl-note">{n}</div>}
      {'unsure' === e.cut && (
        <div className="dl-note">
          <b>We've assumed 90mm</b>— the Australian standard. Measure your hole edge to edge before ordering; if it's
          70mm or 120mm, come back and change the first answer.
        </div>
      )}
      {f && (f.min < x.lo || f.min > x.hi) && (
        <div className="dl-note">
          {'Nothing in the online range is made for a '}
          {x.label}
          {' cut-out in this spec, so this is the closest fit at '}
          <b>{f.txt}</b>. Call us on (08) 9297 2969 before you cut.
        </div>
      )}
      {null !== m && downlightFinder.dlIsLowGlare(h) !== m && (
        <div className="dl-note">
          {'Heads up — this is the best match, but its beam is '}
          {u || '?'}°, so it behaves like a {downlightFinder.dlIsLowGlare(h) ? 'low glare' : 'standard'}
          {' fitting rather than the'} {m ? 'low glare' : 'standard'}
          {' one you picked.'}
        </div>
      )}
      <ZC product={h} tags={b} primary={!0} />
      <S product={h} />
      <C qty={s} setQty={i} autoQty={l} answers={e} back={o} />
      <T product={h} qty={s} addToCart={c} />
      {p.length > 0 && (
        <details className="alts">
          <summary>
            {'Not quite right? See '}
            {p.length}
            {' alternative'}
            {p.length > 1 ? 's' : ''}
          </summary>
          {p.map((e) => {
            let a = downlightFinder.dlCut(e),
              r = downlightFinder.dlBeam(e),
              s = downlightFinder.dlIP(e);
            return (
              <ZC
                key={e.id}
                product={e}
                tags={
                  <>
                    {a && (
                      <span className="dl-tag">
                        {'Cut-out '}
                        {a.txt}
                      </span>
                    )}
                    {null != r && <span className="dl-tag">{r}°</span>}
                    {null != s && <span className="dl-tag">IP{s}</span>}
                  </>
                }
                onAdd={() => c(e, 1)}
              />
            );
          })}
        </details>
      )}
      <button type="button" className="dl-restart" onClick={d}>
        ← Start the finder again
      </button>
    </div>
  );
}
function W({ answers: e, starProducts: a, qty: r, setQty: s, back: i, restart: l, addToCart: n }) {
  if (!a.length)
    return (
      <div className="dl-result">
        <button type="button" className="link-back" onClick={i}>
          ← Back
        </button>
        <p className="dl-summary">Finding your match…</p>
      </div>
    );
  let { primary: o, alts: d } = downlightFinder.pickStarRecommendation(a, e.starcol);
  if (!o)
    return (
      <div className="dl-result">
        <button type="button" className="link-back" onClick={i}>
          ← Back
        </button>
        <div className="callus">
          We don't have an online match for that colour — give us a call on{' '}
          <a href="tel:+61892972969">(08) 9297 2969</a>
          {" and we'll find it in the warehouse."}
        </div>
      </div>
    );
  let c = downlightFinder.dlCut(o),
    h = downlightFinder.dlBeam(o),
    p = downlightFinder.dlIP(o),
    x = (
      <>
        {c && (
          <span className="dl-tag">
            {'Cut-out '}
            {c.txt}
          </span>
        )}
        {null != h && (
          <span className={`dl-tag${h < 90 ? ' dl-tag--lg' : ''}`}>
            {h}
            {'° '}
            {h < 90 ? 'low glare' : 'standard'}
          </span>
        )}
        {null != p && <span className="dl-tag">IP{p}</span>}
      </>
    );
  return (
    <div className="dl-result">
      <button type="button" className="link-back" onClick={i}>
        ← Back
      </button>
      <span className="prog">✓ Your match</span>
      <h2>This is the one:</h2>
      <p className="dl-summary">{downlightFinder.dlSummary(e)}</p>
      <ZC product={o} tags={x} primary={!0} />
      <S product={o} />
      <C qty={r} setQty={s} autoQty={null} answers={e} back={i} />
      <T product={o} qty={r} addToCart={n} />
      <I />
      {d.length > 0 && (
        <details className="alts">
          <summary>
            {'Not quite right? See '}
            {d.length}
            {' alternative'}
            {d.length > 1 ? 's' : ''}
          </summary>
          {d.map((e) => {
            let a = downlightFinder.dlCut(e),
              r = downlightFinder.dlBeam(e),
              s = downlightFinder.dlIP(e);
            return (
              <ZC
                key={e.id}
                product={e}
                tags={
                  <>
                    {a && (
                      <span className="dl-tag">
                        {'Cut-out '}
                        {a.txt}
                      </span>
                    )}
                    {null != r && <span className="dl-tag">{r}°</span>}
                    {null != s && <span className="dl-tag">IP{s}</span>}
                  </>
                }
                onAdd={() => n(e, 1)}
              />
            );
          })}
        </details>
      )}
      <button type="button" className="dl-restart" onClick={l}>
        ← Start the finder again
      </button>
    </div>
  );
}
function D({ onOpenFinder: e }) {
  return (
    <section
      className={JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) + ' hero'}
    >
      <div
        aria-hidden="true"
        className={
          JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) + ' hero__scrim'
        }
      />
      <div
        className={
          JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) +
          ' container hero__inner'
        }
      >
        <span
          className={
            JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) +
            ' hero__eyebrow'
          }
        >
          LED Downlights · Premium Quality · Perfect Light · Perth, WA
        </span>
        <h1
          className={
            JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) + ' hero__title'
          }
        >
          Downlighting,
          <br className={JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]])} />
          <span
            className={
              JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) +
              ' hero__accent'
            }
          >
            done right
          </span>
        </h1>
        <p
          className={
            JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) + ' hero__lead'
          }
        >
          Elevate every space with high-performance LED downlights that deliver refined illumination, exceptional colour
          quality and seamless dimming.
        </p>
        <div
          className={
            JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) +
            ' hero__actions'
          }
        >
          <button
            type="button"
            onClick={e}
            className={
              JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) +
              ' hero__btn hero__btn--primary'
            }
          >
            {'Open Downlight Finder '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]])}
            >
              →
            </span>
          </button>
          <a
            href="/layout-app/"
            className={
              JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]]) +
              ' hero__btn hero__btn--ghost'
            }
          >
            {'Lighting Layout App '}
            <span
              aria-hidden="true"
              className={JSXStyle.dynamic([['ba27e6ecd329b7d', [asset.asset('/images/hero/downlight-hero.webp')]]])}
            >
              →
            </span>
          </a>
        </div>
      </div>
      <JSXStyle
        id="ba27e6ecd329b7d"
        dynamic={[asset.asset('/images/hero/downlight-hero.webp')]}
      >{`.hero.__jsx-style-dynamic-selector{background-image:url(${asset.asset('/images/hero/downlight-hero.webp')});background-position:100%;background-repeat:no-repeat;background-size:cover;position:relative;overflow:hidden}.hero__media.__jsx-style-dynamic-selector{width:64%;position:absolute;top:0;bottom:0;right:0}.hero__img.__jsx-style-dynamic-selector{object-fit:contain;object-position:center;width:100%;height:100%;display:block}.hero__scrim.__jsx-style-dynamic-selector{pointer-events:none;background:linear-gradient(90deg,#0a0a09 0% 28%,#0a0a09db 40%,#0a0a0966 56%,#0a0a0900 72%);position:absolute;inset:0}.hero__inner.__jsx-style-dynamic-selector{padding:100px 34px;position:relative}.hero__eyebrow.__jsx-style-dynamic-selector{font-family:var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--green-bright);font-size:12px;display:inline-block}.hero__title.__jsx-style-dynamic-selector{font-family:var(--font-display);letter-spacing:-.03em;color:#fff;margin:20px 0 0;font-size:max(40px,min(5.4vw,68px));font-weight:600;line-height:1.06}.hero__accent.__jsx-style-dynamic-selector{color:var(--green-bright)}.hero__lead.__jsx-style-dynamic-selector{color:#ffffffc7;max-width:46ch;margin:22px 0 0;font-size:16px;line-height:1.62}.hero__actions.__jsx-style-dynamic-selector{flex-wrap:wrap;gap:14px;margin-top:34px;display:flex}.hero__btn.__jsx-style-dynamic-selector{border-radius:var(--radius-sm);cursor:pointer;border:1px solid #0000;align-items:center;gap:9px;padding:14px 24px;font-size:14.5px;font-weight:500;transition:background .16s,border-color .16s,color .16s;display:inline-flex}.hero__btn--primary.__jsx-style-dynamic-selector{background:var(--green-bright);color:#04120b}.hero__btn--primary.__jsx-style-dynamic-selector:hover{background:var(--green-hover)}.hero__btn--ghost.__jsx-style-dynamic-selector{color:#fff;background:0 0;border-color:#ffffff80}.hero__btn--ghost.__jsx-style-dynamic-selector:hover{background:#ffffff14;border-color:#fff}@media (width<=900px){.hero.__jsx-style-dynamic-selector{min-height:676px}.hero__media.__jsx-style-dynamic-selector{width:100%!important}.hero__scrim.__jsx-style-dynamic-selector{background:linear-gradient(#0a0a0959 0%,#0a0a09b8 42%,#0a0a09 78%)}.hero__inner.__jsx-style-dynamic-selector{padding:200px 18px 56px}.hero__lead.__jsx-style-dynamic-selector{font-size:15.5px}.hero__btn.__jsx-style-dynamic-selector{flex:auto;justify-content:center}}`}</JSXStyle>
    </section>
  );
}
let F = [
    {
      Icon: Icons.IconEye,
      label: 'Low glare',
      text: 'Softer, more controlled light with less glare.',
    },
    {
      Icon: Icons.IconThermometer,
      label: 'Tri-colour',
      text: '3000K · 4000K · 5000K — warm, natural or daylight.',
    },
    {
      Icon: Icons.IconWifi,
      label: 'Smart',
      text: 'Adjust colour temperature and brightness. Works with Alexa and Google Home.',
    },
  ],
  B = [
    {
      Icon: Icons.IconSun,
      title: 'Choosing the right LED downlight',
      text: 'Most downlights come standard with a 3 colour (tri-colour) switch, giving you the option of warm (3000K), natural (4000K) or bright white (5000K). Some fittings offer up to 6000K, though this is not recommended for most homes. Standard LED downlights are ideal for general lighting in living areas, bedrooms, hallways and commercial spaces.',
    },
    {
      Icon: Icons.IconEye,
      title: 'Why choose low glare downlights?',
      text: "Low glare downlights use recessed lenses or deep reflectors to control brightness and direct light where it's needed. This reduces glare and eye strain while enhancing comfort. They are perfect for feature lighting, reading areas, kitchens and spaces where you want a more relaxed ambience.",
    },
    {
      Icon: Icons.IconPhone,
      title: 'Smart lighting for total control',
      text: 'Smart downlights let you adjust colour temperature and brightness to suit your mood or activity. Choose from full colour (RGBW), Smart CCT (2700–5700K) or dimmable options. All are compatible with Amazon Alexa and Google Home for effortless control.',
    },
  ];
export default function Default() {
  let [e, o] = React.useState([]),
    [d, c] = React.useState(!0),
    [h, x] = React.useState(null),
    [m, f] = React.useState(!0),
    [u, g] = React.useState([]),
    [y, w] = React.useState(!0);
  (React.useEffect(() => {
    let e = !1;
    return (
      api2
        .fetchStripLightProducts({
          id: api2.DOWNLIGHTS_CATEGORY_ID,
          categoryLabel: 'Downlights',
        })
        .then((t) => {
          e || o(t.filter((e) => 4 === e.visibility).reverse());
        })
        .catch((t) => {
          e || x(t.message);
        })
        .finally(() => {
          e || c(!1);
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
            let t = await api2.fetchCategory(api2.DOWNLIGHTS_CATEGORY_ID),
              a = api2.categoryChildren(t),
              r = await Promise.all(
                a.map(async (e) => {
                  let t = await api2.fetchStripLightProducts({
                    id: e.id,
                    categoryLabel: 'Downlights',
                  });
                  return {
                    id: `cat-${e.id}`,
                    label: e.name || `Category ${e.id}`,
                    products: t.filter((e) => 4 === e.visibility),
                  };
                }),
              );
            e || g(r);
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
  let v = React.useMemo(() => withPinnedOrder.withPinnedOrder(e), [e]),
    k = React.useMemo(() => {
      let e = new Set();
      u.forEach((t) => t.products.forEach((t) => e.add(t.id)));
      let t = v.filter((t) => !e.has(t.id) && downlightFinder.dlIsFitting(t));
      return [
        ...u,
        ...(t.length
          ? [
              {
                id: 'more',
                label: 'More downlights',
                products: t,
              },
            ]
          : []),
      ].map((e) => ({
        ...e,
        products: [...e.products].reverse(),
      }));
    }, [u, v]);
  return (
    <main className="jsx-f3570e7fdb4a38e4 home">
      <D onOpenFinder={() => f(!0)} />
      <section id="downlights" className="jsx-f3570e7fdb4a38e4 range">
        <div className="jsx-f3570e7fdb4a38e4 container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 40,
            }}
            className="jsx-f3570e7fdb4a38e4 range__head"
          >
            <div className="jsx-f3570e7fdb4a38e4 range__copy">
              <span className="jsx-f3570e7fdb4a38e4 eyebrow">Featured · Downlights</span>
              <h1 className="jsx-f3570e7fdb4a38e4 range__title">Find your perfect downlight</h1>
              <p className="jsx-f3570e7fdb4a38e4 range__sub">
                Browse the full downlight range below — or let our quick finder match you to the right downlight in a
                few questions.
              </p>
            </div>
            <button type="button" onClick={() => f(!0)} className="jsx-f3570e7fdb4a38e4 link-mono range__finder">
              {'Open the finder '}
              <span aria-hidden="true" className="jsx-f3570e7fdb4a38e4">
                →
              </span>
            </button>
          </div>
          {!d && h && (
            <p className="jsx-f3570e7fdb4a38e4 range__status range__status--error">
              Couldn't load products right now. Please try again shortly.
            </p>
          )}
          {!h && (d || y) && (
            <div className="jsx-f3570e7fdb4a38e4 grid">
              <ProductCard2.ProductGridSkeleton count={8} />
            </div>
          )}
          {!h && !d && !y && <CatSections sections={k} renderCard={(e) => <ProductCard key={e.id} product={e} />} />}
        </div>
      </section>
      <VideosSection />
      <GuideSection
        eyebrow="Downlights · Buying Guide"
        title="LED Downlights for Modern Australian Homes"
        subtitle="From everyday lighting to architectural low-glare and smart options, find the right downlight for every room and application."
        stats={F}
        cards={B}
        CalloutIcon={Icons.IconPin}
        calloutText="Designed for Australian homes and built to last, our LED downlights combine performance, energy efficiency and style — available online or in our Ellenbrook showroom, Perth."
      />
      <P open={m} onClose={() => f(!1)} />
      <JSXStyle id="f3570e7fdb4a38e4">
        {
          '.range.jsx-f3570e7fdb4a38e4{padding:20px 0 80px}.range__head.jsx-f3570e7fdb4a38e4{justify-content:space-between;align-items:flex-end;gap:40px;margin-bottom:34px;display:flex}.range__title.jsx-f3570e7fdb4a38e4{letter-spacing:-.03em;margin:2px 0 12px;font-size:max(30px,min(3.6vw,44px));font-weight:600;line-height:1.12}.range__sub.jsx-f3570e7fdb4a38e4{color:var(--ink-soft);margin:0;font-size:15px;line-height:1.6}.range__finder.jsx-f3570e7fdb4a38e4{cursor:pointer;flex:none;margin-bottom:6px}.range__status.jsx-f3570e7fdb4a38e4{color:var(--ink-soft);padding:12px 0;font-size:14px}.range__status--error.jsx-f3570e7fdb4a38e4{color:#b3261e}.loading.jsx-f3570e7fdb4a38e4{flex-direction:column;justify-content:center;align-items:center;gap:18px;min-height:60vh;display:flex}.spinner.jsx-f3570e7fdb4a38e4{border:3px solid var(--line);border-top-color:var(--ink);border-radius:50%;width:40px;height:40px;animation:.8s linear infinite spin}.loading__text.jsx-f3570e7fdb4a38e4{color:var(--ink-soft);margin:0;font-size:14px}@keyframes spin{to{transform:rotate(360deg)}}.grid.jsx-f3570e7fdb4a38e4{grid-template-columns:repeat(4,1fr);gap:24px;display:grid}@media (width<=1080px){.grid.jsx-f3570e7fdb4a38e4{grid-template-columns:repeat(2,1fr)}}@media (width<=860px){.range__head.jsx-f3570e7fdb4a38e4{gap:24px;flex-direction:column!important;align-items:flex-start!important}}@media (width<=560px){.grid.jsx-f3570e7fdb4a38e4{grid-template-columns:1fr}}'
        }
      </JSXStyle>
    </main>
  );
}
