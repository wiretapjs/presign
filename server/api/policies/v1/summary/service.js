const _ = require('lodash')
const ResultEnvelope = require('models/resultEnvelope')
const bpmService = require('lib/bpm-service')
const invalidRequestHandler = require('lib/invalid-request-handler')
const config = require('../../../../config')

const DEFAULT_FETCH_OPTIONS = {
  additionalHeaders: {},
}

const DEFAULT_OPTIONS = {
  invalidRequestHandler,
  remoteHost: config.services.eServiceLegacy.url,
}

class PolicySummaryService {
  constructor (options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options)
    this._invalidRequestHandler = options.invalidRequestHandler
    this._remoteHost = options.remoteHost
  }

  getResource (policyNumber) {
    return `${this._remoteHost}/PmInternetPolicyServiceWeb/jaxrs/policy/${policyNumber}/summary`
  }

  fetch (options) {
    options = Object.assign({}, DEFAULT_FETCH_OPTIONS, options)
    const { policyNumber, additionalHeaders } = options

    if (!policyNumber) return this._invalidRequestHandler({ errors: ['Policy number is required'] })

    return bpmService.get(this._formatRequest(policyNumber, additionalHeaders))
      .then(response => this._handleRemoteServiceReponse(response))
      .catch(err => this._handleRemoteServiceError(err))
  }

  _formatRequest (policyNumber, headers) {
    return {
      url: this.getResource(policyNumber),
      headers: headers,
    }
  }

  _handleRemoteServiceReponse (response) {
    const result = _.get(response, 'body', {})
    const responseHeaders = response.headers

    result.policyNumber = this._trimPolicyNumber(result.policyNumber)

    return ResultEnvelope.Success(result, { responseHeaders })
  }

  _handleRemoteServiceError (error) {
    throw ResultEnvelope.Error(error)
  }

  _trimPolicyNumber (policyNumber) {
    if (!policyNumber) return policyNumber
    return policyNumber.trim()
  }
}

module.exports = PolicySummaryService
