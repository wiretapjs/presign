
import uuid from 'uuid'
import { context } from 'test/helpers/jest'
import { getQueryParamsFromUrl } from 'test/helpers/url'
import documentsService from 'lib/services/documents'
import fetchApi from 'lib/services/fetch/fetchApi'

jest.mock('lib/services/fetch/fetchApi', () => {
  return {
    request: jest.fn(() => {}),
  }
})

const getCalledResource = function () {
  return fetchApi.request.mock.calls[0][0]
}

describe('DocumentsService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getEsignCount', () => {
    it('calls the documents esign count resource', () => {
      const options = { transactionIds: [uuid.v4()] }
      documentsService.getEsignCount(options)
      const calledResource = getCalledResource()
      expect(calledResource).toContain('/api/documents/v1/esign/count')
    })

    context('with no options', () => {
      it('throws an error', async () => {
        const serviceCall = documentsService.getEsignCount()
        await expect(serviceCall).rejects.toBeDefined()
      })
    })

    context('with no transaction IDs', () => {
      it('throws an error', async () => {
        const serviceCall = documentsService.getEsignCount({})
        await expect(serviceCall).rejects.toBeDefined()
      })
    })

    context('with a single transaction ID', () => {
      it('should send the specified policyNumber as a query param', () => {
        const options = { transactionIds: uuid.v4() }
        documentsService.getEsignCount(options)
        const calledResource = getCalledResource()
        const queryParams = getQueryParamsFromUrl(calledResource)
        expect(queryParams.transactionId).toBe(options.transactionIds)
      })
    })

    context('with multiple transaction IDs', () => {
      const expectedTransactionIds = [uuid.v4(), uuid.v4()]
      const options = { transactionIds: expectedTransactionIds }
      documentsService.getEsignCount(options)
      const calledResource = getCalledResource()
      const queryParams = getQueryParamsFromUrl(calledResource)
      expect(queryParams.transactionId).toEqual(expectedTransactionIds)
    })
  })
})
