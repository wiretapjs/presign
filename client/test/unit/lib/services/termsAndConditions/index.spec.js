import fetchApi from 'lib/services/fetch/fetchApi'
import termsAndConditionsService from 'lib/services/termsAndConditions'

jest.mock('lib/services/fetch/fetchApi', () => {
  return {
    request: jest.fn(() => {}),
  }
})

const RequestBody = {
  policies: [{
    packageId: '1bf36cc1-004f-4dc4-8f33-6af19d8ef9bd',
    policyNumber: 'AOS28103563340',
  }],
}

const getCalledResource = function () {
  return fetchApi.request.mock.calls[0][0]
}

// const getCalledConfig = function () {
//   return fetchApi.request.mock.calls[0][1]
// }

describe('Terms and Condition Service', () => {
  describe('Post Sessions', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('calls the request method on the fetch api with the sessions resource', () => {
      termsAndConditionsService.acceptTerms(RequestBody)
      expect(getCalledResource()).toEqual(`${termsAndConditionsService.resource}`)
    })
    // it('calls the body', () => {
    //   termsAndConditionsService.acceptTerms(RequestBody)
    //   expect(getCalledConfig()).toEqual({body: RequestBody})
    // })
    it('should throw an error if there is no body', () => {
      expect(() => termsAndConditionsService.acceptTerms()).toThrow()
    })
  })
})
