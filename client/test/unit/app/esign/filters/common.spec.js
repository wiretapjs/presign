import {getDocumentCountByDocType, canEsign} from 'app/esign/filters/common'
import { docTypes } from 'app/data/esignConstants'

describe('esign filters common', () => {
  describe('getDocumentCountByDocType', () => {
    it('filters documents by PRINT_SIGN_MAIL type', () => {
      const sessionsObject = [
        {
          eSignSession: [
            { numSignOnlineDocs: '3', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '3', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '4' },
          ],
          signerCount: 1,
          ceremonyStatus: 'accepted',
        },
      ]

      const result = getDocumentCountByDocType(sessionsObject, docTypes.PRINT_SIGN_MAIL)

      expect(result).toBe(4)
    })

    it('filters documents by ESIGN type', () => {
      const sessionsObject = [
        {
          eSignSession: [
            { numSignOnlineDocs: '3', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '3', numPrintSignMailDocs: '2' },
          ],
          signerCount: 1,
          ceremonyStatus: 'accepted',
        },
      ]

      const result = getDocumentCountByDocType(sessionsObject, docTypes.ESIGN)

      expect(result).toBe(6)
    })
  })

  describe('canEsign', () => {
    it('returns true when doc count > 1 and no print sign', () => {
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
          ceremonyStatus: 'accepted',
        },
      ]

      const result = canEsign(sessionsObject)

      expect(result).toBe(true)
    })

    it('returns false when print sign', () => {
      const sessionsObject = [
        {
          eSignSession: [
            {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '3',
              numPrintSignMailDocs: '1',
            },
          ],
          signerCount: 1,
          policyNumber: 5,
        },
      ]

      const result = canEsign(sessionsObject)

      expect(result).toBe(false)
    })
  })

  it('returns false when more than one policy is trying to sign', () => {
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
        ceremonyStatus: 'accepted',
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
        ceremonyStatus: 'accepted',
      },
    ]

    const result = canEsign(sessionsObject)

    expect(result).toBe(false)
  })

  it('returns false when more than one session', () => {
    const sessionsObject = [
      {
        eSignSession: [],
        signerCount: 1,
        ceremonyStatus: 'accepted',
      },
      {
        eSignSession: [],
        signerCount: 1,
        ceremonyStatus: 'accepted',
      },
    ]

    const result = canEsign(sessionsObject)

    expect(result).toBe(false)
  })
})
