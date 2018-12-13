webpackJsonp([2],{

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(6);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(51);

var _App2 = _interopRequireDefault(_App);

var _store = __webpack_require__(18);

var _router = __webpack_require__(17);

var _vuexRouterSync = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create store and router instances
var store = (0, _store.createStore)();

var router = (0, _router.createRouter)(store);
// sync the router with the vuex store.
// this registers `store.state.route`
(0, _vuexRouterSync.sync)(store, router);

/* eslint-disable no-new */
new _vue2.default({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App: _App2.default }
});

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(20);

var _assign2 = _interopRequireDefault(_assign);

exports.createRouter = createRouter;

var _vue = __webpack_require__(6);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(55);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Index = function Index(r) {
  return __webpack_require__.e/* require.ensure */(0).then((function () {
    return r(__webpack_require__(59));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue2.default.use(_vueRouter2.default);

function createRouter(store) {
  var router = new _vueRouter2.default({
    mode: 'history',
    scrollBehavior: function scrollBehavior() {
      return { y: 0 };
    },
    routes: [{ name: 'home', path: '/', component: Index }]
  });
  router.beforeEach(function (to, from, next) {
    (0, _assign2.default)(to.params, { store: store });
    next();
  });
  return router;
}

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;

var _vue = __webpack_require__(6);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(57);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

function createStore() {
  return new _vuex2.default.Store({
    state: {},
    modules: {}
  });
}

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//

exports.default = {};

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(false);
// imports


// module
exports.push([module.i, "#app{width:100%;height:100%}", ""]);

// exports


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(53)
}
var Component = __webpack_require__(15)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(52),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 52:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(16)("e5d5e91e", content, true, {});

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ })

},[58]);
//# sourceMappingURL=app.js.map