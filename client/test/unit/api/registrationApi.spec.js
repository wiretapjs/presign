import registrationApi from 'api/registrationApi'
import fetchApi from 'lib/services/fetch/fetchApi'
import QueryString from 'query-string'
import config from 'app/config'
import { asyncFunctionReject } from 'test/helpers/dummy-functions'
import _ from 'lodash'
import * as fetch from 'jest-fetch-mock'
global.fetch = fetch.default

const fakeResponse = {
  responseCode: '5010',
  numberOfAttempts: 1,
}

const analyticsIdentifyUser = jest.fn()

const requestObject = {
  registrationKey: '84205b0784109a3569eaaf62de8f90ea046ddee5',
  userName: 'cfip_qatest@libertymutual.com',
  password: 'password1',
  emailAddress: 'cfip_qatest@libertymutual.com',
  dateOfBirth: '990-03-11',
}

const registrationInfo = {
  emailAddress: 'cfip_qatest@libertymutual.com',
  namedInsuredMissingSSN: false,
  policyNumber: 'H4721203782175',
  registrationKeyActive: true,
  registrationKeyPresent: true,
  userAlreadyRegistered: false,
}

const userInfoObject = {
  isValidToken: false,
  registrationInfo,
}

const getFetchApiUrlArgument = function () {
  return fetchApi.request.mock.calls[0][0]
}

const getFetchApiConfigArgument = function () {
  return fetchApi.request.mock.calls[0][1]
}

config.visitor = {
  regToken: 'test',
}

Object.defineProperty(window.location, 'search', {
  value: QueryString.stringify({src: 'eservice_automaticregistration_createaccount'}),
  writable: true,
})

describe('registration API', () => {
  beforeEach(() => {
    fetchApi.request = jest.fn(() => {
      return fakeResponse
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    registrationApi.requestUserInfo = null
  })

  describe('Submit Registration', () => {
    it('should call /api/registration/v1/registerUserUsingRegToken', async () => {
      await registrationApi.submitRegistration(requestObject)
      expect(getFetchApiUrlArgument())
        .toBe('/api/registration/v1/registerUserUsingRegToken')
    })

    it('should use RA if the src code contains "eservice_automaticregistration_createaccount"', async () => {
      await registrationApi.submitRegistration(requestObject)
      expect(getFetchApiConfigArgument().body.autoRegReporting)
        .toBe('RA')
    })

    it('should use EA if the src code does not contain "eservice_automaticregistration_createaccount"', async () => {
      window.location.search = QueryString.stringify({src: 'test'})
      await registrationApi.submitRegistration(requestObject)
      expect(getFetchApiConfigArgument().body.autoRegReporting)
        .toBe('EA')
    })

    it('should use EA if src code does not exist', async () => {
      window.location.search = ''
      await registrationApi.submitRegistration(requestObject)
      expect(getFetchApiConfigArgument().body.autoRegReporting)
        .toBe('EA')
    })

    it('should return the response', async () => {
      const response = await registrationApi.submitRegistration(requestObject)
      expect(response).toEqual(fakeResponse)
    })

    it('should reject if the fetch API fails to load', async () => {
      fetchApi.request = asyncFunctionReject
      await expect(registrationApi.submitRegistration(requestObject)).rejects.toBeInstanceOf(Error)
    })

    it('should reject if no response is given', async () => {
      fetchApi.request = jest.fn(() => {
        return undefined
      })
      await expect(registrationApi.submitRegistration(requestObject)).rejects.toBeInstanceOf(Error)
    })
  })

  describe('getUserInfo', () => {
    const mockRequest = function (response = userInfoObject) {
      fetchApi.request = jest.fn(() => {
        return userInfoObject
      })
    }
    beforeEach(() => {
      mockRequest()
    })
    it('should call the get registration information api using the user\'s registration token', async () => {
      await registrationApi.getUserInfo()
      expect(getFetchApiUrlArgument())
        .toBe(`/api/registration/v1/registeredUser/${config.visitor.regToken}`)
    })
    it('should cache the user Info to prevent duplicate calls', async () => {
      expect.assertions(2)
      const response = await registrationApi.getUserInfo()
      const cachedResponse = await registrationApi.getUserInfo()
      expect(fetchApi.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(cachedResponse)
    })
    it('should call analytics service get identifyUser if available', async () => {
      expect.assertions(1)
      await registrationApi.getUserInfo(analyticsIdentifyUser)
      expect(analyticsIdentifyUser).toHaveBeenCalledTimes(1)
    })
    it('should not call analytics if there is no email address in the response', async () => {
      expect.assertions(1)
      const userInfoObjectClone = _.cloneDeep(userInfoObject)
      const registrationInfo = userInfoObjectClone.registrationInfo
      registrationInfo.emailAddress = null
      fetchApi.request = jest.fn(() => {
        return userInfoObjectClone
      })
      await registrationApi.getUserInfo(analyticsIdentifyUser)
      expect(analyticsIdentifyUser).toHaveBeenCalledTimes(0)
    })
    it('should pass an object with email address and policyNumber as arguments', async () => {
      expect.assertions(1)
      await registrationApi.getUserInfo(analyticsIdentifyUser)
      const { emailAddress, policyNumber } = registrationInfo
      expect(analyticsIdentifyUser)
        .toHaveBeenCalledWith({emailAddress, policyNumber})
    })
    it('should catch an error if the fetch API fails to load', async () => {
      expect.assertions(1)
      fetchApi.request = jest.fn(asyncFunctionReject)
      await expect(registrationApi.getUserInfo()).rejects.toBeInstanceOf(Error)
    })
  })
})
