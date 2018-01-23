import digest from 'lib/digest'

class ExperimentChooser {
  constructor (experimentConfig) {
    this.salt = experimentConfig.salt
    this.percentBaseVersion = experimentConfig.percentBaseVersion
    this.variants = {
      BASE: experimentConfig.base,
      TREATMENT_A: experimentConfig.treatmentA,
    }
  }

  makeChoice (criteriaValue) {
    if (!criteriaValue) {
      return this.variants.BASE
    }
    return this._isBase(criteriaValue) ? this.variants.BASE : this.variants.TREATMENT_A
  }

  _isBase (criteriaValue) {
    return Math.abs(digest(criteriaValue + this.salt) % 100) < this.percentBaseVersion
  }
}

export default ExperimentChooser
