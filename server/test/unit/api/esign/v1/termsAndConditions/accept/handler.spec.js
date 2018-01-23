const HttpStatus = require('http-status-codes')
const uuid = require('uuid')
const {getMockedCallArgument} = require('test/helpers/jest')
const handler = require('api/esign/v1/termsAndConditions/accept/handler')
const httpMocks = require('test/helpers/http-mocks')
const Service = require('api/esign/v1/termsAndConditions/accept')
Service.accept = jest.fn()

describe('List Esign Sessions', () => {
  const url = '/api/esign/v1/terms-and-conditions/accept'
  const method = 'POST'

  describe('Default behavior', () => {
    let request
    let response
    const serviceResult = uuid.v4()
    beforeAll((done) => {
      response = httpMocks.createResponse()
      request = httpMocks.createRequest({
        method,
        url,
        headers: {
          [uuid.v4()]: uuid.v4(),
          cookie: uuid.v4(),
        },
        body: {
          policies: [{
            policyNumber: uuid.v4(),
            packageId: uuid.v4(),
          }],
        },
      })
      Service.accept.mockImplementation((options) => {
        return Promise.resolve({
          value: serviceResult,
        })
      })
      handler(request, response, () => {})
      response.on('end', done)
    })

    it('calls the SessionListServiceV1 with the correct object shape', () => {
      expect(getMockedCallArgument(Service.accept.mock, 0, 0))
        .toMatchObject({
          policies: request.body.policies,
          additionalHeaders: request.headers,
        })
    })

    it('sends the value passed back from the Service', () => {
      expect(JSON.parse(response._getData()))
        .toEqual(serviceResult)
    })

    it(`sends a ${HttpStatus.OK}`, () => {
      expect(JSON.parse(response.statusCode))
        .toEqual(HttpStatus.OK)
    })
  })

  describe('Error cases', () => {
    let request
    let response
    const mockNext = jest.fn(() => {
      response.end()
    })

    beforeAll((done) => {
      response = httpMocks.createResponse()
      request = httpMocks.createRequest({
        method,
        url,
        headers: {
          [uuid.v4()]: uuid.v4(),
          cookie: uuid.v4(),
        },
      })
      Service.accept.mockImplementation((options) => {
        return Promise.reject(new Error())
      })
      handler(request, response, mockNext)
      response.on('end', done)
    })

    it('calls next when the list service returns an error', () => {
      expect(mockNext).toBeCalled()
    })
  })

  afterAll(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })
})
