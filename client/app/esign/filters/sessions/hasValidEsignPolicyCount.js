import _ from 'lodash'

module.exports = (sessions) => {
  const policyNumbers = _.uniq(sessions.map(session => session.policyNumber))
  return policyNumbers.length === 1
}
