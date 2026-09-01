/* ============================================================
   home/07-strip-light-finder.js
   the STRIP LIGHT FINDER: 4 questions to a strip + transformer + controller kit, priced
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- STRIP LIGHT FINDER ---------- */
/* Both of these land on the 24V Long Run COB: the "long run" answer directly, and a
   ceiling recess too tight for the chunky 240V strip. */
function swIsLongRun(a){ return a.place==="longrun"||(a.place==="cove"&&a.space==="tight"); }
const STRIP_Q=[
 {q:"Where exactly is the strip light going?",key:"place",
  hint:"Simple rule: if steam or water can ever reach it, it needs the IP65 wet-area strip. Dry joinery (inside shelving & cabinets) doesn\u2019t need waterproofing at all.",
  opts:[
   ["Recessed ceiling / cove (a hidden shelf or bulkhead in the ceiling)","cove"],
   ["Wet areas \u2014 kitchen benchtops, bathroom niches, outdoors (steam or water)","wet"],
   ["Shelving & cabinets \u2014 dry inside joinery (no water can reach it)","cabinet"],
   ["Stairs or hallway","stairs"],
   ["Long run strip light \u2014 one continuous line over about 10 metres","longrun"],
   ["Somewhere else","other"]]},
 {q:"How much flat space is inside your ceiling recess?",key:"space",
  when:function(a){return a.place==="cove";},
  hint:"240V strip sits on a shelf inside the recess. Have a look inside yours \u2014 which one is it?",
  extra:function(){ return coveDiagramPair(); },
  opts:[
   ["Yes \u2014 there\u2019s a flat shelf about 150mm across","roomy"],
   ["No \u2014 it\u2019s tighter than that, or I\u2019m not sure","tight"]]},
 {q:"How bright does this spot need to be?",key:"bright",
  when:function(a){return a.place==="wet";},
  hint:"Both are the sealed IP65 wet-area strip. Standard is plenty for benchtops and niches. Go bright (20W/m) where you want it to really pop \u2014 a bright bathroom, a feature wall, or task light over a big bench.",
  opts:[
   ["Standard brightness \u2014 12W/m","std"],
   ["Bright \u2014 20W/m (make it stand out)","bright20"]]},
 {q:"What colour light do you want?",key:"colour",
  /* Long Run COB is a tri-colour strip switched from the remote, so there is no
     colour to choose - both routes to it skip this question. */
  when:function(a){ return !swIsLongRun(a); },
  hint:function(a){ return a.place==="cove"
    ? "240V is IP65 and comes in three fixed whites \u2014 3000K warm, 4000K natural and 6000K cool \u2014 or full-colour RGB. You pick the colour at order: it is a different strip per colour, not a switchable one. Single colour is Triac dimmable; RGB gives full colour and dimming from a remote, with an RGB Gateway available if you want smart control."
    : a.place==="wet"
    ? (a.bright==="bright20"
       ? "The 20W/m bright variant is only made in two colours \u2014 4000K natural and 5500K crisp. Need warm 3000K? Go back and pick standard brightness."
       : "Wet areas use the 24V High Lumen SMD, IP65. At 12W/m it comes in 2700K, 3000K, 4000K and 5500K ($18/m) and needs no aluminium channel; at 20W/m in 4000K and 5000K. Pick one at order \u2014 there is no RGB or switchable white in this range.")
    : "Fixed whites come in 2700/3000K (warm & cosy), 4000K (natural) and 5500/6000K (crisp). CCT = adjust warm\u2194cool (2700\u20136500K) with the remote. RGB = millions of colours \u2014 note its white is less natural than a dedicated white strip."; },
  opts:function(a){ return a.place==="cove"
    /* 240V IP65: three fixed whites plus RGB. Colour is chosen at order -
       it is one strip per colour, not a switchable one. */
    ? [["Warm white \u2014 3000K","w3000"],["Natural white \u2014 4000K","w4000"],["Cool white \u2014 6000K","w6000"],["Full colour (RGB)","rgb"]]
    : a.place==="wet"
    ? (a.bright==="bright20"
       /* IP65 at 20W/m comes in two whites */
       ? [["Natural white \u2014 4000K","w4000"],["Bright white \u2014 5000K","w5000"]]
       /* IP65 at 12W/m comes in four */
       : [["Extra warm \u2014 2700K","w2700"],["Warm white \u2014 3000K","w3000"],["Natural white \u2014 4000K","w4000"],["Crisp white \u2014 5500K","w5500"]])
    : [["One fixed white (pick warm, natural or cool)","single"],
       ["Adjustable white \u2014 warm \u2194 cool with the remote (CCT)","cct"],
       ["Full colour (RGB) \u2014 millions of colours","rgb"]]; }},
 {q:"How do you want to control it?",key:"control",
  when:function(a){return a.place!=="cove"&&!swIsLongRun(a);},
  hint:function(a){ return a.colour==="rgb"
    ? "Either way you get a controller in the kit \u2014 it's the box that lets you change colour, dim the light and turn it on and off. The only difference is how you talk to it: a handheld remote, or your phone."
    : "Either way you get a controller in the kit \u2014 it's the box that lets you dim the light and turn it on and off. The only difference is how you talk to it: a handheld remote, or your phone."; },
  opts:[["Simple \u2014 with a remote","simple"],["Smart \u2014 from the phone app","smart"]]},
 {q:"How many metres do you need?",key:"length",input:true,
  hint:function(a){ return swIsLongRun(a)
    ? "Type your run length in metres. The Long Run COB is made for long runs \u2014 5 metres and up. Shorter than that and we\u2019ll point you at a better-suited strip, so give us a call."
    : a.place==="cove"
    ? "Type your exact run length. 240V recessed strip: whites 10\u201350m, RGB 10\u201335m. Under 10 metres? We\u2019ll ask you to give us a quick call \u2014 (08) 9297 2969."
    : "Type your run length in metres. 24V strip feeds from one end up to 5m; 5\u201310m needs power from TWO points (e.g. two corners). Over 10 metres? We\u2019ll ask you to give us a quick call."; }},
];
/* Cove cross-section diagrams for the recess question. Redrawn as SVG from the
   supplier's CORRECT / INCORRECT drawings. Kept deliberately label-light so the
   two sit side by side and stay legible - the explanation lives in one caption
   underneath rather than crowded inside the drawings. */
