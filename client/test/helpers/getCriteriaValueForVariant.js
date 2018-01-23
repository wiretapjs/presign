import generateRandomString from 'test/helpers/generateRandomString'

const getCriteriaValueForVariant = function (TrafficSplittingService, variant) {
  let choice = ''
  let criteriaValue = ''
  while (choice !== variant) {
    criteriaValue = generateRandomString()
    choice = TrafficSplittingService(criteriaValue)
  }
  return criteriaValue
}

export default getCriteriaValueForVariant
