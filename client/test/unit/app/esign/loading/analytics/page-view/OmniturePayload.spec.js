import OmniturePayload from 'app/esign/loading/analytics/page-view/OmniturePayload'
import uuid from 'uuid'

const expectedStaticPayload = {
  applicationID: 'eSign',
  siteSection: 'Policy',
  siteCode: 'PM-ES',
  TileName: 'esignE1',
  platformTrigram: 'ERW',
  'confirm.service': 'ServiceComplete',
  'confirm.eSign': 'eSignStart',
  eSignSession: 'eSign',
  loginStatus: 'New',
  eSignIntent: 'eSign',
}

const fakeSessions = [
  {
    policyNumber: 'foo',
  },
  {
    policyNumber: 'foo',
  },
  {
    policyNumber: uuid.v4(),
  },
]

describe('E1 Omniture Payload', () => {
  let payload

  beforeAll(() => {
    payload = new OmniturePayload(fakeSessions)
  })

  it('should have the expected static fields', () => {
    Object.keys(expectedStaticPayload).forEach((key) => {
      expect(payload[key]).toBe(expectedStaticPayload[key])
    })
  })

  it('should return the number of unique policies in the eSignSessions object', () => {
    expect(payload.eSignDetail).toBe(2)
  })

  it('should return the unique policy numbers from the eSignSessions object as a comma-separated string', () => {
    expect(payload.policies).toEqual(`${fakeSessions[0].policyNumber},${fakeSessions[2].policyNumber}`)
  })
})
