const ExtendableError = require('es6-error')
module.exports = class InvalidRequest extends ExtendableError {
  constructor (message = 'Invalid Request', options) {
    super(message)
    options = options || {}
    this.validationErrors = options.validationErrors
  }
}
