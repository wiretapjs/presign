import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const eventEmitter = require('events').EventEmitter
const httpMocks = require('node-mocks-http')
const controller = require('api/registration/controller')
const request = require('request')
const RegistrationModel = require('models/registration')
const RegistrationResponseModel = require('models/registrationresponse')
const logger = require('lib/logger')

jest.mock('request', () => {
  return {
    get: jest.fn((req, cb) => {
      cb(null, {headers: {}})
    }),
    post: jest.fn((req, cb) => {
      cb(null, {headers: {}, body: {}})
    }),
  }
})

logger.sendMessage = jest.fn()

const userInfoObject = {
  emailAddress: 'cfip_qatest@libertymutual.com',
  namedInsuredMissingSSN: false,
  policyNumber: 'H4721203782175',
  registrationKeyActive: true,
  registrationKeyPresent: true,
  userAlreadyRegistered: false,
}

describe('Test the registration.getRegisteredUser', () => {
  const mockRequest = httpMocks.createRequest({
    method: 'GET',
    url: '/api/registration/v1/registeredUser/123',
    headers: {
      'content-type': 'application/json',
    },
  })
  describe('isRegisterdUser returns true when body is JSON', () => {
    const mockResponse = httpMocks.createResponse({ eventEmitter })
    it('it should send the registered user information', done => {
      const mockRemoteResponse = new RegistrationModel(true, userInfoObject)
      request.get.mockImplementationOnce((config, cb) => {
        cb(null, {body: new RegistrationModel(true, userInfoObject)})
      })
      mockResponse.on('end', () => {
        const data = JSON.parse(mockResponse._getData())
        expect(data.isValidToken).toEqual(mockRemoteResponse.isValidToken)
        done()
      })
      controller.getRegisteredUser(mockRequest, mockResponse)
    })
  })

  describe('isRegisterdUser returns false when body is html string', () => {
    const mockResponse = httpMocks.createResponse({ eventEmitter })
    it('it should send the html string', done => {
      request.get.mockImplementationOnce((config, cb) => {
        cb(null, {body: ''})
      })
      mockResponse.on('end', () => {
        const data = JSON.parse(mockResponse._getData())
        expect(data.isValidToken).toEqual(false)
        done()
      })
      controller.getRegisteredUser(mockRequest, mockResponse)
    })
  })
})

describe('Test the registration.registerUserUsingRegToken', () => {
  const mockRequest = httpMocks.createRequest({
    method: 'POST',
    url: '/api/registration/v1/registerUserUsingRegToken',
    body: {username: '', password: '', emailAddress: ''},
  })
  describe('/api/registration/v1/registerUserUsingRegToken fail', () => {
    it('should return 400 when body is html string', done => {
      request.post.mockImplementationOnce((config, cb) => {
        cb(null, {body: ''})
      })
      const response = httpMocks.createResponse({ eventEmitter })
      response.on('end', () => {
        expect(response.statusCode).toBe(400)
        done()
      })
      controller.registerUserUsingRegToken(mockRequest, response)
    })
  })

  describe('/api/registration/v1/registerUserUsingRegToken success', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })
    it('should return 200 when body is JSON', done => {
      request.post.mockImplementationOnce((config, cb) => {
        cb(null, {body: {}})
      })
      const response = httpMocks.createResponse({ eventEmitter })
      response.on('end', () => {
        expect(response.statusCode).toBe(200)
        done()
      })
      controller.registerUserUsingRegToken(mockRequest, response)
    })
    it('should send the response body and bpm url to logger', done => {
      const body = { responseCode: 2011 }
      request.post.mockImplementationOnce((config, cb) => {
        cb(null, {headers: {}, body})
      })
      const response = httpMocks.createResponse({ eventEmitter })
      response.on('end', () => {
        expect(response.statusCode).toBe(200)
        expect(logger.sendMessage.mock.calls.length).toBe(1)
        expect(logger.sendMessage.mock.calls[0][0]).toEqual(
          {text:
            {...new RegistrationResponseModel(body),
              url: controller.registerUserResource,
            },
          })
        done()
      })
      controller.registerUserUsingRegToken(request, response)
    })
  })

  describe('/api/registration/v1/registerUserUsingRegToken error', () => {
    it('should call next when error occurs', done => {
      request.post.mockImplementationOnce((config, cb) => {
        cb(new Error())
      })
      const response = httpMocks.createResponse({ eventEmitter })

      controller.registerUserUsingRegToken(mockRequest, response, (err) => {
        expect(err).not.toBe(null)
        done()
      })
    })
  })

  describe('/api/registration/v1/registeredUser error', () => {
    it('should call next when error occurs', done => {
      request.get.mockImplementationOnce((config, cb) => {
        cb(new Error())
      })
      const response = httpMocks.createResponse({ eventEmitter })

      controller.getRegisteredUser(mockRequest, response, (err) => {
        expect(err).not.toBe(null)
        done()
      })
    })
  })
})
