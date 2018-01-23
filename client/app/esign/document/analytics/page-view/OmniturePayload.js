import parsers from 'app/esign/analytics/parsers'

export default class {
  constructor (eSignSession, jurisdiction) {
    this.TileName = 'esignE2'
    this['confirm.policyLoop'] = 'PolicyLoopStart'
    this.policyLoopType = 'eSignOnly'
    this.policySigners = String(parsers.numberOfSigners(eSignSession))
    this.policies = parsers.policyNumber(eSignSession)
    this.jurisdiction = jurisdiction
  }
}
