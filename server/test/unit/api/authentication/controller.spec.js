import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const eventEmitter = require('events').EventEmitter
const httpMocks = require('node-mocks-http')
const controller = require('api/authentication/controller')
const cookieParser = require('lib/cookie-value-parser')
const request = require('request')

jest.mock('request', () => {
  return {
    post: jest.fn((req, cb) => {
      cb(null, {headers: {}})
    }),
  }
})

jest.mock('lib/cookie-value-parser', () => {
  return {
    filterCookies: jest.fn(() => []),
    getCookieValue: jest.fn(() => ''),
  }
})

describe('Test authentication login', () => {
  const mockRequest = httpMocks.createRequest({
    method: 'POST',
    url: '/api/authentication/v1/logIn',
    body: {username: '', password: ''},
  })

  describe('/api/authentication/v1/login fail', () => {
    it('should return 401 if cookie not found', done => {
      cookieParser.filterCookies.mockImplementationOnce(() => {
        return []
      })

      const response = httpMocks.createResponse({ eventEmitter })
      response.on('end', () => {
        expect(response.statusCode).toBe(401)
        done()
      })
      controller.loginUser(mockRequest, response)
    })
  })

  describe('/api/authentication/v1/login error', () => {
    it('should call next when error occurs', done => {
      request.post.mockImplementationOnce((config, cb) => {
        cb(new Error())
      })
      const response = httpMocks.createResponse({ eventEmitter })

      controller.loginUser(mockRequest, response, (err) => {
        expect(err).not.toBe(null)
        done()
      })
    })
  })

  describe('/api/authentication/v1/login success', () => {
    it('should return 200 if cookie found', done => {
      cookieParser.filterCookies.mockImplementationOnce(() => {
        return ['test:value']
      })

      const response = httpMocks.createResponse({ eventEmitter })
      response.append = jest.fn(() => [])
      response.on('end', () => {
        expect(response.statusCode).toBe(200)
        done()
      })

      controller.loginUser(mockRequest, response)
    })
  })

  describe('/api/authentication/v1/login success', () => {
    it('should return 200 if cookie found', done => {
      cookieParser.filterCookies.mockImplementation(() => {
        return ['test:value', 'test:value']
      })

      const response = httpMocks.createResponse({ eventEmitter })
      response.append = jest.fn(() => [])
      response.on('end', () => {
        expect(response.statusCode).toBe(200)
        done()
      })

      controller.loginUser(mockRequest, response)
    })
  })
})
