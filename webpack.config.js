
'use strict';

let path = require('path');

module.exports = {
  // mode: 'production'
  mode: 'none',
  entry: './js/index.js',
  output: {
    filename: 'boundle.js',
    path: 'd:/Prog/bianchiprof/bianchiprof/js'
    // path: 'd:/Prog/bianchiprof/js'
    //path: 'd:/Prog/Git/git/food/js'
  },
  watch: true,

  devtool: "source-map",

  
}; 