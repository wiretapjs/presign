export default class {
  constructor (policyNumber, jurisdiction) {
    this.policies = policyNumber
    this.jurisdiction = jurisdiction

    this.TileName = 'esignE3'
    this['confirm.eSign'] = 'eSignComplete'
    this['confirm.policyLoop'] = 'PolicyLoopComplete'
  }
}
