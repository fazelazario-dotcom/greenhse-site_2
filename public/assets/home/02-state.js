/* ============================================================
   home/02-state.js
   the single state object: cart, wishlist, active filters, wizard answers
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- STATE ---------- */
let cart=[];          // {key,id,opt,price,qty}
let wishlist=new Set();
/* persistence — cart & wishlist survive refresh */
function saveState(){
  try{
    localStorage.setItem("gh_cart",JSON.stringify(cart));
    localStorage.setItem("gh_wish",JSON.stringify([...wishlist]));
  }catch(e){}
}
function loadState(){
  try{
    const c=JSON.parse(localStorage.getItem("gh_cart")||"[]");
    if(Array.isArray(c)) cart=c.filter(l=>l&&l.id&&findP(l.id));
    const w=JSON.parse(localStorage.getItem("gh_wish")||"[]");
    if(Array.isArray(w)) wishlist=new Set(w.filter(id=>findP(id)));
  }catch(e){}
}
let modalProduct=null, modalOpt=null, modalQty=1;
function lineKey(id,opt){return opt?id+"::"+opt:id;}
let activeCat="all";
let query="";
let expanded=new Set();

