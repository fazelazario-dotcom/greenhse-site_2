import axios from 'axios';
import * as storage from './storage';
let a = axios.create({
  baseURL: '/mag',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
a.interceptors.request.use(
  (t) => {
    let e = storage.getAuthToken();
    return (e && (t.headers.Authorization = `Bearer ${e}`), t);
  },
  (t) => Promise.reject(t),
);
let i = async ({ sku: t, qty: e, quoteId: r, customOptions: i }) => {
    try {
      let s = {
        sku: t,
        qty: e,
      };
      return (
        r && (s.quote_id = r),
        i?.length &&
          (s.product_option = {
            extension_attributes: {
              custom_options: i,
            },
          }),
        (
          await a.post('/rest/V1/carts/mine/items', {
            cartItem: s,
          })
        ).data
      );
    } catch (t) {
      throw I(t);
    }
  },
  s = async () => {
    try {
      return (await a.get('/rest/V1/carts/mine')).data;
    } catch (t) {
      throw I(t);
    }
  },
  n = async () => {
    try {
      let t = await a.get('/rest/V1/carts/mine/items');
      return Array.isArray(t.data) ? t.data : [];
    } catch (t) {
      throw I(t);
    }
  },
  o = async ({ itemId: t, sku: e, qty: r, quoteId: i }) => {
    try {
      let s = {
        item_id: t,
        sku: e,
        qty: r,
      };
      return (
        i && (s.quote_id = i),
        (
          await a.put(`/rest/V1/carts/mine/items/${t}`, {
            cartItem: s,
          })
        ).data
      );
    } catch (t) {
      throw I(t);
    }
  },
  l = async (t) => {
    try {
      return (await a.delete(`/rest/V1/carts/mine/items/${t}`)).data;
    } catch (t) {
      throw I(t);
    }
  },
  d = async () => {
    try {
      return (await a.delete('/rest/V1/carts/mine/items')).data;
    } catch (t) {
      throw I(t);
    }
  },
  u = async () => {
    try {
      return (await a.post('/rest/V1/guest-carts')).data;
    } catch (t) {
      throw I(t);
    }
  },
  c = async ({ cartId: t, sku: e, qty: r, customOptions: i }) => {
    try {
      let s = {
        sku: e,
        qty: r,
      };
      return (
        i?.length &&
          (s.product_option = {
            extension_attributes: {
              custom_options: i,
            },
          }),
        (
          await a.post(`/rest/V1/guest-carts/${t}/items`, {
            cartItem: s,
          })
        ).data
      );
    } catch (t) {
      throw I(t);
    }
  },
  p = async (t) => {
    try {
      let e = await a.get(`/rest/V1/guest-carts/${t}/items`);
      return Array.isArray(e.data) ? e.data : [];
    } catch (t) {
      throw I(t);
    }
  },
  m = async ({ cartId: t, itemId: e, qty: r }) => {
    try {
      return (
        await a.put(`/rest/V1/guest-carts/${t}/items/${e}`, {
          cartItem: {
            item_id: e,
            qty: r,
          },
        })
      ).data;
    } catch (t) {
      throw I(t);
    }
  },
  h = async ({ cartId: t, itemId: e }) => {
    try {
      return (await a.delete(`/rest/V1/guest-carts/${t}/items/${e}`)).data;
    } catch (t) {
      throw I(t);
    }
  },
  g = async (t) => {
    try {
      return (await a.get(`/rest/V1/guest-carts/${t}/totals`)).data;
    } catch (t) {
      throw I(t);
    }
  },
  y = async ({ guestCartId: t, customerId: e, storeId: r = 1 }) => {
    try {
      return (
        await a.put(`/rest/V1/guest-carts/${t}`, {
          customerId: e,
          storeId: r,
        })
      ).data;
    } catch (t) {
      throw I(t);
    }
  },
  f = async ({ cartId: t, address: e }) => {
    try {
      return (
        await a.post(`/rest/V1/guest-carts/${t}/estimate-shipping-methods`, {
          address: e,
        })
      ).data;
    } catch (t) {
      throw I(t);
    }
  },
  I = (t) => {
    if (t.response) {
      let e,
        r = t.response.data;
      return (
        ((e =
          'object' == typeof r
            ? Error(r.message || r.error || 'Something went wrong')
            : 'string' == typeof r && r.includes('<!doctype')
              ? Error('The API endpoint returned an HTML page instead of JSON. Please check the backend API URL.')
              : Error(r || 'API request failed')).status = t.response.status),
        e
      );
    }
    return t.request
      ? Error('Unable to connect to the server. Please check your internet connection or API URL.')
      : Error(t.message || 'An unexpected error occurred');
  };
export default {
  addCartItem: i,
  getCart: s,
  getCartItems: n,
  updateCartItemQty: o,
  removeCartItem: l,
  emptyCart: d,
  createGuestCart: u,
  addGuestCartItem: c,
  getGuestCartItems: p,
  updateGuestCartItemQty: m,
  removeGuestCartItem: h,
  getGuestCartTotals: g,
  mergeGuestCart: y,
  getGuestEstimateShippingMethods: f,
};
