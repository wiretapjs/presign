import OmniturePayload from 'app/esign/confirmation/analytics/page-view/OmniturePayload'

const fakePolicyNumber = 'ABCD1'
const fakeJurisdiction = 'CA'

describe('OmniturePayload', () => {
  let subject

  beforeEach(() => {
    subject = new OmniturePayload(fakePolicyNumber, fakeJurisdiction)
  })

  it('has the currently signing policy number as "policies"', () => {
    expect(subject.policies).toBe(fakePolicyNumber)
  })

  it('has jurisdiction for the policy currently being signed', () => {
    expect(subject.jurisdiction).toBe(fakeJurisdiction)
  })

  it('has TileName set to "esignE3"', () => {
    expect(subject.TileName).toBe('esignE3')
  })

  it('has "confirm.policyLoop" set to "PolicyLoopComplete"', () => {
    expect(subject['confirm.policyLoop']).toBe('PolicyLoopComplete')
  })

  it('has "confirm.eSign" set to "eSignComplete"', () => {
    expect(subject['confirm.eSign']).toBe('eSignComplete')
  })
})
