import { isTestEnvironment } from 'app/experiments/configHelpers'
import config from 'app/config'

describe('isTestEnvironment', () => {
  beforeEach(() => {
    config.environment = ''
  })
  it('should return true when environment is localhost', () => {
    config.environment = 'localhost'
    expect(isTestEnvironment()).toBe(true)
  })
  it('should return true when environment is development', () => {
    config.environment = 'test'
    expect(isTestEnvironment()).toBe(true)
  })
  it('should return true when environment is test', () => {
    config.environment = 'development'
    expect(isTestEnvironment()).toBe(true)
  })
  it('should return false when environment is staging', () => {
    config.environment = 'staging'
    expect(isTestEnvironment()).toBe(false)
  })
  it('should return false when environment is production', () => {
    config.environment = 'production'
    expect(isTestEnvironment()).toBe(false)
  })
})
