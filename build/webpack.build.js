#! /usr/bin/env node

// 处理环境变量
const enviroment = require('./environment')
enviroment(false)

// 获取自定义配置信息
const config = require('../config')

// 准备prod环境的webpack配置参数
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const os = require('os')
const baseConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const bundlePkg = require('../dll/bundle-conf.json')
const webpackConfig = merge(baseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      // 默认作用于异步chunk，值为all/initial/async/function(chunk)
      chunks: 'all',
      // 默认值是30kb
      minSize: 30000,
      // 被多少模块共享
      minChunks: 1,
      // 所有异步请求不得超过5个
      maxAsyncRequests: 5,
      // 初始话并行请求不得超过3个
      maxInitialRequests: 3,
      //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
      name: true,
      // 设置缓存组用来抽取满足不同规则的chunk
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  plugins: [
    // 移除dist文件夹
    new CleanWebpackPlugin(path.join(__dirname, '../dist'), {
      root: path.join(__dirname, '../'),
      verbose: true
    }),
    // DllReferencePlugin
    ...Object.keys(bundlePkg).map(name => {
      return new webpack.DllReferencePlugin({
        manifest: require(`../dll/${name}-manifest.json`) 
      })
    }),
    // 将DllPlugin生成的文件移入dist目录
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../dll/js'),
      to: path.resolve(__dirname, '../dist'),
      ignore: ['.json']
    }]),
    // 多线程打包
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader',
      }],
      threadPool: happyThreadPool,
      verbose: true,
      verboseWhenProfiling: true,
      debug: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.template.html',
      inject: true,
      title: config.title,
      favicon: path.resolve(__dirname, '../public/favicon.png'),
      // 模板中将dllPlugin生成的文件引入页面中
      bundles: Object.values(bundlePkg).map(item => `${config.route.prefix}/${item.js}`),
      // 集成的html-minifier的配置项
      minify: {
        // 去除注释内容
        removeComments: true,
        // 去除所有的空白
        collapseWhitespace: true,
        // 尽可能的删除引号
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    // 压缩文件
    new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i
    })
  ]
})

// build的分析
if (process.env.ANALYSIS) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: process.env.PORT || 8080,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  )
}

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
