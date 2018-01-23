import config from 'app/config'

const getEnvironmentFromUrl = function () {
  const url = window.location.href

  if (url.includes('localhost') || url.includes('welcome-insurance-local')) {
    return 'localhost'
  } else if (url.includes('development')) {
    return 'development'
  } else if (url.includes('staging')) {
    return 'staging'
  } else if (url.includes('test')) {
    return 'test'
  } else {
    return 'production'
  }
}

class Environment {
  run () {
    config.environment = getEnvironmentFromUrl()

    config.libertySubDomainMapping = {
      dev: 'service',
      test: 'service',
      uat: 'service',
      perf: 'service',
      ete: 'eservice',
      prod: 'eservice',
      '2pr': 'eservice',
    }
  }
}

export default new Environment()
