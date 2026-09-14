import { createSlice } from '@reduxjs/toolkit';
let e = createSlice({
    name: 'user',
    initialState: {
      user: null,
      token: null,
      quoteId: null,
      profileStatus: 'idle',
      profileError: null,
    },
    reducers: {
      setCredentials(t, e) {
        t.token = e.payload.token;
      },
      setQuoteId(t, e) {
        t.quoteId = e.payload;
      },
      profileLoading(t) {
        ((t.profileStatus = 'loading'), (t.profileError = null));
      },
      updateUser(t, e) {
        ((t.user = e.payload), (t.profileStatus = 'succeeded'), (t.profileError = null));
      },
      profileFailed(t, e) {
        ((t.profileStatus = 'failed'), (t.profileError = e.payload || null));
      },
      userLogout(t) {
        ((t.user = null), (t.token = null), (t.quoteId = null), (t.profileStatus = 'idle'), (t.profileError = null));
      },
    },
  }),
  { setCredentials: r, setQuoteId: a, profileLoading: i, updateUser: s, profileFailed: n, userLogout: o } = e.actions,
  l = e.reducer;
export default l;
export const profileFailed = n;
export const profileLoading = i;
export const selectIsAuthenticated = (t) => !!t.user.token;
export const selectProfileError = (t) => t.user.profileError;
export const selectProfileStatus = (t) => t.user.profileStatus;
export const selectToken = (t) => t.user.token;
export const selectUser = (t) => t.user.user;
export const setCredentials = r;
export const setQuoteId = a;
export const updateUser = s;
export const userLogout = o;
