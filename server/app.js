require('app-module-path').addPath(__dirname)
const path = require('path')
const fs = require('fs')
const express = require('express')
const _ = require('lodash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const newRelicCloudFoundry = require('lmig--newrelic-cloud-foundry')
const parser = require('body-parser')
const HttpStatus = require('http-status-codes')
const Proxy = require('./lib/proxy')
const config = require('./config')
const app = express()

const indexTemplate = new Promise((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, '../build/view/index.html'), (err, content) => {
    if (err) {
      return reject(err)
    }
    return resolve(_.template(content.toString(), {interpolate: /{{([\s\S]+?)}}/g}))
  })
})
newRelicCloudFoundry()

const eServiceLegacyProxy = new Proxy({ domain: config.services.eServiceLegacy.url })

app.use(morgan('combined', ({ stream: process.stdout })))
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(express.static(path.resolve(__dirname, '../build/client')))
app.use(/\/PmInternet\w+Web\/.*$/, eServiceLegacyProxy.handleRequest)

app.use('/api', require('./api'), (req, res) => {
  return res.status(HttpStatus.NOT_FOUND).send()
})

app.get('*', (req, res, next) => {
  indexTemplate.then((template) => {
    let data = ''
    if (config.newrelic) {
      data = require('newrelic').getBrowserTimingHeader()
    }
    const text = template({
      newrelic: data,
    })
    res.status(HttpStatus.OK).send(text)
  }).catch(next)
})

module.exports = app
