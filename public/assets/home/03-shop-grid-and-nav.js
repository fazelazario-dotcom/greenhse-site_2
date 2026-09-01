/* ============================================================
   home/03-shop-grid-and-nav.js
   renders the nav menus, homepage category grid, footer links, filter chips and the Browse & Build product grid (renderShop / cardHTML)
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- RENDER: nav menus, category grid, footer ---------- */
/* Each category's real page (the ones that open with the 2026 banner artwork).
   Menu links and tiles navigate there; the in-page shop stays reachable via
   search and the filter chips. */
const CATPAGE={transformers:"/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/",fans:"/products/lighting-perth/air-flow/",batten:"/lighting-perth/led-batten-lights-perth/",ceiling:"/lighting-perth/led-ceiling-lights-perth/",downlights:"/products/lighting-perth/led-downlights-perth/",emergency:"/products/lighting-perth/emergency-lights/",flood:"/products/lighting-perth/led-flood-lights-perth/",highbay:"/products/lighting-perth/high-bay-lights/",industrial:"/lighting-perth/industrial-lighting-perth/",landscape:"/products/lighting-perth/led-garden-pool-lights-perth/",outdoor:"/products/lighting-perth/led-outdoor-wall-lights-perth/",commercial:"/lighting-perth/commercial-lighting-perth/",sensors:"/products/lighting-perth/security-sensors/",star:"/products/lighting-perth/led-star-lights/",strip:"/products/lighting-perth/led-strip-lights/",track:"/products/lighting-perth/led-track-lights-perth/",switches:"/products/lighting-perth/glass-light-switch-perth-html/",smart:"/automation/smart-lights-perth/"};
function fillMenus(){
  $("#megaCats").innerHTML=CATEGORIES.map(c=>
    `<a href="${CATPAGE[c.id]||"#shop"}">${c.name}<span class="k">${count(c.id)}</span></a>`).join("");
  $("#mCats").innerHTML=CATEGORIES.map(c=>`<a href="${CATPAGE[c.id]||"#shop"}">${c.name}</a>`).join("");
  $("#footCats").innerHTML=CATEGORIES.slice(0,8).map(c=>`<li><a href="${CATPAGE[c.id]||"#shop"}">${shortName(c.name)}</a></li>`).join("");
}
const shortName=n=>n.split(" / ")[0].replace(/\s*\(.*\)/,"");
const count=id=>PRODUCTS.filter(p=>p.cat===id).length;

const CAT_PICK={downlights:/downlight/i,strip:/rgb.*strip|strip light \/metre/i,highbay:/high bay/i,
 ceiling:/oyster|ceiling/i,fans:/fan/i,sensors:/sensor/i,landscape:/garden|bollard|spike/i,outdoor:/wall|up.?down/i,
 flood:/flood/i,batten:/batten/i,emergency:/exit|emergency/i,industrial:/tri.?proof|weather/i,
 track:/track/i,star:/star/i,switches:/switch|powerpoint/i,smart:/smart|wifi|camera/i,transformers:/transformer/i,school:/panel|led/i};
