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
    /* keep lines added from product pages too - they carry their own
       name/price snapshot even when the homepage grid doesn't know them */
    if(Array.isArray(c)) cart=c.filter(l=>l&&l.id&&(findP(l.id)||l.name));
    /* keep hearts saved from category and product pages too - the wishlist is
       only a badge count and an on/off state, so an id the homepage grid
       doesn't know costs nothing to hold on to. Dropping them here used to
       wipe a save the moment the customer came back to the homepage. */
    const w=JSON.parse(localStorage.getItem("gh_wish")||"[]");
    if(Array.isArray(w)) wishlist=new Set(w.filter(id=>typeof id==="string"&&id));
  }catch(e){}
}
let modalProduct=null, modalOpt=null, modalQty=1;
function lineKey(id,opt){return opt?id+"::"+opt:id;}
let activeCat="all";
let query="";
let expanded=new Set();

