import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const HttpStatus = require('http-status-codes')
const request = require('request')
const uuid = require('uuid')
const ceremoniesFetcher = require('api/esign/v1/sessions/list/ceremoniesFetcher')
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
    policyNumbers: [uuid.v4()],
  }
}

describe('Ceremony Fetcher', () => {
  describe('Request options', () => {
    let formattedRequest
    let options

    beforeAll(async () => {
      options = createFetchOptions()
      request.post.mockImplementation((options, cb) => {
        formattedRequest = options
        cb(null, {statusCode: HttpStatus.OK})
      })
      await ceremoniesFetcher.fetch(options)
    })

    it('has the resource as the url', () => {
      expect(formattedRequest.url).toEqual(ceremoniesFetcher.resource)
    })

    it('passes the headers through', () => {
      expect(formattedRequest.headers).toEqual(_.merge({
        host: ceremoniesFetcher.host,
      }, options.additionalHeaders))
    })

    it('sets json to \'true\'', () => {
      expect(formattedRequest.json).toBe(true)
    })

    it('sets policyNumbers on the body', () => {
      expect(formattedRequest.body.policyNumber).toEqual(options.policyNumbers)
    })

    it('sets the host header', () => {
      expect(formattedRequest.headers.host).toEqual(ceremoniesFetcher.host)
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

    it('returns an empty array when no ceremonies are found', done => {
      request.post.mockImplementation((config, cb) => {
        cb(null, { body: {} })
      })
      mockRemoteResponse.statusCode = HttpStatus.BAD_REQUEST
      return ceremoniesFetcher
        .fetch(options)
        .then(response => {
          expect(response.value).toEqual([])
          done()
        })
    })

    it('rejects error when the remote service returns a 400 level error', done => {
      request.post.mockImplementation((config, cb) => {
        cb(null, mockRemoteResponse)
      })
      mockRemoteResponse.statusCode = HttpStatus.BAD_REQUEST
      return ceremoniesFetcher
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
      return ceremoniesFetcher
        .fetch(options)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toBeInstanceOf(errors.RemoteServiceError)
          done()
        })
    })
  })
})
