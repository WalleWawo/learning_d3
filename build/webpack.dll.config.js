'use strict'
 
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
 
const dllWebpackConfig = {
  mode: 'production',
  entry: {
    vue: ['vue', 'vuex', 'vue-router', 'vuex-router-sync']
  },
  output: {
    path: path.join(__dirname, '../dll/js/'),
    filename: 'dll.[name].[hash].js',
    // 生成文件的映射关系，与下面DllPlugin中配置对应
    library: '[name]_[hash]'
  },
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, '../dll'), {
      root: path.join(__dirname, '../'),
      verbose: true
    }),
    new webpack.DllPlugin({
      // 会生成一个json文件，里面是关于dll.js的一些配置信息
      path: path.join(__dirname, '../dll/[name]-manifest.json'),
      // 与上面output中配置对应
      name: '[name]_[hash]',
    }),
    new AssetsPlugin({
      filename: 'bundle-conf.json',
      path: path.join(__dirname, '../dll')
    }),
    // 压缩文件
    new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i
    })
  ]
}

webpack(dllWebpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
