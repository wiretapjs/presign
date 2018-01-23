import { context } from 'test/helpers/jest'
import createEnvironmentConfig from 'test/helpers/environments'
import getConfirmationDestination from 'app/esign/confirmation/destination'

describe('getConfirmationDestination', () => {
  beforeEach(() => {
    createEnvironmentConfig()
  })

  context('run', () => {
    it('does not add an src query parameter to the returned link', () => {
      const value = getConfirmationDestination()
      expect(value).toBe(
        'https://uat-uatmapping.libertymutual.com/PmInternetContentServiceWeb/insurance/url?dest=welcome&uri=esign',
      )
    })
  })
})
