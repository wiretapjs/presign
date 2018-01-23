import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'

const fakeBody = 'fooBar'
const mockDispatchHandler = jest.fn()

describe('AnalyticsEvent', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('dispatch', () => {
    beforeEach(() => {
      const event = new AnalyticsEvent(fakeBody, mockDispatchHandler)
      event.dispatch()
    })

    it('calls the dispatch handler once', () => {
      expect(mockDispatchHandler).toHaveBeenCalledTimes(1)
    })

    it('passes the event body into the dispatch handler', () => {
      expect(mockDispatchHandler).toHaveBeenCalledWith(fakeBody)
    })
  })
})
