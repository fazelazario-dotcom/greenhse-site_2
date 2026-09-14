'use client';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as storage from '../../lib/storage';
import customerApi from '../../lib/customerApi';
import * as userSlice from '../../store/userSlice';
import * as cartSlice from '../../store/cartSlice';
import * as wishlistSlice from '../../store/wishlistSlice';
export default function Default() {
  let e = useDispatch(),
    o = useSelector(userSlice.selectToken);
  return (
    React.useEffect(() => {
      let t = storage.getAuthToken();
      t &&
        e(
          userSlice.setCredentials({
            token: t,
          }),
        );
      let r = storage.getQuoteId();
      r && e(userSlice.setQuoteId(r));
    }, [e]),
    React.useEffect(() => {
      o &&
        (e(userSlice.profileLoading()),
        customerApi
          .getProfile()
          .then((t) => e(userSlice.updateUser(t)))
          .catch((t) => {
            (storage.clearAuthToken(),
              storage.clearQuoteId(),
              e(userSlice.userLogout()),
              e(cartSlice.resetCartState()),
              e(wishlistSlice.resetWishlistState()),
              e(userSlice.profileFailed(t.message)));
          }));
    }, [o, e]),
    React.useEffect(() => {
      e(cartSlice.fetchCart());
    }, [o, e]),
    React.useEffect(() => {
      o && e(wishlistSlice.fetchWishlist());
    }, [o, e]),
    null
  );
}
