import hasValidSignersCount from 'app/esign/filters/sessions/hasValidSignersCount'

describe('Filter has Valid Signers Count', () => {
  it('false if signerCount not supplied', () => {
    const sessionsObject = [
      {
        eSignSession: [
          {
            signerSession: [
              { namedInsuredNumber: 1 },
              { namedInsuredNumber: 2 },
            ],
            numSignOnlineDocs: '3',
            numPrintSignMailDocs: '0',
          }, {
            signerSession: [
              { namedInsuredNumber: 1 },
              { namedInsuredNumber: 2 },
            ],
            numSignOnlineDocs: '5',
            numPrintSignMailDocs: '0',
          },
        ],
      },
    ]

    const result = hasValidSignersCount(sessionsObject)

    expect(result).toBe(false)
  })

  it('false if 2 signers', () => {
    const sessionsObject = [
      {
        eSignSession: [
          {
            signerSession: [
              { namedInsuredNumber: 1 },
              { namedInsuredNumber: 2 },
            ],
            numSignOnlineDocs: '3',
            numPrintSignMailDocs: '0',
          }, {

            signerSession: [
              { namedInsuredNumber: 1 },
              { namedInsuredNumber: 2 },
            ],
            numSignOnlineDocs: '5',
            numPrintSignMailDocs: '0',
          },
        ],
        signerCount: 2,
      },
    ]

    const result = hasValidSignersCount(sessionsObject)

    expect(result).toBe(false)
  })

  it('true if 1 signer', () => {
    const sessionsObject = [
      {
        eSignSession: [
          {
            signerSession: [
              { namedInsuredNumber: 1 },
              { namedInsuredNumber: 2 },
            ],
            numSignOnlineDocs: '3',
            numPrintSignMailDocs: '0',
          }, {
            signerSession: [
              { namedInsuredNumber: 1 },
              { namedInsuredNumber: 2 },
            ],
            numSignOnlineDocs: '5',
            numPrintSignMailDocs: '0',
          },
        ],
        signerCount: 1,
      },
    ]

    const result = hasValidSignersCount(sessionsObject)

    expect(result).toBe(true)
  })
})
