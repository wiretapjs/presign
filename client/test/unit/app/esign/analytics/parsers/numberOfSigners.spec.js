import numberOfSigners from 'app/esign/analytics/parsers/numberOfSigners'
import uuid from 'uuid/v4'

describe('Parser for policy number', () => {
  it('returns policy number if exists', () => {
    const eSignSession = {
      signerCount: uuid(),
    }

    const result = numberOfSigners(eSignSession)

    expect(result).toBe(eSignSession.signerCount)
  })

  it('returns 0 when signerCount property exists and has a value of 0', () => {
    const eSignSession = {
      signerCount: 0,
    }

    const result = numberOfSigners(eSignSession)

    expect(result).toBe(0)
  })

  it('returns null if not exists', () => {
    const eSignSession = {}

    const result = numberOfSigners(eSignSession)

    expect(result).toBe(null)
  })
})
