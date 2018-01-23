import analyticsManager from 'lib/services/analytics/analyticsManager'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import omnitureConfig from 'lib/services/analytics/omniture/config'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'
import heapConfig from 'lib/services/analytics/heap/config'
import dispatchHeapTracking from 'lib/services/analytics/heap/dispatchTracking'

export const recordWelcomeScreen = function (choice) {
  analyticsManager.analyticsEventsArr.push(
    new AnalyticsEvent(omnitureConfig.initializeWelcomeMat, dispatchOmniture))

  const omnitureWelcomeChoice = new AnalyticsEvent(
    omnitureConfig.welcome[choice], dispatchOmniture)
  if (!omnitureWelcomeChoice.body) console.error('Omniture Event not found')
  analyticsManager.analyticsEventsArr.push(omnitureWelcomeChoice)

  const heapWelcomeChoice = new AnalyticsEvent(heapConfig.welcome[choice], dispatchHeapTracking)
  if (!heapWelcomeChoice.body) console.error('Heap Event not found')
  analyticsManager.analyticsEventsArr.push(heapWelcomeChoice)
}

export const getStartedClick = function (choice) {
  analyticsManager.analyticsEventsArr.push(
    new AnalyticsEvent(omnitureConfig.getStartedClick, dispatchOmniture))
  const getStartedClickChoice = new AnalyticsEvent(
    heapConfig.getStartedClick[choice], dispatchHeapTracking)
  if (!getStartedClickChoice.body) console.error('Heap Event not found')
  analyticsManager.analyticsEventsArr.push(getStartedClickChoice)
}
