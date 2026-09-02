/* ============================================================
   home/08-downlight-finder.js
   the DOWNLIGHT FINDER: cut-out / glare / colour / room-size questions, DL_Q definitions, beam + cut-out diagrams, match + quantity + price, filter chips, downlight guide
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ============================================================
   DOWNLIGHT FINDER
   Same shape as the strip finder: a few plain questions, then one
   matched fitting with a real photo, its real specs and a real price.

   Two rules carried over and enforced by tests:
     1. Never invent product data. A missing lumen or beam figure prints
        in red as "not published" rather than being filled in.
     2. Downlight counts come from the table Lazar supplied (the same one
        the layout planner uses), NOT from a lumen calculation.
   ============================================================ */

/* ---------- spec readers (all values come from specTable, never guessed) ---------- */
function dlSpec(p,label){
  const r=(p.specTable||[]).find(x=>String(x[0]).toLowerCase()===String(label).toLowerCase());
  return r?String(r[1]):null;
}
function dlCut(p){
  const d=dlSpec(p,"Dimensions")||"";
  const m=d.match(/cut\s*-?\s*out\s*(\d+)(?:\s*[-\u2013]\s*(\d+))?\s*mm/i);
  if(!m) return null;
  const lo=parseInt(m[1],10), hi=m[2]?parseInt(m[2],10):lo;
  return {min:lo, max:hi, txt: lo===hi ? lo+"mm" : lo+"\u2013"+hi+"mm"};
}
function dlBeam(p){
  const b=dlSpec(p,"Beam angle"); if(!b) return null;
  const m=b.match(/(\d+)\s*(?:\u00ba|\u00b0|deg)?/); if(!m) return null;
  const n=parseInt(m[1],10);
  return (n>0&&n<=180)?n:null;
}
function dlLum(p){ return dlSpec(p,"Brightness"); }
function dlWatt(p){ return dlSpec(p,"Power consumption"); }
function dlDim(p){ return dlSpec(p,"Dimmable"); }
function dlIP(p){
  const s=(dlSpec(p,"Weather Rating")||"")+" "+p.name;
  const all=s.match(/IP\s?(\d{2})/gi); if(!all) return null;
  return Math.max.apply(null,all.map(x=>parseInt(x.replace(/\D/g,""),10)));
}
/* Low glare is defined by beam angle, exactly as the layout planner does it:
   under 90 degrees is low glare, 90 and over is standard. */
function dlIsLowGlare(p){ const b=dlBeam(p); return b!==null && b<90; }

/* Only real downlights. Wall lights, ceiling oysters, star lights, the display
   light and the two mis-filed plug bases are excluded — they are in this
   category on greenhse.com but they are not downlights. */
function dlPool(){
  return PRODUCTS.filter(function(p){
    /* Star lights are 30 mm recessed fittings, so they belong in the finder at
       that size — but the drivers, kits and accessories around them don't. */
    var isStar = /star\s?light/i.test(p.name) && !/driver|kit/i.test(p.name);
    var isDownlight = /downlight/i.test(p.name);
    return (p.cat==="downlights" || p.cat==="star")
      && (isDownlight || isStar)
      && !/display light|plug base|socket|driver|gimbal/i.test(p.name)
      && !!dlCut(p);
  });
}

/* ---------- cut-out size bands ---------- */
const DL_SIZES=[
  {key:"30",  mm:30,  label:"30 mm",  lo:25,  hi:45,  lm:280,  blurb:"Star lights &amp; accents"},
  {key:"70",  mm:70,  label:"70 mm",  lo:46,  hi:80,  lm:650,  blurb:"Small &amp; subtle"},
  {key:"90",  mm:90,  label:"90 mm",  lo:81,  hi:104, lm:1000, blurb:"Australia's standard"},
  {key:"110", mm:110, label:"110 mm", lo:105, hi:135, lm:1200, blurb:"Brighter, fewer fittings"}
];
function dlBand(key){ return DL_SIZES.find(b=>b.key===(key==="unsure"?"90":key))||DL_SIZES[1]; }
function dlBandIndex(key){ return DL_SIZES.indexOf(dlBand(key)); }

/* ---------- how many downlights: Lazar's table, not a lumen calculation ----------
   Short side first, then long side. The first band both sides fit inside wins. */
const DL_BANDS=[
  {w:2, l:2,  std:1, low:1},
  {w:3, l:4,  std:4, low:4},
  {w:4, l:5,  std:4, low:6},
  {w:5, l:8,  std:6, low:8},
  {w:6, l:10, std:8, low:10}
];
function dlCount(a,b,lowGlare){
  const s=Math.min(a,b), L=Math.max(a,b);
  for(let i=0;i<DL_BANDS.length;i++){
    const B=DL_BANDS[i];
    if(s<=B.w && L<=B.l) return lowGlare?B.low:B.std;
  }
  return null; /* bigger than the table covers — send them to us */
}

/* ---------- diagrams ---------- */
const DL_INK="#15170F", DL_GLOW="#F2C230", DL_DIM="var(--muted)", DL_BAD="#C4453B", DL_LINE="#c9c6b8";

/* Every cut-out we stock, drawn to one scale so the jump from 70 to 200 is obvious. */
function dlCutSVG(active){
  const S=0.72, GAP=22, PADX=14, H=140;
  let x=PADX, out="", maxR=0;
  DL_SIZES.forEach(function(b){
    const r=(b.mm*S)/2; if(r>maxR) maxR=r;
  });
  const baseY=30+maxR*2;
  DL_SIZES.forEach(function(b){
    const r=(b.mm*S)/2, cx=x+r, cy=baseY-r;
    const on=(active&&active!=="unsure")?(active===b.key):false;
    out+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+(on?DL_GLOW:"#ffffff")+'" fill-opacity="'+(on?".55":"1")+'" stroke="'+(on?DL_INK:DL_DIM)+'" stroke-width="'+(on?2.4:1.3)+'"/>';
    /* Brightness sits above the circle, in bold — it's the number people
       actually choose on. The cut-out size is the constraint underneath. */
    out+='<text x="'+cx.toFixed(1)+'" y="'+(cy-r-9).toFixed(1)+'" font-size="11.5" text-anchor="middle" fill="'+(on?DL_INK:"#5d6151")+'" font-weight="700">'+b.lm+' lm</text>';
    out+='<text x="'+cx.toFixed(1)+'" y="'+(baseY+15)+'" font-size="10" text-anchor="middle" fill="'+(on?DL_INK:"#6b6e5f")+'" font-weight="'+(on?"700":"400")+'">'+b.mm+' mm</text>';
    x+=r*2+GAP;
  });
  const W=x-GAP+PADX;
  return '<figure class="dl-cutfig"><svg viewBox="0 0 '+W.toFixed(0)+' '+H+'" role="img" aria-label="Downlight cut-out sizes drawn to scale">'
    + out
    + '<text x="'+PADX+'" y="'+(baseY+32)+'" font-size="9.5" fill="'+DL_DIM+'">CUT-OUT DIAMETER IN MILLIMETRES \u2014 DRAWN TO SCALE</text>'
    + '</svg>'
    + '<figcaption><b>Measure the hole, not the fitting.</b> The cut-out is the opening in the plasterboard. '
    + 'Hold a tape across the middle of an existing hole \u2014 edge to edge. Most Perth homes are 90&#8201;mm.</figcaption></figure>';
}

/* Cross-section pair. The whole point of the picture is where the LED sits:
   flush at the face (you see it) versus set back behind a baffle (you don't). */
