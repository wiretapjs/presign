import config from 'app/config'

export const isTestEnvironment = function () {
  return ['localhost', 'development', 'test'].includes(config.environment)
}
