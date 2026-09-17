import { createSlice } from '@reduxjs/toolkit';
let t = createSlice({
    name: 'ui',
    initialState: {
      quickView: null,
      quoteFor: null,
      enquiryFor: null,
    },
    reducers: {
      openQuickView(e, t) {
        e.quickView = t.payload;
      },
      closeQuickView(e) {
        e.quickView = null;
      },
      requestQuote(e, t) {
        e.quoteFor = t.payload;
      },
      requestCartQuote(e) {
        e.quoteFor = {
          cartCheckout: !0,
        };
      },
      closeQuote(e) {
        e.quoteFor = null;
      },
      requestEnquiry(e, t) {
        e.enquiryFor = t.payload;
      },
      closeEnquiry(e) {
        e.enquiryFor = null;
      },
    },
  }),
  {
    openQuickView: r,
    closeQuickView: s,
    requestQuote: n,
    requestCartQuote: a,
    closeQuote: i,
    requestEnquiry: l,
    closeEnquiry: o,
  } = t.actions,
  u = t.reducer;
export const closeEnquiry = o;
export const closeQuickView = s;
export const closeQuote = i;
export default u;
export const openQuickView = r;
export const requestEnquiry = l;
export const selectEnquiryFor = (e) => e.ui.enquiryFor;
export const selectQuickView = (e) => e.ui.quickView;
export const selectQuoteFor = (e) => e.ui.quoteFor;
