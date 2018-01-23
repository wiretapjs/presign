const bpmService = require('lib/bpm-service')

const mockSuccessfulBpmGet = function (mockResponse) {
  bpmService.get.mockImplementation(() => {
    return Promise.resolve(mockResponse)
  })
}

const mockFailedBpmGet = function (mockError) {
  bpmService.get.mockImplementation(() => {
    return Promise.reject(mockError)
  })
}

const getOptionsPassedToBpmGet = function () {
  return bpmService.get.mock.calls[0][0]
}

module.exports = {
  get: {
    getPassedOptions: getOptionsPassedToBpmGet,
    mockFailure: mockFailedBpmGet,
    mockSuccess: mockSuccessfulBpmGet,
  },
}
