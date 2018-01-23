const merge = require('lodash.merge')
let environmentConfig

try {
  environmentConfig = require(`./${process.env.APP_ENVIRONMENT}.config.js`)
} catch (e) {
  throw new Error(`Could not load environment config: ${process.env.APP_ENVIRONMENT}`)
}

const defaultConfig = {
  services: {
    eServiceLegacy: {
      url: 'https://uat-service.libertymutual.com',
    },
  },
}

module.exports = merge(defaultConfig, environmentConfig)
