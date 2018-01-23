const ceremoniesFetcher = require('api/esign/v1/sessions/list/ceremoniesFetcher')
const esignDocumentFetcher = require('api/esign/v1/sessions/list/esignDocumentFetcher')
const policiesListService = require('api/policies/v1/list')
const _ = require('lodash')

class EsignSessionsListServiceV1 {
  fetch (options) {
    return this._getSessions(options)
  }

  _getSessions (options) {
    return this._getPolicies(options)
      .then((policyResults) => {
        const policyNumbers = this._getPolicyNumbers(policyResults)
        return this._getCeremonies(policyNumbers, options.additionalHeaders)
      })
      .then((ceremonyResults) => {
        return Promise.all(ceremonyResults.value.map(ceremony => {
          return this._createSessionPromise(ceremony, options.additionalHeaders)
        }))
          .then((results) => {
            return {
              value: results.map(result => result.value),
            }
          })
      })
  }

  _createSessionPromise (ceremony, additionalHeaders) {
    return this._getSession(ceremony, additionalHeaders)
      .then((sessionResults) => this._handleEsignResults(sessionResults, ceremony))
  }

  _getPolicyNumbers (results) {
    return results.value.policies.map(policy => policy.policyNumber)
  }

  _handleEsignResults (results, ceremony) {
    results.value.policyNumber = ceremony.policyNumber
    results.value.ceremonyStatus = ceremony.ceremonyStatus
    results.value.signerCount = _.get(ceremony, 'signerStatus.length', 0)
    return Promise.resolve(results)
  }

  _getPolicies (options) {
    return policiesListService.fetch(options)
  }

  _getCeremonies (policyNumbers, additionalHeaders) {
    return ceremoniesFetcher.fetch({policyNumbers, additionalHeaders})
  }

  _getSession (ceremony, additionalHeaders) {
    return esignDocumentFetcher.fetch({ceremony, additionalHeaders})
  }
}

module.exports = new EsignSessionsListServiceV1()
