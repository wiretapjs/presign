const request = require('request')
const uuid = require('uuid')
const HttpStatus = require('http-status-codes')
const Url = require('url-parse')
const bpmService = require('lib/bpm-service')
const RemoteServiceError = require('models/errors/remoteService')
const config = require('../../../config')

jest.mock('request')

let fakeRequestConfig
let formattedRequest

const fakeBpmResponse = {
  statusCode: HttpStatus.OK,
  body: {
    [uuid.v4()]: uuid.v4(),
  },
}

describe('BPM service', () => {
  beforeEach(() => {
    request.mockImplementation((options, cb) => {
      formattedRequest = options
      cb(null, fakeBpmResponse)
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('invoke', () => {
    beforeEach(() => {
      fakeRequestConfig = {
        method: uuid.v4(),
        url: uuid.v4(),
        headers: {
          [uuid.v4()]: uuid.v4(),
        },
      }
    })

    describe('happy path', () => {
      it('should call request', async () => {
        await bpmService.invoke(fakeRequestConfig)
        expect(request).toHaveBeenCalledTimes(1)
      })

      it('should pass the method into request', async () => {
        await bpmService.invoke(fakeRequestConfig)
        expect(formattedRequest.method).toBe(fakeRequestConfig.method)
      })

      it('should set json to true in the request config if json is not passed in', async () => {
        await bpmService.invoke(fakeRequestConfig)
        expect(formattedRequest.json).toBe(true)
      })

      it('should pass the given json value into request, if a value is supplied', async () => {
        const requestConfig = {
          url: uuid.v4(),
          headers: {
            [uuid.v4()]: uuid.v4(),
          },
          json: false,
        }
        await bpmService.invoke(requestConfig)
        expect(formattedRequest.json).toBe(requestConfig.json)
      })

      it('should set proxy to config.proxy in the request config if proxy is not passed in', async () => {
        await bpmService.invoke(fakeRequestConfig)
        expect(formattedRequest.proxy).toBe(config.proxy)
      })

      it('should pass the given proxy value into request, if a value is supplied', async () => {
        const fakeProxy = uuid.v4()
        const requestConfig = {
          url: uuid.v4(),
          headers: {
            [uuid.v4()]: uuid.v4(),
          },
          proxy: fakeProxy,
        }
        await bpmService.invoke(requestConfig)
        expect(formattedRequest.proxy).toBe(fakeProxy)
      })

      it('should set the host header to the expected BPM value and pass other headers intact', async () => {
        const expectedHeaders = Object.assign(
          {},
          fakeRequestConfig.headers,
          { host: new Url(fakeRequestConfig.url).host },
        )
        await bpmService.invoke(fakeRequestConfig)
        expect(formattedRequest.headers).toEqual(expectedHeaders)
      })

      it('should resolve with the raw response', async () => {
        const actualResponse = await bpmService.invoke(fakeRequestConfig)
        expect(actualResponse).toEqual(fakeBpmResponse)
      })
    })

    describe('error cases', () => {
      it('should reject if request resolves with an err value', async () => {
        const fakeErr = uuid.v4()
        request.mockImplementation((options, cb) => {
          formattedRequest = options
          cb(fakeErr, fakeBpmResponse)
        })

        const invokeCall = bpmService.invoke(fakeRequestConfig)
        await expect(invokeCall).rejects.toBeDefined()
      })

      it('should reject if request resolves with a 400-level or higher status code', async () => {
        const fakeBadResponse = {
          statusCode: HttpStatus.FORBIDDEN,
          body: {
            [uuid.v4()]: uuid.v4(),
          },
        }

        request.mockImplementation((options, cb) => {
          formattedRequest = options
          cb(null, fakeBadResponse)
        })

        const invokeCall = bpmService.invoke(fakeRequestConfig)
        await expect(invokeCall).rejects.toBeInstanceOf(RemoteServiceError)
      })

      it('should reject if request resolves with an error field in the response body', async () => {
        const fakeBadResponse = {
          statusCode: HttpStatus.OK,
          body: {
            error: uuid.v4(),
          },
        }

        request.mockImplementation((options, cb) => {
          formattedRequest = options
          cb(null, fakeBadResponse)
        })

        const invokeCall = bpmService.invoke(fakeRequestConfig)
        await expect(invokeCall).rejects.toBeInstanceOf(RemoteServiceError)
      })
    })
  })

  describe('get', () => {
    beforeEach(() => {
      fakeRequestConfig = {
        url: uuid.v4(),
        headers: {
          [uuid.v4()]: uuid.v4(),
        },
      }
    })

    describe('happy path', () => {
      it('should call request', async () => {
        await bpmService.get(fakeRequestConfig)
        expect(request).toHaveBeenCalledTimes(1)
      })

      it('should pass the method into request', async () => {
        await bpmService.get(fakeRequestConfig)
        expect(formattedRequest.method).toBe('GET')
      })

      it('should set json to true in the request.get config if json is not passed in', async () => {
        await bpmService.get(fakeRequestConfig)
        expect(formattedRequest.json).toBe(true)
      })

      it('should pass the given json value into request.get, if a value is supplied', async () => {
        const requestConfig = {
          url: uuid.v4(),
          headers: {
            [uuid.v4()]: uuid.v4(),
          },
          json: false,
        }
        await bpmService.get(requestConfig)
        expect(formattedRequest.json).toBe(false)
      })

      it('should set proxy to config.proxy in the request.get config if proxy is not passed in', async () => {
        await bpmService.get(fakeRequestConfig)
        expect(formattedRequest.proxy).toBe(config.proxy)
      })

      it('should pass the given proxy value into request.get, if a value is supplied', async () => {
        const fakeProxy = uuid.v4()
        const requestConfig = {
          url: uuid.v4(),
          headers: {
            [uuid.v4()]: uuid.v4(),
          },
          proxy: fakeProxy,
        }
        await bpmService.get(requestConfig)
        expect(formattedRequest.proxy).toBe(fakeProxy)
      })

      it('should set the host header to the expected BPM value and pass other headers intact', async () => {
        const expectedHeaders = Object.assign(
          {},
          fakeRequestConfig.headers,
          { host: new Url(fakeRequestConfig.url).host },
        )
        await bpmService.get(fakeRequestConfig)
        expect(formattedRequest.headers).toEqual(expectedHeaders)
      })

      it('should resolve with the raw response', async () => {
        const actualResponse = await bpmService.get(fakeRequestConfig)
        expect(actualResponse).toEqual(fakeBpmResponse)
      })
    })

    describe('error cases', () => {
      it('should reject if request.get resolves with an err value', async () => {
        const fakeErr = uuid.v4()
        request.mockImplementation((options, cb) => {
          formattedRequest = options
          cb(fakeErr, fakeBpmResponse)
        })

        const getCall = bpmService.get(fakeRequestConfig)
        await expect(getCall).rejects.toBeInstanceOf(RemoteServiceError)
      })

      it('should reject if request.get resolves with a 400-level or higher status code', async () => {
        const fakeBadResponse = {
          statusCode: HttpStatus.FORBIDDEN,
          body: {
            [uuid.v4()]: uuid.v4(),
          },
        }

        request.mockImplementation((options, cb) => {
          formattedRequest = options
          cb(null, fakeBadResponse)
        })

        const getCall = bpmService.get(fakeRequestConfig)
        await expect(getCall).rejects.toBeInstanceOf(RemoteServiceError)
      })

      it('should reject if request.get resolves with an error field in the response body', async () => {
        const fakeBadResponse = {
          statusCode: HttpStatus.OK,
          body: {
            error: uuid.v4(),
          },
        }

        request.mockImplementation((options, cb) => {
          formattedRequest = options
          cb(null, fakeBadResponse)
        })

        const getCall = bpmService.get(fakeRequestConfig)
        await expect(getCall).rejects.toBeInstanceOf(RemoteServiceError)
      })
    })
  })
})
