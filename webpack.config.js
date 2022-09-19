
'use strict';

let path = require('path');

module.exports = {
  // mode: 'production'
  mode: 'none',
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
    // path: 'd:/Prog/bianchiprof/js'
    //path: 'd:/Prog/Git/git/food/js'
  },
  watch: true,
  devtool: "source-map",
}; 

// 'use strict';

// const path = require('path');
// const webpack = require('webpack')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const MiniExtractCssPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require("copy-webpack-plugin");

// let mode = 'development';
// if(process.env.NODE_ENV === 'production') mode = 'production';

// console.log("mode", mode);

// module.exports = {
//   entry: './js/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'index.js',
//   },
//   mode: mode,
//     devServer: {
//         historyApiFallback: true,
//         static: {
//           directory: path.resolve(__dirname, 'dist')
//         },
//         open: true,
//         compress: true,
//         hot: true,
//         port: 3000,
//     },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: ['babel-loader'],
//       },
//       {
//         test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
//         type: 'asset/inline',
//       },
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use: [
//           MiniExtractCssPlugin.loader, 
//           'css-loader',
//           'sass-loader',
//         ],
//       },
//     ],
//   },
//   plugins: [
//     new HTMLWebpackPlugin({
//       template: path.resolve(__dirname, 'index.html')
//       //template: path.resolve(__dirname, 'dlya_magazinov_i_setey.html')
//     }),
//     new CopyPlugin({
//       patterns: [
//         { from: 'img/**/*', to: './' }
//       ]
//     }),
//     new MiniExtractCssPlugin(),
//     new CleanWebpackPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//   ]
// }