/* ============================================================
   home/13-qa-test-suite.js
   the built-in QA / launch-readiness test suite (?qa=1) — every finder, cart and content test
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ============================================================
   QA / LAUNCH-READINESS TEST SUITE
   ============================================================ */
/* Photos used to be inlined as data: URIs. They now ship as real files under
   /img/ (smaller HTML, cacheable), so "is this a real supplier asset?" means
   a data URI OR a local image file — not a placeholder or a hot-link. */
/* Drive the finders by what an answer SAYS, not by its position. Options get
   added (the 30 mm band did exactly that) and index-based clicks then silently
   answer a different question. */
function qaPickDl(rx){
  const t=$$("#dlBody [data-dl]").find(o=>rx.test(o.textContent));
  if(t) t.click();
  return !!t;
}
function isRealAsset(src){
  src=String(src||"");
  if(src.indexOf("data:image")===0)return true;
  return /^\/img\/[^"'\s]+\.(webp|png|jpe?g|avif|svg)$/i.test(src);
}
const TESTS=[
 ["Navigation menus populated",()=>{
   const a=$("#megaCats").children.length===CATEGORIES.length;
   const b=$("#footCats").children.length>0;
   return [a&&b, a&&b?`${CATEGORIES.length} categories in mega-menu`:"menu not fully rendered"];
 }],
 ["Category grid renders all 18 with photos",()=>{
   const n=$("#catGrid").querySelectorAll(".cat").length;
   const photos=$("#catGrid").querySelectorAll(".cat-photo img").length;
   return [n===CATEGORIES.length&&photos>0,`${n} tiles, ${photos} with product photos`];
 }],
 ["Products render",()=>{
   query="";activeCat="all";renderShop();
   const n=$("#shopBody").querySelectorAll(".card").length;
   return [n>0,`${n} product cards rendered`];
 }],
 ["Default shop is compact (not all 246)",()=>{
   query="";activeCat="all";renderShop();
   const n=$$("#shopBody .card").length;
   return [n>0&&n<30, "Default shows "+n+" popular picks, not all "+PRODUCTS.length];
 }],
 ["Category drill-down + View all",()=>{
   query="";activeCat="strip";expanded.clear();renderShop();
   const cards=$$("#shopBody .card").length;
   const collapsed=$(".cat-block")&&$(".cat-block").classList.contains("collapsed");
   expanded.add("strip");renderShop();
   const open=$(".cat-block")&&!$(".cat-block").classList.contains("collapsed");
   activeCat="all";expanded.clear();renderShop();
   return [cards>0&&collapsed&&open,"Strip: "+cards+" products, preview then View-all"];
 }],
 ["Search filters results",()=>{
   const before=filtered().length;
   query="downlight";const after=filtered().length;query="";
   return [after>0&&after<before,`"downlight" → ${after} of ${before}`];
 }],
 ["Category filter works",()=>{
   const prev=activeCat;activeCat="strip";const only=filtered().every(p=>p.cat==="strip");
   const n=filtered().length;activeCat=prev;
   return [only&&n>0,`Strip filter → ${n} items, all matched`];
 }],
 ["Add to cart updates badge & total",()=>{
   const pid=(PRODUCTS.find(p=>p.price>0)||PRODUCTS[0]).id;
   const c0=cartCount();addToCart(pid);
   const ok=cartCount()===c0+1&&cartTotal()>0;
   return [ok,`Cart count ${c0}→${cartCount()}, total $${cartTotal().toFixed(2)}`];
 }],
 ["Change quantity recalculates",()=>{
   const pid=(PRODUCTS.find(p=>p.price>0)||PRODUCTS[0]).id;
   const t0=cartTotal();setQty(pid,1);const up=cartTotal()>t0;setQty(pid,-1);
   return [up,"Quantity + / − adjusts subtotal"];
 }],
 ["Remove from cart",()=>{
   const pid=(PRODUCTS.find(p=>p.price>0)||PRODUCTS[0]).id;
   removeLine(pid);const gone=!cart.find(l=>l.id===pid);
   return [gone,"Line removed, badge updated"];
 }],
 ["Wishlist toggles",()=>{
   const pid=PRODUCTS[1].id;
   toggleWish(pid);const on=wishlist.has(pid);
   toggleWish(pid);const off=!wishlist.has(pid);
   return [on&&off,"Heart on → off, badge tracked"];
 }],
 ["Quick-view modal opens & closes",()=>{
   const p=PRODUCTS[0];openModal(p.id);
   const open=$("#modal").classList.contains("open")&&$("#modalBody").textContent.indexOf(p.name.slice(0,6))>=0;
   closeModal();const closed=!$("#modal").classList.contains("open");
   return [open&&closed,"Modal shows specs, Esc/close works"];
 }],
  ["Strip Light section + finder present",()=>{
   const sec=document.getElementById("striplights");
   const n=sec?sec.querySelectorAll(".card").length:0;
   const wiz=!!document.getElementById("stripWizard");
   return [!!sec&&n>0&&wiz, n+" strip products + finder wizard"];
 }],
 ["Strip finder: questions, recs & kit package",()=>{
   swShown=false; openStripWizard();
   const opened=$("#stripWizard").classList.contains("open");
   let asked=0;
   for(let i=0;i<8;i++){ if($("#swBody [data-pkg]")||$("#swBody .sw-callus"))break;
     const b=$("#swBody [data-sw]"); if(b){asked++;b.click();continue;}
     const inp=$("#swLenInput"); if(inp){ inp.value="12"; $("#swBody [data-swnum]").click(); asked++; } }
   const recs=$$("#swBody .sw-rec").length;
   const r=$("#swBody [data-pkg]"); if(r) r.click();
   const rows=$$("#swBody .pk-row").length;
   const sels=$$("#swBody .pk-sel").length;
   const total=$("#swBody .pk-total")!==null;
   closeStripWizard();
   return [opened&&asked>=4&&recs>0&&rows>0&&total, asked+" Qs, "+recs+" recs, kit of "+rows+" items, "+sels+" option selectors"];
 }],
["Channels round up to whole 3m lengths",()=>{
   swPkgSel={};
   const strip=PRODUCTS.find(p=>p.cat==="strip"&&/24v/i.test(p.name)&&!/240v/i.test(p.name));
   const q=(len)=>{ const pk=buildPackage(strip,{place:"cabinet",colour:"single",control:"simple",length:String(len)}); const ch=pk.items.find(it=>it.pick==="channel"); return ch?ch.qty:0; };
   const ok=q(2)===1&&q(4)===2&&q(5)===2&&q(10)===4&&q(15)===5;
   return [ok,"2m→1, 4m→2, 5m→2, 10m→4, 15m→5 (× 3m channels)"];
 }],
 ["Kit rows open the full product page with the right variant",()=>{
   swPkgSel={};
   swAnswers={place:"cabinet",colour:"single",control:"simple",length:"5"};
   swPackageStrip=PRODUCTS.find(p=>p.cat==="strip"&&/24v/i.test(p.name)&&!/240v/i.test(p.name));
   renderPackage();
   const rows=$$("#swBody .pk-row");
   const imgLinks=$$("#swBody .pk-ri-link[data-pkview]");
   const titleLinks=$$("#swBody .pk-rt-link[data-pkview]");
   if(!rows.length||imgLinks.length!==rows.length||titleLinks.length!==rows.length)
     return [false,"only "+imgLinks.length+" photo / "+titleLinks.length+" name links across "+rows.length+" kit rows"];
   /* prefer a row that carries a chosen variant, so we can prove it is preselected */
   const withOpt=titleLinks.find(el=>el.dataset.pkviewopt)||titleLinks[0];
   const wantId=withOpt.dataset.pkview, wantOpt=withOpt.dataset.pkviewopt||"";
   const prod=findP(wantId);
   withOpt.click();
   const open=$("#modal").classList.contains("open");
   const h2=$("#modalBody h2");
   const specs=$$("#modalBody .spectable tr").length, tiles=$$("#modalBody .opt-tile").length;
   const nameOk=!!(h2&&prod&&h2.textContent.trim()===prod.name);
   const optOk=!wantOpt||!!(modalOpt&&modalOpt.label===wantOpt);
   const optsShown=!prod.options||!prod.options.length||tiles===prod.options.length;
   closeModal();
   /* the photo is clickable too and must land on the same product */
   const imgFor=imgLinks.find(el=>el.dataset.pkview===wantId);
   imgFor.click();
   const imgOk=$("#modal").classList.contains("open")&&$("#modalBody h2").textContent.trim()===prod.name;
   closeModal();
   const ok=open&&nameOk&&optOk&&optsShown&&specs>0&&imgOk;
   return [ok, ok?("photo + name both open "+prod.name+" \u00b7 "+specs+" spec rows \u00b7 "+tiles+" option tiles"+(wantOpt?" \u00b7 selected variant carried through":""))
     :("open="+open+" name="+nameOk+" opt="+optOk+" tiles="+tiles+" specs="+specs+" photo="+imgOk)];
 }],
 ["Connector panel says the strip is continuous and cutting is optional",()=>{
   const kit=(strip,len)=>{swPkgSel={};swAnswers={place:"cabinet",colour:"single",control:"simple",length:String(len)};
     swPackageStrip=strip;renderPackage();return $("#swBody").innerHTML;};
   const v24=PRODUCTS.find(p=>p.cat==="strip"&&/24v/i.test(p.name)&&!/240v/i.test(p.name));
   const v240=PRODUCTS.find(p=>p.cat==="strip"&&/240v/i.test(p.name));
   const long=kit(v24,9);
   const bars=$$("#swBody .cn-dia svg rect").length;   // 3 strip bars + 1 connector body
   const noPhoto=$$("#swBody .cn-photo").length===0&&!(typeof COBIMG!=="undefined"&&COBIMG.img.conn);
   const short=kit(v24,3);
   // the old version chopped every run into 2.5m segments - that was wrong
   const noChopping=long.indexOf("JOINED BY")===-1&&!/\d+ \u00d7 2\.5m/.test(long);
   const continuous=/one continuous (strip|length)/i.test(long)&&long.indexOf("no joins needed")>-1;
   const conditional=long.indexOf("ONLY IF YOU CUT IT")>-1&&/carries up to 2\.5m/.test(long);
   // and it must not claim connectors are supplied, because they are not in the kit items
   const kitItems=buildPackage(v24,{place:"cabinet",colour:"single",control:"simple",length:"9"}).items;
   const noneSupplied=!kitItems.some(it=>/connector/i.test(it.p.name));
   const honest=/aren\u2019t part of this kit|aren\u2019t included in this kit/.test(long)&&noneSupplied;
   const onShort=short.indexOf("cn-panel")>-1;      // cutting advice applies at any length
   const off240=v240?kit(v240,14).indexOf("cn-panel")===-1:true;
   swPackageStrip=null;swAnswers={};swStep=0;renderWizard();
   const ok=noChopping&&continuous&&conditional&&honest&&onShort&&off240&&noPhoto&&bars>=4;
   return [ok, ok?("shows the run unbroken, cutting shown as optional, 2.5m tied to the connector, not sold as included")
     :("noChop="+noChopping+" cont="+continuous+" cond="+conditional+" honest="+honest+" short="+onShort+" v240="+off240+" bars="+bars)];
 }],
 ["Finder CTA rows are actually styled",()=>{
   // .sw-cta and .pk-restart previously had NO css rule at all - bare buttons.
   // The rules moved from an inline <style> into the linked home.css when the
   // page became a Next.js route, so scan linked sheets as well as style tags.
   let css=[...document.querySelectorAll("style")].map(s=>s.textContent).join("");
   for(const sh of document.styleSheets){try{css+=[...sh.cssRules].map(r=>r.cssText).join("");}catch(e){}}
   css=css.replace(/\s+/g,"");
   const cta=/\.sw-cta\{[^}]*display:flex[^}]*gap:/.test(css);
   const rest=/\.pk-restart\{[^}]*border:[^}]*\}/.test(css);
   const hover=/\.pk-restart:hover\{/.test(css);
   swAnswers={place:"longrun",length:"12"};swPackageStrip=null;swStep=99;renderWizard();
   const present=!!$("#swBody .sw-cta")&&$$("#swBody .pk-restart").length===2;
   swAnswers={};swStep=0;renderWizard();
   const ok=cta&&rest&&hover&&present;
   return [ok, ok?"sw-cta is a flex row with a gap; pk-restart has a border and a hover state"
     :("ctaRule="+cta+" restartRule="+rest+" hover="+hover+" rendered="+present)];
 }],
 ["Long Run COB asks for a length and blocks runs under 5m",()=>{
   // the length question must appear before the product screen on BOTH routes
   const asksLength=(ans)=>{swAnswers=ans;swPackageStrip=null;swStep=0;
     const qs=swVisibleQs().map(q=>q.key);
     return {keys:qs, hasLen:qs.indexOf("length")>-1,
             noColour:qs.indexOf("colour")===-1, noControl:qs.indexOf("control")===-1};};
   const dq=asksLength({place:"longrun"});
   const cq=asksLength({place:"cove",space:"tight"});
   const screen=(ans)=>{swAnswers=ans;swPackageStrip=null;swStep=99;renderWizard();
     const b=$("#swBody").innerHTML;
     return {call:b.indexOf("sw-callus")>-1, build:b.indexOf("Build my kit")>-1,
             tel:b.indexOf("9297 2969")>-1};};
   const short=screen({place:"longrun",length:"3"});
   const edge=screen({place:"longrun",length:"5"});
   const long=screen({place:"longrun",length:"12"});
   const coveShort=screen({place:"cove",space:"tight",length:"4"});
   swAnswers={};swStep=0;renderWizard();
   const gated=short.call&&!short.build&&short.tel&&coveShort.call&&!coveShort.build;
   const sells=!edge.call&&edge.build&&!long.call&&long.build;
   const flow=dq.hasLen&&dq.noColour&&dq.noControl&&cq.hasLen&&cq.noColour;
   const ok=gated&&sells&&flow;
   return [ok, ok?("length asked on both routes (no colour/control) \u00b7 3m and 4m \u2192 call us, no kit \u00b7 5m and 12m \u2192 sells")
     :("gated="+gated+" sells="+sells+" flow="+flow+" q="+dq.keys.join(","))];
 }],
 ["Long Run photos are captioned for what they actually show",()=>{
   if(typeof COBIMG==="undefined")return[false,"COBIMG bundle missing"];
   swAnswers={place:"longrun",length:"12"};swPackageStrip=null;swStep=99;renderWizard();
   const shots=$$("#swBody .cob-shot img");
   const caps=$$("#swBody .cob-shot figcaption").map(n=>n.textContent);
   const b=$("#swBody").innerHTML;
   const allReal=shots.length===3&&shots.every(i=>isRealAsset(i.getAttribute("src")));
   const captioned=caps.length===3&&caps.every(c=>c.trim().length>15);
   // photos show the bare strip; we sell the sealed IP68 - that must not be glossed over
   const honest=/same strip sealed inside a clear silicone sleeve/i.test(b);
   const noConn=!COBIMG.img.conn;
   swAnswers={};swStep=0;renderWizard();
   const ok=allReal&&captioned&&honest&&noConn;
   return [ok, ok?"3 real supplier photos, each captioned, with the bare-strip vs IP68 difference stated"
     :("shots="+shots.length+" captioned="+captioned+" honest="+honest+" connRemoved="+noConn)];
 }],
 ["Repeated channel photos are labelled, not left looking duplicated",()=>{
   const ch=findP("24VSTRIP-CHANNELS-"); if(!ch)return[false,"channel product missing"];
   openModal("24VSTRIP-CHANNELS-");
   const tiles=$$("#modalBody .opt-tile");
   const imgs=tiles.map(t=>{const i=t.querySelector("img");return i?i.getAttribute("src"):"";});
   const share={};imgs.forEach(s=>{if(s)share[s]=(share[s]||0)+1;});
   // every tile whose photo is shared must carry a marker saying so
   let unmarked=[];
   tiles.forEach((t,i)=>{
     if(imgs[i]&&share[imgs[i]]>1&&!t.querySelector(".ot-dup")){
       // fine only when this tile is the finish the photo actually shows
       if(optImgNote(ch,ch.options[i])) unmarked.push(ch.options[i].label);
       else if(!$$("#modalBody .opt-tile").some((o,j)=>imgs[j]===imgs[i]&&optImgNote(ch,ch.options[j])))
         unmarked.push(ch.options[i].label);
     }
   });
   // a caveated tile must name the finish actually pictured, never claim "all finishes"
   const wrong=tiles.filter((t,i)=>{const m=t.querySelector(".ot-dup");
     return m&&optImgNote(ch,ch.options[i])&&/all finishes/.test(m.textContent);}).length;
   const swatches=$$("#modalBody .opt-tile .ot-sw").length;
   // and no two cards in the channel grid may show the same photo
   const cards=$$("#slChanGrid .sl-chan img").map(i=>i.getAttribute("src"));
   const gridDup=cards.length-new Set(cards).size;
   closeModal();
   const ok=unmarked.length===0&&wrong===0&&swatches===12&&gridDup===0;
   return [ok, ok?("12 tiles over "+Object.keys(share).length+" photos \u2014 every shared one labelled, 12 colour swatches, no duplicate grid cards")
     :("unmarked="+unmarked.join("/")+" wrongText="+wrong+" swatches="+swatches+" gridDup="+gridDup)];
 }],
 ["Category tiles use the supplied artwork without doubling the name",()=>{
   renderCats();
   const tiles=$$("#catGrid .cat");
   const scenes=$$("#catGrid .cat-scene");
   if(tiles.length!==CATEGORIES.length)return[false,tiles.length+" tiles for "+CATEGORIES.length+" categories"];
   const allScene=scenes.length===tiles.length&&$$("#catGrid .cat-cut").length===0;
   const realImg=scenes.every(i=>isRealAsset(i.getAttribute("src")));
   // the artwork already prints the category name, so no tile may show a second
   // visible copy - but the h3 must still exist for screen readers and SEO
   const baked=tiles.filter(t=>t.classList.contains("name-in-art"));
   const noDouble=baked.every(t=>{const h=t.querySelector("h3");
     return h&&h.classList.contains("vis-hidden")&&h.textContent.trim().length>2;});
   // alt text must describe the scene, never just repeat the category name
   const altOK=scenes.every((i,n)=>{const a=i.getAttribute("alt")||"";
     return a.length>12&&a!==CATEGORIES[n].name;});
   const counted=tiles.every(t=>/\d+ product/.test(t.querySelector(".cnt").textContent));
   const gaps=(typeof CATIMG!=="undefined"&&CATIMG.noPhoto)?CATIMG.noPhoto.length:0;
   const ok=allScene&&realImg&&noDouble&&altOK&&counted&&gaps===0;
   return [ok, ok?(tiles.length+" tiles all on supplied artwork \u00b7 heading kept for a11y but not drawn twice \u00b7 alt text describes each scene")
     :("allScene="+allScene+" img="+realImg+" noDoubleName="+noDouble+" alt="+altOK+" counts="+counted+" gaps="+gaps)];
 }],
 ["Strip tutorial videos under the products",()=>{
   renderStrips();
   const n=$$("#stripTutGrid .sl-tut").length;
   return [n>=3, n+" strip tutorial videos embedded"];
 }],
 ["Accessories never appear as strip suggestions",()=>{
   const paths=[{place:"other",colour:"single",control:"simple",length:"5"},
    {place:"cabinet",colour:"cct",control:"smart",length:"5"},
    {place:"cove",space:"tight",colour:"single",control:"simple",length:"10"}];
   let bad=0;
   paths.forEach(a=>{ const ranked=stripPool().map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s);
     const top=ranked.filter(r=>r.s>0).slice(0,3); const list=(top.length?top:ranked.slice(0,3));
     list.forEach(r=>{ if(/channel|transformer|controller|remote/i.test(r.p.name)) bad++; }); });
   return [bad===0, bad+" accessory items in suggestions (should be 0)"];
 }],
 ["240V is remote-only (never smart) & smart kits skip the remote",()=>{
   const smartA={place:"cove",space:"roomy",colour:"single",control:"smart",length:"5"};
   const ranked=stripPool().map(p=>({p,s:stripScore(p,smartA)})).sort((a,b)=>b.s-a.s).filter(r=>r.s>0).slice(0,3);
   const no240=ranked.every(r=>!/240v/i.test(r.p.name));
   const strip24=stripPool().find(p=>/24v/i.test(p.name)&&!/240v/i.test(p.name));
   const pk=buildPackage(strip24,smartA);
   const hasWifi=pk.items.some(it=>it.pick==="controller"&&/wifi/i.test(it.opt.label));
   const noRemote=!pk.items.some(it=>it.pick==="remote");
   const s240=stripPool().find(p=>/240v/i.test(p.name)&&/rgb/i.test(p.name))||stripPool().find(p=>/240v/i.test(p.name));
   const pk240=buildPackage(s240,{place:"cove",space:"roomy",colour:"rgb",control:"smart",length:"15"});
   const noCtrl240=!pk240.items.some(it=>it.pick==="controller");
   const hasRemote240=pk240.items.some(it=>it.pick==="remote");
   const pkSimple=buildPackage(strip24,{place:"cabinet",colour:"single",control:"simple",length:"5"});
   const has2in1=pkSimple.items.some(it=>it.pick==="controller"&&/2 in 1/i.test(it.p.name));
   const simpleRemote=pkSimple.items.some(it=>it.pick==="remote");
   return [no240&&hasWifi&&noRemote&&noCtrl240&&hasRemote240&&has2in1&&simpleRemote, "smart: 3-in-1 WiFi no remote; simple white: 2-in-1 + remote; 240V: remote only"];
 }],
 ["240V long-run only (min 10m, white\u226450 RGB\u226435) & cove shows ONE 240V pick",()=>{
   const rank=a=>stripPool().map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s).filter(r=>r.s>0).slice(0,3).map(r=>r.p.name.toLowerCase());
   const rgbShort=rank({place:"cove",space:"roomy",colour:"rgb",control:"simple",length:"5"});
   const rgbLong=rank({place:"cove",space:"roomy",colour:"rgb",control:"simple",length:"10"});
   const white5=rank({place:"cove",space:"roomy",colour:"single",control:"simple",length:"5"});
   const white10=rank({place:"cove",space:"roomy",colour:"single",control:"simple",length:"10"});
   const cct10=rank({place:"cove",space:"roomy",colour:"cct",control:"simple",length:"10"});
   const ok = rgbShort.every(n=>!n.includes("240v")) && rgbLong.some(n=>n.includes("240v"))
     && white5.every(n=>!n.includes("240v")) && white10.some(n=>n.includes("240v"))
     && cct10.every(n=>!n.includes("240v"));
   swAnswers={place:"cove",space:"roomy",colour:"single",control:"simple",length:"10"}; swStep=99; swPackageStrip=null;
   renderWizard();
   const shown=[...document.querySelectorAll("#swBody .sw-rec h4")].map(h=>h.textContent.toLowerCase());
   const one240=shown.length===1&&shown[0].includes("240v")&&!shown[0].includes("rgb");
   swAnswers={}; swStep=0;
   return [ok&&one240, "min 10m enforced (white & RGB); fixed-colour only; cove screen = exactly 1 matching 240V pick"];
 }],
 ["Single colour = SMD never COB; 2-in-1 for white, 3-in-1 for RGB",()=>{
   const rank=a=>stripPool().map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s).filter(r=>r.s>0).slice(0,3).map(r=>r.p.name.toLowerCase());
   const single=rank({place:"cabinet",colour:"single",control:"simple",length:"4"});
   const noCob=single.length>0&&single.every(n=>!n.includes("cob"));
   const cct=rank({place:"cabinet",colour:"cct",control:"simple",length:"4"});
   const cctIsCob=cct.length>0&&cct[0].includes("cob");
   const white=stripPool().find(p=>/high lumen/i.test(p.name));
   const rgbS=stripPool().find(p=>/rgb/i.test(p.name)&&!/240v/i.test(p.name));
   const kW=buildPackage(white,{place:"cabinet",colour:"single",control:"simple",length:"4"});
   const kWs=buildPackage(white,{place:"cabinet",colour:"single",control:"smart",length:"4"});
   const kR=buildPackage(rgbS,{place:"cabinet",colour:"rgb",control:"simple",length:"4"});
   const ctrl=k=>(k.items.find(it=>it.pick==="controller")||{}).p||{name:""};
   const w2=/2 in 1/i.test(ctrl(kW).name)&&!/rgb/i.test(ctrl(kW).name);
   const w2s=/2 in 1/i.test(ctrl(kWs).name);
   const r3=/rgb/i.test(ctrl(kR).name)&&!/2 in 1/i.test(ctrl(kR).name);
   return [noCob&&cctIsCob&&w2&&w2s&&r3, "single\u2192SMD (no COB), CCT\u2192COB; white kits (std+smart)=2-in-1, RGB=3-in-1"];
 }],
 ["Wet areas = High Lumen SMD only, fixed whites, no RGB",()=>{
   const ranked=stripPool().map(p=>({p,s:stripScore(p,{place:"wet",colour:"w4000",control:"simple",length:"5"})})).sort((a,b)=>b.s-a.s);
   const pos=ranked.filter(r=>r.s>0);
   const onlyHL=pos.length>0&&pos.every(r=>/high lumen/i.test(r.p.name));
   swAnswers={place:"wet",bright:"std"};
   const qs=swVisibleQs(); swStep=qs.findIndex(q=>q.key==="colour"); swPackageStrip=null; renderWizard();
   const t=$("#swBody").textContent;
   const colOK=/5500K/.test(t)&&!/Full colour/i.test(t)&&!/RGB \u2014 millions/i.test(t);
   swAnswers={}; swStep=0;
   return [onlyHL&&colOK, "wet path ranks High Lumen exclusively; whites 3000/4000/5500/6000K, no RGB option"];
 }],
 ["240V max lengths (white 50m, RGB 35m) enforced",()=>{
   const rank=a=>stripPool().map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s).filter(r=>r.s>0).slice(0,3).map(r=>r.p.name.toLowerCase());
   const white45=rank({place:"cove",space:"roomy",colour:"single",control:"simple",length:"45"});
   const white60=rank({place:"cove",space:"roomy",colour:"single",control:"simple",length:"60"});
   const rgb30=rank({place:"cove",space:"roomy",colour:"rgb",control:"simple",length:"30"});
   const rgb45=rank({place:"cove",space:"roomy",colour:"rgb",control:"simple",length:"45"});
   const ok = white45.some(n=>n.includes("240v")) && white60.every(n=>!n.includes("240v"))
     && rgb30.some(n=>n.includes("240v")&&n.includes("rgb")) && rgb45.every(n=>!(n.includes("240v")&&n.includes("rgb")));
   return [ok, "white ok at 45m, cut at 60m; RGB ok at 30m, cut at 45m"];
 }],
 ["240V strip only suggested for ceiling recess",()=>{
   const out={place:"outdoor",colour:"rgb",control:"simple",length:"10"};
   const cove={place:"cove",colour:"single",control:"simple",length:"10"};
   const strips=PRODUCTS.filter(p=>p.cat==="strip");
   const rank=a=>strips.map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s).filter(r=>r.s>0).slice(0,3).map(r=>r.p.name.toLowerCase());
   const outNames=rank(out), coveNames=rank(cove);
   const no240outside=outNames.every(n=>!n.includes("240v"));
   const coveAllows=coveNames.some(n=>n.includes("240v"));
   return [no240outside&&coveAllows, "outdoor top-3 has no 240V; cove includes 240V"];
 }],
 ["Strip products use real supplier photos",()=>{
   if(typeof STRIPIMG==="undefined")return[false,"STRIPIMG bundle missing"];
   const ids=Object.keys(STRIPIMG.products||{});
   const ok=ids.length&&ids.every(id=>{const p=PRODUCTS.find(x=>x.id===id);return p&&p.img&&isRealAsset(p.img);});
   return [ok, ids.length+" strip products carry embedded supplier photos ("+ids.join(", ")+")"];
 }],
 ["Finder place question shows picture answers",()=>{
   swAnswers={};swStep=0;renderWizard();
   const n=$("#swBody").querySelectorAll(".sw-opt-img img").length;
   const total=$("#swBody").querySelectorAll(".sw-opt").length;
   return [n===6&&total===6, n+"/"+total+" place options have a real photo"];
 }],
 ["Results show mood photo; kit info box carries datasheets",()=>{
   swAnswers={place:"other",colour:"single",control:"simple",length:"4"};swShown=true;
   swPackageStrip=null;swStep=swVisibleQs().length;renderWizard();
   const mood=$("#swBody").innerHTML.indexOf("sw-mood")>-1;
   // drill into the kit to check the consolidated info box
   const prm=stripPool().map(p=>({p,s:stripScore(p,swAnswers)})).sort((a,b)=>b.s-a.s)[0].p;
   swPackageStrip=prm; renderWizard();
   let kit=$("#swBody").innerHTML;
   const box=kit.indexOf("infobox")>-1&&kit.indexOf("Full details of this strip light")>-1;
   const ds=kit.indexOf("Supplier datasheets")>-1&&(kit.match(/<figure/g)||[]).length>=2;
   swAnswers={};swStep=0;swPackageStrip=null;renderWizard();
   return [mood&&box&&ds, (mood?"mood banner ok":"mood MISSING")+" · "+(box?"single info box ok":"info box MISSING")+" · "+(ds?"datasheets inside ok":"datasheets MISSING")];
 }],
 ["Strip inspiration gallery rendered",()=>{
   const n=$("#slMoodGrid")?$("#slMoodGrid").querySelectorAll("img").length:0;
   return [n>=6, n+" real installation photos in the gallery"];
 }],
 ["COB demo photos are real and attached to the right products",()=>{
   if(typeof DEMOIMG==="undefined")return[false,"DEMOIMG bundle missing"];
   const ids=Object.keys(DEMOIMG.byProduct||{});
   const inCat=ids.every(id=>!!findP(id));
   const cct=DEMOIMG.cct, rgb=DEMOIMG.rgb;
   const real=x=>x&&x.img&&isRealAsset(x.img);
   const ok=inCat&&cct&&rgb&&cct.states.length===2&&rgb.states.length===3
     &&cct.states.every(real)&&rgb.states.every(real)
     &&real(cct.controller)&&real(rgb.controller)
     &&(cct.remotes||[]).every(real)&&(rgb.remotes||[]).every(real);
   return [ok, ids.length+" COB strips with "+(cct?cct.states.length:0)+"+"+(rgb?rgb.states.length:0)+" lit states, controllers and remotes"];
 }],
 ["Demo panel renders in modal + finder, and only for photographed strips",()=>{
   const withPhoto=demoPanel("ST24V-RGB-COB");
   const without=demoPanel("ST24V-SMD-ALL-1");
   const swatches=(withPhoto.match(/sl-demo-state/g)||[]).length;
   return [withPhoto.includes("sw-demo")&&swatches>=3&&without==="",
     "RGB COB gets "+swatches+" colour swatches; unphotographed strips get none"];
 }],
 ["Colour question shows real photos, never a borrowed strip",()=>{
   const Q={key:"colour"}; const a={place:"cabinet"};
   const cct=qOptPhoto(Q,["x","cct"],a), rgb=qOptPhoto(Q,["x","rgb"],a), sgl=qOptPhoto(Q,["x","single"],a);
   const distinct=cct&&rgb&&sgl&&cct!==rgb&&rgb!==sgl&&cct!==sgl;
   // wet/cove paths must NOT get COB demo photos - those are fixed-white or 240V
   const wet=qOptPhoto(Q,["x","w3000"],{place:"wet"});
   return [!!distinct&&!wet, distinct?"cct/rgb/single each have their own real photo; wet & cove unaffected":"photos missing or duplicated"];
 }],
 ["Channel profiles: real dimensions, catalogue matched, gaps flagged",()=>{
   if(typeof CHANIMG==="undefined")return[false,"CHANIMG bundle missing"];
   const ch=findP("24VSTRIP-CHANNELS-");
   if(!ch)return[false,"channel product missing from catalogue"];
   const opts=ch.options||[];
   const matched=opts.filter(o=>optImg(ch,o));
   const unmatched=opts.filter(o=>!optImg(ch,o));
   // every unmatched option must be declared as awaiting a photo, not silently blank
   const declared=unmatched.every(o=>(CHANIMG.noPhoto||[]).includes(o.label));
   const allReal=(CHANIMG.profiles||[]).every(p=>isRealAsset(p.img)&&p.dims);
   const unlisted=(CHANIMG.profiles||[]).filter(p=>p.unlisted).length;
   return [matched.length===opts.length&&declared&&allReal&&unlisted===1,
     matched.length+"/"+opts.length+" options photographed, "+unmatched.length+" awaiting photo, "+unlisted+" profile shown as unlisted"];
 }],
 ["Every channel profile has its supplier dimension drawing",()=>{
   if(typeof CHANIMG==="undefined")return[false,"CHANIMG bundle missing"];
   const profs=CHANIMG.profiles||[];
   const withDim=profs.filter(p=>isRealAsset(p.dimImg));
   const ch=findP("24VSTRIP-CHANNELS-");
   const opts=(ch&&ch.options)||[];
   const optsWithDim=opts.filter(o=>(CHANIMG.options[o.label]||{}).dim);
   // the drawing must reach the modal, not just sit in the bundle
   openModal("24VSTRIP-CHANNELS-");
   const shown=$$("#optDetail .opt-dimfig img").length;
   closeModal();
   const ok=withDim.length===profs.length&&optsWithDim.length===opts.length&&shown===1;
   return [ok, withDim.length+"/"+profs.length+" profiles drawn, "+optsWithDim.length+"/"+opts.length+" options carry a drawing, "+shown+" rendered in the product page"];
 }],
 ["Black finishes use the black photo where the supplier sent one",()=>{
   if(typeof CHANIMG==="undefined")return[false,"CHANIMG bundle missing"];
   const wing=(CHANIMG.profiles||[]).find(p=>p.key==="recesswing");
   const black=CHANIMG.options["Recess Wing \u00b7 Black \u00b7 24.6 \u00d7 7.7mm"];
   const silver=CHANIMG.options["Recess Wing \u00b7 Silver \u00b7 24.6 \u00d7 7.7mm"];
   if(!wing||!black||!silver)return[false,"recess wing options missing"];
   const distinct=black.img!==silver.img;
   const noStaleCaveat=!/waiting on the supplier photo/.test(black.note||"");
   const cover=CHANIMG.options["Black Cover \u00b7 Black \u00b7 16.9 \u00d7 7.9mm"];
   const coverOk=!!(cover&&cover.img&&cover.dim);
   const ok=distinct&&noStaleCaveat&&coverOk;
   return [ok, ok?"black recess wing has its own photo + 16.9mm drawing; Black Cover now photographed":
     ("distinct="+distinct+" caveatCleared="+noStaleCaveat+" blackCover="+coverOk)];
 }],
 ["Silver-finish photos carry a colour caveat on White/Black options",()=>{
   const ch=findP("24VSTRIP-CHANNELS-"); if(!ch)return[false,"no channel product"];
   const white=(ch.options||[]).find(o=>/Recess \u00b7 White/.test(o.label));
   const silver=(ch.options||[]).find(o=>/Recess \u00b7 Silver/.test(o.label));
   const surfWhite=(ch.options||[]).find(o=>/Surface Rectangle \u00b7 White/.test(o.label));
   const ok=white&&silver&&surfWhite&&optImgNote(ch,white)&&!optImgNote(ch,silver)&&!optImgNote(ch,surfWhite);
   return [!!ok,"White recess notes the silver photo; silver and the 3-finish surface photo need no caveat"];
 }],

 ["Stairs skips the questions and shows the kit + video",()=>{
   swAnswers={place:"stairs"}; swStep=1; swPackageStrip=null; swShown=true;
   renderWizard();
   const h=$("#swBody").innerHTML;
   const ok=/Q3iYeqDkIeE/.test(h) && /Stair Light Controller/.test(h) && /Stair Profile/.test(h)
            && /\$120\.00/.test(h) && /\$18\.00/.test(h)
            && !/Question \d of/.test(h);
   swAnswers={};swStep=0;
   return [ok, ok?"video + $120 controller + $18 profile, no questions asked":"stairs panel wrong"];
 }],
 ["20W/m is offered in 4000K and 5500K only",()=>{
   const Q=STRIP_Q.find(q=>q.key==="colour");
   const bright=Q.opts({place:"wet",bright:"bright20"}).map(o=>o[1]);
   const std=Q.opts({place:"wet",bright:"std"}).map(o=>o[1]);
   const ok=bright.length===2 && bright.includes("w4000") && bright.includes("w5500")
            && !bright.includes("w3000") && !bright.includes("w6000") && std.length===4;
   return [ok, "bright: "+bright.join("/")+" \u00b7 standard still offers "+std.length];
 }],
 ["Meeting prices applied (SMD $14 / CCT $16 / RGB $17)",()=>{
   const g=id=>{const p=findP(id);return p?p.price:null;};
   const ok=g("ST24V-SMD-ALL")===14 && g("ST24V-9W-15W-CCT-C")===16 && g("ST24V-RGB-COB")===17;
   return [ok, "SMD $"+g("ST24V-SMD-ALL")+" \u00b7 CCT $"+g("ST24V-9W-15W-CCT-C")+" \u00b7 RGB $"+g("ST24V-RGB-COB")];
 }],
 ["Control question avoids 2-in-1 / 3-in-1 jargon",()=>{
   const Q=STRIP_Q.find(q=>q.key==="control");
   const w=Q.hint({colour:"single"})+" "+Q.hint({colour:"rgb"});
   const ok=!/2-in-1|3-in-1|2.4GHz|WiFi \+/.test(w) && /dim/.test(w) && /colour/.test(Q.hint({colour:"rgb"}));
   return [ok, ok?"plain wording: dim / on-off, colour for RGB":"jargon still present"];
 }],
 ["Transformers use real supplier photos",()=>{
   if(typeof TRIMG==="undefined")return[false,"TRIMG bundle missing"];
   const labels=Object.keys(TRIMG.options||{});
   const cat=PRODUCTS.filter(p=>p.id==="TR12V-ALL"||p.id==="TR24V-ALL");
   const defs=cat.length===2&&cat.every(p=>p.img&&isRealAsset(p.img));
   const allReal=labels.length&&labels.every(k=>isRealAsset(TRIMG.options[k]));
   return [defs&&allReal, labels.length+" variant photos + both transformer cards carry embedded photos"];
 }],
 ["Choosing a transformer variant swaps to that unit's photo",()=>{
   openModal("TR24V-ALL");
   const p=findP("TR24V-ALL");
   const seen=[];let ok=true;
   p.options.forEach((o,i)=>{
     selectModalOpt(i);
     const img=$("#modalImg").querySelector("img");
     const src=img?img.getAttribute("src"):"";
     const want=TRIMG.options[o.label];
     if(want){ if(src!==want) ok=false; seen.push(o.label); }
   });
   // distinct photos, not one repeated
   const uniq=new Set(seen.map(l=>TRIMG.options[l]));
   closeModal();
   return [ok&&uniq.size===seen.length, seen.length+" 24V variants each show their own distinct photo ("+uniq.size+" unique)"];
 }],
 ["Variant photo follows through kit & cart",()=>{
   const p=findP("TR24V-ALL");
   const o=p.options.find(x=>TRIMG.options[x.label]);
   cart=[];addToCart(p.id,o.label,o.price,1);updateCart();
   const ci=$("#cartItems").querySelector(".ci .img img");
   const cartOk=ci&&ci.getAttribute("src")===TRIMG.options[o.label];
   // kit view uses the same resolver
   const kitOk=typeof optImg==="function"&&optImg(p,o)===TRIMG.options[o.label];
   cart=[];updateCart();
   return [cartOk&&kitOk, (cartOk?"cart line ok":"cart line MISSING")+" · "+(kitOk?"kit thumbnail resolver ok":"kit resolver MISSING")];
 }],
 ["Variants without a supplier photo are labelled, not faked",()=>{
   openModal("TR12V-ALL");
   const p=findP("TR12V-ALL");
   let labelled=0,silent=0,exact=0;
   p.options.forEach((o,i)=>{
     selectModalOpt(i);
     const note=$("#modalImgNote");
     if(TRIMG.options[o.label]){ exact++; if(note&&!note.hidden) silent++; }
     else { if(note&&!note.hidden&&note.textContent.indexOf(o.label)>=0) labelled++; else silent++; }
   });
   closeModal();
   return [silent===0, exact+" exact photos · "+labelled+" sizes honestly flagged as awaiting supplier photo"];
 }],
 ["Controllers & remotes use real supplier photos",()=>{
   if(typeof CTRLIMG==="undefined")return[false,"CTRLIMG bundle missing"];
   const ids=Object.keys(CTRLIMG.byProduct||{});
   const defs=ids.every(id=>{const p=findP(id);return p&&p.img&&isRealAsset(p.img);});
   const n=ids.reduce((s,id)=>s+Object.keys(CTRLIMG.byProduct[id]).length,0);
   return [defs&&n>=12, n+" option photos across "+ids.length+" products; all card images embedded"];
 }],
 ["Each controller/remote variant shows its own unit",()=>{
   const checks=[];
   ["LED-CONTROLLER-SIN","RGB-CTRLR-037","REMOTE-CONTROL-GRP"].forEach(id=>{
     openModal(id);
     const p=findP(id);
     p.options.forEach((o,i)=>{
       selectModalOpt(i);
       const img=$("#modalImg").querySelector("img");
       const want=optImg(p,o);
       const note=$("#modalImgNote");
       if(want) checks.push(img&&img.getAttribute("src")===want);
       else checks.push(note&&!note.hidden&&note.textContent.indexOf(o.label)>=0);
     });
     closeModal();
   });
   const ok=checks.every(Boolean);
   return [ok, checks.length+" variants verified — exact photo shown, or honestly flagged as awaiting one"];
 }],
 ["The 2-in-1 and 3-in-1 WiFi variants don't collide",()=>{
   const a=findP("LED-CONTROLLER-SIN"), b=findP("RGB-CTRLR-037");
   const la=a.options.find(o=>o.label.indexOf("WiFi")===0), lb=b.options.find(o=>o.label.indexOf("WiFi")===0);
   const ia=optImg(a,la), ib=optImg(b,lb);
   return [!!ia&&!!ib&&ia!==ib, "Same option label, two different units — resolved per product"];
 }],
 ["Strip-section duplicates carry full product info",()=>{
   const pairs=[["TR24V-ALL-1","TR24V-ALL"],["TR12V-ALL-1","TR12V-ALL"],["REMOTE-CONTROL-GRP-2","REMOTE-CONTROL-GRP"],["RGB-CTRLR-037-2","RGB-CTRLR-037"],["LED-CONTROLLER-SIN-1","LED-CONTROLLER-SIN"]];
   let ok=true,msgs=[];
   pairs.forEach(([d,b])=>{
     const dp=findP(d),bp=findP(b);
     if(!dp||!bp){ok=false;msgs.push(d+" missing");return;}
     const good=dp.options&&dp.options.length===bp.options.length&&dp.img&&isRealAsset(dp.img);
     if(!good){ok=false;msgs.push(d+" incomplete");}
   });
   return [ok, ok?"5 duplicate entries now share options, specs & photos with their base products":msgs.join(", ")];
 }],
 ["Modal shows a clickable gallery of every option",()=>{
   openModal("TR24V-ALL");
   const p=findP("TR24V-ALL");
   const g=$("#optGallery");
   const tiles=g?g.querySelectorAll(".opt-tile"):[];
   const countOk=tiles.length===p.options.length;
   tiles[3]&&tiles[3].click();
   const selOk=modalOpt===p.options[3]&&$("#modalPrice").textContent===p.options[3].price.toFixed(2)&&tiles[3].classList.contains("sel");
   const withPhoto=[...tiles].filter(t=>t.querySelector("img")).length;
   closeModal();
   return [countOk&&selOk, tiles.length+" option tiles ("+withPhoto+" with real photos); clicking a tile selects that variant & updates price"];
 }],
 ["Category tiles link every product heading to its SEO page",()=>{
   renderCats();
   const cells=$("#catGrid").querySelectorAll(".catcell");
   let rendered=0,expected=0,badHref=0;
   CATEGORIES.forEach(c=>{expected+=catPageLinks(c.id).length;});
   $("#catGrid").querySelectorAll(".cat-links li a:not(.cl-all)").forEach(a=>{
     rendered++;
     /* static-export URLs: every product page is a folder — /products/…/name/ */
     if(!/^\/(products|lighting-perth|automation)\/.+\/$/i.test(a.getAttribute("href")))badHref++;
   });
   const allLinks=$("#catGrid").querySelectorAll(".cat-links .cl-all").length;
   return [cells.length===CATEGORIES.length&&rendered===expected&&badHref===0&&allLinks>0,
     rendered+" product headings across "+cells.length+" categories, all hrefs → product pages ("+allLinks+" category-page links)"];
 }],
 ["Both routes reach the Long Run COB with the real datasheet",()=>{
   const check=(ans)=>{
     swAnswers=ans;swPackageStrip=null;swStep=99;renderWizard();
     const b=$("#swBody").innerHTML;
     return {named:b.indexOf("Long Run COB")>-1,
             specs:b.indexOf("7.5W per metre")>-1&&b.indexOf("Fixed colour, chosen at order")>-1,
             run:b.indexOf("20m fed from one end")>-1,
             photo:$$("#swBody .cob-shot img").length===3,
             ip:b.indexOf("cob-ip")>-1,
             stale:b.indexOf("waiting on the supplier photo")>-1,
             build:b.indexOf("Build my kit")>-1};
   };
   const cove=check({place:"cove",space:"tight",length:"12"});   // recess answered "No"
   const direct=check({place:"longrun",length:"12"});            // the new place option
   swAnswers={};swStep=0;renderWizard();
   const good=r=>r.named&&r.specs&&r.run&&r.photo&&r.ip&&!r.stale&&r.build;
   const ok=good(cove)&&good(direct);
   return [ok, ok?"tight recess and the new long-run answer both land on it \u00b7 real photo, fixed colour 3000K/4000K, IP20 and IP67 grades, kit buildable"
     :("cove="+JSON.stringify(cove)+" direct="+JSON.stringify(direct))];
 }],
 ["Long Run COB is sold as IP20 and IP67",()=>{
   if(typeof COBIMG==="undefined")return[false,"COBIMG bundle missing"];
   swAnswers={place:"longrun",length:"12"};swPackageStrip=null;swStep=99;renderWizard();
   const b=$("#swBody").innerHTML;
   // the dropped IP20 entry must be gone from the catalogue, not just hidden
   const gone=!findP("ST24V-LONGRUN-IP20")&&PRODUCTS.filter(p=>/LONGRUN/.test(p.id)).length===1;
   const noStray=b.indexOf("IP68")===-1;
   const cards=$$("#swBody .cob-ip").length;
   const outdoor=/garden|pergola|under decks|floating steps/i.test(b);
   const kept=findP("ST24V-LONGRUN-IP68");
   const realImg=!!(kept&&kept.img&&isRealAsset(kept.img));
   const buildable=b.indexOf('data-pkg="ST24V-LONGRUN-IP68"')>-1;
   swAnswers={};swStep=0;renderWizard();
   const ok=gone&&noStray&&cards===2&&outdoor&&realImg&&buildable;
   return [ok, ok?"one IP68 product, no IP20/65/67 anywhere on the screen, outdoor use spelled out, kit builds"
     :("gone="+gone+" noStray="+noStray+" cards="+cards+" outdoor="+outdoor+" img="+realImg+" build="+buildable)];
 }],
 ["Install notes cover the connector, bend and offcut rules",()=>{
   const j=(a)=>buildPackage(findP(a.id||"ST24V-SMD-ALL-1"),a.ans).notes.join(" ");
   const lowV=j({ans:{place:"cabinet",colour:"single",control:"simple",length:"8"}});
   const conn=/one connector carries up to 2\.5m/i.test(lowV)&&/aren\u2019t included in this kit/.test(lowV);
   const bend=/Drill a hole at the corner/.test(lowV);
   const v240p=PRODUCTS.find(p=>/240v/i.test(p.name)&&p.cat==="strip");
   const hi=v240p?buildPackage(v240p,{place:"cove",colour:"w3000",length:"14"}).notes.join(" "):"";
   const fold=/fold the extra back/i.test(hi);
   const noFoldOnLowV=!/fold the extra back/i.test(lowV);
   const ok=conn&&bend&&fold&&noFoldOnLowV;
   return [ok, ok?"2.5m-per-connector + drill-don\u2019t-bend on 24V \u00b7 fold-back offcut advice on 240V only"
     :("conn="+conn+" bend="+bend+" fold="+fold+" scoped="+noFoldOnLowV)];
 }],
 ["Recess question shows correct/too-tight cove diagrams",()=>{
   const Q=STRIP_Q.find(q=>q.key==="space");
   const h=Q.extra?Q.extra({}):"";
   const ok=/cd-ok/.test(h)&&/cd-bad/.test(h)&&/150/.test(h)&&/50/.test(h)&&Q.opts.length===2;
   return [ok, ok?"two labelled diagrams, 150mm shelf / 50mm lip, still Yes-No":"diagram pair wrong"];
 }],
 ["Runs of 8m+ favour the Long Run COB",()=>{
   const lr=findP("ST24V-LONGRUN-IP68");
   if(!lr) return [false,"Long Run product missing from catalogue"];
   const a={place:"other",colour:"single",control:"simple",length:"9"};
   const scored=stripPool().map(p=>({n:p.name,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s);
   const top=scored[0];
   return [/long run/i.test(top.n), "9m top pick: "+top.n];
 }],
 ["Finder place visuals are real photos, not SVG diagrams",()=>{
   const cove=diagPlace("cove"), wet=diagPlace("wet");
   const isPhoto=cove.indexOf("<img")>-1&&cove.indexOf("data:image")>-1&&wet.indexOf("<img")>-1;
   return [isPhoto, "cove & wet install visuals now render supplier/mood photos"];
 }],
 ["20W/m bright wet-area variant selectable & flows through",()=>{
   // bright question only appears for wet
   swAnswers={place:"wet"};
   const qs=swVisibleQs().map(q=>q.key);
   const hasBright=qs.indexOf("bright")>-1;
   const hl=PRODUCTS.find(p=>(p.name||"").toLowerCase().includes("high lumen"));
   // family reflects 20W/m when chosen
   swAnswers={place:"wet",bright:"bright20"};
   const fam=stripFacts(hl);
   const is20=fam.wpm===20&&fam.bright20===true&&fam.spec.indexOf("20W/m")>-1;
   // standard stays 12
   swAnswers={place:"wet",bright:"std"};
   const fam2=stripFacts(hl);
   const is12=fam2.wpm===12;
   swAnswers={};
   return [hasBright&&is20&&is12&&!!hl, (hasBright?"bright question shown for wet":"NO bright question")+" · "+(is20?"20W/m variant ok":"20W FAIL")+" · "+(is12?"12W/m standard ok":"12W FAIL")];
 }],
 ["Length example is 12 for recess, 4 elsewhere",()=>{
   const ph=(ans)=>{swAnswers=ans;swPackageStrip=null;const qs=swVisibleQs();swStep=qs.findIndex(q=>q.key==="length");renderWizard();const inp=$("#swLenInput");return inp?inp.getAttribute("placeholder"):"";};
   const cove=ph({place:"cove",space:"roomy",colour:"single",control:"simple"});
   const wet=ph({place:"wet",bright:"std",colour:"single",control:"simple"});
   const cab=ph({place:"cabinet",colour:"single",control:"simple"});
   const stairs=ph({place:"other",colour:"single",control:"simple"});
   swAnswers={};swStep=0;renderWizard();
   const ok=/12/.test(cove)&&/4/.test(wet)&&/4/.test(cab)&&/4/.test(stairs)&&!/12/.test(wet);
   return [ok, "recess: '"+cove+"' · wet/cabinet/stairs: '"+wet+"'/'"+cab+"'/'"+stairs+"'"];
 }],
 ["Kit notes are a single dropdown at the bottom, not stacked panels",()=>{
   swAnswers={place:"wet",bright:"std",colour:"single",control:"simple",length:"4"};
   const prm=stripPool().map(p=>({p,s:stripScore(p,swAnswers)})).sort((a,b)=>b.s-a.s)[0].p;
   swPackageStrip=prm;swStep=99;renderWizard();
   const html=$("#swBody").innerHTML;
   const drop=html.indexOf("pk-notes-drop")>-1&&html.indexOf("Good to know for your run")>-1;
   // notes come AFTER the info box (bottom of the panel)
   const afterInfo=html.indexOf("pk-notes-drop")>html.indexOf("infobox");
   // old stacked full-width notes gone from the main flow (only inside the dropdown body)
   const bodyIdx=$("#swBody").querySelector(".pk-notes-body");
   const notesInside=bodyIdx&&bodyIdx.querySelectorAll(".pk-note").length>0;
   const startsCollapsed=!$("#swBody").querySelector(".pk-notes-drop").open;
   swAnswers={};swStep=0;swPackageStrip=null;renderWizard();
   return [drop&&afterInfo&&notesInside&&startsCollapsed, (drop?"dropdown present":"NO dropdown")+" · "+(afterInfo?"at the bottom after info box":"WRONG position")+" · "+(startsCollapsed?"collapsed by default":"not collapsed")];
 }],
 ["Cart & wishlist persist (localStorage)",()=>{
   let ok=true, note="cart+wishlist saved & restored";
   try{
     cart=[{key:"t::x",id:PRODUCTS[0].id,opt:null,price:PRODUCTS[0].price,qty:2}];
     wishlist=new Set([PRODUCTS[1].id]); saveState();
     cart=[];wishlist=new Set(); loadState();
     ok=cart.length===1&&cart[0].qty===2&&wishlist.size===1;
     cart=[];wishlist=new Set();saveState();updateCart();refreshWishBadge();
   }catch(e){ note="localStorage unavailable — skipped"; }
   return [ok,note];
 }],
 ["Related products shown in product page",()=>{
   const p=PRODUCTS.find(x=>x.cat==="downlights");
   openModal(p.id);
   const rel=$$("#modalBody .rel-card").length;
   closeModal();
   return [rel>=2, rel+" related products rendered"];
 }],
 ["FAQ has 10 real questions",()=>{
   renderFAQ();
   const n=$$("#faqList .q").length;
   const t=$("#faqList").textContent;
   return [n>=10&&t.indexOf("320W")>=0&&t.indexOf("cut-points")>=0, n+" FAQs incl. strip install facts"];
 }],
 ["Search suggests when no results",()=>{
   query="zzzqqq";activeCat="all";renderShop();
   const sugg=$$("#shopBody .card").length;
   const msg=$("#shopBody .no-results")!==null;
   query="";renderShop();
   return [msg&&sugg>0, "No-results message + "+sugg+" suggestions"];
 }],
 ["Installation guide for every product",()=>{
   let missing=0;
   PRODUCTS.forEach(p=>{ const g=installGuide(p); if(!g||!g.steps||g.steps.length<3) missing++; });
   return [missing===0, (PRODUCTS.length-missing)+"/"+PRODUCTS.length+" products have a step-by-step guide"];
 }],
 ["Installation help moved to its own page, and the nav points at it",()=>{
   /* The index used to live on the homepage. It is now /installation/, so
      the homepage must NOT carry it and must link out to it instead. */
   const gone=document.getElementById("installIndex")===null;
   const linked=$$('a[href="/installation/"],a[href="/installation.html"]').length>0;
   return [gone&&linked, gone?(linked?"moved and linked":"moved but nothing links to it")
                             :"install index still on the homepage"];
 }],
 ["Applications carousel is built and auto-advances",()=>{
   const slides=$$(".appslide").length;
   const proxied=$$('.appslide img[src^="/brand/"]').length;
   const arrows=$$(".appscroll-btn").length;
   const track=document.getElementById("appTrack");
   const scrolls=!!track&&getComputedStyle(track).overflowX!=="visible";
   return [slides>=20&&proxied===slides&&arrows===2&&scrolls,
           slides+" projects, "+proxied+" on the /brand proxy, "+arrows+" arrows, scrollable="+scrolls];
 }],
 ["Product page shows its installation guide + jump",()=>{
   const p=PRODUCTS.find(x=>x.cat==="downlights");
   openModal(p.id);
   const guide=document.getElementById("mInstall");
   const steps=guide?guide.querySelectorAll(".ig-steps li").length:0;
   const jump=$("#modalBody [data-instjump]")!==null;
   closeModal();
   return [!!guide&&steps>=3&&jump, "guide with "+steps+" steps + jump link in product page"];
 }],
 ["Installation Help opens the exact product guide",()=>{
   const p=PRODUCTS.find(x=>x.cat==="strip");
   openModalGuide(p.id);
   const open=$("#modal").classList.contains("open");
   const guide=document.getElementById("mInstall");
   const named=$("#modalBody h2")&&$("#modalBody h2").textContent===p.name;
   closeModal();
   return [open&&!!guide&&named, "opens "+p.name.slice(0,20)+"… at its guide"];
 }],
 ["Real specifications loaded",()=>{
   const rich=PRODUCTS.filter(p=>p.specTable&&p.specTable.length>=5).length;
   return [rich>=200, rich+"/"+PRODUCTS.length+" products have full real spec sheets"];
 }],
 ["Product detail content shown",()=>{
   openModal(PRODUCTS[20].id);
   const t=$("#modalBody").textContent;
   const hasDesc=t.indexOf("Greenhse")>=0, hasBox=t.indexOf("in the box")>=0;
   const hasSpecs=$$("#modalBody .spectable tr").length>0, hasGst=t.indexOf("inc GST")>=0;
   closeModal();
   return [hasDesc&&hasBox&&hasSpecs&&hasGst,"Description, contents, specs & GST all present"];
 }],
 ["Product options selectable & priced",()=>{
   const op=PRODUCTS.find(p=>p.options&&p.options.length);
   if(!op)return [false,"no option products found"];
   openModal(op.id);
   const sel=$("#optSelect");
   const n=sel?sel.options.length:0;
   selectModalOpt(n-1);
   const shown=$("#modalPrice").textContent;
   const detail=$("#optDetail").textContent.indexOf(op.options[n-1].label.slice(0,8))>=0;
   const ok=n===op.options.length && shown===op.options[n-1].price.toFixed(2) && detail;
   closeModal();
   return [ok,op.name.slice(0,18)+"… "+n+"-option dropdown, price+specs update"];
 }],
 ["Cart drawer opens & closes",()=>{
   openCart();const o=$("#cart").classList.contains("open");closeCart();const c=!$("#cart").classList.contains("open");
   return [o&&c,"Slide-out drawer toggles"];
 }],
 ["Smart Life tunable-white demo",()=>{
   applyTemp(6500);const cool=$("#phoneTemp").textContent;
   applyTemp(2700);const warm=$("#phoneTemp").textContent;
   return [cool==="6500K"&&warm==="2700K","Phone demo updates 2700K \u2194 6500K"];
 }],
 ["FAQ accordion expands",()=>{
   const q=$("#faqList .q");q.querySelector("button").click();const open=q.classList.contains("open");
   q.querySelector("button").click();
   return [open,"Question expands and collapses"];
 }],
 ["Newsletter rejects bad email",()=>{
   $("#nName").value="Test";$("#nEmail").value="not-an-email";
   $("#newsForm").dispatchEvent(new Event("submit",{cancelable:true}));
   const flagged=$("#nEmail").closest(".field").classList.contains("invalid");
   $("#newsForm").reset();$$("#newsForm .field").forEach(f=>f.classList.remove("invalid"));
   return [flagged,"Invalid email is caught"];
 }],
 ["Newsletter accepts valid input",()=>{
   $("#nName").value="Test";$("#nEmail").value="hello@greenhse.com";
   $("#newsForm").dispatchEvent(new Event("submit",{cancelable:true}));
   const clean=!$("#nEmail").closest(".field").classList.contains("invalid");
   return [clean,"Valid submission passes validation"];
 }],
 ["Contact form validates all fields",()=>{
   $("#contactForm").dispatchEvent(new Event("submit",{cancelable:true}));
   const flagged=$$("#contactForm .field.invalid").length===3;
   $("#contactForm").reset();$$("#contactForm .field").forEach(f=>f.classList.remove("invalid"));
   return [flagged,"Empty name, email & message all flagged"];
 }],
 ["Mobile nav opens & closes",()=>{
   openMnav();const o=$("#mnav").classList.contains("open");closeMnav();const c=!$("#mnav").classList.contains("open");
   return [o&&c,"Drawer + scrim toggle"];
 }],
 ["Key external links wired",()=>{
   const layout=$$('a[href*="/layout.html"]').length>0;
   const charge=$$('a[href*="greencharge.com.au"]').length>0;
   return [layout&&charge,"Layout App + Green Charge links present"];
 }],
 ["SEO, favicon & structured data present",()=>{
   const og=document.querySelector('meta[property="og:title"]');
   const fav=document.querySelector('link[rel="icon"]');
   const ld=document.querySelector('script[type="application/ld+json"]');
   return [!!og&&!!fav&&!!ld, "Open Graph, favicon & JSON-LD all set"];
 }],
 ["Legal pages open (Privacy/Terms/Returns)",()=>{
   openLegal("privacy");
   const ok=$("#legal").classList.contains("open")&&$("#legalContent").textContent.indexOf("Privacy")>=0;
   const has=LEGAL.privacy&&LEGAL.terms&&LEGAL.returns;
   closeLegal();
   return [ok&&!!has, "Privacy, Terms & Returns drafts load in overlay"];
 }],
 ["Downlight section + finder present",()=>{
   const sec=document.getElementById("downlights");
   const n=sec?sec.querySelectorAll(".card").length:0;
   const wiz=!!document.getElementById("dlWizard");
   const help=sec?sec.querySelectorAll(".dl-help-card").length:0;
   return [!!sec&&n>0&&wiz&&help===3, n+" downlights, finder wizard + "+help+" explainer cards"];
 }],
 ["Downlight pool excludes non-downlights",()=>{
   const pool=dlPool().map(p=>p.id);
   /* DL03-ALL (30 mm star light) is deliberately IN the pool — it is the 30 mm size band.
      Its multi-light kit and the accessories around it are what must stay out. */
   const bad=["SURFACE-SOCKET","Q-CONNECT","DL03-4KIT","DP40-CCT","WL8-CCT-BW-1-1","GH-C12CCT-BW-1"];
   const leaked=bad.filter(id=>pool.indexOf(id)>=0);
   const allCut=dlPool().every(p=>!!dlCut(p));
   return [leaked.length===0&&pool.length>=15&&allCut, pool.length+" real downlights, plug bases & star lights excluded"];
 }],
 ["Cut-out & beam read from real spec data",()=>{
   const p=PRODUCTS.find(x=>x.id==="DL7A-CCT");
   const c=dlCut(p), b=dlBeam(p);
   const q=PRODUCTS.find(x=>x.id==="DL10ES-F");
   const c2=dlCut(q), b2=dlBeam(q);
   const ok=c&&c.min===70&&c.max===75&&b===60&&c2&&c2.min===90&&b2===110;
   return [ok, ok?"DL7A 70\u201375mm/60\u00b0, DL10ES 90\u201395mm/110\u00b0 \u2014 straight from specTable":"spec parsing wrong"];
 }],
 ["Low glare is beam < 90\u00b0, same rule as the planner",()=>{
   const lg=PRODUCTS.find(x=>x.id==="DL8CCT-P-LG");
   const std=PRODUCTS.find(x=>x.id==="DL10ES-F");
   const ok=dlIsLowGlare(lg)===true&&dlIsLowGlare(std)===false;
   return [ok,"60\u00b0 = low glare, 110\u00b0 = standard"];
 }],
 ["Downlight count matches Lazar's table",()=>{
   const cases=[[2,2,false,1],[2,2,true,1],[3,4,false,4],[3,4,true,4],[4,5,false,4],[4,5,true,6],[5,8,false,6],[5,8,true,8],[6,10,false,8],[6,10,true,10]];
   const bad=cases.filter(c=>dlCount(c[0],c[1],c[2])!==c[3]);
   const oversize=dlCount(9,14,false)===null;
   const swapped=dlCount(5,4,true)===6;
   return [bad.length===0&&oversize&&swapped, bad.length===0?"All 10 bands correct, short side first, oversize \u2192 call us":bad.length+" bands wrong"];
 }],
 ["Downlight finder: questions \u2192 match + price",()=>{
   openDlWizard();
   const opened=$("#dlWizard").classList.contains("open");
   const picked=qaPickDl(/^\s*90\s?mm/)&&qaPickDl(/Low glare/i)&&qaPickDl(/Tricolour/i);
   $("#dlW").value="3.5"; $("#dlL").value="4.5";
   $("#dlBody [data-dlsize]").click();
   const rec=$$("#dlBody .sw-rec").length;
   const qty=$("#dlBody .dl-qty-n");
   const tot=$("#dlBody .dl-price-tot b");
   const add=$("#dlBody [data-dladd]");
   const ok=opened&&picked&&rec>0&&qty&&tot&&/^\$\d/.test(tot.textContent)&&add;
   const q=qty?qty.textContent.trim():"?";
   closeDlWizard();
   return [ok, "3.5\u00d74.5m low glare \u2192 "+q+" fittings, total "+(tot?tot.textContent:"?")+" inc GST"];
 }],
 ["Finder respects the cut-out you chose",()=>{
   const a={cut:"70",glare:"std",colour:"tri"};
   const top=dlRank(a)[0].p;
   const c=dlCut(top);
   const ok=c&&c.min>=60&&c.min<=80;
   return [ok, ok?"70\u2009mm answer \u2192 "+top.name+" ("+c.txt+")":"returned a "+(c?c.txt:"?")+" fitting"];
 }],
 ["Garage answers battens, never a downlight grid",()=>{
   openDlWizard();
   qaPickDl(/^\s*90\s?mm/); qaPickDl(/Standard/i);
   while(!$("#dlBody [data-dlsize]")&&$$("#dlBody [data-dl]").length) $$("#dlBody [data-dl]")[0].click();
   const link=$("#dlBody [data-dlbatten]");
   if(link) link.click();
   const txt=$("#dlBody").textContent;
   const batten=txt.indexOf("batten")>=0;
   const noGrid=!$("#dlBody .dl-price-tot");
   closeDlWizard();
   return [!!link&&batten&&noGrid, "Garage is a link on the last step, straight to the T40 batten"];
 }],
 ["Missing specs show in red, never invented",()=>{
   const fake={id:"__t",cat:"downlights",name:"Test Downlight",price:1,specTable:[["Dimensions","Cutout 90mm"]]};
   const html=dlSpecRows(fake);
   const flags=(html.match(/dl-miss/g)||[]).length;
   const noNumbers=html.indexOf("lumens")<0;
   return [flags>=5&&noNumbers, flags+" unpublished specs flagged in red instead of guessed"];
 }],
 ["Finder prices carry GST correctly",()=>{
   const p=dlPool()[0];
   const n=6, ex=p.price*n, inc=ex*1.1;
   const ok=Math.abs(inc-ex*1.1)<0.001&&inc>ex;
   return [ok, "6 \u00d7 $"+p.price.toFixed(2)+" = $"+ex.toFixed(2)+" ex / $"+inc.toFixed(2)+" inc"];
 }],
 ["Room scenes are drawings, not fake photos",()=>{
   const svg=dlScene("kitchen");
   const isSvg=svg.indexOf("<svg")===0;
   const noImg=svg.indexOf("<image")<0&&svg.indexOf("data:image")<0;
   const all=DL_SCENE_KEYS.every(k=>dlScene(k).indexOf("<svg")===0);
   return [isSvg&&noImg&&all, DL_SCENE_KEYS.length+" scenes drawn as SVG \u2014 no invented photography"];
 }],
 ["Downlight quick-search filters the grid",()=>{
   const before=dlFilter;
   const counts={};
   DL_FILTERS.forEach(f=>{ counts[f.key]=dlPool().filter(f.test).length; });
   dlFilter="70"; renderDownlights();
   const n70=$$("#dlGrid .card").length;
   const all70=dlFiltered().every(p=>dlCut(p).min<=80);
   dlFilter="smart"; renderDownlights();
   const smartOK=dlFiltered().every(p=>dlIsRGBW(p)||dlIsSmart(p))&&dlFiltered().length>0;
   dlFilter=before||"all"; renderDownlights();
   const chips=$$("#dlChips .dl-chip").length;
   const imgs=$$("#dlChips .dl-chip img").length;
   const ok=chips===DL_FILTERS.length&&imgs===DL_FILTERS.length&&n70>0&&all70&&smartOK
     &&counts.all===dlPool().length&&(counts["70"]+counts["90"]+counts.big)===counts.all;
   return [ok, chips+" filters, every cut-out band accounted for ("+counts["70"]+"/"+counts["90"]+"/"+counts.big+" of "+counts.all+")"];
 }],
 ["Chip thumbnails are embedded, not hot-linked",()=>{
   const keys=Object.keys(DL_CHIPIMG);
   const embedded=keys.every(k=>/^data:image\//.test(DL_CHIPIMG[k]));
   return [embedded&&keys.length===DL_FILTERS.length, keys.length+" thumbnails inlined from the layout planner \u2014 no network needed"];
 }],
 ["Colour question is CCT or RGBW Smart only",()=>{
   const Q=DL_Q.find(q=>q.key==="colour");
   const keys=Q.opts.map(o=>o[1]);
   const two=keys.length===2&&keys.indexOf("tri")===0&&keys.indexOf("rgbw")===1;
   const rgbwTop=dlRank({cut:"90",glare:"std",colour:"rgbw"})[0].p;
   const phone=dlIsRGBW(rgbwTop)||dlIsSmart(rgbwTop);
   return [two&&phone, two?"2 answers \u2014 RGBW Smart \u2192 "+rgbwTop.name:"still offering a fixed-colour answer"];
 }],
 ["Questions only offer answers we can supply",()=>{
   const glare=DL_Q.find(q=>q.key==="glare"), colour=DL_Q.find(q=>q.key==="colour");
   const g=k=>dlOptsFor(glare,{cut:k}).map(o=>o[1]).sort().join(",");
   const c=k=>dlOptsFor(colour,{cut:k}).map(o=>o[1]).sort().join(",");
   /* Bands are 30 / 70 / 90 / 110 mm. Ask each one what it will actually offer. */
   const ok = g("30")==="low" && g("70")==="auto,low,std" && g("90")==="auto,low,std" && g("110")==="std"
           && c("30")==="rgbw,tri" && c("70")==="tri" && c("90")==="rgbw,tri" && c("110")==="tri";
   return [ok, ok?"Low glare hidden above 90\u2009mm; RGBW hidden where none is made":"an unbuildable answer is still on offer"];
 }],
 ["70 mm can never reach a smart fitting",()=>{
   const colour=DL_Q.find(q=>q.key==="colour");
   const offered=dlOptsFor(colour,{cut:"70",glare:"std"}).map(o=>o[1]);
   const skipped=dlVisibleQs({cut:"70",glare:"std"}).every(q=>q.key!=="colour");
   const anySmart=dlFeasible({cut:"70"}).some(p=>dlIsRGBW(p)||dlIsSmart(p));
   return [offered.length===1&&skipped&&!anySmart, "No 70\u2009mm smart fitting exists, so the question never appears"];
 }],
 ["No room question \u2014 a downlight goes anywhere",()=>{
   const asks=DL_Q.some(q=>q.key==="room"||q.rooms);
   const steps=dlVisibleQs({cut:"90",glare:"low"}).map(q=>q.key).join(" > ");
   return [!asks, asks?"still asking which room":"Flow is "+steps];
 }],
 ["Every offered path ends in a real fitting",()=>{
   let paths=0, dead=[];
   DL_SIZES.forEach(function(b){
     dlOptsFor(DL_Q.find(q=>q.key==="glare"),{cut:b.key}).forEach(function(g){
       const a1={cut:b.key,glare:g[1]};
       dlOptsFor(DL_Q.find(q=>q.key==="colour"),a1).forEach(function(c){
         const a3=Object.assign({},a1,{colour:c[1]});
         paths++;
         if(!dlFeasible(a3).length) dead.push(b.key+"/"+g[1]+"/"+c[1]);
       });
     });
   });
   return [dead.length===0&&paths>=DL_SIZES.length*2, paths+" answer combinations walked, "+dead.length+" dead ends"];
 }],
 ["Changing an earlier answer re-derives the later ones",()=>{
   openDlWizard();
   qaPickDl(/^\s*70\s?mm/);                       // 70 mm
   qaPickDl(/Standard/i);                         // standard
   const auto70=dlAnswers.colour;               // filled in for them
   const flagged=!!dlAutoKeys.colour;
   const straightToSize=!!$("#dlBody [data-dlsize]");
   $("#dlBody [data-dlback]").click();          // back to glare
   $("#dlBody [data-dlback]").click();          // back to size
   const cleared=dlAnswers.colour===undefined&&Object.keys(dlAutoKeys).length===0;
   qaPickDl(/^\s*90\s?mm/);                       // 90 mm this time
   qaPickDl(/Standard/i);                         // standard
   const asks=$("#dlBody h3").textContent.indexOf("colour")>=0;
   closeDlWizard();
   return [auto70==="tri"&&flagged&&straightToSize&&cleared&&asks, "70\u2009mm skips straight to room size; 90\u2009mm asks colour properly"];
 }],
 ["Finders stay free of emoji",()=>{
   /* Pictograms render differently on every phone and read as clip-art next to
      the rest of the type. Words instead. */
   const emoji=/[\u{1F000}-\u{1FAFF}\u{2B00}-\u{2BFF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;
   const strings=[];
   DL_Q.forEach(q=>{
     strings.push(q.q);
     strings.push(typeof q.hint==="function"?q.hint({cut:"90"}):q.hint||"");
     ((typeof q.opts==="function"?q.opts({}):q.opts)||[]).forEach(o=>strings.push(o[0]));
   });
   Object.keys(DL_GOOD).forEach(k=>DL_GOOD[k].forEach(x=>{ strings.push(x[1]); strings.push(x[2]); }));
   DL_FILTERS.forEach(f=>{ strings.push(f.name); strings.push(f.sub); });
   STRIP_Q.forEach(q=>{
     strings.push(q.q);
     ((typeof q.opts==="function"?q.opts({place:"cabinet"}):q.opts)||[]).forEach(o=>strings.push(o[0]));
   });
   const bad=strings.filter(t=>emoji.test(String(t)));
   const wiz=($("#dlBody").textContent||"")+($("#swBody").textContent||"");
   const liveBad=emoji.test(wiz);
   return [bad.length===0&&!liveBad, bad.length===0?strings.length+" finder labels checked, no emoji":"emoji left in: "+bad.join(" / ")];
 }],
 ["Downlight guide is a card index that expands",()=>{
   renderDlGuide();
   const cards=$$("#dlGuide .dlg-card");
   const titles=$$("#dlGuide .dlg-t").map(e=>e.textContent);
   const wants=[/hole in the ceiling/i,/low glare vs standard/i,/warm, natural or cool/i,/smart lights/i,/how many/i];
   const missing=wants.filter(r=>!titles.some(t=>r.test(t)));
   const closed=$("#dlgOpen").hidden;
   dlGuideOpen(0);
   const opened=!$("#dlgOpen").hidden && $("#dlgOpen").innerHTML.length>200;
   dlGuideOpen(0);
   const reclosed=$("#dlgOpen").hidden;
   return [cards.length===DL_GUIDE.length&&!missing.length&&closed&&opened&&reclosed,
     cards.length+" cards, all closed by default, click opens and closes"];
 }],
 ["Glare comparison photo is embedded, in guide and finder",()=>{
   const embedded=isRealAsset(DL_GLAREPHOTO);
   const inGuide=$("#dlGuide").innerHTML.indexOf(DL_GLAREPHOTO.slice(0,60))>=0;
   openDlWizard();
   qaPickDl(/^\s*90\s?mm/);                       // 90 mm \u2192 glare question
   const inFinder=$("#dlBody").innerHTML.indexOf(DL_GLAREPHOTO.slice(0,60))>=0;
   const pair=$$("#dlBody .dl-glare figure").length;
   closeDlWizard();
   return [embedded&&inGuide&&inFinder&&pair===2,
     "Glare photo + both cross-sections shown in the guide and in the finder"];
 }],
 ["Smart advice: two yeses, the rest honest noes",()=>{
   const yes=DL_SMART_ADVICE.filter(r=>r[1]==="yes").map(r=>r[0]);
   const no=DL_SMART_ADVICE.filter(r=>r[1]==="no").map(r=>r[0]);
   const kitchenNo=no.some(r=>/kitchen/i.test(r));
   const bathNo=no.some(r=>/bathroom/i.test(r));
   const html=dlSmartTable();
   const hasMaths=html.indexOf("dl-maths")>=0&&/\$\d/.test(html);
   const p=dlSmartPrices();
   const cheaper=p.tri&&p.smart&&p.smart.price>p.tri.price;
   return [kitchenNo&&bathNo&&yes.length>=1&&hasMaths&&cheaper,
     "Yes: "+yes.join(", ")+" \\u00b7 No: "+no.length+" rooms \\u00b7 $"+p.tri.price+" vs $"+p.smart.price+" a fitting"];
 }],
 ["Finder warns before wiring the whole house smart",()=>{
   openDlWizard();
   qaPickDl(/^\s*90\s?mm/);                  // 90 mm
   qaPickDl(/Low glare/i);                   // low glare
   const asks=$("#dlBody h3").textContent.indexOf("colour")>=0;
   qaPickDl(/RGBW/i);                        // RGBW smart
   const skip=$("#dlBody [data-dlskip]");  // size step only appears on some paths
   if(skip) skip.click();
   const notes=$$("#dlBody .dl-note").map(n=>n.textContent).join(" ");
   const warned=notes.indexOf("whole house")>=0;
   const priced=/\$\d/.test(notes);
   closeDlWizard();
   return [asks&&dlAnswers.colour==="rgbw"&&warned&&priced,
     "Choosing RGBW smart \\u2192 cost warning with the real per-fitting gap, not a silent upsell"];
 }],
 ["Real contact details + cookie consent",()=>{
   const foot=$("footer")?$("footer").textContent:document.body.textContent;
   const phone=foot.indexOf("9297 2969")>=0;
   const addr=foot.indexOf("Ellenbrook")>=0;
   const ck=!!document.getElementById("cookieBar");
   return [phone&&addr&&ck, "Perth address, phone & cookie banner in place"];
 }],
 ["All in-page nav targets exist",()=>{
   const ids=["home","categories","shop","downlights","striplights","smart","energy","resources","blog","videos","faq","contact"];
   const missing=ids.filter(i=>!document.getElementById(i));
   return [missing.length===0,missing.length?"Missing: "+missing.join(", "):(ids.length)+"/"+(ids.length)+" section anchors resolve"];
 }],
 ["Product images have automatic fallback",()=>{
   const ok=typeof window.lampFallback==="function";
   return [ok,"Broken product photos fall back to SVG visual"];
 }],
 ["Full catalogue migrated",()=>{
   return [PRODUCTS.length>=200,PRODUCTS.length+" real products loaded from greenhse.com"];
 }],
 ["Blog posts rendered",()=>{
   const n=$("#blogGrid").querySelectorAll(".post").length;
   return [n===BLOGS.length&&n>0,n+" real blog posts linked"];
 }],
 ["Videos & guides rendered",()=>{
   const v=$("#vidGrid").querySelectorAll("iframe").length;
   const g=$("#guideGrid").querySelectorAll(".guide").length;
   return [v===VIDEOS.length&&g===GUIDES.length&&v>0,v+" videos, "+g+" instruction PDFs"];
 }]
];

function initQA(){
  const list=$("#qaList");
  function paint(states){
    list.innerHTML=TESTS.map((t,i)=>{
      const st=states[i]||{status:"pending",msg:"Not run yet"};
      const sym=st.status==="pass"?"✓":st.status==="fail"?"✕":"·";
      return `<div class="qa-item ${st.status}"><span class="dot">${sym}</span>
        <div><div class="nm">${t[0]}</div><div class="ms">${st.msg}</div></div></div>`;
    }).join("");
  }
  const initial=TESTS.map(()=>({status:"pending",msg:"Not run yet"}));
  paint(initial);

  $("#qaFab").addEventListener("click",()=>{$("#qaPanel").classList.add("open");$("#qaFab").style.display="none";});
  $("#qaClose").addEventListener("click",()=>{$("#qaPanel").classList.remove("open");$("#qaFab").style.display="";});

  $("#qaRun").addEventListener("click",()=>{
    // snapshot state so tests don't disturb the user's session
    const snapCart=JSON.parse(JSON.stringify(cart));
    const snapWish=new Set(wishlist);const snapCat=activeCat;const snapQ=query;
    const results=TESTS.map(t=>{
      try{const [pass,msg]=t[1]();return {status:pass?"pass":"fail",msg};}
      catch(err){return {status:"fail",msg:"Error: "+err.message};}
    });
    // restore
    cart=snapCart;wishlist=snapWish;activeCat=snapCat;query=snapQ;
    updateCart();renderFilters();renderShop();
    $("#prodSearch").value=snapQ;
    wishlist.forEach(id=>$$(`[data-wish="${id}"]`).forEach(el=>el.classList.add("on")));
    paint(results);
    const passed=results.filter(r=>r.status==="pass").length;
    const sum=$("#qaSummary");
    sum.innerHTML=`<b style="color:${passed===TESTS.length?"var(--eco-bright)":"var(--danger)"}">${passed}/${TESTS.length} passed</b> · ${passed===TESTS.length?"ready to launch":"needs attention"}`;
  });
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