const DL_BEAM_SVG={std:"<svg viewBox=\"0 0 380 282\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Standard, 110 degree beam, source in view\"><rect x=\"65.0\" y=\"12\" width=\"250\" height=\"40\" rx=\"20\" fill=\"#C0563E\"/><path d=\"M84.0 25.0 l14 14 M98.0 25.0 l-14 14\" stroke=\"#fff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><text x=\"110.0\" y=\"38.0\" font-size=\"16\" font-weight=\"700\" fill=\"#fff\" font-family=\"system-ui,-apple-system,sans-serif\">Glare</text><text x=\"190.0\" y=\"70\" font-size=\"12\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">110\u00b0 standard \u2014 lamp on show</text><defs><radialGradient id=\"beamst\" cx=\"50%\" cy=\"0%\" r=\"118%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"45%\" stop-color=\"#E8A33D\" stop-opacity=\"0.20\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0.03\"/></radialGradient><radialGradient id=\"poolst\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.50\"/><stop offset=\"60%\" stop-color=\"#E8A33D\" stop-opacity=\"0.22\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"20\" y1=\"92\" x2=\"360\" y2=\"92\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"24\" y1=\"92\" x2=\"18\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"35\" y1=\"92\" x2=\"29\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"46\" y1=\"92\" x2=\"40\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"57\" y1=\"92\" x2=\"51\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"68\" y1=\"92\" x2=\"62\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"79\" y1=\"92\" x2=\"73\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"90\" y1=\"92\" x2=\"84\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"101\" y1=\"92\" x2=\"95\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"112\" y1=\"92\" x2=\"106\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"123\" y1=\"92\" x2=\"117\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"134\" y1=\"92\" x2=\"128\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"145\" y1=\"92\" x2=\"139\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"156\" y1=\"92\" x2=\"150\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"167\" y1=\"92\" x2=\"161\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"178\" y1=\"92\" x2=\"172\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"189\" y1=\"92\" x2=\"183\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"200\" y1=\"92\" x2=\"194\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"211\" y1=\"92\" x2=\"205\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"222\" y1=\"92\" x2=\"216\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"233\" y1=\"92\" x2=\"227\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"244\" y1=\"92\" x2=\"238\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"255\" y1=\"92\" x2=\"249\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"266\" y1=\"92\" x2=\"260\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"277\" y1=\"92\" x2=\"271\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"288\" y1=\"92\" x2=\"282\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"299\" y1=\"92\" x2=\"293\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"310\" y1=\"92\" x2=\"304\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"321\" y1=\"92\" x2=\"315\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"332\" y1=\"92\" x2=\"326\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"343\" y1=\"92\" x2=\"337\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"354\" y1=\"92\" x2=\"348\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M190 92 L40.0 197 L340.0 197 Z\" fill=\"url(#beamst)\"/><line x1=\"190\" y1=\"92\" x2=\"40.0\" y2=\"197\" stroke=\"#E8A33D\" stroke-width=\"1\" stroke-opacity=\"0.55\"/><line x1=\"190\" y1=\"92\" x2=\"340.0\" y2=\"197\" stroke=\"#E8A33D\" stroke-width=\"1\" stroke-opacity=\"0.55\"/><line x1=\"190\" y1=\"92\" x2=\"190\" y2=\"197\" stroke=\"#8A8D7F\" stroke-width=\"0.8\" stroke-dasharray=\"2 5\"/><path d=\"M152.3 118.4 A 46 46 0 0 0 227.7 118.4\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1\"/><line x1=\"155.6\" y1=\"116.1\" x2=\"149.0\" y2=\"120.7\" stroke=\"#15170F\" stroke-width=\"1\"/><line x1=\"224.4\" y1=\"116.1\" x2=\"231.0\" y2=\"120.7\" stroke=\"#15170F\" stroke-width=\"1\"/><text x=\"190\" y=\"157\" font-size=\"15\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">110\u00b0</text><rect x=\"164\" y=\"89\" width=\"52\" height=\"3\" fill=\"#E8A33D\"/><ellipse cx=\"190\" cy=\"197\" rx=\"150.0\" ry=\"15\" fill=\"url(#poolst)\"/><line x1=\"20\" y1=\"197\" x2=\"360\" y2=\"197\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M56 164 v18\" stroke=\"#2F6B47\" stroke-width=\"3.6\" stroke-linecap=\"round\"/><path d=\"M48 197 L56 181 L64 197\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"56\" cy=\"143\" r=\"20\" fill=\"#2F6B47\"/><path d=\"M43.5 140 q5 4.5 10 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M43.0 130.5 l11 -3.4\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M58.5 140 q5 4.5 10 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M58.0 130.5 l11 3.4\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M50 154 q6 -4.5 12 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"36\" y1=\"128\" x2=\"28\" y2=\"121\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"45\" y1=\"120\" x2=\"41\" y2=\"111\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"56\" y1=\"118\" x2=\"56\" y2=\"108\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"67\" y1=\"120\" x2=\"71\" y2=\"111\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"76\" y1=\"128\" x2=\"84\" y2=\"121\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"68.5\" y1=\"140\" x2=\"166\" y2=\"91\" stroke=\"#E8A33D\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><circle cx=\"63.5\" cy=\"140\" r=\"8\" fill=\"#E8A33D\" fill-opacity=\"0.55\"/><line x1=\"40.0\" y1=\"231\" x2=\"340.0\" y2=\"231\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><line x1=\"40.0\" y1=\"227\" x2=\"40.0\" y2=\"235\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><path d=\"M47.0 228.4 L40.0 231 L47.0 233.6\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"0.9\" stroke-linejoin=\"round\"/><line x1=\"340.0\" y1=\"227\" x2=\"340.0\" y2=\"235\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><path d=\"M333.0 228.4 L340.0 231 L333.0 233.6\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"0.9\" stroke-linejoin=\"round\"/><text x=\"20\" y=\"215\" font-size=\"11\" font-weight=\"600\" text-anchor=\"start\" fill=\"#C0563E\" font-family=\"system-ui,-apple-system,sans-serif\">Straight in your eyes</text><text x=\"190\" y=\"247\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.8\">POOL 2.86\u00d7 THE DROP</text></svg>",low:"<svg viewBox=\"0 0 380 282\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Low glare, 60 degree beam, source hidden\"><rect x=\"65.0\" y=\"12\" width=\"250\" height=\"40\" rx=\"20\" fill=\"#2F6B47\"/><path d=\"M83.0 32.0 l6 6.5 l12 -13\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"110.0\" y=\"38.0\" font-size=\"16\" font-weight=\"700\" fill=\"#fff\" font-family=\"system-ui,-apple-system,sans-serif\">No glare</text><text x=\"190.0\" y=\"70\" font-size=\"12\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">60\u00b0 low glare \u2014 lamp set back</text><defs><radialGradient id=\"beamlg\" cx=\"50%\" cy=\"0%\" r=\"118%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"45%\" stop-color=\"#E8A33D\" stop-opacity=\"0.20\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0.03\"/></radialGradient><radialGradient id=\"poollg\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.50\"/><stop offset=\"60%\" stop-color=\"#E8A33D\" stop-opacity=\"0.22\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"20\" y1=\"92\" x2=\"360\" y2=\"92\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"24\" y1=\"92\" x2=\"18\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"35\" y1=\"92\" x2=\"29\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"46\" y1=\"92\" x2=\"40\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"57\" y1=\"92\" x2=\"51\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"68\" y1=\"92\" x2=\"62\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"79\" y1=\"92\" x2=\"73\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"90\" y1=\"92\" x2=\"84\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"101\" y1=\"92\" x2=\"95\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"112\" y1=\"92\" x2=\"106\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"123\" y1=\"92\" x2=\"117\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"134\" y1=\"92\" x2=\"128\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"145\" y1=\"92\" x2=\"139\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"156\" y1=\"92\" x2=\"150\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"167\" y1=\"92\" x2=\"161\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"178\" y1=\"92\" x2=\"172\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"189\" y1=\"92\" x2=\"183\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"200\" y1=\"92\" x2=\"194\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"211\" y1=\"92\" x2=\"205\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"222\" y1=\"92\" x2=\"216\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"233\" y1=\"92\" x2=\"227\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"244\" y1=\"92\" x2=\"238\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"255\" y1=\"92\" x2=\"249\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"266\" y1=\"92\" x2=\"260\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"277\" y1=\"92\" x2=\"271\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"288\" y1=\"92\" x2=\"282\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"299\" y1=\"92\" x2=\"293\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"310\" y1=\"92\" x2=\"304\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"321\" y1=\"92\" x2=\"315\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"332\" y1=\"92\" x2=\"326\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"343\" y1=\"92\" x2=\"337\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"354\" y1=\"92\" x2=\"348\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M190 92 L129.4 197 L250.6 197 Z\" fill=\"url(#beamlg)\"/><line x1=\"190\" y1=\"92\" x2=\"129.4\" y2=\"197\" stroke=\"#E8A33D\" stroke-width=\"1\" stroke-opacity=\"0.55\"/><line x1=\"190\" y1=\"92\" x2=\"250.6\" y2=\"197\" stroke=\"#E8A33D\" stroke-width=\"1\" stroke-opacity=\"0.55\"/><line x1=\"190\" y1=\"92\" x2=\"190\" y2=\"197\" stroke=\"#8A8D7F\" stroke-width=\"0.8\" stroke-dasharray=\"2 5\"/><path d=\"M167.0 131.8 A 46 46 0 0 0 213.0 131.8\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1\"/><line x1=\"169.0\" y1=\"128.4\" x2=\"165.0\" y2=\"135.3\" stroke=\"#15170F\" stroke-width=\"1\"/><line x1=\"211.0\" y1=\"128.4\" x2=\"215.0\" y2=\"135.3\" stroke=\"#15170F\" stroke-width=\"1\"/><text x=\"190\" y=\"157\" font-size=\"15\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">60\u00b0</text><rect x=\"175\" y=\"89\" width=\"30\" height=\"3\" fill=\"#15170F\"/><rect x=\"181\" y=\"90.5\" width=\"18\" height=\"1.5\" fill=\"#E8A33D\"/><ellipse cx=\"190\" cy=\"197\" rx=\"60.6\" ry=\"10.3\" fill=\"url(#poollg)\"/><line x1=\"20\" y1=\"197\" x2=\"360\" y2=\"197\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M56 164 v18\" stroke=\"#2F6B47\" stroke-width=\"3.6\" stroke-linecap=\"round\"/><path d=\"M48 197 L56 181 L64 197\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"56\" cy=\"143\" r=\"20\" fill=\"#2F6B47\"/><circle cx=\"48.5\" cy=\"140\" r=\"4.6\" fill=\"#fff\"/><circle cx=\"48.5\" cy=\"140\" r=\"2.2\" fill=\"#15170F\"/><circle cx=\"63.5\" cy=\"140\" r=\"4.6\" fill=\"#fff\"/><circle cx=\"63.5\" cy=\"140\" r=\"2.2\" fill=\"#15170F\"/><path d=\"M49 152 q7 5.5 14 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"69.5\" y1=\"140\" x2=\"174\" y2=\"90\" stroke=\"#8A8D7F\" stroke-width=\"1.2\" stroke-dasharray=\"4 4\"/><circle cx=\"122\" cy=\"115\" r=\"11\" fill=\"#fff\" stroke=\"#2F6B47\" stroke-width=\"1.8\"/><path d=\"M118 111 l8.4 8.4 M126 111 l-8.4 8.4\" stroke=\"#2F6B47\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"129.4\" y1=\"231\" x2=\"250.6\" y2=\"231\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><line x1=\"129.4\" y1=\"227\" x2=\"129.4\" y2=\"235\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><path d=\"M136.4 228.4 L129.4 231 L136.4 233.6\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"0.9\" stroke-linejoin=\"round\"/><line x1=\"250.6\" y1=\"227\" x2=\"250.6\" y2=\"235\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><path d=\"M243.6 228.4 L250.6 231 L243.6 233.6\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"0.9\" stroke-linejoin=\"round\"/><text x=\"20\" y=\"215\" font-size=\"11\" font-weight=\"600\" text-anchor=\"start\" fill=\"#2F6B47\" font-family=\"system-ui,-apple-system,sans-serif\">Nothing in your eyes</text><text x=\"190\" y=\"247\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.8\">POOL 1.15\u00d7 THE DROP</text></svg>"};
function dlGlareSVG(kind){ return DL_BEAM_SVG[kind==="low"?"low":"std"]; }

/* Fan panels are pre-measured SVG - see mkfan.py for the geometry. */
const DL_FAN_SVG={std:"<svg viewBox=\"0 0 400 430\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"The fan blades chop the light into moving shadows\"><defs><radialGradient id=\"pst\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.52\"/><stop offset=\"45%\" stop-color=\"#E8A33D\" stop-opacity=\"0.26\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient><clipPath id=\"rmst\"><rect x=\"50.4\" y=\"46.4\" width=\"299.2\" height=\"299.2\" rx=\"3\"/></clipPath></defs><rect x=\"50.4\" y=\"46.4\" width=\"299.2\" height=\"299.2\" rx=\"3\" fill=\"#F6F4EC\" stroke=\"#15170F\" stroke-width=\"2.5\"/><g clip-path=\"url(#rmst)\"><circle cx=\"262.2\" cy=\"258.2\" r=\"138.7\" fill=\"url(#pst)\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"138.7\" fill=\"url(#pst)\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"138.7\" fill=\"url(#pst)\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"138.7\" fill=\"url(#pst)\"/><path d=\"M200.0 196 L422.2 227.2 A 224.4 224.4 0 0 1 386.0 321.5 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L284.1 404.1 A 224.4 224.4 0 0 1 184.3 419.9 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L61.8 372.8 A 224.4 224.4 0 0 1 -1.7 294.4 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L-22.2 164.8 A 224.4 224.4 0 0 1 14.0 70.5 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L115.9 -12.1 A 224.4 224.4 0 0 1 215.7 -27.9 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L338.2 19.2 A 224.4 224.4 0 0 1 401.7 97.6 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/></g><path d=\"M200.0 196 L247.0 230.1\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.18\"/><path d=\"M200.0 196 L165.9 243.0\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.18\"/><path d=\"M200.0 196 L153.0 161.9\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.18\"/><path d=\"M200.0 196 L234.1 149.0\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.18\"/><path d=\"M200.0 196 L237.3 240.5\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.1\"/><path d=\"M200.0 196 L155.5 233.3\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.1\"/><path d=\"M200.0 196 L162.7 151.5\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.1\"/><path d=\"M200.0 196 L244.5 158.7\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.1\"/><path d=\"M200.0 196 L253.9 217.8\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L178.2 249.9\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L146.1 174.2\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L221.8 142.1\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><circle cx=\"200.0\" cy=\"196\" r=\"58.1\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"1.2\" stroke-dasharray=\"5 5\"/><circle cx=\"200.0\" cy=\"196\" r=\"11\" fill=\"#15170F\"/><circle cx=\"262.2\" cy=\"258.2\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"262.2\" cy=\"258.2\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"3.4\" fill=\"#15170F\"/><rect x=\"84.0\" y=\"16\" width=\"232\" height=\"42\" rx=\"21\" fill=\"#C0563E\"/><path d=\"M104.0 30.0 l14 14 M118.0 30.0 l-14 14\" stroke=\"#fff\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><text x=\"131.0\" y=\"43.0\" font-size=\"17\" font-weight=\"700\" fill=\"#fff\" font-family=\"system-ui,-apple-system,sans-serif\">Flicker</text><text x=\"200.0\" y=\"80\" font-size=\"12.5\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">110\u00b0 standard downlights + ceiling fan</text><text x=\"200.0\" y=\"375.6\" font-size=\"13\" text-anchor=\"middle\" fill=\"#C0563E\" font-weight=\"600\" font-family=\"system-ui,-apple-system,sans-serif\">Blades cut the light</text><text x=\"200.0\" y=\"395.6\" font-size=\"11.5\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"system-ui,-apple-system,sans-serif\">Wide beam spreads under the blades</text></svg>",low:"<svg viewBox=\"0 0 400 430\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Four clean pools of light, the fan does not cut them\"><defs><radialGradient id=\"plg\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.52\"/><stop offset=\"45%\" stop-color=\"#E8A33D\" stop-opacity=\"0.26\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient><clipPath id=\"rmlg\"><rect x=\"50.4\" y=\"46.4\" width=\"299.2\" height=\"299.2\" rx=\"3\"/></clipPath></defs><rect x=\"50.4\" y=\"46.4\" width=\"299.2\" height=\"299.2\" rx=\"3\" fill=\"#F6F4EC\" stroke=\"#15170F\" stroke-width=\"2.5\"/><g clip-path=\"url(#rmlg)\"><circle cx=\"262.2\" cy=\"258.2\" r=\"56.1\" fill=\"url(#plg)\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"56.1\" fill=\"url(#plg)\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"56.1\" fill=\"url(#plg)\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"56.1\" fill=\"url(#plg)\"/></g><path d=\"M200.0 196 L253.9 217.8\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L178.2 249.9\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L146.1 174.2\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L221.8 142.1\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><circle cx=\"200.0\" cy=\"196\" r=\"58.1\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"1.2\" stroke-dasharray=\"5 5\"/><circle cx=\"200.0\" cy=\"196\" r=\"11\" fill=\"#15170F\"/><circle cx=\"262.2\" cy=\"258.2\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"262.2\" cy=\"258.2\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"3.4\" fill=\"#15170F\"/><rect x=\"84.0\" y=\"16\" width=\"232\" height=\"42\" rx=\"21\" fill=\"#2F6B47\"/><path d=\"M103.0 37.0 l6 6.5 l12 -13\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"131.0\" y=\"43.0\" font-size=\"17\" font-weight=\"700\" fill=\"#fff\" font-family=\"system-ui,-apple-system,sans-serif\">No flicker</text><text x=\"200.0\" y=\"80\" font-size=\"12.5\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">60\u00b0 low glare downlights + ceiling fan</text><text x=\"200.0\" y=\"375.6\" font-size=\"13\" text-anchor=\"middle\" fill=\"#2F6B47\" font-weight=\"600\" font-family=\"system-ui,-apple-system,sans-serif\">Blades miss the light</text><text x=\"200.0\" y=\"395.6\" font-size=\"11.5\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"system-ui,-apple-system,sans-serif\">Narrow beam lands outside the blades</text></svg>"};
function dlFanSVG(kind){ return DL_FAN_SVG[kind==="low"?"low":"std"]; }


