const Policy = require('models/policy')
const ValidationError = require('models/errors/validation')

class PolicyListServiceRequestValidator {
  /**
   * Validates the options passed by the user for use in the PolicyListService
   * @param  {Object} options.filters a hash of filtering values
   * @param  {[string]} options.filters.linesOfBuisness - an array of LinesOfBuisness to validate
   * @param  {string} options.filters.ratingMethod - a RatingMethods to validate
   * @return {ValidationResponse} an object representing a state
   */
  validate (options) {
    const validationResponse = this._validateFilters(options.filters, { isValid: true, errors: [] })

    return validationResponse
  }

  _validateRatingMethod (ratingMethod) {
    return Policy.RatingMethods[ratingMethod.toUpperCase()]
  }

  _validateLineOfBuisiness (linesOfBusiness) {
    return Policy.LinesOfBusiness[linesOfBusiness.toUpperCase()]
  }

  _validateFilters (filters, validationResponse) {
    if (filters.linesOfBusiness) {
      for (const [index, value] of filters.linesOfBusiness.entries()) {
        if (!this._validateLineOfBuisiness(value)) {
          validationResponse.isValid = false
          validationResponse.errors
            .push(new ValidationError(`Invalid Line of Business: ${value}`, `linesOfBusiness[${index}]`))
        }
      }
    }

    if (filters.ratingMethod) {
      if (!this._validateRatingMethod(filters.ratingMethod)) {
        validationResponse.isValid = false
        validationResponse.errors
          .push(new ValidationError(`Invalid ratingMethod: ${filters.ratingMethod}`, 'ratingMethod'))
      }
    }
    return validationResponse
  }
}

module.exports = new PolicyListServiceRequestValidator()
