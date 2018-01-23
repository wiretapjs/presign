const service = require('api/documents/v1/esign/count')
const uuid = require('uuid/v4')

describe('Count esign document service', () => {
  describe('Get document count', () => {
    it('Returns a count of all douments for one eSign session when given transaction ID(s)', () => {
      const sessionsObject = {
        eSignSession: [
          {
            numSignOnlineDocs: 1,
            signerSession: [
              {
                namedInsuredNumber: 1,
              },
              {
                namedInsuredNumber: 2,
              },
            ],
          },
        ],
        policyNumber: uuid(),
        packageId: uuid(),
      }

      const sessions = sessionsObject.eSignSession

      const transactionIds = uuid()
      const options = { transactionIds }
      expect.assertions(1)
      return expect(service.getDocumentCount(sessions, options)).resolves.toEqual(1)
    })

    it('Returns a count of all douments for multiple eSign sessions when given transaction ID(s)', () => {
      const sessionsObject = {
        eSignSession: [
          {
            signerSession: [
              {
                namedInsuredNumber: 1,
              },
              {
                namedInsuredNumber: 2,
              },
            ],
            numSignOnlineDocs: 1,
          },
          {
            signerSession: [
              {
                namedInsuredNumber: 1,
              },
              {
                namedInsuredNumber: 2,
              },
            ],
            numSignOnlineDocs: 1,
          },
        ],
        policyNumber: uuid(),
        packageId: uuid(),
      }

      const sessions = sessionsObject.eSignSession

      const transactionIds = uuid()
      const options = { transactionIds }
      expect.assertions(1)
      return expect(service.getDocumentCount(sessions, options)).resolves.toEqual(2)
    })

    it('Returns a count of zero douments for one eSign session when given transaction ID(s) and the session has no documents property', () => {
      const sessionsObject = {
        eSignSession: [
          {
            signerSession: [
              {
                namedInsuredNumber: 1,
              },
              {
                namedInsuredNumber: 2,
              },
            ],
          },
        ],
        policyNumber: uuid(),
        packageId: uuid(),
      }

      const sessions = sessionsObject.eSignSession

      const transactionIds = uuid()
      const options = { transactionIds }
      expect.assertions(1)
      return expect(service.getDocumentCount(sessions, options)).resolves.toEqual(0)
    })

    // need tests for when different numSignDocs (example) do not exist, should count as "0"

    it('Should return error message when transactionIds is not present', () => {
      const options = {}
      expect.assertions(1)
      return expect(service.getDocumentCount([], options)).rejects.toEqual(Error('Transaction ID is required'))
    })

    it('Should return error message when sessions is not present', () => {
      const transactionIds = uuid()
      const options = { transactionIds }
      expect.assertions(1)
      return expect(service.getDocumentCount(undefined, options)).rejects.toEqual(Error('Sessions is required'))
    })
  })
})