/* ---------- star lights ----------
   At 30 mm there is one fitting, so the finder stops asking questions and
   explains the thing people actually get wrong instead: the driver decides
   whether the run dims, not the light. */
const DL_DRIVER_SVG={"p3": "<svg viewBox=\"0 0 300 176\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"3 pin driver running 3 star lights, not dimmable\"><defs><radialGradient id=\"sl3\" cx=\"50%\" cy=\"0%\" r=\"110%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"10\" y1=\"63.0\" x2=\"44\" y2=\"63.0\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"10\" y=\"56.0\" font-size=\"8\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">240V</text><rect x=\"44\" y=\"46\" width=\"54\" height=\"34\" rx=\"3\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"71.0\" y=\"61\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">3 pin</text><text x=\"71.0\" y=\"73\" font-size=\"8\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">DRIVER</text><line x1=\"106\" y1=\"96\" x2=\"288\" y2=\"96\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"110\" y1=\"96\" x2=\"104\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"121\" y1=\"96\" x2=\"115\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"132\" y1=\"96\" x2=\"126\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"143\" y1=\"96\" x2=\"137\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"154\" y1=\"96\" x2=\"148\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"165\" y1=\"96\" x2=\"159\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"176\" y1=\"96\" x2=\"170\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"187\" y1=\"96\" x2=\"181\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"198\" y1=\"96\" x2=\"192\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"209\" y1=\"96\" x2=\"203\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"220\" y1=\"96\" x2=\"214\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"231\" y1=\"96\" x2=\"225\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"242\" y1=\"96\" x2=\"236\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"253\" y1=\"96\" x2=\"247\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"264\" y1=\"96\" x2=\"258\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"275\" y1=\"96\" x2=\"269\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"286\" y1=\"96\" x2=\"280\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M98 63.0 C 124 63.0, 106.0 70, 124.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"117.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"124.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M124.0 99 L107.0 152 L141.0 152 Z\" fill=\"url(#sl3)\"/><path d=\"M98 63.0 C 124 63.0, 181.0 70, 199.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"192.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"199.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M199.0 99 L182.0 152 L216.0 152 Z\" fill=\"url(#sl3)\"/><path d=\"M98 63.0 C 124 63.0, 256.0 70, 274.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"267.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"274.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M274.0 99 L257.0 152 L291.0 152 Z\" fill=\"url(#sl3)\"/><text x=\"199.0\" y=\"126\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.6\">3 \u00d7 3W HEADS</text><circle cx=\"51\" cy=\"146\" r=\"7\" fill=\"none\" stroke=\"#C0563E\" stroke-width=\"1.5\"/><path d=\"M48 143 l6 6 M54 143 l-6 6\" stroke=\"#C0563E\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><text x=\"64\" y=\"150\" font-size=\"12\" font-weight=\"600\" fill=\"#C0563E\" font-family=\"system-ui,-apple-system,sans-serif\">Not dimmable</text></svg>", "p4": "<svg viewBox=\"0 0 300 176\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"4 pin driver running 4 star lights, dimmable\"><defs><radialGradient id=\"sl4\" cx=\"50%\" cy=\"0%\" r=\"110%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"10\" y1=\"63.0\" x2=\"44\" y2=\"63.0\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"10\" y=\"56.0\" font-size=\"8\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">240V</text><rect x=\"44\" y=\"46\" width=\"54\" height=\"34\" rx=\"3\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"71.0\" y=\"61\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">4 pin</text><text x=\"71.0\" y=\"73\" font-size=\"8\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">DRIVER</text><line x1=\"106\" y1=\"96\" x2=\"288\" y2=\"96\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"110\" y1=\"96\" x2=\"104\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"121\" y1=\"96\" x2=\"115\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"132\" y1=\"96\" x2=\"126\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"143\" y1=\"96\" x2=\"137\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"154\" y1=\"96\" x2=\"148\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"165\" y1=\"96\" x2=\"159\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"176\" y1=\"96\" x2=\"170\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"187\" y1=\"96\" x2=\"181\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"198\" y1=\"96\" x2=\"192\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"209\" y1=\"96\" x2=\"203\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"220\" y1=\"96\" x2=\"214\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"231\" y1=\"96\" x2=\"225\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"242\" y1=\"96\" x2=\"236\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"253\" y1=\"96\" x2=\"247\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"264\" y1=\"96\" x2=\"258\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"275\" y1=\"96\" x2=\"269\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"286\" y1=\"96\" x2=\"280\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M98 63.0 C 124 63.0, 106.0 70, 124.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"117.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"124.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M124.0 99 L107.0 152 L141.0 152 Z\" fill=\"url(#sl4)\"/><path d=\"M98 63.0 C 124 63.0, 156.0 70, 174.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"167.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"174.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M174.0 99 L157.0 152 L191.0 152 Z\" fill=\"url(#sl4)\"/><path d=\"M98 63.0 C 124 63.0, 206.0 70, 224.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"217.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"224.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M224.0 99 L207.0 152 L241.0 152 Z\" fill=\"url(#sl4)\"/><path d=\"M98 63.0 C 124 63.0, 256.0 70, 274.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"267.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"274.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M274.0 99 L257.0 152 L291.0 152 Z\" fill=\"url(#sl4)\"/><text x=\"199.0\" y=\"126\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.6\">4 \u00d7 3W HEADS</text><circle cx=\"51\" cy=\"146\" r=\"7\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"1.5\"/><path d=\"M47.6 145.8 l2.4 2.6 l5-5.4\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"64\" y=\"150\" font-size=\"12\" font-weight=\"600\" fill=\"#2F6B47\" font-family=\"system-ui,-apple-system,sans-serif\">Dimmable</text></svg>", "p6": "<svg viewBox=\"0 0 300 176\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"6 pin driver running 6 star lights, dimmable\"><defs><radialGradient id=\"sl6\" cx=\"50%\" cy=\"0%\" r=\"110%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"10\" y1=\"63.0\" x2=\"44\" y2=\"63.0\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"10\" y=\"56.0\" font-size=\"8\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">240V</text><rect x=\"44\" y=\"46\" width=\"54\" height=\"34\" rx=\"3\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"71.0\" y=\"61\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">6 pin</text><text x=\"71.0\" y=\"73\" font-size=\"8\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">DRIVER</text><line x1=\"106\" y1=\"96\" x2=\"288\" y2=\"96\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"110\" y1=\"96\" x2=\"104\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"121\" y1=\"96\" x2=\"115\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"132\" y1=\"96\" x2=\"126\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"143\" y1=\"96\" x2=\"137\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"154\" y1=\"96\" x2=\"148\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"165\" y1=\"96\" x2=\"159\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"176\" y1=\"96\" x2=\"170\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"187\" y1=\"96\" x2=\"181\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"198\" y1=\"96\" x2=\"192\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"209\" y1=\"96\" x2=\"203\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"220\" y1=\"96\" x2=\"214\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"231\" y1=\"96\" x2=\"225\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"242\" y1=\"96\" x2=\"236\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"253\" y1=\"96\" x2=\"247\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"264\" y1=\"96\" x2=\"258\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"275\" y1=\"96\" x2=\"269\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"286\" y1=\"96\" x2=\"280\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M98 63.0 C 124 63.0, 106.0 70, 124.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"117.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"124.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M124.0 99 L107.0 152 L141.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 136.0 70, 154.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"147.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"154.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M154.0 99 L137.0 152 L171.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 166.0 70, 184.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"177.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"184.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M184.0 99 L167.0 152 L201.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 196.0 70, 214.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"207.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"214.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M214.0 99 L197.0 152 L231.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 226.0 70, 244.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"237.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"244.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M244.0 99 L227.0 152 L261.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 256.0 70, 274.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"267.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"274.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M274.0 99 L257.0 152 L291.0 152 Z\" fill=\"url(#sl6)\"/><text x=\"199.0\" y=\"126\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.6\">6 \u00d7 3W HEADS</text><circle cx=\"51\" cy=\"146\" r=\"7\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"1.5\"/><path d=\"M47.6 145.8 l2.4 2.6 l5-5.4\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"64\" y=\"150\" font-size=\"12\" font-weight=\"600\" fill=\"#2F6B47\" font-family=\"system-ui,-apple-system,sans-serif\">Dimmable</text></svg>"};

const DL_STAR_COLOURS=[
  {k:"3200", n:"Warm",         hex:"#F3C88A", note:"3200K \u2014 the usual pick for ceilings and alfresco"},
  {k:"4000", n:"Natural",      hex:"#FFF1DC", note:"4000K \u2014 neutral, works anywhere"},
  {k:"5000", n:"Bright",       hex:"#F2F6FF", note:"5000K \u2014 crisp, task and display"},
  {k:"6000", n:"Ultra bright", hex:"#E4EDFF", note:"6000K \u2014 coolest white in the range"},
  {k:"blue", n:"Blue",         hex:"#5B8BD0", note:"Fixed blue \u2014 pools, feature ceilings"},
  {k:"rgbw", n:"RGB",          hex:"linear-gradient(135deg,#E05A5A,#E0C24A,#4FB86B,#4A7FE0)",
                               note:"Full colour, run from a remote \u2014 IP65, 30\u00b0 beam"}
];

function dlStarSwatches(){
  return '<div class="dl-star-cols">'+DL_STAR_COLOURS.map(function(c){
    var bg = c.hex.indexOf("gradient")>-1 ? c.hex : c.hex;
    return '<div class="dl-star-col">'+
      '<span class="sw" style="background:'+bg+'"></span>'+
      '<div><b>'+c.n+'</b><em>'+c.note+'</em></div>'+
    '</div>';
  }).join("")+'</div>';
}


/* Swatch strip for the star colour question - the chosen one lifts forward. */
function dlStarSwatchFig(active){
  return '<div class="dl-starsw">'+DL_STAR_COLOURS.map(function(c){
    var on = active===c.k;
    return '<figure class="dl-starsw-i'+(on?' on':'')+'">'+
      '<span class="sw" style="background:'+c.hex+'"></span>'+
      '<figcaption><b>'+c.n+'</b><em>'+(c.k==="rgbw"?"IP65 \u00b7 30\u00b0":(c.k==="blue"?"Fixed colour":c.k+"K \u00b7 280\u2009lm"))+'</em></figcaption>'+
    '</figure>';
  }).join("")+'</div>';
}

