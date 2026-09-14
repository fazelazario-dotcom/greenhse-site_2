import axios from 'axios';
import * as storage from './storage';
let s = axios.create({
  baseURL: '/mag',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
s.interceptors.request.use(
  (e) => {
    let t = storage.getAuthToken();
    return (t && (e.headers.Authorization = `Bearer ${t}`), e);
  },
  (e) => Promise.reject(e),
);
let n = async (e, t) => {
    try {
      return (
        await s.post('/rest/V1/customers', e, {
          headers: {
            'X-ReCaptcha': t,
            Referer: 'https://greenhse.com/',
          },
        })
      ).data;
    } catch (e) {
      throw g(e);
    }
  },
  a = async (e, t) => {
    try {
      return (
        await s.post('/rest/V1/integration/customer/token', e, {
          headers: {
            'X-ReCaptcha': t,
            Referer: 'https://greenhse.com/',
          },
        })
      ).data;
    } catch (e) {
      throw (console.log('34344', e), g(e));
    }
  },
  i = async (e, t) => {
    try {
      return (
        await s.put('/rest/V1/customers/password', e, {
          headers: {
            'X-ReCaptcha': t,
          },
        })
      ).data;
    } catch (e) {
      throw g(e);
    }
  },
  l = async (e, t) => {
    try {
      return (
        await s.post('/rest/V1/customers/resetPassword', e, {
          headers: {
            'X-ReCaptcha': t,
          },
        })
      ).data;
    } catch (e) {
      throw g(e);
    }
  },
  o = async () => {
    try {
      return (await s.post('/rest/V1/carts/mine')).data;
    } catch (e) {
      throw g(e);
    }
  },
  u = async () => {
    try {
      return (await s.get('/rest/V1/customers/me')).data;
    } catch (e) {
      throw g(e);
    }
  },
  c = async (e) => {
    try {
      return (await s.put('/rest/V1/customers/me', e)).data;
    } catch (e) {
      throw g(e);
    }
  },
  d = async (e) => {
    try {
      return (await s.put('/rest/V1/customers/me/password', e)).data;
    } catch (e) {
      throw g(e);
    }
  },
  f = async (e) => {
    try {
      return (await s.post('/rest/V1/carts/mine/estimate-shipping-methods', e)).data;
    } catch (e) {
      throw g(e);
    }
  },
  h = async (e) => {
    try {
      return (await s.post('/getestimate/create_magento_order.php', e)).data;
    } catch (e) {
      throw g(e);
    }
  },
  p = async (e) => {
    try {
      return (await s.post('/rest/V1/quote-request', e)).data;
    } catch (e) {
      throw g(e);
    }
  },
  m = async (e) => {
    try {
      return (
        await s.post('/rest/default/V1/customers/isEmailAvailable', {
          customerEmail: e,
        })
      ).data;
    } catch (e) {
      throw g(e);
    }
  },
  g = (e) => {
    if (e.response) {
      let t,
        r = e.response.data;
      return (
        ((t =
          'object' == typeof r
            ? Error(r.message || r.error || 'Something went wrong')
            : 'string' == typeof r && r.includes('<!doctype')
              ? Error('The API endpoint returned an HTML page instead of JSON. Please check the backend API URL.')
              : Error(r || 'API request failed')).status = e.response.status),
        t
      );
    }
    return e.request
      ? Error('Unable to connect to the server. Please check your internet connection or API URL.')
      : Error(e.message || 'An unexpected error occurred');
  };
export default {
  signup: n,
  login: a,
  createCart: o,
  forgotPassword: i,
  resetPassword: l,
  getProfile: u,
  updateProfile: c,
  changePassword: d,
  getEstimateShippingMethods: f,
  createOrder: h,
  isEmailAvailable: m,
  submitNonPerthQuote: p,
};
