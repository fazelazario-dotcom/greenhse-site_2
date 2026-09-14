'use client';
import JSXStyle from 'styled-jsx/style';
import * as React from 'react';
import * as resizedImage from '../../lib/resizedImage';
let n = new Set(['cove', 'rgb', 'highlumen']),
  a = {
    tile: 640,
    cross: 320,
    panel: 1200,
  };
function O({ visual: e }) {
  switch (e) {
    case 'suspension':
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="Black linear suspension light">
          <rect width="400" height="300" fill="#fff" />
          <line x1="120" y1="40" x2="120" y2="150" stroke="#b9bcc0" strokeWidth="1.5" />
          <line x1="330" y1="40" x2="330" y2="196" stroke="#b9bcc0" strokeWidth="1.5" />
          <g transform="rotate(11 200 175)">
            <rect x="60" y="158" width="290" height="26" rx="3" fill="#1b1c1e" />
            <rect x="60" y="184" width="290" height="5" rx="2.5" fill="#f0e6cf" />
            <rect x="60" y="158" width="290" height="4" rx="2" fill="#3a3c40" />
          </g>
          <ellipse cx="205" cy="212" rx="150" ry="10" fill="#000" opacity="0.05" />
        </svg>
      );
    case 'modular':
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="Black linear modular lighting system">
          <rect width="400" height="300" fill="#fff" />
          <g stroke="#1b1c1e" strokeWidth="9" fill="none" strokeLinejoin="round">
            <polygon points="112,150 137,107 187,107 212,150 187,193 137,193" />
            <polygon points="212,150 237,107 287,107 312,150 287,193 237,193" />
            <polygon points="162,236 187,193 237,193 262,236 237,279 187,279" />
          </g>
          <g stroke="#1b1c1e" strokeWidth="8" fill="none">
            <line x1="70" y1="52" x2="330" y2="52" />
            <line x1="118" y1="80" x2="282" y2="80" />
          </g>
          <line x1="118" y1="26" x2="118" y2="52" stroke="#c2c5c9" strokeWidth="1.5" />
          <line x1="282" y1="26" x2="282" y2="52" stroke="#c2c5c9" strokeWidth="1.5" />
        </svg>
      );
    case 'cove':
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="Curved ceiling cove lighting install">
          <defs>
            <linearGradient id="coveRoom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#efe7dc" />
              <stop offset="100%" stopColor="#c9bdaf" />
            </linearGradient>
            <linearGradient id="coveGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff6e2" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#fffaf0" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff6e2" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#coveRoom)" />
          <path d="M0 96 Q 120 22 240 96 T 400 84 L400 0 L0 0 Z" fill="#e8ded1" />
          <path d="M0 96 Q 120 22 240 96 T 400 84" stroke="url(#coveGlow)" strokeWidth="7" fill="none" />
          <path d="M0 112 Q 120 38 240 112 T 400 100" stroke="#fff3dd" strokeWidth="20" fill="none" opacity="0.35" />
          <path d="M0 168 Q 130 122 260 176 T 400 160 L400 300 L0 300 Z" fill="#d8cbbd" />
          <path d="M0 168 Q 130 122 260 176 T 400 160" stroke="url(#coveGlow)" strokeWidth="5" fill="none" />
          <rect y="238" width="400" height="62" fill="#3b332b" opacity="0.55" />
          <ellipse cx="200" cy="255" rx="86" ry="17" fill="#fdf6e8" opacity="0.5" />
        </svg>
      );
    case 'rgb':
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="RGB strip lighting in a coffered ceiling">
          <rect width="400" height="300" fill="#0d1020" />
          <g>
            <rect x="18" y="24" width="168" height="118" rx="2" fill="#1b5cff" />
            <rect x="30" y="34" width="144" height="98" rx="2" fill="#3f7bff" opacity="0.75" />
            <rect x="214" y="24" width="168" height="118" rx="2" fill="#ff2a9d" />
            <rect x="226" y="34" width="144" height="98" rx="2" fill="#ff5bb4" opacity="0.75" />
            <rect x="18" y="166" width="168" height="118" rx="2" fill="#ff2a9d" />
            <rect x="30" y="176" width="144" height="98" rx="2" fill="#ff5bb4" opacity="0.75" />
            <rect x="214" y="166" width="168" height="118" rx="2" fill="#1b5cff" />
            <rect x="226" y="176" width="144" height="98" rx="2" fill="#3f7bff" opacity="0.75" />
          </g>
          <g fill="#fff">
            <ellipse cx="72" cy="60" rx="13" ry="8" />
            <ellipse cx="150" cy="60" rx="13" ry="8" />
            <ellipse cx="268" cy="60" rx="13" ry="8" />
            <ellipse cx="346" cy="60" rx="13" ry="8" />
            <ellipse cx="72" cy="202" rx="13" ry="8" />
            <ellipse cx="150" cy="202" rx="13" ry="8" />
            <ellipse cx="268" cy="202" rx="13" ry="8" />
            <ellipse cx="346" cy="202" rx="13" ry="8" />
          </g>
          <g stroke="#c9ccd6" strokeWidth="7">
            <line x1="200" y1="0" x2="200" y2="300" />
            <line x1="0" y1="154" x2="400" y2="154" />
          </g>
        </svg>
      );
    case 'highlumen':
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="High lumen strip light in a ceiling reveal">
          <defs>
            <linearGradient id="hlWash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e6e2da" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#hlWash)" />
          <path d="M0 118 Q 200 8 400 118 L400 0 L0 0 Z" fill="#f6f4ef" />
          <path d="M0 118 Q 200 8 400 118" stroke="#fff" strokeWidth="10" fill="none" />
          <path d="M0 134 Q 200 24 400 134" stroke="#fdf8ee" strokeWidth="26" fill="none" opacity="0.65" />
          <path d="M0 196 Q 200 250 400 196 L400 300 L0 300 Z" fill="#ded9d0" />
          <path d="M0 196 Q 200 250 400 196" stroke="#fff" strokeWidth="6" fill="none" />
          <circle cx="200" cy="160" r="70" fill="#fff" opacity="0.35" />
        </svg>
      );
    case 'downlight':
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="70mm dimmable downlight">
          <rect width="400" height="300" fill="#fff" />
          <circle cx="200" cy="150" r="92" fill="#f2f2f2" />
          <circle cx="200" cy="150" r="92" fill="none" stroke="#e2e2e2" strokeWidth="2" />
          <circle cx="200" cy="150" r="74" fill="#fafafa" stroke="#e8e8e8" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="58" fill="#fdfdfd" />
          <circle cx="200" cy="150" r="58" fill="none" stroke="#ededed" strokeWidth="1" />
          <ellipse cx="176" cy="126" rx="26" ry="18" fill="#fff" opacity="0.9" />
          <path d="M200 58 a92 92 0 0 1 65 27" stroke="#dcdcdc" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'track':
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="Black adjustable track light">
          <rect width="400" height="300" fill="#fff" />
          <rect x="70" y="58" width="260" height="16" rx="2" fill="#1b1c1e" />
          <rect x="186" y="74" width="28" height="26" rx="2" fill="#2a2c2f" />
          <g transform="rotate(18 200 150)">
            <rect x="152" y="100" width="96" height="104" rx="10" fill="#1b1c1e" />
            <rect x="152" y="100" width="96" height="10" rx="5" fill="#37393d" />
            <ellipse cx="200" cy="204" rx="48" ry="12" fill="#c98a3c" />
            <ellipse cx="200" cy="202" rx="34" ry="8" fill="#f0b465" />
          </g>
          <ellipse cx="212" cy="252" rx="86" ry="10" fill="#000" opacity="0.05" />
        </svg>
      );
    case 'driver':
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="24V LED driver">
          <rect width="400" height="300" fill="#fff" />
          <rect x="76" y="106" width="248" height="88" rx="6" fill="#26282b" />
          <rect x="76" y="106" width="248" height="10" rx="5" fill="#3a3d41" />
          <g fill="#4a4d52">
            <rect x="96" y="132" width="60" height="8" rx="4" />
            <rect x="96" y="150" width="94" height="6" rx="3" />
            <rect x="96" y="164" width="72" height="6" rx="3" />
          </g>
          <g fill="#d6d8db">
            <rect x="252" y="130" width="56" height="46" rx="3" />
          </g>
          <g stroke="#9aa0a6" strokeWidth="3" strokeLinecap="round">
            <line x1="262" y1="140" x2="262" y2="166" />
            <line x1="280" y1="140" x2="280" y2="166" />
            <line x1="298" y1="140" x2="298" y2="166" />
          </g>
          <path d="M64 150 q-18 0 -18 -16" stroke="#c8ccd0" strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="200" cy="206" rx="120" ry="9" fill="#000" opacity="0.05" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 300" role="img" aria-label="LED strip light">
          <rect width="400" height="300" fill="#fff" />
          <rect x="40" y="138" width="320" height="24" rx="3" fill="#1b1c1e" />
          <rect x="40" y="162" width="320" height="5" rx="2.5" fill="#f0e6cf" />
        </svg>
      );
  }
}
export default function Default({ product: e, fit: l = 'tile' }) {
  let c = n.has(e.visual),
    d = e.image ? 'photo' : c ? 'scene' : 'plate',
    [h, f] = React.useState(!1),
    u = React.useRef(null);
  return (
    React.useEffect(() => {
      u.current?.complete && u.current.naturalWidth > 0 && f(!0);
    }, []),
    (
      <div className={`jsx-f72412fe6fda6ecc visual visual--${d} visual--${l}`}>
        {e.image ? (
          <>
            {!h && <span aria-hidden="true" className="jsx-f72412fe6fda6ecc visual__skeleton" />}
            <img
              ref={u}
              src={resizedImage.resizedImage(e.image, a[l] || a.tile)}
              alt={e.name}
              loading={'panel' === l ? 'eager' : 'lazy'}
              fetchPriority={'panel' === l ? 'high' : void 0}
              decoding="async"
              onLoad={() => f(!0)}
              onError={() => f(!0)}
              className={'jsx-f72412fe6fda6ecc ' + ((h ? 'is-loaded' : '') || '')}
            />
          </>
        ) : (
          <O visual={e.visual} />
        )}
        <JSXStyle id="f72412fe6fda6ecc">
          {
            '.visual.jsx-f72412fe6fda6ecc{justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:relative;overflow:hidden}.visual__skeleton.jsx-f72412fe6fda6ecc{background:linear-gradient(100deg,#ececec 25%,#f6f6f6 45%,#ececec 65%) 0 0/200% 100%;animation:1.4s ease-in-out infinite visual-shimmer;position:absolute;inset:0}@keyframes visual-shimmer{0%{background-position:150% 0}to{background-position:-50% 0}}.visual--plate.jsx-f72412fe6fda6ecc svg{background:var(--bg-plate);width:100%;height:100%}.visual--scene.jsx-f72412fe6fda6ecc svg{width:100%;height:100%}.visual--photo.jsx-f72412fe6fda6ecc img.jsx-f72412fe6fda6ecc{object-fit:contain;opacity:0;width:100%;height:100%;transition:opacity .25s}.visual--photo.jsx-f72412fe6fda6ecc img.is-loaded.jsx-f72412fe6fda6ecc{opacity:1}.visual--tile.jsx-f72412fe6fda6ecc{padding:12%}.visual--panel.jsx-f72412fe6fda6ecc{padding:8%}.visual--cross.visual--photo.jsx-f72412fe6fda6ecc img.jsx-f72412fe6fda6ecc{object-fit:cover}.visual--cross.visual--plate.jsx-f72412fe6fda6ecc{padding:6%}'
          }
        </JSXStyle>
      </div>
    )
  );
}