function dlStarPanel(){
  return '<div class="dl-star">'
    + '<div class="dl-star-hd">'
      + '<p class="eyebrow">30&#8201;mm \u00b7 Star lights</p>'
      + '<h3>For features, walls and bathrooms</h3>'
      + '<p class="dl-star-lede">Star lights are not room lighting. They pick out a '
      + '<b>feature</b>, wash a <b>wall</b>, or sit in a <b>bathroom</b> ceiling where a big fitting '
      + 'would look wrong. One 3&#8201;W head, 280&#8201;lumens, into a 30&#8201;mm hole. '
      + 'You would not light a lounge with them \u2014 you would light the thing in the lounge worth looking at.</p>'
    + '</div>'

    + '<h4 class="dl-star-sub">The three places they earn their money</h4>'
    + '<div class="dl-star-uses">'
      + '<div><b>Features</b><em>A run above a bar, in a bulkhead, or over a stair. Small enough that you see the light, not the fitting.</em></div>'
      + '<div><b>Walls</b><em>A line 300&#8201;mm off the wall turns plaster or stone into the feature. This is where they look best.</em></div>'
      + '<div><b>Bathrooms</b><em>Around a mirror or over a niche, where a 90&#8201;mm downlight is too much fitting for the ceiling.</em></div>'
    + '</div>'

    + '<h4 class="dl-star-sub">Wiring \u2014 the part people get wrong</h4>'
    + '<p class="dl-star-lede">They run on <b>12&#8201;V</b> from a transformer, not off mains. '
      + 'Each head plugs into a T-piece and the heads sit about <b>1&#8201;m apart</b> along the cable.</p>'
    + '<p class="dl-star-rule"><b>The hard limit: 6 lights per cable.</b> Want more than six? '
      + 'You run a second cable back to the same controller \u2014 you do not extend the first one.</p>'

    + '<h4 class="dl-star-sub">Pick the transformer by how many lights</h4>'
    + '<table class="dl-star-tbl"><tbody>'
      + '<tr><th>12&#8201;V 20&#8201;W</th><td>1 line of 6 \u2014 <b>up to 6 lights</b></td><td class="p">$22 +GST</td></tr>'
      + '<tr><th>12&#8201;V 40&#8201;W</th><td>2 lines of 6 \u2014 <b>up to 12 lights</b></td><td class="p">$35 +GST</td></tr>'
      + '<tr><th>12&#8201;V 75&#8201;W</th><td>Up to 4 lines \u2014 <b>rated to 18 lights</b></td><td class="p">$60 +GST</td></tr>'
      + '<tr><th>T-piece + head</th><td>One per light, roughly 1&#8201;m apart</td><td class="p">$16 +GST</td></tr>'
    + '</tbody></table>'
    + '<p class="dl-star-note">All three transformers are IP20, so they go somewhere dry \u2014 in the roof space or a cupboard, not in the bathroom itself.</p>'

    + '<h4 class="dl-star-sub">Controller and remote</h4>'
    + '<table class="dl-star-tbl"><tbody>'
      + '<tr><th>3-in-1 controller</th><td>Colour and dimming from a remote</td><td class="p">$15 +GST</td></tr>'
      + '<tr><th>3-in-1 SMART controller</th><td>Same, plus phone control, timers and schedules through Tuya or Smart Life</td><td class="p">$25 +GST</td></tr>'
      + '<tr><th>RGB+CCT remote</th><td>Handset, one zone</td><td class="p">$17 +GST</td></tr>'
      + '<tr><th>4-zone remote, RGB+CCT</th><td>Wall panel in black or white, runs four zones</td><td class="p">$35 +GST</td></tr>'
    + '</tbody></table>'

    + '<div class="dl-star-warn">'
      + '<b>For your electrician</b>'
      + '<p>Input is <b>V+ red, V\u2212 black</b>. Wire it backwards and the controller fails, and that is not covered by warranty. '
      + 'Output is black&#8201;V+, red&#8201;R, green&#8201;G, blue&#8201;B, white&#8201;W. '
      + 'SET has to be selected so the controller shows a green indicator light.</p>'
    + '</div>'
  + '</div>';
}

function dlGlarePair(compact){
  return '<div class="dl-glare">'
    + '<div class="dl-glare-pair">'
      + '<figure>'+dlGlareSVG("std")+'</figure>'
      + '<figure>'+dlGlareSVG("low")+'</figure>'
    + '</div>'
    + '<div class="dl-glare-facts">'
      + '<div><dt>Pool width</dt><dd>2.9\u00d7 the drop</dd><dd class="alt">1.2\u00d7 the drop</dd></div>'
      + '<div><dt>Fittings for 20\u2009m\u00b2</dt><dd>4\u20135</dd><dd class="alt">8\u201310</dd></div>'
      + '<div><dt>Source visible</dt><dd>Yes, from most angles</dd><dd class="alt">No, set behind a baffle</dd></div>'
      + '<div><dt>Under a fan</dt><dd>Flicker risk</dd><dd class="alt">Steady</dd></div>'
    + '</div>'
    + '<p class="dl-glare-cap">The beam angle is the whole difference. '
      + '<b>Standard</b> throws wide from a lamp sitting at the ceiling face \u2014 fewer fittings, '
      + 'but the chip is in view wherever you stand. <b>Low glare</b> sets the lamp back behind a dark '
      + 'baffle and narrows the cone, so the ceiling reads calm and nothing catches your eye \u2014 '
      + 'at the cost of roughly twice as many fittings.</p>'
    + (compact ? '' :
        '<h4 class="dl-glare-sub">With a ceiling fan in the room</h4>'
    + '<div class="dl-glare-pair">'
      + '<figure>'+dlFanSVG("std")+'</figure>'
      + '<figure>'+dlFanSVG("low")+'</figure>'
    + '</div>'
    + '<p class="dl-glare-cap">Looking down at the ceiling. What decides flicker is how wide the beam '
      + 'still is <b>where the blades actually are</b> \u2014 about 350&#8201;mm below the ceiling, not down at '
      + 'the floor. A 110\u00b0 beam is a metre wide by then, so it reaches inside the blade circle and every '
      + 'blade that passes cuts it. A 60\u00b0 beam is only 400&#8201;mm wide there and lands outside the '
      + 'blades entirely.</p>')
  + '</div>';
}

/* ---------- room scenes ----------
   These are drawings, not photographs. Greenhse has no downlight room
   photography yet (see the C4 note in the build review) and a fake photo would
   be worse than an honest diagram. Swap them for real shots when we have them. */
function dlScene(kind){
  const P='#faf9f4', W='#ffffff';
  function cone(x,spread,toY,op){
    return '<path d="M'+x+' 12 L'+(x-spread)+' '+toY+' L'+(x+spread)+' '+toY+' Z" fill="'+DL_GLOW+'" opacity="'+(op||".3")+'"/>'
         + '<circle cx="'+x+'" cy="12" r="2.4" fill="'+DL_GLOW+'"/>';
  }
  let b='<rect width="160" height="104" fill="'+P+'"/><rect x="0" y="0" width="160" height="12" fill="'+DL_INK+'"/>';
  const floor='<line x1="0" y1="92" x2="160" y2="92" stroke="'+DL_LINE+'" stroke-width="1.6"/>';
  let s="";
  if(kind==="kitchen"){
    s=cone(38,17,64)+cone(88,17,64)+cone(132,15,64)
     +'<rect x="8" y="16" width="52" height="26" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/><line x1="34" y1="16" x2="34" y2="42" stroke="'+DL_LINE+'"/>'
     +'<rect x="8" y="62" width="140" height="6" fill="'+DL_INK+'"/>'
     +'<rect x="8" y="68" width="140" height="24" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.2"/>'
     +'<line x1="58" y1="68" x2="58" y2="92" stroke="'+DL_LINE+'"/><line x1="108" y1="68" x2="108" y2="92" stroke="'+DL_LINE+'"/>'
     +'<rect x="118" y="50" width="14" height="12" rx="2" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.2"/>';
  }else if(kind==="living"){
    s=cone(34,26,92)+cone(80,26,92)+cone(126,26,92)
     +'<path d="M18 88 V64 h56 v24" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +'<rect x="18" y="72" width="56" height="8" fill="'+DL_INK+'" opacity=".18"/>'
     +'<rect x="96" y="76" width="42" height="4" fill="'+DL_INK+'"/><line x1="102" y1="80" x2="102" y2="90" stroke="'+DL_INK+'" stroke-width="1.5"/><line x1="132" y1="80" x2="132" y2="90" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +floor;
  }else if(kind==="bedroom"){
    s=cone(44,20,74)+cone(112,20,74)
     +'<rect x="14" y="44" width="8" height="48" fill="'+DL_INK+'"/>'
     +'<path d="M22 74 h96 v18 H22 Z" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +'<path d="M26 74 q10 -14 26 0" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.3"/>'
     +'<rect x="124" y="70" width="22" height="22" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.3"/>'
     +floor;
  }else if(kind==="bathroom"){
    s=cone(44,17,62)+cone(116,17,70)
     +'<rect x="22" y="20" width="46" height="30" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.5"/><line x1="28" y1="26" x2="28" y2="44" stroke="'+DL_LINE+'" stroke-width="2"/>'
     +'<rect x="16" y="62" width="60" height="30" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<ellipse cx="46" cy="62" rx="14" ry="4" fill="'+DL_INK+'" opacity=".25"/>'
     +'<line x1="98" y1="24" x2="98" y2="92" stroke="'+DL_INK+'" stroke-width="1.6"/>'
     +'<rect x="100" y="24" width="52" height="68" fill="#dfeaf0" opacity=".5"/>'
     +'<path d="M116 30 v10 M124 30 v10 M132 30 v10" stroke="'+DL_DIM+'" stroke-width="1.2"/>'
     +floor;
  }else if(kind==="hallway"){
    s='<path d="M0 92 L54 58 h52 l54 34 Z" fill="'+DL_GLOW+'" opacity=".18"/>'
     +cone(46,13,92,".26")+cone(80,13,92,".26")+cone(114,13,92,".26")
     +'<path d="M0 92 L54 58" stroke="'+DL_INK+'" stroke-width="1.4" fill="none"/>'
     +'<path d="M160 92 L106 58" stroke="'+DL_INK+'" stroke-width="1.4" fill="none"/>'
     +'<rect x="54" y="34" width="52" height="24" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<rect x="24" y="46" width="16" height="30" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.2"/>'
     +'<rect x="120" y="46" width="16" height="30" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.2"/>';
  }else if(kind==="garage"){
    s='<rect x="34" y="14" width="92" height="6" rx="3" fill="'+DL_GLOW+'"/>'
     +'<path d="M34 20 L14 92 H146 L126 20 Z" fill="'+DL_GLOW+'" opacity=".26"/>'
     +'<rect x="10" y="30" width="60" height="62" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<line x1="10" y1="44" x2="70" y2="44" stroke="'+DL_LINE+'"/><line x1="10" y1="58" x2="70" y2="58" stroke="'+DL_LINE+'"/><line x1="10" y1="72" x2="70" y2="72" stroke="'+DL_LINE+'"/>'
     +'<rect x="86" y="64" width="60" height="5" fill="'+DL_INK+'"/><line x1="92" y1="69" x2="92" y2="92" stroke="'+DL_INK+'" stroke-width="1.5"/><line x1="140" y1="69" x2="140" y2="92" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +floor;
  }else if(kind==="outdoor"){
    s='<path d="M0 12 L60 12 L60 4 L160 4 L160 12 Z" fill="'+DL_INK+'"/>'
     +cone(40,15,66)+cone(96,15,74)
     +'<rect x="146" y="12" width="7" height="80" fill="'+DL_INK+'"/>'
     +'<rect x="20" y="66" width="52" height="4" fill="'+DL_INK+'"/><line x1="26" y1="70" x2="26" y2="88" stroke="'+DL_INK+'" stroke-width="1.5"/><line x1="66" y1="70" x2="66" y2="88" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +'<path d="M92 88 V74 h18 v14" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<path d="M112 92 q10 -22 22 -6" fill="none" stroke="#5f7d4e" stroke-width="2"/>'
     +floor;
  }else{ /* office / commercial */
    s=cone(32,20,66)+cone(80,20,66)+cone(128,20,66)
     +'<rect x="12" y="66" width="56" height="4" fill="'+DL_INK+'"/><line x1="18" y1="70" x2="18" y2="90" stroke="'+DL_INK+'" stroke-width="1.4"/><line x1="62" y1="70" x2="62" y2="90" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<rect x="92" y="66" width="56" height="4" fill="'+DL_INK+'"/><line x1="98" y1="70" x2="98" y2="90" stroke="'+DL_INK+'" stroke-width="1.4"/><line x1="142" y1="70" x2="142" y2="90" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<rect x="26" y="50" width="24" height="16" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.3"/>'
     +'<rect x="106" y="50" width="24" height="16" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.3"/>'
     +floor;
  }
  return '<svg viewBox="0 0 160 104" role="img" aria-label="'+kind+' lit with downlights">'+b+s+'</svg>';
}

