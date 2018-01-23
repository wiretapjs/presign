const HttpStatus = require('http-status-codes')
const SessionListServiceV1 = require('api/esign/v1/sessions/list')

module.exports = function (req, res, next) {
  return SessionListServiceV1.fetch({
    additionalHeaders: req.headers,
  })
    .then(results => {
      res.status(HttpStatus.OK).json(results.value)
    })
    .catch(err => next(err))
}
