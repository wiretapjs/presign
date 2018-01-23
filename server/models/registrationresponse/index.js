module.exports = class RegistrationResponseModel {
  constructor (response) {
    this.responseCode = response.responseCode
    this.priorNumberOfLockoutAttempts = response.priorNumberOfLockoutAttempts
  }
}
