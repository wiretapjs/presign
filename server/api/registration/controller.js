
const request = require('request')
const HttpStatus = require('http-status-codes')
const RegistrationModel = require('../../models/registration')
const RegistrationResponseModel = require('../../models/registrationresponse')
const logger = require('../../lib/logger')
const config = require('../../config')

class RegistrationController {
  constructor () {
    this.getRegisteredUser = this.getRegisteredUser.bind(this)
    this.registerUserUsingRegToken = this.registerUserUsingRegToken.bind(this)
  }

  _getIsRegisteredUserResource (regToken) {
    return `${config.services.eServiceLegacy.url}/PmInternetAccountServiceWeb/jaxrslm/service/user/${regToken}/registration`
  }

  get registerUserResource () {
    return `${config.services.eServiceLegacy.url}/PmInternetAccountServiceWeb/jaxrslm/service/registerNewUserViaRegistrationKey`
  }

  _formatIsRegisteredUserRequest (request) {
    const regToken = request.params.regToken
    const requestConfig = {
      url: this._getIsRegisteredUserResource(regToken),
      json: true,
    }
    return requestConfig
  }

  _formatregisterUserUsingRegTokenRequest (request, userRegistrationInfo) {
    const requestConfig = {
      url: this.registerUserResource,
      json: true,
      body: userRegistrationInfo,
    }
    return requestConfig
  }

  getRegisteredUser (req, res, next) {
    const requestConfig = this._formatIsRegisteredUserRequest(req)
    request.get(requestConfig, (err, requestResponse) => {
      if (err) {
        return next(err)
      }

      if (typeof requestResponse.body === 'string') {
        return res.status(HttpStatus.OK).json(new RegistrationModel(false, {}))
      }
      return res.status(HttpStatus.OK).json(new RegistrationModel(true, requestResponse.body))
    })
  }

  registerUserUsingRegToken (req, res, next) {
    const userRegistrationInfo = req.body
    const requestConfig = this._formatregisterUserUsingRegTokenRequest(req, userRegistrationInfo)
    request.post(requestConfig, (err, requestResponse) => {
      if (err) {
        return next(err)
      }

      if (typeof requestResponse.body === 'string') {
        return res.status(HttpStatus.BAD_REQUEST).end()
      }
      const registrationResponseModel = new RegistrationResponseModel(requestResponse.body)
      const messageToLogger = Object.assign(
        registrationResponseModel, {url: this.registerUserResource})
      logger.sendMessage({text: messageToLogger})
      return res.status(HttpStatus.OK).json(registrationResponseModel)
    })
  }
}

module.exports = new RegistrationController()
