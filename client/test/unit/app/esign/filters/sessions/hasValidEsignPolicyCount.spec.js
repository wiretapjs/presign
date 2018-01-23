import hasValidEsignPolicyCount from 'app/esign/filters/sessions/hasValidEsignPolicyCount'

describe('Filter has Valid Print Doc Count', () => {
  it('returns true if policies to sign is 1', () => {
    const sessionsObject = [
      {
        eSignSession: [
          {
            signerSession: [
              { namedInsuredNumber: 1 },
            ],
            numSignOnlineDocs: '3',
            numPrintSignMailDocs: '0',
          },
        ],
        signerCount: 1,
        policyNumber: 5,
      },
    ]
    const result = hasValidEsignPolicyCount(sessionsObject)
    expect(result).toBe(true)
  })

  it('returns false if policies to sign > 1', () => {
    const sessionsObject = [
      {
        eSignSession: [
          {
            signerSession: [
              { namedInsuredNumber: 1 },
            ],
            numSignOnlineDocs: '3',
            numPrintSignMailDocs: '0',
          },
        ],
        signerCount: 1,
        policyNumber: 5,
      },
      {
        eSignSession: [
          {
            signerSession: [
              { namedInsuredNumber: 1 },
            ],
            numSignOnlineDocs: '3',
            numPrintSignMailDocs: '0',
          },
        ],
        signerCount: 1,
        policyNumber: 4,
      },
    ]
    const result = hasValidEsignPolicyCount(sessionsObject)

    expect(result).toBe(false)
  })

  it('returns true if multiple sessions for one policy', () => {
    const sessionsObject = [
      {
        eSignSession: [
          {
            signerSession: [
              { namedInsuredNumber: 1 },
            ],
            numSignOnlineDocs: '3',
            numPrintSignMailDocs: '0',
          },
        ],
        signerCount: 1,
        policyNumber: 5,
      },
      {
        eSignSession: [
          {
            signerSession: [
              { namedInsuredNumber: 1 },
            ],
            numSignOnlineDocs: '3',
            numPrintSignMailDocs: '0',
          },
        ],
        signerCount: 1,
        policyNumber: 5,
      },
    ]
    const result = hasValidEsignPolicyCount(sessionsObject)

    expect(result).toBe(true)
  })
})
