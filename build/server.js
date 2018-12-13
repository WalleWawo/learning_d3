// 处理环境变量
const enviroment = require('./environment')
enviroment(false)

const path = require('path')
const express = require('express')
const app = express()

const config = require('../config')
const port = config.route.port
const urlPrefix = config.route.prefix

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(`${urlPrefix}`, require('connect-history-api-fallback')())

app.use(`${urlPrefix}`, express.static(path.join(__dirname, '../dist')))
app.use(`${urlPrefix}/static`, express.static(path.join(__dirname, '../static')))
app.use(`${urlPrefix}/public`, express.static(path.join(__dirname, '../public')))

app.get('*', (req, res, next) => {
  if (req.originalUrl === urlPrefix) {
    res.redirect(301, `${urlPrefix}/`)
  } else {
    next()
  }
})

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}${urlPrefix}`)
})