/* ---------- scenes used to illustrate the two beam types ----------
   Downlights aren't room-specific — a 90 mm fitting is the same fitting over a
   bench or a bed — so the finder no longer asks which room. These drawings stay
   because they show what each BEAM does, which is the part that changes. */
const DL_SCENE_KEYS=["kitchen","living","bedroom","bathroom","hallway","outdoor","office","garage"];

/* Where each type earns its keep. Drawings + one honest line each. */
const DL_GOOD={
  low:[["kitchen","Over benchtops","Light on the bench, not in your eyes"],
       ["bedroom","Bedrooms","Nothing bright overhead when you lie down"],
       ["bathroom","Bathroom vanity","Pools the light where you use it"],
       ["office","Desks &amp; retail","Cuts screen and cabinet glare"]],
  std:[["living","Living &amp; dining","One even wash across the whole room"],
       ["hallway","Hallways &amp; stairs","Wide spread, fewer fittings"],
       ["outdoor","Alfresco &amp; eaves","Covers a big area from a high ceiling"],
       ["office","Offices &amp; shops","Covers a big floor from a high ceiling"]]
};
function dlWhereGood(mode){
  /* The room scenes (kitchen, bathroom, hallway...) were removed — they took up
     a lot of space and told people things they already knew. The beam and fan
     diagrams do the actual explaining. */
  return "";
}

/* ---------- feasibility ----------
   One test, used everywhere: does this fitting still satisfy everything the
   customer has told us so far? Every question then only offers answers that
   leave at least one fitting standing, so you can never walk the finder into
   a corner it has to apologise for. */
function dlOK(p,a){
  if(a.cut){ const b=dlBand(a.cut), c=dlCut(p); if(!c||c.min<b.lo||c.min>b.hi) return false; }
  if(a.glare==="low" && !dlIsLowGlare(p)) return false;
  if(a.glare==="std" && dlIsLowGlare(p))  return false;
  if(a.colour==="rgbw" && !(dlIsRGBW(p)||dlIsSmart(p))) return false;
  if(a.colour==="tri"  &&  (dlIsRGBW(p)||dlIsSmart(p))) return false;
  /* Star lights: the RGBW head is a different fitting to the tri-colour one.
     Every white temperature and Blue come off the same switchable head. */
  if(a.starcol==="rgbw" && !(dlIsRGBW(p)||dlIsSmart(p))) return false;
  if(a.starcol && a.starcol!=="rgbw" && (dlIsRGBW(p)||dlIsSmart(p))) return false;
  return true;
}
function dlFeasible(a){ return dlPool().filter(function(p){ return dlOK(p,a); }); }
function dlWith(a,key,val){ const t={}; for(const k in a) t[k]=a[k]; t[key]=val; return t; }

/* Feasible answers for any question, in the order they were written. */
function dlOptsFor(Q,a){
  const base=(typeof Q.opts==="function"?Q.opts(a):Q.opts)||[];
  if(Q.key==="cut") return base;                       /* every size is buyable */
  const real=base.filter(function(o){
    return o[1]!=="auto" && dlFeasible(dlWith(a,Q.key,o[1])).length>0;
  });
  if(Q.key==="glare" && real.length>1){
    const auto=base.find(function(o){ return o[1]==="auto"; });
    if(auto) real.push(auto);                          /* "not sure" only helps with a real choice */
  }
  return real;
}
/* ---------- questions ---------- */
function dlWantLow(a){
  if(a.glare==="low") return true;
  if(a.glare==="std") return false;
  return null;
}
const DL_Q=[
 {q:"What size hole are you working with?", key:"cut",
  hint:"This is the <b>cut-out</b> \u2014 the hole in the ceiling, not the outside of the fitting. Swapping old halogens? Measure the hole you already have. New build? 90&#8201;mm is the Australian standard and has the widest range.",
  extra:function(a){ return dlCutSVG(a.cut) + (a.cut==="30" ? dlStarPanel() : ""); },
  opts:[["30 mm \u2014 star lights &amp; accents, 280 lm","30"],
        ["70 mm \u2014 small &amp; subtle, up to 650 lm","70"],
        ["90 mm \u2014 the standard size, up to 1000 lm","90"],
        ["110 mm \u2014 brighter, fewer fittings, up to 1200 lm","110"],
        ["I\u2019m not sure yet","unsure"]]},

 {q:"What colour star light?", key:"starcol",
  when:function(a){ return a.cut==="30"; },
  hint:"The tri-colour head is switched at install \u2014 one fitting covers 3200K, 4000K, 5000K and 6000K at 280&#8201;lm, so you can decide on the day. Blue is a fixed-colour head. RGB is a different fitting: full colour from a remote, IP65, 30\u00b0 beam.",
  extra:function(a){ return dlStarSwatchFig(a.starcol); },
  opts:[["Warm \u2014 3200K","3200"],
        ["Natural \u2014 4000K","4000"],
        ["Bright \u2014 5000K","5000"],
        ["Ultra bright \u2014 6000K","6000"],
        ["Blue \u2014 fixed colour","blue"],
        ["RGB \u2014 full colour","rgbw"]]},

 {q:"Standard beam, or low glare?", key:"glare",
  /* 30 mm is one star light head, and at 110 mm every fitting we stock is a
     wide standard beam - neither size has a choice to make here. */
  when:function(a){ return a.cut!=="30" && a.cut!=="110"; },
  hint:function(a){
    /* By key, not position — DL_Q[1] is the star-light colour question. */
    const n=dlOptsFor(DL_Q.find(q=>q.key==="glare"),a).length;
    return n>1
      ? "The only real difference is how deep the LED sits and how wide it throws. Have a look at the two below \u2014 it changes how the room feels more than anything else you pick."
      : "Worth knowing the difference either way. At <b>"+dlBand(a.cut).label+"</b> every fitting we stock is a wide standard beam \u2014 low glare is only made in 70 and 90&#8201;mm.";
  },
  extra:function(){ return dlGlarePhoto(true)+dlGlarePair(); },
  opts:[["Standard \u2014 wide even light, 110\u00b0","std"],
        ["Low glare \u2014 focused 60\u00b0, source hidden, fan-safe","low"],
        ["Not sure \u2014 show me the closest match","auto"]]},

 /* Not "which room" — a downlight goes wherever you like. This is the one place
    the location genuinely changes the product: steam and weather need IP65, and
    that's a wiring-rules matter, not a taste one. It only appears when an IP65
    fitting actually exists in the size and beam already chosen. */
 {q:"How do you want the colour set?", key:"colour",
  /* 30 mm has its own colour question; 110 mm is tricolour only. */
  when:function(a){ return a.cut!=="30" && a.cut!=="110"; },
  hint:function(a){
    return "Every downlight we sell is tricolour \u2014 a small switch on the back picks warm, natural or cool once at install, at no extra cost. "
      + ("Smart is worth paying for in a room you sit in at night. In a kitchen, bathroom or hallway it rarely gets used \u2014 section 04 of the guide has the room-by-room version.");
  },
  opts:[["Tricolour / CCT \u2014 switch it at install","tri"],
        ["RGBW Smart \u2014 full colour, run from your phone","rgbw"]]},

 {q:"How big is the room?", key:"size",
  /* Star lights are features, walls and bathrooms - not room lighting - so
     "how many for the room" is the wrong question at 30 mm. */
  when:function(a){ return a.cut!=="30"; }, size:true,
  hint:"This is all we need to work out how many fittings you want. The count comes from the sizing table our Perth team uses on site \u2014 not a lumen guess. Skip it if you already know.",
  extra:function(a){ const w=dlWantLow(a); return w===null?"":dlWhereGood(w); }}
];
/* A question with only one possible answer isn't a question. It drops out of
   the flow and the reason turns up on the result instead. The glare one is the
   exception \u2014 the comparison is worth seeing even when the choice is made. */
function dlVisibleQs(a){
  a=a||dlAnswers;
  return DL_Q.filter(function(Q){
    /* A question's own `when` always wins - at 30 mm there is one star light
       head, so glare and the general colour question don't apply at all. */
    if(typeof Q.when==="function" && !Q.when(a)) return false;
    if(Q.key==="cut"||Q.key==="size"||Q.key==="glare") return true;
    return dlOptsFor(Q,a).length>1;
  });
}
/* Anything that dropped out gets answered for them, and remembered so the
   result can say why. */
function dlAutoFill(){
  DL_Q.forEach(function(Q){
    /* Don't auto-answer a question that doesn't apply - it would show up in
       the "we picked this for you" notes on the result for no reason. */
    if(typeof Q.when==="function" && !Q.when(dlAnswers)){ delete dlAnswers[Q.key]; return; }
    if(Q.key==="cut"||Q.key==="size"||Q.key==="glare") return;
    if(dlAnswers[Q.key]!==undefined) return;
    if(!dlAnswers.cut) return;
    const os=dlOptsFor(Q,dlAnswers);
    if(os.length===1){
      dlAnswers[Q.key]=os[0][1];
      if(Q.key==="colour"&&os[0][1]==="tri")
        dlAutoKeys.colour="RGBW and phone control are only made in 90&#8201;mm (and one 160&#8201;mm fitting), so at this size it\u2019s tricolour \u2014 warm, natural or cool, switched at install.";
    }
  });
}
/* Answers we filled in are thrown away whenever an earlier answer changes, so
   they always re-derive from what the customer actually chose. */
function dlClearAuto(){
  for(const k in dlAutoKeys){ delete dlAnswers[k]; }
  dlAutoKeys={};
}

/* ---------- matching ---------- */
/* Colour capability is read from the spec table where possible, not guessed
   from the product name — several fittings are switchable without saying so
   in the title. */
function dlIsRGBW(p){ return /rgbw/i.test(p.name); }
function dlIsSmart(p){ return /bluetooth|tuya|wifi|smart/i.test(p.name+" "+p.id); }
function dlIsTri(p){
  if(dlIsRGBW(p)) return false;
  if(/tricolour|tri-colour|cct/i.test(p.name+" "+p.id)) return true;
  const c=dlSpec(p,"Light Output Colour")||"";
  return (c.match(/\d{4}/g)||[]).length>=2;
}
function dlSaysLowGlare(p){ return /low\s*glare|anti[\s-]?glare/i.test(p.name+" "+p.id); }
function dlScore(p,a){
  const cut=dlCut(p), ip=dlIP(p), n=p.name.toLowerCase();
  let s=0;
  const band=dlBand(a.cut);
  if(cut){ s += (cut.min>=band.lo && cut.min<=band.hi) ? 60 : -45; }
  const want=dlWantLow(a);
  if(want!==null){
    s += (dlIsLowGlare(p)===want) ? 30 : -20;
    if(want && dlSaysLowGlare(p)) s+=8;      /* built as a low glare fitting, not just narrow */
  }
  /* IP rating no longer filters or ranks — every downlight we stock is fine
     anywhere, so it is shown as a spec but never scored. */
  /* One answer covers both RGBW and phone-controlled fittings — a plain RGBW
     one is the closer match, a Bluetooth/Tuya white is the next best thing. */
  if(a.colour==="rgbw")     s += dlIsRGBW(p) ? 50 : (dlIsSmart(p) ? 30 : -30);
  else if(a.colour==="tri") s += (dlIsTri(p) && !dlIsRGBW(p) && !dlIsSmart(p)) ? 20 : -6;
  if(/dimmable/i.test(n)) s+=4;
  if(dlLum(p)) s+=3;
  return s;
}
/* Only ever rank fittings that actually satisfy the answers. */
function dlRank(a){
  const pool=dlFeasible(a);
  const list=pool.length?pool:dlPool();
  return list.map(function(p){ return {p:p,s:dlScore(p,a)}; })
    .sort(function(x,y){ return y.s-x.s || x.p.price-y.p.price; });
}