function catPhoto(cid){
  const rx=CAT_PICK[cid];
  if(rx){ const m=PRODUCTS.find(x=>x.cat===cid&&x.img&&rx.test(x.name)); if(m) return m.img; }
  const p=PRODUCTS.find(x=>x.cat===cid&&x.img);return p?p.img:"";
}
function pageSlug(p){
  let s=String(p.url||"").replace(/\/+$/,"").split("/").pop().replace(/\.html?$/,"");
  if(!s||s==="index")s=String(p.id||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  return s;
}
function catPageLinks(cid){
  const seen=new Set();
  return PRODUCTS.filter(p=>p.cat===cid)
    .map(p=>({name:p.name,slug:pageSlug(p),
      href:p.url?String(p.url).replace(/^https?:\/\/[^\/]+/,""):("product/"+pageSlug(p)+"/index.html")}))
    .filter(x=>x.slug&&!seen.has(x.slug)&&seen.add(x.slug));
}
/* Mock-up (Home_page_mock_up.pdf) calls for dark full-bleed photo tiles with the
   category name over them. We only own environment photography for a handful of
   categories - all of it shot for strip lighting - so a category gets a real scene
   only where that scene honestly shows that category's product doing its job.
   Everything else falls back to the product cut-out on the same dark tile, which
   keeps the grid consistent instead of mixing a mood shot with a white box.
   CAT_MOOD is deliberately small: see MOOD-TODO in CONTINUE-HERE.md for the list
   of categories still waiting on real photography. */
/* Category artwork (CATIMG, from Catalogue_images.pdf). Each banner already has
   the category name set into it, so the tile must not print the name a second
   time - the <h3> stays in the DOM for screen readers and SEO but is hidden. */
const CAT_MOOD={
  strip:      "Recessed ceiling coves & under-cabinet task light",
  landscape:  "Outdoor steps & garden edges",
  commercial: "Reception & retail counters"
};
function catMood(cid){
  if(typeof CATIMG!=="undefined"&&CATIMG.cats&&CATIMG.cats[cid])
    return {img:CATIMG.cats[cid].img,label:CATIMG.cats[cid].alt,
            baked:!!CATIMG.titleInArtwork};
  if(typeof STRIPIMG==="undefined"||!STRIPIMG.moods)return null;
  const want=CAT_MOOD[cid]; if(!want)return null;
  const m=STRIPIMG.moods.find(x=>x.label===want);
  return m?{img:m.img,label:m.label,baked:false}:null;
}
function catHasScene(cid){ return !!catMood(cid); }
function renderCats(){
  $("#catGrid").innerHTML=CATEGORIES.map(c=>{
    const mood=catMood(c.id);
    const img=catPhoto(c.id);
    let media;
    if(mood){
      media=`<img class="cat-scene" src="${mood.img}" loading="lazy" alt="${mood.label}">`;
    }else if(img){
      media=`<img class="cat-cut" src="${img}" loading="lazy" alt="${c.name}" onerror="window.catFallback(this)">`;
    }else{
      media=`<svg class="ic" viewBox="0 0 24 24" fill="none">${c.icon.split("M").filter(Boolean).map(d=>`<path d="M${d}"/>`).join("")}</svg>`;
    }
    const links=catPageLinks(c.id);
    const dir=links.length?`<details class="cat-links"><summary>Browse ${links.length} product page${links.length===1?"":"s"}</summary><ul>
      <li><a href="${CATPAGE[c.id]||("category/"+c.id+"/index.html")}" class="cl-all">All ${c.name} \u2192</a></li>
      ${links.map(x=>`<li><a href="${x.href}">${x.name}</a></li>`).join("")}
    </ul></details>`:"";
    const baked=!!(mood&&mood.baked);
    return `<div class="catcell"><a class="cat${mood?" has-scene":""}${baked?" name-in-art":""}" href="${CATPAGE[c.id]||"#shop"}">
      <div class="cat-photo">${media}</div>
      <div class="cat-info">
        <h3${baked?' class="vis-hidden"':""}>${c.name}</h3>
        <div class="cnt">${count(c.id)} product${count(c.id)===1?"":"s"}</div>
      </div>
    </a>${dir}</div>`;
  }).join("");
}

/* ---------- RENDER: filters + products ---------- */
function renderFilters(){
  const cats=[{id:"all",name:"All"}].concat(CATEGORIES.map(c=>({id:c.id,name:shortName(c.name)})));
  $("#filters").innerHTML=cats.map(c=>`<button class="chip${c.id===activeCat?" active":""}" data-cat="${c.id}">${c.name}</button>`).join("");
}
function filtered(){
  return PRODUCTS.filter(p=>{
    const okCat=activeCat==="all"||p.cat===activeCat;
    const q=query.trim().toLowerCase();
    const catName=(CATEGORIES.find(c=>c.id===p.cat)||{}).name||"";
    const okQ=!q||p.name.toLowerCase().includes(q)||catName.toLowerCase().includes(q)||
      Object.values(p.specs).join(" ").toLowerCase().includes(q)||
      (p.specTable||[]).map(r=>r[1]).join(" ").toLowerCase().includes(q)||
      p.id.toLowerCase().includes(q);
    return okCat&&okQ;
  });
}
function cardHTML(p){
  const catName=shortName((CATEGORIES.find(c=>c.id===p.cat)||{}).name||"");
  /* Spec chips were removed from the cards 1 Sep 2026 — the card is the
     light, its name and its price; specs live in the product modal and on
     the product's own page. */
  return `<article class="card" data-id="${p.id}">
      <div class="thumb" data-view="${p.id}">
        ${p.tag?`<span class="tag">${p.tag}</span>`:""}
        <button class="wish${wishlist.has(p.id)?" on":""}" data-wish="${p.id}" aria-label="Save to wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        ${media(p,"thumb")}
      </div>
      <div class="body">
        <span class="cat-label">${catName}</span>
        <h3 data-view="${p.id}" style="cursor:pointer">${p.name}</h3>
        <div class="foot">
          <span class="price">${p.options&&p.options.length?'<span class="from">from</span>':''}$${p.price.toFixed(2)}<span class="ex">ex-GST</span></span>
          <button class="add" data-add="${p.id}">${p.options&&p.options.length?'Options':'Add +'}</button>
        </div>
      </div>
    </article>`;
}
const PREVIEW=8;
function renderShop(){
  const host=$("#shopBody");
  const q=query.trim().toLowerCase();
  if(q){
    const list=filtered();
    if(list.length){ host.innerHTML=`<div class="prod-grid">${list.map(cardHTML).join("")}</div>`; return; }
    const sugg=["downlights","strip","highbay","sensors"].map(cid=>PRODUCTS.find(p=>p.cat===cid&&p.img)).filter(Boolean);
    host.innerHTML=`<div class="no-results">No fittings match "${query}". Try a product type (e.g. "downlight"), a spec (e.g. "IP65", "10W") or a colour ("tri-colour").</div>
      <div class="shop-hint" style="margin-top:18px">Popular right now:</div>
      <div class="prod-grid">${sugg.map(cardHTML).join("")}</div>`;
    return;
  }
  if(activeCat==="all"){
    // compact default: a few popular picks; categories above are the navigator
    const heroCats=["downlights","strip","highbay","ceiling","fans","sensors","landscape","outdoor"];
    const feat=[]; heroCats.forEach(cid=>{const p=PRODUCTS.find(x=>x.cat===cid&&x.img); if(p)feat.push(p);});
    host.innerHTML='<div class="shop-hint">Popular picks shown below — tap a category above (with photos), use the filters, or search to see the full range.</div>'
      +'<div class="prod-grid">'+feat.map(cardHTML).join("")+'</div>';
    return;
  }
  const c=CATEGORIES.find(x=>x.id===activeCat)||{name:"Products"};
  const items=PRODUCTS.filter(p=>p.cat===activeCat);
  const collapsed=!expanded.has(activeCat)&&items.length>PREVIEW;
  const moreBtn=items.length>PREVIEW
    ? `<button class="view-more" data-more="${activeCat}">${expanded.has(activeCat)?"Show less":("View all "+items.length+" \u2192")}</button>`
    : "";
  host.innerHTML=`<section class="cat-block${collapsed?" collapsed":""}" data-catblock="${activeCat}">
      <div class="cat-block-head">
        <h3>${c.name}</h3>
        <span class="cat-count">${items.length} product${items.length===1?"":"s"}</span>
      </div>
      <div class="prod-grid">${items.map(cardHTML).join("")}</div>
      ${moreBtn}
    </section>`;
}

