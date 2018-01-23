/**
 * Result envelope used to return information about a request
 * to the caller
 * @type {[type]}
 */
class ResultEnvelope {
  /**
   * Creates a new instance of the class
   * @param  {ResultEnvelope.Status} options.status a status for the requested operation
   * @param  {Object} options.value the result value of the operation, may be an error.
   * @param  {Object} options.additionalResponseHeaders additional headers that should
   * be passed back to the client, or forwarded with the next request.
   * @return {[type]}         [description]
   */
  constructor (options) {
    this.status = options.status
    this.value = options.value
    this.responseHeaders = options.responseHeaders
  }
}

/**
 * Used to help http controllers determin proper status codes
 * @type {ResultStatus}
 */
const Statuses = module.exports.Statuses = {
  Success: 'Success',
  Error: 'Error',
}

// Define shorthand methods on the class for creating result envelopes
// With a specific status
// In practice your can use ResultEnvelop.Success(myVal, additionOptions)
// to create a new instance of the class with the sucess status
Object.keys(Statuses).forEach((status) => {
  ResultEnvelope[status] = (value, options) => {
    options = options || {}
    options.status = status
    options.value = value
    return new ResultEnvelope(options)
  }
})

module.exports = ResultEnvelope
