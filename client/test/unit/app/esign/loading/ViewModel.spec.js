import _ from 'lodash'
import policyService from 'lib/services/policies'
import sessionsService from 'lib/services/sessions'
import termsAndConditionsService from 'lib/services/termsAndConditions'
import { COMPLETE_STATUS, default as ViewModel } from 'app/esign/loading/ViewModel'
import {termsAndConditionsError} from 'app/data/errors'

const DEAFAULT_NUMBER_OF_ESIGN_DOCS = 8
const DEAFAULT_NUMBER_OF_PSM_DOCS = 1

const DEFAULT_SIGNABLE_CEREMONIES = [
  {
    policyNumber: 'AOS28103563340',
    ceremonyStatus: 'esigned',
  },
  {
    policyNumber: 'AOS28103563640',
    ceremonyStatus: 'sent',
  }]

const SESSION_RESPONSE = [{
  eSignSession: [{
    signerSession: [{
      namedInsuredNumber: '1',
      esignatureUrl: 'https://sandbox.e-signlive.com/access?sessionToken=YmI3Mjg4OTYtNmJjOS00M2I4LWFjYTUtZjE1ODUyMmFkNWQw',
    }],
    numPrintSignMailDocs: '1',
    numSignOnlineDocs: '4',
    numDisclosureDocs: '7',
  }],
  packageId: '1bf36cc1-004f-4dc4-8f33-6af19d8ef9bd',
  policyNumber: 'AOS28103563340',
  ceremonyStatus: 'esigned',
  signerCount: 1,
}, {
  eSignSession: [{
    signerSession: [{
      namedInsuredNumber: '1',
      esignatureUrl: 'https://sandbox.e-signlive.com/access?sessionToken=NzY2NTRhM2YtZGQzNS00NTk5LWEwNTktMmU0YmNhYmM2NTlk',
    }],
    numSignOnlineDocs: '4',
    numDisclosureDocs: '7',
  }],
  packageId: '60caa18a-fabb-4521-b98c-69ed4465772f',
  policyNumber: 'AOS28103563640',
  ceremonyStatus: 'sent',
  signerCount: 1,
}, {
  eSignSession: [{
    signerSession: [{
      namedInsuredNumber: '1',
      esignatureUrl: 'https://sandbox.e-signlive.com/access?sessionToken=NzY2NTRhM2YtZGQzNS00NTk5LWEwNTktMmU0YmNhYmM2NTlk',
    }],
    numSignOnlineDocs: '4',
    numDisclosureDocs: '7',
  }],
  packageId: '60caa18a-fabb-4521-b98c-69ed4465772f',
  policyNumber: 'AOS28103563640',
  ceremonyStatus: 'complete',
  signerCount: 1,
}]

const getSummaryResponse = function (policyNumber) {
  return {
    policyNumber: 'H6728101194975',
    policyStatus: 'Active',
    policyEffectiveDate: '2017-12-12',
    policyExpirationDate: '2018-12-12',
    policyJurisdiction: 'KY',
    policyType: 'CONDO',
    twelveMonthPolicyIndicator: true,
    agreementId: 'b5OQscmwrRAOL7veGNISbRuATqI3WcA8yIcv+KuKIPo=',
  }
}

const setupSessions = (response = SESSION_RESPONSE) => {
  sessionsService.getUpdatedSessions = jest.fn(async () => {
    return response
  })
}

const setupPolicySummaries = () => {
  policyService.getUpdatedSummary = jest.fn(async (policyNumber) => {
    return getSummaryResponse(policyNumber)
  })
}

termsAndConditionsService.acceptTerms = jest.fn()

const getCalledTermsAndConditionsService = () => {
  return termsAndConditionsService.acceptTerms.mock.calls[0]
}

