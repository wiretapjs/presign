import uuid from 'uuid'
import OmniturePayload from 'app/esign/document/analytics/page-view/OmniturePayload'

describe('OmniturePayload', () => {
  const fakeEsignSession =
  {
    policyNumber: uuid(),
    signerCount: 2,
  }

  const fakeJurisdiction = 'CA'

  const result = new OmniturePayload(fakeEsignSession, fakeJurisdiction)

  it('parses signer count into a string', () => {
    expect(result.policySigners).toBe(String(fakeEsignSession.signerCount))
  })

  it('parses policy number', () => {
    expect(result.policies).toBe(fakeEsignSession.policyNumber)
  })

  it('sets jurisdiction to the given value', () => {
    expect(result.jurisdiction).toBe(fakeJurisdiction)
  })
})
