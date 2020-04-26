# vue-simple-lazyload
[![vue-simple-lazyload](https://img.shields.io/badge/vue--simple--lazyload-1.1.3-brightgreen)](https://www.npmjs.com/package/vue-simple-lazyload)

> A pure lazyload plugin for vue or nuxt

## Support
> `<img src="" />` && `background-image: url();`

## Demo
**[demo](https://git.yasinchan.com/vue-simple-lazyload/dist/)**

## Usage

```
$ yarn add vue-simple-lazyload -S
// or
$ npm i vue-simple-lazyload -S
```

> options [Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

> eg. `rootMargin: '50px'` can preload img before 50px

### Vue

#### Component

1. main.js

   ```js
   import Vue from 'vue'
   import { VueImgLazy } from 'vue-simple-lazyload'
   
   Vue.use(VueImgLazy, {
     rootMargin: '50px'
   })
   ```
2. template

   ```html
   <ImgLazy :imgUrl="" :bgColor="" :lazyloadContainer="" :lazyloadImg="" :placeholderFigure=""></ImgLazy>
   ```
3. Props

    | Props             | Description       | Default                     | Opt/Required |
    | ----------------- | ----------------- | --------------------------- | ------------ |
    | imgUrl            | Image url         | ''                          | Required     |
    | bgColor           | Background color  | ''                          | Optional     |
    | lazyloadContainer | Container class   | '' // has default style     | Optional     |
    | lazyloadImg       | Image Class       | '' // has default style     | Optional     |
    | placeholderFigure | Placeholder image | A base64 transparent figure | Optional     |



#### Directive
##### v-lazy (for `<img src="" />`)
1. main.js
   ```js
   import Vue from 'vue'
   import { VueLazy } from 'vue-simple-lazyload'
   
   Vue.use(VueLazy, {
     rootMargin: '50px'
   })
   ```
2. template
   ```css
   <div v-lazy="$imgUrl"
       :style="{
         backgroundColor: $bgColor
       }"
       class="lazyload-container">
       <img :src="$placeholderFigure" class="lazyload-img" />
   </div>
   
   /*css. This is also the default style of the VueImgLazy component*/
   .lazyload-container {
     transition: background-color .5s ease-in-out .3s;
     width: 400px;
     height: 200px;
   }
   .lazyload-img  {
     transition: opacity .5s ease-in-out .3s;
     opacity: 0;
     width: 100%;
     height: 100%;
   }
   ```
##### v-lazy:bgimg (for `background-image: url();`)

1. main.js
   ```js
   import Vue from 'vue'
   import { VueLazy } from 'vue-simple-lazyload'
   
   Vue.use(VueLazy, {
     rootMargin: '50px'
   })
   ```
2. template
   ```css
   <div v-lazy:bgimg="$imgUrl"
       :style="{
         backgroundColor: $bgColor
       }"
       class="lazyload-container">
   </div>
   
   /*css. This is also the default style of the VueImgLazy component*/
   .lazyload-container {
     transition: background-color .5s ease-in-out .3s;
     width: 400px;
     height: 200px;
   }
   ```


-------

### nuxt

1. ~/plugins/lazyload.js

   ```js
   import Vue from 'vue'
   import { VueLazy, VueImgLazy } from 'vue-simple-lazyload'
   
   Vue.use(VueLazy, {
     rootMargin: '50px'
   })
   // or
   Vue.use(VueImgLazy, {
     rootMargin: '50px'
   })
   ```

2. nuxt.config.js

   ```js
   ...
    plugins: [
      { src: '~/plugins/lazyLoad', mode: 'client' }
    ],
   ...
   ```
 
## Required
> This project base on [Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Need import polyfill if necessary.
   

## TODO

1. Add nuxt modules
