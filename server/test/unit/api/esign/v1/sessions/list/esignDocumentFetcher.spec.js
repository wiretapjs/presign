import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const HttpStatus = require('http-status-codes')
const request = require('request')
const uuid = require('uuid')
const esignDocumentFetcher = require('api/esign/v1/sessions/list/esignDocumentFetcher')
const errors = require('models/errors')
const _ = require('lodash')

jest.mock('request', () => {
  return {
    post: jest.fn(),
  }
})

const createFetchOptions = () => {
  return {
    additionalHeaders: {
      [uuid.v4()]: uuid.v4(),
      cookie: uuid.v4(),
    },
    ceremony: {
      policyNumber: uuid.v4(),
      publishingTransactionId: uuid.v4(),
      ceremonyStatus: uuid.v4(),
    },
  }
}

describe('Esign Document Fetcher', () => {
  describe('Request options', () => {
    let formattedRequest
    let options

    beforeAll(async () => {
      options = createFetchOptions()
      request.post.mockImplementation((options, cb) => {
        formattedRequest = options
        cb(null, {statusCode: HttpStatus.OK})
      })
      await esignDocumentFetcher.fetch(options)
    })

    it('has the resource as the url', () => {
      expect(formattedRequest.url)
        .toEqual(esignDocumentFetcher.getEsignResourceForPolicy(options.ceremony.policyNumber))
    })

    it('passes the headers through', () => {
      expect(formattedRequest.headers).toEqual(_.merge({
        host: esignDocumentFetcher.host,
      }, options.additionalHeaders))
    })

    it('sets json to \'true\'', () => {
      expect(formattedRequest.json).toBe(true)
    })

    it('sets policyNumbers on the body', () => {
      expect(formattedRequest.body).toMatchObject({
        publishingTransactionId: options.ceremony.publishingTransactionId,
        ceremonyStatus: options.ceremony.ceremonyStatus,
        returnESignSessionURL: 'all',
      })
    })

    it('sets the host header', () => {
      expect(formattedRequest.headers.host).toEqual(esignDocumentFetcher.host)
    })

    it('is a post', () => {
      expect(request.post).toBeCalled()
    })
  })

  describe('Error cases for policies list service', () => {
    let options,
      mockRemoteResponse
    beforeEach(() => {
      mockRemoteResponse = {}
      options = createFetchOptions()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('rejects error when the remote service returns a 400 level error', done => {
      request.post.mockImplementation((config, cb) => {
        cb(null, mockRemoteResponse)
      })
      mockRemoteResponse.statusCode = HttpStatus.BAD_REQUEST
      esignDocumentFetcher
        .fetch(options)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toBeInstanceOf(errors.RemoteServiceError)
          done()
        })
    })

    it('rejects error when request returns an error', done => {
      request.post.mockImplementation((config, cb) => {
        cb(new Error(), mockRemoteResponse)
      })
      mockRemoteResponse.statusCode = HttpStatus.BAD_REQUEST
      esignDocumentFetcher
        .fetch(options)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toBeInstanceOf(errors.RemoteServiceError)
          done()
        })
    })
  })
})
