/* ============================================================
   home/12-boot-and-wiring.js
   strip demo photos, scroll-reveal observers, wizard auto-open wiring, global click delegation, init()
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- Strip demos (real lit photos supplied by Greenhse) ---------- */
// Returns the DEMOIMG set for a product id, or null when we have no real
// photos of that strip. Never substitutes a different product's photos.
function demoSetFor(id){
  if(typeof DEMOIMG==="undefined"||!DEMOIMG.byProduct) return null;
  const key=DEMOIMG.byProduct[id]||DEMOIMG.byProduct[baseId(id)];
  return key?DEMOIMG[key]:null;
}
function demoStateBtns(set,pfx){
  return set.states.map((s,i)=>
    '<button type="button" class="sl-demo-state'+(i===0?" is-on":"")+'" data-demo="'+pfx+'" data-demoi="'+i+'">'+
    '<img src="'+s.img+'" alt="'+s.label+'" loading="lazy"><span>'+s.label+'</span></button>').join("");
}
// Swap the big photo when a colour swatch is clicked.
function demoWire(root){
  if(!root) return;
  root.querySelectorAll("[data-demo]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const pfx=btn.dataset.demo, i=+btn.dataset.demoi;
      const set=demoSetFor(pfx)||(typeof DEMOIMG!=="undefined"?DEMOIMG[pfx]:null);
      if(!set) return;
      const stage=root.querySelector('[data-demostage="'+pfx+'"]');
      const cap=root.querySelector('[data-democap="'+pfx+'"]');
      if(stage) stage.src=set.states[i].img;
      if(cap) cap.textContent=set.states[i].label+(set.states[i].note?" \u2014 "+set.states[i].note:"");
      root.querySelectorAll('[data-demo="'+pfx+'"]').forEach(b=>b.classList.toggle("is-on",b===btn));
    });
  });
}
function renderStripDemos(){
  if(typeof DEMOIMG==="undefined") return;
  const host=$("#slDemoList"); if(!host) return;
  const ids=Object.keys(DEMOIMG.byProduct||{});
  const blocks=ids.map(id=>{
    const set=DEMOIMG[DEMOIMG.byProduct[id]]; if(!set) return "";
    const p=findP(id);
    const s0=set.states[0];
    const kit=[set.controller].concat(set.remotes||[]).filter(Boolean).map(k=>
      '<figure><img src="'+k.img+'" alt="'+k.label+'" loading="lazy">'+
      '<figcaption><b>'+k.label+'</b><small>'+k.note+'</small></figcaption></figure>').join("");
    return '<div class="sl-demo">'+
      '<div class="sl-demo-head"><h4>'+set.name+'</h4><p>'+set.blurb+'</p></div>'+
      '<div class="sl-demo-main">'+
        '<div><figure class="sl-demo-stage">'+
          '<img src="'+s0.img+'" data-demostage="'+id+'" alt="'+set.name+'">'+
          '<figcaption data-democap="'+id+'">'+s0.label+(s0.note?" \u2014 "+s0.note:"")+'</figcaption>'+
        '</figure>'+
        '<div class="sl-demo-states">'+demoStateBtns(set,id)+'</div>'+
        (p?'<p class="sl-demo-note">In the range above as \u201c'+p.name+'\u201d \u00b7 $'+p.price+'/m</p>':"")+
        '</div>'+
        '<div class="sl-demo-kit">'+kit+'</div>'+
      '</div></div>';
  }).join("");
  if(!blocks) return;
  host.innerHTML=blocks;
  demoWire(host);
  $("#slDemos").hidden=false;
}
// Compact version used inside the finder kit screen and the product modal.
function demoPanel(id){
  const set=demoSetFor(id); if(!set) return "";
  const s0=set.states[0];
  return '<div class="sw-demo" data-demoroot="1">'+
    '<figure class="sw-demo-stage"><img src="'+s0.img+'" data-demostage="'+id+'" alt="'+set.name+'"></figure>'+
    '<div class="sw-demo-states">'+demoStateBtns(set,id)+'</div>'+
    '<p class="sw-demo-cap" data-democap="'+id+'">'+s0.label+(s0.note?" \u2014 "+s0.note:"")+'</p>'+
    '</div>';
}

