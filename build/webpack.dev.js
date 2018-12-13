#! /usr/bin/env node

// 处理环境变量
const enviroment = require('./environment')
enviroment()
const config = require('../config')

// // 准备dev环境的webpack配置参数
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = merge(baseConfig, {
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: config.title,
      filename: 'index.html',
      template: './src/index.template.html',
      inject: true,
      favicon: path.resolve(__dirname, '../public/favicon.png')
    })
  ]
})

// 配置热加载
const hotMiddlewareEntry = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
Object.keys(webpackConfig.entry).forEach(name => {
  webpackConfig.entry[name] = [hotMiddlewareEntry, ...webpackConfig.entry[name]]
})

const express = require('express')
const app = express()
const serverCompiler = webpack(webpackConfig)

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const devMiddleware = require('webpack-dev-middleware')(serverCompiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
const hotMiddleware = require('webpack-hot-middleware')(serverCompiler, {
  log: () => {}
})
// 首页模板的热更新
serverCompiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})


const port = config.route.port
const urlPrefix = config.route.prefix

// handle fallback for HTML5 history API
app.use(`${urlPrefix}`, require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

app.use(`${urlPrefix}/static`, express.static(path.join(__dirname, '../static')))
app.use(`${urlPrefix}/public`, express.static(path.join(__dirname, '../public')))

app.get('*', (req, res, next) => {
  if (req.originalUrl === urlPrefix) {
    res.redirect(301, `${urlPrefix}/`)
  } else {
    next()
  }
})

devMiddleware.waitUntilValid(function () {
  console.log(`> Listening at localhost:${port}${urlPrefix} \n`)
})

app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Server listening on http://localhost:${port}${urlPrefix}`)
})
