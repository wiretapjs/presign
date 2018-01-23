import config from 'app/config'

const createEnvironmentConfig = function () {
  config.environment = 'development'
  config.libertySubDomainMapping = {
    dev: 'devmapping',
    test: 'testmapping',
    uat: 'uatmapping',
    perf: 'perfmapping',
    ete: 'etemapping',
    prod: 'prodmapping',
    '2pr': '2prmapping',
  }
}

export default createEnvironmentConfig
