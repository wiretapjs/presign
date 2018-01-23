import React from 'react'
import { mount } from 'enzyme'
import { context } from 'test/helpers/jest'
import createEnvironmentConfig from 'test/helpers/environments'
import { AlreadyRegisteredError, ErrorMessage } from 'app/registration/response-handling'
import { passwordErrorMessage } from 'app/registration/passwordInput/PasswordInput'
import responseCodes from 'app/registration/response-handling/responseCodes'
import redirect from 'lib/util/redirect'

redirect.eserviceEsignRegister = jest.fn()
createEnvironmentConfig()

const genericErrorMessage = "Oops something went wrong, let's try this again."

describe('Registration Error Message', () => {
  const getErrorMessage = function (code) {
    return mount(<ErrorMessage code={code} />)
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  context('with a generic error code', () => {
    let errorMessage

    beforeEach(() => {
      errorMessage = getErrorMessage(responseCodes.genericError.code)
    })

    it('renders the appropriate message', () => {
      expect(errorMessage.find('div').text()).toBe(genericErrorMessage)
    })

    it('redirects to the yellow box', () => {
      expect(redirect.eserviceEsignRegister).toHaveBeenCalledTimes(1)
    })
  })

  context('with an invalid password code', () => {
    let errorMessage

    beforeEach(() => {
      errorMessage = getErrorMessage(responseCodes.invalidNewPassword.code)
    })

    it('renders the appropriate message', () => {
      expect(errorMessage.find('div').text()).toBe(passwordErrorMessage)
    })

    it('does not redirect to the yellow box', () => {
      expect(redirect.eserviceEsignRegister).not.toHaveBeenCalled()
    })
  })

  context('with an already registered code', () => {
    let errorMessage

    beforeEach(() => {
      errorMessage = getErrorMessage(responseCodes.alreadyRegistered.code)
    })

    it('renders the AlreadyRegisteredError component', () => {
      expect(errorMessage.find(AlreadyRegisteredError).length).toBe(1)
    })

    it('does not redirect to the yellow box', () => {
      expect(redirect.eserviceEsignRegister).not.toHaveBeenCalled()
    })
  })

  context('with a duplicate email code', () => {
    it('renders the AlreadyRegisteredError component', () => {
      const errorMessage = getErrorMessage(responseCodes.duplicateAccount.code)
      expect(errorMessage.find(AlreadyRegisteredError).length).toBe(1)
    })

    it('does not redirect to the yellow box', () => {
      expect(redirect.eserviceEsignRegister).not.toHaveBeenCalled()
    })
  })

  context('with an invalid DOB code', () => {
    let errorMessage

    beforeEach(() => {
      errorMessage = getErrorMessage(responseCodes.invalidDOB.code)
    })

    it('renders the appropriate message', () => {
      expect(errorMessage.find('div').text()).toBe('The date of birth entered does not match our records. Please verify your information and re-enter.')
    })

    it('does not redirect to the yellow box', () => {
      expect(redirect.eserviceEsignRegister).not.toHaveBeenCalled()
    })
  })

  context('with any other code', () => {
    let errorMessage

    beforeEach(() => {
      errorMessage = getErrorMessage('1234')
    })

    it('renders the generic error message', () => {
      expect(errorMessage.find('div').text()).toBe(genericErrorMessage)
    })

    it('redirects to the yellow box', () => {
      expect(redirect.eserviceEsignRegister).toHaveBeenCalledTimes(1)
    })
  })
})