/* ---------- state ---------- */
let dlAnswers={}, dlStep=0, dlQty=0, dlQtyAuto=null, dlPick=null, dlAutoShown=false, dlBatten=false, dlAutoKeys={};

/* ---------- result pieces ---------- */
function dlMissing(txt){ return '<span class="dl-miss">not published \u2014 ask us</span>'; }
/* Tidies how a spec READS. Never changes the value: 10Watt -> 10W, 3000k -> 3000K.
   If a figure is absent it stays absent — nothing is ever filled in. */
function dlTidy(v){
  if(!v) return v;
  return String(v)
    .replace(/(\d)\s*Watt(s)?\b/gi, "$1W")
    .replace(/(\d{3,5})\s*k\b/g, "$1K")
    .replace(/\blumens?\b/gi, "lumens")
    .replace(/(\d)\s*-\s*(\d)/g, "$1\u2013$2")
    .replace(/\s+-\s+/g, " \u00b7 ")
    .replace(/\s{2,}/g, " ")
    .trim();
}
function dlSpecRows(p){
  const cut=dlCut(p), beam=dlBeam(p), ip=dlIP(p);
  const rows=[
    ["Cut-out",   cut?cut.txt:null],
    ["Beam angle",beam?beam+"\u00b0 ("+(beam<90?"low glare":"standard")+")":null],
    ["Brightness",dlLum(p)],
    ["Power",     dlWatt(p)],
    ["Dimming",   dlDim(p)],
    ["Weather",   ip?("IP"+ip+(ip>=65?" \u2014 wet areas OK":" \u2014 indoor / sheltered")):null],
    ["Colours",   dlSpec(p,"Light Output Colour")],
    ["Lifespan",  dlSpec(p,"Lifespan")]
  ];
  return '<div class="sw-spec240"><h4>The numbers on this fitting</h4><div class="sw-specrows">'
    + rows.map(function(r){
        return '<div><span>'+r[0]+'</span><b>'+(r[1]?esc(dlTidy(r[1])):dlMissing())+'</b></div>';
      }).join("")
    + '</div></div>';
}
function dlRecCard(p,primary){
  const cut=dlCut(p), beam=dlBeam(p), ip=dlIP(p), lum=dlLum(p);
  const tags=[];
  if(cut)  tags.push('<span class="dl-tag">Cut-out '+cut.txt+'</span>');
  if(beam) tags.push('<span class="dl-tag'+(beam<90?" dl-tag-lg":"")+'">'+beam+'\u00b0 '+(beam<90?"low glare":"standard")+'</span>');
  if(ip)   tags.push('<span class="dl-tag'+(ip>=65?" dl-tag-ip":"")+'">IP'+ip+'</span>');
  if(!cut) tags.push('<span class="dl-tag dl-tag-miss">cut-out not published</span>');
  if(!beam)tags.push('<span class="dl-tag dl-tag-miss">beam not published</span>');

  if(primary){
    return '<div class="dl-hero" data-dlpick="'+p.id+'">'
      + '<div class="dl-hero-img">'+media(p,"img")+'</div>'
      + '<div class="dl-hero-d">'
      +   '<h4>'+esc(p.name)+'</h4>'
      +   '<div class="dl-tags">'+tags.join("")+'</div>'
      +   '<p class="dl-hero-lum">'+(lum?esc(dlTidy(lum)):'<span class="dl-miss">Lumen output not published \u2014 ask us</span>')+'</p>'
      +   '<div class="dl-hero-p"><b>$'+p.price.toFixed(2)+'</b><span>ex-GST each</span>'
      +   '<em>$'+(p.price*1.1).toFixed(2)+' inc GST</em></div>'
      + '</div></div>';
  }
  return '<div class="sw-rec sw-rec-big" data-dlpick="'+p.id+'">'
    + '<div class="rec-top"><div class="ri">'+media(p,"img")+'</div>'
    + '<div class="rd"><h4>'+esc(p.name)+'</h4>'
    + '<span class="rp">$'+p.price.toFixed(2)+' <small>ex-GST each \u00b7 $'+(p.price*1.1).toFixed(2)+' inc</small></span>'
    + '<span class="rec-spec">'+[cut?("Cut-out "+cut.txt):"", beam?(beam+"\u00b0"):"" , ip?("IP"+ip):""].filter(Boolean).join(" \u00b7 ")+'</span>'
    + '</div></div>'
    + '<span class="rec-cta">Choose this one instead \u2192</span></div>';
}

/* Garage is battens, not a downlight grid — same rule the layout planner uses. */
function renderDlBatten(){
  const box=$("#dlBody"); if(!box) return;
  const b=PRODUCTS.find(function(p){ return p.id==="T40-CCT-BATTEN-PRO"; });
  box.innerHTML='<button class="pk-back" data-dlback="1">\u2190 Back to the downlights</button>'
    + '<div class="sw-prog">\u2713 A better answer than downlights</div>'
    + '<h3>For a garage or laundry, use a batten</h3>'
    + '<div class="dl-scene" style="margin-bottom:14px">'+dlScene("garage")+'</div>'
    + '<p class="sw-hint">A grid of downlights in a garage leaves shadows exactly where you\u2019re working. One 1.2&#8201;m batten throws a long even band of light across the whole bay \u2014 it\u2019s cheaper, brighter and it\u2019s what our team fits every time.</p>'
    + (b?('<div class="sw-recs">'
        + '<div class="sw-rec sw-rec-big"><div class="rec-top"><div class="ri">'+media(b,"img")+'</div>'
        + '<div class="rd"><h4>'+esc(b.name)+'</h4><span class="rp">$'+b.price.toFixed(2)+' <small>ex-GST \u00b7 $'+(b.price*1.1).toFixed(2)+' inc</small></span>'
        + '<span class="rec-where">One per bay for a single garage, two for a double.</span></div></div></div></div>'
        + '<button class="dl-add" data-dladd="'+b.id+'" data-dlqn="1">Add one batten to the cart \u2014 $'+(b.price*1.1).toFixed(2)+' inc GST</button>'):"")
    + '<button class="dl-size-skip" data-dlrestart="1">\u2190 Start the finder again</button>';
}

function dlSummary(){
  const band=dlBand(dlAnswers.cut);
  /* Star lights don't come in low glare or standard - there is one 45 deg
     head - so the summary talks about colour instead. */
  if(dlAnswers.cut==="30"){
    const sc={3200:"warm 3200K",4000:"natural 4000K",5000:"bright 5000K",
              6000:"ultra bright 6000K",blue:"blue",rgbw:"RGB"}[dlAnswers.starcol]||"";
    return ("A 30\u2009mm "+sc+" star light.").replace(/\s+/g," ");
  }
  const want=dlWantLow(dlAnswers);
  const col={tri:"tricolour",rgbw:"RGBW smart"}[dlAnswers.colour]||"";
  return ("A "+band.label.replace(/\s/g,"\u2009")+" "+(want?"low glare":"standard")+" "+col+" downlight.").replace(/\s+/g," ");
}

function renderDlResult(){
  const box=$("#dlBody"); if(!box) return;
  const ranked=dlRank(dlAnswers);
  const good=ranked.filter(function(r){ return r.s>0; });
  const list=(good.length?good:ranked).slice(0,3).map(function(r){ return r.p; });
  if(!list.length){
    box.innerHTML='<button class="pk-back" data-dlback="1">\u2190 Back</button>'
      + '<div class="sw-callus">We don\u2019t have an online match for that combination \u2014 give us a call on <a href="tel:0892972969">(08) 9297 2969</a> and we\u2019ll find it in the warehouse.</div>';
    return;
  }
  const pick = dlPick ? (list.concat(ranked.map(r=>r.p)).find(function(p){return p.id===dlPick;})||list[0]) : list[0];
  const alts = ranked.map(r=>r.p).filter(function(p){ return p.id!==pick.id; }).slice(0,2);
  const want=dlWantLow(dlAnswers);
  const band=dlBand(dlAnswers.cut);
  const cut=dlCut(pick);

  /* notes worth saying out loud */
  let notes="";
  for(const k in dlAutoKeys){ notes+='<div class="dl-note">'+dlAutoKeys[k]+'</div>'; }
  /* Only say this where the glare question genuinely never appeared because the
     band has no low-glare fitting (110 mm). At 90 mm low glare is stocked, so the
     old band-index test started lying the moment the 30 mm band was added. */
  const glareQ=DL_Q.find(q=>q.key==="glare");
  const glareAsked=!glareQ||!glareQ.when||glareQ.when(dlAnswers);
  if(dlAnswers.cut!=="unsure" && want===false && !glareAsked){
    notes+='<div class="dl-note">Low glare is only made in 70 and 90&#8201;mm cut-outs, so at <b>'+band.label+'</b> every option is a wide standard beam.</div>';
  }
  if(dlAnswers.cut==="unsure"){
    notes+='<div class="dl-note"><b>We\u2019ve assumed 90&#8201;mm</b> \u2014 the Australian standard. Measure your hole edge to edge before ordering; if it\u2019s 70&#8201;mm or 120&#8201;mm, come back and change the first answer.</div>';
  }
  if(cut && (cut.min<band.lo||cut.min>band.hi)){
    notes+='<div class="dl-note">Nothing in the online range is made for a '+band.label+' cut-out in this spec, so this is the closest fit at <b>'+cut.txt+'</b>. Call us on (08) 9297 2969 before you cut.</div>';
  }
  if(dlAnswers.colour==="rgbw"){
    const pr=dlSmartPrices();
    const gap=(pr.tri&&pr.smart)?Math.round(pr.smart.price-pr.tri.price):null;
    notes+='<div class="dl-note"><b>Worth a rethink before you do the whole house.</b> Smart earns its keep in the rooms you sit in at night \u2014 living, media, bedroom. '
      + 'In a kitchen, bathroom or hallway you want full brightness the second you walk in, and a wall switch beats unlocking a phone every time.'
      + (gap?(" At about $"+gap+" a fitting more than tricolour, doing two rooms instead of ten is where the money is."):"")
      + ' Section 04 of the guide below has the room-by-room version.</div>';
  }
  if(want!==null && dlIsLowGlare(pick)!==want){
    notes+='<div class="dl-note">Heads up \u2014 this is the best size match, but its beam is '+(dlBeam(pick)||"?")+'\u00b0, so it behaves like a '+(dlIsLowGlare(pick)?"low glare":"standard")+' fitting rather than the '+(want?"low glare":"standard")+' one you picked.</div>';
  }

  /* quantity */
  let qtyBlock="";
  const n = dlQty>0 ? dlQty : 1;
  if(dlAnswers.size && dlAnswers.size!=="skip"){
    const parts=String(dlAnswers.size).split("x").map(parseFloat);
    const auto=dlCount(parts[0],parts[1],!!want);
    if(auto===null){
      qtyBlock='<div class="dl-qty"><h4>How many</h4>'
        + '<div class="sw-callus" style="margin:0">'+parts[0]+'&#8201;m \u00d7 '+parts[1]+'&#8201;m is past our on-site sizing table. Call <a href="tel:0892972969">(08) 9297 2969</a> or use the layout planner and we\u2019ll set out the grid properly.</div>'
        + '<div class="dl-qty-row" style="margin-top:12px"><button class="dl-step" data-dlqty="-1">\u2212</button>'
        + '<span class="dl-qty-n">'+n+'</span><button class="dl-step" data-dlqty="1">+</button>'
        + '<span class="dl-qty-lbl">fittings \u2014 set it yourself for now</span></div></div>';
    }else{
      qtyBlock='<div class="dl-qty"><h4>How many you need</h4>'
        + '<div class="dl-qty-row"><button class="dl-step" data-dlqty="-1">\u2212</button>'
        + '<span class="dl-qty-n">'+n+'</span><button class="dl-step" data-dlqty="1">+</button>'
        + '<span class="dl-qty-lbl">downlights for a '+parts[0]+'&#8201;m \u00d7 '+parts[1]+'&#8201;m room'
        + (n!==auto?' <em>(we suggested '+auto+')</em>':'')+'</span></div>'
        + '<p class="dl-qty-src">From the sizing table our Perth team uses on site \u2014 a '+(want?"60\u00b0 low glare":"wide standard")+' fitting needs '
        + (want?"more":"fewer")+' points for the same room. Set them <b>700\u2013850&#8201;mm off the walls</b> and space them about half your ceiling height apart.</p></div>';
    }
  }else{
    qtyBlock='<div class="dl-qty"><h4>How many</h4>'
      + '<div class="dl-qty-row"><button class="dl-step" data-dlqty="-1">\u2212</button>'
      + '<span class="dl-qty-n">'+n+'</span><button class="dl-step" data-dlqty="1">+</button>'
      + '<span class="dl-qty-lbl">fittings</span></div>'
      + '<p class="dl-qty-src">Tell us the room size and we\u2019ll work the count out for you \u2014 <button class="dl-size-skip" data-dlback="1" style="display:inline">go back a step</button>.</p></div>';
  }

  /* price */
  const ex=pick.price*n, inc=ex*1.1;
  const priceBlock='<div class="dl-price"><h4>Your price</h4>'
    + '<div class="dl-price-row"><span>'+esc(pick.name)+'</span><b>$'+pick.price.toFixed(2)+' ex</b></div>'
    + '<div class="dl-price-row"><span>Quantity</span><b>\u00d7 '+n+'</b></div>'
    + '<div class="dl-price-row"><span>Subtotal ex-GST</span><b>$'+ex.toFixed(2)+'</b></div>'
    + '<div class="dl-price-row"><span>GST 10%</span><b>$'+(inc-ex).toFixed(2)+'</b></div>'
    + '<div class="dl-price-row dl-price-tot"><span>Total inc GST</span><b>$'+inc.toFixed(2)+'</b></div>'
    + '<p class="dl-price-gst">Fittings only. Installation must be done by a licensed electrician \u2014 we can put you in touch with one.</p>'
    + '<button class="dl-add" data-dladd="'+pick.id+'" data-dlqn="'+n+'">Add '+n+' to the cart \u2014 $'+inc.toFixed(2)+' inc GST</button></div>';

  box.innerHTML='<button class="pk-back" data-dlback="1">\u2190 Back</button>'
    + '<div class="sw-prog">\u2713 Your match</div>'
    + '<h3>This is the one:</h3>'
    + '<p class="sw-sum">'+dlSummary()+'</p>'
    + notes
    + '<div class="sw-recs">'+dlRecCard(pick,true)+'</div>'
    + dlSpecRows(pick)
    + qtyBlock
    + priceBlock
    + (want!==null?dlWhereGood(want):"")
    + (dlAnswers.cut==="30" ? dlStarPanel() : "")
    + (alts.length?('<details class="dl-alt"><summary>Not quite right? See '+alts.length+' alternative'+(alts.length>1?"s":"")+'</summary>'+alts.map(function(p){return dlRecCard(p,false);}).join("")+'</details>'):"")
    + '<button class="dl-size-skip" data-dlrestart="1">\u2190 Start the finder again</button>';
}

