const HttpStatus = require('http-status-codes')
const termsAndConditionsService = require('./service')
module.exports = function (req, res, next) {
  termsAndConditionsService
    .accept({
      policies: req.body.policies,
      additionalHeaders: req.headers,
    })
    .then((results) => {
      res.status(HttpStatus.OK).json(results.value)
    })
    .catch((err) => next(err.value))
}
