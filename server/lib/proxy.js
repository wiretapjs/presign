const request = require('request')
const URL = require('url-parse')

class Proxy {
  constructor (config) {
    config = config || {}

    if (!config.domain) {
      throw new Error('Config object must have key "domain"')
    }

    this.config = config
    this.handleRequest = this.handleRequest.bind(this)
  }

  get domain () {
    return this.config.domain
  }

  get host () {
    return URL(this.config.domain).host
  }

  handleRequest (req, res) {
    const requestConfig = {
      method: req.method,
      url: `${this.domain}${req.originalUrl}`,
      headers: req.headers,
    }

    if (!Proxy._isEmpty(req.body)) requestConfig.body = req.body

    if (Proxy._isJson(req.headers)) requestConfig.json = true

    requestConfig.headers.host = this.host

    return request(requestConfig).pipe(res)
  }

  static _isJson (headers) {
    let contentTypeHeader = headers['Content-Type']
    if (!contentTypeHeader) contentTypeHeader = headers['content-type']
    if (!contentTypeHeader) return false
    return contentTypeHeader.match(/^.*json.*$/i)
  }

  static _isEmpty (objectToTest) {
    return Object.keys(objectToTest).length === 0 && objectToTest.constructor === Object
  }
}

module.exports = Proxy