function renderDlWizard(){
  const box=$("#dlBody"); if(!box) return;
  if(dlBatten){ renderDlBatten(); return; }
  dlAutoFill();
  const QS=dlVisibleQs();
  if(dlStep>=QS.length){ renderDlResult(); return; }
  const Q=QS[dlStep];
  const hint=(typeof Q.hint==="function"?Q.hint(dlAnswers):Q.hint);
  let body="";
  if(Q.size){
    body='<div class="dl-size"><input type="number" id="dlW" min="1" max="40" step="0.1" placeholder="3.5" inputmode="decimal" aria-label="Room width in metres">'
      + '<span class="dl-x">\u00d7</span>'
      + '<input type="number" id="dlL" min="1" max="40" step="0.1" placeholder="4.5" inputmode="decimal" aria-label="Room length in metres">'
      + '<span class="dl-m">metres</span>'
      + '<button class="sw-opt sw-go" data-dlsize="1">Continue \u2192</button></div>'
      + '<button class="dl-size-skip" data-dlskip="1">Skip \u2014 I already know how many I need</button>'
      + '<button class="dl-size-skip" data-dlbatten="1">It\u2019s a garage or workshop \u2014 show me battens instead \u2192</button>';
  }else{
    const opts=dlOptsFor(Q,dlAnswers);
    body='<div class="sw-opts">'+opts.map(function(o,i){
      return '<button class="sw-opt" data-dl="'+i+'">'+o[0]+'</button>';
    }).join("")+'</div>';
  }
  box.innerHTML=(dlStep>0?'<button class="pk-back" data-dlback="1">\u2190 Back</button>':'')
    + '<div class="sw-prog">Question '+(dlStep+1)+(dlStep+1<QS.length?' of '+QS.length:' \u2014 last one')+'</div>'
    + '<h3>'+Q.q+'</h3>'
    + (hint?'<p class="sw-hint">'+hint+'</p>':'')
    + (Q.extra?Q.extra(dlAnswers):'')
    + body;
}
function dlAnswerCurrent(idx){
  const QS=dlVisibleQs(), Q=QS[dlStep];
  const opts=dlOptsFor(Q,dlAnswers); if(!opts[idx]) return;
  dlAnswers[Q.key]=opts[idx][1];
  dlClearAuto();
  dlStep++; dlQty=0; dlPick=null; renderDlWizard();
}
function openDlWizard(){
  dlStep=0; dlAnswers={}; dlQty=0; dlPick=null; dlBatten=false; dlAutoKeys={};
  renderDlWizard();
  $("#dlWizard").classList.add("open"); $("#dlScrim").classList.add("show");
}
function closeDlWizard(){
  $("#dlWizard").classList.remove("open"); $("#dlScrim").classList.remove("show");
}

/* ---------- the section on the page ---------- */
function dlGridSVG(){
  /* a plan view showing the 700-850mm wall offset and even spacing */
  return '<svg viewBox="0 0 240 172" role="img" aria-label="Plan view: downlights set 700 to 850mm off the walls">'
    + '<rect x="18" y="16" width="204" height="118" fill="#ffffff" stroke="'+DL_INK+'" stroke-width="2"/>'
    + [0,1,2].map(function(cx){ return [0,1].map(function(cy){
        const x=52+cx*68, y=48+cy*54;
        return '<circle cx="'+x+'" cy="'+y+'" r="9" fill="'+DL_GLOW+'" opacity=".5"/><circle cx="'+x+'" cy="'+y+'" r="4.5" fill="'+DL_INK+'"/>';
      }).join(""); }).join("")
    + '<line x1="18" y1="48" x2="52" y2="48" stroke="'+DL_DIM+'" stroke-width="1.2" stroke-dasharray="3 3"/>'
    + '<text x="26" y="40" font-size="10" fill="#5d6151">700\u2013850mm</text>'
    + '<line x1="52" y1="148" x2="120" y2="148" stroke="'+DL_DIM+'" stroke-width="1.2"/>'
    + '<line x1="52" y1="144" x2="52" y2="152" stroke="'+DL_DIM+'" stroke-width="1.2"/>'
    + '<line x1="120" y1="144" x2="120" y2="152" stroke="'+DL_DIM+'" stroke-width="1.2"/>'
    + '<text x="86" y="164" font-size="10" fill="#5d6151" text-anchor="middle">\u2248 half ceiling height</text>'
    + '</svg>';
}
/* ---------- quick search: tappable filters above the grid ----------
   Thumbnails are the 150px product cut-outs already built for the layout
   planner, embedded here so the row works with no network at all. */
const DL_CHIPIMG={"all": "/img/inline/8c738c0fc918.webp", "70": "/img/inline/d09412d9d63d.webp", "90": "/img/inline/59047fb30e7c.webp", "big": "/img/inline/a6ab414aae7e.webp", "low": "/img/inline/66c2e54f0c5d.webp", "wet": "/img/inline/bd43328a510e.webp", "smart": "/img/inline/c9b04aba1dbf.webp"};
const DL_FILTERS=[
  {key:"all",  name:"All downlights", sub:"The whole range",        test:function(p){ return true; }},
  {key:"70",   name:"70 mm",          sub:"Small cut-out",          test:function(p){ var c=dlCut(p); return c&&c.min<=80; }},
  {key:"90",   name:"90 mm",          sub:"Standard cut-out",       test:function(p){ var c=dlCut(p); return c&&c.min>=81&&c.min<=104; }},
  {key:"big",  name:"120 mm +",       sub:"Big rooms & high ceilings", test:function(p){ var c=dlCut(p); return c&&c.min>=105; }},
  {key:"low",  name:"Low glare",      sub:"60\u00b0, source hidden",   test:function(p){ return dlIsLowGlare(p); }},
  {key:"smart",name:"Smart & RGBW",   sub:"Run from your phone",    test:function(p){ return dlIsRGBW(p)||dlIsSmart(p); }}
];
let dlFilter="all";
function dlFiltered(){
  const f=DL_FILTERS.find(x=>x.key===dlFilter)||DL_FILTERS[0];
  return dlPool().filter(f.test);
}
function renderDlChips(){
  const host=$("#dlChips"); if(!host) return;
  host.innerHTML=DL_FILTERS.map(function(f){
    const n=dlPool().filter(f.test).length;
    const img=DL_CHIPIMG[f.key];
    return '<button class="dl-chip'+(f.key===dlFilter?" on":"")+'" data-dlfilter="'+f.key+'">'
      + (img?'<img src="'+img+'" alt="" loading="lazy">':'')
      + '<span class="dl-chip-n">'+f.name+'</span>'
      + '<span class="dl-chip-s">'+f.sub+'</span>'
      + '<span class="dl-chip-c">'+n+'</span></button>';
  }).join("");
}
const DL_GLAREPHOTO="/img/inline/871d225214d2.webp";
/* ---------- the guide ----------
   Most people don't get lost on the products, they get lost on the words.
   This is the plain-English version of everything the finder asks about,
   written so someone who has never bought a downlight can follow it. */
function dlGlarePhoto(compact){
  return '<figure class="dl-photo'+(compact?" dl-photo-sm":"")+'">'
    + '<img src="'+DL_GLAREPHOTO+'" alt="The same living room lit with a low glare downlight and with a normal downlight" loading="lazy">'
    + '<figcaption>Same room, same time of day, same sofa. The only thing that changed is the fitting. '
    + 'On the left you see the <b>light</b>; on the right you see the <b>globe</b>.</figcaption></figure>';
}
/* Colour temperature explained by showing it rather than quoting a number. */
function dlTempSVG(){
  const set=[["2700\u20133000K","Warm","#F0C070","Bedrooms, living, anywhere you relax"],
             ["4000K","Natural","#F6EBD2","Kitchens, bathrooms, hallways, laundry"],
             ["5000\u20136000K","Cool","#E2ECF7","Garages, offices, workshops, retail"]];
  return '<div class="dl-temps">'+set.map(function(t){
    return '<div class="dl-temp"><svg viewBox="0 0 120 78" role="img" aria-label="'+t[1]+' white, '+t[0]+'">'
      + '<rect width="120" height="78" fill="#faf9f4"/>'
      + '<rect x="0" y="0" width="120" height="9" fill="#15170F"/>'
      + '<circle cx="60" cy="9" r="3" fill="'+t[2]+'"/>'
      + '<path d="M60 9 L22 66 H98 Z" fill="'+t[2]+'" opacity=".85"/>'
      + '<rect x="12" y="66" width="96" height="4" fill="#15170F" opacity=".2"/></svg>'
      + '<span>'+t[1]+'<em>'+t[0]+'</em></span><p>'+t[3]+'</p></div>';
  }).join("")+'</div>';
}
/* Where a smart fitting is worth the extra money and where it plainly isn't.
   Prices are read live off the catalogue so this can't go stale. */
