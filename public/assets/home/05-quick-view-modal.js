/* ============================================================
   home/05-quick-view-modal.js
   the product quick-view modal: gallery, options, spec table, related items
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- QUICK VIEW MODAL ---------- */
function gst(v){return (v*1.1).toFixed(2);}
function baseId(id){const m=String(id||"").match(/^(.*)-\d+$/);return m?m[1]:id;}
function optImg(p,opt){
  if(!opt||!opt.label)return null;
  const L=opt.label;
  if(typeof CTRLIMG!=="undefined"&&p&&CTRLIMG.byProduct){
    const BP=CTRLIMG.byProduct;
    if(BP[p.id]&&BP[p.id][L])return BP[p.id][L];
    const bid=baseId(p.id);
    if(bid!==p.id&&BP[bid]&&BP[bid][L])return BP[bid][L];
  }
  if(typeof TRIMG!=="undefined"&&TRIMG.options&&TRIMG.options[L])return TRIMG.options[L];
  if(typeof CTRLIMG!=="undefined"&&CTRLIMG.options&&CTRLIMG.options[L])return CTRLIMG.options[L];
  if(typeof CHANIMG!=="undefined"&&CHANIMG.options&&CHANIMG.options[L])return CHANIMG.options[L].img;
  return null;
}
// Colour-variant caveat for a channel option whose supplier photo is the silver
// finish. Empty string when the photo genuinely shows that colour.
function optImgNote(p,opt){
  if(!opt||!opt.label)return "";
  if(typeof CHANIMG!=="undefined"&&CHANIMG.options&&CHANIMG.options[opt.label])
    return CHANIMG.options[opt.label].note||"";
  return "";
}
function productHasVariantPhotos(p){
  return !!(p&&p.options&&p.options.some(o=>optImg(p,o)));
}
window.__optShotFallback=function(img){
  if(img.dataset.fb)return;               /* one retry only */
  img.dataset.fb="1";
  var p=(typeof modalProduct!=="undefined"&&modalProduct)?modalProduct:null;
  if(p&&p.img&&p.img!==img.getAttribute("src")){ img.src=p.img; return; }
  if(window.lampFallback) window.lampFallback(img);
};
function setModalImg(){
  const el=$("#modalImg"); if(!el||!modalProduct)return;
  const src=optImg(modalProduct,modalOpt);
  if(src){
    /* Never leave the panel blank: a missing variant photo falls back to the
       product's own shot rather than an empty box. */
    el.innerHTML='<img class="pimg mimg optshot" src="'+src+'" alt="'+(modalOpt?modalOpt.label:modalProduct.name).replace(/"/g,"&quot;")+'" onerror="window.__optShotFallback&&window.__optShotFallback(this)">';
    el.classList.add("hasimg");
  }
  else { el.innerHTML=media(modalProduct,"mimg"); }
  const note=$("#modalImgNote");
  if(note){
    const cnote=optImgNote(modalProduct,modalOpt);
    if(cnote){
      note.textContent=cnote;
      note.hidden=false;
    } else if(productHasVariantPhotos(modalProduct)&&modalOpt&&!src){
      note.textContent="Photo shows another unit from this range \u2014 specs below are for the "+modalOpt.label+".";
      note.hidden=false;
    } else note.hidden=true;
  }
}
function openModal(id){
  const p=findP(id);if(!p)return;
  modalProduct=p; modalOpt=(p.options&&p.options.length)?p.options[0]:null; modalQty=1;
  const catName=shortName((CATEGORIES.find(c=>c.id===p.cat)||{}).name||"");
  $("#modalImg").innerHTML=media(p,"mimg");
  const hasOpt=p.options&&p.options.length;
  const optBlock=hasOpt?`
    <div class="opt-wrap">
      <label class="opt-label" for="optSelect">Choose option / size — ${p.options.length} available</label>
      <div class="opt-select-wrap">
        <select id="optSelect" class="opt-select" aria-label="Choose option">
          ${p.options.map((o,i)=>`<option value="${i}">${o.label}  —  $${o.price.toFixed(2)} ex-GST</option>`).join("")}
        </select>
      </div>
      <div class="opt-gallery" id="optGallery">
        ${(()=>{
          /* Several finishes of the same profile legitimately share one supplier photo.
             Without a marker three tiles just look like a duplicated bug, so the repeats
             get a colour swatch and say whose photo they are actually showing. */
          /* Work out, per photo, how many options share it and whether ANY of them
             carries a "photo is really the silver one" caveat. Marking by position
             would wrongly crown whichever finish happens to be listed first. */
          const share={}, noted={};
          p.options.forEach(o=>{
            const im=optImg(p,o); if(!im) return;
            share[im]=(share[im]||0)+1;
            if(optImgNote(p,o)) noted[im]=true;
          });
          return p.options.map((o,i)=>{
            const im=optImg(p,o);
            const dup=im&&share[im]>1;
            const fin=(o.label.match(/\b(White|Black|Silver|Grey|Gray)\b/)||[])[1]||"";
            const sw=fin?`<i class="ot-sw ot-sw-${fin.toLowerCase()}" title="${fin}"></i>`:"";
            const note=optImgNote(p,o);
            const shown=(note.match(/shows the (\w+) finish/i)||[])[1];
            // caveated tile -> say whose photo it really is; shared-but-honest photo
            // (one shot that genuinely pictures every finish) -> say that instead
            const mark=shown?`<i class="ot-dup">Photo shows ${shown}</i>`
                     :(dup&&!noted[im]?`<i class="ot-dup">One photo \u2014 all finishes</i>`:"");
            return `<button class="opt-tile${i===0?" sel":""}${im?"":" nophoto"}${mark?" is-dup":""}" data-optidx="${i}" aria-label="${o.label.replace(/"/g,"&quot;")}">
              ${im?`<img src="${im}" alt="" loading="lazy">`:`<span class="ph">photo<br>coming</span>`}
              <span>${sw}${o.label}</span><em>$${o.price.toFixed(2)}</em>${mark}
            </button>`;
          }).join("");
        })()}
      </div>
    </div>`:"";
  const unit=(modalOpt?modalOpt.price:p.price);
  $("#modalBody").innerHTML=`
    <span class="cat-label">${catName}</span>
    <h2>${p.name}</h2>
    <div class="mprice">
      ${p.options&&p.options.length
        ? `<span class="price big">$<span id="modalPrice">${unit.toFixed(2)}</span></span>`
        : `<span class="price big" data-sku="${p.id}"><span id="modalPrice" data-price-target>$${unit.toFixed(2)}</span></span>`}
      <span class="gstline">ex-GST &nbsp;·&nbsp; $<span id="modalGst">${gst(unit)}</span> inc GST</span>
    </div>
    <p class="desc">${p.desc||""}</p>
    ${demoPanel(p.id)}
    ${optBlock}
    <div id="optDetail" class="opt-detail"></div>
    <div class="buy-row">
      <div class="stepper" aria-label="Quantity">
        <button data-mq="-1" aria-label="Decrease quantity">−</button>
        <span id="modalQty">1</span>
        <button data-mq="1" aria-label="Increase quantity">+</button>
      </div>
      <button class="btn btn-dark buy-btn" data-add="${p.id}" data-frommodal="1">Add to cart</button>
      <button class="wish-detail${wishlist.has(p.id)?' on':''}" data-wish="${p.id}" aria-label="Save to wishlist">
        <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
    </div>
    <div class="trust">
      <span>\u2713 Australian certified</span><span>\u2713 Perth stock &amp; support</span><span>\u2713 Fast WA delivery</span>
    </div>
    <a class="inst-jump" data-instjump="1">\u2193 Installation help &amp; guide for this product</a>
    <div class="dsec">
      <h4>What\u2019s in the box</h4>
      <ul class="ticks">${(p.includes||[]).map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="dsec">
      <h4>Key features</h4>
      <ul class="ticks">${(p.features||[]).map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="dsec">
      <h4>Specifications</h4>
      <table class="spectable"><tbody>${(p.specTable||[]).map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table>
    </div>
    <div class="dsec install-guide" id="mInstall">
      <h4>Installation guide</h4>
      ${guideHTML(p)}
    </div>
    <a class="view-live" href="${cleanUrl(p.url)}">View the full product page \u2192</a>
    ${relatedHTML(p)}`;
  demoWire($("#modalBody"));
  renderOptDetail();
  setModalImg();
  $("#modal").classList.add("open");
}
function relatedHTML(p){
  const rel=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
  if(!rel.length) return "";
  return `<div class="dsec related"><h4>You might also need</h4>
    <div class="rel-grid">${rel.map(r=>`
      <button class="rel-card" data-view="${r.id}">
        <div class="rel-img">${(typeof media==="function")?media(r,"img"):lamp(r.shape,r.tone)}</div>
        <span class="rel-name">${r.name}</span>
        <span class="rel-price">$${r.price.toFixed(2)}</span>
      </button>`).join("")}</div></div>`;
}
function renderOptDetail(){
  const el=$("#optDetail"); if(!el) return;
  // channel variants carry a supplier cross-section drawing for the exact profile
  let dimFig="";
  if(modalOpt&&typeof CHANIMG!=="undefined"&&CHANIMG.options&&CHANIMG.options[modalOpt.label]){
    const d=CHANIMG.options[modalOpt.label].dim;
    if(d) dimFig='<figure class="opt-dimfig"><img src="'+d+'" alt="'+modalOpt.label.replace(/"/g,"&quot;")+' cross-section with dimensions" loading="lazy">'+
      '<figcaption>Supplier cross-section for this profile \u2014 dimensions in mm.</figcaption></figure>';
  }
  if(!modalOpt||((!modalOpt.specs||!modalOpt.specs.length)&&!dimFig)){el.innerHTML="";return;}
  const specs=(modalOpt.specs&&modalOpt.specs.length)
    ? '<table class="spectable"><tbody>'+modalOpt.specs.map(r=>'<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>').join("")+'</tbody></table>'
    : "";
  el.innerHTML='<div class="opt-detail-head">Selected variant — '+modalOpt.label+'</div>'+specs+dimFig;
}
function updateModalPrice(){
  if(!modalProduct)return;
  const unit=(modalOpt?modalOpt.price:modalProduct.price);
  const mp=$("#modalPrice"); if(mp) mp.textContent=unit.toFixed(2);
  const mg=$("#modalGst"); if(mg) mg.textContent=gst(unit);
}
function selectModalOpt(idx){
  if(!modalProduct||!modalProduct.options)return;
  modalOpt=modalProduct.options[idx];
  const selEl=$("#optSelect"); if(selEl) selEl.value=String(idx);
  const g=$("#optGallery"); if(g) g.querySelectorAll(".opt-tile").forEach(t=>t.classList.toggle("sel",+t.dataset.optidx===idx));
  updateModalPrice();
  renderOptDetail();
  setModalImg();
}
function setModalQty(d){
  modalQty=Math.max(1,modalQty+d);
  const mq=$("#modalQty"); if(mq) mq.textContent=modalQty;
}
/* Opens the full product page on top of the strip finder without losing the kit
   behind it - close it and you are back on the same kit screen. */
function openProductOverWizard(id,optLabel){
  const p=findP(id); if(!p) return;
  openModal(id);
  if(optLabel&&p.options&&p.options.length){
    const i=p.options.findIndex(o=>o.label===optLabel);
    if(i>=0) selectModalOpt(i);
  }
  const wiz=$("#stripWizard")||document.querySelector(".stripwiz");
  const m=$("#modal");
  if(m&&wiz&&wiz.classList.contains("open")) m.classList.add("over-wiz");
  const mb=$("#modalBody"); if(mb) mb.scrollTop=0;
}
const closeModal=()=>{const m=$("#modal");m.classList.remove("open");m.classList.remove("over-wiz");};

