import babel from 'rollup-plugin-babel';
import VuePlugin from 'rollup-plugin-vue'

export default {
  input: 'src/main.js',
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    VuePlugin(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
};