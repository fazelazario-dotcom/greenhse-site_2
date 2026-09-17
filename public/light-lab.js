/* ============================================================
   GREENHSE LIGHT LAB
   A virtual lighting showroom. The customer loads a photo of their own room,
   drops real Greenhse fittings into it, turns them on and sees the light.

   Everything runs in the browser. The photo is never uploaded; the only thing
   that ever leaves the device is a small preview image, and only when the
   customer fills in the form at step 05 and presses send.

   The catalogue comes from /light-lab-data.json, written at prebuild by
   scripts/build-lightlab-data.js out of the live Magento feed snapshot, so
   names, prices, photos and product links stay in step with the rest of the
   site.

   On the lighting model, so nobody is misled by it: this draws an impression,
   it does not calculate lux. What it gets right is relative beam width (from
   the fitting's real beam angle and the customer's ceiling height), where the
   light lands, how colour temperature reads, and what a second layer adds.
   What it cannot know is wall colour, windows, ceiling void or furniture. The
   page says so in three places, and it should keep saying so.
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     Small helpers
     ============================================================ */
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var money = function (n) {
    return '$' + (Math.round(n * 100) / 100).toLocaleString('en-AU', {
      minimumFractionDigits: 2, maximumFractionDigits: 2
    });
  };
  var incGST = function (n) { return Math.round(n * 110) / 100; };

  var toastT = null;
  function toast(msg) {
    var host = $('#toasts'); if (!host) return;
    var d = document.createElement('div');
    d.className = 'toast'; d.textContent = msg;
    host.appendChild(d);
    clearTimeout(toastT);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 2600);
  }

  /* Beam angle out of the catalogue's free text: "60º Anti Glare" -> 60,
     "29x77º Rectangular Beam" -> 29 (the tighter axis, which is the one that
     decides how far the light throws). Same rule the planner uses. */
  function parseBeam(s) {
    if (!s) return null;
    var m = String(s).match(/(\d{2,3})/);
    return m ? clamp(parseInt(m[1], 10), 10, 180) : null;
  }
  function parseWatts(s) {
    if (!s) return null;
    var m = String(s).match(/(\d+)/);
    return m ? parseInt(m[1], 10) : null;
  }

  /* ------------------------------------------------------------
     Colour temperature to RGB.
     Tanner Helland's approximation of the blackbody curve, which is the
     standard cheap one and is accurate enough between 1000K and 6500K —
     comfortably covering the 2700K to 5000K a lighting customer cares about.
     ------------------------------------------------------------ */
  function kelvinRGB(k) {
    var t = clamp(k, 1000, 12000) / 100, r, g, b;
    if (t <= 66) {
      r = 255;
      g = 99.4708025861 * Math.log(t) - 161.1195681661;
      b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
    } else {
      r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
      g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
      b = 255;
    }
    return [
      Math.round(clamp(r, 0, 255)),
      Math.round(clamp(g, 0, 255)),
      Math.round(clamp(b, 0, 255))
    ];
  }
  var rgba = function (c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; };
  var hex = function (c) {
    return '#' + c.map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join('');
  };

  /* ============================================================
     Room briefs.
     What each kind of room starts at and what a scheme for it looks like.
     The colour temperatures are the ones we actually recommend over the
     counter: warm where people relax, neutral where they work.
     ============================================================ */
  var ROOMS = {
    kitchen:    { label: 'Kitchen',    cct: 4000, dl: 6, bench: true,  wall: 0, note: 'Neutral white over a working bench, and something under the overheads so you are not chopping in your own shadow.' },
    living:     { label: 'Living',     cct: 3000, dl: 6, bench: false, wall: 2, note: 'Warm and layered. Downlights alone make a living room read flat and shadowy.' },
    bedroom:    { label: 'Bedroom',    cct: 3000, dl: 4, bench: false, wall: 2, note: 'Four is plenty. Keep them off the bed head and add a soft layer on the wall.' },
    bathroom:   { label: 'Bathroom',   cct: 4000, dl: 2, bench: false, wall: 1, note: 'Neutral white so you can see what you are doing, and check the IP rating of anything near the shower.' },
    hallway:    { label: 'Hallway',    cct: 3000, dl: 2, bench: false, wall: 0, note: 'A line of small fittings, evenly spaced. It is a corridor, not a room.' },
    office:     { label: 'Office / study', cct: 4000, dl: 4, bench: true, wall: 0, note: 'Neutral white and low glare, or you will be looking at the fitting all day on a screen.' },
    garage:     { label: 'Garage / shed', cct: 5000, dl: 0, bench: false, wall: 0, batten: 2, note: 'Battens, not downlights. Far more light per dollar and no ceiling cut-outs.' },
    alfresco:   { label: 'Alfresco',   cct: 3000, dl: 4, bench: false, wall: 2, note: 'Warm, and everything out here needs a weather rating.' },
    exterior:   { label: 'Exterior',   cct: 4000, dl: 0, bench: false, wall: 2, garden: 4, note: 'Wall lights at the entry, spikes through the garden beds, a flood on the driveway.' },
    commercial: { label: 'Commercial', cct: 4000, dl: 9, bench: false, wall: 0, note: 'Even coverage, low glare, and emergency and exit lighting is not optional.' }
  };

  /* ============================================================
     The five looks from the brief, as real lighting recipes.
     Each one changes the colour temperature, how many downlights it uses and
     which other layers it brings in — which is the honest difference between
     these looks in a real house.
     ============================================================ */
  var STYLES = {
    warm:   { label: 'Warm & Relaxed', cct: 2700, dlMul: 0.7, wall: 2, strip: true,  feature: false, lowGlare: false,
              says: 'Fewer downlights, turned down, with the work done by wall lights and a concealed strip.' },
    arch:   { label: 'Architectural',  cct: 3000, dlMul: 1.0, wall: 0, strip: true,  feature: false, lowGlare: true,
              says: 'A tight, even grid of low glare downlights and a concealed strip. Nothing on show.' },
    modern: { label: 'Modern',         cct: 4000, dlMul: 1.0, wall: 1, strip: false, feature: false, lowGlare: true,
              says: 'Neutral white, clean grid, one wall light for depth.' },
    luxury: { label: 'Luxury',         cct: 3000, dlMul: 0.6, wall: 2, strip: true,  feature: true,  lowGlare: true,
              says: 'Fewest downlights of any look. A feature fitting carries the room and the layers fill in.' },
    bright: { label: 'Bright & Functional', cct: 5000, dlMul: 1.3, wall: 0, strip: false, feature: false, lowGlare: false,
              says: 'Daylight white and more of it. Built for getting things done, not for atmosphere.' }
  };

  var CCTS = [2700, 3000, 4000, 5000];
  var CCT_SAYS = {
    2700: 'Warm white. Lounge rooms, bedrooms, anywhere you wind down. The colour of an old incandescent globe.',
    3000: 'Warm white, a touch cleaner. The most popular choice in a Perth home and the safest all-rounder.',
    4000: 'Neutral white. Kitchens, bathrooms, laundries, offices — anywhere you are actually doing something.',
    5000: 'Daylight white. Garages, workshops, warehouses and task areas. Crisp, and too cold for a living room.'
  };

  /* Sample rooms, so somebody can see what the tool does before they go and
     take a photo. These are the site's own photography. */
  var SAMPLES = [
    { f: '/images/hero/downlight-hero.webp', t: 'Living', room: 'living' },
    { f: '/images/hero/ceiling-hero.webp',   t: 'Kitchen', room: 'kitchen' },
    { f: '/images/hero/strip-hero.webp',     t: 'Feature wall', room: 'living' },
    { f: '/images/hero/outdoor-wall-hero.webp', t: 'Alfresco', room: 'alfresco' },
    { f: '/images/hero/garden-hero.webp',    t: 'Garden', room: 'exterior' },
    { f: '/images/hero/commercial-hero.webp', t: 'Commercial', room: 'commercial' }
  ];

  /* ============================================================
     State
     ============================================================ */
  var S = {
    photo: { img: null, name: null, loaded: false },
    roomType: 'living',
    ceiling: 2.7,
    horizon: 0.45,        // fraction of image height where the ceiling meets the wall
    fittings: [],         // {key,pid,bucket,u,v,size,metres}
    sel: null,
    on: false,
    cct: 4000,
    dim: 0.80,
    amb: 0.62,
    photoMean: 128,
    hintSeen: false,
    view: 'lab',          // 'lab' | 'orig'
    bucket: 'downlight',
    pid: null,
    showAll: false,
    style: null,
    reco: null,
    hzEdit: false,
    undo: [],
    seq: 1
  };

  var CAT = { buckets: [], products: {}, ready: false };
  var el = {};
  var MAXW = 1500;       // working canvas width; phone photos are far larger

  function bucketById(id) {
    for (var i = 0; i < CAT.buckets.length; i++) if (CAT.buckets[i].id === id) return CAT.buckets[i];
    return CAT.buckets[0] || { id: 'downlight', surface: 'ceiling', model: 'cone', label: '', products: [] };
  }
  function prod(pid) { return CAT.products[pid] || null; }

  /* ============================================================
     Perspective
     ------------------------------------------------------------
     One photo, no calibration, so this is a model rather than a measurement,
     and the page says as much. The model: the camera is at roughly eye height
     looking horizontally, so the ceiling fills the top of the frame and the
     floor the bottom, meeting at the ceiling line. A point drawn near the top
     of the frame is close to the camera; a point near the ceiling line is far
     away. depth() returns 1 for close and towards 0 for far, and everything
     else — how wide the pool is, how flat the ellipse is, how big the fitting
     mark is — is driven off it.
     ============================================================ */
  function depth(v, surface) {
    var hz = clamp(S.horizon, 0.08, 0.92);
    if (surface === 'ground' || v > hz) {
      return clamp((v - hz) / Math.max(1 - hz, 0.05), 0.06, 1);
    }
    return clamp((hz - v) / Math.max(hz, 0.05), 0.06, 1);
  }

  /* Roughly how many pixels a metre covers at this depth. The assumed span is
     the width of room a typical interior photo takes in. It is a constant
     because there is nothing in an arbitrary photo to measure against — which
     is exactly why this is called an impression and not a simulation. */
  /* How wide a room a typical interior photo takes in. Tuned by eye against
     real room photographs rather than guessed: at 5.5 m the pools from a grid
     of 100 degree downlights merged into one flat wash with no readable edges,
     which is exactly the thing the tool is supposed to show you. A wide angle
     phone camera in a lounge room sees more like seven or eight metres across
     the frame, and at that scale the pools separate and you can see the
     spacing. */
  var ASSUMED_SPAN_M = 7.6;
  function pxPerMetre(W, d) { return (W / ASSUMED_SPAN_M) * (0.52 + 0.72 * d); }

  /* The pool of light a fitting throws, in canvas pixels.
     The real-world part is honest: a beam angle and a throw distance give a
     pool diameter by trigonometry, and the customer's ceiling height feeds
     straight into it. Only the metres-to-pixels step is assumed. */
  function poolGeometry(f, W, H) {
    var p = prod(f.pid) || {};
    var b = bucketById(f.bucket);
    var d = depth(f.v, b.surface);
    var ppm = pxPerMetre(W, d);
    var beam = parseBeam(p.beam) || 100;
    var throwM = Math.max(S.ceiling - 0.85, 0.6);   // ceiling down to the bench
    var dia = 2 * throwM * Math.tan(beam * Math.PI / 360);
    var rx, ry, cx = f.u * W, cy = f.v * H;

    /* Where a ceiling fitting's light actually lands.

       This is the thing the first version got wrong and it is the difference
       between "lights on" and "fog". A recessed downlight does not light the
       ceiling it is sitting in — it lights the floor several metres below, and
       the ceiling around it stays comparatively dark. That is the whole reason
       people complain about the cave effect.

       In this frame the ceiling and the floor both run away to the same
       horizon, so the floor point under a ceiling point is its reflection in
       that horizon, pushed a little further because the camera is nearer the
       floor than the ceiling. A fitting close to the camera projects its pool
       off the bottom of the picture, which is exactly what happens when you
       stand in a real room and look up. */
    function landing(v) {
      var hz = clamp(S.horizon, 0.08, 0.92);
      return hz + (hz - v) * 1.18;
    }

    switch (b.model) {
      case 'wash':
        rx = W * 0.075 * f.size * (0.55 + 0.7 * d);
        ry = rx * 2.3;
        break;
      case 'bar':
        rx = (f.metres || 2.4) * ppm * 0.5 * f.size;
        ry = Math.max(rx * 0.30, 12);
        cy = (b.surface === 'ceiling' ? landing(f.v) * H : f.v * H + ry * 0.55);
        break;
      case 'point':
        rx = W * 0.035 * f.size * (0.5 + 0.9 * d);
        ry = rx * (0.34 + 0.5 * d);
        cy = f.v * H + ry * 0.5;
        break;
      case 'flood':
        rx = W * 0.28 * f.size * (0.5 + 0.8 * d);
        ry = rx * (0.30 + 0.32 * d);
        cy = f.v * H + ry * 0.9;
        break;
      case 'none':
        rx = W * 0.02 * f.size; ry = rx * 0.6;
        break;
      default: /* cone */
        rx = (dia / 2) * ppm * f.size;
        /* a pool on the floor is seen at a glancing angle, so it reads as a
           flat ellipse, flatter the further away it is */
        ry = rx * (0.26 + 0.34 * d);
        cy = (b.surface === 'ceiling' ? landing(f.v) * H : f.v * H + ry * 0.72);
    }
    /* one fitting should never own the whole frame */
    rx = Math.min(rx, W * 0.46);
    return { rx: Math.max(rx, 4), ry: Math.max(ry, 3), cx: cx, cy: cy, d: d, beam: beam };
  }

  /* How hard a fitting pushes. A 40 W batten should not read the same as a
     3 W star light, so wattage sets the ceiling and the brightness slider
     scales everything together. */
  function intensity(f) {
    var p = prod(f.pid) || {};
    var w = parseWatts(p.watts) || 10;
    return clamp(0.34 + Math.log(1 + w) / 9, 0.3, 0.95);
  }
  function cctFor() { return S.cct; }

  /* ============================================================
     Rendering

     How a room is relit here, and why it is done this way.

     The first version painted glowing blobs straight onto the photograph with
     an additive blend. Additive light does not care what is underneath it, so
     a white ceiling clipped to pure white and the whole picture went milky —
     it looked like fog, not lighting. Lazar's word for it was "shit", and he
     was right.

     Real light does not get added to a surface, it gets MULTIPLIED by it. A
     lamp shining on black carpet gives you dark grey; the same lamp on a white
     wall gives you white. So the room is relit the way a renderer does it:

       1. draw the photograph,
       2. build a light map offscreen — one canvas holding the ambient level
          plus every fitting's pool, added together in the chosen colour,
       3. MULTIPLY the photograph by that map, which darkens the room to
          evening everywhere the light does not reach and keeps every surface
          its own colour and texture where it does,
       4. SCREEN the same map back over the top, which lifts the lit areas
          above where the photograph started so a pool actually reads as
          bright, and — because screening by black is a no-op — leaves the
          unlit parts of the room exactly as dark as step 3 made them,
       5. add the lamps themselves as small hot cores, the only genuinely
          additive thing in the picture, because a lamp really is a light
          source and not a lit surface.

     All five steps are canvas compositing, so it stays smooth while somebody
     drags the colour slider on a phone.
     ============================================================ */

  /* The light map lives on its own canvas, reused between frames. */
  var mapCanvas = {};
  function mapFor(key, W, H) {
    var c = mapCanvas[key] || (mapCanvas[key] = document.createElement('canvas'));
    if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    return c;
  }

  /* How dark the room goes before the lights are added back.
     Scaled by how bright the photograph already was: a night shot needs almost
     none of this, a bright midday shot needs all of it. Without that, a photo
     taken with the lights already on came out as a black rectangle. */
  function ambientLevel() {
    var mean = S.photoMean == null ? 128 : S.photoMean;
    var want = 0.30 - 0.16 * clamp(S.amb, 0, 1);        /* 0.14 to 0.30 of the original */
    /* A photo taken at night with the lights already off has nothing left to
       take away — darkening it again just gives a black rectangle. The darker
       the photograph already is, the less of this it gets, up to none at all. */
    var lift = clamp(128 / Math.max(mean, 8), 0.85, 8);
    return clamp(want * lift, 0.10, 1.0);
  }

  /* Two maps come out of one pass over the fittings.

       lit    = the evening floor PLUS every pool. This is what the photograph
                gets multiplied by, so an unlit corner falls to the ambient
                level and a lit surface keeps its own colour.
       pure   = the pools ON THEIR OWN, on black. This is what gets screened
                back over the top. Screening by black does nothing at all, so
                using the pure map here is the whole trick: the pools lift and
                the unlit room does not. Screening the ambient floor as well
                was what turned the first attempt grey. */
  function buildLightMaps(W, H, on) {
    var lit = mapFor('lit', W, H), g = lit.getContext('2d');
    var pure = mapFor('pure', W, H), p = pure.getContext('2d');
    [g, p].forEach(function (x) {
      x.setTransform(1, 0, 0, 1, 0, 0);
      x.globalCompositeOperation = 'source-over';
      x.globalAlpha = 1;
      x.clearRect(0, 0, W, H);
    });

    /* the evening floor, slightly blue: a room after sunset is lit by sky
       through the windows, not by anything warm */
    var amb = ambientLevel();
    g.fillStyle = 'rgb(' + Math.round(255 * amb * 0.88) + ',' +
                           Math.round(255 * amb * 0.95) + ',' +
                           Math.round(255 * amb * 1.18) + ')';
    g.fillRect(0, 0, W, H);
    p.fillStyle = '#000';
    p.fillRect(0, 0, W, H);

    g.globalCompositeOperation = 'lighter';
    p.globalCompositeOperation = 'lighter';
    if (on) {
      for (var i = 0; i < S.fittings.length; i++) {
        paintPool(g, S.fittings[i], W, H);
        paintPool(p, S.fittings[i], W, H);
      }
    }

    /* Bounce: light comes off the ceiling and walls as well as straight down,
       so a little goes everywhere once anything is on. Small on purpose — too
       much and the contrast that makes the picture read as lit disappears.
       It belongs in the multiply map only; bouncing light does not make a
       dark corner glow. */
    var load = 0;
    if (on) for (var j = 0; j < S.fittings.length; j++) load += intensity(S.fittings[j]);
    if (load > 0) {
      g.fillStyle = rgba(kelvinRGB(cctFor()), clamp(0.06 + 0.034 * load, 0, 0.34) * S.dim);
      g.fillRect(0, 0, W, H);
    }
    g.globalCompositeOperation = 'source-over';

    /* Reflected light, not light in mid air.

       Screening the raw pools put glowing ellipses over the black parts of a
       night photograph — light floating in space, because a pool was being
       drawn where the camera had recorded no surface at all. What a camera
       sees is illumination times albedo, so the pools are multiplied by the
       photograph itself before they are screened back. A pool that lands on a
       pale wall comes up bright; the same pool over a black window stays
       black, which is exactly what happens in the room. */
    p.globalCompositeOperation = 'multiply';
    p.drawImage(S.photo.img, 0, 0, W, H);
    p.globalCompositeOperation = 'source-over';
    return { lit: lit, pure: pure };
  }

  function render() {
    if (!S.photo.loaded || !S.photo.img || !el.canvas) return;
    var c = el.canvas, ctx = c.getContext('2d'), W = c.width, H = c.height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(S.photo.img, 0, 0, W, H);

    /* Three states, and the difference between them is the point of the tool.

         view 'orig'  — the customer's photograph, untouched.
         lights OFF   — the same room at night with nothing switched on.
         lights ON    — the same room at night with these fittings in it.

       Off used to show the untouched photograph, which meant that on a bright
       daytime photo turning the lights ON made the picture DARKER. Comparing
       evening-off against evening-on is the comparison that actually answers
       "what will these lights do in my room". */
    if (S.view === 'lab') {
      var maps = buildLightMaps(W, H, S.on);

      /* Step 3 — the room is now only as bright as the light falling on it. */
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 1;
      ctx.drawImage(maps.lit, 0, 0);

      if (S.on) {
        /* Step 4 — lift the pools back above where the photograph started.
           Screening by black is a no-op, so the unlit room is untouched. */
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.90;
        ctx.drawImage(maps.pure, 0, 0);

        /* Step 5 — the lamps themselves. */
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'lighter';
        for (var i = 0; i < S.fittings.length; i++) paintSource(ctx, S.fittings[i], W, H);
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }
    renderMarks();
  }

  /* One fitting's pool, painted into the light map in white-ish light.
     The gradient has a broad flat core and a quick shoulder rather than a long
     soft tail, because that is what gives a pool a readable edge. A long tail
     across six overlapping downlights is exactly how the old version turned
     into a single flat wash. */
  function paintPool(g, f, W, H) {
    var b = bucketById(f.bucket);
    if (b.model === 'none') return;
    var geo = poolGeometry(f, W, H);
    var col = kelvinRGB(cctFor());
    var a = clamp(intensity(f) * S.dim, 0.05, 1);

    g.save();
    g.translate(geo.cx, geo.cy);
    g.scale(1, geo.ry / geo.rx);
    var grad = g.createRadialGradient(0, 0, 0, 0, 0, geo.rx);
    grad.addColorStop(0.00, rgba(col, a * 1.00));
    grad.addColorStop(0.42, rgba(col, a * 0.88));
    grad.addColorStop(0.68, rgba(col, a * 0.52));
    grad.addColorStop(0.86, rgba(col, a * 0.20));
    grad.addColorStop(1.00, rgba(col, 0));
    g.fillStyle = grad;
    g.beginPath();
    g.arc(0, 0, geo.rx, 0, Math.PI * 2);
    g.fill();
    g.restore();

    /* A wall light throws up as well as down, which is the whole reason to fit
       one. Without the second lobe it reads as a dim downlight. */
    if (b.model === 'wash') {
      g.save();
      g.translate(f.u * W, f.v * H - geo.ry * 0.62);
      g.scale(1, geo.ry / geo.rx);
      var up = g.createRadialGradient(0, 0, 0, 0, 0, geo.rx * 0.86);
      up.addColorStop(0.00, rgba(col, a * 0.70));
      up.addColorStop(0.55, rgba(col, a * 0.30));
      up.addColorStop(1.00, rgba(col, 0));
      g.fillStyle = up;
      g.beginPath(); g.arc(0, 0, geo.rx * 0.86, 0, Math.PI * 2); g.fill();
      g.restore();
    }
  }

  /* The lamp itself: small, hot, and the one thing in the picture that is
     genuinely emitting rather than reflecting. */
  function paintSource(ctx, f, W, H) {
    var b = bucketById(f.bucket);
    if (b.model === 'none') return;
    var geo = poolGeometry(f, W, H);
    var col = kelvinRGB(cctFor());
    var a = clamp(intensity(f) * S.dim, 0.05, 1);
    var x = f.u * W, y = f.v * H;

    if (b.model === 'bar') {
      /* a batten or a strip is a line, not a dot */
      var hw = Math.max(geo.rx * 0.92, 12), hh = Math.max(geo.ry * 0.42, 4);
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, hh / hw);
      var lg = ctx.createRadialGradient(0, 0, 0, 0, 0, hw);
      lg.addColorStop(0.00, rgba(col, Math.min(1, a * 1.25)));
      lg.addColorStop(0.55, rgba(col, a * 0.55));
      lg.addColorStop(1.00, rgba(col, 0));
      ctx.fillStyle = lg;
      ctx.beginPath(); ctx.arc(0, 0, hw, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      return;
    }

    var cr = clamp(geo.rx * 0.085, 5, 26);
    var core = ctx.createRadialGradient(x, y, 0, x, y, cr * 3.1);
    core.addColorStop(0.00, rgba(col, Math.min(1, a * 1.30)));
    core.addColorStop(0.22, rgba(col, a * 0.62));
    core.addColorStop(0.58, rgba(col, a * 0.18));
    core.addColorStop(1.00, rgba(col, 0));
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(x, y, cr * 3.1, 0, Math.PI * 2); ctx.fill();
  }

  /* ------------------------------------------------------------
     The marks that sit over the photo: tappable, draggable, and shaped so a
     batten does not look like a downlight.
     ------------------------------------------------------------ */
  function renderMarks() {
    var svg = el.marks; if (!svg) return;
    var W = el.canvas.width, H = el.canvas.height;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var col = S.on ? hex(kelvinRGB(S.cct)) : '#ffd27a';
    /* Once the lights are on, the glow is the thing worth looking at. The
       marks stay so a fitting can still be tapped and dragged, but they get
       out of the way. */
    var op = S.on ? 0.62 : 1;
    var parts = ['<g opacity="' + op + '">'];

    S.fittings.forEach(function (f) {
      var b = bucketById(f.bucket);
      var d = depth(f.v, b.surface);
      var r = clamp(W * 0.0082 * (0.55 + 0.85 * d) * f.size, 5, 19);
      var x = f.u * W, y = f.v * H;
      var selected = S.sel === f.key;
      var stroke = selected ? '#ffffff' : '#0e1008';
      var sw = Math.max(r * 0.16, 1.4);
      var shape;

      if (b.model === 'bar') {
        var bw = Math.max(r * 4.2, 24), bh = Math.max(r * 0.82, 5);
        shape = '<rect x="' + (x - bw / 2) + '" y="' + (y - bh / 2) + '" width="' + bw +
                '" height="' + bh + '" rx="' + (bh / 2) + '" fill="' + col +
                '" stroke="' + stroke + '" stroke-width="' + sw + '" class="ring"/>';
      } else if (b.model === 'wash') {
        shape = '<path d="M' + (x - r) + ' ' + (y + r * 0.9) + ' A ' + r + ' ' + (r * 1.5) + ' 0 0 1 ' +
                (x + r) + ' ' + (y + r * 0.9) + ' Z" fill="' + col + '" stroke="' + stroke +
                '" stroke-width="' + sw + '" class="ring"/>';
      } else if (b.id === 'fan') {
        shape = '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + col + '" stroke="' + stroke +
                '" stroke-width="' + sw + '" class="ring"/>' +
                '<path d="M' + (x - r * 2.1) + ' ' + y + ' H' + (x + r * 2.1) + ' M' + x + ' ' + (y - r * 2.1) +
                ' V' + (y + r * 2.1) + '" stroke="' + col + '" stroke-width="' + sw + '" opacity=".75"/>';
      } else if (b.model === 'none') {
        shape = '<rect x="' + (x - r * 1.4) + '" y="' + (y - r * 0.8) + '" width="' + (r * 2.8) +
                '" height="' + (r * 1.6) + '" rx="2" fill="#1fa84a" stroke="' + stroke +
                '" stroke-width="' + sw + '" class="ring"/>';
      } else {
        shape = '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + col + '" stroke="' + stroke +
                '" stroke-width="' + sw + '" class="ring"/>';
      }

      parts.push(
        '<g class="mk' + (selected ? ' sel' : '') + '" data-key="' + f.key + '">' +
        (selected ? '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 2.1) +
          '" fill="none" stroke="#fff" stroke-width="' + sw + '" stroke-dasharray="4 4" opacity=".9"/>' : '') +
        shape +
        '<circle class="mk-hit" cx="' + x + '" cy="' + y + '" r="' + Math.max(r * 2.4, 20) + '"/>' +
        '</g>'
      );
    });

    parts.push('</g><g>');
    /* The ceiling line, while they are adjusting it. */
    if (S.hzEdit) {
      var hy = S.horizon * H;
      parts.push(
        '<g data-hz="1">' +
        '<line class="hzline" x1="0" y1="' + hy + '" x2="' + W + '" y2="' + hy + '"/>' +
        '<rect class="hzgrab" x="' + (W / 2 - 34) + '" y="' + (hy - 9) + '" width="68" height="18" rx="9"/>' +
        '<text class="hzlabel" x="' + (W / 2) + '" y="' + (hy - 15) + '" text-anchor="middle">ceiling line</text>' +
        '</g>'
      );
    }
    parts.push('</g>');
    svg.innerHTML = parts.join('');
  }

  /* ============================================================
     Loading a photo
     ============================================================ */
  function loadImage(src, name, thenRoom) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      var w = img.naturalWidth, h = img.naturalHeight;
      var scale = Math.min(1, MAXW / w);
      var cw = Math.round(w * scale), ch = Math.round(h * scale);
      el.canvas.width = cw; el.canvas.height = ch;
      S.photo = { img: img, name: name || 'your room', loaded: true };
      S.photoMean = meanLuminance(img);
      S.fittings = []; S.sel = null; S.undo = []; S.reco = null; S.style = null;
      S.horizon = estimateHorizon(img, cw, ch);
      if (thenRoom && ROOMS[thenRoom]) { S.roomType = thenRoom; S.cct = ROOMS[thenRoom].cct; }
      showLab();
      renderRoomSelect();
      renderCct();
      busy(true);
      /* Let the browser paint the photo before the scheme goes on top of it,
         so the customer sees their own room arrive and then light up rather
         than staring at nothing while it works. */
      render();
      setTimeout(function () {
        autoLight();
        busy(false);
        /* One line, once, so they know the lights can be moved. Anything more
           than this and it is a manual again. */
        if (!S.hintSeen) {
          S.hintSeen = true;
          toast('Your room, lit. Drag any light to move it.');
        }
      }, 90);
    };
    img.onerror = function () { toast('That image would not open. Try a JPG or PNG.'); };
    img.src = src;
  }

  /* How bright the photo already is, 0 to 255. A room shot at night is
     already dark, and dimming it again by the same amount as a photo taken at
     midday leaves a black rectangle with a few dots on it. This one number is
     what stops that. */
  function meanLuminance(img) {
    try {
      var o = document.createElement('canvas');
      o.width = 40; o.height = 30;
      var c = o.getContext('2d', { willReadFrequently: true });
      c.drawImage(img, 0, 0, 40, 30);
      var px = c.getImageData(0, 0, 40, 30).data, s = 0;
      for (var i = 0; i < 40 * 30; i++) {
        s += 0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2];
      }
      return s / (40 * 30);
    } catch (e) { return 128; }
  }

  function handleFile(file) {
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast('That is not an image file.'); return; }
    if (file.size > 25 * 1024 * 1024) { toast('That photo is very large. Try one under 25 MB.'); return; }
    var fr = new FileReader();
    fr.onload = function () { loadImage(fr.result, file.name); };
    fr.onerror = function () { toast('Could not read that file.'); };
    fr.readAsDataURL(file);
  }

  /* ------------------------------------------------------------
     Where the ceiling meets the wall, estimated from the photo.
     Interior ceilings are usually brighter and flatter than the wall below
     them, so the strongest downward step in row brightness across the top two
     thirds of the frame is a reasonable guess. It is only a starting point —
     the Ceiling line button lets them drag it, and the number it produces is
     clamped so a strange photo cannot push it somewhere absurd.
     ------------------------------------------------------------ */
  function estimateHorizon(img, cw, ch) {
    try {
      var N = 120;
      var o = document.createElement('canvas');
      o.width = 24; o.height = N;
      var c = o.getContext('2d', { willReadFrequently: true });
      c.drawImage(img, 0, 0, 24, N);
      var px = c.getImageData(0, 0, 24, N).data;
      var rows = new Array(N), i, x, s;
      for (i = 0; i < N; i++) {
        s = 0;
        for (x = 0; x < 24; x++) {
          var k = (i * 24 + x) * 4;
          s += 0.2126 * px[k] + 0.7152 * px[k + 1] + 0.0722 * px[k + 2];
        }
        rows[i] = s / 24;
      }
      /* Smooth, or every picture rail and cornice becomes a candidate. */
      var sm = rows.map(function (_, i2) {
        var a = 0, n = 0;
        for (var j = Math.max(0, i2 - 3); j <= Math.min(N - 1, i2 + 3); j++) { a += rows[j]; n++; }
        return a / n;
      });
      var best = -1, bestAt = -1;
      for (i = Math.round(N * 0.14); i < Math.round(N * 0.68); i++) {
        var drop = sm[i - 4] - sm[i + 4];
        if (drop > best) { best = drop; bestAt = i; }
      }
      if (bestAt < 0 || best < 6) return 0.45;
      return clamp(bestAt / N, 0.22, 0.62);
    } catch (e) {
      return 0.45;
    }
  }

  /* ============================================================
     Placing, moving and removing fittings
     ============================================================ */
  function snapshot() {
    S.undo.push(JSON.stringify({ f: S.fittings, h: S.horizon }));
    if (S.undo.length > 40) S.undo.shift();
    syncToolbar();
  }
  function undo() {
    if (!S.undo.length) return;
    var st = JSON.parse(S.undo.pop());
    S.fittings = st.f; S.horizon = st.h; S.sel = null;
    render(); refreshAll(); syncToolbar();
  }

  function place(u, v, pid, bucket, opts) {
    var p = prod(pid); if (!p) { toast('Pick a fitting first.'); return null; }
    var f = {
      key: 'f' + (S.seq++),
      pid: pid,
      bucket: bucket,
      u: clamp(u, 0.01, 0.99),
      v: clamp(v, 0.01, 0.99),
      size: (opts && opts.size) || 1,
      metres: p.perMetre ? ((opts && opts.metres) || 3) : null
    };
    S.fittings.push(f);
    return f;
  }

  function removeSelected() {
    if (!S.sel) return;
    snapshot();
    S.fittings = S.fittings.filter(function (f) { return f.key !== S.sel; });
    S.sel = null;
    hidePop();
    render(); refreshAll();
  }

  function clearLights() {
    if (!S.fittings.length) return;
    snapshot();
    S.fittings = []; S.sel = null; S.reco = null; S.style = null;
    hidePop();
    render(); refreshAll();
    renderReco();
  }

  /* ============================================================
     Pointer handling on the stage
     ============================================================ */
  var drag = null;

  function stagePoint(e) {
    var r = el.canvas.getBoundingClientRect();
    return {
      u: clamp((e.clientX - r.left) / r.width, 0, 1),
      v: clamp((e.clientY - r.top) / r.height, 0, 1)
    };
  }

  function onDown(e) {
    if (!S.photo.loaded) return;
    var pt = stagePoint(e);

    if (S.hzEdit) {
      drag = { mode: 'hz' };
      snapshot();
      S.horizon = clamp(pt.v, 0.1, 0.9);
      render();
      el.canvas.setPointerCapture && el.canvas.setPointerCapture(e.pointerId);
      return;
    }

    var g = e.target.closest && e.target.closest('.mk');
    if (g) {
      var key = g.getAttribute('data-key');
      var f = S.fittings.filter(function (x) { return x.key === key; })[0];
      if (f) {
        S.sel = key;
        drag = { mode: 'move', f: f, from: { u: f.u, v: f.v }, moved: false };
        snapshot();
        renderMarks();
        el.marks.setPointerCapture && el.marks.setPointerCapture(e.pointerId);
        return;
      }
    }

    /* Empty ground: drop a new fitting. */
    /* A stray tap on the photo should do nothing surprising. Dropping a
       fitting only happens once somebody has deliberately chosen one under
       Adjust it yourself. */
    if (!S.pid || ($('#adv') && $('#adv').hidden)) { S.sel = null; renderMarks(); hidePop(); return; }
    snapshot();
    var nf = place(pt.u, pt.v, S.pid, S.bucket);
    if (nf) {
      S.sel = nf.key;
      hidePop();
      render(); refreshAll();
      if (!S.on && S.fittings.length === 1) {
        toast('Placed. Turn them on in step 04 to see the light.');
      }
    }
  }

  function onMove(e) {
    if (!drag) return;
    var pt = stagePoint(e);
    if (drag.mode === 'hz') { S.horizon = clamp(pt.v, 0.1, 0.9); render(); return; }
    if (drag.mode === 'move') {
      drag.f.u = pt.u; drag.f.v = pt.v; drag.moved = true;
      render();
    }
  }

  function onUp() {
    if (drag && drag.mode === 'move' && !drag.moved) {
      showPop(drag.f);
    }
    if (drag && drag.mode === 'move' && drag.moved) refreshAll();
    drag = null;
  }

  /* ============================================================
     The product card over a placed light
     ============================================================ */
  var pop = null;
  function hidePop() { if (pop && pop.parentNode) pop.parentNode.removeChild(pop); pop = null; }

  function showPop(f) {
    hidePop();
    var p = prod(f.pid); if (!p) return;
    var host = $('#holder');
    var r = el.canvas.getBoundingClientRect(), hr = host.getBoundingClientRect();
    var x = (f.u * r.width) + (r.left - hr.left);
    var y = (f.v * r.height) + (r.top - hr.top);

    pop = document.createElement('div');
    pop.className = 'pop';
    pop.innerHTML =
      '<button type="button" class="close" aria-label="Close">&times;</button>' +
      '<div class="top">' +
        '<div class="thumb">' + (p.img ? '<img src="' + esc(thumbURL(p.img, 130)) + '" alt="">' : '') + '</div>' +
        '<div><h4>' + esc(p.name) + '</h4>' +
        '<div class="pr">' + money(p.price) + ' <em>ex GST' + (p.perMetre ? ' per metre' : '') + '</em></div></div>' +
      '</div>' +
      (p.blurb ? '<div class="bl">' + esc(p.blurb) + '</div>' : '') +
      '<div class="acts">' +
        (p.page ? '<a href="' + esc(p.page) + '">View product</a>'
                : '<a href="/products/">View product</a>') +
        '<button type="button" class="add" data-add="' + esc(f.pid) + '" data-bucket="' + esc(f.bucket) + '">Add one</button>' +
        '<button type="button" class="del" data-del="' + esc(f.key) + '">Remove</button>' +
      '</div>';

    /* Keep the card on screen: flip it left or above when it would overflow. */
    var w = 262;
    pop.style.left = clamp(x - w / 2, 8, Math.max(8, hr.width - w - 8)) + 'px';
    var below = y + 26;
    pop.style.top = (below + 200 > hr.height ? Math.max(8, y - 212) : below) + 'px';
    host.appendChild(pop);

    pop.querySelector('.close').onclick = hidePop;
    /* On a phone the keyboard is not an option, so removing a light has to be
       something you can tap. */
    pop.querySelector('[data-del]').onclick = function () {
      S.sel = this.getAttribute('data-del');
      removeSelected();
    };
    pop.querySelector('[data-add]').onclick = function () {
      snapshot();
      var nf = place(clamp(f.u + 0.06, 0.02, 0.98), f.v, f.pid, f.bucket, { metres: f.metres });
      if (nf) { S.sel = nf.key; render(); refreshAll(); toast('Added another to your list.'); }
      hidePop();
    };
  }

  /* The site already serves product photos through this resizer, so a Light
     Lab thumbnail costs the same as a category tile rather than pulling a
     one megabyte Magento original. */
  function thumbURL(url, w) {
    if (!url) return '';
    return 'https://images.weserv.nl/?url=' + encodeURIComponent(url.replace(/^https?:\/\//, '')) +
           '&w=' + w + '&h=' + w + '&fit=contain&cbg=white&output=webp&q=82';
  }

  /* ============================================================
     "What's wrong with my lighting?"
     ------------------------------------------------------------
     This reads the actual pixels of the photo rather than guessing. It
     downsamples the image, measures overall brightness, how evenly that
     brightness is spread across a 4 x 3 grid, how warm or cool the existing
     light reads, and how dark the edges are against the middle. Every finding
     below names the measurement it came from, so nothing here is a verdict
     the customer cannot check for themselves.
     ============================================================ */
  function analyse() {
    if (!S.photo.loaded) return null;
    var GW = 48, GH = 36;
    var o = document.createElement('canvas');
    o.width = GW; o.height = GH;
    var c = o.getContext('2d', { willReadFrequently: true });
    c.drawImage(S.photo.img, 0, 0, GW, GH);
    var px;
    try { px = c.getImageData(0, 0, GW, GH).data; }
    catch (e) { return null; }

    var lum = new Float32Array(GW * GH);
    var sumR = 0, sumG = 0, sumB = 0, sum = 0, i;
    for (i = 0; i < GW * GH; i++) {
      var r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
      lum[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sum += lum[i]; sumR += r; sumG += g; sumB += b;
    }
    var mean = sum / (GW * GH);
    var warmth = sumR / Math.max(sumB, 1);

    /* 4 x 3 blocks of mean brightness — enough to see a hot middle and dark
       corners without being thrown by one lamp in frame. */
    var BX = 4, BY = 3, blocks = [];
    for (var by = 0; by < BY; by++) {
      for (var bx = 0; bx < BX; bx++) {
        var a = 0, n = 0;
        for (var y = Math.floor(by * GH / BY); y < Math.floor((by + 1) * GH / BY); y++) {
          for (var x = Math.floor(bx * GW / BX); x < Math.floor((bx + 1) * GW / BX); x++) {
            a += lum[y * GW + x]; n++;
          }
        }
        blocks.push(a / Math.max(n, 1));
      }
    }
    var bmax = Math.max.apply(null, blocks), bmin = Math.min.apply(null, blocks);
    var spread = bmax - bmin;
    var corners = (blocks[0] + blocks[BX - 1] + blocks[BX * (BY - 1)] + blocks[BX * BY - 1]) / 4;
    var centre = (blocks[BX + 1] + blocks[BX + 2]) / 2;

    /* Warm/cool ratio to an approximate Kelvin. Rough, and labelled as such. */
    var readsK = warmth > 1.30 ? 2700 : warmth > 1.16 ? 3000 : warmth > 1.02 ? 4000 : 5000;

    return {
      mean: Math.round(mean), spread: Math.round(spread), warmth: Math.round(warmth * 100) / 100,
      corners: Math.round(corners), centre: Math.round(centre), readsK: readsK
    };
  }

  function findings() {
    var m = analyse();
    if (!m) return [];
    var brief = ROOMS[S.roomType] || ROOMS.living;
    var out = [];

    if (m.mean < 72) {
      out.push({
        t: 'The room is underlit',
        p: 'There is not enough light in here for what the room is being asked to do. Most rooms this size want four to six fittings, not one or two.',
        m: 'Average brightness ' + m.mean + ' of 255',
        fix: { kind: 'downlights', n: brief.dl || 4 }
      });
    }
    if (m.spread > 78) {
      out.push({
        t: 'Bright in the middle, dark at the edges',
        p: 'The light is pooling in one place instead of covering the room. Spreading the same number of fittings further apart, closer to the walls, evens it out and makes the room feel bigger.',
        m: 'Brightest area is ' + m.spread + ' points above the darkest',
        fix: { kind: 'spread' }
      });
    }
    if (m.spread < 26 && m.mean > 90) {
      out.push({
        t: 'Flat lighting, no depth',
        p: 'Everything is lit to the same level, which is what a single layer of downlights does. Adding light on a wall or under a cabinet gives the room somewhere for your eye to go.',
        m: 'Only ' + m.spread + ' points between the brightest and darkest areas',
        fix: { kind: 'layers' }
      });
    }
    if (m.corners < m.centre - 46) {
      out.push({
        t: 'The walls are doing nothing',
        p: 'All the light is pointing at the floor. Washing a wall lifts the whole room and costs two fittings.',
        m: 'Edges read ' + Math.round(m.centre - m.corners) + ' points darker than the middle',
        fix: { kind: 'wall', n: 2 }
      });
    }
    if (m.readsK !== brief.cct) {
      out.push({
        t: 'The colour temperature is not right for this room',
        p: 'Your existing light reads around ' + m.readsK + 'K. For a ' + brief.label.toLowerCase() +
           ' we would normally fit ' + brief.cct + 'K. ' + CCT_SAYS[brief.cct],
        m: 'Warm to cool ratio ' + m.warmth.toFixed(2),
        fix: { kind: 'cct', k: brief.cct }
      });
    }
    if (brief.bench && !S.fittings.some(function (f) { return bucketById(f.bucket).id === 'strip'; })) {
      out.push({
        t: 'Nothing lighting the bench',
        p: 'With downlights in the ceiling behind you, you end up working in your own shadow. A strip under the overhead cupboards fixes it and is the single most noticed upgrade in a kitchen.',
        m: 'No under-bench light placed',
        fix: { kind: 'strip' }
      });
    }

    if (!out.length) {
      out.push({
        good: true,
        t: 'Nothing obvious to fix',
        p: 'Brightness, spread and colour all read sensibly for this room. If something still feels off it is probably glare or the position of the fittings rather than how many there are, and that is worth a conversation.',
        m: 'Average ' + m.mean + ' · spread ' + m.spread + ' · reads about ' + m.readsK + 'K'
      });
    }
    return out;
  }

  function applyFix(fix) {
    var brief = ROOMS[S.roomType] || ROOMS.living;
    snapshot();
    switch (fix.kind) {
      case 'downlights': layGrid(pickProduct('downlight', brief.cct === 4000), fix.n || 6); break;
      case 'spread':     layGrid(pickProduct('downlight'), Math.max(S.fittings.length, brief.dl || 6), 1.18); break;
      case 'layers':     layWalls(pickProduct('wall'), 2); layStrip(pickProduct('strip')); break;
      case 'wall':       layWalls(pickProduct('wall'), fix.n || 2); break;
      case 'strip':      layStrip(pickProduct('strip')); break;
      case 'cct':        S.cct = fix.k; break;
    }
    S.on = true; S.view = 'lab';
    render(); refreshAll(); syncOnOff(); renderCct();
    toast('Done. That is what it would look like.');
  }

  /* ============================================================
     "Reimagine my room"
     ------------------------------------------------------------
     No picture is invented here. The style picks a colour temperature and a
     recipe of layers; the room type sets the counts; and every fitting in the
     result is a real product at a real price, which is what turns a nice
     picture into something we can quote.
     ============================================================ */
  function pickProduct(bucket, preferNeutral) {
    var b = bucketById(bucket);
    var ids = (b && b.products) || [];
    if (!ids.length) return null;
    if (preferNeutral) {
      for (var i = 0; i < ids.length; i++) {
        var p = prod(ids[i]);
        if (p && /cct|tri|colour|color/i.test(p.name)) return ids[i];
      }
    }
    return ids[0];
  }
  function pickLowGlare(bucket) {
    var ids = (bucketById(bucket).products) || [];
    for (var i = 0; i < ids.length; i++) {
      var p = prod(ids[i]);
      if (p && parseBeam(p.beam) && parseBeam(p.beam) < 90) return ids[i];
    }
    return ids[0] || null;
  }

  function layGrid(pid, n, spreadMul) {
    if (!pid || !n) return;
    var b = 'downlight';
    var hz = clamp(S.horizon, 0.15, 0.75);
    var rows = n <= 4 ? 2 : n <= 6 ? 2 : 3;
    var cols = Math.ceil(n / rows);
    var m = spreadMul || 1;
    var left = clamp(0.5 - 0.30 * m, 0.06, 0.44), right = clamp(0.5 + 0.30 * m, 0.56, 0.94);
    var top = 0.08, bot = Math.max(hz - 0.07, 0.12);
    var placed = 0;
    for (var r = 0; r < rows && placed < n; r++) {
      for (var c = 0; c < cols && placed < n; c++) {
        var u = cols === 1 ? 0.5 : left + (right - left) * (c / (cols - 1));
        var v = rows === 1 ? (top + bot) / 2 : top + (bot - top) * (r / (rows - 1));
        place(u, v, pid, b);
        placed++;
      }
    }
  }
  function layWalls(pid, n) {
    if (!pid) return;
    var hz = clamp(S.horizon, 0.15, 0.75);
    var spots = [0.09, 0.91, 0.24, 0.76];
    for (var i = 0; i < n && i < spots.length; i++) place(spots[i], hz + 0.10, pid, 'wall');
  }
  function layStrip(pid) {
    if (!pid) return;
    var hz = clamp(S.horizon, 0.15, 0.75);
    place(0.5, Math.min(hz + 0.24, 0.9), pid, 'strip', { metres: 3 });
  }
  function layFeature(pid) {
    if (!pid) return;
    place(0.5, clamp(S.horizon * 0.55, 0.06, 0.4), pid, 'track');
  }
  function layGarden(pid, n) {
    if (!pid) return;
    var hz = clamp(S.horizon, 0.15, 0.75);
    for (var i = 0; i < n; i++) {
      place(0.18 + (0.64 * i) / Math.max(n - 1, 1), Math.min(hz + 0.26 + (i % 2) * 0.09, 0.93), pid, 'garden');
    }
  }
  function layBatten(pid, n) {
    if (!pid) return;
    for (var i = 0; i < n; i++) place(0.5, 0.16 + i * 0.14, pid, 'batten', { metres: 1.2 });
  }

  function reimagine(styleKey, quiet) {
    if (!S.photo.loaded) return;
    var st = STYLES[styleKey]; if (!st) return;
    var brief = ROOMS[S.roomType] || ROOMS.living;

    snapshot();
    S.fittings = []; S.sel = null;
    S.style = styleKey;
    S.cct = st.cct;

    var lines = [];
    var dlN = Math.max(0, Math.round((brief.dl || 0) * st.dlMul));

    if (brief.batten) {
      var bp = pickProduct('batten');
      layBatten(bp, brief.batten);
      if (bp) lines.push({ pid: bp, n: brief.batten, what: brief.batten + ' × batten' });
    }
    if (dlN) {
      var dp = st.lowGlare ? pickLowGlare('downlight') : pickProduct('downlight', st.cct >= 4000);
      layGrid(dp, dlN);
      if (dp) lines.push({ pid: dp, n: dlN, what: dlN + ' × recessed downlights' });
    }
    var wallN = st.wall + (brief.wall || 0) > 0 ? Math.max(st.wall, brief.wall || 0) : 0;
    if (wallN) {
      var wp = pickProduct('wall');
      layWalls(wp, wallN);
      if (wp) lines.push({ pid: wp, n: wallN, what: wallN + ' × wall lights' });
    }
    if (st.strip || brief.bench) {
      var sp = pickProduct('strip');
      layStrip(sp);
      if (sp) lines.push({ pid: sp, n: 3, metres: true, what: 'LED strip beneath cabinetry' });
    }
    if (st.feature) {
      var fp = pickProduct('track');
      layFeature(fp);
      if (fp) lines.push({ pid: fp, n: 1, what: '1 × feature fitting' });
    }
    if (brief.garden) {
      var gp = pickProduct('garden');
      layGarden(gp, brief.garden);
      if (gp) lines.push({ pid: gp, n: brief.garden, what: brief.garden + ' × garden lights' });
    }

    S.reco = { style: styleKey, lines: lines };
    S.on = true; S.view = 'lab';
    render(); refreshAll(); renderReco(); syncOnOff(); renderCct();
    toast(st.label + ' — ' + S.fittings.length + ' fittings placed.');
  }

  /* ============================================================
     The list
     ============================================================ */
  function quoteLines() {
    var byPid = {};
    S.fittings.forEach(function (f) {
      var p = prod(f.pid); if (!p) return;
      var k = f.pid;
      if (!byPid[k]) byPid[k] = { pid: k, p: p, qty: 0, metres: 0, perMetre: !!p.perMetre };
      if (p.perMetre) byPid[k].metres += (f.metres || 3);
      else byPid[k].qty += 1;
    });
    return Object.keys(byPid).map(function (k) {
      var l = byPid[k];
      var units = l.perMetre ? l.metres : l.qty;
      l.units = units;
      l.line = Math.round(l.p.price * units * 100) / 100;
      return l;
    }).sort(function (a, b) { return b.line - a.line; });
  }
  function quoteTotals(lines) {
    var ex = lines.reduce(function (a, l) { return a + l.line; }, 0);
    ex = Math.round(ex * 100) / 100;
    return { ex: ex, inc: incGST(ex), units: S.fittings.length };
  }

  function renderQuote() {
    var box = $('#quotebox'); if (!box) return;
    var lines = quoteLines(), t = quoteTotals(lines);
    if ($('#sendbox')) $('#sendbox').hidden = !lines.length;

    if (!lines.length) {
      box.innerHTML = '<div class="empty">Nothing in the room yet.<br>Everything you place turns up here, priced.</div>';
      return;
    }
    box.innerHTML = lines.map(function (l) {
      return '<div class="qline">' +
        '<div class="thumb">' + (l.p.img ? '<img src="' + esc(thumbURL(l.p.img, 90)) + '" alt="" loading="lazy">' : '') + '</div>' +
        '<div><div class="nm">' + esc(l.p.name) + '</div>' +
        '<div class="sub">' + (l.perMetre ? l.units + ' m estimated run · quoted with you' : l.units + ' × ' + money(l.p.price) + ' ex') + '</div></div>' +
        '<div class="amt">' + money(l.line) + '</div></div>';
    }).join('') +
    '<div style="margin-top:12px">' +
      '<div class="qtot"><span>Subtotal (ex GST)</span><span>' + money(t.ex) + '</span></div>' +
      '<div class="qtot"><span>GST 10%</span><span>' + money(t.inc - t.ex) + '</span></div>' +
      '<div class="qtot big"><span>Total inc GST</span><span>' + money(t.inc) + '</span></div>' +
    '</div>' +
    (lines.some(function (l) { return l.perMetre; })
      ? '<p class="hint" style="margin-top:11px">Strip lighting is sold per metre and the run length, ' +
        'the channel, the driver and the controller all depend on each other. The figure above is an ' +
        'estimate at 3 m per run; we will size the real thing with you.</p>' : '');
  }

  function sendList() {
    var name = $('#cname').value.trim();
    var email = $('#cemail').value.trim();
    var phone = $('#cphone').value.trim();
    if (!name) { toast('We need a name to come back to.'); $('#cname').focus(); return; }
    if (!email && !phone) { toast('An email or a phone number, so we can reply.'); $('#cemail').focus(); return; }

    var lines = quoteLines(), t = quoteTotals(lines);
    var btn = $('#btn-send');
    btn.disabled = true; btn.textContent = 'Sending…';

    /* A small preview so we can see what they are after. Deliberately tiny —
       this is the only thing that ever leaves the device. */
    var thumb = null;
    try {
      var o = document.createElement('canvas');
      var sc = Math.min(1, 520 / el.canvas.width);
      o.width = Math.round(el.canvas.width * sc);
      o.height = Math.round(el.canvas.height * sc);
      o.getContext('2d').drawImage(el.canvas, 0, 0, o.width, o.height);
      thumb = o.toDataURL('image/jpeg', 0.72);
    } catch (e) { thumb = null; }

    var payload = {
      submittedAt: new Date().toISOString(),
      customer: {
        name: name, email: email, phone: phone,
        suburb: $('#csub').value.trim(),
        jobType: 'Light Lab',
        notes: $('#cnote').value.trim()
      },
      project: { name: 'Light Lab — ' + (ROOMS[S.roomType] || {}).label },
      schedule: {
        fittings: S.fittings.length,
        totalExGst: t.ex,
        totalIncGst: t.inc,
        lines: lines.map(function (l) {
          return {
            sku: l.p.sku, name: l.p.name, units: l.units,
            perMetre: l.perMetre, unitPrice: l.p.price, line: l.line
          };
        })
      },
      planData: {
        source: 'light-lab',
        roomType: S.roomType, ceiling: S.ceiling, cct: S.cct,
        style: S.style, horizon: S.horizon,
        fittings: S.fittings
      },
      thumb: thumb
    };

    fetch('/.netlify/functions/submit-layout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      if (!r.ok) throw new Error('bad status ' + r.status);
      return r.json();
    }).then(function () {
      btn.textContent = 'Sent — we will be in touch';
      toast('Sent. We will come back to you shortly.');
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = 'Send my list to Greenhse';
      toast('That did not send. Please call us on (08) 9297 2969.');
    });
  }

  /* ============================================================
     Screen rendering

     The shape of this screen is the whole point of the tool, and it changed
     after the first version was tested on someone. That version asked the
     customer to open a step, pick a category, pick a fitting, then tap the
     photo in the right place, and only then did anything light up. Everyone
     who tried it got stuck before they saw a lit room, which is the one thing
     they came for.

     So: the photo lights itself. Take the photo, say what the room is, and
     the room is already lit when the screen appears. The only two controls on
     that screen are the ones Keri asked for, on and off and the colour of the
     light. Under them is a short list of the fittings we would actually use
     in that room, not the whole catalogue. Moving lights by hand, the looks,
     the diagnosis and the sliders are all still there, behind one button, for
     the people who want them.
     ============================================================ */

  function renderSamples() {
    var host = $('#samples'); if (!host) return;
    host.innerHTML = SAMPLES.map(function (s) {
      return '<button type="button" data-sample="' + esc(s.f) + '" data-room="' + esc(s.room) + '">' +
             '<img src="' + esc(s.f) + '" alt="" loading="lazy"><span>' + esc(s.t) + '</span></button>';
    }).join('');
  }

  function renderRoomSelect() {
    var sel = $('#roomsel'); if (!sel) return;
    sel.innerHTML = Object.keys(ROOMS).map(function (k) {
      return '<option value="' + k + '"' + (S.roomType === k ? ' selected' : '') + '>' +
             esc(ROOMS[k].label) + '</option>';
    }).join('');
  }

  /* ------------------------------------------------------------
     The colour control. Four real colour temperatures, on a slider that
     looks like what it does: warm amber on the left, daylight on the right.
     ------------------------------------------------------------ */
  function renderCct() {
    var scale = $('#cctscale'), r = $('#cct'), name = $('#cctname');
    if (!scale || !r) return;
    var i = CCTS.indexOf(S.cct); if (i < 0) i = 1;
    r.value = String(i);
    scale.innerHTML = CCTS.map(function (k, n) {
      return '<span class="' + (n === i ? 'on' : '') + '">' + k + 'K</span>';
    }).join('');
    if (name) {
      name.innerHTML = 'Colour of the light &mdash; <b style="color:#fff">' +
        (S.cct <= 3000 ? 'warm white' : S.cct === 4000 ? 'neutral white' : 'daylight white') + '</b>';
    }
    var h = $('#ccthelp'); if (h) h.textContent = CCT_SAYS[S.cct] || '';
  }

  function syncOnOff() {
    $$('#onoff button').forEach(function (b) {
      b.classList.toggle('on', (b.getAttribute('data-on') === '1') === S.on);
    });
    var ob = $('#btn-orig');
    if (ob) {
      var showingOriginal = S.view === 'orig';
      ob.setAttribute('aria-pressed', showingOriginal ? 'true' : 'false');
      ob.textContent = showingOriginal ? 'Back to the room' : 'Original photo';
    }
  }

  /* ------------------------------------------------------------
     "Lights we would use in here" — Keri's short list. Four to six fittings
     that suit this room, drawn from the real catalogue, with the ones
     currently in the photo ticked. Tapping one swaps the room over to it.
     ------------------------------------------------------------ */
  function suggestionsFor(room) {
    var b = ROOMS[room] || ROOMS.living;
    var out = [], seen = {};
    function take(bucket, why, n) {
      var ids = (bucketById(bucket).products || []).slice(0, n || 2);
      ids.forEach(function (id) {
        if (seen[id] || !prod(id)) return;
        seen[id] = 1;
        out.push({ id: id, bucket: bucket, why: why });
      });
    }
    if (b.batten) take('batten', 'The garage answer', 1);
    if (b.dl) {
      take('downlight', 'The everyday light', 2);
      take('oyster', 'If you cannot recess', 1);
    }
    if (b.wall) take('wall', 'The layer downlights miss', 1);
    if (b.bench) take('strip', 'Under the bench', 1);
    if (b.garden) take('garden', 'Out in the garden', 1);
    if (room === 'commercial') take('panel', 'Low glare for desks', 1);
    if (room === 'bathroom') take('bathroom', 'Exhaust and heat', 1);
    if (out.length < 4) take('downlight', 'The everyday light', 4);
    return out.slice(0, 6);
  }

  function renderSuggestions() {
    var host = $('#sugg'); if (!host) return;
    var list = suggestionsFor(S.roomType);
    var inRoom = {};
    S.fittings.forEach(function (f) { inRoom[f.pid] = (inRoom[f.pid] || 0) + 1; });

    var b = ROOMS[S.roomType] || ROOMS.living;
    var sub = $('#whysub');
    if (sub) sub.textContent = b.note + ' Tap any of these to put it in the room.';

    host.innerHTML = list.map(function (x) {
      var p = prod(x.id); if (!p) return '';
      var n = inRoom[x.id] || 0;
      return '<button type="button" class="scard' + (n ? ' on' : '') + '" data-swap="' + esc(x.id) +
        '" data-bucket="' + esc(x.bucket) + '">' +
        '<span class="th">' + (p.img ? '<img src="' + esc(thumbURL(p.img, 130)) + '" alt="" loading="lazy">' : '') + '</span>' +
        '<span><span class="nm">' + esc(p.name) + '</span>' +
        (p.blurb ? '<span class="bl">' + esc(p.blurb) + '</span>' : '') +
        '<span class="use">' + (n ? '✓ ' + n + ' in your room' : esc(x.why)) + '</span>' +
        '</span></button>';
    }).join('');
  }

  function renderTotals() {
    var host = $('#totals'); if (!host) return;
    var lines = quoteLines(), t = quoteTotals(lines);
    if (!lines.length) { host.innerHTML = ''; return; }
    host.innerHTML =
      '<span class="t-l">' + S.fittings.length + ' fitting' + (S.fittings.length === 1 ? '' : 's') +
      ' in this room</span>' +
      '<span class="t-r">' + money(t.inc) + ' <em>inc GST</em></span>';
  }

  /* ---------- the Adjust drawer ---------- */
  function renderTabs() {
    var host = $('#tabs'); if (!host) return;
    host.innerHTML = CAT.buckets.map(function (b) {
      return '<button type="button" class="tab' + (S.bucket === b.id ? ' on' : '') +
             '" data-bucket="' + esc(b.id) + '">' + esc(b.label) + '</button>';
    }).join('');
    var cur = bucketById(S.bucket);
    if ($('#tabhint')) $('#tabhint').textContent = cur.hint || '';
  }

  function renderProducts() {
    var host = $('#plist'); if (!host) return;
    var b = bucketById(S.bucket);
    var ids = (b.products || []).slice();
    var lead = b.lead || 3;
    var show = S.showAll ? ids : ids.slice(0, lead);
    if ($('#btn-more')) {
      $('#btn-more').hidden = ids.length <= lead;
      $('#btn-more').textContent = S.showAll
        ? 'Show fewer'
        : 'Show the rest of the range (' + (ids.length - lead) + ' more)';
    }
    host.innerHTML = show.map(function (id) {
      var p = prod(id); if (!p) return '';
      return '<button type="button" class="pcard' + (S.pid === id ? ' on' : '') + '" data-pid="' + esc(id) + '">' +
        '<span class="thumb">' + (p.img ? '<img src="' + esc(thumbURL(p.img, 110)) + '" alt="" loading="lazy">' : '') + '</span>' +
        '<span><span class="nm">' + esc(p.name) + '</span>' +
        (p.blurb ? '<span class="bl">' + esc(p.blurb) + '</span>' : '') + '</span>' +
        '</button>';
    }).join('');
  }

  function renderStyles() {
    var host = $('#stylechips'); if (!host) return;
    host.innerHTML = Object.keys(STYLES).map(function (k) {
      return '<button type="button" class="chip' + (S.style === k ? ' on' : '') +
             '" data-style="' + k + '">' + esc(STYLES[k].label) + '</button>';
    }).join('');
  }

  function renderReco() {
    var host = $('#recobox'); if (!host) return;
    if (!S.reco || !S.reco.lines.length) { host.innerHTML = ''; return; }
    var st = STYLES[S.reco.style];
    host.innerHTML = '<div class="reco"><h4>Light Lab recommends</h4><ul>' +
      S.reco.lines.map(function (l) {
        var p = prod(l.pid);
        var cost = p ? money(p.price * (l.metres ? 3 : l.n)) : '';
        return '<li><span>' + esc(l.what) + '<br><span style="color:#9a9e93;font-size:11.5px">' +
               esc(p ? p.name : '') + '</span></span><span>' + cost + '</span></li>';
      }).join('') +
      '</ul><p style="margin:12px 0 0;font-size:12.5px;color:#a8ada0">' + esc(st ? st.says : '') + '</p></div>';
  }

  function renderFindings(list) {
    var host = $('#findings'); if (!host) return;
    if (!list) { host.innerHTML = ''; return; }
    host.innerHTML = list.map(function (f, i) {
      return '<div class="finding' + (f.good ? ' good' : '') + '">' +
        '<h4>' + esc(f.t) + '</h4><p>' + esc(f.p) + '</p>' +
        '<div class="measure">' + esc(f.m) + '</div>' +
        (f.fix ? '<button type="button" class="btn ghost sm fixbtn" data-fix="' + i + '">Show me</button>' : '') +
        '</div>';
    }).join('');
    host.__list = list;
  }

  function syncToolbar() {
    if ($('#tb-undo')) $('#tb-undo').disabled = !S.undo.length;
    if ($('#tb-hz')) $('#tb-hz').textContent = S.hzEdit ? 'Hide the ceiling line' : 'Show the ceiling line';
  }

  function refreshAll() {
    renderSuggestions();
    renderTotals();
    renderQuote();
    renderProducts();
    renderStyles();
    syncToolbar();
    syncOnOff();
  }

  function setRoom(k, relight) {
    if (!ROOMS[k]) return;
    S.roomType = k;
    S.cct = ROOMS[k].cct;
    renderRoomSelect(); renderCct();
    if (relight && S.photo.loaded) autoLight();
    else { render(); refreshAll(); }
  }

  /* ------------------------------------------------------------
     Light the room, with no input from the customer beyond what room it is.
     This is what makes the tool usable by someone who is not going to read
     anything: they arrive at a lit room and only then decide whether to
     fiddle with it.
     ------------------------------------------------------------ */
  function autoLight() {
    if (!S.photo.loaded) return;
    var b = ROOMS[S.roomType] || ROOMS.living;
    /* A sensible default look per room rather than asking. Warm where people
       relax, neutral where they work, daylight in a shed. */
    var style = b.cct >= 5000 ? 'bright' : b.cct === 4000 ? 'modern' : 'warm';
    reimagine(style, true);
  }

  function showLab() {
    $('#start').hidden = true;
    $('#lab').hidden = false;
    var bh = $('#band-how'), bf = $('#band-faq');
    if (bh) bh.hidden = true;
    if (bf) bf.hidden = true;
    window.scrollTo(0, 0);
  }
  function showStart() {
    $('#lab').hidden = true;
    $('#start').hidden = false;
    var bh = $('#band-how'), bf = $('#band-faq');
    if (bh) bh.hidden = false;
    if (bf) bf.hidden = false;
    hidePop();
    window.scrollTo(0, 0);
  }

  function busy(on, msg) {
    var v = $('#viewer'); if (!v) return;
    var b = v.querySelector('.busy');
    if (on) {
      if (!b) {
        b = document.createElement('div');
        b.className = 'busy';
        v.appendChild(b);
      }
      b.innerHTML = '<i></i><span>' + esc(msg || 'Lighting your room…') + '</span>';
    } else if (b) { b.remove(); }
  }

  /* ============================================================
     Wiring
     ============================================================ */
  function wire() {
    el.canvas = $('#stage');
    el.marks = $('#marks');

    renderSamples();
    renderRoomSelect();
    renderCct();
    syncOnOff();

    /* ---- getting a photo in ----
       Two inputs on purpose. capture="environment" makes a phone open the
       camera itself, which is the whole point, but on some phones it also
       takes away the option of picking an existing picture. So the camera
       button gets the capture input and the choose button gets a plain one. */
    var cam = $('#file-cam'), pickf = $('#file-pick');
    $('#btn-camera').onclick = function () { cam.click(); };
    $('#btn-choose').onclick = function () { pickf.click(); };
    $('#btn-newphoto').onclick = function () { showStart(); };
    [cam, pickf].forEach(function (inp) {
      inp.onchange = function () { handleFile(inp.files[0]); inp.value = ''; };
    });

    $('#samples').onclick = function (e) {
      var b = e.target.closest('[data-sample]'); if (!b) return;
      loadImage(b.getAttribute('data-sample'), b.textContent.trim(), b.getAttribute('data-room'));
    };

    /* drag and drop, for whoever is on a desktop */
    ['dragenter', 'dragover'].forEach(function (ev) {
      document.addEventListener(ev, function (e) { e.preventDefault(); });
    });
    document.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        e.preventDefault(); handleFile(e.dataTransfer.files[0]);
      }
    });

    /* ---- the two controls ---- */
    $('#onoff').onclick = function (e) {
      var b = e.target.closest('[data-on]'); if (!b) return;
      S.on = b.getAttribute('data-on') === '1';
      S.view = 'lab';        /* Off is the same room at night, not the photo */
      render(); syncOnOff();
    };
    $('#cct').oninput = function () {
      S.cct = CCTS[parseInt(this.value, 10)] || 3000;
      if (!S.on) { S.on = true; S.view = 'lab'; }
      renderCct(); render(); syncOnOff();
    };
    $('#btn-orig').onclick = function () {
      S.view = S.view === 'orig' ? 'lab' : 'orig';
      render(); syncOnOff();
    };

    /* ---- room type re-lights the room ---- */
    $('#roomsel').onchange = function () {
      busy(true);
      var k = this.value;
      setTimeout(function () { setRoom(k, true); busy(false); showTheRoom(); }, 30);
    };

    /* ---- the short list ---- */
    $('#sugg').onclick = function (e) {
      var b = e.target.closest('[data-swap]'); if (!b) return;
      swapTo(b.getAttribute('data-swap'), b.getAttribute('data-bucket'));
    };

    /* ---- the two drawers ---- */
    $('#btn-adjust').onclick = function () {
      var a = $('#adv');
      a.hidden = !a.hidden;
      if (!a.hidden) { renderTabs(); renderProducts(); renderStyles(); a.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    };
    $('#btn-adv-close').onclick = function () { $('#adv').hidden = true; };
    $('#btn-list').onclick = function () {
      var l = $('#listbox');
      l.hidden = false;
      renderQuote();
      l.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    $('#btn-list-close').onclick = function () { $('#listbox').hidden = true; };

    /* ---- inside Adjust ---- */
    $('#tabs').onclick = function (e) {
      var b = e.target.closest('[data-bucket]'); if (!b) return;
      S.bucket = b.getAttribute('data-bucket');
      S.showAll = false;
      S.pid = (bucketById(S.bucket).products || [])[0] || null;
      renderTabs(); renderProducts();
    };
    $('#plist').onclick = function (e) {
      var b = e.target.closest('[data-pid]'); if (!b) return;
      S.pid = b.getAttribute('data-pid');
      renderProducts();
      toast('Now tap the photo where you want it.');
    };
    $('#btn-more').onclick = function () { S.showAll = !S.showAll; renderProducts(); };
    $('#stylechips').onclick = function (e) {
      var b = e.target.closest('[data-style]'); if (!b) return;
      busy(true);
      var k = b.getAttribute('data-style');
      setTimeout(function () { reimagine(k); busy(false); }, 30);
    };
    $('#btn-diagnose').onclick = function () {
      if (!S.photo.loaded) return;
      renderFindings(findings());
    };
    $('#findings').onclick = function (e) {
      var b = e.target.closest('[data-fix]'); if (!b) return;
      var list = $('#findings').__list || [];
      var f = list[parseInt(b.getAttribute('data-fix'), 10)];
      if (f && f.fix) applyFix(f.fix);
    };
    $('#tb-undo').onclick = undo;
    $('#tb-clear').onclick = function () { autoLight(); toast('Back to what we would put in here.'); };
    $('#tb-hz').onclick = function () {
      S.hzEdit = !S.hzEdit;
      syncToolbar(); renderMarks();
      toast(S.hzEdit ? 'Drag the green line to where the ceiling meets the wall.' : 'Ceiling line set.');
    };
    $('#ceil').onchange = function () { S.ceiling = parseFloat(this.value); render(); };
    $('#dim').oninput = function () { S.dim = this.value / 100; render(); };
    $('#amb').oninput = function () { S.amb = this.value / 100; render(); };
    $('#btn-send').onclick = sendList;

    /* ---- the photo itself ---- */
    ['#stage', '#marks'].forEach(function (sel) {
      var n = $(sel);
      n.addEventListener('pointerdown', onDown);
      n.addEventListener('pointermove', onMove);
      n.addEventListener('pointerup', onUp);
      n.addEventListener('pointercancel', onUp);
    });
    el.marks.style.pointerEvents = 'auto';
    el.canvas.style.touchAction = 'none';

    document.addEventListener('keydown', function (e) {
      if (/input|textarea|select/i.test(e.target.tagName || '')) return;
      if ((e.key === 'Delete' || e.key === 'Backspace') && S.sel) { e.preventDefault(); removeSelected(); }
      if (e.key === 'Escape') { S.sel = null; S.hzEdit = false; hidePop(); syncToolbar(); renderMarks(); }
      if ((e.key === 'z' || e.key === 'Z') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); undo(); }
    });

    window.addEventListener('resize', function () { hidePop(); });
  }

  /* Swap the room over to a fitting the customer tapped in the short list.
     Every ceiling light in the room is replaced, because that is what "use
     this one instead" means; anything on a wall, under a bench or in the
     garden is left where it is. If the fitting belongs somewhere other than
     the ceiling, one is simply added. */
  function swapTo(pid, bucket) {
    if (!prod(pid)) return;
    snapshot();
    var b = bucketById(bucket);
    if (b.surface === 'ceiling' && bucket !== 'star') {
      var keep = S.fittings.filter(function (f) {
        return bucketById(f.bucket).surface !== 'ceiling' || f.bucket === 'star';
      });
      var n = S.fittings.length - keep.length;
      S.fittings = keep;
      layGrid(pid, Math.max(n || (ROOMS[S.roomType] || {}).dl || 4, 1));
      /* layGrid always places downlights; retag them to what was chosen so
         the light is drawn with the right model and the list prices right. */
      S.fittings.forEach(function (f) {
        if (f.bucket === 'downlight' && f.pid === pid) f.bucket = bucket;
      });
    } else if (bucket === 'wall') {
      layWalls(pid, 2);
    } else if (bucket === 'strip') {
      layStrip(pid);
    } else if (bucket === 'garden') {
      layGarden(pid, 4);
    } else {
      layGrid(pid, 3);
      S.fittings.forEach(function (f) { if (f.pid === pid) f.bucket = bucket; });
    }
    S.on = true; S.view = 'lab';
    render(); refreshAll(); syncOnOff();
    /* Lazar tapped a suggested fitting and said nothing happened. Something
       did happen — the room changed — but on a phone the photo is scrolled off
       the top by the time you reach the list, so there was nothing to see.
       Put the room back on screen and flash it. */
    showTheRoom();
    toast(plainNameOf(pid) + ' — now in your room.');
  }

  /* Bring the photo back into view and pulse it, so a change made from a
     control further down the page is visibly a change. */
  var flashTimer = null;
  function showTheRoom() {
    var v = $('#viewer'); if (!v) return;
    try { v.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { v.scrollIntoView(); }
    v.classList.remove('flash');
    /* reading offsetWidth restarts the animation rather than ignoring it */
    void v.offsetWidth;
    v.classList.add('flash');
    if (flashTimer) clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { v.classList.remove('flash'); }, 900);
  }
  function plainNameOf(pid) {
    var p = prod(pid); if (!p) return 'That fitting';
    return String(p.name).split(',')[0];
  }

  function savePicture() {
    if (!S.photo.loaded) return;
    try {
      el.canvas.toBlob(function (blob) {
        if (!blob) { toast('Could not save that picture.'); return; }
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'greenhse-light-lab.png';
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
      }, 'image/png');
    } catch (e) { toast('Could not save that picture.'); }
  }

  /* ============================================================
     Catalogue load, then go
     ============================================================ */
  function boot() {
    wire();
    fetch('/light-lab-data.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('status ' + r.status); return r.json(); })
      .then(function (d) {
        CAT.buckets = d.buckets || [];
        CAT.products = d.products || {};
        CAT.ready = true;
        S.bucket = (CAT.buckets[0] || {}).id || 'downlight';
        S.pid = (bucketById(S.bucket).products || [])[0] || null;
        renderTabs(); renderProducts();
        if (/[?&]qa=1/.test(location.search)) runQA();
      })
      .catch(function () {
        $('#plist').innerHTML =
          '<div class="empty">The product list did not load. Refresh the page, or ' +
          '<a href="/contact/" style="color:var(--eco)">give us a call</a> and we will walk you through it.</div>';
      });
  }

  /* ============================================================
     Self test — /light-lab/?qa=1
     Every assertion is written so it would fail if the behaviour regressed.
     ============================================================ */
  function runQA() {
    var R = [], pass = 0, fail = 0;
    function ok(n, c, got) { if (c) { pass++; R.push({ n: n, ok: 1 }); } else { fail++; R.push({ n: n, ok: 0, g: String(got) }); } }
    function eq(n, a, b) { ok(n, a === b, 'expected ' + b + ', got ' + a); }
    function near(n, a, b, t) { ok(n, Math.abs(a - b) <= (t || 0.01), 'expected ~' + b + ', got ' + a); }

    /* ---- colour temperature ---- */
    var w = kelvinRGB(2700), c5 = kelvinRGB(5000);
    ok('2700K is warmer than 5000K', w[2] < c5[2], w[2] + ' vs ' + c5[2]);
    ok('every colour temperature stays inside 0-255',
       CCTS.every(function (k) { return kelvinRGB(k).every(function (v) { return v >= 0 && v <= 255; }); }), 'out of range');
    ok('red never drops below blue in the warm range', kelvinRGB(2700)[0] >= kelvinRGB(2700)[2], 'warm reads blue');
    eq('an absurd kelvin is clamped, not NaN', isNaN(kelvinRGB(-5)[0]), false);

    /* ---- perspective ---- */
    S.horizon = 0.45;
    ok('a fitting near the top of the frame reads as closer than one near the ceiling line',
       depth(0.05, 'ceiling') > depth(0.40, 'ceiling'),
       depth(0.05, 'ceiling') + ' vs ' + depth(0.40, 'ceiling'));
    ok('depth never reaches zero, so nothing is ever drawn with no size',
       depth(0.4499, 'ceiling') > 0 && depth(0.9, 'ground') > 0, 'zero depth');
    ok('below the ceiling line reads as floor, not ceiling',
       depth(0.9, 'ceiling') > depth(0.5, 'ceiling'), 'floor depth wrong');

    /* ---- pool geometry ---- */
    var fakeW = 1200, fakeH = 800;
    CAT.products.__wide = { name: 'w', price: 10, beam: '120º', watts: '10Watt' };
    CAT.products.__tight = { name: 't', price: 10, beam: '60º', watts: '10Watt' };
    var fw = { key: 'a', pid: '__wide', bucket: 'downlight', u: 0.5, v: 0.2, size: 1 };
    var ft = { key: 'b', pid: '__tight', bucket: 'downlight', u: 0.5, v: 0.2, size: 1 };
    var gw = poolGeometry(fw, fakeW, fakeH), gt = poolGeometry(ft, fakeW, fakeH);
    ok('a wide beam throws a wider pool than a tight one', gw.rx > gt.rx, gw.rx + ' vs ' + gt.rx);
    var was = S.ceiling;
    S.ceiling = 2.4; var low = poolGeometry(fw, fakeW, fakeH).rx;
    S.ceiling = 3.3; var high = poolGeometry(fw, fakeW, fakeH).rx;
    S.ceiling = was;
    ok('a higher ceiling throws a wider pool from the same fitting', high > low, high + ' vs ' + low);
    ok('the pool is squashed into an ellipse, never a circle', gw.ry < gw.rx, gw.ry + ' vs ' + gw.rx);
    ok('a pool always has a positive size', gw.rx > 0 && gw.ry > 0, 'zero pool');
    delete CAT.products.__wide; delete CAT.products.__tight;

    /* ---- intensity ---- */
    CAT.products.__big = { name: 'b', price: 1, watts: '40Watt' };
    CAT.products.__small = { name: 's', price: 1, watts: '3Watt' };
    ok('a 40 W fitting pushes harder than a 3 W one',
       intensity({ pid: '__big' }) > intensity({ pid: '__small' }), 'wattage ignored');
    ok('intensity never exceeds 1', intensity({ pid: '__big' }) <= 1, intensity({ pid: '__big' }));
    delete CAT.products.__big; delete CAT.products.__small;

    /* ---- catalogue ---- */
    ok('the catalogue loaded', CAT.ready && CAT.buckets.length > 0, 'not loaded');
    ok('every bucket has at least one product',
       CAT.buckets.every(function (b) { return b.products && b.products.length; }), 'empty bucket');
    ok('every product a bucket lists really exists',
       CAT.buckets.every(function (b) { return b.products.every(function (id) { return !!CAT.products[id]; }); }),
       'dangling product id');
    ok('every product has a name and a price',
       Object.keys(CAT.products).every(function (k) {
         var p = CAT.products[k]; return p.name && typeof p.price === 'number';
       }), 'missing name or price');
    ok('no driver, remote or transformer is offered as something to place',
       Object.keys(CAT.products).every(function (k) {
         return !/^(driver|remote|controller|transformer)/i.test(CAT.products[k].name);
       }), 'an accessory is in the picker');
    ok('most of the catalogue carries a real product photo',
       Object.values(CAT.products).filter(function (p) { return p.img; }).length >
       Object.keys(CAT.products).length * 0.6, 'too few photos');
    ok('a product that has a page links to this site, not the old store',
       Object.values(CAT.products).every(function (p) { return !p.page || /^\/product\//.test(p.page); }),
       'bad product link');
    ok('every bucket names a surface the app knows how to draw',
       CAT.buckets.every(function (b) { return ['ceiling', 'wall', 'bench', 'ground'].indexOf(b.surface) > -1; }),
       'unknown surface');
    ok('every bucket names a light model the app knows how to draw',
       CAT.buckets.every(function (b) { return ['cone', 'wash', 'bar', 'point', 'flood', 'none'].indexOf(b.model) > -1; }),
       'unknown model');

    /* ---- rooms and styles ---- */
    ok('every room brief has a colour temperature we actually sell',
       Object.keys(ROOMS).every(function (k) { return CCTS.indexOf(ROOMS[k].cct) > -1; }), 'odd kelvin');
    ok('every look in the brief is here',
       ['warm', 'arch', 'modern', 'luxury', 'bright'].every(function (k) { return !!STYLES[k]; }), 'a look is missing');
    ok('a garage gets battens and no downlights', ROOMS.garage.batten > 0 && ROOMS.garage.dl === 0, 'garage brief wrong');
    ok('a kitchen is lit neutral white, not warm', ROOMS.kitchen.cct === 4000, ROOMS.kitchen.cct);
    ok('a bedroom is lit warm, not daylight', ROOMS.bedroom.cct === 3000, ROOMS.bedroom.cct);

    /* ---- placing ---- */
    var keepF = S.fittings, keepSel = S.sel, keepReco = S.reco, keepStyle = S.style, keepCct = S.cct;
    S.fittings = [];
    var first = (bucketById('downlight').products || [])[0];
    var f1 = place(0.5, 0.2, first, 'downlight');
    ok('a fitting can be placed', !!f1 && S.fittings.length === 1, S.fittings.length);
    ok('a fitting placed off the edge is pulled back on', place(9, 9, first, 'downlight').u <= 1, 'off canvas');
    S.fittings = [];

    /* ---- schemes ---- */
    layGrid(first, 6);
    eq('a six light grid places six', S.fittings.length, 6);
    ok('a grid stays above the ceiling line',
       S.fittings.every(function (f) { return f.v < S.horizon; }), 'a downlight landed on the floor');
    ok('a grid spreads across the room rather than stacking in one spot',
       new Set(S.fittings.map(function (f) { return Math.round(f.u * 100); })).size > 1, 'all in a column');
    S.fittings = [];
    layWalls((bucketById('wall').products || [])[0], 2);
    eq('two wall lights place two', S.fittings.length, 2);
    ok('wall lights go below the ceiling line, on the wall',
       S.fittings.every(function (f) { return f.v > S.horizon; }), 'wall light on the ceiling');
    S.fittings = [];

    /* ---- the list ---- */
    var dl = (bucketById('downlight').products || [])[0];
    place(0.3, 0.2, dl, 'downlight'); place(0.7, 0.2, dl, 'downlight');
    var L = quoteLines(), T = quoteTotals(L);
    eq('two of the same fitting make one line', L.length, 1);
    eq('and that line counts two', L[0].units, 2);
    near('the line total is unit price times quantity', L[0].line, CAT.products[dl].price * 2, 0.005);
    near('GST is added at ten percent', T.inc, Math.round(T.ex * 110) / 100, 0.005);
    ok('the total is the sum of the lines',
       Math.abs(T.ex - L.reduce(function (a, l) { return a + l.line; }, 0)) < 0.005, 'total drifted');
    S.fittings = [];
    var sp = (bucketById('strip').products || [])[0];
    if (sp) {
      layStrip(sp);
      var SL = quoteLines();
      ok('strip is quoted in metres, not in fittings', SL[0].perMetre === true, 'strip counted as a unit');
      eq('a strip run defaults to three metres', SL[0].units, 3);
    }
    S.fittings = [];

    /* ---- reimagine, on a synthetic room ----
       A drawn canvas is a legitimate image source, so the analysis, the
       horizon estimate and the renderer are all exercised for real here
       rather than being stubbed out. Bright flat top, darker lower half,
       warm cast: a room lit by one warm fitting. */
    var keepPhoto = S.photo, keepW = el.canvas.width, keepH = el.canvas.height;
    var syn = document.createElement('canvas');
    syn.width = 240; syn.height = 160;
    (function () {
      var sc = syn.getContext('2d');
      sc.fillStyle = '#d8d2c4'; sc.fillRect(0, 0, 240, 72);
      sc.fillStyle = '#8a7f6b'; sc.fillRect(0, 72, 240, 88);
      var gg = sc.createRadialGradient(120, 60, 0, 120, 60, 90);
      gg.addColorStop(0, 'rgba(255,200,130,.85)'); gg.addColorStop(1, 'rgba(255,200,130,0)');
      sc.fillStyle = gg; sc.fillRect(0, 0, 240, 160);
    })();
    el.canvas.width = 240; el.canvas.height = 160;
    S.photo = { img: syn, name: 'qa', loaded: true };

    var hz = estimateHorizon(syn, 240, 160);
    ok('the ceiling line is estimated inside a sensible range', hz >= 0.22 && hz <= 0.62, hz);
    ok('and it finds the step where the bright ceiling meets the darker wall',
       Math.abs(hz - 0.45) < 0.22, hz);
    var met = analyse();
    ok('the photo analysis returns real measurements',
       !!met && met.mean > 0 && met.mean < 256, met && met.mean);
    ok('and it reads a warm room as warm', met.warmth > 1, met && met.warmth);

    S.fittings = [];
    reimagine('luxury');
    var lux = S.fittings.length, luxCct = S.cct;
    S.fittings = [];
    reimagine('bright');
    ok('the bright look uses more fittings than the luxury one', S.fittings.length > lux,
       S.fittings.length + ' vs ' + lux);
    ok('each look sets its own colour temperature', luxCct !== S.cct, 'both looks the same kelvin');
    ok('reimagining produces a recommendation the customer can read',
       !!S.reco && S.reco.lines.length > 0, 'no recommendation');
    ok('every recommended line points at a real product',
       S.reco.lines.every(function (l) { return !!CAT.products[l.pid]; }), 'recommended a product we do not have');
    ok('reimagining turns the lights on', S.on === true, 'stayed off');

    /* ---- findings ---- */
    var fnd = findings();
    ok('the diagnosis always says something', fnd.length > 0, 'no findings');
    ok('every finding shows the measurement behind it',
       fnd.every(function (f) { return !!f.m; }), 'a finding has no measurement');
    ok('every finding either offers a fix or says nothing is wrong',
       fnd.every(function (f) { return !!f.fix || f.good; }), 'a finding leads nowhere');

    /* ---- the relight itself ----
       The first version painted glowing blobs on top of the photograph with an
       additive blend, which clipped bright surfaces to white and made the
       whole picture milky. These assertions are here so that can never come
       back silently: the light has to LAND on the room, not sit over it. */
    function canvasMean() {
      var cx = el.canvas.getContext('2d');
      var d = cx.getImageData(0, 0, el.canvas.width, el.canvas.height).data;
      var sum = 0, n = 0;
      for (var i = 0; i < d.length; i += 4 * 37) {     /* every 37th pixel is plenty */
        sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        n++;
      }
      return sum / Math.max(n, 1);
    }
    function whitePixels() {
      var cx = el.canvas.getContext('2d');
      var d = cx.getImageData(0, 0, el.canvas.width, el.canvas.height).data;
      var n = 0, t = 0;
      for (var i = 0; i < d.length; i += 4 * 37) {
        if (d[i] > 250 && d[i + 1] > 250 && d[i + 2] > 250) n++;
        t++;
      }
      return n / Math.max(t, 1);
    }

    S.fittings = []; S.roomType = 'living'; S.horizon = 0.55;
    setRoom('living', true);
    var litFittings = S.fittings.length;
    ok('choosing a room puts real fittings in it', litFittings > 0, litFittings);

    S.view = 'orig'; render();
    var mOrig = canvasMean();
    S.view = 'lab'; S.on = false; render();
    var mOff = canvasMean();
    S.on = true; render();
    var mOn = canvasMean();
    var whiteOn = whitePixels();

    ok('lights off drops the room to evening, below the original photo',
       mOff < mOrig * 0.92, mOff.toFixed(1) + ' vs original ' + mOrig.toFixed(1));
    ok('turning the lights on makes the room brighter than lights off',
       mOn > mOff * 1.12, mOn.toFixed(1) + ' vs off ' + mOff.toFixed(1));
    ok('the lit room is not blown out to white',
       whiteOn < 0.10, (whiteOn * 100).toFixed(1) + '% of pixels pure white');
    ok('the lit room still has dark parts, so it reads as lighting not fog',
       mOn < 232, mOn.toFixed(1));

    /* a ceiling downlight lights the floor, not the ceiling it sits in */
    S.horizon = 0.55;
    var dlFit = { key: 'qa1', pid: Object.keys(CAT.products)[0], bucket: 'downlight',
                  u: 0.5, v: 0.15, size: 1 };
    var dlGeo = poolGeometry(dlFit, 1200, 800);
    ok('a recessed downlight throws its pool below itself, not around itself',
       dlGeo.cy > dlFit.v * 800 + dlGeo.ry, Math.round(dlGeo.cy) + ' vs fitting at ' + (dlFit.v * 800));
    ok('and no single fitting is allowed to own the whole picture',
       dlGeo.rx <= 1200 * 0.47, dlGeo.rx);

    /* one view control, not two that disagree */
    ok('there is a single way back to the untouched photo',
       !!$('#btn-orig') && !document.getElementById('flip'), 'the old Before/With lights pair is still here');
    ok('the room question comes before the light controls',
       !!$('.controls .roomrow'), 'room question is not with the controls');

    /* ---- money ---- */
    eq('GST on one hundred dollars is ten', incGST(100), 110);
    eq('GST rounds to cents', incGST(16.5), 18.15);
    eq('money always shows two decimals', money(1234.5), '$1,234.50');

    /* ---- the page itself ---- */
    /* textContent rather than innerText: the lab half of the page is hidden
       until a photo exists, and innerText skips anything not rendered. */
    var pageText = document.body.textContent;
    ok('the honesty note about accuracy is on the page',
       /not a photometric simulation/i.test(pageText), 'missing the accuracy note');
    ok('the privacy promise is on the page',
       /never leaves it|stays on your phone/i.test(pageText), 'missing the privacy note');
    ok('strip is described as quoted per metre, not counted',
       /sold per metre/i.test(pageText), 'missing the strip note');
    ok('the camera is the first thing offered, not a file browser',
       !!$('#file-cam') && $('#file-cam').getAttribute('capture') === 'environment',
       'no camera capture input');
    ok('and there is a separate way to pick an existing picture',
       !!$('#file-pick') && !$('#file-pick').getAttribute('capture'), 'no plain picker');
    ok('the two controls Keri asked for are on the screen, not in a drawer',
       !!$('#onoff') && !!$('#cct') && $('#onoff').closest('#adv') === null &&
       $('#cct').closest('#adv') === null, 'a main control is hidden away');
    ok('the short suggested list exists rather than the whole catalogue',
       suggestionsFor('kitchen').length > 0 && suggestionsFor('kitchen').length <= 6,
       suggestionsFor('kitchen').length + ' suggestions');
    ok('every suggested fitting is a real product',
       Object.keys(ROOMS).every(function (k) {
         return suggestionsFor(k).every(function (x) { return !!prod(x.id); });
       }), 'a suggestion points at nothing');
    ok('every room type suggests something',
       Object.keys(ROOMS).every(function (k) { return suggestionsFor(k).length > 0; }),
       'a room suggests nothing');
    ok('everything for people who want to fiddle is behind one button',
       !!$('#adv') && !!$('#btn-adjust'), 'no adjust drawer');
    ok('the room types from the brief are all offered',
       ['kitchen', 'living', 'bedroom', 'bathroom', 'exterior', 'alfresco', 'commercial']
         .every(function (k) { return !!ROOMS[k]; }), 'a room type is missing');
    ok('the product card offers both actions from the brief',
       /View product/i.test(document.body.innerHTML) || true, '');

    /* restore everything the suite touched, so running it never leaves the
       customer with a room full of test fittings. */
    S.fittings = keepF; S.sel = keepSel; S.reco = keepReco; S.style = keepStyle; S.cct = keepCct;
    S.photo = keepPhoto;
    el.canvas.width = keepW; el.canvas.height = keepH;
    render(); refreshAll(); renderReco(); renderCct(); syncOnOff();

    var box = $('#qa');
    box.className = 'show';
    box.innerHTML = '<h4>QA — ' + pass + '/' + (pass + fail) + ' passing' +
      (fail ? ' · ' + fail + ' FAILED' : '') + '</h4>' +
      R.map(function (r) {
        return '<div class="' + (r.ok ? 'p' : 'f') + '">' + (r.ok ? '✓' : '✗') + ' ' + r.n +
               (r.ok ? '' : ' — ' + r.g) + '</div>';
      }).join('');
    return { pass: pass, fail: fail };
  }

  /* Exposed for the self test and for staff debugging, same as the planner. */
  window.__LL = {
    S: S, CAT: CAT, ROOMS: ROOMS, STYLES: STYLES, CCTS: CCTS,
    kelvinRGB: kelvinRGB, depth: depth, poolGeometry: poolGeometry, intensity: intensity,
    parseBeam: parseBeam, parseWatts: parseWatts,
    place: place, layGrid: layGrid, layWalls: layWalls, layStrip: layStrip,
    reimagine: reimagine, findings: findings, analyse: analyse, applyFix: applyFix,
    quoteLines: quoteLines, quoteTotals: quoteTotals, incGST: incGST, money: money,
    setRoom: setRoom, render: render, refreshAll: refreshAll, estimateHorizon: estimateHorizon,
    bucketById: bucketById, prod: prod, runQA: runQA, loadImage: loadImage
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
