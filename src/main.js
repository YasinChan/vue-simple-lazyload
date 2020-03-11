import Vue from 'vue'
import Lazy from './lazyload'

export default {
  install (Vue, options = {}) {
    const lazy = new Lazy(Vue)

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    })    
  }
}
