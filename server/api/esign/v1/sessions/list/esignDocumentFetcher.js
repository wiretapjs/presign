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
class EsignDocumentFetcher {
  get host () {
    if (!this._remoteUrl) {
      this._remoteUrl = new Url(config.services.eServiceLegacy.url)
    }
    return this._remoteUrl.host
  }

  fetch (options) {
    return this._getEsignSessions(options)
  }

  _getEsignSessions (options) {
    return this._invokeEsignService(this._formatEsignRequest(options))
  }

  getEsignResourceForPolicy (policyNumber) {
    return `${config.services.eServiceLegacy.url}/PmInternetPolicyServiceWeb/jaxrs/policy/${policyNumber}/esign`
  }

  _formatEsignRequest (options) {
    const requestConfig = {
      url: this.getEsignResourceForPolicy(options.ceremony.policyNumber),
      headers: options.additionalHeaders,
      proxy: config.proxy,
      json: true,
      body: {
        publishingTransactionId: options.ceremony.publishingTransactionId,
        ceremonyStatus: options.ceremony.ceremonyStatus,
        returnESignSessionURL: 'all',
      },
    }
    requestConfig.headers.host = this.host
    return requestConfig
  }

  _invokeEsignService (formattedRequest) {
    return new Promise((resolve, reject) => {
      return request.post(formattedRequest, (err, result) => {
        if (err || result.statusCode >= HttpStatus.BAD_REQUEST) {
          return reject(new RemoteServiceError(`Error fetching resource:${formattedRequest.url}`, {
            internalError: err,
            response: result,
          }))
        }
        return resolve({
          value: result.body,
          responseHeaders: _.get(result, 'headers'),
        })
      })
    })
  }
}

module.exports = new EsignDocumentFetcher()
