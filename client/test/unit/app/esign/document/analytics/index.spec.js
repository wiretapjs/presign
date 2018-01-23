import { getAnalyticsQueue, resetAnalyticsQueue } from 'test/helpers/analytics'
import { context } from 'test/helpers/jest'
import { recordEsignCantSeeDocumentClick, recordNeedHelpClick, recordESignDocument, recordESignDocumentError } from 'app/esign/document/analytics'
import OmniturePayload from 'app/esign/document/analytics/page-view/OmniturePayload'
import OmnitureErrorPayload from 'app/esign/document/analytics/page-view/OmnitureErrorPayload'
import heapConfig from 'lib/services/analytics/heap/config'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import dispatchHeap from 'lib/services/analytics/heap/dispatchTracking'
import uuid from 'uuid/v4'

const getFirstEventFromQueue = function () {
  return getAnalyticsQueue()[0]
}

describe('page load', () => {
  const fakeEsignSession = uuid()
  const fakeJurisdiction = uuid()
  const fakePayload = new OmniturePayload(fakeEsignSession, fakeJurisdiction)

  afterEach(() => {
    resetAnalyticsQueue()
  })

  context('with valid data', () => {
    it('records the page load event', () => {
      recordESignDocument(fakeEsignSession, fakeJurisdiction)
      expect(getFirstEventFromQueue().body).toEqual(fakePayload)
    })
  })

  context('with no eSign session', () => {
    it('records the page load error event', () => {
      recordESignDocument(null, fakeJurisdiction)
      expect(getFirstEventFromQueue().body).toEqual(new OmnitureErrorPayload())
    })
  })

  context('with no jurisdiction', () => {
    it('records the page load error event', () => {
      recordESignDocument(fakeEsignSession)
      expect(getFirstEventFromQueue().body).toEqual(new OmnitureErrorPayload())
    })
  })
})

describe('page load error', () => {
  afterEach(() => {
    resetAnalyticsQueue()
  })

  it('records the page load error event', () => {
    recordESignDocumentError()
    expect(getFirstEventFromQueue().body).toEqual(new OmnitureErrorPayload())
  })
})

describe('document analytics', () => {
  afterEach(() => {
    resetAnalyticsQueue()
    jest.clearAllMocks()
  })

  it("record Can't See Your Documents click", () => {
    recordEsignCantSeeDocumentClick()
    expect(getAnalyticsQueue())
      .toContainEqual(
        new AnalyticsEvent(heapConfig.eSignDocumentScreen.cantSeeDocsLink, dispatchHeap))
  })
  it('record Need Help click', () => {
    recordNeedHelpClick()
    expect(getAnalyticsQueue())
      .toContainEqual(
        new AnalyticsEvent(heapConfig.eSignDocumentScreen.needHelp, dispatchHeap))
  })
})
