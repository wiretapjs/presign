const request = require('request')
const _ = require('lodash')
const Url = require('url-parse')
const HttpStatus = require('http-status-codes')
const RemoteServiceError = require('models/errors/remoteService')
const config = require('../../../../../config')

/**
 * This class is a helper to get a list of ceremonies
 * in a future state this will be replaced by the v1CeremoniesListService
 */
class CeremoniesFetcher {
  get resource () {
    return `${config.services.eServiceLegacy.url}/PmInternetPolicyServiceWeb/jaxrs/policy/ceremonies`
  }

  get host () {
    if (!this._remoteUrl) {
      this._remoteUrl = new Url(config.services.eServiceLegacy.url)
    }
    return this._remoteUrl.host
  }

  fetch (options) {
    return this._getCeremonies(options)
  }

  _getCeremonies (options) {
    const formattedRequest = this._formatCeremoniesRequest(options)
    return this._invokeCeremoniesService(formattedRequest)
  }

  _formatCeremoniesRequest (options) {
    const requestConfig = {
      url: this.resource,
      headers: options.additionalHeaders,
      proxy: config.proxy,
      json: true,
      body: {
        policyNumber: options.policyNumbers,
      },
    }
    requestConfig.headers.host = this.host
    return requestConfig
  }

  _invokeCeremoniesService (requestConfig) {
    return new Promise((resolve, reject) => {
      request.post(requestConfig, (err, result) => {
        if (err || result.statusCode >= HttpStatus.BAD_REQUEST) {
          return reject(
            new RemoteServiceError(`Error fetching resource:${this.$resource}`, {
              internalError: err,
              response: result,
            }))
        }
        return resolve({
          value: _.get(result, 'body.ceremonies', []),
          responseHeaders: _.get(result, 'headers'),
        })
      })
    })
  }
}

module.exports = new CeremoniesFetcher()
