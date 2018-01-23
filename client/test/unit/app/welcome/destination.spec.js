import { context } from 'test/helpers/jest'
import createEnvironmentConfig from 'test/helpers/environments'
import { getHostnameFromUrl, getQueryParamsFromUrl, setQueryString } from 'test/helpers/url'
import getWelcomeDestination from 'app/welcome/destination'
import config from 'app/config'
import Variant from 'app/experiments/Variant'

describe('getWelcomeDestination', () => {
  beforeEach(() => {
    createEnvironmentConfig()
  })

  context('with no src query parameter', () => {
    beforeEach(() => {
      setQueryString('?')
    })

    it('does not add an src query parameter to the returned link', () => {
      const subject = getWelcomeDestination(new Variant('base'))
      expect(getQueryParamsFromUrl(subject).src).toBeUndefined()
    })
  })

  context('with an src query parameter', () => {
    beforeEach(() => {
      setQueryString('?src=foo')
    })

    context('with the base experience', () => {
      it('appends -pb-base to the src query parameter of the returned link', () => {
        const subject = getWelcomeDestination(new Variant('base'))
        expect(getQueryParamsFromUrl(subject).src).toBe('foo-pb-base')
      })
    })

    context('with a token that triggers the treatment A experience', () => {
      it('appends -pb-a to the src query parameter of the returned link', () => {
        const subject = getWelcomeDestination(new Variant('a'))
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
        const subject = getWelcomeDestination(new Variant('base'))
        expect(getHostnameFromUrl(subject)).toBe('prodmapping.libertymutual.com')
      })
    })

    context('with config.environment set to a non-prod environment', () => {
      beforeEach(() => {
        config.environment = 'test'
      })

      it('returns a link with the uat subdomain', () => {
        const subject = getWelcomeDestination(new Variant('base'))
        expect(getHostnameFromUrl(subject)).toBe('uat-uatmapping.libertymutual.com')
      })
    })
  })

  context('with pbDest === prod', () => {
    beforeEach(() => {
      setQueryString('?pbDest=prod')
    })

    it('returns a link with the production sub-domain', () => {
      const subject = getWelcomeDestination(new Variant('base'))
      expect(getHostnameFromUrl(subject)).toBe('prodmapping.libertymutual.com')
    })
  })

  context('with pbDest === 2pr', () => {
    beforeEach(() => {
      setQueryString('?pbDest=2pr')
    })

    it('returns a link with the production sub-domain', () => {
      const subject = getWelcomeDestination(new Variant('base'))
      expect(getHostnameFromUrl(subject)).toBe('2prmapping.libertymutual.com')
    })
  })

  context('with pbDest set to a non-prod environment', () => {
    beforeEach(() => {
      setQueryString('?pbDest=uat')
    })

    it('returns a link with the matching sub-domain', () => {
      const subject = getWelcomeDestination(new Variant('base'))
      expect(getHostnameFromUrl(subject)).toBe('uat-uatmapping.libertymutual.com')
    })
  })

  context('with non-PB query params', () => {
    context('with a pbUri query parameter', () => {
      beforeEach(() => {
        setQueryString('?pbUri=fizz&foo=bar&baz=buzz')
      })

      it('returns a link that retains the non-PB params and changes pbUri to uri', () => {
        const subject = getWelcomeDestination(new Variant('base'))
        expect(getQueryParamsFromUrl(subject)).toEqual({
          uri: 'fizz',
          foo: 'bar',
          baz: 'buzz',
        })
      })
    })

    context('without a pbUri query parameter', () => {
      beforeEach(() => {
        setQueryString('?foo=bar&baz=buzz')
      })

      it('returns a link that retains the non-PB params', () => {
        const subject = getWelcomeDestination(new Variant('base'))
        expect(getQueryParamsFromUrl(subject)).toEqual({
          foo: 'bar',
          baz: 'buzz',
        })
      })
    })
  })

  context('with only PB query params', () => {
    context('with a pbUri query parameter', () => {
      beforeEach(() => {
        setQueryString('?pbUri=foo&pbDest=bar')
      })

      it('returns a link that changes pbUri to uri', () => {
        const subject = getWelcomeDestination(new Variant('base'))
        expect(getQueryParamsFromUrl(subject)).toEqual({
          uri: 'foo',
        })
      })
    })

    context('without a pbUri query parameter', () => {
      beforeEach(() => {
        setQueryString('?pbDest=bar')
      })

      it('returns a link with no query params', () => {
        const subject = getWelcomeDestination(new Variant('base'))
        expect(getQueryParamsFromUrl(subject)).toEqual({})
      })
    })
  })
})
