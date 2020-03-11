<template>
  <div v-lazy="imgUrl" :style="{ backgroundColor: bgColor }">
    <img :src="placeholderFigure"/>
  </div>
</template>
<script>
import Lazy from './lazyload'

export default {
  name: 'ImgLazy',
  props: {
    imgUrl: {
      default: '',
      type: String
    },
    bgColor: {
      default: '#fff',
      type: String
    }
  },
  data() {
    return {
      placeholderFigure: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII='
    }
  }
}
</script>
<style scoped>
div {
  transition: background-color .5s ease-in-out .3s;
}
img {
  transition: opacity .5s ease-in-out .3s;
  opacity: 0;
}
</style>