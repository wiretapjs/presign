import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'
import analyticsManager from 'lib/services/analytics/analyticsManager'
import OmniturePageView from './page-view/OmniturePayload'

export const recordEsignConfirmationView = function (policyNumber, jurisdiction) {
  analyticsManager.analyticsEventsArr.push(
    new AnalyticsEvent(new OmniturePageView(policyNumber, jurisdiction), dispatchOmniture),
  )
}
