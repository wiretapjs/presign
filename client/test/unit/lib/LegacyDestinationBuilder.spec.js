import LegacyDestinationBuilder from 'lib/destination/LegacyDestinationBuilder'
import { context } from 'test/helpers/jest'
import { getHostnameFromUrl, getQueryParamsFromUrl, setQueryString } from 'test/helpers/url'
import config from 'app/config'
import createEnvironmentConfig from 'test/helpers/environments'

describe('LegacyDestinationBuilder', () => {
  let builder
  let subject

  beforeEach(() => {
    createEnvironmentConfig()
  })

  context('without pbDest', () => {
    beforeEach(() => {
      setQueryString('?')
      builder = new LegacyDestinationBuilder()
    })

    context('with config.environment set to production', () => {
      beforeEach(() => {
        config.environment = 'production'
        subject = builder.build()
      })

      it('returns a link with the production sub-domain', () => {
        expect(getHostnameFromUrl(subject)).toBe('prodmapping.libertymutual.com')
      })
    })

    context('with config.environment set to a non-prod environment', () => {
      beforeEach(() => {
        config.environment = 'test'
        subject = builder.build()
      })

      it('returns a link with the uat subdomain', () => {
        expect(getHostnameFromUrl(subject)).toBe('uat-uatmapping.libertymutual.com')
      })
    })
  })

  context('with pbDest === prod', () => {
    beforeEach(() => {
      setQueryString('?pbDest=prod')
      builder = new LegacyDestinationBuilder()
      subject = builder.build()
    })

    it('returns a link with the production sub-domain', () => {
      expect(getHostnameFromUrl(subject)).toBe('prodmapping.libertymutual.com')
    })
  })

  context('with pbDest === 2pr', () => {
    beforeEach(() => {
      setQueryString('?pbDest=2pr')
      builder = new LegacyDestinationBuilder()
      subject = builder.build()
    })

    it('returns a link with the production sub-domain', () => {
      expect(getHostnameFromUrl(subject)).toBe('2prmapping.libertymutual.com')
    })
  })

  context('with pbDest set to a non-prod environment', () => {
    beforeEach(() => {
      setQueryString('?pbDest=uat')
      builder = new LegacyDestinationBuilder()
      subject = builder.build()
    })

    it('returns a link with the matching sub-domain', () => {
      expect(getHostnameFromUrl(subject)).toBe('uat-uatmapping.libertymutual.com')
    })
  })

  describe('withAuthenticatedDestination', () => {
    it('returns a links with "insurance" in the path', () => {
      const subject = new LegacyDestinationBuilder().withAuthenticatedDestination().build()
      const pattern = new RegExp(/.+\/insurance\/url\?.*/)
      expect(pattern.test(subject)).toBe(true)
    })
  })

  describe('withHandstamp', () => {
    context('without an src parameter', () => {
      beforeEach(() => {
        setQueryString('?foo=bar')
      })

      it('does not add an src parameter', () => {
        const subject = new LegacyDestinationBuilder().withHandstamp('blah').build()
        expect(getQueryParamsFromUrl(subject)).toEqual({ foo: 'bar' })
      })
    })

    context('with an src parameter', () => {
      beforeEach(() => {
        setQueryString('?src=blah&foo=bar')
      })

      it('stamps the src parameter with -pb if no suffix is given', () => {
        const subject = new LegacyDestinationBuilder().withHandstamp().build()
        expect(getQueryParamsFromUrl(subject)).toEqual({
          foo: 'bar',
          src: 'blah-pb',
        })
      })

      it('stamps the src parameter with -pb-suffix if a suffix is given', () => {
        const subject = new LegacyDestinationBuilder().withHandstamp('hi').build()
        expect(getQueryParamsFromUrl(subject)).toEqual({
          foo: 'bar',
          src: 'blah-pb-hi',
        })
      })
    })
  })

  describe('withQueryParamModifier', () => {
    it('uses the given modifier to alter the query params', () => {
      setQueryString('?a=b&c=d')

      const modifier = params => {
        params.a = 'd'
      }

      const subject = new LegacyDestinationBuilder().withQueryParamModifier(modifier).build()
      expect(getQueryParamsFromUrl(subject)).toEqual({
        a: 'd',
        c: 'd',
      })
    })
  })
})
