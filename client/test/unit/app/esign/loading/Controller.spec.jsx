import React from 'react'
import { mockHistory } from 'test/helpers/mockProps'
import Controller from 'app/esign/loading/Controller'
import ViewModel from 'app/esign/loading/ViewModel'
import uuid from 'uuid'
import { shallow, mount } from 'enzyme'
import { context } from 'test/helpers/jest'
import createEnvironmentConfig from 'test/helpers/environments'
import { setQueryString } from 'test/helpers/url'
import config from 'app/config'
import redirect from 'lib/util/redirect.js'
import * as analytics from 'app/esign/loading/analytics'

console.error = jest.fn()

jest.mock('app/esign/loading/ViewModel', () => {
  return {
    create: jest.fn(),
  }
})

redirect.eserviceEsignLogin = jest.fn()
redirect.eserviceEsign = jest.fn()
redirect.eserviceWelcomePage = jest.fn()

const initializeControllerWrapper = function () {
  return shallow(<Controller history={mockHistory} />)
}

const initializeMountedControllerWrapper = function () {
  return mount(<Controller history={mockHistory} />)
}

const initializeControllerInstance = function () {
  return initializeControllerWrapper().instance()
}

// const initializeMountedControllerInstance = function () {
//   return initializeMountedControllerWrapper().instance()
// }

const policyNumberFixtures = [
  {
    policyNumber: uuid.v4(),
    ceremonyStatus: 'sent',
  },
  {
    policyNumber: uuid.v4(),
    ceremonyStatus: 'sent',
  },
]

const numberOfEsignDocs = 2
const numberOfPrintSignMailDocs = 2

const acceptTermsAndConditionsSuccess = jest.fn()

const defineViewModelMock = function (options) {
  options = options || {}
  const { hasMultipleSigners } = options
  const viewModel = {
    acceptTermsAndConditions: acceptTermsAndConditionsSuccess,
    numberOfEsignDocs,
    numberOfPrintSignMailDocs,
    canEsign: options.canEsign || false,
    hasMultipleSigners: Boolean(hasMultipleSigners),
    policySummaries: [{ policyJurisdiction: 'CA' }, { policyJurisdiction: 'MA' }],
    eSignSessions: [{ policyNumber: uuid.v4() }, { policyNumber: uuid.v4() }],
  }
  viewModel.signableCeremonies = options.signableCeremonies || policyNumberFixtures

  return Promise.resolve({ ...viewModel, ...options })
}

