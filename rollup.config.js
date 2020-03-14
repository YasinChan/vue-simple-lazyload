import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import VuePlugin from 'rollup-plugin-vue'

export default {
  input: 'src/main.js',
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    commonjs,
    VuePlugin(),
    babel({
      runtimeHelpers: true,
      sourceMap: true,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
    })
  ]
};
