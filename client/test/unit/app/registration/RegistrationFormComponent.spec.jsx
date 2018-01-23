import React from 'react'
import { shallow } from 'enzyme'
import config from 'app/config'
import RegistrationFormComponent from 'app/registration/RegistrationFormComponent'
import registrationApi from 'api/registrationApi'
import authenticationApi from 'api/authenticationApi'
import * as registrationAnalytics from 'app/registration/analytics'
import { context } from 'test/helpers/jest'
import getESignLoadingTrafficSplitConfig from 'app/experiments/eSignLoadingTrafficSplit/config'
import ESignLoadingTrafficSplitService from 'app/experiments/eSignLoadingTrafficSplit'
import redirect from 'lib/util/redirect'
jest.mock('app/experiments/eSignLoadingTrafficSplit')

redirect.eserviceEsignRegister = jest.fn()
redirect.eserviceEsign = jest.fn()
redirect.eserviceEsignLogin = jest.fn()

const requestObject = {
  registrationKey: '84205b0784109a3569eaaf62de8f90ea046ddee5',
  userName: 'cfip_qatest@libertymutual.com',
  password: 'password1',
  emailAddress: 'cfip_qatest@libertymutual.com',
  dateOfBirth: '1990-03-11',
}

const history = {
  push: jest.fn(),
}

registrationAnalytics.recordRegistrationComplete = jest.fn()
registrationAnalytics.recordRegistrationSubmit = jest.fn()
registrationAnalytics.recordRegistrationScreen = jest.fn()
registrationAnalytics.recordAutomaticLoginComplete = jest.fn()

config.visitor = {
  regToken: 'test',
}
config.libertySubDomainMapping = {
  dev: 'service',
  test: 'service',
  uat: 'service',
  perf: 'service',
  ete: 'eservice',
  prod: 'eservice',
  '2pr': 'eservice',
}

