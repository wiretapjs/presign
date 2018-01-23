import policyService from 'lib/services/policies'
import sessionsService from 'lib/services/sessions'
import termsAndConditionsService from 'lib/services/termsAndConditions'
import {docTypes} from 'app/data/esignConstants'
import {canEsign} from 'app/esign/filters/common'
import {termsAndConditionsError} from 'app/data/errors'

export const COMPLETE_STATUS = 'complete'
export const SENT_STATUS = 'sent'
export const READY_STATUS = 'ready'

class ESignLoadingViewModel {
  constructor (options) {
    options = options || {}

    if (!options.sessions) {
      throw new Error('Missing required option sessions.')
    }

    if (!options.policySummaries) {
      throw new Error('Missing required option policySummaries.')
    }

    this.policySummaries = options.policySummaries
    this.eSignSessions = options.sessions.filter((session) => {
      return session.ceremonyStatus !== COMPLETE_STATUS
    })
  }

  static async create () {
    const sessions = await sessionsService.getUpdatedSessions()
    const policySummaries = await Promise.all(sessions.map((session) => {
      return policyService.getUpdatedSummary(session.policyNumber)
    }))
    return new ESignLoadingViewModel({ policySummaries, sessions })
  }

  async acceptTermsAndConditions () {
    const unacceptedTermsAndConditions = this._unacceptedTermsAndConditions
    if (unacceptedTermsAndConditions.length === 0) return this
    const acceptTermsAndConditionsRequest = unacceptedTermsAndConditions.map(session => {
      return {
        policyNumber: session.policyNumber,
        packageId: session.packageId,
      }
    })
    await termsAndConditionsService.acceptTerms(acceptTermsAndConditionsRequest)
    const sessions = await sessionsService.getUpdatedSessions()
    const viewModel = new ESignLoadingViewModel({policySummaries: this.policySummaries, sessions})
    this._assertAllTermsAndConditionsSigned(viewModel)
    return viewModel
  }

  _assertAllTermsAndConditionsSigned (viewModel) {
    if (viewModel._unacceptedTermsAndConditions.length > 0) {
      throw termsAndConditionsError
    }
  }

  get _unacceptedTermsAndConditions () {
    return this.eSignSessions.filter(session => {
      return session.ceremonyStatus === SENT_STATUS || session.ceremonyStatus === READY_STATUS
    })
  }

  /**
   * returns if any of the sessions require multiple signers
   * @return {Boolean} [description]
   */
  get hasMultipleSigners () {
    return this.eSignSessions.some(session => {
      return session.signerCount > 1
    })
  }

  get canEsign () {
    return canEsign(this.eSignSessions, this.signableCeremonies)
  }

  /**
   * returns the number of esign documents that require signing
   * @return {Number} [description]
   */
  get numberOfEsignDocs () {
    return this._countDocs(docTypes.ESIGN)
  }

  /**
   * returns the number of print sign mail documents that require signing
   * @return {Number} [description]
   */
  get numberOfPrintSignMailDocs () {
    return this._countDocs(docTypes.PRINT_SIGN_MAIL)
  }

  /**
   * returns a list of sign-able policy numbers
   * @return {[String]} A list of sign-able policy numbers  }

   */
  get signableCeremonies () {
    return this.eSignSessions.map(session => {
      return {
        policyNumber: session.policyNumber,
        ceremonyStatus: session.ceremonyStatus,
      }
    })
  }

  _countDocs (docType) {
    return this.eSignSessions.reduce((total, policy) => {
      let sum = 0
      if (policy.eSignSession) {
        sum = policy.eSignSession.reduce((accumulator, session) => {
          // +number is used to cast to a string or NaN
          const count = +session[docType.countField]
          if (Number.isNaN(count)) return accumulator
          return accumulator + count
        }, 0)
      }
      return total + sum
    }, 0)
  }
}

export default ESignLoadingViewModel
