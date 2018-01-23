import fetchApi from 'lib/services/fetch/fetchApi'
import Ceremonies from 'lib/services/ceremonies'
import { context } from 'test/helpers/jest'
import { getQueryParamsFromUrl } from 'test/helpers/url'
import uuid from 'uuid'

jest.mock('lib/services/fetch/fetchApi', () => {
  return {
    request: jest.fn(() => {}),
  }
})

describe('Ceremonies Service', () => {
  describe('Get Statuses', () => {
    it('should call the ceremonies status resource', () => {
      Ceremonies.getStatuses()
      // mock.calls[0][0] returns the first parameter of the first call to the mocked function
      const calledResource = fetchApi.request.mock.calls[0][0]
      expect(calledResource).toContain('/api/ceremonies/v1/statuses')
    })
  })

  describe('Get Ceremonies', () => {
    describe('Happy path', () => {
      afterEach(() => {
        jest.clearAllMocks()
      })

      it('should call the ceremonies resource', () => {
        Ceremonies.getCeremonies({ policyNumbers: uuid.v4() })
        // mock.calls[0][0] returns the first parameter of the first call to the mocked function
        const calledResource = fetchApi.request.mock.calls[0][0]
        expect(calledResource).toContain('/api/ceremonies/v1')
      })

      context('with a single policy number', () => {
        it('should send the specified policyNumber as a query param', () => {
          const expectedPolicyNumber = uuid.v4()
          Ceremonies.getCeremonies({ policyNumbers: expectedPolicyNumber })
          // mock.calls[0][0] returns the first parameter of the first call to the mocked function
          const queryParams = getQueryParamsFromUrl(fetchApi.request.mock.calls[0][0])
          expect(queryParams.policyNumbers).toBe(expectedPolicyNumber)
        })
      })

      context('with multiple policy numbers', () => {
        it('should send the specified policyNumbers as query params', () => {
          const expectedPolicyNumbers = [uuid.v4(), uuid.v4(), uuid.v4()]
          Ceremonies.getCeremonies({ policyNumbers: expectedPolicyNumbers })
          // mock.calls[0][0] returns the first parameter of the first call to the mocked function
          const queryParams = getQueryParamsFromUrl(fetchApi.request.mock.calls[0][0])
          expect(queryParams.policyNumbers).toEqual(expectedPolicyNumbers)
        })
      })

      it('should send the specified statuses as query params', () => {
        const expectedStatuses = [uuid.v4(), uuid.v4(), uuid.v4()]
        Ceremonies.getCeremonies({ policyNumbers: 'foo', statuses: expectedStatuses })
        // mock.calls[0][0] returns the first parameter of the first call to the mocked function
        const queryParams = getQueryParamsFromUrl(fetchApi.request.mock.calls[0][0])
        expect(queryParams.statuses).toEqual(expectedStatuses)
      })
    })

    describe('Errors', () => {
      it('Should reject when policyNumbers is undefined', () => {
        Ceremonies.getCeremonies({})
          .catch((err) => {
            expect(err).toBeInstanceOf(Error)
          })
      })

      it('Should reject when no options are passed', () => {
        Ceremonies.getCeremonies()
          .catch((err) => {
            expect(err).toBeInstanceOf(Error)
          })
      })

      it('Should reject when policyNumbers is an empty array', () => {
        const policyNumbers = []
        Ceremonies.getCeremonies({policyNumbers})
          .catch((err) => {
            expect(err).toBeInstanceOf(Error)
          })
      })
    })
  })
})
