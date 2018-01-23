import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const HttpStatus = require('http-status-codes')
const request = require('request')
const uuid = require('uuid')
const acceptor = require('api/esign/v1/termsAndConditions/accept/termsAndConditionsAcceptor')
const errors = require('models/errors')
const _ = require('lodash')

jest.mock('request', () => {
  return {
    post: jest.fn(),
  }
})

const createOptions = () => {
  return {
    additionalHeaders: {
      [uuid.v4()]: uuid.v4(),
      cookie: uuid.v4(),
    },
    policy: {
      policyNumber: uuid.v4(),
      packageId: uuid.v4(),
    },
  }
}

describe('Terms and conditions acceptor', () => {
  describe('Request options', () => {
    let formattedRequest
    let options

    beforeAll(async () => {
      options = createOptions()
      request.post.mockImplementation((options, cb) => {
        formattedRequest = options
        cb(null, {statusCode: HttpStatus.OK})
      })
      await acceptor.accept(options)
    })

    it('has the resource as the url', () => {
      expect(formattedRequest.url)
        .toEqual(acceptor.getResourceForPolicy(options.policy.policyNumber))
    })

    it('Only accepts the cookie header from the additionalHeaders', () => {
      expect(formattedRequest.headers).toEqual(_.merge({
        host: acceptor.host,
      }, {
        cookie: options.additionalHeaders.cookie,
      }))
    })

    it('sets json to \'true\'', () => {
      expect(formattedRequest.json).toBe(true)
    })

    it('formats the body correctly', () => {
      expect(formattedRequest.body).toMatchObject({
        packageId: options.policy.packageId,
        eventTypeCode: acceptor.EventCodes.TERMS_ACCEPTED,
      })
    })

    it('sets the host header', () => {
      expect(formattedRequest.headers.host).toEqual(acceptor.host)
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
      options = createOptions()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('rejects error when the remote service returns a 400 level error', done => {
      request.post.mockImplementation((config, cb) => {
        cb(null, mockRemoteResponse)
      })
      mockRemoteResponse.statusCode = HttpStatus.BAD_REQUEST
      acceptor
        .accept(options)
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
      acceptor
        .accept(options)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toBeInstanceOf(errors.RemoteServiceError)
          done()
        })
    })

    it('rejects when the policyNumber is not set', done => {
      delete options.policy.policyNumber
      acceptor
        .accept(options)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toBeInstanceOf(errors.ValidationError)
          done()
        })
    })

    it('rejects when the packageId is not set', done => {
      delete options.policy.packageId
      acceptor
        .accept(options)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toBeInstanceOf(errors.ValidationError)
          done()
        })
    })

    it('rejects when no options are passed', done => {
      acceptor
        .accept()
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toBeInstanceOf(errors.ValidationError)
          done()
        })
    })
  })
})
