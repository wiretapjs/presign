import { getESignRegDestination, getEsignLoginDestination } from 'app/registration/destination'
import { context } from 'test/helpers/jest'
import { getHostnameFromUrl, getQueryParamsFromUrl, setQueryString } from 'test/helpers/url'
import createEnvironmentConfig from 'test/helpers/environments'
import Variant from 'app/experiments/Variant'
import config from 'app/config'

createEnvironmentConfig()

describe('getESignRegDestination', () => {
  beforeEach(() => {
    createEnvironmentConfig()
  })

  it('builds with proper uri', () => {
    const subject = getESignRegDestination()
    expect(getQueryParamsFromUrl(subject).uri).toBe('eSignReg')
  })

  context('with no src query parameter', () => {
    beforeEach(() => {
      setQueryString('?')
    })

    it('does not add an src query parameter to the returned link', () => {
      const subject = getESignRegDestination(new Variant('base'))
      expect(getQueryParamsFromUrl(subject).src).toBeUndefined()
    })
  })

  context('with an src query parameter', () => {
    beforeEach(() => {
      setQueryString('?src=foo')
    })

    context('with the base experience', () => {
      it('appends -pb-base to the src query parameter of the returned link', () => {
        const subject = getESignRegDestination(new Variant('base').name)
        expect(getQueryParamsFromUrl(subject).src).toBe('foo-pb-base')
      })
    })

    context('with a token that triggers the treatment A experience', () => {
      it('appends -pb-a to the src query parameter of the returned link', () => {
        const subject = getESignRegDestination(new Variant('a').name)
        expect(getQueryParamsFromUrl(subject).src).toBe('foo-pb-a')
      })
    })
  })

  context('without pbDest', () => {
    beforeEach(() => {
      setQueryString('?')
    })

    context('with config.environment set to production', () => {
      beforeEach(() => {
        config.environment = 'production'
      })

      it('returns a link with the production sub-domain', () => {
        const subject = getESignRegDestination(new Variant('base').name)
        expect(getHostnameFromUrl(subject)).toBe('prodmapping.libertymutual.com')
      })
    })

    context('with config.environment set to a non-prod environment', () => {
      beforeEach(() => {
        config.environment = 'test'
      })

      it('returns a link with the uat subdomain', () => {
        const subject = getESignRegDestination(new Variant('base').name)
        expect(getHostnameFromUrl(subject)).toBe('uat-uatmapping.libertymutual.com')
      })
    })
  })

  context('with pbDest === prod', () => {
    beforeEach(() => {
      setQueryString('?pbDest=prod')
    })

    it('returns a link with the production sub-domain', () => {
      const subject = getESignRegDestination(new Variant('base').name)
      expect(getHostnameFromUrl(subject)).toBe('prodmapping.libertymutual.com')
    })
  })

  context('with pbDest === 2pr', () => {
    beforeEach(() => {
      setQueryString('?pbDest=2pr')
    })

    it('returns a link with the production sub-domain', () => {
      const subject = getESignRegDestination(new Variant('base').name)
      expect(getHostnameFromUrl(subject)).toBe('2prmapping.libertymutual.com')
    })
  })

  context('with pbDest set to a non-prod environment', () => {
    beforeEach(() => {
      setQueryString('?pbDest=uat')
    })

    it('returns a link with the matching sub-domain', () => {
      const subject = getESignRegDestination(new Variant('base').name)
      expect(getHostnameFromUrl(subject)).toBe('uat-uatmapping.libertymutual.com')
    })
  })
  describe('getEsignLoginDestination', () => {
    it('builds with proper uri', () => {
      const subject = getEsignLoginDestination()
      expect(getQueryParamsFromUrl(subject).uri).toBe('esign')
    })
    it('builds an authenticated destination', () => {
      const subject = getEsignLoginDestination()
      const pattern = new RegExp(/.+\/insurance\/url\?.*/)
      expect(pattern.test(subject)).toBe(true)
    })
  })
})
