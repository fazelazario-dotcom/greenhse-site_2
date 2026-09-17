import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as storage from '../lib/storage';
import * as cartSlice from './cartSlice';
async function a(t, e) {
  let a,
    i = storage.getAuthToken();
  try {
    a = await fetch('/mag/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(i
          ? {
              Authorization: `Bearer ${i}`,
            }
          : {}),
      },
      body: JSON.stringify({
        query: t,
        variables: e,
      }),
    });
  } catch (t) {
    throw Error('Unable to connect to the server. Please check your internet connection or API URL.');
  }
  let s = await a.json();
  if (s.errors?.length) {
    let t = Error(s.errors[0]?.message || 'Something went wrong');
    throw ((t.status = a.status), t);
  }
  if (!a.ok) {
    let t = Error('Something went wrong');
    throw ((t.status = a.status), t);
  }
  return s;
}
let i = async () => {
    let t = await a(`
        query {
            customer {
                wishlist {
                    id
                    items_count
                    items {
                        id
                        product {
                            id
                            sku
                            name
                            url_key
                            price_range {
                                minimum_price {
                                    regular_price {
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);
    return (
      t.data?.customer?.wishlist ?? {
        items: [],
      }
    );
  },
  s = async (t, e) => {
    let r = await a(
        `
        mutation AddToWishlist($wishlistId: ID!, $wishlistItems: [WishlistItemInput!]!) {
            addProductsToWishlist(wishlistId: $wishlistId, wishlistItems: $wishlistItems) {
                user_errors {
                    code
                    message
                }
                wishlist {
                    id
                    items_count
                    items {
                        id
                        product {
                            id
                            sku
                            name
                            url_key
                            price_range {
                                minimum_price {
                                    regular_price {
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        `,
        {
          wishlistId: String(t),
          wishlistItems: [
            {
              sku: e,
              quantity: 1,
            },
          ],
        },
      ),
      i = r.data?.addProductsToWishlist,
      s = i?.user_errors;
    if (s?.length) throw Error(s[0]?.message || "Couldn't add this item to your wish list.");
    return (
      i?.wishlist ?? {
        items: [],
      }
    );
  },
  n = async (t, e) => {
    let r = await a(
        `
        mutation RemoveFromWishlist($wishlistId: ID!, $wishlistItemsIds: [ID!]!) {
            removeProductsFromWishlist(wishlistId: $wishlistId, wishlistItemsIds: $wishlistItemsIds) {
                user_errors {
                    code
                    message
                }
                wishlist {
                    id
                    items_count
                    items {
                        id
                        product {
                            id
                            sku
                            name
                            url_key
                            price_range {
                                minimum_price {
                                    regular_price {
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        `,
        {
          wishlistId: String(t),
          wishlistItemsIds: [String(e)],
        },
      ),
      i = r.data?.removeProductsFromWishlist,
      s = i?.user_errors;
    if (s?.length) throw Error(s[0]?.message || "Couldn't remove this item from your wish list.");
    return (
      i?.wishlist ?? {
        items: [],
      }
    );
  },
  o = async (t, e) => {
    let r = await a(
        `
        mutation AddWishlistItemsToCart($wishlistId: ID!, $wishlistItemIds: [ID!]) {
            addWishlistItemsToCart(wishlistId: $wishlistId, wishlistItemIds: $wishlistItemIds) {
                status
                wishlist {
                    id
                    items_count
                    items {
                        id
                        product {
                            id
                            sku
                            name
                            url_key
                            price_range {
                                minimum_price {
                                    regular_price {
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        `,
        {
          wishlistId: String(t),
          wishlistItemIds: [String(e)],
        },
      ),
      i = r.data?.addWishlistItemsToCart;
    if (!i?.status) throw Error("Couldn't move this item to your cart.");
    return (
      i.wishlist ?? {
        items: [],
      }
    );
  };
function d(t) {
  let e = t.product && 'object' == typeof t.product ? t.product : null,
    r = e?.price_range?.minimum_price?.regular_price?.value;
  return {
    wishlistItemId: t.id,
    productId: e?.id ?? null,
    sku: e?.sku ?? null,
    name: e?.name ?? e?.sku ?? 'Product',
    slug: e?.url_key ?? e?.sku ?? null,
    price: 'number' == typeof r ? r : null,
    qty: t.qty ?? 1,
  };
}
function u(t) {
  let e = Array.isArray(t?.items) ? t.items : [];
  return {
    id: t?.id ?? null,
    items: e.map(d),
  };
}
let c = createAsyncThunk('wishlist/fetchWishlist', async () => u(await i())),
  p = createAsyncThunk('wishlist/addWishlistItem', async (t, { getState: e, dispatch: r }) => {
    let a = e().wishlist.id;
    return (a || (a = (await r(c()).unwrap()).id), u(await s(a, t.sku)));
  }),
  m = createAsyncThunk('wishlist/removeWishlistItem', async (t, { getState: e, dispatch: r }) => {
    let a = e().wishlist.id;
    return (a || (a = (await r(c()).unwrap()).id), u(await n(a, t)));
  }),
  h = createAsyncThunk('wishlist/moveWishlistItemToCart', async (t, { getState: e, dispatch: r }) => {
    let a = e().wishlist.id;
    a || (a = (await r(c()).unwrap()).id);
    let i = await o(a, t);
    return (await r(cartSlice.fetchCart()), u(i));
  }),
  g = {
    id: null,
    items: [],
    status: 'idle',
    error: null,
  },
  y = createSlice({
    name: 'wishlist',
    initialState: g,
    reducers: {
      resetWishlistState: () => g,
    },
    extraReducers: (t) => {
      t.addCase(c.pending, (t) => {
        ((t.status = 'loading'), (t.error = null));
      })
        .addCase(c.fulfilled, (t, e) => {
          ((t.id = e.payload.id), (t.items = e.payload.items), (t.status = 'succeeded'));
        })
        .addCase(c.rejected, (t, e) => {
          ((t.status = 'failed'), (t.error = e.error.message || "Couldn't load your wish list."));
        })
        .addCase(p.fulfilled, (t, e) => {
          ((t.id = e.payload.id), (t.items = e.payload.items));
        })
        .addCase(m.fulfilled, (t, e) => {
          ((t.id = e.payload.id), (t.items = e.payload.items));
        })
        .addCase(h.fulfilled, (t, e) => {
          ((t.id = e.payload.id), (t.items = e.payload.items));
        });
    },
  }),
  { resetWishlistState: f } = y.actions,
  I = y.reducer;
export const addWishlistItem = p;
export default I;
export const fetchWishlist = c;
export const moveWishlistItemToCart = h;
export const removeWishlistItem = m;
export const resetWishlistState = f;
export const selectWishlistCount = (t) => t.wishlist.items.length;
export const selectWishlistError = (t) => t.wishlist.error;
export const selectWishlistItemByProductId = (t) => (e) => e.wishlist.items.find((e) => e.productId === t) || null;
export const selectWishlistItems = (t) => t.wishlist.items;
export const selectWishlistStatus = (t) => t.wishlist.status;
