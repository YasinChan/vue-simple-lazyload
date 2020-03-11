# vue-simple-lazyload

A pure lazyload plugin for vue or nuxt

## Usage
```
$ yarn add vue-simple-lazyload -S
// or
$ npm i vue-simple-lazyload -S
```
### Vue
#### main.js
> options [Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

> eg. `rootMargin: '50px'` can preload img before 50px
1. component
```
import { VueImgLazy } from 'vue-simple-lazyload'

Vue.use(VueImgLazy, {
  rootMargin: '50px'
})
```

2. directive
```
import Vue from 'vue'
import { VueLazy } from 'vue-simple-lazyload'

Vue.use(VueLazy, {
  rootMargin: '50px'
})
```
#### template
1. compoennt
```
<ImgLazy :imgUrl="$imgUrl" :bgColor="$bgColor">
</ImgLazy>
```
2. directive
  - use `v-lazy:backgroundImage`
  - use `v-lazy`
  ```
  <div v-lazy="$imgUrl"
      :style="{
        backgroundColor: $bgColor
      }"
      class="lazyload-container">
      <img alt="" :src="$store.state.placeholderFigure" class="lazyload-img" />
  </div>
  ```
  > `$imgUrl` `$bgColor` required

  > class `lazyload-container` `lazyload-img` required

  demo
  ```
  .lazyload-container {
    transition: background-color .5s ease-in-out .3s;
  }
  lazyload-img {
    transition: opacity .5s ease-in-out .3s;
    opacity: 0;
  }
  ```
  > store `placeholderFigure` required before img onload

-------
### nuxt
~/plugins/lazyload.js
```
import Vue from 'vue'
import Lazy from 'vue-simple-lazyload'

Vue.use(Lazy)
```
nuxt.config.js
```
...
 plugins: [
   { src: '~/plugins/lazyLoad', mode: 'client' }
 ],
...
```
## TODO
1. Add nuxt modules
