import hasValidEsignDocCount from './hasValidEsignDocCount'
import hasValidEsignStatus from './hasValidEsignStatus'
import hasValidEsignPrintSignMail from './hasValidEsignPrintSignMail'
import hasValidSignersCount from './hasValidSignersCount'
import hasValidEsignSessionCount from './hasValidEsignSessionCount'
import hasValidEsignPolicyCount from './hasValidEsignPolicyCount'

module.exports = [
  hasValidEsignSessionCount,
  hasValidEsignDocCount,
  hasValidEsignStatus,
  hasValidEsignPrintSignMail,
  hasValidSignersCount,
  hasValidEsignPolicyCount,
]
