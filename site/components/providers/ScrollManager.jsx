'use client';
import * as React from 'react';
import * as navigation from 'next/navigation';
export default function Default() {
  let e = navigation.usePathname();
  return (
    React.useEffect(() => {
      'scrollRestoration' in window.history && (window.history.scrollRestoration = 'manual');
    }, []),
    React.useEffect(() => {
      let e = window.location.hash.slice(1),
        t = requestAnimationFrame(() => {
          let t = e ? document.getElementById(e) : null;
          t
            ? t.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            : window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
        });
      return () => cancelAnimationFrame(t);
    }, [e]),
    null
  );
}
