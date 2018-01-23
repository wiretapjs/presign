const HttpStatus = require('http-status-codes')
const uuid = require('uuid')
const {getMockedCallArgument} = require('test/helpers/jest')
const handler = require('api/esign/v1/sessions/list/handler')
const httpMocks = require('test/helpers/http-mocks')
const SessionListServiceV1 = require('api/esign/v1/sessions/list')
jest.mock('api/esign/v1/sessions/list', () => {
  return {
    fetch: jest.fn(),
  }
})

describe('List Esign Sessions', () => {
  const url = '/api/esign/v1/sessions'
  const method = 'GET'

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
      })
      SessionListServiceV1.fetch.mockImplementation((options) => {
        return Promise.resolve({
          value: serviceResult,
        })
      })
      handler(request, response, () => {})
      response.on('end', done)
    })

    it('calls the SessionListServiceV1 with the request headers', () => {
      expect(getMockedCallArgument(SessionListServiceV1.fetch.mock, 0, 0))
        .toMatchObject({
          additionalHeaders: request.headers,
        })
    })

    it('sends the value passed back from the Sessions List Service', () => {
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
      SessionListServiceV1.fetch.mockImplementation((options) => {
        return Promise.reject(new Error())
      })
      handler(request, response, mockNext)
      response.on('end', done)
    })

    it('calls next when the list service returns an error', () => {
      expect(mockNext).toBeCalled()
    })
  })
})
