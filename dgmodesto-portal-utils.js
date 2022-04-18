System.register([], function (__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
  return {
    execute: function () {
      __WEBPACK_DYNAMIC_EXPORT__(
        /******/ (() => {
          // webpackBootstrap
          /******/ var __webpack_modules__ = {
            /***/ './node_modules/ansi-html/index.js':
              /*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
              /***/ (module) => {
                'use strict';

                module.exports = ansiHTML;

                // Reference to https://github.com/sindresorhus/ansi-regex
                var _regANSI =
                  /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;

                var _defColors = {
                  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
                  black: '000',
                  red: 'ff0000',
                  green: '209805',
                  yellow: 'e8bf03',
                  blue: '0000ff',
                  magenta: 'ff00ff',
                  cyan: '00ffee',
                  lightgrey: 'f0f0f0',
                  darkgrey: '888',
                };
                var _styles = {
                  30: 'black',
                  31: 'red',
                  32: 'green',
                  33: 'yellow',
                  34: 'blue',
                  35: 'magenta',
                  36: 'cyan',
                  37: 'lightgrey',
                };
                var _openTags = {
                  1: 'font-weight:bold', // bold
                  2: 'opacity:0.5', // dim
                  3: '<i>', // italic
                  4: '<u>', // underscore
                  8: 'display:none', // hidden
                  9: '<del>', // delete
                };
                var _closeTags = {
                  23: '</i>', // reset italic
                  24: '</u>', // reset underscore
                  29: '</del>', // reset delete
                };

                [0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
                  _closeTags[n] = '</span>';
                });

                /**
                 * Converts text with ANSI color codes to HTML markup.
                 * @param {String} text
                 * @returns {*}
                 */
                function ansiHTML(text) {
                  // Returns the text if the string has no ANSI escape code.
                  if (!_regANSI.test(text)) {
                    return text;
                  }

                  // Cache opened sequence.
                  var ansiCodes = [];
                  // Replace with markup.
                  var ret = text.replace(
                    /\033\[(\d+)*m/g,
                    function (match, seq) {
                      var ot = _openTags[seq];
                      if (ot) {
                        // If current sequence has been opened, close it.
                        if (!!~ansiCodes.indexOf(seq)) {
                          // eslint-disable-line no-extra-boolean-cast
                          ansiCodes.pop();
                          return '</span>';
                        }
                        // Open tag.
                        ansiCodes.push(seq);
                        return ot[0] === '<'
                          ? ot
                          : '<span style="' + ot + ';">';
                      }

                      var ct = _closeTags[seq];
                      if (ct) {
                        // Pop sequence
                        ansiCodes.pop();
                        return ct;
                      }
                      return '';
                    }
                  );

                  // Make sure tags are closed.
                  var l = ansiCodes.length;
                  l > 0 && (ret += Array(l + 1).join('</span>'));

                  return ret;
                }

                /**
                 * Customize colors.
                 * @param {Object} colors reference to _defColors
                 */
                ansiHTML.setColors = function (colors) {
                  if (typeof colors !== 'object') {
                    throw new Error('`colors` parameter must be an Object.');
                  }

                  var _finalColors = {};
                  for (var key in _defColors) {
                    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
                    if (!hex) {
                      _finalColors[key] = _defColors[key];
                      continue;
                    }
                    if ('reset' === key) {
                      if (typeof hex === 'string') {
                        hex = [hex];
                      }
                      if (
                        !Array.isArray(hex) ||
                        hex.length === 0 ||
                        hex.some(function (h) {
                          return typeof h !== 'string';
                        })
                      ) {
                        throw new Error(
                          'The value of `' +
                            key +
                            '` property must be an Array and each item could only be a hex string, e.g.: FF0000'
                        );
                      }
                      var defHexColor = _defColors[key];
                      if (!hex[0]) {
                        hex[0] = defHexColor[0];
                      }
                      if (hex.length === 1 || !hex[1]) {
                        hex = [hex[0]];
                        hex.push(defHexColor[1]);
                      }

                      hex = hex.slice(0, 2);
                    } else if (typeof hex !== 'string') {
                      throw new Error(
                        'The value of `' +
                          key +
                          '` property must be a hex string, e.g.: FF0000'
                      );
                    }
                    _finalColors[key] = hex;
                  }
                  _setTags(_finalColors);
                };

                /**
                 * Reset colors.
                 */
                ansiHTML.reset = function () {
                  _setTags(_defColors);
                };

                /**
                 * Expose tags, including open and close.
                 * @type {Object}
                 */
                ansiHTML.tags = {};

                if (Object.defineProperty) {
                  Object.defineProperty(ansiHTML.tags, 'open', {
                    get: function () {
                      return _openTags;
                    },
                  });
                  Object.defineProperty(ansiHTML.tags, 'close', {
                    get: function () {
                      return _closeTags;
                    },
                  });
                } else {
                  ansiHTML.tags.open = _openTags;
                  ansiHTML.tags.close = _closeTags;
                }

                function _setTags(colors) {
                  // reset all
                  _openTags['0'] =
                    'font-weight:normal;opacity:1;color:#' +
                    colors.reset[0] +
                    ';background:#' +
                    colors.reset[1];
                  // inverse
                  _openTags['7'] =
                    'color:#' +
                    colors.reset[1] +
                    ';background:#' +
                    colors.reset[0];
                  // dark grey
                  _openTags['90'] = 'color:#' + colors.darkgrey;

                  for (var code in _styles) {
                    var color = _styles[code];
                    var oriColor = colors[color] || '000';
                    _openTags[code] = 'color:#' + oriColor;
                    code = parseInt(code);
                    _openTags[(code + 10).toString()] =
                      'background:#' + oriColor;
                  }
                }

                ansiHTML.reset();

                /***/
              },

            /***/ './src/dgmodesto-portal-utils.ts':
              /*!***************************************!*\
  !*** ./src/dgmodesto-portal-utils.ts ***!
  \***************************************/
              /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
              ) => {
                'use strict';
                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(
                  __webpack_exports__,
                  {
                    /* harmony export */ emitEvent: () =>
                      /* binding */ emitEvent,
                    /* harmony export */ listenEvent: () =>
                      /* binding */ listenEvent,
                    /* harmony export */ setLoginAuth: () =>
                      /* binding */ setLoginAuth,
                    /* harmony export */ getLoginAuth: () =>
                      /* binding */ getLoginAuth,
                    /* harmony export */ verifyIfHasPermissionByClaim: () =>
                      /* binding */ verifyIfHasPermissionByClaim,
                    /* harmony export */
                  }
                );
                function emitEvent(name, data) {
                  dispatchEvent(
                    new CustomEvent(name, {
                      detail: data,
                    })
                  );
                }
                function listenEvent(name, cb) {
                  window.addEventListener(name, cb);
                }
                function setLoginAuth(hashAuth) {
                  var authObject = {
                    token: hashAuth,
                  };
                  window.localStorage.setItem(
                    'auth-info',
                    JSON.stringify(authObject)
                  );
                }
                function getLoginAuth() {
                  var authJson = window.localStorage.getItem('auth-info');
                  console.log('get info json', authJson);
                  if (authJson) return;
                  var authObject = JSON.parse(authJson);
                  console.log('get info object', authObject);
                  return authObject;
                }
                function verifyIfHasPermissionByClaim(nameClaim, valueClaim) {
                  var user = obterUsuario();

                  if (!user.claims) {
                    return false;
                  }

                  var userClaims = user.claims.find(function (x) {
                    return x.type === nameClaim;
                  });

                  if (!userClaims) {
                    return false;
                  }

                  var valoresClaim = userClaims.value;

                  if (!valoresClaim.includes(valueClaim)) {
                    return false;
                  }

                  return true;
                }

                function obterUsuario() {
                  var res = localStorage.getItem('user');

                  if (res) {
                    return JSON.parse(res);
                  } else {
                    return null;
                  }
                }

                function salvarDadosLocaisUsuario(response) {
                  this.salvarTokenUsuario(response.accessToken);
                  this.salvarUsuario(response.userToken);
                }

                function limparDadosLocaisUsuario() {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                }

                function obterTokenUsuario() {
                  return localStorage.getItem('token');
                }

                function salvarTokenUsuario(token) {
                  localStorage.setItem('token', token);
                }

                function salvarUsuario(user) {
                  localStorage.setItem('user', JSON.stringify(user));
                }

                /***/
              },

            /***/ './node_modules/events/events.js':
              /*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
              /***/ (module) => {
                'use strict';
                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.

                var R = typeof Reflect === 'object' ? Reflect : null;
                var ReflectApply =
                  R && typeof R.apply === 'function'
                    ? R.apply
                    : function ReflectApply(target, receiver, args) {
                        return Function.prototype.apply.call(
                          target,
                          receiver,
                          args
                        );
                      };

                var ReflectOwnKeys;
                if (R && typeof R.ownKeys === 'function') {
                  ReflectOwnKeys = R.ownKeys;
                } else if (Object.getOwnPropertySymbols) {
                  ReflectOwnKeys = function ReflectOwnKeys(target) {
                    return Object.getOwnPropertyNames(target).concat(
                      Object.getOwnPropertySymbols(target)
                    );
                  };
                } else {
                  ReflectOwnKeys = function ReflectOwnKeys(target) {
                    return Object.getOwnPropertyNames(target);
                  };
                }

                function ProcessEmitWarning(warning) {
                  if (console && console.warn) console.warn(warning);
                }

                var NumberIsNaN =
                  Number.isNaN ||
                  function NumberIsNaN(value) {
                    return value !== value;
                  };

                function EventEmitter() {
                  EventEmitter.init.call(this);
                }
                module.exports = EventEmitter;
                module.exports.once = once;

                // Backwards-compat with node 0.10.x
                EventEmitter.EventEmitter = EventEmitter;

                EventEmitter.prototype._events = undefined;
                EventEmitter.prototype._eventsCount = 0;
                EventEmitter.prototype._maxListeners = undefined;

                // By default EventEmitters will print a warning if more than 10 listeners are
                // added to it. This is a useful default which helps finding memory leaks.
                var defaultMaxListeners = 10;

                function checkListener(listener) {
                  if (typeof listener !== 'function') {
                    throw new TypeError(
                      'The "listener" argument must be of type Function. Received type ' +
                        typeof listener
                    );
                  }
                }

                Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
                  enumerable: true,
                  get: function () {
                    return defaultMaxListeners;
                  },
                  set: function (arg) {
                    if (
                      typeof arg !== 'number' ||
                      arg < 0 ||
                      NumberIsNaN(arg)
                    ) {
                      throw new RangeError(
                        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                          arg +
                          '.'
                      );
                    }
                    defaultMaxListeners = arg;
                  },
                });

                EventEmitter.init = function () {
                  if (
                    this._events === undefined ||
                    this._events === Object.getPrototypeOf(this)._events
                  ) {
                    this._events = Object.create(null);
                    this._eventsCount = 0;
                  }

                  this._maxListeners = this._maxListeners || undefined;
                };

                // Obviously not all Emitters should be limited to 10. This function allows
                // that to be increased. Set to zero for unlimited.
                EventEmitter.prototype.setMaxListeners =
                  function setMaxListeners(n) {
                    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
                      throw new RangeError(
                        'The value of "n" is out of range. It must be a non-negative number. Received ' +
                          n +
                          '.'
                      );
                    }
                    this._maxListeners = n;
                    return this;
                  };

                function _getMaxListeners(that) {
                  if (that._maxListeners === undefined)
                    return EventEmitter.defaultMaxListeners;
                  return that._maxListeners;
                }

                EventEmitter.prototype.getMaxListeners =
                  function getMaxListeners() {
                    return _getMaxListeners(this);
                  };

                EventEmitter.prototype.emit = function emit(type) {
                  var args = [];
                  for (var i = 1; i < arguments.length; i++)
                    args.push(arguments[i]);
                  var doError = type === 'error';

                  var events = this._events;
                  if (events !== undefined)
                    doError = doError && events.error === undefined;
                  else if (!doError) return false;

                  // If there is no 'error' event listener then throw.
                  if (doError) {
                    var er;
                    if (args.length > 0) er = args[0];
                    if (er instanceof Error) {
                      // Note: The comments on the `throw` lines are intentional, they show
                      // up in Node's output if this results in an unhandled exception.
                      throw er; // Unhandled 'error' event
                    }
                    // At least give some kind of context to the user
                    var err = new Error(
                      'Unhandled error.' + (er ? ' (' + er.message + ')' : '')
                    );
                    err.context = er;
                    throw err; // Unhandled 'error' event
                  }

                  var handler = events[type];

                  if (handler === undefined) return false;

                  if (typeof handler === 'function') {
                    ReflectApply(handler, this, args);
                  } else {
                    var len = handler.length;
                    var listeners = arrayClone(handler, len);
                    for (var i = 0; i < len; ++i)
                      ReflectApply(listeners[i], this, args);
                  }

                  return true;
                };

                function _addListener(target, type, listener, prepend) {
                  var m;
                  var events;
                  var existing;

                  checkListener(listener);

                  events = target._events;
                  if (events === undefined) {
                    events = target._events = Object.create(null);
                    target._eventsCount = 0;
                  } else {
                    // To avoid recursion in the case that type === "newListener"! Before
                    // adding it to the listeners, first emit "newListener".
                    if (events.newListener !== undefined) {
                      target.emit(
                        'newListener',
                        type,
                        listener.listener ? listener.listener : listener
                      );

                      // Re-assign `events` because a newListener handler could have caused the
                      // this._events to be assigned to a new object
                      events = target._events;
                    }
                    existing = events[type];
                  }

                  if (existing === undefined) {
                    // Optimize the case of one listener. Don't need the extra array object.
                    existing = events[type] = listener;
                    ++target._eventsCount;
                  } else {
                    if (typeof existing === 'function') {
                      // Adding the second element, need to change to array.
                      existing = events[type] = prepend
                        ? [listener, existing]
                        : [existing, listener];
                      // If we've already got an array, just append.
                    } else if (prepend) {
                      existing.unshift(listener);
                    } else {
                      existing.push(listener);
                    }

                    // Check for listener leak
                    m = _getMaxListeners(target);
                    if (m > 0 && existing.length > m && !existing.warned) {
                      existing.warned = true;
                      // No error code for this since it is a Warning
                      // eslint-disable-next-line no-restricted-syntax
                      var w = new Error(
                        'Possible EventEmitter memory leak detected. ' +
                          existing.length +
                          ' ' +
                          String(type) +
                          ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit'
                      );
                      w.name = 'MaxListenersExceededWarning';
                      w.emitter = target;
                      w.type = type;
                      w.count = existing.length;
                      ProcessEmitWarning(w);
                    }
                  }

                  return target;
                }

                EventEmitter.prototype.addListener = function addListener(
                  type,
                  listener
                ) {
                  return _addListener(this, type, listener, false);
                };

                EventEmitter.prototype.on = EventEmitter.prototype.addListener;

                EventEmitter.prototype.prependListener =
                  function prependListener(type, listener) {
                    return _addListener(this, type, listener, true);
                  };

                function onceWrapper() {
                  if (!this.fired) {
                    this.target.removeListener(this.type, this.wrapFn);
                    this.fired = true;
                    if (arguments.length === 0)
                      return this.listener.call(this.target);
                    return this.listener.apply(this.target, arguments);
                  }
                }

                function _onceWrap(target, type, listener) {
                  var state = {
                    fired: false,
                    wrapFn: undefined,
                    target: target,
                    type: type,
                    listener: listener,
                  };
                  var wrapped = onceWrapper.bind(state);
                  wrapped.listener = listener;
                  state.wrapFn = wrapped;
                  return wrapped;
                }

                EventEmitter.prototype.once = function once(type, listener) {
                  checkListener(listener);
                  this.on(type, _onceWrap(this, type, listener));
                  return this;
                };

                EventEmitter.prototype.prependOnceListener =
                  function prependOnceListener(type, listener) {
                    checkListener(listener);
                    this.prependListener(type, _onceWrap(this, type, listener));
                    return this;
                  };

                // Emits a 'removeListener' event if and only if the listener was removed.
                EventEmitter.prototype.removeListener = function removeListener(
                  type,
                  listener
                ) {
                  var list, events, position, i, originalListener;

                  checkListener(listener);

                  events = this._events;
                  if (events === undefined) return this;

                  list = events[type];
                  if (list === undefined) return this;

                  if (list === listener || list.listener === listener) {
                    if (--this._eventsCount === 0)
                      this._events = Object.create(null);
                    else {
                      delete events[type];
                      if (events.removeListener)
                        this.emit(
                          'removeListener',
                          type,
                          list.listener || listener
                        );
                    }
                  } else if (typeof list !== 'function') {
                    position = -1;

                    for (i = list.length - 1; i >= 0; i--) {
                      if (
                        list[i] === listener ||
                        list[i].listener === listener
                      ) {
                        originalListener = list[i].listener;
                        position = i;
                        break;
                      }
                    }

                    if (position < 0) return this;

                    if (position === 0) list.shift();
                    else {
                      spliceOne(list, position);
                    }

                    if (list.length === 1) events[type] = list[0];

                    if (events.removeListener !== undefined)
                      this.emit(
                        'removeListener',
                        type,
                        originalListener || listener
                      );
                  }

                  return this;
                };

                EventEmitter.prototype.off =
                  EventEmitter.prototype.removeListener;

                EventEmitter.prototype.removeAllListeners =
                  function removeAllListeners(type) {
                    var listeners, events, i;

                    events = this._events;
                    if (events === undefined) return this;

                    // not listening for removeListener, no need to emit
                    if (events.removeListener === undefined) {
                      if (arguments.length === 0) {
                        this._events = Object.create(null);
                        this._eventsCount = 0;
                      } else if (events[type] !== undefined) {
                        if (--this._eventsCount === 0)
                          this._events = Object.create(null);
                        else delete events[type];
                      }
                      return this;
                    }

                    // emit removeListener for all listeners on all events
                    if (arguments.length === 0) {
                      var keys = Object.keys(events);
                      var key;
                      for (i = 0; i < keys.length; ++i) {
                        key = keys[i];
                        if (key === 'removeListener') continue;
                        this.removeAllListeners(key);
                      }
                      this.removeAllListeners('removeListener');
                      this._events = Object.create(null);
                      this._eventsCount = 0;
                      return this;
                    }

                    listeners = events[type];

                    if (typeof listeners === 'function') {
                      this.removeListener(type, listeners);
                    } else if (listeners !== undefined) {
                      // LIFO order
                      for (i = listeners.length - 1; i >= 0; i--) {
                        this.removeListener(type, listeners[i]);
                      }
                    }

                    return this;
                  };

                function _listeners(target, type, unwrap) {
                  var events = target._events;

                  if (events === undefined) return [];

                  var evlistener = events[type];
                  if (evlistener === undefined) return [];

                  if (typeof evlistener === 'function')
                    return unwrap
                      ? [evlistener.listener || evlistener]
                      : [evlistener];

                  return unwrap
                    ? unwrapListeners(evlistener)
                    : arrayClone(evlistener, evlistener.length);
                }

                EventEmitter.prototype.listeners = function listeners(type) {
                  return _listeners(this, type, true);
                };

                EventEmitter.prototype.rawListeners = function rawListeners(
                  type
                ) {
                  return _listeners(this, type, false);
                };

                EventEmitter.listenerCount = function (emitter, type) {
                  if (typeof emitter.listenerCount === 'function') {
                    return emitter.listenerCount(type);
                  } else {
                    return listenerCount.call(emitter, type);
                  }
                };

                EventEmitter.prototype.listenerCount = listenerCount;
                function listenerCount(type) {
                  var events = this._events;

                  if (events !== undefined) {
                    var evlistener = events[type];

                    if (typeof evlistener === 'function') {
                      return 1;
                    } else if (evlistener !== undefined) {
                      return evlistener.length;
                    }
                  }

                  return 0;
                }

                EventEmitter.prototype.eventNames = function eventNames() {
                  return this._eventsCount > 0
                    ? ReflectOwnKeys(this._events)
                    : [];
                };

                function arrayClone(arr, n) {
                  var copy = new Array(n);
                  for (var i = 0; i < n; ++i) copy[i] = arr[i];
                  return copy;
                }

                function spliceOne(list, index) {
                  for (; index + 1 < list.length; index++)
                    list[index] = list[index + 1];
                  list.pop();
                }

                function unwrapListeners(arr) {
                  var ret = new Array(arr.length);
                  for (var i = 0; i < ret.length; ++i) {
                    ret[i] = arr[i].listener || arr[i];
                  }
                  return ret;
                }

                function once(emitter, name) {
                  return new Promise(function (resolve, reject) {
                    function errorListener(err) {
                      emitter.removeListener(name, resolver);
                      reject(err);
                    }

                    function resolver() {
                      if (typeof emitter.removeListener === 'function') {
                        emitter.removeListener('error', errorListener);
                      }
                      resolve([].slice.call(arguments));
                    }

                    eventTargetAgnosticAddListener(emitter, name, resolver, {
                      once: true,
                    });
                    if (name !== 'error') {
                      addErrorHandlerIfEventEmitter(emitter, errorListener, {
                        once: true,
                      });
                    }
                  });
                }

                function addErrorHandlerIfEventEmitter(
                  emitter,
                  handler,
                  flags
                ) {
                  if (typeof emitter.on === 'function') {
                    eventTargetAgnosticAddListener(
                      emitter,
                      'error',
                      handler,
                      flags
                    );
                  }
                }

                function eventTargetAgnosticAddListener(
                  emitter,
                  name,
                  listener,
                  flags
                ) {
                  if (typeof emitter.on === 'function') {
                    if (flags.once) {
                      emitter.once(name, listener);
                    } else {
                      emitter.on(name, listener);
                    }
                  } else if (typeof emitter.addEventListener === 'function') {
                    // EventTarget does not have `error` event semantics like Node
                    // EventEmitters, we do not listen for `error` events here.
                    emitter.addEventListener(name, function wrapListener(arg) {
                      // IE does not have builtin `{ once: true }` support so we
                      // have to do it manually.
                      if (flags.once) {
                        emitter.removeEventListener(name, wrapListener);
                      }
                      listener(arg);
                    });
                  } else {
                    throw new TypeError(
                      'The "emitter" argument must be of type EventEmitter. Received type ' +
                        typeof emitter
                    );
                  }
                }

                /***/
              },

            /***/ './node_modules/html-entities/lib/index.js':
              /*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
              /***/ function (
                __unused_webpack_module,
                exports,
                __webpack_require__
              ) {
                'use strict';

                var __assign =
                  (this && this.__assign) ||
                  function () {
                    __assign =
                      Object.assign ||
                      function (t) {
                        for (var s, i = 1, n = arguments.length; i < n; i++) {
                          s = arguments[i];
                          for (var p in s)
                            if (Object.prototype.hasOwnProperty.call(s, p))
                              t[p] = s[p];
                        }
                        return t;
                      };
                    return __assign.apply(this, arguments);
                  };
                Object.defineProperty(exports, '__esModule', { value: true });
                var named_references_1 = __webpack_require__(
                  /*! ./named-references */ './node_modules/html-entities/lib/named-references.js'
                );
                var numeric_unicode_map_1 = __webpack_require__(
                  /*! ./numeric-unicode-map */ './node_modules/html-entities/lib/numeric-unicode-map.js'
                );
                var surrogate_pairs_1 = __webpack_require__(
                  /*! ./surrogate-pairs */ './node_modules/html-entities/lib/surrogate-pairs.js'
                );
                var allNamedReferences = __assign(
                  __assign({}, named_references_1.namedReferences),
                  { all: named_references_1.namedReferences.html5 }
                );
                var encodeRegExps = {
                  specialChars: /[<>'"&]/g,
                  nonAscii:
                    /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
                  nonAsciiPrintable:
                    /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
                  extensive:
                    /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
                };
                var defaultEncodeOptions = {
                  mode: 'specialChars',
                  level: 'all',
                  numeric: 'decimal',
                };
                /** Encodes all the necessary (specified by `level`) characters in the text */
                function encode(text, _a) {
                  var _b = _a === void 0 ? defaultEncodeOptions : _a,
                    _c = _b.mode,
                    mode = _c === void 0 ? 'specialChars' : _c,
                    _d = _b.numeric,
                    numeric = _d === void 0 ? 'decimal' : _d,
                    _e = _b.level,
                    level = _e === void 0 ? 'all' : _e;
                  if (!text) {
                    return '';
                  }
                  var encodeRegExp = encodeRegExps[mode];
                  var references = allNamedReferences[level].characters;
                  var isHex = numeric === 'hexadecimal';
                  encodeRegExp.lastIndex = 0;
                  var _b = encodeRegExp.exec(text);
                  var _c;
                  if (_b) {
                    _c = '';
                    var _d = 0;
                    do {
                      if (_d !== _b.index) {
                        _c += text.substring(_d, _b.index);
                      }
                      var _e = _b[0];
                      var result_1 = references[_e];
                      if (!result_1) {
                        var code_1 =
                          _e.length > 1
                            ? surrogate_pairs_1.getCodePoint(_e, 0)
                            : _e.charCodeAt(0);
                        result_1 =
                          (isHex
                            ? '&#x' + code_1.toString(16)
                            : '&#' + code_1) + ';';
                      }
                      _c += result_1;
                      _d = _b.index + _e.length;
                    } while ((_b = encodeRegExp.exec(text)));
                    if (_d !== text.length) {
                      _c += text.substring(_d);
                    }
                  } else {
                    _c = text;
                  }
                  return _c;
                }
                exports.encode = encode;
                var defaultDecodeOptions = {
                  scope: 'body',
                  level: 'all',
                };
                var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
                var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
                var baseDecodeRegExps = {
                  xml: {
                    strict: strict,
                    attribute: attribute,
                    body: named_references_1.bodyRegExps.xml,
                  },
                  html4: {
                    strict: strict,
                    attribute: attribute,
                    body: named_references_1.bodyRegExps.html4,
                  },
                  html5: {
                    strict: strict,
                    attribute: attribute,
                    body: named_references_1.bodyRegExps.html5,
                  },
                };
                var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), {
                  all: baseDecodeRegExps.html5,
                });
                var fromCharCode = String.fromCharCode;
                var outOfBoundsChar = fromCharCode(65533);
                var defaultDecodeEntityOptions = {
                  level: 'all',
                };
                /** Decodes a single entity */
                function decodeEntity(entity, _a) {
                  var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a)
                      .level,
                    level = _b === void 0 ? 'all' : _b;
                  if (!entity) {
                    return '';
                  }
                  var _b = entity;
                  var decodeEntityLastChar_1 = entity[entity.length - 1];
                  if (false) {
                  } else if (false) {
                  } else {
                    var decodeResultByReference_1 =
                      allNamedReferences[level].entities[entity];
                    if (decodeResultByReference_1) {
                      _b = decodeResultByReference_1;
                    } else if (entity[0] === '&' && entity[1] === '#') {
                      var decodeSecondChar_1 = entity[2];
                      var decodeCode_1 =
                        decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                          ? parseInt(entity.substr(3), 16)
                          : parseInt(entity.substr(2));
                      _b =
                        decodeCode_1 >= 0x10ffff
                          ? outOfBoundsChar
                          : decodeCode_1 > 65535
                          ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                          : fromCharCode(
                              numeric_unicode_map_1.numericUnicodeMap[
                                decodeCode_1
                              ] || decodeCode_1
                            );
                    }
                  }
                  return _b;
                }
                exports.decodeEntity = decodeEntity;
                /** Decodes all entities in the text */
                function decode(text, _a) {
                  var decodeSecondChar_1 =
                      _a === void 0 ? defaultDecodeOptions : _a,
                    decodeCode_1 = decodeSecondChar_1.level,
                    level = decodeCode_1 === void 0 ? 'all' : decodeCode_1,
                    _b = decodeSecondChar_1.scope,
                    scope =
                      _b === void 0
                        ? level === 'xml'
                          ? 'strict'
                          : 'body'
                        : _b;
                  if (!text) {
                    return '';
                  }
                  var decodeRegExp = decodeRegExps[level][scope];
                  var references = allNamedReferences[level].entities;
                  var isAttribute = scope === 'attribute';
                  var isStrict = scope === 'strict';
                  decodeRegExp.lastIndex = 0;
                  var replaceMatch_1 = decodeRegExp.exec(text);
                  var replaceResult_1;
                  if (replaceMatch_1) {
                    replaceResult_1 = '';
                    var replaceLastIndex_1 = 0;
                    do {
                      if (replaceLastIndex_1 !== replaceMatch_1.index) {
                        replaceResult_1 += text.substring(
                          replaceLastIndex_1,
                          replaceMatch_1.index
                        );
                      }
                      var replaceInput_1 = replaceMatch_1[0];
                      var decodeResult_1 = replaceInput_1;
                      var decodeEntityLastChar_2 =
                        replaceInput_1[replaceInput_1.length - 1];
                      if (isAttribute && decodeEntityLastChar_2 === '=') {
                        decodeResult_1 = replaceInput_1;
                      } else if (isStrict && decodeEntityLastChar_2 !== ';') {
                        decodeResult_1 = replaceInput_1;
                      } else {
                        var decodeResultByReference_2 =
                          references[replaceInput_1];
                        if (decodeResultByReference_2) {
                          decodeResult_1 = decodeResultByReference_2;
                        } else if (
                          replaceInput_1[0] === '&' &&
                          replaceInput_1[1] === '#'
                        ) {
                          var decodeSecondChar_2 = replaceInput_1[2];
                          var decodeCode_2 =
                            decodeSecondChar_2 == 'x' ||
                            decodeSecondChar_2 == 'X'
                              ? parseInt(replaceInput_1.substr(3), 16)
                              : parseInt(replaceInput_1.substr(2));
                          decodeResult_1 =
                            decodeCode_2 >= 0x10ffff
                              ? outOfBoundsChar
                              : decodeCode_2 > 65535
                              ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                              : fromCharCode(
                                  numeric_unicode_map_1.numericUnicodeMap[
                                    decodeCode_2
                                  ] || decodeCode_2
                                );
                        }
                      }
                      replaceResult_1 += decodeResult_1;
                      replaceLastIndex_1 =
                        replaceMatch_1.index + replaceInput_1.length;
                    } while ((replaceMatch_1 = decodeRegExp.exec(text)));
                    if (replaceLastIndex_1 !== text.length) {
                      replaceResult_1 += text.substring(replaceLastIndex_1);
                    }
                  } else {
                    replaceResult_1 = text;
                  }
                  return replaceResult_1;
                }
                exports.decode = decode;

                /***/
              },

            /***/ './node_modules/html-entities/lib/named-references.js':
              /*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
              /***/ (__unused_webpack_module, exports) => {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: true });
                exports.bodyRegExps = {
                  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
                  html4:
                    /&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
                  html5:
                    /&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
                };
                exports.namedReferences = {
                  xml: {
                    entities: {
                      '&lt;': '<',
                      '&gt;': '>',
                      '&quot;': '"',
                      '&apos;': "'",
                      '&amp;': '&',
                    },
                    characters: {
                      '<': '&lt;',
                      '>': '&gt;',
                      '"': '&quot;',
                      "'": '&apos;',
                      '&': '&amp;',
                    },
                  },
                  html4: {
                    entities: {
                      '&apos;': "'",
                      '&nbsp': ' ',
                      '&nbsp;': ' ',
                      '&iexcl': '¡',
                      '&iexcl;': '¡',
                      '&cent': '¢',
                      '&cent;': '¢',
                      '&pound': '£',
                      '&pound;': '£',
                      '&curren': '¤',
                      '&curren;': '¤',
                      '&yen': '¥',
                      '&yen;': '¥',
                      '&brvbar': '¦',
                      '&brvbar;': '¦',
                      '&sect': '§',
                      '&sect;': '§',
                      '&uml': '¨',
                      '&uml;': '¨',
                      '&copy': '©',
                      '&copy;': '©',
                      '&ordf': 'ª',
                      '&ordf;': 'ª',
                      '&laquo': '«',
                      '&laquo;': '«',
                      '&not': '¬',
                      '&not;': '¬',
                      '&shy': '­',
                      '&shy;': '­',
                      '&reg': '®',
                      '&reg;': '®',
                      '&macr': '¯',
                      '&macr;': '¯',
                      '&deg': '°',
                      '&deg;': '°',
                      '&plusmn': '±',
                      '&plusmn;': '±',
                      '&sup2': '²',
                      '&sup2;': '²',
                      '&sup3': '³',
                      '&sup3;': '³',
                      '&acute': '´',
                      '&acute;': '´',
                      '&micro': 'µ',
                      '&micro;': 'µ',
                      '&para': '¶',
                      '&para;': '¶',
                      '&middot': '·',
                      '&middot;': '·',
                      '&cedil': '¸',
                      '&cedil;': '¸',
                      '&sup1': '¹',
                      '&sup1;': '¹',
                      '&ordm': 'º',
                      '&ordm;': 'º',
                      '&raquo': '»',
                      '&raquo;': '»',
                      '&frac14': '¼',
                      '&frac14;': '¼',
                      '&frac12': '½',
                      '&frac12;': '½',
                      '&frac34': '¾',
                      '&frac34;': '¾',
                      '&iquest': '¿',
                      '&iquest;': '¿',
                      '&Agrave': 'À',
                      '&Agrave;': 'À',
                      '&Aacute': 'Á',
                      '&Aacute;': 'Á',
                      '&Acirc': 'Â',
                      '&Acirc;': 'Â',
                      '&Atilde': 'Ã',
                      '&Atilde;': 'Ã',
                      '&Auml': 'Ä',
                      '&Auml;': 'Ä',
                      '&Aring': 'Å',
                      '&Aring;': 'Å',
                      '&AElig': 'Æ',
                      '&AElig;': 'Æ',
                      '&Ccedil': 'Ç',
                      '&Ccedil;': 'Ç',
                      '&Egrave': 'È',
                      '&Egrave;': 'È',
                      '&Eacute': 'É',
                      '&Eacute;': 'É',
                      '&Ecirc': 'Ê',
                      '&Ecirc;': 'Ê',
                      '&Euml': 'Ë',
                      '&Euml;': 'Ë',
                      '&Igrave': 'Ì',
                      '&Igrave;': 'Ì',
                      '&Iacute': 'Í',
                      '&Iacute;': 'Í',
                      '&Icirc': 'Î',
                      '&Icirc;': 'Î',
                      '&Iuml': 'Ï',
                      '&Iuml;': 'Ï',
                      '&ETH': 'Ð',
                      '&ETH;': 'Ð',
                      '&Ntilde': 'Ñ',
                      '&Ntilde;': 'Ñ',
                      '&Ograve': 'Ò',
                      '&Ograve;': 'Ò',
                      '&Oacute': 'Ó',
                      '&Oacute;': 'Ó',
                      '&Ocirc': 'Ô',
                      '&Ocirc;': 'Ô',
                      '&Otilde': 'Õ',
                      '&Otilde;': 'Õ',
                      '&Ouml': 'Ö',
                      '&Ouml;': 'Ö',
                      '&times': '×',
                      '&times;': '×',
                      '&Oslash': 'Ø',
                      '&Oslash;': 'Ø',
                      '&Ugrave': 'Ù',
                      '&Ugrave;': 'Ù',
                      '&Uacute': 'Ú',
                      '&Uacute;': 'Ú',
                      '&Ucirc': 'Û',
                      '&Ucirc;': 'Û',
                      '&Uuml': 'Ü',
                      '&Uuml;': 'Ü',
                      '&Yacute': 'Ý',
                      '&Yacute;': 'Ý',
                      '&THORN': 'Þ',
                      '&THORN;': 'Þ',
                      '&szlig': 'ß',
                      '&szlig;': 'ß',
                      '&agrave': 'à',
                      '&agrave;': 'à',
                      '&aacute': 'á',
                      '&aacute;': 'á',
                      '&acirc': 'â',
                      '&acirc;': 'â',
                      '&atilde': 'ã',
                      '&atilde;': 'ã',
                      '&auml': 'ä',
                      '&auml;': 'ä',
                      '&aring': 'å',
                      '&aring;': 'å',
                      '&aelig': 'æ',
                      '&aelig;': 'æ',
                      '&ccedil': 'ç',
                      '&ccedil;': 'ç',
                      '&egrave': 'è',
                      '&egrave;': 'è',
                      '&eacute': 'é',
                      '&eacute;': 'é',
                      '&ecirc': 'ê',
                      '&ecirc;': 'ê',
                      '&euml': 'ë',
                      '&euml;': 'ë',
                      '&igrave': 'ì',
                      '&igrave;': 'ì',
                      '&iacute': 'í',
                      '&iacute;': 'í',
                      '&icirc': 'î',
                      '&icirc;': 'î',
                      '&iuml': 'ï',
                      '&iuml;': 'ï',
                      '&eth': 'ð',
                      '&eth;': 'ð',
                      '&ntilde': 'ñ',
                      '&ntilde;': 'ñ',
                      '&ograve': 'ò',
                      '&ograve;': 'ò',
                      '&oacute': 'ó',
                      '&oacute;': 'ó',
                      '&ocirc': 'ô',
                      '&ocirc;': 'ô',
                      '&otilde': 'õ',
                      '&otilde;': 'õ',
                      '&ouml': 'ö',
                      '&ouml;': 'ö',
                      '&divide': '÷',
                      '&divide;': '÷',
                      '&oslash': 'ø',
                      '&oslash;': 'ø',
                      '&ugrave': 'ù',
                      '&ugrave;': 'ù',
                      '&uacute': 'ú',
                      '&uacute;': 'ú',
                      '&ucirc': 'û',
                      '&ucirc;': 'û',
                      '&uuml': 'ü',
                      '&uuml;': 'ü',
                      '&yacute': 'ý',
                      '&yacute;': 'ý',
                      '&thorn': 'þ',
                      '&thorn;': 'þ',
                      '&yuml': 'ÿ',
                      '&yuml;': 'ÿ',
                      '&quot': '"',
                      '&quot;': '"',
                      '&amp': '&',
                      '&amp;': '&',
                      '&lt': '<',
                      '&lt;': '<',
                      '&gt': '>',
                      '&gt;': '>',
                      '&OElig;': 'Œ',
                      '&oelig;': 'œ',
                      '&Scaron;': 'Š',
                      '&scaron;': 'š',
                      '&Yuml;': 'Ÿ',
                      '&circ;': 'ˆ',
                      '&tilde;': '˜',
                      '&ensp;': ' ',
                      '&emsp;': ' ',
                      '&thinsp;': ' ',
                      '&zwnj;': '‌',
                      '&zwj;': '‍',
                      '&lrm;': '‎',
                      '&rlm;': '‏',
                      '&ndash;': '–',
                      '&mdash;': '—',
                      '&lsquo;': '‘',
                      '&rsquo;': '’',
                      '&sbquo;': '‚',
                      '&ldquo;': '“',
                      '&rdquo;': '”',
                      '&bdquo;': '„',
                      '&dagger;': '†',
                      '&Dagger;': '‡',
                      '&permil;': '‰',
                      '&lsaquo;': '‹',
                      '&rsaquo;': '›',
                      '&euro;': '€',
                      '&fnof;': 'ƒ',
                      '&Alpha;': 'Α',
                      '&Beta;': 'Β',
                      '&Gamma;': 'Γ',
                      '&Delta;': 'Δ',
                      '&Epsilon;': 'Ε',
                      '&Zeta;': 'Ζ',
                      '&Eta;': 'Η',
                      '&Theta;': 'Θ',
                      '&Iota;': 'Ι',
                      '&Kappa;': 'Κ',
                      '&Lambda;': 'Λ',
                      '&Mu;': 'Μ',
                      '&Nu;': 'Ν',
                      '&Xi;': 'Ξ',
                      '&Omicron;': 'Ο',
                      '&Pi;': 'Π',
                      '&Rho;': 'Ρ',
                      '&Sigma;': 'Σ',
                      '&Tau;': 'Τ',
                      '&Upsilon;': 'Υ',
                      '&Phi;': 'Φ',
                      '&Chi;': 'Χ',
                      '&Psi;': 'Ψ',
                      '&Omega;': 'Ω',
                      '&alpha;': 'α',
                      '&beta;': 'β',
                      '&gamma;': 'γ',
                      '&delta;': 'δ',
                      '&epsilon;': 'ε',
                      '&zeta;': 'ζ',
                      '&eta;': 'η',
                      '&theta;': 'θ',
                      '&iota;': 'ι',
                      '&kappa;': 'κ',
                      '&lambda;': 'λ',
                      '&mu;': 'μ',
                      '&nu;': 'ν',
                      '&xi;': 'ξ',
                      '&omicron;': 'ο',
                      '&pi;': 'π',
                      '&rho;': 'ρ',
                      '&sigmaf;': 'ς',
                      '&sigma;': 'σ',
                      '&tau;': 'τ',
                      '&upsilon;': 'υ',
                      '&phi;': 'φ',
                      '&chi;': 'χ',
                      '&psi;': 'ψ',
                      '&omega;': 'ω',
                      '&thetasym;': 'ϑ',
                      '&upsih;': 'ϒ',
                      '&piv;': 'ϖ',
                      '&bull;': '•',
                      '&hellip;': '…',
                      '&prime;': '′',
                      '&Prime;': '″',
                      '&oline;': '‾',
                      '&frasl;': '⁄',
                      '&weierp;': '℘',
                      '&image;': 'ℑ',
                      '&real;': 'ℜ',
                      '&trade;': '™',
                      '&alefsym;': 'ℵ',
                      '&larr;': '←',
                      '&uarr;': '↑',
                      '&rarr;': '→',
                      '&darr;': '↓',
                      '&harr;': '↔',
                      '&crarr;': '↵',
                      '&lArr;': '⇐',
                      '&uArr;': '⇑',
                      '&rArr;': '⇒',
                      '&dArr;': '⇓',
                      '&hArr;': '⇔',
                      '&forall;': '∀',
                      '&part;': '∂',
                      '&exist;': '∃',
                      '&empty;': '∅',
                      '&nabla;': '∇',
                      '&isin;': '∈',
                      '&notin;': '∉',
                      '&ni;': '∋',
                      '&prod;': '∏',
                      '&sum;': '∑',
                      '&minus;': '−',
                      '&lowast;': '∗',
                      '&radic;': '√',
                      '&prop;': '∝',
                      '&infin;': '∞',
                      '&ang;': '∠',
                      '&and;': '∧',
                      '&or;': '∨',
                      '&cap;': '∩',
                      '&cup;': '∪',
                      '&int;': '∫',
                      '&there4;': '∴',
                      '&sim;': '∼',
                      '&cong;': '≅',
                      '&asymp;': '≈',
                      '&ne;': '≠',
                      '&equiv;': '≡',
                      '&le;': '≤',
                      '&ge;': '≥',
                      '&sub;': '⊂',
                      '&sup;': '⊃',
                      '&nsub;': '⊄',
                      '&sube;': '⊆',
                      '&supe;': '⊇',
                      '&oplus;': '⊕',
                      '&otimes;': '⊗',
                      '&perp;': '⊥',
                      '&sdot;': '⋅',
                      '&lceil;': '⌈',
                      '&rceil;': '⌉',
                      '&lfloor;': '⌊',
                      '&rfloor;': '⌋',
                      '&lang;': '〈',
                      '&rang;': '〉',
                      '&loz;': '◊',
                      '&spades;': '♠',
                      '&clubs;': '♣',
                      '&hearts;': '♥',
                      '&diams;': '♦',
                    },
                    characters: {
                      "'": '&apos;',
                      ' ': '&nbsp;',
                      '¡': '&iexcl;',
                      '¢': '&cent;',
                      '£': '&pound;',
                      '¤': '&curren;',
                      '¥': '&yen;',
                      '¦': '&brvbar;',
                      '§': '&sect;',
                      '¨': '&uml;',
                      '©': '&copy;',
                      ª: '&ordf;',
                      '«': '&laquo;',
                      '¬': '&not;',
                      '­': '&shy;',
                      '®': '&reg;',
                      '¯': '&macr;',
                      '°': '&deg;',
                      '±': '&plusmn;',
                      '²': '&sup2;',
                      '³': '&sup3;',
                      '´': '&acute;',
                      µ: '&micro;',
                      '¶': '&para;',
                      '·': '&middot;',
                      '¸': '&cedil;',
                      '¹': '&sup1;',
                      º: '&ordm;',
                      '»': '&raquo;',
                      '¼': '&frac14;',
                      '½': '&frac12;',
                      '¾': '&frac34;',
                      '¿': '&iquest;',
                      À: '&Agrave;',
                      Á: '&Aacute;',
                      Â: '&Acirc;',
                      Ã: '&Atilde;',
                      Ä: '&Auml;',
                      Å: '&Aring;',
                      Æ: '&AElig;',
                      Ç: '&Ccedil;',
                      È: '&Egrave;',
                      É: '&Eacute;',
                      Ê: '&Ecirc;',
                      Ë: '&Euml;',
                      Ì: '&Igrave;',
                      Í: '&Iacute;',
                      Î: '&Icirc;',
                      Ï: '&Iuml;',
                      Ð: '&ETH;',
                      Ñ: '&Ntilde;',
                      Ò: '&Ograve;',
                      Ó: '&Oacute;',
                      Ô: '&Ocirc;',
                      Õ: '&Otilde;',
                      Ö: '&Ouml;',
                      '×': '&times;',
                      Ø: '&Oslash;',
                      Ù: '&Ugrave;',
                      Ú: '&Uacute;',
                      Û: '&Ucirc;',
                      Ü: '&Uuml;',
                      Ý: '&Yacute;',
                      Þ: '&THORN;',
                      ß: '&szlig;',
                      à: '&agrave;',
                      á: '&aacute;',
                      â: '&acirc;',
                      ã: '&atilde;',
                      ä: '&auml;',
                      å: '&aring;',
                      æ: '&aelig;',
                      ç: '&ccedil;',
                      è: '&egrave;',
                      é: '&eacute;',
                      ê: '&ecirc;',
                      ë: '&euml;',
                      ì: '&igrave;',
                      í: '&iacute;',
                      î: '&icirc;',
                      ï: '&iuml;',
                      ð: '&eth;',
                      ñ: '&ntilde;',
                      ò: '&ograve;',
                      ó: '&oacute;',
                      ô: '&ocirc;',
                      õ: '&otilde;',
                      ö: '&ouml;',
                      '÷': '&divide;',
                      ø: '&oslash;',
                      ù: '&ugrave;',
                      ú: '&uacute;',
                      û: '&ucirc;',
                      ü: '&uuml;',
                      ý: '&yacute;',
                      þ: '&thorn;',
                      ÿ: '&yuml;',
                      '"': '&quot;',
                      '&': '&amp;',
                      '<': '&lt;',
                      '>': '&gt;',
                      Œ: '&OElig;',
                      œ: '&oelig;',
                      Š: '&Scaron;',
                      š: '&scaron;',
                      Ÿ: '&Yuml;',
                      ˆ: '&circ;',
                      '˜': '&tilde;',
                      ' ': '&ensp;',
                      ' ': '&emsp;',
                      ' ': '&thinsp;',
                      '‌': '&zwnj;',
                      '‍': '&zwj;',
                      '‎': '&lrm;',
                      '‏': '&rlm;',
                      '–': '&ndash;',
                      '—': '&mdash;',
                      '‘': '&lsquo;',
                      '’': '&rsquo;',
                      '‚': '&sbquo;',
                      '“': '&ldquo;',
                      '”': '&rdquo;',
                      '„': '&bdquo;',
                      '†': '&dagger;',
                      '‡': '&Dagger;',
                      '‰': '&permil;',
                      '‹': '&lsaquo;',
                      '›': '&rsaquo;',
                      '€': '&euro;',
                      ƒ: '&fnof;',
                      Α: '&Alpha;',
                      Β: '&Beta;',
                      Γ: '&Gamma;',
                      Δ: '&Delta;',
                      Ε: '&Epsilon;',
                      Ζ: '&Zeta;',
                      Η: '&Eta;',
                      Θ: '&Theta;',
                      Ι: '&Iota;',
                      Κ: '&Kappa;',
                      Λ: '&Lambda;',
                      Μ: '&Mu;',
                      Ν: '&Nu;',
                      Ξ: '&Xi;',
                      Ο: '&Omicron;',
                      Π: '&Pi;',
                      Ρ: '&Rho;',
                      Σ: '&Sigma;',
                      Τ: '&Tau;',
                      Υ: '&Upsilon;',
                      Φ: '&Phi;',
                      Χ: '&Chi;',
                      Ψ: '&Psi;',
                      Ω: '&Omega;',
                      α: '&alpha;',
                      β: '&beta;',
                      γ: '&gamma;',
                      δ: '&delta;',
                      ε: '&epsilon;',
                      ζ: '&zeta;',
                      η: '&eta;',
                      θ: '&theta;',
                      ι: '&iota;',
                      κ: '&kappa;',
                      λ: '&lambda;',
                      μ: '&mu;',
                      ν: '&nu;',
                      ξ: '&xi;',
                      ο: '&omicron;',
                      π: '&pi;',
                      ρ: '&rho;',
                      ς: '&sigmaf;',
                      σ: '&sigma;',
                      τ: '&tau;',
                      υ: '&upsilon;',
                      φ: '&phi;',
                      χ: '&chi;',
                      ψ: '&psi;',
                      ω: '&omega;',
                      ϑ: '&thetasym;',
                      ϒ: '&upsih;',
                      ϖ: '&piv;',
                      '•': '&bull;',
                      '…': '&hellip;',
                      '′': '&prime;',
                      '″': '&Prime;',
                      '‾': '&oline;',
                      '⁄': '&frasl;',
                      '℘': '&weierp;',
                      ℑ: '&image;',
                      ℜ: '&real;',
                      '™': '&trade;',
                      ℵ: '&alefsym;',
                      '←': '&larr;',
                      '↑': '&uarr;',
                      '→': '&rarr;',
                      '↓': '&darr;',
                      '↔': '&harr;',
                      '↵': '&crarr;',
                      '⇐': '&lArr;',
                      '⇑': '&uArr;',
                      '⇒': '&rArr;',
                      '⇓': '&dArr;',
                      '⇔': '&hArr;',
                      '∀': '&forall;',
                      '∂': '&part;',
                      '∃': '&exist;',
                      '∅': '&empty;',
                      '∇': '&nabla;',
                      '∈': '&isin;',
                      '∉': '&notin;',
                      '∋': '&ni;',
                      '∏': '&prod;',
                      '∑': '&sum;',
                      '−': '&minus;',
                      '∗': '&lowast;',
                      '√': '&radic;',
                      '∝': '&prop;',
                      '∞': '&infin;',
                      '∠': '&ang;',
                      '∧': '&and;',
                      '∨': '&or;',
                      '∩': '&cap;',
                      '∪': '&cup;',
                      '∫': '&int;',
                      '∴': '&there4;',
                      '∼': '&sim;',
                      '≅': '&cong;',
                      '≈': '&asymp;',
                      '≠': '&ne;',
                      '≡': '&equiv;',
                      '≤': '&le;',
                      '≥': '&ge;',
                      '⊂': '&sub;',
                      '⊃': '&sup;',
                      '⊄': '&nsub;',
                      '⊆': '&sube;',
                      '⊇': '&supe;',
                      '⊕': '&oplus;',
                      '⊗': '&otimes;',
                      '⊥': '&perp;',
                      '⋅': '&sdot;',
                      '⌈': '&lceil;',
                      '⌉': '&rceil;',
                      '⌊': '&lfloor;',
                      '⌋': '&rfloor;',
                      '〈': '&lang;',
                      '〉': '&rang;',
                      '◊': '&loz;',
                      '♠': '&spades;',
                      '♣': '&clubs;',
                      '♥': '&hearts;',
                      '♦': '&diams;',
                    },
                  },
                  html5: {
                    entities: {
                      '&AElig': 'Æ',
                      '&AElig;': 'Æ',
                      '&AMP': '&',
                      '&AMP;': '&',
                      '&Aacute': 'Á',
                      '&Aacute;': 'Á',
                      '&Abreve;': 'Ă',
                      '&Acirc': 'Â',
                      '&Acirc;': 'Â',
                      '&Acy;': 'А',
                      '&Afr;': '𝔄',
                      '&Agrave': 'À',
                      '&Agrave;': 'À',
                      '&Alpha;': 'Α',
                      '&Amacr;': 'Ā',
                      '&And;': '⩓',
                      '&Aogon;': 'Ą',
                      '&Aopf;': '𝔸',
                      '&ApplyFunction;': '⁡',
                      '&Aring': 'Å',
                      '&Aring;': 'Å',
                      '&Ascr;': '𝒜',
                      '&Assign;': '≔',
                      '&Atilde': 'Ã',
                      '&Atilde;': 'Ã',
                      '&Auml': 'Ä',
                      '&Auml;': 'Ä',
                      '&Backslash;': '∖',
                      '&Barv;': '⫧',
                      '&Barwed;': '⌆',
                      '&Bcy;': 'Б',
                      '&Because;': '∵',
                      '&Bernoullis;': 'ℬ',
                      '&Beta;': 'Β',
                      '&Bfr;': '𝔅',
                      '&Bopf;': '𝔹',
                      '&Breve;': '˘',
                      '&Bscr;': 'ℬ',
                      '&Bumpeq;': '≎',
                      '&CHcy;': 'Ч',
                      '&COPY': '©',
                      '&COPY;': '©',
                      '&Cacute;': 'Ć',
                      '&Cap;': '⋒',
                      '&CapitalDifferentialD;': 'ⅅ',
                      '&Cayleys;': 'ℭ',
                      '&Ccaron;': 'Č',
                      '&Ccedil': 'Ç',
                      '&Ccedil;': 'Ç',
                      '&Ccirc;': 'Ĉ',
                      '&Cconint;': '∰',
                      '&Cdot;': 'Ċ',
                      '&Cedilla;': '¸',
                      '&CenterDot;': '·',
                      '&Cfr;': 'ℭ',
                      '&Chi;': 'Χ',
                      '&CircleDot;': '⊙',
                      '&CircleMinus;': '⊖',
                      '&CirclePlus;': '⊕',
                      '&CircleTimes;': '⊗',
                      '&ClockwiseContourIntegral;': '∲',
                      '&CloseCurlyDoubleQuote;': '”',
                      '&CloseCurlyQuote;': '’',
                      '&Colon;': '∷',
                      '&Colone;': '⩴',
                      '&Congruent;': '≡',
                      '&Conint;': '∯',
                      '&ContourIntegral;': '∮',
                      '&Copf;': 'ℂ',
                      '&Coproduct;': '∐',
                      '&CounterClockwiseContourIntegral;': '∳',
                      '&Cross;': '⨯',
                      '&Cscr;': '𝒞',
                      '&Cup;': '⋓',
                      '&CupCap;': '≍',
                      '&DD;': 'ⅅ',
                      '&DDotrahd;': '⤑',
                      '&DJcy;': 'Ђ',
                      '&DScy;': 'Ѕ',
                      '&DZcy;': 'Џ',
                      '&Dagger;': '‡',
                      '&Darr;': '↡',
                      '&Dashv;': '⫤',
                      '&Dcaron;': 'Ď',
                      '&Dcy;': 'Д',
                      '&Del;': '∇',
                      '&Delta;': 'Δ',
                      '&Dfr;': '𝔇',
                      '&DiacriticalAcute;': '´',
                      '&DiacriticalDot;': '˙',
                      '&DiacriticalDoubleAcute;': '˝',
                      '&DiacriticalGrave;': '`',
                      '&DiacriticalTilde;': '˜',
                      '&Diamond;': '⋄',
                      '&DifferentialD;': 'ⅆ',
                      '&Dopf;': '𝔻',
                      '&Dot;': '¨',
                      '&DotDot;': '⃜',
                      '&DotEqual;': '≐',
                      '&DoubleContourIntegral;': '∯',
                      '&DoubleDot;': '¨',
                      '&DoubleDownArrow;': '⇓',
                      '&DoubleLeftArrow;': '⇐',
                      '&DoubleLeftRightArrow;': '⇔',
                      '&DoubleLeftTee;': '⫤',
                      '&DoubleLongLeftArrow;': '⟸',
                      '&DoubleLongLeftRightArrow;': '⟺',
                      '&DoubleLongRightArrow;': '⟹',
                      '&DoubleRightArrow;': '⇒',
                      '&DoubleRightTee;': '⊨',
                      '&DoubleUpArrow;': '⇑',
                      '&DoubleUpDownArrow;': '⇕',
                      '&DoubleVerticalBar;': '∥',
                      '&DownArrow;': '↓',
                      '&DownArrowBar;': '⤓',
                      '&DownArrowUpArrow;': '⇵',
                      '&DownBreve;': '̑',
                      '&DownLeftRightVector;': '⥐',
                      '&DownLeftTeeVector;': '⥞',
                      '&DownLeftVector;': '↽',
                      '&DownLeftVectorBar;': '⥖',
                      '&DownRightTeeVector;': '⥟',
                      '&DownRightVector;': '⇁',
                      '&DownRightVectorBar;': '⥗',
                      '&DownTee;': '⊤',
                      '&DownTeeArrow;': '↧',
                      '&Downarrow;': '⇓',
                      '&Dscr;': '𝒟',
                      '&Dstrok;': 'Đ',
                      '&ENG;': 'Ŋ',
                      '&ETH': 'Ð',
                      '&ETH;': 'Ð',
                      '&Eacute': 'É',
                      '&Eacute;': 'É',
                      '&Ecaron;': 'Ě',
                      '&Ecirc': 'Ê',
                      '&Ecirc;': 'Ê',
                      '&Ecy;': 'Э',
                      '&Edot;': 'Ė',
                      '&Efr;': '𝔈',
                      '&Egrave': 'È',
                      '&Egrave;': 'È',
                      '&Element;': '∈',
                      '&Emacr;': 'Ē',
                      '&EmptySmallSquare;': '◻',
                      '&EmptyVerySmallSquare;': '▫',
                      '&Eogon;': 'Ę',
                      '&Eopf;': '𝔼',
                      '&Epsilon;': 'Ε',
                      '&Equal;': '⩵',
                      '&EqualTilde;': '≂',
                      '&Equilibrium;': '⇌',
                      '&Escr;': 'ℰ',
                      '&Esim;': '⩳',
                      '&Eta;': 'Η',
                      '&Euml': 'Ë',
                      '&Euml;': 'Ë',
                      '&Exists;': '∃',
                      '&ExponentialE;': 'ⅇ',
                      '&Fcy;': 'Ф',
                      '&Ffr;': '𝔉',
                      '&FilledSmallSquare;': '◼',
                      '&FilledVerySmallSquare;': '▪',
                      '&Fopf;': '𝔽',
                      '&ForAll;': '∀',
                      '&Fouriertrf;': 'ℱ',
                      '&Fscr;': 'ℱ',
                      '&GJcy;': 'Ѓ',
                      '&GT': '>',
                      '&GT;': '>',
                      '&Gamma;': 'Γ',
                      '&Gammad;': 'Ϝ',
                      '&Gbreve;': 'Ğ',
                      '&Gcedil;': 'Ģ',
                      '&Gcirc;': 'Ĝ',
                      '&Gcy;': 'Г',
                      '&Gdot;': 'Ġ',
                      '&Gfr;': '𝔊',
                      '&Gg;': '⋙',
                      '&Gopf;': '𝔾',
                      '&GreaterEqual;': '≥',
                      '&GreaterEqualLess;': '⋛',
                      '&GreaterFullEqual;': '≧',
                      '&GreaterGreater;': '⪢',
                      '&GreaterLess;': '≷',
                      '&GreaterSlantEqual;': '⩾',
                      '&GreaterTilde;': '≳',
                      '&Gscr;': '𝒢',
                      '&Gt;': '≫',
                      '&HARDcy;': 'Ъ',
                      '&Hacek;': 'ˇ',
                      '&Hat;': '^',
                      '&Hcirc;': 'Ĥ',
                      '&Hfr;': 'ℌ',
                      '&HilbertSpace;': 'ℋ',
                      '&Hopf;': 'ℍ',
                      '&HorizontalLine;': '─',
                      '&Hscr;': 'ℋ',
                      '&Hstrok;': 'Ħ',
                      '&HumpDownHump;': '≎',
                      '&HumpEqual;': '≏',
                      '&IEcy;': 'Е',
                      '&IJlig;': 'Ĳ',
                      '&IOcy;': 'Ё',
                      '&Iacute': 'Í',
                      '&Iacute;': 'Í',
                      '&Icirc': 'Î',
                      '&Icirc;': 'Î',
                      '&Icy;': 'И',
                      '&Idot;': 'İ',
                      '&Ifr;': 'ℑ',
                      '&Igrave': 'Ì',
                      '&Igrave;': 'Ì',
                      '&Im;': 'ℑ',
                      '&Imacr;': 'Ī',
                      '&ImaginaryI;': 'ⅈ',
                      '&Implies;': '⇒',
                      '&Int;': '∬',
                      '&Integral;': '∫',
                      '&Intersection;': '⋂',
                      '&InvisibleComma;': '⁣',
                      '&InvisibleTimes;': '⁢',
                      '&Iogon;': 'Į',
                      '&Iopf;': '𝕀',
                      '&Iota;': 'Ι',
                      '&Iscr;': 'ℐ',
                      '&Itilde;': 'Ĩ',
                      '&Iukcy;': 'І',
                      '&Iuml': 'Ï',
                      '&Iuml;': 'Ï',
                      '&Jcirc;': 'Ĵ',
                      '&Jcy;': 'Й',
                      '&Jfr;': '𝔍',
                      '&Jopf;': '𝕁',
                      '&Jscr;': '𝒥',
                      '&Jsercy;': 'Ј',
                      '&Jukcy;': 'Є',
                      '&KHcy;': 'Х',
                      '&KJcy;': 'Ќ',
                      '&Kappa;': 'Κ',
                      '&Kcedil;': 'Ķ',
                      '&Kcy;': 'К',
                      '&Kfr;': '𝔎',
                      '&Kopf;': '𝕂',
                      '&Kscr;': '𝒦',
                      '&LJcy;': 'Љ',
                      '&LT': '<',
                      '&LT;': '<',
                      '&Lacute;': 'Ĺ',
                      '&Lambda;': 'Λ',
                      '&Lang;': '⟪',
                      '&Laplacetrf;': 'ℒ',
                      '&Larr;': '↞',
                      '&Lcaron;': 'Ľ',
                      '&Lcedil;': 'Ļ',
                      '&Lcy;': 'Л',
                      '&LeftAngleBracket;': '⟨',
                      '&LeftArrow;': '←',
                      '&LeftArrowBar;': '⇤',
                      '&LeftArrowRightArrow;': '⇆',
                      '&LeftCeiling;': '⌈',
                      '&LeftDoubleBracket;': '⟦',
                      '&LeftDownTeeVector;': '⥡',
                      '&LeftDownVector;': '⇃',
                      '&LeftDownVectorBar;': '⥙',
                      '&LeftFloor;': '⌊',
                      '&LeftRightArrow;': '↔',
                      '&LeftRightVector;': '⥎',
                      '&LeftTee;': '⊣',
                      '&LeftTeeArrow;': '↤',
                      '&LeftTeeVector;': '⥚',
                      '&LeftTriangle;': '⊲',
                      '&LeftTriangleBar;': '⧏',
                      '&LeftTriangleEqual;': '⊴',
                      '&LeftUpDownVector;': '⥑',
                      '&LeftUpTeeVector;': '⥠',
                      '&LeftUpVector;': '↿',
                      '&LeftUpVectorBar;': '⥘',
                      '&LeftVector;': '↼',
                      '&LeftVectorBar;': '⥒',
                      '&Leftarrow;': '⇐',
                      '&Leftrightarrow;': '⇔',
                      '&LessEqualGreater;': '⋚',
                      '&LessFullEqual;': '≦',
                      '&LessGreater;': '≶',
                      '&LessLess;': '⪡',
                      '&LessSlantEqual;': '⩽',
                      '&LessTilde;': '≲',
                      '&Lfr;': '𝔏',
                      '&Ll;': '⋘',
                      '&Lleftarrow;': '⇚',
                      '&Lmidot;': 'Ŀ',
                      '&LongLeftArrow;': '⟵',
                      '&LongLeftRightArrow;': '⟷',
                      '&LongRightArrow;': '⟶',
                      '&Longleftarrow;': '⟸',
                      '&Longleftrightarrow;': '⟺',
                      '&Longrightarrow;': '⟹',
                      '&Lopf;': '𝕃',
                      '&LowerLeftArrow;': '↙',
                      '&LowerRightArrow;': '↘',
                      '&Lscr;': 'ℒ',
                      '&Lsh;': '↰',
                      '&Lstrok;': 'Ł',
                      '&Lt;': '≪',
                      '&Map;': '⤅',
                      '&Mcy;': 'М',
                      '&MediumSpace;': ' ',
                      '&Mellintrf;': 'ℳ',
                      '&Mfr;': '𝔐',
                      '&MinusPlus;': '∓',
                      '&Mopf;': '𝕄',
                      '&Mscr;': 'ℳ',
                      '&Mu;': 'Μ',
                      '&NJcy;': 'Њ',
                      '&Nacute;': 'Ń',
                      '&Ncaron;': 'Ň',
                      '&Ncedil;': 'Ņ',
                      '&Ncy;': 'Н',
                      '&NegativeMediumSpace;': '​',
                      '&NegativeThickSpace;': '​',
                      '&NegativeThinSpace;': '​',
                      '&NegativeVeryThinSpace;': '​',
                      '&NestedGreaterGreater;': '≫',
                      '&NestedLessLess;': '≪',
                      '&NewLine;': '\n',
                      '&Nfr;': '𝔑',
                      '&NoBreak;': '⁠',
                      '&NonBreakingSpace;': ' ',
                      '&Nopf;': 'ℕ',
                      '&Not;': '⫬',
                      '&NotCongruent;': '≢',
                      '&NotCupCap;': '≭',
                      '&NotDoubleVerticalBar;': '∦',
                      '&NotElement;': '∉',
                      '&NotEqual;': '≠',
                      '&NotEqualTilde;': '≂̸',
                      '&NotExists;': '∄',
                      '&NotGreater;': '≯',
                      '&NotGreaterEqual;': '≱',
                      '&NotGreaterFullEqual;': '≧̸',
                      '&NotGreaterGreater;': '≫̸',
                      '&NotGreaterLess;': '≹',
                      '&NotGreaterSlantEqual;': '⩾̸',
                      '&NotGreaterTilde;': '≵',
                      '&NotHumpDownHump;': '≎̸',
                      '&NotHumpEqual;': '≏̸',
                      '&NotLeftTriangle;': '⋪',
                      '&NotLeftTriangleBar;': '⧏̸',
                      '&NotLeftTriangleEqual;': '⋬',
                      '&NotLess;': '≮',
                      '&NotLessEqual;': '≰',
                      '&NotLessGreater;': '≸',
                      '&NotLessLess;': '≪̸',
                      '&NotLessSlantEqual;': '⩽̸',
                      '&NotLessTilde;': '≴',
                      '&NotNestedGreaterGreater;': '⪢̸',
                      '&NotNestedLessLess;': '⪡̸',
                      '&NotPrecedes;': '⊀',
                      '&NotPrecedesEqual;': '⪯̸',
                      '&NotPrecedesSlantEqual;': '⋠',
                      '&NotReverseElement;': '∌',
                      '&NotRightTriangle;': '⋫',
                      '&NotRightTriangleBar;': '⧐̸',
                      '&NotRightTriangleEqual;': '⋭',
                      '&NotSquareSubset;': '⊏̸',
                      '&NotSquareSubsetEqual;': '⋢',
                      '&NotSquareSuperset;': '⊐̸',
                      '&NotSquareSupersetEqual;': '⋣',
                      '&NotSubset;': '⊂⃒',
                      '&NotSubsetEqual;': '⊈',
                      '&NotSucceeds;': '⊁',
                      '&NotSucceedsEqual;': '⪰̸',
                      '&NotSucceedsSlantEqual;': '⋡',
                      '&NotSucceedsTilde;': '≿̸',
                      '&NotSuperset;': '⊃⃒',
                      '&NotSupersetEqual;': '⊉',
                      '&NotTilde;': '≁',
                      '&NotTildeEqual;': '≄',
                      '&NotTildeFullEqual;': '≇',
                      '&NotTildeTilde;': '≉',
                      '&NotVerticalBar;': '∤',
                      '&Nscr;': '𝒩',
                      '&Ntilde': 'Ñ',
                      '&Ntilde;': 'Ñ',
                      '&Nu;': 'Ν',
                      '&OElig;': 'Œ',
                      '&Oacute': 'Ó',
                      '&Oacute;': 'Ó',
                      '&Ocirc': 'Ô',
                      '&Ocirc;': 'Ô',
                      '&Ocy;': 'О',
                      '&Odblac;': 'Ő',
                      '&Ofr;': '𝔒',
                      '&Ograve': 'Ò',
                      '&Ograve;': 'Ò',
                      '&Omacr;': 'Ō',
                      '&Omega;': 'Ω',
                      '&Omicron;': 'Ο',
                      '&Oopf;': '𝕆',
                      '&OpenCurlyDoubleQuote;': '“',
                      '&OpenCurlyQuote;': '‘',
                      '&Or;': '⩔',
                      '&Oscr;': '𝒪',
                      '&Oslash': 'Ø',
                      '&Oslash;': 'Ø',
                      '&Otilde': 'Õ',
                      '&Otilde;': 'Õ',
                      '&Otimes;': '⨷',
                      '&Ouml': 'Ö',
                      '&Ouml;': 'Ö',
                      '&OverBar;': '‾',
                      '&OverBrace;': '⏞',
                      '&OverBracket;': '⎴',
                      '&OverParenthesis;': '⏜',
                      '&PartialD;': '∂',
                      '&Pcy;': 'П',
                      '&Pfr;': '𝔓',
                      '&Phi;': 'Φ',
                      '&Pi;': 'Π',
                      '&PlusMinus;': '±',
                      '&Poincareplane;': 'ℌ',
                      '&Popf;': 'ℙ',
                      '&Pr;': '⪻',
                      '&Precedes;': '≺',
                      '&PrecedesEqual;': '⪯',
                      '&PrecedesSlantEqual;': '≼',
                      '&PrecedesTilde;': '≾',
                      '&Prime;': '″',
                      '&Product;': '∏',
                      '&Proportion;': '∷',
                      '&Proportional;': '∝',
                      '&Pscr;': '𝒫',
                      '&Psi;': 'Ψ',
                      '&QUOT': '"',
                      '&QUOT;': '"',
                      '&Qfr;': '𝔔',
                      '&Qopf;': 'ℚ',
                      '&Qscr;': '𝒬',
                      '&RBarr;': '⤐',
                      '&REG': '®',
                      '&REG;': '®',
                      '&Racute;': 'Ŕ',
                      '&Rang;': '⟫',
                      '&Rarr;': '↠',
                      '&Rarrtl;': '⤖',
                      '&Rcaron;': 'Ř',
                      '&Rcedil;': 'Ŗ',
                      '&Rcy;': 'Р',
                      '&Re;': 'ℜ',
                      '&ReverseElement;': '∋',
                      '&ReverseEquilibrium;': '⇋',
                      '&ReverseUpEquilibrium;': '⥯',
                      '&Rfr;': 'ℜ',
                      '&Rho;': 'Ρ',
                      '&RightAngleBracket;': '⟩',
                      '&RightArrow;': '→',
                      '&RightArrowBar;': '⇥',
                      '&RightArrowLeftArrow;': '⇄',
                      '&RightCeiling;': '⌉',
                      '&RightDoubleBracket;': '⟧',
                      '&RightDownTeeVector;': '⥝',
                      '&RightDownVector;': '⇂',
                      '&RightDownVectorBar;': '⥕',
                      '&RightFloor;': '⌋',
                      '&RightTee;': '⊢',
                      '&RightTeeArrow;': '↦',
                      '&RightTeeVector;': '⥛',
                      '&RightTriangle;': '⊳',
                      '&RightTriangleBar;': '⧐',
                      '&RightTriangleEqual;': '⊵',
                      '&RightUpDownVector;': '⥏',
                      '&RightUpTeeVector;': '⥜',
                      '&RightUpVector;': '↾',
                      '&RightUpVectorBar;': '⥔',
                      '&RightVector;': '⇀',
                      '&RightVectorBar;': '⥓',
                      '&Rightarrow;': '⇒',
                      '&Ropf;': 'ℝ',
                      '&RoundImplies;': '⥰',
                      '&Rrightarrow;': '⇛',
                      '&Rscr;': 'ℛ',
                      '&Rsh;': '↱',
                      '&RuleDelayed;': '⧴',
                      '&SHCHcy;': 'Щ',
                      '&SHcy;': 'Ш',
                      '&SOFTcy;': 'Ь',
                      '&Sacute;': 'Ś',
                      '&Sc;': '⪼',
                      '&Scaron;': 'Š',
                      '&Scedil;': 'Ş',
                      '&Scirc;': 'Ŝ',
                      '&Scy;': 'С',
                      '&Sfr;': '𝔖',
                      '&ShortDownArrow;': '↓',
                      '&ShortLeftArrow;': '←',
                      '&ShortRightArrow;': '→',
                      '&ShortUpArrow;': '↑',
                      '&Sigma;': 'Σ',
                      '&SmallCircle;': '∘',
                      '&Sopf;': '𝕊',
                      '&Sqrt;': '√',
                      '&Square;': '□',
                      '&SquareIntersection;': '⊓',
                      '&SquareSubset;': '⊏',
                      '&SquareSubsetEqual;': '⊑',
                      '&SquareSuperset;': '⊐',
                      '&SquareSupersetEqual;': '⊒',
                      '&SquareUnion;': '⊔',
                      '&Sscr;': '𝒮',
                      '&Star;': '⋆',
                      '&Sub;': '⋐',
                      '&Subset;': '⋐',
                      '&SubsetEqual;': '⊆',
                      '&Succeeds;': '≻',
                      '&SucceedsEqual;': '⪰',
                      '&SucceedsSlantEqual;': '≽',
                      '&SucceedsTilde;': '≿',
                      '&SuchThat;': '∋',
                      '&Sum;': '∑',
                      '&Sup;': '⋑',
                      '&Superset;': '⊃',
                      '&SupersetEqual;': '⊇',
                      '&Supset;': '⋑',
                      '&THORN': 'Þ',
                      '&THORN;': 'Þ',
                      '&TRADE;': '™',
                      '&TSHcy;': 'Ћ',
                      '&TScy;': 'Ц',
                      '&Tab;': '\t',
                      '&Tau;': 'Τ',
                      '&Tcaron;': 'Ť',
                      '&Tcedil;': 'Ţ',
                      '&Tcy;': 'Т',
                      '&Tfr;': '𝔗',
                      '&Therefore;': '∴',
                      '&Theta;': 'Θ',
                      '&ThickSpace;': '  ',
                      '&ThinSpace;': ' ',
                      '&Tilde;': '∼',
                      '&TildeEqual;': '≃',
                      '&TildeFullEqual;': '≅',
                      '&TildeTilde;': '≈',
                      '&Topf;': '𝕋',
                      '&TripleDot;': '⃛',
                      '&Tscr;': '𝒯',
                      '&Tstrok;': 'Ŧ',
                      '&Uacute': 'Ú',
                      '&Uacute;': 'Ú',
                      '&Uarr;': '↟',
                      '&Uarrocir;': '⥉',
                      '&Ubrcy;': 'Ў',
                      '&Ubreve;': 'Ŭ',
                      '&Ucirc': 'Û',
                      '&Ucirc;': 'Û',
                      '&Ucy;': 'У',
                      '&Udblac;': 'Ű',
                      '&Ufr;': '𝔘',
                      '&Ugrave': 'Ù',
                      '&Ugrave;': 'Ù',
                      '&Umacr;': 'Ū',
                      '&UnderBar;': '_',
                      '&UnderBrace;': '⏟',
                      '&UnderBracket;': '⎵',
                      '&UnderParenthesis;': '⏝',
                      '&Union;': '⋃',
                      '&UnionPlus;': '⊎',
                      '&Uogon;': 'Ų',
                      '&Uopf;': '𝕌',
                      '&UpArrow;': '↑',
                      '&UpArrowBar;': '⤒',
                      '&UpArrowDownArrow;': '⇅',
                      '&UpDownArrow;': '↕',
                      '&UpEquilibrium;': '⥮',
                      '&UpTee;': '⊥',
                      '&UpTeeArrow;': '↥',
                      '&Uparrow;': '⇑',
                      '&Updownarrow;': '⇕',
                      '&UpperLeftArrow;': '↖',
                      '&UpperRightArrow;': '↗',
                      '&Upsi;': 'ϒ',
                      '&Upsilon;': 'Υ',
                      '&Uring;': 'Ů',
                      '&Uscr;': '𝒰',
                      '&Utilde;': 'Ũ',
                      '&Uuml': 'Ü',
                      '&Uuml;': 'Ü',
                      '&VDash;': '⊫',
                      '&Vbar;': '⫫',
                      '&Vcy;': 'В',
                      '&Vdash;': '⊩',
                      '&Vdashl;': '⫦',
                      '&Vee;': '⋁',
                      '&Verbar;': '‖',
                      '&Vert;': '‖',
                      '&VerticalBar;': '∣',
                      '&VerticalLine;': '|',
                      '&VerticalSeparator;': '❘',
                      '&VerticalTilde;': '≀',
                      '&VeryThinSpace;': ' ',
                      '&Vfr;': '𝔙',
                      '&Vopf;': '𝕍',
                      '&Vscr;': '𝒱',
                      '&Vvdash;': '⊪',
                      '&Wcirc;': 'Ŵ',
                      '&Wedge;': '⋀',
                      '&Wfr;': '𝔚',
                      '&Wopf;': '𝕎',
                      '&Wscr;': '𝒲',
                      '&Xfr;': '𝔛',
                      '&Xi;': 'Ξ',
                      '&Xopf;': '𝕏',
                      '&Xscr;': '𝒳',
                      '&YAcy;': 'Я',
                      '&YIcy;': 'Ї',
                      '&YUcy;': 'Ю',
                      '&Yacute': 'Ý',
                      '&Yacute;': 'Ý',
                      '&Ycirc;': 'Ŷ',
                      '&Ycy;': 'Ы',
                      '&Yfr;': '𝔜',
                      '&Yopf;': '𝕐',
                      '&Yscr;': '𝒴',
                      '&Yuml;': 'Ÿ',
                      '&ZHcy;': 'Ж',
                      '&Zacute;': 'Ź',
                      '&Zcaron;': 'Ž',
                      '&Zcy;': 'З',
                      '&Zdot;': 'Ż',
                      '&ZeroWidthSpace;': '​',
                      '&Zeta;': 'Ζ',
                      '&Zfr;': 'ℨ',
                      '&Zopf;': 'ℤ',
                      '&Zscr;': '𝒵',
                      '&aacute': 'á',
                      '&aacute;': 'á',
                      '&abreve;': 'ă',
                      '&ac;': '∾',
                      '&acE;': '∾̳',
                      '&acd;': '∿',
                      '&acirc': 'â',
                      '&acirc;': 'â',
                      '&acute': '´',
                      '&acute;': '´',
                      '&acy;': 'а',
                      '&aelig': 'æ',
                      '&aelig;': 'æ',
                      '&af;': '⁡',
                      '&afr;': '𝔞',
                      '&agrave': 'à',
                      '&agrave;': 'à',
                      '&alefsym;': 'ℵ',
                      '&aleph;': 'ℵ',
                      '&alpha;': 'α',
                      '&amacr;': 'ā',
                      '&amalg;': '⨿',
                      '&amp': '&',
                      '&amp;': '&',
                      '&and;': '∧',
                      '&andand;': '⩕',
                      '&andd;': '⩜',
                      '&andslope;': '⩘',
                      '&andv;': '⩚',
                      '&ang;': '∠',
                      '&ange;': '⦤',
                      '&angle;': '∠',
                      '&angmsd;': '∡',
                      '&angmsdaa;': '⦨',
                      '&angmsdab;': '⦩',
                      '&angmsdac;': '⦪',
                      '&angmsdad;': '⦫',
                      '&angmsdae;': '⦬',
                      '&angmsdaf;': '⦭',
                      '&angmsdag;': '⦮',
                      '&angmsdah;': '⦯',
                      '&angrt;': '∟',
                      '&angrtvb;': '⊾',
                      '&angrtvbd;': '⦝',
                      '&angsph;': '∢',
                      '&angst;': 'Å',
                      '&angzarr;': '⍼',
                      '&aogon;': 'ą',
                      '&aopf;': '𝕒',
                      '&ap;': '≈',
                      '&apE;': '⩰',
                      '&apacir;': '⩯',
                      '&ape;': '≊',
                      '&apid;': '≋',
                      '&apos;': "'",
                      '&approx;': '≈',
                      '&approxeq;': '≊',
                      '&aring': 'å',
                      '&aring;': 'å',
                      '&ascr;': '𝒶',
                      '&ast;': '*',
                      '&asymp;': '≈',
                      '&asympeq;': '≍',
                      '&atilde': 'ã',
                      '&atilde;': 'ã',
                      '&auml': 'ä',
                      '&auml;': 'ä',
                      '&awconint;': '∳',
                      '&awint;': '⨑',
                      '&bNot;': '⫭',
                      '&backcong;': '≌',
                      '&backepsilon;': '϶',
                      '&backprime;': '‵',
                      '&backsim;': '∽',
                      '&backsimeq;': '⋍',
                      '&barvee;': '⊽',
                      '&barwed;': '⌅',
                      '&barwedge;': '⌅',
                      '&bbrk;': '⎵',
                      '&bbrktbrk;': '⎶',
                      '&bcong;': '≌',
                      '&bcy;': 'б',
                      '&bdquo;': '„',
                      '&becaus;': '∵',
                      '&because;': '∵',
                      '&bemptyv;': '⦰',
                      '&bepsi;': '϶',
                      '&bernou;': 'ℬ',
                      '&beta;': 'β',
                      '&beth;': 'ℶ',
                      '&between;': '≬',
                      '&bfr;': '𝔟',
                      '&bigcap;': '⋂',
                      '&bigcirc;': '◯',
                      '&bigcup;': '⋃',
                      '&bigodot;': '⨀',
                      '&bigoplus;': '⨁',
                      '&bigotimes;': '⨂',
                      '&bigsqcup;': '⨆',
                      '&bigstar;': '★',
                      '&bigtriangledown;': '▽',
                      '&bigtriangleup;': '△',
                      '&biguplus;': '⨄',
                      '&bigvee;': '⋁',
                      '&bigwedge;': '⋀',
                      '&bkarow;': '⤍',
                      '&blacklozenge;': '⧫',
                      '&blacksquare;': '▪',
                      '&blacktriangle;': '▴',
                      '&blacktriangledown;': '▾',
                      '&blacktriangleleft;': '◂',
                      '&blacktriangleright;': '▸',
                      '&blank;': '␣',
                      '&blk12;': '▒',
                      '&blk14;': '░',
                      '&blk34;': '▓',
                      '&block;': '█',
                      '&bne;': '=⃥',
                      '&bnequiv;': '≡⃥',
                      '&bnot;': '⌐',
                      '&bopf;': '𝕓',
                      '&bot;': '⊥',
                      '&bottom;': '⊥',
                      '&bowtie;': '⋈',
                      '&boxDL;': '╗',
                      '&boxDR;': '╔',
                      '&boxDl;': '╖',
                      '&boxDr;': '╓',
                      '&boxH;': '═',
                      '&boxHD;': '╦',
                      '&boxHU;': '╩',
                      '&boxHd;': '╤',
                      '&boxHu;': '╧',
                      '&boxUL;': '╝',
                      '&boxUR;': '╚',
                      '&boxUl;': '╜',
                      '&boxUr;': '╙',
                      '&boxV;': '║',
                      '&boxVH;': '╬',
                      '&boxVL;': '╣',
                      '&boxVR;': '╠',
                      '&boxVh;': '╫',
                      '&boxVl;': '╢',
                      '&boxVr;': '╟',
                      '&boxbox;': '⧉',
                      '&boxdL;': '╕',
                      '&boxdR;': '╒',
                      '&boxdl;': '┐',
                      '&boxdr;': '┌',
                      '&boxh;': '─',
                      '&boxhD;': '╥',
                      '&boxhU;': '╨',
                      '&boxhd;': '┬',
                      '&boxhu;': '┴',
                      '&boxminus;': '⊟',
                      '&boxplus;': '⊞',
                      '&boxtimes;': '⊠',
                      '&boxuL;': '╛',
                      '&boxuR;': '╘',
                      '&boxul;': '┘',
                      '&boxur;': '└',
                      '&boxv;': '│',
                      '&boxvH;': '╪',
                      '&boxvL;': '╡',
                      '&boxvR;': '╞',
                      '&boxvh;': '┼',
                      '&boxvl;': '┤',
                      '&boxvr;': '├',
                      '&bprime;': '‵',
                      '&breve;': '˘',
                      '&brvbar': '¦',
                      '&brvbar;': '¦',
                      '&bscr;': '𝒷',
                      '&bsemi;': '⁏',
                      '&bsim;': '∽',
                      '&bsime;': '⋍',
                      '&bsol;': '\\',
                      '&bsolb;': '⧅',
                      '&bsolhsub;': '⟈',
                      '&bull;': '•',
                      '&bullet;': '•',
                      '&bump;': '≎',
                      '&bumpE;': '⪮',
                      '&bumpe;': '≏',
                      '&bumpeq;': '≏',
                      '&cacute;': 'ć',
                      '&cap;': '∩',
                      '&capand;': '⩄',
                      '&capbrcup;': '⩉',
                      '&capcap;': '⩋',
                      '&capcup;': '⩇',
                      '&capdot;': '⩀',
                      '&caps;': '∩︀',
                      '&caret;': '⁁',
                      '&caron;': 'ˇ',
                      '&ccaps;': '⩍',
                      '&ccaron;': 'č',
                      '&ccedil': 'ç',
                      '&ccedil;': 'ç',
                      '&ccirc;': 'ĉ',
                      '&ccups;': '⩌',
                      '&ccupssm;': '⩐',
                      '&cdot;': 'ċ',
                      '&cedil': '¸',
                      '&cedil;': '¸',
                      '&cemptyv;': '⦲',
                      '&cent': '¢',
                      '&cent;': '¢',
                      '&centerdot;': '·',
                      '&cfr;': '𝔠',
                      '&chcy;': 'ч',
                      '&check;': '✓',
                      '&checkmark;': '✓',
                      '&chi;': 'χ',
                      '&cir;': '○',
                      '&cirE;': '⧃',
                      '&circ;': 'ˆ',
                      '&circeq;': '≗',
                      '&circlearrowleft;': '↺',
                      '&circlearrowright;': '↻',
                      '&circledR;': '®',
                      '&circledS;': 'Ⓢ',
                      '&circledast;': '⊛',
                      '&circledcirc;': '⊚',
                      '&circleddash;': '⊝',
                      '&cire;': '≗',
                      '&cirfnint;': '⨐',
                      '&cirmid;': '⫯',
                      '&cirscir;': '⧂',
                      '&clubs;': '♣',
                      '&clubsuit;': '♣',
                      '&colon;': ':',
                      '&colone;': '≔',
                      '&coloneq;': '≔',
                      '&comma;': ',',
                      '&commat;': '@',
                      '&comp;': '∁',
                      '&compfn;': '∘',
                      '&complement;': '∁',
                      '&complexes;': 'ℂ',
                      '&cong;': '≅',
                      '&congdot;': '⩭',
                      '&conint;': '∮',
                      '&copf;': '𝕔',
                      '&coprod;': '∐',
                      '&copy': '©',
                      '&copy;': '©',
                      '&copysr;': '℗',
                      '&crarr;': '↵',
                      '&cross;': '✗',
                      '&cscr;': '𝒸',
                      '&csub;': '⫏',
                      '&csube;': '⫑',
                      '&csup;': '⫐',
                      '&csupe;': '⫒',
                      '&ctdot;': '⋯',
                      '&cudarrl;': '⤸',
                      '&cudarrr;': '⤵',
                      '&cuepr;': '⋞',
                      '&cuesc;': '⋟',
                      '&cularr;': '↶',
                      '&cularrp;': '⤽',
                      '&cup;': '∪',
                      '&cupbrcap;': '⩈',
                      '&cupcap;': '⩆',
                      '&cupcup;': '⩊',
                      '&cupdot;': '⊍',
                      '&cupor;': '⩅',
                      '&cups;': '∪︀',
                      '&curarr;': '↷',
                      '&curarrm;': '⤼',
                      '&curlyeqprec;': '⋞',
                      '&curlyeqsucc;': '⋟',
                      '&curlyvee;': '⋎',
                      '&curlywedge;': '⋏',
                      '&curren': '¤',
                      '&curren;': '¤',
                      '&curvearrowleft;': '↶',
                      '&curvearrowright;': '↷',
                      '&cuvee;': '⋎',
                      '&cuwed;': '⋏',
                      '&cwconint;': '∲',
                      '&cwint;': '∱',
                      '&cylcty;': '⌭',
                      '&dArr;': '⇓',
                      '&dHar;': '⥥',
                      '&dagger;': '†',
                      '&daleth;': 'ℸ',
                      '&darr;': '↓',
                      '&dash;': '‐',
                      '&dashv;': '⊣',
                      '&dbkarow;': '⤏',
                      '&dblac;': '˝',
                      '&dcaron;': 'ď',
                      '&dcy;': 'д',
                      '&dd;': 'ⅆ',
                      '&ddagger;': '‡',
                      '&ddarr;': '⇊',
                      '&ddotseq;': '⩷',
                      '&deg': '°',
                      '&deg;': '°',
                      '&delta;': 'δ',
                      '&demptyv;': '⦱',
                      '&dfisht;': '⥿',
                      '&dfr;': '𝔡',
                      '&dharl;': '⇃',
                      '&dharr;': '⇂',
                      '&diam;': '⋄',
                      '&diamond;': '⋄',
                      '&diamondsuit;': '♦',
                      '&diams;': '♦',
                      '&die;': '¨',
                      '&digamma;': 'ϝ',
                      '&disin;': '⋲',
                      '&div;': '÷',
                      '&divide': '÷',
                      '&divide;': '÷',
                      '&divideontimes;': '⋇',
                      '&divonx;': '⋇',
                      '&djcy;': 'ђ',
                      '&dlcorn;': '⌞',
                      '&dlcrop;': '⌍',
                      '&dollar;': '$',
                      '&dopf;': '𝕕',
                      '&dot;': '˙',
                      '&doteq;': '≐',
                      '&doteqdot;': '≑',
                      '&dotminus;': '∸',
                      '&dotplus;': '∔',
                      '&dotsquare;': '⊡',
                      '&doublebarwedge;': '⌆',
                      '&downarrow;': '↓',
                      '&downdownarrows;': '⇊',
                      '&downharpoonleft;': '⇃',
                      '&downharpoonright;': '⇂',
                      '&drbkarow;': '⤐',
                      '&drcorn;': '⌟',
                      '&drcrop;': '⌌',
                      '&dscr;': '𝒹',
                      '&dscy;': 'ѕ',
                      '&dsol;': '⧶',
                      '&dstrok;': 'đ',
                      '&dtdot;': '⋱',
                      '&dtri;': '▿',
                      '&dtrif;': '▾',
                      '&duarr;': '⇵',
                      '&duhar;': '⥯',
                      '&dwangle;': '⦦',
                      '&dzcy;': 'џ',
                      '&dzigrarr;': '⟿',
                      '&eDDot;': '⩷',
                      '&eDot;': '≑',
                      '&eacute': 'é',
                      '&eacute;': 'é',
                      '&easter;': '⩮',
                      '&ecaron;': 'ě',
                      '&ecir;': '≖',
                      '&ecirc': 'ê',
                      '&ecirc;': 'ê',
                      '&ecolon;': '≕',
                      '&ecy;': 'э',
                      '&edot;': 'ė',
                      '&ee;': 'ⅇ',
                      '&efDot;': '≒',
                      '&efr;': '𝔢',
                      '&eg;': '⪚',
                      '&egrave': 'è',
                      '&egrave;': 'è',
                      '&egs;': '⪖',
                      '&egsdot;': '⪘',
                      '&el;': '⪙',
                      '&elinters;': '⏧',
                      '&ell;': 'ℓ',
                      '&els;': '⪕',
                      '&elsdot;': '⪗',
                      '&emacr;': 'ē',
                      '&empty;': '∅',
                      '&emptyset;': '∅',
                      '&emptyv;': '∅',
                      '&emsp13;': ' ',
                      '&emsp14;': ' ',
                      '&emsp;': ' ',
                      '&eng;': 'ŋ',
                      '&ensp;': ' ',
                      '&eogon;': 'ę',
                      '&eopf;': '𝕖',
                      '&epar;': '⋕',
                      '&eparsl;': '⧣',
                      '&eplus;': '⩱',
                      '&epsi;': 'ε',
                      '&epsilon;': 'ε',
                      '&epsiv;': 'ϵ',
                      '&eqcirc;': '≖',
                      '&eqcolon;': '≕',
                      '&eqsim;': '≂',
                      '&eqslantgtr;': '⪖',
                      '&eqslantless;': '⪕',
                      '&equals;': '=',
                      '&equest;': '≟',
                      '&equiv;': '≡',
                      '&equivDD;': '⩸',
                      '&eqvparsl;': '⧥',
                      '&erDot;': '≓',
                      '&erarr;': '⥱',
                      '&escr;': 'ℯ',
                      '&esdot;': '≐',
                      '&esim;': '≂',
                      '&eta;': 'η',
                      '&eth': 'ð',
                      '&eth;': 'ð',
                      '&euml': 'ë',
                      '&euml;': 'ë',
                      '&euro;': '€',
                      '&excl;': '!',
                      '&exist;': '∃',
                      '&expectation;': 'ℰ',
                      '&exponentiale;': 'ⅇ',
                      '&fallingdotseq;': '≒',
                      '&fcy;': 'ф',
                      '&female;': '♀',
                      '&ffilig;': 'ﬃ',
                      '&fflig;': 'ﬀ',
                      '&ffllig;': 'ﬄ',
                      '&ffr;': '𝔣',
                      '&filig;': 'ﬁ',
                      '&fjlig;': 'fj',
                      '&flat;': '♭',
                      '&fllig;': 'ﬂ',
                      '&fltns;': '▱',
                      '&fnof;': 'ƒ',
                      '&fopf;': '𝕗',
                      '&forall;': '∀',
                      '&fork;': '⋔',
                      '&forkv;': '⫙',
                      '&fpartint;': '⨍',
                      '&frac12': '½',
                      '&frac12;': '½',
                      '&frac13;': '⅓',
                      '&frac14': '¼',
                      '&frac14;': '¼',
                      '&frac15;': '⅕',
                      '&frac16;': '⅙',
                      '&frac18;': '⅛',
                      '&frac23;': '⅔',
                      '&frac25;': '⅖',
                      '&frac34': '¾',
                      '&frac34;': '¾',
                      '&frac35;': '⅗',
                      '&frac38;': '⅜',
                      '&frac45;': '⅘',
                      '&frac56;': '⅚',
                      '&frac58;': '⅝',
                      '&frac78;': '⅞',
                      '&frasl;': '⁄',
                      '&frown;': '⌢',
                      '&fscr;': '𝒻',
                      '&gE;': '≧',
                      '&gEl;': '⪌',
                      '&gacute;': 'ǵ',
                      '&gamma;': 'γ',
                      '&gammad;': 'ϝ',
                      '&gap;': '⪆',
                      '&gbreve;': 'ğ',
                      '&gcirc;': 'ĝ',
                      '&gcy;': 'г',
                      '&gdot;': 'ġ',
                      '&ge;': '≥',
                      '&gel;': '⋛',
                      '&geq;': '≥',
                      '&geqq;': '≧',
                      '&geqslant;': '⩾',
                      '&ges;': '⩾',
                      '&gescc;': '⪩',
                      '&gesdot;': '⪀',
                      '&gesdoto;': '⪂',
                      '&gesdotol;': '⪄',
                      '&gesl;': '⋛︀',
                      '&gesles;': '⪔',
                      '&gfr;': '𝔤',
                      '&gg;': '≫',
                      '&ggg;': '⋙',
                      '&gimel;': 'ℷ',
                      '&gjcy;': 'ѓ',
                      '&gl;': '≷',
                      '&glE;': '⪒',
                      '&gla;': '⪥',
                      '&glj;': '⪤',
                      '&gnE;': '≩',
                      '&gnap;': '⪊',
                      '&gnapprox;': '⪊',
                      '&gne;': '⪈',
                      '&gneq;': '⪈',
                      '&gneqq;': '≩',
                      '&gnsim;': '⋧',
                      '&gopf;': '𝕘',
                      '&grave;': '`',
                      '&gscr;': 'ℊ',
                      '&gsim;': '≳',
                      '&gsime;': '⪎',
                      '&gsiml;': '⪐',
                      '&gt': '>',
                      '&gt;': '>',
                      '&gtcc;': '⪧',
                      '&gtcir;': '⩺',
                      '&gtdot;': '⋗',
                      '&gtlPar;': '⦕',
                      '&gtquest;': '⩼',
                      '&gtrapprox;': '⪆',
                      '&gtrarr;': '⥸',
                      '&gtrdot;': '⋗',
                      '&gtreqless;': '⋛',
                      '&gtreqqless;': '⪌',
                      '&gtrless;': '≷',
                      '&gtrsim;': '≳',
                      '&gvertneqq;': '≩︀',
                      '&gvnE;': '≩︀',
                      '&hArr;': '⇔',
                      '&hairsp;': ' ',
                      '&half;': '½',
                      '&hamilt;': 'ℋ',
                      '&hardcy;': 'ъ',
                      '&harr;': '↔',
                      '&harrcir;': '⥈',
                      '&harrw;': '↭',
                      '&hbar;': 'ℏ',
                      '&hcirc;': 'ĥ',
                      '&hearts;': '♥',
                      '&heartsuit;': '♥',
                      '&hellip;': '…',
                      '&hercon;': '⊹',
                      '&hfr;': '𝔥',
                      '&hksearow;': '⤥',
                      '&hkswarow;': '⤦',
                      '&hoarr;': '⇿',
                      '&homtht;': '∻',
                      '&hookleftarrow;': '↩',
                      '&hookrightarrow;': '↪',
                      '&hopf;': '𝕙',
                      '&horbar;': '―',
                      '&hscr;': '𝒽',
                      '&hslash;': 'ℏ',
                      '&hstrok;': 'ħ',
                      '&hybull;': '⁃',
                      '&hyphen;': '‐',
                      '&iacute': 'í',
                      '&iacute;': 'í',
                      '&ic;': '⁣',
                      '&icirc': 'î',
                      '&icirc;': 'î',
                      '&icy;': 'и',
                      '&iecy;': 'е',
                      '&iexcl': '¡',
                      '&iexcl;': '¡',
                      '&iff;': '⇔',
                      '&ifr;': '𝔦',
                      '&igrave': 'ì',
                      '&igrave;': 'ì',
                      '&ii;': 'ⅈ',
                      '&iiiint;': '⨌',
                      '&iiint;': '∭',
                      '&iinfin;': '⧜',
                      '&iiota;': '℩',
                      '&ijlig;': 'ĳ',
                      '&imacr;': 'ī',
                      '&image;': 'ℑ',
                      '&imagline;': 'ℐ',
                      '&imagpart;': 'ℑ',
                      '&imath;': 'ı',
                      '&imof;': '⊷',
                      '&imped;': 'Ƶ',
                      '&in;': '∈',
                      '&incare;': '℅',
                      '&infin;': '∞',
                      '&infintie;': '⧝',
                      '&inodot;': 'ı',
                      '&int;': '∫',
                      '&intcal;': '⊺',
                      '&integers;': 'ℤ',
                      '&intercal;': '⊺',
                      '&intlarhk;': '⨗',
                      '&intprod;': '⨼',
                      '&iocy;': 'ё',
                      '&iogon;': 'į',
                      '&iopf;': '𝕚',
                      '&iota;': 'ι',
                      '&iprod;': '⨼',
                      '&iquest': '¿',
                      '&iquest;': '¿',
                      '&iscr;': '𝒾',
                      '&isin;': '∈',
                      '&isinE;': '⋹',
                      '&isindot;': '⋵',
                      '&isins;': '⋴',
                      '&isinsv;': '⋳',
                      '&isinv;': '∈',
                      '&it;': '⁢',
                      '&itilde;': 'ĩ',
                      '&iukcy;': 'і',
                      '&iuml': 'ï',
                      '&iuml;': 'ï',
                      '&jcirc;': 'ĵ',
                      '&jcy;': 'й',
                      '&jfr;': '𝔧',
                      '&jmath;': 'ȷ',
                      '&jopf;': '𝕛',
                      '&jscr;': '𝒿',
                      '&jsercy;': 'ј',
                      '&jukcy;': 'є',
                      '&kappa;': 'κ',
                      '&kappav;': 'ϰ',
                      '&kcedil;': 'ķ',
                      '&kcy;': 'к',
                      '&kfr;': '𝔨',
                      '&kgreen;': 'ĸ',
                      '&khcy;': 'х',
                      '&kjcy;': 'ќ',
                      '&kopf;': '𝕜',
                      '&kscr;': '𝓀',
                      '&lAarr;': '⇚',
                      '&lArr;': '⇐',
                      '&lAtail;': '⤛',
                      '&lBarr;': '⤎',
                      '&lE;': '≦',
                      '&lEg;': '⪋',
                      '&lHar;': '⥢',
                      '&lacute;': 'ĺ',
                      '&laemptyv;': '⦴',
                      '&lagran;': 'ℒ',
                      '&lambda;': 'λ',
                      '&lang;': '⟨',
                      '&langd;': '⦑',
                      '&langle;': '⟨',
                      '&lap;': '⪅',
                      '&laquo': '«',
                      '&laquo;': '«',
                      '&larr;': '←',
                      '&larrb;': '⇤',
                      '&larrbfs;': '⤟',
                      '&larrfs;': '⤝',
                      '&larrhk;': '↩',
                      '&larrlp;': '↫',
                      '&larrpl;': '⤹',
                      '&larrsim;': '⥳',
                      '&larrtl;': '↢',
                      '&lat;': '⪫',
                      '&latail;': '⤙',
                      '&late;': '⪭',
                      '&lates;': '⪭︀',
                      '&lbarr;': '⤌',
                      '&lbbrk;': '❲',
                      '&lbrace;': '{',
                      '&lbrack;': '[',
                      '&lbrke;': '⦋',
                      '&lbrksld;': '⦏',
                      '&lbrkslu;': '⦍',
                      '&lcaron;': 'ľ',
                      '&lcedil;': 'ļ',
                      '&lceil;': '⌈',
                      '&lcub;': '{',
                      '&lcy;': 'л',
                      '&ldca;': '⤶',
                      '&ldquo;': '“',
                      '&ldquor;': '„',
                      '&ldrdhar;': '⥧',
                      '&ldrushar;': '⥋',
                      '&ldsh;': '↲',
                      '&le;': '≤',
                      '&leftarrow;': '←',
                      '&leftarrowtail;': '↢',
                      '&leftharpoondown;': '↽',
                      '&leftharpoonup;': '↼',
                      '&leftleftarrows;': '⇇',
                      '&leftrightarrow;': '↔',
                      '&leftrightarrows;': '⇆',
                      '&leftrightharpoons;': '⇋',
                      '&leftrightsquigarrow;': '↭',
                      '&leftthreetimes;': '⋋',
                      '&leg;': '⋚',
                      '&leq;': '≤',
                      '&leqq;': '≦',
                      '&leqslant;': '⩽',
                      '&les;': '⩽',
                      '&lescc;': '⪨',
                      '&lesdot;': '⩿',
                      '&lesdoto;': '⪁',
                      '&lesdotor;': '⪃',
                      '&lesg;': '⋚︀',
                      '&lesges;': '⪓',
                      '&lessapprox;': '⪅',
                      '&lessdot;': '⋖',
                      '&lesseqgtr;': '⋚',
                      '&lesseqqgtr;': '⪋',
                      '&lessgtr;': '≶',
                      '&lesssim;': '≲',
                      '&lfisht;': '⥼',
                      '&lfloor;': '⌊',
                      '&lfr;': '𝔩',
                      '&lg;': '≶',
                      '&lgE;': '⪑',
                      '&lhard;': '↽',
                      '&lharu;': '↼',
                      '&lharul;': '⥪',
                      '&lhblk;': '▄',
                      '&ljcy;': 'љ',
                      '&ll;': '≪',
                      '&llarr;': '⇇',
                      '&llcorner;': '⌞',
                      '&llhard;': '⥫',
                      '&lltri;': '◺',
                      '&lmidot;': 'ŀ',
                      '&lmoust;': '⎰',
                      '&lmoustache;': '⎰',
                      '&lnE;': '≨',
                      '&lnap;': '⪉',
                      '&lnapprox;': '⪉',
                      '&lne;': '⪇',
                      '&lneq;': '⪇',
                      '&lneqq;': '≨',
                      '&lnsim;': '⋦',
                      '&loang;': '⟬',
                      '&loarr;': '⇽',
                      '&lobrk;': '⟦',
                      '&longleftarrow;': '⟵',
                      '&longleftrightarrow;': '⟷',
                      '&longmapsto;': '⟼',
                      '&longrightarrow;': '⟶',
                      '&looparrowleft;': '↫',
                      '&looparrowright;': '↬',
                      '&lopar;': '⦅',
                      '&lopf;': '𝕝',
                      '&loplus;': '⨭',
                      '&lotimes;': '⨴',
                      '&lowast;': '∗',
                      '&lowbar;': '_',
                      '&loz;': '◊',
                      '&lozenge;': '◊',
                      '&lozf;': '⧫',
                      '&lpar;': '(',
                      '&lparlt;': '⦓',
                      '&lrarr;': '⇆',
                      '&lrcorner;': '⌟',
                      '&lrhar;': '⇋',
                      '&lrhard;': '⥭',
                      '&lrm;': '‎',
                      '&lrtri;': '⊿',
                      '&lsaquo;': '‹',
                      '&lscr;': '𝓁',
                      '&lsh;': '↰',
                      '&lsim;': '≲',
                      '&lsime;': '⪍',
                      '&lsimg;': '⪏',
                      '&lsqb;': '[',
                      '&lsquo;': '‘',
                      '&lsquor;': '‚',
                      '&lstrok;': 'ł',
                      '&lt': '<',
                      '&lt;': '<',
                      '&ltcc;': '⪦',
                      '&ltcir;': '⩹',
                      '&ltdot;': '⋖',
                      '&lthree;': '⋋',
                      '&ltimes;': '⋉',
                      '&ltlarr;': '⥶',
                      '&ltquest;': '⩻',
                      '&ltrPar;': '⦖',
                      '&ltri;': '◃',
                      '&ltrie;': '⊴',
                      '&ltrif;': '◂',
                      '&lurdshar;': '⥊',
                      '&luruhar;': '⥦',
                      '&lvertneqq;': '≨︀',
                      '&lvnE;': '≨︀',
                      '&mDDot;': '∺',
                      '&macr': '¯',
                      '&macr;': '¯',
                      '&male;': '♂',
                      '&malt;': '✠',
                      '&maltese;': '✠',
                      '&map;': '↦',
                      '&mapsto;': '↦',
                      '&mapstodown;': '↧',
                      '&mapstoleft;': '↤',
                      '&mapstoup;': '↥',
                      '&marker;': '▮',
                      '&mcomma;': '⨩',
                      '&mcy;': 'м',
                      '&mdash;': '—',
                      '&measuredangle;': '∡',
                      '&mfr;': '𝔪',
                      '&mho;': '℧',
                      '&micro': 'µ',
                      '&micro;': 'µ',
                      '&mid;': '∣',
                      '&midast;': '*',
                      '&midcir;': '⫰',
                      '&middot': '·',
                      '&middot;': '·',
                      '&minus;': '−',
                      '&minusb;': '⊟',
                      '&minusd;': '∸',
                      '&minusdu;': '⨪',
                      '&mlcp;': '⫛',
                      '&mldr;': '…',
                      '&mnplus;': '∓',
                      '&models;': '⊧',
                      '&mopf;': '𝕞',
                      '&mp;': '∓',
                      '&mscr;': '𝓂',
                      '&mstpos;': '∾',
                      '&mu;': 'μ',
                      '&multimap;': '⊸',
                      '&mumap;': '⊸',
                      '&nGg;': '⋙̸',
                      '&nGt;': '≫⃒',
                      '&nGtv;': '≫̸',
                      '&nLeftarrow;': '⇍',
                      '&nLeftrightarrow;': '⇎',
                      '&nLl;': '⋘̸',
                      '&nLt;': '≪⃒',
                      '&nLtv;': '≪̸',
                      '&nRightarrow;': '⇏',
                      '&nVDash;': '⊯',
                      '&nVdash;': '⊮',
                      '&nabla;': '∇',
                      '&nacute;': 'ń',
                      '&nang;': '∠⃒',
                      '&nap;': '≉',
                      '&napE;': '⩰̸',
                      '&napid;': '≋̸',
                      '&napos;': 'ŉ',
                      '&napprox;': '≉',
                      '&natur;': '♮',
                      '&natural;': '♮',
                      '&naturals;': 'ℕ',
                      '&nbsp': ' ',
                      '&nbsp;': ' ',
                      '&nbump;': '≎̸',
                      '&nbumpe;': '≏̸',
                      '&ncap;': '⩃',
                      '&ncaron;': 'ň',
                      '&ncedil;': 'ņ',
                      '&ncong;': '≇',
                      '&ncongdot;': '⩭̸',
                      '&ncup;': '⩂',
                      '&ncy;': 'н',
                      '&ndash;': '–',
                      '&ne;': '≠',
                      '&neArr;': '⇗',
                      '&nearhk;': '⤤',
                      '&nearr;': '↗',
                      '&nearrow;': '↗',
                      '&nedot;': '≐̸',
                      '&nequiv;': '≢',
                      '&nesear;': '⤨',
                      '&nesim;': '≂̸',
                      '&nexist;': '∄',
                      '&nexists;': '∄',
                      '&nfr;': '𝔫',
                      '&ngE;': '≧̸',
                      '&nge;': '≱',
                      '&ngeq;': '≱',
                      '&ngeqq;': '≧̸',
                      '&ngeqslant;': '⩾̸',
                      '&nges;': '⩾̸',
                      '&ngsim;': '≵',
                      '&ngt;': '≯',
                      '&ngtr;': '≯',
                      '&nhArr;': '⇎',
                      '&nharr;': '↮',
                      '&nhpar;': '⫲',
                      '&ni;': '∋',
                      '&nis;': '⋼',
                      '&nisd;': '⋺',
                      '&niv;': '∋',
                      '&njcy;': 'њ',
                      '&nlArr;': '⇍',
                      '&nlE;': '≦̸',
                      '&nlarr;': '↚',
                      '&nldr;': '‥',
                      '&nle;': '≰',
                      '&nleftarrow;': '↚',
                      '&nleftrightarrow;': '↮',
                      '&nleq;': '≰',
                      '&nleqq;': '≦̸',
                      '&nleqslant;': '⩽̸',
                      '&nles;': '⩽̸',
                      '&nless;': '≮',
                      '&nlsim;': '≴',
                      '&nlt;': '≮',
                      '&nltri;': '⋪',
                      '&nltrie;': '⋬',
                      '&nmid;': '∤',
                      '&nopf;': '𝕟',
                      '&not': '¬',
                      '&not;': '¬',
                      '&notin;': '∉',
                      '&notinE;': '⋹̸',
                      '&notindot;': '⋵̸',
                      '&notinva;': '∉',
                      '&notinvb;': '⋷',
                      '&notinvc;': '⋶',
                      '&notni;': '∌',
                      '&notniva;': '∌',
                      '&notnivb;': '⋾',
                      '&notnivc;': '⋽',
                      '&npar;': '∦',
                      '&nparallel;': '∦',
                      '&nparsl;': '⫽⃥',
                      '&npart;': '∂̸',
                      '&npolint;': '⨔',
                      '&npr;': '⊀',
                      '&nprcue;': '⋠',
                      '&npre;': '⪯̸',
                      '&nprec;': '⊀',
                      '&npreceq;': '⪯̸',
                      '&nrArr;': '⇏',
                      '&nrarr;': '↛',
                      '&nrarrc;': '⤳̸',
                      '&nrarrw;': '↝̸',
                      '&nrightarrow;': '↛',
                      '&nrtri;': '⋫',
                      '&nrtrie;': '⋭',
                      '&nsc;': '⊁',
                      '&nsccue;': '⋡',
                      '&nsce;': '⪰̸',
                      '&nscr;': '𝓃',
                      '&nshortmid;': '∤',
                      '&nshortparallel;': '∦',
                      '&nsim;': '≁',
                      '&nsime;': '≄',
                      '&nsimeq;': '≄',
                      '&nsmid;': '∤',
                      '&nspar;': '∦',
                      '&nsqsube;': '⋢',
                      '&nsqsupe;': '⋣',
                      '&nsub;': '⊄',
                      '&nsubE;': '⫅̸',
                      '&nsube;': '⊈',
                      '&nsubset;': '⊂⃒',
                      '&nsubseteq;': '⊈',
                      '&nsubseteqq;': '⫅̸',
                      '&nsucc;': '⊁',
                      '&nsucceq;': '⪰̸',
                      '&nsup;': '⊅',
                      '&nsupE;': '⫆̸',
                      '&nsupe;': '⊉',
                      '&nsupset;': '⊃⃒',
                      '&nsupseteq;': '⊉',
                      '&nsupseteqq;': '⫆̸',
                      '&ntgl;': '≹',
                      '&ntilde': 'ñ',
                      '&ntilde;': 'ñ',
                      '&ntlg;': '≸',
                      '&ntriangleleft;': '⋪',
                      '&ntrianglelefteq;': '⋬',
                      '&ntriangleright;': '⋫',
                      '&ntrianglerighteq;': '⋭',
                      '&nu;': 'ν',
                      '&num;': '#',
                      '&numero;': '№',
                      '&numsp;': ' ',
                      '&nvDash;': '⊭',
                      '&nvHarr;': '⤄',
                      '&nvap;': '≍⃒',
                      '&nvdash;': '⊬',
                      '&nvge;': '≥⃒',
                      '&nvgt;': '>⃒',
                      '&nvinfin;': '⧞',
                      '&nvlArr;': '⤂',
                      '&nvle;': '≤⃒',
                      '&nvlt;': '<⃒',
                      '&nvltrie;': '⊴⃒',
                      '&nvrArr;': '⤃',
                      '&nvrtrie;': '⊵⃒',
                      '&nvsim;': '∼⃒',
                      '&nwArr;': '⇖',
                      '&nwarhk;': '⤣',
                      '&nwarr;': '↖',
                      '&nwarrow;': '↖',
                      '&nwnear;': '⤧',
                      '&oS;': 'Ⓢ',
                      '&oacute': 'ó',
                      '&oacute;': 'ó',
                      '&oast;': '⊛',
                      '&ocir;': '⊚',
                      '&ocirc': 'ô',
                      '&ocirc;': 'ô',
                      '&ocy;': 'о',
                      '&odash;': '⊝',
                      '&odblac;': 'ő',
                      '&odiv;': '⨸',
                      '&odot;': '⊙',
                      '&odsold;': '⦼',
                      '&oelig;': 'œ',
                      '&ofcir;': '⦿',
                      '&ofr;': '𝔬',
                      '&ogon;': '˛',
                      '&ograve': 'ò',
                      '&ograve;': 'ò',
                      '&ogt;': '⧁',
                      '&ohbar;': '⦵',
                      '&ohm;': 'Ω',
                      '&oint;': '∮',
                      '&olarr;': '↺',
                      '&olcir;': '⦾',
                      '&olcross;': '⦻',
                      '&oline;': '‾',
                      '&olt;': '⧀',
                      '&omacr;': 'ō',
                      '&omega;': 'ω',
                      '&omicron;': 'ο',
                      '&omid;': '⦶',
                      '&ominus;': '⊖',
                      '&oopf;': '𝕠',
                      '&opar;': '⦷',
                      '&operp;': '⦹',
                      '&oplus;': '⊕',
                      '&or;': '∨',
                      '&orarr;': '↻',
                      '&ord;': '⩝',
                      '&order;': 'ℴ',
                      '&orderof;': 'ℴ',
                      '&ordf': 'ª',
                      '&ordf;': 'ª',
                      '&ordm': 'º',
                      '&ordm;': 'º',
                      '&origof;': '⊶',
                      '&oror;': '⩖',
                      '&orslope;': '⩗',
                      '&orv;': '⩛',
                      '&oscr;': 'ℴ',
                      '&oslash': 'ø',
                      '&oslash;': 'ø',
                      '&osol;': '⊘',
                      '&otilde': 'õ',
                      '&otilde;': 'õ',
                      '&otimes;': '⊗',
                      '&otimesas;': '⨶',
                      '&ouml': 'ö',
                      '&ouml;': 'ö',
                      '&ovbar;': '⌽',
                      '&par;': '∥',
                      '&para': '¶',
                      '&para;': '¶',
                      '&parallel;': '∥',
                      '&parsim;': '⫳',
                      '&parsl;': '⫽',
                      '&part;': '∂',
                      '&pcy;': 'п',
                      '&percnt;': '%',
                      '&period;': '.',
                      '&permil;': '‰',
                      '&perp;': '⊥',
                      '&pertenk;': '‱',
                      '&pfr;': '𝔭',
                      '&phi;': 'φ',
                      '&phiv;': 'ϕ',
                      '&phmmat;': 'ℳ',
                      '&phone;': '☎',
                      '&pi;': 'π',
                      '&pitchfork;': '⋔',
                      '&piv;': 'ϖ',
                      '&planck;': 'ℏ',
                      '&planckh;': 'ℎ',
                      '&plankv;': 'ℏ',
                      '&plus;': '+',
                      '&plusacir;': '⨣',
                      '&plusb;': '⊞',
                      '&pluscir;': '⨢',
                      '&plusdo;': '∔',
                      '&plusdu;': '⨥',
                      '&pluse;': '⩲',
                      '&plusmn': '±',
                      '&plusmn;': '±',
                      '&plussim;': '⨦',
                      '&plustwo;': '⨧',
                      '&pm;': '±',
                      '&pointint;': '⨕',
                      '&popf;': '𝕡',
                      '&pound': '£',
                      '&pound;': '£',
                      '&pr;': '≺',
                      '&prE;': '⪳',
                      '&prap;': '⪷',
                      '&prcue;': '≼',
                      '&pre;': '⪯',
                      '&prec;': '≺',
                      '&precapprox;': '⪷',
                      '&preccurlyeq;': '≼',
                      '&preceq;': '⪯',
                      '&precnapprox;': '⪹',
                      '&precneqq;': '⪵',
                      '&precnsim;': '⋨',
                      '&precsim;': '≾',
                      '&prime;': '′',
                      '&primes;': 'ℙ',
                      '&prnE;': '⪵',
                      '&prnap;': '⪹',
                      '&prnsim;': '⋨',
                      '&prod;': '∏',
                      '&profalar;': '⌮',
                      '&profline;': '⌒',
                      '&profsurf;': '⌓',
                      '&prop;': '∝',
                      '&propto;': '∝',
                      '&prsim;': '≾',
                      '&prurel;': '⊰',
                      '&pscr;': '𝓅',
                      '&psi;': 'ψ',
                      '&puncsp;': ' ',
                      '&qfr;': '𝔮',
                      '&qint;': '⨌',
                      '&qopf;': '𝕢',
                      '&qprime;': '⁗',
                      '&qscr;': '𝓆',
                      '&quaternions;': 'ℍ',
                      '&quatint;': '⨖',
                      '&quest;': '?',
                      '&questeq;': '≟',
                      '&quot': '"',
                      '&quot;': '"',
                      '&rAarr;': '⇛',
                      '&rArr;': '⇒',
                      '&rAtail;': '⤜',
                      '&rBarr;': '⤏',
                      '&rHar;': '⥤',
                      '&race;': '∽̱',
                      '&racute;': 'ŕ',
                      '&radic;': '√',
                      '&raemptyv;': '⦳',
                      '&rang;': '⟩',
                      '&rangd;': '⦒',
                      '&range;': '⦥',
                      '&rangle;': '⟩',
                      '&raquo': '»',
                      '&raquo;': '»',
                      '&rarr;': '→',
                      '&rarrap;': '⥵',
                      '&rarrb;': '⇥',
                      '&rarrbfs;': '⤠',
                      '&rarrc;': '⤳',
                      '&rarrfs;': '⤞',
                      '&rarrhk;': '↪',
                      '&rarrlp;': '↬',
                      '&rarrpl;': '⥅',
                      '&rarrsim;': '⥴',
                      '&rarrtl;': '↣',
                      '&rarrw;': '↝',
                      '&ratail;': '⤚',
                      '&ratio;': '∶',
                      '&rationals;': 'ℚ',
                      '&rbarr;': '⤍',
                      '&rbbrk;': '❳',
                      '&rbrace;': '}',
                      '&rbrack;': ']',
                      '&rbrke;': '⦌',
                      '&rbrksld;': '⦎',
                      '&rbrkslu;': '⦐',
                      '&rcaron;': 'ř',
                      '&rcedil;': 'ŗ',
                      '&rceil;': '⌉',
                      '&rcub;': '}',
                      '&rcy;': 'р',
                      '&rdca;': '⤷',
                      '&rdldhar;': '⥩',
                      '&rdquo;': '”',
                      '&rdquor;': '”',
                      '&rdsh;': '↳',
                      '&real;': 'ℜ',
                      '&realine;': 'ℛ',
                      '&realpart;': 'ℜ',
                      '&reals;': 'ℝ',
                      '&rect;': '▭',
                      '&reg': '®',
                      '&reg;': '®',
                      '&rfisht;': '⥽',
                      '&rfloor;': '⌋',
                      '&rfr;': '𝔯',
                      '&rhard;': '⇁',
                      '&rharu;': '⇀',
                      '&rharul;': '⥬',
                      '&rho;': 'ρ',
                      '&rhov;': 'ϱ',
                      '&rightarrow;': '→',
                      '&rightarrowtail;': '↣',
                      '&rightharpoondown;': '⇁',
                      '&rightharpoonup;': '⇀',
                      '&rightleftarrows;': '⇄',
                      '&rightleftharpoons;': '⇌',
                      '&rightrightarrows;': '⇉',
                      '&rightsquigarrow;': '↝',
                      '&rightthreetimes;': '⋌',
                      '&ring;': '˚',
                      '&risingdotseq;': '≓',
                      '&rlarr;': '⇄',
                      '&rlhar;': '⇌',
                      '&rlm;': '‏',
                      '&rmoust;': '⎱',
                      '&rmoustache;': '⎱',
                      '&rnmid;': '⫮',
                      '&roang;': '⟭',
                      '&roarr;': '⇾',
                      '&robrk;': '⟧',
                      '&ropar;': '⦆',
                      '&ropf;': '𝕣',
                      '&roplus;': '⨮',
                      '&rotimes;': '⨵',
                      '&rpar;': ')',
                      '&rpargt;': '⦔',
                      '&rppolint;': '⨒',
                      '&rrarr;': '⇉',
                      '&rsaquo;': '›',
                      '&rscr;': '𝓇',
                      '&rsh;': '↱',
                      '&rsqb;': ']',
                      '&rsquo;': '’',
                      '&rsquor;': '’',
                      '&rthree;': '⋌',
                      '&rtimes;': '⋊',
                      '&rtri;': '▹',
                      '&rtrie;': '⊵',
                      '&rtrif;': '▸',
                      '&rtriltri;': '⧎',
                      '&ruluhar;': '⥨',
                      '&rx;': '℞',
                      '&sacute;': 'ś',
                      '&sbquo;': '‚',
                      '&sc;': '≻',
                      '&scE;': '⪴',
                      '&scap;': '⪸',
                      '&scaron;': 'š',
                      '&sccue;': '≽',
                      '&sce;': '⪰',
                      '&scedil;': 'ş',
                      '&scirc;': 'ŝ',
                      '&scnE;': '⪶',
                      '&scnap;': '⪺',
                      '&scnsim;': '⋩',
                      '&scpolint;': '⨓',
                      '&scsim;': '≿',
                      '&scy;': 'с',
                      '&sdot;': '⋅',
                      '&sdotb;': '⊡',
                      '&sdote;': '⩦',
                      '&seArr;': '⇘',
                      '&searhk;': '⤥',
                      '&searr;': '↘',
                      '&searrow;': '↘',
                      '&sect': '§',
                      '&sect;': '§',
                      '&semi;': ';',
                      '&seswar;': '⤩',
                      '&setminus;': '∖',
                      '&setmn;': '∖',
                      '&sext;': '✶',
                      '&sfr;': '𝔰',
                      '&sfrown;': '⌢',
                      '&sharp;': '♯',
                      '&shchcy;': 'щ',
                      '&shcy;': 'ш',
                      '&shortmid;': '∣',
                      '&shortparallel;': '∥',
                      '&shy': '­',
                      '&shy;': '­',
                      '&sigma;': 'σ',
                      '&sigmaf;': 'ς',
                      '&sigmav;': 'ς',
                      '&sim;': '∼',
                      '&simdot;': '⩪',
                      '&sime;': '≃',
                      '&simeq;': '≃',
                      '&simg;': '⪞',
                      '&simgE;': '⪠',
                      '&siml;': '⪝',
                      '&simlE;': '⪟',
                      '&simne;': '≆',
                      '&simplus;': '⨤',
                      '&simrarr;': '⥲',
                      '&slarr;': '←',
                      '&smallsetminus;': '∖',
                      '&smashp;': '⨳',
                      '&smeparsl;': '⧤',
                      '&smid;': '∣',
                      '&smile;': '⌣',
                      '&smt;': '⪪',
                      '&smte;': '⪬',
                      '&smtes;': '⪬︀',
                      '&softcy;': 'ь',
                      '&sol;': '/',
                      '&solb;': '⧄',
                      '&solbar;': '⌿',
                      '&sopf;': '𝕤',
                      '&spades;': '♠',
                      '&spadesuit;': '♠',
                      '&spar;': '∥',
                      '&sqcap;': '⊓',
                      '&sqcaps;': '⊓︀',
                      '&sqcup;': '⊔',
                      '&sqcups;': '⊔︀',
                      '&sqsub;': '⊏',
                      '&sqsube;': '⊑',
                      '&sqsubset;': '⊏',
                      '&sqsubseteq;': '⊑',
                      '&sqsup;': '⊐',
                      '&sqsupe;': '⊒',
                      '&sqsupset;': '⊐',
                      '&sqsupseteq;': '⊒',
                      '&squ;': '□',
                      '&square;': '□',
                      '&squarf;': '▪',
                      '&squf;': '▪',
                      '&srarr;': '→',
                      '&sscr;': '𝓈',
                      '&ssetmn;': '∖',
                      '&ssmile;': '⌣',
                      '&sstarf;': '⋆',
                      '&star;': '☆',
                      '&starf;': '★',
                      '&straightepsilon;': 'ϵ',
                      '&straightphi;': 'ϕ',
                      '&strns;': '¯',
                      '&sub;': '⊂',
                      '&subE;': '⫅',
                      '&subdot;': '⪽',
                      '&sube;': '⊆',
                      '&subedot;': '⫃',
                      '&submult;': '⫁',
                      '&subnE;': '⫋',
                      '&subne;': '⊊',
                      '&subplus;': '⪿',
                      '&subrarr;': '⥹',
                      '&subset;': '⊂',
                      '&subseteq;': '⊆',
                      '&subseteqq;': '⫅',
                      '&subsetneq;': '⊊',
                      '&subsetneqq;': '⫋',
                      '&subsim;': '⫇',
                      '&subsub;': '⫕',
                      '&subsup;': '⫓',
                      '&succ;': '≻',
                      '&succapprox;': '⪸',
                      '&succcurlyeq;': '≽',
                      '&succeq;': '⪰',
                      '&succnapprox;': '⪺',
                      '&succneqq;': '⪶',
                      '&succnsim;': '⋩',
                      '&succsim;': '≿',
                      '&sum;': '∑',
                      '&sung;': '♪',
                      '&sup1': '¹',
                      '&sup1;': '¹',
                      '&sup2': '²',
                      '&sup2;': '²',
                      '&sup3': '³',
                      '&sup3;': '³',
                      '&sup;': '⊃',
                      '&supE;': '⫆',
                      '&supdot;': '⪾',
                      '&supdsub;': '⫘',
                      '&supe;': '⊇',
                      '&supedot;': '⫄',
                      '&suphsol;': '⟉',
                      '&suphsub;': '⫗',
                      '&suplarr;': '⥻',
                      '&supmult;': '⫂',
                      '&supnE;': '⫌',
                      '&supne;': '⊋',
                      '&supplus;': '⫀',
                      '&supset;': '⊃',
                      '&supseteq;': '⊇',
                      '&supseteqq;': '⫆',
                      '&supsetneq;': '⊋',
                      '&supsetneqq;': '⫌',
                      '&supsim;': '⫈',
                      '&supsub;': '⫔',
                      '&supsup;': '⫖',
                      '&swArr;': '⇙',
                      '&swarhk;': '⤦',
                      '&swarr;': '↙',
                      '&swarrow;': '↙',
                      '&swnwar;': '⤪',
                      '&szlig': 'ß',
                      '&szlig;': 'ß',
                      '&target;': '⌖',
                      '&tau;': 'τ',
                      '&tbrk;': '⎴',
                      '&tcaron;': 'ť',
                      '&tcedil;': 'ţ',
                      '&tcy;': 'т',
                      '&tdot;': '⃛',
                      '&telrec;': '⌕',
                      '&tfr;': '𝔱',
                      '&there4;': '∴',
                      '&therefore;': '∴',
                      '&theta;': 'θ',
                      '&thetasym;': 'ϑ',
                      '&thetav;': 'ϑ',
                      '&thickapprox;': '≈',
                      '&thicksim;': '∼',
                      '&thinsp;': ' ',
                      '&thkap;': '≈',
                      '&thksim;': '∼',
                      '&thorn': 'þ',
                      '&thorn;': 'þ',
                      '&tilde;': '˜',
                      '&times': '×',
                      '&times;': '×',
                      '&timesb;': '⊠',
                      '&timesbar;': '⨱',
                      '&timesd;': '⨰',
                      '&tint;': '∭',
                      '&toea;': '⤨',
                      '&top;': '⊤',
                      '&topbot;': '⌶',
                      '&topcir;': '⫱',
                      '&topf;': '𝕥',
                      '&topfork;': '⫚',
                      '&tosa;': '⤩',
                      '&tprime;': '‴',
                      '&trade;': '™',
                      '&triangle;': '▵',
                      '&triangledown;': '▿',
                      '&triangleleft;': '◃',
                      '&trianglelefteq;': '⊴',
                      '&triangleq;': '≜',
                      '&triangleright;': '▹',
                      '&trianglerighteq;': '⊵',
                      '&tridot;': '◬',
                      '&trie;': '≜',
                      '&triminus;': '⨺',
                      '&triplus;': '⨹',
                      '&trisb;': '⧍',
                      '&tritime;': '⨻',
                      '&trpezium;': '⏢',
                      '&tscr;': '𝓉',
                      '&tscy;': 'ц',
                      '&tshcy;': 'ћ',
                      '&tstrok;': 'ŧ',
                      '&twixt;': '≬',
                      '&twoheadleftarrow;': '↞',
                      '&twoheadrightarrow;': '↠',
                      '&uArr;': '⇑',
                      '&uHar;': '⥣',
                      '&uacute': 'ú',
                      '&uacute;': 'ú',
                      '&uarr;': '↑',
                      '&ubrcy;': 'ў',
                      '&ubreve;': 'ŭ',
                      '&ucirc': 'û',
                      '&ucirc;': 'û',
                      '&ucy;': 'у',
                      '&udarr;': '⇅',
                      '&udblac;': 'ű',
                      '&udhar;': '⥮',
                      '&ufisht;': '⥾',
                      '&ufr;': '𝔲',
                      '&ugrave': 'ù',
                      '&ugrave;': 'ù',
                      '&uharl;': '↿',
                      '&uharr;': '↾',
                      '&uhblk;': '▀',
                      '&ulcorn;': '⌜',
                      '&ulcorner;': '⌜',
                      '&ulcrop;': '⌏',
                      '&ultri;': '◸',
                      '&umacr;': 'ū',
                      '&uml': '¨',
                      '&uml;': '¨',
                      '&uogon;': 'ų',
                      '&uopf;': '𝕦',
                      '&uparrow;': '↑',
                      '&updownarrow;': '↕',
                      '&upharpoonleft;': '↿',
                      '&upharpoonright;': '↾',
                      '&uplus;': '⊎',
                      '&upsi;': 'υ',
                      '&upsih;': 'ϒ',
                      '&upsilon;': 'υ',
                      '&upuparrows;': '⇈',
                      '&urcorn;': '⌝',
                      '&urcorner;': '⌝',
                      '&urcrop;': '⌎',
                      '&uring;': 'ů',
                      '&urtri;': '◹',
                      '&uscr;': '𝓊',
                      '&utdot;': '⋰',
                      '&utilde;': 'ũ',
                      '&utri;': '▵',
                      '&utrif;': '▴',
                      '&uuarr;': '⇈',
                      '&uuml': 'ü',
                      '&uuml;': 'ü',
                      '&uwangle;': '⦧',
                      '&vArr;': '⇕',
                      '&vBar;': '⫨',
                      '&vBarv;': '⫩',
                      '&vDash;': '⊨',
                      '&vangrt;': '⦜',
                      '&varepsilon;': 'ϵ',
                      '&varkappa;': 'ϰ',
                      '&varnothing;': '∅',
                      '&varphi;': 'ϕ',
                      '&varpi;': 'ϖ',
                      '&varpropto;': '∝',
                      '&varr;': '↕',
                      '&varrho;': 'ϱ',
                      '&varsigma;': 'ς',
                      '&varsubsetneq;': '⊊︀',
                      '&varsubsetneqq;': '⫋︀',
                      '&varsupsetneq;': '⊋︀',
                      '&varsupsetneqq;': '⫌︀',
                      '&vartheta;': 'ϑ',
                      '&vartriangleleft;': '⊲',
                      '&vartriangleright;': '⊳',
                      '&vcy;': 'в',
                      '&vdash;': '⊢',
                      '&vee;': '∨',
                      '&veebar;': '⊻',
                      '&veeeq;': '≚',
                      '&vellip;': '⋮',
                      '&verbar;': '|',
                      '&vert;': '|',
                      '&vfr;': '𝔳',
                      '&vltri;': '⊲',
                      '&vnsub;': '⊂⃒',
                      '&vnsup;': '⊃⃒',
                      '&vopf;': '𝕧',
                      '&vprop;': '∝',
                      '&vrtri;': '⊳',
                      '&vscr;': '𝓋',
                      '&vsubnE;': '⫋︀',
                      '&vsubne;': '⊊︀',
                      '&vsupnE;': '⫌︀',
                      '&vsupne;': '⊋︀',
                      '&vzigzag;': '⦚',
                      '&wcirc;': 'ŵ',
                      '&wedbar;': '⩟',
                      '&wedge;': '∧',
                      '&wedgeq;': '≙',
                      '&weierp;': '℘',
                      '&wfr;': '𝔴',
                      '&wopf;': '𝕨',
                      '&wp;': '℘',
                      '&wr;': '≀',
                      '&wreath;': '≀',
                      '&wscr;': '𝓌',
                      '&xcap;': '⋂',
                      '&xcirc;': '◯',
                      '&xcup;': '⋃',
                      '&xdtri;': '▽',
                      '&xfr;': '𝔵',
                      '&xhArr;': '⟺',
                      '&xharr;': '⟷',
                      '&xi;': 'ξ',
                      '&xlArr;': '⟸',
                      '&xlarr;': '⟵',
                      '&xmap;': '⟼',
                      '&xnis;': '⋻',
                      '&xodot;': '⨀',
                      '&xopf;': '𝕩',
                      '&xoplus;': '⨁',
                      '&xotime;': '⨂',
                      '&xrArr;': '⟹',
                      '&xrarr;': '⟶',
                      '&xscr;': '𝓍',
                      '&xsqcup;': '⨆',
                      '&xuplus;': '⨄',
                      '&xutri;': '△',
                      '&xvee;': '⋁',
                      '&xwedge;': '⋀',
                      '&yacute': 'ý',
                      '&yacute;': 'ý',
                      '&yacy;': 'я',
                      '&ycirc;': 'ŷ',
                      '&ycy;': 'ы',
                      '&yen': '¥',
                      '&yen;': '¥',
                      '&yfr;': '𝔶',
                      '&yicy;': 'ї',
                      '&yopf;': '𝕪',
                      '&yscr;': '𝓎',
                      '&yucy;': 'ю',
                      '&yuml': 'ÿ',
                      '&yuml;': 'ÿ',
                      '&zacute;': 'ź',
                      '&zcaron;': 'ž',
                      '&zcy;': 'з',
                      '&zdot;': 'ż',
                      '&zeetrf;': 'ℨ',
                      '&zeta;': 'ζ',
                      '&zfr;': '𝔷',
                      '&zhcy;': 'ж',
                      '&zigrarr;': '⇝',
                      '&zopf;': '𝕫',
                      '&zscr;': '𝓏',
                      '&zwj;': '‍',
                      '&zwnj;': '‌',
                    },
                    characters: {
                      Æ: '&AElig;',
                      '&': '&amp;',
                      Á: '&Aacute;',
                      Ă: '&Abreve;',
                      Â: '&Acirc;',
                      А: '&Acy;',
                      '𝔄': '&Afr;',
                      À: '&Agrave;',
                      Α: '&Alpha;',
                      Ā: '&Amacr;',
                      '⩓': '&And;',
                      Ą: '&Aogon;',
                      '𝔸': '&Aopf;',
                      '⁡': '&af;',
                      Å: '&angst;',
                      '𝒜': '&Ascr;',
                      '≔': '&coloneq;',
                      Ã: '&Atilde;',
                      Ä: '&Auml;',
                      '∖': '&ssetmn;',
                      '⫧': '&Barv;',
                      '⌆': '&doublebarwedge;',
                      Б: '&Bcy;',
                      '∵': '&because;',
                      ℬ: '&bernou;',
                      Β: '&Beta;',
                      '𝔅': '&Bfr;',
                      '𝔹': '&Bopf;',
                      '˘': '&breve;',
                      '≎': '&bump;',
                      Ч: '&CHcy;',
                      '©': '&copy;',
                      Ć: '&Cacute;',
                      '⋒': '&Cap;',
                      ⅅ: '&DD;',
                      ℭ: '&Cfr;',
                      Č: '&Ccaron;',
                      Ç: '&Ccedil;',
                      Ĉ: '&Ccirc;',
                      '∰': '&Cconint;',
                      Ċ: '&Cdot;',
                      '¸': '&cedil;',
                      '·': '&middot;',
                      Χ: '&Chi;',
                      '⊙': '&odot;',
                      '⊖': '&ominus;',
                      '⊕': '&oplus;',
                      '⊗': '&otimes;',
                      '∲': '&cwconint;',
                      '”': '&rdquor;',
                      '’': '&rsquor;',
                      '∷': '&Proportion;',
                      '⩴': '&Colone;',
                      '≡': '&equiv;',
                      '∯': '&DoubleContourIntegral;',
                      '∮': '&oint;',
                      ℂ: '&complexes;',
                      '∐': '&coprod;',
                      '∳': '&awconint;',
                      '⨯': '&Cross;',
                      '𝒞': '&Cscr;',
                      '⋓': '&Cup;',
                      '≍': '&asympeq;',
                      '⤑': '&DDotrahd;',
                      Ђ: '&DJcy;',
                      Ѕ: '&DScy;',
                      Џ: '&DZcy;',
                      '‡': '&ddagger;',
                      '↡': '&Darr;',
                      '⫤': '&DoubleLeftTee;',
                      Ď: '&Dcaron;',
                      Д: '&Dcy;',
                      '∇': '&nabla;',
                      Δ: '&Delta;',
                      '𝔇': '&Dfr;',
                      '´': '&acute;',
                      '˙': '&dot;',
                      '˝': '&dblac;',
                      '`': '&grave;',
                      '˜': '&tilde;',
                      '⋄': '&diamond;',
                      ⅆ: '&dd;',
                      '𝔻': '&Dopf;',
                      '¨': '&uml;',
                      '⃜': '&DotDot;',
                      '≐': '&esdot;',
                      '⇓': '&dArr;',
                      '⇐': '&lArr;',
                      '⇔': '&iff;',
                      '⟸': '&xlArr;',
                      '⟺': '&xhArr;',
                      '⟹': '&xrArr;',
                      '⇒': '&rArr;',
                      '⊨': '&vDash;',
                      '⇑': '&uArr;',
                      '⇕': '&vArr;',
                      '∥': '&spar;',
                      '↓': '&downarrow;',
                      '⤓': '&DownArrowBar;',
                      '⇵': '&duarr;',
                      '̑': '&DownBreve;',
                      '⥐': '&DownLeftRightVector;',
                      '⥞': '&DownLeftTeeVector;',
                      '↽': '&lhard;',
                      '⥖': '&DownLeftVectorBar;',
                      '⥟': '&DownRightTeeVector;',
                      '⇁': '&rightharpoondown;',
                      '⥗': '&DownRightVectorBar;',
                      '⊤': '&top;',
                      '↧': '&mapstodown;',
                      '𝒟': '&Dscr;',
                      Đ: '&Dstrok;',
                      Ŋ: '&ENG;',
                      Ð: '&ETH;',
                      É: '&Eacute;',
                      Ě: '&Ecaron;',
                      Ê: '&Ecirc;',
                      Э: '&Ecy;',
                      Ė: '&Edot;',
                      '𝔈': '&Efr;',
                      È: '&Egrave;',
                      '∈': '&isinv;',
                      Ē: '&Emacr;',
                      '◻': '&EmptySmallSquare;',
                      '▫': '&EmptyVerySmallSquare;',
                      Ę: '&Eogon;',
                      '𝔼': '&Eopf;',
                      Ε: '&Epsilon;',
                      '⩵': '&Equal;',
                      '≂': '&esim;',
                      '⇌': '&rlhar;',
                      ℰ: '&expectation;',
                      '⩳': '&Esim;',
                      Η: '&Eta;',
                      Ë: '&Euml;',
                      '∃': '&exist;',
                      ⅇ: '&exponentiale;',
                      Ф: '&Fcy;',
                      '𝔉': '&Ffr;',
                      '◼': '&FilledSmallSquare;',
                      '▪': '&squf;',
                      '𝔽': '&Fopf;',
                      '∀': '&forall;',
                      ℱ: '&Fscr;',
                      Ѓ: '&GJcy;',
                      '>': '&gt;',
                      Γ: '&Gamma;',
                      Ϝ: '&Gammad;',
                      Ğ: '&Gbreve;',
                      Ģ: '&Gcedil;',
                      Ĝ: '&Gcirc;',
                      Г: '&Gcy;',
                      Ġ: '&Gdot;',
                      '𝔊': '&Gfr;',
                      '⋙': '&ggg;',
                      '𝔾': '&Gopf;',
                      '≥': '&geq;',
                      '⋛': '&gtreqless;',
                      '≧': '&geqq;',
                      '⪢': '&GreaterGreater;',
                      '≷': '&gtrless;',
                      '⩾': '&ges;',
                      '≳': '&gtrsim;',
                      '𝒢': '&Gscr;',
                      '≫': '&gg;',
                      Ъ: '&HARDcy;',
                      ˇ: '&caron;',
                      '^': '&Hat;',
                      Ĥ: '&Hcirc;',
                      ℌ: '&Poincareplane;',
                      ℋ: '&hamilt;',
                      ℍ: '&quaternions;',
                      '─': '&boxh;',
                      Ħ: '&Hstrok;',
                      '≏': '&bumpeq;',
                      Е: '&IEcy;',
                      Ĳ: '&IJlig;',
                      Ё: '&IOcy;',
                      Í: '&Iacute;',
                      Î: '&Icirc;',
                      И: '&Icy;',
                      İ: '&Idot;',
                      ℑ: '&imagpart;',
                      Ì: '&Igrave;',
                      Ī: '&Imacr;',
                      ⅈ: '&ii;',
                      '∬': '&Int;',
                      '∫': '&int;',
                      '⋂': '&xcap;',
                      '⁣': '&ic;',
                      '⁢': '&it;',
                      Į: '&Iogon;',
                      '𝕀': '&Iopf;',
                      Ι: '&Iota;',
                      ℐ: '&imagline;',
                      Ĩ: '&Itilde;',
                      І: '&Iukcy;',
                      Ï: '&Iuml;',
                      Ĵ: '&Jcirc;',
                      Й: '&Jcy;',
                      '𝔍': '&Jfr;',
                      '𝕁': '&Jopf;',
                      '𝒥': '&Jscr;',
                      Ј: '&Jsercy;',
                      Є: '&Jukcy;',
                      Х: '&KHcy;',
                      Ќ: '&KJcy;',
                      Κ: '&Kappa;',
                      Ķ: '&Kcedil;',
                      К: '&Kcy;',
                      '𝔎': '&Kfr;',
                      '𝕂': '&Kopf;',
                      '𝒦': '&Kscr;',
                      Љ: '&LJcy;',
                      '<': '&lt;',
                      Ĺ: '&Lacute;',
                      Λ: '&Lambda;',
                      '⟪': '&Lang;',
                      ℒ: '&lagran;',
                      '↞': '&twoheadleftarrow;',
                      Ľ: '&Lcaron;',
                      Ļ: '&Lcedil;',
                      Л: '&Lcy;',
                      '⟨': '&langle;',
                      '←': '&slarr;',
                      '⇤': '&larrb;',
                      '⇆': '&lrarr;',
                      '⌈': '&lceil;',
                      '⟦': '&lobrk;',
                      '⥡': '&LeftDownTeeVector;',
                      '⇃': '&downharpoonleft;',
                      '⥙': '&LeftDownVectorBar;',
                      '⌊': '&lfloor;',
                      '↔': '&leftrightarrow;',
                      '⥎': '&LeftRightVector;',
                      '⊣': '&dashv;',
                      '↤': '&mapstoleft;',
                      '⥚': '&LeftTeeVector;',
                      '⊲': '&vltri;',
                      '⧏': '&LeftTriangleBar;',
                      '⊴': '&trianglelefteq;',
                      '⥑': '&LeftUpDownVector;',
                      '⥠': '&LeftUpTeeVector;',
                      '↿': '&upharpoonleft;',
                      '⥘': '&LeftUpVectorBar;',
                      '↼': '&lharu;',
                      '⥒': '&LeftVectorBar;',
                      '⋚': '&lesseqgtr;',
                      '≦': '&leqq;',
                      '≶': '&lg;',
                      '⪡': '&LessLess;',
                      '⩽': '&les;',
                      '≲': '&lsim;',
                      '𝔏': '&Lfr;',
                      '⋘': '&Ll;',
                      '⇚': '&lAarr;',
                      Ŀ: '&Lmidot;',
                      '⟵': '&xlarr;',
                      '⟷': '&xharr;',
                      '⟶': '&xrarr;',
                      '𝕃': '&Lopf;',
                      '↙': '&swarrow;',
                      '↘': '&searrow;',
                      '↰': '&lsh;',
                      Ł: '&Lstrok;',
                      '≪': '&ll;',
                      '⤅': '&Map;',
                      М: '&Mcy;',
                      ' ': '&MediumSpace;',
                      ℳ: '&phmmat;',
                      '𝔐': '&Mfr;',
                      '∓': '&mp;',
                      '𝕄': '&Mopf;',
                      Μ: '&Mu;',
                      Њ: '&NJcy;',
                      Ń: '&Nacute;',
                      Ň: '&Ncaron;',
                      Ņ: '&Ncedil;',
                      Н: '&Ncy;',
                      '​': '&ZeroWidthSpace;',
                      '\n': '&NewLine;',
                      '𝔑': '&Nfr;',
                      '⁠': '&NoBreak;',
                      ' ': '&nbsp;',
                      ℕ: '&naturals;',
                      '⫬': '&Not;',
                      '≢': '&nequiv;',
                      '≭': '&NotCupCap;',
                      '∦': '&nspar;',
                      '∉': '&notinva;',
                      '≠': '&ne;',
                      '≂̸': '&nesim;',
                      '∄': '&nexists;',
                      '≯': '&ngtr;',
                      '≱': '&ngeq;',
                      '≧̸': '&ngeqq;',
                      '≫̸': '&nGtv;',
                      '≹': '&ntgl;',
                      '⩾̸': '&nges;',
                      '≵': '&ngsim;',
                      '≎̸': '&nbump;',
                      '≏̸': '&nbumpe;',
                      '⋪': '&ntriangleleft;',
                      '⧏̸': '&NotLeftTriangleBar;',
                      '⋬': '&ntrianglelefteq;',
                      '≮': '&nlt;',
                      '≰': '&nleq;',
                      '≸': '&ntlg;',
                      '≪̸': '&nLtv;',
                      '⩽̸': '&nles;',
                      '≴': '&nlsim;',
                      '⪢̸': '&NotNestedGreaterGreater;',
                      '⪡̸': '&NotNestedLessLess;',
                      '⊀': '&nprec;',
                      '⪯̸': '&npreceq;',
                      '⋠': '&nprcue;',
                      '∌': '&notniva;',
                      '⋫': '&ntriangleright;',
                      '⧐̸': '&NotRightTriangleBar;',
                      '⋭': '&ntrianglerighteq;',
                      '⊏̸': '&NotSquareSubset;',
                      '⋢': '&nsqsube;',
                      '⊐̸': '&NotSquareSuperset;',
                      '⋣': '&nsqsupe;',
                      '⊂⃒': '&vnsub;',
                      '⊈': '&nsubseteq;',
                      '⊁': '&nsucc;',
                      '⪰̸': '&nsucceq;',
                      '⋡': '&nsccue;',
                      '≿̸': '&NotSucceedsTilde;',
                      '⊃⃒': '&vnsup;',
                      '⊉': '&nsupseteq;',
                      '≁': '&nsim;',
                      '≄': '&nsimeq;',
                      '≇': '&ncong;',
                      '≉': '&napprox;',
                      '∤': '&nsmid;',
                      '𝒩': '&Nscr;',
                      Ñ: '&Ntilde;',
                      Ν: '&Nu;',
                      Œ: '&OElig;',
                      Ó: '&Oacute;',
                      Ô: '&Ocirc;',
                      О: '&Ocy;',
                      Ő: '&Odblac;',
                      '𝔒': '&Ofr;',
                      Ò: '&Ograve;',
                      Ō: '&Omacr;',
                      Ω: '&ohm;',
                      Ο: '&Omicron;',
                      '𝕆': '&Oopf;',
                      '“': '&ldquo;',
                      '‘': '&lsquo;',
                      '⩔': '&Or;',
                      '𝒪': '&Oscr;',
                      Ø: '&Oslash;',
                      Õ: '&Otilde;',
                      '⨷': '&Otimes;',
                      Ö: '&Ouml;',
                      '‾': '&oline;',
                      '⏞': '&OverBrace;',
                      '⎴': '&tbrk;',
                      '⏜': '&OverParenthesis;',
                      '∂': '&part;',
                      П: '&Pcy;',
                      '𝔓': '&Pfr;',
                      Φ: '&Phi;',
                      Π: '&Pi;',
                      '±': '&pm;',
                      ℙ: '&primes;',
                      '⪻': '&Pr;',
                      '≺': '&prec;',
                      '⪯': '&preceq;',
                      '≼': '&preccurlyeq;',
                      '≾': '&prsim;',
                      '″': '&Prime;',
                      '∏': '&prod;',
                      '∝': '&vprop;',
                      '𝒫': '&Pscr;',
                      Ψ: '&Psi;',
                      '"': '&quot;',
                      '𝔔': '&Qfr;',
                      ℚ: '&rationals;',
                      '𝒬': '&Qscr;',
                      '⤐': '&drbkarow;',
                      '®': '&reg;',
                      Ŕ: '&Racute;',
                      '⟫': '&Rang;',
                      '↠': '&twoheadrightarrow;',
                      '⤖': '&Rarrtl;',
                      Ř: '&Rcaron;',
                      Ŗ: '&Rcedil;',
                      Р: '&Rcy;',
                      ℜ: '&realpart;',
                      '∋': '&niv;',
                      '⇋': '&lrhar;',
                      '⥯': '&duhar;',
                      Ρ: '&Rho;',
                      '⟩': '&rangle;',
                      '→': '&srarr;',
                      '⇥': '&rarrb;',
                      '⇄': '&rlarr;',
                      '⌉': '&rceil;',
                      '⟧': '&robrk;',
                      '⥝': '&RightDownTeeVector;',
                      '⇂': '&downharpoonright;',
                      '⥕': '&RightDownVectorBar;',
                      '⌋': '&rfloor;',
                      '⊢': '&vdash;',
                      '↦': '&mapsto;',
                      '⥛': '&RightTeeVector;',
                      '⊳': '&vrtri;',
                      '⧐': '&RightTriangleBar;',
                      '⊵': '&trianglerighteq;',
                      '⥏': '&RightUpDownVector;',
                      '⥜': '&RightUpTeeVector;',
                      '↾': '&upharpoonright;',
                      '⥔': '&RightUpVectorBar;',
                      '⇀': '&rightharpoonup;',
                      '⥓': '&RightVectorBar;',
                      ℝ: '&reals;',
                      '⥰': '&RoundImplies;',
                      '⇛': '&rAarr;',
                      ℛ: '&realine;',
                      '↱': '&rsh;',
                      '⧴': '&RuleDelayed;',
                      Щ: '&SHCHcy;',
                      Ш: '&SHcy;',
                      Ь: '&SOFTcy;',
                      Ś: '&Sacute;',
                      '⪼': '&Sc;',
                      Š: '&Scaron;',
                      Ş: '&Scedil;',
                      Ŝ: '&Scirc;',
                      С: '&Scy;',
                      '𝔖': '&Sfr;',
                      '↑': '&uparrow;',
                      Σ: '&Sigma;',
                      '∘': '&compfn;',
                      '𝕊': '&Sopf;',
                      '√': '&radic;',
                      '□': '&square;',
                      '⊓': '&sqcap;',
                      '⊏': '&sqsubset;',
                      '⊑': '&sqsubseteq;',
                      '⊐': '&sqsupset;',
                      '⊒': '&sqsupseteq;',
                      '⊔': '&sqcup;',
                      '𝒮': '&Sscr;',
                      '⋆': '&sstarf;',
                      '⋐': '&Subset;',
                      '⊆': '&subseteq;',
                      '≻': '&succ;',
                      '⪰': '&succeq;',
                      '≽': '&succcurlyeq;',
                      '≿': '&succsim;',
                      '∑': '&sum;',
                      '⋑': '&Supset;',
                      '⊃': '&supset;',
                      '⊇': '&supseteq;',
                      Þ: '&THORN;',
                      '™': '&trade;',
                      Ћ: '&TSHcy;',
                      Ц: '&TScy;',
                      '\t': '&Tab;',
                      Τ: '&Tau;',
                      Ť: '&Tcaron;',
                      Ţ: '&Tcedil;',
                      Т: '&Tcy;',
                      '𝔗': '&Tfr;',
                      '∴': '&therefore;',
                      Θ: '&Theta;',
                      '  ': '&ThickSpace;',
                      ' ': '&thinsp;',
                      '∼': '&thksim;',
                      '≃': '&simeq;',
                      '≅': '&cong;',
                      '≈': '&thkap;',
                      '𝕋': '&Topf;',
                      '⃛': '&tdot;',
                      '𝒯': '&Tscr;',
                      Ŧ: '&Tstrok;',
                      Ú: '&Uacute;',
                      '↟': '&Uarr;',
                      '⥉': '&Uarrocir;',
                      Ў: '&Ubrcy;',
                      Ŭ: '&Ubreve;',
                      Û: '&Ucirc;',
                      У: '&Ucy;',
                      Ű: '&Udblac;',
                      '𝔘': '&Ufr;',
                      Ù: '&Ugrave;',
                      Ū: '&Umacr;',
                      _: '&lowbar;',
                      '⏟': '&UnderBrace;',
                      '⎵': '&bbrk;',
                      '⏝': '&UnderParenthesis;',
                      '⋃': '&xcup;',
                      '⊎': '&uplus;',
                      Ų: '&Uogon;',
                      '𝕌': '&Uopf;',
                      '⤒': '&UpArrowBar;',
                      '⇅': '&udarr;',
                      '↕': '&varr;',
                      '⥮': '&udhar;',
                      '⊥': '&perp;',
                      '↥': '&mapstoup;',
                      '↖': '&nwarrow;',
                      '↗': '&nearrow;',
                      ϒ: '&upsih;',
                      Υ: '&Upsilon;',
                      Ů: '&Uring;',
                      '𝒰': '&Uscr;',
                      Ũ: '&Utilde;',
                      Ü: '&Uuml;',
                      '⊫': '&VDash;',
                      '⫫': '&Vbar;',
                      В: '&Vcy;',
                      '⊩': '&Vdash;',
                      '⫦': '&Vdashl;',
                      '⋁': '&xvee;',
                      '‖': '&Vert;',
                      '∣': '&smid;',
                      '|': '&vert;',
                      '❘': '&VerticalSeparator;',
                      '≀': '&wreath;',
                      ' ': '&hairsp;',
                      '𝔙': '&Vfr;',
                      '𝕍': '&Vopf;',
                      '𝒱': '&Vscr;',
                      '⊪': '&Vvdash;',
                      Ŵ: '&Wcirc;',
                      '⋀': '&xwedge;',
                      '𝔚': '&Wfr;',
                      '𝕎': '&Wopf;',
                      '𝒲': '&Wscr;',
                      '𝔛': '&Xfr;',
                      Ξ: '&Xi;',
                      '𝕏': '&Xopf;',
                      '𝒳': '&Xscr;',
                      Я: '&YAcy;',
                      Ї: '&YIcy;',
                      Ю: '&YUcy;',
                      Ý: '&Yacute;',
                      Ŷ: '&Ycirc;',
                      Ы: '&Ycy;',
                      '𝔜': '&Yfr;',
                      '𝕐': '&Yopf;',
                      '𝒴': '&Yscr;',
                      Ÿ: '&Yuml;',
                      Ж: '&ZHcy;',
                      Ź: '&Zacute;',
                      Ž: '&Zcaron;',
                      З: '&Zcy;',
                      Ż: '&Zdot;',
                      Ζ: '&Zeta;',
                      ℨ: '&zeetrf;',
                      ℤ: '&integers;',
                      '𝒵': '&Zscr;',
                      á: '&aacute;',
                      ă: '&abreve;',
                      '∾': '&mstpos;',
                      '∾̳': '&acE;',
                      '∿': '&acd;',
                      â: '&acirc;',
                      а: '&acy;',
                      æ: '&aelig;',
                      '𝔞': '&afr;',
                      à: '&agrave;',
                      ℵ: '&aleph;',
                      α: '&alpha;',
                      ā: '&amacr;',
                      '⨿': '&amalg;',
                      '∧': '&wedge;',
                      '⩕': '&andand;',
                      '⩜': '&andd;',
                      '⩘': '&andslope;',
                      '⩚': '&andv;',
                      '∠': '&angle;',
                      '⦤': '&ange;',
                      '∡': '&measuredangle;',
                      '⦨': '&angmsdaa;',
                      '⦩': '&angmsdab;',
                      '⦪': '&angmsdac;',
                      '⦫': '&angmsdad;',
                      '⦬': '&angmsdae;',
                      '⦭': '&angmsdaf;',
                      '⦮': '&angmsdag;',
                      '⦯': '&angmsdah;',
                      '∟': '&angrt;',
                      '⊾': '&angrtvb;',
                      '⦝': '&angrtvbd;',
                      '∢': '&angsph;',
                      '⍼': '&angzarr;',
                      ą: '&aogon;',
                      '𝕒': '&aopf;',
                      '⩰': '&apE;',
                      '⩯': '&apacir;',
                      '≊': '&approxeq;',
                      '≋': '&apid;',
                      "'": '&apos;',
                      å: '&aring;',
                      '𝒶': '&ascr;',
                      '*': '&midast;',
                      ã: '&atilde;',
                      ä: '&auml;',
                      '⨑': '&awint;',
                      '⫭': '&bNot;',
                      '≌': '&bcong;',
                      '϶': '&bepsi;',
                      '‵': '&bprime;',
                      '∽': '&bsim;',
                      '⋍': '&bsime;',
                      '⊽': '&barvee;',
                      '⌅': '&barwedge;',
                      '⎶': '&bbrktbrk;',
                      б: '&bcy;',
                      '„': '&ldquor;',
                      '⦰': '&bemptyv;',
                      β: '&beta;',
                      ℶ: '&beth;',
                      '≬': '&twixt;',
                      '𝔟': '&bfr;',
                      '◯': '&xcirc;',
                      '⨀': '&xodot;',
                      '⨁': '&xoplus;',
                      '⨂': '&xotime;',
                      '⨆': '&xsqcup;',
                      '★': '&starf;',
                      '▽': '&xdtri;',
                      '△': '&xutri;',
                      '⨄': '&xuplus;',
                      '⤍': '&rbarr;',
                      '⧫': '&lozf;',
                      '▴': '&utrif;',
                      '▾': '&dtrif;',
                      '◂': '&ltrif;',
                      '▸': '&rtrif;',
                      '␣': '&blank;',
                      '▒': '&blk12;',
                      '░': '&blk14;',
                      '▓': '&blk34;',
                      '█': '&block;',
                      '=⃥': '&bne;',
                      '≡⃥': '&bnequiv;',
                      '⌐': '&bnot;',
                      '𝕓': '&bopf;',
                      '⋈': '&bowtie;',
                      '╗': '&boxDL;',
                      '╔': '&boxDR;',
                      '╖': '&boxDl;',
                      '╓': '&boxDr;',
                      '═': '&boxH;',
                      '╦': '&boxHD;',
                      '╩': '&boxHU;',
                      '╤': '&boxHd;',
                      '╧': '&boxHu;',
                      '╝': '&boxUL;',
                      '╚': '&boxUR;',
                      '╜': '&boxUl;',
                      '╙': '&boxUr;',
                      '║': '&boxV;',
                      '╬': '&boxVH;',
                      '╣': '&boxVL;',
                      '╠': '&boxVR;',
                      '╫': '&boxVh;',
                      '╢': '&boxVl;',
                      '╟': '&boxVr;',
                      '⧉': '&boxbox;',
                      '╕': '&boxdL;',
                      '╒': '&boxdR;',
                      '┐': '&boxdl;',
                      '┌': '&boxdr;',
                      '╥': '&boxhD;',
                      '╨': '&boxhU;',
                      '┬': '&boxhd;',
                      '┴': '&boxhu;',
                      '⊟': '&minusb;',
                      '⊞': '&plusb;',
                      '⊠': '&timesb;',
                      '╛': '&boxuL;',
                      '╘': '&boxuR;',
                      '┘': '&boxul;',
                      '└': '&boxur;',
                      '│': '&boxv;',
                      '╪': '&boxvH;',
                      '╡': '&boxvL;',
                      '╞': '&boxvR;',
                      '┼': '&boxvh;',
                      '┤': '&boxvl;',
                      '├': '&boxvr;',
                      '¦': '&brvbar;',
                      '𝒷': '&bscr;',
                      '⁏': '&bsemi;',
                      '\\': '&bsol;',
                      '⧅': '&bsolb;',
                      '⟈': '&bsolhsub;',
                      '•': '&bullet;',
                      '⪮': '&bumpE;',
                      ć: '&cacute;',
                      '∩': '&cap;',
                      '⩄': '&capand;',
                      '⩉': '&capbrcup;',
                      '⩋': '&capcap;',
                      '⩇': '&capcup;',
                      '⩀': '&capdot;',
                      '∩︀': '&caps;',
                      '⁁': '&caret;',
                      '⩍': '&ccaps;',
                      č: '&ccaron;',
                      ç: '&ccedil;',
                      ĉ: '&ccirc;',
                      '⩌': '&ccups;',
                      '⩐': '&ccupssm;',
                      ċ: '&cdot;',
                      '⦲': '&cemptyv;',
                      '¢': '&cent;',
                      '𝔠': '&cfr;',
                      ч: '&chcy;',
                      '✓': '&checkmark;',
                      χ: '&chi;',
                      '○': '&cir;',
                      '⧃': '&cirE;',
                      ˆ: '&circ;',
                      '≗': '&cire;',
                      '↺': '&olarr;',
                      '↻': '&orarr;',
                      'Ⓢ': '&oS;',
                      '⊛': '&oast;',
                      '⊚': '&ocir;',
                      '⊝': '&odash;',
                      '⨐': '&cirfnint;',
                      '⫯': '&cirmid;',
                      '⧂': '&cirscir;',
                      '♣': '&clubsuit;',
                      ':': '&colon;',
                      ',': '&comma;',
                      '@': '&commat;',
                      '∁': '&complement;',
                      '⩭': '&congdot;',
                      '𝕔': '&copf;',
                      '℗': '&copysr;',
                      '↵': '&crarr;',
                      '✗': '&cross;',
                      '𝒸': '&cscr;',
                      '⫏': '&csub;',
                      '⫑': '&csube;',
                      '⫐': '&csup;',
                      '⫒': '&csupe;',
                      '⋯': '&ctdot;',
                      '⤸': '&cudarrl;',
                      '⤵': '&cudarrr;',
                      '⋞': '&curlyeqprec;',
                      '⋟': '&curlyeqsucc;',
                      '↶': '&curvearrowleft;',
                      '⤽': '&cularrp;',
                      '∪': '&cup;',
                      '⩈': '&cupbrcap;',
                      '⩆': '&cupcap;',
                      '⩊': '&cupcup;',
                      '⊍': '&cupdot;',
                      '⩅': '&cupor;',
                      '∪︀': '&cups;',
                      '↷': '&curvearrowright;',
                      '⤼': '&curarrm;',
                      '⋎': '&cuvee;',
                      '⋏': '&cuwed;',
                      '¤': '&curren;',
                      '∱': '&cwint;',
                      '⌭': '&cylcty;',
                      '⥥': '&dHar;',
                      '†': '&dagger;',
                      ℸ: '&daleth;',
                      '‐': '&hyphen;',
                      '⤏': '&rBarr;',
                      ď: '&dcaron;',
                      д: '&dcy;',
                      '⇊': '&downdownarrows;',
                      '⩷': '&eDDot;',
                      '°': '&deg;',
                      δ: '&delta;',
                      '⦱': '&demptyv;',
                      '⥿': '&dfisht;',
                      '𝔡': '&dfr;',
                      '♦': '&diams;',
                      ϝ: '&gammad;',
                      '⋲': '&disin;',
                      '÷': '&divide;',
                      '⋇': '&divonx;',
                      ђ: '&djcy;',
                      '⌞': '&llcorner;',
                      '⌍': '&dlcrop;',
                      $: '&dollar;',
                      '𝕕': '&dopf;',
                      '≑': '&eDot;',
                      '∸': '&minusd;',
                      '∔': '&plusdo;',
                      '⊡': '&sdotb;',
                      '⌟': '&lrcorner;',
                      '⌌': '&drcrop;',
                      '𝒹': '&dscr;',
                      ѕ: '&dscy;',
                      '⧶': '&dsol;',
                      đ: '&dstrok;',
                      '⋱': '&dtdot;',
                      '▿': '&triangledown;',
                      '⦦': '&dwangle;',
                      џ: '&dzcy;',
                      '⟿': '&dzigrarr;',
                      é: '&eacute;',
                      '⩮': '&easter;',
                      ě: '&ecaron;',
                      '≖': '&eqcirc;',
                      ê: '&ecirc;',
                      '≕': '&eqcolon;',
                      э: '&ecy;',
                      ė: '&edot;',
                      '≒': '&fallingdotseq;',
                      '𝔢': '&efr;',
                      '⪚': '&eg;',
                      è: '&egrave;',
                      '⪖': '&eqslantgtr;',
                      '⪘': '&egsdot;',
                      '⪙': '&el;',
                      '⏧': '&elinters;',
                      ℓ: '&ell;',
                      '⪕': '&eqslantless;',
                      '⪗': '&elsdot;',
                      ē: '&emacr;',
                      '∅': '&varnothing;',
                      ' ': '&emsp13;',
                      ' ': '&emsp14;',
                      ' ': '&emsp;',
                      ŋ: '&eng;',
                      ' ': '&ensp;',
                      ę: '&eogon;',
                      '𝕖': '&eopf;',
                      '⋕': '&epar;',
                      '⧣': '&eparsl;',
                      '⩱': '&eplus;',
                      ε: '&epsilon;',
                      ϵ: '&varepsilon;',
                      '=': '&equals;',
                      '≟': '&questeq;',
                      '⩸': '&equivDD;',
                      '⧥': '&eqvparsl;',
                      '≓': '&risingdotseq;',
                      '⥱': '&erarr;',
                      ℯ: '&escr;',
                      η: '&eta;',
                      ð: '&eth;',
                      ë: '&euml;',
                      '€': '&euro;',
                      '!': '&excl;',
                      ф: '&fcy;',
                      '♀': '&female;',
                      ﬃ: '&ffilig;',
                      ﬀ: '&fflig;',
                      ﬄ: '&ffllig;',
                      '𝔣': '&ffr;',
                      ﬁ: '&filig;',
                      fj: '&fjlig;',
                      '♭': '&flat;',
                      ﬂ: '&fllig;',
                      '▱': '&fltns;',
                      ƒ: '&fnof;',
                      '𝕗': '&fopf;',
                      '⋔': '&pitchfork;',
                      '⫙': '&forkv;',
                      '⨍': '&fpartint;',
                      '½': '&half;',
                      '⅓': '&frac13;',
                      '¼': '&frac14;',
                      '⅕': '&frac15;',
                      '⅙': '&frac16;',
                      '⅛': '&frac18;',
                      '⅔': '&frac23;',
                      '⅖': '&frac25;',
                      '¾': '&frac34;',
                      '⅗': '&frac35;',
                      '⅜': '&frac38;',
                      '⅘': '&frac45;',
                      '⅚': '&frac56;',
                      '⅝': '&frac58;',
                      '⅞': '&frac78;',
                      '⁄': '&frasl;',
                      '⌢': '&sfrown;',
                      '𝒻': '&fscr;',
                      '⪌': '&gtreqqless;',
                      ǵ: '&gacute;',
                      γ: '&gamma;',
                      '⪆': '&gtrapprox;',
                      ğ: '&gbreve;',
                      ĝ: '&gcirc;',
                      г: '&gcy;',
                      ġ: '&gdot;',
                      '⪩': '&gescc;',
                      '⪀': '&gesdot;',
                      '⪂': '&gesdoto;',
                      '⪄': '&gesdotol;',
                      '⋛︀': '&gesl;',
                      '⪔': '&gesles;',
                      '𝔤': '&gfr;',
                      ℷ: '&gimel;',
                      ѓ: '&gjcy;',
                      '⪒': '&glE;',
                      '⪥': '&gla;',
                      '⪤': '&glj;',
                      '≩': '&gneqq;',
                      '⪊': '&gnapprox;',
                      '⪈': '&gneq;',
                      '⋧': '&gnsim;',
                      '𝕘': '&gopf;',
                      ℊ: '&gscr;',
                      '⪎': '&gsime;',
                      '⪐': '&gsiml;',
                      '⪧': '&gtcc;',
                      '⩺': '&gtcir;',
                      '⋗': '&gtrdot;',
                      '⦕': '&gtlPar;',
                      '⩼': '&gtquest;',
                      '⥸': '&gtrarr;',
                      '≩︀': '&gvnE;',
                      ъ: '&hardcy;',
                      '⥈': '&harrcir;',
                      '↭': '&leftrightsquigarrow;',
                      ℏ: '&plankv;',
                      ĥ: '&hcirc;',
                      '♥': '&heartsuit;',
                      '…': '&mldr;',
                      '⊹': '&hercon;',
                      '𝔥': '&hfr;',
                      '⤥': '&searhk;',
                      '⤦': '&swarhk;',
                      '⇿': '&hoarr;',
                      '∻': '&homtht;',
                      '↩': '&larrhk;',
                      '↪': '&rarrhk;',
                      '𝕙': '&hopf;',
                      '―': '&horbar;',
                      '𝒽': '&hscr;',
                      ħ: '&hstrok;',
                      '⁃': '&hybull;',
                      í: '&iacute;',
                      î: '&icirc;',
                      и: '&icy;',
                      е: '&iecy;',
                      '¡': '&iexcl;',
                      '𝔦': '&ifr;',
                      ì: '&igrave;',
                      '⨌': '&qint;',
                      '∭': '&tint;',
                      '⧜': '&iinfin;',
                      '℩': '&iiota;',
                      ĳ: '&ijlig;',
                      ī: '&imacr;',
                      ı: '&inodot;',
                      '⊷': '&imof;',
                      Ƶ: '&imped;',
                      '℅': '&incare;',
                      '∞': '&infin;',
                      '⧝': '&infintie;',
                      '⊺': '&intercal;',
                      '⨗': '&intlarhk;',
                      '⨼': '&iprod;',
                      ё: '&iocy;',
                      į: '&iogon;',
                      '𝕚': '&iopf;',
                      ι: '&iota;',
                      '¿': '&iquest;',
                      '𝒾': '&iscr;',
                      '⋹': '&isinE;',
                      '⋵': '&isindot;',
                      '⋴': '&isins;',
                      '⋳': '&isinsv;',
                      ĩ: '&itilde;',
                      і: '&iukcy;',
                      ï: '&iuml;',
                      ĵ: '&jcirc;',
                      й: '&jcy;',
                      '𝔧': '&jfr;',
                      ȷ: '&jmath;',
                      '𝕛': '&jopf;',
                      '𝒿': '&jscr;',
                      ј: '&jsercy;',
                      є: '&jukcy;',
                      κ: '&kappa;',
                      ϰ: '&varkappa;',
                      ķ: '&kcedil;',
                      к: '&kcy;',
                      '𝔨': '&kfr;',
                      ĸ: '&kgreen;',
                      х: '&khcy;',
                      ќ: '&kjcy;',
                      '𝕜': '&kopf;',
                      '𝓀': '&kscr;',
                      '⤛': '&lAtail;',
                      '⤎': '&lBarr;',
                      '⪋': '&lesseqqgtr;',
                      '⥢': '&lHar;',
                      ĺ: '&lacute;',
                      '⦴': '&laemptyv;',
                      λ: '&lambda;',
                      '⦑': '&langd;',
                      '⪅': '&lessapprox;',
                      '«': '&laquo;',
                      '⤟': '&larrbfs;',
                      '⤝': '&larrfs;',
                      '↫': '&looparrowleft;',
                      '⤹': '&larrpl;',
                      '⥳': '&larrsim;',
                      '↢': '&leftarrowtail;',
                      '⪫': '&lat;',
                      '⤙': '&latail;',
                      '⪭': '&late;',
                      '⪭︀': '&lates;',
                      '⤌': '&lbarr;',
                      '❲': '&lbbrk;',
                      '{': '&lcub;',
                      '[': '&lsqb;',
                      '⦋': '&lbrke;',
                      '⦏': '&lbrksld;',
                      '⦍': '&lbrkslu;',
                      ľ: '&lcaron;',
                      ļ: '&lcedil;',
                      л: '&lcy;',
                      '⤶': '&ldca;',
                      '⥧': '&ldrdhar;',
                      '⥋': '&ldrushar;',
                      '↲': '&ldsh;',
                      '≤': '&leq;',
                      '⇇': '&llarr;',
                      '⋋': '&lthree;',
                      '⪨': '&lescc;',
                      '⩿': '&lesdot;',
                      '⪁': '&lesdoto;',
                      '⪃': '&lesdotor;',
                      '⋚︀': '&lesg;',
                      '⪓': '&lesges;',
                      '⋖': '&ltdot;',
                      '⥼': '&lfisht;',
                      '𝔩': '&lfr;',
                      '⪑': '&lgE;',
                      '⥪': '&lharul;',
                      '▄': '&lhblk;',
                      љ: '&ljcy;',
                      '⥫': '&llhard;',
                      '◺': '&lltri;',
                      ŀ: '&lmidot;',
                      '⎰': '&lmoustache;',
                      '≨': '&lneqq;',
                      '⪉': '&lnapprox;',
                      '⪇': '&lneq;',
                      '⋦': '&lnsim;',
                      '⟬': '&loang;',
                      '⇽': '&loarr;',
                      '⟼': '&xmap;',
                      '↬': '&rarrlp;',
                      '⦅': '&lopar;',
                      '𝕝': '&lopf;',
                      '⨭': '&loplus;',
                      '⨴': '&lotimes;',
                      '∗': '&lowast;',
                      '◊': '&lozenge;',
                      '(': '&lpar;',
                      '⦓': '&lparlt;',
                      '⥭': '&lrhard;',
                      '‎': '&lrm;',
                      '⊿': '&lrtri;',
                      '‹': '&lsaquo;',
                      '𝓁': '&lscr;',
                      '⪍': '&lsime;',
                      '⪏': '&lsimg;',
                      '‚': '&sbquo;',
                      ł: '&lstrok;',
                      '⪦': '&ltcc;',
                      '⩹': '&ltcir;',
                      '⋉': '&ltimes;',
                      '⥶': '&ltlarr;',
                      '⩻': '&ltquest;',
                      '⦖': '&ltrPar;',
                      '◃': '&triangleleft;',
                      '⥊': '&lurdshar;',
                      '⥦': '&luruhar;',
                      '≨︀': '&lvnE;',
                      '∺': '&mDDot;',
                      '¯': '&strns;',
                      '♂': '&male;',
                      '✠': '&maltese;',
                      '▮': '&marker;',
                      '⨩': '&mcomma;',
                      м: '&mcy;',
                      '—': '&mdash;',
                      '𝔪': '&mfr;',
                      '℧': '&mho;',
                      µ: '&micro;',
                      '⫰': '&midcir;',
                      '−': '&minus;',
                      '⨪': '&minusdu;',
                      '⫛': '&mlcp;',
                      '⊧': '&models;',
                      '𝕞': '&mopf;',
                      '𝓂': '&mscr;',
                      μ: '&mu;',
                      '⊸': '&mumap;',
                      '⋙̸': '&nGg;',
                      '≫⃒': '&nGt;',
                      '⇍': '&nlArr;',
                      '⇎': '&nhArr;',
                      '⋘̸': '&nLl;',
                      '≪⃒': '&nLt;',
                      '⇏': '&nrArr;',
                      '⊯': '&nVDash;',
                      '⊮': '&nVdash;',
                      ń: '&nacute;',
                      '∠⃒': '&nang;',
                      '⩰̸': '&napE;',
                      '≋̸': '&napid;',
                      ŉ: '&napos;',
                      '♮': '&natural;',
                      '⩃': '&ncap;',
                      ň: '&ncaron;',
                      ņ: '&ncedil;',
                      '⩭̸': '&ncongdot;',
                      '⩂': '&ncup;',
                      н: '&ncy;',
                      '–': '&ndash;',
                      '⇗': '&neArr;',
                      '⤤': '&nearhk;',
                      '≐̸': '&nedot;',
                      '⤨': '&toea;',
                      '𝔫': '&nfr;',
                      '↮': '&nleftrightarrow;',
                      '⫲': '&nhpar;',
                      '⋼': '&nis;',
                      '⋺': '&nisd;',
                      њ: '&njcy;',
                      '≦̸': '&nleqq;',
                      '↚': '&nleftarrow;',
                      '‥': '&nldr;',
                      '𝕟': '&nopf;',
                      '¬': '&not;',
                      '⋹̸': '&notinE;',
                      '⋵̸': '&notindot;',
                      '⋷': '&notinvb;',
                      '⋶': '&notinvc;',
                      '⋾': '&notnivb;',
                      '⋽': '&notnivc;',
                      '⫽⃥': '&nparsl;',
                      '∂̸': '&npart;',
                      '⨔': '&npolint;',
                      '↛': '&nrightarrow;',
                      '⤳̸': '&nrarrc;',
                      '↝̸': '&nrarrw;',
                      '𝓃': '&nscr;',
                      '⊄': '&nsub;',
                      '⫅̸': '&nsubseteqq;',
                      '⊅': '&nsup;',
                      '⫆̸': '&nsupseteqq;',
                      ñ: '&ntilde;',
                      ν: '&nu;',
                      '#': '&num;',
                      '№': '&numero;',
                      ' ': '&numsp;',
                      '⊭': '&nvDash;',
                      '⤄': '&nvHarr;',
                      '≍⃒': '&nvap;',
                      '⊬': '&nvdash;',
                      '≥⃒': '&nvge;',
                      '>⃒': '&nvgt;',
                      '⧞': '&nvinfin;',
                      '⤂': '&nvlArr;',
                      '≤⃒': '&nvle;',
                      '<⃒': '&nvlt;',
                      '⊴⃒': '&nvltrie;',
                      '⤃': '&nvrArr;',
                      '⊵⃒': '&nvrtrie;',
                      '∼⃒': '&nvsim;',
                      '⇖': '&nwArr;',
                      '⤣': '&nwarhk;',
                      '⤧': '&nwnear;',
                      ó: '&oacute;',
                      ô: '&ocirc;',
                      о: '&ocy;',
                      ő: '&odblac;',
                      '⨸': '&odiv;',
                      '⦼': '&odsold;',
                      œ: '&oelig;',
                      '⦿': '&ofcir;',
                      '𝔬': '&ofr;',
                      '˛': '&ogon;',
                      ò: '&ograve;',
                      '⧁': '&ogt;',
                      '⦵': '&ohbar;',
                      '⦾': '&olcir;',
                      '⦻': '&olcross;',
                      '⧀': '&olt;',
                      ō: '&omacr;',
                      ω: '&omega;',
                      ο: '&omicron;',
                      '⦶': '&omid;',
                      '𝕠': '&oopf;',
                      '⦷': '&opar;',
                      '⦹': '&operp;',
                      '∨': '&vee;',
                      '⩝': '&ord;',
                      ℴ: '&oscr;',
                      ª: '&ordf;',
                      º: '&ordm;',
                      '⊶': '&origof;',
                      '⩖': '&oror;',
                      '⩗': '&orslope;',
                      '⩛': '&orv;',
                      ø: '&oslash;',
                      '⊘': '&osol;',
                      õ: '&otilde;',
                      '⨶': '&otimesas;',
                      ö: '&ouml;',
                      '⌽': '&ovbar;',
                      '¶': '&para;',
                      '⫳': '&parsim;',
                      '⫽': '&parsl;',
                      п: '&pcy;',
                      '%': '&percnt;',
                      '.': '&period;',
                      '‰': '&permil;',
                      '‱': '&pertenk;',
                      '𝔭': '&pfr;',
                      φ: '&phi;',
                      ϕ: '&varphi;',
                      '☎': '&phone;',
                      π: '&pi;',
                      ϖ: '&varpi;',
                      ℎ: '&planckh;',
                      '+': '&plus;',
                      '⨣': '&plusacir;',
                      '⨢': '&pluscir;',
                      '⨥': '&plusdu;',
                      '⩲': '&pluse;',
                      '⨦': '&plussim;',
                      '⨧': '&plustwo;',
                      '⨕': '&pointint;',
                      '𝕡': '&popf;',
                      '£': '&pound;',
                      '⪳': '&prE;',
                      '⪷': '&precapprox;',
                      '⪹': '&prnap;',
                      '⪵': '&prnE;',
                      '⋨': '&prnsim;',
                      '′': '&prime;',
                      '⌮': '&profalar;',
                      '⌒': '&profline;',
                      '⌓': '&profsurf;',
                      '⊰': '&prurel;',
                      '𝓅': '&pscr;',
                      ψ: '&psi;',
                      ' ': '&puncsp;',
                      '𝔮': '&qfr;',
                      '𝕢': '&qopf;',
                      '⁗': '&qprime;',
                      '𝓆': '&qscr;',
                      '⨖': '&quatint;',
                      '?': '&quest;',
                      '⤜': '&rAtail;',
                      '⥤': '&rHar;',
                      '∽̱': '&race;',
                      ŕ: '&racute;',
                      '⦳': '&raemptyv;',
                      '⦒': '&rangd;',
                      '⦥': '&range;',
                      '»': '&raquo;',
                      '⥵': '&rarrap;',
                      '⤠': '&rarrbfs;',
                      '⤳': '&rarrc;',
                      '⤞': '&rarrfs;',
                      '⥅': '&rarrpl;',
                      '⥴': '&rarrsim;',
                      '↣': '&rightarrowtail;',
                      '↝': '&rightsquigarrow;',
                      '⤚': '&ratail;',
                      '∶': '&ratio;',
                      '❳': '&rbbrk;',
                      '}': '&rcub;',
                      ']': '&rsqb;',
                      '⦌': '&rbrke;',
                      '⦎': '&rbrksld;',
                      '⦐': '&rbrkslu;',
                      ř: '&rcaron;',
                      ŗ: '&rcedil;',
                      р: '&rcy;',
                      '⤷': '&rdca;',
                      '⥩': '&rdldhar;',
                      '↳': '&rdsh;',
                      '▭': '&rect;',
                      '⥽': '&rfisht;',
                      '𝔯': '&rfr;',
                      '⥬': '&rharul;',
                      ρ: '&rho;',
                      ϱ: '&varrho;',
                      '⇉': '&rrarr;',
                      '⋌': '&rthree;',
                      '˚': '&ring;',
                      '‏': '&rlm;',
                      '⎱': '&rmoustache;',
                      '⫮': '&rnmid;',
                      '⟭': '&roang;',
                      '⇾': '&roarr;',
                      '⦆': '&ropar;',
                      '𝕣': '&ropf;',
                      '⨮': '&roplus;',
                      '⨵': '&rotimes;',
                      ')': '&rpar;',
                      '⦔': '&rpargt;',
                      '⨒': '&rppolint;',
                      '›': '&rsaquo;',
                      '𝓇': '&rscr;',
                      '⋊': '&rtimes;',
                      '▹': '&triangleright;',
                      '⧎': '&rtriltri;',
                      '⥨': '&ruluhar;',
                      '℞': '&rx;',
                      ś: '&sacute;',
                      '⪴': '&scE;',
                      '⪸': '&succapprox;',
                      š: '&scaron;',
                      ş: '&scedil;',
                      ŝ: '&scirc;',
                      '⪶': '&succneqq;',
                      '⪺': '&succnapprox;',
                      '⋩': '&succnsim;',
                      '⨓': '&scpolint;',
                      с: '&scy;',
                      '⋅': '&sdot;',
                      '⩦': '&sdote;',
                      '⇘': '&seArr;',
                      '§': '&sect;',
                      ';': '&semi;',
                      '⤩': '&tosa;',
                      '✶': '&sext;',
                      '𝔰': '&sfr;',
                      '♯': '&sharp;',
                      щ: '&shchcy;',
                      ш: '&shcy;',
                      '­': '&shy;',
                      σ: '&sigma;',
                      ς: '&varsigma;',
                      '⩪': '&simdot;',
                      '⪞': '&simg;',
                      '⪠': '&simgE;',
                      '⪝': '&siml;',
                      '⪟': '&simlE;',
                      '≆': '&simne;',
                      '⨤': '&simplus;',
                      '⥲': '&simrarr;',
                      '⨳': '&smashp;',
                      '⧤': '&smeparsl;',
                      '⌣': '&ssmile;',
                      '⪪': '&smt;',
                      '⪬': '&smte;',
                      '⪬︀': '&smtes;',
                      ь: '&softcy;',
                      '/': '&sol;',
                      '⧄': '&solb;',
                      '⌿': '&solbar;',
                      '𝕤': '&sopf;',
                      '♠': '&spadesuit;',
                      '⊓︀': '&sqcaps;',
                      '⊔︀': '&sqcups;',
                      '𝓈': '&sscr;',
                      '☆': '&star;',
                      '⊂': '&subset;',
                      '⫅': '&subseteqq;',
                      '⪽': '&subdot;',
                      '⫃': '&subedot;',
                      '⫁': '&submult;',
                      '⫋': '&subsetneqq;',
                      '⊊': '&subsetneq;',
                      '⪿': '&subplus;',
                      '⥹': '&subrarr;',
                      '⫇': '&subsim;',
                      '⫕': '&subsub;',
                      '⫓': '&subsup;',
                      '♪': '&sung;',
                      '¹': '&sup1;',
                      '²': '&sup2;',
                      '³': '&sup3;',
                      '⫆': '&supseteqq;',
                      '⪾': '&supdot;',
                      '⫘': '&supdsub;',
                      '⫄': '&supedot;',
                      '⟉': '&suphsol;',
                      '⫗': '&suphsub;',
                      '⥻': '&suplarr;',
                      '⫂': '&supmult;',
                      '⫌': '&supsetneqq;',
                      '⊋': '&supsetneq;',
                      '⫀': '&supplus;',
                      '⫈': '&supsim;',
                      '⫔': '&supsub;',
                      '⫖': '&supsup;',
                      '⇙': '&swArr;',
                      '⤪': '&swnwar;',
                      ß: '&szlig;',
                      '⌖': '&target;',
                      τ: '&tau;',
                      ť: '&tcaron;',
                      ţ: '&tcedil;',
                      т: '&tcy;',
                      '⌕': '&telrec;',
                      '𝔱': '&tfr;',
                      θ: '&theta;',
                      ϑ: '&vartheta;',
                      þ: '&thorn;',
                      '×': '&times;',
                      '⨱': '&timesbar;',
                      '⨰': '&timesd;',
                      '⌶': '&topbot;',
                      '⫱': '&topcir;',
                      '𝕥': '&topf;',
                      '⫚': '&topfork;',
                      '‴': '&tprime;',
                      '▵': '&utri;',
                      '≜': '&trie;',
                      '◬': '&tridot;',
                      '⨺': '&triminus;',
                      '⨹': '&triplus;',
                      '⧍': '&trisb;',
                      '⨻': '&tritime;',
                      '⏢': '&trpezium;',
                      '𝓉': '&tscr;',
                      ц: '&tscy;',
                      ћ: '&tshcy;',
                      ŧ: '&tstrok;',
                      '⥣': '&uHar;',
                      ú: '&uacute;',
                      ў: '&ubrcy;',
                      ŭ: '&ubreve;',
                      û: '&ucirc;',
                      у: '&ucy;',
                      ű: '&udblac;',
                      '⥾': '&ufisht;',
                      '𝔲': '&ufr;',
                      ù: '&ugrave;',
                      '▀': '&uhblk;',
                      '⌜': '&ulcorner;',
                      '⌏': '&ulcrop;',
                      '◸': '&ultri;',
                      ū: '&umacr;',
                      ų: '&uogon;',
                      '𝕦': '&uopf;',
                      υ: '&upsilon;',
                      '⇈': '&uuarr;',
                      '⌝': '&urcorner;',
                      '⌎': '&urcrop;',
                      ů: '&uring;',
                      '◹': '&urtri;',
                      '𝓊': '&uscr;',
                      '⋰': '&utdot;',
                      ũ: '&utilde;',
                      ü: '&uuml;',
                      '⦧': '&uwangle;',
                      '⫨': '&vBar;',
                      '⫩': '&vBarv;',
                      '⦜': '&vangrt;',
                      '⊊︀': '&vsubne;',
                      '⫋︀': '&vsubnE;',
                      '⊋︀': '&vsupne;',
                      '⫌︀': '&vsupnE;',
                      в: '&vcy;',
                      '⊻': '&veebar;',
                      '≚': '&veeeq;',
                      '⋮': '&vellip;',
                      '𝔳': '&vfr;',
                      '𝕧': '&vopf;',
                      '𝓋': '&vscr;',
                      '⦚': '&vzigzag;',
                      ŵ: '&wcirc;',
                      '⩟': '&wedbar;',
                      '≙': '&wedgeq;',
                      '℘': '&wp;',
                      '𝔴': '&wfr;',
                      '𝕨': '&wopf;',
                      '𝓌': '&wscr;',
                      '𝔵': '&xfr;',
                      ξ: '&xi;',
                      '⋻': '&xnis;',
                      '𝕩': '&xopf;',
                      '𝓍': '&xscr;',
                      ý: '&yacute;',
                      я: '&yacy;',
                      ŷ: '&ycirc;',
                      ы: '&ycy;',
                      '¥': '&yen;',
                      '𝔶': '&yfr;',
                      ї: '&yicy;',
                      '𝕪': '&yopf;',
                      '𝓎': '&yscr;',
                      ю: '&yucy;',
                      ÿ: '&yuml;',
                      ź: '&zacute;',
                      ž: '&zcaron;',
                      з: '&zcy;',
                      ż: '&zdot;',
                      ζ: '&zeta;',
                      '𝔷': '&zfr;',
                      ж: '&zhcy;',
                      '⇝': '&zigrarr;',
                      '𝕫': '&zopf;',
                      '𝓏': '&zscr;',
                      '‍': '&zwj;',
                      '‌': '&zwnj;',
                    },
                  },
                };

                /***/
              },

            /***/ './node_modules/html-entities/lib/numeric-unicode-map.js':
              /*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
              /***/ (__unused_webpack_module, exports) => {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: true });
                exports.numericUnicodeMap = {
                  0: 65533,
                  128: 8364,
                  130: 8218,
                  131: 402,
                  132: 8222,
                  133: 8230,
                  134: 8224,
                  135: 8225,
                  136: 710,
                  137: 8240,
                  138: 352,
                  139: 8249,
                  140: 338,
                  142: 381,
                  145: 8216,
                  146: 8217,
                  147: 8220,
                  148: 8221,
                  149: 8226,
                  150: 8211,
                  151: 8212,
                  152: 732,
                  153: 8482,
                  154: 353,
                  155: 8250,
                  156: 339,
                  158: 382,
                  159: 376,
                };

                /***/
              },

            /***/ './node_modules/html-entities/lib/surrogate-pairs.js':
              /*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
              /***/ (__unused_webpack_module, exports) => {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: true });
                exports.fromCodePoint =
                  String.fromCodePoint ||
                  function (astralCodePoint) {
                    return String.fromCharCode(
                      Math.floor((astralCodePoint - 65536) / 1024) + 55296,
                      ((astralCodePoint - 65536) % 1024) + 56320
                    );
                  };
                exports.getCodePoint = String.prototype.codePointAt
                  ? function (input, position) {
                      return input.codePointAt(position);
                    }
                  : function (input, position) {
                      return (
                        (input.charCodeAt(position) - 55296) * 1024 +
                        input.charCodeAt(position + 1) -
                        56320 +
                        65536
                      );
                    };
                exports.highSurrogateFrom = 55296;
                exports.highSurrogateTo = 56319;

                /***/
              },

            /***/ './node_modules/querystring/decode.js':
              /*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
              /***/ (module) => {
                'use strict';
                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.

                // If obj.hasOwnProperty has been overridden, then calling
                // obj.hasOwnProperty(prop) will break.
                // See: https://github.com/joyent/node/issues/1707
                function hasOwnProperty(obj, prop) {
                  return Object.prototype.hasOwnProperty.call(obj, prop);
                }

                module.exports = function (qs, sep, eq, options) {
                  sep = sep || '&';
                  eq = eq || '=';
                  var obj = {};

                  if (typeof qs !== 'string' || qs.length === 0) {
                    return obj;
                  }

                  var regexp = /\+/g;
                  qs = qs.split(sep);

                  var maxKeys = 1000;
                  if (options && typeof options.maxKeys === 'number') {
                    maxKeys = options.maxKeys;
                  }

                  var len = qs.length;
                  // maxKeys <= 0 means that we should not limit keys count
                  if (maxKeys > 0 && len > maxKeys) {
                    len = maxKeys;
                  }

                  for (var i = 0; i < len; ++i) {
                    var x = qs[i].replace(regexp, '%20'),
                      idx = x.indexOf(eq),
                      kstr,
                      vstr,
                      k,
                      v;

                    if (idx >= 0) {
                      kstr = x.substr(0, idx);
                      vstr = x.substr(idx + 1);
                    } else {
                      kstr = x;
                      vstr = '';
                    }

                    k = decodeURIComponent(kstr);
                    v = decodeURIComponent(vstr);

                    if (!hasOwnProperty(obj, k)) {
                      obj[k] = v;
                    } else if (Array.isArray(obj[k])) {
                      obj[k].push(v);
                    } else {
                      obj[k] = [obj[k], v];
                    }
                  }

                  return obj;
                };

                /***/
              },

            /***/ './node_modules/querystring/encode.js':
              /*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
              /***/ (module) => {
                'use strict';
                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.

                var stringifyPrimitive = function (v) {
                  switch (typeof v) {
                    case 'string':
                      return v;

                    case 'boolean':
                      return v ? 'true' : 'false';

                    case 'number':
                      return isFinite(v) ? v : '';

                    default:
                      return '';
                  }
                };

                module.exports = function (obj, sep, eq, name) {
                  sep = sep || '&';
                  eq = eq || '=';
                  if (obj === null) {
                    obj = undefined;
                  }

                  if (typeof obj === 'object') {
                    return Object.keys(obj)
                      .map(function (k) {
                        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                        if (Array.isArray(obj[k])) {
                          return obj[k]
                            .map(function (v) {
                              return (
                                ks + encodeURIComponent(stringifyPrimitive(v))
                              );
                            })
                            .join(sep);
                        } else {
                          return (
                            ks + encodeURIComponent(stringifyPrimitive(obj[k]))
                          );
                        }
                      })
                      .join(sep);
                  }

                  if (!name) return '';
                  return (
                    encodeURIComponent(stringifyPrimitive(name)) +
                    eq +
                    encodeURIComponent(stringifyPrimitive(obj))
                  );
                };

                /***/
              },

            /***/ './node_modules/querystring/index.js':
              /*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
              /***/ (__unused_webpack_module, exports, __webpack_require__) => {
                'use strict';

                exports.decode = exports.parse = __webpack_require__(
                  /*! ./decode */ './node_modules/querystring/decode.js'
                );
                exports.encode = exports.stringify = __webpack_require__(
                  /*! ./encode */ './node_modules/querystring/encode.js'
                );

                /***/
              },

            /***/ './node_modules/systemjs-webpack-interop/auto-public-path/1.js':
              /*!*********************************************************************!*\
  !*** ./node_modules/systemjs-webpack-interop/auto-public-path/1.js ***!
  \*********************************************************************/
              /***/ (
                __unused_webpack_module,
                __unused_webpack_exports,
                __webpack_require__
              ) => {
                const autoPublicPath = __webpack_require__(
                  /*! ./auto-public-path */ './node_modules/systemjs-webpack-interop/auto-public-path/auto-public-path.js'
                ).autoPublicPath;

                autoPublicPath(1);

                /***/
              },

            /***/ './node_modules/systemjs-webpack-interop/auto-public-path/auto-public-path.js':
              /*!************************************************************************************!*\
  !*** ./node_modules/systemjs-webpack-interop/auto-public-path/auto-public-path.js ***!
  \************************************************************************************/
              /***/ (__unused_webpack_module, exports, __webpack_require__) => {
                const resolveDirectory = __webpack_require__(
                  /*! ../public-path */ './node_modules/systemjs-webpack-interop/public-path.js'
                ).resolveDirectory;

                exports.autoPublicPath = function autoPublicPath(rootDirLevel) {
                  if (!rootDirLevel) {
                    rootDirLevel = 1;
                  }

                  if (true) {
                    if (false) {
                    }

                    if (
                      !__webpack_require__.y.meta ||
                      !__webpack_require__.y.meta.url
                    ) {
                      console.error(
                        '__system_context__',
                        __webpack_require__.y
                      );
                      throw Error(
                        'systemjs-webpack-interop was provided an unknown SystemJS context. Expected context.meta.url, but none was provided'
                      );
                    }

                    __webpack_require__.p = resolveDirectory(
                      __webpack_require__.y.meta.url,
                      rootDirLevel
                    );
                  }
                };

                /***/
              },

            /***/ './node_modules/systemjs-webpack-interop/public-path.js':
              /*!**************************************************************!*\
  !*** ./node_modules/systemjs-webpack-interop/public-path.js ***!
  \**************************************************************/
              /***/ (__unused_webpack_module, exports, __webpack_require__) => {
                exports.setPublicPath = function setPublicPath(
                  systemjsModuleName,
                  rootDirectoryLevel
                ) {
                  if (!rootDirectoryLevel) {
                    rootDirectoryLevel = 1;
                  }
                  if (
                    typeof systemjsModuleName !== 'string' ||
                    systemjsModuleName.trim().length === 0
                  ) {
                    throw Error(
                      "systemjs-webpack-interop: setPublicPath(systemjsModuleName) must be called with a non-empty string 'systemjsModuleName'"
                    );
                  }

                  if (
                    typeof rootDirectoryLevel !== 'number' ||
                    rootDirectoryLevel <= 0 ||
                    isNaN(rootDirectoryLevel) ||
                    !isInteger(rootDirectoryLevel)
                  ) {
                    throw Error(
                      "systemjs-webpack-interop: setPublicPath(systemjsModuleName, rootDirectoryLevel) must be called with a positive integer 'rootDirectoryLevel'"
                    );
                  }

                  var moduleUrl;
                  try {
                    moduleUrl = window.System.resolve(systemjsModuleName);
                    if (!moduleUrl) {
                      throw Error();
                    }
                  } catch (err) {
                    throw Error(
                      "systemjs-webpack-interop: There is no such module '" +
                        systemjsModuleName +
                        "' in the SystemJS registry. Did you misspell the name of your module?"
                    );
                  }

                  __webpack_require__.p = resolveDirectory(
                    moduleUrl,
                    rootDirectoryLevel
                  );
                };

                function resolveDirectory(urlString, rootDirectoryLevel) {
                  // Our friend IE11 doesn't support new URL()
                  // https://github.com/single-spa/single-spa/issues/612
                  // https://gist.github.com/jlong/2428561

                  var a = document.createElement('a');
                  a.href = urlString;

                  var pathname =
                    a.pathname[0] === '/' ? a.pathname : '/' + a.pathname;
                  var numDirsProcessed = 0,
                    index = pathname.length;
                  while (
                    numDirsProcessed !== rootDirectoryLevel &&
                    index >= 0
                  ) {
                    var char = pathname[--index];
                    if (char === '/') {
                      numDirsProcessed++;
                    }
                  }

                  if (numDirsProcessed !== rootDirectoryLevel) {
                    throw Error(
                      'systemjs-webpack-interop: rootDirectoryLevel (' +
                        rootDirectoryLevel +
                        ') is greater than the number of directories (' +
                        numDirsProcessed +
                        ') in the URL path ' +
                        urlString
                    );
                  }

                  var finalPath = pathname.slice(0, index + 1);

                  return a.protocol + '//' + a.host + finalPath;
                }

                exports.resolveDirectory = resolveDirectory;

                // borrowed from https://github.com/parshap/js-is-integer/blob/master/index.js
                var isInteger =
                  Number.isInteger ||
                  function isInteger(val) {
                    return (
                      typeof val === 'number' &&
                      isFinite(val) &&
                      Math.floor(val) === val
                    );
                  };

                /***/
              },

            /***/ './node_modules/url/node_modules/punycode/punycode.js':
              /*!************************************************************!*\
  !*** ./node_modules/url/node_modules/punycode/punycode.js ***!
  \************************************************************/
              /***/ function (module, exports, __webpack_require__) {
                /* module decorator */ module = __webpack_require__.nmd(module);
                var __WEBPACK_AMD_DEFINE_RESULT__; /*! https://mths.be/punycode v1.3.2 by @mathias */
                (function (root) {
                  /** Detect free variables */
                  var freeExports =
                    true && exports && !exports.nodeType && exports;
                  var freeModule = true && module && !module.nodeType && module;
                  var freeGlobal =
                    typeof __webpack_require__.g == 'object' &&
                    __webpack_require__.g;
                  if (
                    freeGlobal.global === freeGlobal ||
                    freeGlobal.window === freeGlobal ||
                    freeGlobal.self === freeGlobal
                  ) {
                    root = freeGlobal;
                  }

                  /**
                   * The `punycode` object.
                   * @name punycode
                   * @type Object
                   */
                  var punycode,
                    /** Highest positive signed 32-bit float value */
                    maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
                    /** Bootstring parameters */
                    base = 36,
                    tMin = 1,
                    tMax = 26,
                    skew = 38,
                    damp = 700,
                    initialBias = 72,
                    initialN = 128, // 0x80
                    delimiter = '-', // '\x2D'
                    /** Regular expressions */
                    regexPunycode = /^xn--/,
                    regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
                    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
                    /** Error messages */
                    errors = {
                      overflow:
                        'Overflow: input needs wider integers to process',
                      'not-basic':
                        'Illegal input >= 0x80 (not a basic code point)',
                      'invalid-input': 'Invalid input',
                    },
                    /** Convenience shortcuts */
                    baseMinusTMin = base - tMin,
                    floor = Math.floor,
                    stringFromCharCode = String.fromCharCode,
                    /** Temporary variable */
                    key;

                  /*--------------------------------------------------------------------------*/

                  /**
                   * A generic error utility function.
                   * @private
                   * @param {String} type The error type.
                   * @returns {Error} Throws a `RangeError` with the applicable error message.
                   */
                  function error(type) {
                    throw RangeError(errors[type]);
                  }

                  /**
                   * A generic `Array#map` utility function.
                   * @private
                   * @param {Array} array The array to iterate over.
                   * @param {Function} callback The function that gets called for every array
                   * item.
                   * @returns {Array} A new array of values returned by the callback function.
                   */
                  function map(array, fn) {
                    var length = array.length;
                    var result = [];
                    while (length--) {
                      result[length] = fn(array[length]);
                    }
                    return result;
                  }

                  /**
                   * A simple `Array#map`-like wrapper to work with domain name strings or email
                   * addresses.
                   * @private
                   * @param {String} domain The domain name or email address.
                   * @param {Function} callback The function that gets called for every
                   * character.
                   * @returns {Array} A new string of characters returned by the callback
                   * function.
                   */
                  function mapDomain(string, fn) {
                    var parts = string.split('@');
                    var result = '';
                    if (parts.length > 1) {
                      // In email addresses, only the domain name should be punycoded. Leave
                      // the local part (i.e. everything up to `@`) intact.
                      result = parts[0] + '@';
                      string = parts[1];
                    }
                    // Avoid `split(regex)` for IE8 compatibility. See #17.
                    string = string.replace(regexSeparators, '\x2E');
                    var labels = string.split('.');
                    var encoded = map(labels, fn).join('.');
                    return result + encoded;
                  }

                  /**
                   * Creates an array containing the numeric code points of each Unicode
                   * character in the string. While JavaScript uses UCS-2 internally,
                   * this function will convert a pair of surrogate halves (each of which
                   * UCS-2 exposes as separate characters) into a single code point,
                   * matching UTF-16.
                   * @see `punycode.ucs2.encode`
                   * @see <https://mathiasbynens.be/notes/javascript-encoding>
                   * @memberOf punycode.ucs2
                   * @name decode
                   * @param {String} string The Unicode input string (UCS-2).
                   * @returns {Array} The new array of code points.
                   */
                  function ucs2decode(string) {
                    var output = [],
                      counter = 0,
                      length = string.length,
                      value,
                      extra;
                    while (counter < length) {
                      value = string.charCodeAt(counter++);
                      if (
                        value >= 0xd800 &&
                        value <= 0xdbff &&
                        counter < length
                      ) {
                        // high surrogate, and there is a next character
                        extra = string.charCodeAt(counter++);
                        if ((extra & 0xfc00) == 0xdc00) {
                          // low surrogate
                          output.push(
                            ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000
                          );
                        } else {
                          // unmatched surrogate; only append this code unit, in case the next
                          // code unit is the high surrogate of a surrogate pair
                          output.push(value);
                          counter--;
                        }
                      } else {
                        output.push(value);
                      }
                    }
                    return output;
                  }

                  /**
                   * Creates a string based on an array of numeric code points.
                   * @see `punycode.ucs2.decode`
                   * @memberOf punycode.ucs2
                   * @name encode
                   * @param {Array} codePoints The array of numeric code points.
                   * @returns {String} The new Unicode string (UCS-2).
                   */
                  function ucs2encode(array) {
                    return map(array, function (value) {
                      var output = '';
                      if (value > 0xffff) {
                        value -= 0x10000;
                        output += stringFromCharCode(
                          ((value >>> 10) & 0x3ff) | 0xd800
                        );
                        value = 0xdc00 | (value & 0x3ff);
                      }
                      output += stringFromCharCode(value);
                      return output;
                    }).join('');
                  }

                  /**
                   * Converts a basic code point into a digit/integer.
                   * @see `digitToBasic()`
                   * @private
                   * @param {Number} codePoint The basic numeric code point value.
                   * @returns {Number} The numeric value of a basic code point (for use in
                   * representing integers) in the range `0` to `base - 1`, or `base` if
                   * the code point does not represent a value.
                   */
                  function basicToDigit(codePoint) {
                    if (codePoint - 48 < 10) {
                      return codePoint - 22;
                    }
                    if (codePoint - 65 < 26) {
                      return codePoint - 65;
                    }
                    if (codePoint - 97 < 26) {
                      return codePoint - 97;
                    }
                    return base;
                  }

                  /**
                   * Converts a digit/integer into a basic code point.
                   * @see `basicToDigit()`
                   * @private
                   * @param {Number} digit The numeric value of a basic code point.
                   * @returns {Number} The basic code point whose value (when used for
                   * representing integers) is `digit`, which needs to be in the range
                   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
                   * used; else, the lowercase form is used. The behavior is undefined
                   * if `flag` is non-zero and `digit` has no uppercase form.
                   */
                  function digitToBasic(digit, flag) {
                    //  0..25 map to ASCII a..z or A..Z
                    // 26..35 map to ASCII 0..9
                    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
                  }

                  /**
                   * Bias adaptation function as per section 3.4 of RFC 3492.
                   * http://tools.ietf.org/html/rfc3492#section-3.4
                   * @private
                   */
                  function adapt(delta, numPoints, firstTime) {
                    var k = 0;
                    delta = firstTime ? floor(delta / damp) : delta >> 1;
                    delta += floor(delta / numPoints);
                    for (
                      ;
                      /* no initialization */ delta >
                      (baseMinusTMin * tMax) >> 1;
                      k += base
                    ) {
                      delta = floor(delta / baseMinusTMin);
                    }
                    return floor(
                      k + ((baseMinusTMin + 1) * delta) / (delta + skew)
                    );
                  }

                  /**
                   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
                   * symbols.
                   * @memberOf punycode
                   * @param {String} input The Punycode string of ASCII-only symbols.
                   * @returns {String} The resulting string of Unicode symbols.
                   */
                  function decode(input) {
                    // Don't use UCS-2
                    var output = [],
                      inputLength = input.length,
                      out,
                      i = 0,
                      n = initialN,
                      bias = initialBias,
                      basic,
                      j,
                      index,
                      oldi,
                      w,
                      k,
                      digit,
                      t,
                      /** Cached calculation results */
                      baseMinusT;

                    // Handle the basic code points: let `basic` be the number of input code
                    // points before the last delimiter, or `0` if there is none, then copy
                    // the first basic code points to the output.

                    basic = input.lastIndexOf(delimiter);
                    if (basic < 0) {
                      basic = 0;
                    }

                    for (j = 0; j < basic; ++j) {
                      // if it's not a basic code point
                      if (input.charCodeAt(j) >= 0x80) {
                        error('not-basic');
                      }
                      output.push(input.charCodeAt(j));
                    }

                    // Main decoding loop: start just after the last delimiter if any basic code
                    // points were copied; start at the beginning otherwise.

                    for (
                      index = basic > 0 ? basic + 1 : 0;
                      index < inputLength /* no final expression */;

                    ) {
                      // `index` is the index of the next character to be consumed.
                      // Decode a generalized variable-length integer into `delta`,
                      // which gets added to `i`. The overflow checking is easier
                      // if we increase `i` as we go, then subtract off its starting
                      // value at the end to obtain `delta`.
                      for (
                        oldi = i, w = 1, k = base /* no condition */;
                        ;
                        k += base
                      ) {
                        if (index >= inputLength) {
                          error('invalid-input');
                        }

                        digit = basicToDigit(input.charCodeAt(index++));

                        if (digit >= base || digit > floor((maxInt - i) / w)) {
                          error('overflow');
                        }

                        i += digit * w;
                        t =
                          k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

                        if (digit < t) {
                          break;
                        }

                        baseMinusT = base - t;
                        if (w > floor(maxInt / baseMinusT)) {
                          error('overflow');
                        }

                        w *= baseMinusT;
                      }

                      out = output.length + 1;
                      bias = adapt(i - oldi, out, oldi == 0);

                      // `i` was supposed to wrap around from `out` to `0`,
                      // incrementing `n` each time, so we'll fix that now:
                      if (floor(i / out) > maxInt - n) {
                        error('overflow');
                      }

                      n += floor(i / out);
                      i %= out;

                      // Insert `n` at position `i` of the output
                      output.splice(i++, 0, n);
                    }

                    return ucs2encode(output);
                  }

                  /**
                   * Converts a string of Unicode symbols (e.g. a domain name label) to a
                   * Punycode string of ASCII-only symbols.
                   * @memberOf punycode
                   * @param {String} input The string of Unicode symbols.
                   * @returns {String} The resulting Punycode string of ASCII-only symbols.
                   */
                  function encode(input) {
                    var n,
                      delta,
                      handledCPCount,
                      basicLength,
                      bias,
                      j,
                      m,
                      q,
                      k,
                      t,
                      currentValue,
                      output = [],
                      /** `inputLength` will hold the number of code points in `input`. */
                      inputLength,
                      /** Cached calculation results */
                      handledCPCountPlusOne,
                      baseMinusT,
                      qMinusT;

                    // Convert the input in UCS-2 to Unicode
                    input = ucs2decode(input);

                    // Cache the length
                    inputLength = input.length;

                    // Initialize the state
                    n = initialN;
                    delta = 0;
                    bias = initialBias;

                    // Handle the basic code points
                    for (j = 0; j < inputLength; ++j) {
                      currentValue = input[j];
                      if (currentValue < 0x80) {
                        output.push(stringFromCharCode(currentValue));
                      }
                    }

                    handledCPCount = basicLength = output.length;

                    // `handledCPCount` is the number of code points that have been handled;
                    // `basicLength` is the number of basic code points.

                    // Finish the basic string - if it is not empty - with a delimiter
                    if (basicLength) {
                      output.push(delimiter);
                    }

                    // Main encoding loop:
                    while (handledCPCount < inputLength) {
                      // All non-basic code points < n have been handled already. Find the next
                      // larger one:
                      for (m = maxInt, j = 0; j < inputLength; ++j) {
                        currentValue = input[j];
                        if (currentValue >= n && currentValue < m) {
                          m = currentValue;
                        }
                      }

                      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                      // but guard against overflow
                      handledCPCountPlusOne = handledCPCount + 1;
                      if (
                        m - n >
                        floor((maxInt - delta) / handledCPCountPlusOne)
                      ) {
                        error('overflow');
                      }

                      delta += (m - n) * handledCPCountPlusOne;
                      n = m;

                      for (j = 0; j < inputLength; ++j) {
                        currentValue = input[j];

                        if (currentValue < n && ++delta > maxInt) {
                          error('overflow');
                        }

                        if (currentValue == n) {
                          // Represent delta as a generalized variable-length integer
                          for (
                            q = delta, k = base /* no condition */;
                            ;
                            k += base
                          ) {
                            t =
                              k <= bias
                                ? tMin
                                : k >= bias + tMax
                                ? tMax
                                : k - bias;
                            if (q < t) {
                              break;
                            }
                            qMinusT = q - t;
                            baseMinusT = base - t;
                            output.push(
                              stringFromCharCode(
                                digitToBasic(t + (qMinusT % baseMinusT), 0)
                              )
                            );
                            q = floor(qMinusT / baseMinusT);
                          }

                          output.push(stringFromCharCode(digitToBasic(q, 0)));
                          bias = adapt(
                            delta,
                            handledCPCountPlusOne,
                            handledCPCount == basicLength
                          );
                          delta = 0;
                          ++handledCPCount;
                        }
                      }

                      ++delta;
                      ++n;
                    }
                    return output.join('');
                  }

                  /**
                   * Converts a Punycode string representing a domain name or an email address
                   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
                   * it doesn't matter if you call it on a string that has already been
                   * converted to Unicode.
                   * @memberOf punycode
                   * @param {String} input The Punycoded domain name or email address to
                   * convert to Unicode.
                   * @returns {String} The Unicode representation of the given Punycode
                   * string.
                   */
                  function toUnicode(input) {
                    return mapDomain(input, function (string) {
                      return regexPunycode.test(string)
                        ? decode(string.slice(4).toLowerCase())
                        : string;
                    });
                  }

                  /**
                   * Converts a Unicode string representing a domain name or an email address to
                   * Punycode. Only the non-ASCII parts of the domain name will be converted,
                   * i.e. it doesn't matter if you call it with a domain that's already in
                   * ASCII.
                   * @memberOf punycode
                   * @param {String} input The domain name or email address to convert, as a
                   * Unicode string.
                   * @returns {String} The Punycode representation of the given domain name or
                   * email address.
                   */
                  function toASCII(input) {
                    return mapDomain(input, function (string) {
                      return regexNonASCII.test(string)
                        ? 'xn--' + encode(string)
                        : string;
                    });
                  }

                  /*--------------------------------------------------------------------------*/

                  /** Define the public API */
                  punycode = {
                    /**
                     * A string representing the current Punycode.js version number.
                     * @memberOf punycode
                     * @type String
                     */
                    version: '1.3.2',
                    /**
                     * An object of methods to convert from JavaScript's internal character
                     * representation (UCS-2) to Unicode code points, and back.
                     * @see <https://mathiasbynens.be/notes/javascript-encoding>
                     * @memberOf punycode
                     * @type Object
                     */
                    ucs2: {
                      decode: ucs2decode,
                      encode: ucs2encode,
                    },
                    decode: decode,
                    encode: encode,
                    toASCII: toASCII,
                    toUnicode: toUnicode,
                  };

                  /** Expose `punycode` */
                  // Some AMD build optimizers, like r.js, check for specific condition patterns
                  // like the following:
                  if (true) {
                    !((__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                      return punycode;
                    }.call(exports, __webpack_require__, exports, module)),
                    __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
                      (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                  } else {
                  }
                })(this);

                /***/
              },

            /***/ './node_modules/url/url.js':
              /*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
              /***/ (__unused_webpack_module, exports, __webpack_require__) => {
                'use strict';
                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.

                var punycode = __webpack_require__(
                  /*! punycode */ './node_modules/url/node_modules/punycode/punycode.js'
                );
                var util = __webpack_require__(
                  /*! ./util */ './node_modules/url/util.js'
                );

                exports.parse = urlParse;
                exports.resolve = urlResolve;
                exports.resolveObject = urlResolveObject;
                exports.format = urlFormat;

                exports.Url = Url;

                function Url() {
                  this.protocol = null;
                  this.slashes = null;
                  this.auth = null;
                  this.host = null;
                  this.port = null;
                  this.hostname = null;
                  this.hash = null;
                  this.search = null;
                  this.query = null;
                  this.pathname = null;
                  this.path = null;
                  this.href = null;
                }

                // Reference: RFC 3986, RFC 1808, RFC 2396

                // define these here so at least they only have to be
                // compiled once on the first module load.
                var protocolPattern = /^([a-z0-9.+-]+:)/i,
                  portPattern = /:[0-9]*$/,
                  // Special case for a simple path URL
                  simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
                  // RFC 2396: characters reserved for delimiting URLs.
                  // We actually just auto-escape these.
                  delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
                  // RFC 2396: characters not allowed for various reasons.
                  unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
                  // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
                  autoEscape = ["'"].concat(unwise),
                  // Characters that are never ever allowed in a hostname.
                  // Note that any invalid chars are also handled, but these
                  // are the ones that are *expected* to be seen, so we fast-path
                  // them.
                  nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
                  hostEndingChars = ['/', '?', '#'],
                  hostnameMaxLen = 255,
                  hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
                  hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                  // protocols that can allow "unsafe" and "unwise" chars.
                  unsafeProtocol = {
                    javascript: true,
                    'javascript:': true,
                  },
                  // protocols that never have a hostname.
                  hostlessProtocol = {
                    javascript: true,
                    'javascript:': true,
                  },
                  // protocols that always contain a // bit.
                  slashedProtocol = {
                    http: true,
                    https: true,
                    ftp: true,
                    gopher: true,
                    file: true,
                    'http:': true,
                    'https:': true,
                    'ftp:': true,
                    'gopher:': true,
                    'file:': true,
                  },
                  querystring = __webpack_require__(
                    /*! querystring */ './node_modules/querystring/index.js'
                  );

                function urlParse(url, parseQueryString, slashesDenoteHost) {
                  if (url && util.isObject(url) && url instanceof Url)
                    return url;

                  var u = new Url();
                  u.parse(url, parseQueryString, slashesDenoteHost);
                  return u;
                }

                Url.prototype.parse = function (
                  url,
                  parseQueryString,
                  slashesDenoteHost
                ) {
                  if (!util.isString(url)) {
                    throw new TypeError(
                      "Parameter 'url' must be a string, not " + typeof url
                    );
                  }

                  // Copy chrome, IE, opera backslash-handling behavior.
                  // Back slashes before the query string get converted to forward slashes
                  // See: https://code.google.com/p/chromium/issues/detail?id=25916
                  var queryIndex = url.indexOf('?'),
                    splitter =
                      queryIndex !== -1 && queryIndex < url.indexOf('#')
                        ? '?'
                        : '#',
                    uSplit = url.split(splitter),
                    slashRegex = /\\/g;
                  uSplit[0] = uSplit[0].replace(slashRegex, '/');
                  url = uSplit.join(splitter);

                  var rest = url;

                  // trim before proceeding.
                  // This is to support parse stuff like "  http://foo.com  \n"
                  rest = rest.trim();

                  if (!slashesDenoteHost && url.split('#').length === 1) {
                    // Try fast path regexp
                    var simplePath = simplePathPattern.exec(rest);
                    if (simplePath) {
                      this.path = rest;
                      this.href = rest;
                      this.pathname = simplePath[1];
                      if (simplePath[2]) {
                        this.search = simplePath[2];
                        if (parseQueryString) {
                          this.query = querystring.parse(this.search.substr(1));
                        } else {
                          this.query = this.search.substr(1);
                        }
                      } else if (parseQueryString) {
                        this.search = '';
                        this.query = {};
                      }
                      return this;
                    }
                  }

                  var proto = protocolPattern.exec(rest);
                  if (proto) {
                    proto = proto[0];
                    var lowerProto = proto.toLowerCase();
                    this.protocol = lowerProto;
                    rest = rest.substr(proto.length);
                  }

                  // figure out if it's got a host
                  // user@server is *always* interpreted as a hostname, and url
                  // resolution will treat //foo/bar as host=foo,path=bar because that's
                  // how the browser resolves relative URLs.
                  if (
                    slashesDenoteHost ||
                    proto ||
                    rest.match(/^\/\/[^@\/]+@[^@\/]+/)
                  ) {
                    var slashes = rest.substr(0, 2) === '//';
                    if (slashes && !(proto && hostlessProtocol[proto])) {
                      rest = rest.substr(2);
                      this.slashes = true;
                    }
                  }

                  if (
                    !hostlessProtocol[proto] &&
                    (slashes || (proto && !slashedProtocol[proto]))
                  ) {
                    // there's a hostname.
                    // the first instance of /, ?, ;, or # ends the host.
                    //
                    // If there is an @ in the hostname, then non-host chars *are* allowed
                    // to the left of the last @ sign, unless some host-ending character
                    // comes *before* the @-sign.
                    // URLs are obnoxious.
                    //
                    // ex:
                    // http://a@b@c/ => user:a@b host:c
                    // http://a@b?@c => user:a host:c path:/?@c

                    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
                    // Review our test case against browsers more comprehensively.

                    // find the first instance of any hostEndingChars
                    var hostEnd = -1;
                    for (var i = 0; i < hostEndingChars.length; i++) {
                      var hec = rest.indexOf(hostEndingChars[i]);
                      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                        hostEnd = hec;
                    }

                    // at this point, either we have an explicit point where the
                    // auth portion cannot go past, or the last @ char is the decider.
                    var auth, atSign;
                    if (hostEnd === -1) {
                      // atSign can be anywhere.
                      atSign = rest.lastIndexOf('@');
                    } else {
                      // atSign must be in auth portion.
                      // http://a@b/c@d => host:b auth:a path:/c@d
                      atSign = rest.lastIndexOf('@', hostEnd);
                    }

                    // Now we have a portion which is definitely the auth.
                    // Pull that off.
                    if (atSign !== -1) {
                      auth = rest.slice(0, atSign);
                      rest = rest.slice(atSign + 1);
                      this.auth = decodeURIComponent(auth);
                    }

                    // the host is the remaining to the left of the first non-host char
                    hostEnd = -1;
                    for (var i = 0; i < nonHostChars.length; i++) {
                      var hec = rest.indexOf(nonHostChars[i]);
                      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                        hostEnd = hec;
                    }
                    // if we still have not hit it, then the entire thing is a host.
                    if (hostEnd === -1) hostEnd = rest.length;

                    this.host = rest.slice(0, hostEnd);
                    rest = rest.slice(hostEnd);

                    // pull out port.
                    this.parseHost();

                    // we've indicated that there is a hostname,
                    // so even if it's empty, it has to be present.
                    this.hostname = this.hostname || '';

                    // if hostname begins with [ and ends with ]
                    // assume that it's an IPv6 address.
                    var ipv6Hostname =
                      this.hostname[0] === '[' &&
                      this.hostname[this.hostname.length - 1] === ']';

                    // validate a little.
                    if (!ipv6Hostname) {
                      var hostparts = this.hostname.split(/\./);
                      for (var i = 0, l = hostparts.length; i < l; i++) {
                        var part = hostparts[i];
                        if (!part) continue;
                        if (!part.match(hostnamePartPattern)) {
                          var newpart = '';
                          for (var j = 0, k = part.length; j < k; j++) {
                            if (part.charCodeAt(j) > 127) {
                              // we replace non-ASCII char with a temporary placeholder
                              // we need this to make sure size of hostname is not
                              // broken by replacing non-ASCII by nothing
                              newpart += 'x';
                            } else {
                              newpart += part[j];
                            }
                          }
                          // we test again with ASCII char only
                          if (!newpart.match(hostnamePartPattern)) {
                            var validParts = hostparts.slice(0, i);
                            var notHost = hostparts.slice(i + 1);
                            var bit = part.match(hostnamePartStart);
                            if (bit) {
                              validParts.push(bit[1]);
                              notHost.unshift(bit[2]);
                            }
                            if (notHost.length) {
                              rest = '/' + notHost.join('.') + rest;
                            }
                            this.hostname = validParts.join('.');
                            break;
                          }
                        }
                      }
                    }

                    if (this.hostname.length > hostnameMaxLen) {
                      this.hostname = '';
                    } else {
                      // hostnames are always lower case.
                      this.hostname = this.hostname.toLowerCase();
                    }

                    if (!ipv6Hostname) {
                      // IDNA Support: Returns a punycoded representation of "domain".
                      // It only converts parts of the domain name that
                      // have non-ASCII characters, i.e. it doesn't matter if
                      // you call it with a domain that already is ASCII-only.
                      this.hostname = punycode.toASCII(this.hostname);
                    }

                    var p = this.port ? ':' + this.port : '';
                    var h = this.hostname || '';
                    this.host = h + p;
                    this.href += this.host;

                    // strip [ and ] from the hostname
                    // the host field still retains them, though
                    if (ipv6Hostname) {
                      this.hostname = this.hostname.substr(
                        1,
                        this.hostname.length - 2
                      );
                      if (rest[0] !== '/') {
                        rest = '/' + rest;
                      }
                    }
                  }

                  // now rest is set to the post-host stuff.
                  // chop off any delim chars.
                  if (!unsafeProtocol[lowerProto]) {
                    // First, make 100% sure that any "autoEscape" chars get
                    // escaped, even if encodeURIComponent doesn't think they
                    // need to be.
                    for (var i = 0, l = autoEscape.length; i < l; i++) {
                      var ae = autoEscape[i];
                      if (rest.indexOf(ae) === -1) continue;
                      var esc = encodeURIComponent(ae);
                      if (esc === ae) {
                        esc = escape(ae);
                      }
                      rest = rest.split(ae).join(esc);
                    }
                  }

                  // chop off from the tail first.
                  var hash = rest.indexOf('#');
                  if (hash !== -1) {
                    // got a fragment string.
                    this.hash = rest.substr(hash);
                    rest = rest.slice(0, hash);
                  }
                  var qm = rest.indexOf('?');
                  if (qm !== -1) {
                    this.search = rest.substr(qm);
                    this.query = rest.substr(qm + 1);
                    if (parseQueryString) {
                      this.query = querystring.parse(this.query);
                    }
                    rest = rest.slice(0, qm);
                  } else if (parseQueryString) {
                    // no query string, but parseQueryString still requested
                    this.search = '';
                    this.query = {};
                  }
                  if (rest) this.pathname = rest;
                  if (
                    slashedProtocol[lowerProto] &&
                    this.hostname &&
                    !this.pathname
                  ) {
                    this.pathname = '/';
                  }

                  //to support http.request
                  if (this.pathname || this.search) {
                    var p = this.pathname || '';
                    var s = this.search || '';
                    this.path = p + s;
                  }

                  // finally, reconstruct the href based on what has been validated.
                  this.href = this.format();
                  return this;
                };

                // format a parsed object into a url string
                function urlFormat(obj) {
                  // ensure it's an object, and not a string url.
                  // If it's an obj, this is a no-op.
                  // this way, you can call url_format() on strings
                  // to clean up potentially wonky urls.
                  if (util.isString(obj)) obj = urlParse(obj);
                  if (!(obj instanceof Url))
                    return Url.prototype.format.call(obj);
                  return obj.format();
                }

                Url.prototype.format = function () {
                  var auth = this.auth || '';
                  if (auth) {
                    auth = encodeURIComponent(auth);
                    auth = auth.replace(/%3A/i, ':');
                    auth += '@';
                  }

                  var protocol = this.protocol || '',
                    pathname = this.pathname || '',
                    hash = this.hash || '',
                    host = false,
                    query = '';

                  if (this.host) {
                    host = auth + this.host;
                  } else if (this.hostname) {
                    host =
                      auth +
                      (this.hostname.indexOf(':') === -1
                        ? this.hostname
                        : '[' + this.hostname + ']');
                    if (this.port) {
                      host += ':' + this.port;
                    }
                  }

                  if (
                    this.query &&
                    util.isObject(this.query) &&
                    Object.keys(this.query).length
                  ) {
                    query = querystring.stringify(this.query);
                  }

                  var search = this.search || (query && '?' + query) || '';

                  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

                  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
                  // unless they had them to begin with.
                  if (
                    this.slashes ||
                    ((!protocol || slashedProtocol[protocol]) && host !== false)
                  ) {
                    host = '//' + (host || '');
                    if (pathname && pathname.charAt(0) !== '/')
                      pathname = '/' + pathname;
                  } else if (!host) {
                    host = '';
                  }

                  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
                  if (search && search.charAt(0) !== '?') search = '?' + search;

                  pathname = pathname.replace(/[?#]/g, function (match) {
                    return encodeURIComponent(match);
                  });
                  search = search.replace('#', '%23');

                  return protocol + host + pathname + search + hash;
                };

                function urlResolve(source, relative) {
                  return urlParse(source, false, true).resolve(relative);
                }

                Url.prototype.resolve = function (relative) {
                  return this.resolveObject(
                    urlParse(relative, false, true)
                  ).format();
                };

                function urlResolveObject(source, relative) {
                  if (!source) return relative;
                  return urlParse(source, false, true).resolveObject(relative);
                }

                Url.prototype.resolveObject = function (relative) {
                  if (util.isString(relative)) {
                    var rel = new Url();
                    rel.parse(relative, false, true);
                    relative = rel;
                  }

                  var result = new Url();
                  var tkeys = Object.keys(this);
                  for (var tk = 0; tk < tkeys.length; tk++) {
                    var tkey = tkeys[tk];
                    result[tkey] = this[tkey];
                  }

                  // hash is always overridden, no matter what.
                  // even href="" will remove it.
                  result.hash = relative.hash;

                  // if the relative url is empty, then there's nothing left to do here.
                  if (relative.href === '') {
                    result.href = result.format();
                    return result;
                  }

                  // hrefs like //foo/bar always cut to the protocol.
                  if (relative.slashes && !relative.protocol) {
                    // take everything except the protocol from relative
                    var rkeys = Object.keys(relative);
                    for (var rk = 0; rk < rkeys.length; rk++) {
                      var rkey = rkeys[rk];
                      if (rkey !== 'protocol') result[rkey] = relative[rkey];
                    }

                    //urlParse appends trailing / to urls like http://www.example.com
                    if (
                      slashedProtocol[result.protocol] &&
                      result.hostname &&
                      !result.pathname
                    ) {
                      result.path = result.pathname = '/';
                    }

                    result.href = result.format();
                    return result;
                  }

                  if (
                    relative.protocol &&
                    relative.protocol !== result.protocol
                  ) {
                    // if it's a known url protocol, then changing
                    // the protocol does weird things
                    // first, if it's not file:, then we MUST have a host,
                    // and if there was a path
                    // to begin with, then we MUST have a path.
                    // if it is file:, then the host is dropped,
                    // because that's known to be hostless.
                    // anything else is assumed to be absolute.
                    if (!slashedProtocol[relative.protocol]) {
                      var keys = Object.keys(relative);
                      for (var v = 0; v < keys.length; v++) {
                        var k = keys[v];
                        result[k] = relative[k];
                      }
                      result.href = result.format();
                      return result;
                    }

                    result.protocol = relative.protocol;
                    if (
                      !relative.host &&
                      !hostlessProtocol[relative.protocol]
                    ) {
                      var relPath = (relative.pathname || '').split('/');
                      while (
                        relPath.length &&
                        !(relative.host = relPath.shift())
                      );
                      if (!relative.host) relative.host = '';
                      if (!relative.hostname) relative.hostname = '';
                      if (relPath[0] !== '') relPath.unshift('');
                      if (relPath.length < 2) relPath.unshift('');
                      result.pathname = relPath.join('/');
                    } else {
                      result.pathname = relative.pathname;
                    }
                    result.search = relative.search;
                    result.query = relative.query;
                    result.host = relative.host || '';
                    result.auth = relative.auth;
                    result.hostname = relative.hostname || relative.host;
                    result.port = relative.port;
                    // to support http.request
                    if (result.pathname || result.search) {
                      var p = result.pathname || '';
                      var s = result.search || '';
                      result.path = p + s;
                    }
                    result.slashes = result.slashes || relative.slashes;
                    result.href = result.format();
                    return result;
                  }

                  var isSourceAbs =
                      result.pathname && result.pathname.charAt(0) === '/',
                    isRelAbs =
                      relative.host ||
                      (relative.pathname &&
                        relative.pathname.charAt(0) === '/'),
                    mustEndAbs =
                      isRelAbs ||
                      isSourceAbs ||
                      (result.host && relative.pathname),
                    removeAllDots = mustEndAbs,
                    srcPath =
                      (result.pathname && result.pathname.split('/')) || [],
                    relPath =
                      (relative.pathname && relative.pathname.split('/')) || [],
                    psychotic =
                      result.protocol && !slashedProtocol[result.protocol];

                  // if the url is a non-slashed url, then relative
                  // links like ../.. should be able
                  // to crawl up to the hostname, as well.  This is strange.
                  // result.protocol has already been set by now.
                  // Later on, put the first path part into the host field.
                  if (psychotic) {
                    result.hostname = '';
                    result.port = null;
                    if (result.host) {
                      if (srcPath[0] === '') srcPath[0] = result.host;
                      else srcPath.unshift(result.host);
                    }
                    result.host = '';
                    if (relative.protocol) {
                      relative.hostname = null;
                      relative.port = null;
                      if (relative.host) {
                        if (relPath[0] === '') relPath[0] = relative.host;
                        else relPath.unshift(relative.host);
                      }
                      relative.host = null;
                    }
                    mustEndAbs =
                      mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
                  }

                  if (isRelAbs) {
                    // it's absolute.
                    result.host =
                      relative.host || relative.host === ''
                        ? relative.host
                        : result.host;
                    result.hostname =
                      relative.hostname || relative.hostname === ''
                        ? relative.hostname
                        : result.hostname;
                    result.search = relative.search;
                    result.query = relative.query;
                    srcPath = relPath;
                    // fall through to the dot-handling below.
                  } else if (relPath.length) {
                    // it's relative
                    // throw away the existing file, and take the new path instead.
                    if (!srcPath) srcPath = [];
                    srcPath.pop();
                    srcPath = srcPath.concat(relPath);
                    result.search = relative.search;
                    result.query = relative.query;
                  } else if (!util.isNullOrUndefined(relative.search)) {
                    // just pull out the search.
                    // like href='?foo'.
                    // Put this after the other two cases because it simplifies the booleans
                    if (psychotic) {
                      result.hostname = result.host = srcPath.shift();
                      //occationaly the auth can get stuck only in host
                      //this especially happens in cases like
                      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                      var authInHost =
                        result.host && result.host.indexOf('@') > 0
                          ? result.host.split('@')
                          : false;
                      if (authInHost) {
                        result.auth = authInHost.shift();
                        result.host = result.hostname = authInHost.shift();
                      }
                    }
                    result.search = relative.search;
                    result.query = relative.query;
                    //to support http.request
                    if (
                      !util.isNull(result.pathname) ||
                      !util.isNull(result.search)
                    ) {
                      result.path =
                        (result.pathname ? result.pathname : '') +
                        (result.search ? result.search : '');
                    }
                    result.href = result.format();
                    return result;
                  }

                  if (!srcPath.length) {
                    // no path at all.  easy.
                    // we've already handled the other stuff above.
                    result.pathname = null;
                    //to support http.request
                    if (result.search) {
                      result.path = '/' + result.search;
                    } else {
                      result.path = null;
                    }
                    result.href = result.format();
                    return result;
                  }

                  // if a url ENDs in . or .., then it must get a trailing slash.
                  // however, if it ends in anything else non-slashy,
                  // then it must NOT get a trailing slash.
                  var last = srcPath.slice(-1)[0];
                  var hasTrailingSlash =
                    ((result.host || relative.host || srcPath.length > 1) &&
                      (last === '.' || last === '..')) ||
                    last === '';

                  // strip single dots, resolve double dots to parent dir
                  // if the path tries to go above the root, `up` ends up > 0
                  var up = 0;
                  for (var i = srcPath.length; i >= 0; i--) {
                    last = srcPath[i];
                    if (last === '.') {
                      srcPath.splice(i, 1);
                    } else if (last === '..') {
                      srcPath.splice(i, 1);
                      up++;
                    } else if (up) {
                      srcPath.splice(i, 1);
                      up--;
                    }
                  }

                  // if the path is allowed to go above the root, restore leading ..s
                  if (!mustEndAbs && !removeAllDots) {
                    for (; up--; up) {
                      srcPath.unshift('..');
                    }
                  }

                  if (
                    mustEndAbs &&
                    srcPath[0] !== '' &&
                    (!srcPath[0] || srcPath[0].charAt(0) !== '/')
                  ) {
                    srcPath.unshift('');
                  }

                  if (
                    hasTrailingSlash &&
                    srcPath.join('/').substr(-1) !== '/'
                  ) {
                    srcPath.push('');
                  }

                  var isAbsolute =
                    srcPath[0] === '' ||
                    (srcPath[0] && srcPath[0].charAt(0) === '/');

                  // put the host back
                  if (psychotic) {
                    result.hostname = result.host = isAbsolute
                      ? ''
                      : srcPath.length
                      ? srcPath.shift()
                      : '';
                    //occationaly the auth can get stuck only in host
                    //this especially happens in cases like
                    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                    var authInHost =
                      result.host && result.host.indexOf('@') > 0
                        ? result.host.split('@')
                        : false;
                    if (authInHost) {
                      result.auth = authInHost.shift();
                      result.host = result.hostname = authInHost.shift();
                    }
                  }

                  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

                  if (mustEndAbs && !isAbsolute) {
                    srcPath.unshift('');
                  }

                  if (!srcPath.length) {
                    result.pathname = null;
                    result.path = null;
                  } else {
                    result.pathname = srcPath.join('/');
                  }

                  //to support request.http
                  if (
                    !util.isNull(result.pathname) ||
                    !util.isNull(result.search)
                  ) {
                    result.path =
                      (result.pathname ? result.pathname : '') +
                      (result.search ? result.search : '');
                  }
                  result.auth = relative.auth || result.auth;
                  result.slashes = result.slashes || relative.slashes;
                  result.href = result.format();
                  return result;
                };

                Url.prototype.parseHost = function () {
                  var host = this.host;
                  var port = portPattern.exec(host);
                  if (port) {
                    port = port[0];
                    if (port !== ':') {
                      this.port = port.substr(1);
                    }
                    host = host.substr(0, host.length - port.length);
                  }
                  if (host) this.hostname = host;
                };

                /***/
              },

            /***/ './node_modules/url/util.js':
              /*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
              /***/ (module) => {
                'use strict';

                module.exports = {
                  isString: function (arg) {
                    return typeof arg === 'string';
                  },
                  isObject: function (arg) {
                    return typeof arg === 'object' && arg !== null;
                  },
                  isNull: function (arg) {
                    return arg === null;
                  },
                  isNullOrUndefined: function (arg) {
                    return arg == null;
                  },
                };

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/clients/BaseClient.js':
              /*!**********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/BaseClient.js ***!
  \**********************************************************************/
              /***/ (module) => {
                'use strict';

                function _classCallCheck(instance, Constructor) {
                  if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                  }
                }

                function _defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ('value' in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }

                function _createClass(Constructor, protoProps, staticProps) {
                  if (protoProps)
                    _defineProperties(Constructor.prototype, protoProps);
                  if (staticProps) _defineProperties(Constructor, staticProps);
                  return Constructor;
                }

                module.exports = /*#__PURE__*/ (function () {
                  function BaseClient() {
                    _classCallCheck(this, BaseClient);
                  }

                  _createClass(BaseClient, null, [
                    {
                      key: 'getClientPath',
                      // eslint-disable-next-line no-unused-vars
                      value: function getClientPath(options) {
                        throw new Error('Client needs implementation');
                      },
                    },
                  ]);

                  return BaseClient;
                })();

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/clients/WebsocketClient.js':
              /*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebsocketClient.js ***!
  \***************************************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                'use strict';

                function _classCallCheck(instance, Constructor) {
                  if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                  }
                }

                function _defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ('value' in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }

                function _createClass(Constructor, protoProps, staticProps) {
                  if (protoProps)
                    _defineProperties(Constructor.prototype, protoProps);
                  if (staticProps) _defineProperties(Constructor, staticProps);
                  return Constructor;
                }

                function _inherits(subClass, superClass) {
                  if (typeof superClass !== 'function' && superClass !== null) {
                    throw new TypeError(
                      'Super expression must either be null or a function'
                    );
                  }
                  subClass.prototype = Object.create(
                    superClass && superClass.prototype,
                    {
                      constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true,
                      },
                    }
                  );
                  if (superClass) _setPrototypeOf(subClass, superClass);
                }

                function _setPrototypeOf(o, p) {
                  _setPrototypeOf =
                    Object.setPrototypeOf ||
                    function _setPrototypeOf(o, p) {
                      o.__proto__ = p;
                      return o;
                    };
                  return _setPrototypeOf(o, p);
                }

                function _createSuper(Derived) {
                  var hasNativeReflectConstruct = _isNativeReflectConstruct();
                  return function _createSuperInternal() {
                    var Super = _getPrototypeOf(Derived),
                      result;
                    if (hasNativeReflectConstruct) {
                      var NewTarget = _getPrototypeOf(this).constructor;
                      result = Reflect.construct(Super, arguments, NewTarget);
                    } else {
                      result = Super.apply(this, arguments);
                    }
                    return _possibleConstructorReturn(this, result);
                  };
                }

                function _possibleConstructorReturn(self, call) {
                  if (
                    call &&
                    (typeof call === 'object' || typeof call === 'function')
                  ) {
                    return call;
                  }
                  return _assertThisInitialized(self);
                }

                function _assertThisInitialized(self) {
                  if (self === void 0) {
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  }
                  return self;
                }

                function _isNativeReflectConstruct() {
                  if (typeof Reflect === 'undefined' || !Reflect.construct)
                    return false;
                  if (Reflect.construct.sham) return false;
                  if (typeof Proxy === 'function') return true;
                  try {
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    );
                    return true;
                  } catch (e) {
                    return false;
                  }
                }

                function _getPrototypeOf(o) {
                  _getPrototypeOf = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function _getPrototypeOf(o) {
                        return o.__proto__ || Object.getPrototypeOf(o);
                      };
                  return _getPrototypeOf(o);
                }

                var _require = __webpack_require__(
                    /*! ../utils/log */ './node_modules/webpack-dev-server/client/utils/log.js'
                  ),
                  log = _require.log;

                var BaseClient = __webpack_require__(
                  /*! ./BaseClient */ './node_modules/webpack-dev-server/client/clients/BaseClient.js'
                );

                module.exports = /*#__PURE__*/ (function (_BaseClient) {
                  _inherits(WebsocketClient, _BaseClient);

                  var _super = _createSuper(WebsocketClient);

                  function WebsocketClient(url) {
                    var _this;

                    _classCallCheck(this, WebsocketClient);

                    _this = _super.call(this);
                    _this.client = new WebSocket(url);

                    _this.client.onerror = function (error) {
                      log.error(error);
                    };

                    return _this;
                  } // eslint-disable-next-line no-unused-vars

                  _createClass(
                    WebsocketClient,
                    [
                      {
                        key: 'onOpen',
                        value: function onOpen(f) {
                          this.client.onopen = f;
                        },
                      },
                      {
                        key: 'onClose',
                        value: function onClose(f) {
                          this.client.onclose = f;
                        }, // call f with the message string as the first argument
                      },
                      {
                        key: 'onMessage',
                        value: function onMessage(f) {
                          this.client.onmessage = function (e) {
                            f(e.data);
                          };
                        },
                      },
                    ],
                    [
                      {
                        key: 'getClientPath',
                        value: function getClientPath(options) {
                          return /*require.resolve*/ /*! ./WebsocketClient */ './node_modules/webpack-dev-server/client/clients/WebsocketClient.js';
                        },
                      },
                    ]
                  );

                  return WebsocketClient;
                })(BaseClient);

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/index.js?http://0.0.0.0&host=localhost&port=8500':
              /*!*************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0&host=localhost&port=8500 ***!
  \*************************************************************************************************/
              /***/ (
                __unused_webpack_module,
                __unused_webpack_exports,
                __webpack_require__
              ) => {
                'use strict';
                var __resourceQuery =
                  '?http://0.0.0.0&host=localhost&port=8500';

                /* global __resourceQuery WorkerGlobalScope */

                function _slicedToArray(arr, i) {
                  return (
                    _arrayWithHoles(arr) ||
                    _iterableToArrayLimit(arr, i) ||
                    _unsupportedIterableToArray(arr, i) ||
                    _nonIterableRest()
                  );
                }

                function _nonIterableRest() {
                  throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                  );
                }

                function _iterableToArrayLimit(arr, i) {
                  if (
                    typeof Symbol === 'undefined' ||
                    !(Symbol.iterator in Object(arr))
                  )
                    return;
                  var _arr = [];
                  var _n = true;
                  var _d = false;
                  var _e = undefined;
                  try {
                    for (
                      var _i = arr[Symbol.iterator](), _s;
                      !(_n = (_s = _i.next()).done);
                      _n = true
                    ) {
                      _arr.push(_s.value);
                      if (i && _arr.length === i) break;
                    }
                  } catch (err) {
                    _d = true;
                    _e = err;
                  } finally {
                    try {
                      if (!_n && _i['return'] != null) _i['return']();
                    } finally {
                      if (_d) throw _e;
                    }
                  }
                  return _arr;
                }

                function _arrayWithHoles(arr) {
                  if (Array.isArray(arr)) return arr;
                }

                function _createForOfIteratorHelper(o, allowArrayLike) {
                  var it;
                  if (
                    typeof Symbol === 'undefined' ||
                    o[Symbol.iterator] == null
                  ) {
                    if (
                      Array.isArray(o) ||
                      (it = _unsupportedIterableToArray(o)) ||
                      (allowArrayLike && o && typeof o.length === 'number')
                    ) {
                      if (it) o = it;
                      var i = 0;
                      var F = function F() {};
                      return {
                        s: F,
                        n: function n() {
                          if (i >= o.length) return { done: true };
                          return { done: false, value: o[i++] };
                        },
                        e: function e(_e2) {
                          throw _e2;
                        },
                        f: F,
                      };
                    }
                    throw new TypeError(
                      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                    );
                  }
                  var normalCompletion = true,
                    didErr = false,
                    err;
                  return {
                    s: function s() {
                      it = o[Symbol.iterator]();
                    },
                    n: function n() {
                      var step = it.next();
                      normalCompletion = step.done;
                      return step;
                    },
                    e: function e(_e3) {
                      didErr = true;
                      err = _e3;
                    },
                    f: function f() {
                      try {
                        if (!normalCompletion && it.return != null) it.return();
                      } finally {
                        if (didErr) throw err;
                      }
                    },
                  };
                }

                function _unsupportedIterableToArray(o, minLen) {
                  if (!o) return;
                  if (typeof o === 'string')
                    return _arrayLikeToArray(o, minLen);
                  var n = Object.prototype.toString.call(o).slice(8, -1);
                  if (n === 'Object' && o.constructor) n = o.constructor.name;
                  if (n === 'Map' || n === 'Set') return Array.from(o);
                  if (
                    n === 'Arguments' ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  )
                    return _arrayLikeToArray(o, minLen);
                }

                function _arrayLikeToArray(arr, len) {
                  if (len == null || len > arr.length) len = arr.length;
                  for (var i = 0, arr2 = new Array(len); i < len; i++) {
                    arr2[i] = arr[i];
                  }
                  return arr2;
                }

                function _extends() {
                  _extends =
                    Object.assign ||
                    function (target) {
                      for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                          if (
                            Object.prototype.hasOwnProperty.call(source, key)
                          ) {
                            target[key] = source[key];
                          }
                        }
                      }
                      return target;
                    };
                  return _extends.apply(this, arguments);
                }

                var webpackHotLog = __webpack_require__(
                  /*! webpack/hot/log */ './node_modules/webpack/hot/log.js'
                );

                var stripAnsi = __webpack_require__(
                  /*! ./modules/strip-ansi */ './node_modules/webpack-dev-server/client/modules/strip-ansi/index.js'
                );

                var parseURL = __webpack_require__(
                  /*! ./utils/parseURL */ './node_modules/webpack-dev-server/client/utils/parseURL.js'
                );

                var socket = __webpack_require__(
                  /*! ./socket */ './node_modules/webpack-dev-server/client/socket.js'
                );

                var overlay = __webpack_require__(
                  /*! ./overlay */ './node_modules/webpack-dev-server/client/overlay.js'
                );

                var _require = __webpack_require__(
                    /*! ./utils/log */ './node_modules/webpack-dev-server/client/utils/log.js'
                  ),
                  log = _require.log,
                  setLogLevel = _require.setLogLevel;

                var sendMessage = __webpack_require__(
                  /*! ./utils/sendMessage */ './node_modules/webpack-dev-server/client/utils/sendMessage.js'
                );

                var reloadApp = __webpack_require__(
                  /*! ./utils/reloadApp */ './node_modules/webpack-dev-server/client/utils/reloadApp.js'
                );

                var createSocketURL = __webpack_require__(
                  /*! ./utils/createSocketURL */ './node_modules/webpack-dev-server/client/utils/createSocketURL.js'
                );

                var status = {
                  isUnloading: false,
                  currentHash: '',
                };
                var defaultOptions = {
                  hot: false,
                  hotReload: true,
                  liveReload: false,
                  initial: true,
                  progress: false,
                  overlay: false,
                };
                var parsedResourceQuery = parseURL(__resourceQuery);
                var options = defaultOptions; // Handle Node.js legacy format and `new URL()`

                if (parsedResourceQuery.query) {
                  _extends(options, parsedResourceQuery.query);
                } else if (parsedResourceQuery.searchParams) {
                  var paramsToObject = function paramsToObject(entries) {
                    var result = {};

                    var _iterator = _createForOfIteratorHelper(entries),
                      _step;

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var _step$value = _slicedToArray(_step.value, 2),
                          key = _step$value[0],
                          value = _step$value[1];

                        result[key] = value;
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }

                    return result;
                  };

                  _extends(
                    options,
                    paramsToObject(parsedResourceQuery.searchParams.entries())
                  );
                }

                var socketURL = createSocketURL(parsedResourceQuery);

                function setAllLogLevel(level) {
                  // This is needed because the HMR logger operate separately from dev server logger
                  webpackHotLog.setLogLevel(level);
                  setLogLevel(level);
                }

                if (options.logging) {
                  setAllLogLevel(options.logging);
                }

                self.addEventListener('beforeunload', function () {
                  status.isUnloading = true;
                });

                if (typeof window !== 'undefined') {
                  var qs = window.location.search.toLowerCase();
                  options.hotReload = qs.indexOf('hotreload=false') === -1;
                }

                var onSocketMessage = {
                  hot: function hot() {
                    options.hot = true;
                    log.info('Hot Module Replacement enabled.');
                  },
                  liveReload: function liveReload() {
                    options.liveReload = true;
                    log.info('Live Reloading enabled.');
                  },
                  invalid: function invalid() {
                    log.info('App updated. Recompiling...'); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

                    if (options.overlay) {
                      overlay.clear();
                    }

                    sendMessage('Invalid');
                  },
                  hash: function hash(_hash) {
                    status.currentHash = _hash;
                  },
                  logging: setAllLogLevel,
                  overlay: function overlay(value) {
                    if (typeof document === 'undefined') {
                      return;
                    }

                    options.overlay = value;
                  },
                  progress: function progress(_progress) {
                    options.progress = _progress;
                  },
                  'progress-update': function progressUpdate(data) {
                    if (options.progress) {
                      log.info(
                        ''.concat(data.percent, '% - ').concat(data.msg, '.')
                      );
                    }

                    sendMessage('Progress', data);
                  },
                  'still-ok': function stillOk() {
                    log.info('Nothing changed.');

                    if (options.overlay) {
                      overlay.clear();
                    }

                    sendMessage('StillOk');
                  },
                  ok: function ok() {
                    sendMessage('Ok');

                    if (options.overlay) {
                      overlay.clear();
                    }

                    if (options.initial) {
                      return (options.initial = false);
                    }

                    reloadApp(options, status);
                  },
                  'content-changed': function contentChanged() {
                    log.info('Content base changed. Reloading...');
                    self.location.reload();
                  },
                  warnings: function warnings(_warnings) {
                    log.warn('Warnings while compiling.');

                    var strippedWarnings = _warnings.map(function (warning) {
                      return stripAnsi(
                        warning.message ? warning.message : warning
                      );
                    });

                    sendMessage('Warnings', strippedWarnings);

                    for (var i = 0; i < strippedWarnings.length; i++) {
                      log.warn(strippedWarnings[i]);
                    }

                    var needShowOverlay =
                      typeof options.overlay === 'boolean'
                        ? options.overlay
                        : options.overlay && options.overlay.warnings;

                    if (needShowOverlay) {
                      overlay.showMessage(_warnings);
                    }

                    if (options.initial) {
                      return (options.initial = false);
                    }

                    reloadApp(options, status);
                  },
                  errors: function errors(_errors) {
                    log.error('Errors while compiling. Reload prevented.');

                    var strippedErrors = _errors.map(function (error) {
                      return stripAnsi(error.message ? error.message : error);
                    });

                    sendMessage('Errors', strippedErrors);

                    for (var i = 0; i < strippedErrors.length; i++) {
                      log.error(strippedErrors[i]);
                    }

                    var needShowOverlay =
                      typeof options.overlay === 'boolean'
                        ? options.overlay
                        : options.overlay && options.overlay.errors;

                    if (needShowOverlay) {
                      overlay.showMessage(_errors);
                    }

                    options.initial = false;
                  },
                  error: function error(_error) {
                    log.error(_error);
                  },
                  close: function close() {
                    log.error('Disconnected!');
                    sendMessage('Close');
                  },
                };
                socket(socketURL, onSocketMessage);

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/modules/logger/index.js':
              /*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
              /***/ (module) => {
                /******/ (function () {
                  // webpackBootstrap
                  /******/ var __webpack_modules__ = {
                    /***/ './client/modules/logger/SyncBailHookFake.js':
                      /*!***************************************************!*\
  !*** ./client/modules/logger/SyncBailHookFake.js ***!
  \***************************************************/
                      /***/ function (module) {
                        'use strict';

                        /**
                         * Client stub for tapable SyncBailHook
                         */

                        module.exports = function clientTapableSyncBailHook() {
                          return {
                            call: function call() {},
                          };
                        };

                        /***/
                      },

                    /***/ './client/modules/logger/index.js':
                      /*!****************************************!*\
  !*** ./client/modules/logger/index.js ***!
  \****************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_742__
                      ) {
                        'use strict';
                        // eslint-disable-next-line import/no-extraneous-dependencies

                        __nested_webpack_require_742__(
                          /*! core-js/stable/symbol */ './node_modules/core-js/stable/symbol/index.js'
                        );

                        module.exports = __nested_webpack_require_742__(
                          /*! webpack/lib/logging/runtime */ './node_modules/webpack/lib/logging/runtime.js'
                        );

                        /***/
                      },

                    /***/ './node_modules/core-js/es/symbol/index.js':
                      /*!*************************************************!*\
  !*** ./node_modules/core-js/es/symbol/index.js ***!
  \*************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_1343__
                      ) {
                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.array.concat */ './node_modules/core-js/modules/es.array.concat.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.object.to-string */ './node_modules/core-js/modules/es.object.to-string.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol */ './node_modules/core-js/modules/es.symbol.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.async-iterator */ './node_modules/core-js/modules/es.symbol.async-iterator.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.description */ './node_modules/core-js/modules/es.symbol.description.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.has-instance */ './node_modules/core-js/modules/es.symbol.has-instance.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.is-concat-spreadable */ './node_modules/core-js/modules/es.symbol.is-concat-spreadable.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.iterator */ './node_modules/core-js/modules/es.symbol.iterator.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.match */ './node_modules/core-js/modules/es.symbol.match.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.match-all */ './node_modules/core-js/modules/es.symbol.match-all.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.replace */ './node_modules/core-js/modules/es.symbol.replace.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.search */ './node_modules/core-js/modules/es.symbol.search.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.species */ './node_modules/core-js/modules/es.symbol.species.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.split */ './node_modules/core-js/modules/es.symbol.split.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.to-primitive */ './node_modules/core-js/modules/es.symbol.to-primitive.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.to-string-tag */ './node_modules/core-js/modules/es.symbol.to-string-tag.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.symbol.unscopables */ './node_modules/core-js/modules/es.symbol.unscopables.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.json.to-string-tag */ './node_modules/core-js/modules/es.json.to-string-tag.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.math.to-string-tag */ './node_modules/core-js/modules/es.math.to-string-tag.js'
                        );

                        __nested_webpack_require_1343__(
                          /*! ../../modules/es.reflect.to-string-tag */ './node_modules/core-js/modules/es.reflect.to-string-tag.js'
                        );

                        var path = __nested_webpack_require_1343__(
                          /*! ../../internals/path */ './node_modules/core-js/internals/path.js'
                        );

                        module.exports = path.Symbol;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/a-function.js':
                      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
                      /***/ function (module) {
                        module.exports = function (it) {
                          if (typeof it != 'function') {
                            throw TypeError(String(it) + ' is not a function');
                          }

                          return it;
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/an-object.js':
                      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_4630__
                      ) {
                        var isObject = __nested_webpack_require_4630__(
                          /*! ../internals/is-object */ './node_modules/core-js/internals/is-object.js'
                        );

                        module.exports = function (it) {
                          if (!isObject(it)) {
                            throw TypeError(String(it) + ' is not an object');
                          }

                          return it;
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/array-includes.js':
                      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_5215__
                      ) {
                        var toIndexedObject = __nested_webpack_require_5215__(
                          /*! ../internals/to-indexed-object */ './node_modules/core-js/internals/to-indexed-object.js'
                        );

                        var toLength = __nested_webpack_require_5215__(
                          /*! ../internals/to-length */ './node_modules/core-js/internals/to-length.js'
                        );

                        var toAbsoluteIndex = __nested_webpack_require_5215__(
                          /*! ../internals/to-absolute-index */ './node_modules/core-js/internals/to-absolute-index.js'
                        ); // `Array.prototype.{ indexOf, includes }` methods implementation

                        var createMethod = function createMethod(IS_INCLUDES) {
                          return function ($this, el, fromIndex) {
                            var O = toIndexedObject($this);
                            var length = toLength(O.length);
                            var index = toAbsoluteIndex(fromIndex, length);
                            var value; // Array#includes uses SameValueZero equality algorithm
                            // eslint-disable-next-line no-self-compare -- NaN check

                            if (IS_INCLUDES && el != el)
                              while (length > index) {
                                value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

                                if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
                              }
                            else
                              for (; length > index; index++) {
                                if (
                                  (IS_INCLUDES || index in O) &&
                                  O[index] === el
                                )
                                  return IS_INCLUDES || index || 0;
                              }
                            return !IS_INCLUDES && -1;
                          };
                        };

                        module.exports = {
                          // `Array.prototype.includes` method
                          // https://tc39.es/ecma262/#sec-array.prototype.includes
                          includes: createMethod(true),
                          // `Array.prototype.indexOf` method
                          // https://tc39.es/ecma262/#sec-array.prototype.indexof
                          indexOf: createMethod(false),
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/array-iteration.js':
                      /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_7070__
                      ) {
                        var bind = __nested_webpack_require_7070__(
                          /*! ../internals/function-bind-context */ './node_modules/core-js/internals/function-bind-context.js'
                        );

                        var IndexedObject = __nested_webpack_require_7070__(
                          /*! ../internals/indexed-object */ './node_modules/core-js/internals/indexed-object.js'
                        );

                        var toObject = __nested_webpack_require_7070__(
                          /*! ../internals/to-object */ './node_modules/core-js/internals/to-object.js'
                        );

                        var toLength = __nested_webpack_require_7070__(
                          /*! ../internals/to-length */ './node_modules/core-js/internals/to-length.js'
                        );

                        var arraySpeciesCreate =
                          __nested_webpack_require_7070__(
                            /*! ../internals/array-species-create */ './node_modules/core-js/internals/array-species-create.js'
                          );

                        var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

                        var createMethod = function createMethod(TYPE) {
                          var IS_MAP = TYPE == 1;
                          var IS_FILTER = TYPE == 2;
                          var IS_SOME = TYPE == 3;
                          var IS_EVERY = TYPE == 4;
                          var IS_FIND_INDEX = TYPE == 6;
                          var IS_FILTER_OUT = TYPE == 7;
                          var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
                          return function (
                            $this,
                            callbackfn,
                            that,
                            specificCreate
                          ) {
                            var O = toObject($this);
                            var self = IndexedObject(O);
                            var boundFunction = bind(callbackfn, that, 3);
                            var length = toLength(self.length);
                            var index = 0;
                            var create = specificCreate || arraySpeciesCreate;
                            var target = IS_MAP
                              ? create($this, length)
                              : IS_FILTER || IS_FILTER_OUT
                              ? create($this, 0)
                              : undefined;
                            var value, result;

                            for (; length > index; index++) {
                              if (NO_HOLES || index in self) {
                                value = self[index];
                                result = boundFunction(value, index, O);

                                if (TYPE) {
                                  if (IS_MAP) target[index] = result; // map
                                  else if (result)
                                    switch (TYPE) {
                                      case 3:
                                        return true;
                                      // some

                                      case 5:
                                        return value;
                                      // find

                                      case 6:
                                        return index;
                                      // findIndex

                                      case 2:
                                        push.call(target, value);
                                      // filter
                                    }
                                  else
                                    switch (TYPE) {
                                      case 4:
                                        return false;
                                      // every

                                      case 7:
                                        push.call(target, value);
                                      // filterOut
                                    }
                                }
                              }
                            }

                            return IS_FIND_INDEX
                              ? -1
                              : IS_SOME || IS_EVERY
                              ? IS_EVERY
                              : target;
                          };
                        };

                        module.exports = {
                          // `Array.prototype.forEach` method
                          // https://tc39.es/ecma262/#sec-array.prototype.foreach
                          forEach: createMethod(0),
                          // `Array.prototype.map` method
                          // https://tc39.es/ecma262/#sec-array.prototype.map
                          map: createMethod(1),
                          // `Array.prototype.filter` method
                          // https://tc39.es/ecma262/#sec-array.prototype.filter
                          filter: createMethod(2),
                          // `Array.prototype.some` method
                          // https://tc39.es/ecma262/#sec-array.prototype.some
                          some: createMethod(3),
                          // `Array.prototype.every` method
                          // https://tc39.es/ecma262/#sec-array.prototype.every
                          every: createMethod(4),
                          // `Array.prototype.find` method
                          // https://tc39.es/ecma262/#sec-array.prototype.find
                          find: createMethod(5),
                          // `Array.prototype.findIndex` method
                          // https://tc39.es/ecma262/#sec-array.prototype.findIndex
                          findIndex: createMethod(6),
                          // `Array.prototype.filterOut` method
                          // https://github.com/tc39/proposal-array-filtering
                          filterOut: createMethod(7),
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/array-method-has-species-support.js':
                      /*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-has-species-support.js ***!
  \****************************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_10841__
                      ) {
                        var fails = __nested_webpack_require_10841__(
                          /*! ../internals/fails */ './node_modules/core-js/internals/fails.js'
                        );

                        var wellKnownSymbol = __nested_webpack_require_10841__(
                          /*! ../internals/well-known-symbol */ './node_modules/core-js/internals/well-known-symbol.js'
                        );

                        var V8_VERSION = __nested_webpack_require_10841__(
                          /*! ../internals/engine-v8-version */ './node_modules/core-js/internals/engine-v8-version.js'
                        );

                        var SPECIES = wellKnownSymbol('species');

                        module.exports = function (METHOD_NAME) {
                          // We can't use this feature detection in V8 since it causes
                          // deoptimization and serious performance degradation
                          // https://github.com/zloirock/core-js/issues/677
                          return (
                            V8_VERSION >= 51 ||
                            !fails(function () {
                              var array = [];
                              var constructor = (array.constructor = {});

                              constructor[SPECIES] = function () {
                                return {
                                  foo: 1,
                                };
                              };

                              return array[METHOD_NAME](Boolean).foo !== 1;
                            })
                          );
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/array-species-create.js':
                      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_12100__
                      ) {
                        var isObject = __nested_webpack_require_12100__(
                          /*! ../internals/is-object */ './node_modules/core-js/internals/is-object.js'
                        );

                        var isArray = __nested_webpack_require_12100__(
                          /*! ../internals/is-array */ './node_modules/core-js/internals/is-array.js'
                        );

                        var wellKnownSymbol = __nested_webpack_require_12100__(
                          /*! ../internals/well-known-symbol */ './node_modules/core-js/internals/well-known-symbol.js'
                        );

                        var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
                        // https://tc39.es/ecma262/#sec-arrayspeciescreate

                        module.exports = function (originalArray, length) {
                          var C;

                          if (isArray(originalArray)) {
                            C = originalArray.constructor; // cross-realm fallback

                            if (
                              typeof C == 'function' &&
                              (C === Array || isArray(C.prototype))
                            )
                              C = undefined;
                            else if (isObject(C)) {
                              C = C[SPECIES];
                              if (C === null) C = undefined;
                            }
                          }

                          return new (C === undefined ? Array : C)(
                            length === 0 ? 0 : length
                          );
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/classof-raw.js':
                      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
                      /***/ function (module) {
                        var toString = {}.toString;

                        module.exports = function (it) {
                          return toString.call(it).slice(8, -1);
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/classof.js':
                      /*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_13707__
                      ) {
                        var TO_STRING_TAG_SUPPORT =
                          __nested_webpack_require_13707__(
                            /*! ../internals/to-string-tag-support */ './node_modules/core-js/internals/to-string-tag-support.js'
                          );

                        var classofRaw = __nested_webpack_require_13707__(
                          /*! ../internals/classof-raw */ './node_modules/core-js/internals/classof-raw.js'
                        );

                        var wellKnownSymbol = __nested_webpack_require_13707__(
                          /*! ../internals/well-known-symbol */ './node_modules/core-js/internals/well-known-symbol.js'
                        );

                        var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

                        var CORRECT_ARGUMENTS =
                          classofRaw(
                            (function () {
                              return arguments;
                            })()
                          ) == 'Arguments'; // fallback for IE11 Script Access Denied error

                        var tryGet = function tryGet(it, key) {
                          try {
                            return it[key];
                          } catch (error) {
                            /* empty */
                          }
                        }; // getting tag from ES6+ `Object.prototype.toString`

                        module.exports = TO_STRING_TAG_SUPPORT
                          ? classofRaw
                          : function (it) {
                              var O, tag, result;
                              return it === undefined
                                ? 'Undefined'
                                : it === null
                                ? 'Null' // @@toStringTag case
                                : typeof (tag = tryGet(
                                    (O = Object(it)),
                                    TO_STRING_TAG
                                  )) == 'string'
                                ? tag // builtinTag case
                                : CORRECT_ARGUMENTS
                                ? classofRaw(O) // ES3 arguments fallback
                                : (result = classofRaw(O)) == 'Object' &&
                                  typeof O.callee == 'function'
                                ? 'Arguments'
                                : result;
                            };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/copy-constructor-properties.js':
                      /*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_15322__
                      ) {
                        var has = __nested_webpack_require_15322__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var ownKeys = __nested_webpack_require_15322__(
                          /*! ../internals/own-keys */ './node_modules/core-js/internals/own-keys.js'
                        );

                        var getOwnPropertyDescriptorModule =
                          __nested_webpack_require_15322__(
                            /*! ../internals/object-get-own-property-descriptor */ './node_modules/core-js/internals/object-get-own-property-descriptor.js'
                          );

                        var definePropertyModule =
                          __nested_webpack_require_15322__(
                            /*! ../internals/object-define-property */ './node_modules/core-js/internals/object-define-property.js'
                          );

                        module.exports = function (target, source) {
                          var keys = ownKeys(source);
                          var defineProperty = definePropertyModule.f;
                          var getOwnPropertyDescriptor =
                            getOwnPropertyDescriptorModule.f;

                          for (var i = 0; i < keys.length; i++) {
                            var key = keys[i];
                            if (!has(target, key))
                              defineProperty(
                                target,
                                key,
                                getOwnPropertyDescriptor(source, key)
                              );
                          }
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/create-non-enumerable-property.js':
                      /*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_16634__
                      ) {
                        var DESCRIPTORS = __nested_webpack_require_16634__(
                          /*! ../internals/descriptors */ './node_modules/core-js/internals/descriptors.js'
                        );

                        var definePropertyModule =
                          __nested_webpack_require_16634__(
                            /*! ../internals/object-define-property */ './node_modules/core-js/internals/object-define-property.js'
                          );

                        var createPropertyDescriptor =
                          __nested_webpack_require_16634__(
                            /*! ../internals/create-property-descriptor */ './node_modules/core-js/internals/create-property-descriptor.js'
                          );

                        module.exports = DESCRIPTORS
                          ? function (object, key, value) {
                              return definePropertyModule.f(
                                object,
                                key,
                                createPropertyDescriptor(1, value)
                              );
                            }
                          : function (object, key, value) {
                              object[key] = value;
                              return object;
                            };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/create-property-descriptor.js':
                      /*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
                      /***/ function (module) {
                        module.exports = function (bitmap, value) {
                          return {
                            enumerable: !(bitmap & 1),
                            configurable: !(bitmap & 2),
                            writable: !(bitmap & 4),
                            value: value,
                          };
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/create-property.js':
                      /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_18153__
                      ) {
                        'use strict';

                        var toPrimitive = __nested_webpack_require_18153__(
                          /*! ../internals/to-primitive */ './node_modules/core-js/internals/to-primitive.js'
                        );

                        var definePropertyModule =
                          __nested_webpack_require_18153__(
                            /*! ../internals/object-define-property */ './node_modules/core-js/internals/object-define-property.js'
                          );

                        var createPropertyDescriptor =
                          __nested_webpack_require_18153__(
                            /*! ../internals/create-property-descriptor */ './node_modules/core-js/internals/create-property-descriptor.js'
                          );

                        module.exports = function (object, key, value) {
                          var propertyKey = toPrimitive(key);
                          if (propertyKey in object)
                            definePropertyModule.f(
                              object,
                              propertyKey,
                              createPropertyDescriptor(0, value)
                            );
                          else object[propertyKey] = value;
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/define-well-known-symbol.js':
                      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-well-known-symbol.js ***!
  \********************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_19224__
                      ) {
                        var path = __nested_webpack_require_19224__(
                          /*! ../internals/path */ './node_modules/core-js/internals/path.js'
                        );

                        var has = __nested_webpack_require_19224__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var wrappedWellKnownSymbolModule =
                          __nested_webpack_require_19224__(
                            /*! ../internals/well-known-symbol-wrapped */ './node_modules/core-js/internals/well-known-symbol-wrapped.js'
                          );

                        var defineProperty = __nested_webpack_require_19224__(
                          /*! ../internals/object-define-property */ './node_modules/core-js/internals/object-define-property.js'
                        ).f;

                        module.exports = function (NAME) {
                          var Symbol = path.Symbol || (path.Symbol = {});
                          if (!has(Symbol, NAME))
                            defineProperty(Symbol, NAME, {
                              value: wrappedWellKnownSymbolModule.f(NAME),
                            });
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/descriptors.js':
                      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_20267__
                      ) {
                        var fails = __nested_webpack_require_20267__(
                          /*! ../internals/fails */ './node_modules/core-js/internals/fails.js'
                        ); // Detect IE8's incomplete defineProperty implementation

                        module.exports = !fails(function () {
                          // eslint-disable-next-line es/no-object-defineproperty -- required for testing
                          return (
                            Object.defineProperty({}, 1, {
                              get: function get() {
                                return 7;
                              },
                            })[1] != 7
                          );
                        });

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/document-create-element.js':
                      /*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_21029__
                      ) {
                        var global = __nested_webpack_require_21029__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var isObject = __nested_webpack_require_21029__(
                          /*! ../internals/is-object */ './node_modules/core-js/internals/is-object.js'
                        );

                        var document = global.document; // typeof document.createElement is 'object' in old IE

                        var EXISTS =
                          isObject(document) &&
                          isObject(document.createElement);

                        module.exports = function (it) {
                          return EXISTS ? document.createElement(it) : {};
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/engine-is-node.js':
                      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-node.js ***!
  \**********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_21835__
                      ) {
                        var classof = __nested_webpack_require_21835__(
                          /*! ../internals/classof-raw */ './node_modules/core-js/internals/classof-raw.js'
                        );

                        var global = __nested_webpack_require_21835__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        module.exports = classof(global.process) == 'process';

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/engine-user-agent.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_22466__
                      ) {
                        var getBuiltIn = __nested_webpack_require_22466__(
                          /*! ../internals/get-built-in */ './node_modules/core-js/internals/get-built-in.js'
                        );

                        module.exports =
                          getBuiltIn('navigator', 'userAgent') || '';

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/engine-v8-version.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_23000__
                      ) {
                        var global = __nested_webpack_require_23000__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var userAgent = __nested_webpack_require_23000__(
                          /*! ../internals/engine-user-agent */ './node_modules/core-js/internals/engine-user-agent.js'
                        );

                        var process = global.process;
                        var versions = process && process.versions;
                        var v8 = versions && versions.v8;
                        var match, version;

                        if (v8) {
                          match = v8.split('.');
                          version = match[0] + match[1];
                        } else if (userAgent) {
                          match = userAgent.match(/Edge\/(\d+)/);

                          if (!match || match[1] >= 74) {
                            match = userAgent.match(/Chrome\/(\d+)/);
                            if (match) version = match[1];
                          }
                        }

                        module.exports = version && +version;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/enum-bug-keys.js':
                      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
                      /***/ function (module) {
                        // IE8- don't enum bug keys
                        module.exports = [
                          'constructor',
                          'hasOwnProperty',
                          'isPrototypeOf',
                          'propertyIsEnumerable',
                          'toLocaleString',
                          'toString',
                          'valueOf',
                        ];

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/export.js':
                      /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_24418__
                      ) {
                        var global = __nested_webpack_require_24418__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var getOwnPropertyDescriptor =
                          __nested_webpack_require_24418__(
                            /*! ../internals/object-get-own-property-descriptor */ './node_modules/core-js/internals/object-get-own-property-descriptor.js'
                          ).f;

                        var createNonEnumerableProperty =
                          __nested_webpack_require_24418__(
                            /*! ../internals/create-non-enumerable-property */ './node_modules/core-js/internals/create-non-enumerable-property.js'
                          );

                        var redefine = __nested_webpack_require_24418__(
                          /*! ../internals/redefine */ './node_modules/core-js/internals/redefine.js'
                        );

                        var setGlobal = __nested_webpack_require_24418__(
                          /*! ../internals/set-global */ './node_modules/core-js/internals/set-global.js'
                        );

                        var copyConstructorProperties =
                          __nested_webpack_require_24418__(
                            /*! ../internals/copy-constructor-properties */ './node_modules/core-js/internals/copy-constructor-properties.js'
                          );

                        var isForced = __nested_webpack_require_24418__(
                          /*! ../internals/is-forced */ './node_modules/core-js/internals/is-forced.js'
                        );
                        /*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/

                        module.exports = function (options, source) {
                          var TARGET = options.target;
                          var GLOBAL = options.global;
                          var STATIC = options.stat;
                          var FORCED,
                            target,
                            key,
                            targetProperty,
                            sourceProperty,
                            descriptor;

                          if (GLOBAL) {
                            target = global;
                          } else if (STATIC) {
                            target = global[TARGET] || setGlobal(TARGET, {});
                          } else {
                            target = (global[TARGET] || {}).prototype;
                          }

                          if (target)
                            for (key in source) {
                              sourceProperty = source[key];

                              if (options.noTargetGet) {
                                descriptor = getOwnPropertyDescriptor(
                                  target,
                                  key
                                );
                                targetProperty = descriptor && descriptor.value;
                              } else targetProperty = target[key];

                              FORCED = isForced(
                                GLOBAL
                                  ? key
                                  : TARGET + (STATIC ? '.' : '#') + key,
                                options.forced
                              ); // contained in target

                              if (!FORCED && targetProperty !== undefined) {
                                if (
                                  typeof sourceProperty ===
                                  typeof targetProperty
                                )
                                  continue;
                                copyConstructorProperties(
                                  sourceProperty,
                                  targetProperty
                                );
                              } // add a flag to not completely full polyfills

                              if (
                                options.sham ||
                                (targetProperty && targetProperty.sham)
                              ) {
                                createNonEnumerableProperty(
                                  sourceProperty,
                                  'sham',
                                  true
                                );
                              } // extend global

                              redefine(target, key, sourceProperty, options);
                            }
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/fails.js':
                      /*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
                      /***/ function (module) {
                        module.exports = function (exec) {
                          try {
                            return !!exec();
                          } catch (error) {
                            return true;
                          }
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/function-bind-context.js':
                      /*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_28182__
                      ) {
                        var aFunction = __nested_webpack_require_28182__(
                          /*! ../internals/a-function */ './node_modules/core-js/internals/a-function.js'
                        ); // optional / simple context binding

                        module.exports = function (fn, that, length) {
                          aFunction(fn);
                          if (that === undefined) return fn;

                          switch (length) {
                            case 0:
                              return function () {
                                return fn.call(that);
                              };

                            case 1:
                              return function (a) {
                                return fn.call(that, a);
                              };

                            case 2:
                              return function (a, b) {
                                return fn.call(that, a, b);
                              };

                            case 3:
                              return function (a, b, c) {
                                return fn.call(that, a, b, c);
                              };
                          }

                          return function () /* ...args */
                          {
                            return fn.apply(that, arguments);
                          };
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/get-built-in.js':
                      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_29227__
                      ) {
                        var path = __nested_webpack_require_29227__(
                          /*! ../internals/path */ './node_modules/core-js/internals/path.js'
                        );

                        var global = __nested_webpack_require_29227__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var aFunction = function aFunction(variable) {
                          return typeof variable == 'function'
                            ? variable
                            : undefined;
                        };

                        module.exports = function (namespace, method) {
                          return arguments.length < 2
                            ? aFunction(path[namespace]) ||
                                aFunction(global[namespace])
                            : (path[namespace] && path[namespace][method]) ||
                                (global[namespace] &&
                                  global[namespace][method]);
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/global.js':
                      /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_30094__
                      ) {
                        var check = function check(it) {
                          return it && it.Math == Math && it;
                        }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

                        module.exports = // eslint-disable-next-line es/no-global-this -- safe
                          check(typeof globalThis == 'object' && globalThis) ||
                          check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
                          check(typeof self == 'object' && self) ||
                          check(
                            typeof __nested_webpack_require_30094__.g ==
                              'object' && __nested_webpack_require_30094__.g
                          ) || // eslint-disable-next-line no-new-func -- fallback
                          (function () {
                            return this;
                          })() ||
                          Function('return this')();

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/has.js':
                      /*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
                      /***/ function (module) {
                        var hasOwnProperty = {}.hasOwnProperty;

                        module.exports = function (it, key) {
                          return hasOwnProperty.call(it, key);
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/hidden-keys.js':
                      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
                      /***/ function (module) {
                        module.exports = {};

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/html.js':
                      /*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_31667__
                      ) {
                        var getBuiltIn = __nested_webpack_require_31667__(
                          /*! ../internals/get-built-in */ './node_modules/core-js/internals/get-built-in.js'
                        );

                        module.exports = getBuiltIn(
                          'document',
                          'documentElement'
                        );

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/ie8-dom-define.js':
                      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_32188__
                      ) {
                        var DESCRIPTORS = __nested_webpack_require_32188__(
                          /*! ../internals/descriptors */ './node_modules/core-js/internals/descriptors.js'
                        );

                        var fails = __nested_webpack_require_32188__(
                          /*! ../internals/fails */ './node_modules/core-js/internals/fails.js'
                        );

                        var createElement = __nested_webpack_require_32188__(
                          /*! ../internals/document-create-element */ './node_modules/core-js/internals/document-create-element.js'
                        ); // Thank's IE8 for his funny defineProperty

                        module.exports =
                          !DESCRIPTORS &&
                          !fails(function () {
                            // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
                            return (
                              Object.defineProperty(createElement('div'), 'a', {
                                get: function get() {
                                  return 7;
                                },
                              }).a != 7
                            );
                          });

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/indexed-object.js':
                      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_33207__
                      ) {
                        var fails = __nested_webpack_require_33207__(
                          /*! ../internals/fails */ './node_modules/core-js/internals/fails.js'
                        );

                        var classof = __nested_webpack_require_33207__(
                          /*! ../internals/classof-raw */ './node_modules/core-js/internals/classof-raw.js'
                        );

                        var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

                        module.exports = fails(function () {
                          // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
                          // eslint-disable-next-line no-prototype-builtins -- safe
                          return !Object('z').propertyIsEnumerable(0);
                        })
                          ? function (it) {
                              return classof(it) == 'String'
                                ? split.call(it, '')
                                : Object(it);
                            }
                          : Object;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/inspect-source.js':
                      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_34184__
                      ) {
                        var store = __nested_webpack_require_34184__(
                          /*! ../internals/shared-store */ './node_modules/core-js/internals/shared-store.js'
                        );

                        var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

                        if (typeof store.inspectSource != 'function') {
                          store.inspectSource = function (it) {
                            return functionToString.call(it);
                          };
                        }

                        module.exports = store.inspectSource;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/internal-state.js':
                      /*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_34927__
                      ) {
                        var NATIVE_WEAK_MAP = __nested_webpack_require_34927__(
                          /*! ../internals/native-weak-map */ './node_modules/core-js/internals/native-weak-map.js'
                        );

                        var global = __nested_webpack_require_34927__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var isObject = __nested_webpack_require_34927__(
                          /*! ../internals/is-object */ './node_modules/core-js/internals/is-object.js'
                        );

                        var createNonEnumerableProperty =
                          __nested_webpack_require_34927__(
                            /*! ../internals/create-non-enumerable-property */ './node_modules/core-js/internals/create-non-enumerable-property.js'
                          );

                        var objectHas = __nested_webpack_require_34927__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var shared = __nested_webpack_require_34927__(
                          /*! ../internals/shared-store */ './node_modules/core-js/internals/shared-store.js'
                        );

                        var sharedKey = __nested_webpack_require_34927__(
                          /*! ../internals/shared-key */ './node_modules/core-js/internals/shared-key.js'
                        );

                        var hiddenKeys = __nested_webpack_require_34927__(
                          /*! ../internals/hidden-keys */ './node_modules/core-js/internals/hidden-keys.js'
                        );

                        var OBJECT_ALREADY_INITIALIZED =
                          'Object already initialized';
                        var WeakMap = global.WeakMap;
                        var set, get, has;

                        var enforce = function enforce(it) {
                          return has(it) ? get(it) : set(it, {});
                        };

                        var getterFor = function getterFor(TYPE) {
                          return function (it) {
                            var state;

                            if (
                              !isObject(it) ||
                              (state = get(it)).type !== TYPE
                            ) {
                              throw TypeError(
                                'Incompatible receiver, ' + TYPE + ' required'
                              );
                            }

                            return state;
                          };
                        };

                        if (NATIVE_WEAK_MAP) {
                          var store =
                            shared.state || (shared.state = new WeakMap());
                          var wmget = store.get;
                          var wmhas = store.has;
                          var wmset = store.set;

                          set = function set(it, metadata) {
                            if (wmhas.call(store, it))
                              throw new TypeError(OBJECT_ALREADY_INITIALIZED);
                            metadata.facade = it;
                            wmset.call(store, it, metadata);
                            return metadata;
                          };

                          get = function get(it) {
                            return wmget.call(store, it) || {};
                          };

                          has = function has(it) {
                            return wmhas.call(store, it);
                          };
                        } else {
                          var STATE = sharedKey('state');
                          hiddenKeys[STATE] = true;

                          set = function set(it, metadata) {
                            if (objectHas(it, STATE))
                              throw new TypeError(OBJECT_ALREADY_INITIALIZED);
                            metadata.facade = it;
                            createNonEnumerableProperty(it, STATE, metadata);
                            return metadata;
                          };

                          get = function get(it) {
                            return objectHas(it, STATE) ? it[STATE] : {};
                          };

                          has = function has(it) {
                            return objectHas(it, STATE);
                          };
                        }

                        module.exports = {
                          set: set,
                          get: get,
                          has: has,
                          enforce: enforce,
                          getterFor: getterFor,
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/is-array.js':
                      /*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_37741__
                      ) {
                        var classof = __nested_webpack_require_37741__(
                          /*! ../internals/classof-raw */ './node_modules/core-js/internals/classof-raw.js'
                        ); // `IsArray` abstract operation
                        // https://tc39.es/ecma262/#sec-isarray
                        // eslint-disable-next-line es/no-array-isarray -- safe

                        module.exports =
                          Array.isArray ||
                          function isArray(arg) {
                            return classof(arg) == 'Array';
                          };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/is-forced.js':
                      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_38401__
                      ) {
                        var fails = __nested_webpack_require_38401__(
                          /*! ../internals/fails */ './node_modules/core-js/internals/fails.js'
                        );

                        var replacement = /#|\.prototype\./;

                        var isForced = function isForced(feature, detection) {
                          var value = data[normalize(feature)];
                          return value == POLYFILL
                            ? true
                            : value == NATIVE
                            ? false
                            : typeof detection == 'function'
                            ? fails(detection)
                            : !!detection;
                        };

                        var normalize = (isForced.normalize = function (
                          string
                        ) {
                          return String(string)
                            .replace(replacement, '.')
                            .toLowerCase();
                        });

                        var data = (isForced.data = {});
                        var NATIVE = (isForced.NATIVE = 'N');
                        var POLYFILL = (isForced.POLYFILL = 'P');
                        module.exports = isForced;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/is-object.js':
                      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
                      /***/ function (module) {
                        module.exports = function (it) {
                          return typeof it === 'object'
                            ? it !== null
                            : typeof it === 'function';
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/is-pure.js':
                      /*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
                      /***/ function (module) {
                        module.exports = false;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/native-symbol.js':
                      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_40029__
                      ) {
                        var IS_NODE = __nested_webpack_require_40029__(
                          /*! ../internals/engine-is-node */ './node_modules/core-js/internals/engine-is-node.js'
                        );

                        var V8_VERSION = __nested_webpack_require_40029__(
                          /*! ../internals/engine-v8-version */ './node_modules/core-js/internals/engine-v8-version.js'
                        );

                        var fails = __nested_webpack_require_40029__(
                          /*! ../internals/fails */ './node_modules/core-js/internals/fails.js'
                        ); // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

                        module.exports =
                          !!Object.getOwnPropertySymbols &&
                          !fails(function () {
                            // eslint-disable-next-line es/no-symbol -- required for testing
                            return (
                              !Symbol.sham && // Chrome 38 Symbol has incorrect toString conversion
                              // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
                              (IS_NODE
                                ? V8_VERSION === 38
                                : V8_VERSION > 37 && V8_VERSION < 41)
                            );
                          });

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/native-weak-map.js':
                      /*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_41204__
                      ) {
                        var global = __nested_webpack_require_41204__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var inspectSource = __nested_webpack_require_41204__(
                          /*! ../internals/inspect-source */ './node_modules/core-js/internals/inspect-source.js'
                        );

                        var WeakMap = global.WeakMap;
                        module.exports =
                          typeof WeakMap === 'function' &&
                          /native code/.test(inspectSource(WeakMap));

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-create.js':
                      /*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_41900__
                      ) {
                        var anObject = __nested_webpack_require_41900__(
                          /*! ../internals/an-object */ './node_modules/core-js/internals/an-object.js'
                        );

                        var defineProperties = __nested_webpack_require_41900__(
                          /*! ../internals/object-define-properties */ './node_modules/core-js/internals/object-define-properties.js'
                        );

                        var enumBugKeys = __nested_webpack_require_41900__(
                          /*! ../internals/enum-bug-keys */ './node_modules/core-js/internals/enum-bug-keys.js'
                        );

                        var hiddenKeys = __nested_webpack_require_41900__(
                          /*! ../internals/hidden-keys */ './node_modules/core-js/internals/hidden-keys.js'
                        );

                        var html = __nested_webpack_require_41900__(
                          /*! ../internals/html */ './node_modules/core-js/internals/html.js'
                        );

                        var documentCreateElement =
                          __nested_webpack_require_41900__(
                            /*! ../internals/document-create-element */ './node_modules/core-js/internals/document-create-element.js'
                          );

                        var sharedKey = __nested_webpack_require_41900__(
                          /*! ../internals/shared-key */ './node_modules/core-js/internals/shared-key.js'
                        );

                        var GT = '>';
                        var LT = '<';
                        var PROTOTYPE = 'prototype';
                        var SCRIPT = 'script';
                        var IE_PROTO = sharedKey('IE_PROTO');

                        var EmptyConstructor = function EmptyConstructor() {
                          /* empty */
                        };

                        var scriptTag = function scriptTag(content) {
                          return (
                            LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT
                          );
                        }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype

                        var NullProtoObjectViaActiveX =
                          function NullProtoObjectViaActiveX(activeXDocument) {
                            activeXDocument.write(scriptTag(''));
                            activeXDocument.close();
                            var temp = activeXDocument.parentWindow.Object;
                            activeXDocument = null; // avoid memory leak

                            return temp;
                          }; // Create object with fake `null` prototype: use iframe Object with cleared prototype

                        var NullProtoObjectViaIFrame =
                          function NullProtoObjectViaIFrame() {
                            // Thrash, waste and sodomy: IE GC bug
                            var iframe = documentCreateElement('iframe');
                            var JS = 'java' + SCRIPT + ':';
                            var iframeDocument;
                            iframe.style.display = 'none';
                            html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

                            iframe.src = String(JS);
                            iframeDocument = iframe.contentWindow.document;
                            iframeDocument.open();
                            iframeDocument.write(
                              scriptTag('document.F=Object')
                            );
                            iframeDocument.close();
                            return iframeDocument.F;
                          }; // Check for document.domain and active x support
                        // No need to use active x approach when document.domain is not set
                        // see https://github.com/es-shims/es5-shim/issues/150
                        // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
                        // avoid IE GC bug

                        var activeXDocument;

                        var _NullProtoObject = function NullProtoObject() {
                          try {
                            /* global ActiveXObject -- old IE */
                            activeXDocument =
                              document.domain && new ActiveXObject('htmlfile');
                          } catch (error) {
                            /* ignore */
                          }

                          _NullProtoObject = activeXDocument
                            ? NullProtoObjectViaActiveX(activeXDocument)
                            : NullProtoObjectViaIFrame();
                          var length = enumBugKeys.length;

                          while (length--) {
                            delete _NullProtoObject[PROTOTYPE][
                              enumBugKeys[length]
                            ];
                          }

                          return _NullProtoObject();
                        };

                        hiddenKeys[IE_PROTO] = true; // `Object.create` method
                        // https://tc39.es/ecma262/#sec-object.create

                        module.exports =
                          Object.create ||
                          function create(O, Properties) {
                            var result;

                            if (O !== null) {
                              EmptyConstructor[PROTOTYPE] = anObject(O);
                              result = new EmptyConstructor();
                              EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

                              result[IE_PROTO] = O;
                            } else result = _NullProtoObject();

                            return Properties === undefined
                              ? result
                              : defineProperties(result, Properties);
                          };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-define-properties.js':
                      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_45772__
                      ) {
                        var DESCRIPTORS = __nested_webpack_require_45772__(
                          /*! ../internals/descriptors */ './node_modules/core-js/internals/descriptors.js'
                        );

                        var definePropertyModule =
                          __nested_webpack_require_45772__(
                            /*! ../internals/object-define-property */ './node_modules/core-js/internals/object-define-property.js'
                          );

                        var anObject = __nested_webpack_require_45772__(
                          /*! ../internals/an-object */ './node_modules/core-js/internals/an-object.js'
                        );

                        var objectKeys = __nested_webpack_require_45772__(
                          /*! ../internals/object-keys */ './node_modules/core-js/internals/object-keys.js'
                        ); // `Object.defineProperties` method
                        // https://tc39.es/ecma262/#sec-object.defineproperties
                        // eslint-disable-next-line es/no-object-defineproperties -- safe

                        module.exports = DESCRIPTORS
                          ? Object.defineProperties
                          : function defineProperties(O, Properties) {
                              anObject(O);
                              var keys = objectKeys(Properties);
                              var length = keys.length;
                              var index = 0;
                              var key;

                              while (length > index) {
                                definePropertyModule.f(
                                  O,
                                  (key = keys[index++]),
                                  Properties[key]
                                );
                              }

                              return O;
                            };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-define-property.js':
                      /*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        exports,
                        __nested_webpack_require_47140__
                      ) {
                        var DESCRIPTORS = __nested_webpack_require_47140__(
                          /*! ../internals/descriptors */ './node_modules/core-js/internals/descriptors.js'
                        );

                        var IE8_DOM_DEFINE = __nested_webpack_require_47140__(
                          /*! ../internals/ie8-dom-define */ './node_modules/core-js/internals/ie8-dom-define.js'
                        );

                        var anObject = __nested_webpack_require_47140__(
                          /*! ../internals/an-object */ './node_modules/core-js/internals/an-object.js'
                        );

                        var toPrimitive = __nested_webpack_require_47140__(
                          /*! ../internals/to-primitive */ './node_modules/core-js/internals/to-primitive.js'
                        ); // eslint-disable-next-line es/no-object-defineproperty -- safe

                        var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
                        // https://tc39.es/ecma262/#sec-object.defineproperty

                        exports.f = DESCRIPTORS
                          ? $defineProperty
                          : function defineProperty(O, P, Attributes) {
                              anObject(O);
                              P = toPrimitive(P, true);
                              anObject(Attributes);
                              if (IE8_DOM_DEFINE)
                                try {
                                  return $defineProperty(O, P, Attributes);
                                } catch (error) {
                                  /* empty */
                                }
                              if ('get' in Attributes || 'set' in Attributes)
                                throw TypeError('Accessors not supported');
                              if ('value' in Attributes)
                                O[P] = Attributes.value;
                              return O;
                            };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-get-own-property-descriptor.js':
                      /*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        exports,
                        __nested_webpack_require_48684__
                      ) {
                        var DESCRIPTORS = __nested_webpack_require_48684__(
                          /*! ../internals/descriptors */ './node_modules/core-js/internals/descriptors.js'
                        );

                        var propertyIsEnumerableModule =
                          __nested_webpack_require_48684__(
                            /*! ../internals/object-property-is-enumerable */ './node_modules/core-js/internals/object-property-is-enumerable.js'
                          );

                        var createPropertyDescriptor =
                          __nested_webpack_require_48684__(
                            /*! ../internals/create-property-descriptor */ './node_modules/core-js/internals/create-property-descriptor.js'
                          );

                        var toIndexedObject = __nested_webpack_require_48684__(
                          /*! ../internals/to-indexed-object */ './node_modules/core-js/internals/to-indexed-object.js'
                        );

                        var toPrimitive = __nested_webpack_require_48684__(
                          /*! ../internals/to-primitive */ './node_modules/core-js/internals/to-primitive.js'
                        );

                        var has = __nested_webpack_require_48684__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var IE8_DOM_DEFINE = __nested_webpack_require_48684__(
                          /*! ../internals/ie8-dom-define */ './node_modules/core-js/internals/ie8-dom-define.js'
                        ); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

                        var $getOwnPropertyDescriptor =
                          Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
                        // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

                        exports.f = DESCRIPTORS
                          ? $getOwnPropertyDescriptor
                          : function getOwnPropertyDescriptor(O, P) {
                              O = toIndexedObject(O);
                              P = toPrimitive(P, true);
                              if (IE8_DOM_DEFINE)
                                try {
                                  return $getOwnPropertyDescriptor(O, P);
                                } catch (error) {
                                  /* empty */
                                }
                              if (has(O, P))
                                return createPropertyDescriptor(
                                  !propertyIsEnumerableModule.f.call(O, P),
                                  O[P]
                                );
                            };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-get-own-property-names-external.js':
                      /*!**********************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names-external.js ***!
  \**********************************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_50687__
                      ) {
                        /* eslint-disable es/no-object-getownpropertynames -- safe */
                        var toIndexedObject = __nested_webpack_require_50687__(
                          /*! ../internals/to-indexed-object */ './node_modules/core-js/internals/to-indexed-object.js'
                        );

                        var $getOwnPropertyNames =
                          __nested_webpack_require_50687__(
                            /*! ../internals/object-get-own-property-names */ './node_modules/core-js/internals/object-get-own-property-names.js'
                          ).f;

                        var toString = {}.toString;
                        var windowNames =
                          typeof window == 'object' &&
                          window &&
                          Object.getOwnPropertyNames
                            ? Object.getOwnPropertyNames(window)
                            : [];

                        var getWindowNames = function getWindowNames(it) {
                          try {
                            return $getOwnPropertyNames(it);
                          } catch (error) {
                            return windowNames.slice();
                          }
                        }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

                        module.exports.f = function getOwnPropertyNames(it) {
                          return windowNames &&
                            toString.call(it) == '[object Window]'
                            ? getWindowNames(it)
                            : $getOwnPropertyNames(toIndexedObject(it));
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-get-own-property-names.js':
                      /*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        exports,
                        __nested_webpack_require_52031__
                      ) {
                        var internalObjectKeys =
                          __nested_webpack_require_52031__(
                            /*! ../internals/object-keys-internal */ './node_modules/core-js/internals/object-keys-internal.js'
                          );

                        var enumBugKeys = __nested_webpack_require_52031__(
                          /*! ../internals/enum-bug-keys */ './node_modules/core-js/internals/enum-bug-keys.js'
                        );

                        var hiddenKeys = enumBugKeys.concat(
                          'length',
                          'prototype'
                        ); // `Object.getOwnPropertyNames` method
                        // https://tc39.es/ecma262/#sec-object.getownpropertynames
                        // eslint-disable-next-line es/no-object-getownpropertynames -- safe

                        exports.f =
                          Object.getOwnPropertyNames ||
                          function getOwnPropertyNames(O) {
                            return internalObjectKeys(O, hiddenKeys);
                          };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-get-own-property-symbols.js':
                      /*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
                      /***/ function (__unused_webpack_module, exports) {
                        // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
                        exports.f = Object.getOwnPropertySymbols;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-keys-internal.js':
                      /*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_53515__
                      ) {
                        var has = __nested_webpack_require_53515__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var toIndexedObject = __nested_webpack_require_53515__(
                          /*! ../internals/to-indexed-object */ './node_modules/core-js/internals/to-indexed-object.js'
                        );

                        var indexOf = __nested_webpack_require_53515__(
                          /*! ../internals/array-includes */ './node_modules/core-js/internals/array-includes.js'
                        ).indexOf;

                        var hiddenKeys = __nested_webpack_require_53515__(
                          /*! ../internals/hidden-keys */ './node_modules/core-js/internals/hidden-keys.js'
                        );

                        module.exports = function (object, names) {
                          var O = toIndexedObject(object);
                          var i = 0;
                          var result = [];
                          var key;

                          for (key in O) {
                            !has(hiddenKeys, key) &&
                              has(O, key) &&
                              result.push(key);
                          } // Don't enum bug & hidden keys

                          while (names.length > i) {
                            if (has(O, (key = names[i++]))) {
                              ~indexOf(result, key) || result.push(key);
                            }
                          }

                          return result;
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-keys.js':
                      /*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_54720__
                      ) {
                        var internalObjectKeys =
                          __nested_webpack_require_54720__(
                            /*! ../internals/object-keys-internal */ './node_modules/core-js/internals/object-keys-internal.js'
                          );

                        var enumBugKeys = __nested_webpack_require_54720__(
                          /*! ../internals/enum-bug-keys */ './node_modules/core-js/internals/enum-bug-keys.js'
                        ); // `Object.keys` method
                        // https://tc39.es/ecma262/#sec-object.keys
                        // eslint-disable-next-line es/no-object-keys -- safe

                        module.exports =
                          Object.keys ||
                          function keys(O) {
                            return internalObjectKeys(O, enumBugKeys);
                          };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-property-is-enumerable.js':
                      /*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
                      /***/ function (__unused_webpack_module, exports) {
                        'use strict';

                        var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

                        var getOwnPropertyDescriptor =
                          Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

                        var NASHORN_BUG =
                          getOwnPropertyDescriptor &&
                          !$propertyIsEnumerable.call(
                            {
                              1: 2,
                            },
                            1
                          ); // `Object.prototype.propertyIsEnumerable` method implementation
                        // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

                        exports.f = NASHORN_BUG
                          ? function propertyIsEnumerable(V) {
                              var descriptor = getOwnPropertyDescriptor(
                                this,
                                V
                              );
                              return !!descriptor && descriptor.enumerable;
                            }
                          : $propertyIsEnumerable;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/object-to-string.js':
                      /*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_56585__
                      ) {
                        'use strict';

                        var TO_STRING_TAG_SUPPORT =
                          __nested_webpack_require_56585__(
                            /*! ../internals/to-string-tag-support */ './node_modules/core-js/internals/to-string-tag-support.js'
                          );

                        var classof = __nested_webpack_require_56585__(
                          /*! ../internals/classof */ './node_modules/core-js/internals/classof.js'
                        ); // `Object.prototype.toString` method implementation
                        // https://tc39.es/ecma262/#sec-object.prototype.tostring

                        module.exports = TO_STRING_TAG_SUPPORT
                          ? {}.toString
                          : function toString() {
                              return '[object ' + classof(this) + ']';
                            };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/own-keys.js':
                      /*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_57413__
                      ) {
                        var getBuiltIn = __nested_webpack_require_57413__(
                          /*! ../internals/get-built-in */ './node_modules/core-js/internals/get-built-in.js'
                        );

                        var getOwnPropertyNamesModule =
                          __nested_webpack_require_57413__(
                            /*! ../internals/object-get-own-property-names */ './node_modules/core-js/internals/object-get-own-property-names.js'
                          );

                        var getOwnPropertySymbolsModule =
                          __nested_webpack_require_57413__(
                            /*! ../internals/object-get-own-property-symbols */ './node_modules/core-js/internals/object-get-own-property-symbols.js'
                          );

                        var anObject = __nested_webpack_require_57413__(
                          /*! ../internals/an-object */ './node_modules/core-js/internals/an-object.js'
                        ); // all object keys, includes non-enumerable and symbols

                        module.exports =
                          getBuiltIn('Reflect', 'ownKeys') ||
                          function ownKeys(it) {
                            var keys = getOwnPropertyNamesModule.f(
                              anObject(it)
                            );
                            var getOwnPropertySymbols =
                              getOwnPropertySymbolsModule.f;
                            return getOwnPropertySymbols
                              ? keys.concat(getOwnPropertySymbols(it))
                              : keys;
                          };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/path.js':
                      /*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_58635__
                      ) {
                        var global = __nested_webpack_require_58635__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        module.exports = global;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/redefine.js':
                      /*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_59081__
                      ) {
                        var global = __nested_webpack_require_59081__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var createNonEnumerableProperty =
                          __nested_webpack_require_59081__(
                            /*! ../internals/create-non-enumerable-property */ './node_modules/core-js/internals/create-non-enumerable-property.js'
                          );

                        var has = __nested_webpack_require_59081__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var setGlobal = __nested_webpack_require_59081__(
                          /*! ../internals/set-global */ './node_modules/core-js/internals/set-global.js'
                        );

                        var inspectSource = __nested_webpack_require_59081__(
                          /*! ../internals/inspect-source */ './node_modules/core-js/internals/inspect-source.js'
                        );

                        var InternalStateModule =
                          __nested_webpack_require_59081__(
                            /*! ../internals/internal-state */ './node_modules/core-js/internals/internal-state.js'
                          );

                        var getInternalState = InternalStateModule.get;
                        var enforceInternalState = InternalStateModule.enforce;
                        var TEMPLATE = String(String).split('String');
                        (module.exports = function (O, key, value, options) {
                          var unsafe = options ? !!options.unsafe : false;
                          var simple = options ? !!options.enumerable : false;
                          var noTargetGet = options
                            ? !!options.noTargetGet
                            : false;
                          var state;

                          if (typeof value == 'function') {
                            if (typeof key == 'string' && !has(value, 'name')) {
                              createNonEnumerableProperty(value, 'name', key);
                            }

                            state = enforceInternalState(value);

                            if (!state.source) {
                              state.source = TEMPLATE.join(
                                typeof key == 'string' ? key : ''
                              );
                            }
                          }

                          if (O === global) {
                            if (simple) O[key] = value;
                            else setGlobal(key, value);
                            return;
                          } else if (!unsafe) {
                            delete O[key];
                          } else if (!noTargetGet && O[key]) {
                            simple = true;
                          }

                          if (simple) O[key] = value;
                          else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
                        })(Function.prototype, 'toString', function toString() {
                          return (
                            (typeof this == 'function' &&
                              getInternalState(this).source) ||
                            inspectSource(this)
                          );
                        });

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/require-object-coercible.js':
                      /*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
                      /***/ function (module) {
                        // `RequireObjectCoercible` abstract operation
                        // https://tc39.es/ecma262/#sec-requireobjectcoercible
                        module.exports = function (it) {
                          if (it == undefined)
                            throw TypeError("Can't call method on " + it);
                          return it;
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/set-global.js':
                      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_61956__
                      ) {
                        var global = __nested_webpack_require_61956__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var createNonEnumerableProperty =
                          __nested_webpack_require_61956__(
                            /*! ../internals/create-non-enumerable-property */ './node_modules/core-js/internals/create-non-enumerable-property.js'
                          );

                        module.exports = function (key, value) {
                          try {
                            createNonEnumerableProperty(global, key, value);
                          } catch (error) {
                            global[key] = value;
                          }

                          return value;
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/set-to-string-tag.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_62761__
                      ) {
                        var defineProperty = __nested_webpack_require_62761__(
                          /*! ../internals/object-define-property */ './node_modules/core-js/internals/object-define-property.js'
                        ).f;

                        var has = __nested_webpack_require_62761__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var wellKnownSymbol = __nested_webpack_require_62761__(
                          /*! ../internals/well-known-symbol */ './node_modules/core-js/internals/well-known-symbol.js'
                        );

                        var TO_STRING_TAG = wellKnownSymbol('toStringTag');

                        module.exports = function (it, TAG, STATIC) {
                          if (
                            it &&
                            !has(
                              (it = STATIC ? it : it.prototype),
                              TO_STRING_TAG
                            )
                          ) {
                            defineProperty(it, TO_STRING_TAG, {
                              configurable: true,
                              value: TAG,
                            });
                          }
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/shared-key.js':
                      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_63735__
                      ) {
                        var shared = __nested_webpack_require_63735__(
                          /*! ../internals/shared */ './node_modules/core-js/internals/shared.js'
                        );

                        var uid = __nested_webpack_require_63735__(
                          /*! ../internals/uid */ './node_modules/core-js/internals/uid.js'
                        );

                        var keys = shared('keys');

                        module.exports = function (key) {
                          return keys[key] || (keys[key] = uid(key));
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/shared-store.js':
                      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_64382__
                      ) {
                        var global = __nested_webpack_require_64382__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var setGlobal = __nested_webpack_require_64382__(
                          /*! ../internals/set-global */ './node_modules/core-js/internals/set-global.js'
                        );

                        var SHARED = '__core-js_shared__';
                        var store = global[SHARED] || setGlobal(SHARED, {});
                        module.exports = store;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/shared.js':
                      /*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_65026__
                      ) {
                        var IS_PURE = __nested_webpack_require_65026__(
                          /*! ../internals/is-pure */ './node_modules/core-js/internals/is-pure.js'
                        );

                        var store = __nested_webpack_require_65026__(
                          /*! ../internals/shared-store */ './node_modules/core-js/internals/shared-store.js'
                        );

                        (module.exports = function (key, value) {
                          return (
                            store[key] ||
                            (store[key] = value !== undefined ? value : {})
                          );
                        })('versions', []).push({
                          version: '3.10.2',
                          mode: IS_PURE ? 'pure' : 'global',
                          copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
                        });

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/to-absolute-index.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_65859__
                      ) {
                        var toInteger = __nested_webpack_require_65859__(
                          /*! ../internals/to-integer */ './node_modules/core-js/internals/to-integer.js'
                        );

                        var max = Math.max;
                        var min = Math.min; // Helper for a popular repeating case of the spec:
                        // Let integer be ? ToInteger(index).
                        // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

                        module.exports = function (index, length) {
                          var integer = toInteger(index);
                          return integer < 0
                            ? max(integer + length, 0)
                            : min(integer, length);
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/to-indexed-object.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_66713__
                      ) {
                        // toObject with fallback for non-array-like ES3 strings
                        var IndexedObject = __nested_webpack_require_66713__(
                          /*! ../internals/indexed-object */ './node_modules/core-js/internals/indexed-object.js'
                        );

                        var requireObjectCoercible =
                          __nested_webpack_require_66713__(
                            /*! ../internals/require-object-coercible */ './node_modules/core-js/internals/require-object-coercible.js'
                          );

                        module.exports = function (it) {
                          return IndexedObject(requireObjectCoercible(it));
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/to-integer.js':
                      /*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
                      /***/ function (module) {
                        var ceil = Math.ceil;
                        var floor = Math.floor; // `ToInteger` abstract operation
                        // https://tc39.es/ecma262/#sec-tointeger

                        module.exports = function (argument) {
                          return isNaN((argument = +argument))
                            ? 0
                            : (argument > 0 ? floor : ceil)(argument);
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/to-length.js':
                      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_67989__
                      ) {
                        var toInteger = __nested_webpack_require_67989__(
                          /*! ../internals/to-integer */ './node_modules/core-js/internals/to-integer.js'
                        );

                        var min = Math.min; // `ToLength` abstract operation
                        // https://tc39.es/ecma262/#sec-tolength

                        module.exports = function (argument) {
                          return argument > 0
                            ? min(toInteger(argument), 0x1fffffffffffff)
                            : 0; // 2 ** 53 - 1 == 9007199254740991
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/to-object.js':
                      /*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_68669__
                      ) {
                        var requireObjectCoercible =
                          __nested_webpack_require_68669__(
                            /*! ../internals/require-object-coercible */ './node_modules/core-js/internals/require-object-coercible.js'
                          ); // `ToObject` abstract operation
                        // https://tc39.es/ecma262/#sec-toobject

                        module.exports = function (argument) {
                          return Object(requireObjectCoercible(argument));
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/to-primitive.js':
                      /*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_69326__
                      ) {
                        var isObject = __nested_webpack_require_69326__(
                          /*! ../internals/is-object */ './node_modules/core-js/internals/is-object.js'
                        ); // `ToPrimitive` abstract operation
                        // https://tc39.es/ecma262/#sec-toprimitive
                        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
                        // and the second argument - flag - preferred type is a string

                        module.exports = function (input, PREFERRED_STRING) {
                          if (!isObject(input)) return input;
                          var fn, val;
                          if (
                            PREFERRED_STRING &&
                            typeof (fn = input.toString) == 'function' &&
                            !isObject((val = fn.call(input)))
                          )
                            return val;
                          if (
                            typeof (fn = input.valueOf) == 'function' &&
                            !isObject((val = fn.call(input)))
                          )
                            return val;
                          if (
                            !PREFERRED_STRING &&
                            typeof (fn = input.toString) == 'function' &&
                            !isObject((val = fn.call(input)))
                          )
                            return val;
                          throw TypeError(
                            "Can't convert object to primitive value"
                          );
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/to-string-tag-support.js':
                      /*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_70529__
                      ) {
                        var wellKnownSymbol = __nested_webpack_require_70529__(
                          /*! ../internals/well-known-symbol */ './node_modules/core-js/internals/well-known-symbol.js'
                        );

                        var TO_STRING_TAG = wellKnownSymbol('toStringTag');
                        var test = {};
                        test[TO_STRING_TAG] = 'z';
                        module.exports = String(test) === '[object z]';

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/uid.js':
                      /*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
                      /***/ function (module) {
                        var id = 0;
                        var postfix = Math.random();

                        module.exports = function (key) {
                          return (
                            'Symbol(' +
                            String(key === undefined ? '' : key) +
                            ')_' +
                            (++id + postfix).toString(36)
                          );
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/use-symbol-as-uid.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_71582__
                      ) {
                        /* eslint-disable es/no-symbol -- required for testing */
                        var NATIVE_SYMBOL = __nested_webpack_require_71582__(
                          /*! ../internals/native-symbol */ './node_modules/core-js/internals/native-symbol.js'
                        );

                        module.exports =
                          NATIVE_SYMBOL &&
                          !Symbol.sham &&
                          typeof Symbol.iterator == 'symbol';

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/well-known-symbol-wrapped.js':
                      /*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol-wrapped.js ***!
  \*********************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        exports,
                        __nested_webpack_require_72236__
                      ) {
                        var wellKnownSymbol = __nested_webpack_require_72236__(
                          /*! ../internals/well-known-symbol */ './node_modules/core-js/internals/well-known-symbol.js'
                        );

                        exports.f = wellKnownSymbol;

                        /***/
                      },

                    /***/ './node_modules/core-js/internals/well-known-symbol.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_72753__
                      ) {
                        var global = __nested_webpack_require_72753__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var shared = __nested_webpack_require_72753__(
                          /*! ../internals/shared */ './node_modules/core-js/internals/shared.js'
                        );

                        var has = __nested_webpack_require_72753__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var uid = __nested_webpack_require_72753__(
                          /*! ../internals/uid */ './node_modules/core-js/internals/uid.js'
                        );

                        var NATIVE_SYMBOL = __nested_webpack_require_72753__(
                          /*! ../internals/native-symbol */ './node_modules/core-js/internals/native-symbol.js'
                        );

                        var USE_SYMBOL_AS_UID =
                          __nested_webpack_require_72753__(
                            /*! ../internals/use-symbol-as-uid */ './node_modules/core-js/internals/use-symbol-as-uid.js'
                          );

                        var WellKnownSymbolsStore = shared('wks');
                        var Symbol = global.Symbol;
                        var createWellKnownSymbol = USE_SYMBOL_AS_UID
                          ? Symbol
                          : (Symbol && Symbol.withoutSetter) || uid;

                        module.exports = function (name) {
                          if (
                            !has(WellKnownSymbolsStore, name) ||
                            !(
                              NATIVE_SYMBOL ||
                              typeof WellKnownSymbolsStore[name] == 'string'
                            )
                          ) {
                            if (NATIVE_SYMBOL && has(Symbol, name)) {
                              WellKnownSymbolsStore[name] = Symbol[name];
                            } else {
                              WellKnownSymbolsStore[name] =
                                createWellKnownSymbol('Symbol.' + name);
                            }
                          }

                          return WellKnownSymbolsStore[name];
                        };

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.array.concat.js':
                      /*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.concat.js ***!
  \*********************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_74341__
                      ) {
                        'use strict';

                        var $ = __nested_webpack_require_74341__(
                          /*! ../internals/export */ './node_modules/core-js/internals/export.js'
                        );

                        var fails = __nested_webpack_require_74341__(
                          /*! ../internals/fails */ './node_modules/core-js/internals/fails.js'
                        );

                        var isArray = __nested_webpack_require_74341__(
                          /*! ../internals/is-array */ './node_modules/core-js/internals/is-array.js'
                        );

                        var isObject = __nested_webpack_require_74341__(
                          /*! ../internals/is-object */ './node_modules/core-js/internals/is-object.js'
                        );

                        var toObject = __nested_webpack_require_74341__(
                          /*! ../internals/to-object */ './node_modules/core-js/internals/to-object.js'
                        );

                        var toLength = __nested_webpack_require_74341__(
                          /*! ../internals/to-length */ './node_modules/core-js/internals/to-length.js'
                        );

                        var createProperty = __nested_webpack_require_74341__(
                          /*! ../internals/create-property */ './node_modules/core-js/internals/create-property.js'
                        );

                        var arraySpeciesCreate =
                          __nested_webpack_require_74341__(
                            /*! ../internals/array-species-create */ './node_modules/core-js/internals/array-species-create.js'
                          );

                        var arrayMethodHasSpeciesSupport =
                          __nested_webpack_require_74341__(
                            /*! ../internals/array-method-has-species-support */ './node_modules/core-js/internals/array-method-has-species-support.js'
                          );

                        var wellKnownSymbol = __nested_webpack_require_74341__(
                          /*! ../internals/well-known-symbol */ './node_modules/core-js/internals/well-known-symbol.js'
                        );

                        var V8_VERSION = __nested_webpack_require_74341__(
                          /*! ../internals/engine-v8-version */ './node_modules/core-js/internals/engine-v8-version.js'
                        );

                        var IS_CONCAT_SPREADABLE =
                          wellKnownSymbol('isConcatSpreadable');
                        var MAX_SAFE_INTEGER = 0x1fffffffffffff;
                        var MAXIMUM_ALLOWED_INDEX_EXCEEDED =
                          'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
                        // deoptimization and serious performance degradation
                        // https://github.com/zloirock/core-js/issues/679

                        var IS_CONCAT_SPREADABLE_SUPPORT =
                          V8_VERSION >= 51 ||
                          !fails(function () {
                            var array = [];
                            array[IS_CONCAT_SPREADABLE] = false;
                            return array.concat()[0] !== array;
                          });
                        var SPECIES_SUPPORT =
                          arrayMethodHasSpeciesSupport('concat');

                        var isConcatSpreadable = function isConcatSpreadable(
                          O
                        ) {
                          if (!isObject(O)) return false;
                          var spreadable = O[IS_CONCAT_SPREADABLE];
                          return spreadable !== undefined
                            ? !!spreadable
                            : isArray(O);
                        };

                        var FORCED =
                          !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
                        // https://tc39.es/ecma262/#sec-array.prototype.concat
                        // with adding support of @@isConcatSpreadable and @@species

                        $(
                          {
                            target: 'Array',
                            proto: true,
                            forced: FORCED,
                          },
                          {
                            // eslint-disable-next-line no-unused-vars -- required for `.length`
                            concat: function concat(arg) {
                              var O = toObject(this);
                              var A = arraySpeciesCreate(O, 0);
                              var n = 0;
                              var i, k, length, len, E;

                              for (
                                i = -1, length = arguments.length;
                                i < length;
                                i++
                              ) {
                                E = i === -1 ? O : arguments[i];

                                if (isConcatSpreadable(E)) {
                                  len = toLength(E.length);
                                  if (n + len > MAX_SAFE_INTEGER)
                                    throw TypeError(
                                      MAXIMUM_ALLOWED_INDEX_EXCEEDED
                                    );

                                  for (k = 0; k < len; k++, n++) {
                                    if (k in E) createProperty(A, n, E[k]);
                                  }
                                } else {
                                  if (n >= MAX_SAFE_INTEGER)
                                    throw TypeError(
                                      MAXIMUM_ALLOWED_INDEX_EXCEEDED
                                    );
                                  createProperty(A, n++, E);
                                }
                              }

                              A.length = n;
                              return A;
                            },
                          }
                        );

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.json.to-string-tag.js':
                      /*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.json.to-string-tag.js ***!
  \***************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_77966__
                      ) {
                        var global = __nested_webpack_require_77966__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var setToStringTag = __nested_webpack_require_77966__(
                          /*! ../internals/set-to-string-tag */ './node_modules/core-js/internals/set-to-string-tag.js'
                        ); // JSON[@@toStringTag] property
                        // https://tc39.es/ecma262/#sec-json-@@tostringtag

                        setToStringTag(global.JSON, 'JSON', true);

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.math.to-string-tag.js':
                      /*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.math.to-string-tag.js ***!
  \***************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_78713__
                      ) {
                        var setToStringTag = __nested_webpack_require_78713__(
                          /*! ../internals/set-to-string-tag */ './node_modules/core-js/internals/set-to-string-tag.js'
                        ); // Math[@@toStringTag] property
                        // https://tc39.es/ecma262/#sec-math-@@tostringtag

                        setToStringTag(Math, 'Math', true);

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.object.to-string.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_79337__
                      ) {
                        var TO_STRING_TAG_SUPPORT =
                          __nested_webpack_require_79337__(
                            /*! ../internals/to-string-tag-support */ './node_modules/core-js/internals/to-string-tag-support.js'
                          );

                        var redefine = __nested_webpack_require_79337__(
                          /*! ../internals/redefine */ './node_modules/core-js/internals/redefine.js'
                        );

                        var toString = __nested_webpack_require_79337__(
                          /*! ../internals/object-to-string */ './node_modules/core-js/internals/object-to-string.js'
                        ); // `Object.prototype.toString` method
                        // https://tc39.es/ecma262/#sec-object.prototype.tostring

                        if (!TO_STRING_TAG_SUPPORT) {
                          redefine(Object.prototype, 'toString', toString, {
                            unsafe: true,
                          });
                        }

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.reflect.to-string-tag.js':
                      /*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.reflect.to-string-tag.js ***!
  \******************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_80325__
                      ) {
                        var $ = __nested_webpack_require_80325__(
                          /*! ../internals/export */ './node_modules/core-js/internals/export.js'
                        );

                        var global = __nested_webpack_require_80325__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var setToStringTag = __nested_webpack_require_80325__(
                          /*! ../internals/set-to-string-tag */ './node_modules/core-js/internals/set-to-string-tag.js'
                        );

                        $(
                          {
                            global: true,
                          },
                          {
                            Reflect: {},
                          }
                        ); // Reflect[@@toStringTag] property
                        // https://tc39.es/ecma262/#sec-reflect-@@tostringtag

                        setToStringTag(global.Reflect, 'Reflect', true);

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.async-iterator.js':
                      /*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.async-iterator.js ***!
  \******************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_81241__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_81241__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.asyncIterator` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.asynciterator

                        defineWellKnownSymbol('asyncIterator');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.description.js':
                      /*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.description.js ***!
  \***************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_81912__
                      ) {
                        'use strict';
                        // `Symbol.prototype.description` getter
                        // https://tc39.es/ecma262/#sec-symbol.prototype.description

                        var $ = __nested_webpack_require_81912__(
                          /*! ../internals/export */ './node_modules/core-js/internals/export.js'
                        );

                        var DESCRIPTORS = __nested_webpack_require_81912__(
                          /*! ../internals/descriptors */ './node_modules/core-js/internals/descriptors.js'
                        );

                        var global = __nested_webpack_require_81912__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var has = __nested_webpack_require_81912__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var isObject = __nested_webpack_require_81912__(
                          /*! ../internals/is-object */ './node_modules/core-js/internals/is-object.js'
                        );

                        var defineProperty = __nested_webpack_require_81912__(
                          /*! ../internals/object-define-property */ './node_modules/core-js/internals/object-define-property.js'
                        ).f;

                        var copyConstructorProperties =
                          __nested_webpack_require_81912__(
                            /*! ../internals/copy-constructor-properties */ './node_modules/core-js/internals/copy-constructor-properties.js'
                          );

                        var NativeSymbol = global.Symbol;

                        if (
                          DESCRIPTORS &&
                          typeof NativeSymbol == 'function' &&
                          (!('description' in NativeSymbol.prototype) || // Safari 12 bug
                            NativeSymbol().description !== undefined)
                        ) {
                          var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

                          var SymbolWrapper = function Symbol() {
                            var description =
                              arguments.length < 1 || arguments[0] === undefined
                                ? undefined
                                : String(arguments[0]);
                            var result =
                              this instanceof SymbolWrapper
                                ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
                                : description === undefined
                                ? NativeSymbol()
                                : NativeSymbol(description);
                            if (description === '')
                              EmptyStringDescriptionStore[result] = true;
                            return result;
                          };

                          copyConstructorProperties(
                            SymbolWrapper,
                            NativeSymbol
                          );
                          var symbolPrototype = (SymbolWrapper.prototype =
                            NativeSymbol.prototype);
                          symbolPrototype.constructor = SymbolWrapper;
                          var symbolToString = symbolPrototype.toString;
                          var native =
                            String(NativeSymbol('test')) == 'Symbol(test)';
                          var regexp = /^Symbol\((.*)\)[^)]+$/;
                          defineProperty(symbolPrototype, 'description', {
                            configurable: true,
                            get: function description() {
                              var symbol = isObject(this)
                                ? this.valueOf()
                                : this;
                              var string = symbolToString.call(symbol);
                              if (has(EmptyStringDescriptionStore, symbol))
                                return '';
                              var desc = native
                                ? string.slice(7, -1)
                                : string.replace(regexp, '$1');
                              return desc === '' ? undefined : desc;
                            },
                          });
                          $(
                            {
                              global: true,
                              forced: true,
                            },
                            {
                              Symbol: SymbolWrapper,
                            }
                          );
                        }

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.has-instance.js':
                      /*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.has-instance.js ***!
  \****************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_84885__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_84885__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.hasInstance` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.hasinstance

                        defineWellKnownSymbol('hasInstance');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.is-concat-spreadable.js':
                      /*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.is-concat-spreadable.js ***!
  \************************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_85586__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_85586__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.isConcatSpreadable` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable

                        defineWellKnownSymbol('isConcatSpreadable');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.iterator.js':
                      /*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.iterator.js ***!
  \************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_86260__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_86260__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.iterator` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.iterator

                        defineWellKnownSymbol('iterator');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.js':
                      /*!***************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.js ***!
  \***************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_86868__
                      ) {
                        'use strict';

                        var $ = __nested_webpack_require_86868__(
                          /*! ../internals/export */ './node_modules/core-js/internals/export.js'
                        );

                        var global = __nested_webpack_require_86868__(
                          /*! ../internals/global */ './node_modules/core-js/internals/global.js'
                        );

                        var getBuiltIn = __nested_webpack_require_86868__(
                          /*! ../internals/get-built-in */ './node_modules/core-js/internals/get-built-in.js'
                        );

                        var IS_PURE = __nested_webpack_require_86868__(
                          /*! ../internals/is-pure */ './node_modules/core-js/internals/is-pure.js'
                        );

                        var DESCRIPTORS = __nested_webpack_require_86868__(
                          /*! ../internals/descriptors */ './node_modules/core-js/internals/descriptors.js'
                        );

                        var NATIVE_SYMBOL = __nested_webpack_require_86868__(
                          /*! ../internals/native-symbol */ './node_modules/core-js/internals/native-symbol.js'
                        );

                        var USE_SYMBOL_AS_UID =
                          __nested_webpack_require_86868__(
                            /*! ../internals/use-symbol-as-uid */ './node_modules/core-js/internals/use-symbol-as-uid.js'
                          );

                        var fails = __nested_webpack_require_86868__(
                          /*! ../internals/fails */ './node_modules/core-js/internals/fails.js'
                        );

                        var has = __nested_webpack_require_86868__(
                          /*! ../internals/has */ './node_modules/core-js/internals/has.js'
                        );

                        var isArray = __nested_webpack_require_86868__(
                          /*! ../internals/is-array */ './node_modules/core-js/internals/is-array.js'
                        );

                        var isObject = __nested_webpack_require_86868__(
                          /*! ../internals/is-object */ './node_modules/core-js/internals/is-object.js'
                        );

                        var anObject = __nested_webpack_require_86868__(
                          /*! ../internals/an-object */ './node_modules/core-js/internals/an-object.js'
                        );

                        var toObject = __nested_webpack_require_86868__(
                          /*! ../internals/to-object */ './node_modules/core-js/internals/to-object.js'
                        );

                        var toIndexedObject = __nested_webpack_require_86868__(
                          /*! ../internals/to-indexed-object */ './node_modules/core-js/internals/to-indexed-object.js'
                        );

                        var toPrimitive = __nested_webpack_require_86868__(
                          /*! ../internals/to-primitive */ './node_modules/core-js/internals/to-primitive.js'
                        );

                        var createPropertyDescriptor =
                          __nested_webpack_require_86868__(
                            /*! ../internals/create-property-descriptor */ './node_modules/core-js/internals/create-property-descriptor.js'
                          );

                        var nativeObjectCreate =
                          __nested_webpack_require_86868__(
                            /*! ../internals/object-create */ './node_modules/core-js/internals/object-create.js'
                          );

                        var objectKeys = __nested_webpack_require_86868__(
                          /*! ../internals/object-keys */ './node_modules/core-js/internals/object-keys.js'
                        );

                        var getOwnPropertyNamesModule =
                          __nested_webpack_require_86868__(
                            /*! ../internals/object-get-own-property-names */ './node_modules/core-js/internals/object-get-own-property-names.js'
                          );

                        var getOwnPropertyNamesExternal =
                          __nested_webpack_require_86868__(
                            /*! ../internals/object-get-own-property-names-external */ './node_modules/core-js/internals/object-get-own-property-names-external.js'
                          );

                        var getOwnPropertySymbolsModule =
                          __nested_webpack_require_86868__(
                            /*! ../internals/object-get-own-property-symbols */ './node_modules/core-js/internals/object-get-own-property-symbols.js'
                          );

                        var getOwnPropertyDescriptorModule =
                          __nested_webpack_require_86868__(
                            /*! ../internals/object-get-own-property-descriptor */ './node_modules/core-js/internals/object-get-own-property-descriptor.js'
                          );

                        var definePropertyModule =
                          __nested_webpack_require_86868__(
                            /*! ../internals/object-define-property */ './node_modules/core-js/internals/object-define-property.js'
                          );

                        var propertyIsEnumerableModule =
                          __nested_webpack_require_86868__(
                            /*! ../internals/object-property-is-enumerable */ './node_modules/core-js/internals/object-property-is-enumerable.js'
                          );

                        var createNonEnumerableProperty =
                          __nested_webpack_require_86868__(
                            /*! ../internals/create-non-enumerable-property */ './node_modules/core-js/internals/create-non-enumerable-property.js'
                          );

                        var redefine = __nested_webpack_require_86868__(
                          /*! ../internals/redefine */ './node_modules/core-js/internals/redefine.js'
                        );

                        var shared = __nested_webpack_require_86868__(
                          /*! ../internals/shared */ './node_modules/core-js/internals/shared.js'
                        );

                        var sharedKey = __nested_webpack_require_86868__(
                          /*! ../internals/shared-key */ './node_modules/core-js/internals/shared-key.js'
                        );

                        var hiddenKeys = __nested_webpack_require_86868__(
                          /*! ../internals/hidden-keys */ './node_modules/core-js/internals/hidden-keys.js'
                        );

                        var uid = __nested_webpack_require_86868__(
                          /*! ../internals/uid */ './node_modules/core-js/internals/uid.js'
                        );

                        var wellKnownSymbol = __nested_webpack_require_86868__(
                          /*! ../internals/well-known-symbol */ './node_modules/core-js/internals/well-known-symbol.js'
                        );

                        var wrappedWellKnownSymbolModule =
                          __nested_webpack_require_86868__(
                            /*! ../internals/well-known-symbol-wrapped */ './node_modules/core-js/internals/well-known-symbol-wrapped.js'
                          );

                        var defineWellKnownSymbol =
                          __nested_webpack_require_86868__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          );

                        var setToStringTag = __nested_webpack_require_86868__(
                          /*! ../internals/set-to-string-tag */ './node_modules/core-js/internals/set-to-string-tag.js'
                        );

                        var InternalStateModule =
                          __nested_webpack_require_86868__(
                            /*! ../internals/internal-state */ './node_modules/core-js/internals/internal-state.js'
                          );

                        var $forEach = __nested_webpack_require_86868__(
                          /*! ../internals/array-iteration */ './node_modules/core-js/internals/array-iteration.js'
                        ).forEach;

                        var HIDDEN = sharedKey('hidden');
                        var SYMBOL = 'Symbol';
                        var PROTOTYPE = 'prototype';
                        var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
                        var setInternalState = InternalStateModule.set;
                        var getInternalState =
                          InternalStateModule.getterFor(SYMBOL);
                        var ObjectPrototype = Object[PROTOTYPE];
                        var $Symbol = global.Symbol;
                        var $stringify = getBuiltIn('JSON', 'stringify');
                        var nativeGetOwnPropertyDescriptor =
                          getOwnPropertyDescriptorModule.f;
                        var nativeDefineProperty = definePropertyModule.f;
                        var nativeGetOwnPropertyNames =
                          getOwnPropertyNamesExternal.f;
                        var nativePropertyIsEnumerable =
                          propertyIsEnumerableModule.f;
                        var AllSymbols = shared('symbols');
                        var ObjectPrototypeSymbols = shared('op-symbols');
                        var StringToSymbolRegistry = shared(
                          'string-to-symbol-registry'
                        );
                        var SymbolToStringRegistry = shared(
                          'symbol-to-string-registry'
                        );
                        var WellKnownSymbolsStore = shared('wks');
                        var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

                        var USE_SETTER =
                          !QObject ||
                          !QObject[PROTOTYPE] ||
                          !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

                        var setSymbolDescriptor =
                          DESCRIPTORS &&
                          fails(function () {
                            return (
                              nativeObjectCreate(
                                nativeDefineProperty({}, 'a', {
                                  get: function get() {
                                    return nativeDefineProperty(this, 'a', {
                                      value: 7,
                                    }).a;
                                  },
                                })
                              ).a != 7
                            );
                          })
                            ? function (O, P, Attributes) {
                                var ObjectPrototypeDescriptor =
                                  nativeGetOwnPropertyDescriptor(
                                    ObjectPrototype,
                                    P
                                  );
                                if (ObjectPrototypeDescriptor)
                                  delete ObjectPrototype[P];
                                nativeDefineProperty(O, P, Attributes);

                                if (
                                  ObjectPrototypeDescriptor &&
                                  O !== ObjectPrototype
                                ) {
                                  nativeDefineProperty(
                                    ObjectPrototype,
                                    P,
                                    ObjectPrototypeDescriptor
                                  );
                                }
                              }
                            : nativeDefineProperty;

                        var wrap = function wrap(tag, description) {
                          var symbol = (AllSymbols[tag] = nativeObjectCreate(
                            $Symbol[PROTOTYPE]
                          ));
                          setInternalState(symbol, {
                            type: SYMBOL,
                            tag: tag,
                            description: description,
                          });
                          if (!DESCRIPTORS) symbol.description = description;
                          return symbol;
                        };

                        var isSymbol = USE_SYMBOL_AS_UID
                          ? function (it) {
                              return typeof it == 'symbol';
                            }
                          : function (it) {
                              return Object(it) instanceof $Symbol;
                            };

                        var $defineProperty = function defineProperty(
                          O,
                          P,
                          Attributes
                        ) {
                          if (O === ObjectPrototype)
                            $defineProperty(
                              ObjectPrototypeSymbols,
                              P,
                              Attributes
                            );
                          anObject(O);
                          var key = toPrimitive(P, true);
                          anObject(Attributes);

                          if (has(AllSymbols, key)) {
                            if (!Attributes.enumerable) {
                              if (!has(O, HIDDEN))
                                nativeDefineProperty(
                                  O,
                                  HIDDEN,
                                  createPropertyDescriptor(1, {})
                                );
                              O[HIDDEN][key] = true;
                            } else {
                              if (has(O, HIDDEN) && O[HIDDEN][key])
                                O[HIDDEN][key] = false;
                              Attributes = nativeObjectCreate(Attributes, {
                                enumerable: createPropertyDescriptor(0, false),
                              });
                            }

                            return setSymbolDescriptor(O, key, Attributes);
                          }

                          return nativeDefineProperty(O, key, Attributes);
                        };

                        var $defineProperties = function defineProperties(
                          O,
                          Properties
                        ) {
                          anObject(O);
                          var properties = toIndexedObject(Properties);
                          var keys = objectKeys(properties).concat(
                            $getOwnPropertySymbols(properties)
                          );
                          $forEach(keys, function (key) {
                            if (
                              !DESCRIPTORS ||
                              $propertyIsEnumerable.call(properties, key)
                            )
                              $defineProperty(O, key, properties[key]);
                          });
                          return O;
                        };

                        var $create = function create(O, Properties) {
                          return Properties === undefined
                            ? nativeObjectCreate(O)
                            : $defineProperties(
                                nativeObjectCreate(O),
                                Properties
                              );
                        };

                        var $propertyIsEnumerable =
                          function propertyIsEnumerable(V) {
                            var P = toPrimitive(V, true);
                            var enumerable = nativePropertyIsEnumerable.call(
                              this,
                              P
                            );
                            if (
                              this === ObjectPrototype &&
                              has(AllSymbols, P) &&
                              !has(ObjectPrototypeSymbols, P)
                            )
                              return false;
                            return enumerable ||
                              !has(this, P) ||
                              !has(AllSymbols, P) ||
                              (has(this, HIDDEN) && this[HIDDEN][P])
                              ? enumerable
                              : true;
                          };

                        var $getOwnPropertyDescriptor =
                          function getOwnPropertyDescriptor(O, P) {
                            var it = toIndexedObject(O);
                            var key = toPrimitive(P, true);
                            if (
                              it === ObjectPrototype &&
                              has(AllSymbols, key) &&
                              !has(ObjectPrototypeSymbols, key)
                            )
                              return;
                            var descriptor = nativeGetOwnPropertyDescriptor(
                              it,
                              key
                            );

                            if (
                              descriptor &&
                              has(AllSymbols, key) &&
                              !(has(it, HIDDEN) && it[HIDDEN][key])
                            ) {
                              descriptor.enumerable = true;
                            }

                            return descriptor;
                          };

                        var $getOwnPropertyNames = function getOwnPropertyNames(
                          O
                        ) {
                          var names = nativeGetOwnPropertyNames(
                            toIndexedObject(O)
                          );
                          var result = [];
                          $forEach(names, function (key) {
                            if (!has(AllSymbols, key) && !has(hiddenKeys, key))
                              result.push(key);
                          });
                          return result;
                        };

                        var $getOwnPropertySymbols =
                          function getOwnPropertySymbols(O) {
                            var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
                            var names = nativeGetOwnPropertyNames(
                              IS_OBJECT_PROTOTYPE
                                ? ObjectPrototypeSymbols
                                : toIndexedObject(O)
                            );
                            var result = [];
                            $forEach(names, function (key) {
                              if (
                                has(AllSymbols, key) &&
                                (!IS_OBJECT_PROTOTYPE ||
                                  has(ObjectPrototype, key))
                              ) {
                                result.push(AllSymbols[key]);
                              }
                            });
                            return result;
                          }; // `Symbol` constructor
                        // https://tc39.es/ecma262/#sec-symbol-constructor

                        if (!NATIVE_SYMBOL) {
                          $Symbol = function Symbol() {
                            if (this instanceof $Symbol)
                              throw TypeError('Symbol is not a constructor');
                            var description =
                              !arguments.length || arguments[0] === undefined
                                ? undefined
                                : String(arguments[0]);
                            var tag = uid(description);

                            var setter = function setter(value) {
                              if (this === ObjectPrototype)
                                setter.call(ObjectPrototypeSymbols, value);
                              if (has(this, HIDDEN) && has(this[HIDDEN], tag))
                                this[HIDDEN][tag] = false;
                              setSymbolDescriptor(
                                this,
                                tag,
                                createPropertyDescriptor(1, value)
                              );
                            };

                            if (DESCRIPTORS && USE_SETTER)
                              setSymbolDescriptor(ObjectPrototype, tag, {
                                configurable: true,
                                set: setter,
                              });
                            return wrap(tag, description);
                          };

                          redefine(
                            $Symbol[PROTOTYPE],
                            'toString',
                            function toString() {
                              return getInternalState(this).tag;
                            }
                          );
                          redefine(
                            $Symbol,
                            'withoutSetter',
                            function (description) {
                              return wrap(uid(description), description);
                            }
                          );
                          propertyIsEnumerableModule.f = $propertyIsEnumerable;
                          definePropertyModule.f = $defineProperty;
                          getOwnPropertyDescriptorModule.f =
                            $getOwnPropertyDescriptor;
                          getOwnPropertyNamesModule.f =
                            getOwnPropertyNamesExternal.f =
                              $getOwnPropertyNames;
                          getOwnPropertySymbolsModule.f =
                            $getOwnPropertySymbols;

                          wrappedWellKnownSymbolModule.f = function (name) {
                            return wrap(wellKnownSymbol(name), name);
                          };

                          if (DESCRIPTORS) {
                            // https://github.com/tc39/proposal-Symbol-description
                            nativeDefineProperty(
                              $Symbol[PROTOTYPE],
                              'description',
                              {
                                configurable: true,
                                get: function description() {
                                  return getInternalState(this).description;
                                },
                              }
                            );

                            if (!IS_PURE) {
                              redefine(
                                ObjectPrototype,
                                'propertyIsEnumerable',
                                $propertyIsEnumerable,
                                {
                                  unsafe: true,
                                }
                              );
                            }
                          }
                        }

                        $(
                          {
                            global: true,
                            wrap: true,
                            forced: !NATIVE_SYMBOL,
                            sham: !NATIVE_SYMBOL,
                          },
                          {
                            Symbol: $Symbol,
                          }
                        );
                        $forEach(
                          objectKeys(WellKnownSymbolsStore),
                          function (name) {
                            defineWellKnownSymbol(name);
                          }
                        );
                        $(
                          {
                            target: SYMBOL,
                            stat: true,
                            forced: !NATIVE_SYMBOL,
                          },
                          {
                            // `Symbol.for` method
                            // https://tc39.es/ecma262/#sec-symbol.for
                            for: function _for(key) {
                              var string = String(key);
                              if (has(StringToSymbolRegistry, string))
                                return StringToSymbolRegistry[string];
                              var symbol = $Symbol(string);
                              StringToSymbolRegistry[string] = symbol;
                              SymbolToStringRegistry[symbol] = string;
                              return symbol;
                            },
                            // `Symbol.keyFor` method
                            // https://tc39.es/ecma262/#sec-symbol.keyfor
                            keyFor: function keyFor(sym) {
                              if (!isSymbol(sym))
                                throw TypeError(sym + ' is not a symbol');
                              if (has(SymbolToStringRegistry, sym))
                                return SymbolToStringRegistry[sym];
                            },
                            useSetter: function useSetter() {
                              USE_SETTER = true;
                            },
                            useSimple: function useSimple() {
                              USE_SETTER = false;
                            },
                          }
                        );
                        $(
                          {
                            target: 'Object',
                            stat: true,
                            forced: !NATIVE_SYMBOL,
                            sham: !DESCRIPTORS,
                          },
                          {
                            // `Object.create` method
                            // https://tc39.es/ecma262/#sec-object.create
                            create: $create,
                            // `Object.defineProperty` method
                            // https://tc39.es/ecma262/#sec-object.defineproperty
                            defineProperty: $defineProperty,
                            // `Object.defineProperties` method
                            // https://tc39.es/ecma262/#sec-object.defineproperties
                            defineProperties: $defineProperties,
                            // `Object.getOwnPropertyDescriptor` method
                            // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
                            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
                          }
                        );
                        $(
                          {
                            target: 'Object',
                            stat: true,
                            forced: !NATIVE_SYMBOL,
                          },
                          {
                            // `Object.getOwnPropertyNames` method
                            // https://tc39.es/ecma262/#sec-object.getownpropertynames
                            getOwnPropertyNames: $getOwnPropertyNames,
                            // `Object.getOwnPropertySymbols` method
                            // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
                            getOwnPropertySymbols: $getOwnPropertySymbols,
                          }
                        ); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
                        // https://bugs.chromium.org/p/v8/issues/detail?id=3443

                        $(
                          {
                            target: 'Object',
                            stat: true,
                            forced: fails(function () {
                              getOwnPropertySymbolsModule.f(1);
                            }),
                          },
                          {
                            getOwnPropertySymbols:
                              function getOwnPropertySymbols(it) {
                                return getOwnPropertySymbolsModule.f(
                                  toObject(it)
                                );
                              },
                          }
                        ); // `JSON.stringify` method behavior with symbols
                        // https://tc39.es/ecma262/#sec-json.stringify

                        if ($stringify) {
                          var FORCED_JSON_STRINGIFY =
                            !NATIVE_SYMBOL ||
                            fails(function () {
                              var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

                              return (
                                $stringify([symbol]) != '[null]' || // WebKit converts symbol values to JSON as null
                                $stringify({
                                  a: symbol,
                                }) != '{}' || // V8 throws on boxed symbols
                                $stringify(Object(symbol)) != '{}'
                              );
                            });
                          $(
                            {
                              target: 'JSON',
                              stat: true,
                              forced: FORCED_JSON_STRINGIFY,
                            },
                            {
                              // eslint-disable-next-line no-unused-vars -- required for `.length`
                              stringify: function stringify(
                                it,
                                replacer,
                                space
                              ) {
                                var args = [it];
                                var index = 1;
                                var $replacer;

                                while (arguments.length > index) {
                                  args.push(arguments[index++]);
                                }

                                $replacer = replacer;
                                if (
                                  (!isObject(replacer) && it === undefined) ||
                                  isSymbol(it)
                                )
                                  return; // IE8 returns string on undefined

                                if (!isArray(replacer))
                                  replacer = function replacer(key, value) {
                                    if (typeof $replacer == 'function')
                                      value = $replacer.call(this, key, value);
                                    if (!isSymbol(value)) return value;
                                  };
                                args[1] = replacer;
                                return $stringify.apply(null, args);
                              },
                            }
                          );
                        } // `Symbol.prototype[@@toPrimitive]` method
                        // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive

                        if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
                          createNonEnumerableProperty(
                            $Symbol[PROTOTYPE],
                            TO_PRIMITIVE,
                            $Symbol[PROTOTYPE].valueOf
                          );
                        } // `Symbol.prototype[@@toStringTag]` property
                        // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag

                        setToStringTag($Symbol, SYMBOL);
                        hiddenKeys[HIDDEN] = true;

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.match-all.js':
                      /*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.match-all.js ***!
  \*************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_103103__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_103103__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.matchAll` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.matchall

                        defineWellKnownSymbol('matchAll');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.match.js':
                      /*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.match.js ***!
  \*********************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_103735__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_103735__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.match` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.match

                        defineWellKnownSymbol('match');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.replace.js':
                      /*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.replace.js ***!
  \***********************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_104366__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_104366__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.replace` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.replace

                        defineWellKnownSymbol('replace');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.search.js':
                      /*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.search.js ***!
  \**********************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_104999__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_104999__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.search` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.search

                        defineWellKnownSymbol('search');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.species.js':
                      /*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.species.js ***!
  \***********************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_105633__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_105633__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.species` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.species

                        defineWellKnownSymbol('species');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.split.js':
                      /*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.split.js ***!
  \*********************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_106262__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_106262__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.split` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.split

                        defineWellKnownSymbol('split');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.to-primitive.js':
                      /*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.to-primitive.js ***!
  \****************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_106913__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_106913__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.toPrimitive` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.toprimitive

                        defineWellKnownSymbol('toPrimitive');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.to-string-tag.js':
                      /*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.to-string-tag.js ***!
  \*****************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_107586__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_107586__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.toStringTag` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.tostringtag

                        defineWellKnownSymbol('toStringTag');

                        /***/
                      },

                    /***/ './node_modules/core-js/modules/es.symbol.unscopables.js':
                      /*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.unscopables.js ***!
  \***************************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        __unused_webpack_exports,
                        __nested_webpack_require_108251__
                      ) {
                        var defineWellKnownSymbol =
                          __nested_webpack_require_108251__(
                            /*! ../internals/define-well-known-symbol */ './node_modules/core-js/internals/define-well-known-symbol.js'
                          ); // `Symbol.unscopables` well-known symbol
                        // https://tc39.es/ecma262/#sec-symbol.unscopables

                        defineWellKnownSymbol('unscopables');

                        /***/
                      },

                    /***/ './node_modules/core-js/stable/symbol/index.js':
                      /*!*****************************************************!*\
  !*** ./node_modules/core-js/stable/symbol/index.js ***!
  \*****************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_108859__
                      ) {
                        var parent = __nested_webpack_require_108859__(
                          /*! ../../es/symbol */ './node_modules/core-js/es/symbol/index.js'
                        );

                        module.exports = parent;

                        /***/
                      },

                    /***/ './node_modules/webpack/lib/logging/Logger.js':
                      /*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
                      /***/ function (__unused_webpack_module, exports) {
                        'use strict';
                        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

                        function _toConsumableArray(arr) {
                          return (
                            _arrayWithoutHoles(arr) ||
                            _iterableToArray(arr) ||
                            _unsupportedIterableToArray(arr) ||
                            _nonIterableSpread()
                          );
                        }

                        function _nonIterableSpread() {
                          throw new TypeError(
                            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                          );
                        }

                        function _unsupportedIterableToArray(o, minLen) {
                          if (!o) return;
                          if (typeof o === 'string')
                            return _arrayLikeToArray(o, minLen);
                          var n = Object.prototype.toString
                            .call(o)
                            .slice(8, -1);
                          if (n === 'Object' && o.constructor)
                            n = o.constructor.name;
                          if (n === 'Map' || n === 'Set') return Array.from(o);
                          if (
                            n === 'Arguments' ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                          )
                            return _arrayLikeToArray(o, minLen);
                        }

                        function _iterableToArray(iter) {
                          if (
                            typeof Symbol !== 'undefined' &&
                            Symbol.iterator in Object(iter)
                          )
                            return Array.from(iter);
                        }

                        function _arrayWithoutHoles(arr) {
                          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
                        }

                        function _arrayLikeToArray(arr, len) {
                          if (len == null || len > arr.length) len = arr.length;

                          for (var i = 0, arr2 = new Array(len); i < len; i++) {
                            arr2[i] = arr[i];
                          }

                          return arr2;
                        }

                        function _classCallCheck(instance, Constructor) {
                          if (!(instance instanceof Constructor)) {
                            throw new TypeError(
                              'Cannot call a class as a function'
                            );
                          }
                        }

                        function _defineProperties(target, props) {
                          for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable =
                              descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ('value' in descriptor)
                              descriptor.writable = true;
                            Object.defineProperty(
                              target,
                              descriptor.key,
                              descriptor
                            );
                          }
                        }

                        function _createClass(
                          Constructor,
                          protoProps,
                          staticProps
                        ) {
                          if (protoProps)
                            _defineProperties(
                              Constructor.prototype,
                              protoProps
                            );
                          if (staticProps)
                            _defineProperties(Constructor, staticProps);
                          return Constructor;
                        }

                        var LogType = Object.freeze({
                          error:
                            /** @type {"error"} */
                            'error',
                          // message, c style arguments
                          warn:
                            /** @type {"warn"} */
                            'warn',
                          // message, c style arguments
                          info:
                            /** @type {"info"} */
                            'info',
                          // message, c style arguments
                          log:
                            /** @type {"log"} */
                            'log',
                          // message, c style arguments
                          debug:
                            /** @type {"debug"} */
                            'debug',
                          // message, c style arguments
                          trace:
                            /** @type {"trace"} */
                            'trace',
                          // no arguments
                          group:
                            /** @type {"group"} */
                            'group',
                          // [label]
                          groupCollapsed:
                            /** @type {"groupCollapsed"} */
                            'groupCollapsed',
                          // [label]
                          groupEnd:
                            /** @type {"groupEnd"} */
                            'groupEnd',
                          // [label]
                          profile:
                            /** @type {"profile"} */
                            'profile',
                          // [profileName]
                          profileEnd:
                            /** @type {"profileEnd"} */
                            'profileEnd',
                          // [profileName]
                          time:
                            /** @type {"time"} */
                            'time',
                          // name, time as [seconds, nanoseconds]
                          clear:
                            /** @type {"clear"} */
                            'clear',
                          // no arguments
                          status:
                            /** @type {"status"} */
                            'status', // message, arguments
                        });
                        exports.LogType = LogType;
                        /** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

                        var LOG_SYMBOL = Symbol(
                          'webpack logger raw log method'
                        );
                        var TIMERS_SYMBOL = Symbol('webpack logger times');
                        var TIMERS_AGGREGATES_SYMBOL = Symbol(
                          'webpack logger aggregated times'
                        );

                        var WebpackLogger = /*#__PURE__*/ (function () {
                          /**
                           * @param {function(LogTypeEnum, any[]=): void} log log function
                           * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
                           */
                          function WebpackLogger(log, getChildLogger) {
                            _classCallCheck(this, WebpackLogger);

                            this[LOG_SYMBOL] = log;
                            this.getChildLogger = getChildLogger;
                          }

                          _createClass(WebpackLogger, [
                            {
                              key: 'error',
                              value: function error() {
                                for (
                                  var _len = arguments.length,
                                    args = new Array(_len),
                                    _key = 0;
                                  _key < _len;
                                  _key++
                                ) {
                                  args[_key] = arguments[_key];
                                }

                                this[LOG_SYMBOL](LogType.error, args);
                              },
                            },
                            {
                              key: 'warn',
                              value: function warn() {
                                for (
                                  var _len2 = arguments.length,
                                    args = new Array(_len2),
                                    _key2 = 0;
                                  _key2 < _len2;
                                  _key2++
                                ) {
                                  args[_key2] = arguments[_key2];
                                }

                                this[LOG_SYMBOL](LogType.warn, args);
                              },
                            },
                            {
                              key: 'info',
                              value: function info() {
                                for (
                                  var _len3 = arguments.length,
                                    args = new Array(_len3),
                                    _key3 = 0;
                                  _key3 < _len3;
                                  _key3++
                                ) {
                                  args[_key3] = arguments[_key3];
                                }

                                this[LOG_SYMBOL](LogType.info, args);
                              },
                            },
                            {
                              key: 'log',
                              value: function log() {
                                for (
                                  var _len4 = arguments.length,
                                    args = new Array(_len4),
                                    _key4 = 0;
                                  _key4 < _len4;
                                  _key4++
                                ) {
                                  args[_key4] = arguments[_key4];
                                }

                                this[LOG_SYMBOL](LogType.log, args);
                              },
                            },
                            {
                              key: 'debug',
                              value: function debug() {
                                for (
                                  var _len5 = arguments.length,
                                    args = new Array(_len5),
                                    _key5 = 0;
                                  _key5 < _len5;
                                  _key5++
                                ) {
                                  args[_key5] = arguments[_key5];
                                }

                                this[LOG_SYMBOL](LogType.debug, args);
                              },
                            },
                            {
                              key: 'assert',
                              value: function assert(assertion) {
                                if (!assertion) {
                                  for (
                                    var _len6 = arguments.length,
                                      args = new Array(
                                        _len6 > 1 ? _len6 - 1 : 0
                                      ),
                                      _key6 = 1;
                                    _key6 < _len6;
                                    _key6++
                                  ) {
                                    args[_key6 - 1] = arguments[_key6];
                                  }

                                  this[LOG_SYMBOL](LogType.error, args);
                                }
                              },
                            },
                            {
                              key: 'trace',
                              value: function trace() {
                                this[LOG_SYMBOL](LogType.trace, ['Trace']);
                              },
                            },
                            {
                              key: 'clear',
                              value: function clear() {
                                this[LOG_SYMBOL](LogType.clear);
                              },
                            },
                            {
                              key: 'status',
                              value: function status() {
                                for (
                                  var _len7 = arguments.length,
                                    args = new Array(_len7),
                                    _key7 = 0;
                                  _key7 < _len7;
                                  _key7++
                                ) {
                                  args[_key7] = arguments[_key7];
                                }

                                this[LOG_SYMBOL](LogType.status, args);
                              },
                            },
                            {
                              key: 'group',
                              value: function group() {
                                for (
                                  var _len8 = arguments.length,
                                    args = new Array(_len8),
                                    _key8 = 0;
                                  _key8 < _len8;
                                  _key8++
                                ) {
                                  args[_key8] = arguments[_key8];
                                }

                                this[LOG_SYMBOL](LogType.group, args);
                              },
                            },
                            {
                              key: 'groupCollapsed',
                              value: function groupCollapsed() {
                                for (
                                  var _len9 = arguments.length,
                                    args = new Array(_len9),
                                    _key9 = 0;
                                  _key9 < _len9;
                                  _key9++
                                ) {
                                  args[_key9] = arguments[_key9];
                                }

                                this[LOG_SYMBOL](LogType.groupCollapsed, args);
                              },
                            },
                            {
                              key: 'groupEnd',
                              value: function groupEnd() {
                                for (
                                  var _len10 = arguments.length,
                                    args = new Array(_len10),
                                    _key10 = 0;
                                  _key10 < _len10;
                                  _key10++
                                ) {
                                  args[_key10] = arguments[_key10];
                                }

                                this[LOG_SYMBOL](LogType.groupEnd, args);
                              },
                            },
                            {
                              key: 'profile',
                              value: function profile(label) {
                                this[LOG_SYMBOL](LogType.profile, [label]);
                              },
                            },
                            {
                              key: 'profileEnd',
                              value: function profileEnd(label) {
                                this[LOG_SYMBOL](LogType.profileEnd, [label]);
                              },
                            },
                            {
                              key: 'time',
                              value: function time(label) {
                                this[TIMERS_SYMBOL] =
                                  this[TIMERS_SYMBOL] || new Map();
                                this[TIMERS_SYMBOL].set(
                                  label,
                                  process.hrtime()
                                );
                              },
                            },
                            {
                              key: 'timeLog',
                              value: function timeLog(label) {
                                var prev =
                                  this[TIMERS_SYMBOL] &&
                                  this[TIMERS_SYMBOL].get(label);

                                if (!prev) {
                                  throw new Error(
                                    "No such label '".concat(
                                      label,
                                      "' for WebpackLogger.timeLog()"
                                    )
                                  );
                                }

                                var time = process.hrtime(prev);
                                this[LOG_SYMBOL](
                                  LogType.time,
                                  [label].concat(_toConsumableArray(time))
                                );
                              },
                            },
                            {
                              key: 'timeEnd',
                              value: function timeEnd(label) {
                                var prev =
                                  this[TIMERS_SYMBOL] &&
                                  this[TIMERS_SYMBOL].get(label);

                                if (!prev) {
                                  throw new Error(
                                    "No such label '".concat(
                                      label,
                                      "' for WebpackLogger.timeEnd()"
                                    )
                                  );
                                }

                                var time = process.hrtime(prev);
                                this[TIMERS_SYMBOL].delete(label);
                                this[LOG_SYMBOL](
                                  LogType.time,
                                  [label].concat(_toConsumableArray(time))
                                );
                              },
                            },
                            {
                              key: 'timeAggregate',
                              value: function timeAggregate(label) {
                                var prev =
                                  this[TIMERS_SYMBOL] &&
                                  this[TIMERS_SYMBOL].get(label);

                                if (!prev) {
                                  throw new Error(
                                    "No such label '".concat(
                                      label,
                                      "' for WebpackLogger.timeAggregate()"
                                    )
                                  );
                                }

                                var time = process.hrtime(prev);
                                this[TIMERS_SYMBOL].delete(label);
                                this[TIMERS_AGGREGATES_SYMBOL] =
                                  this[TIMERS_AGGREGATES_SYMBOL] || new Map();
                                var current =
                                  this[TIMERS_AGGREGATES_SYMBOL].get(label);

                                if (current !== undefined) {
                                  if (time[1] + current[1] > 1e9) {
                                    time[0] += current[0] + 1;
                                    time[1] = time[1] - 1e9 + current[1];
                                  } else {
                                    time[0] += current[0];
                                    time[1] += current[1];
                                  }
                                }

                                this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
                              },
                            },
                            {
                              key: 'timeAggregateEnd',
                              value: function timeAggregateEnd(label) {
                                if (
                                  this[TIMERS_AGGREGATES_SYMBOL] === undefined
                                )
                                  return;
                                var time =
                                  this[TIMERS_AGGREGATES_SYMBOL].get(label);
                                if (time === undefined) return;
                                this[LOG_SYMBOL](
                                  LogType.time,
                                  [label].concat(_toConsumableArray(time))
                                );
                              },
                            },
                          ]);

                          return WebpackLogger;
                        })();

                        exports.Logger = WebpackLogger;

                        /***/
                      },

                    /***/ './node_modules/webpack/lib/logging/createConsoleLogger.js':
                      /*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_118810__
                      ) {
                        'use strict';
                        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

                        function _toConsumableArray(arr) {
                          return (
                            _arrayWithoutHoles(arr) ||
                            _iterableToArray(arr) ||
                            _unsupportedIterableToArray(arr) ||
                            _nonIterableSpread()
                          );
                        }

                        function _nonIterableSpread() {
                          throw new TypeError(
                            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                          );
                        }

                        function _unsupportedIterableToArray(o, minLen) {
                          if (!o) return;
                          if (typeof o === 'string')
                            return _arrayLikeToArray(o, minLen);
                          var n = Object.prototype.toString
                            .call(o)
                            .slice(8, -1);
                          if (n === 'Object' && o.constructor)
                            n = o.constructor.name;
                          if (n === 'Map' || n === 'Set') return Array.from(o);
                          if (
                            n === 'Arguments' ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                          )
                            return _arrayLikeToArray(o, minLen);
                        }

                        function _iterableToArray(iter) {
                          if (
                            typeof Symbol !== 'undefined' &&
                            Symbol.iterator in Object(iter)
                          )
                            return Array.from(iter);
                        }

                        function _arrayWithoutHoles(arr) {
                          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
                        }

                        function _arrayLikeToArray(arr, len) {
                          if (len == null || len > arr.length) len = arr.length;

                          for (var i = 0, arr2 = new Array(len); i < len; i++) {
                            arr2[i] = arr[i];
                          }

                          return arr2;
                        }

                        var _require = __nested_webpack_require_118810__(
                            /*! ./Logger */ './node_modules/webpack/lib/logging/Logger.js'
                          ),
                          LogType = _require.LogType;
                        /** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

                        /** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

                        /** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

                        /** @typedef {function(string): boolean} FilterFunction */

                        /**
                         * @typedef {Object} LoggerConsole
                         * @property {function(): void} clear
                         * @property {function(): void} trace
                         * @property {(...args: any[]) => void} info
                         * @property {(...args: any[]) => void} log
                         * @property {(...args: any[]) => void} warn
                         * @property {(...args: any[]) => void} error
                         * @property {(...args: any[]) => void=} debug
                         * @property {(...args: any[]) => void=} group
                         * @property {(...args: any[]) => void=} groupCollapsed
                         * @property {(...args: any[]) => void=} groupEnd
                         * @property {(...args: any[]) => void=} status
                         * @property {(...args: any[]) => void=} profile
                         * @property {(...args: any[]) => void=} profileEnd
                         * @property {(...args: any[]) => void=} logTime
                         */

                        /**
                         * @typedef {Object} LoggerOptions
                         * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
                         * @property {FilterTypes|boolean} debug filter for debug logging
                         * @property {LoggerConsole} console the console to log to
                         */

                        /**
                         * @param {FilterItemTypes} item an input item
                         * @returns {FilterFunction} filter function
                         */

                        var filterToFunction = function filterToFunction(item) {
                          if (typeof item === 'string') {
                            var regExp = new RegExp(
                              '[\\\\/]'.concat(
                                item.replace(
                                  // eslint-disable-next-line no-useless-escape
                                  /[-[\]{}()*+?.\\^$|]/g,
                                  '\\$&'
                                ),
                                '([\\\\/]|$|!|\\?)'
                              )
                            );
                            return function (ident) {
                              return regExp.test(ident);
                            };
                          }

                          if (
                            item &&
                            typeof item === 'object' &&
                            typeof item.test === 'function'
                          ) {
                            return function (ident) {
                              return item.test(ident);
                            };
                          }

                          if (typeof item === 'function') {
                            return item;
                          }

                          if (typeof item === 'boolean') {
                            return function () {
                              return item;
                            };
                          }
                        };
                        /**
                         * @enum {number}
                         */

                        var LogLevel = {
                          none: 6,
                          false: 6,
                          error: 5,
                          warn: 4,
                          info: 3,
                          log: 2,
                          true: 2,
                          verbose: 1,
                        };
                        /**
                         * @param {LoggerOptions} options options object
                         * @returns {function(string, LogTypeEnum, any[]): void} logging function
                         */

                        module.exports = function (_ref) {
                          var _ref$level = _ref.level,
                            level = _ref$level === void 0 ? 'info' : _ref$level,
                            _ref$debug = _ref.debug,
                            debug = _ref$debug === void 0 ? false : _ref$debug,
                            console = _ref.console;
                          var debugFilters =
                            typeof debug === 'boolean'
                              ? [
                                  function () {
                                    return debug;
                                  },
                                ]
                              : /** @type {FilterItemTypes[]} */
                                [].concat(debug).map(filterToFunction);
                          /** @type {number} */

                          var loglevel = LogLevel[''.concat(level)] || 0;
                          /**
                           * @param {string} name name of the logger
                           * @param {LogTypeEnum} type type of the log entry
                           * @param {any[]} args arguments of the log entry
                           * @returns {void}
                           */

                          var logger = function logger(name, type, args) {
                            var labeledArgs = function labeledArgs() {
                              if (Array.isArray(args)) {
                                if (
                                  args.length > 0 &&
                                  typeof args[0] === 'string'
                                ) {
                                  return [
                                    '['.concat(name, '] ').concat(args[0]),
                                  ].concat(_toConsumableArray(args.slice(1)));
                                } else {
                                  return ['['.concat(name, ']')].concat(
                                    _toConsumableArray(args)
                                  );
                                }
                              } else {
                                return [];
                              }
                            };

                            var debug = debugFilters.some(function (f) {
                              return f(name);
                            });

                            switch (type) {
                              case LogType.debug:
                                if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

                                if (typeof console.debug === 'function') {
                                  // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                  console.debug.apply(
                                    console,
                                    _toConsumableArray(labeledArgs())
                                  );
                                } else {
                                  console.log.apply(
                                    console,
                                    _toConsumableArray(labeledArgs())
                                  );
                                }

                                break;

                              case LogType.log:
                                if (!debug && loglevel > LogLevel.log) return;
                                console.log.apply(
                                  console,
                                  _toConsumableArray(labeledArgs())
                                );
                                break;

                              case LogType.info:
                                if (!debug && loglevel > LogLevel.info) return;
                                console.info.apply(
                                  console,
                                  _toConsumableArray(labeledArgs())
                                );
                                break;

                              case LogType.warn:
                                if (!debug && loglevel > LogLevel.warn) return;
                                console.warn.apply(
                                  console,
                                  _toConsumableArray(labeledArgs())
                                );
                                break;

                              case LogType.error:
                                if (!debug && loglevel > LogLevel.error) return;
                                console.error.apply(
                                  console,
                                  _toConsumableArray(labeledArgs())
                                );
                                break;

                              case LogType.trace:
                                if (!debug) return;
                                console.trace();
                                break;

                              case LogType.groupCollapsed:
                                if (!debug && loglevel > LogLevel.log) return;

                                if (!debug && loglevel > LogLevel.verbose) {
                                  // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                  if (
                                    typeof console.groupCollapsed === 'function'
                                  ) {
                                    // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                    console.groupCollapsed.apply(
                                      console,
                                      _toConsumableArray(labeledArgs())
                                    );
                                  } else {
                                    console.log.apply(
                                      console,
                                      _toConsumableArray(labeledArgs())
                                    );
                                  }

                                  break;
                                }

                              // falls through

                              case LogType.group:
                                if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

                                if (typeof console.group === 'function') {
                                  // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                  console.group.apply(
                                    console,
                                    _toConsumableArray(labeledArgs())
                                  );
                                } else {
                                  console.log.apply(
                                    console,
                                    _toConsumableArray(labeledArgs())
                                  );
                                }

                                break;

                              case LogType.groupEnd:
                                if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

                                if (typeof console.groupEnd === 'function') {
                                  // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                  console.groupEnd();
                                }

                                break;

                              case LogType.time: {
                                if (!debug && loglevel > LogLevel.log) return;
                                var ms = args[1] * 1000 + args[2] / 1000000;
                                var msg = '['
                                  .concat(name, '] ')
                                  .concat(args[0], ': ')
                                  .concat(ms, ' ms');

                                if (typeof console.logTime === 'function') {
                                  console.logTime(msg);
                                } else {
                                  console.log(msg);
                                }

                                break;
                              }

                              case LogType.profile:
                                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                if (typeof console.profile === 'function') {
                                  // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                  console.profile.apply(
                                    console,
                                    _toConsumableArray(labeledArgs())
                                  );
                                }

                                break;

                              case LogType.profileEnd:
                                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                if (typeof console.profileEnd === 'function') {
                                  // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                  console.profileEnd.apply(
                                    console,
                                    _toConsumableArray(labeledArgs())
                                  );
                                }

                                break;

                              case LogType.clear:
                                if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

                                if (typeof console.clear === 'function') {
                                  // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                  console.clear();
                                }

                                break;

                              case LogType.status:
                                if (!debug && loglevel > LogLevel.info) return;

                                if (typeof console.status === 'function') {
                                  if (args.length === 0) {
                                    console.status();
                                  } else {
                                    console.status.apply(
                                      console,
                                      _toConsumableArray(labeledArgs())
                                    );
                                  }
                                } else {
                                  if (args.length !== 0) {
                                    console.info.apply(
                                      console,
                                      _toConsumableArray(labeledArgs())
                                    );
                                  }
                                }

                                break;

                              default:
                                throw new Error(
                                  'Unexpected LogType '.concat(type)
                                );
                            }
                          };

                          return logger;
                        };

                        /***/
                      },

                    /***/ './node_modules/webpack/lib/logging/runtime.js':
                      /*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
                      /***/ function (
                        __unused_webpack_module,
                        exports,
                        __nested_webpack_require_128757__
                      ) {
                        'use strict';
                        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

                        function _extends() {
                          _extends =
                            Object.assign ||
                            function (target) {
                              for (var i = 1; i < arguments.length; i++) {
                                var source = arguments[i];

                                for (var key in source) {
                                  if (
                                    Object.prototype.hasOwnProperty.call(
                                      source,
                                      key
                                    )
                                  ) {
                                    target[key] = source[key];
                                  }
                                }
                              }

                              return target;
                            };

                          return _extends.apply(this, arguments);
                        }

                        var SyncBailHook = __nested_webpack_require_128757__(
                          /*! tapable/lib/SyncBailHook */ './client/modules/logger/SyncBailHookFake.js'
                        );

                        var _require = __nested_webpack_require_128757__(
                            /*! ./Logger */ './node_modules/webpack/lib/logging/Logger.js'
                          ),
                          Logger = _require.Logger;

                        var createConsoleLogger =
                          __nested_webpack_require_128757__(
                            /*! ./createConsoleLogger */ './node_modules/webpack/lib/logging/createConsoleLogger.js'
                          );
                        /** @type {createConsoleLogger.LoggerOptions} */

                        var currentDefaultLoggerOptions = {
                          level: 'info',
                          debug: false,
                          console: console,
                        };
                        var currentDefaultLogger = createConsoleLogger(
                          currentDefaultLoggerOptions
                        );
                        /**
                         * @param {string} name name of the logger
                         * @returns {Logger} a logger
                         */

                        exports.getLogger = function (name) {
                          return new Logger(
                            function (type, args) {
                              if (
                                exports.hooks.log.call(name, type, args) ===
                                undefined
                              ) {
                                currentDefaultLogger(name, type, args);
                              }
                            },
                            function (childName) {
                              return exports.getLogger(
                                ''.concat(name, '/').concat(childName)
                              );
                            }
                          );
                        };
                        /**
                         * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
                         * @returns {void}
                         */

                        exports.configureDefaultLogger = function (options) {
                          _extends(currentDefaultLoggerOptions, options);

                          currentDefaultLogger = createConsoleLogger(
                            currentDefaultLoggerOptions
                          );
                        };

                        exports.hooks = {
                          log: new SyncBailHook(['origin', 'type', 'args']),
                        };

                        /***/
                      },

                    /******/
                  };
                  /************************************************************************/
                  /******/ // The module cache
                  /******/ var __webpack_module_cache__ = {};
                  /******/
                  /******/ // The require function
                  /******/ function __nested_webpack_require_130883__(
                    moduleId
                  ) {
                    /******/ // Check if module is in cache
                    /******/ var cachedModule =
                      __webpack_module_cache__[moduleId];
                    /******/ if (cachedModule !== undefined) {
                      /******/ return cachedModule.exports;
                      /******/
                    }
                    /******/ // Create a new module (and put it into the cache)
                    /******/ var module = (__webpack_module_cache__[moduleId] =
                      {
                        /******/ // no module.id needed
                        /******/ // no module.loaded needed
                        /******/ exports: {},
                        /******/
                      });
                    /******/
                    /******/ // Execute the module function
                    /******/ __webpack_modules__[moduleId](
                      module,
                      module.exports,
                      __nested_webpack_require_130883__
                    );
                    /******/
                    /******/ // Return the exports of the module
                    /******/ return module.exports;
                    /******/
                  }
                  /******/
                  /************************************************************************/
                  /******/ /* webpack/runtime/global */
                  /******/ !(function () {
                    /******/ __nested_webpack_require_130883__.g =
                      (function () {
                        /******/ if (typeof globalThis === 'object')
                          return globalThis;
                        /******/ try {
                          /******/ return this || new Function('return this')();
                          /******/
                        } catch (e) {
                          /******/ if (typeof window === 'object')
                            return window;
                          /******/
                        }
                        /******/
                      })();
                    /******/
                  })();
                  /******/
                  /************************************************************************/
                  /******/
                  /******/ // startup
                  /******/ // Load entry module and return exports
                  /******/ // This entry module used 'module' so it can't be inlined
                  /******/ var __webpack_exports__ =
                    __nested_webpack_require_130883__(
                      './client/modules/logger/index.js'
                    );
                  /******/ module.exports = __webpack_exports__;
                  /******/
                  /******/
                })();

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/modules/strip-ansi/index.js':
              /*!****************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js ***!
  \****************************************************************************/
              /***/ (module) => {
                /******/ (function () {
                  // webpackBootstrap
                  /******/ 'use strict';
                  /******/ var __webpack_modules__ = {
                    /***/ './client/modules/strip-ansi/index.js':
                      /*!********************************************!*\
  !*** ./client/modules/strip-ansi/index.js ***!
  \********************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_352__
                      ) {
                        module.exports = __nested_webpack_require_352__(
                          /*! strip-ansi */ './node_modules/strip-ansi/index.js'
                        );

                        /***/
                      },

                    /***/ './node_modules/ansi-regex/index.js':
                      /*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
                      /***/ function (module) {
                        module.exports = function () {
                          var _ref =
                              arguments.length > 0 && arguments[0] !== undefined
                                ? arguments[0]
                                : {},
                            _ref$onlyFirst = _ref.onlyFirst,
                            onlyFirst =
                              _ref$onlyFirst === void 0
                                ? false
                                : _ref$onlyFirst;

                          var pattern = [
                            '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
                            '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
                          ].join('|');
                          return new RegExp(
                            pattern,
                            onlyFirst ? undefined : 'g'
                          );
                        };

                        /***/
                      },

                    /***/ './node_modules/strip-ansi/index.js':
                      /*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
                      /***/ function (
                        module,
                        __unused_webpack_exports,
                        __nested_webpack_require_1420__
                      ) {
                        var ansiRegex = __nested_webpack_require_1420__(
                          /*! ansi-regex */ './node_modules/ansi-regex/index.js'
                        );

                        module.exports = function (string) {
                          return typeof string === 'string'
                            ? string.replace(ansiRegex(), '')
                            : string;
                        };

                        /***/
                      },

                    /******/
                  };
                  /************************************************************************/
                  /******/ // The module cache
                  /******/ var __webpack_module_cache__ = {};
                  /******/
                  /******/ // The require function
                  /******/ function __nested_webpack_require_1890__(moduleId) {
                    /******/ // Check if module is in cache
                    /******/ var cachedModule =
                      __webpack_module_cache__[moduleId];
                    /******/ if (cachedModule !== undefined) {
                      /******/ return cachedModule.exports;
                      /******/
                    }
                    /******/ // Create a new module (and put it into the cache)
                    /******/ var module = (__webpack_module_cache__[moduleId] =
                      {
                        /******/ // no module.id needed
                        /******/ // no module.loaded needed
                        /******/ exports: {},
                        /******/
                      });
                    /******/
                    /******/ // Execute the module function
                    /******/ __webpack_modules__[moduleId](
                      module,
                      module.exports,
                      __nested_webpack_require_1890__
                    );
                    /******/
                    /******/ // Return the exports of the module
                    /******/ return module.exports;
                    /******/
                  }
                  /******/
                  /************************************************************************/
                  /******/
                  /******/ // startup
                  /******/ // Load entry module and return exports
                  /******/ // This entry module used 'module' so it can't be inlined
                  /******/ var __webpack_exports__ =
                    __nested_webpack_require_1890__(
                      './client/modules/strip-ansi/index.js'
                    );
                  /******/ module.exports = __webpack_exports__;
                  /******/
                  /******/
                })();

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/overlay.js':
              /*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                'use strict';
                // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
                // They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).

                var ansiHTML = __webpack_require__(
                  /*! ansi-html */ './node_modules/ansi-html/index.js'
                );

                var _require = __webpack_require__(
                    /*! html-entities */ './node_modules/html-entities/lib/index.js'
                  ),
                  encode = _require.encode;

                var colors = {
                  reset: ['transparent', 'transparent'],
                  black: '181818',
                  red: 'E36049',
                  green: 'B3CB74',
                  yellow: 'FFD080',
                  blue: '7CAFC2',
                  magenta: '7FACCA',
                  cyan: 'C3C2EF',
                  lightgrey: 'EBE7E3',
                  darkgrey: '6D7891',
                };
                var overlayIframe = null;
                var overlayDiv = null;
                var lastOnOverlayDivReady = null;
                ansiHTML.setColors(colors);

                function createOverlayIframe(onIframeLoad) {
                  var iframe = document.createElement('iframe');
                  iframe.id = 'webpack-dev-server-client-overlay';
                  iframe.src = 'about:blank';
                  iframe.style.position = 'fixed';
                  iframe.style.left = 0;
                  iframe.style.top = 0;
                  iframe.style.right = 0;
                  iframe.style.bottom = 0;
                  iframe.style.width = '100vw';
                  iframe.style.height = '100vh';
                  iframe.style.border = 'none';
                  iframe.style.zIndex = 9999999999;
                  iframe.onload = onIframeLoad;
                  return iframe;
                }

                function addOverlayDivTo(iframe) {
                  var div = iframe.contentDocument.createElement('div');
                  div.id = 'webpack-dev-server-client-overlay-div';
                  div.style.position = 'fixed';
                  div.style.boxSizing = 'border-box';
                  div.style.left = 0;
                  div.style.top = 0;
                  div.style.right = 0;
                  div.style.bottom = 0;
                  div.style.width = '100vw';
                  div.style.height = '100vh';
                  div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
                  div.style.color = '#E8E8E8';
                  div.style.fontFamily = 'Menlo, Consolas, monospace';
                  div.style.fontSize = 'large';
                  div.style.padding = '2rem';
                  div.style.lineHeight = '1.2';
                  div.style.whiteSpace = 'pre-wrap';
                  div.style.overflow = 'auto';
                  iframe.contentDocument.body.appendChild(div);
                  return div;
                }

                function ensureOverlayDivExists(onOverlayDivReady) {
                  if (overlayDiv) {
                    // Everything is ready, call the callback right away.
                    onOverlayDivReady(overlayDiv);
                    return;
                  } // Creating an iframe may be asynchronous so we'll schedule the callback.
                  // In case of multiple calls, last callback wins.

                  lastOnOverlayDivReady = onOverlayDivReady;

                  if (overlayIframe) {
                    // We've already created it.
                    return;
                  } // Create iframe and, when it is ready, a div inside it.

                  overlayIframe = createOverlayIframe(function () {
                    overlayDiv = addOverlayDivTo(overlayIframe); // Now we can talk!

                    lastOnOverlayDivReady(overlayDiv);
                  }); // Zalgo alert: onIframeLoad() will be called either synchronously
                  // or asynchronously depending on the browser.
                  // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.

                  document.body.appendChild(overlayIframe);
                } // Successful compilation.

                function clear() {
                  if (!overlayDiv) {
                    // It is not there in the first place.
                    return;
                  } // Clean up and reset internal state.

                  document.body.removeChild(overlayIframe);
                  overlayDiv = null;
                  overlayIframe = null;
                  lastOnOverlayDivReady = null;
                } // Compilation with errors (e.g. syntax error or missing modules).

                function showMessage(messages) {
                  ensureOverlayDivExists(function (div) {
                    // Make it look similar to our terminal.
                    var errorMessage = messages[0].message || messages[0];
                    var text = ansiHTML(encode(errorMessage));
                    div.innerHTML = '<span style="color: #'
                      .concat(colors.red, '">Failed to compile.</span><br><br>')
                      .concat(text);
                  });
                }

                module.exports = {
                  clear: clear,
                  showMessage: showMessage,
                };

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/socket.js':
              /*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                'use strict';
                /* provided dependency */ var __webpack_dev_server_client__ =
                  __webpack_require__(
                    /*! ./node_modules/webpack-dev-server/client/clients/WebsocketClient.js */ './node_modules/webpack-dev-server/client/clients/WebsocketClient.js'
                  );

                /* global __webpack_dev_server_client__ */

                /* eslint-disable
  camelcase
*/
                // this WebsocketClient is here as a default fallback, in case the client is not injected

                var Client =
                  typeof __webpack_dev_server_client__ !== 'undefined'
                    ? __webpack_dev_server_client__ // eslint-disable-next-line import/no-unresolved
                    : __webpack_require__(
                        /*! ./clients/WebsocketClient */ './node_modules/webpack-dev-server/client/clients/WebsocketClient.js'
                      );
                var retries = 0;
                var client = null;

                var socket = function initSocket(url, handlers) {
                  client = new Client(url);
                  client.onOpen(function () {
                    retries = 0;
                  });
                  client.onClose(function () {
                    if (retries === 0) {
                      handlers.close();
                    } // Try to reconnect.

                    client = null; // After 10 retries stop trying, to prevent logspam.

                    if (retries <= 10) {
                      // Exponentially increase timeout to reconnect.
                      // Respectfully copied from the package `got`.
                      // eslint-disable-next-line no-mixed-operators, no-restricted-properties
                      var retryInMs =
                        1000 * Math.pow(2, retries) + Math.random() * 100;
                      retries += 1;
                      setTimeout(function () {
                        socket(url, handlers);
                      }, retryInMs);
                    }
                  });
                  client.onMessage(function (data) {
                    var message = JSON.parse(data);

                    if (handlers[message.type]) {
                      handlers[message.type](message.data);
                    }
                  });
                };

                module.exports = socket;

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/utils/createSocketURL.js':
              /*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                'use strict';

                var url = __webpack_require__(
                  /*! url */ './node_modules/url/url.js'
                ); // We handle legacy API that is Node.js specific, and a newer API that implements the same WHATWG URL Standard used by web browsers
                // Please look at https://nodejs.org/api/url.html#url_url_strings_and_url_objects

                function createSocketURL(parsedURL) {
                  var auth = parsedURL.auth,
                    hostname = parsedURL.hostname,
                    protocol = parsedURL.protocol,
                    port = parsedURL.port;

                  var getURLSearchParam = function getURLSearchParam(name) {
                    if (parsedURL.searchParams) {
                      return parsedURL.searchParams.get(name);
                    }

                    return parsedURL.query && parsedURL.query[name];
                  }; // Node.js module parses it as `::`
                  // `new URL(urlString, [baseURLstring])` parses it as '[::]'

                  var isInAddrAny =
                    hostname === '0.0.0.0' ||
                    hostname === '::' ||
                    hostname === '[::]'; // check ipv4 and ipv6 `all hostname`
                  // why do we need this check?
                  // hostname n/a for file protocol (example, when using electron, ionic)
                  // see: https://github.com/webpack/webpack-dev-server/pull/384

                  if (
                    isInAddrAny &&
                    self.location.hostname &&
                    self.location.protocol.indexOf('http') === 0
                  ) {
                    hostname = self.location.hostname;
                  } // `hostname` can be empty when the script path is relative. In that case, specifying a protocol would result in an invalid URL.
                  // When https is used in the app, secure websockets are always necessary because the browser doesn't accept non-secure websockets.

                  if (
                    hostname &&
                    isInAddrAny &&
                    self.location.protocol === 'https:'
                  ) {
                    protocol = self.location.protocol;
                  }

                  var socketURLProtocol = protocol.replace(
                    /^(?:http|.+-extension|file)/i,
                    'ws'
                  ); // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
                  // Parse authentication credentials in case we need them

                  if (parsedURL.username) {
                    auth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
                    // we only include password if the username is not empty.

                    if (parsedURL.password) {
                      // Result: <username>:<password>
                      auth = auth.concat(':', parsedURL.password);
                    }
                  }

                  var socketURLAuth = auth; // In case the host is a raw IPv6 address, it can be enclosed in
                  // the brackets as the brackets are needed in the final URL string.
                  // Need to remove those as url.format blindly adds its own set of brackets
                  // if the host string contains colons. That would lead to non-working
                  // double brackets (e.g. [[::]]) host
                  //
                  // All of these sock url params are optionally passed in through resourceQuery,
                  // so we need to fall back to the default if they are not provided

                  var socketURLHostname = (
                    getURLSearchParam('host') ||
                    hostname ||
                    'localhost'
                  ).replace(/^\[(.*)\]$/, '$1');

                  if (!port || port === '0') {
                    port = self.location.port;
                  }

                  var socketURLPort = getURLSearchParam('port') || port; // If path is provided it'll be passed in via the resourceQuery as a
                  // query param so it has to be parsed out of the querystring in order for the
                  // client to open the socket to the correct location.

                  var socketURLPathname = getURLSearchParam('path') || '/ws';
                  return url.format({
                    protocol: socketURLProtocol,
                    auth: socketURLAuth,
                    hostname: socketURLHostname,
                    port: socketURLPort,
                    pathname: socketURLPathname,
                    slashes: true,
                  });
                }

                module.exports = createSocketURL;

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js':
              /*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
              /***/ (module) => {
                'use strict';

                function getCurrentScriptSource() {
                  // `document.currentScript` is the most accurate way to find the current script,
                  // but is not supported in all browsers.
                  if (document.currentScript) {
                    return document.currentScript.getAttribute('src');
                  } // Fallback to getting all scripts running in the document.

                  var scriptElements = document.scripts || [];
                  var scriptElementsWithSrc = Array.prototype.filter.call(
                    scriptElements,
                    function (element) {
                      return element.getAttribute('src');
                    }
                  );

                  if (scriptElementsWithSrc.length > 0) {
                    var currentScript =
                      scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
                    return currentScript.getAttribute('src');
                  } // Fail as there was no script to use.

                  throw new Error(
                    '[webpack-dev-server] Failed to get current script source.'
                  );
                }

                module.exports = getCurrentScriptSource;

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/utils/log.js':
              /*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                'use strict';

                var logger = __webpack_require__(
                  /*! ../modules/logger */ './node_modules/webpack-dev-server/client/modules/logger/index.js'
                );

                var name = 'webpack-dev-server'; // default level is set on the client side, so it does not need
                // to be set by the CLI or API

                var defaultLevel = 'info';

                function setLogLevel(level) {
                  logger.configureDefaultLogger({
                    level: level,
                  });
                }

                setLogLevel(defaultLevel);
                module.exports = {
                  log: logger.getLogger(name),
                  setLogLevel: setLogLevel,
                };

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/utils/parseURL.js':
              /*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                'use strict';

                var url = __webpack_require__(
                  /*! url */ './node_modules/url/url.js'
                );

                var getCurrentScriptSource = __webpack_require__(
                  /*! ./getCurrentScriptSource */ './node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js'
                );

                function parseURL(resourceQuery) {
                  var options;

                  if (
                    typeof resourceQuery === 'string' &&
                    resourceQuery !== ''
                  ) {
                    // If this bundle is inlined, use the resource query to get the correct url.
                    // format is like `?http://0.0.0.0:8096&port=8097&host=localhost`
                    options = url.parse(
                      resourceQuery // strip leading `?` from query string to get a valid URL
                        .substr(1) // replace first `&` with `?` to have a valid query string
                        .replace('&', '?'),
                      true
                    );
                  } else {
                    // Else, get the url from the <script> this file was called with.
                    var scriptSource = getCurrentScriptSource();

                    if (scriptSource) {
                      var scriptSourceURL;

                      try {
                        // The placeholder `baseURL` with `window.location.href`,
                        // is to allow parsing of path-relative or protocol-relative URLs,
                        // and will have no effect if `scriptSource` is a fully valid URL.
                        scriptSourceURL = new URL(
                          scriptSource,
                          self.location.href
                        );
                      } catch (error) {
                        // URL parsing failed, do nothing.
                        // We will still proceed to see if we can recover using `resourceQuery`
                      }

                      if (scriptSourceURL) {
                        options = scriptSourceURL;
                      }
                    } else {
                      options = url.parse(self.location.href, true, true);
                    }
                  }

                  return options;
                }

                module.exports = parseURL;

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/utils/reloadApp.js':
              /*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                'use strict';

                var _require = __webpack_require__(
                    /*! ./log */ './node_modules/webpack-dev-server/client/utils/log.js'
                  ),
                  log = _require.log;

                function reloadApp(_ref, _ref2) {
                  var hotReload = _ref.hotReload,
                    hot = _ref.hot,
                    liveReload = _ref.liveReload;
                  var isUnloading = _ref2.isUnloading,
                    currentHash = _ref2.currentHash;

                  if (isUnloading || !hotReload) {
                    return;
                  }

                  if (hot) {
                    log.info('App hot update...');

                    var hotEmitter = __webpack_require__(
                      /*! webpack/hot/emitter */ './node_modules/webpack/hot/emitter.js'
                    );

                    hotEmitter.emit('webpackHotUpdate', currentHash);

                    if (typeof self !== 'undefined' && self.window) {
                      // broadcast update to window
                      self.postMessage(
                        'webpackHotUpdate'.concat(currentHash),
                        '*'
                      );
                    }
                  } // allow refreshing the page only if liveReload isn't disabled
                  else if (liveReload) {
                    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

                    var intervalId = self.setInterval(function () {
                      if (rootWindow.location.protocol !== 'about:') {
                        // reload immediately if protocol is valid
                        applyReload(rootWindow, intervalId);
                      } else {
                        rootWindow = rootWindow.parent;

                        if (rootWindow.parent === rootWindow) {
                          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
                          applyReload(rootWindow, intervalId);
                        }
                      }
                    });
                  }

                  function applyReload(rootWindow, intervalId) {
                    clearInterval(intervalId);
                    log.info('App updated. Reloading...');
                    rootWindow.location.reload();
                  }
                }

                module.exports = reloadApp;

                /***/
              },

            /***/ './node_modules/webpack-dev-server/client/utils/sendMessage.js':
              /*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
              /***/ (module) => {
                'use strict';

                /* global __resourceQuery WorkerGlobalScope */
                // Send messages to the outside, so plugins can consume it.

                function sendMsg(type, data) {
                  if (
                    typeof self !== 'undefined' &&
                    (typeof WorkerGlobalScope === 'undefined' ||
                      !(self instanceof WorkerGlobalScope))
                  ) {
                    self.postMessage(
                      {
                        type: 'webpack'.concat(type),
                        data: data,
                      },
                      '*'
                    );
                  }
                }

                module.exports = sendMsg;

                /***/
              },

            /***/ './node_modules/webpack/hot/dev-server.js':
              /*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
                /* globals __webpack_hash__ */
                if (true) {
                  var lastHash;
                  var upToDate = function upToDate() {
                    return lastHash.indexOf(__webpack_require__.h()) >= 0;
                  };
                  var log = __webpack_require__(
                    /*! ./log */ './node_modules/webpack/hot/log.js'
                  );
                  var check = function check() {
                    module.hot
                      .check(true)
                      .then(function (updatedModules) {
                        if (!updatedModules) {
                          log(
                            'warning',
                            '[HMR] Cannot find update. Need to do a full reload!'
                          );
                          log(
                            'warning',
                            '[HMR] (Probably because of restarting the webpack-dev-server)'
                          );
                          window.location.reload();
                          return;
                        }

                        if (!upToDate()) {
                          check();
                        }

                        __webpack_require__(
                          /*! ./log-apply-result */ './node_modules/webpack/hot/log-apply-result.js'
                        )(updatedModules, updatedModules);

                        if (upToDate()) {
                          log('info', '[HMR] App is up to date.');
                        }
                      })
                      .catch(function (err) {
                        var status = module.hot.status();
                        if (['abort', 'fail'].indexOf(status) >= 0) {
                          log(
                            'warning',
                            '[HMR] Cannot apply update. Need to do a full reload!'
                          );
                          log('warning', '[HMR] ' + log.formatError(err));
                          window.location.reload();
                        } else {
                          log(
                            'warning',
                            '[HMR] Update failed: ' + log.formatError(err)
                          );
                        }
                      });
                  };
                  var hotEmitter = __webpack_require__(
                    /*! ./emitter */ './node_modules/webpack/hot/emitter.js'
                  );
                  hotEmitter.on('webpackHotUpdate', function (currentHash) {
                    lastHash = currentHash;
                    if (!upToDate() && module.hot.status() === 'idle') {
                      log(
                        'info',
                        '[HMR] Checking for updates on the server...'
                      );
                      check();
                    }
                  });
                  log('info', '[HMR] Waiting for update signal from WDS...');
                } else {
                }

                /***/
              },

            /***/ './node_modules/webpack/hot/emitter.js':
              /*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                var EventEmitter = __webpack_require__(
                  /*! events */ './node_modules/events/events.js'
                );
                module.exports = new EventEmitter();

                /***/
              },

            /***/ './node_modules/webpack/hot/log-apply-result.js':
              /*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
              /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
                module.exports = function (updatedModules, renewedModules) {
                  var unacceptedModules = updatedModules.filter(function (
                    moduleId
                  ) {
                    return (
                      renewedModules && renewedModules.indexOf(moduleId) < 0
                    );
                  });
                  var log = __webpack_require__(
                    /*! ./log */ './node_modules/webpack/hot/log.js'
                  );

                  if (unacceptedModules.length > 0) {
                    log(
                      'warning',
                      "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
                    );
                    unacceptedModules.forEach(function (moduleId) {
                      log('warning', '[HMR]  - ' + moduleId);
                    });
                  }

                  if (!renewedModules || renewedModules.length === 0) {
                    log('info', '[HMR] Nothing hot updated.');
                  } else {
                    log('info', '[HMR] Updated modules:');
                    renewedModules.forEach(function (moduleId) {
                      if (
                        typeof moduleId === 'string' &&
                        moduleId.indexOf('!') !== -1
                      ) {
                        var parts = moduleId.split('!');
                        log.groupCollapsed('info', '[HMR]  - ' + parts.pop());
                        log('info', '[HMR]  - ' + moduleId);
                        log.groupEnd('info');
                      } else {
                        log('info', '[HMR]  - ' + moduleId);
                      }
                    });
                    var numberIds = renewedModules.every(function (moduleId) {
                      return typeof moduleId === 'number';
                    });
                    if (numberIds)
                      log(
                        'info',
                        '[HMR] Consider using the optimization.moduleIds: "named" for module names.'
                      );
                  }
                };

                /***/
              },

            /***/ './node_modules/webpack/hot/log.js':
              /*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
              /***/ (module) => {
                var logLevel = 'info';

                function dummy() {}

                function shouldLog(level) {
                  var shouldLog =
                    (logLevel === 'info' && level === 'info') ||
                    (['info', 'warning'].indexOf(logLevel) >= 0 &&
                      level === 'warning') ||
                    (['info', 'warning', 'error'].indexOf(logLevel) >= 0 &&
                      level === 'error');
                  return shouldLog;
                }

                function logGroup(logFn) {
                  return function (level, msg) {
                    if (shouldLog(level)) {
                      logFn(msg);
                    }
                  };
                }

                module.exports = function (level, msg) {
                  if (shouldLog(level)) {
                    if (level === 'info') {
                      console.log(msg);
                    } else if (level === 'warning') {
                      console.warn(msg);
                    } else if (level === 'error') {
                      console.error(msg);
                    }
                  }
                };

                /* eslint-disable node/no-unsupported-features/node-builtins */
                var group = console.group || dummy;
                var groupCollapsed = console.groupCollapsed || dummy;
                var groupEnd = console.groupEnd || dummy;
                /* eslint-enable node/no-unsupported-features/node-builtins */

                module.exports.group = logGroup(group);

                module.exports.groupCollapsed = logGroup(groupCollapsed);

                module.exports.groupEnd = logGroup(groupEnd);

                module.exports.setLogLevel = function (level) {
                  logLevel = level;
                };

                module.exports.formatError = function (err) {
                  var message = err.message;
                  var stack = err.stack;
                  if (!stack) {
                    return message;
                  } else if (stack.indexOf(message) < 0) {
                    return message + '\n' + stack;
                  } else {
                    return stack;
                  }
                };

                /***/
              },

            /******/
          };
          /************************************************************************/
          /******/ // The module cache
          /******/ var __webpack_module_cache__ = {};
          /******/
          /******/ // The require function
          /******/ function __webpack_require__(moduleId) {
            /******/ // Check if module is in cache
            /******/ var cachedModule = __webpack_module_cache__[moduleId];
            /******/ if (cachedModule !== undefined) {
              /******/ if (cachedModule.error !== undefined)
                throw cachedModule.error;
              /******/ return cachedModule.exports;
              /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/ var module = (__webpack_module_cache__[moduleId] = {
              /******/ id: moduleId,
              /******/ loaded: false,
              /******/ exports: {},
              /******/
            });
            /******/
            /******/ // Execute the module function
            /******/ try {
              /******/ var execOptions = {
                id: moduleId,
                module: module,
                factory: __webpack_modules__[moduleId],
                require: __webpack_require__,
              };
              /******/ __webpack_require__.i.forEach(function (handler) {
                handler(execOptions);
              });
              /******/ module = execOptions.module;
              /******/ execOptions.factory.call(
                module.exports,
                module,
                module.exports,
                execOptions.require
              );
              /******/
            } catch (e) {
              /******/ module.error = e;
              /******/ throw e;
              /******/
            }
            /******/
            /******/ // Flag the module as loaded
            /******/ module.loaded = true;
            /******/
            /******/ // Return the exports of the module
            /******/ return module.exports;
            /******/
          }
          /******/
          /******/ // expose the modules object (__webpack_modules__)
          /******/ __webpack_require__.m = __webpack_modules__;
          /******/
          /******/ // expose the module cache
          /******/ __webpack_require__.c = __webpack_module_cache__;
          /******/
          /******/ // expose the module execution interceptor
          /******/ __webpack_require__.i = [];
          /******/
          /************************************************************************/
          /******/ /* webpack/runtime/__system_context__ */
          /******/ (() => {
            /******/ __webpack_require__.y = __system_context__;
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/define property getters */
          /******/ (() => {
            /******/ // define getter functions for harmony exports
            /******/ __webpack_require__.d = (exports, definition) => {
              /******/ for (var key in definition) {
                /******/ if (
                  __webpack_require__.o(definition, key) &&
                  !__webpack_require__.o(exports, key)
                ) {
                  /******/ Object.defineProperty(exports, key, {
                    enumerable: true,
                    get: definition[key],
                  });
                  /******/
                }
                /******/
              }
              /******/
            };
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/get javascript update chunk filename */
          /******/ (() => {
            /******/ // This function allow to reference all chunks
            /******/ __webpack_require__.hu = (chunkId) => {
              /******/ // return url for filenames based on template
              /******/ return (
                '' + chunkId + '.' + __webpack_require__.h() + '.hot-update.js'
              );
              /******/
            };
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/get update manifest filename */
          /******/ (() => {
            /******/ __webpack_require__.hmrF = () =>
              'main.' + __webpack_require__.h() + '.hot-update.json';
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/getFullHash */
          /******/ (() => {
            /******/ __webpack_require__.h = () => '78573c6112c481c1e16c';
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/global */
          /******/ (() => {
            /******/ __webpack_require__.g = (function () {
              /******/ if (typeof globalThis === 'object') return globalThis;
              /******/ try {
                /******/ return this || new Function('return this')();
                /******/
              } catch (e) {
                /******/ if (typeof window === 'object') return window;
                /******/
              }
              /******/
            })();
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/hasOwnProperty shorthand */
          /******/ (() => {
            /******/ __webpack_require__.o = (obj, prop) =>
              Object.prototype.hasOwnProperty.call(obj, prop);
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/load script */
          /******/ (() => {
            /******/ var inProgress = {};
            /******/ var dataWebpackPrefix = 'portal-utils:';
            /******/ // loadScript function to load a script via script tag
            /******/ __webpack_require__.l = (url, done, key, chunkId) => {
              /******/ if (inProgress[url]) {
                inProgress[url].push(done);
                return;
              }
              /******/ var script, needAttach;
              /******/ if (key !== undefined) {
                /******/ var scripts = document.getElementsByTagName('script');
                /******/ for (var i = 0; i < scripts.length; i++) {
                  /******/ var s = scripts[i];
                  /******/ if (
                    s.getAttribute('src') == url ||
                    s.getAttribute('data-webpack') == dataWebpackPrefix + key
                  ) {
                    script = s;
                    break;
                  }
                  /******/
                }
                /******/
              }
              /******/ if (!script) {
                /******/ needAttach = true;
                /******/ script = document.createElement('script');
                /******/
                /******/ script.charset = 'utf-8';
                /******/ script.timeout = 120;
                /******/ if (__webpack_require__.nc) {
                  /******/ script.setAttribute('nonce', __webpack_require__.nc);
                  /******/
                }
                /******/ script.setAttribute(
                  'data-webpack',
                  dataWebpackPrefix + key
                );
                /******/ script.src = url;
                /******/
              }
              /******/ inProgress[url] = [done];
              /******/ var onScriptComplete = (prev, event) => {
                /******/ // avoid mem leaks in IE.
                /******/ script.onerror = script.onload = null;
                /******/ clearTimeout(timeout);
                /******/ var doneFns = inProgress[url];
                /******/ delete inProgress[url];
                /******/ script.parentNode &&
                  script.parentNode.removeChild(script);
                /******/ doneFns && doneFns.forEach((fn) => fn(event));
                /******/ if (prev) return prev(event);
                /******/
              };
              /******/ /******/ var timeout = setTimeout(
                onScriptComplete.bind(null, undefined, {
                  type: 'timeout',
                  target: script,
                }),
                120000
              );
              /******/ script.onerror = onScriptComplete.bind(
                null,
                script.onerror
              );
              /******/ script.onload = onScriptComplete.bind(
                null,
                script.onload
              );
              /******/ needAttach && document.head.appendChild(script);
              /******/
            };
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/make namespace object */
          /******/ (() => {
            /******/ // define __esModule on exports
            /******/ __webpack_require__.r = (exports) => {
              /******/ if (
                typeof Symbol !== 'undefined' &&
                Symbol.toStringTag
              ) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                  value: 'Module',
                });
                /******/
              }
              /******/ Object.defineProperty(exports, '__esModule', {
                value: true,
              });
              /******/
            };
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/node module decorator */
          /******/ (() => {
            /******/ __webpack_require__.nmd = (module) => {
              /******/ module.paths = [];
              /******/ if (!module.children) module.children = [];
              /******/ return module;
              /******/
            };
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/hot module replacement */
          /******/ (() => {
            /******/ var currentModuleData = {};
            /******/ var installedModules = __webpack_require__.c;
            /******/
            /******/ // module and require creation
            /******/ var currentChildModule;
            /******/ var currentParents = [];
            /******/
            /******/ // status
            /******/ var registeredStatusHandlers = [];
            /******/ var currentStatus = 'idle';
            /******/
            /******/ // while downloading
            /******/ var blockingPromises;
            /******/
            /******/ // The update info
            /******/ var currentUpdateApplyHandlers;
            /******/ var queuedInvalidatedModules;
            /******/
            /******/ // eslint-disable-next-line no-unused-vars
            /******/ __webpack_require__.hmrD = currentModuleData;
            /******/
            /******/ __webpack_require__.i.push(function (options) {
              /******/ var module = options.module;
              /******/ var require = createRequire(options.require, options.id);
              /******/ module.hot = createModuleHotObject(options.id, module);
              /******/ module.parents = currentParents;
              /******/ module.children = [];
              /******/ currentParents = [];
              /******/ options.require = require;
              /******/
            });
            /******/
            /******/ __webpack_require__.hmrC = {};
            /******/ __webpack_require__.hmrI = {};
            /******/
            /******/ function createRequire(require, moduleId) {
              /******/ var me = installedModules[moduleId];
              /******/ if (!me) return require;
              /******/ var fn = function (request) {
                /******/ if (me.hot.active) {
                  /******/ if (installedModules[request]) {
                    /******/ var parents = installedModules[request].parents;
                    /******/ if (parents.indexOf(moduleId) === -1) {
                      /******/ parents.push(moduleId);
                      /******/
                    }
                    /******/
                  } else {
                    /******/ currentParents = [moduleId];
                    /******/ currentChildModule = request;
                    /******/
                  }
                  /******/ if (me.children.indexOf(request) === -1) {
                    /******/ me.children.push(request);
                    /******/
                  }
                  /******/
                } else {
                  /******/ console.warn(
                    /******/ '[HMR] unexpected require(' +
                      /******/ request +
                      /******/ ') from disposed module ' +
                      /******/ moduleId
                    /******/
                  );
                  /******/ currentParents = [];
                  /******/
                }
                /******/ return require(request);
                /******/
              };
              /******/ var createPropertyDescriptor = function (name) {
                /******/ return {
                  /******/ configurable: true,
                  /******/ enumerable: true,
                  /******/ get: function () {
                    /******/ return require[name];
                    /******/
                  },
                  /******/ set: function (value) {
                    /******/ require[name] = value;
                    /******/
                  },
                  /******/
                };
                /******/
              };
              /******/ for (var name in require) {
                /******/ if (
                  Object.prototype.hasOwnProperty.call(require, name) &&
                  name !== 'e'
                ) {
                  /******/ Object.defineProperty(
                    fn,
                    name,
                    createPropertyDescriptor(name)
                  );
                  /******/
                }
                /******/
              }
              /******/ fn.e = function (chunkId) {
                /******/ return trackBlockingPromise(require.e(chunkId));
                /******/
              };
              /******/ return fn;
              /******/
            }
            /******/
            /******/ function createModuleHotObject(moduleId, me) {
              /******/ var _main = currentChildModule !== moduleId;
              /******/ var hot = {
                /******/ // private stuff
                /******/ _acceptedDependencies: {},
                /******/ _acceptedErrorHandlers: {},
                /******/ _declinedDependencies: {},
                /******/ _selfAccepted: false,
                /******/ _selfDeclined: false,
                /******/ _selfInvalidated: false,
                /******/ _disposeHandlers: [],
                /******/ _main: _main,
                /******/ _requireSelf: function () {
                  /******/ currentParents = me.parents.slice();
                  /******/ currentChildModule = _main ? undefined : moduleId;
                  /******/ __webpack_require__(moduleId);
                  /******/
                },
                /******/
                /******/ // Module API
                /******/ active: true,
                /******/ accept: function (dep, callback, errorHandler) {
                  /******/ if (dep === undefined) hot._selfAccepted = true;
                  /******/ else if (typeof dep === 'function')
                    hot._selfAccepted = dep;
                  /******/ else if (typeof dep === 'object' && dep !== null) {
                    /******/ for (var i = 0; i < dep.length; i++) {
                      /******/ hot._acceptedDependencies[dep[i]] =
                        callback || function () {};
                      /******/ hot._acceptedErrorHandlers[dep[i]] =
                        errorHandler;
                      /******/
                    }
                    /******/
                  } else {
                    /******/ hot._acceptedDependencies[dep] =
                      callback || function () {};
                    /******/ hot._acceptedErrorHandlers[dep] = errorHandler;
                    /******/
                  }
                  /******/
                },
                /******/ decline: function (dep) {
                  /******/ if (dep === undefined) hot._selfDeclined = true;
                  /******/ else if (typeof dep === 'object' && dep !== null)
                    /******/ for (var i = 0; i < dep.length; i++)
                      /******/ hot._declinedDependencies[dep[i]] = true;
                  /******/ else hot._declinedDependencies[dep] = true;
                  /******/
                },
                /******/ dispose: function (callback) {
                  /******/ hot._disposeHandlers.push(callback);
                  /******/
                },
                /******/ addDisposeHandler: function (callback) {
                  /******/ hot._disposeHandlers.push(callback);
                  /******/
                },
                /******/ removeDisposeHandler: function (callback) {
                  /******/ var idx = hot._disposeHandlers.indexOf(callback);
                  /******/ if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
                  /******/
                },
                /******/ invalidate: function () {
                  /******/ this._selfInvalidated = true;
                  /******/ switch (currentStatus) {
                    /******/ case 'idle':
                      /******/ currentUpdateApplyHandlers = [];
                      /******/ Object.keys(__webpack_require__.hmrI).forEach(
                        function (key) {
                          /******/ __webpack_require__.hmrI[key](
                            /******/ moduleId,
                            /******/ currentUpdateApplyHandlers
                            /******/
                          );
                          /******/
                        }
                      );
                      /******/ setStatus('ready');
                      /******/ break;
                    /******/ case 'ready':
                      /******/ Object.keys(__webpack_require__.hmrI).forEach(
                        function (key) {
                          /******/ __webpack_require__.hmrI[key](
                            /******/ moduleId,
                            /******/ currentUpdateApplyHandlers
                            /******/
                          );
                          /******/
                        }
                      );
                      /******/ break;
                    /******/ case 'prepare':
                    /******/ case 'check':
                    /******/ case 'dispose':
                    /******/ case 'apply':
                      /******/ (queuedInvalidatedModules =
                        queuedInvalidatedModules || []).push(
                        /******/ moduleId
                        /******/
                      );
                      /******/ break;
                    /******/ default: // ignore requests in error states
                      /******/ /******/ break;
                    /******/
                  }
                  /******/
                },
                /******/
                /******/ // Management API
                /******/ check: hotCheck,
                /******/ apply: hotApply,
                /******/ status: function (l) {
                  /******/ if (!l) return currentStatus;
                  /******/ registeredStatusHandlers.push(l);
                  /******/
                },
                /******/ addStatusHandler: function (l) {
                  /******/ registeredStatusHandlers.push(l);
                  /******/
                },
                /******/ removeStatusHandler: function (l) {
                  /******/ var idx = registeredStatusHandlers.indexOf(l);
                  /******/ if (idx >= 0)
                    registeredStatusHandlers.splice(idx, 1);
                  /******/
                },
                /******/
                /******/ //inherit from previous dispose call
                /******/ data: currentModuleData[moduleId],
                /******/
              };
              /******/ currentChildModule = undefined;
              /******/ return hot;
              /******/
            }
            /******/
            /******/ function setStatus(newStatus) {
              /******/ currentStatus = newStatus;
              /******/ for (var i = 0; i < registeredStatusHandlers.length; i++)
                /******/ registeredStatusHandlers[i].call(null, newStatus);
              /******/
            }
            /******/
            /******/ function trackBlockingPromise(promise) {
              /******/ switch (currentStatus) {
                /******/ case 'ready':
                  /******/ setStatus('prepare');
                  /******/ blockingPromises.push(promise);
                  /******/ waitForBlockingPromises(function () {
                    /******/ setStatus('ready');
                    /******/
                  });
                  /******/ return promise;
                /******/ case 'prepare':
                  /******/ blockingPromises.push(promise);
                  /******/ return promise;
                /******/ default:
                  /******/ return promise;
                /******/
              }
              /******/
            }
            /******/
            /******/ function waitForBlockingPromises(fn) {
              /******/ if (blockingPromises.length === 0) return fn();
              /******/ var blocker = blockingPromises;
              /******/ blockingPromises = [];
              /******/ return Promise.all(blocker).then(function () {
                /******/ return waitForBlockingPromises(fn);
                /******/
              });
              /******/
            }
            /******/
            /******/ function hotCheck(applyOnUpdate) {
              /******/ if (currentStatus !== 'idle') {
                /******/ throw new Error(
                  'check() is only allowed in idle status'
                );
                /******/
              }
              /******/ setStatus('check');
              /******/ return __webpack_require__
                .hmrM()
                .then(function (update) {
                  /******/ if (!update) {
                    /******/ setStatus(
                      applyInvalidatedModules() ? 'ready' : 'idle'
                    );
                    /******/ return null;
                    /******/
                  }
                  /******/
                  /******/ setStatus('prepare');
                  /******/
                  /******/ var updatedModules = [];
                  /******/ blockingPromises = [];
                  /******/ currentUpdateApplyHandlers = [];
                  /******/
                  /******/ return Promise.all(
                    /******/ Object.keys(__webpack_require__.hmrC).reduce(
                      function (
                        /******/ promises,
                        /******/ key
                        /******/
                      ) {
                        /******/ __webpack_require__.hmrC[key](
                          /******/ update.c,
                          /******/ update.r,
                          /******/ update.m,
                          /******/ promises,
                          /******/ currentUpdateApplyHandlers,
                          /******/ updatedModules
                          /******/
                        );
                        /******/ return promises;
                        /******/
                      },
                      /******/ []
                    )
                    /******/
                  ).then(function () {
                    /******/ return waitForBlockingPromises(function () {
                      /******/ if (applyOnUpdate) {
                        /******/ return internalApply(applyOnUpdate);
                        /******/
                      } else {
                        /******/ setStatus('ready');
                        /******/
                        /******/ return updatedModules;
                        /******/
                      }
                      /******/
                    });
                    /******/
                  });
                  /******/
                });
              /******/
            }
            /******/
            /******/ function hotApply(options) {
              /******/ if (currentStatus !== 'ready') {
                /******/ return Promise.resolve().then(function () {
                  /******/ throw new Error(
                    'apply() is only allowed in ready status'
                  );
                  /******/
                });
                /******/
              }
              /******/ return internalApply(options);
              /******/
            }
            /******/
            /******/ function internalApply(options) {
              /******/ options = options || {};
              /******/
              /******/ applyInvalidatedModules();
              /******/
              /******/ var results = currentUpdateApplyHandlers.map(function (
                handler
              ) {
                /******/ return handler(options);
                /******/
              });
              /******/ currentUpdateApplyHandlers = undefined;
              /******/
              /******/ var errors = results
                /******/ .map(function (r) {
                  /******/ return r.error;
                  /******/
                })
                /******/ .filter(Boolean);
              /******/
              /******/ if (errors.length > 0) {
                /******/ setStatus('abort');
                /******/ return Promise.resolve().then(function () {
                  /******/ throw errors[0];
                  /******/
                });
                /******/
              }
              /******/
              /******/ // Now in "dispose" phase
              /******/ setStatus('dispose');
              /******/
              /******/ results.forEach(function (result) {
                /******/ if (result.dispose) result.dispose();
                /******/
              });
              /******/
              /******/ // Now in "apply" phase
              /******/ setStatus('apply');
              /******/
              /******/ var error;
              /******/ var reportError = function (err) {
                /******/ if (!error) error = err;
                /******/
              };
              /******/
              /******/ var outdatedModules = [];
              /******/ results.forEach(function (result) {
                /******/ if (result.apply) {
                  /******/ var modules = result.apply(reportError);
                  /******/ if (modules) {
                    /******/ for (var i = 0; i < modules.length; i++) {
                      /******/ outdatedModules.push(modules[i]);
                      /******/
                    }
                    /******/
                  }
                  /******/
                }
                /******/
              });
              /******/
              /******/ // handle errors in accept handlers and self accepted module load
              /******/ if (error) {
                /******/ setStatus('fail');
                /******/ return Promise.resolve().then(function () {
                  /******/ throw error;
                  /******/
                });
                /******/
              }
              /******/
              /******/ if (queuedInvalidatedModules) {
                /******/ return internalApply(options).then(function (list) {
                  /******/ outdatedModules.forEach(function (moduleId) {
                    /******/ if (list.indexOf(moduleId) < 0)
                      list.push(moduleId);
                    /******/
                  });
                  /******/ return list;
                  /******/
                });
                /******/
              }
              /******/
              /******/ setStatus('idle');
              /******/ return Promise.resolve(outdatedModules);
              /******/
            }
            /******/
            /******/ function applyInvalidatedModules() {
              /******/ if (queuedInvalidatedModules) {
                /******/ if (!currentUpdateApplyHandlers)
                  currentUpdateApplyHandlers = [];
                /******/ Object.keys(__webpack_require__.hmrI).forEach(
                  function (key) {
                    /******/ queuedInvalidatedModules.forEach(function (
                      moduleId
                    ) {
                      /******/ __webpack_require__.hmrI[key](
                        /******/ moduleId,
                        /******/ currentUpdateApplyHandlers
                        /******/
                      );
                      /******/
                    });
                    /******/
                  }
                );
                /******/ queuedInvalidatedModules = undefined;
                /******/ return true;
                /******/
              }
              /******/
            }
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/publicPath */
          /******/ (() => {
            /******/ __webpack_require__.p = '';
            /******/
          })();
          /******/
          /******/ /* webpack/runtime/jsonp chunk loading */
          /******/ (() => {
            /******/ // no baseURI
            /******/
            /******/ // object to store loaded and loading chunks
            /******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
            /******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
            /******/ var installedChunks = {
              /******/ main: 0,
              /******/
            };
            /******/
            /******/ // no chunk on demand loading
            /******/
            /******/ // no prefetching
            /******/
            /******/ // no preloaded
            /******/
            /******/ var currentUpdatedModulesList;
            /******/ var waitingUpdateResolves = {};
            /******/ function loadUpdateChunk(chunkId) {
              /******/ return new Promise((resolve, reject) => {
                /******/ waitingUpdateResolves[chunkId] = resolve;
                /******/ // start update chunk loading
                /******/ var url =
                  __webpack_require__.p + __webpack_require__.hu(chunkId);
                /******/ // create error before stack unwound to get useful stacktrace later
                /******/ var error = new Error();
                /******/ var loadingEnded = (event) => {
                  /******/ if (waitingUpdateResolves[chunkId]) {
                    /******/ waitingUpdateResolves[chunkId] = undefined;
                    /******/ var errorType =
                      event && (event.type === 'load' ? 'missing' : event.type);
                    /******/ var realSrc =
                      event && event.target && event.target.src;
                    /******/ error.message =
                      'Loading hot update chunk ' +
                      chunkId +
                      ' failed.\n(' +
                      errorType +
                      ': ' +
                      realSrc +
                      ')';
                    /******/ error.name = 'ChunkLoadError';
                    /******/ error.type = errorType;
                    /******/ error.request = realSrc;
                    /******/ reject(error);
                    /******/
                  }
                  /******/
                };
                /******/ __webpack_require__.l(url, loadingEnded);
                /******/
              });
              /******/
            }
            /******/
            /******/ self['webpackHotUpdateportal_utils'] = (
              chunkId,
              moreModules,
              runtime
            ) => {
              /******/ for (var moduleId in moreModules) {
                /******/ if (__webpack_require__.o(moreModules, moduleId)) {
                  /******/ currentUpdate[moduleId] = moreModules[moduleId];
                  /******/ if (currentUpdatedModulesList)
                    currentUpdatedModulesList.push(moduleId);
                  /******/
                }
                /******/
              }
              /******/ if (runtime) currentUpdateRuntime.push(runtime);
              /******/ if (waitingUpdateResolves[chunkId]) {
                /******/ waitingUpdateResolves[chunkId]();
                /******/ waitingUpdateResolves[chunkId] = undefined;
                /******/
              }
              /******/
            };
            /******/
            /******/ var currentUpdateChunks;
            /******/ var currentUpdate;
            /******/ var currentUpdateRemovedChunks;
            /******/ var currentUpdateRuntime;
            /******/ function applyHandler(options) {
              /******/ if (__webpack_require__.f)
                delete __webpack_require__.f.jsonpHmr;
              /******/ currentUpdateChunks = undefined;
              /******/ function getAffectedModuleEffects(updateModuleId) {
                /******/ var outdatedModules = [updateModuleId];
                /******/ var outdatedDependencies = {};
                /******/
                /******/ var queue = outdatedModules.map(function (id) {
                  /******/ return {
                    /******/ chain: [id],
                    /******/ id: id,
                    /******/
                  };
                  /******/
                });
                /******/ while (queue.length > 0) {
                  /******/ var queueItem = queue.pop();
                  /******/ var moduleId = queueItem.id;
                  /******/ var chain = queueItem.chain;
                  /******/ var module = __webpack_require__.c[moduleId];
                  /******/ if (
                    /******/ !module ||
                    /******/ (module.hot._selfAccepted &&
                      !module.hot._selfInvalidated)
                    /******/
                  )
                    /******/ continue;
                  /******/ if (module.hot._selfDeclined) {
                    /******/ return {
                      /******/ type: 'self-declined',
                      /******/ chain: chain,
                      /******/ moduleId: moduleId,
                      /******/
                    };
                    /******/
                  }
                  /******/ if (module.hot._main) {
                    /******/ return {
                      /******/ type: 'unaccepted',
                      /******/ chain: chain,
                      /******/ moduleId: moduleId,
                      /******/
                    };
                    /******/
                  }
                  /******/ for (var i = 0; i < module.parents.length; i++) {
                    /******/ var parentId = module.parents[i];
                    /******/ var parent = __webpack_require__.c[parentId];
                    /******/ if (!parent) continue;
                    /******/ if (parent.hot._declinedDependencies[moduleId]) {
                      /******/ return {
                        /******/ type: 'declined',
                        /******/ chain: chain.concat([parentId]),
                        /******/ moduleId: moduleId,
                        /******/ parentId: parentId,
                        /******/
                      };
                      /******/
                    }
                    /******/ if (outdatedModules.indexOf(parentId) !== -1)
                      continue;
                    /******/ if (parent.hot._acceptedDependencies[moduleId]) {
                      /******/ if (!outdatedDependencies[parentId])
                        /******/ outdatedDependencies[parentId] = [];
                      /******/ addAllToSet(outdatedDependencies[parentId], [
                        moduleId,
                      ]);
                      /******/ continue;
                      /******/
                    }
                    /******/ delete outdatedDependencies[parentId];
                    /******/ outdatedModules.push(parentId);
                    /******/ queue.push({
                      /******/ chain: chain.concat([parentId]),
                      /******/ id: parentId,
                      /******/
                    });
                    /******/
                  }
                  /******/
                }
                /******/
                /******/ return {
                  /******/ type: 'accepted',
                  /******/ moduleId: updateModuleId,
                  /******/ outdatedModules: outdatedModules,
                  /******/ outdatedDependencies: outdatedDependencies,
                  /******/
                };
                /******/
              }
              /******/
              /******/ function addAllToSet(a, b) {
                /******/ for (var i = 0; i < b.length; i++) {
                  /******/ var item = b[i];
                  /******/ if (a.indexOf(item) === -1) a.push(item);
                  /******/
                }
                /******/
              }
              /******/
              /******/ // at begin all updates modules are outdated
              /******/ // the "outdated" status can propagate to parents if they don't accept the children
              /******/ var outdatedDependencies = {};
              /******/ var outdatedModules = [];
              /******/ var appliedUpdate = {};
              /******/
              /******/ var warnUnexpectedRequire =
                function warnUnexpectedRequire(module) {
                  /******/ console.warn(
                    /******/ '[HMR] unexpected require(' +
                      module.id +
                      ') to disposed module'
                    /******/
                  );
                  /******/
                };
              /******/
              /******/ for (var moduleId in currentUpdate) {
                /******/ if (__webpack_require__.o(currentUpdate, moduleId)) {
                  /******/ var newModuleFactory = currentUpdate[moduleId];
                  /******/ /** @type {TODO} */
                  /******/ var result;
                  /******/ if (newModuleFactory) {
                    /******/ result = getAffectedModuleEffects(moduleId);
                    /******/
                  } else {
                    /******/ result = {
                      /******/ type: 'disposed',
                      /******/ moduleId: moduleId,
                      /******/
                    };
                    /******/
                  }
                  /******/ /** @type {Error|false} */
                  /******/ var abortError = false;
                  /******/ var doApply = false;
                  /******/ var doDispose = false;
                  /******/ var chainInfo = '';
                  /******/ if (result.chain) {
                    /******/ chainInfo =
                      '\nUpdate propagation: ' + result.chain.join(' -> ');
                    /******/
                  }
                  /******/ switch (result.type) {
                    /******/ case 'self-declined':
                      /******/ if (options.onDeclined)
                        options.onDeclined(result);
                      /******/ if (!options.ignoreDeclined)
                        /******/ abortError = new Error(
                          /******/ 'Aborted because of self decline: ' +
                            /******/ result.moduleId +
                            /******/ chainInfo
                          /******/
                        );
                      /******/ break;
                    /******/ case 'declined':
                      /******/ if (options.onDeclined)
                        options.onDeclined(result);
                      /******/ if (!options.ignoreDeclined)
                        /******/ abortError = new Error(
                          /******/ 'Aborted because of declined dependency: ' +
                            /******/ result.moduleId +
                            /******/ ' in ' +
                            /******/ result.parentId +
                            /******/ chainInfo
                          /******/
                        );
                      /******/ break;
                    /******/ case 'unaccepted':
                      /******/ if (options.onUnaccepted)
                        options.onUnaccepted(result);
                      /******/ if (!options.ignoreUnaccepted)
                        /******/ abortError = new Error(
                          /******/ 'Aborted because ' +
                            moduleId +
                            ' is not accepted' +
                            chainInfo
                          /******/
                        );
                      /******/ break;
                    /******/ case 'accepted':
                      /******/ if (options.onAccepted)
                        options.onAccepted(result);
                      /******/ doApply = true;
                      /******/ break;
                    /******/ case 'disposed':
                      /******/ if (options.onDisposed)
                        options.onDisposed(result);
                      /******/ doDispose = true;
                      /******/ break;
                    /******/ default:
                      /******/ throw new Error(
                        'Unexception type ' + result.type
                      );
                    /******/
                  }
                  /******/ if (abortError) {
                    /******/ return {
                      /******/ error: abortError,
                      /******/
                    };
                    /******/
                  }
                  /******/ if (doApply) {
                    /******/ appliedUpdate[moduleId] = newModuleFactory;
                    /******/ addAllToSet(
                      outdatedModules,
                      result.outdatedModules
                    );
                    /******/ for (moduleId in result.outdatedDependencies) {
                      /******/ if (
                        __webpack_require__.o(
                          result.outdatedDependencies,
                          moduleId
                        )
                      ) {
                        /******/ if (!outdatedDependencies[moduleId])
                          /******/ outdatedDependencies[moduleId] = [];
                        /******/ addAllToSet(
                          /******/ outdatedDependencies[moduleId],
                          /******/ result.outdatedDependencies[moduleId]
                          /******/
                        );
                        /******/
                      }
                      /******/
                    }
                    /******/
                  }
                  /******/ if (doDispose) {
                    /******/ addAllToSet(outdatedModules, [result.moduleId]);
                    /******/ appliedUpdate[moduleId] = warnUnexpectedRequire;
                    /******/
                  }
                  /******/
                }
                /******/
              }
              /******/ currentUpdate = undefined;
              /******/
              /******/ // Store self accepted outdated modules to require them later by the module system
              /******/ var outdatedSelfAcceptedModules = [];
              /******/ for (var j = 0; j < outdatedModules.length; j++) {
                /******/ var outdatedModuleId = outdatedModules[j];
                /******/ var module = __webpack_require__.c[outdatedModuleId];
                /******/ if (
                  /******/ module &&
                  /******/ (module.hot._selfAccepted || module.hot._main) &&
                  /******/ // removed self-accepted modules should not be required
                  /******/ appliedUpdate[outdatedModuleId] !==
                    warnUnexpectedRequire &&
                  /******/ // when called invalidate self-accepting is not possible
                  /******/ !module.hot._selfInvalidated
                  /******/
                ) {
                  /******/ outdatedSelfAcceptedModules.push({
                    /******/ module: outdatedModuleId,
                    /******/ require: module.hot._requireSelf,
                    /******/ errorHandler: module.hot._selfAccepted,
                    /******/
                  });
                  /******/
                }
                /******/
              }
              /******/
              /******/ var moduleOutdatedDependencies;
              /******/
              /******/ return {
                /******/ dispose: function () {
                  /******/ currentUpdateRemovedChunks.forEach(function (
                    chunkId
                  ) {
                    /******/ delete installedChunks[chunkId];
                    /******/
                  });
                  /******/ currentUpdateRemovedChunks = undefined;
                  /******/
                  /******/ var idx;
                  /******/ var queue = outdatedModules.slice();
                  /******/ while (queue.length > 0) {
                    /******/ var moduleId = queue.pop();
                    /******/ var module = __webpack_require__.c[moduleId];
                    /******/ if (!module) continue;
                    /******/
                    /******/ var data = {};
                    /******/
                    /******/ // Call dispose handlers
                    /******/ var disposeHandlers = module.hot._disposeHandlers;
                    /******/ for (j = 0; j < disposeHandlers.length; j++) {
                      /******/ disposeHandlers[j].call(null, data);
                      /******/
                    }
                    /******/ __webpack_require__.hmrD[moduleId] = data;
                    /******/
                    /******/ // disable module (this disables requires from this module)
                    /******/ module.hot.active = false;
                    /******/
                    /******/ // remove module from cache
                    /******/ delete __webpack_require__.c[moduleId];
                    /******/
                    /******/ // when disposing there is no need to call dispose handler
                    /******/ delete outdatedDependencies[moduleId];
                    /******/
                    /******/ // remove "parents" references from all children
                    /******/ for (j = 0; j < module.children.length; j++) {
                      /******/ var child =
                        __webpack_require__.c[module.children[j]];
                      /******/ if (!child) continue;
                      /******/ idx = child.parents.indexOf(moduleId);
                      /******/ if (idx >= 0) {
                        /******/ child.parents.splice(idx, 1);
                        /******/
                      }
                      /******/
                    }
                    /******/
                  }
                  /******/
                  /******/ // remove outdated dependency from module children
                  /******/ var dependency;
                  /******/ for (var outdatedModuleId in outdatedDependencies) {
                    /******/ if (
                      __webpack_require__.o(
                        outdatedDependencies,
                        outdatedModuleId
                      )
                    ) {
                      /******/ module = __webpack_require__.c[outdatedModuleId];
                      /******/ if (module) {
                        /******/ moduleOutdatedDependencies =
                          /******/ outdatedDependencies[outdatedModuleId];
                        /******/ for (
                          j = 0;
                          j < moduleOutdatedDependencies.length;
                          j++
                        ) {
                          /******/ dependency = moduleOutdatedDependencies[j];
                          /******/ idx = module.children.indexOf(dependency);
                          /******/ if (idx >= 0) module.children.splice(idx, 1);
                          /******/
                        }
                        /******/
                      }
                      /******/
                    }
                    /******/
                  }
                  /******/
                },
                /******/ apply: function (reportError) {
                  /******/ // insert new code
                  /******/ for (var updateModuleId in appliedUpdate) {
                    /******/ if (
                      __webpack_require__.o(appliedUpdate, updateModuleId)
                    ) {
                      /******/ __webpack_require__.m[updateModuleId] =
                        appliedUpdate[updateModuleId];
                      /******/
                    }
                    /******/
                  }
                  /******/
                  /******/ // run new runtime modules
                  /******/ for (
                    var i = 0;
                    i < currentUpdateRuntime.length;
                    i++
                  ) {
                    /******/ currentUpdateRuntime[i](__webpack_require__);
                    /******/
                  }
                  /******/
                  /******/ // call accept handlers
                  /******/ for (var outdatedModuleId in outdatedDependencies) {
                    /******/ if (
                      __webpack_require__.o(
                        outdatedDependencies,
                        outdatedModuleId
                      )
                    ) {
                      /******/ var module =
                        __webpack_require__.c[outdatedModuleId];
                      /******/ if (module) {
                        /******/ moduleOutdatedDependencies =
                          /******/ outdatedDependencies[outdatedModuleId];
                        /******/ var callbacks = [];
                        /******/ var errorHandlers = [];
                        /******/ var dependenciesForCallbacks = [];
                        /******/ for (
                          var j = 0;
                          j < moduleOutdatedDependencies.length;
                          j++
                        ) {
                          /******/ var dependency =
                            moduleOutdatedDependencies[j];
                          /******/ var acceptCallback =
                            /******/ module.hot._acceptedDependencies[
                              dependency
                            ];
                          /******/ var errorHandler =
                            /******/ module.hot._acceptedErrorHandlers[
                              dependency
                            ];
                          /******/ if (acceptCallback) {
                            /******/ if (
                              callbacks.indexOf(acceptCallback) !== -1
                            )
                              continue;
                            /******/ callbacks.push(acceptCallback);
                            /******/ errorHandlers.push(errorHandler);
                            /******/ dependenciesForCallbacks.push(dependency);
                            /******/
                          }
                          /******/
                        }
                        /******/ for (var k = 0; k < callbacks.length; k++) {
                          /******/ try {
                            /******/ callbacks[k].call(
                              null,
                              moduleOutdatedDependencies
                            );
                            /******/
                          } catch (err) {
                            /******/ if (
                              typeof errorHandlers[k] === 'function'
                            ) {
                              /******/ try {
                                /******/ errorHandlers[k](err, {
                                  /******/ moduleId: outdatedModuleId,
                                  /******/ dependencyId:
                                    dependenciesForCallbacks[k],
                                  /******/
                                });
                                /******/
                              } catch (err2) {
                                /******/ if (options.onErrored) {
                                  /******/ options.onErrored({
                                    /******/ type: 'accept-error-handler-errored',
                                    /******/ moduleId: outdatedModuleId,
                                    /******/ dependencyId:
                                      dependenciesForCallbacks[k],
                                    /******/ error: err2,
                                    /******/ originalError: err,
                                    /******/
                                  });
                                  /******/
                                }
                                /******/ if (!options.ignoreErrored) {
                                  /******/ reportError(err2);
                                  /******/ reportError(err);
                                  /******/
                                }
                                /******/
                              }
                              /******/
                            } else {
                              /******/ if (options.onErrored) {
                                /******/ options.onErrored({
                                  /******/ type: 'accept-errored',
                                  /******/ moduleId: outdatedModuleId,
                                  /******/ dependencyId:
                                    dependenciesForCallbacks[k],
                                  /******/ error: err,
                                  /******/
                                });
                                /******/
                              }
                              /******/ if (!options.ignoreErrored) {
                                /******/ reportError(err);
                                /******/
                              }
                              /******/
                            }
                            /******/
                          }
                          /******/
                        }
                        /******/
                      }
                      /******/
                    }
                    /******/
                  }
                  /******/
                  /******/ // Load self accepted modules
                  /******/ for (
                    var o = 0;
                    o < outdatedSelfAcceptedModules.length;
                    o++
                  ) {
                    /******/ var item = outdatedSelfAcceptedModules[o];
                    /******/ var moduleId = item.module;
                    /******/ try {
                      /******/ item.require(moduleId);
                      /******/
                    } catch (err) {
                      /******/ if (typeof item.errorHandler === 'function') {
                        /******/ try {
                          /******/ item.errorHandler(err, {
                            /******/ moduleId: moduleId,
                            /******/ module: __webpack_require__.c[moduleId],
                            /******/
                          });
                          /******/
                        } catch (err2) {
                          /******/ if (options.onErrored) {
                            /******/ options.onErrored({
                              /******/ type: 'self-accept-error-handler-errored',
                              /******/ moduleId: moduleId,
                              /******/ error: err2,
                              /******/ originalError: err,
                              /******/
                            });
                            /******/
                          }
                          /******/ if (!options.ignoreErrored) {
                            /******/ reportError(err2);
                            /******/ reportError(err);
                            /******/
                          }
                          /******/
                        }
                        /******/
                      } else {
                        /******/ if (options.onErrored) {
                          /******/ options.onErrored({
                            /******/ type: 'self-accept-errored',
                            /******/ moduleId: moduleId,
                            /******/ error: err,
                            /******/
                          });
                          /******/
                        }
                        /******/ if (!options.ignoreErrored) {
                          /******/ reportError(err);
                          /******/
                        }
                        /******/
                      }
                      /******/
                    }
                    /******/
                  }
                  /******/
                  /******/ return outdatedModules;
                  /******/
                },
                /******/
              };
              /******/
            }
            /******/ __webpack_require__.hmrI.jsonp = function (
              moduleId,
              applyHandlers
            ) {
              /******/ if (!currentUpdate) {
                /******/ currentUpdate = {};
                /******/ currentUpdateRuntime = [];
                /******/ currentUpdateRemovedChunks = [];
                /******/ applyHandlers.push(applyHandler);
                /******/
              }
              /******/ if (!__webpack_require__.o(currentUpdate, moduleId)) {
                /******/ currentUpdate[moduleId] =
                  __webpack_require__.m[moduleId];
                /******/
              }
              /******/
            };
            /******/ __webpack_require__.hmrC.jsonp = function (
              /******/ chunkIds,
              /******/ removedChunks,
              /******/ removedModules,
              /******/ promises,
              /******/ applyHandlers,
              /******/ updatedModulesList
              /******/
            ) {
              /******/ applyHandlers.push(applyHandler);
              /******/ currentUpdateChunks = {};
              /******/ currentUpdateRemovedChunks = removedChunks;
              /******/ currentUpdate = removedModules.reduce(function (
                obj,
                key
              ) {
                /******/ obj[key] = false;
                /******/ return obj;
                /******/
              },
              {});
              /******/ currentUpdateRuntime = [];
              /******/ chunkIds.forEach(function (chunkId) {
                /******/ if (
                  /******/ __webpack_require__.o(installedChunks, chunkId) &&
                  /******/ installedChunks[chunkId] !== undefined
                  /******/
                ) {
                  /******/ promises.push(
                    loadUpdateChunk(chunkId, updatedModulesList)
                  );
                  /******/ currentUpdateChunks[chunkId] = true;
                  /******/
                }
                /******/
              });
              /******/ if (__webpack_require__.f) {
                /******/ __webpack_require__.f.jsonpHmr = function (
                  chunkId,
                  promises
                ) {
                  /******/ if (
                    /******/ currentUpdateChunks &&
                    /******/ !__webpack_require__.o(
                      currentUpdateChunks,
                      chunkId
                    ) &&
                    /******/ __webpack_require__.o(installedChunks, chunkId) &&
                    /******/ installedChunks[chunkId] !== undefined
                    /******/
                  ) {
                    /******/ promises.push(loadUpdateChunk(chunkId));
                    /******/ currentUpdateChunks[chunkId] = true;
                    /******/
                  }
                  /******/
                };
                /******/
              }
              /******/
            };
            /******/
            /******/ __webpack_require__.hmrM = () => {
              /******/ if (typeof fetch === 'undefined')
                throw new Error('No browser support: need fetch API');
              /******/ return fetch(
                __webpack_require__.p + __webpack_require__.hmrF()
              ).then((response) => {
                /******/ if (response.status === 404) return; // no update available
                /******/ if (!response.ok)
                  throw new Error(
                    'Failed to fetch update manifest ' + response.statusText
                  );
                /******/ return response.json();
                /******/
              });
              /******/
            };
            /******/
            /******/ // no on chunks loaded
            /******/
            /******/ // no jsonp function
            /******/
          })();
          /******/
          /************************************************************************/
          /******/
          /******/ // module cache are used so entry inlining is disabled
          /******/ // startup
          /******/ // Load entry module and return exports
          /******/ __webpack_require__(
            './node_modules/webpack-dev-server/client/index.js?http://0.0.0.0&host=localhost&port=8500'
          );
          /******/ __webpack_require__(
            './node_modules/webpack/hot/dev-server.js'
          );
          /******/ __webpack_require__(
            './node_modules/systemjs-webpack-interop/auto-public-path/1.js'
          );
          /******/ var __webpack_exports__ = __webpack_require__(
            './src/dgmodesto-portal-utils.ts'
          );
          /******/
          /******/ return __webpack_exports__;
          /******/
        })()
      );
    },
  };
});
//# sourceMappingURL=dgmodesto-portal-utils.js.map
