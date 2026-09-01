/* ============================================================
   home/06-faq-toasts-and-chrome.js
   FAQ accordion, toast messages, mobile nav drawers, contact-form validation
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- COLOUR TEMPERATURE (signature) ---------- */
function applyTemp(k){
  const c=tempColor(k);
  const sc=$("#phoneScene"); if(sc) sc.style.setProperty("--ptemp",c);
  const pt=$("#phoneTemp"); if(pt) pt.textContent=`${k}K`;
}

/* ---------- FAQ ---------- */

function renderBlog(){
  $("#blogGrid").innerHTML=BLOGS.map(b=>`
    <a class="post" href="${b.url}" target="_blank" rel="noopener">
      <div class="top"></div>
      <div class="pbody">
        <p class="eyebrow">Greenhse Journal</p>
        <h3>${b.title}</h3>
        <span class="go">Read article
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>`).join("");
}
function renderVideos(){
  $("#vidGrid").innerHTML=VIDEOS.map(v=>`
    <div class="vid"><iframe class="frame" loading="lazy" src="https://www.youtube.com/embed/${v.id}" title="Greenhse video" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`).join("");
  $("#guideGrid").innerHTML=GUIDES.map(([t,u])=>`
    <a class="guide" href="${u}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
      <span>${t}</span>
    </a>`).join("");
}

function renderFAQ(){
  $("#faqList").innerHTML=FAQ.map(([q,a])=>`
    <div class="q"><button aria-expanded="false">${q}<span class="pm"></span></button>
    <div class="ans"><p>${a}</p></div></div>`).join("");
}

/* ---------- TOAST ---------- */
function toast(msg){
  const t=document.createElement("div");t.className="toast";
  t.innerHTML=`<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>${msg}`;
  $("#toasts").appendChild(t);
  setTimeout(()=>{t.style.opacity="0";t.style.transition="opacity .3s";setTimeout(()=>t.remove(),300);},2600);
}

/* ---------- DRAWERS / MOBILE NAV ---------- */
function openCart(){$("#cart").classList.add("open");$("#cartScrim").classList.add("show");}
function closeCart(){$("#cart").classList.remove("open");$("#cartScrim").classList.remove("show");}
function openMnav(){$("#mnav").classList.add("open");$("#scrim").classList.add("show");}
function closeMnav(){$("#mnav").classList.remove("open");$("#scrim").classList.remove("show");}

/* ---------- FORM VALIDATION ---------- */
const isEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function validateField(input,test){
  const field=input.closest(".field");
  const ok=test(input.value);
  field.classList.toggle("invalid",!ok);
  return ok;
}
function wireForm(formId,fields,successMsg){
  const form=$("#"+formId);
  form.addEventListener("submit",e=>{
    e.preventDefault();
    let ok=true;
    fields.forEach(([sel,test])=>{if(!validateField($(sel),test))ok=false;});
    if(ok){form.reset();toast(successMsg);}
  });
}

/* ============================================================
   INIT
   ============================================================ */
