const termsAndConditionsAcceptor = require('./termsAndConditionsAcceptor')

class EsignTermsAndConditionsServiceV1 {
  accept (options) {
    options = options || {}
    if (!Array.isArray(options.policies)) {
      return Promise.reject(new Error('Policies should be an array'))
    }
    return Promise.all(options.policies.map(policy => termsAndConditionsAcceptor.accept({
      policy,
      additionalHeaders: options.additionalHeaders,
    })))
  }
}

module.exports = new EsignTermsAndConditionsServiceV1()
