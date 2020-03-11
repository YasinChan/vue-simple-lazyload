# vue-simple-lazyload

A pure lazyload plugin for vue or nuxt

## Usage
### Vue
#### main.js
```
import Vue from 'vue'
import Lazy from 'vue-simple-lazyload'

Vue.use(Lazy)
```
#### template
1. use `v-lazy:backgroundImage`

2. use `v-lazy`
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
