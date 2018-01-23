const LinesOfBusiness = {
  HOME: 'HOME',
  AUTO: 'AUTO',
  LIFE: 'LIFE',
  MOTORCYCLE: 'MOTORCYCLE',
  MISC: 'MISC',
}

const RatingMethods = {
  MANUAL: 'MANUAL',
  COMPUTER: 'COMPUTER',
}

class Policy {
  static get RatingMethods () {
    return RatingMethods
  }

  static get LinesOfBusiness () {
    return LinesOfBusiness
  }
}

module.exports = Policy
