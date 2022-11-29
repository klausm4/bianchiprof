'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
let path = require('path');
require('dotenv').config();
module.exports = {
  //mode: 'production',
  mode: 'development',
  entry: path.join(__dirname, 'src/index.js'),
  //entry: '/src/index.js',
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
    new HtmlWebpackPlugin({
      filename: 'contacty.html',
      template: path.resolve(__dirname, 'src/contacty.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'dlya_cafe_restoranov.html',
      template: path.resolve(__dirname, 'src/dlya_cafe_restoranov.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'dlya_magazinov_i_setey.html',
      template: path.resolve(__dirname, 'src/dlya_magazinov_i_setey.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'kofemolki.html',
      template: path.resolve(__dirname, 'src/kofemolki.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'moloko_shokolad.html',
      template: path.resolve(__dirname, 'src/moloko_shokolad.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'postovie.html',
      template: path.resolve(__dirname, 'src/postovie.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'chay_stakany.html',
      template: path.resolve(__dirname, 'src/chay_stakany.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'syropi.html',
      template: path.resolve(__dirname, 'src/syropi.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'vending_avtomaty.html',
      template: path.resolve(__dirname, 'src/vending_avtomaty.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'vending.html',
      template: path.resolve(__dirname, 'src/vending.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'zernovoy_kofe.html',
      template: path.resolve(__dirname, 'src/zernovoy_kofe.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/index.html',
      template: path.resolve(__dirname, 'src/ru/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/avtomaty.html',
      template: path.resolve(__dirname, 'src/ru/avtomaty.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/chay_stakany.html',
      template: path.resolve(__dirname, 'src/ru/chay_stakany.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/contacty.html',
      template: path.resolve(__dirname, 'src/ru/contacty.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/dlya_cafe_restoranov.html',
      template: path.resolve(__dirname, 'src/ru/dlya_cafe_restoranov.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/dlya_magazinov_i_setey.html',
      template: path.resolve(__dirname, 'src/ru/dlya_magazinov_i_setey.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/kofemolki.html',
      template: path.resolve(__dirname, 'src/ru/kofemolki.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/moloko_shokolad.html',
      template: path.resolve(__dirname, 'src/ru/moloko_shokolad.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/postovie.html',
      template: path.resolve(__dirname, 'src/ru/postovie.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/syropi.html',
      template: path.resolve(__dirname, 'src/ru/syropi.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/vending_avtomaty.html',
      template: path.resolve(__dirname, 'src/ru/vending_avtomaty.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/vending.html',
      template: path.resolve(__dirname, 'src/ru/vending.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/zernovoy_kofe.html',
      template: path.resolve(__dirname, 'src/ru/zernovoy_kofe.html'),
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/ru/img",
          to: "./ru/img",
        },
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
        },
        {
          from: "./src/robots.txt",
          to: "./robots.txt",
        }
      ],
    }),
    new Dotenv()
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