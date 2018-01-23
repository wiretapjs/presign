import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const HttpStatus = require('http-status-codes')
const uuid = require('uuid')
const httpMocks = require('test/helpers/http-mocks')
const controller = require('api/policies/controller')
const listService = require('api/policies/v1/list')
const summaryService = require('api/policies/v1/summary')
const RepositoryResultEnvelope = require('models/resultEnvelope')

jest.mock('api/policies/v1/list', () => {
  return {
    fetch: jest.fn(),
  }
})

jest.mock('api/policies/v1/summary', () => {
  return {
    fetch: jest.fn(),
  }
})

describe('Get Policies', () => {
  let mockRequest,
    mockResponse
  const setupMocks = () => {
    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: '/api/ceremonies/v1',
      query: {
        [uuid.v4()]: uuid.v4(),
      },
      headers: {
        [uuid.v4()]: uuid.v4(),
      },
    })
    mockResponse = httpMocks.createResponse()
  }

  describe('List call', () => {
    beforeEach((done) => {
      setupMocks()
      listService.fetch.mockImplementation(() => {
        return Promise.resolve(RepositoryResultEnvelope.Success())
      })
      controller.listPolicies(mockRequest, mockResponse, () => {})
      mockResponse.on('end', () => {
        done()
      })
    })

    it('calls fetch on the v1List service', () => {
      // ...mock.calls[0][0] returns the first param of the first call to the mock
      expect(listService.fetch.mock.calls[0][0]).toMatchObject({
        filters: mockRequest.query,
        additionalHeaders: mockRequest.headers,
      })
    })
  })

  describe('Success Result handling', () => {
    const testValue = {
      [uuid.v4()]: uuid.v4(),
    }
    const testHeaders = {
      [uuid.v4()]: uuid.v4(),
    }
    beforeEach((done) => {
      setupMocks()
      listService.fetch.mockImplementation(() => {
        return Promise.resolve(RepositoryResultEnvelope.Success(
          testValue, {
            responseHeaders: testHeaders,
          }))
      })
      controller.listPolicies(mockRequest, mockResponse, () => {})
      mockResponse.on('end', () => {
        done()
      })
    })
    it('merges the additionalHeaders from the result envelope', () => {
      expect(mockResponse._getHeaders()).toMatchObject(testHeaders)
    })
    it('It responds with the value from the result envelope', () => {
      expect(JSON.parse(mockResponse._getData())).toMatchObject(testValue)
    })
    it(`It responds with a ${HttpStatus.OK}`, () => {
      expect(mockResponse.statusCode).toEqual(HttpStatus.OK)
    })
  })

  describe('Error handling', () => {
    const testValue = {
      remoteStatusCode: uuid.v4(),
    }
    const testHeaders = {
      [uuid.v4()]: uuid.v4(),
    }
    let next
    beforeEach((done) => {
      setupMocks()
      listService.fetch.mockImplementation(() => {
        return Promise.reject(RepositoryResultEnvelope.Error(
          testValue, {
            responseHeaders: testHeaders,
          }))
      })
      next = jest.fn(() => {
        done()
      })
      controller.listPolicies(mockRequest, mockResponse, next)
    })

    it('merges the additionalHeaders from the result envelope', () => {
      expect(mockResponse._getHeaders()).toMatchObject(testHeaders)
    })

    it('It calls next', () => {
      expect(next).toHaveBeenCalled()
    })
  })
})

describe('Get Policy Summary', () => {
  let mockRequest,
    mockResponse

  const fakePolicyNumber = 'H1234567'

  const setupMocks = () => {
    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: `/api/policies/v1/${fakePolicyNumber}`,
      headers: {
        [uuid.v4()]: uuid.v4(),
      },
    })
    mockResponse = httpMocks.createResponse()
  }

  describe('Summary call', () => {
    beforeEach((done) => {
      setupMocks()
      summaryService.fetch.mockImplementation(() => {
        return Promise.resolve(RepositoryResultEnvelope.Success())
      })
      controller.getPolicySummary(mockRequest, mockResponse, () => {})
      mockResponse.on('end', () => {
        done()
      })
    })

    it('calls fetch on the v1 summary service', () => {
      // ...mock.calls[0][0] returns the first param of the first call to the mock
      expect(summaryService.fetch.mock.calls[0][0]).toMatchObject({
        additionalHeaders: mockRequest.headers,
      })
    })
  })

  describe('Success Result handling', () => {
    const testValue = {
      [uuid.v4()]: uuid.v4(),
    }
    const testHeaders = {
      [uuid.v4()]: uuid.v4(),
    }
    beforeEach((done) => {
      setupMocks()
      summaryService.fetch.mockImplementation(() => {
        return Promise.resolve(RepositoryResultEnvelope.Success(
          testValue, {
            responseHeaders: testHeaders,
          }))
      })
      controller.getPolicySummary(mockRequest, mockResponse, () => {})
      mockResponse.on('end', () => {
        done()
      })
    })
    it('merges the additionalHeaders from the result envelope', () => {
      expect(mockResponse._getHeaders()).toMatchObject(testHeaders)
    })
    it('It responds with the value from the result envelope', () => {
      expect(JSON.parse(mockResponse._getData())).toMatchObject(testValue)
    })
    it(`It responds with a ${HttpStatus.OK}`, () => {
      expect(mockResponse.statusCode).toEqual(HttpStatus.OK)
    })
  })

  describe('Error handling', () => {
    const testValue = {
      remoteStatusCode: uuid.v4(),
    }
    const testHeaders = {
      [uuid.v4()]: uuid.v4(),
    }
    let next
    beforeEach((done) => {
      setupMocks()
      summaryService.fetch.mockImplementation(() => {
        return Promise.reject(RepositoryResultEnvelope.Error(
          testValue, {
            responseHeaders: testHeaders,
          }))
      })
      next = jest.fn(() => {
        done()
      })
      controller.getPolicySummary(mockRequest, mockResponse, next)
    })

    it('merges the additionalHeaders from the result envelope', () => {
      expect(mockResponse._getHeaders()).toMatchObject(testHeaders)
    })

    it('It calls next', () => {
      expect(next).toHaveBeenCalled()
    })
  })
})
