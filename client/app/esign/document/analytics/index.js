import analyticsManager from 'lib/services/analytics/analyticsManager'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'
import heapConfig from 'lib/services/analytics/heap/config'
import dispatchHeapTracking from 'lib/services/analytics/heap/dispatchTracking'
import OmniturePayload from './page-view/OmniturePayload'
import OmnitureErrorPayload from './page-view/OmnitureErrorPayload'

const isESignDocumentDataMissing = function (eSignSession, jurisdiction) {
  return !eSignSession || !jurisdiction
}

export const recordESignDocumentError = function () {
  analyticsManager.analyticsEventsArr
    .push(new AnalyticsEvent(new OmnitureErrorPayload(), dispatchOmniture))
}

export const recordESignDocument = function (eSignSession, jurisdiction) {
  if (isESignDocumentDataMissing(eSignSession, jurisdiction)) {
    recordESignDocumentError()
  } else {
    analyticsManager.analyticsEventsArr
      .push(new AnalyticsEvent(new OmniturePayload(eSignSession, jurisdiction), dispatchOmniture))
  }
}

export const recordEsignCantSeeDocumentClick = function () {
  analyticsManager.analyticsEventsArr
    .push(new AnalyticsEvent(heapConfig.eSignDocumentScreen.cantSeeDocsLink, dispatchHeapTracking))
}

export const recordNeedHelpClick = function () {
  analyticsManager.analyticsEventsArr
    .push(new AnalyticsEvent(heapConfig.eSignDocumentScreen.needHelp, dispatchHeapTracking))
}
