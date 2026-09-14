'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
var t,
  r,
  i = [
    'sitekey',
    'onChange',
    'theme',
    'type',
    'tabindex',
    'onExpired',
    'onErrored',
    'size',
    'stoken',
    'grecaptcha',
    'badge',
    'hl',
    'isolated',
  ];
function o() {
  return (o = Object.assign.bind()).apply(this, arguments);
}
function c(e) {
  if (void 0 === e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function l(e, t) {
  return (l = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function (e, t) {
        return ((e.__proto__ = t), e);
      })(e, t);
}
var d = (function (e) {
  function t() {
    var t;
    return (
      ((t = e.call(this) || this).handleExpired = t.handleExpired.bind(c(t))),
      (t.handleErrored = t.handleErrored.bind(c(t))),
      (t.handleChange = t.handleChange.bind(c(t))),
      (t.handleRecaptchaRef = t.handleRecaptchaRef.bind(c(t))),
      t
    );
  }
  ((t.prototype = Object.create(e.prototype)), (t.prototype.constructor = t), l(t, e));
  var r = t.prototype;
  return (
    (r.getCaptchaFunction = function (e) {
      return this.props.grecaptcha
        ? this.props.grecaptcha.enterprise
          ? this.props.grecaptcha.enterprise[e]
          : this.props.grecaptcha[e]
        : null;
    }),
    (r.getValue = function () {
      var e = this.getCaptchaFunction('getResponse');
      return e && void 0 !== this._widgetId ? e(this._widgetId) : null;
    }),
    (r.getWidgetId = function () {
      return this.props.grecaptcha && void 0 !== this._widgetId ? this._widgetId : null;
    }),
    (r.execute = function () {
      var e = this.getCaptchaFunction('execute');
      if (e && void 0 !== this._widgetId) return e(this._widgetId);
      this._executeRequested = !0;
    }),
    (r.executeAsync = function () {
      var e = this;
      return new Promise(function (t, r) {
        ((e.executionResolve = t), (e.executionReject = r), e.execute());
      });
    }),
    (r.reset = function () {
      var e = this.getCaptchaFunction('reset');
      e && void 0 !== this._widgetId && e(this._widgetId);
    }),
    (r.forceReset = function () {
      var e = this.getCaptchaFunction('reset');
      e && e();
    }),
    (r.handleExpired = function () {
      this.props.onExpired ? this.props.onExpired() : this.handleChange(null);
    }),
    (r.handleErrored = function () {
      (this.props.onErrored && this.props.onErrored(),
        this.executionReject && (this.executionReject(), delete this.executionResolve, delete this.executionReject));
    }),
    (r.handleChange = function (e) {
      (this.props.onChange && this.props.onChange(e),
        this.executionResolve && (this.executionResolve(e), delete this.executionReject, delete this.executionResolve));
    }),
    (r.explicitRender = function () {
      var e = this.getCaptchaFunction('render');
      if (e && void 0 === this._widgetId) {
        var t = document.createElement('div');
        ((this._widgetId = e(t, {
          sitekey: this.props.sitekey,
          callback: this.handleChange,
          theme: this.props.theme,
          type: this.props.type,
          tabindex: this.props.tabindex,
          'expired-callback': this.handleExpired,
          'error-callback': this.handleErrored,
          size: this.props.size,
          stoken: this.props.stoken,
          hl: this.props.hl,
          badge: this.props.badge,
          isolated: this.props.isolated,
        })),
          this.captcha.appendChild(t));
      }
      this._executeRequested &&
        this.props.grecaptcha &&
        void 0 !== this._widgetId &&
        ((this._executeRequested = !1), this.execute());
    }),
    (r.componentDidMount = function () {
      this.explicitRender();
    }),
    (r.componentDidUpdate = function () {
      this.explicitRender();
    }),
    (r.handleRecaptchaRef = function (e) {
      this.captcha = e;
    }),
    (r.render = function () {
      var e = this.props,
        t =
          (e.sitekey,
          e.onChange,
          e.theme,
          e.type,
          e.tabindex,
          e.onExpired,
          e.onErrored,
          e.size,
          e.stoken,
          e.grecaptcha,
          e.badge,
          e.hl,
          e.isolated,
          (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              s = {},
              a = Object.keys(e);
            for (n = 0; n < a.length; n++) ((r = a[n]), t.indexOf(r) >= 0 || (s[r] = e[r]));
            return s;
          })(e, i));
      return React.createElement(
        'div',
        o({}, t, {
          ref: this.handleRecaptchaRef,
        }),
      );
    }),
    t
  );
})(React.Component);
((d.displayName = 'ReCAPTCHA'),
  (d.propTypes = {
    sitekey: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    grecaptcha: PropTypes.object,
    theme: PropTypes.oneOf(['dark', 'light']),
    type: PropTypes.oneOf(['image', 'audio']),
    tabindex: PropTypes.number,
    onExpired: PropTypes.func,
    onErrored: PropTypes.func,
    size: PropTypes.oneOf(['compact', 'normal', 'invisible']),
    stoken: PropTypes.string,
    hl: PropTypes.string,
    badge: PropTypes.oneOf(['bottomright', 'bottomleft', 'inline']),
    isolated: PropTypes.bool,
  }),
  (d.defaultProps = {
    onChange: function () {},
    theme: 'light',
    type: 'image',
    tabindex: 0,
    size: 'normal',
    badge: 'bottomright',
  }));
function p() {
  return (p =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }).apply(this, arguments);
}
var h = {},
  f = 0,
  m = 'onloadcallback';
