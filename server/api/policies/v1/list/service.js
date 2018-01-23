const _ = require('lodash')
const requestValidator = require('api/policies/v1/list/requestValidator')
const responseFormatter = require('api/policies/v1/list/responseFormatter')
const ResultEnvelope = require('models/resultEnvelope')
const invalidRequestHandler = require('lib/invalid-request-handler')
const bpmService = require('lib/bpm-service')
const config = require('../../../../config')

const DEFAULT_FETCH_OPTIONS = {
  filters: {},
  additionalHeaders: {},
}

const DEFAULT_OPTIONS = {
  invalidRequestHandler,
  remoteHost: config.services.eServiceLegacy.url,
}

/**
 * Fetches a list of policies for the current user
 */
class PolicyListService {
  constructor (options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options)
    this._invalidRequestHandler = options.invalidRequestHandler
    this._requestValidator = options.requestValidator || requestValidator
    this._responseFormatter = options.responseFormatter || responseFormatter
    this._remoteHost = options.remoteHost
  }

  get resource () {
    return `${this._remoteHost}/PmInternetPolicyServiceWeb/insurance/user/policies`
  }

  /**
   * Fetches a list of policies from the remote service
   * @param  {Object} options.filters a hash of filters to apply to the incoming response
   * @param  {[string]} options.filters.linesOfBuisness line of business to filter on
   * @param  {string} options.ratingMethod a rating method filter to apply to the incoming response.
   * @param  {Object} options.additionalHeaders a hash of headers to pass along to the service call
   * @return {Promise<ResultEnvelop>} returns a result envelope with
   */
  fetch (options) {
    options = Object.assign({}, DEFAULT_FETCH_OPTIONS, options)
    const {
      filters,
      additionalHeaders,
    } = options

    if (filters.linesOfBusiness) {
      filters.linesOfBusiness = this._formatlinesOfBusiness(filters.linesOfBusiness)
    }

    const validationResponse = this._requestValidator.validate(options)

    if (!validationResponse.isValid) {
      return this._invalidRequestHandler(validationResponse)
    }
    return bpmService.get(this._formatListRequest(additionalHeaders))
      .then(response => this._handleRemoteServiceReponse(filters, response))
      .catch(err => this._handleRemoteServiceError(err))
  }

  _handleRemoteServiceReponse (filters, response) {
    const result = _.get(response, 'body.policyList')
    const responseHeaders = response.headers
    const formatedPolicies = this._responseFormatter.format(filters, result)
    return ResultEnvelope.Success({
      policies: formatedPolicies || [],
    }, { responseHeaders })
  }

  _handleRemoteServiceError (error) {
    throw ResultEnvelope.Error(error)
  }

  _formatlinesOfBusiness (linesOfBusiness) {
    if (Array.isArray(linesOfBusiness)) return linesOfBusiness
    return [linesOfBusiness]
  }

  _formatListRequest (headers) {
    const requestConfig = {
      url: this.resource,
      headers: headers,
    }
    return requestConfig
  }
}

module.exports = PolicyListService
