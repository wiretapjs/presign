const ResultEnvelope = require('models/resultEnvelope')
const InvalidRequestError = require('models/errors/invalidRequest')

const handleInvalidRequest = function (validationResponse) {
  return Promise.reject(ResultEnvelope.Error(
    new InvalidRequestError(
      `Validation Errors occured when validating your request.`,
      {
        validationErrors: validationResponse.errors,
      })))
}

module.exports = handleInvalidRequest
