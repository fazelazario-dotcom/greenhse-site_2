import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../lib/api';
import cartApi from '../lib/cartApi';
import * as storage from '../lib/storage';
import * as api2 from '../lib/api';
import * as productsApi from '../lib/productsApi';
function o() {
  return !!storage.getAuthToken();
}
async function l() {
  let t = storage.getGuestCartId();
  if (t) return t;
  let e = await cartApi.createGuestCart();
  return (storage.saveGuestCartId(e), e);
}
function d(t, e) {
  return {
    itemId: t.item_id,
    sku: t.sku,
    id: e?.id ?? t.sku,
    slug: e?.slug ?? null,
    name: t.name ?? e?.name ?? t.sku,
    category: e?.category ?? null,
    price: 'number' == typeof t.price ? t.price : (e?.price ?? 0),
    image: e?.image ?? null,
    visual: e?.visual ?? null,
    qty: t.qty,
  };
}
async function u(t) {
  try {
    let e = await productsApi.getProductBySku(t);
    return e ? api2.normalizeProduct(e) : null;
  } catch {
    return null;
  }
}
let c = createAsyncThunk('cart/fetchCart', async () => {
    let t;
    if (o()) t = await cartApi.getCartItems();
    else {
      let e = storage.getGuestCartId();
      t = e ? await cartApi.getGuestCartItems(e) : [];
    }
    return Promise.all(t.map(async (t) => d(t, await u(t.sku))));
  }),
  p = createAsyncThunk('cart/addItem', async (t) => {
    let { quantity: e, customOptions: r, ...s } = t,
      n = Math.max(1, Math.floor(e) || 1);
    return {
      line: d(
        o()
          ? await cartApi.addCartItem({
              sku: s.sku,
              qty: n,
              quoteId: storage.getQuoteId(),
              customOptions: r,
            })
          : await cartApi.addGuestCartItem({
              cartId: await l(),
              sku: s.sku,
              qty: n,
              customOptions: r,
            }),
        s,
      ),
      productName: s.name,
    };
  }),
  m = createAsyncThunk('cart/incrementQty', async (t) => {
    let e = t.qty + 1,
      r = o()
        ? await cartApi.updateCartItemQty({
            itemId: t.itemId,
            sku: t.sku,
            qty: e,
            quoteId: storage.getQuoteId(),
          })
        : await cartApi.updateGuestCartItemQty({
            cartId: storage.getGuestCartId(),
            itemId: t.itemId,
            qty: e,
          });
    return {
      itemId: t.itemId,
      line: d(r, t),
    };
  }),
  h = createAsyncThunk('cart/decrementQty', async (t) => {
    if (t.qty <= 1)
      return (
        o()
          ? await cartApi.removeCartItem(t.itemId)
          : await cartApi.removeGuestCartItem({
              cartId: storage.getGuestCartId(),
              itemId: t.itemId,
            }),
        {
          itemId: t.itemId,
          removed: !0,
        }
      );
    let e = t.qty - 1,
      r = o()
        ? await cartApi.updateCartItemQty({
            itemId: t.itemId,
            sku: t.sku,
            qty: e,
            quoteId: storage.getQuoteId(),
          })
        : await cartApi.updateGuestCartItemQty({
            cartId: storage.getGuestCartId(),
            itemId: t.itemId,
            qty: e,
          });
    return {
      itemId: t.itemId,
      line: d(r, t),
    };
  }),
  g = createAsyncThunk(
    'cart/removeItem',
    async (t) => (
      o()
        ? await cartApi.removeCartItem(t.itemId)
        : await cartApi.removeGuestCartItem({
            cartId: storage.getGuestCartId(),
            itemId: t.itemId,
          }),
      t.itemId
    ),
  ),
  y = createAsyncThunk('cart/clearCart', async (t, { getState: e }) => {
    if (o()) return void (await cartApi.emptyCart());
    let r = storage.getGuestCartId();
    if (!r) return;
    let s = e().cart.items;
    await Promise.all(
      s.map((t) =>
        cartApi.removeGuestCartItem({
          cartId: r,
          itemId: t.itemId,
        }),
      ),
    );
  }),
  f = {
    items: [],
    isOpen: !1,
    toast: {
      name: null,
      nonce: 0,
    },
    status: 'idle',
    error: null,
    pendingItemIds: [],
  };
