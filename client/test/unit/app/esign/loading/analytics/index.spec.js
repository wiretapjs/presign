import { getAnalyticsQueue, resetAnalyticsQueue } from 'test/helpers/analytics'
import { context } from 'test/helpers/jest'
import { recordESignLoading, recordESignLoadingError } from 'app/esign/loading/analytics'
import OmniturePayload from 'app/esign/loading/analytics/page-view/OmniturePayload'
import OmnitureErrorPayload from 'app/esign/loading/analytics/page-view/OmnitureErrorPayload'
import uuid from 'uuid'

describe('esign loading analytics', () => {
  afterEach(() => {
    resetAnalyticsQueue()
    jest.clearAllMocks()
  })

  const getFirstEventFromQueue = function () {
    return getAnalyticsQueue()[0]
  }

  describe('page load', () => {
    const fakeEsignSessions = [uuid()]
    const fakePayload = new OmniturePayload(fakeEsignSessions)

    afterEach(() => {
      resetAnalyticsQueue()
    })

    context('with valid data', () => {
      it('records the page load event', () => {
        recordESignLoading(fakeEsignSessions)
        expect(getFirstEventFromQueue().body).toEqual(fakePayload)
      })
    })

    context('with no eSign session', () => {
      it('records the page load error event', () => {
        recordESignLoading(null)
        expect(getFirstEventFromQueue().body).toEqual(new OmnitureErrorPayload())
      })
    })
  })

  describe('page load error', () => {
    afterEach(() => {
      resetAnalyticsQueue()
    })

    it('records the page load error event', () => {
      recordESignLoadingError()
      expect(getFirstEventFromQueue().body).toEqual(new OmnitureErrorPayload())
    })
  })
})
