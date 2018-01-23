const controller = require('api/documents/controller.js')
const httpMocks = require('test/helpers/http-mocks')
const HttpStatus = require('http-status-codes')
const uuid = require('uuid/v4')
const documentCountServiceV1 = require('api/documents/v1/esign/count')

jest.mock('api/documents/v1/esign/count', () => {
  return {
    getDocumentCount: jest.fn(),
  }
})

describe('Get eSign document count', () => {
  const url = '/api/documents/v1/esign/count'
  const method = 'GET'

  describe('Valid request', () => {
    let request
    let response

    beforeAll(done => {
      response = httpMocks.createResponse()
      request = httpMocks.createRequest({
        method,
        url,
        query: {
          'transaction-id': uuid(),
        },
      })

      documentCountServiceV1.getDocumentCount.mockImplementation(options => {
        return Promise.resolve(1)
      })
      controller.listDocumentCountV1(request, response, () => {})
      response.on('end', done)
    })

    it('returns 200 on successful request', () => {
      const statusCode = JSON.parse(response.statusCode)
      expect(statusCode).toEqual(HttpStatus.OK)
    })

    it('returns document count', () => {
      const data = JSON.parse(response._getData())
      expect(data).toEqual({ count: 1 })
    })
  })

  describe('Invalid request', () => {
    describe('No transactionId in query', () => {
      let request
      let response

      beforeAll(done => {
        response = httpMocks.createResponse()
        request = httpMocks.createRequest({
          method,
          url,
          query: {
            'transaction-id': uuid(),
          },
        })

        documentCountServiceV1.getDocumentCount.mockImplementation(options => {
          return Promise.reject(Error('Transaction ID is required'))
        })
        controller.listDocumentCountV1(request, response, () => {})
        response.on('end', done)
      })

      it('returns error message', () => {
        const data = JSON.parse(response._getData())
        expect(data).toEqual({ message: 'Error: Transaction ID is required' })
      })

      it('returns 400 status code', () => {
        const statusCode = JSON.parse(response.statusCode)
        expect(statusCode).toEqual(HttpStatus.BAD_REQUEST)
      })
    })
  })
})
