#! /usr/bin/env node
const fs = require('fs')
const parseArgs = require('minimist')

module.exports = (isDev = true) => {
  process.env.NODE_ENV = isDev ? 'development' : 'production'

  // 需要加入环境变量的参数
  const DEFAULT_ENV = {
    'DEPLOY_ENV': 'default'
  }

  let argv
  try {
    argv = JSON.parse(process.env.npm_config_argv).original
  } catch (e) {
    argv = {}
  }

  // 格式化参数
  const args = parseArgs(argv, {
    alias: {
      'deploy': 'DEPLOY_ENV'
    },
    string: ['deploy']
  })

  // 组装环境变量
  for (let env of Object.keys(DEFAULT_ENV)) {
    if (Reflect.has(args, env)) {
      Reflect.set(process.env, env, Reflect.get(args, env))
    } else if (!Reflect.has(process.env, env)) {
      Reflect.set(process.env, env, Reflect.get(DEFAULT_ENV, env))
    }
  }

  // 验证环境变量
  if (!fs.existsSync(`./config/config.${process.env.DEPLOY_ENV}.js`)) {
    throw new Error(`configuration file config/config.${process.env.DEPLOY_ENV}.js not found `)
  }
} 