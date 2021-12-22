(function (self, undefined) {
    function Call(t, l) {
      var n = arguments.length > 2 ? arguments[2] : [];
      if (!1 === IsCallable(t))
        throw new TypeError(Object.prototype.toString.call(t) + "is not a function.");
      return t.apply(l, n);
    }
    function CreateMethodProperty(e, r, t) {
      var a = { value: t, writable: !0, enumerable: !1, configurable: !0 };
      Object.defineProperty(e, r, a);
    }
    function Get(n, t) {
      return n[t];
    }
    function HasOwnProperty(r, t) {
      return Object.prototype.hasOwnProperty.call(r, t);
    }
    function IsCallable(n) {
      return "function" == typeof n;
    }
    function ToObject(e) {
      if (null === e || e === undefined) throw TypeError();
      return Object(e);
    }
    function GetV(t, e) {
      return ToObject(t)[e];
    }
    function GetMethod(e, n) {
      var r = GetV(e, n);
      if (null === r || r === undefined) return undefined;
      if (!1 === IsCallable(r)) throw new TypeError("Method not callable: " + n);
      return r;
    }
    function Type(e) {
      switch (typeof e) {
        case "undefined":
          return "undefined";
        case "boolean":
          return "boolean";
        case "number":
          return "number";
        case "string":
          return "string";
        case "symbol":
          return "symbol";
        default:
          return null === e
            ? "null"
            : "Symbol" in self &&
              (e instanceof self.Symbol || e.constructor === self.Symbol)
            ? "symbol"
            : "object";
      }
    }
    function OrdinaryToPrimitive(r, t) {
      if ("string" === t) var e = ["toString", "valueOf"];
      else e = ["valueOf", "toString"];
      for (var i = 0; i < e.length; ++i) {
        var n = e[i],
          a = Get(r, n);
        if (IsCallable(a)) {
          var o = Call(a, r);
          if ("object" !== Type(o)) return o;
        }
      }
      throw new TypeError("Cannot convert to primitive.");
    }
    function ToPrimitive(e) {
      var t = arguments.length > 1 ? arguments[1] : undefined;
      if ("object" === Type(e)) {
        if (arguments.length < 2) var i = "default";
        else t === String ? (i = "string") : t === Number && (i = "number");
        var r =
          "function" == typeof self.Symbol && "symbol" == typeof self.Symbol.toPrimitive
            ? GetMethod(e, self.Symbol.toPrimitive)
            : undefined;
        if (r !== undefined) {
          var n = Call(r, e, [i]);
          if ("object" !== Type(n)) return n;
          throw new TypeError("Cannot convert exotic object to primitive.");
        }
        return "default" === i && (i = "number"), OrdinaryToPrimitive(e, i);
      }
      return e;
    }
    function ToString(t) {
      switch (Type(t)) {
        case "symbol":
          throw new TypeError("Cannot convert a Symbol value to a string");
        case "object":
          return ToString(ToPrimitive(t, String));
        default:
          return String(t);
      }
    }
    function ToPropertyKey(r) {
      var i = ToPrimitive(r, String);
      return "symbol" === Type(i) ? i : ToString(i);
    }
    !(function () {
      var e = Object.getOwnPropertyDescriptor,
        t = function () {
          try {
            return (
              1 ===
              Object.defineProperty(document.createElement("div"), "one", {
                get: function () {
                  return 1;
                }
              }).one
            );
          } catch (e) {
            return !1;
          }
        },
        r = {}.toString,
        n = "".split;
      CreateMethodProperty(Object, "getOwnPropertyDescriptor", function c(o, i) {
        var a = ToObject(o);
        a =
          ("string" === Type(a) || a instanceof String) && "[object String]" == r.call(o)
            ? n.call(o, "")
            : Object(o);
        var u = ToPropertyKey(i);
        if (t)
          try {
            return e(a, u);
          } catch (l) {}
        if (HasOwnProperty(a, u))
          return { enumerable: !0, configurable: !0, writable: !0, value: a[u] };
      });
    })();
    CreateMethodProperty(
      Object,
      "keys",
      (function () {
        "use strict";
        function t(t) {
          var e = r.call(t),
            n = "[object Arguments]" === e;
          return (
            n ||
              (n =
                "[object Array]" !== e &&
                null !== t &&
                "object" == typeof t &&
                "number" == typeof t.length &&
                t.length >= 0 &&
                "[object Function]" === r.call(t.callee)),
            n
          );
        }
        var e = Object.prototype.hasOwnProperty,
          r = Object.prototype.toString,
          n = Object.prototype.propertyIsEnumerable,
          o = !n.call({ toString: null }, "toString"),
          l = n.call(function () {}, "prototype"),
          c = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor"
          ],
          i = function (t) {
            var e = t.constructor;
            return e && e.prototype === t;
          },
          u = {
            $console: !0,
            $external: !0,
            $frame: !0,
            $frameElement: !0,
            $frames: !0,
            $innerHeight: !0,
            $innerWidth: !0,
            $outerHeight: !0,
            $outerWidth: !0,
            $pageXOffset: !0,
            $pageYOffset: !0,
            $parent: !0,
            $scrollLeft: !0,
            $scrollTop: !0,
            $scrollX: !0,
            $scrollY: !0,
            $self: !0,
            $webkitIndexedDB: !0,
            $webkitStorageInfo: !0,
            $window: !0
          },
          a = (function () {
            if ("undefined" == typeof window) return !1;
            for (var t in window)
              try {
                if (
                  !u["$" + t] &&
                  e.call(window, t) &&
                  null !== window[t] &&
                  "object" == typeof window[t]
                )
                  try {
                    i(window[t]);
                  } catch (r) {
                    return !0;
                  }
              } catch (r) {
                return !0;
              }
            return !1;
          })(),
          f = function (t) {
            if ("undefined" == typeof window || !a) return i(t);
            try {
              return i(t);
            } catch (e) {
              return !1;
            }
          };
        return function p(n) {
          var i = "[object Function]" === r.call(n),
            u = t(n),
            a = "[object String]" === r.call(n),
            p = [];
          if (n === undefined || null === n)
            throw new TypeError("Cannot convert undefined or null to object");
          var s = l && i;
          if (a && n.length > 0 && !e.call(n, 0))
            for (var y = 0; y < n.length; ++y) p.push(String(y));
          if (u && n.length > 0) for (var g = 0; g < n.length; ++g) p.push(String(g));
          else
            for (var h in n) (s && "prototype" === h) || !e.call(n, h) || p.push(String(h));
          if (o)
            for (var w = f(n), d = 0; d < c.length; ++d)
              (w && "constructor" === c[d]) || !e.call(n, c[d]) || p.push(c[d]);
          return p;
        };
      })()
    );
    CreateMethodProperty(Object, "assign", function e(t, r) {
      var n = ToObject(t);
      if (1 === arguments.length) return n;
      var o,
        c,
        a,
        l,
        i = Array.prototype.slice.call(arguments, 1);
      for (o = 0; o < i.length; o++) {
        var p = i[o];
        for (
          p === undefined || null === p
            ? (a = [])
            : ((l =
                "[object String]" === Object.prototype.toString.call(p)
                  ? String(p).split("")
                  : ToObject(p)),
              (a = Object.keys(l))),
            c = 0;
          c < a.length;
          c++
        ) {
          var b,
            y = a[c];
          try {
            var g = Object.getOwnPropertyDescriptor(l, y);
            b = g !== undefined && !0 === g.enumerable;
          } catch (u) {
            b = Object.prototype.propertyIsEnumerable.call(l, y);
          }
          if (b) {
            var j = Get(l, y);
            n[y] = j;
          }
        }
      }
      return n;
    });
  })(
    ("object" === typeof window && window) ||
      ("object" === typeof self && self) ||
      ("object" === typeof global && global) ||
      {}
  );
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? t()
      : "function" == typeof define && define.amd
      ? define(t)
      : t();
  })(0, function () {
    "use strict";
    function e(e) {
      var t = this.constructor;
      return this.then(
        function (n) {
          return t.resolve(e()).then(function () {
            return n;
          });
        },
        function (n) {
          return t.resolve(e()).then(function () {
            return t.reject(n);
          });
        }
      );
    }
    function t(e) {
      return new this(function (t, n) {
        function o(e, n) {
          if (n && ("object" == typeof n || "function" == typeof n)) {
            var f = n.then;
            if ("function" == typeof f)
              return void f.call(
                n,
                function (t) {
                  o(e, t);
                },
                function (n) {
                  (r[e] = { status: "rejected", reason: n }), 0 == --i && t(r);
                }
              );
          }
          (r[e] = { status: "fulfilled", value: n }), 0 == --i && t(r);
        }
        if (!e || "undefined" == typeof e.length)
          return n(
            new TypeError(
              typeof e +
                " " +
                e +
                " is not iterable(cannot read property Symbol(Symbol.iterator))"
            )
          );
        var r = Array.prototype.slice.call(e);
        if (0 === r.length) return t([]);
        for (var i = r.length, f = 0; r.length > f; f++) o(f, r[f]);
      });
    }
    function n(e) {
      return !(!e || "undefined" == typeof e.length);
    }
    function o() {}
    function r(e) {
      if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
      if ("function" != typeof e) throw new TypeError("not a function");
      (this._state = 0),
        (this._handled = !1),
        (this._value = undefined),
        (this._deferreds = []),
        l(e, this);
    }
    function i(e, t) {
      for (; 3 === e._state; ) e = e._value;
      0 !== e._state
        ? ((e._handled = !0),
          r._immediateFn(function () {
            var n = 1 === e._state ? t.onFulfilled : t.onRejected;
            if (null !== n) {
              var o;
              try {
                o = n(e._value);
              } catch (r) {
                return void u(t.promise, r);
              }
              f(t.promise, o);
            } else (1 === e._state ? f : u)(t.promise, e._value);
          }))
        : e._deferreds.push(t);
    }
    function f(e, t) {
      try {
        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
        if (t && ("object" == typeof t || "function" == typeof t)) {
          var n = t.then;
          if (t instanceof r) return (e._state = 3), (e._value = t), void c(e);
          if ("function" == typeof n)
            return void l(
              (function (e, t) {
                return function () {
                  e.apply(t, arguments);
                };
              })(n, t),
              e
            );
        }
        (e._state = 1), (e._value = t), c(e);
      } catch (o) {
        u(e, o);
      }
    }
    function u(e, t) {
      (e._state = 2), (e._value = t), c(e);
    }
    function c(e) {
      2 === e._state &&
        0 === e._deferreds.length &&
        r._immediateFn(function () {
          e._handled || r._unhandledRejectionFn(e._value);
        });
      for (var t = 0, n = e._deferreds.length; n > t; t++) i(e, e._deferreds[t]);
      e._deferreds = null;
    }
    function l(e, t) {
      var n = !1;
      try {
        e(
          function (e) {
            n || ((n = !0), f(t, e));
          },
          function (e) {
            n || ((n = !0), u(t, e));
          }
        );
      } catch (o) {
        if (n) return;
        (n = !0), u(t, o);
      }
    }
    var a = setTimeout;
    (r.prototype["catch"] = function (e) {
      return this.then(null, e);
    }),
      (r.prototype.then = function (e, t) {
        var n = new this.constructor(o);
        return (
          i(
            this,
            new (function (e, t, n) {
              (this.onFulfilled = "function" == typeof e ? e : null),
                (this.onRejected = "function" == typeof t ? t : null),
                (this.promise = n);
            })(e, t, n)
          ),
          n
        );
      }),
      (r.prototype["finally"] = e),
      (r.all = function (e) {
        return new r(function (t, o) {
          function r(e, n) {
            try {
              if (n && ("object" == typeof n || "function" == typeof n)) {
                var u = n.then;
                if ("function" == typeof u)
                  return void u.call(
                    n,
                    function (t) {
                      r(e, t);
                    },
                    o
                  );
              }
              (i[e] = n), 0 == --f && t(i);
            } catch (c) {
              o(c);
            }
          }
          if (!n(e)) return o(new TypeError("Promise.all accepts an array"));
          var i = Array.prototype.slice.call(e);
          if (0 === i.length) return t([]);
          for (var f = i.length, u = 0; i.length > u; u++) r(u, i[u]);
        });
      }),
      (r.allSettled = t),
      (r.resolve = function (e) {
        return e && "object" == typeof e && e.constructor === r
          ? e
          : new r(function (t) {
              t(e);
            });
      }),
      (r.reject = function (e) {
        return new r(function (t, n) {
          n(e);
        });
      }),
      (r.race = function (e) {
        return new r(function (t, o) {
          if (!n(e)) return o(new TypeError("Promise.race accepts an array"));
          for (var i = 0, f = e.length; f > i; i++) r.resolve(e[i]).then(t, o);
        });
      }),
      (r._immediateFn =
        ("function" == typeof setImmediate &&
          function (e) {
            setImmediate(e);
          }) ||
        function (e) {
          a(e, 0);
        }),
      (r._unhandledRejectionFn = function (e) {
        void 0 !== console &&
          console &&
          console.warn("Possible Unhandled Promise Rejection:", e);
      });
    var s = (function () {
      if ("undefined" != typeof self) return self;
      if ("undefined" != typeof window) return window;
      if ("undefined" != typeof global) return global;
      throw Error("unable to locate global object");
    })();
    "function" != typeof s.Promise
      ? (s.Promise = r)
      : s.Promise.prototype["finally"]
      ? s.Promise.allSettled || (s.Promise.allSettled = t)
      : (s.Promise.prototype["finally"] = e);
  });
  (function () {
    const base_url = "https://api-staging.celero.io/";
    const trackingApi = base_url + "api/external/tracking/";
    const logErrorApi = base_url + "api/external/error-logs/";
    const integrationsTrackingApi = base_url + "api/external/integrations/";
    const abTestingApi = base_url + "api/external/ab_testing/";
    const customEventsApi = base_url + "api/external/custom_events/";
    let customEvents = [];
    let organizedCustomEvents = [];
    const dispatchedEvents = [];
    const listOfABtestingUUID = [
      {
        originalFileToMatch: "50e152d7-1315-4816-8e2f-88d1ef2da662",
        a: "50e152d7-1315-4816-8e2f-88d1ef2da662",
        b: "8a14c460-39f8-47af-83b7-7e99c8462c81"
      }
    ];
    let ABtestingRoute = null;
  
    let userData = {};
    let integrationValues = {};
    const INTEGRATIONS = {
      MARKETO: "MARKETO"
    };
    let IDENTIFICATION_INTEGRATIONS_KEYS = {};
    IDENTIFICATION_INTEGRATIONS_KEYS[INTEGRATIONS.MARKETO] = "luid";
  
    const EVENTS = {
      IDENTIFY_USER: "Identify User",
      OPEN_CONTENT: "Open Content",
      CLOSE_CONTENT: "Close Content",
      COPY_TEXT: "Copy Text",
      HIGHLIGHT_TEXT: "Highlight Text",
      OPEN_SEARCH: "Open Search"
    };
    const browserProfile = getBrowserProfile();
    let celero_id = getCookie("celero_id");
    celero.init = function init() {
      const queryParams = parseQueryString();
      if (queryParams && queryParams["celero_id"]) {
        celero_id = queryParams["celero_id"];
      } else if (celero_id === "") {
        celero_id = uuidv4();
      }
      setCookie("celero_id", celero_id, 10000);
  
      celero.setUserIdentity({ celero_id: celero_id });
  
      getCustomEvents()
        .then(data => {
          if (!data || data.length === 0) {
            return;
          }
          customEvents = [...data];
          organizeCustomEventsBasedOnName();
          return Promise.all(customEvents);
        })
        .catch(err => {
          logError(err);
        })
        .finally(() => {
          onPageOpen();
          getAllHrefAndUpdateParams();
          onDomLoaded();
          onChangeRoute();
          onDomUnloaded();
          onTextHighlighted();
          onTextCopied();
          onTextSearch();
        });
    };
  
    function handleExternalIntegrations() {
      return new Promise(function (resolve, reject) {
        // add params depending on existing integration
        const params = getExistingIntegrationParams();
        const url = integrationsTrackingApi + "?" + params;
  
        sendRequest("GET", url)
          .then(function (res) {
            if (res && res.response && !!res.response.length) {
              resolve(res.response);
            } else {
              resolve(false);
            }
          })
          .catch(function () {
            resolve(false);
          });
      });
    }
  
    function getExistingIntegrationParams() {
      if (getCookie("_mkto_trk")) {
        return getEncodedURLParams({
          account_id: celero.appid,
          filter_type: "cookies",
          filter_values: getCookie("_mkto_trk")
        });
      } else {
        return getEncodedURLParams({
          account_id: celero.appid
        });
      }
    }
  
    function getIntegrationValues(integration) {
      if (integration.name === INTEGRATIONS.MARKETO) {
        return marketoIntegrationHandler(integration);
      }
    }
  
    function marketoIntegrationHandler(integration) {
      return new Promise(function (resolve, reject) {
        if (integration && integration.data && integration.data.lead_id) {
          integrationValues[IDENTIFICATION_INTEGRATIONS_KEYS.MARKETO] =
            integration.data.lead_id;
        }
        resolve(true);
      });
    }
  
    function getEncodedURLParams(paramsObj) {
      try {
        return Object.keys(paramsObj)
          .map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(paramsObj[key]);
          })
          .join("&");
      } catch (e) {
        logError(e);
      }
    }
  
    function logError(error) {
      sendRequest("POST", logErrorApi, error)
        .then(function () {})
        .catch(function () {});
    }
  
    celero.recordEvent = function (eventName, eventProps) {
      if (!eventName) {
        return Error("Event Name Must Be Defined");
      }
      if (!eventProps) {
        eventProps = {};
      }
      const payload = {};
  
      payload["event_type"] = eventName;
      payload["tech"] = {};
      payload["tech"]["profile"] = browserProfile;
      payload["user"] = celero.getUserIdentity();
      payload["event_properties"] = appendUrlParams(eventProps);
      payload["account_id"] = celero.appid;
      payload["event_properties"]["celero_id"] = celero_id;
      payload["event_properties"]["account_id"] = celero.appid;
      payload["event_properties"]["local_time_full"] = new Date().toISOString();
      const requestPayload = {
        payload: payload,
        account_id: celero.appid
      };
      sendRequest("POST", trackingApi, requestPayload);
      if (customEvents) {
        checkCustomEvents(eventName, eventProps);
      }
    };
    celero.setUserIdentity = function setUserIdentity(user) {
      if (!user) {
        return user;
      }
      userData = Object.assign({}, user, userData);
      window.localStorage.setItem("celero-user", JSON.stringify(userData));
      celero.user = userData;
      return userData;
    };
    celero.getUserIdentity = function () {
      var stringifiedUser = window.localStorage.getItem("celero-user");
      if (!stringifiedUser) {
        return {};
      }
      let user = JSON.parse(stringifiedUser);
      user["celero_id"] = celero_id;
      user["account_id"] = celero.appid;
  
      return user;
    };
    celero.clearUser = function () {
      window.localStorage.removeItem("celero-user");
    };
    celero.getCeleroId = function () {
      return getCookie("celero_id");
    };
  
    function onDomLoaded() {
      document.onreadystatechange = function () {
        if (document.readyState === "complete") {
          getAllHrefAndUpdateParams();
        }
      };
      setTimeout(function () {
        getAllHrefAndUpdateParams();
        const cid = celero.getCeleroId();
        if (cid && document.getElementsByName("mktoceleroid").length > 0) {
          document.getElementsByName("mktoceleroid")[0].value = cid;
        }
      }, 1500);
    }
  
    function onDomUnloaded() {
      window.onbeforeunload = function (event) {
        celero.recordEvent(EVENTS.CLOSE_CONTENT, {
          url: window.location.href,
          title: document.title
        });
      };
      window.addEventListener("beforeunload", function (e) {
        celero.recordEvent(EVENTS.CLOSE_CONTENT, {
          url: window.location.href,
          title: document.title
        });
      });
    }
  
    function onTextHighlighted() {
      document.addEventListener(
        "selectionchange",
        debounce(function (event) {
          let selection = document.getSelection
            ? document.getSelection().toString()
            : document.selection.createRange().toString();
          if (selection && selection.length) {
            celero.recordEvent(EVENTS.HIGHLIGHT_TEXT, {
              text: selection
            });
          }
        }, 250)
      );
    }
  
    function onTextCopied() {
      document.addEventListener(
        "copy",
        debounce(function (event) {
          let selection = document.getSelection
            ? document.getSelection().toString()
            : document.selection.createRange().toString();
          if (selection && selection.length) {
            celero.recordEvent(EVENTS.COPY_TEXT, {
              text: selection
            });
          }
        }, 250)
      );
    }
  
    function onTextSearch() {
      document.addEventListener(
        "keydown",
        debounce(function (event) {
          const keyCode = event.keyCode;
          const isSearchShortcutPressed =
            (event.ctrlKey ||
              (window.navigator.platform.includes("Mac") &&
                (keyCode === 91 || keyCode === 93 || event.metaKey))) &&
            keyCode === 70;
  
          if (isSearchShortcutPressed) {
            celero.recordEvent(EVENTS.OPEN_SEARCH);
          }
        }, 250)
      );
    }
  
    function onPageOpen() {
      celero.recordEvent(EVENTS.OPEN_CONTENT, {
        url: window.location.href,
        title: document.title,
        content_type: "Webpage" //@ToDO:: take content_type from argument passed in celero.load()
      });
    }
  
    function debounce(fn, delay) {
      let timer = null;
      return function () {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }
  
    function sendRequest(method, url, data, headers = {}) {
      return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        if (headers) {
          Object.keys(headers).map(function (key) {
            if (headers[key]) {
              xhr.setRequestHeader(key, headers[key]);
            }
          });
        }
  
        xhr.addEventListener("load", function () {
          let status = xhr.status;
          let response = xhr.response;
          let res = JSON.parse(response);
          if (status >= 200 && status < 400) {
            resolve({ response: res, status: status });
          } else {
            reject({ response: res, status: status });
          }
        });
        xhr.addEventListener("error", function () {
          let status = xhr.status;
          let response = xhr.response;
          reject({ response: response, status: status });
        });
  
        if (data) {
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send();
        }
      });
    }
  
    function appendUrlParams(payload) {
      const urlObjParams = parseQueryString();
      if (!urlObjParams) {
        return payload;
      }
      payload = Object.assign({}, payload, urlObjParams);
      if (payload["celero_id"]) {
        userData["celero_id"] = payload["celero_id"];
      }
      return payload;
    }
  
    function setCookie(name, value, hours) {
      if (hours) {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        var expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    function celeroLinksCallback(e) {
      e.stopPropagation();
      e.preventDefault();
      var windowRef = window.open();
  
      handleExternalIntegrations()
        .then(data => {
          if (!data || data.length === 0) {
            return;
          }
          let promiseArray = [];
          for (let item of data) {
            promiseArray.push(getIntegrationValues(item));
          }
          return Promise.all(promiseArray);
        })
        .catch(err => {
          logError(err);
        })
        .finally(() => {
          celero.recordEvent(EVENTS.IDENTIFY_USER, integrationValues);
          var celeroLink = e.target.href;
          // Start of  logic is for A/B testing for POC reasons must be removed
          if (!!ABtestingRoute) {
            var link = celeroLink;
            var backsplashLastIndex = link.lastIndexOf("/");
            var queryParamsLinkIndex = link.lastIndexOf("?");
            celeroLink =
              link.substring(0, backsplashLastIndex) +
              "/" +
              ABtestingRoute +
              "/" +
              link.substring(queryParamsLinkIndex);
          }
          // END of  logic is for A/B testing for POC reasons must be removed
          if (integrationValues.hasOwnProperty(IDENTIFICATION_INTEGRATIONS_KEYS.MARKETO)) {
            celeroLink = updateQueryStringParameter(
              celeroLink,
              IDENTIFICATION_INTEGRATIONS_KEYS.MARKETO,
              integrationValues[IDENTIFICATION_INTEGRATIONS_KEYS.MARKETO]
            );
          }
  
          // https://stackoverflow.com/questions/20696041/window-openurl-blank-not-working-on-imac-safari
          windowRef.location = celeroLink;
        });
    }
    function getAllHrefAndUpdateParams() {
      const anchors = document.querySelectorAll("a");
      for (let i = 0; i < anchors.length; i++) {
        if (isCeleroUrl(anchors[i].href)) {
          anchors[i].removeEventListener("click", celeroLinksCallback, false);
          anchors[i].addEventListener("click", celeroLinksCallback, false);
          checkIfWithinListOfAbTestingRoutes(anchors[i].href);
          anchors[i].href = updateQueryStringParameter(
            anchors[i].href,
            "celero_id",
            celero_id
          );
        }
        if (
          anchors[i].getAttribute("cta_dest_link") &&
          isCeleroUrl(anchors[i].getAttribute("cta_dest_link"))
        ) {
          anchors[i].setAttribute(
            "cta_dest_link",
            updateQueryStringParameter(
              anchors[i].getAttribute("cta_dest_link"),
              "celero_id",
              celero_id
            )
          );
          checkIfWithinListOfAbTestingRoutes(anchors[i].href);
          anchors[i].href = updateQueryStringParameter(
            anchors[i].getAttribute("cta_dest_link"),
            "celero_id",
            celero_id
          );
        }
      }
    }
  
    function onChangeRoute() {
      var pushState = history.pushState;
      history.pushState = function () {
        pushState.apply(history, arguments);
        routeChanged("pushState", arguments); // Some event-handling function
      };
    }
  
    function routeChanged(e, arg) {
      setTimeout(function () {
        getAllHrefAndUpdateParams();
      }, 0);
    }
  
    function uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  
    function updateQueryStringParameter(uri, key, value) {
      var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
      var separator = uri.indexOf("?") !== -1 ? "&" : "?";
      if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
      } else {
        return uri + separator + key + "=" + value;
      }
    }
  
    function isCeleroUrl(url) {
      const expression =
        /^((?:https?:)?\/\/)?((?:engage|m)\.)?((?:celero\.io|celero.io))((\/)(\S+)|\/)?$/;
      const regex = new RegExp(expression);
      return url.match(regex);
    }
  
    function parseQueryString() {
      const urlQueryString = window.location.search;
      if (!urlQueryString) {
        return null;
      }
      const queryParamArray = urlQueryString.split("?");
      if (!queryParamArray[1]) {
        return;
      }
      const query = queryParamArray[1];
      const vars = query.split("&");
      const queryString = {};
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        const key = decodeURIComponent(pair[0]);
        const value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof queryString[key] === "undefined") {
          queryString[key] = decodeURIComponent(value);
          // If second entry with this name
        } else if (typeof queryString[key] === "string") {
          let arr = [queryString[key], decodeURIComponent(value)];
          queryString[key] = arr;
          // If third or later entry with this name
        } else {
          queryString[key].push(decodeURIComponent(value));
        }
      }
      return queryString;
    }
  
    function getBrowserProfile() {
      return {
        cookies:
          "undefined" !== typeof navigator.cookieEnabled ? navigator.cookieEnabled : false,
        codeName: navigator.appCodeName,
        description: getDocumentDescription(),
        language: navigator.language,
        name: navigator.appName,
        online: navigator.onLine,
        platform: navigator.platform,
        useragent: navigator.userAgent,
        version: navigator.appVersion,
        doNotTrack: navigator.doNotTrack,
        screen: getScreenProfile(),
        window: getWindowProfile()
      };
    }
  
    function getDocumentDescription() {
      var el;
      if (document && typeof document.querySelector === "function") {
        el = document.querySelector('meta[name="description"]');
      }
      return el ? el.content : "";
    }
  
    function getScreenProfile() {
      var keys, output;
  
      if ("undefined" == typeof window || !window.screen) return {};
  
      keys = ["height", "width", "colorDepth", "pixelDepth", "availHeight", "availWidth"];
      output = {};
  
      for (var i = 0; i < keys.length; i++) {
        output[keys[i]] = window.screen[keys[i]] ? window.screen[keys[i]] : null;
      }
  
      output.orientation = {
        angle: window.screen.orientation ? window.screen.orientation["angle"] : 0,
        type: window.innerWidth > window.innerHeight ? "landscape" : "portrait"
      };
  
      return output;
    }
  
    function getWindowProfile() {
      var body, html, output;
  
      if ("undefined" == typeof document) return {};
  
      body = document.body || {};
      html = document.documentElement || {};
  
      output = {
        height:
          "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight,
        width:
          "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth,
        scrollHeight:
          Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          ) || null
      };
  
      if (window.screen) {
        output.ratio = {
          height: window.screen.availHeight
            ? parseFloat((window.innerHeight / window.screen.availHeight).toFixed(2))
            : null,
          width: window.screen.availWidth
            ? parseFloat((window.innerWidth / window.screen.availWidth).toFixed(2))
            : null
        };
      }
  
      return output;
    }
  
    function assignObj(objs) {
      // var objs = [{ Name: "ABC" }, { Roll: 123 }],
      result = objs.reduce(function (r, o) {
        Object.keys(o).forEach(function (k) {
          r[k] = o[k];
        });
        return r;
      }, {});
    }
  
    function checkIfWithinListOfAbTestingRoutes(link) {
      for (let index = 0, len = listOfABtestingUUID.length; index < len; index++) {
        const content = listOfABtestingUUID[index];
        if (link.indexOf(content.originalFileToMatch) !== -1) {
          ABtestingRoute = getABTestingRoute(content.a, content.b);
        }
      }
    }
  
    function getABTestingRoute(document1ContentUUID, document2ContentUUID) {
      const queryParams =
        "?account_id=" +
        celero.appid +
        "&contentUUID1=" +
        document1ContentUUID +
        "&contentUUID2=" +
        document2ContentUUID;
  
      sendRequest("GET", abTestingApi + queryParams)
        .then(function (res) {
          ABtestingRoute = res.response.ab_testing_route;
        })
        .catch(function (err) {
          logError(err);
        });
    }
  
    function getCustomEventsParams() {
      return getEncodedURLParams({
        account_id: celero.appid
      });
    }
  
    function getCustomEvents() {
      return new Promise(function (resolve, reject) {
        // add params depending on existing integration
        const params = getCustomEventsParams();
        const url = customEventsApi + "?" + params;
        const headers = {
          Origin: document.origin
        };
        sendRequest("GET", url, undefined, headers)
          .then(function (res) {
            if (res && res.response && !!res.response.length) {
              resolve(res.response);
            } else {
              resolve(false);
            }
          })
          .catch(function () {
            resolve(false);
          });
      });
    }
  
    function organizeCustomEventsBasedOnName() {
      Object.keys(customEvents).forEach(function (value) {
        Object.keys(customEvents[value].data).forEach(function (allEvents) {
          Object.keys(customEvents[value].data[allEvents]).forEach(function (event) {
            const currentEvent = customEvents[value].data[allEvents][event];
            const foundEvents = filterEventsBasedOnName(currentEvent.event);
            addItemToOrganizedEvents(foundEvents, currentEvent.event);
          });
        });
      });
    }
  
    function addItemToOrganizedEvents(items, eventName) {
      const index = organizedCustomEvents.findIndex(x => x.eventName === eventName);
      if (index === -1) {
        organizedCustomEvents.push({
          eventName: eventName,
          items: items
        });
      }
    }
  
    function filterEventsBasedOnName(eventName) {
      let foundEvents = [];
      let i = 0;
      Object.keys(customEvents).forEach(function (event) {
        Object.keys(customEvents[event].data).forEach(function (obj) {
          Object.keys(customEvents[event].data[obj]).forEach(function (v) {
            const currentEvent = customEvents[event].data[obj][v];
            if (currentEvent.event === eventName) {
              foundEvents[i++] = customEvents[event];
            }
          });
        });
      });
      return foundEvents;
    }
  
    function checkCustomEvents(eventName, eventProps) {
      const result = organizedCustomEvents.filter(function (o) {
        return o.eventName === eventName;
      });
      const events = result && result[0] && result[0].items ? result[0].items : undefined;
      if (!events || events.length === 0) {
        return;
      }
      let successChecks = [];
      let i = 0;
      Object.keys(events).forEach(function (value) {
        const canDispatch = canBeDispatched(events[value]);
        if (canDispatch === false) {
          return;
        }
        Object.keys(events[value].data).forEach(function (allEvents) {
          Object.keys(events[value].data[allEvents]).forEach(function (event) {
            const currentEvent = events[value].data[allEvents][event];
            if (currentEvent.event === eventName) {
              const currentEventRules = currentEvent.rules;
              successChecks[i] = {
                length: currentEvent.rules.length, //All rules (for later check)
                checks: [] //Array of true/false values depending on condition (applied/not applied)
              };
              Object.keys(currentEventRules).forEach(function (rule) {
                const propertyExists = currentEventRules[rule].key in eventProps;
                switch (currentEventRules[rule].condition) {
                  case "exists":
                  case "notExists":
                    successChecks[i]["checks"].push(propertyExists);
                    break;
                  case "contains":
                    successChecks[i]["checks"].push(
                      propertyExists &&
                        eventProps[currentEventRules[rule].key].includes(
                          currentEventRules[rule].value
                        )
                    );
                    break;
                  case "equal":
                    successChecks[i]["checks"].push(
                      propertyExists &&
                        currentEventRules[rule].value ===
                          eventProps[currentEventRules[rule].key]
                    );
                    break;
                  case "notEqual":
                    successChecks[i]["checks"].push(
                      propertyExists &&
                        currentEventRules[rule].value !==
                          eventProps[currentEventRules[rule].key]
                    );
                    break;
                  case "greaterThan":
                    successChecks[i]["checks"].push(
                      propertyExists &&
                        currentEventRules[rule].value >
                          eventProps[currentEventRules[rule].key]
                    );
                    break;
                  case "lessThan":
                    successChecks[i]["checks"].push(
                      propertyExists &&
                        currentEventRules[rule].value <
                          eventProps[currentEventRules[rule].key]
                    );
                    break;
                }
              });
              //When all rules are applied, dispatch the event
              if (
                successChecks[i]["length"] ===
                successChecks[i]["checks"].filter(Boolean).length
              ) {
                dispatchCustomEvent(events[value].js_event_name);
              }
              i++;
            }
          });
        });
      });
    }
  
    function canBeDispatched(event) {
      if (event.recurrence) {
        return true;
      }
      return dispatchedEvents.indexOf(event.js_event_name) === -1;
    }
  
    function dispatchCustomEvent(jsEvent) {
      const event = new CustomEvent(jsEvent, {
        bubbles: true,
        cancelable: true,
        composed: false
      });
      document.dispatchEvent(event);
      dispatchedEvents.push(jsEvent);
      console.log("Event " + jsEvent, "is dispatched");
    }
  
    (function () {
      if (typeof window.CustomEvent === "function") return false; //If not IE
      function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
  
      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
    })();
    window.dispatchEvent(new window.CustomEvent("celeroLoaded"));
  })();