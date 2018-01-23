import { context } from 'test/helpers/jest'
import query from 'lib/query'

describe('query', () => {
  describe('get', () => {
    context('with an empty query string', () => {
      beforeEach(() => {
        Object.defineProperty(window.location, 'search', {
          value: '',
          writable: true,
        })
      })

      it('returns undefined', () => {
        expect(query.get('foo')).toBeUndefined()
      })
    })

    context('with a query string that does not match the requested param', () => {
      beforeEach(() => {
        Object.defineProperty(window.location, 'search', {
          value: '?fizz=buzz',
          writable: true,
        })
      })

      it('returns undefined', () => {
        expect(query.get('foo')).toBeUndefined()
      })
    })

    context('with a query string with a single match of the requested param', () => {
      beforeEach(() => {
        Object.defineProperty(window.location, 'search', {
          value: '?fizz=buzz&foo=bar',
          writable: true,
        })
      })

      it('returns the string value of the requested param', () => {
        expect(query.get('foo')).toBe('bar')
      })
    })

    context('with a query string with multiple matches of the requested param', () => {
      beforeEach(() => {
        Object.defineProperty(window.location, 'search', {
          value: '?foo=bar&fizz=buzz&foo=baz',
          writable: true,
        })
      })

      it('returns an array with the values of the requested param', () => {
        expect(query.get('foo')).toEqual(['bar', 'baz'])
      })
    })
  })
})
