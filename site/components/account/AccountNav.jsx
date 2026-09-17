'use client';
import Link from 'next/link';
import * as navigation from 'next/navigation';
import { useDispatch } from 'react-redux';
import * as storage from '../../lib/storage';
import * as userSlice from '../../store/userSlice';
import * as cartSlice from '../../store/cartSlice';
import * as wishlistSlice from '../../store/wishlistSlice';
let n = [
  {
    href: '/account/',
    label: 'Orders & quotes',
  },
  {
    href: '/account/details/',
    label: 'My details',
  },
  {
    href: '/account/addresses/',
    label: 'Addresses',
  },
  {
    href: '/account/wishlist/',
    label: 'Wish List',
  },
];
export default function Default() {
  let e = navigation.usePathname(),
    o = navigation.useRouter(),
    h = useDispatch();
  return (
    <nav className="acc__nav" aria-label="Account">
      {n.map((c) => (
        <Link key={c.href} href={c.href} className={`acc__nav-item${e === c.href ? ' acc__nav-item--active' : ''}`}>
          {c.label}
        </Link>
      ))}
      <button
        type="button"
        className="acc__nav-item acc__nav-item--logout"
        onClick={function () {
          (storage.clearAuthToken(),
            storage.clearQuoteId(),
            h(userSlice.userLogout()),
            h(cartSlice.resetCartState()),
            h(wishlistSlice.resetWishlistState()),
            o.push('/account/login/'));
        }}
      >
        Log out
      </button>
    </nav>
  );
}
