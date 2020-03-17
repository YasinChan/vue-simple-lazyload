<template>
  <div id="app">
    <h1>vue-simple-lazyload</h1>
    <a href="https://github.com/YasinChan/vue-simple-lazyload/tree/gh-pages">Source code</a>
    <div class="wrap">
      <div class="flex">
        <h2>Component</h2>
        <div class="code-wrap">
          <pre v-highlightjs="sourcecode1"><code class=""></code></pre>
        </div>
        <ImgLazy style="margin: 0 auto;" v-for="item in imgLists" :imgUrl="item.url" :bgColor="randomColor()" :key="item.id"></ImgLazy>
      </div>
      <div class="flex">
        <h2>Directive (v-lazy)</h2>
        <div class="code-wrap">
          <pre v-highlightjs="sourcecode2"><code class=""></code></pre>
        </div>
        <div v-for="item in imgLists" v-lazy="item.url" :style="{ backgroundColor: randomColor() }" class="lazyload-container">
          <img :src="placeholderFigure" class="lazyload-img" />
        </div>
      </div>
      <div class="flex">
        <h2>Directive (v-lazy:bgimg)</h2>
        <div class="code-wrap">
          <pre v-highlightjs="sourcecode3"><code class=""></code></pre>
        </div>
        <div v-for="item in imgLists" v-lazy:bgimg="item.url" :style="{ backgroundColor: randomColor() }" class="lazyload-container">
        </div>
      </div>
    </div>
    <p>Pictures from <a href="https://source.unsplash.com/">Unsplash Source</a></p>
  </div>
</template>

<script>
  import 'highlight.js/styles/github.css';
  export default {
    name: 'App',
    data() {
      return {
        placeholderFigure: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=',
        sourcecode1:
            '// main.js \n' +
            'import Vue from \'vue\'\n' +
            'import { VueImgLazy } from \'vue-simple-lazyload\'\n' +
            '\n' +
            'Vue.use(VueImgLazy, {\n' +
            '  rootMargin: \'50px\'\n' +
            '})\n' +
            '\n' +
            '// template \n' +
            '<ImgLazy :imgUrl="$itemUrl" :bgColor="/** random color **/"></ImgLazy>',
        sourcecode2:
            '// main.js \n' +
            'import Vue from \'vue\'\n' +
            'import { VueLazy } from \'vue-simple-lazyload\'\n' +
            '\n' +
            'Vue.use(VueLazy, {\n' +
            '  rootMargin: \'50px\'\n' +
            '})\n' +
            '\n' +
            '// template \n' +
            '<div v-lazy="$imgUrl" :style="{ backgroundColor: /** random color **/ }" class="lazyload-container">\n' +
            '  <img :src="placeholderFigure" class="lazyload-img" />\n' +
            '</div>\n' +
            '\n' +
            '// css. This is also the default style of the VueImgLazy component \n' +
            '.lazyload-container {\n' +
            '  transition: background-color .5s ease-in-out .3s;\n' +
            '  width: 400px;\n' +
            '  height: 200px;\n' +
            '}\n' +
            '.lazyload-img  {\n' +
            '  transition: opacity .5s ease-in-out .3s;\n' +
            '  opacity: 0;\n' +
            '  width: 100%;\n' +
            '  height: 100%;\n' +
            '}',
        sourcecode3:
            '// main.js \n' +
            'import Vue from \'vue\'\n' +
            'import { VueLazy } from \'vue-simple-lazyload\'\n' +
            '\n' +
            'Vue.use(VueLazy, {\n' +
            '  rootMargin: \'50px\'\n' +
            '})\n' +
            '\n' +
            '// template \n' +
            '<div v-lazy:bgimg="$imgUrl" :style="{ backgroundColor: /** random color **/ }" class="lazyload-container">\n' +
            '\n' +
            '// css. This is also the default style of the VueImgLazy component \n' +
            '.lazyload-container {\n' +
            '  transition: background-color .5s ease-in-out .3s;\n' +
            '  width: 400px;\n' +
            '  height: 200px;\n' +
            '}\n',
        imgLists: [
          {
            id: 0,
            url: 'https://images.unsplash.com/photo-1583909562139-d68c98e6b963?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 1,
            url: 'https://images.unsplash.com/photo-1581771556488-da02d801966c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 2,
            url: 'https://images.unsplash.com/photo-1583994581836-ea6c6c0e4b67?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 3,
            url: 'https://images.unsplash.com/photo-1583882279576-e3510b6548ef?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 4,
            url: 'https://images.unsplash.com/photo-1583870042944-0e01422e77b4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 5,
            url: 'https://images.unsplash.com/photo-1583901861084-691a86662e1d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 6,
            url: 'https://images.unsplash.com/photo-1583909796864-047de9e444a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 7,
            url: 'https://images.unsplash.com/photo-1583220820168-6ed4495c3252?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 8,
            url: 'https://images.unsplash.com/photo-1582142689530-e0ed343bb509?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 9,
            url: 'https://images.unsplash.com/photo-1582980154265-1e683bc61ec7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 11,
            url: 'https://images.unsplash.com/photo-1582552525935-eb95b6726654?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 12,
            url: 'https://images.unsplash.com/photo-1582728848368-701c48b8f7ff?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 13,
            url: 'https://images.unsplash.com/photo-1583454122781-8cf8f5af9d2b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 14,
            url: 'https://images.unsplash.com/photo-1581837122621-6103700f7810?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 15,
            url: 'https://images.unsplash.com/photo-1581670708997-2f55123cfa14?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 16,
            url: 'https://images.unsplash.com/photo-1582163711009-8e755d348dd6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 17,
            url: 'https://images.unsplash.com/photo-1582949410733-69ffcd2d9aba?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 18,
            url: 'https://images.unsplash.com/photo-1583456573422-a87019e558b6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 19,
            url: 'https://images.unsplash.com/photo-1582552281350-20f4bc81566d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 20,
            url: 'https://images.unsplash.com/photo-1582295588689-66a3c4bcb1ba?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 21,
            url: 'https://images.unsplash.com/photo-1582194102812-ebb8fb8b5271?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 22,
            url: 'https://images.unsplash.com/photo-1581777715750-d3fb337e70e1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 23,
            url: 'https://images.unsplash.com/photo-1583408100105-4277f264355d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 24,
            url: 'https://images.unsplash.com/photo-1583142262800-c9568b7f4144?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          },
          {
            id: 25,
            url: 'https://images.unsplash.com/photo-1581824043592-e104b7f71a51?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=400',
          }
        ]
      }
    },
    methods: {
      randomColor() {
        return '#' + (Math.random() * 0xffffff << 0).toString(16);
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 980px;
    margin: 0 auto;
  }
  a {
    color: #409eff;
    font-size: 18px;
    font-weight: bold;
  }
  p {
    margin: 60px 0 40px;
  }
  .code-wrap {
    height: 500px;
  }
  .lazyload-container {
    margin: 0 auto;
    transition: background-color .5s ease-in-out .3s;
    width: 250px;
    height: 150px;
    background-size: 100% 100%;
  }
  .lazyload-img  {
    transition: opacity .5s ease-in-out .3s;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
  }
  .flex {
    width: 30%;
  }
</style>
