import fetchApi from 'lib/services/fetch/fetchApi'
import policyService from 'lib/services/policies'
import { context } from 'test/helpers/jest'
import uuid from 'uuid'

const mockFetchResponse = {
  [uuid.v4()]: uuid.v4(),
}

const fakePolicyNumber = uuid.v4()

jest.mock('lib/services/fetch/fetchApi', () => {
  return {
    request: jest.fn(() => mockFetchResponse),
  }
})

const getCalledResource = function () {
  return fetchApi.request.mock.calls[0][0]
}

describe('Policy Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get Policies', () => {
    describe('Happy path', () => {
      it('Should call the request method on the fetch api with the policies resource', () => {
        policyService.getPolicies()
        expect(getCalledResource()).toEqual(`${policyService.resource}`)
      })

      it('Should call the request method on the fetch api with the policies resource and lines of business appended to the query params', () => {
        const lineOfBusiness = 'AUTO'
        policyService.getPolicies({linesOfBusiness: lineOfBusiness})
        expect(getCalledResource()).toEqual(`${policyService.resource}?linesOfBusiness=${lineOfBusiness}`)
      })

      it('Should call the request method on the fetch api with the policies resource and rating method appended to the query params', () => {
        const ratingMethod = 'COMPUTER'
        policyService.getPolicies({ratingMethod})
        expect(getCalledResource()).toEqual(`${policyService.resource}?ratingMethod=${ratingMethod}`)
      })
    })
  })

  describe('Get Cached Policy Summary', () => {
    let returnedSummary

    context('with no summary data for this policy', () => {
      beforeEach(async () => {
        policyService.clearSummaryCache()
        returnedSummary = await policyService.getCachedSummary(fakePolicyNumber)
      })

      it('calls the request method on the fetch api with the sessions resource', () => {
        expect(getCalledResource()).toEqual(`${policyService.getSummaryResource(fakePolicyNumber)}`)
      })

      it('caches the returned data', () => {
        expect(policyService._summaries[fakePolicyNumber]).toEqual(mockFetchResponse)
      })

      it('resolves with the resulting summary object', () => {
        expect(returnedSummary).toEqual(mockFetchResponse)
      })
    })

    context('with existing summary data for this policy', () => {
      const fakeCachedSummary = {
        [uuid.v4()]: uuid.v4(),
      }

      beforeEach(async () => {
        policyService._summaries[fakePolicyNumber] = fakeCachedSummary
        returnedSummary = await policyService.getCachedSummary(fakePolicyNumber)
      })

      it('does not call the request method on fetch api', () => {
        expect(fetchApi.request).not.toHaveBeenCalled()
      })

      it('resolves with the cached sessions object', () => {
        expect(returnedSummary).toEqual(fakeCachedSummary)
      })
    })
  })

  describe('Get Updated Policy Summary', () => {
    let returnedSummary

    context('with no summary data for this policy', () => {
      beforeEach(async () => {
        policyService.clearSummaryCache()
        returnedSummary = await policyService.getUpdatedSummary(fakePolicyNumber)
      })

      it('calls the request method on the fetch api with the sessions resource', () => {
        expect(getCalledResource()).toEqual(`${policyService.getSummaryResource(fakePolicyNumber)}`)
      })

      it('caches the returned data', () => {
        expect(policyService._summaries[fakePolicyNumber]).toEqual(mockFetchResponse)
      })

      it('resolves with the resulting sessions object', () => {
        expect(returnedSummary).toEqual(mockFetchResponse)
      })
    })

    context('with existing sessions data', () => {
      const fakeCachedSessions = {
        [uuid.v4()]: uuid.v4(),
      }

      beforeEach(async () => {
        policyService._summaries[fakePolicyNumber] = fakeCachedSessions
        returnedSummary = await policyService.getUpdatedSummary(fakePolicyNumber)
      })

      it('calls the request method on the fetch api with the sessions resource', () => {
        expect(getCalledResource()).toEqual(`${policyService.getSummaryResource(fakePolicyNumber)}`)
      })

      it('caches the returned data', () => {
        expect(policyService._summaries[fakePolicyNumber]).toEqual(mockFetchResponse)
      })

      it('resolves with the resulting sessions object', () => {
        expect(returnedSummary).toEqual(mockFetchResponse)
      })
    })
  })
})
