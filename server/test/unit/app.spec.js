import { setServerEnvironment } from 'test/helpers/environment'
const request = require('supertest')
setServerEnvironment('development')
const app = require('app')
const uuid = require('uuid')
const HttpStatus = require('http-status-codes')

// Full on integration tests
describe('Test the root path', () => {
  test('It should send response for the GET method', () => {
    return request(app).get('/').then(response => {
      expect(response.statusCode).toBe(HttpStatus.OK)
    })
  })
})

describe('Test the /newrelic.js path', () => {
  test('It should send response for the GET method when New Relic is defined', () => {
    return request(app).get('/newrelic.js').then(response => {
      expect(response.statusCode).toBe(HttpStatus.OK)
    })
  })
})

describe('Test the /api path', () => {
  test('It should send 404 for an unknown api path', () => {
    return request(app)
      .get(`/api/${uuid.v4()}`).then(response => {
        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND)
      })
  })
})
