jest.mock('request', () => {
  return jest.fn(() => {
    return { pipe: () => {} }
  })
})
const request = require('request')
const Proxy = require('../../../lib/proxy')

const testDomainHost = 'myDomain'
const testDomainFull = `https://${testDomainHost}`

let proxy

const getActualRequestConfig = function () {
  return request.mock.calls[0][0]
}

describe('Proxy', () => {
  const testConfig = { domain: testDomainFull }

  afterEach(() => {
    jest.resetAllMocks()
    request.mockImplementation(() => {
      return { pipe: () => {} }
    })
  })

  describe('constructor', () => {
    it('sets config when domain exists', () => {
      proxy = new Proxy(testConfig)
      expect(proxy.config).toBe(testConfig)
    })

    it('throws if config does not have a domain', () => {
      expect(() => {
        proxy = new Proxy({ foo: 'bar' })
      }).toThrow()
    })

    it('throws if config is not present', () => {
      expect(() => {
        proxy = new Proxy()
      }).toThrow()
    })

    it('sets the domain', () => {
      proxy = new Proxy(testConfig)
      expect(proxy.domain).toBe(testConfig.domain)
    })
  })

  describe('handleRequest', () => {
    let testRequest

    beforeEach(() => {
      testRequest = {
        method: 'GET',
        originalUrl: '/test',
        headers: {
          'Content-Type': 'json',
        },
        body: {
          test: 'test',
        },
      }

      proxy = new Proxy(testConfig)
    })

    it('forwards the request to the configured domain', () => {
      proxy.handleRequest(testRequest)
      expect(getActualRequestConfig().method).toBe(testRequest.method)
      expect(getActualRequestConfig().url).toBe(`${testConfig.domain}${testRequest.originalUrl}`)
    })

    it('sets the host header to match the domain and keeps all other headers', () => {
      proxy.handleRequest(testRequest)
      const actualHeaders = getActualRequestConfig().headers
      for (const header of Object.keys(actualHeaders)) {
        if (header === 'host') {
          expect(actualHeaders[header].toLowerCase()).toBe(testDomainHost.toLowerCase())
        } else {
          expect(actualHeaders[header]).toBe(testRequest.headers[header])
        }
      }
    })

    it('sets json to true if the incoming request has a JSON content-type header', () => {
      testRequest.headers['content-type'] = 'application/json'
      proxy.handleRequest(testRequest)
      expect(getActualRequestConfig().json).toBe(true)
    })

    it('sets json to true if the incoming request has a JSON Content-Type header', () => {
      proxy.handleRequest(testRequest)
      expect(getActualRequestConfig().json).toBe(true)
    })

    it('does not set the JSON flag if the incoming request is not a JSON request', () => {
      testRequest.headers['Content-Type'] = 'foo'
      proxy.handleRequest(testRequest)
      expect(getActualRequestConfig().json).toBeUndefined()
    })

    it('does not set the JSON flag if there is no content type header', () => {
      delete testRequest.headers['Content-Type']
      proxy.handleRequest(testRequest)
      expect(getActualRequestConfig().json).toBeUndefined()
    })

    it('does not send a request body if the incoming request body is an empty object', () => {
      testRequest.body = {}
      proxy.handleRequest(testRequest)
      expect(getActualRequestConfig().body).toBeUndefined()
    })
  })
})
