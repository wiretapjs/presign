const request = require('request')
const HttpStatus = require('http-status-codes')
const _ = require('lodash')
const Url = require('url-parse')
const RemoteServiceError = require('models/errors/remoteService')
const config = require('../config')

const DEFAULT_REQUEST_OPTIONS = {
  json: true,
  proxy: config.proxy,
}

const isErrorResponse = function (err, response) {
  return err || response.statusCode >= HttpStatus.BAD_REQUEST || _.get(response, 'body.error')
}

const formatRequest = function (options) {
  const requestConfig = Object.assign({}, DEFAULT_REQUEST_OPTIONS, options)
  requestConfig.headers.host = getRequestHost(requestConfig.url)

  return requestConfig
}

const invoke = function (requestConfig) {
  requestConfig = formatRequest(requestConfig)
  return new Promise((resolve, reject) => {
    request(requestConfig, (err, response) => {
      if (isErrorResponse(err, response)) {
        return reject(new RemoteServiceError(`Failed to get ${requestConfig.url}`, {
          response,
          internalError: err,
          headers: _.get(response, 'headers'),
        }))
      }
      return resolve(response)
    })
  })
}

const get = function (requestConfig) {
  requestConfig.method = 'GET'
  return invoke(requestConfig)
}

const getRequestHost = function (requestUrl) {
  return new Url(requestUrl).host
}

module.exports = { get, invoke }