describe('ESignLoadingController', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    createEnvironmentConfig()
  })
  const getExpectedDestination = function (subDomain) {
    return `https://${subDomain}.libertymutual.com/PmInternetContentServiceWeb/insurance/url?origin=eSignReg&uri=esign`
  }

  describe('analytics', () => {
    beforeEach(() => {
      ViewModel.create.mockImplementation(() => defineViewModelMock())
      analytics.recordESignLoading = jest.fn()
      analytics.recordESignLoadingError = jest.fn()
    })

    context('with signable ceremonies', () => {
      it('calls the recordESignLoading analytics event', async () => {
        expect(analytics.recordESignLoading).toHaveBeenCalledTimes(0)
        const controller = initializeControllerInstance()
        await controller.componentDidMount()
        expect(analytics.recordESignLoading).toHaveBeenCalledTimes(1)
      })

      it('passes the view model eSign sessions into the analytics call', async () => {
        const controller = initializeControllerInstance()
        await controller.componentDidMount()
        expect(analytics.recordESignLoading).toHaveBeenCalledWith(
          controller.state.viewModel.eSignSessions,
        )
      })
    })

    context('with no signable ceremonies', () => {
      beforeEach(async () => {
        ViewModel.create.mockImplementation(() => defineViewModelMock({ signableCeremonies: [] }))
        const controller = initializeControllerInstance()
        await controller.componentDidMount()
      })

      it('calls the recordESignLoadingErr analytics event', () => {
        expect(analytics.recordESignLoadingError).toHaveBeenCalledTimes(1)
      })
    })

    context('with a view model that fails during creation', () => {
      beforeEach(async () => {
        ViewModel.create.mockImplementation(() => Promise.reject(new Error('failure')))
        const controller = initializeControllerInstance()
        await controller.componentDidMount()
      })

      it('calls the recordESignLoadingErr analytics event', () => {
        expect(analytics.recordESignLoadingError).toHaveBeenCalledTimes(1)
      })
    })
  })

  context('without a pbDest', () => {
    context('with production environment', () => {
      it('gets the production eSign destination', () => {
        config.environment = 'production'
        const subject = initializeControllerInstance().destination
        expect(subject).toBe(getExpectedDestination('prodmapping'))
      })
    })

    context('with non-production environment', () => {
      it('gets a uat eSign destination', () => {
        const subject = initializeControllerInstance().destination
        expect(subject).toBe(getExpectedDestination('uat-uatmapping'))
      })
    })
  })

  context('with pbDest === prod', () => {
    beforeEach(() => {
      setQueryString('?pbDest=prod')
    })

    it('returns a link with the production sub-domain', () => {
      const subject = initializeControllerInstance().destination
      expect(subject).toBe(getExpectedDestination('prodmapping'))
    })
  })

  context('with pbDest === 2pr', () => {
    beforeEach(() => {
      setQueryString('?pbDest=2pr')
    })

    it('returns a link with the production sub-domain', () => {
      const subject = initializeControllerInstance().destination
      expect(subject).toBe(getExpectedDestination('2prmapping'))
    })
  })

  context('with pbDest set to a non-prod environment', () => {
    beforeEach(() => {
      setQueryString('?pbDest=uat')
    })

    it('returns a link with the matching sub-domain', () => {
      const subject = initializeControllerInstance().destination
      expect(subject).toBe(getExpectedDestination('uat-uatmapping'))
    })
  })

  describe('loading', () => {
    it('is loading until it the view model has been created', async () => {
      const controllerInstance = initializeControllerInstance()
      expect(controllerInstance.state.isLoading).toBe(true)
      ViewModel.create.mockImplementation(() => defineViewModelMock())
      await controllerInstance.componentDidMount()
      expect(controllerInstance.state.isLoading).toBe(false)
    })
    it('redirects to eservice esign on view model error', async () => {
      ViewModel.create.mockImplementation(Promise.reject)
      await initializeControllerInstance().componentDidMount()
      expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
    })
  })

  describe('accepts terms and conditions', async () => {
    it('should call accept terms and conditions in viewModel', async () => {
      ViewModel.create.mockImplementation(() =>
        defineViewModelMock({
          acceptTermsAndConditions: jest.fn(() => defineViewModelMock({ canEsign: true })),
        }),
      )
      const controllerWrapper = await initializeMountedControllerWrapper()
      const controllerInstance = controllerWrapper.instance()
      const acceptTermsAndConditions = controllerInstance.state.viewModel.acceptTermsAndConditions
      await controllerInstance.acceptTermsAndConditions()
      expect(acceptTermsAndConditions).toHaveBeenCalledTimes(1)
    })
    it('should redirect to purple box if canEsign', async () => {
      ViewModel.create.mockImplementation(() =>
        defineViewModelMock({
          acceptTermsAndConditions: jest.fn(() => defineViewModelMock({ canEsign: true })),
        }),
      )
      const controllerWrapper = await initializeMountedControllerWrapper()
      const controllerInstance = controllerWrapper.instance()
      await controllerInstance.acceptTermsAndConditions()
      expect(controllerInstance.props.history.push).toHaveBeenCalledTimes(1)
    })
    context('Error in accepting terms and conditions', async () => {
      it('should redirect to yellow box on error', async () => {
        ViewModel.create.mockImplementation(() =>
          defineViewModelMock({ acceptTermsAndConditions: Promise.reject }),
        )
        const controllerWrapper = await initializeMountedControllerWrapper()
        const controllerInstance = controllerWrapper.instance()
        await controllerInstance.acceptTermsAndConditions()
        expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
      })
      it('should update the state to show that their are errors', async () => {
        ViewModel.create.mockImplementation(() =>
          defineViewModelMock({ acceptTermsAndConditions: Promise.reject }),
        )
        const controllerWrapper = await initializeMountedControllerWrapper()
        const controllerInstance = controllerWrapper.instance()
        await controllerInstance.acceptTermsAndConditions()
        expect(controllerInstance.state.hasErrors).toBe(true)
      })
    })
  })

  describe('show policies with eSign ceremonies', () => {
    context('with policies that do not have any ceremonies', () => {
      it('should redirect users to welcome page', async () => {
        const controllerWrapper = initializeMountedControllerWrapper()
        ViewModel.create.mockImplementation(() => defineViewModelMock({ signableCeremonies: [] }))
        await controllerWrapper.instance().componentDidMount()
        jest.runAllTimers()
        expect(redirect.eserviceWelcomePage).toHaveBeenCalledTimes(1)
      })
    })
    context('with policies that have ceremonies', () => {
      it('passes the policies to the view', async () => {
        const controllerWrapper = initializeMountedControllerWrapper()
        ViewModel.create.mockImplementation(() => defineViewModelMock())
        await controllerWrapper.instance().componentDidMount()
        const view = controllerWrapper.find('ESignLoadingView')
        expect(view.prop('ceremonies')).toEqual(policyNumberFixtures)
      })
    })
  })

  describe('show number of eSign documents to sign', () => {
    context('with no documents to sign', () => {
      it('passes 0 to the view', async () => {
        const controllerWrapper = initializeMountedControllerWrapper()
        ViewModel.create.mockImplementation(() => defineViewModelMock({ numberOfEsignDocs: 0 }))
        await controllerWrapper.instance().componentDidMount()
        const view = controllerWrapper.find('ESignLoadingView')
        expect(view.prop('numberOfEsignDocs')).toBe(0)
      })
    })

    context('with 2 documents to sign', () => {
      it('passes 2 to the view', async () => {
        const controllerWrapper = initializeMountedControllerWrapper()
        ViewModel.create.mockImplementation(() => defineViewModelMock())
        await controllerWrapper.instance().componentDidMount()
        const view = controllerWrapper.find('ESignLoadingView')
        expect(view.prop('numberOfEsignDocs')).toBe(numberOfEsignDocs)
      })
    })
  })

  describe('show number of print sign mail documents to sign', () => {
    context('with no documents to sign', () => {
      it('passes 0 to the view', async () => {
        const controllerWrapper = initializeMountedControllerWrapper()
        ViewModel.create.mockImplementation(async () => {
          return defineViewModelMock({ numberOfPrintSignMailDocs: 0 })
        })
        await controllerWrapper.instance().componentDidMount()
        const view = controllerWrapper.find('ESignLoadingView')
        expect(view.prop('numberOfPrintSignMailDocs')).toBe(0)
      })
    })

    context('with 2 documents to sign', () => {
      it('passes 2 to the view', async () => {
        const controllerWrapper = initializeMountedControllerWrapper()
        ViewModel.create.mockImplementation(async () => defineViewModelMock())
        await controllerWrapper.instance().componentDidMount()
        const view = controllerWrapper.find('ESignLoadingView')
        expect(view.prop('numberOfPrintSignMailDocs')).toBe(numberOfEsignDocs)
      })
    })
  })

  describe('Passes multiple signers to view', () => {
    context('multiple signers is true', () => {
      it('passes true to the view', async () => {
        const controllerWrapper = initializeMountedControllerWrapper()
        ViewModel.create.mockImplementation(async () => {
          return defineViewModelMock({
            returnZeroDocs: true,
            hasMultipleSigners: true,
          })
        })
        await controllerWrapper.instance().componentDidMount()
        const view = controllerWrapper.find('ESignLoadingView')
        expect(view.prop('hasMultipleSigners')).toBeTruthy()
      })
    })

    context('multiple signers is false', () => {
      it('passes false to the view', async () => {
        const controllerWrapper = initializeMountedControllerWrapper()
        ViewModel.create.mockImplementation(async () => defineViewModelMock())
        await controllerWrapper.instance().componentDidMount()
        const view = controllerWrapper.find('ESignLoadingView')
        expect(view.prop('hasMultipleSigners')).toEqual(false)
      })
    })
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.resetAllMocks()
    jest.resetModules()
  })
})
