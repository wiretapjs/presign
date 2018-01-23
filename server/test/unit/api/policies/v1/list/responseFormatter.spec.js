const ResponseFormatter = require('api/policies/v1/list/responseFormatter')
const Policy = require('models/policy')

describe('List Service Response Formatter', () => {
  const createPolicyMock = (ratingMethod = Policy.RatingMethods.MANUAL,
    lineOfBusiness = [Policy.LinesOfBusiness.HOME]) => {
    return {
      manualOrComputer: ratingMethod,
      lineOfBusiness,
    }
  }

  describe('Filter rating method', () => {
    let policies, formattedResponse, ratingMethod

    beforeAll(() => {
      ratingMethod = Policy.RatingMethods.MANUAL
      policies = [
        createPolicyMock(Policy.RatingMethods.MANUAL, Policy.LinesOfBusiness.HOME),
        createPolicyMock(Policy.RatingMethods.COMPUTER, Policy.LinesOfBusiness.HOME),
      ]
      formattedResponse = ResponseFormatter.format({ratingMethod}, policies)
    })

    it('filters out policies with rating methods that do not match the given rating method', () => {
      formattedResponse.forEach((policy) => {
        expect(policy.manualOrComputer).toEqual(ratingMethod)
      })
    })
  })

  describe('Filter line of business', () => {
    let policies, formattedResponse, linesOfBusiness

    it('filters out policies with rating methods that do not match the given rating method', () => {
      linesOfBusiness = [Policy.RatingMethods.HOME]
      policies = [
        createPolicyMock(Policy.RatingMethods.MANUAL, Policy.LinesOfBusiness.HOME),
        createPolicyMock(Policy.RatingMethods.COMPUTER, Policy.LinesOfBusiness.HOME),
        createPolicyMock(Policy.RatingMethods.COMPUTER, Policy.LinesOfBusiness.AUTO),
      ]
      formattedResponse = ResponseFormatter.format({linesOfBusiness}, policies)
      formattedResponse.forEach((policy) => {
        expect(linesOfBusiness).toContain(policy.lineOfBusiness)
      })
    })

    it('supports passing multiple lines of business', () => {
      linesOfBusiness = [Policy.RatingMethods.HOME, Policy.RatingMethods.HOME]
      policies = [
        createPolicyMock(Policy.RatingMethods.MANUAL, Policy.LinesOfBusiness.HOME),
        createPolicyMock(Policy.RatingMethods.COMPUTER, Policy.LinesOfBusiness.HOME),
        createPolicyMock(Policy.RatingMethods.COMPUTER, Policy.LinesOfBusiness.AUTO),
        createPolicyMock(Policy.RatingMethods.COMPUTER, Policy.LinesOfBusiness.LIFE),
      ]
      formattedResponse = ResponseFormatter.format({linesOfBusiness}, policies)
      formattedResponse.forEach((policy) => {
        expect(linesOfBusiness).toContain(policy.lineOfBusiness)
      })
    })
  })
})
