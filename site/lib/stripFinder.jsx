import * as api from './api';
import * as asset from './asset';
let r = [
  {
    key: 'place',
    q: 'Where exactly is the strip light going?',
    hint: "Simple rule: if steam or water can ever reach it, it needs the IP65 wet-area strip. Dry joinery (inside shelving & cabinets) doesn't need waterproofing at all.",
    opts: [
      ['Recessed ceiling / cove (a hidden shelf or bulkhead in the ceiling)', 'cove'],
      ['Wet areas — kitchen benchtops, bathroom niches, outdoors (steam or water)', 'wet'],
      ['Shelving & cabinets — dry inside joinery (no water can reach it)', 'cabinet'],
      ['Stairs or hallway', 'stairs'],
      ['Long run strip light — one continuous line over about 10 metres', 'longrun'],
      ['Signage, curves or letters — a shape a straight strip will not follow', 'neon'],
      ['Shop, display or food cabinet', 'display'],
      ['Somewhere else', 'other'],
    ],
  },
  {
    key: 'space',
    q: 'How much flat space is inside your ceiling recess?',
    when: (e) => 'cove' === e.place,
    hint: '240V strip sits on a shelf inside the recess. Have a look inside yours — which one is it?',
    opts: [
      ["Yes — there's a flat shelf about 150mm across", 'roomy'],
      ["No — it's tighter than that, or I'm not sure", 'tight'],
    ],
  },
  {
    key: 'brightness',
    q: 'How bright does this spot need to be?',
    when: (e) => 'wet' === e.place,
    hint: 'Both are the sealed IP65 wet-area strip. Standard is plenty for benchtops and niches. Go bright (20W/m) where you want it to really pop — a bright bathroom, a feature wall, or task light over a big bench.',
    opts: [
      ['Standard brightness — 12W/m', 'standard'],
      ['Bright — 20W/m (make it stand out) ⭐', 'bright'],
    ],
  },
  {
    key: 'colour',
    q: 'What colour light do you want?',
    when: (e) => !n(e),
    hint: (e) =>
      'cove' === e.place
        ? '240V recessed strip comes in fixed colours: 3000K warm, 4000K natural, 6000K cool, blue — or full-colour RGB.'
        : 'wet' === e.place
          ? 'bright' === e.brightness
            ? 'The 20W/m bright variant is only made in two colours — 4000K natural and 5700K crisp. Need a warm white? Go back and pick standard brightness.'
            : 'Wet areas use the 24V High Lumen SMD — fixed single-colour whites only: 2700K and 3000K warm, 4000K natural, 5700K crisp. (No RGB or adjustable white in this range.)'
          : 'Fixed whites come in 2700/3000K (warm & cosy), 4000K (natural) and 5700K (crisp). CCT = adjust warm↔cool (2700–6500K) with the remote. RGB = millions of colours — note its white is less natural than a dedicated white strip.',
    opts: (e) =>
      'cove' === e.place
        ? [
            ['Warm white — 3000K', 'w3000'],
            ['Natural white — 4000K', 'w4000'],
            ['Cool white — 6000K', 'w6000'],
            ['Blue', 'blue'],
            ['Full colour (RGB)', 'rgb'],
          ]
        : 'wet' === e.place
          ? /* The colours offered have to be the colours the strip is made in.
               Off the brochure: the 12 W/m comes in 2700, 3000, 4000 and 5700K,
               the 20 W/m in 4000 and 5700K only. This list used to offer 5500K
               and 6000K — neither exists in this range — and left 2700K out. */
            'bright' === e.brightness
            ? [
                ['Natural white — 4000K', 'w4000'],
                ['Crisp white — 5700K', 'w5700'],
              ]
            : [
                ['Extra warm white — 2700K', 'w2700'],
                ['Warm white — 3000K', 'w3000'],
                ['Natural white — 4000K', 'w4000'],
                ['Crisp white — 5700K', 'w5700'],
              ]
          : [
              ['One fixed white (pick warm, natural or cool)', 'single'],
              ['Adjustable white — warm ↔ cool with the remote (CCT)', 'cct'],
              ['Full colour (RGB) — millions of colours', 'rgb'],
            ],
  },
  {
    key: 'control',
    q: 'How do you want to control it?',
    when: (e) => 'cove' !== e.place && !n(e),
    hint: "Either way you get a controller in the kit — it's the box that lets you dim the light and turn it on and off. The only difference is how you talk to it: a handheld remote, or your phone.",
    opts: [
      ['Simple — with a remote', 'simple'],
      ['Smart — from the phone app', 'smart'],
    ],
  },
  {
    key: 'length',
    q: 'How many metres do you need?',
    input: !0,
    hint: (e) =>
      n(e)
        ? "Type your run length in metres. The Long Run COB is made for long runs — 5 metres and up. Shorter than that and we'll point you at a better-suited strip, so give us a call."
        : 'cove' === e.place
          ? "Type your exact run length. 240V recessed strip: whites 10–50m, RGB 10–35m. Under 10 metres? We'll ask you to give us a quick call — (08) 9297 2969."
          : "Type your run length in metres. 24V strip feeds from one end up to 5m; 5–10m needs power from TWO points (e.g. two corners). Over 10 metres? We'll ask you to give us a quick call.",
  },
];
function n(e) {
  return 'longrun' === e.place || ('cove' === e.place && 'tight' === e.space);
}
let s = {
    /* Every card in the finder now shows the actual product rather than a
       styled room. Lazar's note: "the finder needs to just have product images
       so they can actually see what is good." These are the Greenhse product
       photographs off the live catalogue, one per path, so the picture on the
       card is the strip the answer leads to. */
    cove: {
      src: asset.asset('/images/finder/place-cove.webp'),
      alt: '240V LED strip light reels, warm white and cool white',
      caption: '240V strip on the reel — the one that sits in a ceiling recess',
    },
    wet: {
      src: asset.asset('/images/finder/place-wet.webp'),
      alt: 'IP65 silicone sleeved 24V LED strip light on the reel',
      caption: 'The IP65 sleeved strip — sealed the whole way along',
    },
    cabinet: {
      src: asset.asset('/images/finder/place-cabinet.webp'),
      alt: 'Dot-less COB LED strip light coiled and lit warm white',
      caption: 'Dot-less COB — one smooth line, no spots, for open joinery',
    },
    stairs: {
      src: asset.asset('/images/finder/place-stairs.webp'),
      alt: 'Short cut length of COB LED strip light with its lead attached',
      caption: 'Cut to length with a lead on the end — one per step or one run',
    },
    longrun: {
      src: asset.asset('/images/finder/place-longrun.webp'),
      alt: 'Long run 24V COB LED strip light roll',
      caption: 'The long run roll — 20 m from one end, 40 m fed from both',
    },
    neon: {
      src: asset.asset('/images/finder/place-neon.webp'),
      alt: 'Neon flex strip light bent into a zig-zag across a building facade',
      caption: 'Neon flex, bent on its side — it follows a curve or a letter',
    },
    display: {
      src: asset.asset('/images/finder/place-display.webp'),
      alt: 'High lumen high colour SMD display strip light, 240 LEDs per metre',
      caption: 'Display grade — 240 LEDs a metre, CRI 90+ for true colour',
    },
    other: {
      src: asset.asset('/images/finder/place-other.webp'),
      alt: 'Coiled COB LED strip light lit warm white',
      caption: 'The everyday dot-less COB — the one most jobs end up using',
    },
  },
  /* The colour question has no thumbnails. Lazar: "these 2 images should not
     be in the finder" — the CCT and RGB shots were supplier bench photos, a
     loose reel on a worktop with the driver and flying leads in frame, which
     is the opposite of what the rest of the finder now shows. The fixed-white
     shot was a proper studio photo, but one picture above two blank rows reads
     as broken, so the whole set is off and the question stands on its words,
     which already say what each option does. Put three matching studio shots
     in /images/finder/ and fill this object back in to bring them back. */
  o = {},
  a = [
    {
      img: asset.asset('/images/finder/cabinet-cool-white.webp'),
      label: 'Cool white',
      note: 'Crisp and bright — kitchens, task areas, mornings.',
    },
    {
      img: asset.asset('/images/finder/cabinet-warm-white.webp'),
      label: 'Warm white',
      note: 'Soft and cosy — living areas, bedrooms, evenings.',
    },
  ],
  l = [
    {
      img: asset.asset('/images/finder/cabinet-rgb-green.webp'),
      label: 'Green',
      note: '',
    },
    {
      img: asset.asset('/images/finder/cabinet-rgb-blue.webp'),
      label: 'Blue',
      note: '',
    },
    {
      img: asset.asset('/images/finder/cabinet-rgb-red.webp'),
      label: 'Red',
      note: '',
    },
  ];
