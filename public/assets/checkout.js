/* Greenhse — on-site checkout against Magento GraphQL.
 *
 * The customer stays on this site for everything except the card itself:
 * email, address, shipping method, review and order placement all happen here.
 * Payment is ANZ Worldline Hosted Checkout, which by design takes the card on
 * ANZ's own PCI-compliant page — so the last step is a redirect out and back.
 *
 * Flow, in the order Magento requires it:
 *   cart -> email -> shipping address -> shipping method -> billing address
 *   -> payment method -> placeOrder -> checkRedirect -> ANZ -> return page
 */
(function () {
  'use strict';

  var A = window.GreenhseAccount;

  var CART =
    'items{uid quantity prices{row_total{value}}product{name sku}}' +
    'prices{grand_total{value}subtotal_excluding_tax{value}' +
    'applied_taxes{amount{value}label}}' +
    'shipping_addresses{firstname lastname street city postcode ' +
    'region{code label}telephone selected_shipping_method{carrier_code method_code method_title amount{value}}' +
    'available_shipping_methods{carrier_code method_code method_title amount{value}}}' +
    'available_payment_methods{code title}';

  function cart() {
    return A.activeCartId().then(function (id) {
      return A.gql('query($id:String!){cart(cart_id:$id){' + CART + '}}', { id: id })
        .then(function (d) { return d.cart; });
    });
  }

  function setEmail(email) {
    return A.activeCartId().then(function (id) {
      return A.gql(
        'mutation($id:String!,$e:String!){setGuestEmailOnCart(input:{cart_id:$id,email:$e}){cart{email}}}',
        { id: id, e: email }
      );
    });
  }

  function setShippingAddress(a) {
    return A.activeCartId().then(function (id) {
      return A.gql(
        'mutation($id:String!,$a:CartAddressInput!){' +
        'setShippingAddressesOnCart(input:{cart_id:$id,shipping_addresses:[{address:$a}]})' +
        '{cart{shipping_addresses{available_shipping_methods{carrier_code method_code method_title amount{value}}}}}}',
        { id: id, a: addressInput(a) }
      ).then(function (d) {
        var sa = d.setShippingAddressesOnCart.cart.shipping_addresses[0];
        return (sa && sa.available_shipping_methods) || [];
      });
    });
  }

  function addressInput(a) {
    return {
      firstname: a.firstname, lastname: a.lastname,
      company: a.company || null,
      street: [a.street1].concat(a.street2 ? [a.street2] : []),
      city: a.city, region: a.region, postcode: a.postcode,
      country_code: 'AU', telephone: a.telephone,
      save_in_address_book: false
    };
  }

  function setShippingMethod(carrier, method) {
    return A.activeCartId().then(function (id) {
      return A.gql(
        'mutation($id:String!,$c:String!,$m:String!){' +
        'setShippingMethodsOnCart(input:{cart_id:$id,shipping_methods:[{carrier_code:$c,method_code:$m}]})' +
        '{cart{prices{grand_total{value}}}}}',
        { id: id, c: carrier, m: method }
      );
    });
  }

  function setBillingSameAsShipping(a) {
    return A.activeCartId().then(function (id) {
      return A.gql(
        'mutation($id:String!,$a:CartAddressInput!){' +
        'setBillingAddressOnCart(input:{cart_id:$id,billing_address:{address:$a}})' +
        '{cart{billing_address{city}}}}',
        { id: id, a: addressInput(a) }
      );
    });
  }

  /* Worldline wants the browser's display characteristics for its 3-D Secure
     risk check. Sending real values keeps genuine customers out of the
     step-up challenge more often than sending nothing. */
  function browserInfo() {
    return {
      color_depth: String(screen.colorDepth || 24),
      java_enabled: false,
      locale: navigator.language || 'en-AU',
      screen_height: String(screen.height || 0),
      screen_width: String(screen.width || 0),
      timezone_offset_utc_minutes: String(new Date().getTimezoneOffset())
    };
  }

  function setPayment(code) {
    return A.activeCartId().then(function (id) {
      var input = { cart_id: id, payment_method: { code: code } };
      if (code === 'worldline_hosted_checkout') input.payment_method.worldline_hosted_checkout = browserInfo();
      return A.gql(
        'mutation($i:SetPaymentMethodOnCartInput!){setPaymentMethodOnCart(input:$i)' +
        '{cart{selected_payment_method{code title}}}}',
        { i: input }
      );
    });
  }

  /* Place the order, then ask Worldline where to send the customer. An order
     exists in Magento at this point but is not paid — checkRedirect hands back
     the hosted payment URL. */
  function placeOrder() {
    return A.activeCartId().then(function (id) {
      return A.gql(
        'mutation($id:String!){placeOrder(input:{cart_id:$id}){order{order_number}}}',
        { id: id }
      ).then(function (d) {
        var num = d.placeOrder.order.order_number;
        /* The cart is consumed by placing the order; drop it so the next visit
           starts clean rather than resurrecting a dead quote. */
        A.setCartId(null);
        return A.gql('query($n:String!){checkRedirect(incrementId:$n){url}}', { n: num })
          .then(function (r) {
            return { orderNumber: num, redirectUrl: r.checkRedirect && r.checkRedirect.url };
          }, function () {
            return { orderNumber: num, redirectUrl: null };
          });
      });
    });
  }

  /* Called on the return page. Magento reconciles the payment result, so the
     confirmation reflects what ANZ actually said, not what we hoped. */
  function finalise(orderNumber) {
    return A.gql('query($n:String!){processPendingOrder(incrementId:$n)}', { n: orderNumber })
      .then(function () {
        return A.gql('query($n:String!){checkOrder(incrementId:$n)}', { n: orderNumber })
          .then(function (d) { return { paid: !!d.checkOrder }; });
      }, function () { return { paid: null }; });
  }


  /* ---- pushing the on-page cart into Magento --------------------------- *
   * The site's cart lives in the browser (it has to — prices and options are
   * rendered statically). Magento only learns about it when the customer
   * checks out. We clear whatever Magento was holding first, so checking out
   * twice cannot double the order, then add everything in one call and report
   * anything Magento refused rather than silently dropping it.
   * lines: [{sku, qty}]                                                     */
  function syncCart(lines) {
    return A.activeCartId().then(function (id) {
      return A.gql('query($id:String!){cart(cart_id:$id){items{uid}}}', { id: id })
        .then(function (d) { return (d.cart && d.cart.items) || []; }, function () { return []; })
        .then(function (existing) {
          if (!existing.length) return id;
          return existing.reduce(function (chain, it) {
            return chain.then(function () {
              return A.gql(
                'mutation($id:String!,$u:ID!){removeItemFromCart(input:{cart_id:$id,cart_item_uid:$u}){cart{id}}}',
                { id: id, u: it.uid }
              ).catch(function () { /* already gone — nothing to undo */ });
            });
          }, Promise.resolve()).then(function () { return id; });
        })
        .then(function (cartId) {
          var items = lines.filter(function (l) { return l.sku && l.qty > 0; })
            .map(function (l) { return { sku: l.sku, quantity: Number(l.qty) }; });
          if (!items.length) return { cartId: cartId, rejected: [] };
          return A.gql(
            'mutation($id:String!,$items:[CartItemInput!]!){addProductsToCart(cartId:$id,cartItems:$items)' +
            '{cart{total_quantity}user_errors{code message}}}',
            { id: cartId, items: items }
          ).then(function (d) {
            var errs = (d.addProductsToCart && d.addProductsToCart.user_errors) || [];
            return { cartId: cartId, rejected: errs.map(function (e) { return e.message; }) };
          });
        });
    });
  }

  function money(v) { return '$' + Number(v || 0).toFixed(2); }

  window.GreenhseCheckout = {
    cart: cart, setEmail: setEmail,
    setShippingAddress: setShippingAddress, setShippingMethod: setShippingMethod,
    setBillingSameAsShipping: setBillingSameAsShipping,
    setPayment: setPayment, placeOrder: placeOrder, finalise: finalise,
    syncCart: syncCart,
    money: money
  };
})();
