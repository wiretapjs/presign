module.exports = class RegistrationModel {
  constructor (isValidToken, registrationInfo) {
    this.isValidToken = isValidToken
    this.registrationInfo = {
      registrationKeyPresent: registrationInfo.registrationKeyPresent,
      registrationKeyActive: registrationInfo.registrationKeyActive,
      emailAddress: registrationInfo.emailAddress,
      namedInsuredMissingSSN: registrationInfo.namedInsuredMissingSSN,
      userAlreadyRegistered: registrationInfo.userAlreadyRegistered,
      policyNumber: registrationInfo.policyNumber,
    }
  }
}
