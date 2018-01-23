import { context } from 'test/helpers/jest'
import { capitalize } from 'lib/string'

describe('string', () => {
  describe('capitalize', () => {
    context('with an undefined input', () => {
      it('throws an error', () => {
        expect(() => capitalize()).toThrow(new Error('Undefined input'))
      })
    })

    context('with a one character input', () => {
      it('returns the same character, but capitalized', () => {
        expect(capitalize('a')).toBe('A')
      })
    })

    context('with a multi-character input', () => {
      it('returns the input, but with the first character as an upper-case character', () => {
        expect(capitalize('abcdEFG')).toBe('AbcdEFG')
      })
    })
  })
})
