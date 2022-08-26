
'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'boundle.js',
    path: 'd:/Prog/bianchiprof/bianchiprof/dist/js'
    //path: 'd:/Prog/Git/git/food/js'
  },
  watch: true,

  devtool: "source-map",

  
}; 