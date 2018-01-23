import { uniq } from 'lodash'

export default function (eSignSessions) {
  const allPolicyNumbers = eSignSessions.map(session => session.policyNumber)
  return uniq(allPolicyNumbers)
}
