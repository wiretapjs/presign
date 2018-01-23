const HttpStatus = require('http-status-codes')
const _ = require('lodash')
const v1ListService = require('api/policies/v1/list')
const v1SummaryService = require('api/policies/v1/summary')
const setResponseHeaders = require('lib/set-response-headers')

class PoliciesController {
  getPolicySummary (req, res, next) {
    v1SummaryService.fetch({
      policyNumber: req.params.policyNumber,
      additionalHeaders: req.headers,
    })
      .then((result) => {
        setResponseHeaders(res, _.get(result, 'responseHeaders'))
        return res.status(HttpStatus.OK).json(result.value)
      })
      .catch((err) => {
        setResponseHeaders(res, _.get(err, 'responseHeaders'))
        return next(err.value)
      })
  }

  listPolicies (req, res, next) {
    v1ListService.fetch({
      filters: req.query,
      additionalHeaders: req.headers,
    })
      .then((result) => {
        setResponseHeaders(res, _.get(result, 'responseHeaders'))
        return res.status(HttpStatus.OK).json(result.value)
      })
      .catch((err) => {
        setResponseHeaders(res, _.get(err, 'responseHeaders'))
        return next(err.value)
      })
  }
}

module.exports = new PoliciesController()
