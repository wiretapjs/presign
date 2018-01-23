const eventEmitter = require('events').EventEmitter
const httpMocks = require('node-mocks-http')

const createRequest = httpMocks.createRequest

const createResponse = function () {
  const response = httpMocks.createResponse({ eventEmitter })
  response.append = jest.fn(() => [])
  return response
}

module.exports = {
  createRequest,
  createResponse,
}
