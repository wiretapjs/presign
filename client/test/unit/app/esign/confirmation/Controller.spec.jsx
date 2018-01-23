import React from 'react'
import { shallow } from 'enzyme'
import uuid from 'uuid'
import { context } from 'test/helpers/jest'
import Controller from 'app/esign/confirmation/Controller'
import { recordEsignConfirmationView } from 'app/esign/confirmation/analytics'
import { canEsign } from 'app/esign/filters/common'
import policyService from 'lib/services/policies'
import sessionsService from 'lib/services/sessions'

jest.mock('app/esign/filters/common')
jest.mock('app/esign/confirmation/analytics')
jest.mock('lib/services/policies')
jest.mock('lib/services/sessions')

global.console = { error: jest.fn() }

const renderControllerWrapper = function () {
  return shallow(<Controller />)
}

const renderControllerInstance = function () {
  return renderControllerWrapper().instance()
}

const defineSessionsStub = function (fakeSessionList) {
  sessionsService.getUpdatedSessions.mockImplementation(async () => {
    return fakeSessionList
  })
}

const defineSummaryStub = function (fakeSummary) {
  policyService.getUpdatedSummary.mockImplementation(async () => {
    return fakeSummary
  })
}

const getArgsPassedToAnalytics = function (argIndex) {
  return recordEsignConfirmationView.mock.calls[0][argIndex]
}

describe('Confirmation', () => {
  beforeEach(() => {
    canEsign.mockImplementation(() => true)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('on mount', () => {
    let controller

    beforeEach(() => {
      controller = renderControllerInstance()
    })

    it('starts of with isDataLoading state set to true', () => {
      expect(controller.state.isDataLoading).toBe(true)
    })

    context('with a single e-signable session and a valid policy summary', () => {
      const fakePolicyNumber = uuid.v4()
      const fakeJurisdiction = 'AL'

      const fakeSessionList = [
        {
          policyNumber: fakePolicyNumber,
        },
      ]

      const fakeSummary = {
        policyNumber: fakePolicyNumber,
        policyJurisdiction: fakeJurisdiction,
      }

      beforeEach(async () => {
        defineSessionsStub(fakeSessionList)
        defineSummaryStub(fakeSummary)
        await controller.componentDidMount()
      })

      it('calls the recordEsignConfirmationView analytics event with the policy number from the session', () => {
        expect(getArgsPassedToAnalytics(0)).toBe(fakePolicyNumber)
      })

      it('calls the recordEsignConfirmationView analytics event with the jurisdiction from the policy summary', () => {
        expect(getArgsPassedToAnalytics(1)).toBe(fakeJurisdiction)
      })

      it('sets the isDataLoading state to false', () => {
        expect(controller.state.isDataLoading).toBe(false)
      })
    })

    context('with no e-sign sessions', () => {
      const fakeSessionList = [
      ]

      beforeEach(async () => {
        defineSessionsStub(fakeSessionList)
        await controller.componentDidMount()
      })

      it('does not call the recordEsignConfirmationView analytics event', () => {
        expect(recordEsignConfirmationView).toHaveBeenCalledTimes(0)
      })

      it('sets the isDataLoading state to false', () => {
        expect(controller.state.isDataLoading).toBe(false)
      })
    })

    context('with an unavailable sessions service', () => {
      const fakeSummary = {
        policyNumber: uuid.v4(),
        policyJurisdiction: uuid.v4(),
      }

      beforeEach(async () => {
        sessionsService.getUpdatedSessions.mockImplementation(() => Promise.reject(new Error('FAILURE')))
        defineSummaryStub(fakeSummary)
        await controller.componentDidMount()
      })

      it('does not call the recordEsignConfirmationView analytics event', () => {
        expect(recordEsignConfirmationView).toHaveBeenCalledTimes(0)
      })

      it('sets the isDataLoading state to false', () => {
        expect(controller.state.isDataLoading).toBe(false)
      })
    })

    context('with an unavailable policies service', () => {
      beforeEach(async () => {
        const fakeSessionList = [
          {
            policyNumber: uuid.v4(),
          },
        ]

        defineSessionsStub(fakeSessionList)
        policyService.getUpdatedSummary.mockImplementation(() => Promise.reject(new Error('FAILURE')))
        await controller.componentDidMount()
      })

      it('does not call the recordEsignConfirmationView analytics event', () => {
        expect(recordEsignConfirmationView).toHaveBeenCalledTimes(0)
      })

      it('sets the isDataLoading state to false', () => {
        expect(controller.state.isDataLoading).toBe(false)
      })
    })
  })
})
