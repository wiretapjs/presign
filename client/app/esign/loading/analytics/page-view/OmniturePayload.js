import parsers from '../parsers'

export default class {
  constructor (eSignSessions) {
    this.applicationID = 'eSign'
    this.siteSection = 'Policy'
    this.siteCode = 'PM-ES'
    this.TileName = 'esignE1'
    this.platformTrigram = 'ERW'
    this['confirm.eSign'] = 'eSignStart'
    this['confirm.service'] = 'ServiceComplete'
    this.eSignSession = 'eSign'
    this.loginStatus = 'New'
    this.eSignIntent = 'eSign'

    this.eSignDetail = parsers.numberOfPolicies(eSignSessions)
    this.policies = parsers.policyNumbers(eSignSessions).join(',')
  }
}
