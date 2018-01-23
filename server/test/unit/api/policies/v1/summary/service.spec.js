import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const uuid = require('uuid')
const HttpStatus = require('http-status-codes')
const v1SummaryService = require('api/policies/v1/summary')
const ResultEnvelope = require('models/resultEnvelope')
const errors = require('models/errors')
const bpmMocks = require('test/helpers/bpm-service-mocks')

jest.mock('lib/bpm-service')

const createFetchOptions = () => {
  return {
    policyNumber: fakePolicyNumber,
    additionalHeaders: {
      [uuid.v4()]: uuid.v4(),
      cookie: uuid.v4(),
    },
  }
}

const fakePolicyNumber = 'H1234567'
const fakeJurisdiction = 'ME'

describe('Policy Summary Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('YB request options', () => {
    let formattedRequest
    let summaryOptions

    beforeEach(async () => {
      summaryOptions = createFetchOptions()
      bpmMocks.get.mockSuccess({ statusCode: HttpStatus.OK })
      await v1SummaryService.fetch(summaryOptions)
      formattedRequest = bpmMocks.get.getPassedOptions()
    })

    it('Should have the resource as the url', () => {
      expect(formattedRequest.url).toEqual(v1SummaryService.getResource(fakePolicyNumber))
    })

    it('Should pass the headers through', async () => {
      expect(formattedRequest.headers).toEqual(summaryOptions.additionalHeaders)
    })

    it('Should set body to undefined', () => {
      expect(formattedRequest.body).toEqual(undefined)
    })
  })

  describe('Default behavior for summarize policy', () => {
    const mockRemoteResponse = {
      statusCode: HttpStatus.OK,
      body: {
        policyNumber: `${fakePolicyNumber}     `, // Yes, this is a realistic YB response
        policyStatus: '',
        policyEffectiveDate: '2017-12-12',
        policyExpirationDate: '2018-12-12',
        policyJurisdiction: fakeJurisdiction,
        policyType: 'CONDO',
        twelveMonthPolicyIndicator: true,
        agreementId: 'b5OQscmwrRAOL7veGNISbRuATqI3WcA8yIcv+KuKIPo=',
      },
    }

    beforeEach(() => {
      bpmMocks.get.mockSuccess(mockRemoteResponse)
      v1SummaryService.fetch(createFetchOptions())
    })

    it('should return the policy summary from the remote service, with a trimmed policy number', done => {
      const expectedResponse = Object.assign(
        {},
        mockRemoteResponse.body,
        { policyNumber: fakePolicyNumber },
      )

      v1SummaryService.fetch(createFetchOptions())
        .then(result => {
          expect(result.value).toEqual(expectedResponse)
          done()
        })
    })
  })

  describe('Error cases for policy summary service', () => {
    let summaryOptions,
      mockRemoteResponse

    beforeEach(() => {
      mockRemoteResponse = {
        statusCode: HttpStatus.OK,
        body: {
          policyList: [uuid.v4()],
        },
      }
      bpmMocks.get.mockSuccess(mockRemoteResponse)
      summaryOptions = createFetchOptions()
    })

    it('rejects with an invalid request exception when policy number is missing', done => {
      const invalidOptions = Object.assign({}, summaryOptions)
      delete invalidOptions.policyNumber

      v1SummaryService
        .fetch(invalidOptions)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err.value).toBeInstanceOf(errors.InvalidRequestError)
          done()
        })
    })

    it('rejects error when the BPM service returns an error', done => {
      const fakeError = new Error(uuid.v4())
      bpmMocks.get.mockFailure(fakeError)

      v1SummaryService
        .fetch(summaryOptions)
        .then(result => { throw new Error('Expected promise to reject') })
        .catch(err => {
          expect(err).toEqual(ResultEnvelope.Error(fakeError))
          done()
        })
    })
  })
})
