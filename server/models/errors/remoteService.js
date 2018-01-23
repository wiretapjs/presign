const ExtendableError = require('es6-error')
const _ = require('lodash')
module.exports = class RemoteServiceException extends ExtendableError {
  constructor (message = 'Remote Service Call Failed', options) {
    super(message)
    options = options || {}
    this.remoteResponse = options.reponse
    this.remoteStatusCode = _.get(options, 'response.statusCode')
    this.remoteResponseBody = _.get(options, 'response.body')
    this.remoteResponseHeaders = _.get(options, 'response.headers')
    this.internalError = options.internalError
  }
}