function d(e, t) {
  let i = e.find((e) => e.sku === t);
  return i?.productLinks?.length
    ? i.productLinks
        .filter((e) => 'associated' === e.link_type)
        .map((t) => e.find((e) => e.sku === t.linked_product_sku))
        .filter(Boolean)
    : [];
}
function c(e) {
  let t = (e.name || '').toLowerCase();
  return /remote/.test(t)
    ? 'remote'
    : /controller/.test(t)
      ? 'controller'
      : /transformer|driver/.test(t)
        ? 'transformer'
        : /channel|profile/.test(t)
          ? 'channel'
          : 'strip';
}
function u(e) {
  let t = `${(e.specs || []).map((e) => e.value).join(' ')} ${e.name}`.toLowerCase().match(/ip\s?(\d{2})/);
  return t ? parseInt(t[1], 10) : 20;
}
/* Watts per metre, read off the product name.
   The catalogue used to carry one strip per family, so each family could hard
   code its wattage. It now carries the same dotless COB at 7.5, 12 and 16 W/m
   and the same SMD at 12, 20 and 23, and the figure is in the name of every
   one of them. Reading it means the driver sizing, the run lengths and the
   wording all follow the product the customer actually picked rather than a
   number frozen when the range was smaller. Falls back to the family default
   when a name carries no figure. */
function wattsPerMetre(e, t) {
  let i = String((e && e.name) || '')
    .toLowerCase()
    .match(/(\d+(?:\.\d+)?)\s*w\s*\/?\s*m/);
  return i ? parseFloat(i[1]) : t;
}
/* How far a 24V run goes before it has to be fed from the other end too.
   Voltage drop decides this, so it tracks watts per metre: the 7.5 W/m COB is
   sold on 40 m rolls, the 16 W/m COB wants a feed every 5 m. These are the
   numbers off the product pages, not a formula. */
