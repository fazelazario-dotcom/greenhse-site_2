'use client';
import { useState } from 'react';

/* Product photo gallery, demo-style: thumb rail + main image. The only
   client-side state on the product page. Falls back to a plain single
   image when there is just one photo. */
export default function Gallery({ images, alt }){
  const [i, setI] = useState(0);
  if(!images || !images.length) return null;
  if(images.length === 1){
    return (
      <div className="gallery">
        <div className="gallery__main">
          <div className="visual visual--photo visual--panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[0]} alt={alt} loading="eager" fetchPriority="high"/>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="gallery">
      <div role="tablist" aria-label={alt+' photos'} className="gallery__thumbs">
        {images.map((src, k)=>(
          <button key={src+k} type="button" role="tab" aria-selected={k===i}
                  className={'gallery__thumb'+(k===i?' is-active':'')}
                  onClick={()=>setI(k)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async"/>
          </button>
        ))}
      </div>
      <div className="gallery__main">
        <div className="visual visual--photo visual--panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[i]} alt={alt} loading="eager"/>
        </div>
      </div>
    </div>
  );
}
