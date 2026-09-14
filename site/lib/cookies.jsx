'use client';
export const getCookie = function (t) {
  if ('u' < typeof document) return null;
  let e = document.cookie.match(RegExp(`(?:^|; )${t}=([^;]*)`));
  return e ? decodeURIComponent(e[1]) : null;
};
export const removeCookie = function (t) {
  'u' > typeof document && (document.cookie = `${t}=; path=/; max-age=0`);
};
export const setCookie = function (t, e, r = 604800) {
  'u' > typeof document && (document.cookie = `${t}=${encodeURIComponent(e)}; path=/; max-age=${r}; SameSite=Lax`);
};
