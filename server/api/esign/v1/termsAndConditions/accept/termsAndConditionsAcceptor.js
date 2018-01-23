const request = require('request')
const _ = require('lodash')
const Url = require('url-parse')
const HttpStatus = require('http-status-codes')
const RemoteServiceError = require('models/errors/remoteService')
const ValidationError = require('models/errors/validation')
const config = require('../../../../../config')
const EventCodes = {
  PSM_ACKNOWLEDGED: '01',
  TERMS_ACCEPTED: '02',
}

const ESERVICE_URL = config.services.eServiceLegacy.url
/**
 * This class is a helper to accept the esign terms and conditions for a given policy number
 */
class TermsAndConditionsAcceptor {
  get EventCodes () {
    return EventCodes
  }

  getResourceForPolicy (policyNumber) {
    return `${ESERVICE_URL}/PmInternetPolicyServiceWeb/jaxrs/policy/${policyNumber}/esignEvent`
  }

  get host () {
    if (!this._remoteUrl) {
      this._remoteUrl = new Url(config.services.eServiceLegacy.url)
    }
    return this._remoteUrl.host
  }

  accept (options) {
    options = options || {}
    const errors = this._validate(options)
    if (errors.length > 0) {
      return Promise.reject(new ValidationError(errors.join('\r\n')))
    }
    return this._acceptTermsAndConditions(options)
  }

  _validate (options) {
    const errors = []
    if (!_.get(options, 'policy.policyNumber')) {
      errors.push('Missing required option: policyNumber')
    }

    if (!_.get(options, 'policy.packageId')) {
      errors.push('Missing required option: packageId')
    }
    return errors
  }

  _acceptTermsAndConditions (options) {
    const formattedRequest = this._formatRequest(options)
    return this._invokeService(formattedRequest)
  }

  _formatRequest (options) {
    const requestConfig = {
      url: this.getResourceForPolicy(options.policy.policyNumber),
      headers: {
        cookie: options.additionalHeaders.cookie,
      },
      proxy: config.proxy,
      json: true,
      body: {
        packageId: options.policy.packageId,
        eventTypeCode: EventCodes.TERMS_ACCEPTED,
      },
    }
    requestConfig.headers.host = this.host
    return requestConfig
  }

  _invokeService (requestConfig) {
    return new Promise((resolve, reject) => {
      request.post(requestConfig, (err, result) => {
        if (err || result.statusCode >= HttpStatus.BAD_REQUEST) {
          return reject(
            new RemoteServiceError(`Error fetching resource:${requestConfig.url}`, {
              internalError: err,
              response: result,
            }))
        }
        return resolve({
          value: _.get(result, 'body'),
          responseHeaders: _.get(result, 'headers'),
        })
      })
    })
  }
}

module.exports = new TermsAndConditionsAcceptor()
