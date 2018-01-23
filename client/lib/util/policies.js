export const formatPolicyNumber = function (policyNumberString) {
  const dashBeforeIndexes = [3, 6, 12]
  let formattedPolicyNumber = ''
  let dashBeforeIndex = dashBeforeIndexes.shift()
  for (const [index, value] of policyNumberString.split('').entries()) {
    if (index === dashBeforeIndex) {
      formattedPolicyNumber += '-'
      if (dashBeforeIndexes.length > 0) {
        dashBeforeIndex = dashBeforeIndexes.shift()
      }
    }
    formattedPolicyNumber += value
  }
  return formattedPolicyNumber
}
