/* Any product image that fails to load falls back to the branded placeholder
   instead of a broken-image icon — and heals itself the moment the real file
   is added. The static build did this per-tag with onerror; one capture-phase
   listener does the same for every image. */
addEventListener('error',function(e){
  var t=e.target;
  if(t&&t.tagName==='IMG'&&!t.dataset.fb&&!/photo-coming-soon/.test(t.src)){
    t.dataset.fb='1';t.src='/img/photo-coming-soon.svg';
  }
},true);
