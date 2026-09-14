let t = [
    {
      key: 'cut',
      q: 'What size hole are you working with?',
      hint: 'This is the cut-out — the hole in the ceiling, not the outside of the fitting. Swapping old halogens? Measure the hole you already have. New build? 90mm is the Australian standard and has the widest range.',
      opts: [
        ['30 mm — star lights & accents, 280 lm', '30'],
        ['70 mm — small & subtle, up to 650 lm', '70'],
        ['90 mm — the standard size, up to 1000 lm', '90'],
        ['110 mm — brighter, fewer fittings, up to 1200 lm', '110'],
        ["I'm not sure yet", 'unsure'],
      ],
    },
    {
      key: 'starcol',
      q: 'What colour star light?',
      when: (e) => '30' === e.cut,
      hint: 'The tri-colour head is switched at install — one fitting covers 3200K, 4000K, 5000K and 6000K at 280 lm, so you can decide on the day. Blue is a fixed-colour head. RGB is a different fitting: full colour from a remote, IP65, 30° beam.',
      opts: [
        ['Warm — 3200K', '3200'],
        ['Natural — 4000K', '4000'],
        ['Bright — 5000K', '5000'],
        ['Ultra bright — 6000K', '6000'],
        ['Blue — fixed colour', 'blue'],
        ['RGB — full colour', 'rgbw'],
      ],
    },
    {
      key: 'glare',
      q: 'Standard beam, or low glare?',
      when: (e) => '30' !== e.cut && '110' !== e.cut,
      hint: 'The only real difference is how deep the LED sits and how wide it throws. Have a look at the two below — it changes how the room feels more than anything else you pick.',
      opts: [
        ['Standard — wide even light, 110°', 'std'],
        ['Low glare — focused 60°, source hidden, fan-safe', 'low'],
        ['Not sure — show me the closest match', 'auto'],
      ],
    },
    {
      key: 'colour',
      q: 'How do you want the colour set?',
      when: (e) => '30' !== e.cut && '110' !== e.cut,
      hint: 'Every downlight we sell is tricolour — a small switch on the back picks warm, natural or cool once at install, at no extra cost. Smart is worth paying for in a room you sit in at night — in a kitchen, bathroom or hallway it rarely gets used.',
      opts: [
        ['Tricolour / CCT — switch it at install', 'tri'],
        ['RGBW Smart — full colour, run from your phone', 'rgbw'],
      ],
    },
    {
      key: 'size',
      q: 'How big is the room?',
      when: (e) => '30' !== e.cut,
      size: !0,
      hint: "Give us the room's width and length and we'll suggest a rough count — a starting point, not a lighting-design substitute. Skip it if you already know how many you want, or use the free Lighting Layout App for an exact plan.",
    },
  ],
  i = {
    30: {
      lo: 25,
      hi: 45,
      label: '30mm',
    },
    70: {
      lo: 46,
      hi: 80,
      label: '70mm',
    },
    90: {
      lo: 81,
      hi: 104,
      label: '90mm',
    },
    110: {
      lo: 105,
      hi: 135,
      label: '110mm',
    },
  };
