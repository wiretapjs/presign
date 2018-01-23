import fetchApi from 'lib/services/fetch/fetchApi'
import QueryParams from 'lib/util/QueryParams'

class CeremoniesService {
  get resource () {
    return '/api/ceremonies/v1'
  }

  getStatuses () {
    return fetchApi.request(`${this.resource}/statuses`)
  }

  /**
   * Gets the ceremonies for a set of policies
   * @param  {[String]} config.policyNumbers an array of policy numbers to find ceremonies for.
   * @return {Promise}  resolves with a list of policies
   */
  getCeremonies (options) {
    options = options || {}
    if (!options.policyNumbers || options.policyNumbers.length === 0) {
      return Promise.reject(new Error('You must pass at least one policy to get ceremonies'))
    }
    const params = new QueryParams()
    params.append('policyNumbers', options.policyNumbers)
    params.append('statuses', options.statuses)
    return fetchApi.request(`${this.resource}?${params.toString()}`)
  }
}

export default new CeremoniesService()
