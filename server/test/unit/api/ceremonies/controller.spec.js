import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')

const _ = require('lodash')
const httpMocks = require('test/helpers/http-mocks')
const controller = require('api/ceremonies/controller')
const uuid = require('uuid')
const request = require('request')
const Url = require('url-parse')
const HttpStatus = require('http-status-codes')

jest.mock('request', () => {
  return {
    post: jest.fn(),
  }
})

const createMockCeremony = (ceremonyStatus, sessionType) => {
  return {
    ceremonyStatus,
    sessionType,
  }
}

const createMockBpmResponse = function () {
  return {
    statusCode: HttpStatus.OK,
    body: {
      ceremonies: [
        createMockCeremony(controller.CeremonyStatuses.SENT,
          controller.CeremonySessionTypes.ESIGN),
        createMockCeremony(controller.CeremonyStatuses.READY,
          controller.CeremonySessionTypes.PSM),
      ],
    },
    headers: {
      'set-cookie': 'foo=bar; domain=baz',
    },
  }
}

describe('Test the ceremonies route', () => {
  describe('Policy number formatting', () => {
    const policyNumbers = [uuid.v4()]
    let formattedRequest
    let mockRequest,
      mockResponse

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: '/api/ceremonies/v1',
        headers: {
          'content-type': 'application/json',
        },
        query: {
          policyNumbers,
        },
        cookies: {
          LtpaToken2: uuid.v4(),
        },
      })
      mockResponse = httpMocks.createResponse()
      request.post.mockImplementation((config, cb) => {
        formattedRequest = config
        cb(null, createMockBpmResponse())
      })
    })

    it('should send an array of policy numbers given input is multiple policy numbers', () => {
      const policyNumbers = [ uuid.v4(), uuid.v4(), uuid.v4() ]
      mockRequest.query.policyNumbers = policyNumbers
      controller.listCeremonies(mockRequest, mockResponse)
      expect(formattedRequest.body.policyNumber).toEqual(policyNumbers)
    })

    it('should send an array of policy numbers given one input policy number', () => {
      const policyNumbers = uuid.v4()
      const expectedOutput = [policyNumbers]
      mockRequest.query.policyNumbers = policyNumbers
      controller.listCeremonies(mockRequest, mockResponse)
      expect(formattedRequest.body.policyNumber).toEqual(expectedOutput)
    })
  })

  describe('Request options', () => {
    const policyNumbers = [uuid.v4()]
    let formattedRequest
    let ltpaToken
    let mockRequest,
      mockResponse

    beforeAll(() => {
      ltpaToken = uuid.v4()

      mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: '/api/ceremonies/v1',
        headers: {
          'content-type': 'application/json',
          cookie: `LtpaToken2=${ltpaToken}`,
        },
        query: {
          policyNumbers,
        },
        cookies: {
          LtpaToken2: uuid.v4(),
        },
      })

      mockResponse = httpMocks.createResponse()

      request.post.mockImplementation((config, cb) => {
        formattedRequest = config
        cb(null, createMockBpmResponse())
      })

      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('Should have the resource as the url', () => {
      expect(formattedRequest.url).toEqual(controller.resource)
    })

    it('Should pass the headers through', () => {
      expect(formattedRequest.headers).toEqual({
        host: new Url(controller.resource).host,
        cookie: `LtpaToken2=${ltpaToken}`,
        'content-type': 'application/json',
      })
    })

    it('Should set json to \'true\'', () => {
      expect(formattedRequest.json).toBe(true)
    })

    it('Should set body.policyNumber', () => {
      expect(formattedRequest.body.policyNumber).toEqual(policyNumbers)
    })

    it('Should set LtpaToken2', () => {
      expect(formattedRequest.headers.cookie).toEqual(`LtpaToken2=${ltpaToken}`)
    })
  })

  describe('GET /api/ceremonies/v1', () => {
    let mockRequest,
      mockResponse

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: '/api/ceremonies/v1',
        query: {
          policyNumbers: [uuid.v4()],
        },
      })

      mockResponse = httpMocks.createResponse()
    })

    it('should call request.post', done => {
      const mockBpmResponse = createMockBpmResponse()

      request.post.mockImplementation((config, cb) => {
        cb(null, mockBpmResponse)
      })

      mockResponse.on('end', () => {
        expect(request.post).toHaveBeenCalled()
        done()
      })

      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should pass all cookies set by remote service to the client', done => {
      const mockBpmResponse = createMockBpmResponse()

      request.post.mockImplementation((config, cb) => {
        cb(null, mockBpmResponse)
      })

      mockResponse.on('end', () => {
        expect(mockResponse.append).toHaveBeenCalledWith('Set-Cookie', mockBpmResponse.headers['set-cookie'])
        done()
      })

      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should return the ceremonies from the remote service', done => {
      const mockBpmResponse = createMockBpmResponse()

      request.post.mockImplementation((config, cb) => {
        cb(null, mockBpmResponse)
      })
      mockResponse.on('end', () => {
        expect(mockResponse._getData()).toEqual(JSON.stringify(mockBpmResponse.body))
        done()
      })
      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should filter based on the sessionType query param', done => {
      const mockBpmResponse = createMockBpmResponse()
      _.set(mockBpmResponse, 'body.ceremonies', [
        createMockCeremony(controller.CeremonyStatuses.SENT,
          controller.CeremonySessionTypes.ESIGN),
        createMockCeremony(controller.CeremonyStatuses.READY,
          controller.CeremonySessionTypes.PSM),
      ])

      mockRequest.query.sessionType = controller.CeremonySessionTypes.ESIGN

      request.post.mockImplementation((config, cb) => {
        cb(null, mockBpmResponse)
      })
      mockResponse.on('end', () => {
        expect(mockResponse._getData()).toEqual(JSON.stringify({
          ceremonies: [mockBpmResponse.body.ceremonies[0]],
        }))
        done()
      })
      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should allow multiple session types in the filter', done => {
      const mockBpmResponse = createMockBpmResponse()
      _.set(mockBpmResponse, 'body.ceremonies', [
        createMockCeremony(controller.CeremonyStatuses.SENT,
          controller.CeremonySessionTypes.ESIGN),
        createMockCeremony(controller.CeremonyStatuses.READY,
          controller.CeremonySessionTypes.PSM),
      ])

      mockRequest.query.sessionType = [
        controller.CeremonySessionTypes.ESIGN,
        controller.CeremonySessionTypes.PSM,
      ]

      request.post.mockImplementation((config, cb) => {
        cb(null, mockBpmResponse)
      })
      mockResponse.on('end', () => {
        expect(mockResponse._getData()).toEqual(JSON.stringify({
          ceremonies: [
            mockBpmResponse.body.ceremonies[0],
            mockBpmResponse.body.ceremonies[1],
          ],
        }))
        done()
      })
      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should filter based on the ceremonyStatus query param', done => {
      const mockBpmResponse = createMockBpmResponse()
      _.set(mockBpmResponse, 'body.ceremonies', [
        createMockCeremony(controller.CeremonyStatuses.SENT,
          controller.CeremonySessionTypes.ESIGN),
        createMockCeremony(controller.CeremonyStatuses.READY,
          controller.CeremonySessionTypes.ESIGN),
        createMockCeremony(controller.CeremonyStatuses.ESIGN,
          controller.CeremonySessionTypes.ESIGN),
      ])

      mockRequest.query.ceremonyStatus = controller.CeremonyStatuses.SENT

      request.post.mockImplementation((config, cb) => {
        cb(null, mockBpmResponse)
      })
      mockResponse.on('end', () => {
        expect(mockResponse._getData()).toEqual(JSON.stringify({
          ceremonies: [
            mockBpmResponse.body.ceremonies[0],
          ],
        }))
        done()
      })
      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should allow multiple ceremonyStatuses to filter on', done => {
      const mockBpmResponse = createMockBpmResponse()
      _.set(mockBpmResponse, 'body.ceremonies', [
        createMockCeremony(controller.CeremonyStatuses.SENT,
          controller.CeremonySessionTypes.ESIGN),
        createMockCeremony(controller.CeremonyStatuses.READY,
          controller.CeremonySessionTypes.ESIGN),
        createMockCeremony(controller.CeremonyStatuses.ESIGN,
          controller.CeremonySessionTypes.ESIGN),
      ])

      mockRequest.query.ceremonyStatus = [
        controller.CeremonyStatuses.SENT,
        controller.CeremonyStatuses.READY,
      ]

      request.post.mockImplementation((config, cb) => {
        cb(null, mockBpmResponse)
      })
      mockResponse.on('end', () => {
        expect(mockResponse._getData()).toEqual(JSON.stringify({
          ceremonies: [
            mockBpmResponse.body.ceremonies[0],
            mockBpmResponse.body.ceremonies[1],
          ],
        }))
        done()
      })
      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should return forbidden if the remote service sends forbidden', done => {
      const mockRemoteResponse = {
        statusCode: HttpStatus.FORBIDDEN,
      }

      request.post.mockImplementation((config, cb) => {
        cb(null, mockRemoteResponse)
      })
      mockResponse.on('end', () => {
        expect(mockResponse.statusCode).toEqual(HttpStatus.FORBIDDEN)
        done()
      })
      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should return an empty ceremonies array if there are no ceremonies returned', done => {
      const mockBpmResponse = createMockBpmResponse()
      _.set(mockBpmResponse, 'body.ceremonies', undefined)

      request.post.mockImplementation((config, cb) => {
        cb(null, mockBpmResponse)
      })
      mockResponse.on('end', () => {
        expect(mockResponse._getData()).toEqual(JSON.stringify({ceremonies: []}))
        done()
      })
      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('should return a 400 if no policy numbers are passed', done => {
      delete mockRequest.query.policyNumbers
      mockResponse.on('end', () => {
        expect(mockResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST)
        done()
      })
      controller.listCeremonies(mockRequest, mockResponse)
    })

    it('Should call next when an error occures in the remote service', done => {
      request.post.mockImplementation((config, cb) => {
        cb(new Error())
      })
      controller.listCeremonies(mockRequest, mockResponse, (err) => {
        expect(err).not.toBe(null)
        done()
      })
    })

    it('Should call next when 400 error comes back from the remote service', done => {
      const mockRemoteResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
      }
      request.post.mockImplementation((config, cb) => {
        cb(null, mockRemoteResponse)
      })
      controller.listCeremonies(mockRequest, mockResponse, (err) => {
        expect(err).toBe(mockRemoteResponse)
        done()
      })
    })
  })
})