function y() {
  return ('u' > typeof window && window.recaptchaOptions) || {};
}
let _ = ((t = function () {
    var e = y(),
      t = e.useRecaptchaNet ? 'recaptcha.net' : 'www.google.com';
    return e.enterprise
      ? 'https://' + t + '/recaptcha/enterprise.js?onload=' + m + '&render=explicit'
      : 'https://' + t + '/recaptcha/api.js?onload=' + m + '&render=explicit';
  }),
  (r = r =
    {
      callbackName: m,
      globalName: 'grecaptcha',
      attributes: y().nonce
        ? {
            nonce: y().nonce,
          }
        : {},
    }),
  function (e) {
    var n = e.displayName || e.name || 'Component',
      i = (function (n) {
        function a(e, t) {
          var r;
          return (((r = n.call(this, e, t) || this).state = {}), (r.__scriptURL = ''), r);
        }
        ((a.prototype = Object.create(n.prototype)), (a.prototype.constructor = a), (a.__proto__ = n));
        var i = a.prototype;
        return (
          (i.asyncScriptLoaderGetScriptLoaderID = function () {
            return (
              this.__scriptLoaderID || (this.__scriptLoaderID = 'async-script-loader-' + f++),
              this.__scriptLoaderID
            );
          }),
          (i.setupScriptURL = function () {
            return ((this.__scriptURL = 'function' == typeof t ? t() : t), this.__scriptURL);
          }),
          (i.asyncScriptLoaderHandleLoad = function (e) {
            var t = this;
            this.setState(e, function () {
              return t.props.asyncScriptOnLoad && t.props.asyncScriptOnLoad(t.state);
            });
          }),
          (i.asyncScriptLoaderTriggerOnScriptLoaded = function () {
            var e = h[this.__scriptURL];
            if (!e || !e.loaded) throw Error('Script is not loaded.');
            for (var t in e.observers) e.observers[t](e);
            delete window[r.callbackName];
          }),
          (i.componentDidMount = function () {
            var e = this,
              t = this.setupScriptURL(),
              n = this.asyncScriptLoaderGetScriptLoaderID(),
              s = r,
              a = s.globalName,
              i = s.callbackName,
              o = s.scriptId;
            if (
              (a &&
                void 0 !== window[a] &&
                (h[t] = {
                  loaded: !0,
                  observers: {},
                }),
              h[t])
            ) {
              var c = h[t];
              return c && (c.loaded || c.errored)
                ? void this.asyncScriptLoaderHandleLoad(c)
                : void (c.observers[n] = function (t) {
                    return e.asyncScriptLoaderHandleLoad(t);
                  });
            }
            var l = {};
            ((l[n] = function (t) {
              return e.asyncScriptLoaderHandleLoad(t);
            }),
              (h[t] = {
                loaded: !1,
                observers: l,
              }));
            var d = document.createElement('script');
            for (var u in ((d.src = t), (d.async = !0), r.attributes)) d.setAttribute(u, r.attributes[u]);
            o && (d.id = o);
            var p = function (e) {
              if (h[t]) {
                var r = h[t].observers;
                for (var n in r) e(r[n]) && delete r[n];
              }
            };
            (i &&
              'u' > typeof window &&
              (window[i] = function () {
                return e.asyncScriptLoaderTriggerOnScriptLoaded();
              }),
              (d.onload = function () {
                var e = h[t];
                e &&
                  ((e.loaded = !0),
                  p(function (t) {
                    return !i && (t(e), !0);
                  }));
              }),
              (d.onerror = function () {
                var e = h[t];
                e &&
                  ((e.errored = !0),
                  p(function (t) {
                    return (t(e), !0);
                  }));
              }),
              document.body.appendChild(d));
          }),
          (i.componentWillUnmount = function () {
            var e = this.__scriptURL;
            if (!0 === r.removeOnUnmount)
              for (var t = document.getElementsByTagName('script'), n = 0; n < t.length; n += 1)
                t[n].src.indexOf(e) > -1 && t[n].parentNode && t[n].parentNode.removeChild(t[n]);
            var s = h[e];
            s &&
              (delete s.observers[this.asyncScriptLoaderGetScriptLoaderID()], !0 === r.removeOnUnmount && delete h[e]);
          }),
          (i.render = function () {
            var t = r.globalName,
              n = this.props,
              a = (n.asyncScriptOnLoad, n.forwardedRef),
              i = (function (e, t) {
                if (null == e) return {};
                var r,
                  n,
                  s = {},
                  a = Object.keys(e);
                for (n = 0; n < a.length; n++) t.indexOf((r = a[n])) >= 0 || (s[r] = e[r]);
                return s;
              })(n, ['asyncScriptOnLoad', 'forwardedRef']);
            return (
              t && 'u' > typeof window && (i[t] = void 0 !== window[t] ? window[t] : void 0),
              (i.ref = a),
              React.createElement(e, i)
            );
          }),
          a
        );
      })(React.Component),
      o = React.forwardRef(function (e, t) {
        return React.createElement(
          i,
          p({}, e, {
            forwardedRef: t,
          }),
        );
      });
    return (
      (o.displayName = 'AsyncScriptLoader(' + n + ')'),
      (o.propTypes = {
        asyncScriptOnLoad: PropTypes.func,
      }),
      hoistStatics(o, e)
    );
  })(d),
  v = React.forwardRef(function ({ setCaptchaToken: e, setCaptcha: t, setErrors: r, invalid: s }, a) {
    function i() {
      (e(null), t(!1));
    }
    return (
      <div className="acc__captcha-wrap">
        <_
          ref={a}
          sitekey="6LexbFwtAAAAABbeLfRaF7HtP3vmaBwqJYAdiYGe"
          onChange={(n) => {
            (e(n),
              t(!0),
              r((e) => ({
                ...e,
                captcha: !1,
              })));
          }}
          onExpired={i}
          onErrored={i}
        />
        {s && (
          <span className="acc__error" role="alert">
            Please confirm you're not a robot.
          </span>
        )}
      </div>
    );
  });
export default v;
