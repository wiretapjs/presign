import analyticsManager from 'lib/services/analytics/analyticsManager'

export const getAnalyticsQueue = function () {
  return analyticsManager.analyticsEventsArr
}

export const resetAnalyticsQueue = function () {
  analyticsManager.analyticsEventsArr = []
}
