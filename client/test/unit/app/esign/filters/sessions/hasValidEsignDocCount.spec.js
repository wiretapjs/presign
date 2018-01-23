import hasValidEsignDocCount from 'app/esign/filters/sessions/hasValidEsignDocCount'

describe('Filter has Valid Esign Doc Count', () => {
  describe('Single session', () => {
    it('false if 0 eSign documents', () => {
      const sessionsObject = [
        {
          eSignSession: [
            { numSignOnlineDocs: '0', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '0', numPrintSignMailDocs: '2' },
          ],
        },
      ]

      const result = hasValidEsignDocCount(sessionsObject)

      expect(result).toBe(false)
    })

    it('true if > 0 with 1 esign documents', () => {
      const sessionsObject = [
        {
          eSignSession: [
            { numSignOnlineDocs: '1', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '2', numPrintSignMailDocs: '2' },
          ],
        },
      ]

      const result = hasValidEsignDocCount(sessionsObject)

      expect(result).toBe(true)
    })
  })

  describe('Multiple sessions', () => {
    it('false if 0 eSign documents', () => {
      const sessionsObject = [
        {
          eSignSession: [
            { numSignOnlineDocs: '0', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '0', numPrintSignMailDocs: '2' },
          ],
        },
        {
          eSignSession: [
            { numSignOnlineDocs: '0', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '0', numPrintSignMailDocs: '2' },
          ],
        },
      ]

      const result = hasValidEsignDocCount(sessionsObject)

      expect(result).toBe(false)
    })

    it('true if > 0 with 1 esign documents', () => {
      const sessionsObject = [
        {
          eSignSession: [
            { numSignOnlineDocs: '0', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '0', numPrintSignMailDocs: '2' },
          ],
        },
        {
          eSignSession: [
            { numSignOnlineDocs: '2', numPrintSignMailDocs: '2' },
            { numSignOnlineDocs: '2', numPrintSignMailDocs: '2' },
          ],
        },
      ]

      const result = hasValidEsignDocCount(sessionsObject)

      expect(result).toBe(true)
    })
  })
})