function coveDiagram(kind){
  const CEIL='#15170F', LIGHT='#F2C230', STRIP='#E07B39', DIM='var(--muted)', BAD='#C4453B';
  function hatch(x1,x2,y){
    let o='<line x1="'+x1+'" y1="'+y+'" x2="'+x2+'" y2="'+y+'" stroke="'+CEIL+'" stroke-width="3"/>';
    for(let x=x1+7;x<x2;x+=15) o+='<line x1="'+x+'" y1="'+y+'" x2="'+(x-9)+'" y2="'+(y-10)+'" stroke="'+CEIL+'" stroke-width="1.8"/>';
    return o;
  }
  if(kind==="correct"){
    return '<svg viewBox="0 0 260 150" role="img" aria-label="Enough room: strip on the back edge washes light across the ceiling">'
      + hatch(20,246,40)
      + '<path d="M46 40 V104 H182 V70" fill="none" stroke="'+CEIL+'" stroke-width="3.4"/>'
      + '<path d="M62 86 L74 46 H240 V54 H76 Z" fill="'+LIGHT+'" opacity=".9"/>'
      + '<rect x="48" y="86" width="13" height="18" fill="'+STRIP+'"/>'
      + '<path d="M196 50 h44 m0 0 l-7 -4 m7 4 l-7 4" stroke="#2C6B45" stroke-width="1.8" fill="none"/>'
      + '<line x1="46" y1="118" x2="182" y2="118" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<line x1="46" y1="113" x2="46" y2="123" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<line x1="182" y1="113" x2="182" y2="123" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<text x="114" y="136" font-size="14" fill="'+DIM+'" text-anchor="middle">150&#8201;mm</text>'
      + '<line x1="192" y1="70" x2="192" y2="104" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<line x1="187" y1="70" x2="197" y2="70" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<line x1="187" y1="104" x2="197" y2="104" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<text x="202" y="92" font-size="14" fill="'+DIM+'">50&#8201;mm</text>'
      + '</svg>';
  }
  return '<svg viewBox="0 0 260 150" role="img" aria-label="Too tight: the front lip blocks the light before it reaches the ceiling">'
    + hatch(20,246,40)
    + '<path d="M46 40 V114 H140 V52" fill="none" stroke="'+CEIL+'" stroke-width="3.4"/>'
    + '<path d="M62 96 L74 58 H138 V66 H76 Z" fill="'+LIGHT+'" opacity=".55"/>'
    + '<rect x="48" y="96" width="13" height="18" fill="'+STRIP+'"/>'
    + '<line x1="140" y1="52" x2="140" y2="116" stroke="'+BAD+'" stroke-width="3.4"/>'
    + '<path d="M152 66 l20 20 m0 -20 l-20 20" stroke="'+BAD+'" stroke-width="3"/>'
    + '<line x1="46" y1="128" x2="140" y2="128" stroke="'+DIM+'" stroke-width="1.2"/>'
    + '<line x1="46" y1="123" x2="46" y2="133" stroke="'+DIM+'" stroke-width="1.2"/>'
    + '<line x1="140" y1="123" x2="140" y2="133" stroke="'+DIM+'" stroke-width="1.2"/>'
    + '<text x="93" y="146" font-size="14" fill="'+DIM+'" text-anchor="middle">under 150&#8201;mm</text>'
    + '</svg>';
}
function coveDiagramPair(){
  return '<div class="cove-wrap">'
    + '<div class="cove-dia">'
    + '<figure><span class="cd-tag cd-ok">\u2713 Enough room</span>'+coveDiagram("correct")+'</figure>'
    + '<figure><span class="cd-tag cd-bad">\u2715 Too tight</span>'+coveDiagram("tight")+'</figure>'
    + '</div>'
    + '<p class="cove-cap">The strip sits on the back edge and throws light <b>across</b> the ceiling. '
    + 'With a shelf around 150&#8201;mm wide and a lip under ~50&#8201;mm you get an even wash; in a narrower, '
    + 'deeper recess the lip blocks it and you just see a bright stripe.</p>'
    + '</div>';
}
let swAnswers={}, swStep=0, swShown=false, swTimer=null, swPackageStrip=null, swPkgSel={};
function swVisibleQs(){ return STRIP_Q.filter(function(q){ return !q.when||q.when(swAnswers); }); }
function stripIP(p){
  const hay=((p.specTable||[]).map(r=>r[1]).join(" ")+" "+p.name).toLowerCase();
  const m=hay.match(/ip\s?(\d{2})/);
  return m?parseInt(m[1],10):20;
}
function stripPool(){
  return PRODUCTS.filter(function(p){ return p.cat==="strip" && /strip/i.test(p.name) && !/suspension|modular|channel|transformer|controller|remote/i.test(p.name); });
}
/* Real facts per strip family — from the Greenhse "Understanding Strip Lighting" guide */
function stripFacts(p){
  const n=p.name.toLowerCase(); const ip=stripIP(p);
  if(n.includes("240v")){ const rgb240=n.includes("rgb"); return {fam:"240V", wpm:10, wpmTxt:"240V driver included", min:10, single:rgb240?35:50, dual:rgb240?35:50, channel:"none",
    spec:rgb240?"240V RGB \u00b7 IP65 \u00b7 runs 10\u201335m \u00b7 $60 driver included \u00b7 remote only \u00b7 no channels":"240V \u00b7 IP65 \u00b7 3000/4000/6000K or blue \u00b7 runs 10\u201350m \u00b7 $60 driver included \u00b7 remote only \u00b7 no channels",
    ipTxt:"IP65 \u2014 fine with dust & splashes",
    where:"Recessed ceilings \u2014 long runs of 10 metres or more",
    teach:["$60 240V driver INCLUDED \u2014 powers it straight from mains",
      rgb240?"Long runs only: 10\u201335 metres (RGB)":"Long runs only: 10\u201350 metres \u2014 under 10m? Call us",
      rgb240?"Full colour from the remote":"Fixed colour white \u2014 pick warm, natural or cool",
      "Remote control only \u2014 can\u2019t be made smart",
      "Straight runs in a roomy recess \u2014 no bends"]}; }
  if(n.includes("long run")) return {fam:"LONGRUN", wpm:7.5, single:20, dual:40, channel:"optional",
    spec:"24V COB long-run \u00b7 7.5W/m \u00b7 20m one feed / 40m both ends",
    ipTxt: ip>=67?"IP67 \u2014 built for outdoors":"IP20 \u2014 dry indoor spots",
    where:"Cabinetry, balustrades, hidden recesses \u2014 IP67 version for gardens, floating steps & under decks",
    teach:["Super low power (7.5W per metre) \u2014 runs cool",
      "Up to 20m from ONE end with no fading",
      "Up to 40m if you power BOTH ends",
      "Thin, flexible and easy to install"]};
  if(n.includes("rgb")&&n.includes("cob")) return {fam:"RGBCOB", wpm:16, single:5, dual:10, channel:"required",
    spec:"24V RGB COB \u00b7 dot-less \u00b7 16W/m IP20 (15W/m IP65) \u00b7 5m one feed / 10m both ends",
    ipTxt: ip>=65?"IP65 \u2014 handles steam & splashes":"IP20 \u2014 dry indoor spots",
    where:"Under kitchen cabinets, bars, bulkheads, shelving \u2014 anywhere you want colour",
    teach:["Dot-less: one smooth line of colour, no visible LED dots",
      "Millions of colours + a good cool-white",
      "Feed one end up to 5m; power BOTH ends for up to 10m",
      "16W per metre \u2014 needs an aluminium channel to stay cool"]};
  if(n.includes("cob")) return {fam:"CCTCOB", wpm:16, single:5, dual:10, channel:"required",
    spec:"24V CCT COB \u00b7 dot-less \u00b7 16W/m \u00b7 IP20 \u00b7 2700\u20136500K \u00b7 5m one feed / 10m both ends",
    ipTxt:"IP20 \u2014 dry indoor spots",
    where:"Cabinets, shelving, bulkheads \u2014 beautiful smooth white light",
    teach:["Dot-less: one clean line of light, no spotty dots",
      "Adjustable warm \u2194 cool white (2700K\u20136500K) with the remote",
      "Feed one end up to 5m; power BOTH ends for up to 10m",
      "16W per metre \u2014 needs an aluminium channel to stay cool"]};
  if(n.includes("high lumen")){
    const b20=(typeof swAnswers!=="undefined"&&swAnswers.bright==="bright20");
    return {fam:"HILUMEN", wpm:b20?20:12, bright20:b20,
    wpmTxt:"High Lumen SMD \u00b7 "+(b20?"20W/m":"12W/m")+" IP65 wet-area strip", single:5, dual:10, channel:"required",
    spec:"24V High Lumen SMD \u00b7 150 lumens per watt \u00b7 CRI 90+ \u00b7 "+(b20?"20W/m (extra bright) \u2014 4000K & 5500K only":"12W/m")+" IP65 \u00b7 fixed whites 3000/4000/5500/6000K \u00b7 5m one feed / 10m both ends",
    ipTxt:"IP65 \u2014 sealed against kitchen & bathroom steam",
    where:"All wet areas \u2014 kitchen benchtops, bathroom niches & outdoors \u2014 plus bars, shelving & display",
    teach:[b20?"Extra-bright 20W/m in IP65 \u2014 for spots that need to really stand out (bright bathrooms, feature walls, big benches)"
              :"The wet-area pick: 12W/m in IP65 \u2014 sealed against steam, splashes & weather",
      "Fixed single-colour whites (3000/4000/5500/6000K) \u2014 no RGB in this range",
      "True-colour light (CRI 90+) \u2014 things look their real colour",
      "150 lumens per watt \u2014 about "+(b20?"3,000":"1,800")+" lumens every metre",
      "Feed one end up to 5m; power from 2 points (e.g. 2 corners) for 5\u201310m"]};
  }
  if(n.includes("rgb")) return {fam:"RGB", wpm:16, single:5, dual:10, channel: ip>=67?"none":"required",
    spec:"24V RGB SMD \u00b7 16W/m \u00b7 IP"+ip+" \u00b7 5m one feed / 10m both ends",
    ipTxt: ip>=67?"IP67 \u2014 fully weatherproof for outdoors":"indoor colour strip",
    where: ip>=67?"Outdoor areas, exterior features, pool & waterfall surrounds":"Feature colour lighting",
    teach:["Full colour \u2014 millions of options from the remote or app",
      ip>=67?"IP67 weather-sealed \u2014 rain and splash proof":"For dry indoor areas",
      "Feed one end up to 5m; power BOTH ends for up to 10m"]};
  return {fam:"STD", wpm:10, single:5, dual:10, channel:"required",
    spec:"24V strip \u00b7 IP"+ip+" \u00b7 5m one feed / 10m both ends",
    ipTxt: ip>=65?"IP65 \u2014 splash resistant":"IP20 \u2014 dry indoor spots",
    where:"General indoor strip lighting",
    teach:["Feed one end up to 5m; power BOTH ends for longer runs",
      "Sits in an aluminium channel for a clean, cool, dot-free line"]};
}
function stripScore(p,a){
  if(a&&a.colour&&(a.colour[0]==="w"||a.colour==="blue")) a=Object.assign({},a,{colour:"single"});
  let s=0; const n=(p.name||"").toLowerCase(); const ip=stripIP(p); const f=stripFacts(p);
  s+=2;
  // 240V: ONLY recessed ceilings, and ONLY if the recess has room
  if(f.fam==="240V"){
    const L=parseInt(a.length)||0;
    if(a.place!=="cove"||a.space==="tight") s-=100;      // recessed ceilings only, with room
    else if(a.control==="smart") s-=100;                 // remote-control only
    else if(a.colour==="cct") s-=100;                    // fixed colour \u2014 no adjustable white
    else if(L&&L<(f.min||5)) s-=100;                     // long runs only: 10m minimum
    else if(L&&L>f.single) s-=100;                       // white tops out at 50m, RGB at 35m
    else s+=6; }
  // location rules (straight from the selection guide)
  if(a.place==="wet"){ s+= f.fam==="HILUMEN"?10:-100; }                                 // wet areas: High Lumen SMD ONLY
  else if(a.place==="outdoor"){ s+= ip>=67?8:(ip>=65?2:-8); if(f.fam==="LONGRUN"&&ip>=67)s+=3; if(f.fam==="RGB"&&ip>=67)s+=3; }
  else if(a.place==="cabinet"){ if(f.fam==="CCTCOB"||f.fam==="RGBCOB")s+=3; if(f.fam==="HILUMEN")s+=2; }
  else if(a.place==="cove"){ if(f.fam==="CCTCOB"||f.fam==="HILUMEN"||f.fam==="LONGRUN")s+=2; }
  else { if(ip<=24)s+=1; }
  // colour
  if(a.colour==="rgbw"){ if(n.includes("rgbw"))s+=6; else if(n.includes("rgb"))s+=3; else s-=8; }
  else if(a.colour==="rgb"){ if(n.includes("rgb"))s+=6; else s-=8; }
  else if(a.colour==="cct"){ if(f.fam==="CCTCOB")s+=8; else if(n.includes("cct")||n.includes("dual"))s+=6; else if(f.fam==="240V")s-=100; else s-=100; }
  else if(a.colour==="single"){
    // COB strips are CCT (warm\u2194cool) or RGB by design \u2014 a fixed single colour is always the SMD strip
    // "a fixed single colour is always SMD, never COB" targets the CCT and RGB
    // COB strips, which are adjustable/colour by design. The long-run COB is a
    // fixed-colour strip, so it stays eligible.
    // "a fixed single colour is always SMD, never COB" still holds for normal
    // runs. The long-run COB is the deliberate exception, and only where it is
    // actually the right product: runs of 8m+, or a recess too tight for 240V.
    const _len=parseInt(a.length)||0;
    const _longJob=_len>=8||(a.place==="cove"&&a.space==="tight");
    if(f.fam==="LONGRUN"){ s+= _longJob?4:-100; }
    else if(f.fam==="CCTCOB"||f.fam==="RGBCOB"||n.includes("cob")) s-=100;
    else if(n.includes("rgb")) s-=100;
    else if(f.fam==="HILUMEN") s+=8;
    else s+=4; }
  // control
  if(a.control==="smart"){ if(n.includes("smart")||n.includes("wifi")||f.fam==="CCTCOB"||n.includes("rgb"))s+=1; }
  // length vs feed limits
  const len=parseInt(a.length)||0;
  if(len>f.dual) s-=4;                       // needs segmenting — deprioritise
  // Long runs: from 8 metres up the low-power long-run COB is the right answer
  // (one feed carries 20m). 240V still wins for a roomy recess at 10m+.
  if(len>=8 && f.fam==="LONGRUN") s+=5;
  if(len>=10){ if(f.fam==="240V"&&a.place==="cove"&&a.space!=="tight")s+=3; }
  // A tight ceiling recess cannot take the chunky 240V strip - the thin
  // long-run COB is what fits.
  if(a.place==="cove"&&a.space==="tight"){ if(f.fam==="LONGRUN")s+=12; if(f.fam==="240V")s-=100; }
  return s;
}
function stripWperM(p){ return stripFacts(p).wpm; }
function stripVolt(p){ const n=p.name.toLowerCase();
  if(n.includes("240v"))return"240V"; if(n.includes("24v"))return"24V"; if(n.includes("12v"))return"12V"; return"24V"; }
