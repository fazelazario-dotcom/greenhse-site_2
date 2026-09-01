/* ============================================================
   home/11-applications-carousel.js
   the auto-scrolling applications carousel (CSS scroll-snap, no library)
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- Applications carousel ----------
   Advances on its own so the project photos are seen without anyone touching
   anything, and stops the moment someone takes over — hover, focus, or their
   own scroll. Honours prefers-reduced-motion by not auto-advancing at all. */
function initAppScroll(){
  const track=document.getElementById("appTrack"); if(!track) return;
  const wrap=track.closest(".appscroll");
  const prev=wrap.querySelector(".prev"), next=wrap.querySelector(".next");
  const calm=window.matchMedia("(prefers-reduced-motion: reduce)");
  const step=()=>{ const s=track.querySelector(".appslide");
                   return s ? s.getBoundingClientRect().width+16 : 300; };
  const atEnd=()=> track.scrollLeft+track.clientWidth >= track.scrollWidth-4;
  function go(dir){
    if(dir>0 && atEnd()) track.scrollTo({left:0,behavior:"smooth"});
    else track.scrollBy({left:dir*step(),behavior:"smooth"});
  }
  prev.addEventListener("click",()=>{ pause(); go(-1); });
  next.addEventListener("click",()=>{ pause(); go(1); });

  let timer=null, held=false;
  function tick(){ if(!held && !document.hidden) go(1); }
  function start(){ if(calm.matches||timer) return; timer=setInterval(tick,3200); }
  function stop(){ clearInterval(timer); timer=null; }
  /* a nudge from the user parks it for a while rather than fighting them */
  let release=null;
  function pause(){ held=true; clearTimeout(release); release=setTimeout(()=>{held=false;},9000); }

  wrap.addEventListener("mouseenter",()=>{held=true;});
  wrap.addEventListener("mouseleave",()=>{held=false;});
  track.addEventListener("focusin",()=>{held=true;});
  track.addEventListener("focusout",()=>{held=false;});
  track.addEventListener("pointerdown",pause);
  track.addEventListener("wheel",pause,{passive:true});
  track.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight"){pause();go(1);e.preventDefault();}
    if(e.key==="ArrowLeft"){pause();go(-1);e.preventDefault();}
  });
  /* only run while the section is actually on screen */
  if("IntersectionObserver" in window){
    new IntersectionObserver(es=>{ es[0].isIntersecting ? start() : stop(); },{threshold:.2})
      .observe(wrap);
  } else start();
  calm.addEventListener&&calm.addEventListener("change",()=>{ calm.matches?stop():start(); });
}

function renderInstall(){
  const host=$("#installIndex"); if(!host) return;
  host.innerHTML=CATEGORIES.map(c=>{
    const items=PRODUCTS.filter(p=>p.cat===c.id); if(!items.length) return "";
    /* The count is spec sheets, not products — that is what the heading
       promises and what people are actually looking for on this page. */
    const nSheets=items.reduce((n,p)=>n+sheetsFor(p).length,0);
    return '<details class="ig-cat"><summary>'+c.name+' <span>'+
      (nSheets? nSheets+' spec sheet'+(nSheets===1?'':'s') : items.length+' products')+
      '</span></summary>'+
      '<ul class="ig-list">'+items.map(p=>{
        const sh=sheetsFor(p);
        const links=sh.map(a=>'<a class="ig-sheet" href="/docs/'+a[0]+'" target="_blank" rel="noopener" '+
          'title="'+esc(a[1])+'">'+esc(a[1])+' \u2193</a>').join("");
        return '<li><button data-instopen="'+p.id+'">'+p.name+'<span>Guide \u2192</span></button>'+
               (links?'<div class="ig-sheets">'+links+'</div>':'')+'</li>';
      }).join("")+'</ul></details>';
  }).join("");
}

// Photo for a wizard answer button. Every photo here is the real product or a
// real installation for THAT answer - we never borrow a different strip's photo
// to fill a gap. If there is no honest photo the button stays text-only.
function qOptPhoto(Q,o,a){
  const val=o[1];
  if(Q.key==="place") return (typeof STRIPIMG!=="undefined"&&STRIPIMG.places&&STRIPIMG.places[val])?STRIPIMG.places[val]:null;
  if(Q.key==="colour"&&a.place!=="cove"&&a.place!=="wet"){
    // Purpose-shot photos of the same strip in each colour mode, framed the
    // same way, so the three answers compare like for like.
    if(typeof STRIPIMG!=="undefined"&&STRIPIMG.colour&&STRIPIMG.colour[val])
      return STRIPIMG.colour[val];
    if(typeof DEMOIMG!=="undefined"){
      if(val==="cct"&&DEMOIMG.cct) return DEMOIMG.cct.states[DEMOIMG.cct.states.length-1].img;
      if(val==="rgb"&&DEMOIMG.rgb) return DEMOIMG.rgb.states[0].img;
    }
    if(val==="single"&&typeof STRIPIMG!=="undefined"&&STRIPIMG.products)
      return STRIPIMG.products["ST24V-SMD-ALL-1"]||null;
  }
  return null;
}

