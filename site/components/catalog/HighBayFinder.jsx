'use client';
/* ============================================================
   HIGH BAY FINDER

   One job: get somebody to the right high bay for their ceiling height.

   That is the question people actually ring up about, and it is the one they
   get wrong on their own. A 120 degree lens at 11 metres throws most of its
   light at the walls and leaves the floor dim, and the usual reaction is to
   buy more fittings rather than a narrower lens. So the first question is the
   height, the answer explains the beam angle in plain words, and everything
   else in the finder exists to turn that into a number of fittings and a
   spacing the customer can hand to their electrician.

   Everything it says is worked from the catalogue's own figures:
     - 160 lumens per watt, which is the number on every high bay product page
     - the real wattages and beam angles we stock
   and from ordinary lighting practice for the rest (maintenance factor,
   utilisation factor, spacing to height ratio). Nothing is invented, and the
   result shows its working so an electrician can check it.
   ============================================================ */
import * as React from 'react';
import * as api from '../../lib/api';

/* ------------------------------------------------------------------
   The range, matched to what is in the feed by SKU. If a SKU is missing
   (renamed, discontinued) the finder still works - it falls back to matching
   on wattage and beam angle in the name, and failing that it still tells the
   customer what to ask for.
   ------------------------------------------------------------------ */
const LM_PER_WATT = 160;           /* stated on every high bay product page */

const RANGE = [
  { sku: 'HB100P-SO-120º',    w: 100, beam: 120, cct: '5000K',        minH: 4,  maxH: 6.5 },
  { sku: 'HB150-SO-120º-CCT', w: 150, beam: 120, cct: '3 colour CCT', minH: 5,  maxH: 8.5 },
  { sku: 'HB200-SO-120º',     w: 200, beam: 120, cct: '5000K',        minH: 6,  maxH: 9.5 },
  { sku: 'HB200-SO-90D',      w: 200, beam: 90,  cct: '5000K',        minH: 8,  maxH: 16 },
];

/* Under about four metres a high bay is the wrong fitting: it is too much
   light from too close and the glare is unpleasant. The canopy light is the
   honest answer, so the finder says so rather than selling a high bay. */
const CANOPY = [
  { sku: 'GH-C100-CCT-PA', w: 100, beam: 120 },
  { sku: 'GH-C150W-40K',   w: 150, beam: 120 },
  { sku: 'GH-C200-CCT',    w: 200, beam: 140 },
];

const HEIGHTS = [
  { v: 3,   label: 'Under 4 m',   sub: 'A normal garage or workshop ceiling' },
  { v: 5,   label: '4 to 6 m',    sub: 'A small warehouse or a big shed' },
  { v: 7,   label: '6 to 8 m',    sub: 'A standard warehouse' },
  { v: 9,   label: '8 to 10 m',   sub: 'A tall warehouse or a factory floor' },
  { v: 12,  label: 'Over 10 m',   sub: 'Racking to the roof, or a sports hall' },
];

/* Target lux by what the space is for. These are the ordinary design figures
   an electrician or a consultant would use, not numbers we made up. */
const USES = [
  { k: 'storage',   label: 'Storage and racking',        lux: 150 },
  { k: 'warehouse', label: 'General warehouse',          lux: 200 },
  { k: 'workshop',  label: 'Workshop or assembly',       lux: 300 },
  { k: 'factory',   label: 'Factory or production line', lux: 500 },
  { k: 'sport',     label: 'Gym or sports hall',         lux: 300 },
  { k: 'retail',    label: 'Retail or showroom',         lux: 400 },
  { k: 'carpark',   label: 'Carpark or covered canopy',  lux: 75  },
];

const money = (n) => '$' + Number(n || 0).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ------------------------------------------------------------------
   The maths, kept in one place so it can be read and argued with.

   lumens        watts x 160, the catalogue's own efficacy
   maintenance   0.8, the standard allowance for dirt and lamp ageing
   utilisation   how much of the light actually lands on the floor. It climbs
                 with mounting height because a taller bay with the right
                 optic wastes less on the walls.
   spacing       spacing to height ratio against the mounting height above the
                 working plane: 1.5 for a 120 degree lens, 1.0 for a 90.
   ------------------------------------------------------------------ */