function runLimits(e) {
  /* Only the low wattage COB is the long run product — that is the one sold on
     20 and 40 metre rolls. Everything else in the COB range is 5 m from one end
     and 10 m fed from both, which is what the strip lighting brochure states for
     the whole family. The middle band used to hand the 12 W/m COB 10 m and 20 m,
     which was a straight over-statement: it is not the long run strip. */
  return e <= 8 ? { single: 20, dual: 40 } : { single: 5, dual: 10 };
}
function h(e) {
  let t = e.name.toLowerCase(),
    i = u(e);

  /* ---- Neon flex ----
     Side bend flex, so it takes a curve or a letter shape that no rigid strip
     will follow. Two of them: 6x12mm CCT at IP67, and 12x12mm RGB SPI at IP66.
     Both run on Bluetooth and both need their own matching channel, which is
     why they are their own family rather than another kind of strip. */
  if (t.includes('neon')) {
    let r = t.includes('rgb'),
      n = wattsPerMetre({ name: t }, 10),
      /* Both neon flex products state 5m on a single feed and 10m fed from
         both ends on their own product pages. Not derived - taken from there. */
      o = { single: 5, dual: 10 };
    return {
      fam: 'NEON',
      wpm: n,
      wpmTxt: r ? 'Neon Flex RGB SPI · 12x12mm' : 'Neon Side Bend Flex CCT · 6x12mm',
      single: o.single,
      dual: o.dual,
      channel: 'required',
      /* Both neon grades are IP67 on the brochure — the RGB one used to be
         carried here as IP66, off an older product page. */
      spec: r
        ? `24V Neon Flex RGB SPI · 12x12mm · IP67 · fully programmable · ${o.single}m one feed / ${o.dual}m both ends`
        : `24V Neon Side Bend Flex CCT · 6x12mm · IP67 · 3000–6000K · ${o.single}m one feed / ${o.dual}m both ends`,
      ipTxt: i >= 67 ? `IP${i} — fully sealed, fine outdoors` : `IP${i} — splash resistant`,
      where: 'Signage, curves, letters and feature shapes — anywhere a rigid strip will not bend',
      teach: [
        'Side bend: it curves flat on its side, so it follows a shape or a letter',
        r ? 'Fully programmable colour, addressed section by section' : 'Adjustable warm to cool white, 3000K to 6000K',
        'Bluetooth control, so it needs no WiFi',
        r ? 'Sits in a 12x12mm support channel' : 'Sits in a 6x12mm support channel',
      ],
    };
  }

  /* ---- Addressable RGBW ----
     SPI means each section is addressed on its own, so it chases and fades
     rather than the whole run changing together. The RGBW version has a real
     4000K white in it as well as the colour. */
  if (t.includes('spi')) {
    let n = wattsPerMetre({ name: t }, 14),
      o = { single: 5, dual: 10 };   /* stated on the product page */
    return {
      fam: 'SPI',
      wpm: n,
      wpmTxt: 'RGBW SPI · addressable',
      single: o.single,
      dual: o.dual,
      channel: 'required',
      spec: `24V RGBW SPI · 4000K white plus full colour · IP${i} · fully programmable · ${o.single}m one feed / ${o.dual}m both ends`,
      ipTxt: `IP${i} — indoor and sheltered spots`,
      where: 'Feature walls, bars and anywhere you want the light to move rather than sit still',
      teach: [
        'Addressable: every section is controlled on its own, so it can chase, fade and run effects',
        'RGBW — a real 4000K white as well as the colour, so it works as a light and not only an effect',
        'Bluetooth control, no WiFi needed',
        'A data cable links one run to the next',
      ],
    };
  }

  /* ---- Fresh meat display ----
     A specialist strip: the red and white mix is tuned so meat reads fresh in
     a display cabinet. IP68, because it lives somewhere that gets hosed out. */
  if (t.includes('meat')) {
    let n = wattsPerMetre({ name: t }, 14),
      o = { single: 5, dual: 10 };   /* stated on the product page */
    return {
      fam: 'MEAT',
      wpm: n,
      wpmTxt: 'Fresh Meat display strip · red and white',
      single: o.single,
      dual: o.dual,
      channel: 'required',
      spec: `24V Fresh Meat strip · red and white · ${n}W/m · IP${i} · ${o.single}m one feed / ${o.dual}m both ends`,
      ipTxt: `IP${i} — fully sealed, washes down`,
      where: 'Butcher and deli display cabinets',
      teach: [
        'A red and white mix tuned so fresh meat reads the right colour under it',
        `IP${i} — sealed for a cabinet that gets cleaned down`,
        'Bluetooth control, no WiFi needed',
        'This is a specialist strip. Ring us and we will spec the cabinet with you',
      ],
    };
  }

  /* ---- Display grade SMD ----
     The 23 W/m high colour strip. Very bright and CRI 90+, which is what
     retail display needs, and what separates it from the 12 W/m wet-area SMD
     it shares most of its name with. */
  if (t.includes('display') || (t.includes('high colour') && t.includes('smd'))) {
    let n = wattsPerMetre({ name: t }, 23),
      o = { single: 5, dual: 10 };   /* stated on the product page */
    return {
      fam: 'DISPLAY',
      wpm: n,
      wpmTxt: `High Lumen High Colour SMD · ${n}W/m display grade`,
      single: o.single,
      dual: o.dual,
      channel: 'required',
      spec: `24V High Lumen High Colour SMD · ${n}W/m · up to 3800 lumens a metre · 240 LEDs a metre · CRI 90+ · IP20 or IP65 · ${o.single}m one feed / ${o.dual}m both ends`,
      ipTxt: i >= 65 ? `IP${i} — sealed against steam and splashes` : 'IP20 — dry indoor spots, IP65 available',
      where: 'Retail display, shelving and joinery — anywhere the goods have to look their real colour',
      teach: [
        `Very bright: up to 3800 lumens a metre from ${n}W/m, 240 LEDs a metre`,
        'CRI 90+ — colours read true, which is the whole point in a display',
        'Warm, natural or bright white',
        'Dotless, so it reads as one line of light rather than a row of dots',
      ],
    };
  }

  if (t.includes('240v')) {
    let e = t.includes('rgb');
    return {
      fam: '240V',
      wpm: 10,
      wpmTxt: '240V driver included',
      min: 10,
      single: e ? 35 : 50,
      dual: e ? 35 : 50,
      channel: 'none',
      spec: e
        ? '240V RGB · IP65 · runs 10–35m · $60 driver included · remote only · no channels'
        : '240V · IP65 · 3000/4000/6000K or blue · runs 10–50m · $60 driver included · remote only · no channels',
      ipTxt: 'IP65 — fine with dust & splashes',
      where: 'Recessed ceilings — long runs of 10 metres or more',
      teach: [
        '$60 240V driver INCLUDED — powers it straight from mains',
        e ? 'Long runs only: 10–35 metres (RGB)' : 'Long runs only: 10–50 metres — under 10m? Call us',
        e ? 'Full colour from the remote' : 'Fixed colour white — pick warm, natural or cool',
        "Remote control only — can't be made smart",
      ],
    };
  }
  /* The long run strip is now sold as the 7.5 W/m dotless COB, in 3000K and
     4000K. It used to be listed as "Long Run COB" and the finder matched that
     phrase, so when Magento renamed it this whole branch stopped matching
     anything and the long run answer fell through to a 5 metre strip. Match it
     on what actually makes it the long run strip instead: a COB at 8 W/m or
     under. It is sold on 40, 30, 20, 15 and 10 metre rolls. */
  return t.includes('long run') ||
    t.includes('longrun') ||
    t.includes('long-run') ||
    (t.includes('cob') && wattsPerMetre({ name: t }, 16) <= 8)
    ? (() => {
        let e = wattsPerMetre({ name: t }, 7.5);
        return {
          fam: 'LONGRUN',
          wpm: e,
          wpmTxt: `24V Long Run COB · ${e}W/m`,
          min: 5,
          single: 20,
          dual: 40,
          channel: 'optional',
          connector: 4,
          spec: `24V Long Run dotless COB · ${e}W/m · IP20, IP67 option · 20m one feed / 40m both ends · rolls of 10, 15, 20, 30 and 40m`,
          ipTxt: i >= 65 ? `IP${i} — sealed for wet areas and outdoors` : 'IP20 indoors, IP67 silicon injected version for outdoors',
          where: 'Long continuous runs, 10 metres and up — indoors, or the IP67 version outdoors',
          teach: [
            `Built for distance: ${e}W/m keeps the voltage drop down over a long run`,
            'One driver feeds 20m from one end; power both ends for up to 40m',
            'Comes on 10, 15, 20, 30 and 40 metre rolls, so a long run has no joins in it',
            'Silicon injected IP67 version for outdoors',
            "Under 5m? This isn't the right strip for the job — call us and we'll match something better suited",
          ],
        };
      })()
    : t.includes('rgb') && t.includes('cob')
      ? {
          fam: 'RGBCOB',
          wpm: wattsPerMetre({ name: t }, 16),
          single: 5,
          dual: 10,
          channel: 'required',
          spec: `24V RGB COB · dot-less · ${wattsPerMetre({ name: t }, 16)}W/m · IP${i} · 5m one feed / 10m both ends`,
          ipTxt: i >= 65 ? 'IP65 — handles steam & splashes' : 'IP20 — dry indoor spots',
          where: 'Under kitchen cabinets, bars, bulkheads, shelving — anywhere you want colour',
          teach: [
            'Dot-less: one smooth line of colour, no visible LED dots',
            'Millions of colours + a good cool-white',
            'Feed one end up to 5m; power BOTH ends for up to 10m',
            '16W per metre — needs an aluminium channel to stay cool',
          ],
        }
      : t.includes('cob')
        ? (() => {
            /* The dotless COB is now stocked at 7.5, 12 and 16 W/m, and the
               12 W/m is a fixed 2700K rather than adjustable, so neither the
               wattage nor the colour line can be hard coded any more. */
            let e = wattsPerMetre({ name: t }, 16),
              r = runLimits(e),
              n = t.match(/(\d{4})\s*k/),
              s = n ? `${n[1]}K fixed` : '2700–6500K adjustable';
            return {
              fam: 'CCTCOB',
              wpm: e,
              wpmTxt: `24V dotless COB · ${e}W/m`,
              single: r.single,
              dual: r.dual,
              channel: 'required',
              spec: `24V dotless COB · ${e}W/m · IP${i} · ${s} · ${r.single}m one feed / ${r.dual}m both ends`,
              ipTxt: i >= 65 ? `IP${i} — handles steam and splashes` : 'IP20 — dry indoor spots',
              where: 'Cabinets, shelving, bulkheads — beautiful smooth white light',
              teach: [
                'Dot-less: one clean line of light, no spotty dots',
                n ? `Fixed ${n[1]}K white` : 'Adjustable warm to cool white, 2700K to 6500K, from the remote',
                `Feed one end up to ${r.single}m; power BOTH ends for up to ${r.dual}m`,
                `${e}W per metre — needs an aluminium channel to stay cool`,
                'Connectors join short lengths with no waste, up to 2m',
              ],
            };
          })()
        : t.includes('high lumen')
          ? {
              fam: 'HILUMEN',
              connector: 4,
              wpm: wattsPerMetre({ name: t }, 12),
              wpmTxt: `High Lumen SMD · ${wattsPerMetre({ name: t }, 12)}W/m IP65 wet-area strip`,
              single: 5,
              dual: 10,
              channel: 'required',
              /* Only the 12 W/m is made in all four whites. The 20 W/m is
                 4000K and 5700K only — the finder's own colour question already
                 says so, and this line used to contradict it. */
              spec: `24V High Lumen SMD · CRI 90+ · ${wattsPerMetre({ name: t }, 12)}W/m IP65 · ${wattsPerMetre({ name: t }, 12) >= 18 ? 'fixed whites 4000 & 5700K' : 'fixed whites 2700/3000/4000/5700K'} · 5m one feed / 10m both ends`,
              ipTxt: 'IP65 — sealed against kitchen & bathroom steam',
              where: 'Wet areas indoors — kitchen benchtops, bathroom niches — plus bars, shelving & display',
              teach: [
                'The wet-area pick: IP65 — sealed against kitchen and bathroom steam and splashes',
                wattsPerMetre({ name: t }, 12) >= 18
                  ? 'Fixed single-colour whites — 4000K natural and 5700K crisp (no RGB in this range)'
                  : 'Fixed single-colour whites (2700/3000/4000/5700K) — no RGB in this range',
                'True-colour light (CRI 90+) — things look their real colour',
                'Feed one end up to 5m; power from 2 points for 5–10m',
              ],
            }
          : t.includes('rgb')
            ? {
                fam: 'RGB',
                wpm: 16,
                single: 5,
                dual: 10,
                channel: i >= 67 ? 'none' : 'required',
                spec: `24V RGB SMD \xb7 16W/m \xb7 IP${i} \xb7 5m one feed / 10m both ends`,
                ipTxt: i >= 67 ? 'IP67 — fully weatherproof for outdoors' : 'indoor colour strip',
                where:
                  i >= 67 ? 'Outdoor areas, exterior features, pool & waterfall surrounds' : 'Feature colour lighting',
                teach: [
                  'Full colour — millions of options from the remote or app',
                  i >= 67 ? 'IP67 weather-sealed — rain and splash proof' : 'For dry indoor areas',
                  'Feed one end up to 5m; power BOTH ends for up to 10m',
                ],
              }
            : {
                fam: 'STD',
                wpm: 10,
                single: 5,
                dual: 10,
                channel: 'required',
                spec: `24V strip \xb7 IP${i} \xb7 5m one feed / 10m both ends`,
                ipTxt: i >= 65 ? 'IP65 — splash resistant' : 'IP20 — dry indoor spots',
                where: 'General indoor strip lighting',
                teach: [
                  'Feed one end up to 5m; power BOTH ends for longer runs',
                  'Sits in an aluminium channel for a clean, cool, dot-free line',
                ],
              };
}
let m = {
    run: {
      wpm: 7.5,
      single: 20,
      dual: 40,
      ip: 'IP20 or IP67',
    },
    img: {
      reel: asset.asset('/images/longrun-cob/reel.webp'),
      macro: asset.asset('/images/longrun-cob/macro.webp'),
      lit: asset.asset('/images/longrun-cob/lit.webp'),
    },
    specs: [
      ['Model', 'SELS-COBX480-24-YCC'],
      ['LED density', '480 LEDs per metre — dot-free COB'],
      ['Power', '7.5W per metre'],
      ['Voltage', '24V DC'],
      /* Sold as two separate fixed-colour products — "7.5w/m 3000k" and
         "7.5w/m 4000k" — so this row states the choice, not a switchable
         tri-colour strip the kit cannot actually supply. The supplier
         datasheet for SELS-COBX480-24-YCC does describe a tri-colour
         version; whether Greenhse stocks that is a question for Keri. */
      /* Brochure: the IP67 is made in 3000K only; the IP20 comes in 3000K and
         4000K. So the choice of colour depends on which grade the job needs,
         which is why both are spelled out rather than offered as a free pick. */
      ['Colour', 'Fixed white — IP20 in 3000K or 4000K; IP67 in 3000K only'],
      ['Brightness', '675–712 lm per metre depending on the colour setting (±10%)'],
      ['Colour accuracy', 'CRI >90'],
      ['Beam angle', '180°'],
      ['Board', '8mm wide white PCB · 3oz double layer, constant current'],
      ['Max run', '20m fed from one end · 40m fed from both ends — no voltage drop'],
      ['Cutting', 'Every 50mm, between the soldering pads only'],
      ['Minimum bend', '50mm diameter — never tighter than 40mm'],
      ['Leads', '150mm of 20AWG red/black wire on both ends'],
      ['Sealing', 'IP20 bare, or IP67 silicone injected for outdoors and wet areas'],
      ['Working temperature', '-40°C to +45°C'],
      ['Life span', '50,000 hours'],
      ['Warranty', '3 years'],
      ['Supplied as', '20m roll (other lengths can be cut to order)'],
    ],
    /* Two grades, off the brochure: the bare IP20 for dry indoor work, and the
       silicone-injected IP67 for outside and wet areas. It used to be listed as
       a single IP68 "the only grade we sell it in", which was both the wrong
       rating and the wrong number of options. */
    ipGrades: [
      ['IP20', '10 × 4 mm', 'Bare strip for dry indoor runs — bulkheads, coves, joinery. Sits in a channel.'],
      [
        'IP67',
        '10 × 4 mm',
        'Silicone injected the whole way along. Rain, hose and splash proof — garden beds, pergolas, under decks and around pools.',
      ],
    ],
  },
  p = [
    {
      key: 'stair-controller',
      name: 'Smart Stair Light Controller',
      price: 120,
      sub: 'Includes the top & bottom sensors and the stair cable. Handles up to 20 steps.',
    },
    {
      key: 'stair-profile',
      name: '1m CCT DMX Stair Profile',
      price: 18,
      unit: 'each',
      sub: 'One profile per step — so a 14-step staircase needs 14.',
    },
  ],
  g = (e, t) => e.filter((e) => c(e) === t && 'number' == typeof e.price),
  f = (e, t, i) => {
    for (let i of t) {
      let t = e.find((e) => e.name.toLowerCase().includes(i.toLowerCase()));
      if (t) return t;
    }
    return i ?? e[0];
  };
