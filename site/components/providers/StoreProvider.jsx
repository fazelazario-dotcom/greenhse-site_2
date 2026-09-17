'use client';
import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../../store/cartSlice';
import uiSlice from '../../store/uiSlice';
import userSlice from '../../store/userSlice';
import catalogSlice from '../../store/catalogSlice';
import wishlistSlice from '../../store/wishlistSlice';
import finderProductsSlice, * as finderProductsSlice_ from '../../store/finderProductsSlice';
import * as api from '../../lib/api';
export default function Default({ children: e }) {
  let f = React.useRef(null);
  return (
    f.current ||
      (f.current = configureStore({
        reducer: {
          cart: cartSlice,
          ui: uiSlice,
          user: userSlice,
          products: catalogSlice,
          wishlist: wishlistSlice,
          finderProducts: finderProductsSlice,
        },
      })),
    React.useEffect(() => {
      let e = f.current;
      (e.dispatch(finderProductsSlice_.finderProductsLoading()),
        api
          .fetchFinderProducts()
          .then((t) => e.dispatch(finderProductsSlice_.finderProductsLoaded(t)))
          .catch((t) => e.dispatch(finderProductsSlice_.finderProductsFailed(t.message))));
    }, []),
    (<Provider store={f.current}>{e}</Provider>)
  );
}
