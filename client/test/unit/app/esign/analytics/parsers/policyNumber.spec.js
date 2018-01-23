import policyNumber from 'app/esign/analytics/parsers/policyNumber'
import uuid from 'uuid/v4'

describe('Parser for policy number', () => {
  it('returns policy number if exists', () => {
    const eSignSession =
    {
      policyNumber: uuid(),
    }

    const result = policyNumber(eSignSession)

    expect(result).toBe(eSignSession.policyNumber)
  })
  it('returns null if not exists', () => {
    const sessionsObject = [{ }]

    const result = policyNumber(sessionsObject[0])

    expect(result).toBe(null)
  })
})
