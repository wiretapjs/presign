import { context } from 'test/helpers/jest'
import QueryParams from 'lib/util//QueryParams'

describe('QueryParams', () => {
  context('with nothing appended', () => {
    it('returns an empty string', () => {
      const params = new QueryParams()
      expect(params.toString()).toBe('')
    })
  })

  context('with multiple single-value params', () => {
    it('returns a standard query string', () => {
      const params = new QueryParams()
      params.append('foo', 'bar')
      params.append('biz', 'baz')
      expect(params.toString()).toBe('foo=bar&biz=baz')
    })
  })

  context('with one defined and one undefined param value', () => {
    it('returns a query string that only contains the defined param', () => {
      const params = new QueryParams()
      params.append('foo', 'bar')
      params.append('biz', undefined)
      expect(params.toString()).toBe('foo=bar')
    })
  })

  context('with a multi-value param', () => {
    it('returns a query string with multiple key-value pairs for the given param', () => {
      const params = new QueryParams()
      params.append('foo', 'bar')
      params.append('foo', 'baz')
      expect(params.toString()).toBe('foo=bar&foo=baz')
    })
  })

  context('with an undefined param name', () => {
    it('throws an error', () => {
      const params = new QueryParams()
      const faultyAppend = () => params.append(undefined, 'bar')
      expect(faultyAppend).toThrow()
    })
  })
})
