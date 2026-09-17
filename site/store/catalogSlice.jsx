import { createSlice } from '@reduxjs/toolkit';
let t = createSlice({
    name: 'products',
    initialState: {
      categories: [],
      categoriesStatus: 'idle',
      categoriesError: null,
      items: [],
      totalCount: 0,
      productsStatus: 'idle',
      productsError: null,
    },
    reducers: {
      categoriesLoading(e) {
        ((e.categoriesStatus = 'loading'), (e.categoriesError = null));
      },
      categoriesLoaded(e, t) {
        ((e.categories = t.payload || []), (e.categoriesStatus = 'succeeded'));
      },
      categoriesFailed(e, t) {
        ((e.categoriesStatus = 'failed'), (e.categoriesError = t.payload || null));
      },
      productsLoading(e) {
        ((e.productsStatus = 'loading'), (e.productsError = null));
      },
      productsLoaded(e, t) {
        ((e.items = t.payload.products || []),
          (e.totalCount = t.payload.totalCount || 0),
          (e.productsStatus = 'succeeded'));
      },
      productsFailed(e, t) {
        ((e.productsStatus = 'failed'), (e.productsError = t.payload || null), (e.items = []), (e.totalCount = 0));
      },
    },
  }),
  {
    categoriesLoading: r,
    categoriesLoaded: s,
    categoriesFailed: n,
    productsLoading: a,
    productsLoaded: i,
    productsFailed: l,
  } = t.actions,
  o = t.reducer;
export const categoriesFailed = n;
export const categoriesLoaded = s;
export const categoriesLoading = r;
export default o;
export const productsFailed = l;
export const productsLoaded = i;
export const productsLoading = a;
export const selectCategories = (e) => e.products.categories;
export const selectCategoriesStatus = (e) => e.products.categoriesStatus;
export const selectProducts = (e) => e.products.items;
export const selectProductsError = (e) => e.products.productsError;
export const selectProductsStatus = (e) => e.products.productsStatus;
