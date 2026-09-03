/* ============================================================
   Greenhse — shared cart for pages outside the homepage app
   (product pages). Same localStorage cart the homepage drawer
   uses (gh_cart), same line shape {key,id,opt,price,qty}, plus a
   name/price snapshot so the drawer can render lines for products
   that are not in its own grid data. The checkout hand-off is the
   same as the homepage cart drawer: sign in -> push the cart into
   Magento (syncCart) -> /checkout/ -> ANZ Worldline hosted page.
   ============================================================ */
(function(){
  'use strict';
  function read(){try{var c=JSON.parse(localStorage.getItem('gh_cart')||'[]');return Array.isArray(c)?c:[];}catch(e){return [];}}
  function write(c){try{localStorage.setItem('gh_cart',JSON.stringify(c));}catch(e){}}
  function count(){return read().reduce(function(a,l){return a+(+l.qty||0);},0);}
  function parsePrice(t){var m=String(t||'').replace(/,/g,'').match(/([0-9]+(?:\.[0-9]+)?)/);return m?+m[1]:0;}
  function add(id,name,price,qty){
    var c=read();qty=Math.max(1,+qty||1);
    var line=null,i;
    for(i=0;i<c.length;i++){if(c[i].id===id&&!c[i].opt){line=c[i];break;}}
    if(line){line.qty+=qty;if(name)line.name=name;if(price)line.price=+price;}
    else c.push({key:id,id:id,opt:null,price:+price||0,qty:qty,name:name||id});
    write(c);return count();
  }
  window.GreenhseCart={read:read,write:write,add:add,count:count,parsePrice:parsePrice};

  /* ---- product-page wiring: [data-cart-add] button + #pdp-cartbar ---- */
  function boot(){
    var btn=document.querySelector('[data-cart-add]');
    if(!btn) return;
    var bar=document.getElementById('pdp-cartbar');
    function paint(){
      var n=count();
      if(bar){
        bar.hidden=!n;
        var el=bar.querySelector('[data-cart-count]');
        if(el)el.textContent=n+(n===1?' item':' items');
      }
    }
    btn.addEventListener('click',function(){
      /* prefer the LIVE price magento.js has painted over the baked one */
      var priceEl=document.querySelector('[data-price-target]');
      var price=parsePrice((priceEl&&priceEl.textContent)||btn.getAttribute('data-cart-price'));
      add(btn.getAttribute('data-cart-add'),btn.getAttribute('data-cart-name')||document.title,price,1);
      var was=btn.textContent;btn.textContent='✓ Added to cart';btn.disabled=true;
      setTimeout(function(){btn.textContent=was;btn.disabled=false;},900);
      paint();
    });
    var go=bar&&bar.querySelector('[data-cart-checkout]');
    if(go) go.addEventListener('click',function(){
      var A=window.GreenhseAccount,C=window.GreenhseCheckout,M=window.GreenhseMagento;
      if(!A||!C||!M){location.href='/checkout/';return;}
      if(!A.signedIn()){location.href='/account/?next=%2Fcheckout%2F';return;}
      go.disabled=true;var was=go.textContent;go.textContent='Preparing checkout…';
      var lines=[];
      read().forEach(function(l){
        var sku=(M.skuFor?M.skuFor(l.id):null)||(l.name?l.id:null);
        if(sku)lines.push({sku:sku,qty:l.qty});
      });
      if(!lines.length){go.disabled=false;go.textContent=was;location.href='/checkout/';return;}
      C.syncCart(lines).then(function(){location.href='/checkout/';})
        .catch(function(err){
          go.disabled=false;go.textContent=was;
          if(err&&err.message==='SESSION_EXPIRED')location.href='/account/?next=%2Fcheckout%2F';
          else alert('Could not start checkout — please try again.');
        });
    });
    paint();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