function I(t, e) {
  t.pendingItemIds.includes(e) || t.pendingItemIds.push(e);
}
function w(t, e) {
  t.pendingItemIds = t.pendingItemIds.filter((t) => t !== e);
}
let C = createSlice({
    name: 'cart',
    initialState: f,
    reducers: {
      resetCartState: () => f,
      openCart(t) {
        t.isOpen = !0;
      },
      closeCart(t) {
        t.isOpen = !1;
      },
      toggleCart(t) {
        t.isOpen = !t.isOpen;
      },
    },
    extraReducers: (t) => {
      t.addCase(c.pending, (t) => {
        ((t.status = 'loading'), (t.error = null));
      })
        .addCase(c.fulfilled, (t, e) => {
          ((t.items = e.payload), (t.status = 'succeeded'));
        })
        .addCase(c.rejected, (t, e) => {
          ((t.status = 'failed'), (t.error = e.error.message || "Couldn't load your cart."));
        })
        .addCase(p.fulfilled, (t, e) => {
          let { line: r, productName: a } = e.payload;
          ((t.items = t.items.filter((t) => t.sku !== r.sku)),
            t.items.push(r),
            (t.toast = {
              name: a,
              nonce: t.toast.nonce + 1,
            }));
        })
        .addCase(m.pending, (t, e) => I(t, e.meta.arg.itemId))
        .addCase(m.fulfilled, (t, e) => {
          w(t, e.payload.itemId);
          let r = t.items.findIndex((t) => t.itemId === e.payload.itemId);
          -1 !== r && (t.items[r] = e.payload.line);
        })
        .addCase(m.rejected, (t, e) => w(t, e.meta.arg.itemId))
        .addCase(h.pending, (t, e) => I(t, e.meta.arg.itemId))
        .addCase(h.fulfilled, (t, e) => {
          if ((w(t, e.payload.itemId), e.payload.removed))
            t.items = t.items.filter((t) => t.itemId !== e.payload.itemId);
          else {
            let r = t.items.findIndex((t) => t.itemId === e.payload.itemId);
            -1 !== r && (t.items[r] = e.payload.line);
          }
        })
        .addCase(h.rejected, (t, e) => w(t, e.meta.arg.itemId))
        .addCase(g.pending, (t, e) => I(t, e.meta.arg.itemId))
        .addCase(g.fulfilled, (t, e) => {
          ((t.items = t.items.filter((t) => t.itemId !== e.payload)), w(t, e.payload));
        })
        .addCase(g.rejected, (t, e) => w(t, e.meta.arg.itemId))
        .addCase(y.fulfilled, (t) => {
          t.items = [];
        });
    },
  }),
  { resetCartState: _, openCart: k, closeCart: b, toggleCart: A } = C.actions,
  T = C.reducer,
  $ = (t) => t.cart.items.reduce((t, e) => t + e.price * e.qty, 0);
export const addItem = p;
export const clearCart = y;
export const closeCart = b;
export const decrementQty = h;
export default T;
export const fetchCart = c;
export const incrementQty = m;
export const openCart = k;
export const removeItem = g;
export const resetCartState = _;
export const selectCartCount = (t) => t.cart.items.reduce((t, e) => t + e.qty, 0);
export const selectCartIsOpen = (t) => t.cart.isOpen;
export const selectCartItems = (t) => t.cart.items;
export const selectCartStatus = (t) => t.cart.status;
export const selectCartSubtotal = $;
export const selectCartToast = (t) => t.cart.toast;
export const selectCartTotalIncGst = (t) => $(t) * (1 + api.GST_RATE);
export const selectPendingItemIds = (t) => t.cart.pendingItemIds;
