export const setServerEnvironment = function (environmentName) {
  process.env.APP_ENVIRONMENT = environmentName
}

export const unsetServerEnvironment = function () {
  delete process.env.APP_ENVIRONMENT
}
