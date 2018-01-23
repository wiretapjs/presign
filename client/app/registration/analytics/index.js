import analyticsManager from 'lib/services/analytics/analyticsManager'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import omnitureConfig from 'lib/services/analytics/omniture/config'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'
import heapConfig from 'lib/services/analytics/heap/config'
import dispatchHeapTracking from 'lib/services/analytics/heap/dispatchTracking'

export const recordRegistrationScreen = function () {
  analyticsManager.analyticsEventsArr.push(
    new AnalyticsEvent(omnitureConfig.initializeRegistration, dispatchOmniture))
  analyticsManager.analyticsEventsArr.push(
    new AnalyticsEvent(heapConfig.initializeRegistration, dispatchHeapTracking))
}

export const recordRegistrationComplete = function () {
  analyticsManager.analyticsEventsArr.push(
    new AnalyticsEvent(heapConfig.completeRegistration, dispatchHeapTracking))
}

export const recordRegistrationSubmit = function () {
  analyticsManager.analyticsEventsArr.push(
    new AnalyticsEvent(heapConfig.submitRegistrationClick, dispatchHeapTracking))
}

export const recordAutomaticLoginComplete = function () {
  analyticsManager.analyticsEventsArr.push(
    new AnalyticsEvent(heapConfig.completeAutomaticLogin, dispatchHeapTracking))
}