function b(e) {
  return g(e, 'channel').filter((e) => '24vStrip-Channels-new' !== e.sku);
}
export const CABINET_CCT_STATES = a;
export const CABINET_RGB_STATES = l;
export const COLOUR_OPT_IMAGES = o;
export const LONGRUN_COB_MEDIA = m;
export const LONGRUN_SPEC_KEYS = ['Power', 'Colour', 'Voltage', 'Max run', 'Cutting', 'Warranty'];
export const PLACE_IMAGES = s;
export const STRIP_101 = [
  ['Brightness', 'is lumens — more watts per metre = brighter. Over 150 lumens per watt = very efficient.'],
  [
    'Colour temperature:',
    '2700K warm & cosy · 4000K natural · 6000K crisp. CCT strip lets you change it; RGB does millions of colours.',
  ],
  ['IP rating = water protection:', 'IP20 dry indoors · IP65 steamy bathrooms · IP67 outdoors.'],
  [
    '24V vs 240V:',
    '24V strips are slim and need a transformer (driver). 240V plugs into normal power, runs up to 50m, but is chunkier — recessed ceilings only.',
  ],
  [
    'Why the aluminium channel?',
    "It's a heat-sink (strip lasts longer), it looks professional, and the frosted cover hides the LED dots.",
  ],
  ['CRI 90+', 'means colours look true — great for kitchens and display shelves.'],
];
export const STRIP_Q = r;
export const buildPackage = function (e, i, r, n = {}) {
  let s,
    o,
    a = {
      ...i,
    },
    l = a.colour;
  l && ('w' === l[0] || 'blue' === l) && (a.colour = 'single');
  /* The low wattage long run COB is sold as two separate fixed colour products
     — 3000K and 4000K — at the same 7.5 W/m. The long run path skips the colour
     question entirely (isLongRun short-circuits it), so rather than silently
     picking one, the kit offers the choice on the strip line itself. Guarded on
     there being no colour answer, so every other path still shows exactly the
     strip the recommendation named and nothing else. */
  let stripPool = !a.colour && I(e) ? (Array.isArray(r) ? r : []).filter(I) : [e];
  (stripPool.length || (stripPool = [e]),
    (e = stripPool.find((t) => String(t.id) === String(n.strip)) || e));
  let c = {
      w2700: '2700K extra warm white',
      w3000: '3000K warm white',
      w4000: '4000K natural white',
      /* 5700K is the crisp white right across the 24V SMD range — the
         brochure's printed 5500K, 6000K and 5000K were every one of them
         corrected to it by hand. 6000K survives only on the 240V strip,
         which is genuinely made in it. */
      w5700: '5700K crisp white',
      w6000: '6000K cool white',
      blue: 'Blue',
    },
    u = Math.max(1, parseInt(a.length) || 5),
    m = h(e),
    p = (s = e.name.toLowerCase()).includes('240v') ? '240V' : s.includes('12v') ? '12V' : '24V',
    w = 'rgb' === a.colour || /rgb/i.test(e.name),
    x = 'smart' === a.control && '240V' !== p,
    y = [],
    v = [],
    k = (e, t, i) => t.find((t) => String(t.id) === String(n[e])) || i || t[0];
  (y.push({
    key: 'strip',
    product: e,
    qty: u,
    sub: `${u} m run \xb7 ${c[l] ? c[l] + ' · ' : ''}${m.wpmTxt || m.wpm + 'W per metre'}`,
    candidates: stripPool,
  }),
    'HILUMEN' === m.fam &&
      a.brightness &&
      v.push(
        /* There IS a separate 20 W/m now, and the finder picks it when you ask
           for bright — so stop telling people it does not exist. */
        'bright' === a.brightness
          ? `You picked "make it a feature" — this is the ${m.wpm}W/m High Lumen SMD, the brightest strip in the sealed IP65 wet-area range. It comes in 4000K natural and 5700K crisp only.`
          : `Standard pick — this ${m.wpm}W/m IP65 strip is plenty bright for benchtops, niches and general wet-area use, and it comes in all four whites — 2700K, 3000K, 4000K and 5700K.`,
      ));
  let j = 'one';
  if ('240V' === p) {
    let e = {
      id: 'driver-240v',
      name: '240V LED Driver',
      price: 60,
    };
    (y.push({
      key: 'driver',
      product: e,
      qty: 1,
      sub: `Included — powers the strip straight from mains, one per run up to ${m.single}m`,
      candidates: [e],
    }),
      v.push(
        `The $60 240V driver powers the strip straight from normal mains power. Long runs only: minimum 10m, up to ${m.single}m on one feed. Recessed ceilings only \xb7 remote-control only \xb7 straight runs, no bends \xb7 no channels.`,
      ),
      u < 10 &&
        v.push(
          `⚠ 240V comes in 10 metres or more — your ${u}m run is under that. Call us on (08) 9297 2969 and we'll sort the right option.`,
        ));
  } else {
    let e,
      t,
      i = (t = d(r, (e = '12V' === p ? 'TR12V-ALL' : 'TR24V-ALL'))).length ? t : r.filter((t) => t.sku === e),
      n = u <= m.single ? u : m.dual ? u / 2 : u,
      s = Math.ceil(m.wpm * n * 1.2),
      o = i
        .map((e) => {
          var t;
          let i;
          return {
            t: e,
            watts: ((t = e.name), ((i = /(\d+)\s*W\b/i.exec(t || '')) ? parseInt(i[1], 10) : null) ?? 1 / 0),
          };
        })
        .sort((e, t) => e.watts - t.watts),
      a = k('transformer', i, (o.find((e) => e.watts >= s) || o[o.length - 1])?.t);
    (u <= m.single
      ? (y.push({
          key: 'transformer',
          product: a,
          qty: 1,
          sub: 'powers the run from one end',
          candidates: i,
        }),
        v.push(`Your ${u}m run feeds from ONE end — this strip is happy up to ${m.single}m on a single feed.`))
      : u <= m.dual
        ? ((j = 'both'),
          y.push({
            key: 'transformer',
            product: a,
            qty: 2,
            sub: 'one at EACH end of the run',
            candidates: i,
          }),
          v.push(
            `Runs over ${m.single}m need power at BOTH ends — that keeps the light even from end to end with no fading (voltage drop). This strip handles up to ${m.dual}m powered both ends.`,
          ))
        : ((j = 'both'),
          y.push({
            key: 'transformer',
            product: a,
            qty: 2,
            sub: 'one at EACH end, per segment',
            candidates: i,
          }),
          v.push(
            `Over ${m.dual}m is beyond one continuous run for this strip — break it into segments of up to ${m.dual}m, each powered from both ends. Call us on (08) 9297 2969 and we'll map it out.`,
          )),
      v.push(
        'Biggest single driver is 240W. Long runs always work better with two smaller drivers (one each end) than one big one.',
      ));
  }
  let C = (o = d(r, 'remote-control-grp')).length ? o : r.filter((e) => 'remote-control-grp' === e.sku);
  if ('240V' === p) {
    'smart' === a.control &&
      v.push(
        "Heads up: 240V strip is REMOTE-control only — it can't be made smart or run from the app. We've included the remote instead.",
      );
    let e = f(C, w ? ['4-zone', 'rgb'] : ['cct', 'hand', 'single']),
      t = k('remote', C, e);
    (y.push({
      key: 'remote',
      product: t,
      qty: 1,
      sub: `the ONLY way to control 240V strip (${w ? 'colours & dimming' : 'dimming'}) — pick the remote you like`,
      candidates: C,
    }),
      v.push('No controller box needed (or possible) with 240V strip — the remote does everything.'));
  } else {
    let e = g(r, 'controller').filter((e) => /rgb/i.test(e.name) === w && !/garage|door/i.test(e.name));
    if (e.length) {
      let t = e.find((e) => (/smart/i.test(e.name) && !/non-smart/i.test(e.name)) === x) || e[0],
        i = k('controller', e, t),
        r = x
          ? 'run everything from the phone app'
          : w
            ? 'changes the colours'
            : 'cct' === a.colour
              ? 'adjusts warm ↔ cool'
              : 'dims the strip 1–100%';
      y.push({
        key: 'controller',
        product: i,
        qty: 1,
        sub: `${(w ? '3 in 1' : '2 in 1') + (x ? ' · 2.4GHz SMART' : ' standard controller')} — ${r}`,
        candidates: e,
      });
    }
    if (!x) {
      let e = f(C, w ? ['4-zone', 'rgb'] : ['cct', 'hand', 'single']),
        t = k('remote', C, e);
      y.push({
        key: 'remote',
        product: t,
        qty: 1,
        sub: w ? 'colour & dimming remote' : 'dims 1–100%',
        candidates: C,
      });
    }
    x
      ? v.push(
          "Smart kit: the WiFi + 2.4GHz controller does everything from the phone app — so you don't need a remote. Prefer buttons? Choose Simple and you'll get the standard controller + remote.",
        )
      : v.push(
          'Every 24V kit finishes with its controller — the little brain between the driver and the strip. White strips use the 2-in-1; RGB strips use the 3-in-1.',
        );
  }
  let _ = 0,
    L = b(r);
  if ('none' !== m.channel && L.length) {
    let e = k('channel', L, L[0]);
    _ = Math.max(1, Math.ceil(u / 3));
    let t = 'optional' === m.channel;
    y.push({
      key: 'channel',
      product: e,
      qty: _,
      sub: `${_} \xd7 3m fixed to cover your ${u}m run${t ? ' — optional, but gives a neater finish & longer life' : ''}`,
      candidates: L,
    });
  }
  ('240V' !== p &&
    (v.push(
      'Cut the strip ONLY at the marked cut-points (little scissor lines) — and only a limited number of times per run. Plan your cuts before you start.',
    ),
    v.push(
      'Joins and ends get soldered cabling on BOTH ends of each length; use strip-to-lead connectors at joins and corners.',
    )),
    _ > 0 &&
      v.push(
        `Channels come in fixed 3-metre lengths and can't be cut shorter — we've allowed ${_} \xd7 3m to cover your ${u}m run. The channel is the aluminium track: it cools the strip, makes it last longer, and the frosted cover hides the dots.`,
      ));
  let S = y.reduce((e, t) => e + t.product.price * t.qty, 0),
    B = [
      ['Exact spec', m.spec],
      ["Where it's going", m.where],
      ['Water rating', m.ipTxt],
      [
        "How it's powered",
        '240V' === p
          ? 'Includes its $60 240V driver — powers the strip straight from mains'
          : 'both' === j
            ? 'A driver at BOTH ends — even light the whole way'
            : 'One driver feeding one end',
      ],
      [
        'What holds it',
        'none' === m.channel
          ? 'No channels — 240V strip is thicker and sits straight in the ceiling recess'
          : 'Aluminium channel with frosted cover — keeps it cool, hides the dots',
      ],
      ['Max run', `Feed one end to ${m.single}m; ${m.dual}m powered both ends`],
    ],
    T =
      '240V' === p
        ? ['roomy' === i.space ? 'Roomy shelf' : 'Compact recess', 'Straight runs, no bends', `Min ${m.min}m`]
        : [
            'both' === j ? 'Powered both ends' : 'Single-feed run',
            'required' === m.channel ? 'Aluminium channel included' : 'none' === m.channel ? 'No channel needed' : null,
            /ip6[5-9]/i.test(m.ipTxt) ? 'Wet-area safe (IP65+)' : null,
          ].filter(Boolean);
  return {
    items: y,
    notes: v,
    len: u,
    feed: j,
    facts: m,
    spec: B,
    checklist: T,
    subtotal: S,
    totalIncGst: S * (1 + api.GST_RATE),
  };
};
export const buildStairKit = function () {
  let e = p.map((e) => ({
      key: e.key,
      product: {
        name: e.name,
        price: e.price,
      },
      qty: 1,
      unit: e.unit,
      sub: e.sub,
    })),
    i = e.reduce((e, t) => e + t.product.price * t.qty, 0);
  return {
    items: e,
    subtotal: i,
    totalIncGst: i * (1 + api.GST_RATE),
    video: 'Q3iYeqDkIeE',
  };
};
export const channelPool = b;
export const classify = c;
export const isLongRun = n;
/* The long run answer has to land on the LOW WATTAGE dotless COB and nothing
   else. This used to be matched by name ("Long Run COB") and by the old
   ST24V-15w-CCT-COB-ALL sku, and Magento has since dropped both: the catalogue
   now lists it as "24V Dotless 7.5w/m 3000k Cob Strip Light / Metre" and
   "...4000k...". With the old matches dead, the last fallback here was any
   dotless COB, and the FIRST one in the feed is the 12 W/m — so the panel
   promised 7.5 W/m and 20/40 m while the kit underneath was built from a 12 W/m
   strip that only does 5/10 m. Lazar hit exactly that: "LONG RUN WHEN YOU ADD
   WHOLE KIT IT COMES UP with 24v 12w/m".

   So match on the thing that actually defines this product — watts per metre —
   and never fall through to a strip that cannot do the run. If the catalogue
   has no low wattage COB at all we return no strip, and the screen falls back
   to "call us" rather than quoting a kit that will go dim at the far end. */
