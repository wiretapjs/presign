import fetchApi from 'lib/services/fetch/fetchApi'
import config from 'app/config'
import QueryString from 'query-string'

class RegistrationApi {
  constructor () {
    this.requestUserInfo = null
  }

  async submitRegistration (requestObject) {
    const defaultRequestObj = {
      registrationKey: config.visitor.regToken,
      autoRegReporting: this.getRegistrationOriginCode(),
    }
    Object.assign(defaultRequestObj, requestObject)
    const response = await fetchApi.request('/api/registration/v1/registerUserUsingRegToken', {body: defaultRequestObj})

    if (response) return response

    throw new Error('Registration response was not received')
  }

  getRegistrationOriginCode () {
    return this._isRepAssistedReg ? 'RA' : 'EA'
  }

  get _isRepAssistedReg () {
    const parsedParams = QueryString.parse(window.location.search)
    return parsedParams.src && parsedParams.src.includes('eservice_automaticregistration_createaccount')
  }

  async getUserInfo (analyticsIdentifyUser) {
    if (this.requestUserInfo) return this.requestUserInfo
    const response = await fetchApi.request(`/api/registration/v1/registeredUser/${config.visitor.regToken}`)
    this.requestUserInfo = response
    const { emailAddress, policyNumber } = this.requestUserInfo.registrationInfo
    if (typeof analyticsIdentifyUser === 'function' && emailAddress && policyNumber) {
      analyticsIdentifyUser({emailAddress, policyNumber})
    }
    return response
  }
}
export default new RegistrationApi()
