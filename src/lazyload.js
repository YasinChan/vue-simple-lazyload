const DEFAULTobserver_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
}
class Lazy {
  constructor(Vue, options) {
    this.vue = Vue
    this.observer = null
    this.ListenerQueue = []
    this.observerOptions = options || DEFAULTobserver_OPTIONS
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
