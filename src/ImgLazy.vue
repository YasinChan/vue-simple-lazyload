<template>
  <div :class="lazyloadContainer" v-lazy="imgUrl" :style="{ backgroundColor: bgColor }">
    <img :class="lazyloadImg"/>
  </div>
</template>
<script>

export default {
  name: 'ImgLazy',
  props: {
    imgUrl: {
      default: '',
      type: String
    },
    bgColor: {
      default: ''
    },
    lazyloadContainer: {
      default: '',
      type: String
    },
    lazyloadImg: {
      default: '',
      type: String
    },
    placeholderFigure: {
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII='
    }
  }
}
</script>
<style scoped>
div {
  transition: background-color .5s ease-in-out .3s;
  width: 250px;
  height: 150px;
}
img {
  transition: opacity .5s ease-in-out .3s;
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
