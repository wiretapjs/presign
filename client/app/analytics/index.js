import dispatchHeapIdentification from 'lib/services/analytics/heap/dispatchIdentification'
import dispatchHeapAddUserProperties from 'lib/services/analytics/heap/dispatchAddUserProperties'
import analyticsManager from 'lib/services/analytics/analyticsManager'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'

export const identifyUser = function (identificationObject) {
  if (!identificationObject) return
  const {emailAddress, policyNumber} = identificationObject
  if (emailAddress) {
    analyticsManager.analyticsEventsArr.push(
      new AnalyticsEvent(emailAddress, dispatchHeapIdentification))
  }

  if (policyNumber) {
    analyticsManager.analyticsEventsArr.push(
      new AnalyticsEvent({policyNumber}, dispatchHeapAddUserProperties))
  }
}
