const uuid = require('uuid')
const {getMockedCallArgument} = require('test/helpers/jest')
const TermsAndConditionService = require('api/esign/v1/termsAndConditions/accept/service')
const termsAndConditionsAcceptor = require('api/esign/v1/termsAndConditions/accept/termsAndConditionsAcceptor')
termsAndConditionsAcceptor.accept = jest.fn()

describe('Terms and Conditions Accept Service', () => {
  const testPolicies = [{
    policyNumber: uuid.v4(),
  }, {
    policyNumber: uuid.v4(),
  }, {
    policyNumber: uuid.v4(),
  }]
  const additionalTestHeaders = {
    [uuid.v4()]: uuid.v4(),
  }
  describe('Default behavior', () => {
    beforeAll(async () => {
      await TermsAndConditionService.accept({
        policies: testPolicies,
        additionalHeaders: additionalTestHeaders,
      })
    })

    it('calls the terms and conditions acceptor for each policy', () => {
      expect(termsAndConditionsAcceptor.accept)
        .toHaveBeenCalledTimes(testPolicies.length)
    })

    it('calls the termsAndConditionsAcceptor policy and additionalHeaders', () => {
      expect(getMockedCallArgument(termsAndConditionsAcceptor.accept.mock, 0, 0))
        .toMatchObject({
          policy: testPolicies[0],
          additionalHeaders: additionalTestHeaders,
        })
    })
  })

  describe('Error cases', () => {
    it('Fails when you do not pass policies', async () => {
      await expect(TermsAndConditionService.accept({
        additionalHeaders: additionalTestHeaders,
      })).rejects.toBeDefined()
    })

    it('Fails when policies is not an array', async () => {
      await expect(TermsAndConditionService.accept({
        policies: {},
        additionalHeaders: additionalTestHeaders,
      })).rejects.toBeDefined()
    })

    it('Fails when you do not pass anything', async () => {
      await expect(TermsAndConditionService.accept()).rejects.toBeDefined()
    })
  })
})

afterAll(() => {
  jest.resetAllMocks()
  jest.resetModules()
})
