import hasValidEsignPrintSignMail from 'app/esign/filters/sessions/hasValidEsignPrintSignMail'

describe('Filter has Valid Print Doc Count', () => {
  describe('Single session', () => {
    it('false if > 0 print sign documents', () => {
      const sessionsObject = [
        {
          eSignSession: [
            {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '0',
              numPrintSignMailDocs: '1',
            }, {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '0',
              numPrintSignMailDocs: '1',
            },
          ],
        },
      ]

      const result = hasValidEsignPrintSignMail(sessionsObject)

      expect(result).toBe(false)
    })

    it('true if 0 with print documents', () => {
      const sessionsObject = [
        {
          eSignSession: [
            {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '3',
              numPrintSignMailDocs: '0',
            }, {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '5',
              numPrintSignMailDocs: '0',
            },
          ],
        },
      ]

      const result = hasValidEsignPrintSignMail(sessionsObject)

      expect(result).toBe(true)
    })
  })

  describe('Multiple sessions', () => {
    it('false if > 0 print sign documents', () => {
      const sessionsObject = [
        {
          eSignSession: [
            {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '0',
              numPrintSignMailDocs: '0',
            }, {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '0',
              numPrintSignMailDocs: '0',
            },
          ],
        },
        {
          eSignSession: [
            {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '0',
              numPrintSignMailDocs: '1',
            }, {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '0',
              numPrintSignMailDocs: '1',
            },
          ],
        },
      ]

      const result = hasValidEsignPrintSignMail(sessionsObject)

      expect(result).toBe(false)
    })

    it('true if 0 with print documents', () => {
      const sessionsObject = [
        {
          eSignSession: [
            {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '1',
              numPrintSignMailDocs: '0',
            }, {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '2',
              numPrintSignMailDocs: '0',
            },
          ],
        },
        {
          eSignSession: [
            {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '3',
              numPrintSignMailDocs: '0',
            }, {
              signerSession: [
                { namedInsuredNumber: 1 },
              ],
              numSignOnlineDocs: '5',
              numPrintSignMailDocs: '0',
            },
          ],
        },
      ]
      const result = hasValidEsignPrintSignMail(sessionsObject)

      expect(result).toBe(true)
    })
  })
})
