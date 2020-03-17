import Vue from 'vue'
import App from './App.vue'
import { VueImgLazy, VueLazy } from '../../src/main'
import VueHighlightJS from 'vue-highlightjs'

Vue.use(VueHighlightJS)

Vue.use(VueImgLazy, {
  rootMargin: '50px'
})

Vue.use(VueLazy, {
  rootMargin: '50px'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
