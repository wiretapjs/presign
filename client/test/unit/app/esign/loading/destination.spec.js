import getESignLoadingDestination from 'app/esign/loading/destination'
import { getQueryParamsFromUrl } from 'test/helpers/url'
import createEnvironmentConfig from 'test/helpers/environments'

createEnvironmentConfig()

describe('ESignLoadingDestinationBuilder', () => {
  it('builds with proper uri', () => {
    const subject = getESignLoadingDestination()
    expect(getQueryParamsFromUrl(subject).uri).toBe('esign')
  })

  it('builds an authenticated destination', () => {
    const subject = getESignLoadingDestination()
    const pattern = new RegExp(/.+\/insurance\/url\?.*/)
    expect(pattern.test(subject)).toBe(true)
  })
  it('adds eSignReg parms', () => {
    const subject = getESignLoadingDestination()
    expect(getQueryParamsFromUrl(subject).origin).toBe('eSignReg')
  })
})
