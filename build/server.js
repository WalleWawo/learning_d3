// 处理环境变量
const enviroment = require('./environment')
enviroment(false)

const path = require('path')
const express = require('express')
const app = express()

const { port, prefix } = require('../config').route

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(`${prefix}`, require('connect-history-api-fallback')())

app.use(`${prefix}`, express.static(path.join(__dirname, '../dist')))
app.use(`${prefix}/static`, express.static(path.join(__dirname, '../static')))
app.use(`${prefix}/public`, express.static(path.join(__dirname, '../public')))

app.get('*', (req, res, next) => {
  if (req.originalUrl === prefix) {
    res.redirect(301, `${prefix}/`)
  } else {
    next()
  }
})

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}${prefix}`)
})
