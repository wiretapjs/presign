import { docTypes } from 'app/data/esignConstants'
import { getDocumentCountByDocType } from 'app/esign/filters/common'

module.exports = (sessions) => {
  return getDocumentCountByDocType(sessions, docTypes.ESIGN) > 0
}