const DL_SMART_ADVICE=[
  ["Living / dining", "yes",   "Dimming and scenes get used every single night. This is the room to spend it on."],
  ["Bedroom",         "maybe", "A low warm setting at bedtime is genuinely nice. One or two fittings, not the lot."],
  ["Media room",      "yes",   "Down to 10% without leaving the couch is the whole point."],
  ["Kitchen",         "no",    "You want full brightness the second you walk in. A wall switch beats unlocking a phone."],
  ["Bathroom",        "no",    "Same reason, plus the wet-area IP65 fittings aren't made smart anyway."],
  ["Hallway / stairs","no",    "A $20 motion sensor does the job better than a $25 smart fitting ever will."],
  ["Laundry / garage","no",    "On and off. That's the entire requirement."],
  ["Office / shop",   "no",    "Put the money into more light and better colour, not into an app."]
];
function dlSmartPrices(){
  const pool=dlPool();
  const tri=pool.filter(p=>!dlIsRGBW(p)&&!dlIsSmart(p)&&dlCut(p)&&dlCut(p).min>=81&&dlCut(p).min<=104)
                .sort((a,b)=>a.price-b.price)[0];
  const sm=pool.filter(p=>dlIsRGBW(p)||dlIsSmart(p)).sort((a,b)=>a.price-b.price)[0];
  return {tri:tri, smart:sm};
}
function dlSmartTable(){
  const p=dlSmartPrices();
  let sums="";
  if(p.tri&&p.smart){
    const n=24, a=p.tri.price*n, b=p.smart.price*n;
    sums='<div class="dl-maths"><h5>What it actually costs</h5>'
      + '<p>A typical Perth house takes about <b>'+n+' downlights</b>. At our prices that is '
      + '<b>$'+a.toFixed(0)+'</b> ex-GST in tricolour, or <b>$'+b.toFixed(0)+'</b> ex-GST if you make every one of them smart '
      + '\u2014 <b>$'+(b-a).toFixed(0)+' extra</b>, for colour you will change twice and then leave on white.</p>'
      + '<p>Do the living room and the main bedroom smart. Run everything else tricolour. '
      + 'You get the part you will actually use for about <b>$'+((p.smart.price-p.tri.price)*8).toFixed(0)+'</b> more, not $'+(b-a).toFixed(0)+'.</p></div>';
  }
  return '<table class="dl-smart"><thead><tr><th>Room</th><th>Smart worth it?</th><th>Why</th></tr></thead><tbody>'
    + DL_SMART_ADVICE.map(function(r){
        const lbl={yes:"Yes",maybe:"Maybe",no:"No"}[r[1]];
        return '<tr><th scope="row">'+r[0]+'</th><td><span class="dl-verdict dl-v-'+r[1]+'">'+lbl+'</span></td><td>'+r[2]+'</td></tr>';
      }).join("")
    + '</tbody></table>' + sums;
}
function dlIPSVG(){
  return '<svg viewBox="0 0 240 96" role="img" aria-label="IP ratings: which fitting suits which area">'
    + [["IP20","Dry rooms only","#c9c6b8",14],["IP44/54","Splash resistant","#9aa08d",90],["IP65","Steam & weather","#2C6B45",166]]
      .map(function(t){
        return '<rect x="'+t[3]+'" y="14" width="60" height="34" fill="'+t[2]+'" opacity=".22" stroke="'+t[2]+'" stroke-width="1.5"/>'
             + '<text x="'+(t[3]+30)+'" y="35" font-size="13" font-weight="700" text-anchor="middle" fill="#15170F">'+t[0]+'</text>'
             + '<text x="'+(t[3]+30)+'" y="64" font-size="9.5" text-anchor="middle" fill="#5d6151">'+t[1].split(" ")[0]+'</text>'
             + '<text x="'+(t[3]+30)+'" y="76" font-size="9.5" text-anchor="middle" fill="#5d6151">'+t[1].split(" ").slice(1).join(" ")+'</text>';
      }).join("")
    + '</svg>';
}
const DL_GUIDE=[
 {n:"01", t:"The hole in the ceiling", a:"Cut-out is the hole, not the fitting.",
  body:function(){
    return dlCutSVG(null)
      + '<p>Every downlight is sold by its <b>cut-out</b> \u2014 the hole the electrician saws in the plasterboard. '
      + 'The fitting itself is always a bit wider, because it has to cover the edge of the hole.</p>'
      + '<p>Replacing old halogens? Put a tape across an existing hole, edge to edge. That number is the only one that matters. '
      + 'Building new? <b>90&#8201;mm</b> is the Australian standard and has by far the most choice.</p>'
      + '<p class="dlg-do">Bigger hole = brighter fitting = fewer of them. A 90&#8201;mm does a bedroom; a 200&#8201;mm is for a shop floor or a double-height void.</p>';
  }},
 {n:"02", t:"Low glare vs standard", a:"Do you want to see the light, or see the globe?",
  body:function(){
    return dlGlarePhoto()
      + '<p>A <b>standard</b> downlight puts the LED right at the ceiling face and spreads it 100\u2013110\u00b0. '
      + 'It is bright, it is even, and it is cheap \u2014 but sit on the couch, glance up, and there is a bright dot burning at you.</p>'
      + '<p>A <b>low glare</b> downlight sets the LED about 20&#8201;mm back behind a dark baffle and narrows the beam to roughly 60\u00b0. '
      + 'Stand under it and the ceiling looks almost dark; the light lands on the floor and the furniture instead of in your eyes.</p>'
      + dlGlarePair(true)
      + '<p class="dlg-do"><b>The trade-off is simple.</b> A narrower beam covers less floor, so a low glare room needs a few more fittings '
      + 'and costs a bit more. Worth it where you sit still and look up \u2014 living, bedrooms, media rooms, over a bench. '
      + 'Not worth it in a hallway or a garage, where you just want light on the ground.</p>';
  }},
 {n:"03", t:"Warm, natural or cool", a:"One switch on the back sets it. Pick it once.",
  body:function(){
    return dlTempSVG()
      + '<p>Nearly everything we sell is <b>tricolour</b> (also written CCT). There is a tiny slide switch on the back of the fitting. '
      + 'Your electrician flicks it to warm, natural or cool before it goes in the ceiling, and that is the end of it.</p>'
      + '<p>It costs nothing extra and it means you cannot get it wrong at the ordering stage \u2014 if the kitchen looks too yellow, '
      + 'the fitting comes down for thirty seconds and goes back up.</p>'
      + '<p class="dlg-do">Keep it consistent within a sightline. Warm in the living room and cool in the adjoining kitchen '
      + 'reads as a mistake, not a feature.</p>';
  }},
 {n:"04", t:"Smart lights \u2014 where they earn their keep", a:"Two rooms, not the whole house.",
  body:function(){
    return '<p>Both standard and low glare fittings come in smart versions, and they do work well. '
      + 'The mistake is buying them everywhere.</p>'
      + '<p>A smart downlight lets you dim it, change its colour and set scenes from your phone or a voice assistant. '
      + 'That is genuinely good in a room you sit in at night. In a kitchen or a bathroom you want full brightness the moment '
      + 'you walk in \u2014 reaching for a phone to turn a light on is slower than the switch that was already there.</p>'
      + dlSmartTable()
      + '<p class="dlg-do">Wiring a whole house smart is the single most common way people overspend on lighting. '
      + 'Do the rooms you relax in. Leave the working rooms on a switch.</p>';
  }},
 {n:"05", t:"How many, and where to put them", a:"Off the walls first, then evenly between.",
  body:function(){
    return dlGridSVG()
      + '<p>The usual mistake is a light dead-centre in the room. One fitting in the middle lights the floor and leaves '
      + 'every wall, and every picture on it, in shadow.</p>'
      + '<p>Set the outer row <b>700\u2013850&#8201;mm off the walls</b> so the light washes down them, then space the rest '
      + 'about <b>half your ceiling height</b> apart. On a standard 2.7&#8201;m ceiling that is roughly 1.3\u20131.4&#8201;m between fittings.</p>'
      + '<p class="dlg-do">Low glare fittings throw a narrower cone, so the same room wants a couple more of them. '
      + 'The finder works your count out from the table our team uses on site \u2014 tell it the room size and it will tell you the number.</p>';
  }}
];
function renderDlGuide(){
  const host=$("#dlGuide"); if(!host) return;
  /* Card grid, all closed. Click one and it expands across the full width
     underneath, so the guide is a compact index until you want detail. */
  host.innerHTML='<div class="dlg-grid">'+DL_GUIDE.map(function(g,i){
    return '<button type="button" class="dlg-card" data-dlg="'+i+'">'
      + '<span class="dlg-n">'+g.n+'</span>'
      + '<span class="dlg-t">'+g.t+'</span>'
      + '<span class="dlg-a">'+g.a+'</span>'
      + '</button>';
  }).join("")+'</div><div class="dlg-open" id="dlgOpen" hidden></div>';
}
let dlgOpenIdx=null;
function dlGuideOpen(i){
  const host=$("#dlgOpen"); if(!host) return;
  const cards=$$("#dlGuide .dlg-card");
  if(dlgOpenIdx===i){                       /* clicking the open one closes it */
    dlgOpenIdx=null; host.hidden=true; host.innerHTML="";
    cards.forEach(function(c){ c.classList.remove("on"); });
    return;
  }
  dlgOpenIdx=i;
  const g=DL_GUIDE[i];
  cards.forEach(function(c){ c.classList.toggle("on", +c.dataset.dlg===i); });
  host.hidden=false;
  host.innerHTML='<div class="dlg-open-hd">'
    + '<span class="dlg-n">'+g.n+'</span><h4>'+g.t+'</h4>'
    + '<button type="button" class="dlg-x" data-dlgclose="1" aria-label="Close">\u00d7</button></div>'
    + '<div class="dlg-body">'+g.body()+'</div>';
  host.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function renderDownlights(){
  renderDlChips();
  renderDlGuide();
  const host=$("#dlGrid");
  const list=dlFiltered();
  /* Show about eight; the full range lives on the downlights page.
     Capped 1 Sep 2026 \u2014 the page was getting too long. */
  const shown=list.slice(0,8);
  if(host) host.innerHTML=list.length
    ? shown.map(cardHTML).join("")
      +(list.length>shown.length
        ? '<div class="grid-more"><a class="btn-more" href="/products/lighting-perth/led-downlights-perth/">See all '+list.length+' downlights \u2192</a></div>'
        : '')
    : '<p class="dl-empty">Nothing online in that combination \u2014 call our Perth team on (08) 9297 2969 and we\u2019ll check the warehouse.</p>';
  repaintLive();
  const help=$("#dlHelp");
  if(help){
    help.innerHTML=
      '<div class="dl-help-card">'+dlCutSVG(null).replace(/^<figure class="dl-cutfig">/,"").replace(/<figcaption>[\s\S]*$/,"")
        + '<h4>Cut-out is the hole, not the fitting</h4><p>We stock 70&#8201;mm through to 200&#8201;mm+. Measure an existing hole edge to edge \u2014 most Perth ceilings are 90mm.</p></div>'
      + '<div class="dl-help-card">'+dlGlareSVG("low")
        + '<h4>Low glare vs standard</h4><p>Low glare sets the LED back behind a baffle and narrows the beam to 60\u00b0. Standard sits at the face and spreads 100\u2013110\u00b0. The finder shows both side by side.</p></div>'
      + '<div class="dl-help-card">'+dlGridSVG()
        + '<h4>How many, and where</h4><p>Tell the finder your room size and it works the count out from the table our team uses on site \u2014 700\u2013850&#8201;mm off the walls, spaced about half the ceiling height.</p></div>';
  }
}

