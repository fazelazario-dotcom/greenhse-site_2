'use client';
import dynamic from 'next/dynamic';
let S = dynamic(() => import('../product/QuickView'), {
    ssr: !1,
  }),
  N = dynamic(() => import('../forms/EnquiryForm'), {
    ssr: !1,
  }),
  AC = dynamic(() => import('../forms/QuoteForm'), {
    ssr: !1,
  }),
  I = dynamic(() => import('../cart/CartDrawer'), {
    ssr: !1,
  }),
  L = dynamic(() => import('../cart/CartToast'), {
    ssr: !1,
  }),
  O = dynamic(() => import('../ui/CookieConsent'), {
    ssr: !1,
  });
export default function Default() {
  return (
    <>
      <S />
      <N />
      <AC />
      <I />
      <L />
      <O />
    </>
  );
}
