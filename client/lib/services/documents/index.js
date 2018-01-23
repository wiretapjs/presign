import fetchApi from 'lib/services/fetch/fetchApi'
import QueryParams from 'lib/util/QueryParams'

class DocumentsService {
  get resource () {
    return '/api/documents/v1'
  }

  async getEsignCount (options) {
    options = options || {}
    if (!options.transactionIds) throw new Error('One or more transaction IDs are required')

    const params = new QueryParams()
    params.append('transactionId', options.transactionIds)
    return fetchApi.request(`${this.resource}/esign/count?${params.toString()}`)
  }
}

export default new DocumentsService()