function findP2(id){ return PRODUCTS.find(p=>p.id===id); }
function optByKw(prod,kws){ if(!prod||!prod.options)return null;
  for(const kw of kws){ const o=prod.options.find(o=>o.label.toLowerCase().includes(kw.toLowerCase())); if(o)return o; }
  return prod.options[0]; }
function optByWatt(prod,needW){ if(!prod||!prod.options)return null;
  let best=null; for(const o of prod.options){ const m=o.label.match(/(\d+)\s*W/); if(m){const w=+m[1]; if(w>=needW&&(!best||w<best.w))best={o,w};} }
  if(best)return best.o;
  let lg=null; for(const o of prod.options){ const m=o.label.match(/(\d+)\s*W/); if(m){const w=+m[1]; if(!lg||w>lg.w)lg={o,w};} }
  return lg?lg.o:prod.options[0]; }
function pkOpt(prod,def){
  const sel=swPkgSel[prod.id];
  if(sel!=null&&prod.options){ const o=prod.options.find(o=>o.label===sel); if(o) return o; }
  return def;
}
function buildPackage(strip,a){
  const rawCol=a&&a.colour;
  const COL_LBL={w2700:"2700K extra warm",w3000:"3000K warm white",w4000:"4000K natural white",w5000:"5000K bright white",w5500:"5500K crisp white",w6000:"6000K cool white",blue:"Blue"};
  if(rawCol&&(rawCol[0]==="w"||rawCol==="blue")) a=Object.assign({},a,{colour:"single"});
  const len=parseInt(a.length)||5; const items=[]; const notes=[]; const f=stripFacts(strip);
  const volt=stripVolt(strip);
  items.push({p:strip,opt:null,unit:strip.price,qty:len,label:strip.name,sub:len+" m run \u00b7 "+(COL_LBL[rawCol]?COL_LBL[rawCol]+" \u00b7 ":"")+(f.wpmTxt||f.wpm+"W per metre")});
  const needW=Math.ceil(f.wpm*len*1.2);
  let feed="one";
  if(volt==="240V"){
    const drv=findP2("TR240V-DRIVER");
    if(drv){ items.push({p:drv,opt:null,unit:drv.price,qty:1,label:drv.name,sub:"Included in every 240V kit \u2014 powers the strip straight from 240V mains",pick:"driver"}); }
    notes.push("240V strip comes with its $60 240V driver included \u2014 it powers the strip straight from normal mains power. Long runs only: minimum 10m, up to "+f.single+"m on one feed. Recessed ceilings only \u00b7 remote-control only \u00b7 straight runs, no bends \u00b7 no channels (it\u2019s thicker and sits straight in the recess).");
    if(len<10) notes.push("240V comes in 10 metres or more \u2014 your "+len+"m run is under that. Call us on (08) 9297 2969 and we\u2019ll sort the right option.");
  } else {
    const tr=findP2(volt==="12V"?"TR12V-ALL":"TR24V-ALL");
    if(tr){
      if(len<=f.single){
        const o=pkOpt(tr,optByWatt(tr,needW));
        items.push({p:tr,opt:o,unit:o.price,qty:1,label:tr.name,sub:o.label+" \u2014 sized for ~"+needW+"W",pick:"driver"});
        notes.push("One driver, wired to one end \u2014 all your "+len+"m run needs (good up to "+f.single+"m from a single feed).");
      } else if(len<=f.dual){
        feed="both";
        const each=Math.max(120,Math.ceil(needW/2));
        const o=pkOpt(tr,optByWatt(tr,each));
        items.push({p:tr,opt:o,unit:o.price,qty:2,label:tr.name,sub:o.label+" \u2014 one at EACH end of the run",pick:"driver"});
        notes.push("Your run is over "+f.single+"m, so it\u2019s powered from BOTH ends \u2014 keeps the light even with no fading. Good up to "+f.dual+"m this way.");
      } else {
        feed="both";
        const o=pkOpt(tr,optByKw(tr,["120w"]));
        items.push({p:tr,opt:o,unit:o.price,qty:2,label:tr.name,sub:o.label+" \u2014 one at EACH end, per segment",pick:"driver"});
        notes.push("Over "+f.dual+"m: we split it into shorter powered sections. Give us a call on (08) 9297 2969 and we\u2019ll map it out.");
      }
      notes.push("For long runs, two smaller drivers (one each end) work better than one big one.");
    }
  }
  const smart = a.control==="smart" && volt!=="240V";   // 240V can never be smart
  if(volt==="240V"){
    // 240V strip is remote-control ONLY: no controller, no app — just the right remote.
    if(a.control==="smart") notes.push("240V strip is remote-control only \u2014 no app. We\u2019ve included the remote.");
    const r=findP2("REMOTE-CONTROL-GRP");
    if(r){
      const wantRGB=(a.colour==="rgb"||a.colour==="rgbw")||/rgb/i.test(strip.name);
      const o=pkOpt(r,optByKw(r,wantRGB?["4-zone hand remote (rgb+cct) \u00b7 white","4-zone hand"]:["single colour dimming \u00b7 white","single colour"]));
      items.push({p:r,opt:o,unit:o.price,qty:1,label:r.name,sub:o.label+" \u2014 the ONLY way to control 240V strip ("+(wantRGB?"colours & dimming":"dimming")+") \u2014 pick the remote you like",pick:"remote"});
    }
    notes.push("240V needs no controller box \u2014 the remote does everything.");
  }
  else {
    // Controller: WHITE strip \u2192 2-in-1 (never the 3-in-1). RGB strip \u2192 3-in-1 (never the 2-in-1).
    const isRGB = (a.colour==="rgb"||a.colour==="rgbw"||/rgb/i.test(strip.name));
    const c = findP2(isRGB?"RGB-CTRLR-037":"LED-CONTROLLER-SIN");
    if(c){
      const kw = smart ? ["wifi"] : (isRGB ? ["rgb controller","rgb"] : (a.colour==="cct" ? ["dual white","cct"] : ["single colour"]));
      const o = pkOpt(c,optByKw(c,kw));
      const badge = (isRGB?"3 in 1":"2 in 1") + (smart?" \u00b7 2.4GHz SMART":" standard controller");
      const what = smart ? "run everything from the phone app"
        : isRGB ? "changes the colours"
        : a.colour==="cct" ? "adjusts warm \u2194 cool"
        : "dims the strip 1\u2013100%";
      items.push({p:c,opt:o,unit:o.price,qty:1,label:c.name,sub:o.label+" \u2014 "+badge+" \u2014 "+what,pick:"controller"});
    }
    if(!smart){
      const r=findP2("REMOTE-CONTROL-GRP");
      if(r){ const kw = isRGB ? ["4-zone hand remote (rgb+cct) \u00b7 white","4-zone hand"] : ["single colour dimming \u00b7 white","single colour"];
        const o=pkOpt(r,optByKw(r,kw));
        items.push({p:r,opt:o,unit:o.price,qty:1,label:r.name,sub:o.label+(isRGB?"":" \u2014 dims 1\u2013100%"),pick:"remote"}); }
    }
  }
  if(smart) notes.push("Smart kit: the WiFi controller runs everything from your phone \u2014 no remote needed. Prefer buttons? Pick \u2018Simple\u2019 for a remote instead.");
  else if(volt!=="240V") notes.push("The controller sits between the driver and strip. White strips use the 2-in-1; RGB strips use the 3-in-1.");
  const ch=findP2("24VSTRIP-CHANNELS-"); let chQty=0;
  if(ch && f.channel!=="none"){
    const kw=a.place==="cove"?["recess wing","recess"]:a.place==="cabinet"?["mini","surface"]:a.place==="wet"?["recess \u00b7 white","recess"]:["surface \u00b7 white","surface"];
    const o=pkOpt(ch,optByKw(ch,kw)); chQty=Math.max(1,Math.ceil(len/3));
    const optional=f.channel==="optional";
    items.push({p:ch,opt:o,unit:o.price,qty:chQty,label:ch.name,sub:o.label+" ("+chQty+" \u00d7 3m fixed)"+(optional?" \u2014 optional for this strip, but gives a neater finish & longer life":""),pick:"channel"});
  }
  if(volt!=="240V"){
    notes.push("Cut only at the marked scissor lines \u2014 plan your cuts before you start.");
    notes.push("Your strip comes as one continuous length, so a straight run needs no joins. "+
      "If you cut it, rejoin the pieces with a solderless clip connector \u2014 one connector carries "+
      "up to 2.5m of strip. Connectors aren\u2019t included in this kit; ask us and we\u2019ll add them.");
    notes.push("Don\u2019t bend the strip hard around a 90\u00b0 corner \u2014 it cracks the board and "+
      "kills the LEDs. Drill a hole at the corner and drop the strip through it instead.");
  } else {
    notes.push("Got strip left over? Don\u2019t cut it off \u2014 fold the extra back on itself and "+
      "leave it inside the recess. It\u2019s hidden, and you keep the length if you ever move it.");
  }
  if(chQty>0) notes.push("Channels come in fixed 3m lengths \u2014 we\u2019ve allowed "+chQty+" \u00d7 3m for your "+len+"m run. The aluminium track cools the strip and hides the dots.");
  return {items,notes,len,feed,facts:f};
}
/* ---------- install visuals: real photos, SVG fallback ---------- */
function diagPlace(place){
  if(typeof STRIPIMG!=="undefined"&&STRIPIMG.places&&STRIPIMG.places[place]){
    const cap={cove:"Strip sits on the hidden shelf, washing light up the ceiling",
      cabinet:"Strip hides under the cabinet, lighting the benchtop",
      wet:"Strip at the top of the niche \u2014 IP65 so steam is no problem",
      stairs:"Strip tucks under each step nosing",
      other:"Strip runs hidden along the edge, throwing a soft wash of light"}[place]||"";
    return '<figure class="sw-photo"><img src="'+STRIPIMG.places[place]+'" alt="'+cap+'" loading="lazy">'+
      (cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>';
  }
  return diagPlaceSVG(place);
}
function diagPlaceSVG(place){
  const S='stroke="var(--eco)" stroke-width="2" fill="none"', G='fill="var(--glow)" opacity=".85"', GL='fill="var(--glow)" opacity=".22"';
  if(place==="cove") return '<svg viewBox="0 0 300 110"><rect x="10" y="10" width="280" height="8" fill="var(--ink)"/><path d="M10 18 v30 h80 v-14 h14" '+S+'/><rect x="30" y="34" width="52" height="6" rx="2" '+G+'/><ellipse cx="56" cy="24" rx="60" ry="14" '+GL+'/><text x="150" y="95" font-size="11" fill="#5d6151">Strip sits on the hidden shelf, washing light up the ceiling</text></svg>';
  if(place==="cabinet") return '<svg viewBox="0 0 300 110"><rect x="60" y="10" width="180" height="34" fill="var(--ink)"/><rect x="70" y="46" width="160" height="6" rx="2" '+G+'/><ellipse cx="150" cy="66" rx="95" ry="16" '+GL+'/><rect x="40" y="84" width="220" height="8" fill="#cfcabb"/><text x="150" y="105" font-size="11" fill="#5d6151" text-anchor="middle">Strip hides under the cabinet, lighting the benchtop</text></svg>';
  if(place==="wet") return '<svg viewBox="0 0 300 110"><rect x="90" y="10" width="120" height="76" fill="none" stroke="#cfcabb" stroke-width="10"/><rect x="100" y="18" width="100" height="6" rx="2" '+G+'/><ellipse cx="150" cy="50" rx="46" ry="26" '+GL+'/><text x="150" y="104" font-size="11" fill="#5d6151" text-anchor="middle">Strip at the top of the niche \u2014 IP65 so steam is no problem</text></svg>';
  if(place==="stairs") return '<svg viewBox="0 0 300 110"><path d="M20 90 h70 v-24 h70 v-24 h70 v-24 h50" '+S+'/><rect x="26" y="82" width="56" height="5" rx="2" '+G+'/><rect x="96" y="58" width="56" height="5" rx="2" '+G+'/><rect x="166" y="34" width="56" height="5" rx="2" '+G+'/><text x="150" y="106" font-size="11" fill="#5d6151" text-anchor="middle">Strip tucks under each step nosing</text></svg>';
  if(place==="outdoor") return '<svg viewBox="0 0 300 110"><rect x="10" y="70" width="280" height="10" fill="#cfcabb"/><rect x="20" y="62" width="260" height="6" rx="2" '+G+'/><ellipse cx="150" cy="88" rx="120" ry="12" '+GL+'/><path d="M40 40 q6 -14 12 0 q6 -14 12 0" '+S+'/><text x="150" y="104" font-size="11" fill="#5d6151" text-anchor="middle">Weatherproof IP67 strip along the deck / garden edge</text></svg>';
  return '<svg viewBox="0 0 300 110"><rect x="80" y="30" width="140" height="22" fill="none" stroke="var(--eco)" stroke-width="2"/><rect x="88" y="38" width="124" height="6" rx="2" '+G+'/><text x="150" y="80" font-size="11" fill="#5d6151" text-anchor="middle">Strip sits inside an aluminium channel with a frosted cover</text></svg>';
}
function diagRecess240(){
  const S='stroke="var(--eco)" stroke-width="2" fill="none"', G='fill="var(--glow)" opacity=".9"', GL='fill="var(--glow)" opacity=".2"';
  return '<svg viewBox="0 0 320 150"><rect x="10" y="12" width="300" height="8" fill="var(--ink)"/>'+
    '<path d="M10 20 v44 h104 v-20 h20" '+S+'/>'+
    '<rect x="26" y="42" width="72" height="7" rx="2" '+G+'/>'+
    '<ellipse cx="62" cy="30" rx="78" ry="15" '+GL+'/>'+
    '<path d="M104 66 v-14" stroke="#8a8b7e" stroke-width="1" stroke-dasharray="3 3"/>'+
    '<text x="30" y="62" font-size="9.5" fill="#5d6151">strip lies FLAT on a roomy shelf</text>'+
    '<text x="150" y="40" font-size="9.5" fill="#5d6151">open gap \u2014 light washes the ceiling</text>'+
    '<text x="16" y="92" font-size="10" fill="#3c4034" font-weight="600">\u2713 Roomy shelf \u00b7 \u2713 Straight runs, no bends \u00b7 \u2713 Min 10m</text>'+
    '<text x="16" y="110" font-size="9.5" fill="#5d6151">$60 240V driver included \u2014 needs a flat shelf of 50mm (5cm) or more.</text>'+
    '<text x="16" y="128" font-size="9.5" fill="#5d6151">Recess tight or run under 10m? Call (08) 9297 2969 \u2014 we\u2019ll spec 24V instead.</text></svg>';
}
function diagFeed(both){
  const G='fill="var(--glow)"';
  if(!both) return '<svg viewBox="0 0 300 70"><rect x="20" y="22" width="26" height="20" fill="var(--ink)"/><text x="33" y="56" font-size="10" fill="#5d6151" text-anchor="middle">driver</text><rect x="54" y="28" width="220" height="7" rx="2" '+G+'/><path d="M46 32 h8" stroke="var(--eco)" stroke-width="2"/><text x="160" y="18" font-size="11" fill="#5d6151" text-anchor="middle">Power feeds ONE end \u2014 fine for short runs</text></svg>';
  return '<svg viewBox="0 0 300 70"><rect x="14" y="22" width="26" height="20" fill="var(--ink)"/><rect x="260" y="22" width="26" height="20" fill="var(--ink)"/><text x="27" y="56" font-size="10" fill="#5d6151" text-anchor="middle">driver</text><text x="273" y="56" font-size="10" fill="#5d6151" text-anchor="middle">driver</text><rect x="48" y="28" width="204" height="7" rx="2" '+G+'/><path d="M40 32 h8 M252 32 h8" stroke="var(--eco)" stroke-width="2"/><text x="150" y="18" font-size="11" fill="#5d6151" text-anchor="middle">Power feeds BOTH ends \u2014 even light, no fading</text></svg>';
}
function stripInfoBox(pk){
  const f=pk.facts;
  const v240=stripVolt(swPackageStrip)==="240V";
  const rows=[
    ["Exact spec", f.spec],
    ["Best for", f.where],
    ["Water rating", f.ipTxt],
    ["Powered by", v240?"Its own $60 240V driver \u2014 straight from mains":(pk.feed==="both"?"A driver at BOTH ends \u2014 even light the whole way":"One driver feeding one end")],
    ["Mounting", f.channel==="none"?"No channel \u2014 240V strip is thicker and sits straight in the recess":"Aluminium channel with frosted cover \u2014 keeps it cool, hides the dots"],
    ["Max run", (f.single?("Feed one end to "+f.single+"m; "+f.dual+"m powered both ends"):"")]
  ].filter(r=>r[1]);
  const specHTML='<div class="ib-specs">'+rows.map(r=>'<div class="ib-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>').join("")+'</div>';
  const teachHTML=(f.teach&&f.teach.length)?'<div class="ib-teach"><h5>Good to know</h5><ul>'+f.teach.map(t=>'<li>'+t+'</li>').join("")+'</ul></div>':"";
  const G=(typeof STRIPIMG!=="undefined"&&STRIPIMG.guides)?STRIPIMG.guides:{};
  const guideHTML=(G.ip||G.install)?'<div class="ib-guides"><h5>Datasheets &amp; install</h5>'+
    (G.ip?'<figure><img src="'+G.ip+'" alt="IP protection grades" loading="lazy"><figcaption>IP grades \u2014 IP20 dry \u00b7 IP65 splashes \u00b7 IP67 outdoors \u00b7 IP68 submersible.</figcaption></figure>':'')+
    (G.install?'<figure><img src="'+G.install+'" alt="6-step install guide" loading="lazy"><figcaption>6-step install \u2014 clean, press, cut on the marks, mount on aluminium. Licensed electrician only.</figcaption></figure>':'')+
    (G.caution?'<figure><img src="'+G.caution+'" alt="Handling cautions" loading="lazy"><figcaption>Never bend under a 50mm radius, never fold or twist, always use the proper driver.</figcaption></figure>':'')+
    '</div>':"";
  const demoHTML=demoPanel(swPackageStrip?swPackageStrip.id:"");
  return '<details class="infobox" open><summary><span class="ib-ico">\u2139</span> Full details of this strip light<span class="ib-chev">\u25be</span></summary>'+
    '<div class="ib-body">'+demoHTML+specHTML+teachHTML+
    '<details class="ib-sub"><summary>Strip lighting 101 \u2014 30-second crash course</summary><ul class="ib-101">'+
      '<li><b>Brightness</b> is watts per metre \u2014 more W/m = brighter.</li>'+
      '<li><b>Colour:</b> 2700\u20133000K warm \u00b7 4000K natural \u00b7 6000K crisp. CCT adjusts it; RGB does colours.</li>'+
      '<li><b>IP rating</b> = water protection: IP20 dry \u00b7 IP65 steamy \u00b7 IP67 outdoors.</li>'+
      '<li><b>24V vs 240V:</b> 24V is slim + needs a driver; 240V plugs into mains, runs to ~50m, but is chunkier (recessed ceilings only).</li>'+
      '<li><b>The aluminium channel</b> is a heat-sink, looks professional, and hides the dots.</li>'+
      '<li><b>CRI 90+</b> means colours look true.</li></ul></details>'+
    (guideHTML?'<details class="ib-sub">'+'<summary>Supplier datasheets &amp; install photos</summary>'+guideHTML+'</details>':'')+
    '</div></details>';
}
const STRIP_101='<details class="sw-learn"><summary>Strip lighting 101 \u2014 30-second crash course</summary><ul>'+
 '<li><b>Brightness</b> is lumens \u2014 more watts per metre = brighter. Over 150 lumens per watt = very efficient.</li>'+
 '<li><b>Colour temperature:</b> 2700K warm & cosy \u00b7 4000K natural \u00b7 6000K crisp. CCT strip lets you change it; RGB does millions of colours.</li>'+
 '<li><b>IP rating = water protection:</b> IP20 dry indoors \u00b7 IP65 steamy bathrooms \u00b7 IP67 outdoors.</li>'+
 '<li><b>24V vs 240V:</b> 24V strips are slim and need a transformer (driver). 240V plugs into normal power, runs up to 50m, but is chunkier \u2014 recessed ceilings only.</li>'+
 '<li><b>Why the aluminium channel?</b> It\u2019s a heat-sink (strip lasts longer), it looks professional, and the frosted cover hides the LED dots.</li>'+
 '<li><b>CRI 90+</b> means colours look true \u2014 great for kitchens and display shelves.</li></ul></details>';
function swMoodBanner(){ return (typeof STRIPIMG!=="undefined"&&swAnswers.place&&STRIPIMG.places[swAnswers.place])?'<img class="sw-mood" src="'+STRIPIMG.places[swAnswers.place]+'" alt="Strip lighting in this spot" loading="lazy">':""; }
function stripGuideImgs(){
  if(typeof STRIPIMG==="undefined"||!STRIPIMG.guides)return "";
  const G=STRIPIMG.guides;
  return '<details class="sw-learn sw-ds"><summary>Supplier datasheets \u2014 IP ratings, handling & install</summary>'+
    '<figure><img src="'+G.ip+'" alt="IP protection grades IP20 to IP68" loading="lazy"><figcaption><b>IP protection grades.</b> IP20 dry indoors \u00b7 IP65 sprayed water (steamy bathrooms, benchtops) \u00b7 IP67 outdoors \u00b7 IP68 submersible to 1m.</figcaption></figure>'+
    '<figure><img src="'+G.caution+'" alt="Strip light handling cautions" loading="lazy"><figcaption><b>Handling rules.</b> Never bend tighter than a 50mm radius, never fold or twist the strip, and always power it through the proper constant-voltage driver \u2014 never straight into 240V mains (24V strip). Installation must be done by a licensed electrician.</figcaption></figure>'+
    '<figure><img src="'+G.install+'" alt="6-step LED strip installation guide" loading="lazy"><figcaption><b>Install in 6 steps.</b> Clean & dry the surface, press gently between the LEDs, cut only on the marked cut points, and mount on aluminium channel for heat dissipation and longer life.</figcaption></figure>'+
    '<figure><img src="'+G.longrun+'" alt="Long-run connection table without voltage drop" loading="lazy"><figcaption><b>Long runs without voltage drop.</b> The 7.5W/m 24V long-run COB does 20m from one end, or 40m powered from both ends \u2014 ask our team about runs past 10m.</figcaption></figure></details>';
}
function renderPackage(){
  const box=$("#swBody"); if(!box||!swPackageStrip)return;
  const pk=buildPackage(swPackageStrip,swAnswers);
  const total=pk.items.reduce((s,it)=>s+it.unit*it.qty,0);
  const PK_LBL={channel:"Channel type & colour",controller:"Controller (smart or standard)",remote:"Remote (style & colour)",driver:"Driver / transformer size"};
  const rows=pk.items.map(it=>{
    let selHtml="";
    if(it.opt&&it.p.options&&it.p.options.length>1&&!it.lock){
      const lbl=PK_LBL[it.pick]||"Choose option";
      selHtml='<label class="pk-sel-lbl">'+lbl+' \u2014 '+it.p.options.length+' available</label><div class="pk-sel-wrap"><select class="pk-sel" data-pksel="'+it.p.id+'">'+
        it.p.options.map(o=>'<option value="'+o.label.replace(/"/g,"&quot;")+'"'+(o.label===it.opt.label?" selected":"")+'>'+o.label+' \u2014 $'+o.price.toFixed(2)+'</option>').join("")+
        '</select></div>';
    }
    const vImg=optImg(it.p,it.opt);
    const thumb=vImg?'<img class="pimg img" src="'+vImg+'" alt="'+(it.opt?it.opt.label:it.p.name).replace(/"/g,"&quot;")+'">':media(it.p,"img");
    /* the photo and the name open the full product page (specs, every option,
       install guide) - the kit row itself only shows what this kit uses. */
    const viewable=!!(it.p&&it.p.id&&findP(it.p.id));
    const qa=s=>String(s).replace(/"/g,"&quot;");
    const va=viewable?' data-pkview="'+qa(it.p.id)+'"'+(it.opt?' data-pkviewopt="'+qa(it.opt.label)+'"':'')+
      ' role="button" tabindex="0" title="'+qa("Open "+it.p.name+" \u2014 full specs and all options")+'"':'';
    return '<div class="pk-row'+(selHtml?' pk-row-sel':'')+'"><div class="pk-ri'+(vImg?' hasimg':'')+(viewable?' pk-ri-link':'')+'"'+va+'>'+thumb+'</div>'+
    '<div class="pk-rd"><h4'+(viewable?' class="pk-rt-link"'+va:'')+'>'+it.label+(viewable?'<span class="pk-rt-go" aria-hidden="true">\u2197</span>':'')+'</h4><span class="pk-sub">'+it.sub+'</span>'+selHtml+'</div>'+
    '<div class="pk-rp">\u00d7'+it.qty+'<br><b>$'+(it.unit*it.qty).toFixed(2)+'</b></div></div>';}).join("");
  const notesDrop=pk.notes.length
    ? '<details class="pk-notes-drop"><summary><span class="ib-ico">\u2139</span> Good to know for your run <span class="pkn-count">'+pk.notes.length+'</span><span class="ib-chev">\u25be</span></summary><div class="pk-notes-body">'+
        pk.notes.map(n=>'<p class="pk-note">'+n+'</p>').join("")+'</div></details>'
    : "";
  const f=pk.facts;
  box.innerHTML='<button class="pk-back" data-pkgback="1">\u2190 Back to suggestions</button>'+
    '<div class="sw-prog">\u2713 Your complete kit</div><h3>'+swPackageStrip.name+'</h3>'+
    '<div class="pk-diag">'+(stripVolt(swPackageStrip)==="240V"?diagRecess240():diagPlace(swAnswers.place))+'</div>'+
    (stripVolt(swPackageStrip)!=="240V"?'<div class="pk-diag">'+diagFeed(pk.feed==="both")+'</div>':'')+
    '<p class="sw-sum">Everything you need for your '+pk.len+'m run \u2014 nothing missing, nothing extra:</p>'+
    '<div class="pk-list">'+rows+'</div>'+
    '<p class="pk-tap-hint">Tap any photo or product name above for the full product page \u2014 specs, every option and the install guide.</p>'+
    (!/240v/i.test(swPackageStrip?swPackageStrip.name:"")?connectorPanel(pk.len):"")+
    '<div class="pk-total"><span>Kit total</span><span>$'+total.toFixed(2)+' <small>ex-GST \u00b7 $'+(total*1.1).toFixed(2)+' inc</small></span></div>'+
    '<button class="btn btn-dark" style="width:100%;justify-content:center;margin-top:6px" data-pkgadd="1">Add whole kit to cart</button>'+
    stripInfoBox(pk)+
    notesDrop;
  demoWire(box);
}
function addPackageToCart(){
  if(!swPackageStrip)return; const pk=buildPackage(swPackageStrip,swAnswers);
  pk.items.forEach(it=>{ addToCart(it.p.id, it.opt?it.opt.label:null, it.opt?it.opt.price:it.unit, it.qty); });
  closeStripWizard(); toast("Strip kit added to cart"); openCart();
}
function swSummary(){
  const place={cabinet:"under your cabinets",cove:"in your ceiling recess",outdoor:"outdoors",wet:"in your bathroom",stairs:"on your stairs / hallway",other:"in your spot"}[swAnswers.place]||"in your spot";
  const col={single:"fixed white",cct:"adjustable white",rgb:"full-colour RGB",w2700:"2700K extra warm",w3000:"3000K warm white",w4000:"4000K natural white",w5000:"5000K bright white",w5500:"5500K crisp white",w6000:"6000K cool white",blue:"blue"}[swAnswers.colour]||"";
  const ctl={smart:"run from the phone app",simple:"with a simple remote",any:""}[swAnswers.control]||"";
  return ("For "+col+" light "+place+" "+ctl).replace(/\s+/g," ").trim()+".";
}
function recCard(p){
  const f=stripFacts(p);
  return '<div class="sw-rec sw-rec-big" data-pkg="'+p.id+'">'+
    '<div class="rec-top"><div class="ri">'+media(p,"img")+'</div>'+
    '<div class="rd"><h4>'+p.name+'</h4><span class="rp">'+(p.options&&p.options.length?"from ":"")+"$"+p.price.toFixed(2)+' <small>ex-GST /m</small></span>'+
    '<span class="rec-where">'+f.where+'</span>'+(f.spec?'<span class="rec-spec">'+f.spec+'</span>':'')+'</div></div>'+
    '<ul class="rec-why">'+f.teach.slice(0,3).map(t=>'<li>'+t+'</li>').join("")+'</ul>'+
    '<span class="rec-cta">See the complete kit for this strip \u2192</span></div>';
}
function v240DimSVG(){
  // to-scale cross-section: 240V Strip Light Pro = 8mm wide x 18mm tall, IP65
  return '<svg viewBox="0 0 300 160" class="v240-dim" role="img" aria-label="240V strip 8mm by 18mm cross-section">'+
    // the 240V strip block (tall)
    '<rect x="128" y="24" width="34" height="84" rx="4" fill="#fff" stroke="var(--ink)" stroke-width="2"/>'+
    '<rect x="128" y="24" width="34" height="13" rx="4" fill="var(--glow)" opacity=".85"/>'+
    '<circle cx="145" cy="52" r="3" fill="var(--glow)"/><circle cx="145" cy="66" r="3" fill="var(--glow)"/><circle cx="145" cy="80" r="3" fill="var(--glow)"/><circle cx="145" cy="94" r="3" fill="var(--glow)"/>'+
    // width dimension (below)
    '<line x1="128" y1="120" x2="162" y2="120" stroke="var(--muted)" stroke-width="1"/>'+
    '<line x1="128" y1="116" x2="128" y2="124" stroke="var(--muted)" stroke-width="1"/><line x1="162" y1="116" x2="162" y2="124" stroke="var(--muted)" stroke-width="1"/>'+
    '<text x="145" y="137" font-size="12" fill="#3c4034" text-anchor="middle" font-weight="600">8 mm</text>'+
    // height dimension (right)
    '<line x1="176" y1="24" x2="176" y2="108" stroke="var(--muted)" stroke-width="1"/>'+
    '<line x1="172" y1="24" x2="180" y2="24" stroke="var(--muted)" stroke-width="1"/><line x1="172" y1="108" x2="180" y2="108" stroke="var(--muted)" stroke-width="1"/>'+
    '<text x="188" y="70" font-size="12" fill="#3c4034" font-weight="600">18 mm</text>'+
    // comparison note (left)
    '<text x="20" y="52" font-size="11.5" fill="#5d6151">Much taller than a</text>'+
    '<text x="20" y="69" font-size="11.5" fill="#5d6151">slim 24V strip, which</text>'+
    '<text x="20" y="86" font-size="11.5" fill="#5d6151">is only about 2 mm.</text></svg>';
}
function renderRecessStop(){
  const box=$("#swBody"); if(!box) return;
  const V=(typeof STRIPIMG!=="undefined"&&STRIPIMG.v240)?STRIPIMG.v240:{};
  const photo=V.photo?'<figure class="sw-photo"><img src="'+V.photo+'" alt="240V Strip Light Pro reel" loading="lazy"><figcaption>240V Strip Light Pro \u2014 the strip designed for recessed ceiling coves.</figcaption></figure>':'';
  const dim='<figure class="sw-photo v240-dimfig"><div class="v240-dimwrap">'+v240DimSVG()+'</div><figcaption>Profile: 8&#8201;mm wide \u00d7 18&#8201;mm tall. That height is why it needs a shelf of 50&#8201;mm or more.</figcaption></figure>';
  box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button>'+
    '<div class="sw-prog sw-prog-warn">Please check this will fit</div>'+
    '<h3>The 240V Strip Light Pro may not suit a shallow recess</h3>'+
    '<p class="sw-hint">This is the strip designed for recessed ceiling coves. It stands <b>18&#8201;mm tall</b> and needs a flat shelf of at least <b>50&#8201;mm (5&#8201;cm)</b> to sit on, with open space above so the light can wash up the ceiling.</p>'+
    photo+dim+
    '<div class="sw-spec240"><h4>240V Strip Light Pro \u2014 specifications</h4>'+
      '<div class="sw-specrows">'+
        '<div><span>Dimensions</span><b>8&#8201;mm \u00d7 18&#8201;mm</b></div>'+
        '<div><span>Brightness</span><b>885&#8201;lumens/m \u00b7 144&#8201;LEDs/m</b></div>'+
        '<div><span>Power</span><b>12W/m \u00b7 240V&#8201;AC mains</b></div>'+
        '<div><span>Colours</span><b>3000K \u00b7 4000K \u00b7 5500K \u00b7 Blue</b></div>'+
        '<div><span>Run length</span><b>Up to 50m per reel</b></div>'+
        '<div><span>Water rating</span><b>IP65 \u2014 dust &amp; splash protected</b></div>'+
        '<div><span>Fitting</span><b>Ceiling channel or U-clips</b></div>'+
      '</div></div>'+
    '<div class="sw-caution"><b>Please check these details carefully \u2014 this strip may not suit your recess.</b><br>If your shelf is under 50&#8201;mm, a short run, or has bends, the 240V strip won\u2019t sit properly. Give us a call and we\u2019ll recommend a slim 24V strip that fits instead.</div>'+
    '<div class="sw-stopcta"><a class="btn-call" href="tel:+61892972969">Call (08) 9297 2969</a>'+
    '<button class="sw-opt sw-restart" data-swrestart="1">\u2190 Start the finder again</button></div>';
}
/* Stairs is a fixed kit, not a configurable run - so the finder stops asking
   questions here and just shows the setup video and what's in the kit.
   Products with no supplier photo yet are listed by name, never faked. */
const STAIR_KIT=[
  {name:"Smart Stair Light Controller",price:120,
   note:"Includes the top &amp; bottom sensors and the stair cable. Handles up to 20 steps.",
   id:"STAIR-CTRL"},
  {name:"1m CCT DMX Stair Profile",price:18,unit:"each",
   note:"One profile per step \u2014 so a 14-step staircase needs 14.",
   id:"STAIR-PROFILE"}
];
function renderStairs(){
  const box=$("#swBody"); if(!box) return;
  const VID="Q3iYeqDkIeE";  // Smart Stair Lights Connection and Setup
  const rows=STAIR_KIT.map(function(k){
    return '<div class="pk-row pk-row-nophoto">'+
      '<div class="pk-info"><b>'+k.name+'</b><span>'+k.note+'</span></div>'+
      '<div class="pk-price">$'+k.price.toFixed(2)+(k.unit?'<em>'+k.unit+'</em>':'')+'</div>'+
      '</div>';
  }).join("");
  box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button>'+
    '<div class="sw-prog">\u2713 Stair lighting</div>'+
    '<h3>Stair lighting is a kit \u2014 no questions needed</h3>'+
    '<p class="sw-lead">Stairs run on their own controller with a sensor top and bottom, so it lights the steps as you walk. Watch the setup video, then here\u2019s what goes in it.</p>'+
    '<figure class="sw-video"><a href="https://www.youtube.com/watch?v='+VID+'" target="_blank" rel="noopener">'+
      '<img src="https://i.ytimg.com/vi/'+VID+'/hqdefault.jpg" alt="Smart Stair Lights connection and setup video" loading="lazy">'+
      '<span class="sw-play" aria-hidden="true"></span></a>'+
      '<figcaption>Smart Stair Lights \u2014 connection and setup \u2197</figcaption></figure>'+
    '<div class="pk-list">'+rows+'</div>'+
    '<p class="sw-note">Give us a call on <a href="tel:+61892972969">(08) 9297 2969</a> and we\u2019ll size the kit to your staircase.</p>'+
    '<div class="sw-cta"><a class="btn-call" href="tel:+61892972969">Call (08) 9297 2969</a>'+
    '<button class="pk-restart" data-swrestart="1">Start again</button></div>';
}


/* Tight ceiling recess: the 240V strip physically will not work, so instead of
   dead-ending we hand them the strip that DOES fit - the low-power long-run COB.
   Full specs shown so they can check it themselves. */
function renderLongRun(){
  const box=$("#swBody"); if(!box) return;
  const p=findP("ST24V-LONGRUN-IP68");
  const C=(typeof COBIMG!=="undefined")?COBIMG:null;
  const L=parseFloat(swAnswers.length)||0;
  const fromCove=(swAnswers.place==="cove");
  // Under 5m this strip is the wrong tool - hand the customer to a person rather
  // than sell them a long-run product for a short run.
  if(L>0&&L<5){
    box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button>'+
      '<div class="sw-prog">Let\u2019s get you the right strip</div>'+
      '<h3>'+L+'m is too short for this one</h3>'+
      '<p class="sw-lead">The <b>24V Long Run COB</b> earns its keep over distance \u2014 it\u2019s built so one '+
        'driver can push 20 metres. At '+L+'m you\u2019d be paying for range you\u2019ll never use, and there\u2019s a '+
        'brighter, better-value strip for a run that size.</p>'+
      '<div class="sw-callus">Give us a quick call on <a href="tel:+61892972969">(08) 9297 2969</a> '+
        'and we\u2019ll match the right strip to your '+L+'m run \u2014 takes two minutes.</div>'+
      '<div class="sw-cta">'+
        '<a class="btn-call" href="tel:+61892972969">Call (08) 9297 2969</a>'+
        '<button class="pk-restart" data-swback="1">Change my length</button>'+
        '<button class="pk-restart" data-swrestart="1">Start again</button></div>';
    return;
  }
  // keep this screen skimmable - the full 17-row table lives on the product page
  const KEY=["Power","Colour","Voltage","Max run","Cutting","Warranty"];
  const rows=(C?C.specs.filter(function(r){return KEY.indexOf(r[0])>-1;}):[
    ["Power","7.5W per metre"],["Voltage","24V DC (needs a driver)"],
    ["Max run","20m from one end \u00b7 40m fed from both ends"]
  ]).map(function(r){ return '<div class="sw-spec-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'; }).join("");
  // sold in one sealing grade only, so this states it rather than offering a choice
  const g=C&&(C.ipGrades||[])[0];
  const ipRows=g?'<div class="cob-ip cob-ip-on"><b>'+g[0]+'</b><span class="cob-ip-dim">'+g[1]+'</span>'+
    '<span class="cob-ip-use">'+g[2]+'</span><em>The only grade we sell it in</em></div>':"";
  /* Supplier photos. They picture the bare strip on its adhesive backing, so the caption
     says so - the IP68 we sell is the same strip inside a clear silicone sleeve. */
  const shots=C?[[C.img.reel,"Supplied on a reel, cut to the length you order."],
                 [C.img.macro,"Dot-free: one continuous line of light, not a row of LEDs. The gold pads are the cut points."],
                 [C.img.lit,"Lit \u2014 the warm 3000K setting."]]
    .map(function(s){return '<figure class="cob-shot"><img src="'+s[0]+'" alt="24V Long Run COB strip light" loading="lazy"><figcaption>'+s[1]+'</figcaption></figure>';}).join(""):"";
  const photo=shots?'<div class="cob-gallery">'+shots+'</div>'+
    '<p class="cob-shotnote">Supplier photos show the bare strip. The version we sell is the same strip sealed inside a clear silicone sleeve for IP68.</p>':"";
  box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button>'+
    '<div class="sw-prog">\u2713 '+(fromCove?"The strip that fits":"Long run strip light")+'</div>'+
    '<h3>'+(fromCove?"Your recess is tight \u2014 use the Long Run COB strip"
                    :"For a long run, this is the strip")+'</h3>'+
    '<p class="sw-lead">'+(fromCove
      ? 'The 240V strip is chunky and needs that flat shelf, so it is out. The <b>24V Long Run COB</b> is thin, flexible and sips power, which is exactly what a shallow recess wants \u2014 and one feed still carries 20 metres.'
      : 'The <b>24V Long Run COB</b> only draws 7.5W a metre, which is the whole trick \u2014 low current means one driver at one end pushes light 20 metres without the far end going dim. Feed it from both ends and you get 40. It\u2019s fully sealed IP68, so it\u2019s equally at home down a garden bed or along an indoor bulkhead.')+'</p>'+
    photo+
    '<div class="sw-specs">'+rows+'</div>'+
    (ipRows?'<h4 class="cob-h4">Sealed for outdoors</h4>'+
      '<p class="cob-outdoor">This one only comes fully sealed, so it goes where other strip can\u2019t \u2014 '+
      'garden beds and planters, pergolas and outdoor features, under decks, around pools and water '+
      'features, and floating steps. Rain and a hose are no problem. It\u2019s just as happy indoors; '+
      'the sealing means damp is never something you have to think about.</p>'+
      '<div class="cob-ips">'+ipRows+'</div>':"")+
    '<p class="sw-note">Specs above are the supplier\u2019s own datasheet for this strip. '+
      'Not sure it suits your job? Call us on <a href="tel:+61892972969">(08) 9297 2969</a>.</p>'+
    '<div class="sw-cta">'+
      (p?'<button class="btn-call" data-pkg="'+p.id+'">Build my kit \u2192</button>':'')+
      '<a class="pk-restart" href="tel:+61892972969">Call (08) 9297 2969</a>'+
      '<button class="pk-restart" data-swrestart="1">Start again</button></div>';
}
/* Solderless clip connectors. Shown on 24V kits over 5m, where the run has to be
   joined. The diagram carries the rule; the photo shows the actual part. */
function connectorPanel(len){
  const W=340;
  const bar=(x,w,y)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="13" rx="2" fill="var(--glow)" stroke="var(--ink)" stroke-width="1"/>';
  const clip=(cx,y)=>'<rect x="'+(cx-6)+'" y="'+(y-4)+'" width="12" height="21" rx="2" fill="#fff" stroke="var(--ink)" stroke-width="1.4"/>'+
    '<path d="M'+(cx-2.5)+' '+(y+1)+' v11 M'+(cx+2.5)+' '+(y+1)+' v11" stroke="var(--ink)" stroke-width="1"/>';
  const cap=(x,y,t,anchor)=>'<text x="'+x+'" y="'+y+'" font-size="8.5" fill="#5d6151" text-anchor="'+(anchor||"middle")+'">'+t+'</text>';
  const hdr=(y,t)=>'<text x="14" y="'+y+'" font-size="8" fill="var(--muted)" font-family="JetBrains Mono,monospace">'+t+'</text>';
  // top: what they actually get - one unbroken length
  let svg='<svg viewBox="0 0 '+W+' 118" role="img" aria-label="The strip comes in one continuous length; if you cut it, a clip connector rejoins the pieces and carries up to 2.5 metres">'+
    hdr(11,"WHAT YOU GET")+bar(14,W-28,20)+cap(W/2,48,len+"m in one continuous length \u2014 no joins needed");
  // bottom: only if they choose to cut it
  const leftW=150, gapC=14+leftW+13;
  svg+=hdr(72,"ONLY IF YOU CUT IT")+bar(14,leftW,81)+clip(gapC,81)+bar(gapC+13,W-28-leftW-13,81)+
    '<path d="M'+(14+leftW+3)+' 74 v-7" stroke="#b0553f" stroke-width="1.2"/>'+
    cap(14,110,"cut at a marked line","start")+cap(W-14,110,"connector carries up to 2.5m","end")+'</svg>';
  return '<div class="cn-panel"><h4 class="cn-h">Your '+len+'m comes as one continuous strip</h4>'+
    '<div class="cn-row"><div class="cn-dia">'+svg+'</div></div>'+
    '<p class="cn-note">A straight run needs no connectors at all. If you do cut it \u2014 to turn a corner, '+
    'get past an obstacle or split the run \u2014 rejoin the pieces with a solderless clip connector: the strip '+
    'end pushes into the clear housing and the lid clips shut, no soldering. '+
    '<b>One connector carries up to 2.5m of strip.</b> Connectors aren\u2019t part of this kit \u2014 '+
    'tell us if you know you\u2019ll be cutting and we\u2019ll add them.</p></div>';
}
function renderWizard(){
  const box=$("#swBody"); if(!box) return;
  if(swPackageStrip){ renderPackage(); return; }
  if(swAnswers.place==="stairs"){ renderStairs(); return; }
  // ask for the length first - under 5m this strip is the wrong product
  if(swIsLongRun(swAnswers)&&swAnswers.length){ renderLongRun(); return; }
  const QS=swVisibleQs();
  if(swStep<QS.length){
    const Q=QS[swStep];
    box.innerHTML=(swStep>0?'<button class="pk-back" data-swback="1">\u2190 Back</button>':'')+
      '<div class="sw-prog">Question '+(swStep+1)+' of '+QS.length+'</div><h3>'+Q.q+'</h3>'+
      (Q.hint?'<p class="sw-hint">'+(typeof Q.hint==="function"?Q.hint(swAnswers):Q.hint)+'</p>':'')+
      (Q.extra?Q.extra(swAnswers):'')+
      (Q.input
        ?'<div class="sw-len"><input type="number" id="swLenInput" min="1" max="99" step="0.5" placeholder="e.g. '+(swAnswers.place==="cove"||swAnswers.place==="longrun"?"12":"4")+'" inputmode="decimal"> <span class="sw-len-m">metres</span><button class="sw-opt sw-go" data-swnum="1">Continue \u2192</button></div>'
        :'<div class="sw-opts">'+(typeof Q.opts==="function"?Q.opts(swAnswers):Q.opts).map((o,i)=>{
          const pic=qOptPhoto(Q,o,swAnswers);
          return pic?'<button class="sw-opt sw-opt-img" data-sw="'+i+'"><img src="'+pic+'" alt="" loading="lazy"><span>'+o[0]+'</span></button>'
                    :'<button class="sw-opt" data-sw="'+i+'">'+o[0]+'</button>';
        }).join("")+'</div>');
  } else {
    const ranked=stripPool().map(p=>({p,s:stripScore(p,swAnswers)})).sort((a,b)=>b.s-a.s);
    const top=ranked.filter(r=>r.s>0).slice(0,3);
    let list=(top.length?top:ranked.slice(0,3)).map(r=>r.p);
    let coveNote=''; let coveCallOnly=false;
    if(swAnswers.place==="cove"){
      const Lc0=parseFloat(swAnswers.length)||0;
      if(swAnswers.space!=="tight"&&swAnswers.control!=="smart"&&swAnswers.colour!=="cct"&&Lc0>0&&Lc0<10){
        coveNote='<div class="sw-callus">Recessed-ceiling runs under 10 metres need a custom option \u2014 give us a quick call on <a href="tel:0892972969">(08) 9297 2969</a> and we\u2019ll spec it with you on the spot.</div>';
        list=list.slice(0,2); coveCallOnly=true;
      }
      const v240=list.filter(p=>/240v/i.test(p.name));
      if(!coveCallOnly&&v240.length){
        const wantRGB=(swAnswers.colour==="rgb");
        const exact=v240.filter(p=>wantRGB===/rgb/i.test(p.name));
        list=(exact.length?exact:v240).slice(0,1);
        coveNote='<p class="sw-hint">Recessed ceilings = long-run 240V strip, kept simple: $60 driver included, one power feed, minimum 10m ('+(wantRGB?'RGB up to 35m':'fixed-colour white up to 50m')+'). Under 10m? Call us on (08) 9297 2969.</p>'; }
      else if(!coveCallOnly){
        const Lc=parseInt(swAnswers.length)||0;
        const why = swAnswers.space==="tight" ? "your recess is tight \u2014 the chunkier 240V strip won\u2019t fit nicely"
          : swAnswers.control==="smart" ? "240V strip is remote-only \u2014 it can\u2019t be run from the app"
          : swAnswers.colour==="cct" ? "240V is fixed colour \u2014 it can\u2019t do adjustable white"
          : (Lc>50) ? "240V tops out at 50m on one feed \u2014 for runs that long, call us on (08) 9297 2969 and we\u2019ll design it in segments"
          : (Lc>35&&swAnswers.colour==="rgb") ? "240V RGB tops out at 35m \u2014 for longer RGB runs, call us on (08) 9297 2969"
          : "240V comes in 10m+ runs only \u2014 yours is shorter (want 240V anyway? Call us on (08) 9297 2969)";
        coveNote='<p class="sw-hint">Normally a recessed ceiling gets 240V strip \u2014 but '+why+'. These 24V picks are the right fit instead:</p>';
      }
    }
    if(swAnswers.place!=="cove"){
      const Ln=parseFloat(swAnswers.length)||0;
      if(Ln>10){
        coveNote='<div class="sw-callus">Runs over 10 metres need power planned at several points \u2014 give us a quick call on <a href="tel:0892972969">(08) 9297 2969</a> and we\u2019ll design it with you.</div>';
        coveCallOnly=true; list=list.slice(0,2);
      }
    }
    const outNote=(swAnswers.place==="outdoor")?'<p class="sw-hint" style="margin-top:12px">Fully-exposed outdoor runs need IP67 weather-sealed strip. The picks below are the closest matches in our online range \u2014 for the dedicated IP67 outdoor & long-run strip, call our Perth team on (08) 9297 2969 and we\u2019ll spec it with you.</p>':'';
    let primary=list[0], alts=list.slice(1,3);
    if(coveCallOnly){ alts=list.slice(0,2); primary=null; }
    box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button><div class="sw-prog">\u2713 Your exact match</div>'+swMoodBanner()+'<h3>Based on your answers, this is the one:</h3>'+
      '<p class="sw-sum">'+swSummary()+'</p>'+coveNote+(coveCallOnly?'':outNote)+(coveCallOnly?'':'<p class="pk-hint">Tap it to see the complete kit \u2192</p>')+'<div class="sw-recs">'+(primary?recCard(primary):"")+
      (alts.length?'<details class="sw-alts"><summary>'+(coveCallOnly?'Or preview '+alts.length+' close option'+(alts.length>1?'s':'')+' \u2014 we\u2019ll confirm the details by phone':'Not quite right? See '+alts.length+' alternative'+(alts.length>1?'s':''))+'</summary>'+alts.map(recCard).join("")+'</details>':"")+'</div>'+STRIP_101;
  }
}
function openStripWizard(){
  clearTimeout(swTimer); swShown=true; swStep=0; swAnswers={}; swPackageStrip=null; swPkgSel={};
  renderWizard();
  $("#stripWizard").classList.add("open"); $("#swScrim").classList.add("show");
}
function closeStripWizard(){
  $("#stripWizard").classList.remove("open"); $("#swScrim").classList.remove("show");
}
const STRIP_TUTS=[
 ["7DAaL5gGab8","High-Quality Strip Lights — the range explained"],
 ["B-Bx8YMpNXQ","Cabinet LED Strip Lighting — install guide"],
 ["Q3iYeqDkIeE","Smart Stair Lights — connection & setup"],
 ["BCo0g85LRvI","Putting smart controllers into pairing mode"],
];
function renderStripTuts(){
  const host=$("#stripTutGrid"); if(!host) return;
  host.innerHTML=STRIP_TUTS.map(v=>'<div class="sl-tut"><div class="sl-tut-frame"><iframe loading="lazy" src="https://www.youtube.com/embed/'+v[0]+'" title="'+v[1]+'" allowfullscreen></iframe></div><span>'+v[1]+'</span></div>').join("");
}
function renderStrips(){
  const host=$("#stripGrid"); if(!host) return;
  /* The homepage teaser shows a handful; the full range lives on the strip
     lights page. Capped 1 Sep 2026 — the page was getting too long. */
  const all=PRODUCTS.filter(p=>p.cat==="strip"&&!/suspension|modular|channel/i.test(p.name));
  const shown=all.slice(0,8);
  host.innerHTML=shown.map(cardHTML).join("")
    +(all.length>shown.length
      ? '<div class="grid-more"><a class="btn-more" href="/products/lighting-perth/led-strip-lights/">See the full strip range — '+all.length+' products →</a></div>'
      : '');
  renderStripTuts();
}