function design({ height, area, length, width, lux, fitting }) {
  const lm = fitting.w * LM_PER_WATT;
  const MF = 0.8;
  const UF = height <= 6 ? 0.55 : height <= 9 ? 0.6 : 0.65;
  const needed = (area * lux) / (MF * UF);
  const byLight = Math.max(1, Math.ceil(needed / lm));

  const mounting = Math.max(height - 0.85, 1);
  const shr = fitting.beam >= 120 ? 1.5 : 1.0;
  const spacing = Math.round(shr * mounting * 10) / 10;

  const cols = Math.max(1, Math.round(length / spacing));
  const rows = Math.max(1, Math.round(width / spacing));
  const byGrid = cols * rows;

  /* Take whichever is larger. Too few and the floor is patchy even if the
     average lux adds up; too many and they are paying for light they will
     not notice. Then round up to a rectangle, because that is what actually
     gets installed - you do not hang seventeen fittings in a six by three
     grid and leave a hole. The headline count and the grid have to agree or
     the customer is right to distrust both. */
  const wanted = Math.max(byLight, byGrid);
  const grid = gridFor(wanted, length, width);
  const count = grid.total;
  const achieved = Math.round((count * lm * MF * UF) / area);

  return {
    lm, MF, UF, needed: Math.round(needed), byLight, byGrid,
    count, achieved, spacing, grid,
    mounting: Math.round(mounting * 10) / 10,
  };
}

/* Lay the count out as a sensible rectangle for the shape of the room. */
function gridFor(count, length, width) {
  let best = null;
  for (let c = 1; c <= count; c++) {
    const r = Math.ceil(count / c);
    if (c * r < count) continue;
    const ratio = (length / c) / (width / r);
    const score = Math.abs(Math.log(ratio)) + (c * r - count) * 0.35;
    if (!best || score < best.score) best = { c, r, score };
  }
  return best ? { cols: best.c, rows: best.r, total: best.c * best.r } : { cols: count, rows: 1, total: count };
}

function pickFitting(height, narrowAisles) {
  if (height < 4) return null;                     /* not a high bay job */
  /* Narrow racking aisles want a narrow optic whatever the height, because a
     wide beam mostly lights the top of the racking rather than the aisle. */
  if (narrowAisles && height >= 7) return RANGE[3];
  const hit = RANGE.filter((f) => height >= f.minH && height <= f.maxH);
  if (!hit.length) return height < 5 ? RANGE[0] : RANGE[3];
  /* Of the ones that suit the height, take the one whose beam fits best:
     tall spaces want the tighter beam. */
  return height >= 9.5 ? hit[hit.length - 1] : hit[0];
}

function whyBeam(height, fitting) {
  if (!fitting) return '';
  if (fitting.beam === 90) {
    return 'At ' + height + ' m a 120 degree lens throws most of its light onto the walls and the ' +
      'top of the racking, and the floor stays dim. The 90 degree lens concentrates it straight ' +
      'down, so it reaches the floor at full strength. This is the single thing people get wrong ' +
      'when they buy high bays for a tall space.';
  }
  return 'At ' + height + ' m the 120 degree lens is right. It spreads the light wide so the ' +
    'fittings can sit further apart, which means fewer of them and an even floor with no dark ' +
    'patches between. A narrow lens up here would give you bright circles and dark gaps.';
}