function I(e) {
  let t = String((e && e.name) || '');
  return (
    !/rgb/i.test(t) &&
    /cob/i.test(t) &&
    wattsPerMetre(e, 99) <= 8 &&
    !/240\s*v/i.test(t) &&
    'number' == typeof e.price
  );
}
export const longRunInfo = function (e, t) {
  let i = (Array.isArray(e) ? e : []).filter(I),
    /* Warm 3000K first: it is the one the long run panel is written around and
       the cheaper of the two. The kit screen offers the other as an option. */
    r =
      i.find((e) => /3000/.test(e.name)) ||
      i.find((e) => /long.?run/i.test(e.name)) ||
      i[0] ||
      null,
    n = parseFloat(t.length) || 0;
  return {
    strip: r,
    stripOptions: i,
    len: n,
    tooShort: n > 0 && n < 5,
    fromCove: 'cove' === t.place,
  };
};
export const photoForQuestion = function (e, t, i = []) {
  if (!e) return null;
  if ('space' === e.key && t.place) return s[t.place] || null;
  if ('colour' !== e.key && t.colour) {
    let e = (function (e, t) {
      if (!Array.isArray(t) || !t.length) return null;
      if ('cove' === e.place) {
        let i = 'rgb' === e.colour;
        return (
          t.find((e) => /240v/i.test(e.name) && i === /rgb/i.test(e.name)) ||
          t.find((e) => /240v/i.test(e.name)) ||
          null
        );
      }
      return 'wet' === e.place
        ? t.find((e) => /high lumen/i.test(e.name)) || null
        : 'rgb' === e.colour
          ? t.find((e) => /rgb/i.test(e.name) && /cob/i.test(e.name)) || null
          : (('cct' === e.colour || 'single' === e.colour) &&
              t.find((e) => /cob/i.test(e.name) && !/rgb/i.test(e.name))) ||
            null;
    })(t, i);
    return e?.image
      ? {
          src: e.image,
          alt: e.name,
          caption: e.name,
        }
      : null;
  }
  return null;
};
export const pickRecommendation = function (e, t) {
  var i, r;
  let n =
      ((i = e),
      (r = t),
      i
        /* Neon flex is sold by the metre and lives on this page, but it is
           named "Neon Flex" and "Neon Side Bend Flex" with the word strip
           nowhere in it, so the old filter dropped both before anything was
           scored and the signage answer came back as a rigid COB strip. */
        .filter(
          (e) =>
            'strip' === c(e) &&
            /strip|cob|linear|neon|flex/i.test(e.name) &&
            !/suspension|modular/i.test(e.name),
        )
        .map((e) => {
          var t;
          let i, n, s, o, a;
          return {
            p: e,
            s:
              ((t = r) &&
                t.colour &&
                ('w' === t.colour[0] || 'blue' === t.colour) &&
                (t = {
                  ...t,
                  colour: 'single',
                }),
              (i = 2),
              (n = (e.name || '').toLowerCase()),
              (s = u(e)),
              (o = h(e)),
              (a = parseInt(t.length) || 0),
              '240V' === o.fam &&
                ('cove' !== t.place ||
                'tight' === t.space ||
                'smart' === t.control ||
                'cct' === t.colour ||
                (a && a < (o.min || 5)) ||
                (a && a > o.single)
                  ? (i -= 100)
                  : (i += 6)),
              'wet' === t.place
                ? /* The wet-area range is two strips in one family — the 12 W/m
                     and the 20 W/m High Lumen SMD — and the brightness question
                     is the whole point of asking. It was never scored, so both
                     answers tied and the feed order handed out the 20 W/m
                     either way: pick "Standard brightness — 12W/m" and you got
                     a 20 W/m strip at the wrong price, in a colour the 20 W/m
                     is not even made in. Score the answer the customer gave. */
                  ((i += 'HILUMEN' === o.fam ? 10 : -100),
                  t.brightness &&
                    'HILUMEN' === o.fam &&
                    (i += ('bright' === t.brightness ? o.wpm >= 18 : o.wpm <= 14) ? 6 : -20))
                : 'cabinet' === t.place
                  ? (('CCTCOB' === o.fam || 'RGBCOB' === o.fam) && (i += 3), 'HILUMEN' === o.fam && (i += 2))
                  : 'cove' === t.place
                    ? ('CCTCOB' === o.fam || 'HILUMEN' === o.fam) && (i += 2)
                    : /* Signage and curves: only the neon flex bends on its
                         side, so nothing else is a real answer here. */
                      'neon' === t.place
                      ? (i += 'NEON' === o.fam ? 14 : -100)
                      : /* A display or food cabinet wants colour accuracy
                           before brightness. The 23W/m high colour display
                           strip is the pick; the fresh meat strip is the
                           specialist answer for a butcher or deli. */
                        'display' === t.place
                        ? (i +=
                            'DISPLAY' === o.fam
                              ? 12
                              : 'MEAT' === o.fam
                                ? 6
                                : 'HILUMEN' === o.fam
                                  ? 3
                                  : 'NEON' === o.fam
                                    ? -100
                                    : 0)
                        : /* Anywhere else, the specialist strips are the wrong
                             thing to lead with even though they would work. */
                          (('NEON' === o.fam || 'MEAT' === o.fam || 'SPI' === o.fam) && (i -= 6),
                          s <= 24 && (i += 1)),
              'rgb' === t.colour
                ? n.includes('rgb')
                  ? (i += 6)
                  : (i -= 8)
                : 'cct' === t.colour
                  ? 'CCTCOB' === o.fam
                    ? (i += 8)
                    : n.includes('cct') || n.includes('dual')
                      ? (i += 6)
                      : (i -= 100)
                  : 'single' === t.colour &&
                    ('CCTCOB' === o.fam || 'RGBCOB' === o.fam || n.includes('cob') || n.includes('rgb')
                      ? (i -= 100)
                      : 'HILUMEN' === o.fam
                        ? (i += 8)
                        : (i += 4)),
              'smart' === t.control &&
                (n.includes('smart') || n.includes('wifi') || 'CCTCOB' === o.fam || n.includes('rgb')) &&
                (i += 1),
              /* Only the wet-area path asks about brightness. Everywhere else
                 the 12 and 20 W/m High Lumen tie on every other test, and a tie
                 is settled by whatever order the feed happens to be in — which
                 was handing dry joinery the dearest strip in the family. Lead
                 with the 12 W/m and keep the 20 W/m as an alternative. */
              'HILUMEN' === o.fam && !t.brightness && o.wpm >= 18 && (i -= 1),
              a > o.dual && (i -= 4),
              a >= 10 && '240V' === o.fam && 'cove' === t.place && 'tight' !== t.space && (i += 3),
              i),
          };
        })
        .sort((e, t) => t.s - e.s)),
    s = n.filter((e) => e.s > 0).slice(0, 3),
    o = (s.length ? s : n.slice(0, 3)).map((e) => e.p),
    a = null,
    l = !1,
    d = parseFloat(t.length) || 0;
  if ('cove' === t.place) {
    /* How far the 240V recessed strip actually goes: 50 m for the fixed whites,
       35 m for RGB. Past that there is no 240V answer, and the old code quietly
       fell through to a 24V COB rated 5 m from one end and 10 m from both — so a
       45 m RGB cove came back as a strip that cannot do 45 m, under a note that
       said the run was too SHORT for 240V. Over the limit is a phone call. */
    let m240 = 'rgb' === t.colour ? 35 : 50;
    if ('tight' !== t.space && 'cct' !== t.colour && 'smart' !== t.control && d > m240)
      ((a = `\uD83D\uDCDE A ${d}m recessed run is past what one 240V strip carries (${m240}m for ${'rgb' === t.colour ? 'RGB' : 'fixed-colour white'}), so it has to be split into sections and fed separately. Give us a quick call on (08) 9297 2969 and we'll map it out.`),
        (o = o.slice(0, 2)),
        (l = !0));
    else if ('tight' !== t.space && 'smart' !== t.control && 'cct' !== t.colour && d > 0 && d < 10)
      ((a =
        "📞 Recessed-ceiling runs under 10 metres need a custom option — give us a quick call on (08) 9297 2969 and we'll spec it with you on the spot."),
        (o = o.slice(0, 2)),
        (l = !0));
    else {
      let e = o.filter((e) => /240v/i.test(e.name));
      if (e.length) {
        let i = 'rgb' === t.colour,
          r = e.filter((e) => i === /rgb/i.test(e.name));
        ((o = (r.length ? r : e).slice(0, 1)),
          (a = `Recessed ceilings = long-run 240V strip, kept simple: $60 driver included, one power feed, minimum 10m (${i ? 'RGB up to 35m' : 'fixed-colour white up to 50m'}). Under 10m? Call us on (08) 9297 2969.`));
      } else {
        let e =
          'smart' === t.control
            ? "240V strip is remote-only — it can't be run from the app"
            : 'cct' === t.colour
              ? "240V is fixed colour — it can't do adjustable white"
              : '240V comes in 10m+ runs only — yours is shorter (want 240V anyway? Call us on (08) 9297 2969)';
        a = `Normally a recessed ceiling gets 240V strip — but ${e}. These 24V picks are the right fit instead:`;
      }
    }
  } else
    d > 10 &&
      ((a =
        "📞 Runs over 10 metres need power planned at several points — give us a quick call on (08) 9297 2969 and we'll design it with you."),
      (o = o.slice(0, 2)),
      (l = !0));
  return {
    primary: l ? null : o[0],
    alts: l ? o.slice(0, 2) : o.slice(1, 3),
    note: a,
    callOnly: l,
  };
};
export const stripFacts = h;
export const summarise = function (e) {
  let t =
      {
        cabinet: 'under your cabinets',
        cove: 'in your ceiling recess',
        wet: 'in your wet area',
        stairs: 'on your stairs / hallway',
        longrun: 'along your long run',
        other: 'in your spot',
      }[e.place] || 'in your spot',
    i =
      {
        single: 'fixed white',
        cct: 'adjustable white',
        rgb: 'full-colour RGB',
        w2700: '2700K extra warm white',
        w3000: '3000K warm white',
        w4000: '4000K natural white',
        w5700: '5700K crisp white',
        w6000: '6000K cool white',
        blue: 'blue',
      }[e.colour] || '',
    r =
      {
        smart: 'run from the phone app',
        simple: 'with a simple remote',
      }[e.control] || '';
  return `For ${i} light ${t} ${r}`.replace(/\s+/g, ' ').trim() + '.';
};
export const visibleQuestions = function (e) {
  return r.filter((t) => !t.when || t.when(e));
};
