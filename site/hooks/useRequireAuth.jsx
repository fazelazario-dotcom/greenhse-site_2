'use client';
import * as navigation from 'next/navigation';
import { useDispatch } from 'react-redux';
import * as storage from '../lib/storage';
import * as userSlice from '../store/userSlice';
import * as cartSlice from '../store/cartSlice';
import * as wishlistSlice from '../store/wishlistSlice';
export default function Default() {
  let e = navigation.useRouter(),
    l = useDispatch();
  return function () {
    (storage.clearAuthToken(),
      l(userSlice.userLogout()),
      l(cartSlice.resetCartState()),
      l(wishlistSlice.resetWishlistState()),
      e.replace('/account/login/?reason=session_expired'));
  };
}
