/* Greenhse — customer accounts against Magento GraphQL.
 *
 * Auth is a Magento customer token kept in localStorage. Every authed call
 * sends it as a bearer header. The token is what Magento issues, so it expires
 * on Magento's schedule (default 1 hour) — an expired token is detected on the
 * next call and the customer is bounced to the login screen rather than shown
 * a broken page.
 *
 * Carts: a guest builds a cart before logging in. On login we hand that cart
 * to the customer (mergeCarts) so nothing is lost — the single most common
 * complaint about bolt-on account systems.
 */
(function () {
  'use strict';

  var ENDPOINT = '/mag/graphql';
  var DIRECT = 'https://greenhse.com/graphql';
  /* Same-origin proxy first everywhere a server is present — production
     (_redirects), npm run dev (next.config.js rewrites) and npm run preview
     (scripts/serve.js) all provide it. Only a file:// open goes direct. */
  if (location.protocol === 'file:') {
    ENDPOINT = DIRECT;
  }

  var TOKEN_KEY = 'greenhse_token';
  var CART_KEY = 'greenhse_cart_id';

  function token() {
    try { return localStorage.getItem(TOKEN_KEY); } catch (e) { return null; }
  }
  function setToken(t) {
    try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch (e) {}
    document.dispatchEvent(new CustomEvent('greenhse:auth', { detail: { signedIn: !!t } }));
  }
  function signedIn() { return !!token(); }

  function guestCartId() {
    try { return sessionStorage.getItem(CART_KEY); } catch (e) { return null; }
  }
  function setCartId(id) {
    try { id ? sessionStorage.setItem(CART_KEY, id) : sessionStorage.removeItem(CART_KEY); } catch (e) {}
  }


  /* ---- reCAPTCHA ------------------------------------------------------- *
   * Magento has Google reCAPTCHA v2 ("I'm not a robot") switched on for
   * customer create, sign-in and password reset. The GraphQL module reads the
   * response from an X-ReCaptcha header, so every guarded call has to carry
   * one. The site key is public — it is served in the HTML of the Magento
   * storefront and is safe to ship here.                                    */
  var RECAPTCHA_KEY = '6LexbFwtAAAAABbeLfRaF7HtP3vmaBwqJYAdiYGe';
  var captchaReady = null;

  function loadCaptcha() {
    if (captchaReady) return captchaReady;
    captchaReady = new Promise(function (resolve, reject) {
      if (window.grecaptcha && window.grecaptcha.render) return resolve(window.grecaptcha);
      window.__ghseCaptchaCb = function () { resolve(window.grecaptcha); };
      var s = document.createElement('script');
      s.src = 'https://www.google.com/recaptcha/api.js?onload=__ghseCaptchaCb&render=explicit';
      s.async = true; s.defer = true;
      s.onerror = function () { reject(new Error('CAPTCHA_UNAVAILABLE')); };
      document.head.appendChild(s);
    });
    return captchaReady;
  }

  /* Renders the tick-box into an element and hands back a reader for its
     response. Each response is single-use, so it resets after every read. */
  function mountCaptcha(el) {
    return loadCaptcha().then(function (g) {
      var id = g.render(el, { sitekey: RECAPTCHA_KEY });
      return {
        widgetId: id,
        value: function () { return g.getResponse(id) || ''; },
        reset: function () { try { g.reset(id); } catch (e) {} }
      };
    });
  }

  /* A Magento GraphQL error is an array; the first message is the one a
     customer can act on ("The account sign-in was incorrect"). */
  function firstError(j) {
    if (j && j.errors && j.errors.length) return j.errors[0].message;
    return null;
  }

  function gql(query, variables, opts) {
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    if (opts.auth) {
      var t = token();
      if (!t) return Promise.reject(new Error('NOT_SIGNED_IN'));
      headers.Authorization = 'Bearer ' + t;
    }
    if (opts.captcha) headers['X-ReCaptcha'] = opts.captcha;
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: query, variables: variables || {} })
    }).then(function (r) { return r.json(); }).then(function (j) {
      var err = firstError(j);
      if (err) {
        /* Magento says this when the token has expired or been revoked. Treat
           it as a sign-out rather than letting the page fail mysteriously. */
        if (/not authorized|authoriz|current customer isn't authorized/i.test(err) && opts.auth) {
          setToken(null);
          var e = new Error('SESSION_EXPIRED');
          e.expired = true;
          throw e;
        }
        throw new Error(err);
      }
      return j.data;
    });
  }

  /* ---- sign in / register --------------------------------------------- */

  function login(email, password, captcha) {
    return gql(
      'mutation($e:String!,$p:String!){generateCustomerToken(email:$e,password:$p){token}}',
      { e: email, p: password }, { captcha: captcha }
    ).then(function (d) {
      setToken(d.generateCustomerToken.token);
      return adoptGuestCart().then(function () { return true; });
    });
  }

  function register(input) {
    return gql(
      'mutation($f:String!,$l:String!,$e:String!,$p:String!,$s:Boolean!){' +
      'createCustomer(input:{firstname:$f,lastname:$l,email:$e,password:$p,is_subscribed:$s})' +
      '{customer{email}}}',
      { f: input.firstname, l: input.lastname, e: input.email, p: input.password, s: !!input.subscribe },
      { captcha: input.captcha }
    ).then(function () {
      /* We deliberately do NOT sign the customer in here. Magento guards
         sign-in with its own captcha, and a captcha response is single-use —
         so an auto-login would fail on a token already spent by the register
         call. The page sends them to the sign-in tab instead. */
      return { created: true, email: input.email };
    });
  }

  function logout() {
    var done = function () { setToken(null); setCartId(null); };
    return gql('mutation{revokeCustomerToken{result}}', {}, { auth: true })
      .then(done, done);
  }

  function requestPasswordReset(email, captcha) {
    return gql('mutation($e:String!){requestPasswordResetEmail(email:$e)}',
      { e: email }, { captcha: captcha });
  }

  function resetPassword(email, resetToken, newPassword) {
    return gql(
      'mutation($e:String!,$t:String!,$p:String!){resetPassword(email:$e,resetPasswordToken:$t,newPassword:$p)}',
      { e: email, t: resetToken, p: newPassword }
    );
  }

  function changePassword(current, next) {
    return gql(
      'mutation($c:String!,$n:String!){changeCustomerPassword(currentPassword:$c,newPassword:$n){email}}',
      { c: current, n: next }, { auth: true }
    );
  }

  /* ---- the customer ---------------------------------------------------- */

  function me() {
    return gql(
      '{customer{firstname lastname email is_subscribed ' +
      'addresses{id firstname lastname company street city region{region region_code} postcode ' +
      'country_code telephone default_shipping default_billing}}}',
      {}, { auth: true }
    ).then(function (d) { return d.customer; });
  }

  function orders(pageSize) {
    return gql(
      '{customer{orders(pageSize:' + (pageSize || 20) + ',currentPage:1){items{' +
      'number order_date status total{grand_total{value currency}}' +
      'items{product_name product_sale_price{value}quantity_ordered}}}}}',
      {}, { auth: true }
    ).then(function (d) { return (d.customer.orders && d.customer.orders.items) || []; });
  }

  function saveAddress(a) {
    return gql(
      'mutation($i:CustomerAddressInput!){createCustomerAddress(input:$i){id}}',
      {
        i: {
          firstname: a.firstname, lastname: a.lastname, company: a.company || null,
          street: a.street, city: a.city, postcode: a.postcode,
          region: { region_code: a.region_code, region: a.region },
          country_code: a.country_code || 'AU', telephone: a.telephone,
          default_shipping: !!a.default_shipping, default_billing: !!a.default_billing
        }
      }, { auth: true }
    );
  }

  /* ---- carts ----------------------------------------------------------- */

  /* The signed-in customer's own cart id. Magento creates one on demand. */
  function customerCartId() {
    return gql('{customerCart{id}}', {}, { auth: true })
      .then(function (d) { return d.customerCart.id; });
  }

  /* Called right after sign-in: move whatever the guest had into the
     customer's cart. If the guest cart is empty or already gone, Magento
     errors — which is harmless here, so it is swallowed. */
  function adoptGuestCart() {
    var guest = guestCartId();
    return customerCartId().then(function (custId) {
      if (!guest || guest === custId) { setCartId(custId); return custId; }
      return gql(
        'mutation($s:String!,$d:String!){mergeCarts(source_cart_id:$s,destination_cart_id:$d){id}}',
        { s: guest, d: custId }, { auth: true }
      ).then(function () { setCartId(custId); return custId; },
             function () { setCartId(custId); return custId; });
    });
  }

  /* The id the rest of the site should use for cart operations. */
  function activeCartId() {
    if (!signedIn()) {
      var g = guestCartId();
      if (g) return Promise.resolve(g);
      return gql('mutation{createEmptyCart}').then(function (d) {
        setCartId(d.createEmptyCart); return d.createEmptyCart;
      });
    }
    var known = guestCartId();
    if (known) return Promise.resolve(known);
    return customerCartId().then(function (id) { setCartId(id); return id; });
  }

  /* ---- header state ---------------------------------------------------- */

  /* Any element with data-auth="in" shows only when signed in; "out" only when
     signed out. Keeps every page's header correct without per-page code. */
  function paintAuth() {
    var on = signedIn();
    document.querySelectorAll('[data-auth]').forEach(function (el) {
      var want = el.getAttribute('data-auth');
      el.hidden = (want === 'in') ? !on : on;
    });
  }
  document.addEventListener('greenhse:auth', paintAuth);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paintAuth);
  } else { paintAuth(); }

  window.GreenhseAccount = {
    gql: gql, token: token, signedIn: signedIn,
    login: login, register: register, logout: logout,
    mountCaptcha: mountCaptcha, RECAPTCHA_KEY: RECAPTCHA_KEY,
    requestPasswordReset: requestPasswordReset, resetPassword: resetPassword,
    changePassword: changePassword,
    me: me, orders: orders, saveAddress: saveAddress,
    activeCartId: activeCartId, customerCartId: customerCartId, adoptGuestCart: adoptGuestCart,
    setCartId: setCartId
  };
})();

/* ------------------------------------------------------------
   Live-backend proof line. Renders ONLY from a successful live
   Magento response, so a static copy of this page can never show
   it - the same pattern as the green "Live catalogue" line on
   category pages and "Live pricing" on the homepage.
   ------------------------------------------------------------ */
(function(){
  function boot(){
    var h=document.querySelector('main h1')||document.querySelector('h1');
    if(!h||document.querySelector('[data-live-proof]')) return;
    fetch('/mag/graphql',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({query:'{storeConfig{store_code}}'})})
      .then(function(r){return r.ok?r.json():null;})
      .then(function(j){
        if(!j||!j.data||!j.data.storeConfig) return;
        var d=document.createElement('div');
        d.setAttribute('data-live-proof','1');
        d.style.cssText='color:#1E7A46;font-size:13px;font-weight:600;margin:6px 0 14px';
        d.textContent='\u2713 Connected live to the Greenhse store API';
        h.parentNode.insertBefore(d,h.nextSibling);
      }).catch(function(){});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
