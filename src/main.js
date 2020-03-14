import Lazy from './lazyload'
import ImgLazy from './ImgLazy.vue'

export const VueLazy = {
  install (Vue, options = {}) {
    const lazy = new Lazy(Vue, options)

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    })
  }
}

export const VueImgLazy = {
  install (Vue, options = {}) {
    const lazy = new Lazy(Vue, options)

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    })
    Vue.component(ImgLazy.name, ImgLazy)
  }
}