// Channel profiles. Anything the supplier photographed but that has no
// catalogue product is shown AS unlisted rather than being invented as a
// buyable option; anything in the catalogue with no photo stays flagged.
function renderChannels(){
  if(typeof CHANIMG==="undefined") return;
  const grid=$("#slChanGrid"); if(!grid) return;
  const cards=(CHANIMG.profiles||[]).map(pr=>{
    const buyable=!pr.unlisted&&pr.optLabels&&pr.optLabels.length;
    const tag=buyable?'button':'figure';
    const dim=pr.dimImg?'<div class="sl-chan-dimfig"><img src="'+pr.dimImg+'" alt="'+pr.photoName+' cross-section with dimensions" loading="lazy"><span>Supplier cross-section \u2014 '+pr.dims+'</span></div>':"";
    const blackFig=pr.blackImg?'<div class="sl-chan-alt"><img src="'+pr.blackImg+'" alt="'+pr.photoName+' in black" loading="lazy"><span>Black finish \u2014 '+(pr.blackDims||pr.dims)+'</span></div>':"";
    return '<'+tag+' class="sl-chan'+(buyable?' is-buyable':'')+'"'+
      (buyable?' data-chanopt="'+pr.optLabels[0].replace(/"/g,"&quot;")+'" type="button"':'')+'>'+
    '<img src="'+pr.img+'" alt="'+pr.photoName+' aluminium channel profile" loading="lazy">'+
    '<figcaption class="sl-chan-body">'+
      '<h4>'+pr.photoName+'</h4>'+
      '<table class="sl-chan-spec"><tbody>'+
        '<tr><th>Size</th><td>'+pr.dims+'</td></tr>'+
        '<tr><th>Internal</th><td>'+pr.inner+'</td></tr>'+
        '<tr><th>Length</th><td>3m</td></tr>'+
        '<tr><th>Finishes</th><td>'+pr.finishes+'</td></tr>'+
      '</tbody></table>'+
      dim+blackFig+
      '<p class="sl-chan-use">'+pr.use+'</p>'+
      (pr.unlisted?'<span class="sl-chan-unlisted"><b>Not currently a listed option.</b> The supplier makes this profile but it isn\u2019t in our channel range yet \u2014 call us on (08) 9297 2969 if you need it.</span>':'<span class="sl-chan-buy">Choose finish &amp; add to cart \u2192</span>')+
    '</figcaption></'+tag+'>';
  }).join("");
  if(!cards) return;
  grid.innerHTML=cards;
  const miss=CHANIMG.noPhoto||[];
  if(miss.length){
    const f=$("#slChanFlag");
    f.innerHTML='We also stock <b>'+miss.join("</b>, <b>")+'</b> \u2014 call us on (08) 9297 2969 and we\u2019ll sort it for you.';
    f.hidden=false;
  }
  $("#slChans").hidden=false;
}

function init(){
  $("#yr").textContent=new Date().getFullYear();
  loadState();
  if(typeof STRIPIMG!=="undefined"){
    PRODUCTS.forEach(p=>{ if(STRIPIMG.products&&STRIPIMG.products[p.id]) p.img=STRIPIMG.products[p.id]; });
    const mg=$("#slMoodGrid");
    if(mg&&STRIPIMG.moods&&STRIPIMG.moods.length){
      mg.innerHTML=STRIPIMG.moods.map(m=>'<figure class="sl-mood"><img src="'+m.img+'" alt="'+m.label+'" loading="lazy"><span>'+m.label+'</span></figure>').join("");
      $("#slMoods").hidden=false;
    }
  }
  renderStripDemos();
  renderChannels();
  // The catalogue contains the same physical product twice in some sections
  // (e.g. TR24V-ALL in Transformers and TR24V-ALL-1 in Strip Lights). Give the
  // duplicate the full options / description / specs / photo of its base entry
  // so every entry point shows complete product information.
  PRODUCTS.forEach(p=>{
    const bid=baseId(p.id);
    if(bid===p.id)return;
    const base=PRODUCTS.find(x=>x.id===bid);
    if(base&&base.name===p.name){
      if((!p.options||!p.options.length)&&base.options&&base.options.length){p.options=base.options;p.price=base.price;}
      if(!p.desc&&base.desc)p.desc=base.desc;
      if((!p.specTable||!p.specTable.length)&&base.specTable)p.specTable=base.specTable;
    }
  });
  // The 7.5W/m Long Run COB finally has a supplier datasheet, so both catalogue
  // entries get the real reel photo and the real spec table instead of the short
  // hand-written stub. IP-specific rows stay per-product.
  if(typeof COBIMG!=="undefined"){
    // the new "long run" answer illustrates itself with the real strip photo
    if(typeof STRIPIMG!=="undefined"&&STRIPIMG.places&&!STRIPIMG.places.longrun)
      STRIPIMG.places.longrun=COBIMG.img.lit;
    (COBIMG.products||[]).forEach(id=>{
      const p=findP(id); if(!p) return;
      p.img=COBIMG.img.reel;
      const ipRow=(COBIMG.ipGrades||[]).find(g=>id.indexOf(g[0])>-1);
      p.specTable=[["IP rating",ipRow?(ipRow[0]+" \u2014 "+ipRow[1]+" \u00b7 "+ipRow[2]):"See options"]]
        .concat(COBIMG.specs||[]).concat([["Price","$16.00 per metre ex GST"]]);
      if(!p.features||!p.features.length){
        p.features=["Dot-free COB \u2014 one continuous line, no visible LEDs",
                    "480 LEDs/m, CRI >90 \u2014 colours look true",
                    "20m from a single feed with no voltage drop",
                    "Only 7.5W per metre \u2014 low heat, low running cost",
                    "Cuts every 50mm, bends to a 50mm diameter"];
      }
      if(!p.includes||!p.includes.length){
        p.includes=["LED strip cut to your length","150mm 20AWG leads on both ends",
                    "3M adhesive backing","Connection guide",
                    "Note: 24V driver sold separately"];
      }
    });
  }
  [typeof TRIMG!=="undefined"?TRIMG:null, typeof CTRLIMG!=="undefined"?CTRLIMG:null].forEach(B=>{
    if(B&&B.products) PRODUCTS.forEach(p=>{ const k=B.products[p.id]?p.id:(B.products[baseId(p.id)]?baseId(p.id):null); if(k) p.img=B.products[k]; });
  });
  fillMenus();renderCats();renderFilters();renderShop();renderBlog();renderVideos();renderFAQ();updateCart();
  renderInstall();
  initAppScroll();
  { const pr=$(".ig-pdfrow"); if(pr&&typeof GUIDES!=="undefined") pr.innerHTML=GUIDES.map(g=>'<a href="'+g[1]+'" target="_blank" rel="noopener" class="ig-pdf">'+g[0]+' \u2197</a>').join(""); }
  applyTemp(2700);

  /* delegated clicks */
  document.addEventListener("click",e=>{
    const dlgc=e.target.closest("[data-dlg]");
    if(dlgc){ dlGuideOpen(+dlgc.dataset.dlg); return; }
    if(e.target.closest("[data-dlgclose]")){ dlGuideOpen(dlgOpenIdx); return; }
    const mqb=e.target.closest("[data-mq]");
    if(mqb){setModalQty(+mqb.dataset.mq);return;}
    const tile=e.target.closest("[data-optidx]");
    if(tile){ selectModalOpt(+tile.dataset.optidx); return; }
    const chan=e.target.closest("[data-chanopt]");
    if(chan){
      const label=chan.dataset.chanopt;
      const p=findP(typeof CHANIMG!=="undefined"?CHANIMG.product:"");
      if(p){
        openModal(p.id);
        const i=(p.options||[]).findIndex(o=>o.label===label);
        if(i>=0) selectModalOpt(i);
      }
      return;
    }
    /* kit parts list -> full product page, with the variant this kit uses preselected */
    const pkv=e.target.closest("[data-pkview]");
    if(pkv){
      const p=findP(pkv.dataset.pkview);
      if(p){
        openProductOverWizard(p.id,pkv.dataset.pkviewopt||"");
      }
      return;
    }
    const oc=e.target.closest("[data-opt]");
    if(oc){selectModalOpt(+oc.dataset.opt);return;}
    const add=e.target.closest("[data-add]");
    if(add){const id=add.dataset.add;const p=findP(id);
      if(add.dataset.frommodal){
        const overWiz=$("#modal").classList.contains("over-wiz");
        addToCart(id, modalOpt?modalOpt.label:null, modalOpt?modalOpt.price:null, modalQty);
        toast(p.name+(modalOpt?" · "+modalOpt.label:"")+(modalQty>1?" \u00d7"+modalQty:"")+" added to cart");
        closeModal();
        /* the finder sits above the cart drawer, so step out of it first */
        if(overWiz&&typeof closeStripWizard==="function") closeStripWizard();
        openCart();return;
      }
      if(p.options&&p.options.length){openModal(id);return;}
      addToCart(id);toast(p.name+" added to cart");return;}
    const wish=e.target.closest("[data-wish]");
    if(wish){toggleWish(wish.dataset.wish);return;}
    const view=e.target.closest("[data-view]");
    if(view){openModal(view.dataset.view);return;}
    const ij=e.target.closest("[data-instjump]");
    if(ij){ const g=document.getElementById("mInstall"),mb=$("#modalBody"); if(g&&mb) mb.scrollTo({top:g.offsetTop-16,behavior:"smooth"}); return; }
    const io=e.target.closest("[data-instopen]");
    if(io){ openModalGuide(io.dataset.instopen); return; }
    const pkg=e.target.closest("[data-pkg]");
    if(pkg){ swPackageStrip=findP(pkg.dataset.pkg); swPkgSel={}; renderWizard(); return; }
    const pkgadd=e.target.closest("[data-pkgadd]");
    if(pkgadd){ addPackageToCart(); return; }
    const swb=e.target.closest("[data-swback]");
    if(swb){ if(swStep>0){ const QS=swVisibleQs(); swStep=Math.min(swStep,QS.length)-1; const Q=QS[swStep]; if(Q) delete swAnswers[Q.key]; } renderWizard(); return; }
    const pkgback=e.target.closest("[data-pkgback]");
    if(pkgback){ swPackageStrip=null; renderWizard(); return; }
    const sw=e.target.closest("[data-sw]");
    const swn=e.target.closest("[data-swnum]");
    if(swn){const QS=swVisibleQs();const Q=QS[swStep];const inp=$("#swLenInput");const v=parseFloat(inp&&inp.value);
      if(!v||v<=0){ if(inp){inp.style.borderColor="#c0392b"; inp.focus();} return; }
      swAnswers[Q.key]=String(Math.min(99,v));swStep++;renderWizard();return;}
    if(sw){const QS=swVisibleQs();const Q=QS[swStep];const OP=(typeof Q.opts==="function"?Q.opts(swAnswers):Q.opts);swAnswers[Q.key]=OP[+sw.dataset.sw][1];swStep++;renderWizard();return;}
    const more=e.target.closest("[data-more]");
    if(more){const id=more.dataset.more;if(expanded.has(id))expanded.delete(id);else expanded.add(id);renderShop();
      const blk=$(`[data-catblock="${id}"]`);if(blk)blk.scrollIntoView({behavior:"smooth",block:"nearest"});return;}
    const swr=e.target.closest("[data-swrestart]");
    if(swr){swAnswers={};swStep=0;swPackageStrip=null;renderWizard();return;}
    const catEl=e.target.closest("[data-cat]");
    if(catEl){activeCat=catEl.dataset.cat;query="";$("#prodSearch").value="";
      renderFilters();renderShop();closeMnav();
      $("#shop").scrollIntoView({behavior:"smooth"});return;}
    const q=e.target.closest("[data-q]");
    if(q){setQty(q.dataset.q,+q.dataset.d);return;}
    const rm=e.target.closest("[data-rm]");
    if(rm){removeLine(rm.dataset.rm);return;}
    const route=e.target.closest("[data-route]");
    if(route){e.preventDefault();const r=route.dataset.route;
      if(LEGAL[r]){openLegal(r);} else {toast("“"+route.textContent.trim()+"” connects to your CMS at launch");}
      return;}
  });

  /* search */
  $("#prodSearch").addEventListener("input",e=>{query=e.target.value;renderShop();});
  $("#searchBtn").addEventListener("click",()=>{$("#shop").scrollIntoView({behavior:"smooth"});setTimeout(()=>$("#prodSearch").focus(),400);});

  /* cart + wishlist + nav */
  $("#cartBtn").addEventListener("click",openCart);
  $("#cartClose").addEventListener("click",closeCart);
  $("#cartScrim").addEventListener("click",closeCart);
  /* Real checkout: push this browser cart into Magento, then hand over to the
     checkout page. Anything Magento refuses is named rather than dropped. */
  $("#checkoutBtn").addEventListener("click",function(){
    if(!cart.length){toast("Your cart is empty");return;}
    var A=window.GreenhseAccount, C=window.GreenhseCheckout, M=window.GreenhseMagento;
    if(!A||!C||!M){ toast("Checkout is still loading — one moment"); return; }
    if(!A.signedIn()){ location.href="/account.html?next=%2Fcheckout.html"; return; }
    var btn=this; btn.disabled=true; var was=btn.textContent; btn.textContent="Preparing checkout…";
    var lines=[], unknown=[];
    cart.forEach(function(l){
      var sku=M.skuFor(l.id);
      if(sku) lines.push({sku:sku,qty:l.qty});
      else{ var p=findP(l.id); unknown.push((p&&p.name)||l.id); }
    });
    if(!lines.length){
      btn.disabled=false; btn.textContent=was;
      toast("These items need a quote — use “Request a quote instead”");
      return;
    }
    C.syncCart(lines).then(function(r){
      var held=unknown.concat(r.rejected||[]);
      if(held.length) try{ sessionStorage.setItem("greenhse_cart_held", JSON.stringify(held)); }catch(e){}
      location.href="/checkout.html";
    }).catch(function(err){
      btn.disabled=false; btn.textContent=was;
      toast(err&&err.message==="SESSION_EXPIRED" ? "Please sign in again" : "Could not start checkout — please try again");
      if(err&&err.message==="SESSION_EXPIRED") location.href="/account.html?next=%2Fcheckout.html";
    });
  });

  $("#quoteBtn").addEventListener("click",()=>{
    if(!cart.length){toast("Your cart is empty");return;}
    var lines=cart.map(function(l){
      var p=findP(l.id)||{name:l.id};
      return "- "+p.name+(l.opt?" ("+l.opt+")":"")+"  x"+l.qty+
             "   $"+(l.price*l.qty).toFixed(2)+" ex-GST";
    });
    var body=["Hi Greenhse,","","I'd like a quote for the following:","",
      lines.join("\n"),"",
      "Subtotal (ex-GST): $"+cartTotal().toFixed(2),
      "Total (inc GST):   $"+(cartTotal()*1.1).toFixed(2),"",
      "Name:","Phone:","Site / project:","",
      "(Sent from greenhse.com)"].join("\n");
    window.location.href="mailto:hello@greenhse.com"+
      "?subject="+encodeURIComponent("Quote request - "+cartCount()+" item(s)")+
      "&body="+encodeURIComponent(body);
    toast("Opening your email app with the quote");
  });
  $("#wishBtn").addEventListener("click",()=>{
    toast(wishlist.size?wishlist.size+" item(s) saved to wishlist":"Tap the heart on a product to save it");
  });
  $("#menuBtn").addEventListener("click",openMnav);
  $("#mnavClose").addEventListener("click",closeMnav);
  $("#scrim").addEventListener("click",closeMnav);
  $("#mAcc").querySelector("button").addEventListener("click",()=>$("#mAcc").classList.toggle("open"));

  /* product option dropdown */
  document.addEventListener("change",e=>{
    if(e.target&&e.target.id==="optSelect"){ selectModalOpt(+e.target.value); }
    if(e.target&&e.target.classList&&e.target.classList.contains("pk-sel")){ swPkgSel[e.target.dataset.pksel]=e.target.value; renderPackage(); }
  });
  /* modal */
  $("#modalClose").addEventListener("click",closeModal);
  $("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal();});
  document.addEventListener("keydown",e=>{
    if(e.key!=="Escape")return;
    const m=$("#modal");
    /* product page opened from inside the finder: close just that layer and stop,
       so the later "close every overlay" handler doesn't take the kit down with it */
    if(m&&m.classList.contains("over-wiz")){ closeModal(); e.stopImmediatePropagation(); return; }
    closeModal();closeCart();closeMnav();
  });
  /* keyboard: Enter / Space on a kit row photo or name opens the product page */
  document.addEventListener("keydown",e=>{
    if(e.key!=="Enter"&&e.key!==" "&&e.key!=="Spacebar")return;
    const pkv=e.target&&e.target.closest?e.target.closest("[data-pkview]"):null;
    if(!pkv)return;
    e.preventDefault();
    openProductOverWizard(pkv.dataset.pkview,pkv.dataset.pkviewopt||"");
  });

  /* Smart Life tunable-white demo */
  $("#phoneRange").addEventListener("input",e=>{applyTemp(+e.target.value);});

  /* FAQ accordion */
  $("#faqList").addEventListener("click",e=>{
    const btn=e.target.closest("button");if(!btn)return;
    const q=btn.parentElement;const open=q.classList.toggle("open");
    btn.setAttribute("aria-expanded",open);
  });

  /* forms */
  wireForm("newsForm",[["#nName",v=>v.trim().length>0],["#nEmail",isEmail]],"You're subscribed — welcome aboard!");
  wireForm("contactForm",[["#cName",v=>v.trim().length>0],["#cEmail",isEmail],["#cMsg",v=>v.trim().length>0]],"Thanks — we'll be in touch shortly.");

  /* header scroll shadow */
  addEventListener("scroll",()=>{$("#header").classList.toggle("scrolled",scrollY>10);},{passive:true});

  /* scroll reveal */
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target);}}),{threshold:.12});
  $$(".reveal").forEach(el=>io.observe(el));

  // strip light finder: render + auto-open after 3s in view
  renderStrips();
  // Any click that takes you to the strip section opens the finder — every time,
  // even if you're already standing in the section.
  document.addEventListener("click",function(e){
    const a=e.target.closest('a[href="#striplights"]');
    if(a){ clearTimeout(swTimer); swTimer=setTimeout(openStripWizard, 300); }
  });
  const slSec=document.getElementById("striplights");
  if(slSec){
    let slIn=false;
    const wizOpen=()=>$("#stripWizard").classList.contains("open");
    /* The downlights section sits directly above this one, so its bottom edge
       drags the strip section into view while you're still reading it. Hold off
       while the downlight finder is open, or while the middle of the screen is
       still inside the downlights section. */
    const dlBusy=()=>{
      const d=document.getElementById("dlWizard");
      if(d&&d.classList.contains("open")) return true;
      const ds=document.getElementById("downlights"); if(!ds) return false;
      const r=ds.getBoundingClientRect(), vh=window.innerHeight;
      /* The guide makes this section very tall. Hold off until it has mostly
         left the screen, not just until its midpoint has. */
      return r.top<vh && r.bottom>vh*0.15;
    };
    /* returns false if it was held off, so the caller can try again later
       instead of latching the section as "already seen" */
    const enterStrip=()=>{ if(dlBusy()) return false; if(!wizOpen()) openStripWizard(); return true; };
    // Opens the instant any part of the strip section touches the viewport
    const io2=new IntersectionObserver(es=>es.forEach(en=>{
      if(en.isIntersecting){ if(!slIn){ if(enterStrip()) slIn=true; } }
      else { slIn=false; }
    }),{threshold:0, rootMargin:"0px 0px -2% 0px"});
    io2.observe(slSec);
    // Fallback for fast jumps / browsers that batch observer callbacks
    let slTick=false;
    window.addEventListener("scroll",()=>{
      if(slTick) return; slTick=true;
      requestAnimationFrame(()=>{
        slTick=false;
        const r=slSec.getBoundingClientRect(), vh=window.innerHeight;
        const vis=r.top < vh*0.95 && r.bottom > 0;
        // Re-arm as soon as the section is essentially off-screen either way,
        // so coming back to it opens the finder again — every time.
        const gone=r.bottom < vh*0.15 || r.top > vh*0.85;
        if(vis){ if(!slIn){ if(enterStrip()) slIn=true; } }
        else if(gone) slIn=false;
      });
    },{passive:true});
    // Any link or button pointing at the strip section opens it too — even if already in view
    document.addEventListener("click",e=>{
      let a=e.target.closest('a[href="#striplights"], [data-goto="striplights"], [data-cat="strip"], [data-chip="strip"]');
      if(!a){
        const el=e.target.closest("a,button");
        if(el && /^\s*strip\s*lights?\s*$/i.test(el.textContent||"")) a=el;
      }
      if(a){ [120,380,900].forEach(ms=>setTimeout(()=>{ slIn=true; enterStrip(); },ms)); }
    });
    // Landing straight on #striplights (shared link / refresh)
    if(location.hash==="#striplights"){ setTimeout(enterStrip,700); }
    window.addEventListener("hashchange",()=>{ if(location.hash==="#striplights") setTimeout(enterStrip,420); });
  }
  $("#stripFinderBtn").addEventListener("click",()=>{swShown=false;openStripWizard();});
  $("#swClose").addEventListener("click",closeStripWizard);
  $("#swKnow").addEventListener("click",closeStripWizard);
  $("#swScrim").addEventListener("click",closeStripWizard);

  /* Counts come from the catalogue itself — a hardcoded number goes stale
     the moment a product is added, and ours already had. */
  (function(){
    const n=$("#shopCount"); if(n) n.textContent=PRODUCTS.length;
    const c=$("#megaCount");
    if(c) c.textContent=new Set(PRODUCTS.map(p=>p.cat)).size;
  })();

  /* ---------- downlight finder ---------- */
  renderDownlights();
  const dlBtn=$("#dlFinderBtn");
  if(dlBtn) dlBtn.addEventListener("click",openDlWizard);
  const dlC=$("#dlClose"); if(dlC) dlC.addEventListener("click",closeDlWizard);
  const dlK=$("#dlKnow");  if(dlK) dlK.addEventListener("click",closeDlWizard);
  const dlS=$("#dlScrim"); if(dlS) dlS.addEventListener("click",closeDlWizard);

  /* Deep links from the category pages: open the right finder on arrival. */
  function hashFinder(){
    if(location.hash==="#strip-finder"){ dlAutoShown=true; openStripWizard(); }
    if(location.hash==="#dl-finder"){ dlAutoShown=true; openDlWizard(); }
  }
  if(/^#(strip|dl)-finder$/.test(location.hash)) setTimeout(hashFinder,400);
  window.addEventListener("hashchange",hashFinder);

  /* Opens on any link into the section, and once per visit when the section
     first comes into view. Deliberately gentler than the strip finder — two
     wizards fighting over the same scroll is worse than one. */
  const dlSec=document.getElementById("downlights");
  if(dlSec){
    const wizBusy=()=>{
      const s=$("#stripWizard");
      return (s&&s.classList.contains("open"))||$("#dlWizard").classList.contains("open");
    };
    const enterDl=()=>{ if(!wizBusy()) openDlWizard(); };
    let dlTimer=null;
    /* threshold has to stay at 0: with the guide attached this section is
       several screens tall, so a 25% ratio can never be reached. */
    const io3=new IntersectionObserver(es=>es.forEach(en=>{
      if(en.isIntersecting && !dlAutoShown){ dlAutoShown=true; dlTimer=setTimeout(enterDl,900); }
    }),{threshold:0});
    io3.observe(dlSec);
    /* If they've already started browsing the section — tapping a filter, a
       product, anything — don't drop a modal on top of them. */
    dlSec.addEventListener("click",e=>{
      if(e.target.closest("#dlFinderBtn")) return;
      dlAutoShown=true; clearTimeout(dlTimer);
    },true);
    document.addEventListener("click",e=>{
      const a=e.target.closest('a[href="#downlights"], [data-goto="downlights"]');
      if(a){ dlAutoShown=true; setTimeout(()=>{ if(!$("#stripWizard").classList.contains("open")) openDlWizard(); },320); }
    });
    if(location.hash==="#downlights"){ dlAutoShown=true; setTimeout(enterDl,700); }
    window.addEventListener("hashchange",()=>{ if(location.hash==="#downlights"){ dlAutoShown=true; setTimeout(enterDl,420); } });
  }

  /* wizard interactions — kept on their own listener so nothing here can
     disturb the strip finder's handler */
  document.addEventListener("click",e=>{
    const chip=e.target.closest("[data-dlfilter]");
    if(chip){ dlFilter=chip.dataset.dlfilter; renderDownlights(); return; }
    const bat=e.target.closest("[data-dlbatten]");
    if(bat){ dlBatten=true; renderDlWizard(); return; }
    const back=e.target.closest("[data-dlback]");
    if(back){
      if(dlBatten){ dlBatten=false; }
      else if(dlStep>0){ dlClearAuto(); dlStep--; const Q=dlVisibleQs()[dlStep]; if(Q) delete dlAnswers[Q.key]; }
      dlQty=0; dlPick=null; renderDlWizard(); return;
    }
    const rs=e.target.closest("[data-dlrestart]");
    if(rs){ dlAnswers={}; dlStep=0; dlQty=0; dlPick=null; dlBatten=false; dlAutoKeys={}; renderDlWizard(); return; }
    const opt=e.target.closest("[data-dl]");
    if(opt&&$("#dlWizard").classList.contains("open")){ dlAnswerCurrent(+opt.dataset.dl); return; }
    const sz=e.target.closest("[data-dlsize]");
    if(sz){
      const w=parseFloat(($("#dlW")||{}).value), l=parseFloat(($("#dlL")||{}).value);
      if(!w||!l||w<=0||l<=0){ [$("#dlW"),$("#dlL")].forEach(i=>{ if(i&&!parseFloat(i.value)) i.style.borderColor="#c0392b"; }); return; }
      dlAnswers.size=w+"x"+l;
      const auto=dlCount(w,l,!!dlWantLow(dlAnswers));
      dlQty=auto||1; dlStep++; renderDlWizard(); return;
    }
    const skip=e.target.closest("[data-dlskip]");
    if(skip){ dlAnswers.size="skip"; dlQty=1; dlStep++; renderDlWizard(); return; }
    const pk=e.target.closest("[data-dlpick]");
    if(pk){ dlPick=pk.dataset.dlpick; dlQty=dlQty||1; renderDlWizard(); $("#dlBody").scrollTo({top:0,behavior:"smooth"}); return; }
    const qt=e.target.closest("[data-dlqty]");
    if(qt){ dlQty=Math.max(1,Math.min(99,(dlQty||1)+ +qt.dataset.dlqty)); renderDlResult(); return; }
    const dadd=e.target.closest("[data-dladd]");
    if(dadd){
      const id=dadd.dataset.dladd, n=Math.max(1,parseInt(dadd.dataset.dlqn,10)||1), p=findP(id);
      if(!p) return;
      addToCart(id,null,null,n);
      toast(p.name+" \u00d7"+n+" added to cart");
      closeDlWizard(); openCart(); return;
    }
  });

  // legal overlay close
  $("#legalClose").addEventListener("click",closeLegal);
  $("#legal").addEventListener("click",e=>{ if(e.target.id==="legal") closeLegal(); });
  // cookie consent
  (function(){
    const bar=$("#cookieBar"); if(!bar) return;
    let done=false; try{ done=localStorage.getItem("gh_cookie")!==null; }catch(e){}
    if(!done) setTimeout(()=>bar.classList.add("show"),1300);
    function set(v){ try{localStorage.setItem("gh_cookie",v);}catch(e){} bar.classList.remove("show"); }
    const a=$("#ckAccept"), d=$("#ckDecline");
    if(a) a.addEventListener("click",()=>set("accepted"));
    if(d) d.addEventListener("click",()=>set("declined"));
  })();

  // Escape closes any overlay
  document.addEventListener("keydown",e=>{
    if(e.key!=="Escape")return;
    /* product page opened from inside the finder: step back to the kit, don't nuke it */
    const mo=$("#modal");
    if(mo&&mo.classList.contains("over-wiz")){ closeModal(); return; }
    closeModal();closeCart();closeMnav();closeStripWizard();closeDlWizard();closeLegal();
    const s=$("#search");if(s&&s.classList.contains("open"))s.classList.remove("open");
  });
  // back to top
  const btt=$("#backTop");
  if(btt){
    window.addEventListener("scroll",()=>{ btt.classList.toggle("show",window.scrollY>900); },{passive:true});
    btt.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  }
  // restore saved cart & wishlist
  loadState();
  refreshWishBadge();
  updateCart();
  $$("[data-wish]").forEach(el=>el.classList.toggle("on",wishlist.has(el.dataset.wish)));

  initQA();
}

