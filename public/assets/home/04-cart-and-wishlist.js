/* ============================================================
   home/04-cart-and-wishlist.js
   cart drawer: add/remove/totals ex- and inc-GST, plus the wishlist
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- CART ---------- */
const findP=id=>PRODUCTS.find(p=>p.id===id);
function addToCart(id,opt,price,qty){
  const p=findP(id);if(!p)return;
  const unit=(price!=null)?price:p.price;
  const key=lineKey(id,opt||null);
  const n=(qty&&qty>0)?qty:1;
  const line=cart.find(l=>l.key===key);
  if(line)line.qty+=n;else cart.push({key,id,opt:opt||null,price:unit,qty:n});
  updateCart();
}
function setQty(key,d){
  const line=cart.find(l=>l.key===key);if(!line)return;
  line.qty+=d;if(line.qty<=0)cart=cart.filter(l=>l.key!==key);
  updateCart();
}
function removeLine(key){cart=cart.filter(l=>l.key!==key);updateCart();}
function cartCount(){return cart.reduce((n,l)=>n+l.qty,0);}
function cartTotal(){return cart.reduce((s,l)=>s+l.price*l.qty,0);}
function updateCart(){
  saveState();
  const badge=$("#cartBadge");const n=cartCount();
  badge.textContent=n;badge.dataset.count=n;
  $("#cartTotal").textContent="$"+cartTotal().toFixed(2);
  const cg=$("#cartTotalGst"); if(cg) cg.textContent="$"+(cartTotal()*1.1).toFixed(2);
  const wrap=$("#cartItems");
  if(!cart.length){wrap.innerHTML=`<div class="cart-empty">Your cart is empty.<br>Add a few fittings to get started.</div>`;return;}
  wrap.innerHTML=cart.map(l=>{const p=findP(l.id);
    const vi=(l.opt&&typeof optImg==="function")?optImg(p,{label:l.opt}):null;
    return `
    <div class="ci">
      <div class="img${vi?" hasimg":""}">${vi?`<img class="pimg img" src="${vi}" alt="${l.opt}">`:((typeof media==="function")?media(p,"img"):lamp(p.shape,p.tone))}</div>
      <div class="det">
        <h4>${p.name}</h4>
        <div class="c">${shortName((CATEGORIES.find(c=>c.id===p.cat)||{}).name)}${l.opt?" · "+l.opt:""}</div>
        ${p.url?`<a class="ci-buy" href="${p.url}" target="_blank" rel="noopener">Buy on greenhse.com &#8599;</a>`:""}
        <div class="qty">
          <button data-q="${l.key}" data-d="-1" aria-label="Decrease">−</button>
          <span>${l.qty}</span>
          <button data-q="${l.key}" data-d="1" aria-label="Increase">+</button>
        </div>
      </div>
      <div class="rt">
        <span class="p">$${(l.price*l.qty).toFixed(2)}</span>
        <button class="rm" data-rm="${l.key}">Remove</button>
      </div>
    </div>`;}).join("");
}

/* ---------- WISHLIST ---------- */
function toggleWish(id){
  if(wishlist.has(id))wishlist.delete(id);else wishlist.add(id);
  saveState();
  refreshWishBadge();
  $$(`[data-wish="${id}"]`).forEach(el=>el.classList.toggle("on",wishlist.has(id)));
}
function refreshWishBadge(){
  const b=$("#wishBadge");b.textContent=wishlist.size;b.dataset.count=wishlist.size;
}