describe('Registration', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Display form', () => {
    it('should record the registration screen for analytics', async () => {
      const registrationFormWrapper = shallow(<RegistrationFormComponent displaySSn emailAddress="blah@test.com" />)
      const registrationFormInstance = registrationFormWrapper.instance()
      await registrationFormInstance.componentDidMount()
      expect(registrationAnalytics.recordRegistrationScreen).toHaveBeenCalledTimes(1)
    })
  })

  describe('Submit button disabled', () => {
    it('should be disabled if isValid is false', async () => {
      const registrationFormWrapper = shallow(<RegistrationFormComponent displaySSn emailAddress="blah@test.com" />)
      const registrationFormInstance = registrationFormWrapper.instance()
      registrationFormInstance.setInvalid()
      expect(registrationFormInstance.isButtonDisabled).toBe(true)
    })
    it('should be disabled if submitting is true', async () => {
      const registrationFormWrapper = shallow(<RegistrationFormComponent displaySSn emailAddress="blah@test.com" />)
      const registrationFormInstance = registrationFormWrapper.instance()
      registrationFormInstance.setState({ isSubmitting: true })
      registrationFormInstance.setValid()
      expect(registrationFormInstance.isButtonDisabled).toBe(true)
    })
    it('should be enabled if submitting is false and is valid', async () => {
      const registrationFormWrapper = shallow(<RegistrationFormComponent displaySSn emailAddress="blah@test.com" />)
      const registrationFormInstance = registrationFormWrapper.instance()
      registrationFormInstance.setValid()
      expect(registrationFormInstance.isButtonDisabled).toBe(false)
    })
  })

  describe('Form', () => {
    it('should set valid state on call to setValid()', () => {
      const registrationFormWrapper = shallow(<RegistrationFormComponent />)
      const registrationFormInstance = registrationFormWrapper.instance()
      registrationFormInstance.setValid()
      expect(registrationFormInstance.state.isValid).toBe(true)
    })

    it('should set invalid state on call to setInvalid()', () => {
      const registrationFormWrapper = shallow(<RegistrationFormComponent />)
      const registrationFormInstance = registrationFormWrapper.instance()
      registrationFormInstance.setInvalid()
      expect(registrationFormInstance.state.isValid).toBe(false)
    })
  })

  describe('Form submission', () => {
    const validDataStub = jest.fn(() => Promise.resolve({responseCode: '5010'}))
    const unknownInvalidDataStub = jest.fn(() => Promise.resolve({responseCode: '5201'}))
    const invalidPasswordDataSub = jest.fn(() => Promise.resolve({responseCode: '5036'}))
    const alreadyRegistered = jest.fn(() => Promise.resolve({responseCode: '5040'}))
    const invalidDOB = jest.fn(() => Promise.resolve({responseCode: '5045'}))
    const unknownResponseStub = jest.fn(() => Promise.resolve({iDoNotRecognize: 'thisStructure'}))
    const loginUserResponseStub = jest.fn(() => Promise.resolve())
    const invalidDataCausesServerErrorDataSub = jest.fn(() => Promise.reject(new Error()))
    let registrationFormInstance

    const submitData = async (submitRegistrationStub) => {
      registrationApi.submitRegistration = submitRegistrationStub
      const registrationFormWrapper = shallow(<RegistrationFormComponent history={history} />)
      registrationFormInstance = registrationFormWrapper.instance()
      const parseFormSubmissionResponse = jest.spyOn(registrationFormInstance, 'parseFormSubmissionResponse')
      registrationFormInstance.forceUpdate()
      await registrationFormInstance.submitForm(requestObject)
      return { registrationFormInstance, parseFormSubmissionResponse }
    }

    const expectErrorCode = (registrationFormInstance, errorCode) => {
      expect(registrationFormInstance.state.errorCode).toEqual(errorCode)
    }

    context('with valid data', () => {
      it('disables while the registration is in progress', () => {
        submitData(validDataStub)
        expect(registrationFormInstance.state.isSubmitting).toBe(true)
      })

      it('records the registration submit analytics event while the registration is in progress', () => {
        submitData(validDataStub)
        expect(registrationAnalytics.recordRegistrationSubmit).toHaveBeenCalledTimes(1)
      })

      it('does not record the registration complete analytics event before registration completes', () => {
        submitData(validDataStub)
        expect(registrationAnalytics.recordRegistrationComplete).toHaveBeenCalledTimes(0)
      })

      it('does not re-enable after registration completes', async () => {
        await submitData(validDataStub)
        expect(registrationFormInstance.state.isSubmitting).toBe(true)
      })

      it('records the registration complete analytics events after registration completes', async () => {
        await submitData(validDataStub)
        expect(registrationAnalytics.recordRegistrationComplete).toHaveBeenCalledTimes(1)
      })

      it('records the analytics for automatic login', async () => {
        authenticationApi.loginUser = loginUserResponseStub
        await submitData(validDataStub)
        expect(registrationAnalytics.recordAutomaticLoginComplete).toHaveBeenCalledTimes(1)
      })

      it('redirects to eService eSign after registration completes on base traffic config', async () => {
        ESignLoadingTrafficSplitService.mockImplementation(() => {
          return { choice: getESignLoadingTrafficSplitConfig().base }
        })
        await submitData(validDataStub)
        expect(redirect.eserviceEsign).toHaveBeenCalledTimes(1)
      })

      it('redirects to our eSign loading page after registration completes on treatment A traffic config', async () => {
        Object.defineProperty(window.location, 'search', {
          value: 'a=b&c=d',
          writable: true,
        })
        ESignLoadingTrafficSplitService.mockImplementation(() => {
          return { choice: getESignLoadingTrafficSplitConfig().treatmentA }
        })
        await submitData(validDataStub)
        expect(history.push).toHaveBeenCalledWith({
          pathname: '/esign/loading',
          search: window.location.search,
        })
      })
    })

    context('with an unrecognized response', () => {
      it('disables while the registration is in progress', () => {
        submitData(unknownResponseStub)
        expect(registrationFormInstance.state.isSubmitting).toBe(true)
      })

      it('records the registration submit analytics event while the registration is in progress', () => {
        submitData(unknownResponseStub)
        expect(registrationAnalytics.recordRegistrationSubmit).toHaveBeenCalledTimes(1)
      })

      it('does not record the registration complete analytics event', async () => {
        await submitData(unknownResponseStub)
        expect(registrationAnalytics.recordRegistrationComplete).toHaveBeenCalledTimes(0)
      })

      it('stores the default error code in state', async () => {
        const responseObject = await submitData(unknownResponseStub)
        const errorCode = '5201'
        expectErrorCode(responseObject.registrationFormInstance, errorCode)
      })
    })

    context('with unknown invalid data', () => {
      it('disables while the registration is in progress', () => {
        submitData(unknownInvalidDataStub)
        expect(registrationFormInstance.state.isSubmitting).toBe(true)
      })

      it('records the registration submit analytics event while the registration is in progress', () => {
        submitData(unknownInvalidDataStub)
        expect(registrationAnalytics.recordRegistrationSubmit).toHaveBeenCalledTimes(1)
      })

      it('does not record the registration complete analytics event', async () => {
        await submitData(unknownInvalidDataStub)
        expect(registrationAnalytics.recordRegistrationComplete).toHaveBeenCalledTimes(0)
      })

      it('stores the default error code in state', async () => {
        const responseObject = await submitData(unknownInvalidDataStub)
        const errorCode = '5201'
        expectErrorCode(responseObject.registrationFormInstance, errorCode)
      })
    })

    context('with a failed response from the server', () => {
      it('disables while the registration is in progress', () => {
        submitData(invalidDataCausesServerErrorDataSub)
        expect(registrationFormInstance.state.isSubmitting).toBe(true)
      })

      it('records the registration submit analytics event while the registration is in progress', () => {
        submitData(invalidDataCausesServerErrorDataSub)
        expect(registrationAnalytics.recordRegistrationSubmit).toHaveBeenCalledTimes(1)
      })

      it('does not record the registration complete analytics event', async () => {
        await submitData(invalidDataCausesServerErrorDataSub)
        expect(registrationAnalytics.recordRegistrationComplete).toHaveBeenCalledTimes(0)
      })

      it('should redirect to eService eSignReg after receiving a response', async () => {
        await submitData(invalidDataCausesServerErrorDataSub)
        expect(redirect.eserviceEsignRegister)
          .toHaveBeenCalledTimes(1)
      })
    })

    context('with an invalid password', () => {
      it('disables while the registration is in progress', () => {
        submitData(invalidPasswordDataSub)
        expect(registrationFormInstance.state.isSubmitting).toBe(true)
      })

      it('records the registration submit analytics event while the registration is in progress', () => {
        submitData(invalidPasswordDataSub)
        expect(registrationAnalytics.recordRegistrationSubmit).toHaveBeenCalledTimes(1)
      })

      it('does not record the registration complete analytics event', async () => {
        await submitData(invalidPasswordDataSub)
        expect(registrationAnalytics.recordRegistrationComplete).toHaveBeenCalledTimes(0)
      })

      it('stores the proper error code in state', async () => {
        const responseObject = await submitData(invalidPasswordDataSub)
        const errorCode = '5036'
        expectErrorCode(responseObject.registrationFormInstance, errorCode)
      })
    })

    context('with an invalid DOB', () => {
      it('disables while the registration is in progress', () => {
        submitData(invalidDOB)
        expect(registrationFormInstance.state.isSubmitting).toBe(true)
      })

      it('records the registration submit analytics event while the registration is in progress', () => {
        submitData(invalidDOB)
        expect(registrationAnalytics.recordRegistrationSubmit).toHaveBeenCalledTimes(1)
      })

      it('does not record the registration complete analytics event', async () => {
        await submitData(invalidDOB)
        expect(registrationAnalytics.recordRegistrationComplete).toHaveBeenCalledTimes(0)
      })

      it('stores the proper error code in state', async () => {
        const responseObject = await submitData(invalidDOB)
        const errorCode = '5045'
        expectErrorCode(responseObject.registrationFormInstance, errorCode)
      })
    })

    context('with an account that has already been registered', () => {
      it('disables while the registration is in progress', () => {
        submitData(alreadyRegistered)
        expect(registrationFormInstance.state.isSubmitting).toBe(true)
      })

      it('records the registration submit analytics event while the registration is in progress', () => {
        submitData(alreadyRegistered)
        expect(registrationAnalytics.recordRegistrationSubmit).toHaveBeenCalledTimes(1)
      })

      it('does not record the registration complete analytics event', async () => {
        await submitData(alreadyRegistered)
        expect(registrationAnalytics.recordRegistrationComplete).toHaveBeenCalledTimes(0)
      })

      it('stores the proper error code in state', async () => {
        const responseObject = await submitData(alreadyRegistered)
        const errorCode = '5040'
        expectErrorCode(responseObject.registrationFormInstance, errorCode)
      })
    })
  })
})
