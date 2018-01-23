import fetchApi from 'lib/services/fetch/fetchApi'
import sessionsService from 'lib/services/sessions'
import { context } from 'test/helpers/jest'
import uuid from 'uuid'

const mockFetchResponse = {
  [uuid.v4()]: uuid.v4(),
}

jest.mock('lib/services/fetch/fetchApi', () => {
  return {
    request: jest.fn(() => mockFetchResponse),
  }
})

const getCalledResource = function () {
  return fetchApi.request.mock.calls[0][0]
}

describe('Sessions Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get Cached Sessions', () => {
    let returnedSessions

    context('with no sessions data', () => {
      beforeEach(async () => {
        sessionsService.clearCache()
        returnedSessions = await sessionsService.getCachedSessions()
      })

      it('calls the request method on the fetch api with the sessions resource', () => {
        expect(getCalledResource()).toEqual(`${sessionsService.resource}`)
      })

      it('caches the returned data', () => {
        expect(sessionsService._sessions).toEqual(mockFetchResponse)
      })

      it('resolves with the resulting sessions object', () => {
        expect(returnedSessions).toEqual(mockFetchResponse)
      })
    })

    context('with existing sessions data', () => {
      const fakeCachedSessions = {
        [uuid.v4()]: uuid.v4(),
      }

      beforeEach(async () => {
        sessionsService._sessions = fakeCachedSessions
        returnedSessions = await sessionsService.getCachedSessions()
      })

      it('does not call the request method on fetch api', () => {
        expect(fetchApi.request).not.toHaveBeenCalled()
      })

      it('resolves with the cached sessions object', () => {
        expect(returnedSessions).toEqual(fakeCachedSessions)
      })
    })
  })

  describe('Get Updated Sessions', () => {
    let returnedSessions

    context('with no sessions data', () => {
      beforeEach(async () => {
        sessionsService.clearCache()
        returnedSessions = await sessionsService.getUpdatedSessions()
      })

      it('calls the request method on the fetch api with the sessions resource', () => {
        expect(getCalledResource()).toEqual(`${sessionsService.resource}`)
      })

      it('caches the returned data', () => {
        expect(sessionsService._sessions).toEqual(mockFetchResponse)
      })

      it('resolves with the resulting sessions object', () => {
        expect(returnedSessions).toEqual(mockFetchResponse)
      })
    })

    context('with existing sessions data', () => {
      const fakeCachedSessions = {
        [uuid.v4()]: uuid.v4(),
      }

      beforeEach(async () => {
        sessionsService._sessions = fakeCachedSessions
        returnedSessions = await sessionsService.getUpdatedSessions()
      })

      it('calls the request method on the fetch api with the sessions resource', () => {
        expect(getCalledResource()).toEqual(`${sessionsService.resource}`)
      })

      it('caches the returned data', () => {
        expect(sessionsService._sessions).toEqual(mockFetchResponse)
      })

      it('resolves with the resulting sessions object', () => {
        expect(returnedSessions).toEqual(mockFetchResponse)
      })
    })
  })
})
