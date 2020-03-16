const DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
}
class Lazy {
  constructor(Vue, options) {
    this.vue = Vue
    this.observer = null
    this.ListenerQueue = []
    this.observerOptions = options || DEFAULT_OBSERVER_OPTIONS
    this.init()
  }
  init() {
    this.observer = new IntersectionObserver(
      this.observerHandler.bind(this),
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
      this.observer && this.observer.observe(el)
    })
  }
  observerHandler(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.ListenerQueue.forEach((listener) => {
          if (listener.el === entry.target) {
            if (listener.loaded) {
              return this.observer.unobserve(listener.el)
            }
            listener.loaded = true

            if (listener.binding.arg === 'bgimg') {
              const image = new Image()
              image.src = listener.binding.value
              image.onload = function() {
                listener.el.style.backgroundImage = `url(${listener.binding.value})`
                listener.el.style.opacity = 1
              }
              image.onerror = function() {}
            } else {
              const img = listener.el.querySelector('img')
              if (!img) {
                throw 'Please make sure that you have set img html inside v-lazy directive. [more details] https://github.com/YasinChan/vue-simple-lazyload/blob/master/README.md'
              }
              img.onload = function() {
                img.style.opacity = 1
                listener.el.style.backgroundColor = 'transparent'
              }
              img.src = listener.binding.value
              img.onerror = function() {}
            }
          }
        })
      }
    })
  }
}

export default Lazy
