import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const HttpStatus = require('http-status-codes')
const uuid = require('uuid')
const v1ListService = require('api/policies/v1/list')
const errors = require('models/errors')
const _ = require('lodash')
const Policy = require('models/policy')
const ResultEnvelope = require('models/resultEnvelope')
const bpmMocks = require('test/helpers/bpm-service-mocks')

jest.mock('lib/bpm-service')

const createFetchOptions = () => {
  return {
    additionalHeaders: {
      [uuid.v4()]: uuid.v4(),
      cookie: uuid.v4(),
    },
  }
}

const createPolicyStub = (linesOfBusiness, ratingMethod) => {
  return {
    manualOrComputer: ratingMethod,
    lineOfBusiness: linesOfBusiness,
  }
}

describe('Policy List Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Request options', () => {
    let formattedRequest
    let listOptions

    beforeEach(async () => {
      listOptions = createFetchOptions()
      bpmMocks.get.mockSuccess({ statusCode: HttpStatus.OK })
      await v1ListService.fetch(listOptions)
      formattedRequest = bpmMocks.get.getPassedOptions()
    })

    it('Should have the resource as the url', async () => {
      expect(formattedRequest.url).toEqual(v1ListService.resource)
    })

    it('Should pass the headers through', async () => {
      expect(formattedRequest.headers).toEqual(listOptions.additionalHeaders)
    })

    it('Should set body to undefined', () => {
      expect(formattedRequest.body).toEqual(undefined)
    })
  })

  describe('Default behavior for list policies', () => {
    const mockRemoteResponse = {
      statusCode: HttpStatus.OK,
      body: {
        policyList: [uuid.v4()],
      },
    }

    it('should return the polices from the remote service', done => {
      bpmMocks.get.mockSuccess(mockRemoteResponse)
      v1ListService.fetch(createFetchOptions())
        .then(result => {
          expect(result.value).toEqual({
            policies: mockRemoteResponse.body.policyList,
          })
          done()
        })
    })

    it('returns an empty array when an empty array is returned from the service', done => {
      const listOptions = createFetchOptions()
      _.set(listOptions, 'filters.ratingMethod', Policy.RatingMethods.COMPUTER)
      _.set(mockRemoteResponse, 'body.policyList', [])
      mockRemoteResponse.statusCode = HttpStatus.OK

      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService.fetch(listOptions)
        .then(result => {
          expect(result.value).toEqual({policies: []})
          done()
        })
    })
  })

  describe('Error cases for policies list service', () => {
    let listOptions,
      mockRemoteResponse

    beforeEach(() => {
      mockRemoteResponse = {
        statusCode: HttpStatus.OK,
        body: {
          policyList: [uuid.v4()],
        },
      }
      listOptions = createFetchOptions()
    })

    it('rejects with an invalid request exception when invalid line of business is used', done => {
      _.set(listOptions, 'filters.linesOfBusiness', [uuid.v4()])
      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService
        .fetch(listOptions)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err.value).toBeInstanceOf(errors.InvalidRequestError)
          done()
        })
    })

    it('rejects with an invalid request when an invalid rating method is used', done => {
      _.set(listOptions, 'filters.ratingMethod', uuid.v4())
      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService
        .fetch(listOptions)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err.value).toBeInstanceOf(errors.InvalidRequestError)
          done()
        })
    })

    it('rejects error when request returns an error', done => {
      const fakeError = new Error(uuid.v4())
      bpmMocks.get.mockFailure(fakeError)

      v1ListService
        .fetch(listOptions)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toEqual(ResultEnvelope.Error(fakeError))
          done()
        })
    })
  })

  describe('Response formatting cases for list filtering', () => {
    let listOptions,
      mockRemoteResponse

    beforeEach(() => {
      listOptions = {}
      mockRemoteResponse = {}
    })

    it('Should filter the linesOfBusiness to only the requested linesOfBusiness', done => {
      _.set(listOptions, 'filters.linesOfBusiness', [Policy.LinesOfBusiness.HOME])
      _.set(mockRemoteResponse, 'body.policyList', [
        createPolicyStub(Policy.LinesOfBusiness.HOME, Policy.RatingMethods.COMPUTER),
        createPolicyStub(Policy.LinesOfBusiness.AUTO, Policy.RatingMethods.COMPUTER),
      ])
      mockRemoteResponse.statusCode = HttpStatus.OK

      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService.fetch(listOptions)
        .then(result => {
          expect(result.value).toEqual({policies: [mockRemoteResponse.body.policyList[0]]})
          done()
        })
    })

    it('returns an empty array when an empty array is returned and a lineOfBusiness is supplied', done => {
      _.set(listOptions, 'filters.linesOfBusiness', [Policy.LinesOfBusiness.HOME])
      _.set(mockRemoteResponse, 'body.policyList', [])
      mockRemoteResponse.statusCode = HttpStatus.OK

      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService.fetch(listOptions)
        .then(result => {
          expect(result.value).toEqual({policies: []})
          done()
        })
    })

    it('returns an empty array when an empty array is returned and a ratingMethod is supplied', done => {
      _.set(listOptions, 'filters.ratingMethod', Policy.RatingMethods.COMPUTER)
      _.set(mockRemoteResponse, 'body.policyList', [])
      mockRemoteResponse.statusCode = HttpStatus.OK

      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService.fetch(listOptions)
        .then(result => {
          expect(result.value).toEqual({policies: []})
          done()
        })
    })

    it('Should accept a single line of business', done => {
      _.set(listOptions, 'filters.linesOfBusiness', Policy.LinesOfBusiness.HOME)
      _.set(mockRemoteResponse, 'body.policyList', [
        createPolicyStub(Policy.LinesOfBusiness.HOME, Policy.RatingMethods.COMPUTER),
        createPolicyStub(Policy.LinesOfBusiness.AUTO, Policy.RatingMethods.COMPUTER),
      ])
      mockRemoteResponse.statusCode = HttpStatus.OK

      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService.fetch(listOptions)
        .then(result => {
          expect(result.value).toEqual({policies: [mockRemoteResponse.body.policyList[0]]})
          done()
        })
    })

    it('Should accept multiple lines of business', done => {
      _.set(listOptions, 'filters.linesOfBusiness', [Policy.LinesOfBusiness.HOME, Policy.LinesOfBusiness.AUTO])
      _.set(mockRemoteResponse, 'body.policyList', [
        createPolicyStub(Policy.LinesOfBusiness.HOME, Policy.RatingMethods.COMPUTER),
        createPolicyStub(Policy.LinesOfBusiness.AUTO, Policy.RatingMethods.COMPUTER),
        createPolicyStub(Policy.LinesOfBusiness.LIFE, Policy.RatingMethods.COMPUTER),
      ])
      mockRemoteResponse.statusCode = HttpStatus.OK

      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService.fetch(listOptions)
        .then(result => {
          expect(result.value).toEqual({policies: [
            mockRemoteResponse.body.policyList[0],
            mockRemoteResponse.body.policyList[1],
          ]})
          done()
        })
    })

    it('Should filter the ratingMethod to only the requested ratingMethod', done => {
      _.set(listOptions, 'filters.ratingMethod', Policy.RatingMethods.COMPUTER)
      _.set(mockRemoteResponse, 'body.policyList', [
        createPolicyStub(Policy.LinesOfBusiness.HOME, Policy.RatingMethods.COMPUTER),
        createPolicyStub(Policy.LinesOfBusiness.AUTO, Policy.RatingMethods.MANUAL),
      ])
      mockRemoteResponse.statusCode = HttpStatus.OK

      bpmMocks.get.mockSuccess(mockRemoteResponse)

      v1ListService.fetch(listOptions)
        .then(result => {
          expect(result.value).toEqual({policies: [mockRemoteResponse.body.policyList[0]]})
          done()
        })
    })
  })
})
