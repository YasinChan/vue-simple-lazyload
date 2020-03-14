'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
};

var Lazy = /*#__PURE__*/function () {
  function Lazy(Vue, options) {
    _classCallCheck(this, Lazy);

    this.vue = Vue;
    this.observer = null;
    this.ListenerQueue = [];
    this.observerOptions = options || DEFAULT_OBSERVER_OPTIONS;
    this.init();
  }

  _createClass(Lazy, [{
    key: "init",
    value: function init() {
      this.observer = new IntersectionObserver(this.observerHandler.bind(this), this.observerOptions);
    }
  }, {
    key: "add",
    value: function add(el, binding, vnode) {
      var _this = this;

      this.ListenerQueue.push({
        loaded: false,
        el: el,
        binding: binding,
        vnode: vnode
      });
      this.vue.nextTick(function () {
        _this.observer && _this.observer.observe(el);
      });
    }
  }, {
    key: "observerHandler",
    value: function observerHandler(entries, observer) {
      var _this2 = this;

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          _this2.ListenerQueue.forEach(function (listener) {
            if (listener.el === entry.target) {
              if (listener.loaded) {
                return _this2.observer.unobserve(listener.el);
              }

              listener.loaded = true;
              var image = new Image();
              image.src = listener.binding.value;

              if (listener.binding.arg === 'bgimg') {
                image.onload = function () {
                  listener.el.style.backgroundImage = "url(".concat(listener.binding.value, ")");
                  listener.el.style.opacity = 1;
                };
              } else {
                image.onload = function () {
                  listener.el.style.backgroundColor = 'transparent';
                  var img = listener.el.querySelector('img');
                  img.src = listener.binding.value;
                  img.style.opacity = 1;
                };

                image.onerror = function () {};
              }
            }
          });
        }
      });
    }
  }]);

  return Lazy;
}();

//
//
//
//
//
var script = {
  name: 'ImgLazy',
  props: {
    imgUrl: {
      "default": '',
      type: String
    },
    bgColor: {
      "default": ''
    },
    lazyloadContainer: {
      "default": '',
      type: String
    },
    lazyloadImg: {
      "default": '',
      type: String
    },
    placeholderFigure: {
      "default": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII='
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}

var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    directives: [{
      name: "lazy",
      rawName: "v-lazy",
      value: _vm.imgUrl,
      expression: "imgUrl"
    }],
    "class": _vm.lazyloadContainer,
    style: {
      backgroundColor: _vm.bgColor
    }
  }, [_c("img", {
    "class": _vm.lazyloadImg
  })]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6b7395de_0", {
    source: "\ndiv[data-v-6b7395de] {\n  transition: background-color .5s ease-in-out .3s;\n  width: 250px;\n  height: 150px;\n}\nimg[data-v-6b7395de] {\n  transition: opacity .5s ease-in-out .3s;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/yasinchan/Code/project/vue-simple-lazyload/src/ImgLazy.vue"],
      "names": [],
      "mappings": ";AAgCA;EACA,gDAAA;EACA,YAAA;EACA,aAAA;AACA;AACA;EACA,uCAAA;EACA,UAAA;EACA,WAAA;EACA,YAAA;AACA",
      "file": "ImgLazy.vue",
      "sourcesContent": ["<template>\n  <div :class=\"lazyloadContainer\" v-lazy=\"imgUrl\" :style=\"{ backgroundColor: bgColor }\">\n    <img :class=\"lazyloadImg\"/>\n  </div>\n</template>\n<script>\n\nexport default {\n  name: 'ImgLazy',\n  props: {\n    imgUrl: {\n      default: '',\n      type: String\n    },\n    bgColor: {\n      default: ''\n    },\n    lazyloadContainer: {\n      default: '',\n      type: String\n    },\n    lazyloadImg: {\n      default: '',\n      type: String\n    },\n    placeholderFigure: {\n      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII='\n    }\n  }\n}\n</script>\n<style scoped>\ndiv {\n  transition: background-color .5s ease-in-out .3s;\n  width: 250px;\n  height: 150px;\n}\nimg {\n  transition: opacity .5s ease-in-out .3s;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-6b7395de";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var VueLazy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var lazy = new Lazy(Vue, options);
    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    });
  }
};
var VueImgLazy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var lazy = new Lazy(Vue, options);
    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    });
    Vue.component(__vue_component__.name, __vue_component__);
  }
};

exports.VueImgLazy = VueImgLazy;
exports.VueLazy = VueLazy;
