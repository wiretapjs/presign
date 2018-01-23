import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const uuid = require('uuid')
const {getMockedCallArgument} = require('test/helpers/jest')
const v1EsignSessionListService = require('api/esign/v1/sessions/list/service')
const esignDocumentFetcher = require('api/esign/v1/sessions/list/esignDocumentFetcher')
const ceremonyFetcher = require('api/esign/v1/sessions/list/ceremoniesFetcher')
const v1PolicyListService = require('api/policies/v1/list')

jest.mock('api/esign/v1/sessions/list/esignDocumentFetcher', () => {
  return {
    fetch: jest.fn(),
  }
})

jest.mock('api/esign/v1/sessions/list/ceremoniesFetcher', () => {
  return {
    fetch: jest.fn(),
  }
})

jest.mock('api/policies/v1/list', () => {
  return {
    fetch: jest.fn(),
  }
})

describe('Sessions List Service', () => {
  describe('Default behavior', () => {
    const mockSessionsRequest = {
      additionalHeaders: {
        [uuid.v4()]: uuid.v4(),
      },
    }

    const policyNumber = uuid.v4()

    const ceremonyStatus = uuid.v4()

    const signerStatus = [uuid.v4(), uuid.v4()]

    const mockPoliciesResponse = {
      responseHeaders: {
        [uuid.v4()]: uuid.v4(),
      },
      value: {
        policies: [{
          policyNumber,
        }],
      },
    }

    const mockCeremonyResponse = {
      value: [{
        policyNumber,
        publishingTransactionId: uuid.v4(),
        ceremonyStatus,
        signerStatus,
      }],
      responseHeaders: {
        [uuid.v4()]: uuid.v4(),
      },
    }

    const mockSessionResponse = {
      value: {
        [uuid.v4()]: uuid.v4(),
      },
      responseHeaders: {
        [uuid.v4()]: uuid.v4(),
      },
    }

    let result

    beforeAll(async () => {
      v1PolicyListService.fetch.mockImplementation((options) => {
        return Promise.resolve(mockPoliciesResponse)
      })
      ceremonyFetcher.fetch.mockImplementation((options) => {
        return Promise.resolve(mockCeremonyResponse)
      })
      esignDocumentFetcher.fetch.mockImplementation((options) => {
        return Promise.resolve(mockSessionResponse)
      })
      result = await v1EsignSessionListService.fetch(mockSessionsRequest)
    })

    it('calls the v1PolicyListService with the options passed to fetch()', () => {
      expect(getMockedCallArgument(v1PolicyListService.fetch.mock, 0, 0))
        .toMatchObject(mockSessionsRequest)
    })

    it('calls the ceremonyFetcher with the policyNumbers and policy response headers', () => {
      expect(getMockedCallArgument(ceremonyFetcher.fetch.mock, 0, 0))
        .toMatchObject({
          policyNumbers: [policyNumber],
          additionalHeaders: mockSessionsRequest.additionalHeaders,
        })
    })

    it('calls the esignDocumentFetcher with the ceremony and ceremonies response headers', () => {
      expect(getMockedCallArgument(esignDocumentFetcher.fetch.mock, 0, 0))
        .toMatchObject({
          ceremony: mockCeremonyResponse.value[0],
          additionalHeaders: mockSessionsRequest.additionalHeaders,
        })
    })

    it('returns an array of sessions with the policyNumber attached', () => {
      const expectedValue = [mockSessionResponse.value]
      expectedValue.policyNumber = policyNumber
      expect(JSON.stringify(result.value)).toEqual(JSON.stringify(expectedValue))
    })

    it('returns an array of sessions with the ceremonyStatus attached', () => {
      const expectedValue = [mockSessionResponse.value]
      expectedValue.ceremonyStatus = ceremonyStatus
      expect(JSON.stringify(result.value)).toEqual(JSON.stringify(expectedValue))
    })

    it('returns an array of sessions with the signerCount attached', () => {
      const firstCeremonyResponse = mockCeremonyResponse.value[0]
      const expectedNumberOfSigners = firstCeremonyResponse.signerStatus.length
      const firstSessionSignerCount = result.value[0].signerCount
      expect(firstSessionSignerCount).toBe(expectedNumberOfSigners)
    })
  })
})
