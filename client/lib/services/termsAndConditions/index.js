import FetchApi from 'lib/services/fetch/fetchApi.js'

class TermsAndCondtionsService {
  get resource () {
    return '/api/esign/v1/terms-and-conditions/accept'
  }

  acceptTerms (policies) {
    if (!policies) {
      throw new Error('Expected a policies')
    }
    const body = {policies}
    return FetchApi.request(`${this.resource}`, {body})
  }
}

export default new TermsAndCondtionsService()
