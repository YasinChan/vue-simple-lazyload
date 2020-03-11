const DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
}
class Lazy {
  constructor(Vue) {
    this.vue = Vue
    this._observer = null
    this.ListenerQueue = []
    this.observerOptions = DEFAULT_OBSERVER_OPTIONS
    this.init()
  }
  init() {
    this._observer = new IntersectionObserver(
      this._observerHandler.bind(this),
      this.observerOptions
    )
  }
  add(el, binding, vnode) {
    this.ListenerQueue.push({
      loaded: false,
      el,
      binding,
      vnode
    })
    this.vue.nextTick(() => {
      this._observer && this._observer.observe(el)
    })
  }
  _observerHandler(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.ListenerQueue.forEach((listener) => {
          if (listener.el === entry.target) {
            if (listener.loaded) {
              return this._observer.unobserve(listener.el)
            }
            listener.loaded = true

            const image = new Image()
            image.src = listener.binding.value
            if (listener.binding.arg === 'backgroundImage') {
              image.onload = function() {
                listener.el.style.backgroundImage = `url(${listener.binding.value})`
                listener.el.style.opacity = 1
              }
            } else {
              image.onload = function() {
                listener.el.style.backgroundColor = 'transparent'
                const img = listener.el.querySelector('img')
                img.src = listener.binding.value
                img.style.opacity = 1
              }
              image.onerror = function() {}
            }
          }
        })
      }
    })
  }
}

export default Lazy
