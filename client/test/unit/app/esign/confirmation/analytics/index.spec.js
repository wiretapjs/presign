import { getAnalyticsQueue, resetAnalyticsQueue } from 'test/helpers/analytics'
import * as analytics from 'app/esign/confirmation/analytics'
import OmniturePageView from 'app/esign/confirmation/analytics/page-view/OmniturePayload'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'

const fakePolicyNumber = 'ABCD1'
const fakeJurisdiction = 'CA'

describe('Confirmation analytics', () => {
  afterEach(() => {
    resetAnalyticsQueue()
    jest.clearAllMocks()
  })

  it('records page load', () => {
    analytics.recordEsignConfirmationView(fakePolicyNumber, fakeJurisdiction)
    expect(getAnalyticsQueue()).toContainEqual(
      new AnalyticsEvent(
        new OmniturePageView(fakePolicyNumber, fakeJurisdiction),
        dispatchOmniture,
      ),
    )
  })
})
