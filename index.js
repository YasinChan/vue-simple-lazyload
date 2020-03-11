'use strict';

require('vue');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
};

var Lazy = function () {
  function Lazy(Vue) {
    classCallCheck(this, Lazy);

    this.vue = Vue;
    this._observer = null;
    this.ListenerQueue = [];
    this.observerOptions = DEFAULT_OBSERVER_OPTIONS;
    this.init();
  }

  createClass(Lazy, [{
    key: 'init',
    value: function init() {
      this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.observerOptions);
    }
  }, {
    key: 'add',
    value: function add(el, binding, vnode) {
      var _this = this;

      this.ListenerQueue.push({
        loaded: false,
        el: el,
        binding: binding,
        vnode: vnode
      });
      this.vue.nextTick(function () {
        _this._observer && _this._observer.observe(el);
      });
    }
  }, {
    key: '_observerHandler',
    value: function _observerHandler(entries, observer) {
      var _this2 = this;

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          _this2.ListenerQueue.forEach(function (listener) {
            if (listener.el === entry.target) {
              if (listener.loaded) {
                return _this2._observer.unobserve(listener.el);
              }
              listener.loaded = true;

              var image = new Image();
              image.src = listener.binding.value;
              if (listener.binding.arg === 'backgroundImage') {
                image.onload = function () {
                  listener.el.style.backgroundImage = 'url(' + listener.binding.value + ')';
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

var main = {
  install: function install(Vue) {

    var lazy = new Lazy(Vue);

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    });
  }
};

module.exports = main;
