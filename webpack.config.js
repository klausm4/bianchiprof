'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
let path = require('path');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.js$/,
        use: ['babel-loader']
      }
    ]
  },
  // watch: true,
  devtool: "source-map",
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'avtomaty.html',
      template: path.resolve(__dirname, 'src/avtomaty.html'),
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/video",
          to: "./video",
        },
        {
          from: "./src/img",
          to: "./img",
        },
        {
          from: "./src/favicon.png",
          to: "./favicon.png",
        }
      ],
    })
  ],
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'src'),
    },
    hot: true,
}
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