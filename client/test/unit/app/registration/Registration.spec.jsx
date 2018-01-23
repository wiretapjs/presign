import React from 'react'
import { shallow } from 'enzyme'
import Registration from 'app/registration/Registration'
import registrationApi from 'api/registrationApi'
import config from 'app/config'
import { flushPromises } from 'test/helpers/promises'
import redirect from 'lib/util/redirect'

config.registrationLink = 'test'
redirect.eserviceEsignLogin = jest.fn()
redirect.eserviceEsignRegister = jest.fn()

describe('Registration', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly with loading animation', () => {
    const registrationWrapper = shallow(<Registration />)
    registrationWrapper.setState({ showLoading: true })
    expect(registrationWrapper).toMatchSnapshot()
  })

  it('should render correctly without loading animation', () => {
    const registrationWrapper = shallow(<Registration />)
    registrationWrapper.setState({ showLoading: false })
    expect(registrationWrapper).toMatchSnapshot()
  })

  it('should set user email when mounting', async () => {
    registrationApi.getUserInfo = jest.fn(() => Promise.resolve({isValidToken: true, registrationInfo: { emailAddress: 'a@b.c', namedInsuredMissingSSN: true, registrationKeyActive: true }}))
    const registrationWrapper = shallow(<Registration />)
    const registrationInstance = registrationWrapper.instance()
    await registrationInstance.componentDidMount()
    expect(registrationInstance.state.emailAddress).toEqual('a@b.c')
  })

  it('should show error when mounted if token lookup fails', async () => {
    registrationApi.getUserInfo = jest.fn(() => Promise.reject(new Error('test error handling')))
    const registrationWrapper = shallow(<Registration />)
    const registrationInstance = registrationWrapper.instance()
    await registrationInstance.componentDidMount()
    expect(registrationWrapper).toMatchSnapshot()
  })

  describe('After mounting', () => {
    const mountRegistrationComponent = async () => {
      const registrationWrapper = shallow(<Registration />)
      const registrationInstance = registrationWrapper.instance()
      registrationInstance.componentDidMount()
      await flushPromises()
      return registrationInstance
    }

    it('should display the SSN field after mounting and the user is missing SSN', async () => {
      registrationApi.getUserInfo = jest.fn(() => Promise.resolve({isValidToken: true, registrationInfo: { emailAddress: 'a@b.c', namedInsuredMissingSSN: true, registrationKeyActive: true }}))
      const registrationInstance = await mountRegistrationComponent()
      expect(registrationInstance.state.displaySsn).toEqual(true)
    })

    it('should not display the SSN field after mounting and the user has SSN', async () => {
      registrationApi.getUserInfo = jest.fn(() => Promise.resolve({isValidToken: true, registrationInfo: { emailAddress: 'a@b.c', namedInsuredMissingSSN: false, registrationKeyActive: true }}))
      const registrationInstance = await mountRegistrationComponent()
      expect(registrationInstance.state.displaySsn).toEqual(false)
    })

    it('should redirect to EService Esign Login if user already registered', async () => {
      registrationApi.getUserInfo = jest.fn(() => {
        return Promise.resolve({isValidToken: true,
          registrationInfo: { emailAddress: 'a@b.c',
            userAlreadyRegistered: true,
            namedInsuredMissingSSN: false,
            registrationKeyActive: true,
          }})
      })
      await mountRegistrationComponent()
      expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
    })

    it('should redirect to EService Registration if user provide !registrationKeyActive', async () => {
      registrationApi.getUserInfo = jest.fn(() => {
        return Promise.resolve({isValidToken: true,
          registrationInfo: { emailAddress: 'a@b.c',
            userAlreadyRegistered: false,
            namedInsuredMissingSSN: false,
            registrationKeyActive: false,
          }})
      })
      await mountRegistrationComponent()
      expect(redirect.eserviceEsignRegister).toHaveBeenCalledTimes(1)
    })

    it('should redirect to EService EsignReg if registrationKeyActive is not active', async () => {
      registrationApi.getUserInfo = jest.fn(() => {
        return Promise.resolve({ emailAddress: 'a@b.c',
          userAlreadyRegistered: false,
          namedInsuredMissingSSN: false,
          registrationKeyActive: false,
        })
      })
      await mountRegistrationComponent()
      expect(redirect.eserviceEsignRegister).toHaveBeenCalledTimes(1)
    })

    it('should now show loader to false to true if getting User Info fails', async () => {
      registrationApi.getUserInfo = jest.fn(() => Promise.reject(new Error()))
      const registrationInstance = await mountRegistrationComponent()
      expect(registrationInstance.state.showLoading).toEqual(false)
    })
  })
})