describe('ESignLoadingViewModel', () => {
  beforeAll(() => {
    setupPolicySummaries()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Black box tests', () => {
    describe('Create ViewModel', () => {
      let vm
      beforeAll(async () => {
        setupSessions()
        vm = await ViewModel.create()
      })
      it('Creates a ViewModel with sessions', async () => {
        expect(vm).toBeInstanceOf(ViewModel)
      })
      it('Only includes incomplete sessions', () => {
        vm.eSignSessions.forEach((session) => {
          expect(session.ceremonyStatus).not.toBe(COMPLETE_STATUS)
        })
      })
    })
    describe('Constructor', () => {
      it('Should throw an error when sessions is not supplied', () => {
        expect(() => new ViewModel({ policySummaries: ['foo'] })).toThrow('Missing required option sessions.')
      })
      it('should throw an error when policy summaries are not supplied', () => {
        expect(() => new ViewModel({ sessions: ['foo'] })).toThrow('Missing required option policySummaries.')
      })
      it('Should not throw an error when empty arrays are passed into options', () => {
        expect(new ViewModel({ policySummaries: [], sessions: [] })).toBeInstanceOf(ViewModel)
      })
    })
    describe('ViewModel fields', () => {
      it('should have multiple signers', async () => {
        const response = _.cloneDeep(SESSION_RESPONSE)
        _.set(response, '[0].signerCount', 2)
        setupSessions(response)
        const vm = await ViewModel.create()
        expect(vm.hasMultipleSigners).toBe(true)
      })
      it('should not have multiple signers', async () => {
        setupSessions(SESSION_RESPONSE)
        const vm = await ViewModel.create()
        expect(vm.hasMultipleSigners).toBe(false)
      })
      it('should have number of documents to eSign', async () => {
        setupSessions(SESSION_RESPONSE)
        const vm = await ViewModel.create()
        expect(vm.numberOfEsignDocs).toEqual(DEAFAULT_NUMBER_OF_ESIGN_DOCS)
      })
      it('should default to zero documents to eSign', async () => {
        setupSessions([])
        const vm = await ViewModel.create()
        expect(vm.numberOfEsignDocs).toEqual(0)
      })
      it('should have number of documents to print sign mail', async () => {
        setupSessions(SESSION_RESPONSE)
        const vm = await ViewModel.create()
        expect(vm.numberOfPrintSignMailDocs).toEqual(DEAFAULT_NUMBER_OF_PSM_DOCS)
      })
      it('should default to zero documents to print sign mail', async () => {
        setupSessions([])
        const vm = await ViewModel.create()
        expect(vm.numberOfPrintSignMailDocs).toEqual(0)
      })
      it('should have sign-able policy numbers', async () => {
        setupSessions(SESSION_RESPONSE)
        const vm = await ViewModel.create()
        expect(vm.signableCeremonies).toEqual(DEFAULT_SIGNABLE_CEREMONIES)
      })
      it('should default to empty sign-able policy numbers', async () => {
        setupSessions([])
        const vm = await ViewModel.create()
        expect(vm.signableCeremonies).toEqual([])
      })
      it('should have a list of policy summary objects for each policy', async () => {
        setupSessions(SESSION_RESPONSE)
        const expectedSummaries = SESSION_RESPONSE.map((session) => {
          return getSummaryResponse(session.policyNumber)
        })
        const vm = await ViewModel.create()
        expect(vm.policySummaries).toEqual(expectedSummaries)
      })
    })
    describe('canEsign', () => {
      it('calls canEsign when viewModel.canEsign is called without error', async () => {
        const response = _.cloneDeep(SESSION_RESPONSE)
        _.set(response, '[0]eSignSession[0].signerSession[1]', {namedInsuredNumber: '2'})
        setupSessions(response)
        const vm = await ViewModel.create()
        await vm.canEsign
      })
    })
    describe('Accept terms And Conditions', () => {
      it('should not call terms the terms and conditions service if already accepted', async () => {
        const response = _.cloneDeep(SESSION_RESPONSE)
        _.set(response, '[1]ceremonyStatus', 'accepted')
        setupSessions(response)
        const vm = await ViewModel.create()
        vm.acceptTermsAndConditions()
        expect(termsAndConditionsService.acceptTerms).not.toHaveBeenCalled()
      })
      it('should call terms and conditions service if a ceremony is ready', async () => {
        const response = _.cloneDeep(SESSION_RESPONSE)
        _.set(response, '[0]ceremonyStatus', 'ready')
        _.set(response, '[1]ceremonyStatus', 'esigned')
        setupSessions(response)
        const vm = await ViewModel.create()
        vm.acceptTermsAndConditions()
        const policyNumber = _.get(response, '[0]policyNumber')
        const packageId = _.get(response, '[0]packageId')
        expect(getCalledTermsAndConditionsService()).toEqual([[{
          packageId,
          policyNumber,
        }]])
      })
      it('should invalidate the sessions object after accepting terms and condition', async () => {
        setupSessions(SESSION_RESPONSE)
        const vm = await ViewModel.create()
        const response = _.cloneDeep(SESSION_RESPONSE)
        const ceremonyStatusUpdate = 'esigned'
        _.set(response, '[1]ceremonyStatus', ceremonyStatusUpdate)
        setupSessions(response)
        const newVm = await vm.acceptTermsAndConditions()
        expect(_.get(newVm.eSignSessions, '[1]ceremonyStatus')).toEqual(ceremonyStatusUpdate)
      })
      it('should throw terms and condition error if ceremonies did not update to accepting terms and conditions', async () => {
        expect.assertions(1)
        setupSessions(SESSION_RESPONSE)
        const vm = await ViewModel.create()
        const response = _.cloneDeep(SESSION_RESPONSE)
        const ceremonyStatusUpdate = 'ready'
        _.set(response, '[1]ceremonyStatus', ceremonyStatusUpdate)
        setupSessions(response)
        await expect(vm.acceptTermsAndConditions()).rejects.toEqual(termsAndConditionsError)
      })

      it('should call terms and conditions service if a ceremony is sent', async () => {
        setupSessions(SESSION_RESPONSE)
        const vm = await ViewModel.create()
        vm.acceptTermsAndConditions()
        const policyNumber = _.get(SESSION_RESPONSE, '[1]policyNumber')
        const packageId = _.get(SESSION_RESPONSE, '[1]packageId')
        expect(getCalledTermsAndConditionsService()).toEqual([[{
          packageId,
          policyNumber,
        }]])
      })
      it('should have two items in an array if there are two ceremonies that have not accepted conditions', async () => {
        const response = _.cloneDeep(SESSION_RESPONSE)
        _.set(response, '[0]ceremonyStatus', 'ready')
        setupSessions(response)
        const vm = await ViewModel.create()
        vm.acceptTermsAndConditions()
        const policyNumber0 = _.get(response, '[0]policyNumber')
        const packageId0 = _.get(response, '[0]packageId')
        const policyNumber1 = _.get(response, '[1]policyNumber')
        const packageId1 = _.get(response, '[1]packageId')
        expect(getCalledTermsAndConditionsService()).toEqual([[
          { packageId: packageId0,
            policyNumber: policyNumber0,
          },
          {
            packageId: packageId1,
            policyNumber: policyNumber1,
          },
        ]])
      })
    })
  })
})
