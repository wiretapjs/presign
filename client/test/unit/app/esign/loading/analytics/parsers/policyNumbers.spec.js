import uuid from 'uuid'
import { context } from 'test/helpers/jest'
import parsers from 'app/esign/loading/analytics/parsers'

describe('parse policy numbers', () => {
  context('with unique policies', () => {
    it('returns the all of the policy numbers', () => {
      const fakeSessions = [
        { policyNumber: uuid.v4() },
        { policyNumber: uuid.v4() },
        { policyNumber: uuid.v4() },
      ]

      expect(parsers.policyNumbers(fakeSessions)).toEqual([
        fakeSessions[0].policyNumber,
        fakeSessions[1].policyNumber,
        fakeSessions[2].policyNumber,
      ])
    })
  })

  context('with duplicate policies', () => {
    it('returns the number of unique policies', () => {
      const fakeSessions = [
        { policyNumber: 'foo' },
        { policyNumber: uuid.v4() },
        { policyNumber: 'foo' },
      ]

      expect(parsers.policyNumbers(fakeSessions)).toEqual([
        fakeSessions[0].policyNumber,
        fakeSessions[1].policyNumber,
      ])
    })
  })
})
