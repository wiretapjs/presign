import URLSearchParams from 'url-search-params'
import FetchApi from 'lib/services/fetch/fetchApi.js'

class PoliciesService {
  constructor () {
    this._summaries = {}
  }

  get resource () {
    return '/api/policies/v1'
  }

  getSummaryResource (policyNumber) {
    return `${this.resource}/${policyNumber}/summary`
  }

  /**
   * Gets a of policies for the current user
   * @param  {[String]} options.linesOfBusiness an array of buisnesses to filter on.
   * @param  {String} options.ratingMethod a rating method to filter on.
   * @return {Promise}  resolves with a list of policies
   */
  async getPolicies (options) {
    options = options || {}
    const params = new URLSearchParams()
    let url = `${this.resource}`
    if (options.linesOfBusiness) {
      params.append('linesOfBusiness', options.linesOfBusiness)
    }

    if (options.ratingMethod) {
      params.append('ratingMethod', options.ratingMethod)
    }
    const paramString = params.toString()
    if (paramString) {
      url = `${url}?${paramString}`
    }
    return FetchApi.request(url)
  }

  clearSummaryCache () {
    this._summaries = {}
  }

  async getCachedSummary (policyNumber) {
    if (!this._summaries[policyNumber]) {
      this._summaries[policyNumber] = await this.getUpdatedSummary(policyNumber)
    }

    return this._summaries[policyNumber]
  }

  async getUpdatedSummary (policyNumber) {
    const url = `${this.getSummaryResource(policyNumber)}`
    const policySummary = await FetchApi.request(url)
    this._summaries[policyNumber] = policySummary
    return policySummary
  }
}

export default new PoliciesService()
