'use client';
import * as cookies from './cookies';
let r = 'gh_token',
  n = 'gh_quote_id',
  i = 'gh_guest_cart_id',
  o = 'gh_reset_email',
  a = 'gh_cart_items_snapshot';
export const clearAuthToken = function () {
  cookies.removeCookie(r);
};
export const clearCartSnapshot = function () {
  window.localStorage.removeItem(a);
};
export const clearGuestCartId = function () {
  cookies.removeCookie(i);
};
export const clearQuoteId = function () {
  cookies.removeCookie(n);
};
export const clearResetEmail = function () {
  window.localStorage.removeItem(o);
};
export const getAuthToken = function () {
  return cookies.getCookie(r);
};
export const getCartSnapshot = function () {
  try {
    let e = window.localStorage.getItem(a),
      t = e ? JSON.parse(e) : [];
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
};
export const getGuestCartId = function () {
  return cookies.getCookie(i);
};
export const getQuoteId = function () {
  return cookies.getCookie(n);
};
export const getResetEmail = function () {
  return window.localStorage.getItem(o);
};
export const saveAuthToken = function (e) {
  let n = (function (e) {
      try {
        let t = e.split('.')[1],
          r = atob(t.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(r).exp ?? null;
      } catch {
        return null;
      }
    })(e),
    i = n ? Math.max(n - Math.floor(Date.now() / 1e3), 60) : void 0;
  cookies.setCookie(r, e, i);
};
export const saveCartSnapshot = function (e) {
  try {
    window.localStorage.setItem(a, JSON.stringify(e || []));
  } catch {}
};
export const saveGuestCartId = function (e) {
  cookies.setCookie(i, e);
};
export const saveQuoteId = function (e) {
  cookies.setCookie(n, e);
};
export const saveResetEmail = function (e) {
  window.localStorage.setItem(o, e);
};