function a(e) {
  return i[e] || i[90];
}
function s(e, t) {
  let i = t.toLowerCase();
  return (e.specs || []).find((e) => e.label.toLowerCase() === i)?.value || null;
}
function r(e) {
  let t = (s(e, 'Dimensions') || '').match(/cut-?out\s*(?:ø|diam(?:eter)?)?\s*(\d{2,3})(?:\s*[-–]\s*(\d{2,3}))?\s*mm/i);
  if (!t) return null;
  let i = parseInt(t[1], 10),
    a = t[2] ? parseInt(t[2], 10) : i;
  return {
    min: i,
    max: a,
    txt: t[2] ? `${t[1]}-${t[2]}mm` : `${t[1]}mm`,
  };
}
function d(e) {
  let t = (s(e, 'Beam angle') || '').match(/(\d{2,3})/);
  return t ? parseInt(t[1], 10) : null;
}
function n(e) {
  return s(e, 'Brightness');
}
function l(e) {
  return /rgbw/i.test(e.name);
}
function o(e) {
  return /bluetooth|tuya|wifi|smart/i.test(`${e.name} ${e.sku || ''}`);
}
function c(e) {
  return /low\s*glare|anti[\s-]?glare/i.test(`${e.name} ${e.sku || ''}`);
}
function u(e) {
  if (c(e)) return !0;
  let t = d(e);
  return null != t && t < 90;
}
function g(e) {
  return 'low' === e.glare || ('std' !== e.glare && null);
}
function f(e) {
  return !/batten|channel|transformer|controller|remote/i.test(e.name);
}
function h(e, t) {
  return [
    ['Tricolour / CCT — switch it at install', 'tri'],
    ['RGBW Smart — full colour, run from your phone', 'rgbw'],
  ].filter(([, i]) => {
    var s;
    return (
      (s = {
        ...t,
        colour: i,
      }),
      (e || []).filter(f).filter((e) =>
        (function (e, t) {
          if (t.cut) {
            let i = r(e),
              s = a(t.cut);
            if (!i || i.min < s.lo || i.min > s.hi) return !1;
          }
          return !(
            ('low' === t.glare && !u(e)) ||
            ('std' === t.glare && u(e)) ||
            ('rgbw' === t.colour && !(l(e) || o(e))) ||
            ('tri' === t.colour && (l(e) || o(e)))
          );
        })(e, s),
      ).length > 0
    );
  });
}
let m = {
  3200: 'warm 3200K',
  4e3: 'natural 4000K',
  5e3: 'bright 5000K',
  6e3: 'ultra bright 6000K',
  blue: 'blue',
  rgbw: 'RGB',
};
function p(e) {
  return !/driver|cable|extension|remote|controller|transformer/i.test(e.name);
}
let x = [
  {
    w: 2,
    l: 2,
    std: 1,
    low: 1,
  },
  {
    w: 3,
    l: 4,
    std: 4,
    low: 4,
  },
  {
    w: 4,
    l: 5,
    std: 4,
    low: 6,
  },
  {
    w: 5,
    l: 8,
    std: 6,
    low: 8,
  },
  {
    w: 6,
    l: 10,
    std: 8,
    low: 10,
  },
];
export const DOWNLIGHT_Q = t;
export const dlBand = a;
export const dlBeam = d;
export const dlColourOptsFor = h;
export const dlCut = r;
export const dlDim = function (e) {
  return s(e, 'Dimmable');
};
export const dlIP = function (e) {
  let t = `${s(e, 'Weather Rating') || ''} ${e.name}`.match(/IP\s?(\d{2})/i);
  return t ? parseInt(t[1], 10) : null;
};
export const dlIsFitting = f;
export const dlIsLowGlare = u;
export const dlIsStarFitting = p;
export const dlLum = n;
export const dlSpecValue = s;
export const dlSummary = function (e) {
  if ('30' === e.cut) return `A 30mm ${m[e.starcol] || ''} star light.`;
  let t = a(e.cut),
    i = g(e),
    s = 'rgbw' === e.colour ? 'RGBW smart' : 'tri' === e.colour ? 'tricolour' : '';
  return `A ${t.label} ${i ? 'low glare' : 'standard'} ${s} downlight.`.replace(/\s+/g, ' ').trim();
};
export const dlWantLow = g;
export const dlWatt = function (e) {
  return s(e, 'Power consumption') || s(e, 'Power');
};
export const estimateDownlightCount = function (e, t, i) {
  let a = parseFloat(e),
    s = parseFloat(t);
  if (!a || !s || a <= 0 || s <= 0) return null;
  let r = Math.min(a, s),
    d = Math.max(a, s),
    n = x.find((e) => r <= e.w && d <= e.l);
  return n ? (i ? n.low : n.std) : null;
};
export const pickDlRecommendation = function (e, t) {
  let i = (e || [])
      .filter(f)
      .map((e) => ({
        p: e,
        s: (function (e, t) {
          let i = r(e),
            d = a(t.cut),
            f = 0;
          i ? (f += i.min >= d.lo && i.min <= d.hi ? 60 : -45) : (f -= 10);
          let h = g(t);
          if ((null !== h && ((f += u(e) === h ? 30 : -20), h && c(e) && (f += 8)), 'rgbw' === t.colour))
            f += l(e) ? 50 : o(e) ? 30 : -30;
          else
            'tri' === t.colour &&
              (f +=
                !(
                  !l(e) &&
                  (/tricolour|tri-colour|cct/i.test(`${e.name} ${e.sku || ''}`) ||
                    ((s(e, 'Light Output Colour') || '').match(/\d{4}/g) || []).length >= 2)
                ) ||
                l(e) ||
                o(e)
                  ? -6
                  : 20);
          return (/dimmable/i.test(e.name) && (f += 4), n(e) && (f += 3), f);
        })(e, t),
      }))
      .sort((e, t) => t.s - e.s || e.p.price - t.p.price),
    d = i.filter((e) => e.s > 0),
    h = (d.length ? d : i).map((e) => e.p);
  return {
    primary: h[0] || null,
    alts: h.slice(1, 3),
  };
};
export const pickStarRecommendation = function (e, t) {
  let i = (e || [])
      .filter(p)
      .map((e) => {
        let i, a, s;
        return {
          p: e,
          s:
            ((i = e.name.toLowerCase()),
            (a = /kit/.test(i)),
            (s = 0),
            'rgbw' === t
              ? /rgb/.test(i)
                ? 40
                : -50
              : 'blue' === t
                ? /blue/.test(i)
                  ? 40
                  : /rgb/.test(i)
                    ? -50
                    : -10
                : /rgb|blue/.test(i)
                  ? -50
                  : ((s += 20), a || (s += 6), i.includes(String(t)) && (s += 10), s)),
        };
      })
      .sort((e, t) => t.s - e.s || e.p.price - t.p.price),
    a = i.filter((e) => e.s > 0),
    s = (a.length ? a : i).map((e) => e.p);
  return {
    primary: s[0] || null,
    alts: s.slice(1, 3),
  };
};
export const visibleDlQuestions = function (e, i) {
  return t.filter((t) => (!t.when || !!t.when(e)) && ('colour' !== t.key || !i || h(i, e).length > 1));
};
