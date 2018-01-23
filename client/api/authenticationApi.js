import fetchApi from 'lib/services/fetch/fetchApi'

class AuthenticationApi {
  async loginUser (username, password) {
    const config = { body: { username, password } }
    return fetchApi.request('/api/authentication/v1/login', config)
  }
}
export default new AuthenticationApi()
