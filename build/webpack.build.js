#! /usr/bin/env node
// 处理环境变量
const enviroment = require('./environment')
enviroment(false)
const config = require('../config')

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseConfig, {
  devtool: '#source-map',
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, '../dist'), {
      root: path.join(__dirname, '../'),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      title: config.title,
      filename: 'index.html',
      template: './src/index.template.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      favicon: path.resolve(__dirname, '../public/favicon.png')
    }),
    new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0 &&
          module.resource.indexOf('path=/__webpack_hmr&timeout=20000') < 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
