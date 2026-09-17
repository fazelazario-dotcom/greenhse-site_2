import { createSlice } from '@reduxjs/toolkit';
let t = createSlice({
    name: 'finderProducts',
    initialState: {
      items: [],
      status: 'idle',
      error: null,
    },
    reducers: {
      finderProductsLoading(e) {
        ((e.status = 'loading'), (e.error = null));
      },
      finderProductsLoaded(e, t) {
        ((e.status = 'succeeded'), (e.items = t.payload));
      },
      finderProductsFailed(e, t) {
        ((e.status = 'failed'), (e.error = t.payload));
      },
    },
  }),
  { finderProductsLoading: r, finderProductsLoaded: s, finderProductsFailed: n } = t.actions,
  a = t.reducer;
export default a;
export const finderProductsFailed = n;
export const finderProductsLoaded = s;
export const finderProductsLoading = r;
export const selectFinderProducts = (e) => e.finderProducts.items;
export const selectFinderProductsStatus = (e) => e.finderProducts.status;
