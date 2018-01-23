import uuid from 'uuid'
import { context } from 'test/helpers/jest'
import parsers from 'app/esign/loading/analytics/parsers'

describe('parse number of policies', () => {
  context('with unique policies', () => {
    it('returns the number of policies', () => {
      const fakeSessions = [
        { policyNumber: uuid.v4() },
        { policyNumber: uuid.v4() },
        { policyNumber: uuid.v4() },
      ]

      expect(parsers.numberOfPolicies(fakeSessions)).toBe(3)
    })
  })

  context('with duplicate policies', () => {
    it('returns the number of unique policies', () => {
      const fakeSessions = [
        { policyNumber: 'foo' },
        { policyNumber: uuid.v4() },
        { policyNumber: 'foo' },
      ]

      expect(parsers.numberOfPolicies(fakeSessions)).toBe(2)
    })
  })
})
