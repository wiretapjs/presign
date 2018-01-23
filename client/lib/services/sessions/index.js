import FetchApi from 'lib/services/fetch/fetchApi.js'

class SessionsService {
  get resource () {
    return '/api/esign/v1/sessions'
  }

  async getSessions (forceReload = false) {
    if (!this._sessions || forceReload) {
      this._sessions = await FetchApi.request(`${this.resource}`)
    }
    return this._sessions
  }

  async getCachedSessions () {
    return this.getSessions(false)
  }

  async getUpdatedSessions () {
    return this.getSessions(true)
  }

  clearCache () {
    this._sessions = null
  }
}

export default new SessionsService()
