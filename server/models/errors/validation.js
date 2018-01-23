const ExtendableError = require('es6-error')
module.exports = class RemoteServiceException extends ExtendableError {
  constructor (message = 'Remote Service Call Failed', key) {
    super(message)
    this.key = key
  }
}
