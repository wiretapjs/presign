import fetchApi from 'lib/services/fetch/fetchApi'
import * as fetch from 'jest-fetch-mock'
import { context } from 'test/helpers/jest'

global.fetch = fetch.default

let requestConfig
const fakeUrl = 'http://www.example.com'

const getActualFetchConfig = function () {
  return global.fetch.mock.calls[0][1]
}

const getActualFetchUrl = function () {
  return global.fetch.mock.calls[0][0]
}

describe('fetchApi', () => {
  const mockResponse = { access_token: '12345' }
  beforeEach(() => {
    global.fetch.mockResponse(JSON.stringify(mockResponse), { status: 200 })
  })

  afterEach(() => {
    global.fetch.mockClear()
  })

  describe('request', () => {
    beforeEach(() => {
      requestConfig = {}
    })

    context('without config', () => {
      it('sends a GET request to the given URL', async () => {
        await fetchApi.request(fakeUrl)
        expect(getActualFetchConfig().method).toBe('GET')
        expect(getActualFetchUrl()).toBe(fakeUrl)
      })
    })

    context('with an undefined request method', () => {
      context('with an undefined request body', () => {
        it('sends a GET request', async () => {
          await fetchApi.request(fakeUrl, requestConfig)
          expect(getActualFetchConfig().method).toBe('GET')
        })
      })

      context('with a request body', () => {
        const expectedBody = { text: 'hi' }
        const sendRequestWithBody = async function (requestBody) {
          requestConfig.body = requestBody
          await fetchApi.request(fakeUrl, requestConfig)
        }

        it('sends a POST request by default', async () => {
          await sendRequestWithBody(expectedBody)
          expect(getActualFetchConfig().method).toBe('POST')
        })

        context('with a body of type object', () => {
          it('sends a request with the defined body in string format', async () => {
            await sendRequestWithBody(expectedBody)
            expect(getActualFetchConfig().body).toEqual(JSON.stringify(expectedBody))
          })
        })

        context('with a non-object body', () => {
          it('sends a request with the defined body', async () => {
            await sendRequestWithBody(JSON.stringify(expectedBody))
            expect(getActualFetchConfig().body).toEqual(JSON.stringify(expectedBody))
          })
        })
      })
    })

    context('with a defined request method', () => {
      beforeEach(() => {
        requestConfig.method = 'PUT'
        requestConfig.body = 'sup'
      })

      it('sends a request of the defined method', async () => {
        await fetchApi.request(fakeUrl, requestConfig)
        expect(getActualFetchConfig().method).toBe('PUT')
      })
    })

    context('with undefined headers', () => {
      it('sends a request with a JSON Content-Type header if there is a request body', async () => {
        requestConfig.body = 'sup'
        await fetchApi.request(fakeUrl, requestConfig)
        expect(getActualFetchConfig().headers.map).toEqual(new Headers({
          'Content-Type': 'application/json',
        }).map)
      })

      it('sends a request with no headers if there is not a request body', async () => {
        await fetchApi.request(fakeUrl, requestConfig)
        expect(getActualFetchConfig().headers).toBeUndefined()
      })
    })

    context('with defined non-content-type headers', () => {
      beforeEach(() => {
        requestConfig.headers = {
          foo: 'bar',
          'Content-Type': 'baz',
        }
      })

      it('sends a request with the defined headers', async () => {
        await fetchApi.request(fakeUrl, requestConfig)
        expect(getActualFetchConfig().headers.map).toEqual(new Headers({
          'Content-Type': 'baz',
          foo: 'bar',
        }).map)
      })
    })

    context('with an undefined url', () => {
      it('rejects', () => {
        const subject = fetchApi.request(undefined, requestConfig)
        return expect(subject).rejects.toEqual(new Error('The URL is required'))
      })
    })

    context('with a defined url', () => {
      it('sends a request to the defined url', async () => {
        await fetchApi.request(fakeUrl, requestConfig)
        expect(getActualFetchUrl()).toBe(fakeUrl)
      })
    })

    it('rejects with a non-200-level HTTP response', () => {
      global.fetch.mockReset()
      global.fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 400 })
      const subject = fetchApi.request(fakeUrl, requestConfig)
      return expect(subject).rejects.toBeDefined()
    })

    it('rejects with a non-JSON response body', () => {
      global.fetch.mockReset()
      global.fetch.mockResponseOnce('HI', { status: 200 })
      const subject = fetchApi.request(fakeUrl, requestConfig)
      return expect(subject).rejects.toBeDefined()
    })

    it('should not reject if JSON response is empty', async () => {
      global.fetch.mockReset()
      const mockResponse = {}
      global.fetch.mockResponseOnce('', { status: 200 })
      const subject = await fetchApi.request(fakeUrl, requestConfig)
      return expect(subject).toEqual(mockResponse)
    })

    it('rejects if fetch rejects', () => {
      global.fetch.mockReset()
      global.fetch.mockImplementation(async () => { throw new Error('DOH') })
      const subject = fetchApi.request(fakeUrl, requestConfig)
      return expect(subject).rejects.toEqual(new Error('DOH'))
    })

    it('includes credentials in the request', async () => {
      await fetchApi.request(fakeUrl, requestConfig)
      expect(getActualFetchConfig().credentials).toBe('include')
    })

    it('does not cache the request', async () => {
      await fetchApi.request(fakeUrl, requestConfig)
      expect(getActualFetchConfig().cache).toBe('no-cache')
    })

    it('resolves with the response body', async () => {
      const subject = await fetchApi.request(fakeUrl, requestConfig)
      expect(subject).toEqual(mockResponse)
    })
  })
})
