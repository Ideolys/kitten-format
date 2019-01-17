const terser = require('rollup-plugin-terser');

module.exports = {
  input  : 'entry.client.js',
  output : {
    file   : 'build/kittenFormat.client.min.js',
    format : 'umd',
    name   : 'kittenFormat'
  },
  plugins : [
    terser.terser()
  ]
};