export default function HighBayFinder() {
  const [products, setProducts] = React.useState([]);
  const [step, setStep] = React.useState(0);
  const [height, setHeight] = React.useState(null);
  const [use, setUse] = React.useState(null);
  const [len, setLen] = React.useState('');
  const [wid, setWid] = React.useState('');
  const [narrow, setNarrow] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let dead = false;
    Promise.all([
      api.fetchStripLightProducts({ id: api.HIGH_BAY_CATEGORY_ID, categoryLabel: 'High Bay Lights' }).catch(() => []),
      api.fetchStripLightProducts({ id: api.INDUSTRIAL_CATEGORY_ID, categoryLabel: 'Industrial' }).catch(() => []),
    ]).then(([a, b]) => { if (!dead) setProducts([].concat(a || [], b || [])); });
    return () => { dead = true; };
  }, []);

  const find = React.useCallback(
    (spec) => {
      if (!spec) return null;
      const bySku = products.find((p) => (p.sku || '').toLowerCase() === spec.sku.toLowerCase());
      if (bySku) return bySku;
      /* Fall back to the wattage and beam in the name, so a rename in Magento
         does not leave the finder with nothing to show. */
      return products.find((p) => {
        const n = (p.name || '').toLowerCase();
        return n.includes(String(spec.w) + 'w') && n.includes(String(spec.beam));
      }) || null;
    },
    [products],
  );

  const L = parseFloat(len) || 0;
  const W = parseFloat(wid) || 0;
  const area = Math.round(L * W);
  const useRow = USES.find((u) => u.k === use) || null;
  const spec = height != null ? pickFitting(height, narrow) : null;
  const live = find(spec);
  const price = live && typeof live.price === 'number' ? live.price : null;

  const result =
    spec && useRow && area > 0
      ? design({ height, area, length: Math.max(L, W), width: Math.min(L, W), lux: useRow.lux, fitting: spec })
      : null;

  const canopySpec = height != null && height < 4 ? CANOPY[1] : null;
  const canopyLive = find(canopySpec);

  const reset = () => { setStep(0); setHeight(null); setUse(null); setLen(''); setWid(''); setNarrow(false); };

  /* ---------------------------------------------------------------- */
  return (
    <section className="hbf" id="highbay-finder">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="container">
        <div className="hbf-card">
          <div className="hbf-head">
            <span className="hbf-eyebrow">High Bay Finder</span>
            <h2 className="hbf-title">Find the right high bay for your ceiling height</h2>
            <p className="hbf-sub">
              Ceiling height decides the beam angle, and the beam angle is the thing most people get
              wrong. Answer three questions and you will get the fitting, how many you need and how
              far apart they go.
            </p>
          </div>

          {!open && (
            <button type="button" className="hbf-start" onClick={() => setOpen(true)}>
              Start the finder
              <span aria-hidden="true">→</span>
            </button>
          )}

          {open && (
            <div className="hbf-body">
              {/* -------- 1. the question that matters -------- */}
              <div className="hbf-q">
                <div className="hbf-qn">Question 1 of 3</div>
                <h3>How high is the ceiling?</h3>
                <p className="hbf-hint">
                  Measure from the floor to where the fitting will hang, not to the peak of the roof.
                </p>
                <div className="hbf-opts">
                  {HEIGHTS.map((h) => (
                    <button
                      type="button"
                      key={h.v}
                      className={'hbf-opt' + (height === h.v ? ' on' : '')}
                      onClick={() => { setHeight(h.v); setStep(Math.max(step, 1)); }}
                    >
                      <b>{h.label}</b>
                      <small>{h.sub}</small>
                    </button>
                  ))}
                </div>
              </div>

              {/* not a high bay job */}
              {height != null && height < 4 && (
                <div className="hbf-note hbf-note--warn">
                  <h4>A high bay is the wrong fitting for that ceiling</h4>
                  <p>
                    Under about 4 m a high bay is too much light from too close, and the glare is
                    unpleasant to work under. A canopy light or a run of battens does the job
                    properly and costs less.
                    {canopyLive ? ' We would look at the ' + canopyLive.name + ' for a space like that.' : ''}
                  </p>
                  <div className="hbf-note-acts">
                    <a className="hbf-btn ghost" href="/led-batten-lights-perth/">See battens</a>
                    <a className="hbf-btn ghost" href="/industrial-lighting-perth/">See canopy lights</a>
                    <a className="hbf-btn" href="tel:+61892972969">Call (08) 9297 2969</a>
                  </div>
                </div>
              )}

              {/* -------- 2. what the space is for -------- */}
              {height != null && height >= 4 && (
                <div className="hbf-q">
                  <div className="hbf-qn">Question 2 of 3</div>
                  <h3>What happens in the space?</h3>
                  <p className="hbf-hint">
                    This sets how much light the floor needs. A racking aisle and an assembly bench
                    are not the same job.
                  </p>
                  <div className="hbf-opts hbf-opts--tight">
                    {USES.map((u) => (
                      <button
                        type="button"
                        key={u.k}
                        className={'hbf-opt' + (use === u.k ? ' on' : '')}
                        onClick={() => { setUse(u.k); setStep(Math.max(step, 2)); }}
                      >
                        <b>{u.label}</b>
                        <small>{u.lux} lux on the floor</small>
                      </button>
                    ))}
                  </div>
                  <label className="hbf-check">
                    <input type="checkbox" checked={narrow} onChange={(e) => setNarrow(e.target.checked)} />
                    <span>The space has tall racking with narrow aisles</span>
                  </label>
                </div>
              )}

              {/* -------- 3. how big -------- */}
              {height != null && height >= 4 && use && (
                <div className="hbf-q">
                  <div className="hbf-qn">Question 3 of 3</div>
                  <h3>How big is the floor?</h3>
                  <p className="hbf-hint">Roughly is fine. Metres, inside the walls.</p>
                  <div className="hbf-dims">
                    <label>
                      <span>Length</span>
                      <input type="number" min="1" step="0.5" inputMode="decimal" placeholder="e.g. 30"
                             value={len} onChange={(e) => setLen(e.target.value)} />
                      <em>m</em>
                    </label>
                    <span className="hbf-x" aria-hidden="true">×</span>
                    <label>
                      <span>Width</span>
                      <input type="number" min="1" step="0.5" inputMode="decimal" placeholder="e.g. 15"
                             value={wid} onChange={(e) => setWid(e.target.value)} />
                      <em>m</em>
                    </label>
                    {area > 0 && <span className="hbf-area">{area.toLocaleString('en-AU')} m²</span>}
                  </div>
                </div>
              )}

              {/* -------- the answer -------- */}
              {result && spec && (
                <div className="hbf-result">
                  <div className="hbf-rhead">
                    <span className="hbf-tick" aria-hidden="true">✓</span>
                    <div>
                      <div className="hbf-qn">Your answer</div>
                      <h3>
                        {result.count} × {spec.w}W high bay, {spec.beam}° beam
                      </h3>
                    </div>
                  </div>

                  <div className="hbf-figures">
                    <div><b>{result.count}</b><span>fittings</span></div>
                    <div><b>{result.grid.cols} × {result.grid.rows}</b><span>grid</span></div>
                    <div><b>{result.spacing} m</b><span>apart</span></div>
                    <div><b>{result.achieved}</b><span>lux on the floor</span></div>
                  </div>

                  {live && (
                    <a className="hbf-prod" href={live.url || '/high-bay-lights/'}>
                      {live.image && <img src={live.image} alt="" loading="lazy" />}
                      <span>
                        <b>{live.name}</b>
                        {price != null && (
                          <em>
                            {money(price)} ex GST each · {result.count} of them is{' '}
                            {money(api.incGst ? api.incGst(price * result.count) : price * result.count * 1.1)} inc GST
                          </em>
                        )}
                      </span>
                      <span className="hbf-go" aria-hidden="true">→</span>
                    </a>
                  )}

                  <div className="hbf-why">
                    <h4>Why this beam angle</h4>
                    <p>{whyBeam(height, spec)}</p>
                  </div>

                  <details className="hbf-work">
                    <summary>Show the working</summary>
                    <ul>
                      <li><span>Floor area</span><span>{area} m²</span></li>
                      <li><span>Target on the floor</span><span>{useRow.lux} lux</span></li>
                      <li><span>Each fitting</span><span>{spec.w}W × {LM_PER_WATT} lm/W = {result.lm.toLocaleString('en-AU')} lumens</span></li>
                      <li><span>Maintenance factor</span><span>{result.MF} (dirt and ageing)</span></li>
                      <li><span>Utilisation factor</span><span>{result.UF} at {height} m</span></li>
                      <li><span>Lumens needed</span><span>{result.needed.toLocaleString('en-AU')}</span></li>
                      <li><span>By light output</span><span>{result.byLight} fittings</span></li>
                      <li><span>By spacing</span><span>{result.byGrid} fittings at {result.spacing} m</span></li>
                      <li><span>Mounting height above the bench</span><span>{result.mounting} m</span></li>
                    </ul>
                    <p className="hbf-small">
                      Spacing uses a spacing to height ratio of {spec.beam >= 120 ? '1.5' : '1.0'} for a{' '}
                      {spec.beam}° lens. We take whichever of the two counts is larger, so the floor is
                      even as well as bright enough. Every figure above is checked on site by your
                      electrician before anything is ordered.
                    </p>
                  </details>

                  <div className="hbf-acts">
                    <a className="hbf-btn" href={'/contact/?job=' + encodeURIComponent(
                      result.count + ' x ' + spec.w + 'W ' + spec.beam + ' degree high bay, ' +
                      area + ' sqm at ' + height + ' m')}>
                      Send this to Greenhse
                    </a>
                    <a className="hbf-btn ghost" href="tel:+61892972969">Call (08) 9297 2969</a>
                    <button type="button" className="hbf-btn ghost" onClick={reset}>Start again</button>
                  </div>
                </div>
              )}

              {height != null && height >= 4 && use && area <= 0 && (
                <p className="hbf-waiting">Put the floor size in and the answer appears here.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const CSS = `
.hbf{padding:26px 0 10px}
.hbf-card{border:1px solid var(--line,#e4e1d8);border-radius:16px;background:var(--surface,#f4f2ec);padding:28px}
.hbf-head{max-width:68ch}
.hbf-eyebrow{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#00a800;font-weight:600}
.hbf-title{letter-spacing:-.03em;margin:8px 0 10px;font-size:max(24px,min(3vw,34px));font-weight:600;line-height:1.14}
.hbf-sub{margin:0;color:var(--ink-soft,#5d6157);font-size:15px;line-height:1.62}
.hbf-start{margin-top:20px;display:inline-flex;align-items:center;gap:10px;background:#00c400;color:#07240a;border:0;border-radius:6px;padding:14px 22px;font:inherit;font-size:15px;font-weight:700;cursor:pointer}
.hbf-start:hover{background:#00d400}
.hbf-body{margin-top:24px;display:flex;flex-direction:column;gap:28px}
.hbf-q h3{margin:6px 0 6px;font-size:20px;letter-spacing:-.02em;font-weight:600}
.hbf-qn{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#8b8f84;font-weight:600}
.hbf-hint{margin:0 0 14px;font-size:13.5px;color:var(--ink-soft,#5d6157);line-height:1.55;max-width:62ch}
.hbf-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.hbf-opts--tight{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.hbf-opt{text-align:left;border:1.5px solid var(--line,#e4e1d8);background:#fff;border-radius:10px;padding:14px 16px;cursor:pointer;font:inherit;transition:border-color .14s,box-shadow .14s}
.hbf-opt:hover{border-color:#9a9e93}
.hbf-opt.on{border-color:#00c400;box-shadow:0 0 0 3px rgba(0,196,0,.16)}
.hbf-opt b{display:block;font-size:15px;font-weight:600;letter-spacing:-.01em}
.hbf-opt small{display:block;margin-top:4px;font-size:12.5px;color:#797d72}
.hbf-check{display:flex;align-items:center;gap:10px;margin-top:14px;font-size:14px;cursor:pointer}
.hbf-check input{width:20px;height:20px;accent-color:#00c400}
.hbf-dims{display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap}
.hbf-dims label{display:flex;flex-direction:column;gap:6px;position:relative}
.hbf-dims label span{font-size:12px;font-weight:600}
.hbf-dims input{width:150px;padding:12px 34px 12px 14px;border:1px solid var(--line,#e4e1d8);border-radius:6px;font:inherit;font-size:16px;background:#fff}
.hbf-dims input:focus{outline:2px solid #00c400;outline-offset:-1px}
.hbf-dims em{position:absolute;right:12px;bottom:13px;font-style:normal;color:#9a9e93;font-size:13px}
.hbf-x{padding-bottom:13px;color:#9a9e93}
.hbf-area{padding-bottom:13px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:14px;font-weight:700}
.hbf-note{border-radius:12px;padding:18px 20px;background:#fff;border:1px solid var(--line,#e4e1d8);border-left:4px solid #C08A3E}
.hbf-note h4{margin:0 0 8px;font-size:16px;font-weight:600}
.hbf-note p{margin:0;font-size:14px;line-height:1.6;color:var(--ink-soft,#5d6157)}
.hbf-note-acts{display:flex;gap:9px;flex-wrap:wrap;margin-top:14px}
.hbf-result{border-radius:14px;background:#14150f;color:#e7e9e2;padding:24px}
.hbf-rhead{display:flex;gap:14px;align-items:flex-start}
.hbf-tick{width:30px;height:30px;flex:0 0 auto;border-radius:50%;background:#00c400;color:#07240a;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px}
.hbf-result h3{margin:4px 0 0;font-size:23px;letter-spacing:-.02em;font-weight:600}
.hbf-result .hbf-qn{color:#00c400}
.hbf-figures{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:12px;margin:22px 0 20px}
.hbf-figures div{background:#1f2119;border-radius:10px;padding:14px}
.hbf-figures b{display:block;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:22px;font-weight:700;letter-spacing:-.02em}
.hbf-figures span{display:block;margin-top:3px;font-size:12px;color:#9a9e93}
.hbf-prod{display:grid;grid-template-columns:68px 1fr auto;gap:14px;align-items:center;background:#1f2119;border-radius:10px;padding:13px 16px;text-decoration:none;color:inherit;margin-bottom:20px}
.hbf-prod:hover{background:#282b21}
.hbf-prod img{width:68px;height:68px;object-fit:contain;background:#fff;border-radius:6px}
.hbf-prod b{display:block;font-size:15px;font-weight:600;line-height:1.3}
.hbf-prod em{display:block;font-style:normal;margin-top:5px;font-size:12.5px;color:#9a9e93;font-family:'JetBrains Mono',ui-monospace,monospace}
.hbf-go{font-size:20px;color:#00c400}
.hbf-why{border-top:1px solid #ffffff1a;padding-top:18px}
.hbf-why h4{margin:0 0 7px;font-size:11px;font-family:'JetBrains Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#00c400;font-weight:600}
.hbf-why p{margin:0;font-size:14.5px;line-height:1.62;color:#c9cdc2}
.hbf-work{margin-top:18px;border-top:1px solid #ffffff1a;padding-top:14px}
.hbf-work summary{cursor:pointer;font-size:13px;color:#9a9e93;font-family:'JetBrains Mono',ui-monospace,monospace;letter-spacing:.05em}
.hbf-work ul{list-style:none;margin:14px 0 0;padding:0}
.hbf-work li{display:flex;justify-content:space-between;gap:16px;font-size:13px;padding:7px 0;border-bottom:1px solid #ffffff12}
.hbf-work li span:last-child{font-family:'JetBrains Mono',ui-monospace,monospace;color:#c9cdc2;text-align:right;flex:0 0 auto}
.hbf-small{margin:14px 0 0;font-size:12.5px;line-height:1.6;color:#8d9186}
.hbf-acts{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.hbf-btn{display:inline-flex;align-items:center;justify-content:center;background:#00c400;color:#07240a;border:1px solid #00c400;border-radius:6px;padding:12px 18px;font:inherit;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer}
.hbf-btn:hover{background:#00d400}
.hbf-btn.ghost{background:transparent;color:inherit;border-color:currentColor;opacity:.88}
.hbf-btn.ghost:hover{background:#ffffff14}
.hbf-note .hbf-btn.ghost{color:#14150f;border-color:#c9c6bb}
.hbf-note .hbf-btn.ghost:hover{background:#0000000a}
.hbf-waiting{margin:0;font-size:14px;color:#797d72}
@media (max-width:700px){
  .hbf-card{padding:20px 16px;border-radius:12px}
  .hbf-result{padding:18px 16px}
  .hbf-dims input{width:130px}
  .hbf-figures{grid-template-columns:repeat(2,1fr)}
  .hbf-prod{grid-template-columns:54px 1fr;gap:11px}
  .hbf-prod img{width:54px;height:54px}
  .hbf-go{display:none}
}
`;
