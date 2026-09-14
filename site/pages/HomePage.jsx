'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import VideosSection from '../components/catalog/VideosSection';
import * as Icons from '../components/ui/Icons';
import * as api from '../lib/api';
import * as nav from '../lib/nav';
import BrowseGrid from '../components/catalog/BrowseGrid';
import * as asset from '../lib/asset';
function T() {
  return (
    <section className="jsx-959dcd61e4a24c05 hero">
      <div className="jsx-959dcd61e4a24c05 container hero__inner">
        <span className="jsx-959dcd61e4a24c05 hero__eyebrow">LED Lighting · Smart Home · Perth, WA</span>
        <h1 className="jsx-959dcd61e4a24c05 hero__title">
          {'Light done '}
          <span className="jsx-959dcd61e4a24c05 hero__accent">right.</span>
        </h1>
        <p className="jsx-959dcd61e4a24c05 hero__lead">
          From a single downlight to a full commercial fit-out — Greenhse Technologies supplies certified, energy-smart
          LED lighting and home automation, all in one place.
        </p>
        <div className="jsx-959dcd61e4a24c05 hero__actions">
          <a href="#popular" className="jsx-959dcd61e4a24c05 hero__btn hero__btn--primary">
            {'Shop the range '}
            <span aria-hidden="true" className="jsx-959dcd61e4a24c05">
              →
            </span>
          </a>
          <a
            href="/layout-app/"
            className="jsx-959dcd61e4a24c05 hero__btn hero__btn--ghost"
          >
            Try the layout app
          </a>
        </div>
      </div>
      <JSXStyle id="959dcd61e4a24c05">
        {
          '.hero.jsx-959dcd61e4a24c05{background-color:#060d0a;background-image:radial-gradient(62% 90% at 62% 45%,#00c40073 0%,#00c40024 42%,#060d0a00 72%),linear-gradient(#081410 0%,#060d0a 100%);background-position:0 0;background-repeat:repeat;background-size:auto;background-attachment:scroll;background-origin:padding-box;background-clip:border-box;position:relative;overflow:hidden}.hero.jsx-959dcd61e4a24c05:before{content:"";pointer-events:none;background-image:linear-gradient(#ffffff0a 1px,#0000 1px),linear-gradient(90deg,#ffffff0a 1px,#0000 1px);background-size:64px 64px;position:absolute;inset:0;-webkit-mask-image:radial-gradient(70% 80% at 60% 45%,#000 0%,#0000 78%);mask-image:radial-gradient(70% 80% at 60% 45%,#000 0%,#0000 78%)}.hero__inner.jsx-959dcd61e4a24c05{padding:118px 34px 128px;position:relative}.hero__eyebrow.jsx-959dcd61e4a24c05{font-family:var(--font-mono);letter-spacing:.34em;text-transform:uppercase;color:#00c400e6;font-size:12px;display:inline-block}.hero__title.jsx-959dcd61e4a24c05{font-family:var(--font-display);letter-spacing:-.035em;color:#fff;margin:26px 0 0;font-size:max(52px,min(8.4vw,108px));font-weight:600;line-height:.98}.hero__accent.jsx-959dcd61e4a24c05{color:var(--green-bright)}.hero__lead.jsx-959dcd61e4a24c05{color:#ffffffb8;max-width:52ch;margin:30px 0 0;font-size:17px;line-height:1.62}.hero__actions.jsx-959dcd61e4a24c05{flex-wrap:wrap;gap:14px;margin-top:40px;display:flex}.hero__btn.jsx-959dcd61e4a24c05{border-radius:var(--radius-sm);border:1px solid #0000;align-items:center;gap:9px;padding:15px 26px;font-size:15px;font-weight:500;transition:background .16s,border-color .16s,color .16s;display:inline-flex}.hero__btn--primary.jsx-959dcd61e4a24c05{background:var(--green-bright);color:#04120b}.hero__btn--primary.jsx-959dcd61e4a24c05:hover{background:var(--green-hover)}.hero__btn--ghost.jsx-959dcd61e4a24c05{color:#fff;background:0 0;border-color:#ffffff47}.hero__btn--ghost.jsx-959dcd61e4a24c05:hover{background:#ffffff0f;border-color:#fff}@media (width<=640px){.hero__inner.jsx-959dcd61e4a24c05{padding:84px 18px 92px}.hero__lead.jsx-959dcd61e4a24c05{font-size:15.5px}.hero__btn.jsx-959dcd61e4a24c05{flex:auto;justify-content:center}}'
        }
      </JSXStyle>
    </section>
  );
}
let p = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function f(e, { requireMessage: a } = {}) {
  let s = {};
  e.name.trim() || (s.name = 'Please enter your name.');
  let r = e.email.trim();
  return (
    r ? p.test(r) || (s.email = 'Enter a valid email address.') : (s.email = 'Please enter your email address.'),
    a && !e.message.trim() && (s.message = 'Tell us a little about the project.'),
    s
  );
}
function H() {
  let [e, s] = React.useState({
      name: '',
      email: '',
    }),
    [i, o] = React.useState({}),
    [t, n] = React.useState(!1),
    [d, p] = React.useState(null),
    [h, x] = React.useState(!1);
  function g(e, a) {
    (s((s) => ({
      ...s,
      [e]: a,
    })),
      o((a) =>
        a[e]
          ? {
              ...a,
              [e]: void 0,
            }
          : a,
      ));
  }
  async function m(a) {
    if ((a.preventDefault(), t)) return;
    let s = f(e);
    if ((o(s), !(Object.keys(s).length > 0))) {
      (n(!0), p(null));
      try {
        (await api.submitSubscribe({
          name: e.name,
          email: e.email,
          phone: '',
          message: 'Newsletter signup — please add this address to the mailing list.',
        }),
          x(!0));
      } catch (e) {
        p(e.message);
      } finally {
        n(!1);
      }
    }
  }
  return h ? (
    <div className="loop__done">
      <Icons.IconCheck aria-hidden="true" />
      <span>
        You're on the list{e.name ? `, ${e.name.split(' ')[0]}` : ''}
        {' — thanks for subscribing.'}
      </span>
    </div>
  ) : (
    <form className="loop__form" onSubmit={m} noValidate={!0}>
      <div className="loop__row">
        <label className={`loop__field${i.name ? ' loop__field--error' : ''}`}>
          <span className="loop__label">Name</span>
          <input
            value={e.name}
            onChange={(e) => g('name', e.target.value)}
            disabled={t}
            aria-invalid={i.name ? 'true' : void 0}
          />
          {i.name && (
            <span className="loop__error" role="alert">
              {i.name}
            </span>
          )}
        </label>
        <label className={`loop__field${i.email ? ' loop__field--error' : ''}`}>
          <span className="loop__label">Email</span>
          <input
            type="email"
            value={e.email}
            onChange={(e) => g('email', e.target.value)}
            disabled={t}
            aria-invalid={i.email ? 'true' : void 0}
          />
          {i.email && (
            <span className="loop__error" role="alert">
              {i.email}
            </span>
          )}
        </label>
      </div>
      {d && (
        <p className="loop__error loop__error--submit" role="alert">
          {d}
        </p>
      )}
      <button type="submit" className="loop__submit" disabled={t}>
        {t ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  );
}
function X() {
  let [e, s] = React.useState({
      name: '',
      email: '',
      message: '',
    }),
    [i, o] = React.useState({}),
    [t, n] = React.useState(!1),
    [d, p] = React.useState(null),
    [h, x] = React.useState(!1);
  function g(e, a) {
    (s((s) => ({
      ...s,
      [e]: a,
    })),
      o((a) =>
        a[e]
          ? {
              ...a,
              [e]: void 0,
            }
          : a,
      ));
  }
  async function m(a) {
    if ((a.preventDefault(), t)) return;
    let s = f(e, {
      requireMessage: !0,
    });
    if ((o(s), !(Object.keys(s).length > 0))) {
      (n(!0), p(null));
      try {
        (await api.submitEnquiry({
          name: e.name,
          email: e.email,
          phone: '',
          message: e.message,
        }),
          x(!0));
      } catch (e) {
        p(e.message);
      } finally {
        n(!1);
      }
    }
  }
  return h ? (
    <div className="loop__done">
      <Icons.IconCheck aria-hidden="true" />
      <span>
        Thanks{e.name ? `, ${e.name.split(' ')[0]}` : ''}— we've got your enquiry and will be in touch shortly.
      </span>
    </div>
  ) : (
    <form className="loop__form" onSubmit={m} noValidate={!0}>
      <label className={`loop__field${i.name ? ' loop__field--error' : ''}`}>
        <span className="loop__label">Name</span>
        <input
          value={e.name}
          onChange={(e) => g('name', e.target.value)}
          disabled={t}
          aria-invalid={i.name ? 'true' : void 0}
        />
        {i.name && (
          <span className="loop__error" role="alert">
            {i.name}
          </span>
        )}
      </label>
      <label className={`loop__field${i.email ? ' loop__field--error' : ''}`}>
        <span className="loop__label">Email</span>
        <input
          type="email"
          value={e.email}
          onChange={(e) => g('email', e.target.value)}
          disabled={t}
          aria-invalid={i.email ? 'true' : void 0}
        />
        {i.email && (
          <span className="loop__error" role="alert">
            {i.email}
          </span>
        )}
      </label>
      <label className={`loop__field${i.message ? ' loop__field--error' : ''}`}>
        <span className="loop__label">What are you working on?</span>
        <textarea
          rows={4}
          value={e.message}
          onChange={(e) => g('message', e.target.value)}
          disabled={t}
          aria-invalid={i.message ? 'true' : void 0}
        />
        {i.message && (
          <span className="loop__error" role="alert">
            {i.message}
          </span>
        )}
      </label>
      {d && (
        <p className="loop__error loop__error--submit" role="alert">
          {d}
        </p>
      )}
      <button type="submit" className="loop__submit" disabled={t}>
        {t ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
function G() {
  return (
    <section id="stay-in-the-loop" className="jsx-e9c320b28fec50f0 stayloop">
      <div className="jsx-e9c320b28fec50f0 container">
        <div className="jsx-e9c320b28fec50f0 stayloop__grid">
          <div className="jsx-e9c320b28fec50f0">
            <span className="jsx-e9c320b28fec50f0 eyebrow stayloop__eyebrow">Stay in the loop</span>
            <h2 className="jsx-e9c320b28fec50f0 stayloop__title">{'New arrivals, deals & lighting know-how'}</h2>
            <p className="jsx-e9c320b28fec50f0 stayloop__sub">
              Be first to hear about new fittings, smart releases and energy-saving tips. No spam — just light.
            </p>
            <H />
          </div>
          <div id="send-us-your-plans" className="jsx-e9c320b28fec50f0">
            <span className="jsx-e9c320b28fec50f0 eyebrow stayloop__eyebrow">{'Trade & project enquiries'}</span>
            <h2 className="jsx-e9c320b28fec50f0 stayloop__title">Send us your plans</h2>
            <p className="jsx-e9c320b28fec50f0 stayloop__sub">
              Or reach us directly —{' '}
              <a href={nav.company.showroom.phoneHref} className="jsx-e9c320b28fec50f0 stayloop__phone">
                {nav.company.showroom.phone}
              </a>{' '}
              {'· '}
              {nav.company.showroom.address}
            </p>
            <X />
          </div>
        </div>
      </div>
      <JSXStyle id="e9c320b28fec50f0">
        {
          '.stayloop{background:#060d0a;padding:88px 0 96px}.stayloop__grid{grid-template-columns:1fr 1fr;gap:64px;display:grid}.stayloop__eyebrow{color:var(--green-bright)}.stayloop__title{letter-spacing:-.03em;color:#fff;margin:12px 0;font-size:max(26px,min(3vw,36px));font-weight:600;line-height:1.14}.stayloop__sub{color:#ffffffad;max-width:46ch;margin:0 0 28px;font-size:15px;line-height:1.6}.stayloop__phone{color:var(--green-bright)}.loop__row{grid-template-columns:1fr 1fr;gap:16px;display:grid}.loop__field{margin-bottom:16px;display:block}.loop__label{font-family:var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:#ffffff80;margin-bottom:8px;font-size:11px;display:block}.loop__field input,.loop__field textarea{color:#fff;border-radius:var(--radius-sm);resize:vertical;background:#ffffff0a;border:1px solid #ffffff29;width:100%;padding:13px 14px;font-family:inherit;font-size:14.5px}.loop__field input:focus,.loop__field textarea:focus{border-color:var(--green-bright);outline:none}.loop__field input:disabled,.loop__field textarea:disabled{opacity:.6}.loop__field--error input,.loop__field--error textarea{border-color:#ff6b5b}.loop__error{color:var(--green-bright);margin-top:6px;font-size:12.5px;line-height:1.4;display:block}.loop__error--submit{margin:-6px 0 16px}.loop__submit{border-radius:var(--radius-sm);background:var(--green);color:#04120b;cursor:pointer;border:0;justify-content:center;align-items:center;width:100%;padding:15px 20px;font-size:15px;font-weight:600;transition:background .16s;display:inline-flex}.loop__submit:hover:not(:disabled){background:var(--green-hover)}.loop__submit:disabled{opacity:.7;cursor:not-allowed}.loop__done{border-radius:var(--radius-sm);color:#fff;background:#00c4001a;border:1px solid #00c4004d;align-items:flex-start;gap:12px;padding:18px;font-size:14.5px;line-height:1.5;display:flex}.loop__done svg{color:var(--green-bright);flex:none;margin-top:2px}@media (width<=900px){.stayloop__grid{grid-template-columns:1fr;gap:56px}}@media (width<=520px){.loop__row{grid-template-columns:1fr}.stayloop{padding:64px 0 72px}}'
        }
      </JSXStyle>
    </section>
  );
}
let _ = [
    {
      Icon: Icons.IconHome,
      title: 'Residential',
      text: 'Downlights, strip, fans and smart control for new builds and renos — planned room by room with the layout app.',
      linkLabel: 'Shop the range',
      href: '/products/',
    },
    {
      Icon: Icons.IconBuilding,
      title: 'Commercial & Schools',
      text: 'Panels, battens and emergency lighting for offices, shops and classrooms — compliant, efficient, and priced for projects.',
      linkLabel: 'Commercial lighting',
      href: '/commercial-lighting-perth/',
    },
    {
      Icon: Icons.IconIndustrial,
      title: 'Industrial & Sport',
      text: 'High bays, floods and sports lighting for warehouses, workshops, courts and ovals — built for long hours and hard use.',
      linkLabel: 'Industrial & flood',
      href: '/industrial-lighting-perth/',
    },
  ],
  J = dynamic(() => import('../components/home/Journal'), {
    ssr: !1,
  });
function b(e, a) {
  let s = a.indexOf('#');
  if (-1 === s || '/' !== (a.slice(0, s) || '/')) return;
  let r = a.slice(s + 1);
  (e.preventDefault(),
    document.getElementById(r)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    }));
}
let y = [
    {
      label: 'Downlights',
      slug: 'downlights',
      categoryId: 5,
      productCount: 46,
    },
    {
      label: 'Star Lights',
      slug: 'star-lights',
      categoryId: 18,
      productCount: 41,
    },
    {
      label: 'Strip Lights',
      slug: 'strip-lights',
      categoryId: 11,
      productCount: 17,
      href: '/strip-lights',
    },
    {
      label: 'Ceiling / Panel / Oyster',
      slug: 'ceiling-panel-oyster',
      categoryId: 9,
      productCount: 20,
      navLabel: 'Ceiling / Panel / Oyster Lights',
    },
    {
      label: 'Air Flow / Ceiling Fans',
      slug: 'air-flow-ceiling-fans',
      categoryId: 52,
      productCount: 13,
    },
    {
      label: 'Outdoor / Wall Lights',
      slug: 'outdoor-wall-lights',
      categoryId: 21,
      productCount: 32,
    },
    {
      label: 'Flood / Sports Lighting',
      slug: 'flood-sports-lighting',
      categoryId: 7,
      productCount: 32,
    },
    {
      label: 'Landscape / Garden Lighting',
      slug: 'landscape-garden-lighting',
      categoryId: 58,
      productCount: 23,
    },
    {
      label: 'Industrial Lighting',
      slug: 'industrial-lighting',
      categoryId: 34,
      productCount: 33,
    },
    {
      label: 'School & Commercial Lighting',
      slug: 'school-commercial-lighting',
      categoryId: 12,
      productCount: 65,
      navLabel: 'School & Commercial LED Lighting',
    },
    {
      label: 'High Bay Lights',
      slug: 'high-bay-lights',
      categoryId: 14,
      productCount: 6,
    },
    {
      label: 'Emergency Lights',
      slug: 'emergency-lights',
      categoryId: 67,
      productCount: 2,
    },
    {
      label: '12V/24V Transformers / Controllers',
      slug: 'transformers-controllers',
      categoryId: 17,
      productCount: 6,
    },
    {
      label: 'Batten Fittings / Lights',
      slug: 'batten-fittings',
      categoryId: 23,
      productCount: 8,
      navLabel: 'Batten Fittings / Batten Lights',
    },
    {
      label: 'LED Track / Linear Lights',
      slug: 'led-track-linear-lights',
      categoryId: 66,
      productCount: 4,
    },
    {
      label: 'Switches / Power points',
      slug: 'switches-powerpoints',
      categoryId: 72,
      productCount: 9,
      navLabel: 'Switches / Powerpoints',
    },
    {
      label: 'Smart Life',
      slug: 'smart-life',
      categoryId: 22,
      productCount: 43,
    },
    {
      label: 'Security / Sensors',
      slug: 'security-sensors',
      categoryId: 55,
      productCount: 20,
    },
  ].map((e) => ({
    ...e,
    img: asset.asset(`/images/categories/${e.slug}.webp`),
    href: e.href || nav.categoryHref(e.navLabel || e.label),
  })),
  w = [
    {
      q: 'Do you deliver, and can I pick up my order?',
      a: "We deliver across the Perth metro area, and you're welcome to pick up from our Ellenbrook showroom Monday to Friday, 8am–5pm.",
    },
    {
      q: 'Are your products Australian certified?',
      a: "Yes — every fitting we stock carries the required Australian approvals, so it's safe to install and compliant for sign-off.",
    },
    {
      q: 'What warranty do your products have?',
      a: "Most fittings carry a 2-year limited warranty covering manufacturing faults, provided they're installed by a licensed electrician.",
    },
    {
      q: 'How do I know what size/wattage LED strip I need?',
      a: "Use our Strip Light Finder — answer four quick questions about the space and mood and we'll match you to the right strip and driver.",
    },
    {
      q: 'Can LED strip be cut to length?',
      a: 'Yes — our strip runs have marked cut points at regular intervals, so you cut on-site to the exact length you need.',
    },
    {
      q: 'Are your downlights dimmable, and will they work with my dimmer?',
      a: 'Most are dimmable on standard trailing-edge dimmers. Check the spec sheet on the product page, or ask us to confirm compatibility before you buy.',
    },
    {
      q: 'Do you supply smart lighting that works with what I already have?',
      a: 'Yes — our Smart Life range works with Google Home, Alexa and most existing smart hubs through a single app.',
    },
    {
      q: 'Can you help me plan the lighting for a whole project?',
      a: "Absolutely. Try the free Layout App, or send us your plans and we'll put together a full fit-out quote.",
    },
    {
      q: 'Do you work with electricians, builders and commercial projects?',
      a: 'Yes, we supply trade, builders and commercial projects daily — get in touch about trade pricing and bulk orders.',
    },
    {
      q: "What if something arrives damaged or isn't right?",
      a: "Contact us within 7 days of delivery and we'll arrange a replacement or return — no fuss.",
    },
  ],
  v = [
    {
      icon: Icons.IconLayout,
      title: 'Layout App',
      copy: 'Drop fittings onto your floor plan, get spacing and quantities, and export an estimate in minutes.',
      cta: 'Open the app',
      href: '/layout-app/',
    },
    {
      icon: Icons.IconPlay,
      title: 'Videos & Instructions',
      copy: 'Install guides, wiring how-tos and product walkthroughs so the job goes right the first time.',
      cta: 'Watch & learn',
      href: '/#videos',
    },
    {
      icon: Icons.IconArticle,
      title: 'Blog',
      copy: "Lighting design tips, energy-saving guides and what's new in LED and smart home.",
      cta: 'Read the blog',
      href: '/#blog',
    },
  ],
  N = [
    {
      eyebrow: 'Green Charge',
      title: (
        <>
          {'Home '}
          <span className="energy__accent">battery</span>
          {' &'} <span className="energy__accent">solar</span>
          {' storage'}
        </>
      ),
      copy: "Store the power our panels make by day and run your home — and your LED lighting on it at night. Greenhse's sister brand Green Charge handles supply and install across WA.",
      cta: 'Explore Green Charge',
      href: 'https://www.greencharge.com.au/',
      external: !0,
    },
    {
      eyebrow: 'Switch your thinking · WA',
      title: 'Rebates & efficient upgrades',
      copy: "Swapping halogens for certified LED can cut your lighting bill dramatically. We'll help you spec the right efficient fittings and point you to the WA programs that reward the switch.",
      cta: 'Talk to us about an upgrade',
      href: '/#send-us-your-plans',
      external: !1,
    },
  ],
  k = [
    {
      src: 'https://greenhse.com/media/wysiwyg/REVO_fitness_copy.png',
      label: 'Revo Fitness',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Novotel_copy.png',
      label: 'Novotel',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/myelectrical1_copy.png',
      label: 'My Electrical',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Mazenod_college2_copy.png',
      label: 'Mazenod College',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Good_sammys_copy.png',
      label: "Good Sammy's",
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Amcal_copy.png',
      label: 'Amcal',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Hillaries_copy.png',
      label: 'Hillarys',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Ace_of_cuts_barber_shop.png',
      label: 'Ace of Cuts Barber Shop',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Indoz_homes.png',
      label: 'Indoz Homes',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/JC_Catalano.png',
      label: 'JC Catalano',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Malaga_tile_centre.png',
      label: 'Malaga Tile Centre',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/West_Cape_Howe_Wines.png',
      label: 'West Cape Howe Wines',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Loreto_nedlands_school_copy.png',
      label: 'Loreto Nedlands School',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Vines_resort_copy.png',
      label: 'Vines Resort',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Rendezvous_hotel_copy.png',
      label: 'Rendezvous Hotel',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/IGA_copy.png',
      label: 'IGA',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Tough_glass_copy.png',
      label: 'Tough Glass',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Phenomenon1.png',
      label: 'Phenomenon',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Pan_Pacific_copy.png',
      label: 'Pan Pacific',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Holy_cross_college_copy.png',
      label: 'Holy Cross College',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Sterling2_copy.png',
      label: 'Sterling',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Perth_Ice_Arena_copy.png',
      label: 'Perth Ice Arena',
    },
    {
      src: 'https://greenhse.com/media/wysiwyg/Infant_Jesus_school_copy.png',
      label: 'Infant Jesus School',
    },
  ],
  S = [
    [2700, '#e9b949'],
    [3500, '#f2c97a'],
    [4e3, '#fadfae'],
    [5e3, '#f3efe3'],
    [5700, '#e4ecec'],
    [6500, '#c2d6ea'],
  ];
function C(e) {
  return [e.slice(1, 3), e.slice(3, 5), e.slice(5, 7)].map((e) => parseInt(e, 16));
}
let I = '#0096ff';
function L() {
  let [e, i] = React.useState(2700),
    o = (function (e) {
      for (let a = 0; a < S.length - 1; a++) {
        let [s, r] = S[a],
          [i, o] = S[a + 1];
        if (e >= s && e <= i) {
          let a = (e - s) / (i - s),
            t = (e, s) => Math.round(e + (s - e) * a),
            [n, l, c] = C(r),
            [d, p, f] = C(o);
          return `rgb(${t(n, d)}, ${t(l, p)}, ${t(c, f)})`;
        }
      }
      return S[0][1];
    })(e),
    t = ((e - 2700) / 3800) * 100;
  return (
    <div className="jsx-11ffa8107e963e9 phone">
      <div
        style={{
          '--ptemp': o,
        }}
        className="jsx-11ffa8107e963e9 phone__frame"
      >
        <div className="jsx-11ffa8107e963e9 phone__card">
          <span className="jsx-11ffa8107e963e9 phone__room">Living room · Smart Life</span>
          <span className="jsx-11ffa8107e963e9 phone__temp">{e}K</span>
          <input
            type="range"
            min={2700}
            max={6500}
            step={100}
            value={e}
            onChange={(e) => i(Number(e.target.value))}
            aria-label="Smart Life colour temperature demo"
            style={{
              background: `linear-gradient(to right, ${I} ${t}%, rgba(255, 255, 255, 0.28) ${t}%)`,
            }}
            className="jsx-11ffa8107e963e9 phone__range"
          />
        </div>
      </div>
      <JSXStyle id="11ffa8107e963e9">{`.phone.jsx-11ffa8107e963e9{justify-content:center;display:flex}.phone__frame.jsx-11ffa8107e963e9{aspect-ratio:3/4;background:radial-gradient(60% 46% at 50% 32%, var(--ptemp) 0%, color-mix(in srgb, var(--ptemp) 55%, #100a05) 32%, color-mix(in srgb, var(--ptemp) 18%, #100a05) 62%, #100a05 100%);border:1px solid #ffffff1f;border-radius:30px;width:300px;height:500px;transition:background .4s linear;position:relative;overflow:hidden;box-shadow:0 40px 80px -30px #0009}.phone__card.jsx-11ffa8107e963e9{-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);background:#060d0ab8;border:1px solid #ffffff1f;border-radius:16px;padding:16px 18px 18px;position:absolute;bottom:14px;left:14px;right:14px}.phone__room.jsx-11ffa8107e963e9{font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:#ffffff8f;font-size:9.5px;display:block}.phone__temp.jsx-11ffa8107e963e9{font-family:var(--font-mono);color:var(--ptemp);margin-top:6px;font-size:22px;transition:color .4s linear;display:block}.phone__range.jsx-11ffa8107e963e9{appearance:none;cursor:pointer;background:#ffffff47;border-radius:999px;width:100%;height:6px;margin-top:14px}.phone__range.jsx-11ffa8107e963e9:focus-visible{outline:2px solid ${I};outline-offset:3px}.phone__range.jsx-11ffa8107e963e9::-webkit-slider-runnable-track{background:0 0;border-radius:999px;height:6px}.phone__range.jsx-11ffa8107e963e9::-webkit-slider-thumb{appearance:none;background:${I};border-radius:50%;width:16px;height:16px;margin-top:-5px;box-shadow:0 2px 6px #0006}.phone__range.jsx-11ffa8107e963e9::-moz-range-track{background:0 0;border-radius:999px;height:6px}.phone__range.jsx-11ffa8107e963e9::-moz-range-thumb{background:${I};border:0;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 6px #0006}`}</JSXStyle>
    </div>
  );
}
export default function Default() {
  let [e, i] = React.useState(0),
    c = React.useRef(null),
    p = React.useRef({
      down: !1,
      moved: !1,
      startX: 0,
      startScroll: 0,
    }),
    [f, h] = React.useState(() => new Set());
  function x(e) {
    h((a) => (a.has(e) ? a : new Set(a).add(e)));
  }
  function u(e) {
    let a = c.current;
    a &&
      a.scrollBy({
        left: e * a.clientWidth * 0.8,
        behavior: 'smooth',
      });
  }
  function S() {
    p.current.down = !1;
  }
  return (
    React.useEffect(() => {
      if ('#browse' !== window.location.hash) return;
      document.getElementById('browse')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      let e = setTimeout(() => {
        document.getElementById('site-search-input')?.focus();
      }, 400);
      return () => clearTimeout(e);
    }, []),
    (
      <main className="jsx-3988e63fd8c19874 home">
        <T />
        <section id="categories" className="jsx-3988e63fd8c19874 cats">
          <div className="jsx-3988e63fd8c19874 container">
            <div className="jsx-3988e63fd8c19874 head-row">
              <div className="jsx-3988e63fd8c19874 section-head">
                <span className="jsx-3988e63fd8c19874 eyebrow">The Range</span>
                <h2 className="jsx-3988e63fd8c19874 section-title">Everything that lights a space</h2>
                <p className="jsx-3988e63fd8c19874 section-sub">
                  The full Greenhse catalogue, organised the way an electrician or specifier actually shops it.
                </p>
              </div>
              <a
                onClick={() => {
                  document.getElementById('browse')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                target="_blank"
                rel="noreferrer noopener"
                className="jsx-3988e63fd8c19874 cursor-pointer link-mono head-row__link"
              >
                {'View all products '}
                <span aria-hidden="true" className="jsx-3988e63fd8c19874">
                  →
                </span>
              </a>
            </div>
            <div className="jsx-3988e63fd8c19874 cats__grid">
              {y.map((e) => {
                let s = (
                  <>
                    <img
                      src={e.img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="jsx-3988e63fd8c19874 tile__img"
                    />
                    <span className="jsx-3988e63fd8c19874 sr-only">{e.label}</span>
                  </>
                );
                return e.href.startsWith('/') ? (
                  <Link key={e.label} href={e.href} className="tile">
                    {s}
                  </Link>
                ) : (
                  <a
                    key={e.label}
                    href={e.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="jsx-3988e63fd8c19874 tile"
                  >
                    {s}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        <BrowseGrid limit={8} showViewAll={!0} />
        <section className="jsx-3988e63fd8c19874 smart">
          <div className="jsx-3988e63fd8c19874 container smart__inner">
            <div className="jsx-3988e63fd8c19874 smart__copy">
              <span className="jsx-3988e63fd8c19874 eyebrow eyebrow--light">Smart Life</span>
              <h2 className="jsx-3988e63fd8c19874 smart__title">Your whole home, one tap away</h2>
              <p className="jsx-3988e63fd8c19874 smart__sub">
                Greenhse smart lighting and automation lets you dim, schedule, group and voice-control every fitting —
                no rewiring, no hub headaches. Works with the lights you're already buying.
              </p>
              <ul className="jsx-3988e63fd8c19874 smart__list">
                <li className="jsx-3988e63fd8c19874">
                  <Icons.IconSliders aria-hidden="true" />
                  <span className="jsx-3988e63fd8c19874">
                    <b className="jsx-3988e63fd8c19874">Tune the light</b>
                    <p className="jsx-3988e63fd8c19874">
                      Warm to cool white plus full RGB on smart downlights and strip.
                    </p>
                  </span>
                </li>
                <li className="jsx-3988e63fd8c19874">
                  <Icons.IconClock aria-hidden="true" />
                  <span className="jsx-3988e63fd8c19874">
                    <b className="jsx-3988e63fd8c19874">{'Schedules & scenes'}</b>
                    <p className="jsx-3988e63fd8c19874">Sunrise wake-ups, away mode, one-tap "movie night".</p>
                  </span>
                </li>
                <li className="jsx-3988e63fd8c19874">
                  <Icons.IconSparkle aria-hidden="true" />
                  <span className="jsx-3988e63fd8c19874">
                    <b className="jsx-3988e63fd8c19874">{'Voice & app'}</b>
                    <p className="jsx-3988e63fd8c19874">Alexa, Google Home and the Smart Life app, out of the box.</p>
                  </span>
                </li>
              </ul>
              <a
                href={nav.navLinks.find((e) => 'Smart Life' === e.label)?.href || '#'}
                target="_blank"
                rel="noreferrer noopener"
                className="jsx-3988e63fd8c19874 btn smart__cta"
              >
                {'Shop smart lighting '}
                <span aria-hidden="true" className="jsx-3988e63fd8c19874">
                  →
                </span>
              </a>
            </div>
            <L />
          </div>
        </section>
        <section id="green-charge" className="jsx-3988e63fd8c19874 energy">
          <div className="jsx-3988e63fd8c19874 container">
            <div className="jsx-3988e63fd8c19874 section-head">
              <span className="jsx-3988e63fd8c19874 eyebrow energy__head-eyebrow">
                Save energy, switch your thinking
              </span>
              <h2 className="jsx-3988e63fd8c19874 section-title energy__head-title">Lighting is just the start</h2>
            </div>
            <div className="jsx-3988e63fd8c19874 energy__grid">
              {N.map((e) => (
                <div key={e.cta} className="jsx-3988e63fd8c19874 energy__card">
                  <span className="jsx-3988e63fd8c19874 eyebrow eyebrow--light">{e.eyebrow}</span>
                  <h3 className="jsx-3988e63fd8c19874 energy__title">{e.title}</h3>
                  <p className="jsx-3988e63fd8c19874 energy__copy">{e.copy}</p>
                  {e.external ? (
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="jsx-3988e63fd8c19874 btn energy__cta"
                    >
                      {e.cta}{' '}
                      <span aria-hidden="true" className="jsx-3988e63fd8c19874">
                        →
                      </span>
                    </a>
                  ) : (
                    <a
                      href={e.href}
                      onClick={(a) => b(a, e.href)}
                      className="jsx-3988e63fd8c19874 btn energy__cta energy__cta--ghost"
                    >
                      {e.cta}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="applications" className="jsx-3988e63fd8c19874 applications">
          <div className="jsx-3988e63fd8c19874 container">
            <div className="jsx-3988e63fd8c19874 head-row">
              <div className="jsx-3988e63fd8c19874 section-head">
                <span className="jsx-3988e63fd8c19874 eyebrow">Applications</span>
                <h2 className="jsx-3988e63fd8c19874 section-title">Lighting for every kind of project</h2>
                <p className="jsx-3988e63fd8c19874 section-sub">
                  The same certified range, specified for the realities of each space.
                </p>
              </div>
              <Link href="/contact/" className="link-mono head-row__link">
                {'Trade & project enquiries '}
                <span aria-hidden="true" className="jsx-3988e63fd8c19874">
                  →
                </span>
              </Link>
            </div>
            <div className="jsx-3988e63fd8c19874 applications__types">
              {_.map(({ Icon: E, title: s, text: r, linkLabel: i, href: t }) => (
                <div key={s} className="jsx-3988e63fd8c19874 applications__type">
                  <E aria-hidden="true" className="jsx-3988e63fd8c19874 applications__type-icon" />
                  <h3 className="jsx-3988e63fd8c19874">{s}</h3>
                  <p className="jsx-3988e63fd8c19874">{r}</p>
                  <Link href={t} className="link-mono applications__type-link">
                    {i}{' '}
                    <span aria-hidden="true" className="jsx-3988e63fd8c19874">
                      →
                    </span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="jsx-3988e63fd8c19874 applications__carousel">
              <button
                type="button"
                onClick={() => u(-1)}
                aria-label="Scroll to previous projects"
                className="jsx-3988e63fd8c19874 applications__arrow applications__arrow--prev"
              >
                <Icons.IconChevronDown aria-hidden="true" />
              </button>
              <div
                ref={c}
                onPointerDown={function (e) {
                  if ('touch' === e.pointerType) return;
                  let a = c.current;
                  a &&
                    ((p.current = {
                      down: !0,
                      moved: !1,
                      startX: e.clientX,
                      startScroll: a.scrollLeft,
                    }),
                    a.setPointerCapture(e.pointerId));
                }}
                onPointerMove={function (e) {
                  let a = p.current,
                    s = c.current;
                  if (!a.down || !s) return;
                  let r = e.clientX - a.startX;
                  (Math.abs(r) > 4 && (a.moved = !0), (s.scrollLeft = a.startScroll - r));
                }}
                onPointerUp={S}
                onPointerLeave={S}
                onClickCapture={function (e) {
                  p.current.moved && (e.preventDefault(), e.stopPropagation(), (p.current.moved = !1));
                }}
                className="jsx-3988e63fd8c19874 applications__track"
              >
                {k.map((e) => {
                  let s = f.has(e.src);
                  return (
                    <div key={e.src} className="jsx-3988e63fd8c19874 applications__slide">
                      {!s && <div aria-hidden="true" className="jsx-3988e63fd8c19874 applications__slide-sk" />}
                      <img
                        src={e.src}
                        alt={e.label}
                        loading="lazy"
                        draggable={!1}
                        onLoad={() => x(e.src)}
                        onError={() => x(e.src)}
                        className={'jsx-3988e63fd8c19874 ' + ((s ? 'is-loaded' : '') || '')}
                      />
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => u(1)}
                aria-label="Scroll to more projects"
                className="jsx-3988e63fd8c19874 applications__arrow applications__arrow--next"
              >
                <Icons.IconChevronDown aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
        <section id="resources" className="jsx-3988e63fd8c19874 plan">
          <div className="jsx-3988e63fd8c19874 container">
            <div className="jsx-3988e63fd8c19874 section-head">
              <span className="jsx-3988e63fd8c19874 eyebrow">Resources</span>
              <h2 className="jsx-3988e63fd8c19874 section-title">Plan it before you buy it</h2>
            </div>
            <div className="jsx-3988e63fd8c19874 plan__grid">
              {v.map(({ icon: EC, title: s, copy: r, cta: i, href: o }) => (
                <a
                  key={s}
                  href={o}
                  target={o.startsWith('/') ? void 0 : '_blank'}
                  rel={o.startsWith('/') ? void 0 : 'noreferrer noopener'}
                  onClick={(e) => b(e, o)}
                  className="jsx-3988e63fd8c19874 plan__card"
                >
                  <EC aria-hidden="true" className="jsx-3988e63fd8c19874 plan__icon" />
                  <h3 className="jsx-3988e63fd8c19874 plan__title">{s}</h3>
                  <p className="jsx-3988e63fd8c19874 plan__copy">{r}</p>
                  <span className="jsx-3988e63fd8c19874 link-mono plan__link">
                    {i}{' '}
                    <span aria-hidden="true" className="jsx-3988e63fd8c19874">
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <J />
        <VideosSection />
        <section id="faq" className="jsx-3988e63fd8c19874 faq">
          <div className="jsx-3988e63fd8c19874 container">
            <div className="jsx-3988e63fd8c19874 section-head faq__head">
              <span className="jsx-3988e63fd8c19874 eyebrow">FAQ</span>
              <h2 className="jsx-3988e63fd8c19874 section-title">Good to know</h2>
            </div>
            <div className="jsx-3988e63fd8c19874 faq__list">
              {w.map((s, r) => {
                let o = e === r;
                return (
                  <div key={s.q} className={`jsx-3988e63fd8c19874 faq__item${o ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      aria-expanded={o}
                      onClick={() => i(o ? null : r)}
                      className="jsx-3988e63fd8c19874 faq__q"
                    >
                      <span className="jsx-3988e63fd8c19874">{s.q}</span>
                      {o ? <Icons.IconMinus aria-hidden="true" /> : <Icons.IconPlus aria-hidden="true" />}
                    </button>
                    {o && <p className="jsx-3988e63fd8c19874 faq__a">{s.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="about" className="jsx-3988e63fd8c19874 about">
          <div className="jsx-3988e63fd8c19874 container">
            <div className="jsx-3988e63fd8c19874 about__grid">
              <div className="jsx-3988e63fd8c19874">
                <span className="jsx-3988e63fd8c19874 eyebrow">About Greenhse</span>
                <h2 className="jsx-3988e63fd8c19874 section-title">Perth's lighting specialists</h2>
                <p className="jsx-3988e63fd8c19874 about__copy">
                  Greenhse Technologies is a Perth-based supplier of LED lighting and smart home technology. From a
                  single downlight to a full commercial fit-out, we bring together a certified, energy-smart range,
                  hands-on advice and genuine local support — all in one place.
                </p>
                <p className="jsx-3988e63fd8c19874 about__copy">
                  We work with homeowners, electricians, builders and businesses across Western Australia, backing every
                  product with practical know-how and our Ellenbrook showroom team.
                </p>
              </div>
              <div className="jsx-3988e63fd8c19874 about__card">
                <h3 className="jsx-3988e63fd8c19874 about__card-title">Visit or call us</h3>
                <p className="jsx-3988e63fd8c19874 about__line">
                  <b className="jsx-3988e63fd8c19874">Showroom</b>
                  <br className="jsx-3988e63fd8c19874" />
                  {nav.company.showroom.address}
                </p>
                <p className="jsx-3988e63fd8c19874 about__line">
                  <b className="jsx-3988e63fd8c19874">Phone</b>
                  <br className="jsx-3988e63fd8c19874" />
                  <a href={nav.company.showroom.phoneHref} className="jsx-3988e63fd8c19874">
                    {nav.company.showroom.phone}
                  </a>
                </p>
                <p className="jsx-3988e63fd8c19874 about__line">
                  <b className="jsx-3988e63fd8c19874">Hours</b>
                  <br className="jsx-3988e63fd8c19874" />
                  {nav.company.showroom.hours}
                </p>
                <a
                  href="https://maps.google.com/?q=5/1+Locke+Ln,+Ellenbrook+WA+6069"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="jsx-3988e63fd8c19874 btn btn-dark about__cta"
                >
                  {'Get directions '}
                  <span aria-hidden="true" className="jsx-3988e63fd8c19874">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <G />
        <JSXStyle id="3988e63fd8c19874">
          {
            '.section-head.jsx-3988e63fd8c19874{margin-bottom:34px}.section-title.jsx-3988e63fd8c19874{letter-spacing:-.03em;margin:10px 0;font-size:max(28px,min(3.4vw,40px));font-weight:600;line-height:1.14}.section-title--light.jsx-3988e63fd8c19874{color:#fff}.section-sub.jsx-3988e63fd8c19874{color:var(--ink-soft);max-width:56ch;margin:0;font-size:15px;line-height:1.6}.eyebrow--light.jsx-3988e63fd8c19874{color:var(--green-bright)}.head-row.jsx-3988e63fd8c19874{justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:34px;display:flex}.head-row.jsx-3988e63fd8c19874 .section-head.jsx-3988e63fd8c19874{margin-bottom:0}.head-row__link{flex:none;margin-bottom:6px}.cats.jsx-3988e63fd8c19874{padding:64px 0 10px}.cats__grid.jsx-3988e63fd8c19874{grid-template-columns:repeat(4,1fr);gap:10px;margin-top:34px;display:grid}.tile{aspect-ratio:825/560;border-radius:var(--radius-sm);color:#fff;display:block;position:relative;overflow:hidden}.tile__img{object-fit:cover;width:100%;height:100%;transition:transform .35s;position:absolute;inset:0}.tile:hover .tile__img{transform:scale(1.05)}.smart.jsx-3988e63fd8c19874{background:#060d0a;padding:88px 0}.smart__inner.jsx-3988e63fd8c19874{grid-template-columns:1.1fr .9fr;align-items:center;gap:56px;display:grid}.smart__title.jsx-3988e63fd8c19874{letter-spacing:-.03em;color:#fff;margin:10px 0 14px;font-size:max(28px,min(3.4vw,40px));font-weight:600;line-height:1.14}.smart__sub.jsx-3988e63fd8c19874{color:#ffffffad;max-width:48ch;margin:0 0 28px;font-size:15px;line-height:1.62}.smart__list.jsx-3988e63fd8c19874{flex-direction:column;margin:0 0 32px;padding:0;list-style:none;display:flex}.smart__list.jsx-3988e63fd8c19874 li.jsx-3988e63fd8c19874{border:1px solid #ffffff29;align-items:center;gap:16px;padding:16px 18px;display:flex}.smart__list.jsx-3988e63fd8c19874 li.jsx-3988e63fd8c19874 b.jsx-3988e63fd8c19874{color:#fff;margin-bottom:4px;font-size:15px;font-weight:600;display:block}.smart__list.jsx-3988e63fd8c19874 li.jsx-3988e63fd8c19874 p.jsx-3988e63fd8c19874{color:#ffffff9e;margin:0;font-size:13.5px;line-height:1.5}.smart__list.jsx-3988e63fd8c19874 svg{color:#ffffffe6;flex:none;width:22px;height:22px}.smart__cta.jsx-3988e63fd8c19874{background:var(--green-bright);color:#04120b}.smart__cta.jsx-3988e63fd8c19874:hover{background:var(--green-hover)}.energy.jsx-3988e63fd8c19874{background:var(--green-bright);padding:72px 0}.energy__head-eyebrow.jsx-3988e63fd8c19874{color:#04120b;opacity:.7}.energy__head-title.jsx-3988e63fd8c19874{color:#04120b}.energy__grid.jsx-3988e63fd8c19874{grid-template-columns:repeat(2,1fr);gap:24px;display:grid}.energy__card.jsx-3988e63fd8c19874{border-radius:var(--radius-md);background:radial-gradient(120% 140% at 20% 0,#1c4a2c 0%,#0c1f14 55%,#060d0a 100%);padding:30px 30px 26px}.energy__title.jsx-3988e63fd8c19874{letter-spacing:-.01em;color:#fff;margin:8px 0 12px;font-size:22px;font-weight:600}.energy__accent.jsx-3988e63fd8c19874{color:var(--green-bright)}.energy__copy.jsx-3988e63fd8c19874{color:#ffffffb8;margin:0 0 22px;font-size:14px;line-height:1.62}.energy__cta.jsx-3988e63fd8c19874{background:var(--green-bright);color:#04120b}.energy__cta.jsx-3988e63fd8c19874:hover{background:var(--green-hover)}.energy__cta--ghost.jsx-3988e63fd8c19874{color:#fff;background:0 0;border:1px solid #fff6}.energy__cta--ghost.jsx-3988e63fd8c19874:hover{background:#ffffff14;border-color:#fff}.applications.jsx-3988e63fd8c19874{padding:80px 0 8px}.applications__types.jsx-3988e63fd8c19874{grid-template-columns:repeat(3,1fr);gap:24px;margin:32px 0 48px;display:grid}.applications__type.jsx-3988e63fd8c19874{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-sm);padding:26px 24px}.applications__type.jsx-3988e63fd8c19874 .applications__type-icon{width:30px;height:30px;color:var(--green);margin-bottom:16px}.applications__type.jsx-3988e63fd8c19874 h3.jsx-3988e63fd8c19874{letter-spacing:-.01em;margin:0 0 8px;font-size:18px;font-weight:600}.applications__type.jsx-3988e63fd8c19874 p.jsx-3988e63fd8c19874{color:var(--ink-soft);margin:0 0 16px;font-size:14px;line-height:1.6}.applications__type-link.jsx-3988e63fd8c19874{font-size:12px}.applications__carousel.jsx-3988e63fd8c19874{align-items:center;gap:14px;display:flex}.applications__track.jsx-3988e63fd8c19874{scroll-snap-type:x mandatory;scrollbar-width:none;cursor:grab;-webkit-user-select:none;user-select:none;gap:24px;padding:4px;display:flex;overflow-x:auto}.applications__track.jsx-3988e63fd8c19874:active{cursor:grabbing}.applications__track.jsx-3988e63fd8c19874::-webkit-scrollbar{display:none}.applications__slide.jsx-3988e63fd8c19874{aspect-ratio:3/4;scroll-snap-align:start;border:1px solid var(--line-strong);border-radius:var(--radius-md);flex:none;width:max(140px,min(25vw - 68px,257px));transition:transform .25s,box-shadow .25s,border-color .25s;position:relative;overflow:hidden;box-shadow:0 4px 16px #14150f1a}.applications__slide.jsx-3988e63fd8c19874:hover{border-color:var(--green);transform:translateY(-8px);box-shadow:0 22px 40px -12px #14150f4d}.applications__slide.jsx-3988e63fd8c19874 img.jsx-3988e63fd8c19874{object-fit:cover;opacity:0;width:100%;height:100%;transition:opacity .3s,transform .5s;display:block}.applications__slide.jsx-3988e63fd8c19874 img.is-loaded.jsx-3988e63fd8c19874{opacity:1}.applications__slide.jsx-3988e63fd8c19874:hover img.jsx-3988e63fd8c19874{transform:scale(1.08)}.applications__slide-sk.jsx-3988e63fd8c19874{background:linear-gradient(90deg, var(--line) 0%, var(--line-strong) 50%, var(--line) 100%);background-size:200% 100%;animation:1.4s ease-in-out infinite applications-sk-shimmer;position:absolute;inset:0}@keyframes applications-sk-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.applications__slide-sk.jsx-3988e63fd8c19874{animation:none}}.applications__arrow.jsx-3988e63fd8c19874{border:1px solid var(--line-strong);width:52px;height:52px;color:var(--ink);cursor:pointer;background:#fff;border-radius:999px;flex:none;justify-content:center;align-items:center;transition:border-color .16s,color .16s,background .16s,transform .16s;display:flex}.applications__arrow.jsx-3988e63fd8c19874:hover{border-color:var(--green);color:var(--green);transform:scale(1.06)}.applications__arrow.jsx-3988e63fd8c19874:active{transform:scale(.96)}.applications__arrow--prev.jsx-3988e63fd8c19874 svg{transform:rotate(90deg)}.applications__arrow--next.jsx-3988e63fd8c19874 svg{transform:rotate(-90deg)}@media (width<=640px){.applications__arrow.jsx-3988e63fd8c19874{display:none}.applications__slide.jsx-3988e63fd8c19874{width:max(200px,min(66vw,260px))}}.plan.jsx-3988e63fd8c19874{padding:80px 0}.plan__grid.jsx-3988e63fd8c19874{background:var(--line);border:1px solid var(--line);border-radius:var(--radius-sm);grid-template-columns:repeat(3,1fr);gap:1px;display:grid;overflow:hidden}.plan__card.jsx-3988e63fd8c19874{background:#fff;flex-direction:column;padding:30px 26px;transition:background .16s;display:flex}.plan__card.jsx-3988e63fd8c19874:hover{background:#f7f7f2}.plan__icon{color:var(--green);margin-bottom:16px}.plan__title.jsx-3988e63fd8c19874{letter-spacing:-.01em;margin:0 0 8px;font-size:17px;font-weight:600}.plan__copy.jsx-3988e63fd8c19874{color:var(--ink-soft);margin:0 0 20px;font-size:13.5px;line-height:1.6}.plan__link.jsx-3988e63fd8c19874{margin-top:auto}.faq.jsx-3988e63fd8c19874{background:var(--bg);padding:88px 0 100px}.faq__head.jsx-3988e63fd8c19874{text-align:center;max-width:640px;margin:0 auto 44px}.faq__list.jsx-3988e63fd8c19874{border-top:1px solid var(--line-strong);max-width:780px;margin:0 auto}.faq__item.jsx-3988e63fd8c19874{border-bottom:1px solid var(--line-strong)}.faq__q.jsx-3988e63fd8c19874{cursor:pointer;text-align:left;width:100%;color:var(--ink);background:0 0;border:0;justify-content:space-between;align-items:center;gap:20px;padding:22px 4px;font-size:16px;font-weight:600;transition:color .16s;display:flex}.faq__q.jsx-3988e63fd8c19874:hover{color:var(--green)}.faq__q.jsx-3988e63fd8c19874 svg{color:var(--ink);flex:none}.faq__item.is-open.jsx-3988e63fd8c19874 .faq__q.jsx-3988e63fd8c19874{color:var(--ink)}.faq__a.jsx-3988e63fd8c19874{max-width:68ch;color:var(--ink-soft);margin:-6px 0 22px;padding:0 4px;font-size:14px;line-height:1.65}.about.jsx-3988e63fd8c19874{background:var(--bg-raised);padding:80px 0}.about__grid.jsx-3988e63fd8c19874{grid-template-columns:1.05fr .95fr;align-items:center;gap:60px;display:grid}.about__copy.jsx-3988e63fd8c19874{color:var(--ink-soft);margin:0 0 16px;font-size:15px;line-height:1.7}.about__card.jsx-3988e63fd8c19874{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-md);padding:30px}.about__card-title.jsx-3988e63fd8c19874{margin:0 0 18px;font-size:18px;font-weight:600}.about__line.jsx-3988e63fd8c19874{color:var(--ink);margin:0 0 14px;font-size:14px;line-height:1.5}.about__line.jsx-3988e63fd8c19874 a.jsx-3988e63fd8c19874{color:var(--ink)}.about__line.jsx-3988e63fd8c19874 a.jsx-3988e63fd8c19874:hover{color:var(--green)}.about__cta.jsx-3988e63fd8c19874{margin-top:6px}@media (width<=1080px){.cats__grid.jsx-3988e63fd8c19874{grid-template-columns:repeat(3,1fr)}.smart__inner.jsx-3988e63fd8c19874{grid-template-columns:1fr}.phone{order:-1}}@media (width<=860px){.energy__grid.jsx-3988e63fd8c19874,.plan__grid.jsx-3988e63fd8c19874,.about__grid.jsx-3988e63fd8c19874{grid-template-columns:1fr}.about__grid.jsx-3988e63fd8c19874{gap:34px}.applications__types.jsx-3988e63fd8c19874{grid-template-columns:1fr}}@media (width<=640px){.head-row.jsx-3988e63fd8c19874{flex-direction:column;align-items:flex-start;gap:16px}.cats__grid.jsx-3988e63fd8c19874{grid-template-columns:repeat(2,1fr)}}'
          }
        </JSXStyle>
      </main>
    )
  );
}
