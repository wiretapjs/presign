import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'
import analyticsManager from 'lib/services/analytics/analyticsManager'
import OmniturePayload from './page-view/OmniturePayload'
import OmnitureErrorPayload from './page-view/OmnitureErrorPayload'

export const recordESignLoadingError = function () {
  analyticsManager.analyticsEventsArr
    .push(new AnalyticsEvent(new OmnitureErrorPayload(), dispatchOmniture))
}

export const recordESignLoading = function (eSignSession) {
  if (!eSignSession) {
    recordESignLoadingError()
  } else {
    analyticsManager.analyticsEventsArr
      .push(new AnalyticsEvent(new OmniturePayload(eSignSession), dispatchOmniture))
  }
}
